var _ = require('lodash');
var path = require('path');

import { BenchmarkSuite } from '../BenchmarkSuite';
import { Benchmark } from '../Benchmark';
import { BenchmarkSuiteInstance } from './BenchmarkSuiteInstance';
import { BenchmarkInstance } from './BenchmarkInstance';

export class BenchmarkSuiteManager {
	private _runner: any;
    private _suites: BenchmarkSuiteInstance[] = [];

    public constructor(runner: any) {
        this._runner = runner;
    }

    public get runner(): any {
        return this._runner;
    }
 
    public get suites(): BenchmarkSuiteInstance[] {
        return this._suites;
    }

    public getSelectedBenchmarks(): BenchmarkInstance[] {
        let benchmarks: BenchmarkInstance[] = [];

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

    public selectAllBenchmarks(): void {
        for (let index = 0; index < this._suites.length; index++) {
            let suite = this._suites[index];
            for (let index2 = 0; index2 < suite.benchmarks.length; index2++) {
                let benchmark = suite.benchmarks[index2];
                benchmark.selected = true;
            }
        }
    }

    public selectBenchmarksByName(benchmarkNames: string[]): void {
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

    public selectBenchmarks(benchmarks: BenchmarkInstance[]): void {
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

    public unselectAllBenchmarks(): void {
        for (let index = 0; index < this._suites.length; index++) {
            let suite = this._suites[index];
            for (let index2 = 0; index2 < suite.benchmarks.length; index2++) {
                let benchmark = suite.benchmarks[index2];
                benchmark.selected = false;
            }
        }
    }

    public unselectBenchmarksByName(benchmarkNames: string[]): void {
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

    public unselectBenchmarks(benchmarks: BenchmarkInstance[]): void {
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

    public addSuiteFromClass(suiteClassName: string): void {
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

    public addSuite(suite: any): void {
        if (suite instanceof BenchmarkSuite)
            suite = new BenchmarkSuiteInstance(suite);
        if (!(suite instanceof BenchmarkSuiteInstance))
            throw Error('Incorrect suite type');

        //!!runner.process.stop();
        this._suites.push(suite);
        //!!runner.configurationManager.createParametersForSuite(suite);
    }

    public loadSuitesFromModule(moduleName: string): void {
        //!!runner.process.stop();

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
                    if (suite instanceof BenchmarkSuite) {
                        suite = new BenchmarkSuiteInstance(suite);
                        this._suites.push(suite);
                        //!!runner.configurationManager.createParametersForSuite(suite);
                    }
                } catch (ex) {
                    // Ignore
                }
            }
        }
    }

    private findSuite(suiteName: string): BenchmarkSuiteInstance {
        suiteName = suiteName.toLowerCase();
        for (let index = 0; index < this._suites.length; index++) {
            let suite = this._suites[index];
            if (suite.name.toLowerCase() == suiteName)
                return suite;
        }
        return null;
    }

    public removeSuiteByName(suiteName: string): void {
        // runner.process.stop();
        // let suite = this.findSuite(suiteName);
        // if (suite != null) {
        //     runner.configurationManager.removeParametersForSuite(suite);

        //     this._suites = _.remove(this._suites, (s) => { return s == suite; })
        // }
    }

    public removeSuite(suite: any): void {
        // if (suite instanceof BenchmarkSuite)
        //     suite = _.find(this._suites, (s) => { return s.suite == suite });

        // if (!(suite instanceof BenchmarkSuiteInstance))
        //     throw new Error('Wrong suite type');

        // runner.process.stop();
        // runner.configurationManager.removeParametersForSuite(suite);

        // this._suites = _.remove(this._suites, (s) => s == suite);
    }

    public removeAllSuites(): void {
        // runner.process.stop();

        // for (let index = 0; index < this._suites.length; index++) {
        //     let suite = this._suites[index];
        //     runner.configurationManager.removeParametersForSuite(suite);
        // }
        
        // this._suites = [];
    }

}
