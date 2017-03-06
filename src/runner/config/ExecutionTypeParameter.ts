import { Parameter } from '../../Parameter';
import { SimpleTypeConverter } from '../../SimpleTypeConverter';
import { ExecutionType } from '../ExecutionType';

export class ExecutionTypeParameter extends Parameter {
    private _process: any;

    public constructor(process: any) {
        super(
            "General.Benchmarking.ExecutionType",
            "Execution type: proportional or sequencial",
            "Proportional"
        );
        this._process = process;
    }

    public get value(): string {
        return this._process.getExecutionType() == ExecutionType.Proportional 
            ? "Proportional" : "Sequencial"; 
    }

    public set value(value: string) {
        value = value.toLowerCase();
        this._process.executionType = value.startsWith("p")
            ? ExecutionType.Proportional : ExecutionType.Sequential;
    }
}
