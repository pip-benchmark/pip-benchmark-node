"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var async = require('async');
const BenchmarkProcess_1 = require("../execution/BenchmarkProcess");
const EnvironmentProperties_1 = require("./EnvironmentProperties");
const BenchmarkSuiteInstance_1 = require("../BenchmarkSuiteInstance");
const StandardBenchmarkSuite_1 = require("./StandardBenchmarkSuite");
const SystemInformation_1 = require("./SystemInformation");
class EnvironmentState extends BenchmarkProcess_1.BenchmarkProcess {
    constructor(runner) {
        super(runner);
        try {
            this.loadSystemBenchmarks();
        }
        catch (ex) {
            // Ignore. it shall never happen here...
        }
    }
    get systemInformation() {
        return new SystemInformation_1.SystemInformation();
    }
    get cpuBenchmark() {
        return this._cpuBenchmark;
    }
    get videoBenchmark() {
        return this._videoBenchmark;
    }
    get diskBenchmark() {
        return this._diskBenchmark;
    }
    benchmarkEnvironment(cpu, disk, video, callback) {
        async.series([
            (callback) => {
                if (cpu) {
                    this.computeCpuBenchmark((err, result) => {
                        if (err == null)
                            this._cpuBenchmark = result;
                        callback();
                    });
                }
                else
                    callback();
            },
            (callback) => {
                if (disk) {
                    this.computeDiskBenchmark((err, result) => {
                        if (err == null)
                            this._diskBenchmark = result;
                        callback();
                    });
                }
                else
                    callback();
            },
            (callback) => {
                if (video) {
                    this.computeVideoBenchmark((err, result) => {
                        if (err == null)
                            this._videoBenchmark = result;
                        callback();
                    });
                }
                else
                    callback();
            }
        ], (err) => {
            this.stop();
            this.saveSystemBenchmarks();
            if (callback)
                callback(err);
        });
    }
    loadSystemBenchmarks() {
        let properties = new EnvironmentProperties_1.EnvironmentProperties();
        properties.load();
        this._cpuBenchmark = properties.getAsDouble("System.CpuBenchmark", 0);
        this._videoBenchmark = properties.getAsDouble("System.VideoBenchmark", 0);
        this._diskBenchmark = properties.getAsDouble("System.DiskBenchmark", 0);
    }
    saveSystemBenchmarks() {
        let properties = new EnvironmentProperties_1.EnvironmentProperties();
        properties.setAsDouble("System.CpuBenchmark", this._cpuBenchmark);
        properties.setAsDouble("System.VideoBenchmark", this._videoBenchmark);
        properties.setAsDouble("System.DiskBenchmark", this._diskBenchmark);
        properties.save();
    }
    computeCpuBenchmark(callback) {
        let suite = new StandardBenchmarkSuite_1.StandardBenchmarkSuite();
        let instance = new BenchmarkSuiteInstance_1.BenchmarkSuiteInstance(suite);
        instance.unselectAllBenchmarks();
        instance.selectBenchmark(suite.cpuBenchmark.name);
        super.duration = EnvironmentState.Duration;
        super.run([instance], () => {
            let result = super.results[0].performanceMeasurement.averageValue;
            callback(null, result);
        });
    }
    computeDiskBenchmark(callback) {
        let suite = new StandardBenchmarkSuite_1.StandardBenchmarkSuite();
        let instance = new BenchmarkSuiteInstance_1.BenchmarkSuiteInstance(suite);
        instance.unselectAllBenchmarks();
        instance.selectBenchmark(suite.diskBenchmark.name);
        super.duration = EnvironmentState.Duration;
        super.run([instance], () => {
            let result = super.results[0].performanceMeasurement.averageValue;
            callback(null, result);
        });
    }
    computeVideoBenchmark(callback) {
        let suite = new StandardBenchmarkSuite_1.StandardBenchmarkSuite();
        let instance = new BenchmarkSuiteInstance_1.BenchmarkSuiteInstance(suite);
        instance.unselectAllBenchmarks();
        instance.selectBenchmark(suite.videoBenchmark.name);
        super.duration = EnvironmentState.Duration;
        super.run([instance], () => {
            let result = super.results[0].performanceMeasurement.averageValue;
            callback(null, result);
        });
    }
}
EnvironmentState.Duration = 5;
exports.EnvironmentState = EnvironmentState;
//# sourceMappingURL=EnvironmentState.js.map