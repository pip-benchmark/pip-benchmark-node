"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NominalRateParameter = void 0;
const Parameter_1 = require("../../Parameter");
const Converter_1 = require("../../utilities/Converter");
class NominalRateParameter extends Parameter_1.Parameter {
    constructor(configuration) {
        super("General.Benchmarking.NominalRate", "Rate for nominal benchmarking in TPS", "1");
        this._configuration = configuration;
    }
    get value() {
        return Converter_1.Converter.doubleToString(this._configuration.nominalRate);
    }
    set value(value) {
        this._configuration.nominalRate = Converter_1.Converter.stringToDouble(value, 1);
    }
}
exports.NominalRateParameter = NominalRateParameter;
//# sourceMappingURL=NominalRateParameter.js.map