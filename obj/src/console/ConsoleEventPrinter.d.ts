import { BenchmarkRunner } from '../runner/BenchmarkRunner';
import { BenchmarkResult } from '../runner/results/BenchmarkResult';
import { ExecutionState } from '../runner/execution/ExecutionState';
export declare class ConsoleEventPrinter {
    static attach(runner: BenchmarkRunner): void;
    static onStateUpdated(state: ExecutionState): void;
    static onResultUpdated(result: BenchmarkResult): void;
    static onMessageSent(message: string): void;
    static onErrorReported(message: string): void;
}
