const processor = require('./processor.js')
const services = require('./services.js')



var appRouter = (app) => {
    app.get('/', (req, res) => {
        res.send("Hello World!")
    })

    // var expected = {
    //     timestep: 0,
    //     cycle: 0,
    //     season: 'summer' // 'winter'
    // }
    app.get('/forecast/', (req, res) => { //?timestep=:timestep&cycle=:cycle
        if(!(req.params.hasOwnProperty('timestep') && req.params.hasOwnProperty('cycle') && req.params.hasOwnProperty('season'))) res.send('invalid parameters')
        const timestep = req.params.timestep
        const cylce = req.params.cycle
        const season = req.params.season

        const temp = services.forecastTemperature(timestep * cylce, season)
        res.send(temp.toString())
    })
    // var expected = {
    //     timestep: 0,
    //     cycle: 0
    // }
    app.get('/schedule', (req, res) => {
        if(!(req.params.hasOwnProperty('timestep') && req.params.hasOwnProperty('cycle'))) res.send('invalid parameters')
        const timestep = req.params.timestep
        const cylce = req.params.cycle

        const occupancy = services.occupancy(timestep * cylce)
        res.send(occupancy.toString())
    })
    app.get('/temperature/:min-:max', (req, res) => {
        var max = parseInt(req.params.max)
        var min = parseInt(req.params.min)

        let value = Math.floor((Math.random() * (max-min)) + min)
        res.send(value.toString())
    })
    app.get('/xml', (req, res) => {
        console.log(req.body)
        res.send('<state><time>1000</time><occupancy>11</occupancy><temperature>22</temperature><co2>400</co2><heatingPower>50</heatingPower><heatingConsumption>2000</heatingConsumption><ventilationPower>50</ventilationPower><ventilationConsumption>1200</ventilationConsumption></state>')
    })
    app.get('/schedule', (req, res) => {
        console.log(json2xml(schedule))
        res.send('JSON' + json2xml(schedule))
    })
}

var state = {
    dim: {
        x: 5,
        y: 5,
        z: 3
    },
    volume: 75,
    occupancy: 0,
    temperature: 18,
    outsideTemperature: 18,
    co2: 0.0004,
    consumption: 0,
    roomEnergy: 5217,
    appliances: {
        ventilation: {
            fans: {
                count: 3,
                watts: 50,
                m3s: 0.26
            },
            on: false
        },
        heatpump: {
            watts: 3000,
            on: 'off' // 'heating' 'cooling'
        }
    },
    rules: {
        temperature: {
            occupied: {
                max: 26,
                ideal: 22,
                min: 20
            },
            unoccupied: {
                max: 26,
                ideal: 19,
                min: 18
            }
        },
        co2: {
            max: 0.0008,
            ideal: 0.0006
        }
    },
    log: {
        timestep: 10,
        elapsed: 0,
        hour: 0,
        ti: 0,
        to: 0,
        tChange: 0,
        ventilationLoss: 0,
        transmissionLoss: 0,
        heatChange: 0,
        applianceGain: 0,
        internalGain: 0,
        co2: 0,
        consumption: 0,
        occupancy: 0,
        heatpumpState: 'off',
        ventilationState: false
    }
}

var timestep = 10
var days = 1
var hours = 24 * days
var duration = 60 * hours // in minutes

var runner = processor.Runner
runner.run(state, duration, timestep, 'winter')
//runner.run(state, duration, timestep, 'summer')

module.exports = appRouter