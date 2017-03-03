"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SimpleTypeConverter_1 = require("./SimpleTypeConverter");
class Parameter {
    constructor(name, description, defaultValue) {
        this.name = name;
        this.description = description;
        this.defaultValue = defaultValue;
        this.value = defaultValue;
    }
    getAsString() {
        return this.value;
    }
    setAsString(value) {
        this.value = value;
    }
    getAsBoolean() {
        return SimpleTypeConverter_1.SimpleTypeConverter.stringToBoolean(this.value);
    }
    setAsBoolean(value) {
        this.value = SimpleTypeConverter_1.SimpleTypeConverter.booleanToString(value);
    }
    getAsInteger() {
        return SimpleTypeConverter_1.SimpleTypeConverter.stringToInteger(this.value, 0);
    }
    setAsInteger(value) {
        this.value = SimpleTypeConverter_1.SimpleTypeConverter.integerToString(value);
    }
    getAsLong() {
        return SimpleTypeConverter_1.SimpleTypeConverter.stringToLong(this.value, 0);
    }
    setAsLong(value) {
        this.value = SimpleTypeConverter_1.SimpleTypeConverter.longToString(value);
    }
    getAsFloat() {
        return SimpleTypeConverter_1.SimpleTypeConverter.stringToFloat(this.value, 0);
    }
    setAsFloat(value) {
        this.value = SimpleTypeConverter_1.SimpleTypeConverter.floatToString(value);
    }
    getAsDouble() {
        return SimpleTypeConverter_1.SimpleTypeConverter.stringToDouble(this.value, 0);
    }
    setAsDouble(value) {
        this.value = SimpleTypeConverter_1.SimpleTypeConverter.doubleToString(value);
    }
}
exports.Parameter = Parameter;
//# sourceMappingURL=Parameter.js.map