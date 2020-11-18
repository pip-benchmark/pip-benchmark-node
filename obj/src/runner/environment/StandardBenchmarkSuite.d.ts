import { BenchmarkSuite } from '../../BenchmarkSuite';
import { DefaultCpuBenchmark } from './DefaultCpuBenchmark';
import { DefaultDiskBenchmark } from './DefaultDiskBenchmark';
import { DefaultVideoBenchmark } from './DefaultVideoBenchmark';
export declare class StandardBenchmarkSuite extends BenchmarkSuite {
    private _cpuBenchmark;
    private _diskBenchmark;
    private _videoBenchmark;
    constructor();
    get cpuBenchmark(): DefaultCpuBenchmark;
    get diskBenchmark(): DefaultDiskBenchmark;
    get videoBenchmark(): DefaultVideoBenchmark;
}
