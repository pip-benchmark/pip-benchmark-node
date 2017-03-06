import { ConfigurationManager } from '../config/ConfigurationManager';
import { ResultsManager } from '../results/ResultsManager';
import { ParametersManager } from '../parameters/ParametersManager';
import { BenchmarksManager } from '../benchmarks/BenchmarksManager';
import { EnvironmentManager } from '../environment/EnvironmentManager';
export declare class ReportGenerator {
    private static readonly SeparatorLine;
    private static readonly NewLine;
    private _configuration;
    private _results;
    private _parameters;
    private _benchmarks;
    private _environment;
    constructor(configuration: ConfigurationManager, results: ResultsManager, parameters: ParametersManager, benchmarks: BenchmarksManager, environment: EnvironmentManager);
    generate(): string;
    saveToFile(fileName: string): void;
    private generateHeader();
    private generateBenchmarkList();
    private generateMultipleResults();
    private generateSingleResult();
    private generateSystemInfo();
    private generateSystemBenchmark();
    private generateParameters();
}
