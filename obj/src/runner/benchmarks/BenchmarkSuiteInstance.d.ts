import { BenchmarkSuite } from '../../BenchmarkSuite';
import { BenchmarkInstance } from './BenchmarkInstance';
import { IExecutionContext } from '../../IExecutionContext';
import { Parameter } from '../../Parameter';
export declare class BenchmarkSuiteInstance {
    private _suite;
    private _benchmarks;
    constructor(suite: BenchmarkSuite);
    get suite(): BenchmarkSuite;
    get name(): string;
    get description(): string;
    get parameters(): Parameter[];
    get benchmarks(): BenchmarkInstance[];
    get isSelected(): BenchmarkInstance[];
    selectAll(): void;
    selectByName(benchmarkName: string): void;
    unselectAll(): void;
    unselectByName(benchmarkName: string): void;
    setUp(context: IExecutionContext, callback: (err: any) => void): void;
    tearDown(callback: (err: any) => void): void;
}
