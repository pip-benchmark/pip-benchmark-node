import { Measurement } from '../results/Measurement';
export declare abstract class BenchmarkMeter {
    protected _lastMeasuredTime: number;
    private _currentValue;
    private _minValue;
    private _maxValue;
    private _averageValue;
    private _sumOfValues;
    private _numberOfMeasurements;
    constructor();
    get measurement(): Measurement;
    get lastMeasuredTime(): number;
    set lastMeasuredTime(value: number);
    get currentValue(): number;
    set currentValue(value: number);
    get minValue(): number;
    set minValue(value: number);
    get maxValue(): number;
    set maxValue(value: number);
    get averageValue(): number;
    set averageValue(value: number);
    clear(): void;
    protected calculateAggregates(): void;
    measure(): number;
    protected abstract performMeasurement(): number;
}
