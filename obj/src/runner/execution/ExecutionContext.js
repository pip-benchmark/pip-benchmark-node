"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ExecutionContext {
    constructor(suite, aggregator, stopCallback) {
        this._aggregator = aggregator;
        this._suite = suite;
        this._stopCallback = stopCallback;
    }
    get parameters() {
        return this._suite.suite.parameters;
    }
    incrementCounter(increment) {
        this._aggregator.incrementCounter(increment || 1);
    }
    sendMessage(message) {
        this._aggregator.sendMessage(message);
    }
    reportError(error) {
        this._aggregator.reportError(error);
    }
    stop() {
        this._stopCallback();
    }
}
exports.ExecutionContext = ExecutionContext;
//# sourceMappingURL=ExecutionContext.js.map