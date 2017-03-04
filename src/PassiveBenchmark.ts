import { Benchmark } from './Benchmark';

export class PassiveBenchmark extends Benchmark {
    public constructor(name: string, description: string) {
        super(name, description);
    }

    public execute(callback: (err?: any) => void): void {
        callback(new Error("Active measurement via Execute is not allow for passive benchmarks"));
    }
}
