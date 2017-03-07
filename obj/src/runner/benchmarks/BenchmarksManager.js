"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require('lodash');
var path = require('path');
const BenchmarkSuite_1 = require("../../BenchmarkSuite");
const BenchmarkSuiteInstance_1 = require("./BenchmarkSuiteInstance");
class BenchmarksManager {
    constructor(parameters) {
        this._suites = [];
        this._parameters = parameters;
    }
    get suites() {
        return this._suites;
    }
    get selected() {
        let benchmarks = [];
        _.each(this._suites, (suite) => {
            _.each(suite.benchmarks, (benchmark) => {
                if (benchmark.selected)
                    benchmarks.push(benchmark);
            });
        });
        return benchmarks;
    }
    selectAll() {
        _.each(this._suites, (suite) => {
            _.each(suite.benchmarks, (benchmark) => {
                benchmark.selected = true;
            });
        });
    }
    selectByName(benchmarkNames) {
        _.each(this._suites, (suite) => {
            _.each(suite.benchmarks, (benchmark) => {
                _.each(benchmarkNames, (benchmarkName) => {
                    if (benchmarkName == benchmark.fullName)
                        benchmark.selected = true;
                });
            });
        });
    }
    select(benchmarks) {
        _.each(this._suites, (suite) => {
            _.each(suite.benchmarks, (benchmark) => {
                _.each(benchmarks, (anotherBenchmark) => {
                    if (benchmark == anotherBenchmark)
                        benchmark.selected = true;
                });
            });
        });
    }
    unselectAll() {
        _.each(this._suites, (suite) => {
            _.each(suite.benchmarks, (benchmark) => {
                benchmark.selected = false;
            });
        });
    }
    unselectByName(benchmarkNames) {
        _.each(this._suites, (suite) => {
            _.each(suite.benchmarks, (benchmark) => {
                _.each(benchmarkNames, (benchmarkName) => {
                    if (benchmarkName == benchmark.fullName)
                        benchmark.selected = false;
                });
            });
        });
    }
    unselect(benchmarks) {
        _.each(this._suites, (suite) => {
            _.each(suite.benchmarks, (benchmark) => {
                _.each(benchmarks, (anotherBenchmark) => {
                    if (benchmark == anotherBenchmark)
                        benchmark.selected = false;
                });
            });
        });
    }
    addSuiteFromClass(suiteClassName) {
        if (suiteClassName == null || suiteClassName.length == 0)
            return;
        let moduleName = suiteClassName;
        suiteClassName = null;
        let pos = moduleName.indexOf(',');
        if (pos >= 0) {
            let moduleAndClassName = moduleName;
            moduleName = moduleAndClassName.substring(0, pos);
            suiteClassName = moduleAndClassName.substring(pos + 1);
        }
        if (moduleName.startsWith('.'))
            moduleName = path.resolve(moduleName);
        let suite = require(moduleName);
        if (suite == null)
            throw new Error('Module ' + moduleName + ' was not found');
        if (suiteClassName != null && suiteClassName.length > 0)
            suite = suite[suiteClassName];
        if (_.isFunction(suite)) {
            suite = new suite();
            this.addSuite(suite);
        }
    }
    addSuite(suite) {
        if (suite instanceof BenchmarkSuite_1.BenchmarkSuite)
            suite = new BenchmarkSuiteInstance_1.BenchmarkSuiteInstance(suite);
        if (!(suite instanceof BenchmarkSuiteInstance_1.BenchmarkSuiteInstance))
            throw Error('Incorrect suite type');
        this._suites.push(suite);
        this._parameters.addSuite(suite);
    }
    addSuitesFromModule(moduleName) {
        if (moduleName.startsWith('.'))
            moduleName = path.resolve(moduleName);
        let suites = require(moduleName);
        if (suites == null)
            throw new Error('Module ' + moduleName + ' was not found');
        for (let prop in suites) {
            let suite = suites[prop];
            if (_.isFunction(suite) && suite.name.endsWith('Suite')) {
                try {
                    suite = new suite();
                    if (suite instanceof BenchmarkSuite_1.BenchmarkSuite) {
                        suite = new BenchmarkSuiteInstance_1.BenchmarkSuiteInstance(suite);
                        this._suites.push(suite);
                        this._parameters.addSuite(suite);
                    }
                }
                catch (ex) {
                    // Ignore
                }
            }
        }
    }
    removeSuiteByName(suiteName) {
        let suite = _.find(this._suites, (suite) => {
            return suite.name == suiteName;
        });
        if (suite != null) {
            this._parameters.removeSuite(suite);
            this._suites = _.remove(this._suites, (s) => { return s == suite; });
        }
    }
    removeSuite(suite) {
        if (suite instanceof BenchmarkSuite_1.BenchmarkSuite)
            suite = _.find(this._suites, (s) => { return s.suite == suite; });
        if (!(suite instanceof BenchmarkSuiteInstance_1.BenchmarkSuiteInstance))
            throw new Error('Wrong suite type');
        this._parameters.removeSuite(suite);
        this._suites = _.remove(this._suites, (s) => s == suite);
    }
    clear() {
        for (let index = 0; index < this._suites.length; index++) {
            let suite = this._suites[index];
            this._parameters.removeSuite(suite);
        }
        this._suites = [];
    }
}
exports.BenchmarksManager = BenchmarksManager;
//# sourceMappingURL=BenchmarksManager.js.map