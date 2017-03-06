import { IExecutionContext } from '../../IExecutionContext';
import { BenchmarkSuiteInstance } from '../benchmarks/BenchmarkSuiteInstance';
import { ResultAggregator } from './ResultAggregator';
export declare class ExecutionContext implements IExecutionContext {
    private _suite;
    private _aggregator;
    private _stopCallback;
    constructor(suite: BenchmarkSuiteInstance, aggregator: ResultAggregator, stopCallback: () => void);
    readonly parameters: any;
    incrementCounter(increment?: number): void;
    sendMessage(message: string): void;
    reportError(error: any): void;
    stop(): void;
}
