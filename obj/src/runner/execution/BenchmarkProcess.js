"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require('lodash');
const MeasurementType_1 = require("../MeasurementType");
const ExecutionType_1 = require("../ExecutionType");
const BenchmarkException_1 = require("../BenchmarkException");
const ProportionalExecutionStrategy_1 = require("./ProportionalExecutionStrategy");
const SequencialExecutionStrategy_1 = require("./SequencialExecutionStrategy");
class BenchmarkProcess {
    constructor(runner) {
        this._strategy = null;
        this._measurementType = MeasurementType_1.MeasurementType.Peak;
        this._nominalRate = 1;
        this._executionType = ExecutionType_1.ExecutionType.Proportional;
        this._duration = 60;
        this._forceContinue = false;
        this._results = [];
        this._runner = runner;
    }
    get runner() {
        return this._runner;
    }
    get running() {
        return this._strategy != null;
    }
    get measurementType() {
        return this._measurementType;
    }
    set measurementType(value) {
        this._measurementType = value;
    }
    get nominalRate() {
        return this._nominalRate;
    }
    set nominalRate(value) {
        this._nominalRate = value;
    }
    get executionType() {
        return this._executionType;
    }
    set executionType(value) {
        this._executionType = value;
    }
    get duration() {
        return this._duration;
    }
    set duration(value) {
        this._duration = value;
    }
    get forceContinue() {
        return this._forceContinue;
    }
    set forceContinue(value) {
        this._forceContinue = value;
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
        if (this._executionType == ExecutionType_1.ExecutionType.Sequential)
            this._strategy = new SequencialExecutionStrategy_1.SequencialExecutionStrategy(this, selectedBenchmarks);
        else
            this._strategy = new ProportionalExecutionStrategy_1.ProportionalExecutionStrategy(this, selectedBenchmarks);
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
        this._runner.notifyResultUpdated(status, result);
    }
    notifyMessageSent(message) {
        this._runner.notifyMessageSent(message);
    }
    notifyErrorReported(errorMessage) {
        this._runner.notifyErrorReported(errorMessage);
    }
}
exports.BenchmarkProcess = BenchmarkProcess;
//# sourceMappingURL=BenchmarkProcess.js.map