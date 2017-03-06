var _ = require('lodash');
var async = require('async');

import { BenchmarkSuite } from '../../BenchmarkSuite';
import { BenchmarkInstance } from './BenchmarkInstance';
import { IExecutionContext } from '../../IExecutionContext';
import { Parameter } from '../../Parameter';

export class BenchmarkSuiteInstance {
    private _suite: BenchmarkSuite;
    private _benchmarks: BenchmarkInstance[] = [];

    public constructor(suite: BenchmarkSuite) {
        this._suite = suite;
        
        this._benchmarks = _.map(suite.benchmarks, (benchmark) => {
            return new BenchmarkInstance(this, benchmark);
        });
    }

    public get suite(): BenchmarkSuite {
        return this._suite;
    }

    public get name(): string {
        return this._suite.name;
    }

    public get description(): string {
        return this._suite.description;
    }

    public get parameters(): Parameter[] {
        let result: Parameter[] = [];
        let parameters = this._suite.parameters;
        for (let prop in parameters) {
            if (parameters.hasOwnProperty(prop)) {
                let parameter = parameters[prop];
                if (parameter instanceof Parameter)
                    result.push(parameter);
            }
        }
        return result;
    }

    public get benchmarks(): BenchmarkInstance[] {
        return this._benchmarks;
    }

    public get selected(): BenchmarkInstance[] {
        return _.filter(this._benchmarks, (benchmark) => {
            return benchmark.selected;
        });
    }

    public selectAll(): void {
        _.each(this._benchmarks, (benchmark) => {
            benchmark.selected = true;
        });
    }

    public selectByName(benchmarkName: string): void {
        _.each(this._benchmarks, (benchmark) => {
            if (benchmark.name == benchmarkName)
                benchmark.selected = true;
        });
    }

    public unselectAll(): void {
        _.each(this._benchmarks, (benchmark) => {
            benchmark.selected = false;
        });
    }

    public unselectByName(benchmarkName: string): void {
        _.each(this._benchmarks, (benchmark) => {
            if (benchmark.name == benchmarkName)
                benchmark.selected = false;
        });
    }

    public setUp(context: IExecutionContext, callback: (err: any) => void): void {
        this._suite.context = context;

        this._suite.setUp((err) => {
            if (err) {
                callback(err);
                return;
            }

            async.each(
                this._benchmarks,
                (benchmark, callback) => {
                    if (benchmark.selected)
                        benchmark.setUp(context, callback);
                    else
                        callback();
                }, 
                callback
            );
        });
    }

    public tearDown(callback: (err: any) => void): void {
        this._suite.tearDown((err) => {
            if (err) {
                callback(err);
                return;
            }

            async.each(
                this._benchmarks,
                (benchmark, callback) => {
                    if (benchmark.selected)
                        benchmark.tearDown(callback);
                    else
                        callback();
                }, 
                (err) => {
                    this._suite.context = null;
                    
                    callback(err);
                }
            );
        });

    }

}
