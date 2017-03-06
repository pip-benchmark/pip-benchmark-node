import { ConfigurationManager } from '../config/ConfigurationManager';
import { ResultsManager } from '../results/ResultsManager';
import { BenchmarkSuiteInstance } from '../benchmarks/BenchmarkSuiteInstance';
export declare class BenchmarkProcess {
    protected _configuration: ConfigurationManager;
    protected _results: ResultsManager;
    private _strategy;
    private _suites;
    constructor(configuration: ConfigurationManager, results: ResultsManager);
    readonly running: boolean;
    start(suites: BenchmarkSuiteInstance[]): void;
    run(suites: BenchmarkSuiteInstance[], callback: () => void): void;
    stop(): void;
}
