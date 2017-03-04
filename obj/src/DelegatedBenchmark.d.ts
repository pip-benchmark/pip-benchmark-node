import { Benchmark } from './Benchmark';
export declare class DelegatedBenchmark extends Benchmark {
    private _executeCallback;
    constructor(name: string, description: string, executeCallback: (callback: (err?: any) => void) => void);
    execute(callback: (err?: any) => void): void;
}
