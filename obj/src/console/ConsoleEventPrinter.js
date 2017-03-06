"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util = require('util');
const ExecutionState_1 = require("../runner/execution/ExecutionState");
class ConsoleEventPrinter {
    static attach(runner) {
        runner.execution.addUpdatedListener(ConsoleEventPrinter.onStateUpdated);
        runner.results.addErrorListener(ConsoleEventPrinter.onErrorReported);
        runner.results.addMessageListener(ConsoleEventPrinter.onMessageSent);
        runner.results.addUpdatedListener(ConsoleEventPrinter.onResultUpdated);
    }
    static onStateUpdated(state) {
        if (state == ExecutionState_1.ExecutionState.Running)
            console.log("Measuring....");
        else if (state == ExecutionState_1.ExecutionState.Completed)
            console.log("Completed measuring.");
    }
    static onResultUpdated(result) {
        if (result != null) {
            let output = util.format("%s Performance: %d %d>%d>%d CPU Load: %d %d>%d>%d Errors: %d", new Date().toISOString(), result.performanceMeasurement.currentValue.toFixed(2), result.performanceMeasurement.minValue.toFixed(2), result.performanceMeasurement.averageValue.toFixed(2), result.performanceMeasurement.maxValue.toFixed(2), result.cpuLoadMeasurement.currentValue.toFixed(2), result.cpuLoadMeasurement.minValue.toFixed(2), result.cpuLoadMeasurement.averageValue.toFixed(2), result.cpuLoadMeasurement.maxValue.toFixed(2), result.errors.length);
            console.log(output);
        }
    }
    static onMessageSent(message) {
        console.log(message);
    }
    static onErrorReported(message) {
        console.error(message);
    }
}
exports.ConsoleEventPrinter = ConsoleEventPrinter;
//# sourceMappingURL=ConsoleEventPrinter.js.map