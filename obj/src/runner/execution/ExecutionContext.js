"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ExecutionContext {
    constructor(strategy, suite) {
        this._strategy = strategy;
        this._suite = suite;
    }
    get parameters() {
        return this._suite.suite.parameters;
    }
    incrementCounter(increment) {
        this._strategy.reportProgress(increment || 1);
    }
    sendMessage(message) {
        this._strategy.sendMessage(message);
    }
    reportError(errorMessage) {
        this._strategy.reportError(errorMessage);
    }
    stop() {
        this._strategy.process.stop();
    }
}
exports.ExecutionContext = ExecutionContext;
//# sourceMappingURL=ExecutionContext.js.map