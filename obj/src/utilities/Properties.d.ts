import { PropertyFileLine } from './PropertyFileLine';
export declare class Properties {
    lines: PropertyFileLine[];
    loadFromFile(file: string): void;
    private populateItems;
    saveToFile(file: string): void;
    private findLine;
    private synchronizeItems;
    getAsString(key: string, defaultValue: string): string;
    setAsString(key: string, value: string): void;
    getAsInteger(key: string, defaultValue: number): number;
    setAsInteger(key: string, value: number): void;
    getAsLong(key: string, defaultValue: number): number;
    setAsLong(key: string, value: number): void;
    getAsDouble(key: string, defaultValue: number): number;
    setAsDouble(key: string, value: number): void;
    getAsBoolean(key: string, defaultValue: boolean): boolean;
    setAsBoolean(key: string, value: boolean): void;
}
