import { ConfigurationManager } from '../config/ConfigurationManager';
import { ResultsManager } from '../results/ResultsManager';
import { BenchmarkInstance } from '../benchmarks/BenchmarkInstance';
import { ExecutionStrategy } from './ExecutionStrategy';
export declare class SequencialExecutionStrategy extends ExecutionStrategy {
    private _running;
    private _current;
    private _timeout;
    constructor(configuration: ConfigurationManager, results: ResultsManager, execution: any, benchmarks: BenchmarkInstance[]);
    readonly isStopped: boolean;
    start(callback?: (err: any) => void): void;
    stop(callback?: (err: any) => void): void;
    private execute;
}
