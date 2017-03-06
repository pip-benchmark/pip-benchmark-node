"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Parameter_1 = require("../../Parameter");
const SimpleTypeConverter_1 = require("../../utilities/SimpleTypeConverter");
class NominalRateParameter extends Parameter_1.Parameter {
    constructor(configuration) {
        super("General.Benchmarking.NominalRate", "Rate for nominal benchmarking in TPS", "1");
        this._configuration = configuration;
    }
    get value() {
        return SimpleTypeConverter_1.SimpleTypeConverter.doubleToString(this._configuration.nominalRate);
    }
    set value(value) {
        this._configuration.nominalRate = SimpleTypeConverter_1.SimpleTypeConverter.stringToDouble(value, 1);
    }
}
exports.NominalRateParameter = NominalRateParameter;
//# sourceMappingURL=NominalRateParameter.js.map