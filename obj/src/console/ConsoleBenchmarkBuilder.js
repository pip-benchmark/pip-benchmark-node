"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleBenchmarkBuilder = void 0;
const _ = require('lodash');
const BenchmarkBuilder_1 = require("../runner/BenchmarkBuilder");
const ConsoleEventPrinter_1 = require("./ConsoleEventPrinter");
const CommandLineArgs_1 = require("./CommandLineArgs");
class ConsoleBenchmarkBuilder extends BenchmarkBuilder_1.BenchmarkBuilder {
    configureWithArgs(args) {
        let _args;
        if (args instanceof CommandLineArgs_1.CommandLineArgs) {
            _args = args;
        }
        else {
            _args = new CommandLineArgs_1.CommandLineArgs(args);
        }
        // Load modules
        for (let module of _args.modules) {
            this._runner.benchmarks.addSuitesFromModule(module);
        }
        // Load test suites classes
        for (let clazz of _args.classes) {
            this._runner.benchmarks.addSuiteFromClass(clazz);
        }
        // Load configuration
        if (_args.configurationFile != null)
            this._runner.parameters.loadFromFile(_args.configurationFile);
        // Set parameters
        if (!_.isEmpty(_args.parameters))
            this._runner.parameters.set(_args.parameters);
        // Select benchmarks
        if (_args.benchmarks.length == 0)
            this._runner.benchmarks.selectAll();
        else
            this._runner.benchmarks.selectByName(_args.benchmarks);
        // Configure benchmarking
        this._runner.configuration.measurementType = _args.measurementType;
        this._runner.configuration.nominalRate = _args.nominalRate;
        this._runner.configuration.executionType = _args.executionType;
        this._runner.configuration.duration = _args.duration;
        return this;
    }
    create() {
        let _runner = super.create();
        ConsoleEventPrinter_1.ConsoleEventPrinter.attach(_runner);
        return _runner;
    }
}
exports.ConsoleBenchmarkBuilder = ConsoleBenchmarkBuilder;
//# sourceMappingURL=ConsoleBenchmarkBuilder.js.map