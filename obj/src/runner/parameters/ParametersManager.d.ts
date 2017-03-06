import { Parameter } from '../../Parameter';
import { BenchmarkSuiteInstance } from '../benchmarks/BenchmarkSuiteInstance';
import { ParametersCallback } from './ParametersCallback';
export declare class ParametersManager {
    private _runner;
    private _parameters;
    private _changeListeners;
    constructor(runner: any);
    readonly userDefined: Parameter[];
    readonly all: Parameter[];
    loadFromFile(path: string): void;
    saveToFile(fileName: string): void;
    addSuite(suite: BenchmarkSuiteInstance): void;
    removeSuite(suite: BenchmarkSuiteInstance): void;
    setToDefault(): void;
    set(parameters: any): void;
    addChangeListener(listener: ParametersCallback): void;
    removeChangeListener(listener: ParametersCallback): void;
    notifyChanged(): void;
}
