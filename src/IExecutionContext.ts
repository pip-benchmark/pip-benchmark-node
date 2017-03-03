export interface IExecutionContext {
	getParameters(): any;
	
    incrementCounter(increment?: number): void;
    
    sendMessage(message: string): void;
    reportError(errorMessage: string): void;
    
    stop(): void;
}
