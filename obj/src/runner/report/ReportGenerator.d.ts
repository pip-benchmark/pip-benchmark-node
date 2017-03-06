export declare class ReportGenerator {
    private static readonly SeparatorLine;
    private static readonly NewLine;
    private _runner;
    constructor(runner: any);
    readonly runner: any;
    generateReport(): string;
    private generateHeader();
    private generateBenchmarkList();
    private generateMultipleResults();
    private padStringLeft(value, length, padSymbol);
    private padStringRight(value, length, padSymbol);
    private generateSingleResult();
    private generateSystemInformation();
    private generateSystemBenchmark();
    private generateParameters();
    saveReportToFile(fileName: string): void;
    private formatNumber(value);
    private formatDate(date);
    private formatTime(date);
    private formatTimeSpan(ticks);
}
