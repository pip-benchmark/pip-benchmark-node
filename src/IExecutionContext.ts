export interface IExecutionContext {
    parameters: any;
	
    incrementCounter(increment?: number): void;
    
    sendMessage(message: string): void;
    reportError(error: any): void;
    
    stop(): void;
}
