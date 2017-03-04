import { BenchmarkSuite } from '../../BenchmarkSuite';
import { DefaultCpuBenchmark } from './DefaultCpuBenchmark';
import { DefaultDiskBenchmark } from './DefaultDiskBenchmark';
import { DefaultVideoBenchmark } from './DefaultVideoBenchmark';
export declare class StandardBenchmarkSuite extends BenchmarkSuite {
    private _cpuBenchmark;
    private _diskBenchmark;
    private _videoBenchmark;
    constructor();
    readonly cpuBenchmark: DefaultCpuBenchmark;
    readonly diskBenchmark: DefaultDiskBenchmark;
    readonly videoBenchmark: DefaultVideoBenchmark;
}
