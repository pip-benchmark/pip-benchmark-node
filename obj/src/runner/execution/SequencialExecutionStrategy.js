"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var async = require('async');
const ExecutionState_1 = require("../ExecutionState");
const ExecutionStrategy_1 = require("./ExecutionStrategy");
const ProportionalExecutionStrategy_1 = require("./ProportionalExecutionStrategy");
class SequencialExecutionStrategy extends ExecutionStrategy_1.ExecutionStrategy {
    constructor(process, benchmarks) {
        super(process, benchmarks);
        this._running = false;
        this._results = [];
    }
    start() {
        if (this.process().duration() <= 0)
            throw new Error("Duration was not set");
        this.notifyResultUpdate(ExecutionState_1.ExecutionState.Starting);
        // Start control thread
        //setTimeout(() => { this.execute(); }, 0);
        this.execute();
    }
    stop() {
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
    }
    getResults() {
        return this._results;
    }
    execute() {
        async.eachSeries(this.benchmarks, (benchmark, callback) => {
            // Skip if benchmarking was interrupted
            if (!this._running) {
                callback();
                return;
            }
            // Start embedded strategy
            this._current = new ProportionalExecutionStrategy_1.ProportionalExecutionStrategy(this.process, [benchmark], true);
            this._current.start();
            this._timeout = setTimeout(() => {
                // Populate results
                let results = this._current.getResults();
                if (results.length > 0)
                    this._results.push(results[0]);
                this._current.stop();
                this._current = null;
                callback();
            }, this.process.delay * 1000);
        }, (err) => {
            if (this._running) {
                this._running = false;
                this.process.stop();
                this.notifyResultUpdate(ExecutionState_1.ExecutionState.Completed);
            }
        });
    }
}
exports.SequencialExecutionStrategy = SequencialExecutionStrategy;
//# sourceMappingURL=SequencialExecutionStrategy.js.map