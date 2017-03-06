var async = require('async');

import { MeasurementType } from '../MeasurementType';
import { ExecutionState } from '../ExecutionState';
import { BenchmarkInstance } from '../BenchmarkInstance';
import { BenchmarkSuiteInstance } from '../BenchmarkSuiteInstance';
import { BenchmarkResult } from '../BenchmarkResult';

import { ExecutionContext } from './ExecutionContext';
import { ExecutionStrategy } from './ExecutionStrategy';
import { ProportionalExecutionStrategy } from './ProportionalExecutionStrategy';

export class SequencialExecutionStrategy extends ExecutionStrategy {
    private _running: boolean = false;
    private _current: ProportionalExecutionStrategy;
    private _results: BenchmarkResult[] = [];
    private _timeout: any;

    public constructor(process: any, benchmarks: BenchmarkInstance[]) {
        super(process, benchmarks);
    }

    public start(callback?: () => void): void {
        if (this.process().duration() <= 0)
            throw new Error("Duration was not set");

        this.notifyResultUpdate(ExecutionState.Starting);

        // Start control thread
        //setTimeout(() => { this.execute(); }, 0);
        this.execute(callback);
    }

    public stop(callback?: () => void): void {
        if (this._timeout != null) {
            clearTimeout(this._timeout);
            this._timeout = null;
        }

        if (this._running) {
            this._running = false;

            if (this._current != null)
                this._current.stop();

            this.notifyResultUpdate(ExecutionState.Completed);
        }

        if (callback) callback();
    }

    public getResults(): BenchmarkResult[] {
        return this._results;
    }

    private execute(callback?: () => void) {
        async.eachSeries(
            this.benchmarks,
            (benchmark, callback) => {
                // Skip if benchmarking was interrupted
                if (!this._running) {
                    callback();
                    return;
                }

                // Start embedded strategy
                this._current = new ProportionalExecutionStrategy(this.process, [benchmark], true);
                this._current.start();

                this._timeout = setTimeout(
                    () => {
                        // Populate results
                        let results = this._current.getResults();
                        if (results.length > 0)
                            this._results.push(results[0]);

                        this._current.stop(() => {
                            this._current = null;
                            
                            callback();
                        });
                    }, 
                    this.process.delay * 1000
                );
            },
            (err) => {
                this.stop(callback);
            }
        )
    }

}
