var _ = require('lodash');

import { ConfigurationManager } from '../config/ConfigurationManager';
import { ResultsManager } from '../results/ResultsManager';
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
	protected _configuration: ConfigurationManager;
    protected _results: ResultsManager;
    
    private _strategy: ExecutionStrategy = null;
    private _suites: BenchmarkSuiteInstance[];

    public constructor(configuration: ConfigurationManager, results: ResultsManager) {
        this._configuration = configuration;
        this._results = results;
    }
    
    public get running(): boolean {
        return this._strategy != null;
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
            this._strategy = new SequencialExecutionStrategy(this._configuration, this._results, selectedBenchmarks);
        else
            this._strategy = new ProportionalExecutionStrategy(this._configuration, this._results, selectedBenchmarks);

        // Initialize parameters and start 
        this._results.clear();
        this._strategy.start(() => {
            this.stop();
            if (callback) callback();
        });
    }

    public stop(): void {
        if (this._strategy != null) {
            this._strategy.stop();
            this._strategy = null;
        }
    }

}