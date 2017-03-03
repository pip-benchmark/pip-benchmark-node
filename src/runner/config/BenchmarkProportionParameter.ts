var util = require('util');

import { Parameter } from '../../Parameter';
import { SimpleTypeConverter } from '../../SimpleTypeConverter';

export class BenchmarkProportionParameter extends Parameter {
    // private _benchmark: BenchmarkInstance;

    // public constructor(benchmark: BenchmarkInstance) {
    //     super(util.format("%s.%s.Proportion", benchmark.getSuite().getName(), benchmark.getName()),
    //         util.format("Sets execution proportion for benchmark %s in suite %s", 
    //         benchmark.getName(), benchmark.getSuite().getName()), "100");
    //     this._benchmark = benchmark;
    // }

    // public get value(): string {
    //     return SimpleTypeConverter.integerToString(this._benchmark.proportion); 
    // }
    
    // public set value(value: string) {
    //     this._benchmark.proportion = SimpleTypeConverter.stringToInteger(value, 100);
    // }
}
