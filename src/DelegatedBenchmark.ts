import { Benchmark } from './Benchmark';

export class DelegatedBenchmark extends Benchmark {
    private _executeCallback: (callback: (err: any) => void) => void;

    public constructor(name: string, description: string, 
        executeCallback: (callback: (err: any) => void) => void) {
        super(name, description);
        
        if (executeCallback == null)
            throw new Error("ExecuteCallback cannot be null");

       this._executeCallback = executeCallback;
    }

    public execute(callback: (err: any) => void): void {
        this._executeCallback(callback);
    }
}

