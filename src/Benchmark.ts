import { IExecutionContext } from './IExecutionContext';

export abstract class Benchmark {
    public constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
    }

    public name: string;
    public description: string;
    public context: IExecutionContext;
    
    public setUp(): void {}

    public abstract execute(): void;
    
    public tearDown(): void {}
}