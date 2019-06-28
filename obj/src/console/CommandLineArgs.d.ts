import { MeasurementType } from '../runner/config/MeasurementType';
import { ExecutionType } from '../runner/config/ExecutionType';
export declare class CommandLineArgs {
    constructor(args: string[]);
    private processArguments;
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
    showReport: boolean;
    measureEnvironment: boolean;
    measurementType: MeasurementType;
    executionType: ExecutionType;
    nominalRate: number;
}
