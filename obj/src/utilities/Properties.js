"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
var os = require('os');
const PropertyFileLine_1 = require("./PropertyFileLine");
const Converter_1 = require("./Converter");
class Properties {
    constructor() {
        this.lines = [];
    }
    loadFromFile(file) {
        let content = fs.readFileSync(file, { encoding: 'UTF-8' }).toString();
        let lines = content.split(/[\r\n]+/g);
        for (let index = 0; index < lines.length; index++) {
            let line = new PropertyFileLine_1.PropertyFileLine(lines[index]);
            this.lines.push(line);
        }
        this.populateItems();
    }
    populateItems() {
        for (let prop in this) {
            if (this.hasOwnProperty && prop != 'lines')
                delete this[prop];
        }
        for (let index = 0; index < this.lines.length; index++) {
            let line = this.lines[index];
            if (line.key != null && line.key.length > 0) {
                this[line.key] = line.value;
            }
        }
    }
    saveToFile(file) {
        this.synchronizeItems();
        let content = '';
        for (let index = 0; index < this.lines.length; index++) {
            let line = this.lines[index];
            content += line.line + os.EOL;
        }
        fs.writeFileSync(file, content, { encoding: 'UTF-8' });
    }
    findLine(key) {
        for (let index = 0; index < this.lines.length; index++) {
            let line = this.lines[index];
            if (key == line.key) {
                return line;
            }
        }
        return null;
    }
    synchronizeItems() {
        // Update existing values and create missing lines
        for (let prop in this) {
            if (!this.hasOwnProperty(prop))
                continue;
            if (prop == 'lines')
                continue;
            let line = this.findLine(prop);
            if (line != null) {
                line.value = '' + this[prop];
            }
            else {
                line = new PropertyFileLine_1.PropertyFileLine(prop, '' + this[prop], null);
                this.lines.push(line);
            }
        }
        // Remove lines mismatched with listed keys
        for (let index = this.lines.length - 1; index >= 0; index--) {
            let line = this.lines[index];
            if (line.key != null && !this.hasOwnProperty(line.key)) {
                this.lines = this.lines.splice(index, 1);
            }
        }
    }
    getAsString(key, defaultValue) {
        let value = this[key];
        if (value == null)
            return defaultValue;
        return value.toString();
    }
    setAsString(key, value) {
        this[key] = value;
    }
    getAsInteger(key, defaultValue) {
        let value = this[key];
        if (value == null)
            return defaultValue;
        return Converter_1.Converter.stringToInteger(value, defaultValue);
    }
    setAsInteger(key, value) {
        this[key] = Converter_1.Converter.integerToString(value);
    }
    getAsLong(key, defaultValue) {
        let value = this[key];
        if (value == null)
            return defaultValue;
        return Converter_1.Converter.stringToLong(value, defaultValue);
    }
    setAsLong(key, value) {
        this[key] = Converter_1.Converter.longToString(value);
    }
    getAsDouble(key, defaultValue) {
        let value = this[key];
        if (value == null)
            return defaultValue;
        return Converter_1.Converter.stringToDouble(value, defaultValue);
    }
    setAsDouble(key, value) {
        this[key] = Converter_1.Converter.doubleToString(value);
    }
    getAsBoolean(key, defaultValue) {
        let value = this[key];
        if (value == null)
            return defaultValue;
        return Converter_1.Converter.stringToBoolean(value);
    }
    setAsBoolean(key, value) {
        this[key] = Converter_1.Converter.booleanToString(value);
    }
}
exports.Properties = Properties;
//# sourceMappingURL=Properties.js.map