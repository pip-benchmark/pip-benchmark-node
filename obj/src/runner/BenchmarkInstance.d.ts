import { IExecutionContext } from '../IExecutionContext';
import { Benchmark } from '../Benchmark';
export declare class BenchmarkInstance {
    private _suite;
    private _benchmark;
    private _selected;
    private _proportion;
    private _startExecutionTrigger;
    private _endExecutionTrigger;
    constructor(suite: any, benchmark: Benchmark);
    readonly suite: any;
    readonly benchmark: Benchmark;
    readonly name: string;
    readonly fullName: string;
    readonly description: string;
    selected: boolean;
    readonly passive: boolean;
    proportion: number;
    startExecutionTrigger: number;
    endExecutionTrigger: number;
    isTriggered(trigger: number): boolean;
    setUp(context: IExecutionContext, callback: (err: any) => void): void;
    execute(callback: (err: any) => void): void;
    tearDown(callback: (err: any) => void): void;
}
