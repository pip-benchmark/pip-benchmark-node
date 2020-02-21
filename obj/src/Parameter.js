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
    getAsNullableString() {
        return this.value;
    }
    getAsStringWithDefault(defaultValue) {
        return this.value || defaultValue;
    }
    setAsString(value) {
        this.value = value;
    }
    getAsBoolean() {
        return Converter_1.Converter.stringToBoolean(this.value, false);
    }
    getAsNullableBoolean() {
        return Converter_1.Converter.stringToBoolean(this.value, null);
    }
    getAsBooleanWithDefault(defaultValue) {
        return Converter_1.Converter.stringToBoolean(this.value, defaultValue);
    }
    setAsBoolean(value) {
        this.value = Converter_1.Converter.booleanToString(value);
    }
    getAsInteger() {
        return Converter_1.Converter.stringToInteger(this.value, 0);
    }
    getAsNullableInteger() {
        return Converter_1.Converter.stringToInteger(this.value, null);
    }
    getAsIntegerWithDefault(defaultValue) {
        return Converter_1.Converter.stringToInteger(this.value, defaultValue);
    }
    setAsInteger(value) {
        this.value = Converter_1.Converter.integerToString(value);
    }
    getAsLong() {
        return Converter_1.Converter.stringToLong(this.value, 0);
    }
    getAsNullableLong() {
        return Converter_1.Converter.stringToLong(this.value, null);
    }
    getAsLongWithDefault(defaultValue) {
        return Converter_1.Converter.stringToLong(this.value, defaultValue);
    }
    setAsLong(value) {
        this.value = Converter_1.Converter.longToString(value);
    }
    getAsFloat() {
        return Converter_1.Converter.stringToFloat(this.value, 0);
    }
    getAsNullableFloat() {
        return Converter_1.Converter.stringToFloat(this.value, null);
    }
    getAsFloatWithDefault(defaultValue) {
        return Converter_1.Converter.stringToFloat(this.value, defaultValue);
    }
    setAsFloat(value) {
        this.value = Converter_1.Converter.floatToString(value);
    }
    getAsDouble() {
        return Converter_1.Converter.stringToDouble(this.value, 0);
    }
    getAsNullableDouble() {
        return Converter_1.Converter.stringToDouble(this.value, null);
    }
    getAsDoubleWithDefault(defaultValue) {
        return Converter_1.Converter.stringToDouble(this.value, defaultValue);
    }
    setAsDouble(value) {
        this.value = Converter_1.Converter.doubleToString(value);
    }
}
exports.Parameter = Parameter;
//# sourceMappingURL=Parameter.js.map