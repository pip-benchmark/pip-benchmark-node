import { Parameter } from '../../Parameter';
import { BenchmarkSuiteInstance } from '../benchmarks/BenchmarkSuiteInstance';
export declare class BenchmarkSuiteParameter extends Parameter {
    private _originalParameter;
    constructor(suite: BenchmarkSuiteInstance, originalParameter: Parameter);
    value: string;
}
