import { Benchmark } from './Benchmark';
export declare class PassiveBenchmark extends Benchmark {
    constructor(name: string, description: string);
    execute(callback: (err: any) => void): void;
}
