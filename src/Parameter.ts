import { SimpleTypeConverter } from './SimpleTypeConverter';

export class Parameter {

    public constructor(name: string, description: string, defaultValue: string) {
        this.name = name;
        this.description = description;
        this.defaultValue = defaultValue;
        this.value = defaultValue;
    }

    public name: string;
    public description: string;
    public defaultValue: string;
    public value: string;

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
