"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecutionContext = void 0;
class ExecutionContext {
    constructor(suite, aggregator, strategy) {
        this._aggregator = aggregator;
        this._suite = suite;
        this._strategy = strategy;
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
    get isStopped() {
        return this._strategy.isStopped;
    }
    stop() {
        this._strategy.stop();
    }
}
exports.ExecutionContext = ExecutionContext;
//# sourceMappingURL=ExecutionContext.js.map