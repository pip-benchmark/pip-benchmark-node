"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecutionTypeParameter = void 0;
const Parameter_1 = require("../../Parameter");
const ExecutionType_1 = require("../config/ExecutionType");
class ExecutionTypeParameter extends Parameter_1.Parameter {
    constructor(configuration) {
        super("General.Benchmarking.ExecutionType", "Execution type: proportional or sequencial", "Proportional");
        this._configuration = configuration;
    }
    get value() {
        return this._configuration.executionType == ExecutionType_1.ExecutionType.Proportional
            ? "Proportional" : "Sequencial";
    }
    set value(value) {
        value = value.toLowerCase();
        this._configuration.executionType = value.startsWith("p")
            ? ExecutionType_1.ExecutionType.Proportional : ExecutionType_1.ExecutionType.Sequential;
    }
}
exports.ExecutionTypeParameter = ExecutionTypeParameter;
//# sourceMappingURL=ExecutionTypeParameter.js.map