"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require('lodash');
const MeasurementTypeParameter_1 = require("./MeasurementTypeParameter");
const NominalRateParameter_1 = require("./NominalRateParameter");
const ExecutionTypeParameter_1 = require("./ExecutionTypeParameter");
const DurationParameter_1 = require("./DurationParameter");
const BenchmarkSelectedParameter_1 = require("./BenchmarkSelectedParameter");
const BenchmarkProportionParameter_1 = require("./BenchmarkProportionParameter");
const BenchmarkSuiteParameter_1 = require("./BenchmarkSuiteParameter");
const Properties_1 = require("../../utilities/Properties");
class ParametersManager {
    constructor(configuration) {
        this._parameters = [];
        this._configuration = configuration;
        this._parameters.push(new MeasurementTypeParameter_1.MeasurementTypeParameter(configuration));
        this._parameters.push(new NominalRateParameter_1.NominalRateParameter(configuration));
        this._parameters.push(new ExecutionTypeParameter_1.ExecutionTypeParameter(configuration));
        this._parameters.push(new DurationParameter_1.DurationParameter(configuration));
    }
    get userDefined() {
        let parameters = [];
        _.each(this._parameters, (parameter) => {
            if (!parameter.name.endsWith(".Selected")
                && !parameter.name.endsWith(".Proportion")
                && !parameter.name.startsWith("General.")) {
                parameters.push(parameter);
            }
        });
        return parameters;
    }
    get all() {
        return this._parameters;
    }
    loadFromFile(path) {
        let properties = new Properties_1.Properties();
        properties.loadFromFile(path);
        _.each(this._parameters, (parameter) => {
            if (properties.hasOwnProperty(parameter.name))
                parameter.value = properties[parameter.name];
        });
        this._configuration.notifyChanged();
    }
    saveToFile(fileName) {
        let properties = new Properties_1.Properties();
        for (let index = 0; index < this._parameters.length; index++) {
            let parameter = this._parameters[index];
            properties[parameter.name] = parameter.value;
        }
        properties.saveToFile(fileName);
    }
    addSuite(suite) {
        _.each(suite.benchmarks, (benchmark) => {
            let benchmarkSelectedParameter = new BenchmarkSelectedParameter_1.BenchmarkSelectedParameter(benchmark);
            this._parameters.push(benchmarkSelectedParameter);
            let benchmarkProportionParameter = new BenchmarkProportionParameter_1.BenchmarkProportionParameter(benchmark);
            this._parameters.push(benchmarkProportionParameter);
        });
        _.each(suite.parameters, (parameter) => {
            let suiteParameter = new BenchmarkSuiteParameter_1.BenchmarkSuiteParameter(suite, parameter);
            this._parameters.push(suiteParameter);
        });
        this._configuration.notifyChanged();
    }
    removeSuite(suite) {
        let parameterNamePrefix = suite.name + ".";
        this._parameters = _.remove(this._parameters, (parameter) => {
            return parameter.name.startsWith(parameterNamePrefix);
        });
        this._configuration.notifyChanged();
    }
    setToDefault() {
        _.each(this._parameters, (parameter) => {
            if (parameter instanceof BenchmarkSuiteParameter_1.BenchmarkSuiteParameter)
                parameter.value = parameter.defaultValue;
        });
        this._configuration.notifyChanged();
    }
    set(parameters) {
        _.each(this._parameters, (parameter) => {
            if (parameters.hasOwnProperty(parameter.name))
                parameter.value = parameters[parameter.name];
        });
        this._configuration.notifyChanged();
    }
}
exports.ParametersManager = ParametersManager;
//# sourceMappingURL=ParametersManager.js.map