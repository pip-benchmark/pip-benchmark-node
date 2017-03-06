"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MeasurementType_1 = require("./MeasurementType");
const ExecutionType_1 = require("./ExecutionType");
class ConfigurationManager {
    constructor() {
        this._measurementType = MeasurementType_1.MeasurementType.Peak;
        this._nominalRate = 1;
        this._executionType = ExecutionType_1.ExecutionType.Proportional;
        this._duration = 60;
        this._forceContinue = false;
        this._changeListeners = [];
    }
    get measurementType() {
        return this._measurementType;
    }
    set measurementType(value) {
        this._measurementType = value;
        this.notifyChanged();
    }
    get nominalRate() {
        return this._nominalRate;
    }
    set nominalRate(value) {
        this._nominalRate = value;
        this.notifyChanged();
    }
    get executionType() {
        return this._executionType;
    }
    set executionType(value) {
        this._executionType = value;
        this.notifyChanged();
    }
    get duration() {
        return this._duration;
    }
    set duration(value) {
        this._duration = value;
        this.notifyChanged();
    }
    get forceContinue() {
        return this._forceContinue;
    }
    set forceContinue(value) {
        this._forceContinue = value;
        this.notifyChanged();
    }
    addChangeListener(listener) {
        this._changeListeners.push(listener);
    }
    removeChangeListener(listener) {
        for (let index = this._changeListeners.length - 1; index >= 0; index--) {
            if (this._changeListeners[index] == listener)
                this._changeListeners = this._changeListeners.splice(index, 1);
        }
    }
    notifyChanged() {
        for (let index = 0; index < this._changeListeners.length; index++) {
            try {
                let listener = this._changeListeners[index];
                listener();
            }
            catch (ex) {
                // Ignore and send a message to the next listener.
            }
        }
    }
}
exports.ConfigurationManager = ConfigurationManager;
//# sourceMappingURL=ConfigurationManager.js.map