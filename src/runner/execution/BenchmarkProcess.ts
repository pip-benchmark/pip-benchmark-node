var _ = require('lodash');

import { BenchmarkInstance } from '../BenchmarkInstance';
import { BenchmarkSuiteInstance } from '../BenchmarkSuiteInstance';
import { MeasurementType } from '../MeasurementType';
import { ExecutionType } from '../ExecutionType';
import { ExecutionState } from '../ExecutionState';
import { ExecutionStrategy } from './ExecutionStrategy';
import { BenchmarkResult } from '../BenchmarkResult';
import { BenchmarkException } from '../BenchmarkException';

import { ProportionalExecutionStrategy } from './ProportionalExecutionStrategy';
import { SequencialExecutionStrategy } from './SequencialExecutionStrategy';

export class BenchmarkProcess {
	private _runner: any;
    private _strategy: ExecutionStrategy = null;
    private _suites: BenchmarkSuiteInstance[];

    private _measurementType: MeasurementType = MeasurementType.Peak;
    private _nominalRate: number = 1;
    private _executionType: ExecutionType = ExecutionType.Proportional;
    private _duration: number = 60;
    private _forceContinue: boolean = false;

    private _results: BenchmarkResult[] = [];

    public constructor(runner: any) {
        this._runner = runner;
    }

    public get runner() {
        return this._runner;
    }
    
    public get running(): boolean {
        return this._strategy != null;
    }

    public get measurementType(): MeasurementType {
        return this._measurementType;
    }
    
    public set measurementType(value: MeasurementType) {
        this._measurementType = value; 
    }

    public get nominalRate() {
        return this._nominalRate; 
    }
    
    public set nominalRate(value: number) {
        this._nominalRate = value;
    }

    public get executionType(): ExecutionType {
        return this._executionType; 
    }
    
    public set executionType(value: ExecutionType) {
        this._executionType = value;
    }

    public get duration(): number {
        return this._duration; 
    }
    
    public set duration(value: number) {
        this._duration = value;
    }
    
    public get forceContinue(): boolean {
        return this._forceContinue;
    }
    
    public set forceContinue(value: boolean) {
        this._forceContinue = value;
    }

    public get results(): BenchmarkResult[] {
        return this._results;
    }

    public start(suites: BenchmarkSuiteInstance[]): void {
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
        if (this._executionType == ExecutionType.Sequential)
            this._strategy = new SequencialExecutionStrategy(this, selectedBenchmarks);
        else
            this._strategy = new ProportionalExecutionStrategy(this, selectedBenchmarks);

        // Initialize parameters and start 
        this._results = [];
        this._strategy.start();
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
        this._runner.notifyResultUpdated(status, result);
    }

    public notifyMessageSent(message: string): void {
        this._runner.notifyMessageSent(message);
    }

    public notifyErrorReported(errorMessage: string): void {
        this._runner.notifyErrorReported(errorMessage);
    }
}