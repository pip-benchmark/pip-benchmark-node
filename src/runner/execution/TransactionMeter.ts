import { BenchmarkMeter } from './BenchmarkMeter';

export class TransactionMeter extends BenchmarkMeter {
    private _transactionCounter: number;
    private _lastMeasuredTicks: number = 0;

    public constructor() {
    	super();
    }

    public getLastMeasuredTicks(): number {
        return this._lastMeasuredTicks;
    }

    public incrementTransactionCounter(): void {
        this._transactionCounter++;
    }

    public setTransactionCounter(value: number): void {
        this._transactionCounter = value;
    }

    protected performMeasurement(): number {
        let currentTicks = new Date().getTime();
        let durationInMsecs = currentTicks - this._lastMeasuredTicks;
        let result = this._transactionCounter * 1000 / durationInMsecs;
        this._lastMeasuredTicks = currentTicks;
        this._transactionCounter = 0;
        return result;
    }
}
