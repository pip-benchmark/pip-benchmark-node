import { IExecutionContext } from './IExecutionContext';
export declare abstract class Benchmark {
    constructor(name: string, description: string);
    name: string;
    description: string;
    context: IExecutionContext;
    setUp(): void;
    abstract execute(): void;
    tearDown(): void;
}
