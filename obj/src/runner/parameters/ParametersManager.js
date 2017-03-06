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
const Properties_1 = require("../utilities/Properties");
class ParametersManager {
    constructor(runner) {
        this._parameters = [];
        this._changeListeners = [];
        this._runner = runner;
        this._parameters.push(new MeasurementTypeParameter_1.MeasurementTypeParameter(runner.process));
        this._parameters.push(new NominalRateParameter_1.NominalRateParameter(runner.process));
        this._parameters.push(new ExecutionTypeParameter_1.ExecutionTypeParameter(runner.process));
        this._parameters.push(new DurationParameter_1.DurationParameter(runner.process));
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
        this.notifyChanged();
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
        this.notifyChanged();
    }
    removeSuite(suite) {
        let parameterNamePrefix = suite.name + ".";
        this._parameters = _.remove(this._parameters, (parameter) => {
            return parameter.name.startsWith(parameterNamePrefix);
        });
        this.notifyChanged();
    }
    setToDefault() {
        _.each(this._parameters, (parameter) => {
            if (parameter instanceof BenchmarkSuiteParameter_1.BenchmarkSuiteParameter)
                parameter.value = parameter.defaultValue;
        });
    }
    set(parameters) {
        _.each(this._parameters, (parameter) => {
            if (parameters.hasOwnProperty(parameter.name))
                parameter.value = parameters[parameter.name];
        });
    }
    addChangeListener(listener) {
        this._changeListeners.push(listener);
    }
    removeChangeListener(listener) {
        for (let index = this._changeListeners.length - 1; index >= 0; index--) {
            if (this._changeListeners[index] == listener)
                this._changeListeners = this._changeListeners.splice(index, 1);
        }
    }
    notifyChanged() {
        for (let index = 0; index < this._changeListeners.length; index++) {
            try {
                let listener = this._changeListeners[index];
                listener();
            }
            catch (ex) {
                // Ignore and send a message to the next listener.
            }
        }
    }
}
exports.ParametersManager = ParametersManager;
//# sourceMappingURL=ParametersManager.js.map