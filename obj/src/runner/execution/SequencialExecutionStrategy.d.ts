import { BenchmarkInstance } from '../BenchmarkInstance';
import { BenchmarkResult } from '../BenchmarkResult';
import { ExecutionStrategy } from './ExecutionStrategy';
export declare class SequencialExecutionStrategy extends ExecutionStrategy {
    private _running;
    private _current;
    private _results;
    private _timeout;
    constructor(process: any, benchmarks: BenchmarkInstance[]);
    start(callback?: () => void): void;
    stop(callback?: () => void): void;
    getResults(): BenchmarkResult[];
    private execute(callback?);
}
