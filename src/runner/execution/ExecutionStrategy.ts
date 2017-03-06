var _ = require('lodash');

import { ConfigurationManager } from '../config/ConfigurationManager';
import { ResultsManager } from '../results/ResultsManager';
import { ExecutionState } from '../results/ExecutionState';
import { BenchmarkInstance } from '../benchmarks/BenchmarkInstance';
import { BenchmarkSuiteInstance } from '../benchmarks/BenchmarkSuiteInstance';
import { BenchmarkResult } from '../results/BenchmarkResult';

import { TransactionMeter } from './TransactionMeter';
import { CpuLoadMeter } from './CpuLoadMeter';
import { MemoryUsageMeter } from './MemoryUsageMeter';

export abstract class ExecutionStrategy {
    private static readonly MaxErrorCount = 1000;

    protected _configuration: ConfigurationManager;
    protected _results: ResultsManager;
    protected _benchmarks: BenchmarkInstance[];
    protected _suites: BenchmarkSuiteInstance[];

    private _transactionCounter: number = 0;

    protected _currentResult: BenchmarkResult = null;

    private _transactionMeter: TransactionMeter;
    private _cpuLoadMeter: CpuLoadMeter;
    private _memoryUsageMeter: MemoryUsageMeter;

    protected constructor(configuration: ConfigurationManager, results: ResultsManager, benchmarks: BenchmarkInstance[]) {
        this._configuration = configuration;
        this._results = results;
        this._benchmarks = benchmarks;
        this._suites = this.getAllSuitesFromBenchmarks(benchmarks);

        this._cpuLoadMeter = new CpuLoadMeter();
        this._transactionMeter = new TransactionMeter();
        this._memoryUsageMeter = new MemoryUsageMeter();
    }

    private getAllSuitesFromBenchmarks(benchmarks: BenchmarkInstance[]): BenchmarkSuiteInstance[] {
        let suites: BenchmarkSuiteInstance[] = [];
        for (let index = 0; index < benchmarks.length; index++) {
            let benchmark = benchmarks[index];
            let suite = benchmark.suite;
            if (!_.some(suites, (s) => s == suite))
                suites.push(suite);
        }
        return suites;
    }

    protected get currentResult(): BenchmarkResult {
        return this._currentResult;
    }

    public abstract start(callback?: () => void): void;
    public abstract stop(callback?: () => void): void;
    
    protected clear(): void {
        this._currentResult = new BenchmarkResult();
        this._currentResult.startTime = Date.now();

        this._transactionCounter = 0;
        this._transactionMeter.clear();
        this._cpuLoadMeter.clear();
        this._memoryUsageMeter.clear();
    }

    public reportProgress(increment: number, now?: number): void {
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

            this._results.notifyUpdated(ExecutionState.Running, this._currentResult);
        }
    }
}
