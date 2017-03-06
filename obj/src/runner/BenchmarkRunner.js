"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BenchmarkSuiteManager_1 = require("./BenchmarkSuiteManager");
const ConfigurationManager_1 = require("./config/ConfigurationManager");
const BenchmarkProcess_1 = require("./execution/BenchmarkProcess");
const ReportGenerator_1 = require("./report/ReportGenerator");
class BenchmarkRunner {
    constructor() {
        // private _environmentState: EnvironmentState;
        this._resultUpdatedListeners = [];
        this._configurationUpdatedListeners = [];
        this._messageSentListeners = [];
        this._errorReportedListeners = [];
        this._suiteManager = new BenchmarkSuiteManager_1.BenchmarkSuiteManager(this);
        this._process = new BenchmarkProcess_1.BenchmarkProcess(this);
        this._configurationManager = new ConfigurationManager_1.ConfigurationManager(this);
        this._reportGenerator = new ReportGenerator_1.ReportGenerator(this);
        // this._environmentState = new EnvironmentState(this);
    }
    get configurationManager() {
        return this._configurationManager;
    }
    get process() {
        return this._process;
    }
    get suiteManager() {
        return this._suiteManager;
    }
    get reportGenerator() {
        return this._reportGenerator;
    }
    // public get environmentState(): EnvironmentState {
    //     return this._environmentState;
    // }
    get suiteInstances() {
        return this._suiteManager.suites;
    }
    addSuiteFromClass(className) {
        this._suiteManager.addSuiteFromClass(className);
    }
    addSuite(suite) {
        this._suiteManager.addSuite(suite);
    }
    loadSuitesFromModule(moduleName) {
        this._suiteManager.loadSuitesFromModule(moduleName);
    }
    unloadSuiteByName(suiteName) {
        this._suiteManager.removeSuiteByName(suiteName);
    }
    unloadAllSuites() {
        this._suiteManager.removeAllSuites();
    }
    unloadSuite(suite) {
        this._suiteManager.removeSuite(suite);
    }
    selectAllBenchmarks() {
        this._suiteManager.selectAllBenchmarks();
    }
    selectBenchmarksByName(...benchmarkNames) {
        this._suiteManager.selectBenchmarksByName(benchmarkNames);
    }
    selectBenchmarks(...benchmarks) {
        this._suiteManager.selectBenchmarks(benchmarks);
    }
    get configuration() {
        return this._configurationManager.getFilteredParameters();
    }
    loadConfigurationFromFile(fileName) {
        this._configurationManager.loadConfigurationFromFile(fileName);
    }
    saveConfigurationToFile(fileName) {
        this._configurationManager.saveConfigurationToFile(fileName);
    }
    setConfigurationToDefault() {
        this._configurationManager.setConfigurationToDefault();
    }
    setConfiguration(parameters) {
        this._configurationManager.setConfiguration(parameters);
    }
    get measurementType() {
        return this._process.measurementType;
    }
    set measurementType(value) {
        this._process.measurementType = value;
    }
    get nominalRate() {
        return this._process.nominalRate;
    }
    set nominalRate(value) {
        this._process.nominalRate = value;
    }
    get executionType() {
        return this._process.executionType;
    }
    set executionType(value) {
        this._process.executionType = value;
    }
    get duration() {
        return this._process.duration;
    }
    set duration(value) {
        this._process.duration = value;
    }
    get forceContinue() {
        return this._process.forceContinue;
    }
    set forceContinue(value) {
        this._process.forceContinue = value;
    }
    get results() {
        return this._process.results;
    }
    addConfigurationUpdatedListener(listener) {
        this._configurationUpdatedListeners.push(listener);
    }
    removeConfigurationUpdatedListener(listener) {
        for (let index = this._configurationUpdatedListeners.length - 1; index >= 0; index--) {
            if (this._configurationUpdatedListeners[index] == listener)
                this._configurationUpdatedListeners = this._configurationUpdatedListeners.splice(index, 1);
        }
    }
    notifyConfigurationUpdated() {
        for (let index = 0; index < this._configurationUpdatedListeners.length; index++) {
            try {
                let listener = this._configurationUpdatedListeners[index];
                listener();
            }
            catch (ex) {
                // Ignore and send a message to the next listener.
            }
        }
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
        this._process.start(this._suiteManager.suites);
    }
    stop() {
        this._process.stop();
    }
    run(callback) {
        this._process.run(this._suiteManager.suites, callback);
    }
    generateReport() {
        return this._reportGenerator.generateReport();
    }
    saveReportToFile(fileName) {
        this._reportGenerator.saveReportToFile(fileName);
    }
}
exports.BenchmarkRunner = BenchmarkRunner;
//# sourceMappingURL=BenchmarkRunner.js.map