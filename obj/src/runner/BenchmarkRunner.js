"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ConfigurationManager_1 = require("./config/ConfigurationManager");
class BenchmarkRunner {
    constructor() {
        // private _process: BenchmarkProcess;
        // private _reportGenerator: ReportGenerator;
        // private _environmentState: EnvironmentState;
        this._resultUpdatedListeners = [];
        this._configurationUpdatedListeners = [];
        this._messageSentListeners = [];
        this._errorReportedListeners = [];
        // this._suiteManager = new BenchmarkSuiteManager(this);
        // this._process = new BenchmarkProcess(this);
        this._configurationManager = new ConfigurationManager_1.ConfigurationManager(this);
        // this._reportGenerator = new ReportGenerator(this);
        // this._environmentState = new EnvironmentState(this);
    }
    get configurationManager() {
        return this._configurationManager;
    }
    // public get process(): BenchmarkProcess {
    //     return this._process;
    // }
    // public get suiteManager(): BenchmarkSuiteManager {
    //     return this._suiteManager;
    // }
    // public get reportGenerator(): ReportGenerator {
    //     return this._reportGenerator;
    // }
    // public get environmentState(): EnvironmentState {
    //     return this._environmentState;
    // }
    // public get suiteInstances(): BenchmarkSuiteInstance[] {
    //     return this.suiteManager.suites;
    // }
    // public addSuiteFromClass(moduleName: string, className: string): void {
    //     this.suiteManager.addSuiteFromClass(moduleName, className);
    // }
    // public void addSuite(BenchmarkSuite suite) {
    //     getSuiteManager().addSuite(suite);
    // }
    // public void addSuiteInstance(BenchmarkSuiteInstance suite) {
    //     getSuiteManager().addSuite(suite);
    // }
    // public void loadSuitesFromLibrary(String fileName) throws IOException {
    //     getSuiteManager().loadSuitesFromLibrary(fileName);
    // }
    // public void unloadSuite(String suiteName) {
    //     getSuiteManager().removeSuite(suiteName);
    // }
    // public void unloadAllSuites() {
    //     getSuiteManager().removeAllSuites();
    // }
    // public void unloadSuite(BenchmarkSuiteInstance suite) {
    //     getSuiteManager().removeSuite(suite);
    // }
    // public void selectAllBenchmarks() {
    //     getSuiteManager().selectAllBenchmarks();
    // }
    // public void selectBenchmarks(String ...benchmarkNames) {
    //     getSuiteManager().selectBenchmarks(benchmarkNames);
    // }
    // public void selectBenchmarks(BenchmarkInstance ...benchmarks) {
    //     getSuiteManager().selectBenchmarks(benchmarks);
    // }
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
    // public int getNumberOfThreads() {
    //     return getProcess().getNumberOfThreads(); 
    // }
    // public void setNumberOfThreads(int value) {
    //     getProcess().setNumberOfThreads(value);
    // }
    // public MeasurementType getMeasurementType() {
    //     return getProcess().getMeasurementType(); 
    // }
    // public void setMeasurementType(MeasurementType value) {
    //     getProcess().setMeasurementType(value);
    // }
    // public double getNominalRate() {
    //     return getProcess().getNominalRate(); 
    // }
    // public void setNominalRate(double value) {
    //     getProcess().setNominalRate(value);
    // }
    // public ExecutionType getExecutionType() {
    //     return getProcess().getExecutionType(); 
    // }
    // public void setExecutionType(ExecutionType value) {
    //     getProcess().setExecutionType(value);
    // }
    // public int getDuration() {
    //     return getProcess().getDuration(); 
    // }
    // public void setDuration(int value) {
    //     getProcess().setDuration(value);
    // }
    // public boolean isForceContinue() {
    //     return getProcess().isForceContinue();
    // }
    // public void setForceContinue(boolean value) {
    //     getProcess().setForceContinue(value);
    // }
    // public List<BenchmarkResult> getResults() {
    //     return getProcess().getResults();
    // }
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
}
exports.BenchmarkRunner = BenchmarkRunner;
//# sourceMappingURL=BenchmarkRunner.js.map