"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Parameter_1 = require("./Parameter");
const Benchmark_1 = require("./Benchmark");
const DelegatedBenchmark_1 = require("./DelegatedBenchmark");
class BenchmarkSuite {
    constructor(name, description) {
        this.parameters = {};
        this.benchmarks = Benchmark_1.Benchmark[];
        this.name = name;
        this.description = description;
    }
    addParameter(parameter) {
        this.parameters[parameter.name] = parameter;
        return parameter;
    }
    createParameter(name, description, defaultValue) {
        let parameter = new Parameter_1.Parameter(name, description, defaultValue);
        this.parameters[name] = parameter;
        return parameter;
    }
    addBenchmark(benchmark) {
        this.benchmarks.push(benchmark);
        return benchmark;
    }
    createBenchmark(name, description, executeCallback) {
        let benchmark = new DelegatedBenchmark_1.DelegatedBenchmark(name, description, executeCallback);
        this.benchmarks.push(benchmark);
        return benchmark;
    }
    setUp() { }
    tearDown() { }
}
exports.BenchmarkSuite = BenchmarkSuite;
//# sourceMappingURL=BenchmarkSuite.js.map