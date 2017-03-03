import { Parameter } from '../../Parameter';
import { BenchmarkInstance } from '../BenchmarkInstance';
export declare class BenchmarkSelectedParameter extends Parameter {
    private _benchmark;
    constructor(benchmark: BenchmarkInstance);
    value: string;
}
