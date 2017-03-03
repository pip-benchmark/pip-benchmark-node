export declare class Parameter {
    private _name;
    private _description;
    private _defaultValue;
    private _value;
    constructor(name: string, description: string, defaultValue: string);
    readonly name: string;
    readonly description: string;
    readonly defaultValue: string;
    value: string;
    getAsString(): string;
    setAsString(value: string): void;
    getAsBoolean(): boolean;
    setAsBoolean(value: boolean): void;
    getAsInteger(): number;
    setAsInteger(value: number): void;
    getAsLong(): number;
    setAsLong(value: number): void;
    getAsFloat(): number;
    setAsFloat(value: number): void;
    getAsDouble(): number;
    setAsDouble(value: number): void;
}
