import { Parameter } from '../../Parameter';
import { BenchmarkInstance } from '../benchmarks/BenchmarkInstance';
export declare class BenchmarkProportionParameter extends Parameter {
    private _benchmark;
    constructor(benchmark: BenchmarkInstance);
    get value(): string;
    set value(value: string);
}
