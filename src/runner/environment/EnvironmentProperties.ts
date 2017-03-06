var path = require('path');

import { Properties } from '../utilities/Properties';

export class EnvironmentProperties extends Properties {

    private getFilePath(): string {
        return "BenchmarkEnvironment.properties";
    }

    public get cpuBenchmark(): number {
        return super.getAsDouble("Environment.CpuBenchmark", 0);
    }

    public set cpuBenchmark(value: number) {
        super.setAsDouble("Environment.CpuBenchmark", value);
    }

    public get diskBenchmark(): number {
        return super.getAsDouble("Environment.DiskBenchmark", 0);
    }

    public set diskBenchmark(value: number) {
        super.setAsDouble("Environment.DiskBenchmark", value);
    }

    public get videoBenchmark(): number {
        return super.getAsDouble("Environment.VideoBenchmark", 0);
    }

    public set videoBenchmark(value: number) {
        super.setAsDouble("Environment.VideoBenchmark", value);
    }

    public load(): void {
        if (path.existSync(this.getFilePath())) {
            this.loadFromFile(this.getFilePath());
        }
    }

    public save(): void {
        this.saveToFile(this.getFilePath());
    }
}