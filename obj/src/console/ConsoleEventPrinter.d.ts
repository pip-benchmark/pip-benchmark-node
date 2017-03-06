import { BenchmarkRunner } from '../runner/BenchmarkRunner';
import { BenchmarkResult } from '../runner/results/BenchmarkResult';
import { ExecutionState } from '../runner/results/ExecutionState';
export declare class ConsoleEventPrinter {
    static attach(runner: BenchmarkRunner): void;
    static onResultUpdated(status: ExecutionState, result: BenchmarkResult): void;
    static onMessageSent(message: string): void;
    static onErrorReported(message: string): void;
}
