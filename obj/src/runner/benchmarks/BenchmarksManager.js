"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require('lodash');
var path = require('path');
const BenchmarkSuite_1 = require("../../BenchmarkSuite");
const BenchmarkSuiteInstance_1 = require("./BenchmarkSuiteInstance");
class BenchmarksManager {
    constructor(runner) {
        this._suites = [];
        this._runner = runner;
    }
    get suites() {
        return this._suites;
    }
    get selected() {
        let benchmarks = [];
        for (let index = 0; index < this._suites.length; index++) {
            let suite = this._suites[index];
            for (let index2 = 0; index2 < suite.benchmarks.length; index2++) {
                let benchmark = suite.benchmarks[index2];
                if (benchmark.selected) {
                    benchmarks.push(benchmark);
                }
            }
        }
        return benchmarks;
    }
    selectAll() {
        for (let index = 0; index < this._suites.length; index++) {
            let suite = this._suites[index];
            for (let index2 = 0; index2 < suite.benchmarks.length; index2++) {
                let benchmark = suite.benchmarks[index2];
                benchmark.selected = true;
            }
        }
    }
    selectByName(benchmarkNames) {
        for (let index = 0; index < this._suites.length; index++) {
            let suite = this._suites[index];
            for (let index2 = 0; index2 < suite.benchmarks.length; index2++) {
                let benchmark = suite.benchmarks[index2];
                for (let index3 = 0; index3 < benchmarkNames.length; index3++) {
                    let benchmarkName = benchmarkNames[index3];
                    if (benchmarkName == benchmark.fullName)
                        benchmark.selected = true;
                }
            }
        }
    }
    select(benchmarks) {
        for (let index = 0; index < this._suites.length; index++) {
            let suite = this._suites[index];
            for (let index2 = 0; index2 < suite.benchmarks.length; index2++) {
                let benchmark = suite.benchmarks[index2];
                for (let index3 = 0; index3 < benchmarks.length; index3++) {
                    let anotherBenchmark = benchmarks[index3];
                    if (benchmark == anotherBenchmark)
                        benchmark.selected = true;
                }
            }
        }
    }
    unselectAll() {
        for (let index = 0; index < this._suites.length; index++) {
            let suite = this._suites[index];
            for (let index2 = 0; index2 < suite.benchmarks.length; index2++) {
                let benchmark = suite.benchmarks[index2];
                benchmark.selected = false;
            }
        }
    }
    unselectByName(benchmarkNames) {
        for (let index = 0; index < this._suites.length; index++) {
            let suite = this._suites[index];
            for (let index2 = 0; index2 < suite.benchmarks.length; index2++) {
                let benchmark = suite.benchmarks[index2];
                for (let index3 = 0; index3 < benchmarkNames.length; index3++) {
                    let benchmarkName = benchmarkNames[index3];
                    if (benchmarkName == benchmark.fullName)
                        benchmark.selected = false;
                }
            }
        }
    }
    unselect(benchmarks) {
        for (let index = 0; index < this._suites.length; index++) {
            let suite = this._suites[index];
            for (let index2 = 0; index2 < suite.benchmarks.length; index2++) {
                let benchmark = suite.benchmarks[index2];
                for (let index3 = 0; index3 < benchmarks.length; index3++) {
                    let anotherBenchmark = benchmarks[index3];
                    if (benchmark == anotherBenchmark)
                        benchmark.selected = false;
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
        this._runner.process.stop();
        this._suites.push(suite);
        this._runner.parameters.addSuite(suite);
    }
    addSuitesFromModule(moduleName) {
        this._runner.process.stop();
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
                        this._runner.parameters.addSuite(suite);
                    }
                }
                catch (ex) {
                    // Ignore
                }
            }
        }
    }
    findSuite(suiteName) {
        suiteName = suiteName.toLowerCase();
        for (let index = 0; index < this._suites.length; index++) {
            let suite = this._suites[index];
            if (suite.name.toLowerCase() == suiteName)
                return suite;
        }
        return null;
    }
    removeSuiteByName(suiteName) {
        this._runner.process.stop();
        let suite = this.findSuite(suiteName);
        if (suite != null) {
            this._runner.parameters.removeSuite(suite);
            this._suites = _.remove(this._suites, (s) => { return s == suite; });
        }
    }
    removeSuite(suite) {
        if (suite instanceof BenchmarkSuite_1.BenchmarkSuite)
            suite = _.find(this._suites, (s) => { return s.suite == suite; });
        if (!(suite instanceof BenchmarkSuiteInstance_1.BenchmarkSuiteInstance))
            throw new Error('Wrong suite type');
        this._runner.process.stop();
        this._runner.parameters.removeSuite(suite);
        this._suites = _.remove(this._suites, (s) => s == suite);
    }
    clear() {
        this._runner.process.stop();
        for (let index = 0; index < this._suites.length; index++) {
            let suite = this._suites[index];
            this._runner.parameters.removeSuite(suite);
        }
        this._suites = [];
    }
}
exports.BenchmarksManager = BenchmarksManager;
//# sourceMappingURL=BenchmarksManager.js.map