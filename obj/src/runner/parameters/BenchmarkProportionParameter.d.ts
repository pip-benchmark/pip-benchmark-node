import { Parameter } from '../../Parameter';
import { BenchmarkInstance } from '../BenchmarkInstance';
export declare class BenchmarkProportionParameter extends Parameter {
    private _benchmark;
    constructor(benchmark: BenchmarkInstance);
    value: string;
}
