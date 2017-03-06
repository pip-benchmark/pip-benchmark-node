import { BenchmarkInstance } from '../BenchmarkInstance';
import { BenchmarkResult } from '../BenchmarkResult';
import { ExecutionStrategy } from './ExecutionStrategy';
export declare class ProportionalExecutionStrategy extends ExecutionStrategy {
    private _embedded;
    private _running;
    private _ticksPerTransaction;
    private _lastExecutedTime;
    private _stopTime;
    private _benchmarkCount;
    private _onlyBenchmark;
    private _timeout;
    constructor(process: any, benchmarks: BenchmarkInstance[], embedded?: boolean);
    start(): void;
    stop(): void;
    getResults(): BenchmarkResult[];
    private calculateProportionRanges();
    private chooseBenchmarkProportionally();
    private executeDelay(delay, callback);
    protected executeBenchmark(benchmark: BenchmarkInstance, callback: (err: any) => void): void;
    private execute();
}
