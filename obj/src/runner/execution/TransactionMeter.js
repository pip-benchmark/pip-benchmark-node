"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BenchmarkMeter_1 = require("./BenchmarkMeter");
class TransactionMeter extends BenchmarkMeter_1.BenchmarkMeter {
    constructor() {
        super();
        this._lastMeasuredTicks = 0;
    }
    getLastMeasuredTicks() {
        return this._lastMeasuredTicks;
    }
    incrementTransactionCounter() {
        this._transactionCounter++;
    }
    setTransactionCounter(value) {
        this._transactionCounter = value;
    }
    performMeasurement() {
        let currentTicks = new Date().getTime();
        let durationInMsecs = currentTicks - this._lastMeasuredTicks;
        let result = this._transactionCounter * 1000 / durationInMsecs;
        this._lastMeasuredTicks = currentTicks;
        this._transactionCounter = 0;
        return result;
    }
}
exports.TransactionMeter = TransactionMeter;
//# sourceMappingURL=TransactionMeter.js.map