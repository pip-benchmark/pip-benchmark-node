import { ConfigurationManager } from '../config/ConfigurationManager';
import { BenchmarkSuiteInstance } from '../benchmarks/BenchmarkSuiteInstance';
import { ExecutionState } from '../ExecutionState';
import { BenchmarkResult } from '../BenchmarkResult';
export declare class BenchmarkProcess {
    private _configuration;
    private _strategy;
    private _suites;
    private _results;
    constructor(configuration: ConfigurationManager);
    readonly running: boolean;
    readonly results: BenchmarkResult[];
    start(suites: BenchmarkSuiteInstance[]): void;
    run(suites: BenchmarkSuiteInstance[], callback: () => void): void;
    stop(): void;
    notifyResultUpdate(status: ExecutionState, result: BenchmarkResult): void;
    notifyMessageSent(message: string): void;
    notifyErrorReported(errorMessage: string): void;
}
