"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BenchmarkSuite_1 = require("../BenchmarkSuite");
const StandardCpuBenchmark_1 = require("./StandardCpuBenchmark");
const StandardDiskBenchmark_1 = require("./StandardDiskBenchmark");
const StandardVideoBenchmark_1 = require("./StandardVideoBenchmark");
class StandardHardwareBenchmarkSuite extends BenchmarkSuite_1.BenchmarkSuite {
    constructor() {
        super("StandardBenchmark", "Standard hardware benchmark");
        this._cpuBenchmarkTest = new StandardCpuBenchmark_1.StandardCpuBenchmark();
        this.addBenchmark(this._cpuBenchmarkTest);
        this._diskBenchmarkTest = new StandardDiskBenchmark_1.StandardDiskBenchmark();
        this.addBenchmark(this._diskBenchmarkTest);
        this._videoBenchmarkTest = new StandardVideoBenchmark_1.StandardVideoBenchmark();
        this.addBenchmark(this._videoBenchmarkTest);
    }
    get cpuBenchmarkTest() {
        return this._cpuBenchmarkTest;
    }
    get diskBenchmarkTest() {
        return this._diskBenchmarkTest;
    }
    get videoBenchmarkTest() {
        return this._videoBenchmarkTest;
    }
}
exports.StandardHardwareBenchmarkSuite = StandardHardwareBenchmarkSuite;
//# sourceMappingURL=StandardHardwareBenchmarkSuite.js.map