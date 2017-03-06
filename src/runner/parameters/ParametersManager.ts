var _ = require('lodash');

import { Parameter } from '../../Parameter';
import { ConfigurationManager } from '../config/ConfigurationManager';
import { BenchmarkSuiteInstance } from '../benchmarks/BenchmarkSuiteInstance';
import { BenchmarkInstance } from '../benchmarks/BenchmarkInstance';
import { MeasurementTypeParameter } from './MeasurementTypeParameter';
import { NominalRateParameter } from './NominalRateParameter';
import { ExecutionTypeParameter } from './ExecutionTypeParameter';
import { DurationParameter } from './DurationParameter';
import { BenchmarkSelectedParameter } from './BenchmarkSelectedParameter';
import { BenchmarkProportionParameter } from './BenchmarkProportionParameter';
import { BenchmarkSuiteParameter } from './BenchmarkSuiteParameter';
import { Properties } from '../../utilities/Properties';

export class ParametersManager {
    private _configuration: ConfigurationManager;
    private _execution: any;
    private _parameters: Parameter[] = [];

    public constructor(configuration: ConfigurationManager) {
        this._configuration = configuration;

        this._parameters.push(new MeasurementTypeParameter(configuration));
        this._parameters.push(new NominalRateParameter(configuration));
        this._parameters.push(new ExecutionTypeParameter(configuration));
        this._parameters.push(new DurationParameter(configuration));
    }
 
    public get userDefined(): Parameter[] {
        let parameters: Parameter[] = [];

        _.each(this._parameters, (parameter) => {
            if (!parameter.name.endsWith(".Selected") 
                && !parameter.name.endsWith(".Proportion")
                && !parameter.name.startsWith("General.")) {
                parameters.push(parameter);
            }
        });

        return parameters; 
    }

    public get all(): Parameter[] {
        return this._parameters;
    }

    public loadFromFile(path: string): void {
        let properties = new Properties();
        properties.loadFromFile(path);

        _.each(this._parameters, (parameter) => {
            if (properties.hasOwnProperty(parameter.name))
                parameter.value = properties[parameter.name];
        });

        this._configuration.notifyChanged();
    }

    public saveToFile(fileName: string): void {
        let properties = new Properties();
        for (let index = 0; index < this._parameters.length; index++) {
            let parameter = this._parameters[index];
            properties[parameter.name] = parameter.value;
        }
        properties.saveToFile(fileName);
    }

    public addSuite(suite: BenchmarkSuiteInstance): void {
        _.each(suite.benchmarks, (benchmark) => {
            let benchmarkSelectedParameter
                = new BenchmarkSelectedParameter(benchmark);
            this._parameters.push(benchmarkSelectedParameter);

            let benchmarkProportionParameter
                = new BenchmarkProportionParameter(benchmark);
            this._parameters.push(benchmarkProportionParameter);
        });

        _.each(suite.parameters, (parameter) => {
            let suiteParameter = new BenchmarkSuiteParameter(suite, parameter);
            this._parameters.push(suiteParameter);
        });

        this._configuration.notifyChanged();
    }

    public removeSuite(suite: BenchmarkSuiteInstance): void {
        let parameterNamePrefix = suite.name + ".";

        this._parameters = _.remove(this._parameters, (parameter) => {
            return parameter.name.startsWith(parameterNamePrefix);
        });

        this._configuration.notifyChanged();
    }

    public setToDefault(): void {
        _.each(this._parameters, (parameter) => {
            if (parameter instanceof BenchmarkSuiteParameter)
                parameter.value = parameter.defaultValue;
        });

        this._configuration.notifyChanged();
    }

    public set(parameters: any) {
        _.each(this._parameters, (parameter) => {
            if (parameters.hasOwnProperty(parameter.name))
                parameter.value = parameters[parameter.name];
        });

        this._configuration.notifyChanged();
    }
 
}
