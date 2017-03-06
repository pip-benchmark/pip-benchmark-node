var _ = require('lodash');

import { ConfigurationManager } from '../config/ConfigurationManager';
import { ExecutionType } from '../config/ExecutionType';
import { BenchmarkInstance } from '../benchmarks/BenchmarkInstance';
import { BenchmarkSuiteInstance } from '../benchmarks/BenchmarkSuiteInstance';
import { ExecutionState } from '../results/ExecutionState';
import { ExecutionStrategy } from './ExecutionStrategy';
import { BenchmarkResult } from '../results/BenchmarkResult';
import { BenchmarkException } from '../BenchmarkException';

import { ProportionalExecutionStrategy } from './ProportionalExecutionStrategy';
import { SequencialExecutionStrategy } from './SequencialExecutionStrategy';

export class BenchmarkProcess {
	private _configuration: ConfigurationManager;
    private _strategy: ExecutionStrategy = null;
    private _suites: BenchmarkSuiteInstance[];

    private _results: BenchmarkResult[] = [];

    public constructor(configuration: ConfigurationManager) {
        this._configuration = configuration;
    }
    
    public get running(): boolean {
        return this._strategy != null;
    }

    public get results(): BenchmarkResult[] {
        return this._results;
    }

    public start(suites: BenchmarkSuiteInstance[]): void {
        this.run(suites, () => {});
    }

    public run(suites: BenchmarkSuiteInstance[], callback: () => void): void {
        if (this._strategy != null)
            this.stop();

        // Identify active tests
        this._suites = suites;
        let selectedBenchmarks: BenchmarkInstance[] = [];
        
        _.each(suites, (s) => {
            _.each(s.benchmarks, (b) => {
                if (b.selected)
                    selectedBenchmarks.push(b);
            });
        });

        // Check if there is at least one test defined
        if (selectedBenchmarks.length == 0) 
            throw new BenchmarkException("There are no benchmarks to execute");

        // Create requested test strategy
        if (this._configuration.executionType == ExecutionType.Sequential)
            this._strategy = new SequencialExecutionStrategy(this._configuration, selectedBenchmarks);
        else
            this._strategy = new ProportionalExecutionStrategy(this._configuration, selectedBenchmarks);

        // Initialize parameters and start 
        this._results = [];
        this._strategy.start(() => {
            this.stop();
            if (callback) callback();
        });
    }

    public stop(): void {
        if (this._strategy != null) {
            // Stop strategy
            this._strategy.stop();

            // Fill results
            this._results = this._strategy.getResults();
            
            this._strategy = null;
        }
    }

    public notifyResultUpdate(status: ExecutionState, result: BenchmarkResult): void {
        //this._runner.notifyResultUpdated(status, result);
    }

    public notifyMessageSent(message: string): void {
        //this._runner.notifyMessageSent(message);
    }

    public notifyErrorReported(errorMessage: string): void {
        //this._runner.notifyErrorReported(errorMessage);
    }
}