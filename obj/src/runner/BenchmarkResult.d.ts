import { Measurement } from './Measurement';
import { BenchmarkInstance } from './benchmarks/BenchmarkInstance';
export declare class BenchmarkResult {
    benchmarks: BenchmarkInstance[];
    startTime: number;
    elapsedTime: number;
    performanceMeasurement: Measurement;
    cpuLoadMeasurement: Measurement;
    memoryUsageMeasurement: Measurement;
    errors: string[];
}
