var _ = require('lodash');
var async = require('async');
var util = require('util');

import { BenchmarkRunner } from '../BenchmarkRunner';
import { CommandLineArgs } from './CommandLineArgs';
import { ConsoleEventPrinter } from './ConsoleEventPrinter';

export class ConsoleRunner {
    private _args: CommandLineArgs;
    private _runner: BenchmarkRunner;

    public constructor() { }

    private start(args: string[]): void {
        this._args = new CommandLineArgs(args);
        this._runner = new BenchmarkRunner();
        
        ConsoleEventPrinter.attach(this._runner);

        this.executeBatchMode();
    }

    public stop(): void {
        this._runner.stop();
    }

    private executeBatchMode(): void {
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
            if ( this._args.configurationFile != null)
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
                    if (this._args.benchmarkEnvironment) {
                        console.log("Benchmarking Environment (wait up to 2 mins)...");
                        this._runner.benchmarkEnvironment(true, true, false, (err) => {
                            let output = util.format(
                                "CPU: %d, Video: %d, Disk: %d",
                                (this._runner.cpuBenchmark || 0).toFixed(2),
                                (this._runner.videoBenchmark || 0).toFixed(2),
                                (this._runner.diskBenchmark || 0).toFixed(2)
                            );
                            console.log(output);

                            callback(err);
                        });
                    } else callback();
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

    public printHelp(): void {
        console.log("Pip.Benchmark Console Runner. (c) Conceptual Vision Consulting LLC 2017");
        console.log();
        console.log("Command Line Parameters:");
        console.log("-a <assembly>    - Assembly with benchmarks to be loaded. You may include multiple assemblies");
        console.log("-p <param>=<value> - Name of benchmark to be executed. You may include multiple parameters");
        console.log("-b <benchmark>   - Name of benchmark to be executed. You may include multiple benchmarks");
        console.log("-c <config file> - File with configuration parameters to be loaded");
        console.log("-r <report file> - File to save benchmarking report");
        console.log("-d <seconds>     - Benchmarking time specified in seconds");
        console.log("-h               - Display this help screen");
        console.log("-B               - Show all available benchmarks");
        console.log("-P               - Show all available parameters");
        console.log("-e               - Benchmark environment");
        console.log("-x [proportional|sequencial] - Execution type");
        console.log("-m [peak|nominal] - Measurement type: Peak or Nominal");
        console.log("-n <rate>        - Nominal rate in transactions per second");
    }

    private printBenchmarks(): void {
        console.log("Pip.Benchmark Console Runner. (c) Conceptual Vision Consulting LLC 2017");
        console.log();
        console.log("Loaded Benchmarks:");

        let suites = this._runner.suiteManager.suites;
        _.each(suites, (suite) => {
            _.each(suite.benchmarks, (benchmark) => {
                console.log(benchmark.fullName + ' - ' + benchmark.description);
            });
        });
    }

    private printParameters(): void {
        console.log("Pip.Benchmark Console Runner. (c) Conceptual Vision Consulting LLC 2017");
        console.log();
        console.log("Configuration Parameters:");

        let parameters = this._runner.parameters.userDefined;
        for (let index = 0; index < parameters.length; index++) {
            let parameter = parameters[index];
            let defaultValue = parameter.defaultValue;
            defaultValue = defaultValue == null || defaultValue.length == 0 
                    ? "" : " (Default: " + defaultValue + ")";
            console.log('' + parameter.name + ' - ' + parameter.description + defaultValue);
        }
    }
        
    public static run(args: string[]): void {
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