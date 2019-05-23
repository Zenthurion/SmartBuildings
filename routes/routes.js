const processor = require('./processor.js')
const services = require('./services.js')
const bodyParser = require('body-parser')

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
    // create application/x-www-form-urlencoded parser
    var urlencodedParser = bodyParser.urlencoded({ extended: true })
    
    // POST /login gets urlencoded bodies
    app.post('/login', urlencodedParser, function (req, res) {
      res.send('welcome, ' + req.body.username)
    })
    
var sim = new processor()

    app.get('/xml', urlencodedParser, (req, res) => {
        var cycle = parseInt(req.query.cycle);
        var timeStep = parseInt(req.query.timeStep);
        var ventilationState = req.query.ventilationState;
        var heatingState = req.query.heatingState;
        var roomEnergy = parseFloat(req.query.roomEnergy);

        if (cycle == 0 || (sim.state.log.elapsed + timestep >= 7*DAY))
        {
            sim.init(state, timeStep, 'winter')
        }
        else
        {
            sim.state.appliances.ventilation.on = ventilationState
            sim.state.appliances.heatpump.on = heatingState
            sim.state.roomEnergy = roomEnergy
        }
        

        sim.update(timeStep)
        sim.state.log.elapsed += timestep
        sim.state.log.hour = Math.floor(sim.state.log.elapsed  / 60.0) % 24
        
        var ventConsumption = sim.state.appliances.ventilation.fans.watts * sim.state.appliances.ventilation.fans.count;
        if (ventilationState === "off")
        {
            ventConsumption = 0;
        }
        var heatConsumption = sim.state.appliances.heatpump.watts;
        if (heatingState === "off")
        {
            heatConsumption = 0;
        }

        var result = {
            "roomEnergy": sim.state.roomEnergy,
            "occupancy": sim.state.occupancy,
            "temperature": sim.state.temperature,
            "co2": sim.state.co2,
            "ventilationPowerConsumption": ventConsumption,
            "heatingPowerConsumption": heatConsumption
        }
        var xml = "<state>";
        
        for (var key in result) {
            if (result.hasOwnProperty(key)) {
                xml+="<"+key+">"+result[key]+"</"+key+">";
            }
        }
        res.send(xml+'</state>')
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
            watts: 1000,
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
    override: {
        heat: {
            start: 0,
            end: 0,
            //end: 480,
            type: 'heating'
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

var HOUR = 60;
var DAY = 24*HOUR;

var timestep = 10
var days = 1
var hours = 24 * days
var duration = 60 * hours // in minutes

//var runner = processor.Runner
//runner.run(state, duration, timestep, 'winter')
//runner.run(state, duration, timestep, 'summer')

module.exports = appRouter