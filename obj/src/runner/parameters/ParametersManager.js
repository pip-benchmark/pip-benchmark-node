"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParametersManager = void 0;
let _ = require('lodash');
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
        for (let parameter of this._parameters) {
            if (!parameter.name.endsWith(".Selected")
                && !parameter.name.endsWith(".Proportion")
                && !parameter.name.startsWith("General.")) {
                parameters.push(parameter);
            }
        }
        return parameters;
    }
    get all() {
        return this._parameters;
    }
    loadFromFile(path) {
        let properties = new Properties_1.Properties();
        properties.loadFromFile(path);
        for (let parameter of this._parameters) {
            if (properties.hasOwnProperty(parameter.name))
                parameter.value = properties[parameter.name];
        }
        this._configuration.notifyChanged();
    }
    saveToFile(path) {
        let properties = new Properties_1.Properties();
        for (let parameter of this._parameters) {
            properties[parameter.name] = parameter.value;
        }
        properties.saveToFile(path);
    }
    addSuite(suite) {
        for (let benchmark of suite.benchmarks) {
            let benchmarkSelectedParameter = new BenchmarkSelectedParameter_1.BenchmarkSelectedParameter(benchmark);
            this._parameters.push(benchmarkSelectedParameter);
            let benchmarkProportionParameter = new BenchmarkProportionParameter_1.BenchmarkProportionParameter(benchmark);
            this._parameters.push(benchmarkProportionParameter);
        }
        for (let parameter of suite.parameters) {
            let suiteParameter = new BenchmarkSuiteParameter_1.BenchmarkSuiteParameter(suite, parameter);
            this._parameters.push(suiteParameter);
        }
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
        for (let parameter of this._parameters) {
            if (parameter instanceof BenchmarkSuiteParameter_1.BenchmarkSuiteParameter)
                parameter.value = parameter.defaultValue;
        }
        this._configuration.notifyChanged();
    }
    set(parameters) {
        for (let parameter of this._parameters) {
            if (parameters.hasOwnProperty(parameter.name))
                parameter.value = parameters[parameter.name];
        }
        this._configuration.notifyChanged();
    }
}
exports.ParametersManager = ParametersManager;
//# sourceMappingURL=ParametersManager.js.map