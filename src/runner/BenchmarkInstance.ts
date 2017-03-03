import { IExecutionContext } from '../IExecutionContext';
import { Benchmark } from '../Benchmark';
import { PassiveBenchmark } from '../PassiveBenchmark';

export class BenchmarkInstance {
    private _suite: any;
    private _benchmark: Benchmark;
    private _selected: boolean = false;
    private _proportion: number = 100;
    private _startExecutionTrigger: number;
    private _endExecutionTrigger: number;

    public constructor(suite: any, benchmark: Benchmark) {
        this._suite = suite;
        this._benchmark = benchmark;
    }

    public get suite(): any {
        return this._suite;
    }

    public get benchmark(): Benchmark {
        return this._benchmark;
    }
    
    public get name(): string {
        return this._benchmark.name;
    }

    public get fullName(): string {
        return '' + this._suite.name + '.' + this.name;
    }

    public get description(): string {
        return this._benchmark.description;
    }

    public get selected(): boolean {
        return this._selected;
    }
    
    public set selected(value: boolean) {
        this._selected = value;
    }

    public get passive(): boolean {
        return this._benchmark instanceof PassiveBenchmark;
    }

    public get proportion(): number {
        return this._proportion;
    }
    
    public set proportion(value: number) {
        this._proportion = Math.max(0, Math.min(10000, value));
    }

    public get startExecutionTrigger(): number {
        return this._startExecutionTrigger;
    }
    
    public set startExecutionTrigger(value: number) {
        this._startExecutionTrigger = value;
    }
    
    public get endExecutionTrigger(): number {
        return this._endExecutionTrigger;
    }
    
    public set endExecutionTrigger(value: number) {
        this._endExecutionTrigger = value;
    }

    public isTriggered(trigger: number): boolean {
    	return trigger >= this._startExecutionTrigger && trigger < this._endExecutionTrigger;
    }
    
    public setUp(context: IExecutionContext, callback: (err: any) => void): void {
        this._benchmark.context = context;
        
        try {
            this._benchmark.setUp(callback);
        } catch (ex) {
            callback(ex);
        }
    }
    
    public execute(callback: (err: any) => void): void {
        try {
            this._benchmark.execute(callback);
        } catch (ex) {
            callback(ex);
        }
    }
    
    public tearDown(callback: (err: any) => void): void {
        try {
            this._benchmark.tearDown(callback);
        } catch (ex) {
            callback(ex);
        }

        this._benchmark.context = null;
    }
}
