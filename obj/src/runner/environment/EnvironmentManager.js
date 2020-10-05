"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvironmentManager = void 0;
let async = require('async');
const ConfigurationManager_1 = require("../config/ConfigurationManager");
const ResultsManager_1 = require("../results/ResultsManager");
const ExecutionManager_1 = require("../execution/ExecutionManager");
const EnvironmentProperties_1 = require("./EnvironmentProperties");
const BenchmarkSuiteInstance_1 = require("../benchmarks/BenchmarkSuiteInstance");
const StandardBenchmarkSuite_1 = require("./StandardBenchmarkSuite");
const SystemInfo_1 = require("./SystemInfo");
class EnvironmentManager extends ExecutionManager_1.ExecutionManager {
    constructor() {
        let configuration = new ConfigurationManager_1.ConfigurationManager();
        configuration.duration = EnvironmentManager.Duration;
        let results = new ResultsManager_1.ResultsManager();
        super(configuration, results);
        try {
            this.load();
        }
        catch (ex) {
            // Ignore. it shall never happen here...
        }
    }
    get systemInfo() {
        return new SystemInfo_1.SystemInfo();
    }
    get cpuMeasurement() {
        return this._cpuMeasurement;
    }
    get videoMeasurement() {
        return this._videoMeasurement;
    }
    get diskMeasurement() {
        return this._diskMeasurement;
    }
    measure(cpu, disk, video, callback) {
        async.series([
            (callback) => {
                if (cpu) {
                    this.measureCpu((err, result) => {
                        if (err == null)
                            this._cpuMeasurement = result;
                        callback();
                    });
                }
                else
                    callback();
            },
            (callback) => {
                if (disk) {
                    this.measureDisk((err, result) => {
                        if (err == null)
                            this._diskMeasurement = result;
                        callback();
                    });
                }
                else
                    callback();
            },
            (callback) => {
                if (video) {
                    this.measureVideo((err, result) => {
                        if (err == null)
                            this._videoMeasurement = result;
                        callback();
                    });
                }
                else
                    callback();
            }
        ], (err) => {
            this.stop();
            if (err == null)
                this.save();
            if (callback)
                callback(err);
        });
    }
    load() {
        let properties = new EnvironmentProperties_1.EnvironmentProperties();
        properties.load();
        this._cpuMeasurement = properties.getAsDouble("CpuMeasurement", 0);
        this._videoMeasurement = properties.getAsDouble("VideoMeasurement", 0);
        this._diskMeasurement = properties.getAsDouble("DiskMeasurement", 0);
    }
    save() {
        let properties = new EnvironmentProperties_1.EnvironmentProperties();
        properties.setAsDouble("CpuMeasurement", this._cpuMeasurement);
        properties.setAsDouble("VideoMeasurement", this._videoMeasurement);
        properties.setAsDouble("DiskMeasurement", this._diskMeasurement);
        properties.save();
    }
    measureCpu(callback) {
        let suite = new StandardBenchmarkSuite_1.StandardBenchmarkSuite();
        let instance = new BenchmarkSuiteInstance_1.BenchmarkSuiteInstance(suite);
        instance.unselectAll();
        instance.selectByName(suite.cpuBenchmark.name);
        this.run(instance.isSelected, (err) => {
            let result = this._results.all.length > 0
                ? this._results.all[0].performanceMeasurement.averageValue : 0;
            callback(err, result);
        });
    }
    measureDisk(callback) {
        let suite = new StandardBenchmarkSuite_1.StandardBenchmarkSuite();
        let instance = new BenchmarkSuiteInstance_1.BenchmarkSuiteInstance(suite);
        instance.unselectAll();
        instance.selectByName(suite.diskBenchmark.name);
        this.run(instance.isSelected, (err) => {
            let result = this._results.all.length > 0
                ? this._results.all[0].performanceMeasurement.averageValue : 0;
            callback(err, result);
        });
    }
    measureVideo(callback) {
        let suite = new StandardBenchmarkSuite_1.StandardBenchmarkSuite();
        let instance = new BenchmarkSuiteInstance_1.BenchmarkSuiteInstance(suite);
        instance.unselectAll();
        instance.selectByName(suite.videoBenchmark.name);
        this.run(instance.isSelected, (err) => {
            let result = this._results.all.length > 0
                ? this._results.all[0].performanceMeasurement.averageValue : 0;
            callback(err, result);
        });
    }
}
exports.EnvironmentManager = EnvironmentManager;
EnvironmentManager.Duration = 5;
//# sourceMappingURL=EnvironmentManager.js.map