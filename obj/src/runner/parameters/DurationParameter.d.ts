import { Parameter } from '../../Parameter';
import { ConfigurationManager } from '../config/ConfigurationManager';
export declare class DurationParameter extends Parameter {
    private _configuration;
    constructor(configuration: ConfigurationManager);
    value: string;
}
