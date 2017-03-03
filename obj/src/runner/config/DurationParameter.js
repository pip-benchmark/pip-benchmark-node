"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Parameter_1 = require("../../Parameter");
const SimpleTypeConverter_1 = require("../../SimpleTypeConverter");
class DurationParameter extends Parameter_1.Parameter {
    constructor(process) {
        super("General.Benchmarking.Duration", "Duration of benchmark execution in seconds", "60");
        this._process = process;
    }
    get value() {
        return SimpleTypeConverter_1.SimpleTypeConverter.integerToString(this._process.duration / 1000);
    }
    set value(value) {
        this._process.setDuration(SimpleTypeConverter_1.SimpleTypeConverter.stringToInteger(value, 60) * 1000);
    }
}
exports.DurationParameter = DurationParameter;
//# sourceMappingURL=DurationParameter.js.map