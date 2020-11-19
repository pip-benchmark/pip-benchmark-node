"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BenchmarkMeter_1 = require("./BenchmarkMeter");
class TransactionMeter extends BenchmarkMeter_1.BenchmarkMeter {
    constructor() {
        super();
    }
    incrementTransactionCounter() {
        this._transactionCounter++;
    }
    setTransactionCounter(value) {
        this._transactionCounter = value;
    }
    performMeasurement() {
        let currentTime = Date.now();
        let durationInMsecs = currentTime - this._lastMeasuredTime;
        let result = this._transactionCounter * 1000 / durationInMsecs;
        this._lastMeasuredTime = currentTime;
        this._transactionCounter = 0;
        return result;
    }
}
exports.TransactionMeter = TransactionMeter;
//# sourceMappingURL=TransactionMeter.js.map