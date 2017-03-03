import { BenchmarkSuite } from '../BenchmarkSuite';
import { BenchmarkInstance } from './BenchmarkInstance';
import { IExecutionContext } from '../IExecutionContext';
export declare class BenchmarkSuiteInstance {
    private _suite;
    private _benchmarks;
    constructor(suite: BenchmarkSuite);
    readonly suite: BenchmarkSuite;
    readonly name: string;
    readonly description: string;
    readonly parameters: any;
    readonly benchmarks: BenchmarkInstance[];
    selectAllBenchmarks(): void;
    selectBenchmark(benchmarkName: string): void;
    unselectAllBenchmarks(): void;
    unselectBenchmark(benchmarkName: string): void;
    setUp(context: IExecutionContext, callback: (err: any) => void): void;
    tearDown(callback: (err: any) => void): void;
}
