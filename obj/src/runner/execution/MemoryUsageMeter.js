"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var os = require('os');
const BenchmarkMeter_1 = require("./BenchmarkMeter");
class MemoryUsageMeter extends BenchmarkMeter_1.BenchmarkMeter {
    constructor() {
        super();
    }
    performMeasurement() {
        return os.totalmem() - os.freemem();
    }
}
exports.MemoryUsageMeter = MemoryUsageMeter;
//# sourceMappingURL=MemoryUsageMeter.js.map