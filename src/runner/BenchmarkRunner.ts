import { Parameter } from '../Parameter';
import { BenchmarkSuite } from '../BenchmarkSuite';
import { BenchmarkSuiteInstance } from './BenchmarkSuiteInstance';
import { BenchmarkInstance } from './BenchmarkInstance';
import { ResultCallback } from './ResultCallback';
import { MessageCallback } from './MessageCallback';
import { ConfigurationCallback } from './ConfigurationCallback';
import { ExecutionState } from './ExecutionState';
import { ExecutionType } from './ExecutionType';
import { MeasurementType } from './MeasurementType';
import { BenchmarkResult } from './BenchmarkResult';

import { BenchmarkSuiteManager } from './BenchmarkSuiteManager';
import { ConfigurationManager } from './config/ConfigurationManager';
import { BenchmarkProcess } from './execution/BenchmarkProcess';
import { ReportGenerator } from './report/ReportGenerator';

export class BenchmarkRunner {
    private _suiteManager: BenchmarkSuiteManager;
    private _configurationManager: ConfigurationManager;
    private _process: BenchmarkProcess;
    private _reportGenerator: ReportGenerator;
    // private _environmentState: EnvironmentState;

    private _resultUpdatedListeners: ResultCallback[] = [];
    private _configurationUpdatedListeners: ConfigurationCallback[] = [];
    private _messageSentListeners: MessageCallback[] = [];
    private _errorReportedListeners: MessageCallback[] = [];

    public constructor() {
        this._suiteManager = new BenchmarkSuiteManager(this);
        this._process = new BenchmarkProcess(this);
        this._configurationManager = new ConfigurationManager(this);
        this._reportGenerator = new ReportGenerator(this);
        // this._environmentState = new EnvironmentState(this);
    }

    public get configurationManager(): ConfigurationManager {
        return this._configurationManager;
    }

    public get process(): BenchmarkProcess {
        return this._process;
    }

    public get suiteManager(): BenchmarkSuiteManager {
        return this._suiteManager;
    }

    public get reportGenerator(): ReportGenerator {
        return this._reportGenerator;
    }

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

    public get measurementType(): MeasurementType {
        return this._process.measurementType; 
    }

    public set measurementType(value: MeasurementType) {
        this._process.measurementType = value;
    }

    public get nominalRate(): number {
        return this._process.nominalRate; 
    }

    public set nominalRate(value: number) {
        this._process.nominalRate = value;
    }

    public get executionType(): ExecutionType {
        return this._process.executionType; 
    }

    public set executionType(value: ExecutionType) {
        this._process.executionType = value;
    }

    public get duration(): number {
        return this._process.duration; 
    }

    public set duration(value: number) {
        this._process.duration = value;
    }

    public get forceContinue(): boolean {
        return this._process.forceContinue;
    }

    public set forceContinue(value: boolean) {
        this._process.forceContinue = value;
    }

    public get results(): BenchmarkResult[] {
        return this._process.results;
    }

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

    public get running(): boolean {
        return this._process.running;
    }

    public start(): void {
        this._process.start(this._suiteManager.suites);
    }

    public stop(): void {
        this._process.stop();
    }

    public run(callback: () => void): void {
        this._process.run(this._suiteManager.suites, callback);
    }

    public generateReport(): string {
        return this._reportGenerator.generateReport();
    }

    public saveReportToFile(fileName: string): void {
        this._reportGenerator.saveReportToFile(fileName);
    }

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