var util = require('util');

import { Parameter } from '../../Parameter';
import { SimpleTypeConverter } from '../../utilities/SimpleTypeConverter';
import { BenchmarkInstance } from '../benchmarks/BenchmarkInstance';

export class BenchmarkSelectedParameter extends Parameter {
    private _benchmark: BenchmarkInstance;

    public constructor(benchmark: BenchmarkInstance) {
        super(util.format("%s.%s.Selected", benchmark.suite.name, benchmark.name),
            util.format("Selecting benchmark %s in suite %s", 
            benchmark.name, benchmark.suite.name), "true");
        this._benchmark = benchmark;
    }

    public get value(): string {
        return SimpleTypeConverter.booleanToString(this._benchmark.selected); 
    }
    
    public set value(value: string) {
        this._benchmark.selected = SimpleTypeConverter.stringToBoolean(value);
    }
}
