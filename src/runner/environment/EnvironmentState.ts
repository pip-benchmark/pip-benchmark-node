var async = require('async');

import { BenchmarkProcess } from '../execution/BenchmarkProcess';
import { BenchmarkingProperties } from '../config/BenchmarkingProperties';
import { BenchmarkSuiteInstance } from '../BenchmarkSuiteInstance';
import { StandardBenchmarkSuite } from './StandardBenchmarkSuite';
import { SystemInformation } from './SystemInformation';

export class EnvironmentState extends BenchmarkProcess {
    private static readonly Duration = 5;

    private _cpuBenchmark: number;
    private _videoBenchmark: number;
    private _diskBenchmark: number;

    public constructor(runner: any) {
        super(runner);
        
        try {
        	this.loadSystemBenchmarks();
        } catch (ex) {
        	// Ignore. it shall never happen here...
        }
    }

    public get systemInformation(): any {
        return new SystemInformation();
    }

    public get cpuBenchmark(): number {
        return this._cpuBenchmark;
    }

    public get videoBenchmark(): number {
        return this._videoBenchmark;
    }

    public get diskBenchmark(): number {
        return this._diskBenchmark;
    }

    public benchmarkEnvironment(cpu: boolean, disk: boolean, video: boolean, callback?: (err: any) => void): void {
        async.series([
            (callback) => {
                if (cpu) {
                    this.computeCpuBenchmark((err, result) => {
                        if (err == null)
                            this._cpuBenchmark = result;
                        callback();
                    })
                } else callback();
            },
            (callback) => {
                if (disk) {
                    this.computeDiskBenchmark((err, result) => {
                        if (err == null)
                            this._diskBenchmark = result;
                        callback();
                    })
                } else callback();
            },
            (callback) => {
                if (video) {
                    this.computeVideoBenchmark((err, result) => {
                        if (err == null)
                            this._videoBenchmark = result;
                        callback();
                    })
                } else callback();
            }
        ], (err) => {
            this.stop();
            if (callback) callback(err);
        });
    }

    private loadSystemBenchmarks(): void {
        let properties = new BenchmarkingProperties();
        properties.load();

        this._cpuBenchmark = properties.getAsDouble("System.CpuBenchmark", 0);
        this._videoBenchmark = properties.getAsDouble("System.VideoBenchmark", 0);
        this._diskBenchmark = properties.getAsDouble("System.DiskBenchmark", 0);
    }

    private saveSystemBenchmarks(): void {
        let properties = new BenchmarkingProperties();

        properties.setAsDouble("System.CpuBenchmark", this._cpuBenchmark);
        properties.setAsDouble("System.VideoBenchmark", this._videoBenchmark);
        properties.setAsDouble("System.DiskBenchmark", this._diskBenchmark);

        properties.save();
    }

    private computeCpuBenchmark(callback: (err: any, result: number) => void): void {
        let suite = new StandardBenchmarkSuite();
        let instance = new BenchmarkSuiteInstance(suite);
        
        instance.unselectAllBenchmarks();
        instance.selectBenchmark(suite.cpuBenchmark.name);

        super.duration = EnvironmentState.Duration;
        super.run([instance], () => {
            let result = super.results[0].performanceMeasurement.averageValue;
            callback(null, result);
        });
    }

    private computeDiskBenchmark(callback: (err: any, result: number) => void): void {
        let suite = new StandardBenchmarkSuite();
        let instance = new BenchmarkSuiteInstance(suite);
        
        instance.unselectAllBenchmarks();
        instance.selectBenchmark(suite.diskBenchmark.name);

        super.duration = EnvironmentState.Duration;
        super.run([instance], () => {
            let result = super.results[0].performanceMeasurement.averageValue;
            callback(null, result);
        });
    }

    private computeVideoBenchmark(callback: (err: any, result: number) => void): void {
        let suite = new StandardBenchmarkSuite();
        let instance = new BenchmarkSuiteInstance(suite);
        
        instance.unselectAllBenchmarks();
        instance.selectBenchmark(suite.videoBenchmark.name);

        super.duration = EnvironmentState.Duration;
        super.run([instance], () => {
            let result = super.results[0].performanceMeasurement.averageValue;
            callback(null, result);
        });
    }
    
}
