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
    app.get('/schedule/:roomName/:day/:time', (req, res) => {
        var room = req.params.roomName
        var day = req.params.day
        var time = req.params.time

        if(schedule.hasOwnProperty(room)) {
            if(schedule[room].hasOwnProperty(day)){
                if(time >= 0 && time < 24) {
                    res.send('' + json2xml(schedule[room][day][time]))
                    return
                }
                res.send('' + json2xml(schedule[room][day]))
                return
            }
            res.send('' + json2xml(schedule[room]))
            return
        }
        res.send(schedule)
    })
    app.get('/xml', (req, res) => {
        console.log(req.body)
        //res.send('<xml><item>hey</item><item>ho</item><item>5</item><nested><other>hi</other></nested></xml>')
        res.send('<state><time>1000</time><occupancy>11</occupancy><temperature>22</temperature><co2>400</co2><heatingPower>50</heatingPower><heatingConsumption>2000</heatingConsumption><ventilationPower>50</ventilationPower><ventilationConsumption>1200</ventilationConsumption></state>')
    })
    app.get('/schedule', (req, res) => {
        console.log(json2xml(schedule))
        res.send('JSON' + json2xml(schedule))
    })
}

var initial = state = {
    dim: {
        x: 5,
        y: 5,
        z: 3
    }, 
    volume: 75,
    occupancy: 0,
    temperature: 18,
    co2: 100,
    ventilation: {
        fans: {
            count: 3,
            watts: 50,
            ability: 550,
            effect: 0
        }
    },
    heating: {
        effect: 0
    }
}

var sim = new Simulator()
sim.run(state, 0,0,10)

function Simulator() {
    
    this.timeStep = 10
    this.state = {
        dim: {
            x: 5,
            y: 5,
            z: 3
        }, 
        volume: 75,
        occupancy: 0,
        temperature: 18,
        co2: 0.0004,
        ventilation: {
            fans: {
                count: 3,
                watts: 50,
                ability: 550,
                effect: 0
            }
        },
        heating: {
            watts: 2000,
            effect: false
        }
    }

    this.simulationStates = []

    this.run = (initialState, from, to, timeStep) => {
        this.state = initialState
        this.timeStep = timeStep


    }

    function update(time, previousState){
        var stepState = JSON.parse(JSON.stringify(previousState))
        time += this.timeStep
        stepState.occupancy = occupancy(time, stepState)
        stepState.co2 = co2(time, stepState)
        console.log(stepState.occupancy)

    }

    function checkRules(stepState) {

    }

    function occupancy(time, stepState) {
        return (Math.floor(Math.random() * 25) * time)
    }

    function co2(time, stepState) {
        let q = stepState.occupancy * 0.1
        let V = stepState.volume
        let n = 3600 * 0.067 / V
        let cj = 0.0004
        let c0 = stepSize.co2
        let co2 = ((q/(n*V))*1-(1/Math.exp(n*time))) + ((c0-cj)(1/Math.exp(n*time)))+cj
        return co2
    }

    function transmissionHeatLoss(time, stepState) {
        let U = 1
        let A = (stepState.dim.x*stepState.dim.y * 2) + (stepState.dim.z * stepState.dim.y * 2)
        let Ti = 20
        let Te = Math.floor(Math.random() * 10) + 15
        let t = time
        
        let Qtr = (U * A) * (Ti - Te)* t/1000
        return Qtr
    }
    function internalHeatGain(time, stepState) {
        let Af = stepState.dim.x * stepState.dim.y
        let qint = 130 * stepState.occupancy / Af
        let t = time

        let Qint = qint * Af * t / 1000
        return Qint 
    }

    function heating(time, stepState) {
        return stepState.heating.effect ? stepState.heating.watts * time/1000 : 0
    }

    function heating(time, stepState) {
        let heat = stepState.temperature - transmissionHeatLoss(time, stepState) + internalHeatGain(time, stepState)
        heat += heating(time, stepState)
        let tempCoefficient = 10
        return heat * tempCoefficient
    }

    function consumption(time, stepState) {

    }
}

module.exports = appRouter