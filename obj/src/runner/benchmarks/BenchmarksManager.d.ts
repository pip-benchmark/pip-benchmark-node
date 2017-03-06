import { BenchmarkSuiteInstance } from './BenchmarkSuiteInstance';
import { BenchmarkInstance } from './BenchmarkInstance';
export declare class BenchmarksManager {
    private _runner;
    private _suites;
    constructor(runner: any);
    readonly suites: BenchmarkSuiteInstance[];
    readonly selected: BenchmarkInstance[];
    selectAll(): void;
    selectByName(benchmarkNames: string[]): void;
    select(benchmarks: BenchmarkInstance[]): void;
    unselectAll(): void;
    unselectByName(benchmarkNames: string[]): void;
    unselect(benchmarks: BenchmarkInstance[]): void;
    addSuiteFromClass(suiteClassName: string): void;
    addSuite(suite: any): void;
    addSuitesFromModule(moduleName: string): void;
    private findSuite(suiteName);
    removeSuiteByName(suiteName: string): void;
    removeSuite(suite: any): void;
    clear(): void;
}
