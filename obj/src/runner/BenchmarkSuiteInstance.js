"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var async = require('async');
const BenchmarkInstance_1 = require("./BenchmarkInstance");
const Parameter_1 = require("../Parameter");
class BenchmarkSuiteInstance {
    constructor(suite) {
        this._benchmarks = [];
        this._suite = suite;
        for (let index = 0; index < suite.benchmarks.length; index++) {
            let benchmark = suite.benchmarks[index];
            this._benchmarks.push(new BenchmarkInstance_1.BenchmarkInstance(this, benchmark));
        }
    }
    get suite() {
        return this._suite;
    }
    get name() {
        return this._suite.name;
    }
    get description() {
        return this._suite.description;
    }
    get parameters() {
        let result = [];
        let parameters = this._suite.parameters;
        for (let prop in parameters) {
            if (parameters.hasOwnProperty(prop)) {
                let parameter = parameters[prop];
                if (parameter instanceof Parameter_1.Parameter)
                    result.push(parameter);
            }
        }
        return result;
    }
    get benchmarks() {
        return this._benchmarks;
    }
    selectAllBenchmarks() {
        for (let index = 0; index < this._benchmarks.length; index++) {
            let benchmark = this._benchmarks[index];
            benchmark.selected = true;
        }
    }
    selectBenchmark(benchmarkName) {
        for (let index = 0; index < this._benchmarks.length; index++) {
            let benchmark = this._benchmarks[index];
            if (benchmark.name == benchmarkName)
                benchmark.selected = true;
        }
    }
    unselectAllBenchmarks() {
        for (let index = 0; index < this._benchmarks.length; index++) {
            let benchmark = this._benchmarks[index];
            benchmark.selected = false;
        }
    }
    unselectBenchmark(benchmarkName) {
        for (let index = 0; index < this._benchmarks.length; index++) {
            let benchmark = this._benchmarks[index];
            if (benchmark.name == benchmarkName)
                benchmark.selected = false;
        }
    }
    setUp(context, callback) {
        this._suite.context = context;
        this._suite.setUp((err) => {
            if (err) {
                callback(err);
                return;
            }
            async.each(this._benchmarks, (benchmark, callback) => {
                if (benchmark.selected)
                    benchmark.setUp(context, callback);
                else
                    callback();
            }, callback);
        });
    }
    tearDown(callback) {
        this._suite.tearDown((err) => {
            if (err) {
                callback(err);
                return;
            }
            async.each(this._benchmarks, (benchmark, callback) => {
                if (benchmark.selected)
                    benchmark.tearDown(callback);
                else
                    callback();
            }, (err) => {
                this._suite.context = null;
                callback(err);
            });
        });
    }
}
exports.BenchmarkSuiteInstance = BenchmarkSuiteInstance;
//# sourceMappingURL=BenchmarkSuiteInstance.js.map