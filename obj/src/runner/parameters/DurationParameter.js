"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DurationParameter = void 0;
const Parameter_1 = require("../../Parameter");
const Converter_1 = require("../../utilities/Converter");
class DurationParameter extends Parameter_1.Parameter {
    constructor(configuration) {
        super("General.Benchmarking.Duration", "Duration of benchmark execution in seconds", "60");
        this._configuration = configuration;
    }
    get value() {
        return Converter_1.Converter.integerToString(this._configuration.duration);
    }
    set value(value) {
        this._configuration.duration = Converter_1.Converter.stringToInteger(value, 60);
    }
}
exports.DurationParameter = DurationParameter;
//# sourceMappingURL=DurationParameter.js.map