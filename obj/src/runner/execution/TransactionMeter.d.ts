import { BenchmarkMeter } from './BenchmarkMeter';
export declare class TransactionMeter extends BenchmarkMeter {
    private _transactionCounter;
    constructor();
    incrementTransactionCounter(): void;
    setTransactionCounter(value: number): void;
    protected performMeasurement(): number;
}
