var _ = require('lodash');

import { Parameter } from '../../Parameter';
import { BenchmarkSuiteInstance } from '../benchmarks/BenchmarkSuiteInstance';
import { BenchmarkInstance } from '../benchmarks/BenchmarkInstance';
import { MeasurementTypeParameter } from './MeasurementTypeParameter';
import { NominalRateParameter } from './NominalRateParameter';
import { ExecutionTypeParameter } from './ExecutionTypeParameter';
import { DurationParameter } from './DurationParameter';
import { BenchmarkSelectedParameter } from './BenchmarkSelectedParameter';
import { BenchmarkProportionParameter } from './BenchmarkProportionParameter';
import { BenchmarkSuiteParameter } from './BenchmarkSuiteParameter';
import { ParametersCallback } from './ParametersCallback';
import { Properties } from '../utilities/Properties';

export class ParametersManager {
    private _runner: any;
    private _parameters: Parameter[] = [];
    private _changeListeners: ParametersCallback[] = [];

    public constructor(runner: any) {
        this._runner = runner;

        this._parameters.push(new MeasurementTypeParameter(runner.process));
        this._parameters.push(new NominalRateParameter(runner.process));
        this._parameters.push(new ExecutionTypeParameter(runner.process));
        this._parameters.push(new DurationParameter(runner.process));
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

        this.notifyChanged();
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

        this.notifyChanged();
    }

    public removeSuite(suite: BenchmarkSuiteInstance): void {
        let parameterNamePrefix = suite.name + ".";

        this._parameters = _.remove(this._parameters, (parameter) => {
            return parameter.name.startsWith(parameterNamePrefix);
        });

        this.notifyChanged();
    }

    public setToDefault(): void {
        _.each(this._parameters, (parameter) => {
            if (parameter instanceof BenchmarkSuiteParameter)
                parameter.value = parameter.defaultValue;
        });
    }

    public set(parameters: any) {
        _.each(this._parameters, (parameter) => {
            if (parameters.hasOwnProperty(parameter.name))
                parameter.value = parameters[parameter.name];
        });
    }
 
    public addChangeListener(listener: ParametersCallback): void {
        this._changeListeners.push(listener);
    }

    public removeChangeListener(listener: ParametersCallback): void {
        for (let index = this._changeListeners.length - 1; index >= 0; index--) {
            if (this._changeListeners[index] == listener)
                this._changeListeners = this._changeListeners.splice(index, 1);
        }
    }

    public notifyChanged(): void {
        for (let index = 0; index < this._changeListeners.length; index++) {
            try {
                let listener = this._changeListeners[index];
                listener();
            } catch (ex) {
                // Ignore and send a message to the next listener.
            }
        }
    }

}
