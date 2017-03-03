export interface IExecutionContext {
    parameters: any;
    incrementCounter(increment?: number): void;
    sendMessage(message: string): void;
    reportError(errorMessage: string): void;
    stop(): void;
}
