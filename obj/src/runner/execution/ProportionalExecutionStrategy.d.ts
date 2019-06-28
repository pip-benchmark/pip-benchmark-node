import { ConfigurationManager } from '../config/ConfigurationManager';
import { ResultsManager } from '../results/ResultsManager';
import { BenchmarkInstance } from '../benchmarks/BenchmarkInstance';
import { ExecutionStrategy } from './ExecutionStrategy';
export declare class ProportionalExecutionStrategy extends ExecutionStrategy {
    private _running;
    private _aggregator;
    private _ticksPerTransaction;
    private _lastExecutedTime;
    private _stopTime;
    private _benchmarkCount;
    private _onlyBenchmark;
    private _timeout;
    constructor(configuration: ConfigurationManager, results: ResultsManager, execution: any, benchmarks: BenchmarkInstance[]);
    start(callback?: (err: any) => void): void;
    readonly isStopped: boolean;
    stop(callback?: (err: any) => void): void;
    private calculateProportionalRanges;
    private chooseBenchmarkProportionally;
    private executeDelay;
    private executeBenchmark;
    private execute;
}
