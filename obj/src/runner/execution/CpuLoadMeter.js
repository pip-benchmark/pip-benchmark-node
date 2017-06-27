"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let os = require('os');
const BenchmarkMeter_1 = require("./BenchmarkMeter");
class CpuLoadMeter extends BenchmarkMeter_1.BenchmarkMeter {
    constructor() {
        super();
    }
    clear() {
        this._lastTotalIdle = null;
        this._lastTotal = null;
        super.clear();
    }
    performMeasurement() {
        // Initialize current values
        let currentTime = Date.now();
        let currentTotalIdle = 0;
        let currentTotal = 0;
        // Calculate current values
        let cpus = os.cpus();
        let cpuCount = cpus.length;
        for (let index = 0; index < cpuCount; index++) {
            let cpu = cpus[index];
            for (let type in cpu.times)
                currentTotal += cpu.times[type];
            currentTotalIdle += cpu.times.idle;
        }
        currentTotal = currentTotal / cpuCount;
        currentTotalIdle = currentTotalIdle / cpuCount;
        // Calculate CPU usage
        let result = 0;
        if (this._lastMeasuredTime != null) {
            let elapsed = currentTime - this._lastMeasuredTime;
            // Calculate only for 100 ms or more
            if (elapsed > 100) {
                let totalDifference = currentTotal - this._lastTotal;
                let idleDifference = currentTotalIdle - this._lastTotalIdle;
                result = 100 - ~~(100 * idleDifference / totalDifference);
            }
        }
        // Save current values as last values
        this._lastMeasuredTime = currentTime;
        this._lastTotalIdle = currentTotalIdle;
        this._lastTotal = currentTotal;
        return result;
    }
}
exports.CpuLoadMeter = CpuLoadMeter;
//# sourceMappingURL=CpuLoadMeter.js.map