"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Parameter_1 = require("../../Parameter");
const MeasurementType_1 = require("../MeasurementType");
class MeasurementTypeParameter extends Parameter_1.Parameter {
    constructor(process) {
        super("General.Benchmarking.MeasurementType", "Performance type: peak or nominal", "Peak");
        this._process = process;
    }
    get value() {
        return this._process.measurementType == MeasurementType_1.MeasurementType.Peak ? "Peak" : "Nominal";
    }
    set value(value) {
        value = value.toLowerCase();
        this._process.measurementType = value.startsWith("p")
            ? MeasurementType_1.MeasurementType.Peak : MeasurementType_1.MeasurementType.Nominal;
    }
}
exports.MeasurementTypeParameter = MeasurementTypeParameter;
//# sourceMappingURL=MeasurementTypeParameter.js.map