import { BenchmarkMeter } from './BenchmarkMeter';
export declare class TransactionMeter extends BenchmarkMeter {
    private _transactionCounter;
    private _lastMeasuredTicks;
    constructor();
    getLastMeasuredTicks(): number;
    incrementTransactionCounter(): void;
    setTransactionCounter(value: number): void;
    protected performMeasurement(): number;
}
