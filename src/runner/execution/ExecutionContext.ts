import { IExecutionContext } from '../../IExecutionContext';
import { BenchmarkSuiteInstance } from '../benchmarks/BenchmarkSuiteInstance';
import { ExecutionStrategy } from './ExecutionStrategy';

export class ExecutionContext implements IExecutionContext {
    private _strategy: ExecutionStrategy;
    private _suite: BenchmarkSuiteInstance;

    public constructor(strategy: ExecutionStrategy, suite: BenchmarkSuiteInstance) {
        this._strategy = strategy;
        this._suite = suite;
    }
    
    public get parameters(): any {
    	return this._suite.suite.parameters;
    }

    public incrementCounter(increment?: number): void {
        this._strategy.reportProgress(increment || 1);
    }

    public sendMessage(message: string): void {
        this._strategy.sendMessage(message);
    }

    public reportError(errorMessage: string): void {
        this._strategy.reportError(errorMessage);
    }

    public stop(): void {
        this._strategy.stop();
    }
}