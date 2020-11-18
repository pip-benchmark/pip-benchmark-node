"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let async = require('async');
const ExecutionStrategy_1 = require("./ExecutionStrategy");
const ProportionalExecutionStrategy_1 = require("./ProportionalExecutionStrategy");
class SequencialExecutionStrategy extends ExecutionStrategy_1.ExecutionStrategy {
    constructor(configuration, results, execution, benchmarks) {
        super(configuration, results, execution, benchmarks);
        this._running = false;
    }
    get isStopped() {
        return !this._running;
    }
    start(callback) {
        if (this._configuration.duration <= 0)
            throw new Error("Duration was not set");
        if (this._running) {
            callback(null);
            return;
        }
        this._running = true;
        this.execute(callback);
    }
    stop(callback) {
        if (this._timeout != null) {
            clearTimeout(this._timeout);
            this._timeout = null;
        }
        if (this._running) {
            this._running = false;
            if (this._execution)
                this._execution.stop();
            if (this._current != null) {
                this._current.stop(callback);
            }
            else {
                if (callback)
                    callback(null);
            }
        }
        else {
            if (callback)
                callback(null);
        }
    }
    execute(callback) {
        async.eachSeries(this._benchmarks, (benchmark, callback) => {
            // Skip if benchmarking was interrupted
            if (!this._running) {
                callback();
                return;
            }
            // Write a message
            benchmark.benchmark.context.sendMessage("Executing " + benchmark.name + " benchmark...");
            // Start embedded strategy
            this._current = new ProportionalExecutionStrategy_1.ProportionalExecutionStrategy(this._configuration, this._results, null, [benchmark]);
            this._current.start();
            // Wait for specified duration and stop embedded strategy
            this._timeout = setTimeout(() => {
                this._current.stop((err) => {
                    this._current = null;
                    callback(err);
                });
            }, this._configuration.duration * 1000);
        }, (err) => {
            this.stop(callback);
        });
    }
}
exports.SequencialExecutionStrategy = SequencialExecutionStrategy;
//# sourceMappingURL=SequencialExecutionStrategy.js.map