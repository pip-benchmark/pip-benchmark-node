var async = require('async');

import { MeasurementType } from '../config/MeasurementType';
import { ConfigurationManager } from '../config/ConfigurationManager';
import { ResultsManager } from '../results/ResultsManager';
import { ExecutionState } from '../results/ExecutionState';
import { BenchmarkInstance } from '../benchmarks/BenchmarkInstance';
import { BenchmarkSuiteInstance } from '../benchmarks/BenchmarkSuiteInstance';
import { BenchmarkResult } from '../results/BenchmarkResult';

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
    
    public constructor(configuration: ConfigurationManager, results: ResultsManager, benchmarks: BenchmarkInstance[], embedded?: boolean) {
        super(configuration, results, benchmarks);
        this._embedded = !!embedded;
    }

    public start(callback?: () => void): void {
        this._running = true;

        // Initialize and start
        async.each(
            this._suites, 
            (suite, callback) => {
                let context = new ExecutionContext(this, this._results, suite);
                suite.setUp(context, callback);
            },
            (err) => {
                // Abort if initialization failed
                if (err) {
                    this._results.notifyError('' + err);
                    return;
                }

                if (!this._embedded)
                    this._results.notifyUpdated(ExecutionState.Starting, this._currentResult);
                
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
            
            // Add result
            this._results.add(this._currentResult);

            if (!this._embedded)
                this._results.notifyUpdated(ExecutionState.Completed, this._currentResult);

            // Deinitialize tests
            async.each(
                this._suites, 
                (suite, callback) => {
                    suite.tearDown(callback);
                },
                (err) => {
                    if (callback != null) callback();
                }
            );
        }
    }

    private calculateProportionRanges(): void {
        let totalProportion = 0;
        for (let index = 0; index < this._benchmarks.length; index++) {
            let benchmark = this._benchmarks[index];
            totalProportion += !benchmark.passive ? benchmark.proportion : 0;
        }

        let startProportionRange = 0;
        for (let index = 0; index < this._benchmarks.length; index++) {
            let benchmark = this._benchmarks[index];

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
            let thisBenchmark = this._benchmarks[index];
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
                    if (err != null && this._configuration.forceContinue) {
                        this._results.notifyError('' + err);
                        err = null;
                    }

                    // Increment counter
                    let now = Date.now();
                    if (err == null)
                        this.reportProgress(1, now);

                    // Introduce delay to keep nominal rate
                    if (err == null && this._configuration.measurementType == MeasurementType.Nominal) {
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
            if (this._configuration.forceContinue) {
                this._results.notifyError('' + ex);
                callback(null);
            } else {
                callback(ex);
            }
        }
    }

    private execute(callback?: () => void): void {
        this.calculateProportionRanges();
        this.clear();

        if (this._configuration.measurementType == MeasurementType.Nominal)
            this._ticksPerTransaction = 1000.0 / this._configuration.nominalRate;

        this._lastExecutedTime = Date.now();
        let duration = this._configuration.duration > 0 ? this._configuration.duration : 365 * 24 * 36000;
        this._stopTime = Date.now() + duration * 1000;

        this._benchmarkCount = this._benchmarks.length;
        this._onlyBenchmark = this._benchmarkCount == 1 ? this._benchmarks[0] : null;

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
