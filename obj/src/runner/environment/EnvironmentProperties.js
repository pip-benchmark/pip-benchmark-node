"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require('path');
const Properties_1 = require("../utilities/Properties");
class EnvironmentProperties extends Properties_1.Properties {
    getFilePath() {
        return "BenchmarkEnvironment.properties";
    }
    get cpuBenchmark() {
        return super.getAsDouble("Environment.CpuBenchmark", 0);
    }
    set cpuBenchmark(value) {
        super.setAsDouble("Environment.CpuBenchmark", value);
    }
    get diskBenchmark() {
        return super.getAsDouble("Environment.DiskBenchmark", 0);
    }
    set diskBenchmark(value) {
        super.setAsDouble("Environment.DiskBenchmark", value);
    }
    get videoBenchmark() {
        return super.getAsDouble("Environment.VideoBenchmark", 0);
    }
    set videoBenchmark(value) {
        super.setAsDouble("Environment.VideoBenchmark", value);
    }
    load() {
        if (path.existSync(this.getFilePath())) {
            this.loadFromFile(this.getFilePath());
        }
    }
    save() {
        this.saveToFile(this.getFilePath());
    }
}
exports.EnvironmentProperties = EnvironmentProperties;
//# sourceMappingURL=EnvironmentProperties.js.map