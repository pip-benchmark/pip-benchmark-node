export declare class PropertyFileLine {
    private _line;
    private _key;
    private _value;
    private _comment;
    constructor(key: string, value?: string, comment?: string);
    readonly key: string;
    value: string;
    comment: string;
    readonly line: string;
    private composeNewLine;
    private parseLine;
    private indexOfComment;
    private decodeValue;
    private encodeValue;
    toString(): string;
}
