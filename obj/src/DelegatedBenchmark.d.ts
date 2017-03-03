import { Benchmark } from './Benchmark';
export declare class DelegatedBenchmark extends Benchmark {
    private _executeCallback;
    constructor(name: string, description: string, executeCallback: () => void);
    setUp(): void;
    execute(): void;
    tearDown(): void;
}
