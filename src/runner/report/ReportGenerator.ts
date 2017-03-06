var _ = require('lodash');
var fs = require('fs');
var util = require('util');

import { MeasurementType } from '../MeasurementType';

export class ReportGenerator {
    private static readonly SeparatorLine = "***************************************************************\r\n";
    private static readonly NewLine = "\r\n";
    
    private _runner: any;
    
    public constructor(runner: any) {
        this._runner = runner;
    }

    public get runner(): any {
        return this._runner;
    }
    
    public generateReport(): string {
        let output = '';
        output += this.generateHeader();
        output += this.generateBenchmarkList();

        if (this._runner.process.results.length > 1) {
            output += this.generateMultipleResults();
        } else {
            output += this.generateSingleResult();
        }
        
        output += this.generateSystemInformation();
        output += this.generateSystemBenchmark();
        output += this.generateParameters();
        return output;
    }

    private generateHeader(): string {
        let output = '';
        output += ReportGenerator.SeparatorLine;
        output += ReportGenerator.NewLine;
        output += "             P E R F O R M A N C E    R E P O R T";
        output += ReportGenerator.NewLine;
        output += ReportGenerator.NewLine;
        output += "                 Generated by Pip.Benchmark";
        output += ReportGenerator.NewLine;
        output += util.format("                   at %s, %s", 
            this.formatDate(new Date()), this.formatTime(new Date()));
        output += ReportGenerator.NewLine;
        output += ReportGenerator.SeparatorLine;
        output += ReportGenerator.NewLine;
        return output;
    }

    private generateBenchmarkList(): string {
        let output = '';
        output += "Executed Benchmarks:";
        output += ReportGenerator.NewLine;
        let index = 0;
        _.each(this._runner.suiteManager.getSelectedBenchmarks(), (benchmark) => {
            index++;
            output += util.format("  %d. %s.%s [%d%%]",
                index, benchmark.suite.name, benchmark.name, benchmark.proportion
            );
            output += ReportGenerator.NewLine;
        });
        output += ReportGenerator.NewLine;
        return output;
    }

    private generateMultipleResults(): string {
        let output = '';
        output += "Benchmarking Results:";
        output += ReportGenerator.NewLine;

        let results = this._runner.process.results;
        let resultTable: string[][] = [];
        for (let index = 0; index < results.length + 2; index++) {
            resultTable.push(new Array('', '', '', ''));
        }

        // Fill column headers
        resultTable[0][0] = "Benchmark";
        resultTable[0][1] = "Performance (tps)";
        resultTable[0][2] = "CPU Load (%)";
        resultTable[0][3] = "Memory Usage (Mb)";

        let columnSizes: number[] = [ 9, 17, 12, 17 ];

        for (let index = 0; index < results.length; index++) {
            resultTable[index + 1][0] = results[index].benchmarks[0].fullName();
            columnSizes[0] = Math.max(resultTable[index + 1][0].length, columnSizes[0]);

            resultTable[index + 1][1] = this.formatNumber(
            	results[index].performanceMeasurement.averageValue);
            columnSizes[1] = Math.max(resultTable[index + 1][1].length, columnSizes[1]);

            resultTable[index + 1][2] = this.formatNumber(
            	results[index].cpuLoadMeasurement.averageValue);
            columnSizes[2] = Math.max(resultTable[index + 1][2].length, columnSizes[2]);

            resultTable[index + 1][3] = this.formatNumber(
            	results[index].memoryUsageMeasurement.averageValue);
            columnSizes[3] = Math.max(resultTable[index + 1][3].length, columnSizes[3]);
        }

        for (let rowIndex = 0; rowIndex < results.size() + 1; rowIndex++) {
            // Draw upper line
            if (rowIndex == 0) {
                output += '+';
                for (let columnIndex = 0; columnIndex < 4; columnIndex++) {
                    output += this.padStringRight("", columnSizes[columnIndex], "-");
                    output += '+';
                }
                output += ReportGenerator.NewLine;
            }

            // Draw content
            output += '|';
            output += this.padStringRight(resultTable[rowIndex][0], columnSizes[0], " ");
            output += '|';
            output += this.padStringLeft(resultTable[rowIndex][1], columnSizes[1], " ");
            output += '|';
            output += this.padStringLeft(resultTable[rowIndex][2], columnSizes[2], " ");
            output += '|';
            output += this.padStringLeft(resultTable[rowIndex][3], columnSizes[3], " ");
            output += '|';
            output += ReportGenerator.NewLine;

            // Draw bottom line
            output += '+';
            for (let columnIndex = 0; columnIndex < 4; columnIndex++) {
                output += this.padStringRight("", columnSizes[columnIndex], "-");
                output += '+';
            }
            output += ReportGenerator.NewLine;
        }

        output += ReportGenerator.NewLine;
        return output;
    }

    private padStringLeft(value: string, length: number, padSymbol: string): string {
        let output = '';
        output += padSymbol;
        output += value;
        output += padSymbol;

        while (output.length < length + 2) {
            output = padSymbol + output;
        }

        return output;
    }

    private padStringRight(value: string, length: number, padSymbol: string): string {
        let output = '';
        output += padSymbol;
        output += value;
        output += padSymbol;

        while (output.length < length + 2) {
            output += padSymbol;
        }

        return output;
    }

    private generateSingleResult(): string {
        let output = '';

        if (this._runner.process.results.length == 0)
            return output;

        let result = this._runner.process.results[0];

        output += "Benchmarking Results:";
        output += ReportGenerator.NewLine;
        if (this._runner.process.measurementType == MeasurementType.Peak) {
            output += "  Measurement Type: Peak Performance";
        } else {
            output += util.format("  Measurement Type: Nominal Performance at %d tps",
                this._runner.process.nominalRate);
        }
        output += ReportGenerator.NewLine;

        let startTime = new Date(result.startTime);
        output += util.format("  Start Time:   %s", this.formatTime(startTime));
        output += ReportGenerator.NewLine;
        let endTime = new Date(result.startTime + result.elapsedTime);
        output += util.format("  End Time:     %s", this.formatTime(endTime));
        output += ReportGenerator.NewLine;
        let elapsedTime = result.elapsedTime;
        output += util.format("  Elapsed Time: %s", this.formatTimeSpan(elapsedTime));
        output += ReportGenerator.NewLine;
        output += util.format("  Min Performance (tps):     %d",
            this.formatNumber(result.performanceMeasurement.minValue));
        output += ReportGenerator.NewLine;
        output += util.format("  Average Performance (tps): %d",
            this.formatNumber(result.performanceMeasurement.averageValue));
        output += ReportGenerator.NewLine;
        output += util.format("  Max Performance (tps):     %d",
            this.formatNumber(result.performanceMeasurement.maxValue));
        output += ReportGenerator.NewLine;
        output += util.format("  Min CPU Load (%%):          %d",
            this.formatNumber(result.cpuLoadMeasurement.minValue));
        output += ReportGenerator.NewLine;
        output += util.format("  Average CPU Load (%%):      %d",
            this.formatNumber(result.cpuLoadMeasurement.averageValue));
        output += ReportGenerator.NewLine;
        output += util.format("  Max CPU Load (%%):          %d",
            this.formatNumber(result.cpuLoadMeasurement.maxValue));
        output += ReportGenerator.NewLine;
        output += util.format("  Min Memory Usage (Mb):     %d",
            this.formatNumber(result.memoryUsageMeasurement.minValue));
        output += ReportGenerator.NewLine;
        output += util.format("  Average Memory Usage (Mb): %d",
            this.formatNumber(result.memoryUsageMeasurement.averageValue));
        output += ReportGenerator.NewLine;
        output += util.format("  Max Memory Usage (Mb):     %d",
            this.formatNumber(result.memoryUsageMeasurement.maxValue));
        output += ReportGenerator.NewLine;
        output += ReportGenerator.NewLine;

        return output;
    }

    private generateSystemInformation(): string {
        let output = '';
        output += "System Information:";
        output += ReportGenerator.NewLine;
        for (let prop in this._runner.environmentState.systemInformation) {
            let value = this._runner.environmentState.systemInformation[prop];
            output += util.format("  %s: %s", prop, value);
            output += ReportGenerator.NewLine;
        }
        output += ReportGenerator.NewLine;
        return output;
    }

    private generateSystemBenchmark(): string {
        let output = '';
        output += "System Benchmarking:";
        output += ReportGenerator.NewLine;
        output += util.format("  CPU Performance (MFLOP/s): %d",
            this.formatNumber(this._runner.environmentState.cpuBenchmark));
        output += ReportGenerator.NewLine;
        output += util.format("  Video Performance (GOP/s): %d",
            this.formatNumber(this._runner.environmentState.videoBenchmark));
        output += ReportGenerator.NewLine;
        output += util.format("  Disk Performance (MB/s):   %d",
            this.formatNumber(this._runner.environmentState.diskBenchmark));
        output += ReportGenerator.NewLine;
        output += ReportGenerator.NewLine;
        return output;
    }

    private generateParameters(): string {
        let output = '';
        output += "Parameters:";
        output += ReportGenerator.NewLine;
        _.each(this._runner.parameters.all, (parameter) => {
            output += util.format("  %s=%s", parameter.name, parameter.value);
            output += ReportGenerator.NewLine;
        });
        output += ReportGenerator.NewLine;
        return output;
    }

    public saveReportToFile(fileName: string): void {
        let output = this.generateReport();
        fs.writeFileSync(fileName, output);
    }

    private formatNumber(value: number): string {
        value = value || 0;
        return value.toFixed(2);
    }

    private formatDate(date: Date): string {
        date = date || new Date();
        var value = date.toISOString();
        var pos = value.indexOf('T');
        return value.substring(0, pos);
    }

    private formatTime(date: Date) {
        date = date || new Date();
        var value = date.toISOString();
        var pos = value.indexOf('T');
        value = value.substring(pos + 1);
        pos = value.indexOf('.');
        return pos > 0 ? value.substring(0, pos) : value;
    }

    private formatTimeSpan(ticks: number): string {
        let millis = (ticks % 1000).toFixed(0);
        let seconds = ((ticks / 1000) % 60).toFixed(0);
        let minutes = ((ticks / 1000 / 60) % 60).toFixed(0);
        let hours = (ticks / 1000 / 60 / 60).toFixed(0);
        return util.format("%d:%d:%d.%d", hours, minutes, seconds, millis);
    }
}
