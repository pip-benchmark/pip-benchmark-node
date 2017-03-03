var async = require('async');

import { BenchmarkSuite } from '../BenchmarkSuite';
import { BenchmarkInstance } from './BenchmarkInstance';
import { IExecutionContext } from '../IExecutionContext';
import { Parameter } from '../Parameter';

export class BenchmarkSuiteInstance {
    private _suite: BenchmarkSuite;
    private _benchmarks: BenchmarkInstance[] = [];

    public constructor(suite: BenchmarkSuite) {
        this._suite = suite;
        
        for (let index = 0; index < suite.benchmarks.length; index++) {
            let benchmark = suite.benchmarks[index];
            this._benchmarks.push(new BenchmarkInstance(this, benchmark));
        }
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

    public selectAllBenchmarks(): void {
        for (let index = 0; index < this._benchmarks.length; index++) {
            let benchmark = this._benchmarks[index];
            benchmark.selected = true;
        }
    }

    public selectBenchmark(benchmarkName: string): void {
        for (let index = 0; index < this._benchmarks.length; index++) {
            let benchmark = this._benchmarks[index];
            if (benchmark.name == benchmarkName)
                benchmark.selected = true;
        }
    }

    public unselectAllBenchmarks(): void {
        for (let index = 0; index < this._benchmarks.length; index++) {
            let benchmark = this._benchmarks[index];
            benchmark.selected = false;
        }
    }

    public unselectBenchmark(benchmarkName: string): void {
        for (let index = 0; index < this._benchmarks.length; index++) {
            let benchmark = this._benchmarks[index];
            if (benchmark.name == benchmarkName)
                benchmark.selected = false;
        }
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
                        benchmark.tearDown(context, callback);
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
