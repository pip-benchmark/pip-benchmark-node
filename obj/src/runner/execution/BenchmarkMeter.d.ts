import { Measurement } from '../Measurement';
export declare abstract class BenchmarkMeter {
    private _lastMeasuredTime;
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
    reset(): void;
    protected calculateAggregates(): void;
    measure(): number;
    protected abstract performMeasurement(): number;
}