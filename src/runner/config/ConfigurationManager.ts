import { Parameter } from '../../Parameter';
import { BenchmarkSuiteInstance } from '../BenchmarkSuiteInstance';
import { BenchmarkInstance } from '../BenchmarkInstance';
import { MeasurementTypeParameter } from './MeasurementTypeParameter';
import { NominalRateParameter } from './NominalRateParameter';
import { ExecutionTypeParameter } from './ExecutionTypeParameter';
import { DurationParameter } from './DurationParameter';
import { BenchmarkSelectedParameter } from './BenchmarkSelectedParameter';
import { BenchmarkProportionParameter } from './BenchmarkProportionParameter';
import { IndirectSuiteParameter } from './IndirectSuiteParameter';
import { Properties } from './Properties';

export class ConfigurationManager {
    private _parameters: Parameter[] = [];
    private _runner: any;

    public constructor(runner: any) {
        this._runner = runner;

        this._parameters.push(new MeasurementTypeParameter(runner.process));
        this._parameters.push(new NominalRateParameter(runner.process));
        this._parameters.push(new ExecutionTypeParameter(runner.process));
        this._parameters.push(new DurationParameter(runner.process));
    }

    public get runner(): any {
        return this._runner;
    }
 
    public getFilteredParameters(): Parameter[] {
        let filteredParameters: Parameter[] = [];
        for (let index = 0; index < this._parameters.length; index++) {
            let parameter = this._parameters[index];
            if (!parameter.name.endsWith(".Selected") 
                && !parameter.name.endsWith(".Proportion")
                && !parameter.name.startsWith("General.")) {
                filteredParameters.push(parameter);
            }
        }
        return filteredParameters; 
    }

    public getAllParameters(): Parameter[] {
        return this._parameters;
    }

    public loadConfigurationFromFile(fileName: string): void {
        let properties = new Properties();
        properties.loadFromFile(fileName);

        for (let prop in properties) {
            if (properties.hasOwnProperty(prop) && prop != 'lines')
                this.setParameterValue(prop, properties[prop]);
        }

        this._runner.notifyConfigurationUpdated();
    }

    private setParameterValue(parameterName: string, value: string): void {
        for (let index = 0; index < this._parameters.length; index++) {
            let parameter = this._parameters[index];
            if (parameter.name == parameterName)
                parameter.value = value;
        }
    }

    public saveConfigurationToFile(fileName: string): void {
        let properties = new Properties();
        for (let index = 0; index < this._parameters.length; index++) {
            let parameter = this._parameters[index];
            properties[parameter.name] = parameter.value;
        }
        properties.saveToFile(fileName);
    }

    public createParametersForSuite(suite: BenchmarkSuiteInstance): void {
        // Create benchmark related parameters
        for (let index = 0; index < suite.benchmarks.length; index++) {
            let benchmark = suite.benchmarks[index];
            let benchmarkSelectedParameter
                = new BenchmarkSelectedParameter(benchmark);
            this._parameters.push(benchmarkSelectedParameter);

            let benchmarkProportionParameter
                = new BenchmarkProportionParameter(benchmark);
            this._parameters.push(benchmarkProportionParameter);
        }

        // Create indirect suite parameters
        for (let index; index < suite.parameters.length; index++) {
            let originalParameter = suite.parameters[index];
            let indirectParameter
                = new IndirectSuiteParameter(suite, originalParameter);
            this._parameters.push(indirectParameter);
        }

        this.runner.notifyConfigurationUpdated();
    }

    public removeParametersForSuite(suite: BenchmarkSuiteInstance): void {
        let parameterNamePrefix = suite.name + ".";
        for (let index = this._parameters.length - 1; index >= 0; index--) {
            let parameter = this._parameters[index];
            // Remove parameter from the list
            if (parameter.name.startsWith(parameterNamePrefix)) {
                this._parameters = this._parameters.splice(index, 1);
            }
        }

        this.runner.notifyConfigurationUpdated();
    }

    public setConfigurationToDefault(): void {
        for (let index = 0; index < this._parameters.length; index++) {
            let parameter = this._parameters[index];
            if (parameter instanceof IndirectSuiteParameter) {
                let indirectParameter = <IndirectSuiteParameter>parameter;
                indirectParameter.value = indirectParameter.defaultValue;
            }
        }
    }

    public setConfiguration(parameters: any) {
        for (let index = 0; index < this._parameters.length; index++) {
            let parameter = this._parameters[index];
            if (parameters.hasOwnProperty(parameter.name))
                parameter.value = parameters[parameter.name];
        }
    }
 
}
