import { Parameter } from '../../Parameter';
import { SimpleTypeConverter } from '../../SimpleTypeConverter';

export class DurationParameter extends Parameter {
    private _process: any;

    public constructor(process: any) {
        super(
            "General.Benchmarking.Duration", 
            "Duration of benchmark execution in seconds", 
            "60"
        );
        this._process = process;
    }

    public get value(): string {
        return SimpleTypeConverter.integerToString(this._process.duration / 1000); 
    }
    
    public set value(value: string) {
        this._process.setDuration(SimpleTypeConverter.stringToInteger(value, 60) * 1000);
    }
}
