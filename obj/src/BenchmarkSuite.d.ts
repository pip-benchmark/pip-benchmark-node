import { Parameter } from './Parameter';
import { Benchmark } from './Benchmark';
import { IExecutionContext } from './IExecutionContext';
export declare abstract class BenchmarkSuite {
    protected constructor(name: string, description: string);
    name: string;
    description: string;
    parameters: any;
    benchmarks: Benchmark[];
    context: IExecutionContext;
    addParameter(parameter: Parameter): Parameter;
    createParameter(name: string, description: string, defaultValue?: string): Parameter;
    protected addBenchmark(benchmark: Benchmark): Benchmark;
    protected createBenchmark(name: string, description: string, executeCallback: () => void): Benchmark;
    setUp(): void;
    tearDown(): void;
}
