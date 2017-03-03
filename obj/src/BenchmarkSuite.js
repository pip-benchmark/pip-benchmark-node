"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Parameter_1 = require("./Parameter");
const DelegatedBenchmark_1 = require("./DelegatedBenchmark");
class BenchmarkSuite {
    constructor(name, description) {
        this._parameters = {};
        this._benchmarks = [];
        this._name = name;
        this._description = description;
    }
    get name() {
        return this._name;
    }
    get description() {
        return this._description;
    }
    get context() {
        return this._context;
    }
    set context(value) {
        this._context = value;
    }
    get parameters() {
        return this._parameters;
    }
    addParameter(parameter) {
        this._parameters[parameter.name] = parameter;
        return parameter;
    }
    createParameter(name, description, defaultValue) {
        let parameter = new Parameter_1.Parameter(name, description, defaultValue);
        this._parameters[name] = parameter;
        return parameter;
    }
    get benchmarks() {
        return this._benchmarks;
    }
    addBenchmark(benchmark) {
        this._benchmarks.push(benchmark);
        return benchmark;
    }
    createBenchmark(name, description, executeCallback) {
        let benchmark = new DelegatedBenchmark_1.DelegatedBenchmark(name, description, executeCallback);
        this._benchmarks.push(benchmark);
        return benchmark;
    }
    setUp(callback) {
        callback(null);
    }
    tearDown(callback) {
        callback(null);
    }
}
exports.BenchmarkSuite = BenchmarkSuite;
//# sourceMappingURL=BenchmarkSuite.js.map