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

var state = {}
var duration = 60 // minutes
var timeStep = 10 // minutes

var runner = processor.Runner
//runner.run(state, duration, timeStep)

module.exports = appRouter