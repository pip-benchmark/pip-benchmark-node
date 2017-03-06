import { IExecutionContext } from '../../IExecutionContext';
import { BenchmarkSuiteInstance } from '../benchmarks/BenchmarkSuiteInstance';
import { ExecutionStrategy } from './ExecutionStrategy';
import { ResultsManager } from '../results/ResultsManager';
export declare class ExecutionContext implements IExecutionContext {
    private _strategy;
    private _results;
    private _suite;
    constructor(strategy: ExecutionStrategy, results: ResultsManager, suite: BenchmarkSuiteInstance);
    readonly parameters: any;
    incrementCounter(increment?: number): void;
    sendMessage(message: string): void;
    reportError(errorMessage: string): void;
    stop(): void;
}
