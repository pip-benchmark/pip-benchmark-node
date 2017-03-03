import { Benchmark } from './Benchmark';

export class DelegatedBenchmark extends Benchmark {
    private _executeCallback: () => void;

    public constructor(name: string, description: string, executeCallback: () => void) {
        super(name, description);
        
        if (executeCallback == null)
            throw new Error("ExecuteCallback cannot be null");

       this._executeCallback = executeCallback;
    }

    public setUp(): void { }

    public execute(): void {
        this._executeCallback();
    }

    public tearDown(): void { }
}

