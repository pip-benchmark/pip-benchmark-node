var fs = require('fs');
var os = require('os');

import { PropertyFileLine } from './PropertyFileLine';
import { SimpleTypeConverter } from '../../SimpleTypeConverter';

export class Properties {
    public lines: PropertyFileLine[] = [];

    public loadFromFile(file: string): void {
        let content: string = fs.readFileSync(file, { encoding: 'UTF-8' }).toString();
        let lines = content.split(/[\r\n]+/g);

        for (let index = 0; index < lines.length; index++) {
            let line = new PropertyFileLine(lines[index]);
            this.lines.push(line);
        }

        this.populateItems();
    }

    private populateItems(): void {
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

    public saveToFile(file: string): void {
        this.synchronizeItems();

        let content = '';
        for (let index = 0; index < this.lines.length; index++) {
            let line = this.lines[index];
            content = line.line + os.EOL;
        }

        fs.writeFileSync(file, content, { encoding: 'UTF-8' });
    }

    private findLine(key: string): PropertyFileLine {
        for (let index = 0; index < this.lines.length; index++) {
            let line = this.lines[index];
            if (key == line.key) {
                return line;
            }
        }
        return null;
    }

    private synchronizeItems(): void {
        // Update existing values and create missing lines
        for (let prop in this) {
            if (!this.hasOwnProperty(prop)) continue;

            let line = this.findLine(prop);
            if (line != null) {
                line.value = '' + this[prop];
            } else {
                line = new PropertyFileLine(prop, '' + this[prop], null);
                this.lines.push(line);
            }
        }

        // Remove lines mismatched with listed keys
        for (let index = this.lines.length - 1; index >= 0; index--) {
            let line = this.lines[index];
            if (line.key != null && this[line.key] == null) {
                this.lines = this.lines.splice(index, 1);
            }
        }
    }

    public getAsString(key: string, defaultValue: string): string {
        let value = this[key];
        if (value == null) return defaultValue;
        return value.toString();
    }

    public setAsString(key: string, value: string): void {
        this[key] = value;
    }

    public getAsInteger(key: string, defaultValue: number): number {
        let value = this[key];
        if (value == null) return defaultValue;
        return SimpleTypeConverter.stringToInteger(value, defaultValue);
    }

    public setAsInteger(key: string, value: number): void {
        this[key] = SimpleTypeConverter.integerToString(value);
    }

    public getAsLong(key: string, defaultValue: number): number {
        let value = this[key];
        if (value == null) return defaultValue;
        return SimpleTypeConverter.stringToLong(value, defaultValue);
    }

    public setAsLong(key: string, value: number): void {
        this[key] = SimpleTypeConverter.longToString(value);
    }

    public getAsDouble(key: string, defaultValue: number): number {
        let value = this[key];
        if (value == null) return defaultValue;
        return SimpleTypeConverter.stringToDouble(value, defaultValue);
    }

    public setAsDouble(key: string, value: number): void {
        this[key] = SimpleTypeConverter.doubleToString(value);
    }

    public getAsBoolean(key: string, defaultValue: boolean): boolean {
        let value = this[key];
        if (value == null) return defaultValue;
        return SimpleTypeConverter.stringToBoolean(value);
    }

    public setAsBoolean(key: string, value: boolean): void {
        this[key] = SimpleTypeConverter.booleanToString(value);
    }

}
