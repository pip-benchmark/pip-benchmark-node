"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryUsageMeter = void 0;
let os = require('os');
const BenchmarkMeter_1 = require("./BenchmarkMeter");
class MemoryUsageMeter extends BenchmarkMeter_1.BenchmarkMeter {
    constructor() {
        super();
    }
    performMeasurement() {
        return (os.totalmem() - os.freemem()) / 1024 / 1024;
    }
}
exports.MemoryUsageMeter = MemoryUsageMeter;
//# sourceMappingURL=MemoryUsageMeter.js.map