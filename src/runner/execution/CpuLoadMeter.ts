var os = require('os');

import { BenchmarkMeter } from './BenchmarkMeter';

export class CpuLoadMeter extends BenchmarkMeter {
    private _lastTime: number;
    private _lastTotalIdle: number;
    private _lastTotal: number;

    public constructor() {
        super();
    }

    public reset(): void {
        this._lastTime = null;
        this._lastTotalIdle = null;
        this._lastTotal = null;

        super.reset();
    }

    protected performMeasurement(): number {
        // Initialize current values
        let currentTime = new Date().getTime();
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
        if (this._lastTime != null) {
            let elapsed = currentTime - this._lastTime;
            // Calculate only for 100 ms or more
            if (elapsed > 100) {
                let totalDifference = currentTotal - this._lastTotal;
                let idleDifference = currentTotalIdle - this._lastTotalIdle;
                result = 100 - ~~(100 * idleDifference / totalDifference);
            }
        }

        // Save current values as last values
        this._lastTime = currentTime;
        this._lastTotalIdle = currentTotalIdle;
        this._lastTotal = currentTotal;

        return result;
    }

}
