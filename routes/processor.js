const winston = require('winston')
const {format} = require('logform')

const logger = winston.createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.printf(info => `${info.timestamp}: ${info.message}`)
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({filename: 'errors.log', level: 'error'}),
        new winston.transports.File({filename: 'sim.log'})
    ]
})
const dataCollector = winston.createLogger({
    level: 'info',
    format: format.printf(info => `${info.message}`),
    transports: [
        new winston.transports.File({filename: 'data.csv'})
    ]
})

var weather = {
    summer: {
        0: [
            16, 16, 15, 15, 14, 14, 16, 17, 18, 20, 21, 22, 23, 24, 25, 26, 26, 25, 25, 23, 23, 21, 19, 17
        ],
        1: [
            16, 16, 15, 15, 14, 14, 16, 17, 18, 20, 21, 22, 23, 24, 25, 26, 26, 25, 25, 23, 23, 21, 19, 17
        ],
        2: [
            16, 16, 15, 15, 14, 14, 16, 17, 18, 20, 21, 22, 23, 24, 25, 26, 26, 25, 25, 23, 23, 21, 19, 17
        ],
        3: [
            16, 16, 15, 15, 14, 14, 16, 17, 18, 20, 21, 22, 23, 24, 25, 26, 26, 25, 25, 23, 23, 21, 19, 17
        ],
        4: [
            16, 16, 15, 15, 14, 14, 16, 17, 18, 20, 21, 22, 23, 24, 25, 26, 26, 25, 25, 23, 23, 21, 19, 17
        ],
        5: [
            16, 16, 15, 15, 14, 14, 16, 17, 18, 20, 21, 22, 23, 24, 25, 26, 26, 25, 25, 23, 23, 21, 19, 17
        ],
        6: [
            16, 16, 15, 15, 14, 14, 16, 17, 18, 20, 21, 22, 23, 24, 25, 26, 26, 25, 25, 23, 23, 21, 19, 17
        ]
    },
    winter: {
        0: [
            0, 0, -1, -1, -2, -2, -2, -1, -1, -1, 1, 2, 3, 3, 3, 3, 2, 2, 1, 2, 1, 1, 1, 0
        ],
        1: [
            0, 0, -1, -1, -2, -2, -2, -1, -1, -1, 1, 2, 3, 3, 3, 3, 2, 2, 1, 2, 1, 1, 1, 0
        ],
        2: [
            0, 0, -1, -1, -2, -2, -2, -1, -1, -1, 1, 2, 3, 3, 3, 3, 2, 2, 1, 2, 1, 1, 1, 0
        ],
        3: [
            0, 0, -1, -1, -2, -2, -2, -1, -1, -1, 1, 2, 3, 3, 3, 3, 2, 2, 1, 2, 1, 1, 1, 0
        ],
        4: [
            0, 0, -1, -1, -2, -2, -2, -1, -1, -1, 1, 2, 3, 3, 3, 3, 2, 2, 1, 2, 1, 1, 1, 0
        ],
        5: [
            0, 0, -1, -1, -2, -2, -2, -1, -1, -1, 1, 2, 3, 3, 3, 3, 2, 2, 1, 2, 1, 1, 1, 0
        ],
        6: [
            0, 0, -1, -1, -2, -2, -2, -1, -1, -1, 1, 2, 3, 3, 3, 3, 2, 2, 1, 2, 1, 1, 1, 0
        ]
    }
}

var schedule = {
    meetingRoom: {
        monday: [
            0, 0, 0, 0, 0, 0, 0, 0, 10, 3, 1, 15, 15, 0, 4, 0, 0, 1, 2, 0, 0, 0, 0, 0, 0
        ],
        tuesday: [
            0, 0, 0, 0, 0, 0, 0, 0, 11, 3, 7, 7, 6, 1, 2, 2, 5, 5, 8, 0, 0, 0, 0, 0, 0
        ],
        wednesday: [
            0, 0, 0, 0, 0, 0, 0, 0, 8, 3, 5, 12, 17, 2, 12, 8, 10, 10, 4, 0, 0, 0, 0, 0, 0
        ],
        thursday: [
            0, 0, 0, 0, 0, 0, 0, 0, 6, 3, 3, 4, 5, 0, 13, 9, 2, 3, 1, 0, 0, 0, 0, 0, 0
        ],
        friday: [
            0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 4, 6, 15, 7, 14, 8, 4, 2, 8, 0, 0, 0, 0, 0, 0
        ],
        saturday: [
            0, 0, 0, 0, 0, 0, 0, 0, 5, 3, 8, 8, 9, 8, 8, 3, 7, 5, 6, 0, 0, 0, 0, 0, 0
        ],
        sunday: [
            0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 9, 8, 1, 5, 2, 4, 9, 7, 7, 0, 0, 0, 0, 0, 0
        ]
    },
    classroom: {
        monday: [
            0, 0, 0, 0, 0, 0, 0, 0, 10, 3, 1, 15, 15, 0, 4, 0, 0, 1, 2, 0, 0, 0, 0, 0, 0
        ],
        tuesday: [
            0, 0, 0, 0, 0, 0, 0, 0, 11, 3, 7, 7, 6, 1, 2, 2, 5, 5, 8, 0, 0, 0, 0, 0, 0
        ],
        wednesday: [
            0, 0, 0, 0, 0, 0, 0, 0, 8, 3, 5, 12, 17, 2, 12, 8, 10, 10, 4, 0, 0, 0, 0, 0, 0
        ],
        thursday: [
            0, 0, 0, 0, 0, 0, 0, 0, 6, 3, 3, 4, 5, 0, 13, 9, 2, 3, 1, 0, 0, 0, 0, 0, 0
        ],
        friday: [
            0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 4, 6, 15, 7, 14, 8, 4, 2, 8, 0, 0, 0, 0, 0, 0
        ],
        saturday: [
            0, 0, 0, 0, 0, 0, 0, 0, 5, 3, 8, 8, 9, 8, 8, 3, 7, 5, 6, 0, 0, 0, 0, 0, 0
        ],
        sunday: [
            0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 9, 8, 1, 5, 2, 4, 9, 7, 7, 0, 0, 0, 0, 0, 0
        ]
    },
    cantina: {
        monday: [
            0, 0, 0, 0, 0, 0, 0, 0, 10, 3, 1, 15, 15, 0, 4, 0, 0, 1, 2, 0, 0, 0, 0, 0, 0
        ],
        tuesday: [
            0, 0, 0, 0, 0, 0, 0, 0, 11, 3, 7, 7, 6, 1, 2, 2, 5, 5, 8, 0, 0, 0, 0, 0, 0
        ],
        wednesday: [
            0, 0, 0, 0, 0, 0, 0, 0, 8, 3, 5, 12, 17, 2, 12, 8, 10, 10, 4, 0, 0, 0, 0, 0, 0
        ],
        thursday: [
            0, 0, 0, 0, 0, 0, 0, 0, 6, 3, 3, 4, 5, 0, 13, 9, 2, 3, 1, 0, 0, 0, 0, 0, 0
        ],
        friday: [
            0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 4, 6, 15, 7, 14, 8, 4, 2, 8, 0, 0, 0, 0, 0, 0
        ],
        saturday: [
            0, 0, 0, 0, 0, 0, 0, 0, 5, 3, 8, 8, 9, 8, 8, 3, 7, 5, 6, 0, 0, 0, 0, 0, 0
        ],
        sunday: [
            0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 9, 8, 1, 5, 2, 4, 9, 7, 7, 0, 0, 0, 0, 0, 0
        ]
    }
}
var initial = {
    dim: {
        x: 5,
        y: 5,
        z: 3
    }, 
    volume: 75,
    occupancy: 0,
    temperature: 18,
    outsideTemperature: 0,
    co2: 0.0004,
    consumption: 0,
    ventilation: {
        fans: {
            count: 3,
            watts: 50,
            ability: 550
        },
        on: false
    },
    heating: {
        watts: 2000,
        on: false
    },
    rules: {
        temperature: {
            occupied: {
                max: 26,
                min: 21
            },
            unoccupied: {
                max: 26,
                min: 16
            }
        },
        co2Max: 800,
    }
}


var sim = new Simulator()
var step = 10
var days = 1
var hours = 24 * days
var duration = 60 * hours // in minutes

logger.info('\n> Running simulation for ' + duration + ' minutes')
sim.run(initial, duration, step)

function Simulator() {

    this.timeStep = 10
    this.state = {}
    this.simulationStates = []
    elapsed = 0


    this.run = (initialState, minutes, timeStep) => {
        state = initialState
        timeStep = timeStep

        state.outsideTemperature = Math.floor(Math.random() * 10) + 15

        dataCollector.info('elapsed,hour,temperature,outside temperature,co2,occupancy,consumption,heating,ventilation')
        while(elapsed < minutes) {
            update(this.timeStep)
            elapsed += this.timeStep
        }
    }

    function update(time){
        var stringState = JSON.stringify(this.state)
        var state = JSON.parse(stringState)
        checkRules(state)
        printState(state)

        
        state.occupancy = occupancy(time, state)
        state.outsideTemperature = forecastTemperature(time, state)
        state.co2 = co2(time, state)
        state.temperature = allHeating(time, state)
        state.consumption = consumption(time, state)

        this.state = state
        //logger.info(state.occupancy)
    }

    function printState(state) {
        dataCollector.info(`${elapsed},${Math.floor(this.elapsed / 60.0) % 24},${state.temperature},${state.outsideTemperature},${state.co2},${state.occupancy},${state.consumption},${state.heating.on},${state.ventilation.on}`)

    } 

    function checkRules(state) { // Consider doing the rule check on the brick and pass the updated state back to the server
        if(state.co2 >= state.rules.co2Max) 
            state.ventilation.on = true
        
        if(state.occupancy > 0){
            if(state.temperature < state.rules.temperature.occupied.min && !state.heating.on) {
                state.heating.on = true
                logger.info("Temperature low > heating turned on")
            } else if(state.temperature > state.rules.temperature.occupied.min && state.heating.on) {
                state.heating.on = false
                logger.info("Temperature acceptable > heating turned off")
            } else if(state.temperature > state.rules.temperature.occupied.max && !state.ventilation.on) {
                state.ventilation.on = true
                logger.info("Temperature too high > ventilation turned on")
            }
        } else {
            if(state.temperature < state.rules.temperature.unoccupied.min && !state.heating.on) {
                state.heating.on = true
                logger.info("Temperature low > heating turned on")
            } else if(state.temperature > state.rules.temperature.unoccupied.min && state.heating.on) {
                state.heating.on = false
                logger.info("Temperature acceptable > heating turned off")
            }
            else if(state.temperature > state.rules.temperature.occupied.max && !state.ventilation.on) {
                state.ventilation.on = true
                logger.info("Temperature too high > ventilation turned on")
            }
        }
    }

    function occupancy(time, state) {
        let day = Math.floor((this.elapsed / 60.0) / 24.0) % 7
        let hour = Math.floor(this.elapsed / 60.0) % 24
        
        //console.log(`Day: ${day}, Hour: ${hour}`)
        let strDay = ""
        switch(day) {
            case 0:
                strDay = 'monday'
                break;
            case 1:
                strDay = 'tuesday'
                break;
            case 2:
                strDay = 'wednesday'
                break;
            case 3:
                strDay = 'thursday'
                break;
            case 4:
                strDay = 'friday'
                break;
            case 5:
                strDay = 'saturday'
                break;
            case 6:
                strDay = 'sunday'
                break;
        }
        //console.log(schedule.meetingRoom[strDay][hour])

        //let val = (Math.floor(Math.random() * 25))
        return schedule.meetingRoom[strDay][hour]
    }

    function forecastTemperature(time, state) {
        let day = Math.floor((this.elapsed / 60.0) / 24.0) % 7
        let hour = Math.floor(this.elapsed / 60.0) % 24
        return weather.winter[day][hour]
    }

    function co2(time, state) {
        let q = state.occupancy * 0.1
        let V = state.volume
        let n = 3600 * 0.067 / V
        let cj = 0.0004
        let c0 = state.co2
        let co2 = ((q/(n*V))*1-(1/Math.exp(n*time))) + ((c0-cj)*(1/Math.exp(n*time)))+cj
        return co2
    }

    function transmissionHeatLoss(time, state) {
        let U = 1
        let A = (state.dim.x*state.dim.y * 2) + (state.dim.z * state.dim.y * 2)
        let Ti = state.temperature
        let Te = state.outsideTemperature
        let t = time
        
        let Qtr = (U * A) * (Ti - Te)* t/1000
        return Qtr
    }

    function ventilationHeatLoss(time, state) {
        let cp = 1 // specific heat air // 1 seems OK
        let p = 1.2 // density of air // Approximately... (https://en.wikipedia.org/wiki/Density_of_air)
        let qv = 0.26 * state.ventilation.fans //0.26 per fan (ish) // air volume flow
        let ti = state.temperature
        let t0 = state.outsideTemperature
        
        let Hv = (1-.3)*(cp * p * qv *(ti - t0))
        return state.ventilation.on ? Hv : 0
    }

    function internalHeatGain(time, state) {
        let Af = state.dim.x * state.dim.y
        let qint = 130 * state.occupancy / Af
        let t = time

        let Qint = qint * Af * t / 1000
        return Qint 
    }

    function applianceHeating(time, state) {
        return state.heating.on ? state.heating.watts * time/1000 : 0
    }

    function allHeating(time, state) {
        let internalGain = internalHeatGain(time, state)
        let heating = applianceHeating(time, state)
        let transmissionLoss = transmissionHeatLoss(time, state)
        let ventilationLoss = ventilationHeatLoss(time, state)

        //logger.info(`Internal: ${internalGain}, Heating: ${heating}, Transmission: ${transmissionLoss}, Ventilation: ${ventilationLoss}`)

        let heat = internalGain + heating - transmissionLoss - ventilationLoss
        let tempCoefficient = 0.01
        let temp = heat * tempCoefficient
        return state.temperature + temp
    }

    function consumption(time, state) {
        let heating = state.heating.on ? state.heating.watts : 0
        let ventilation = state.ventilation.on ? state.ventilation.fans * state.ventilation.watts : 0
        let passiveUse = state.occupancy > 0 ? (state.occupancy * 15) + 100 : 0 // Users + lighting
        let kwh = (heating + ventilation + passiveUse) * (time/60)
        return kwh
    }
}

module.exports = {
    Runner: sim,
    schedule: schedule
}