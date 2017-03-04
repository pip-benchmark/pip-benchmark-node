"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util = require('util');
const ExecutionState_1 = require("../ExecutionState");
class ConsoleEventPrinter {
    static attach(runner) {
        runner.addErrorReportedListener(ConsoleEventPrinter.onErrorReported);
        runner.addMessageSentListener(ConsoleEventPrinter.onMessageSent);
        runner.addResultUpdatedListener(ConsoleEventPrinter.onResultUpdated);
    }
    static onResultUpdated(status, result) {
        if (status == ExecutionState_1.ExecutionState.Starting) {
            console.log("Benchmarking...");
        }
        else if (status == ExecutionState_1.ExecutionState.Running) {
            if (result != null) {
                let output = util.format("%s Performance: %.2f %.2f>%.2f>%.2f CPU Load: %.2f %.2f>%.2f>%.2f Errors: %d\n", new Date().toISOString(), result.performanceMeasurement.currentValue, result.performanceMeasurement.minValue, result.performanceMeasurement.averageValue, result.performanceMeasurement.maxValue, result.cpuLoadMeasurement.currentValue, result.cpuLoadMeasurement.minValue, result.cpuLoadMeasurement.averageValue, result.cpuLoadMeasurement.maxValue, result.errors.length);
                console.log(output);
            }
        }
        else if (status == ExecutionState_1.ExecutionState.Completed) {
            console.log("Completed Benchmark.");
        }
    }
    static onMessageSent(message) {
        console.log(message);
    }
    static onErrorReported(message) {
        console.error("Error: " + message);
    }
}
exports.ConsoleEventPrinter = ConsoleEventPrinter;
//# sourceMappingURL=ConsoleEventPrinter.js.map