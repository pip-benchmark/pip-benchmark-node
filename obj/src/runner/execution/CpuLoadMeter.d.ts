import { BenchmarkMeter } from './BenchmarkMeter';
export declare class CpuLoadMeter extends BenchmarkMeter {
    private _lastTotalIdle;
    private _lastTotal;
    constructor();
    clear(): void;
    protected performMeasurement(): number;
}
