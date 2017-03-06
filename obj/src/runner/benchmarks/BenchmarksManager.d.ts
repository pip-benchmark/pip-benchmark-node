import { BenchmarkSuiteInstance } from './BenchmarkSuiteInstance';
import { BenchmarkInstance } from './BenchmarkInstance';
import { ConfigurationManager } from '../config/ConfigurationManager';
import { ParametersManager } from '../parameters/ParametersManager';
export declare class BenchmarksManager {
    private _configuration;
    private _parameters;
    private _suites;
    constructor(configuration: ConfigurationManager, parameters: ParametersManager);
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
    removeSuiteByName(suiteName: string): void;
    removeSuite(suite: any): void;
    clear(): void;
}
