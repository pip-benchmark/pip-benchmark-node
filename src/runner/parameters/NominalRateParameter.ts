import { Parameter } from '../../Parameter';
import { SimpleTypeConverter } from '../../SimpleTypeConverter';

export class NominalRateParameter extends Parameter {
    private _process: any;

    public constructor(process: any) {
        super(
            "General.Benchmarking.NominalRate",
            "Rate for nominal benchmarking in TPS", 
            "1"
        );
        this._process = process;
    }

    public get value(): string {
        return SimpleTypeConverter.doubleToString(this._process.nominalRate); 
    }
    
    public set value(value: string) {
        this._process.nominalRate = SimpleTypeConverter.stringToDouble(value, 1);
    }
}
