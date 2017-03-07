import { ConfigurationManager } from './config/ConfigurationManager';
import { ResultsManager } from './results/ResultsManager';
import { BenchmarksManager } from './benchmarks/BenchmarksManager';
import { ParametersManager } from './parameters/ParametersManager';
import { ExecutionManager } from './execution/ExecutionManager';
import { ReportGenerator } from './reports/ReportGenerator';
import { EnvironmentManager } from './environment/EnvironmentManager';
export declare class BenchmarkRunner {
    private _configuration;
    private _results;
    private _parameters;
    private _benchmarks;
    private _execution;
    private _report;
    private _environment;
    constructor();
    readonly configuration: ConfigurationManager;
    readonly results: ResultsManager;
    readonly parameters: ParametersManager;
    readonly execution: ExecutionManager;
    readonly benchmarks: BenchmarksManager;
    readonly report: ReportGenerator;
    readonly environment: EnvironmentManager;
    readonly isRunning: boolean;
    start(): void;
    stop(): void;
    run(callback: (err: any) => void): void;
}
