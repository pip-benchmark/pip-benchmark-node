"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let path = require('path');
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
    get isSelected() {
        let benchmarks = [];
        for (let suite of this._suites) {
            for (let benchmark of suite.benchmarks) {
                if (benchmark.isSelected)
                    benchmarks.push(benchmark);
            }
        }
        return benchmarks;
    }
    selectAll() {
        for (let suite of this._suites) {
            for (let benchmark of suite.benchmarks) {
                benchmark.isSelected = true;
            }
        }
    }
    selectByName(benchmarkNames) {
        for (let suite of this._suites) {
            for (let benchmark of suite.benchmarks) {
                for (let benchmarkName of benchmarkNames) {
                    if (benchmarkName == benchmark.fullName)
                        benchmark.isSelected = true;
                }
            }
        }
    }
    select(benchmarks) {
        for (let suite of this._suites) {
            for (let benchmark of suite.benchmarks) {
                for (let anotherBenchmark of benchmarks) {
                    if (benchmark == anotherBenchmark)
                        benchmark.isSelected = true;
                }
            }
        }
    }
    unselectAll() {
        for (let suite of this._suites) {
            for (let benchmark of suite.benchmarks) {
                benchmark.isSelected = false;
            }
        }
    }
    unselectByName(benchmarkNames) {
        for (let suite of this._suites) {
            for (let benchmark of suite.benchmarks) {
                for (let benchmarkName of benchmarkNames) {
                    if (benchmarkName == benchmark.fullName)
                        benchmark.isSelected = false;
                }
            }
        }
    }
    unselect(benchmarks) {
        for (let suite of this._suites) {
            for (let benchmark of suite.benchmarks) {
                for (let anotherBenchmark of benchmarks) {
                    if (benchmark == anotherBenchmark)
                        benchmark.isSelected = false;
                }
            }
        }
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