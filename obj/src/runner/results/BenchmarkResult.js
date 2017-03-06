"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Measurement_1 = require("./Measurement");
class BenchmarkResult {
    constructor() {
        this.benchmarks = [];
        this.startTime = Date.now();
        this.elapsedTime = 0;
        this.performanceMeasurement = new Measurement_1.Measurement(0, 0, 0, 0);
        this.cpuLoadMeasurement = new Measurement_1.Measurement(0, 0, 0, 0);
        this.memoryUsageMeasurement = new Measurement_1.Measurement(0, 0, 0, 0);
        this.errors = [];
    }
}
exports.BenchmarkResult = BenchmarkResult;
//# sourceMappingURL=BenchmarkResult.js.map