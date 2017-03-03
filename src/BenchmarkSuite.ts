import { Parameter } from './Parameter';
import { Benchmark } from './Benchmark';
import { DelegatedBenchmark } from './DelegatedBenchmark';
import { IExecutionContext } from './IExecutionContext';

export abstract class BenchmarkSuite {

    protected constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
    }

    public name: string;
    public description: string;
    public parameters: any = {};
    public benchmarks: Benchmark[] = [];
    public context: IExecutionContext;

    public addParameter(parameter: Parameter): Parameter {
        this.parameters[parameter.name] = parameter;
        return parameter;
    }
    
    public createParameter(name: string, description: string, defaultValue?: string): Parameter {
        let parameter = new Parameter(name, description, defaultValue);
        this.parameters[name] = parameter;
        return parameter;
    }
    
    protected addBenchmark(benchmark: Benchmark): Benchmark {
        this.benchmarks.push(benchmark);
        return benchmark;
    }

    protected createBenchmark(name: string, description: string, executeCallback: () => void): Benchmark {
        let benchmark = new DelegatedBenchmark(name, description, executeCallback);
        this.benchmarks.push(benchmark);
        return benchmark;
    }

    public setUp(): void {}
    public tearDown(): void {}
}
