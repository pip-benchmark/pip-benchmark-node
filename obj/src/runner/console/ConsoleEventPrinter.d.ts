import { BenchmarkRunner } from '../BenchmarkRunner';
import { BenchmarkResult } from '../BenchmarkResult';
import { ExecutionState } from '../ExecutionState';
export declare class ConsoleEventPrinter {
    static attach(runner: BenchmarkRunner): void;
    static onResultUpdated(status: ExecutionState, result: BenchmarkResult): void;
    static onMessageSent(message: string): void;
    static onErrorReported(message: string): void;
}
