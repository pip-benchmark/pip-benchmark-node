"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MeasurementTypeParameter_1 = require("./MeasurementTypeParameter");
const NominalRateParameter_1 = require("./NominalRateParameter");
const ExecutionTypeParameter_1 = require("./ExecutionTypeParameter");
const DurationParameter_1 = require("./DurationParameter");
const BenchmarkSelectedParameter_1 = require("./BenchmarkSelectedParameter");
const BenchmarkProportionParameter_1 = require("./BenchmarkProportionParameter");
const IndirectSuiteParameter_1 = require("./IndirectSuiteParameter");
const Properties_1 = require("./Properties");
class ConfigurationManager {
    constructor(runner) {
        this._parameters = [];
        this._runner = runner;
        this._parameters.push(new MeasurementTypeParameter_1.MeasurementTypeParameter(runner.process));
        this._parameters.push(new NominalRateParameter_1.NominalRateParameter(runner.process));
        this._parameters.push(new ExecutionTypeParameter_1.ExecutionTypeParameter(runner.process));
        this._parameters.push(new DurationParameter_1.DurationParameter(runner.process));
    }
    get runner() {
        return this._runner;
    }
    getFilteredParameters() {
        let filteredParameters = [];
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
    getAllParameters() {
        return this._parameters;
    }
    loadConfigurationFromFile(fileName) {
        let properties = new Properties_1.Properties();
        properties.loadFromFile(fileName);
        for (let prop in properties) {
            if (properties.hasOwnProperty(prop) && prop != 'lines')
                this.setParameterValue(prop, properties[prop]);
        }
        this._runner.notifyConfigurationUpdated();
    }
    setParameterValue(parameterName, value) {
        for (let index = 0; index < this._parameters.length; index++) {
            let parameter = this._parameters[index];
            if (parameter.name == parameterName)
                parameter.value = value;
        }
    }
    saveConfigurationToFile(fileName) {
        let properties = new Properties_1.Properties();
        for (let index = 0; index < this._parameters.length; index++) {
            let parameter = this._parameters[index];
            properties[parameter.name] = parameter.value;
        }
        properties.saveToFile(fileName);
    }
    createParametersForSuite(suite) {
        // Create benchmark related parameters
        for (let index = 0; index < suite.benchmarks.length; index++) {
            let benchmark = suite.benchmarks[index];
            let benchmarkSelectedParameter = new BenchmarkSelectedParameter_1.BenchmarkSelectedParameter(benchmark);
            this._parameters.push(benchmarkSelectedParameter);
            let benchmarkProportionParameter = new BenchmarkProportionParameter_1.BenchmarkProportionParameter(benchmark);
            this._parameters.push(benchmarkProportionParameter);
        }
        // Create indirect suite parameters
        for (let index; index < suite.parameters.length; index++) {
            let originalParameter = suite.parameters[index];
            let indirectParameter = new IndirectSuiteParameter_1.IndirectSuiteParameter(suite, originalParameter);
            this._parameters.push(indirectParameter);
        }
        this.runner.notifyConfigurationUpdated();
    }
    removeParametersForSuite(suite) {
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
    setConfigurationToDefault() {
        for (let index = 0; index < this._parameters.length; index++) {
            let parameter = this._parameters[index];
            if (parameter instanceof IndirectSuiteParameter_1.IndirectSuiteParameter) {
                let indirectParameter = parameter;
                indirectParameter.value = indirectParameter.defaultValue;
            }
        }
    }
    setConfiguration(parameters) {
        for (let index = 0; index < this._parameters.length; index++) {
            let parameter = this._parameters[index];
            if (parameters.hasOwnProperty(parameter.name))
                parameter.value = parameters[parameter.name];
        }
    }
}
exports.ConfigurationManager = ConfigurationManager;
//# sourceMappingURL=ConfigurationManager.js.map