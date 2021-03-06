const weather = {
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

const schedule = {
    meetingRoom: {
        monday: [
            0, 0, 0, 0, 0, 0, 0, 0, 5, 3, 8, 8, 9, 8, 8, 3, 7, 5, 6, 0, 0, 0, 0, 0, 0
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
            0, 0, 0, 0, 0, 0, 0, 0, 10, 3, 1, 15, 15, 0, 4, 0, 0, 1, 2, 0, 0, 0, 0, 0, 0
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

const wattsAndTemp = {
    temperature: [
        15, 15.1, 15.2, 15.3, 15.4, 15.5, 15.6, 15.7, 15.8, 15.9, 16, 16.1, 16.2, 16.3, 16.4, 16.5, 16.6, 16.7, 16.8, 16.9, 17, 17.1, 17.2, 17.3, 17.4, 17.5, 17.6, 17.7, 17.8, 17.9, 18, 18.1, 18.2, 18.3, 18.4, 18.5, 18.6, 18.7, 18.8, 18.9, 19, 19.1, 19.2, 19.3, 19.4, 19.5, 19.6, 19.7, 19.8, 19.9, 20, 20.1, 20.2, 20.3, 20.4, 20.5, 20.6, 20.7, 20.8, 20.9, 21, 21.1, 21.2, 21.3, 21.4, 21.5, 21.6, 21.7, 21.8, 21.9, 22, 22.1, 22.2, 22.3, 22.4, 22.5, 22.6, 22.7, 22.8, 22.9, 23, 23.1, 23.2, 23.3, 23.4, 23.5, 23.6, 23.7, 23.8, 23.9, 24, 24.1, 24.2, 24.3, 24.4, 24.5, 24.6, 24.7, 24.8, 24.9, 25, 25.1, 25.2, 25.3, 25.4, 25.5, 25.6, 25.7, 25.8, 25.9, 26, 26.1, 26.2, 26.3, 26.4, 26.5, 26.6, 26.7, 26.8, 26.9, 27, 27.1, 27.2, 27.3, 27.4, 27.5, 27.6, 27.7, 27.8, 27.9, 28, 28.1, 28.2, 28.3, 28.4, 28.5, 28.6, 28.7, 28.8, 28.9, 29, 29.1, 29.2, 29.3, 29.4, 29.5, 29.6, 29.7, 29.8, 29.9, 30
    ],
    watts: [
        5162, 5165, 5167, 5167, 5170, 5172, 5175, 5175, 5177, 5180, 5180, 5182, 5185, 5187, 5187, 5190, 5192, 5192, 5195, 5197, 5200, 5200, 5202, 5205, 5207, 5207, 5210, 5212, 5212, 5215, 5217, 5220, 5220, 5222, 5225, 5225, 5227, 5230, 5232, 5232, 5235, 5237, 5237, 5240, 5242, 5245, 5245, 5247, 5250, 5250, 5252, 5255, 5257, 5257, 5260, 5262, 5262, 5265, 5268, 5270, 5270, 5273, 5275, 5275, 5278, 5280, 5283, 5283, 5285, 5288, 5290, 5290, 5293, 5295, 5295, 5298, 5300, 5303, 5303, 5305, 5308, 5308, 5310, 5313, 5315, 5315, 5318, 5320, 5320, 5323, 5325, 5328, 5328, 5330, 5333, 5333, 5335, 5338, 5340, 5340, 5343, 5345, 5345, 5348, 5350, 5353, 5353, 5355, 5358, 5358, 5360, 5363, 5365, 5365, 5368, 5370, 5373, 5373, 5375, 5378, 5378, 5380, 5383, 5385, 5385, 5388, 5390, 5390, 5393, 5395, 5398, 5398, 5400, 5403, 5403, 5405, 5408, 5410, 5410, 5413, 5415, 5415, 5418, 5421, 5423, 5423, 5426, 5428, 5428, 5431, 5433
    ]
}


function forecastTemperature(elapsed, season) {
    if (season !== 'summer' && season !== 'winter') return undefined

    let day = Math.floor((elapsed / 60.0) / 24.0) % 7
    let hour = Math.floor(elapsed / 60.0) % 24
    return weather[season][day][hour]
}

function occupancy(elapsed) {
    let day = Math.floor((elapsed / 60.0) / 24.0) % 7
    let hour = Math.floor(elapsed / 60.0) % 24

    let strDay = ""
    switch (day) {
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
    return schedule.meetingRoom[strDay][hour]
}

function temperatureChange(currentTemperature, newHeating, timestep) {
    //newHeating /= timestep / 60 // reverse timestep accounting

    // let newTemp = wattsAndTemp.temperature[wattsAndTemp.temperature.length - 1]
    // for (let i = 0; i < wattsAndTemp.temperature.length; i++) {
    //     if (wattsAndTemp.watts[i] / 1000 > newHeating) {
    //         newTemp = wattsAndTemp.temperature[i]
    //         break
    //     }
    // }

    var base = 5252 / 60
    var diff = newHeating - base
    var changeRate = 0.0018 * 60
    var res = diff / changeRate
    temp = 20 + (res / 10)

    return temp

    //return newTemp
}

function heatpumpProduction(consumption, heatingType, ti, to) {
    // let cop = ti-to != 0 ? (ti / (ti - to)) - modifier : 0
    // let modifier = (heatingType === 'heating' ? 1 :
    // (heatingType === 'cooling' ? -1 : 0))
    // return consumption * cop
    return consumption * 2.5 * (heatingType === 'heating' ? 1 : (heatingType === 'cooling' ? -1 : 0))
    // Need to revise the cop formula
}

module.exports = {
    temperatureChange: temperatureChange,
    heatpumpProduction: heatpumpProduction,
    occupancy: occupancy,
    forecastTemperature: forecastTemperature,
    wattsAndTemp: wattsAndTemp
}