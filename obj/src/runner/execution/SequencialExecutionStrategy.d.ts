import { BenchmarkInstance } from '../BenchmarkInstance';
import { BenchmarkResult } from '../BenchmarkResult';
import { ExecutionStrategy } from './ExecutionStrategy';
export declare class SequencialExecutionStrategy extends ExecutionStrategy {
    private _running;
    private _current;
    private _results;
    private _timeout;
    constructor(process: any, benchmarks: BenchmarkInstance[]);
    start(): void;
    stop(): void;
    getResults(): BenchmarkResult[];
    private execute();
}
