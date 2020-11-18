import { Parameter } from '../../Parameter';
import { ConfigurationManager } from '../config/ConfigurationManager';
import { BenchmarkSuiteInstance } from '../benchmarks/BenchmarkSuiteInstance';
export declare class ParametersManager {
    private _configuration;
    private _parameters;
    constructor(configuration: ConfigurationManager);
    get userDefined(): Parameter[];
    get all(): Parameter[];
    loadFromFile(path: string): void;
    saveToFile(path: string): void;
    addSuite(suite: BenchmarkSuiteInstance): void;
    removeSuite(suite: BenchmarkSuiteInstance): void;
    setToDefault(): void;
    set(parameters: any): void;
}
