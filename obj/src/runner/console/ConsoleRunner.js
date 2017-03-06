"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require('lodash');
var async = require('async');
var util = require('util');
const BenchmarkRunner_1 = require("../BenchmarkRunner");
const CommandLineArgs_1 = require("./CommandLineArgs");
const ConsoleEventPrinter_1 = require("./ConsoleEventPrinter");
class ConsoleRunner {
    constructor() { }
    start(args) {
        this._args = new CommandLineArgs_1.CommandLineArgs(args);
        this._runner = new BenchmarkRunner_1.BenchmarkRunner();
        ConsoleEventPrinter_1.ConsoleEventPrinter.attach(this._runner);
        this.executeBatchMode();
    }
    stop() {
        this._runner.stop();
    }
    executeBatchMode() {
        try {
            if (this._args.showHelp) {
                this.printHelp();
                return;
            }
            // Load modules
            _.each(this._args.modules, (module) => {
                this._runner.loadSuitesFromModule(module);
            });
            // Load test suites classes
            _.each(this._args.classes, (clazz) => {
                this._runner.addSuiteFromClass(clazz);
            });
            // Load configuration
            if (this._args.configurationFile != null)
                this._runner.parameters.loadFromFile(this._args.configurationFile);
            // Set parameters
            if (!_.isEmpty(this._args.parameters))
                this._runner.parameters.set(this._args.parameters);
            // Select benchmarks
            if (this._args.benchmarks.length == 0)
                this._runner.selectAllBenchmarks();
            else
                this._runner.selectBenchmarksByName(...this._args.benchmarks);
            if (this._args.showParameters) {
                this.printParameters();
                return;
            }
            if (this._args.showBenchmarks) {
                this.printBenchmarks();
                return;
            }
            async.series([
                (callback) => {
                    // Benchmark the environment
                    if (this._args.measureEnvironment) {
                        console.log("Measuring Environment (wait up to 2 mins)...");
                        this._runner.environment.measure(true, true, false, (err) => {
                            let output = util.format("CPU: %d, Video: %d, Disk: %d", (this._runner.environment.cpuMeasurement || 0).toFixed(2), (this._runner.environment.videoMeasurement || 0).toFixed(2), (this._runner.environment.diskMeasurement || 0).toFixed(2));
                            console.log(output);
                            callback(err);
                        });
                    }
                    else
                        callback();
                },
                (callback) => {
                    // Configure benchmarking
                    this._runner.measurementType = this._args.measurementType;
                    this._runner.nominalRate = this._args.nominalRate;
                    this._runner.executionType = this._args.executionType;
                    this._runner.duration = this._args.duration;
                    // Perform benchmarking
                    this._runner.run(() => {
                        if (this._runner.results.length > 0)
                            console.log(this._runner.results[0].performanceMeasurement.averageValue.toFixed(2));
                        // Generate report
                        if (this._args.reportFile != null)
                            this._runner.saveReportToFile(this._args.reportFile);
                        console.log(this._runner.generateReport());
                        callback();
                    });
                }
            ], (err) => {
                // Do nothing
            });
        }
        catch (ex) {
            console.error(ex);
        }
    }
    printHelp() {
        console.log("Pip.Benchmark Console Runner. (c) Conceptual Vision Consulting LLC 2017");
        console.log();
        console.log("Command Line Parameters:");
        console.log("-a <module>    - Module with benchmarks to be loaded. You may include multiple modules");
        console.log("-p <param>=<value> - Set parameter value. You may include multiple parameters");
        console.log("-b <benchmark>   - Name of benchmark to be executed. You may include multiple benchmarks");
        console.log("-c <config file> - File with parameters to be loaded");
        console.log("-r <report file> - File to save benchmarking report");
        console.log("-d <seconds>     - Benchmarking duration in seconds");
        console.log("-h               - Display this help screen");
        console.log("-B               - Show all available benchmarks");
        console.log("-P               - Show all available parameters");
        console.log("-e               - Measure environment");
        console.log("-x [proportional|sequencial] - Execution type: Proportional or Sequencial");
        console.log("-m [peak|nominal] - Measurement type: Peak or Nominal");
        console.log("-n <rate>        - Nominal rate in transactions per second");
    }
    printBenchmarks() {
        console.log("Pip.Benchmark Console Runner. (c) Conceptual Vision Consulting LLC 2017");
        console.log();
        console.log("Benchmarks:");
        let suites = this._runner.suiteManager.suites;
        _.each(suites, (suite) => {
            _.each(suite.benchmarks, (benchmark) => {
                console.log(benchmark.fullName + ' - ' + benchmark.description);
            });
        });
    }
    printParameters() {
        console.log("Pip.Benchmark Console Runner. (c) Conceptual Vision Consulting LLC 2017");
        console.log();
        console.log("Parameters:");
        let parameters = this._runner.parameters.userDefined;
        for (let index = 0; index < parameters.length; index++) {
            let parameter = parameters[index];
            let defaultValue = parameter.defaultValue;
            defaultValue = defaultValue == null || defaultValue.length == 0
                ? "" : " (Default: " + defaultValue + ")";
            console.log('' + parameter.name + ' - ' + parameter.description + defaultValue);
        }
    }
    static run(args) {
        let runner = new ConsoleRunner();
        // Log uncaught exceptions
        process.on('uncaughtException', (ex) => {
            console.error(ex);
            console.error("Process is terminated");
            process.exit(1);
        });
        // Gracefully shutdown
        process.on('exit', function () {
            runner.stop();
            console.log("Goodbye!");
        });
        runner.start(process.argv);
    }
}
exports.ConsoleRunner = ConsoleRunner;
//# sourceMappingURL=ConsoleRunner.js.map