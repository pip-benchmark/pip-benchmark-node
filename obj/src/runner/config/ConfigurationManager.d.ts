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
    measurementType: MeasurementType;
    nominalRate: number;
    executionType: ExecutionType;
    duration: number;
    forceContinue: boolean;
    addChangeListener(listener: ConfigurationCallback): void;
    removeChangeListener(listener: ConfigurationCallback): void;
    notifyChanged(): void;
}
