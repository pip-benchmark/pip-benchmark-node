import { ResultCallback } from './ResultCallback';
import { MessageCallback } from './MessageCallback';
import { BenchmarkResult } from './BenchmarkResult';
import { ExecutionState } from './ExecutionState';

export class ResultsManager {
    private _results: BenchmarkResult[] = [];

    private _updatedListeners: ResultCallback[] = [];
    private _messageListeners: MessageCallback[] = [];
    private _errorListeners: MessageCallback[] = [];

    public constructor() {}

    public get all(): BenchmarkResult[] {
        return this._results;
    }

    public add(result: BenchmarkResult): void {
        this._results.push(result);
    }

    public clear(): void {
        this._results = [];
    }

    public addUpdatedListener(listener: ResultCallback): void {
        this._updatedListeners.push(listener);
    }

    public removeUpdatedListener(listener: ResultCallback): void {
        for (let index = this._updatedListeners.length - 1; index >= 0; index--) {
            if (this._updatedListeners[index] == listener)
                this._updatedListeners = this._updatedListeners.splice(index, 1);
        }
    }

    public notifyUpdated(status: ExecutionState, result: BenchmarkResult): void {
        for (let index = 0; index < this._updatedListeners.length; index++) {
            try {
                let listener = this._updatedListeners[index];
                listener(status, result);
            } catch (ex) {
                // Ignore and send a message to the next listener.
            }
        }
    }

    public addMessageListener(listener: MessageCallback): void {
        this._messageListeners.push(listener);
    }

    public removeMessageListener(listener: MessageCallback): void {
        for (let index = this._messageListeners.length - 1; index >= 0; index--) {
            if (this._messageListeners[index] == listener)
                this._messageListeners = this._messageListeners.splice(index, 1);
        }
    }

    public notifyMessage(message: string): void {
        for (let index = 0; index < this._messageListeners.length; index++) {
            try {
                let listener = this._messageListeners[index];
                listener(message);
            } catch (ex) {
                // Ignore and send a message to the next listener.
            }
        }
    }

    public addErrorListener(listener: MessageCallback): void {
        this._errorListeners.push(listener);
    }

    public removeErrorListener(listener: MessageCallback): void {
        for (let index = this._errorListeners.length - 1; index >= 0; index--) {
            if (this._errorListeners[index] == listener)
                this._errorListeners = this._errorListeners.splice(index, 1);
        }
    }

    public notifyError(message: string): void {
        for (let index = 0; index < this._errorListeners.length; index++) {
            try {
                let listener = this._errorListeners[index];
                listener(message);
            } catch (ex) {
                // Ignore and send a message to the next listener.
            }
        }
    }
}