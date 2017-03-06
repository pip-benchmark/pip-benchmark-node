"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Converter_1 = require("./utilities/Converter");
class Parameter {
    constructor(name, description, defaultValue) {
        this._name = name;
        this._description = description;
        this._defaultValue = defaultValue;
        this._value = defaultValue;
    }
    get name() {
        return this._name;
    }
    get description() {
        return this._description;
    }
    get defaultValue() {
        return this._defaultValue;
    }
    get value() {
        return this._value;
    }
    set value(value) {
        this._value = value;
    }
    getAsString() {
        return this.value;
    }
    setAsString(value) {
        this.value = value;
    }
    getAsBoolean() {
        return Converter_1.Converter.stringToBoolean(this.value);
    }
    setAsBoolean(value) {
        this.value = Converter_1.Converter.booleanToString(value);
    }
    getAsInteger() {
        return Converter_1.Converter.stringToInteger(this.value, 0);
    }
    setAsInteger(value) {
        this.value = Converter_1.Converter.integerToString(value);
    }
    getAsLong() {
        return Converter_1.Converter.stringToLong(this.value, 0);
    }
    setAsLong(value) {
        this.value = Converter_1.Converter.longToString(value);
    }
    getAsFloat() {
        return Converter_1.Converter.stringToFloat(this.value, 0);
    }
    setAsFloat(value) {
        this.value = Converter_1.Converter.floatToString(value);
    }
    getAsDouble() {
        return Converter_1.Converter.stringToDouble(this.value, 0);
    }
    setAsDouble(value) {
        this.value = Converter_1.Converter.doubleToString(value);
    }
}
exports.Parameter = Parameter;
//# sourceMappingURL=Parameter.js.map