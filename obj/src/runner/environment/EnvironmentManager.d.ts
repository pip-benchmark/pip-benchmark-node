import { BenchmarkProcess } from '../execution/BenchmarkProcess';
export declare class EnvironmentManager extends BenchmarkProcess {
    private static readonly Duration;
    private _cpuMeasurement;
    private _videoMeasurement;
    private _diskMeasurement;
    constructor();
    readonly systemInfo: any;
    readonly cpuMeasurement: number;
    readonly videoMeasurement: number;
    readonly diskMeasurement: number;
    measure(cpu: boolean, disk: boolean, video: boolean, callback?: (err: any) => void): void;
    private load();
    private save();
    private measureCpu(callback);
    private measureDisk(callback);
    private measureVideo(callback);
}
