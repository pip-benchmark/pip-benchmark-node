import { BenchmarkBuilder } from '../runner/BenchmarkBuilder';
import { BenchmarkRunner } from '../runner/BenchmarkRunner';
export declare class ConsoleBenchmarkBuilder extends BenchmarkBuilder {
    configureWithArgs(args: any): BenchmarkBuilder;
    create(): BenchmarkRunner;
}
