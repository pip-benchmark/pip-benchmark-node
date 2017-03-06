import { Parameter } from '../../Parameter';
import { ConfigurationManager } from '../config/ConfigurationManager';
import { BenchmarkSuiteInstance } from '../benchmarks/BenchmarkSuiteInstance';
export declare class ParametersManager {
    private _configuration;
    private _execution;
    private _parameters;
    constructor(configuration: ConfigurationManager);
    readonly userDefined: Parameter[];
    readonly all: Parameter[];
    loadFromFile(path: string): void;
    saveToFile(fileName: string): void;
    addSuite(suite: BenchmarkSuiteInstance): void;
    removeSuite(suite: BenchmarkSuiteInstance): void;
    setToDefault(): void;
    set(parameters: any): void;
}
