import { Parameter } from '../../Parameter';
import { BenchmarkInstance } from '../benchmarks/BenchmarkInstance';
export declare class BenchmarkSelectedParameter extends Parameter {
    private _benchmark;
    constructor(benchmark: BenchmarkInstance);
    get value(): string;
    set value(value: string);
}
