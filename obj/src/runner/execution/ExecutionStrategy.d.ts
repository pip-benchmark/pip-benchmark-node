import { ConfigurationManager } from '../config/ConfigurationManager';
import { ResultsManager } from '../results/ResultsManager';
import { BenchmarkInstance } from '../benchmarks/BenchmarkInstance';
import { BenchmarkSuiteInstance } from '../benchmarks/BenchmarkSuiteInstance';
export declare abstract class ExecutionStrategy {
    protected _configuration: ConfigurationManager;
    protected _results: ResultsManager;
    protected _execution: any;
    protected _benchmarks: BenchmarkInstance[];
    protected _activeBenchmarks: BenchmarkInstance[];
    protected _suites: BenchmarkSuiteInstance[];
    protected constructor(configuration: ConfigurationManager, results: ResultsManager, execution: any, benchmarks: BenchmarkInstance[]);
    private getActiveBenchmarks;
    private getBenchmarkSuites;
    abstract isStopped: boolean;
    abstract start(callback?: (err: any) => void): void;
    abstract stop(callback?: (err: any) => void): void;
}
