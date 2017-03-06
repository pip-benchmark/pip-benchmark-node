"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require('lodash');
const ExecutionState_1 = require("../results/ExecutionState");
const BenchmarkResult_1 = require("../results/BenchmarkResult");
const TransactionMeter_1 = require("./TransactionMeter");
const CpuLoadMeter_1 = require("./CpuLoadMeter");
const MemoryUsageMeter_1 = require("./MemoryUsageMeter");
class ExecutionStrategy {
    constructor(configuration, results, benchmarks) {
        this._transactionCounter = 0;
        this._currentResult = null;
        this._configuration = configuration;
        this._results = results;
        this._benchmarks = benchmarks;
        this._suites = this.getAllSuitesFromBenchmarks(benchmarks);
        this._cpuLoadMeter = new CpuLoadMeter_1.CpuLoadMeter();
        this._transactionMeter = new TransactionMeter_1.TransactionMeter();
        this._memoryUsageMeter = new MemoryUsageMeter_1.MemoryUsageMeter();
    }
    getAllSuitesFromBenchmarks(benchmarks) {
        let suites = [];
        for (let index = 0; index < benchmarks.length; index++) {
            let benchmark = benchmarks[index];
            let suite = benchmark.suite;
            if (!_.some(suites, (s) => s == suite))
                suites.push(suite);
        }
        return suites;
    }
    get currentResult() {
        return this._currentResult;
    }
    clear() {
        this._currentResult = new BenchmarkResult_1.BenchmarkResult();
        this._currentResult.startTime = Date.now();
        this._transactionCounter = 0;
        this._transactionMeter.clear();
        this._cpuLoadMeter.clear();
        this._memoryUsageMeter.clear();
    }
    reportProgress(increment, now) {
        now = now || Date.now();
        this._transactionCounter += increment;
        // If it's less then a second then wait
        let measureInterval = now - this._transactionMeter.lastMeasuredTime;
        if (measureInterval >= 1000 && this._currentResult != null) {
            // Perform measurements
            this._transactionMeter.setTransactionCounter(this._transactionCounter);
            this._transactionCounter = 0;
            this._transactionMeter.measure();
            this._cpuLoadMeter.measure();
            this._memoryUsageMeter.measure();
            // Store measurement results
            this._currentResult.elapsedTime = now - this._currentResult.startTime;
            this._currentResult.performanceMeasurement = this._transactionMeter.measurement;
            this._currentResult.cpuLoadMeasurement = this._cpuLoadMeter.measurement;
            this._currentResult.memoryUsageMeasurement = this._memoryUsageMeter.measurement;
            this._results.notifyUpdated(ExecutionState_1.ExecutionState.Running, this._currentResult);
        }
    }
}
ExecutionStrategy.MaxErrorCount = 1000;
exports.ExecutionStrategy = ExecutionStrategy;
//# sourceMappingURL=ExecutionStrategy.js.map