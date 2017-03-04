import { Parameter } from './Parameter';
import { Benchmark } from './Benchmark';
import { DelegatedBenchmark } from './DelegatedBenchmark';
import { IExecutionContext } from './IExecutionContext';

export class BenchmarkSuite {
    private _name: string;
    private _description: string;
    private _parameters: any = {};
    private _benchmarks: Benchmark[] = [];
    private _context: IExecutionContext;

    protected constructor(name: string, description: string) {
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

    public get parameters(): any {
        return this._parameters;
    }

    public addParameter(parameter: Parameter): Parameter {
        this._parameters[parameter.name] = parameter;
        return parameter;
    }
    
    public createParameter(name: string, description: string, defaultValue?: string): Parameter {
        let parameter = new Parameter(name, description, defaultValue);
        this._parameters[name] = parameter;
        return parameter;
    }
    
    public get benchmarks(): Benchmark[] {
        return this._benchmarks;
    }

    public addBenchmark(benchmark: Benchmark): Benchmark {
        this._benchmarks.push(benchmark);
        return benchmark;
    }

    public createBenchmark(name: string, description: string, executeCallback: (callback: (err?: any) => void) => void): Benchmark {
        let benchmark = new DelegatedBenchmark(name, description, executeCallback);
        this._benchmarks.push(benchmark);
        return benchmark;
    }

    public setUp(callback: (err?: any) => void): void {
        callback(null);
    }

    public tearDown(callback: (err?: any) => void): void {
        callback(null);
    }
}
