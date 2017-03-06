"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require('lodash');
var async = require('async');
const MeasurementType_1 = require("../config/MeasurementType");
const ExecutionContext_1 = require("./ExecutionContext");
const ExecutionStrategy_1 = require("./ExecutionStrategy");
const ResultAggregator_1 = require("./ResultAggregator");
class ProportionalExecutionStrategy extends ExecutionStrategy_1.ExecutionStrategy {
    constructor(configuration, results, benchmarks) {
        super(configuration, results, benchmarks);
        this._running = false;
        this._ticksPerTransaction = 0;
        this._aggregator = new ResultAggregator_1.ResultAggregator(results, benchmarks);
    }
    start(callback) {
        this._running = true;
        this._aggregator.start();
        // Initialize and start
        async.each(this._suites, (suite, callback) => {
            let context = new ExecutionContext_1.ExecutionContext(suite, this._aggregator, this.stop);
            suite.setUp(context, callback);
        }, (err) => {
            // Abort if initialization failed
            if (err) {
                this._aggregator.reportError(err);
                callback(err);
                return;
            }
            // Execute benchmarks
            this.execute(callback);
        });
    }
    stop(callback) {
        // Interrupt any wait
        if (this._timeout != null) {
            clearTimeout(this._timeout);
            this._timeout = null;
        }
        // Stop and cleanup execution
        if (this._running) {
            this._running = false;
            this._aggregator.stop();
            // Deinitialize tests
            async.each(this._suites, (suite, callback) => {
                suite.tearDown(callback);
            }, (err) => {
                if (callback)
                    callback(err);
            });
        }
        else {
            if (callback)
                callback(null);
        }
    }
    calculateProportionalRanges() {
        let totalProportion = 0;
        _.each(this._activeBenchmarks, (benchmark) => {
            totalProportion += benchmark.proportion;
        });
        let startRange = 0;
        _.each(this._activeBenchmarks, (benchmark) => {
            let normalizedProportion = benchmark.proportion / totalProportion;
            benchmark.startRange = startRange;
            benchmark.endRange = startRange + normalizedProportion;
            startRange += normalizedProportion;
        });
    }
    chooseBenchmarkProportionally() {
        let proportion = Math.random();
        return _.find(this._activeBenchmarks, (benchmark) => {
            return benchmark.withinRange(proportion);
        });
    }
    executeDelay(delay, callback) {
        this._timeout = setTimeout(() => {
            this._timeout = null;
            this._lastExecutedTime = Date.now();
            callback(null);
        }, delay);
    }
    executeBenchmark(benchmark, callback) {
        try {
            if (benchmark == null || benchmark.passive) {
                // Delay if benchmarks are passive
                this.executeDelay(500, callback);
            }
            else {
                // Execute active benchmark
                benchmark.execute((err) => {
                    // Process force continue
                    if (err != null && this._configuration.forceContinue) {
                        this._aggregator.reportError(err);
                        err = null;
                    }
                    // Increment counter
                    let now = Date.now();
                    if (err == null)
                        this._aggregator.incrementCounter(1, now);
                    // Introduce delay to keep nominal rate
                    if (err == null && this._configuration.measurementType == MeasurementType_1.MeasurementType.Nominal) {
                        let delay = this._ticksPerTransaction - (now - this._lastExecutedTime);
                        this._lastExecutedTime = now;
                        if (delay > 0)
                            this.executeDelay(delay, callback);
                        else
                            callback(err);
                    }
                    else {
                        this._lastExecutedTime = now;
                        callback(err);
                    }
                });
            }
        }
        catch (ex) {
            // Process force continue
            if (this._configuration.forceContinue) {
                this._aggregator.reportError(ex);
                callback(null);
            }
            else {
                callback(ex);
            }
        }
    }
    execute(callback) {
        this.calculateProportionalRanges();
        if (this._configuration.measurementType == MeasurementType_1.MeasurementType.Nominal)
            this._ticksPerTransaction = 1000.0 / this._configuration.nominalRate;
        this._lastExecutedTime = Date.now();
        let duration = this._configuration.duration > 0 ? this._configuration.duration : 365 * 24 * 36000;
        this._stopTime = Date.now() + duration * 1000;
        this._benchmarkCount = this._benchmarks.length;
        this._onlyBenchmark = this._benchmarkCount == 1 ? this._benchmarks[0] : null;
        // Execute benchmarks
        async.whilst(() => {
            return this._running && this._lastExecutedTime < this._stopTime;
        }, (callback) => {
            let benchmark = this._onlyBenchmark != null
                ? this._onlyBenchmark : this.chooseBenchmarkProportionally();
            let called = 0;
            this.executeBenchmark(benchmark, (err) => { process.nextTick(callback, err); });
        }, (err) => {
            this.stop((err2) => {
                if (callback)
                    callback(err);
            });
        });
    }
}
exports.ProportionalExecutionStrategy = ProportionalExecutionStrategy;
//# sourceMappingURL=ProportionalExecutionStrategy.js.map