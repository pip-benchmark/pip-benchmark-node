"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BenchmarkBuilder = void 0;
const BenchmarkRunner_1 = require("./BenchmarkRunner");
class BenchmarkBuilder {
    constructor() {
        this._runner = new BenchmarkRunner_1.BenchmarkRunner();
    }
    forceContinue(isForceContinue = false) {
        this._runner.configuration.forceContinue = isForceContinue;
        return this;
    }
    measureAs(measurementType) {
        this._runner.configuration.measurementType = measurementType;
        return this;
    }
    withNominalRate(nominalRate) {
        this._runner.configuration.nominalRate = nominalRate;
        return this;
    }
    executeAs(executionType) {
        this._runner.configuration.executionType = executionType;
        return this;
    }
    forDuration(duration) {
        this._runner.configuration.duration = duration;
        return this;
    }
    addSuite(suite) {
        this._runner.benchmarks.addSuite(suite);
        return this;
    }
    withParameter(name, value) {
        let parameters = {};
        parameters[name] = value;
        this._runner.parameters.set(parameters);
        return this;
    }
    withBenchmark(name) {
        this._runner.benchmarks.selectByName([name]);
        return this;
    }
    withAllBenchmarks() {
        this._runner.benchmarks.selectAll();
        return this;
    }
    create() {
        let result = this._runner;
        this._runner = new BenchmarkRunner_1.BenchmarkRunner();
        return result;
    }
}
exports.BenchmarkBuilder = BenchmarkBuilder;
//# sourceMappingURL=BenchmarkBuilder.js.map