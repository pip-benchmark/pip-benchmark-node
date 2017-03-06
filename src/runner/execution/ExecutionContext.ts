import { IExecutionContext } from '../../IExecutionContext';
import { BenchmarkSuiteInstance } from '../benchmarks/BenchmarkSuiteInstance';
import { ExecutionStrategy } from './ExecutionStrategy';
import { ResultsManager } from '../results/ResultsManager';

export class ExecutionContext implements IExecutionContext {
    private _strategy: ExecutionStrategy;
    private _results: ResultsManager;
    private _suite: BenchmarkSuiteInstance;

    public constructor(strategy: ExecutionStrategy, results: ResultsManager, suite: BenchmarkSuiteInstance) {
        this._strategy = strategy;
        this._results = results;
        this._suite = suite;
    }
    
    public get parameters(): any {
    	return this._suite.suite.parameters;
    }

    public incrementCounter(increment?: number): void {
        this._strategy.reportProgress(increment || 1);
    }

    public sendMessage(message: string): void {
        this._results.notifyMessage(message);
    }

    public reportError(errorMessage: string): void {
        this._results.notifyError(errorMessage);
    }

    public stop(): void {
        this._strategy.stop();
    }
}