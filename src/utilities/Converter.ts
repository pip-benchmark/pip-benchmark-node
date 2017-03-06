export class Converter {

    public static stringToInteger(value: string, defaultValue: number): number {
        return Converter.stringToLong(value, defaultValue);
    }

    public static integerToString(value: number): string {
        return Converter.longToString(value);
    }

    public static stringToLong(value: string, defaultValue: number): number {
        if (value == null) return defaultValue;
        try {
            let result = parseInt(value);
            return !isNaN(result) ? result : defaultValue;
        } catch (ex) {
            return defaultValue;
        }
    }

    public static longToString(value: number): string {
        return value != null ? value.toString() : null;
    }

    public static stringToFloat(value: string, defaultValue: number): number {
        return Converter.stringToDouble(value, defaultValue);
    }

    public static floatToString(value: number): string {
        return Converter.doubleToString(value);
    }

    public static stringToDouble(value: string, defaultValue: number): number {
        if (value == null) return defaultValue;
        try {
            let result = parseFloat(value);
            return !isNaN(result) ? result : defaultValue;
        } catch (ex) {
            return defaultValue;
        }
    }

    public static doubleToString(value: number): string {
        return value != null ? value.toString() : null;
    }

    public static stringToBoolean(value: string): boolean {
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

    public static booleanToString(value: boolean): string {
        return value ? "true" : "false";
    }
}
