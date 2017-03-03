export declare class Parameter {
    constructor(name: string, description: string, defaultValue: string);
    name: string;
    description: string;
    defaultValue: string;
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
