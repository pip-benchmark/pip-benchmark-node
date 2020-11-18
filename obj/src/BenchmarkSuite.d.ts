import { Parameter } from './Parameter';
import { Benchmark } from './Benchmark';
import { IExecutionContext } from './IExecutionContext';
export declare class BenchmarkSuite {
    private _name;
    private _description;
    private _parameters;
    private _benchmarks;
    private _context;
    protected constructor(name: string, description: string);
    readonly name: string;
    readonly description: string;
    context: IExecutionContext;
    readonly parameters: any;
    addParameter(parameter: Parameter): Parameter;
    createParameter(name: string, description: string, defaultValue?: string): Parameter;
    readonly benchmarks: Benchmark[];
    addBenchmark(benchmark: Benchmark): Benchmark;
    createBenchmark(name: string, description: string, executeCallback: (callback: (err?: any) => void) => void): Benchmark;
    setUp(callback: (err?: any) => void): void;
    tearDown(callback: (err?: any) => void): void;
}
