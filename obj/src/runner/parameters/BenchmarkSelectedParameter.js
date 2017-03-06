"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util = require('util');
const Parameter_1 = require("../../Parameter");
const SimpleTypeConverter_1 = require("../../utilities/SimpleTypeConverter");
class BenchmarkSelectedParameter extends Parameter_1.Parameter {
    constructor(benchmark) {
        super(util.format("%s.%s.Selected", benchmark.suite.name, benchmark.name), util.format("Selecting benchmark %s in suite %s", benchmark.name, benchmark.suite.name), "true");
        this._benchmark = benchmark;
    }
    get value() {
        return SimpleTypeConverter_1.SimpleTypeConverter.booleanToString(this._benchmark.selected);
    }
    set value(value) {
        this._benchmark.selected = SimpleTypeConverter_1.SimpleTypeConverter.stringToBoolean(value);
    }
}
exports.BenchmarkSelectedParameter = BenchmarkSelectedParameter;
//# sourceMappingURL=BenchmarkSelectedParameter.js.map