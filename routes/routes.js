const processor = require('./processor.js')

var wattsAndTemp = {
    temperature: [
        15, 15,1, 15,2, 15,3, 15,4, 15,5, 15,6, 15,7, 15,8, 15,9, 16, 16,1, 16,2, 16,3, 16,4, 16,5, 16,6, 16,7, 16,8, 16,9, 17, 17,1, 17,2, 17,3, 17,4, 17,5, 17,6, 17,7, 17,8, 17,9, 18, 18,1, 18,2, 18,3, 18,4, 18,5, 18,6, 18,7, 18,8, 18,9, 19, 19,1, 19,2, 19,3, 19,4, 19,5, 19,6, 19,7, 19,8, 19,9, 20, 20,1, 20,2, 20,3, 20,4, 20,5, 20,6, 20,7, 20,8, 20,9, 21, 21,1, 21,2, 21,3, 21,4, 21,5, 21,6, 21,7, 21,8, 21,9, 22, 22,1, 22,2, 22,3, 22,4, 22,5, 22,6, 22,7, 22,8, 22,9, 23, 23,1, 23,2, 23,3, 23,4, 23,5, 23,6, 23,7, 23,8, 23,9, 24, 24,1, 24,2, 24,3, 24,4, 24,5, 24,6, 24,7, 24,8, 24,9, 25, 25,1, 25,2, 25,3, 25,4, 25,5, 25,6, 25,7, 25,8, 25,9, 26, 26,1, 26,2, 26,3, 26,4, 26,5, 26,6, 26,7, 26,8, 26,9, 27, 27,1, 27,2, 27,3, 27,4, 27,5, 27,6, 27,7, 27,8, 27,9, 28, 28,1, 28,2, 28,3, 28,4, 28,5, 28,6, 28,7, 28,8, 28,9, 29, 29,1, 29,2, 29,3, 29,4, 29,5, 29,6, 29,7, 29,8, 29,9, 30
    ],
    watts: [
        5162, 5165, 5167, 5167, 5170, 5172, 5175, 5175, 5177, 5180, 5180, 5182, 5185, 5187, 5187, 5190, 5192, 5192, 5195, 5197, 5200, 5200, 5202, 5205, 5207, 5207, 5210, 5212, 5212, 5215, 5217, 5220, 5220, 5222, 5225, 5225, 5227, 5230, 5232, 5232, 5235, 5237, 5237, 5240, 5242, 5245, 5245, 5247, 5250, 5250, 5252, 5255, 5257, 5257, 5260, 5262, 5262, 5265, 5268, 5270, 5270, 5273, 5275, 5275, 5278, 5280, 5283, 5283, 5285, 5288, 5290, 5290, 5293, 5295, 5295, 5298, 5300, 5303, 5303, 5305, 5308, 5308, 5310, 5313, 5315, 5315, 5318, 5320, 5320, 5323, 5325, 5328, 5328, 5330, 5333, 5333, 5335, 5338, 5340, 5340, 5343, 5345, 5345, 5348, 5350, 5353, 5353, 5355, 5358, 5358, 5360, 5363, 5365, 5365, 5368, 5370, 5373, 5373, 5375, 5378, 5378, 5380, 5383, 5385, 5385, 5388, 5390, 5390, 5393, 5395, 5398, 5398, 5400, 5403, 5403, 5405, 5408, 5410, 5410, 5413, 5415, 5415, 5418, 5421, 5423, 5423, 5426, 5428, 5428, 5431, 5433
    ]
}

function getTemperature(oldTemp, newWatts) {
    let oldWatts = 0
    for(let i = 0; i < wattsAndTemp.temperature.length; i++) {
        if(wattsAndTemp.temperature[i] > oldTemp) {
            oldWatts = wattsAndTemp.watts[i]
            break
        }
    }
    let newTemp = 0
    for(let i = 0; i < wattsAndTemp.temperature.length; i++) {
        if(wattsAndTemp.watts[i] > oldWatts + newWatts) {
            newTemp = wattsAndTemp.temperature[i]
            break
        }
    }
    return newTemp
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
    // app.get('/schedule/:roomName/:day/:time', (req, res) => {
    //     var room = req.params.roomName
    //     var day = req.params.day
    //     var time = req.params.time

    //     if(schedule.hasOwnProperty(room)) {
    //         if(schedule[room].hasOwnProperty(day)){
    //             if(time >= 0 && time < 24) {
    //                 res.send('' + json2xml(schedule[room][day][time]))
    //                 return
    //             }
    //             res.send('' + json2xml(schedule[room][day]))
    //             return
    //         }
    //         res.send('' + json2xml(schedule[room]))
    //         return
    //     }
    //     res.send(schedule)
    // })
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
    co2: 0.0004,
    appliances: {
        ventilation: {
            fans: {
                count: 3,
                watts: 50,
                cfm: 550,
                on: false
            },
            heatpump: {
                consumptionWatts: 500,
                productionWatts: function heatpumpProduction(consumption, heating, ti, to) {
                    let cop = (ti / (ti - to)) - (heating ? 1 : -1)
                    return consumption * cop
                },
                on: 'off' // 'heating' 'cooling'
            }
        }
    }
}
var state = {}
var duration = 60 // minutes
var timeStep = 10 // minutes

var runner = processor.Runner
//runner.run(state, duration, timeStep)

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
                ability: 950, // m3/h
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
        let n = 3600 * (stepState.ventilation.on ? 0.26 * stepState.ventilation.fans.count : 0) / V
        let cj = 0.0004
        let c0 = stepSize.co2
        let co2 = ((q/(n*V))*1-(1/Math.exp(n*time))) + ((c0-cj)(1/Math.exp(n*time)))+cj
        return co2
    }

    // function co2loss(time, stepState) {
    //     let q = 0.26 * stepState.ventilation.fans.count
    //     let V = stepState.volume
    //     let n = 3600 * q / V
    // }

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