export declare class ReportGenerator {
    private static readonly SeparatorLine;
    private static readonly NewLine;
    private _runner;
    constructor(runner: any);
    readonly runner: any;
    generate(): string;
    saveToFile(fileName: string): void;
    private generateHeader();
    private generateBenchmarkList();
    private generateMultipleResults();
    private generateSingleResult();
    private generateSystemInfo();
    private generateSystemBenchmark();
    private generateParameters();
}
