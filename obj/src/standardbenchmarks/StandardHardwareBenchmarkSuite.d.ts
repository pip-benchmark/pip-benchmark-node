import { BenchmarkSuite } from '../BenchmarkSuite';
import { StandardCpuBenchmark } from './StandardCpuBenchmark';
import { StandardDiskBenchmark } from './StandardDiskBenchmark';
import { StandardVideoBenchmark } from './StandardVideoBenchmark';
export declare class StandardHardwareBenchmarkSuite extends BenchmarkSuite {
    private _cpuBenchmarkTest;
    private _diskBenchmarkTest;
    private _videoBenchmarkTest;
    constructor();
    readonly cpuBenchmarkTest: StandardCpuBenchmark;
    readonly diskBenchmarkTest: StandardDiskBenchmark;
    readonly videoBenchmarkTest: StandardVideoBenchmark;
}
