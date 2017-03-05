import { BenchmarkMeter } from './BenchmarkMeter';
export declare class CpuLoadMeter extends BenchmarkMeter {
    private _lastTime;
    private _lastTotalIdle;
    private _lastTotal;
    constructor();
    reset(): void;
    protected performMeasurement(): number;
}
