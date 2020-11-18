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
    readonly measurement: Measurement;
    lastMeasuredTime: number;
    currentValue: number;
    minValue: number;
    maxValue: number;
    averageValue: number;
    clear(): void;
    protected calculateAggregates(): void;
    measure(): number;
    protected abstract performMeasurement(): number;
}
