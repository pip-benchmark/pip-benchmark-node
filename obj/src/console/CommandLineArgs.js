"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandLineArgs = void 0;
const MeasurementType_1 = require("../runner/config/MeasurementType");
const ExecutionType_1 = require("../runner/config/ExecutionType");
const Converter_1 = require("../utilities/Converter");
class CommandLineArgs {
    constructor(args) {
        this.modules = [];
        this.classes = [];
        this.benchmarks = [];
        this.parameters = {};
        this.reportFile = "BenchmarkReport.txt";
        this.duration = 60;
        this.showHelp = false;
        this.showBenchmarks = false;
        this.showParameters = false;
        this.showReport = false;
        this.measureEnvironment = false;
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
                this.duration = Converter_1.Converter.stringToLong(args[++index], 60);
            }
            else if ((arg == "-m" || arg == "--measure") && moreArgs) {
                let measure = args[++index].toLowerCase();
                this.measurementType = measure.startsWith("nom")
                    ? MeasurementType_1.MeasurementType.Nominal : MeasurementType_1.MeasurementType.Peak;
            }
            else if ((arg == "-x" || arg == "--execute") && moreArgs) {
                let execution = args[++index].toLowerCase();
                this.executionType = execution.startsWith("seq")
                    ? ExecutionType_1.ExecutionType.Sequential : ExecutionType_1.ExecutionType.Proportional;
            }
            else if ((arg == "-n" || arg == "--nominal") && moreArgs) {
                this.nominalRate = Converter_1.Converter.stringToDouble(args[++index], 1);
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
            else if (arg == "-R" || arg == "--show-report") {
                this.showReport = true;
            }
            else if (arg == "-e" || arg == "--environment") {
                this.measureEnvironment = true;
            }
        }
    }
}
exports.CommandLineArgs = CommandLineArgs;
//# sourceMappingURL=CommandLineArgs.js.map