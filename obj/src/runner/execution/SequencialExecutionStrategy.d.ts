import { ConfigurationManager } from '../config/ConfigurationManager';
import { BenchmarkInstance } from '../benchmarks/BenchmarkInstance';
import { BenchmarkResult } from '../BenchmarkResult';
import { ExecutionStrategy } from './ExecutionStrategy';
export declare class SequencialExecutionStrategy extends ExecutionStrategy {
    private _running;
    private _current;
    private _results;
    private _timeout;
    constructor(configuration: ConfigurationManager, benchmarks: BenchmarkInstance[]);
    start(callback?: () => void): void;
    stop(callback?: () => void): void;
    getResults(): BenchmarkResult[];
    private execute(callback?);
}
