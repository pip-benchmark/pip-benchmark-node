"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ConfigurationManager_1 = require("./config/ConfigurationManager");
const BenchmarksManager_1 = require("./benchmarks/BenchmarksManager");
const ParametersManager_1 = require("./parameters/ParametersManager");
const BenchmarkProcess_1 = require("./execution/BenchmarkProcess");
const ReportGenerator_1 = require("./reports/ReportGenerator");
const EnvironmentManager_1 = require("./environment/EnvironmentManager");
class BenchmarkRunner {
    constructor() {
        this._resultUpdatedListeners = [];
        this._messageSentListeners = [];
        this._errorReportedListeners = [];
        this._configuration = new ConfigurationManager_1.ConfigurationManager();
        this._parameters = new ParametersManager_1.ParametersManager(this._configuration);
        this._benchmarks = new BenchmarksManager_1.BenchmarksManager(this._configuration, this._parameters);
        this._process = new BenchmarkProcess_1.BenchmarkProcess(this._configuration);
        this._environment = new EnvironmentManager_1.EnvironmentManager();
        this._report = new ReportGenerator_1.ReportGenerator(this);
    }
    get configuration() {
        return this._configuration;
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
    get results() {
        return this._process.results;
    }
    addResultUpdatedListener(listener) {
        this._resultUpdatedListeners.push(listener);
    }
    removeResultUpdatedListener(listener) {
        for (let index = this._resultUpdatedListeners.length - 1; index >= 0; index--) {
            if (this._resultUpdatedListeners[index] == listener)
                this._resultUpdatedListeners = this._resultUpdatedListeners.splice(index, 1);
        }
    }
    notifyResultUpdated(status, result) {
        for (let index = 0; index < this._resultUpdatedListeners.length; index++) {
            try {
                let listener = this._resultUpdatedListeners[index];
                listener(status, result);
            }
            catch (ex) {
                // Ignore and send a message to the next listener.
            }
        }
    }
    addMessageSentListener(listener) {
        this._messageSentListeners.push(listener);
    }
    removeMessageSentListener(listener) {
        for (let index = this._messageSentListeners.length - 1; index >= 0; index--) {
            if (this._messageSentListeners[index] == listener)
                this._messageSentListeners = this._messageSentListeners.splice(index, 1);
        }
    }
    notifyMessageSent(message) {
        for (let index = 0; index < this._messageSentListeners.length; index++) {
            try {
                let listener = this._messageSentListeners[index];
                listener(message);
            }
            catch (ex) {
                // Ignore and send a message to the next listener.
            }
        }
    }
    addErrorReportedListener(listener) {
        this._errorReportedListeners.push(listener);
    }
    removeErrorReportedListener(listener) {
        for (let index = this._errorReportedListeners.length - 1; index >= 0; index--) {
            if (this._errorReportedListeners[index] == listener)
                this._errorReportedListeners = this._errorReportedListeners.splice(index, 1);
        }
    }
    notifyErrorReported(message) {
        for (let index = 0; index < this._errorReportedListeners.length; index++) {
            try {
                let listener = this._errorReportedListeners[index];
                listener(message);
            }
            catch (ex) {
                // Ignore and send a message to the next listener.
            }
        }
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