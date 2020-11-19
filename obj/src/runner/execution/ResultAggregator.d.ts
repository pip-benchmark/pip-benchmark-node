import { ResultsManager } from '../results/ResultsManager';
import { BenchmarkInstance } from '../benchmarks/BenchmarkInstance';
import { BenchmarkResult } from '../results/BenchmarkResult';
export declare class ResultAggregator {
    private static readonly MaxErrorCount;
    private _results;
    private _benchmarks;
    private _transactionCounter;
    private _result;
    private _transactionMeter;
    private _cpuLoadMeter;
    private _memoryUsageMeter;
    constructor(results: ResultsManager, benchmarks: BenchmarkInstance[]);
    get result(): BenchmarkResult;
    start(): void;
    incrementCounter(increment: number, now?: number): void;
    sendMessage(message: string): void;
    reportError(error: any): void;
    stop(): void;
}
