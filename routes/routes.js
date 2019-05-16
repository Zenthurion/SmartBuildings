const processor = require('./processor.js')


var appRouter = (app) => {
    app.get('/', (req, res) => {
        res.send("Hello World!")
    })
    app.get('/temp', (req, res) => {
        let value = Math.floor(Math.random() * 60) - 20
        res.send(value.toString())
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
            watts: 500,
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
                min: 16
            }
        },
        co2: {
            max: 0.008,
            ideal: 0.004
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

var timestep = 5
var days = 1
var hours = 24 * days
var duration = 60 * hours // in minutes

var runner = processor.Runner
runner.run(state, duration, timestep, 'summer')

module.exports = appRouter