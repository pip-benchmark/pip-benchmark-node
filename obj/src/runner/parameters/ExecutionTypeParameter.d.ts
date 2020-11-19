import { Parameter } from '../../Parameter';
import { ConfigurationManager } from '../config/ConfigurationManager';
export declare class ExecutionTypeParameter extends Parameter {
    private _configuration;
    constructor(configuration: ConfigurationManager);
    value: string;
}
