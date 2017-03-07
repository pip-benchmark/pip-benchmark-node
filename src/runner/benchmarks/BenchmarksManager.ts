var _ = require('lodash');
var path = require('path');

import { BenchmarkSuite } from '../../BenchmarkSuite';
import { Benchmark } from '../../Benchmark';
import { BenchmarkSuiteInstance } from './BenchmarkSuiteInstance';
import { BenchmarkInstance } from './BenchmarkInstance';
import { ConfigurationManager } from '../config/ConfigurationManager';
import { ParametersManager } from '../parameters/ParametersManager';

export class BenchmarksManager {
    private _parameters: ParametersManager;
    private _suites: BenchmarkSuiteInstance[] = [];

    public constructor(parameters: ParametersManager) {
        this._parameters = parameters;
    }
 
    public get suites(): BenchmarkSuiteInstance[] {
        return this._suites;
    }

    public get selected(): BenchmarkInstance[] {
        let benchmarks: BenchmarkInstance[] = [];

        _.each(this._suites, (suite) => {
            _.each(suite.benchmarks, (benchmark) => {
                if (benchmark.selected)
                    benchmarks.push(benchmark);
            });
        });

        return benchmarks;
    }

    public selectAll(): void {
        _.each(this._suites, (suite) => {
            _.each(suite.benchmarks, (benchmark) => {
                benchmark.selected = true;
            });
        });
    }

    public selectByName(benchmarkNames: string[]): void {
        _.each(this._suites, (suite) => {
            _.each(suite.benchmarks, (benchmark) => {
                _.each(benchmarkNames, (benchmarkName) => {
                    if (benchmarkName == benchmark.fullName)
                        benchmark.selected = true;
                });
            });
        });
    }

    public select(benchmarks: BenchmarkInstance[]): void {
        _.each(this._suites, (suite) => {
            _.each(suite.benchmarks, (benchmark) => {
                _.each(benchmarks, (anotherBenchmark) => {
                    if (benchmark == anotherBenchmark)
                        benchmark.selected = true;
                });
            });
        });
    }

    public unselectAll(): void {
        _.each(this._suites, (suite) => {
            _.each(suite.benchmarks, (benchmark) => {
                benchmark.selected = false;
            });
        });
    }

    public unselectByName(benchmarkNames: string[]): void {
        _.each(this._suites, (suite) => {
            _.each(suite.benchmarks, (benchmark) => {
                _.each(benchmarkNames, (benchmarkName) => {
                    if (benchmarkName == benchmark.fullName)
                        benchmark.selected = false;
                });
            });
        });
    }

    public unselect(benchmarks: BenchmarkInstance[]): void {
        _.each(this._suites, (suite) => {
            _.each(suite.benchmarks, (benchmark) => {
                _.each(benchmarks, (anotherBenchmark) => {
                    if (benchmark == anotherBenchmark)
                        benchmark.selected = false;
                });
            });
        });
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

        this._suites.push(suite);
        this._parameters.addSuite(suite);
    }

    public addSuitesFromModule(moduleName: string): void {
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
                        this._parameters.addSuite(suite);
                    }
                } catch (ex) {
                    // Ignore
                }
            }
        }
    }

    public removeSuiteByName(suiteName: string): void {
        let suite = _.find(this._suites, (suite) => {
            return suite.name == suiteName;
        });

        if (suite != null) {
            this._parameters.removeSuite(suite);
            this._suites = _.remove(this._suites, (s) => { return s == suite; })
        }
    }

    public removeSuite(suite: any): void {
        if (suite instanceof BenchmarkSuite)
            suite = _.find(this._suites, (s) => { return s.suite == suite });

        if (!(suite instanceof BenchmarkSuiteInstance))
            throw new Error('Wrong suite type');

        this._parameters.removeSuite(suite);
        this._suites = _.remove(this._suites, (s) => s == suite);
    }

    public clear(): void {
        for (let index = 0; index < this._suites.length; index++) {
            let suite = this._suites[index];
            this._parameters.removeSuite(suite);
        }
        
        this._suites = [];
    }

}
