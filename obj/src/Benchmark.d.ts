import { IExecutionContext } from './IExecutionContext';
export declare abstract class Benchmark {
    private _name;
    private _description;
    private _context;
    constructor(name: string, description: string);
    readonly name: string;
    readonly description: string;
    context: IExecutionContext;
    setUp(callback: (err: any) => void): void;
    abstract execute(callback: (err: any) => void): void;
    tearDown(callback: (err: any) => void): void;
}
