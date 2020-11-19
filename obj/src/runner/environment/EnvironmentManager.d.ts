import { ExecutionManager } from '../execution/ExecutionManager';
export declare class EnvironmentManager extends ExecutionManager {
    private static readonly Duration;
    private _cpuMeasurement;
    private _videoMeasurement;
    private _diskMeasurement;
    constructor();
    get systemInfo(): any;
    get cpuMeasurement(): number;
    get videoMeasurement(): number;
    get diskMeasurement(): number;
    measure(cpu: boolean, disk: boolean, video: boolean, callback?: (err: any) => void): void;
    private load;
    private save;
    private measureCpu;
    private measureDisk;
    private measureVideo;
}
