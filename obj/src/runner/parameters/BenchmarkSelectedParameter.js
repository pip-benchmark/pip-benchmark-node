"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util = require('util');
const Parameter_1 = require("../../Parameter");
const Converter_1 = require("../../utilities/Converter");
class BenchmarkSelectedParameter extends Parameter_1.Parameter {
    constructor(benchmark) {
        super(util.format("%s.%s.Selected", benchmark.suite.name, benchmark.name), util.format("Selecting benchmark %s in suite %s", benchmark.name, benchmark.suite.name), "true");
        this._benchmark = benchmark;
    }
    get value() {
        return Converter_1.Converter.booleanToString(this._benchmark.selected);
    }
    set value(value) {
        this._benchmark.selected = Converter_1.Converter.stringToBoolean(value);
    }
}
exports.BenchmarkSelectedParameter = BenchmarkSelectedParameter;
//# sourceMappingURL=BenchmarkSelectedParameter.js.map