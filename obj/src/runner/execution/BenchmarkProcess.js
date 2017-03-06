"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require('lodash');
const ExecutionType_1 = require("../config/ExecutionType");
const BenchmarkException_1 = require("../BenchmarkException");
const ProportionalExecutionStrategy_1 = require("./ProportionalExecutionStrategy");
const SequencialExecutionStrategy_1 = require("./SequencialExecutionStrategy");
class BenchmarkProcess {
    constructor(configuration) {
        this._strategy = null;
        this._results = [];
        this._configuration = configuration;
    }
    get running() {
        return this._strategy != null;
    }
    get results() {
        return this._results;
    }
    start(suites) {
        this.run(suites, () => { });
    }
    run(suites, callback) {
        if (this._strategy != null)
            this.stop();
        // Identify active tests
        this._suites = suites;
        let selectedBenchmarks = [];
        _.each(suites, (s) => {
            _.each(s.benchmarks, (b) => {
                if (b.selected)
                    selectedBenchmarks.push(b);
            });
        });
        // Check if there is at least one test defined
        if (selectedBenchmarks.length == 0)
            throw new BenchmarkException_1.BenchmarkException("There are no benchmarks to execute");
        // Create requested test strategy
        if (this._configuration.executionType == ExecutionType_1.ExecutionType.Sequential)
            this._strategy = new SequencialExecutionStrategy_1.SequencialExecutionStrategy(this._configuration, selectedBenchmarks);
        else
            this._strategy = new ProportionalExecutionStrategy_1.ProportionalExecutionStrategy(this._configuration, selectedBenchmarks);
        // Initialize parameters and start 
        this._results = [];
        this._strategy.start(() => {
            this.stop();
            if (callback)
                callback();
        });
    }
    stop() {
        if (this._strategy != null) {
            // Stop strategy
            this._strategy.stop();
            // Fill results
            this._results = this._strategy.getResults();
            this._strategy = null;
        }
    }
    notifyResultUpdate(status, result) {
        //this._runner.notifyResultUpdated(status, result);
    }
    notifyMessageSent(message) {
        //this._runner.notifyMessageSent(message);
    }
    notifyErrorReported(errorMessage) {
        //this._runner.notifyErrorReported(errorMessage);
    }
}
exports.BenchmarkProcess = BenchmarkProcess;
//# sourceMappingURL=BenchmarkProcess.js.map