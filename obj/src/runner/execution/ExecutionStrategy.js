"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecutionStrategy = void 0;
let _ = require('lodash');
class ExecutionStrategy {
    constructor(configuration, results, execution, benchmarks) {
        this._configuration = configuration;
        this._results = results;
        this._execution = execution;
        this._benchmarks = benchmarks;
        this._activeBenchmarks = this.getActiveBenchmarks(benchmarks);
        this._suites = this.getBenchmarkSuites(benchmarks);
    }
    getActiveBenchmarks(benchmarks) {
        return _.filter(benchmarks, (benchmark) => {
            return !benchmark.passive;
        });
    }
    getBenchmarkSuites(benchmarks) {
        let suites = [];
        for (let index = 0; index < benchmarks.length; index++) {
            let benchmark = benchmarks[index];
            let suite = benchmark.suite;
            if (!_.some(suites, (s) => s == suite))
                suites.push(suite);
        }
        return suites;
    }
}
exports.ExecutionStrategy = ExecutionStrategy;
//# sourceMappingURL=ExecutionStrategy.js.map