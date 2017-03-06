"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ConfigurationManager_1 = require("./config/ConfigurationManager");
const ResultsManager_1 = require("./results/ResultsManager");
const BenchmarksManager_1 = require("./benchmarks/BenchmarksManager");
const ParametersManager_1 = require("./parameters/ParametersManager");
const ExecutionManager_1 = require("./execution/ExecutionManager");
const ReportGenerator_1 = require("./reports/ReportGenerator");
const EnvironmentManager_1 = require("./environment/EnvironmentManager");
class BenchmarkRunner {
    constructor() {
        this._configuration = new ConfigurationManager_1.ConfigurationManager();
        this._results = new ResultsManager_1.ResultsManager();
        this._parameters = new ParametersManager_1.ParametersManager(this._configuration);
        this._benchmarks = new BenchmarksManager_1.BenchmarksManager(this._configuration, this._parameters);
        this._execution = new ExecutionManager_1.ExecutionManager(this._configuration, this._results);
        this._environment = new EnvironmentManager_1.EnvironmentManager();
        this._report = new ReportGenerator_1.ReportGenerator(this._configuration, this._results, this._parameters, this._benchmarks, this._environment);
    }
    get configuration() {
        return this._configuration;
    }
    get results() {
        return this._results;
    }
    get parameters() {
        return this._parameters;
    }
    get execution() {
        return this._execution;
    }
    get benchmarks() {
        return this._benchmarks;
    }
    get report() {
        return this._report;
    }
    get environment() {
        return this._environment;
    }
    get running() {
        return this._execution.running;
    }
    start() {
        this._execution.start(this._benchmarks.selected);
    }
    stop() {
        this._execution.stop();
    }
    run(callback) {
        this._execution.run(this._benchmarks.selected, callback);
    }
}
exports.BenchmarkRunner = BenchmarkRunner;
//# sourceMappingURL=BenchmarkRunner.js.map