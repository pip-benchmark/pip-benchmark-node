"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var async = require('async');
const ExecutionState_1 = require("../ExecutionState");
const ExecutionStrategy_1 = require("./ExecutionStrategy");
const ProportionalExecutionStrategy_1 = require("./ProportionalExecutionStrategy");
class SequencialExecutionStrategy extends ExecutionStrategy_1.ExecutionStrategy {
    constructor(configuration, benchmarks) {
        super(configuration, benchmarks);
        this._running = false;
        this._results = [];
    }
    start(callback) {
        if (this._configuration.duration <= 0)
            throw new Error("Duration was not set");
        this.notifyResultUpdate(ExecutionState_1.ExecutionState.Starting);
        // Start control thread
        //setTimeout(() => { this.execute(); }, 0);
        this.execute(callback);
    }
    stop(callback) {
        if (this._timeout != null) {
            clearTimeout(this._timeout);
            this._timeout = null;
        }
        if (this._running) {
            this._running = false;
            if (this._current != null)
                this._current.stop();
            this.notifyResultUpdate(ExecutionState_1.ExecutionState.Completed);
        }
        if (callback)
            callback();
    }
    getResults() {
        return this._results;
    }
    execute(callback) {
        async.eachSeries(this._benchmarks, (benchmark, callback) => {
            // Skip if benchmarking was interrupted
            if (!this._running) {
                callback();
                return;
            }
            // Start embedded strategy
            this._current = new ProportionalExecutionStrategy_1.ProportionalExecutionStrategy(this._configuration, [benchmark], true);
            this._current.start();
            this._timeout = setTimeout(() => {
                // Populate results
                let results = this._current.getResults();
                if (results.length > 0)
                    this._results.push(results[0]);
                this._current.stop(() => {
                    this._current = null;
                    callback();
                });
            }, this._configuration.duration * 1000);
        }, (err) => {
            this.stop(callback);
        });
    }
}
exports.SequencialExecutionStrategy = SequencialExecutionStrategy;
//# sourceMappingURL=SequencialExecutionStrategy.js.map