export declare class ConsoleRunner {
    private _args;
    private _runner;
    constructor();
    private start(args);
    stop(): void;
    private executeBatchMode();
    printHelp(): void;
    private printBenchmarks();
    private printParameters();
    static run(args: string[]): void;
}
