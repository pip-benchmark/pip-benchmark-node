import { ConfigurationManager } from '../config/ConfigurationManager';
import { ResultsManager } from '../results/ResultsManager';
import { BenchmarkInstance } from '../benchmarks/BenchmarkInstance';
import { BenchmarkSuiteInstance } from '../benchmarks/BenchmarkSuiteInstance';
import { BenchmarkResult } from '../results/BenchmarkResult';
export declare abstract class ExecutionStrategy {
    private static readonly MaxErrorCount;
    protected _configuration: ConfigurationManager;
    protected _results: ResultsManager;
    protected _benchmarks: BenchmarkInstance[];
    protected _suites: BenchmarkSuiteInstance[];
    private _transactionCounter;
    protected _currentResult: BenchmarkResult;
    private _transactionMeter;
    private _cpuLoadMeter;
    private _memoryUsageMeter;
    protected constructor(configuration: ConfigurationManager, results: ResultsManager, benchmarks: BenchmarkInstance[]);
    private getAllSuitesFromBenchmarks(benchmarks);
    protected readonly currentResult: BenchmarkResult;
    abstract start(callback?: () => void): void;
    abstract stop(callback?: () => void): void;
    protected clear(): void;
    reportProgress(increment: number, now?: number): void;
}
