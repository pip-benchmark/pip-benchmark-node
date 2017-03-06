import { ConfigurationManager } from '../config/ConfigurationManager';
import { ResultsManager } from '../results/ResultsManager';
import { BenchmarkInstance } from '../benchmarks/BenchmarkInstance';
import { ExecutionState } from './ExecutionState';
import { ExecutionCallback } from './ExecutionCallback';
export declare class ExecutionManager {
    protected _configuration: ConfigurationManager;
    protected _results: ResultsManager;
    private _updatedListeners;
    private _strategy;
    constructor(configuration: ConfigurationManager, results: ResultsManager);
    readonly running: boolean;
    start(benchmarks: BenchmarkInstance[]): void;
    run(benchmarks: BenchmarkInstance[], callback?: (err: any) => void): void;
    stop(): void;
    addUpdatedListener(listener: ExecutionCallback): void;
    removeUpdatedListener(listener: ExecutionCallback): void;
    notifyUpdated(state: ExecutionState): void;
}
