"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SimpleTypeConverter {
    static stringToInteger(value, defaultValue) {
        return SimpleTypeConverter.stringToLong(value, defaultValue);
    }
    static integerToString(value) {
        return SimpleTypeConverter.longToString(value);
    }
    static stringToLong(value, defaultValue) {
        if (value == null)
            return defaultValue;
        try {
            let result = parseInt(value);
            return !isNaN(result) ? result : defaultValue;
        }
        catch (ex) {
            return defaultValue;
        }
    }
    static longToString(value) {
        return value != null ? value.toString() : null;
    }
    static stringToFloat(value, defaultValue) {
        return SimpleTypeConverter.stringToDouble(value, defaultValue);
    }
    static floatToString(value) {
        return SimpleTypeConverter.doubleToString(value);
    }
    static stringToDouble(value, defaultValue) {
        if (value == null)
            return defaultValue;
        try {
            let result = parseFloat(value);
            return !isNaN(result) ? result : defaultValue;
        }
        catch (ex) {
            return defaultValue;
        }
    }
    static doubleToString(value) {
        return value != null ? value.toString() : null;
    }
    static stringToBoolean(value) {
        // Process nulls or empty strings
        if (value == null || value.length == 0)
            return false;
        // Process single characters
        if (value.length == 1) {
            return value.charAt(0) == '1' || value.charAt(0) == 'T' || value.charAt(0) == 'Y'
                || value.charAt(0) == 't' || value.charAt(0) == 'y';
        }
        // Process strings
        value = value.toUpperCase();
        return value == "TRUE" || value == "YES";
    }
    static booleanToString(value) {
        return value ? "true" : "false";
    }
}
exports.SimpleTypeConverter = SimpleTypeConverter;
//# sourceMappingURL=SimpleTypeConverter.js.map