"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        //this._runner.stop();
    }
    executeBatchMode() {
        try {
            if (this._args.showHelp) {
                this.printHelp();
                return;
            }
            // // Load modules
            // for (String library : args.getLibraries()) 
            //     runner.loadSuitesFromLibrary(library);
            // // Load test suites classes
            // for (String className : args.getClasses())
            //     runner.addSuiteFromClass(className);
            // Load configuration
            if (this._args.configurationFile != null)
                this._runner.loadConfigurationFromFile(this._args.configurationFile);
            // // Set parameters
            // if (args.getParameters().size() > 0)
            //     runner.setConfiguration(args.getParameters());
            // // Select benchmarks
            // if (args.getBenchmarks().size() == 0)
            //     runner.selectAllBenchmarks();
            // else {
            //     for (String benchmarkName : args.getBenchmarks())
            //         runner.selectBenchmarks(benchmarkName);
            // }
            if (this._args.showParameters) {
                this.printParameters();
                return;
            }
            if (this._args.showBenchmarks) {
                this.printBenchmarks();
                return;
            }
            // // Benchmark the environment
            // if (args.getBenchmarkEnvironment()) {
            //     console.log("Benchmarking Environment (wait up to 2 mins)...");
            //     runner.benchmarkEnvironment();
            //     System.out.printf("CPU: %.2f, Video: %.2f, Disk: %.2f\n",
            //         runner.getCpuBenchmark(), runner.getVideoBenchmark(), runner.getDiskBenchmark());
            // }
            // // Configure benchmarking
            // runner.setMeasurementType(args.getMeasurementType());
            // runner.setNominalRate(args.getNominalRate());
            // runner.setExecutionType(args.getExecutionType());
            // runner.setDuration((int)args.getDuration());
            // // Perform benchmarking
            // runner.start();
            // if (runner.getExecutionType() == ExecutionType.Proportional) {
            //     Thread.sleep((int)args.getDuration());
            //     runner.stop();
            // }
            // if (runner.getResults().size() > 0)
            //     System.out.printf("%f", runner.getResults().get(0).getPerformanceMeasurement().getAverageValue());
            // // Generate report
            // if (args.getReportFile() != null) {
            //     FileOutputStream stream = new FileOutputStream(args.getReportFile());
            //     try {
            //         BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(stream));
            //         try {
            //             writer.write(runner.generateReport());
            //         } finally {
            //             writer.close();
            //         }
            //     } finally {
            //         stream.close();
            //     }
            // }
        }
        catch (ex) {
            console.error("Error: " + ex);
        }
    }
    printHelp() {
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
    printBenchmarks() {
        console.log("Pip.Benchmark Console Runner. (c) Conceptual Vision Consulting LLC 2017");
        console.log();
        console.log("Loaded Benchmarks:");
        // for (BenchmarkSuiteInstance suite : runner.getSuiteInstances()) {
        //     for (BenchmarkInstance benchmark : suite.getBenchmarks()) {
        //         System.out.printf("%s - %s\n", benchmark.getFullName(), benchmark.getDescription());
        //     }
        // }
    }
    printParameters() {
        console.log("Pip.Benchmark Console Runner. (c) Conceptual Vision Consulting LLC 2017");
        console.log();
        console.log("Configuration Parameters:");
        let parameters = this._runner.configuration;
        for (let index = 0; index < parameters.length; index++) {
            let parameter = parameters[index];
            let defaultValue = parameter.defaultValue;
            defaultValue = defaultValue == null || defaultValue.length == 0
                ? "" : " (Default: " + defaultValue + ")";
            console.log('' + parameter.name + ' - ' + parameter.description + defaultValue);
        }
    }
    configurationUpdated() { }
    /// <summary>
    /// The main entry point for the application.
    /// </summary>
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