"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require('lodash');
const ExecutionType_1 = require("../config/ExecutionType");
const ExecutionState_1 = require("./ExecutionState");
const ProportionalExecutionStrategy_1 = require("./ProportionalExecutionStrategy");
const SequencialExecutionStrategy_1 = require("./SequencialExecutionStrategy");
class ExecutionManager {
    constructor(configuration, results) {
        this._updatedListeners = [];
        this._running = false;
        this._strategy = null;
        this._configuration = configuration;
        this._results = results;
    }
    get isRunning() {
        return this._running;
    }
    start(benchmarks) {
        this.run(benchmarks, (err) => { });
    }
    run(benchmarks, callback) {
        if (benchmarks == null || benchmarks.length == 0) {
            callback(new Error("There are no benchmarks to execute"));
            return;
        }
        if (this._running)
            this.stop();
        this._running = true;
        this._results.clear();
        this.notifyUpdated(ExecutionState_1.ExecutionState.Running);
        // Create requested execution strategy
        if (this._configuration.executionType == ExecutionType_1.ExecutionType.Sequential)
            this._strategy = new SequencialExecutionStrategy_1.SequencialExecutionStrategy(this._configuration, this._results, this, benchmarks);
        else
            this._strategy = new ProportionalExecutionStrategy_1.ProportionalExecutionStrategy(this._configuration, this._results, this, benchmarks);
        // Initialize parameters and start 
        this._strategy.start((err) => {
            this.stop();
            if (callback)
                callback(err);
        });
    }
    stop() {
        if (this._running) {
            this._running = false;
            if (this._strategy != null) {
                this._strategy.stop();
                this._strategy = null;
            }
            this.notifyUpdated(ExecutionState_1.ExecutionState.Completed);
        }
    }
    addUpdatedListener(listener) {
        this._updatedListeners.push(listener);
    }
    removeUpdatedListener(listener) {
        for (let index = this._updatedListeners.length - 1; index >= 0; index--) {
            if (this._updatedListeners[index] == listener)
                this._updatedListeners = this._updatedListeners.splice(index, 1);
        }
    }
    notifyUpdated(state) {
        for (let index = 0; index < this._updatedListeners.length; index++) {
            try {
                let listener = this._updatedListeners[index];
                listener(state);
            }
            catch (ex) {
                // Ignore and send a message to the next listener.
            }
        }
    }
}
exports.ExecutionManager = ExecutionManager;
//# sourceMappingURL=ExecutionManager.js.map