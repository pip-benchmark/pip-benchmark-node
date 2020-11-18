"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Parameter_1 = require("../../Parameter");
const MeasurementType_1 = require("../config/MeasurementType");
class MeasurementTypeParameter extends Parameter_1.Parameter {
    constructor(configuration) {
        super("General.Benchmarking.MeasurementType", "Performance type: peak or nominal", "Peak");
        this._configuration = configuration;
    }
    get value() {
        return this._configuration.measurementType == MeasurementType_1.MeasurementType.Peak ? "Peak" : "Nominal";
    }
    set value(value) {
        value = value.toLowerCase();
        this._configuration.measurementType = value.startsWith("p")
            ? MeasurementType_1.MeasurementType.Peak : MeasurementType_1.MeasurementType.Nominal;
    }
}
exports.MeasurementTypeParameter = MeasurementTypeParameter;
//# sourceMappingURL=MeasurementTypeParameter.js.map