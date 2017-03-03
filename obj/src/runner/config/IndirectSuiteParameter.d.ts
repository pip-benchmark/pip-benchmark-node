import { Parameter } from '../../Parameter';
import { BenchmarkSuiteInstance } from '../BenchmarkSuiteInstance';
export declare class IndirectSuiteParameter extends Parameter {
    private _originalParameter;
    constructor(suite: BenchmarkSuiteInstance, originalParameter: Parameter);
    value: string;
}
