import { MeasurementType } from './MeasurementType';
import { ExecutionType } from './ExecutionType';
import { ConfigurationCallback } from './ConfigurationCallback';
export declare class ConfigurationManager {
    private _measurementType;
    private _nominalRate;
    private _executionType;
    private _duration;
    private _forceContinue;
    private _changeListeners;
    constructor();
    get measurementType(): MeasurementType;
    set measurementType(value: MeasurementType);
    get nominalRate(): number;
    set nominalRate(value: number);
    get executionType(): ExecutionType;
    set executionType(value: ExecutionType);
    get duration(): number;
    set duration(value: number);
    get forceContinue(): boolean;
    set forceContinue(value: boolean);
    addChangeListener(listener: ConfigurationCallback): void;
    removeChangeListener(listener: ConfigurationCallback): void;
    notifyChanged(): void;
}
