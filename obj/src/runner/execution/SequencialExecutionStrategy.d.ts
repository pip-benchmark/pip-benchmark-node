import { ConfigurationManager } from '../config/ConfigurationManager';
import { ResultsManager } from '../results/ResultsManager';
import { BenchmarkInstance } from '../benchmarks/BenchmarkInstance';
import { ExecutionStrategy } from './ExecutionStrategy';
export declare class SequencialExecutionStrategy extends ExecutionStrategy {
    private _running;
    private _current;
    private _timeout;
    constructor(configuration: ConfigurationManager, results: ResultsManager, benchmarks: BenchmarkInstance[]);
    start(callback?: () => void): void;
    stop(callback?: () => void): void;
    private execute(callback?);
}
