import { Parameter } from '../Parameter';
import { BenchmarkSuite } from '../BenchmarkSuite';
import { BenchmarkSuiteInstance } from './benchmarks/BenchmarkSuiteInstance';
import { BenchmarkInstance } from './benchmarks/BenchmarkInstance';
import { ResultCallback } from './ResultCallback';
import { MessageCallback } from './MessageCallback';
import { ExecutionState } from './ExecutionState';
import { ExecutionType } from './ExecutionType';
import { MeasurementType } from './MeasurementType';
import { BenchmarkResult } from './BenchmarkResult';

import { BenchmarksManager } from './benchmarks/BenchmarksManager';
import { ParametersManager } from './parameters/ParametersManager';
import { BenchmarkProcess } from './execution/BenchmarkProcess';
import { ReportGenerator } from './results/ReportGenerator';
import { EnvironmentManager } from './environment/EnvironmentManager';

export class BenchmarkRunner {
    private _benchmarks: BenchmarksManager;
    private _parameters: ParametersManager;
    private _process: BenchmarkProcess;
    private _reportGenerator: ReportGenerator;
    private _environment: EnvironmentManager;

    private _resultUpdatedListeners: ResultCallback[] = [];
    private _messageSentListeners: MessageCallback[] = [];
    private _errorReportedListeners: MessageCallback[] = [];

    public constructor() {
        this._benchmarks = new BenchmarksManager(this);
        this._process = new BenchmarkProcess(this);
        this._parameters = new ParametersManager(this);
        this._reportGenerator = new ReportGenerator(this);
        this._environment = new EnvironmentManager(this);
    }

    public get parameters(): ParametersManager {
        return this._parameters;
    }

    public get process(): BenchmarkProcess {
        return this._process;
    }

    public get suiteManager(): BenchmarksManager {
        return this._benchmarks;
    }

    public get reportGenerator(): ReportGenerator {
        return this._reportGenerator;
    }

    public get environment(): EnvironmentManager {
        return this._environment;
    }

    public get suiteInstances(): BenchmarkSuiteInstance[] {
        return this._benchmarks.suites;
    }

    public addSuiteFromClass(className: string): void {
        this._benchmarks.addSuiteFromClass(className);
    }

    public addSuite(suite: any): void {
        this._benchmarks.addSuite(suite);
    }

    public loadSuitesFromModule(moduleName: string): void {
        this._benchmarks.loadSuitesFromModule(moduleName);
    }

    public unloadSuiteByName(suiteName: string): void {
        this._benchmarks.removeSuiteByName(suiteName);
    }

    public unloadAllSuites(): void {
        this._benchmarks.removeAllSuites();
    }

    public unloadSuite(suite: any): void {
        this._benchmarks.removeSuite(suite);
    }

    public selectAllBenchmarks(): void {
        this._benchmarks.selectAllBenchmarks();
    }

    public selectBenchmarksByName(...benchmarkNames: string[]): void {
        this._benchmarks.selectBenchmarksByName(benchmarkNames);
    }

    public selectBenchmarks(...benchmarks: BenchmarkInstance[]): void {
        this._benchmarks.selectBenchmarks(benchmarks);
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
        this._process.start(this._benchmarks.suites);
    }

    public stop(): void {
        this._process.stop();
    }

    public run(callback: () => void): void {
        this._process.run(this._benchmarks.suites, callback);
    }

    public generateReport(): string {
        return this._reportGenerator.generateReport();
    }

    public saveReportToFile(fileName: string): void {
        this._reportGenerator.saveReportToFile(fileName);
    }
}