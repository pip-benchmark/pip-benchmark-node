import { Parameter } from '../../Parameter';
import { BenchmarkSuiteInstance } from '../BenchmarkSuiteInstance';
export declare class ConfigurationManager {
    private _parameters;
    private _runner;
    constructor(runner: any);
    readonly runner: any;
    getFilteredParameters(): Parameter[];
    getAllParameters(): Parameter[];
    loadConfigurationFromFile(fileName: string): void;
    private setParameterValue(parameterName, value);
    saveConfigurationToFile(fileName: string): void;
    createParametersForSuite(suite: BenchmarkSuiteInstance): void;
    removeParametersForSuite(suite: BenchmarkSuiteInstance): void;
    setConfigurationToDefault(): void;
    setConfiguration(parameters: any): void;
}
