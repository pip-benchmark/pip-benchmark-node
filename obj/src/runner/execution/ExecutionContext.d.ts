import { IExecutionContext } from '../../IExecutionContext';
import { BenchmarkSuiteInstance } from '../benchmarks/BenchmarkSuiteInstance';
import { ExecutionStrategy } from './ExecutionStrategy';
import { ResultAggregator } from './ResultAggregator';
export declare class ExecutionContext implements IExecutionContext {
    private _suite;
    private _aggregator;
    private _strategy;
    constructor(suite: BenchmarkSuiteInstance, aggregator: ResultAggregator, strategy: ExecutionStrategy);
    get parameters(): any;
    incrementCounter(increment?: number): void;
    sendMessage(message: string): void;
    reportError(error: any): void;
    get isStopped(): boolean;
    stop(): void;
}
