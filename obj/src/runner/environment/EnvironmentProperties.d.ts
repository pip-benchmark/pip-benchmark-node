import { Properties } from '../utilities/Properties';
export declare class EnvironmentProperties extends Properties {
    private getFilePath();
    cpuBenchmark: number;
    diskBenchmark: number;
    videoBenchmark: number;
    load(): void;
    save(): void;
}
