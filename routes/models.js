const services = require('./services.js')

function heatLossVentilation(state) {
    let cp = 1 // specific heat air // 1 seems OK
    let p = 1.2 // density of air // Approximately... (https://en.wikipedia.org/wiki/Density_of_air)
    let qv = state.appliances.ventilation.fans.m3s * state.appliances.ventilation.fans.count // air volume flow
    let ti = state.temperature
    let t0 = state.outsideTemperature

    let Hv = cp * p * qv * (ti - t0)
    
    state.log.ventilationLoss = (state.appliances.ventilation.on ? Hv : 0) * (state.log.timestep / 60)
    return state.appliances.ventilation.on ? Hv : 0
}

function heatLossTransmission(state) {
    let A = (state.dim.x * state.dim.y * 4.04) + (state.dim.x * state.dim.y * 0.248) + (state.dim.z * state.dim.y * 2 * 0.248) + (state.dim.x * state.dim.z * 2 * 0.248)
    let Ti = state.temperature
    let Te = state.outsideTemperature

    let Qtr = (A) * (Ti - Te)

    state.log.transmissionLoss = Qtr * (state.log.timestep / 60)
    return Qtr
}

function heatGainInternal(state) {
    let Af = state.dim.x * state.dim.y
    let qint = 130 * state.occupancy / Af

    let Qint = qint * Af

    state.log.internalGain = Qint * (state.log.timestep / 60)
    return Qint
}

function heatGainAppliance(state) {
    let heatpump = state.appliances.heatpump
    let gain = services.heatpumpProduction(heatpump.watts, heatpump.on,
        state.temperature, state.outsideTemperature)

    state.log.applianceGain = gain * (state.log.timestep / 60)
    return gain
}

// timestep should be timespan in minutes
function heatChange(state, timestep) {
    let internalGain = heatGainInternal(state)
    let applianceGain = heatGainAppliance(state)
    let transmissionLoss = -heatLossTransmission(state)
    let ventilationLoss = -heatLossVentilation(state)
    let change = internalGain + applianceGain + transmissionLoss + ventilationLoss
    //console.log("CHANGE:  " + change)
    return change / 1000 * (timestep / 60) // x/1000 -> to kWh
}

function co2(state, timestep) {
    let time = timestep / 60
    let V = state.volume
    let q = state.occupancy * 0.1
    let c0 = state.co2

    if(!state.appliances.ventilation.on) {
        var res = (q / V * time) + c0
        return res
    } else {
        let n = 3600 * (state.appliances.ventilation.fans.m3s * state.appliances.ventilation.fans.count) / V
        let cj = 0.0004

        let a = (q / (n * V))
        let b = (1 / Math.exp(n * time))
        let c = (1 / Math.exp(n * time))
        let co2 = (a * (1 - b)) + ((c0 - cj) * c) + cj
        console.log(co2)
        return co2
    }










}

function consumption(state, timestep) {
    let heating = state.appliances.heatpump.on !== 'off' ? state.appliances.heatpump.watts : 0
    let ventilation = state.appliances.ventilation.on ? state.appliances.ventilation.fans * state.appliances.ventilation.watts : 0
    //let passiveUse = state.occupancy > 0 ? (state.occupancy * 15) + 100 : 0 // Users + lighting
    let wh = (heating + ventilation/* + passiveUse*/) * (timestep / 60)
    return wh
}


module.exports = {
    heatChange: heatChange,
    co2: co2,
    consumption: consumption
}