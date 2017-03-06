import { BenchmarkSuiteInstance } from './BenchmarkSuiteInstance';
import { BenchmarkInstance } from './BenchmarkInstance';
export declare class BenchmarkSuiteManager {
    private _runner;
    private _suites;
    constructor(runner: any);
    readonly suites: BenchmarkSuiteInstance[];
    getSelectedBenchmarks(): BenchmarkInstance[];
    selectAllBenchmarks(): void;
    selectBenchmarksByName(benchmarkNames: string[]): void;
    selectBenchmarks(benchmarks: BenchmarkInstance[]): void;
    unselectAllBenchmarks(): void;
    unselectBenchmarksByName(benchmarkNames: string[]): void;
    unselectBenchmarks(benchmarks: BenchmarkInstance[]): void;
    addSuiteFromClass(suiteClassName: string): void;
    addSuite(suite: any): void;
    loadSuitesFromModule(moduleName: string): void;
    private findSuite(suiteName);
    removeSuiteByName(suiteName: string): void;
    removeSuite(suite: any): void;
    removeAllSuites(): void;
}
