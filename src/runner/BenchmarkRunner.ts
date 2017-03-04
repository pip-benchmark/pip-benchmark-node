import { Parameter } from '../Parameter';
import { BenchmarkSuite } from '../BenchmarkSuite';
import { BenchmarkSuiteInstance } from './BenchmarkSuiteInstance';
import { BenchmarkInstance } from './BenchmarkInstance';
import { ResultCallback } from './ResultCallback';
import { MessageCallback } from './MessageCallback';
import { ConfigurationCallback } from './ConfigurationCallback';
import { ExecutionState } from './ExecutionState';
import { BenchmarkResult } from './BenchmarkResult';

import { BenchmarkSuiteManager } from './BenchmarkSuiteManager';
import { ConfigurationManager } from './config/ConfigurationManager';

export class BenchmarkRunner {
    private _suiteManager: BenchmarkSuiteManager;
    private _configurationManager: ConfigurationManager;
    // private _process: BenchmarkProcess;
    // private _reportGenerator: ReportGenerator;
    // private _environmentState: EnvironmentState;

    private _resultUpdatedListeners: ResultCallback[] = [];
    private _configurationUpdatedListeners: ConfigurationCallback[] = [];
    private _messageSentListeners: MessageCallback[] = [];
    private _errorReportedListeners: MessageCallback[] = [];

    public constructor() {
        this._suiteManager = new BenchmarkSuiteManager(this);
        // this._process = new BenchmarkProcess(this);
        this._configurationManager = new ConfigurationManager(this);
        // this._reportGenerator = new ReportGenerator(this);
        // this._environmentState = new EnvironmentState(this);
    }

    public get configurationManager(): ConfigurationManager {
        return this._configurationManager;
    }

    // public get process(): BenchmarkProcess {
    //     return this._process;
    // }

    public get suiteManager(): BenchmarkSuiteManager {
        return this._suiteManager;
    }

    // public get reportGenerator(): ReportGenerator {
    //     return this._reportGenerator;
    // }

    // public get environmentState(): EnvironmentState {
    //     return this._environmentState;
    // }

    public get suiteInstances(): BenchmarkSuiteInstance[] {
        return this._suiteManager.suites;
    }

    public addSuiteFromClass(className: string): void {
        this._suiteManager.addSuiteFromClass(className);
    }

    public addSuite(suite: any): void {
        this._suiteManager.addSuite(suite);
    }

    public loadSuitesFromModule(moduleName: string): void {
        this._suiteManager.loadSuitesFromModule(moduleName);
    }

    public unloadSuiteByName(suiteName: string): void {
        this._suiteManager.removeSuiteByName(suiteName);
    }

    public unloadAllSuites(): void {
        this._suiteManager.removeAllSuites();
    }

    public unloadSuite(suite: any): void {
        this._suiteManager.removeSuite(suite);
    }

    public selectAllBenchmarks(): void {
        this._suiteManager.selectAllBenchmarks();
    }

    public selectBenchmarksByName(...benchmarkNames: string[]): void {
        this._suiteManager.selectBenchmarksByName(benchmarkNames);
    }

    public selectBenchmarks(...benchmarks: BenchmarkInstance[]): void {
        this._suiteManager.selectBenchmarks(benchmarks);
    }

    public get configuration(): Parameter[] {
        return this._configurationManager.getFilteredParameters();
    }

    public loadConfigurationFromFile(fileName: string): void {
        this._configurationManager.loadConfigurationFromFile(fileName);
    }

    public saveConfigurationToFile(fileName: string): void {
        this._configurationManager.saveConfigurationToFile(fileName);
    }

    public setConfigurationToDefault(): void {
        this._configurationManager.setConfigurationToDefault();
    }

    public setConfiguration(parameters: any): void {
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

    public addConfigurationUpdatedListener(listener: ConfigurationCallback): void {
        this._configurationUpdatedListeners.push(listener);
    }

    public removeConfigurationUpdatedListener(listener: ConfigurationCallback): void {
        for (let index = this._configurationUpdatedListeners.length - 1; index >= 0; index--) {
            if (this._configurationUpdatedListeners[index] == listener)
                this._configurationUpdatedListeners = this._configurationUpdatedListeners.splice(index, 1);
        }
    }

    public notifyConfigurationUpdated(): void {
        for (let index = 0; index < this._configurationUpdatedListeners.length; index++) {
            try {
                let listener = this._configurationUpdatedListeners[index];
                listener();
            } catch (ex) {
                // Ignore and send a message to the next listener.
            }
        }
    }

    public addResultUpdatedListener(listener: ResultCallback): void {
        this._resultUpdatedListeners.push(listener);
    }

    public removeResultUpdatedListener(listener: ResultCallback): void {
        for (let index = this._resultUpdatedListeners.length - 1; index >= 0; index--) {
            if (this._resultUpdatedListeners[index] == listener)
                this._resultUpdatedListeners = this._resultUpdatedListeners.splice(index, 1);
        }
    }

    public notifyResultUpdated(status: ExecutionState, result: BenchmarkResult): void {
        for (let index = 0; index < this._resultUpdatedListeners.length; index++) {
            try {
                let listener = this._resultUpdatedListeners[index];
                listener(status, result);
            } catch (ex) {
                // Ignore and send a message to the next listener.
            }
        }
    }

    public addMessageSentListener(listener: MessageCallback): void {
        this._messageSentListeners.push(listener);
    }

    public removeMessageSentListener(listener: MessageCallback): void {
        for (let index = this._messageSentListeners.length - 1; index >= 0; index--) {
            if (this._messageSentListeners[index] == listener)
                this._messageSentListeners = this._messageSentListeners.splice(index, 1);
        }
    }

    public notifyMessageSent(message: string): void {
        for (let index = 0; index < this._messageSentListeners.length; index++) {
            try {
                let listener = this._messageSentListeners[index];
                listener(message);
            } catch (ex) {
                // Ignore and send a message to the next listener.
            }
        }
    }

    public addErrorReportedListener(listener: MessageCallback): void {
        this._errorReportedListeners.push(listener);
    }

    public removeErrorReportedListener(listener: MessageCallback): void {
        for (let index = this._errorReportedListeners.length - 1; index >= 0; index--) {
            if (this._errorReportedListeners[index] == listener)
                this._errorReportedListeners = this._errorReportedListeners.splice(index, 1);
        }
    }

    public notifyErrorReported(message: string): void {
        for (let index = 0; index < this._errorReportedListeners.length; index++) {
            try {
                let listener = this._errorReportedListeners[index];
                listener(message);
            } catch (ex) {
                // Ignore and send a message to the next listener.
            }
        }
    }

    // public boolean isRunning() {
    //     return getProcess().isRunning();
    // }

    // public void start() {
    //     getProcess().start(getSuiteManager().getSuites());
    // }

    // public void stop() {
    //     getProcess().stop();
    // }

    // public String generateReport() {
    //     return getReportGenerator().generateReport();
    // }

    // public void saveReportToFile(String fileName) throws IOException {
    //     getReportGenerator().saveReportToFile(fileName);
    // }

    // public Map<String, String> getSystemInformation() {
    //     return getEnvironmentState().getSystemInformation();
    // }

    // public double getCpuBenchmark() {
    //     return getEnvironmentState().getCpuBenchmark();
    // }

    // public double getVideoBenchmark() {
    //     return getEnvironmentState().getVideoBenchmark();
    // }

    // public double getDiskBenchmark() {
    //     return getEnvironmentState().getDiskBenchmark();
    // }

    // public void benchmarkEnvironment(boolean cpu, boolean disk, boolean video) {
    //     getEnvironmentState().benchmarkEnvironment(cpu, disk, video);
    // }

    // public void benchmarkEnvironment() {
    //     getEnvironmentState().benchmarkEnvironment(true, true, true);
    // }
}