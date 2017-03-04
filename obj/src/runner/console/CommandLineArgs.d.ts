import { MeasurementType } from '../MeasurementType';
import { ExecutionType } from '../ExecutionType';
export declare class CommandLineArgs {
    constructor(args: string[]);
    private processArguments(args);
    modules: string[];
    classes: string[];
    benchmarks: string[];
    parameters: any;
    configurationFile: string;
    reportFile: string;
    duration: number;
    showHelp: boolean;
    showBenchmarks: boolean;
    showParameters: boolean;
    benchmarkEnvironment: boolean;
    measurementType: MeasurementType;
    executionType: ExecutionType;
    nominalRate: number;
}
