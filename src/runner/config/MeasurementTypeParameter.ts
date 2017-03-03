import { Parameter } from '../../Parameter';
import { SimpleTypeConverter } from '../../SimpleTypeConverter';
import { MeasurementType } from '../MeasurementType';

export class MeasurementTypeParameter extends Parameter {
    private _process: any;

    public constructor(process: any) {
        super(
            "General.Benchmarking.MeasurementType",
            "Performance type: peak or nominal", 
            "Peak"
        );
        this._process = process;
    }

    public get value(): string {
         return this._process.measurementType == MeasurementType.Peak ? "Peak" : "Nominal"; 
   }
    
    public set value(value: string) {
        value = value.toLowerCase();
        this._process.measurementType = value.startsWith("p")
            ? MeasurementType.Peak : MeasurementType.Nominal;
    }
}
