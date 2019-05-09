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
    app.get('/temp', (req, res) => {
        let value = Math.floor(Math.random() * 60) - 20
        res.send(value.toString())
    })
    app.get('/temperature/:min-:max', (req, res) => {
        var max = req.params.max
        var min = req.params.min
        let value = Math.floor(Math.random() * (max-min)) - min
        res.send(value.toString())
    })
    app.get('/', (req, res) => {
        res.send("Hello World!")
    })
    app.get('/schedule/:roomName/:time', (req, res) => {
        var time = req.params.time
        var room = req.params.roomName
        if(schedule.hasOwnProperty(room)) {
            if(time >= 0 && time < 24) {
                res.send(schedule[room][time])
                return
            }
        }
        res.send('invalid parameters for room ' + room + ", and time " + time)
    })
}

module.exports = appRouter