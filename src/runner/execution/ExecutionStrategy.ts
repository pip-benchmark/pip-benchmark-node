var _ = require('lodash');

import { ExecutionState } from '../ExecutionState';
import { BenchmarkInstance } from '../benchmarks/BenchmarkInstance';
import { BenchmarkSuiteInstance } from '../benchmarks/BenchmarkSuiteInstance';
import { BenchmarkResult } from '../BenchmarkResult';

import { TransactionMeter } from './TransactionMeter';
import { CpuLoadMeter } from './CpuLoadMeter';
import { MemoryUsageMeter } from './MemoryUsageMeter';

export abstract class ExecutionStrategy {
    private static readonly MaxErrorCount = 1000;

    private _process: any;
    private _benchmarks: BenchmarkInstance[];
    private _suites: BenchmarkSuiteInstance[];

    private _transactionCounter: number = 0;

    private _currentResult: BenchmarkResult = null;

    private _transactionMeter: TransactionMeter;
    private _cpuLoadMeter: CpuLoadMeter;
    private _memoryUsageMeter: MemoryUsageMeter;

    protected constructor(process: any, benchmarks: BenchmarkInstance[]) {
        this._process = process;
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

    public get process(): any {
        return this._process;
    }

    public get benchmarks(): BenchmarkInstance[] {
        return this._benchmarks;
    }

    public get suites(): BenchmarkSuiteInstance[] {
        return this._suites;
    }

    protected get currentResult(): BenchmarkResult {
        return this._currentResult;
    }

    public abstract start(callback?: () => void): void;
    public abstract stop(callback?: () => void): void;
    public abstract getResults(): BenchmarkResult[];
    
    protected reset(): void {
        this._currentResult = new BenchmarkResult();
        this._currentResult.startTime = Date.now();

        this._transactionCounter = 0;
        this._transactionMeter.reset();
        this._cpuLoadMeter.reset();
        this._memoryUsageMeter.reset();
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

            this.notifyResultUpdate(ExecutionState.Running);
        }
    }

    public sendMessage(message: string): void {
        this._process.notifyMessageSent(message);
    }

    public reportError(errorMessage: string): void {
        if (this._currentResult.errors.length < ExecutionStrategy.MaxErrorCount)
            this._currentResult.errors.push(errorMessage);
        
        this._process.notifyErrorReported(errorMessage);
    }
        
    protected notifyResultUpdate(status: ExecutionState): void {
        this._process.notifyResultUpdate(status, this._currentResult);
    }
}
