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
    app.get('/schedule', (req, res) => {
        res.send('' + json2xml(schedule))
    })
}

function Simulator() {
    
    this.timeStep
    this.state = {
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

    this.simulationStates = []

    this.simulate = (initialState, from, to, timeStep) => {
        state = initialState
        this.timeStep = timeStep

    }

    function update(time, previousState){
        var stepState = JSON.parse(JSON.stringify(previousState))
        time += timeStep
        stepState.occupancy = occupancy(time, stepState)
        stepState.co2 = co2(time, stepState)


    }

    function occupancy(time, stepState) {

    }

    function co2(time, stepState) {
        
    }
}

/*	This work is licensed under Creative Commons GNU LGPL License.

	License: http://creativecommons.org/licenses/LGPL/2.1/
   Version: 0.9
	Author:  Stefan Goessner/2006
	Web:     http://goessner.net/ 
*/
function json2xml(o, tab) {
    var toXml = function(v, name, ind) {
       var xml = "";
       if (v instanceof Array) {
          for (var i=0, n=v.length; i<n; i++)
             xml += ind + toXml(v[i], name, ind+"\t") + "\n";
       }
       else if (typeof(v) == "object") {
          var hasChild = false;
          xml += ind + "<" + name;
          for (var m in v) {
             if (m.charAt(0) == "@")
                xml += " " + m.substr(1) + "=\"" + v[m].toString() + "\"";
             else
                hasChild = true;
          }
          xml += hasChild ? ">" : "/>";
          if (hasChild) {
             for (var m in v) {
                if (m == "#text")
                   xml += v[m];
                else if (m == "#cdata")
                   xml += "<![CDATA[" + v[m] + "]]>";
                else if (m.charAt(0) != "@")
                   xml += toXml(v[m], m, ind+"\t");
             }
             xml += (xml.charAt(xml.length-1)=="\n"?ind:"") + "</" + name + ">";
          }
       }
       else {
          xml += ind + "<" + name + ">" + v.toString() +  "</" + name + ">";
       }
       return xml;
    }, xml="";
    for (var m in o)
       xml += toXml(o[m], m, "");
    return tab ? xml.replace(/\t/g, tab) : xml.replace(/\t|\n/g, "");
 }
 

module.exports = appRouter