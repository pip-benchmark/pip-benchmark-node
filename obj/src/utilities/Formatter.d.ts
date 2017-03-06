export declare class Formatter {
    static padLeft(value: string, length: number, padSymbol: string): string;
    static padRight(value: string, length: number, padSymbol: string): string;
    static formatNumber(value: number, decimals?: number): string;
    static formatDate(date: Date): string;
    static formatTime(date: Date): string;
    static formatTimeSpan(ticks: number): string;
}
