var async = require('async');

import { ConfigurationManager } from '../config/ConfigurationManager';
import { ResultsManager } from '../results/ResultsManager';
import { BenchmarkProcess } from '../execution/BenchmarkProcess';
import { EnvironmentProperties } from './EnvironmentProperties';
import { BenchmarkSuiteInstance } from '../benchmarks/BenchmarkSuiteInstance';
import { StandardBenchmarkSuite } from './StandardBenchmarkSuite';
import { SystemInfo } from './SystemInfo';

export class EnvironmentManager extends BenchmarkProcess {
    private static readonly Duration = 5;

    private _cpuMeasurement: number;
    private _videoMeasurement: number;
    private _diskMeasurement: number;

    public constructor() {
        let configuration = new ConfigurationManager();
        configuration.duration = EnvironmentManager.Duration;

        let results = new ResultsManager();

        super(configuration, results);
        
        try {
        	this.load();
        } catch (ex) {
        	// Ignore. it shall never happen here...
        }
    }

    public get systemInfo(): any {
        return new SystemInfo();
    }

    public get cpuMeasurement(): number {
        return this._cpuMeasurement;
    }

    public get videoMeasurement(): number {
        return this._videoMeasurement;
    }

    public get diskMeasurement(): number {
        return this._diskMeasurement;
    }

    public measure(cpu: boolean, disk: boolean, video: boolean, callback?: (err: any) => void): void {
        async.series([
            (callback) => {
                if (cpu) {
                    this.measureCpu((err, result) => {
                        if (err == null)
                            this._cpuMeasurement = result;
                        callback();
                    })
                } else callback();
            },
            (callback) => {
                if (disk) {
                    this.measureDisk((err, result) => {
                        if (err == null)
                            this._diskMeasurement = result;
                        callback();
                    })
                } else callback();
            },
            (callback) => {
                if (video) {
                    this.measureVideo((err, result) => {
                        if (err == null)
                            this._videoMeasurement = result;
                        callback();
                    })
                } else callback();
            }
        ], (err) => {
            this.stop();

            this.save();

            if (callback) callback(err);
        });
    }

    private load(): void {
        let properties = new EnvironmentProperties();
        properties.load();

        this._cpuMeasurement = properties.getAsDouble("CpuMeasurement", 0);
        this._videoMeasurement = properties.getAsDouble("VideoMeasurement", 0);
        this._diskMeasurement = properties.getAsDouble("DiskMeasurement", 0);
    }

    private save(): void {
        let properties = new EnvironmentProperties();

        properties.setAsDouble("CpuMeasurement", this._cpuMeasurement);
        properties.setAsDouble("VideoMeasurement", this._videoMeasurement);
        properties.setAsDouble("DiskMeasurement", this._diskMeasurement);

        properties.save();
    }

    private measureCpu(callback: (err: any, result: number) => void): void {
        let suite = new StandardBenchmarkSuite();
        let instance = new BenchmarkSuiteInstance(suite);
        
        instance.unselectAll();
        instance.selectByName(suite.cpuBenchmark.name);

        super.run([instance], () => {
            let result = super._results.all[0].performanceMeasurement.averageValue;
            callback(null, result);
        });
    }

    private measureDisk(callback: (err: any, result: number) => void): void {
        let suite = new StandardBenchmarkSuite();
        let instance = new BenchmarkSuiteInstance(suite);
        
        instance.unselectAll();
        instance.selectByName(suite.diskBenchmark.name);

        super.run([instance], () => {
            let result = super._results.all[0].performanceMeasurement.averageValue;
            callback(null, result);
        });
    }

    private measureVideo(callback: (err: any, result: number) => void): void {
        let suite = new StandardBenchmarkSuite();
        let instance = new BenchmarkSuiteInstance(suite);
        
        instance.unselectAll();
        instance.selectByName(suite.videoBenchmark.name);

        super.run([instance], () => {
            let result = super._results.all[0].performanceMeasurement.averageValue;
            callback(null, result);
        });
    }
    
}
