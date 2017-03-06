"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ConfigurationManager_1 = require("./config/ConfigurationManager");
const ResultsManager_1 = require("./results/ResultsManager");
const BenchmarksManager_1 = require("./benchmarks/BenchmarksManager");
const ParametersManager_1 = require("./parameters/ParametersManager");
const BenchmarkProcess_1 = require("./execution/BenchmarkProcess");
const ReportGenerator_1 = require("./reports/ReportGenerator");
const EnvironmentManager_1 = require("./environment/EnvironmentManager");
class BenchmarkRunner {
    constructor() {
        this._configuration = new ConfigurationManager_1.ConfigurationManager();
        this._results = new ResultsManager_1.ResultsManager();
        this._parameters = new ParametersManager_1.ParametersManager(this._configuration);
        this._benchmarks = new BenchmarksManager_1.BenchmarksManager(this._configuration, this._parameters);
        this._process = new BenchmarkProcess_1.BenchmarkProcess(this._configuration, this._results);
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
    get process() {
        return this._process;
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
        return this._process.running;
    }
    start() {
        this._process.start(this._benchmarks.suites);
    }
    stop() {
        this._process.stop();
    }
    run(callback) {
        this._process.run(this._benchmarks.suites, callback);
    }
}
exports.BenchmarkRunner = BenchmarkRunner;
//# sourceMappingURL=BenchmarkRunner.js.map