"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BenchmarkSuiteParameter = void 0;
var util = require('util');
const Parameter_1 = require("../../Parameter");
class BenchmarkSuiteParameter extends Parameter_1.Parameter {
    constructor(suite, originalParameter) {
        super(util.format("%s.%s", suite.name, originalParameter.name), originalParameter.description, originalParameter.defaultValue);
        this._originalParameter = originalParameter;
    }
    get value() {
        return this._originalParameter.value;
    }
    set value(value) {
        this._originalParameter.value = value;
    }
}
exports.BenchmarkSuiteParameter = BenchmarkSuiteParameter;
//# sourceMappingURL=BenchmarkSuiteParameter.js.map