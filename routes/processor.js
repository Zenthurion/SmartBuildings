const winston = require('winston')
const {
    format
} = require('logform')

const services = require('./services.js')
const models = require('./models.js')

const logger = winston.createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.printf(info => `${info.timestamp}: ${info.message}`)
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: 'errors.log',
            level: 'error'
        }),
        new winston.transports.File({
            filename: 'sim.log'
        })
    ]
})
const dataCollector = winston.createLogger({
    level: 'info',
    format: format.printf(info => `${info.message}`),
    transports: [
        new winston.transports.File({
            filename: 'data' + new Date().getTime() + '.csv'
        })
    ]
})



//var sim = new Simulator()

module.exports = function Simulator() {
    let simulationStates = []
    let that = this
    let state = {}
    let season = ''

    this.run = (initialState, minutes, timestep, _season) => {
        logger.info('\n> Running simulation for ' + minutes + ' minutes in ' + season + ' season with a timestep of ' + timestep)
        that.state = initialState
        //this.timestep = timestep
        season = _season

        that.state.roomEnergy = services.wattsAndTemp.watts[30] / 1000

        that.state.log.timestep = timestep
        prepareInitialState(that.state)
        printLogTitles(that.state)
        //dataCollector.info('elapsed,hour,temperature,outside temperature,co2,occupancy,consumption,heating,ventilation')
        while (that.state.log.elapsed < minutes) {
            that.update(timestep)
            that.state.log.elapsed += timestep
            that.state.log.hour = Math.floor(that.state.log.elapsed / 60.0) % 24
        }
    }
    this.init = (initialState, timestep, _season) => {
        logger.info('\n> Initializing simulation ' + season + ' season with a timestep of ' + timestep)
        that.state = JSON.parse(JSON.stringify(initialState))
        //this.timestep = timestep
        season = _season

        that.state.roomEnergy = services.wattsAndTemp.watts[30] / 60

        that.state.log.timestep = timestep
        prepareInitialState(that.state)
        printLogTitles(that.state)
    }

    function prepareInitialState(state) {
        state.outsideTemperature = services.forecastTemperature(0, season)
        state.occupancy = services.occupancy(0)
    }

    this.update = (timestep) => {
        let stringState = JSON.stringify(that.state)
        let state = JSON.parse(stringState)
        simulationStates.push(state)

        //checkRules(state)

        state.occupancy = services.occupancy(state.log.elapsed)
        state.outsideTemperature = services.forecastTemperature(state.log.elapsed, season)
        state.co2 = models.co2(state, timestep)
        
        let heat = models.heatChange(state, timestep)
        state.log.heatChange = heat
        state.roomEnergy += heat

        let oldTemp = state.temperature
        state.temperature = services.temperatureChange(state.temperature, state.roomEnergy, timestep)
        state.log.tChange = state.temperature - oldTemp
        state.consumption = models.consumption(state, timestep)
        
        updateLog(state)
        printState(state)

        that.state = state
    }

    function updateLog(state) {
        state.log.ti = state.temperature
        state.log.to = state.outsideTemperature
        state.log.occupancy = state.occupancy
        state.log.consumption = state.consumption
        state.log.heatpumpState = state.appliances.heatpump.on
        state.log.ventilationState = state.appliances.ventilation.on
        state.log.co2 = state.co2
    }

    function printState(state) {
        let line = Object.values(state.log)
        dataCollector.info(line.join(','))
    }

    function printLogTitles(state) {
        let titles = Object.keys(state.log)
        dataCollector.info(titles.join(','))
    }

    function checkRules(state) { 
        if (state.co2 >= state.rules.co2.max && state.appliances.ventilation.on === false) {
            state.appliances.ventilation.on = true
            logger.info('CO2 too high > turning on ventilation')
        } else if(state.co2 < state.rules.co2.ideal && state.appliances.ventilation.on === true) {
            state.appliances.ventilation.on = false
            logger.info('CO2 too at ideal threshold > turning off ventilation')
        }

        let heatingState = state.appliances.heatpump.on

        if (state.occupancy > 0) {
            if (state.temperature < state.rules.temperature.occupied.min && heatingState !== 'heating') {
                state.appliances.heatpump.on = 'heating'
                logger.info("Temperature low > heatpump set to heating")
            } else if (state.temperature < state.rules.temperature.occupied.ideal - 1 && heatingState === 'cooling') {
                state.appliances.heatpump.on = 'off'
                logger.info("Temperature less acceptable > heatpump set to off")
            } else if (state.temperature > state.rules.temperature.occupied.ideal && heatingState === 'heating') {
                if(state.log.elapsed >= state.override.heat.start && state.log.elapsed < state.override.heat.end && state.override.heat.type === 'heating') {
                    console.log("keeping heating on")
                } else {
                    state.appliances.heatpump.on = 'off'
                    logger.info("Temperature acceptable > heatpump set to off")
                }
            }  else if (state.temperature > state.rules.temperature.occupied.max && heatingState !== 'cooling') {
                state.appliances.heatpump.on = 'cooling'
                logger.info("Temperature too high > heatpump set to cooling")
            }
        } else {
            if (state.temperature < state.rules.temperature.unoccupied.min && heatingState !== 'heating') {
                state.appliances.heatpump.on = 'heating'
                logger.info("Temperature low > heatpump set to heating")
            } else if (state.temperature < state.rules.temperature.unoccupied.ideal - 1 && heatingState === 'cooling') {
                state.appliances.heatpump.on = 'off'
                logger.info("Temperature less acceptable > heatpump set to off")
            } else if (state.temperature > state.rules.temperature.unoccupied.ideal && heatingState === 'heating') {
                if(state.log.elapsed >= state.override.heat.start && state.log.elapsed < state.override.heat.end && state.override.heat.type === 'heating') {
                    console.log("keeping heating on")
                } else {
                    state.appliances.heatpump.on = 'off'
                    logger.info("Temperature acceptable > heatpump set to off")
                }
            } else if (state.temperature > state.rules.temperature.occupied.max && heatingState !== 'cooling') {
                state.appliances.heatpump.on = 'cooling'
                logger.info("Temperature too high > heatpump set to cooling")
            }
        }
    }

    // function allHeating(time, state) {
    //     let internalGain = internalHeatGain(time, state)
    //     let heating = applianceHeating(time, state)
    //     let transmissionLoss = transmissionHeatLoss(time, state)
    //     let ventilationLoss = ventilationHeatLoss(time, state)

    //     //logger.info(`Internal: ${internalGain}, Heating: ${heating}, Transmission: ${transmissionLoss}, Ventilation: ${ventilationLoss}`)

    //     let heat = internalGain + heating - transmissionLoss - ventilationLoss
    //     let tempCoefficient = 0.01
    //     let temp = heat * tempCoefficient
    //     return state.temperature + temp
    // }
}
/*
module.exports = {
    Runner: sim
}
*/