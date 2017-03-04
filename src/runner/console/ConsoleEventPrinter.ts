var util = require('util');

import { BenchmarkRunner } from '../BenchmarkRunner';
import { BenchmarkResult } from '../BenchmarkResult';
import { ExecutionState } from '../ExecutionState';

export class ConsoleEventPrinter {

    public static attach(runner: BenchmarkRunner): void {
        runner.addErrorReportedListener(ConsoleEventPrinter.onErrorReported);
        runner.addMessageSentListener(ConsoleEventPrinter.onMessageSent);
        runner.addResultUpdatedListener(ConsoleEventPrinter.onResultUpdated);
    }

    public static onResultUpdated(status: ExecutionState, result: BenchmarkResult): void {
        if (status == ExecutionState.Starting) {
            console.log("Benchmarking...");
        } else if (status == ExecutionState.Running) {
            if (result != null) {
                let output = util.format("%s Performance: %.2f %.2f>%.2f>%.2f CPU Load: %.2f %.2f>%.2f>%.2f Errors: %d\n",
                    new Date().toISOString(),
                    result.performanceMeasurement.currentValue,
                    result.performanceMeasurement.minValue,
                    result.performanceMeasurement.averageValue,
                    result.performanceMeasurement.maxValue,
                    result.cpuLoadMeasurement.currentValue,
                    result.cpuLoadMeasurement.minValue,
                    result.cpuLoadMeasurement.averageValue,
                    result.cpuLoadMeasurement.maxValue,
                    result.errors.length
                );
                console.log(output);
            }
        } else if (status == ExecutionState.Completed) {
            console.log("Completed Benchmark.");
        }
    }

    public static onMessageSent(message: string): void {
        console.log(message);
    }

    public static onErrorReported(message: string): void {
        console.error("Error: " + message);
    }
}
