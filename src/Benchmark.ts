import { IExecutionContext } from './IExecutionContext';

export abstract class Benchmark {
    private _name: string;
    private _description: string;
    private _context: IExecutionContext;

    public constructor(name: string, description: string) {
        this._name = name;
        this._description = description;
    }
    
    public get name(): string {
        return this._name;
    }

    public get description(): string {
        return this._description;
    }

    public get context(): IExecutionContext {
        return this._context;
    }

    public set context(value: IExecutionContext) {
        this._context = value;
    }

    public setUp(callback: (err?: any) => void): void {
        callback(null);
    }

    public abstract execute(callback: (err?: any) => void): void;
    
    public tearDown(callback: (err?: any) => void): void {
        callback(null);
    }
}