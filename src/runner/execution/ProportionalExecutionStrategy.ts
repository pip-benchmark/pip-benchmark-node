var async = require('async');

import { MeasurementType } from '../MeasurementType';
import { ExecutionState } from '../ExecutionState';
import { BenchmarkInstance } from '../benchmarks/BenchmarkInstance';
import { BenchmarkSuiteInstance } from '../benchmarks/BenchmarkSuiteInstance';
import { BenchmarkResult } from '../BenchmarkResult';

import { ExecutionContext } from './ExecutionContext';
import { ExecutionStrategy } from './ExecutionStrategy';

export class ProportionalExecutionStrategy extends ExecutionStrategy {
    private _embedded: boolean = false;
    private _running: boolean = false;
    private _ticksPerTransaction: number = 0;
    private _lastExecutedTime: number;
    private _stopTime: number;
    private _benchmarkCount: number;
    private _onlyBenchmark: BenchmarkInstance;
    private _timeout: any;
    
    public constructor(process: any, benchmarks: BenchmarkInstance[], embedded?: boolean) {
        super(process, benchmarks);
        this._embedded = !!embedded;
    }

    public start(callback?: () => void): void {
        this._running = true;

        // Initialize and start
        async.each(
            this.suites, 
            (suite, callback) => {
                let context = new ExecutionContext(this, suite);
                suite.setUp(context, callback);
            },
            (err) => {
                // Abort if initialization failed
                if (err) {
                    this.reportError('' + err);
                    return;
                }

                if (!this._embedded)
                    this.notifyResultUpdate(ExecutionState.Starting);
                
                this.execute(callback);
            }
        );
    }

    public stop(callback?: () => void): void {
        // Interrupt any wait
        if (this._timeout != null) {
            clearTimeout(this._timeout);
            this._timeout = null;
        }
        
        // Stop and cleanup execution
        if (this._running) {
            this._running = false;
            
            if (!this._embedded)
                this.notifyResultUpdate(ExecutionState.Completed);

            // Deinitialize tests
            async.each(
                this.suites, 
                (suite, callback) => {
                    suite.tearDown(callback);
                },
                (err) => {
                    if (callback != null) callback();
                }
            );
        }
    }

    public getResults(): BenchmarkResult[] {
        let results: BenchmarkResult[] = [];

        if (this.currentResult != null)
            results.push(this.currentResult);

        return results;
    }

    private calculateProportionRanges(): void {
        let totalProportion = 0;
        for (let index = 0; index < this.benchmarks.length; index++) {
            let benchmark = this.benchmarks[index];
            totalProportion += !benchmark.passive ? benchmark.proportion : 0;
        }

        let startProportionRange = 0;
        for (let index = 0; index < this.benchmarks.length; index++) {
            let benchmark = this.benchmarks[index];

            if (benchmark.passive) {
                benchmark.startRange = 0;
                benchmark.endRange = 0;
            } else {
                let normalizedProportion = benchmark.proportion / totalProportion;
                benchmark.startRange = startProportionRange;
                benchmark.endRange = startProportionRange + normalizedProportion;
                startProportionRange += normalizedProportion;
            }
        }
    }

    private chooseBenchmarkProportionally(): BenchmarkInstance {
        if (this._benchmarkCount == 0) return null;

        let proportion = Math.random();
        for (let index = 0; index < this._benchmarkCount; index++) {
            let thisBenchmark = this.benchmarks[index];
            if (thisBenchmark.withinRange(proportion))
                return thisBenchmark;
        }

        return null;
    }

    private executeDelay(delay: number, callback: (err: any) => void): void {
        this._timeout = setTimeout(() => {
            this._timeout = null;
            this._lastExecutedTime = Date.now();

            callback(null)
        }, delay);
    }

    protected executeBenchmark(benchmark: BenchmarkInstance, callback: (err: any) => void): void {
        try {
            if (benchmark == null || benchmark.passive) {
                // Delay if benchmarks are passive
                this.executeDelay(500, callback);
            } else {
                // Execute active benchmark
                benchmark.execute((err) => {
                    // Process force continue
                    if (err != null && this.process.forceContinue) {
                        this.reportError('' + err);
                        err = null;
                    }

                    // Increment counter
                    let now = Date.now();
                    if (err == null)
                        this.reportProgress(1, now);

                    // Introduce delay to keep nominal rate
                    if (err == null && this.process.measurementType == MeasurementType.Nominal) {
                        let delay = this._ticksPerTransaction - (now - this._lastExecutedTime);
                        this._lastExecutedTime = now;

                        if (delay > 0) this.executeDelay(delay, callback);
                        else callback(err);
                    } else {
                        this._lastExecutedTime = now;
                        callback(err);
                    }
                });
            }
        } catch (ex) {
            // Process force continue
            if (this.process.forceContinue) {
                this.reportError('' + ex);
                callback(null);
            } else {
                callback(ex);
            }
        }
    }

    private execute(callback?: () => void): void {
        this.calculateProportionRanges();
        this.reset();

        if (this.process.measurementType == MeasurementType.Nominal)
            this._ticksPerTransaction = 1000.0 / this.process.nominalRate;

        this._lastExecutedTime = Date.now();
        let duration = this.process.duration > 0 ? this.process.duration : 365 * 24 * 36000;
        this._stopTime = Date.now() + duration * 1000;

        this._benchmarkCount = this.benchmarks.length;
        this._onlyBenchmark = this._benchmarkCount == 1 ? this.benchmarks[0] : null;

        // Execute benchmarks
        async.whilst(
            () => {
                return this._running && this._lastExecutedTime < this._stopTime;
            },
            (callback) => {
                let benchmark = this._onlyBenchmark != null 
                    ? this._onlyBenchmark : this.chooseBenchmarkProportionally();
                let called = 0;
                this.executeBenchmark(
                    benchmark, 
                    (err) => { process.nextTick(callback, err); }
                );
            }, 
            (err) => {
                this.stop(callback);
            }
        );
    }
}
