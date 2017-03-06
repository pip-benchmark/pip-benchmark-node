"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util = require('util');
const Parameter_1 = require("../../Parameter");
const Converter_1 = require("../../utilities/Converter");
class BenchmarkProportionParameter extends Parameter_1.Parameter {
    constructor(benchmark) {
        super(util.format("%s.%s.Proportion", benchmark.suite.name, benchmark.name), util.format("Sets execution proportion for benchmark %s in suite %s", benchmark.name, benchmark.suite.name), "100");
        this._benchmark = benchmark;
    }
    get value() {
        return Converter_1.Converter.integerToString(this._benchmark.proportion);
    }
    set value(value) {
        this._benchmark.proportion = Converter_1.Converter.stringToInteger(value, 100);
    }
}
exports.BenchmarkProportionParameter = BenchmarkProportionParameter;
//# sourceMappingURL=BenchmarkProportionParameter.js.map