import { Converter } from './utilities/Converter';

export class Parameter {
    private _name: string;
    private _description: string;
    private _defaultValue: string;
    private _value: string;

    public constructor(name: string, description: string, defaultValue: string) {
        this._name = name;
        this._description = description;
        this._defaultValue = defaultValue;
        this._value = defaultValue;
    }

    public get name(): string {
        return this._name;
    }

    public get description(): string {
        return this._description;
    }

    public get defaultValue(): string {
        return this._defaultValue;
    }

    public get value(): string {
        return this._value;
    }

    public set value(value: string) {
        this._value = value;
    }

    public getAsString(): string {
        return this.value;
    }

    public getAsNullableString(): string {
        return this.value;
    }

    public getAsStringWithDefault(defaultValue: string): string {
        return this.value || defaultValue;
    }

    public setAsString(value: string): void {
        this.value = value;
    }

    public getAsBoolean(): boolean {
        return Converter.stringToBoolean(this.value, false); 
    }

    public getAsNullableBoolean(): boolean {
        return Converter.stringToBoolean(this.value, null); 
    }

    public getAsBooleanWithDefault(defaultValue: boolean): boolean {
        return Converter.stringToBoolean(this.value, defaultValue); 
    }
    
    public setAsBoolean(value: boolean): void {
        this.value = Converter.booleanToString(value);
    }

    public getAsInteger(): number {
        return Converter.stringToInteger(this.value, 0);
    }

    public getAsNullableInteger(): number {
        return Converter.stringToInteger(this.value, null);
    }

    public getAsIntegerWithDefault(defaultValue: number): number {
        return Converter.stringToInteger(this.value, defaultValue);
    }

    public setAsInteger(value: number): void {
        this.value = Converter.integerToString(value);
    }

    public getAsLong(): number {
        return Converter.stringToLong(this.value, 0); 
    }

    public getAsNullableLong(): number {
        return Converter.stringToLong(this.value, null); 
    }

    public getAsLongWithDefault(defaultValue: number): number {
        return Converter.stringToLong(this.value, defaultValue); 
    }

    public setAsLong(value: number): void {
        this.value = Converter.longToString(value);
    }

    public getAsFloat(): number {
        return Converter.stringToFloat(this.value, 0); 
    }

    public getAsNullableFloat(): number {
        return Converter.stringToFloat(this.value, null); 
    }

    public getAsFloatWithDefault(defaultValue: number): number {
        return Converter.stringToFloat(this.value, defaultValue); 
    }

    public setAsFloat(value: number): void {
        this.value = Converter.floatToString(value);
    }

    public getAsDouble(): number {
        return Converter.stringToDouble(this.value, 0); 
    }

    public getAsNullableDouble(): number {
        return Converter.stringToDouble(this.value, null); 
    }

    public getAsDoubleWithDefault(defaultValue: number): number {
        return Converter.stringToDouble(this.value, defaultValue); 
    }

    public setAsDouble(value: number): void {
        this.value = Converter.doubleToString(value);
    }
}
