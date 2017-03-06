import { IExecutionContext } from '../../IExecutionContext';
import { BenchmarkSuiteInstance } from '../benchmarks/BenchmarkSuiteInstance';
import { ExecutionStrategy } from './ExecutionStrategy';
import { ResultAggregator } from './ResultAggregator';

export class ExecutionContext implements IExecutionContext {
    private _suite: BenchmarkSuiteInstance;
    private _aggregator: ResultAggregator;
    private _stopCallback: () => void;

    public constructor(suite: BenchmarkSuiteInstance, 
        aggregator: ResultAggregator, stopCallback: () => void) {

        this._aggregator = aggregator;
        this._suite = suite;
        this._stopCallback = stopCallback;
    }
    
    public get parameters(): any {
    	return this._suite.suite.parameters;
    }

    public incrementCounter(increment?: number): void {
        this._aggregator.incrementCounter(increment || 1);
    }

    public sendMessage(message: string): void {
        this._aggregator.sendMessage(message);
    }

    public reportError(error: any): void {
        this._aggregator.reportError(error);
    }

    public stop(): void {
        this._stopCallback();
    }
}