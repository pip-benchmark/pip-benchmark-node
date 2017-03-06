import { BenchmarkProcess } from '../execution/BenchmarkProcess';
export declare class EnvironmentState extends BenchmarkProcess {
    private static readonly Duration;
    private _cpuBenchmark;
    private _videoBenchmark;
    private _diskBenchmark;
    constructor(runner: any);
    readonly systemInformation: any;
    readonly cpuBenchmark: number;
    readonly videoBenchmark: number;
    readonly diskBenchmark: number;
    benchmarkEnvironment(cpu: boolean, disk: boolean, video: boolean, callback?: (err: any) => void): void;
    private loadSystemBenchmarks();
    private saveSystemBenchmarks();
    private computeCpuBenchmark(callback);
    private computeDiskBenchmark(callback);
    private computeVideoBenchmark(callback);
}
