"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Benchmark_1 = require("./Benchmark");
class PassiveBenchmark extends Benchmark_1.Benchmark {
    constructor(name, description) {
        super(name, description);
    }
    execute() {
        throw new Error("Active measurement via Execute is not allow for passive benchmarks");
    }
}
exports.PassiveBenchmark = PassiveBenchmark;
//# sourceMappingURL=PassiveBenchmark.js.map