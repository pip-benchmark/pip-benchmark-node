import { Benchmark } from '../Benchmark';
export declare class StandardCpuBenchmark extends Benchmark {
    private static readonly NumberOfAttempts;
    constructor();
    execute(callback: (err: any) => void): void;
}
