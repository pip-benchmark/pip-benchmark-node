import { SimpleTypeConverter } from './utilities/SimpleTypeConverter';

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
    
    public setAsString(value: string): void {
        this.value = value;
    }

    public getAsBoolean(): boolean {
        return SimpleTypeConverter.stringToBoolean(this.value); 
    }
    
    public setAsBoolean(value: boolean): void {
        this.value = SimpleTypeConverter.booleanToString(value);
    }

    public getAsInteger(): number {
        return SimpleTypeConverter.stringToInteger(this.value, 0);
    }
    
    public setAsInteger(value: number): void {
        this.value = SimpleTypeConverter.integerToString(value);
    }

    public getAsLong(): number {
        return SimpleTypeConverter.stringToLong(this.value, 0); 
    }
    
    public setAsLong(value: number): void {
        this.value = SimpleTypeConverter.longToString(value);
    }

    public getAsFloat(): number {
        return SimpleTypeConverter.stringToFloat(this.value, 0); 
    }
    
    public setAsFloat(value: number): void {
        this.value = SimpleTypeConverter.floatToString(value);
    }

    public getAsDouble(): number {
        return SimpleTypeConverter.stringToDouble(this.value, 0); 
    }
    
    public setAsDouble(value: number): void {
        this.value = SimpleTypeConverter.doubleToString(value);
    }
}
