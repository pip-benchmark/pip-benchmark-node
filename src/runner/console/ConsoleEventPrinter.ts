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
                let output = util.format("%s Performance: %d %d>%d>%d CPU Load: %d %d>%d>%d Errors: %d",
                    new Date().toISOString(),
                    result.performanceMeasurement.currentValue.toFixed(2),
                    result.performanceMeasurement.minValue.toFixed(2),
                    result.performanceMeasurement.averageValue.toFixed(2),
                    result.performanceMeasurement.maxValue.toFixed(2),
                    result.cpuLoadMeasurement.currentValue.toFixed(2),
                    result.cpuLoadMeasurement.minValue.toFixed(2),
                    result.cpuLoadMeasurement.averageValue.toFixed(2),
                    result.cpuLoadMeasurement.maxValue.toFixed(2),
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
        console.error(message);
    }
}
