import { ResultCallback } from './ResultCallback';
import { MessageCallback } from './MessageCallback';
import { BenchmarkResult } from './BenchmarkResult';
import { ExecutionState } from './ExecutionState';
export declare class ResultsManager {
    private _results;
    private _updatedListeners;
    private _messageListeners;
    private _errorListeners;
    constructor();
    readonly all: BenchmarkResult[];
    add(result: BenchmarkResult): void;
    clear(): void;
    addUpdatedListener(listener: ResultCallback): void;
    removeUpdatedListener(listener: ResultCallback): void;
    notifyUpdated(status: ExecutionState, result: BenchmarkResult): void;
    addMessageListener(listener: MessageCallback): void;
    removeMessageListener(listener: MessageCallback): void;
    notifyMessage(message: string): void;
    addErrorListener(listener: MessageCallback): void;
    removeErrorListener(listener: MessageCallback): void;
    notifyError(message: string): void;
}
