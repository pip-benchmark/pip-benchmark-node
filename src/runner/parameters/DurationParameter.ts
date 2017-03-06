import { Parameter } from '../../Parameter';
import { SimpleTypeConverter } from '../../SimpleTypeConverter';
import { ConfigurationManager } from '../config/ConfigurationManager';

export class DurationParameter extends Parameter {
    private _configuration: ConfigurationManager;

    public constructor(configuration: ConfigurationManager) {
        super(
            "General.Benchmarking.Duration", 
            "Duration of benchmark execution in seconds", 
            "60"
        );
        this._configuration = configuration;
    }

    public get value(): string {
        return SimpleTypeConverter.integerToString(this._configuration.duration); 
    }
    
    public set value(value: string) {
        this._configuration.duration = SimpleTypeConverter.stringToInteger(value, 60);
    }
}
