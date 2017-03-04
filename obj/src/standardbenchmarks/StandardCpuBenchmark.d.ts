import { Benchmark } from '../Benchmark';
export declare class StandardCpuBenchmark extends Benchmark {
    private static readonly NumberOfAttempts;
    constructor();
    setUp(callback: (err: any) => void): void;
    execute(callback: (err: any) => void): void;
    tearDown(callback: (err: any) => void): void;
}
