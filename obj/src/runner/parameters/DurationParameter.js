"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Parameter_1 = require("../../Parameter");
const SimpleTypeConverter_1 = require("../../utilities/SimpleTypeConverter");
class DurationParameter extends Parameter_1.Parameter {
    constructor(configuration) {
        super("General.Benchmarking.Duration", "Duration of benchmark execution in seconds", "60");
        this._configuration = configuration;
    }
    get value() {
        return SimpleTypeConverter_1.SimpleTypeConverter.integerToString(this._configuration.duration);
    }
    set value(value) {
        this._configuration.duration = SimpleTypeConverter_1.SimpleTypeConverter.stringToInteger(value, 60);
    }
}
exports.DurationParameter = DurationParameter;
//# sourceMappingURL=DurationParameter.js.map