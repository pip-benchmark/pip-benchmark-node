export declare class PropertyFileLine {
    private _line;
    private _key;
    private _value;
    private _comment;
    constructor(key: string, value?: string, comment?: string);
    get key(): string;
    get value(): string;
    set value(value: string);
    get comment(): string;
    set comment(value: string);
    get line(): string;
    private composeNewLine;
    private parseLine;
    private indexOfComment;
    private decodeValue;
    private encodeValue;
    toString(): string;
}
