import { BenchmarkRunner } from './BenchmarkRunner';
import { BenchmarkSuite } from '../BenchmarkSuite';
import { MeasurementType } from './config/MeasurementType';
import { ExecutionType } from './config/ExecutionType';
export declare class BenchmarkBuilder {
    protected _runner: BenchmarkRunner;
    forceContinue(isForceContinue?: boolean): BenchmarkBuilder;
    measureAs(measurementType: MeasurementType): BenchmarkBuilder;
    withNominalRate(nominalRate: number): BenchmarkBuilder;
    executeAs(executionType: ExecutionType): BenchmarkBuilder;
    forDuration(duration: number): BenchmarkBuilder;
    addSuite(suite: BenchmarkSuite): BenchmarkBuilder;
    withParameter(name: string, value: any): BenchmarkBuilder;
    withBenchmark(name: string): BenchmarkBuilder;
    withAllBenchmarks(): BenchmarkBuilder;
    create(): BenchmarkRunner;
}
