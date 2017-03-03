import { Benchmark } from './Benchmark';

export class PassiveBenchmark extends Benchmark {
    public constructor(name: string, description: string) {
        super(name, description);
    }

    public execute(): void {
        throw new Error("Active measurement via Execute is not allow for passive benchmarks");
    }
}
