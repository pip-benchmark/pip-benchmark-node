"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Parameter_1 = require("../../Parameter");
const ExecutionType_1 = require("../ExecutionType");
class ExecutionTypeParameter extends Parameter_1.Parameter {
    constructor(process) {
        super("General.Benchmarking.ExecutionType", "Execution type: proportional or sequencial", "Proportional");
        this._process = process;
    }
    get value() {
        return this._process.getExecutionType() == ExecutionType_1.ExecutionType.Proportional
            ? "Proportional" : "Sequencial";
    }
    set value(value) {
        value = value.toLowerCase();
        this._process.executionType = value.startsWith("p")
            ? ExecutionType_1.ExecutionType.Proportional : ExecutionType_1.ExecutionType.Sequential;
    }
}
exports.ExecutionTypeParameter = ExecutionTypeParameter;
//# sourceMappingURL=ExecutionTypeParameter.js.map