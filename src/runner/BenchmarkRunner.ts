import { Parameter } from '../Parameter';
import { BenchmarkSuite } from '../BenchmarkSuite';
import { BenchmarkSuiteInstance } from './benchmarks/BenchmarkSuiteInstance';
import { BenchmarkInstance } from './benchmarks/BenchmarkInstance';
import { ResultCallback } from './results/ResultCallback';
import { MessageCallback } from './results/MessageCallback';
import { BenchmarkResult } from './results/BenchmarkResult';
import { ExecutionState } from './results/ExecutionState';

import { ConfigurationManager } from './config/ConfigurationManager';
import { ResultsManager } from './results/ResultsManager';
import { BenchmarksManager } from './benchmarks/BenchmarksManager';
import { ParametersManager } from './parameters/ParametersManager';
import { BenchmarkProcess } from './execution/BenchmarkProcess';
import { ReportGenerator } from './reports/ReportGenerator';
import { EnvironmentManager } from './environment/EnvironmentManager';

export class BenchmarkRunner {
    private _configuration: ConfigurationManager;
    private _results: ResultsManager;
    private _parameters: ParametersManager;
    private _benchmarks: BenchmarksManager;
    private _process: BenchmarkProcess;
    private _report: ReportGenerator;
    private _environment: EnvironmentManager;

    public constructor() {
        this._configuration = new ConfigurationManager();
        this._results = new ResultsManager();
        this._parameters = new ParametersManager(this._configuration);
        this._benchmarks = new BenchmarksManager(this._configuration, this._parameters);
        this._process = new BenchmarkProcess(this._configuration, this._results);
        this._environment = new EnvironmentManager();
        this._report = new ReportGenerator(this._configuration, this._results, 
            this._parameters, this._benchmarks, this._environment);
    }

    public get configuration(): ConfigurationManager {
        return this._configuration;
    }

    public get results(): ResultsManager {
        return this._results;
    }

    public get parameters(): ParametersManager {
        return this._parameters;
    }

    public get process(): BenchmarkProcess {
        return this._process;
    }

    public get benchmarks(): BenchmarksManager {
        return this._benchmarks;
    }

    public get report(): ReportGenerator {
        return this._report;
    }

    public get environment(): EnvironmentManager {
        return this._environment;
    }

    public get running(): boolean {
        return this._process.running;
    }

    public start(): void {
        this._process.start(this._benchmarks.suites);
    }

    public stop(): void {
        this._process.stop();
    }

    public run(callback: () => void): void {
        this._process.run(this._benchmarks.suites, callback);
    }
}