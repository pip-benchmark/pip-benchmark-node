import { ExecutionState } from '../ExecutionState';
import { BenchmarkInstance } from '../benchmarks/BenchmarkInstance';
import { BenchmarkSuiteInstance } from '../benchmarks/BenchmarkSuiteInstance';
import { BenchmarkResult } from '../BenchmarkResult';
export declare abstract class ExecutionStrategy {
    private static readonly MaxErrorCount;
    private _process;
    private _benchmarks;
    private _suites;
    private _transactionCounter;
    private _currentResult;
    private _transactionMeter;
    private _cpuLoadMeter;
    private _memoryUsageMeter;
    protected constructor(process: any, benchmarks: BenchmarkInstance[]);
    private getAllSuitesFromBenchmarks(benchmarks);
    readonly process: any;
    readonly benchmarks: BenchmarkInstance[];
    readonly suites: BenchmarkSuiteInstance[];
    protected readonly currentResult: BenchmarkResult;
    abstract start(callback?: () => void): void;
    abstract stop(callback?: () => void): void;
    abstract getResults(): BenchmarkResult[];
    protected reset(): void;
    reportProgress(increment: number, now?: number): void;
    sendMessage(message: string): void;
    reportError(errorMessage: string): void;
    protected notifyResultUpdate(status: ExecutionState): void;
}