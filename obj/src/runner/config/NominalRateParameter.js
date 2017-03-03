"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Parameter_1 = require("../../Parameter");
const SimpleTypeConverter_1 = require("../../SimpleTypeConverter");
class NominalRateParameter extends Parameter_1.Parameter {
    constructor(process) {
        super("General.Benchmarking.NominalRate", "Rate for nominal benchmarking in TPS", "1");
        this._process = process;
    }
    get value() {
        return SimpleTypeConverter_1.SimpleTypeConverter.doubleToString(this._process.nominalRate);
    }
    set value(value) {
        this._process.nominalRate = SimpleTypeConverter_1.SimpleTypeConverter.stringToDouble(value, 1);
    }
}
exports.NominalRateParameter = NominalRateParameter;
//# sourceMappingURL=NominalRateParameter.js.map