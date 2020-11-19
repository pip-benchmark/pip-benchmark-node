import { IExecutionContext } from '../../IExecutionContext';
import { Benchmark } from '../../Benchmark';
export declare class BenchmarkInstance {
    private _suite;
    private _benchmark;
    private _selected;
    private _proportion;
    private _startRange;
    private _endRange;
    constructor(suite: any, benchmark: Benchmark);
    get suite(): any;
    get benchmark(): Benchmark;
    get name(): string;
    get fullName(): string;
    get description(): string;
    get isSelected(): boolean;
    set isSelected(value: boolean);
    get isPassive(): boolean;
    get proportion(): number;
    set proportion(value: number);
    get startRange(): number;
    set startRange(value: number);
    get endRange(): number;
    set endRange(value: number);
    withinRange(proportion: number): boolean;
    setUp(context: IExecutionContext, callback: (err: any) => void): void;
    execute(callback: (err: any) => void): void;
    tearDown(callback: (err: any) => void): void;
}
