"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ExecutionContext {
    constructor(strategy, results, suite) {
        this._strategy = strategy;
        this._results = results;
        this._suite = suite;
    }
    get parameters() {
        return this._suite.suite.parameters;
    }
    incrementCounter(increment) {
        this._strategy.reportProgress(increment || 1);
    }
    sendMessage(message) {
        this._results.notifyMessage(message);
    }
    reportError(errorMessage) {
        this._results.notifyError(errorMessage);
    }
    stop() {
        this._strategy.stop();
    }
}
exports.ExecutionContext = ExecutionContext;
//# sourceMappingURL=ExecutionContext.js.map