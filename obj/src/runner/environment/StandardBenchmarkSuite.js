"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StandardBenchmarkSuite = void 0;
const BenchmarkSuite_1 = require("../../BenchmarkSuite");
const DefaultCpuBenchmark_1 = require("./DefaultCpuBenchmark");
const DefaultDiskBenchmark_1 = require("./DefaultDiskBenchmark");
const DefaultVideoBenchmark_1 = require("./DefaultVideoBenchmark");
class StandardBenchmarkSuite extends BenchmarkSuite_1.BenchmarkSuite {
    constructor() {
        super("StandardBenchmark", "Measures overall system performance");
        this._cpuBenchmark = new DefaultCpuBenchmark_1.DefaultCpuBenchmark();
        this.addBenchmark(this._cpuBenchmark);
        this._diskBenchmark = new DefaultDiskBenchmark_1.DefaultDiskBenchmark();
        this.addBenchmark(this._diskBenchmark);
        this._videoBenchmark = new DefaultVideoBenchmark_1.DefaultVideoBenchmark();
        this.addBenchmark(this._videoBenchmark);
        this.createParameter("FilePath", "Path where test file is located on disk", "");
        this.createParameter("FileSize", "Size of the test file", "102400000");
        this.createParameter("ChunkSize", "Size of a chunk that read or writter from/to test file", "1024000");
        this.createParameter("OperationTypes", "Types of test operations: read, write or all", "all");
    }
    get cpuBenchmark() {
        return this._cpuBenchmark;
    }
    get diskBenchmark() {
        return this._diskBenchmark;
    }
    get videoBenchmark() {
        return this._videoBenchmark;
    }
}
exports.StandardBenchmarkSuite = StandardBenchmarkSuite;
//# sourceMappingURL=StandardBenchmarkSuite.js.map