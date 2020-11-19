"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtilityBenchmarkSuite = void 0;
const BenchmarkSuite_1 = require("../BenchmarkSuite");
class UtilityBenchmarkSuite extends BenchmarkSuite_1.BenchmarkSuite {
    constructor() {
        super("Utility", "Set of utility benchmark tests");
        this.createBenchmark("Empty", "Does nothing", this.executeEmpty);
        this.createBenchmark("RandomDelay", "Introduces random delay to measuring thread", this.executeRandomDelay);
    }
    executeEmpty(callback) {
        // This is an empty benchmark
        callback(null);
    }
    executeRandomDelay(callback) {
        setTimeout(() => { callback(null); }, Math.random() * 1000);
    }
}
exports.UtilityBenchmarkSuite = UtilityBenchmarkSuite;
//# sourceMappingURL=UtilityBenchmarkSuite.js.map