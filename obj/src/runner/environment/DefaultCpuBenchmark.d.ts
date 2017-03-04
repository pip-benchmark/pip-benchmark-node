import { Benchmark } from '../../Benchmark';
export declare class DefaultCpuBenchmark extends Benchmark {
    private static readonly NumberOfAttempts;
    constructor();
    execute(callback: (err: any) => void): void;
}
