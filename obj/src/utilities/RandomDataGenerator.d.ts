export declare class RandomDataGenerator {
    private static readonly AllowStringChars;
    constructor();
    randomStringList(minCount: number, maxCount: number, itemSize: number): string[];
    randomString(size: number): string;
    randomByteArray(size: number): number[];
    randomInteger(minValue: number, maxValue: number): number;
    randomDouble(minValue: number, maxValue: number): number;
    randomBoolean(): boolean;
}
