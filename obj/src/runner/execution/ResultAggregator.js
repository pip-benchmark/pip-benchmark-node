"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BenchmarkResult_1 = require("../results/BenchmarkResult");
const TransactionMeter_1 = require("./TransactionMeter");
const CpuLoadMeter_1 = require("./CpuLoadMeter");
const MemoryUsageMeter_1 = require("./MemoryUsageMeter");
class ResultAggregator {
    constructor(results, benchmarks) {
        this._transactionCounter = 0;
        this._result = null;
        this._results = results;
        this._benchmarks = benchmarks;
        this._cpuLoadMeter = new CpuLoadMeter_1.CpuLoadMeter();
        this._transactionMeter = new TransactionMeter_1.TransactionMeter();
        this._memoryUsageMeter = new MemoryUsageMeter_1.MemoryUsageMeter();
        this.start();
    }
    get result() {
        return this._result;
    }
    start() {
        this._result = new BenchmarkResult_1.BenchmarkResult();
        this._result.benchmarks = this._benchmarks;
        this._result.startTime = Date.now();
        this._transactionCounter = 0;
        this._transactionMeter.clear();
        this._cpuLoadMeter.clear();
        this._memoryUsageMeter.clear();
    }
    incrementCounter(increment, now) {
        now = now || Date.now();
        this._transactionCounter += increment;
        // If it's less then a second then wait
        let measureInterval = now - this._transactionMeter.lastMeasuredTime;
        if (measureInterval >= 1000 && this._result != null) {
            // Perform measurements
            this._transactionMeter.setTransactionCounter(this._transactionCounter);
            this._transactionCounter = 0;
            this._transactionMeter.measure();
            this._cpuLoadMeter.measure();
            this._memoryUsageMeter.measure();
            // Store measurement results
            this._result.elapsedTime = now - this._result.startTime;
            this._result.performanceMeasurement = this._transactionMeter.measurement;
            this._result.cpuLoadMeasurement = this._cpuLoadMeter.measurement;
            this._result.memoryUsageMeasurement = this._memoryUsageMeter.measurement;
            this._results.notifyUpdated(this._result);
        }
    }
    sendMessage(message) {
        this._results.notifyMessage(message);
    }
    reportError(error) {
        if (this._result.errors.length < ResultAggregator.MaxErrorCount)
            this._result.errors.push(error);
        this._results.notifyError(error);
    }
    stop() {
        this._results.add(this._result);
    }
}
ResultAggregator.MaxErrorCount = 1000;
exports.ResultAggregator = ResultAggregator;
//# sourceMappingURL=ResultAggregator.js.map