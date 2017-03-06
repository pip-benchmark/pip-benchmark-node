import { IExecutionContext } from '../../IExecutionContext';
import { BenchmarkSuiteInstance } from '../benchmarks/BenchmarkSuiteInstance';
import { ExecutionStrategy } from './ExecutionStrategy';
export declare class ExecutionContext implements IExecutionContext {
    private _strategy;
    private _suite;
    constructor(strategy: ExecutionStrategy, suite: BenchmarkSuiteInstance);
    readonly parameters: any;
    incrementCounter(increment?: number): void;
    sendMessage(message: string): void;
    reportError(errorMessage: string): void;
    stop(): void;
}
