import { Properties } from '../../utilities/Properties';
export declare class EnvironmentProperties extends Properties {
    private getFilePath;
    get cpuBenchmark(): number;
    set cpuBenchmark(value: number);
    get diskBenchmark(): number;
    set diskBenchmark(value: number);
    get videoBenchmark(): number;
    set videoBenchmark(value: number);
    load(): void;
    save(): void;
}
