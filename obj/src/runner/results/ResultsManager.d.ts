import { ResultCallback } from './ResultCallback';
import { MessageCallback } from './MessageCallback';
import { ErrorCallback } from './ErrorCallback';
import { BenchmarkResult } from './BenchmarkResult';
export declare class ResultsManager {
    private _results;
    private _updatedListeners;
    private _messageListeners;
    private _errorListeners;
    constructor();
    get all(): BenchmarkResult[];
    add(result: BenchmarkResult): void;
    clear(): void;
    addUpdatedListener(listener: ResultCallback): void;
    removeUpdatedListener(listener: ResultCallback): void;
    notifyUpdated(result: BenchmarkResult): void;
    addMessageListener(listener: MessageCallback): void;
    removeMessageListener(listener: MessageCallback): void;
    notifyMessage(message: string): void;
    addErrorListener(listener: ErrorCallback): void;
    removeErrorListener(listener: ErrorCallback): void;
    notifyError(error: any): void;
}
