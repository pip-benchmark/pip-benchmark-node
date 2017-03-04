"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MeasurementType_1 = require("../MeasurementType");
const ExecutionType_1 = require("../ExecutionType");
const SimpleTypeConverter_1 = require("../../SimpleTypeConverter");
class CommandLineArgs {
    constructor(args) {
        this.modules = [];
        this.classes = [];
        this.benchmarks = [];
        this.parameters = {};
        this.reportFile = "BenchmarkReport.txt";
        this.duration = 30000;
        this.showHelp = false;
        this.showBenchmarks = false;
        this.showParameters = false;
        this.benchmarkEnvironment = false;
        this.measurementType = MeasurementType_1.MeasurementType.Peak;
        this.executionType = ExecutionType_1.ExecutionType.Proportional;
        this.nominalRate = 1;
        this.processArguments(args);
    }
    processArguments(args) {
        for (let index = 2; index < args.length; index++) {
            let arg = args[index];
            let moreArgs = index < args.length - 1;
            if ((arg == "-a" || arg == "-j" || arg == "--module") && moreArgs) {
                let module = args[++index];
                this.modules.push(module);
            }
            else if ((arg == "-l" || arg == "--class") && moreArgs) {
                let clazz = args[++index];
                this.classes.push(clazz);
            }
            else if ((arg == "-b" || arg == "--benchmark") && moreArgs) {
                let benchmark = args[++index];
                this.benchmarks.push(benchmark);
            }
            else if ((arg == "-p" || arg == "--param") && moreArgs) {
                let param = args[++index];
                let pos = param.indexOf('=');
                let key = pos > 0 ? param.substring(0, pos - 1) : param;
                let value = pos > 0 ? param.substring(pos + 1) : null;
                this.parameters.put(key, value);
            }
            else if ((arg == "-c" || arg == "--config") && moreArgs) {
                this.configurationFile = args[++index];
            }
            else if ((arg == "-r" || arg == "--report") && moreArgs) {
                this.reportFile = args[++index];
            }
            else if ((arg == "-d" || arg == "--duration") && moreArgs) {
                this.duration = SimpleTypeConverter_1.SimpleTypeConverter.stringToLong(args[++index], 30000);
            }
            else if ((arg == "-m" || arg == "--measure") && moreArgs) {
                this.measurementType = args[++index].toLowerCase() == "nominal"
                    ? MeasurementType_1.MeasurementType.Nominal : MeasurementType_1.MeasurementType.Peak;
            }
            else if ((arg == "-e" || arg == "--execute") && moreArgs) {
                let execution = args[++index].toLowerCase();
                this.executionType = execution == "seq" || execution == "sequential"
                    ? ExecutionType_1.ExecutionType.Sequential : ExecutionType_1.ExecutionType.Proportional;
            }
            else if ((arg == "-n" || arg == "--nominal") && moreArgs) {
                this.nominalRate = SimpleTypeConverter_1.SimpleTypeConverter.stringToDouble(args[++index], 1);
            }
            else if (arg == "-h" || arg == "--help") {
                this.showHelp = true;
            }
            else if (arg == "-B" || arg == "--show-benchmarks") {
                this.showBenchmarks = true;
            }
            else if (arg == "-P" || arg == "--show-params") {
                this.showParameters = true;
            }
            else if (arg == "-e" || arg == "--environment") {
                this.benchmarkEnvironment = true;
            }
        }
    }
}
exports.CommandLineArgs = CommandLineArgs;
//# sourceMappingURL=CommandLineArgs.js.map