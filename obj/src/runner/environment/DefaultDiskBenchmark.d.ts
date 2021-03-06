import { Benchmark } from '../../Benchmark';
export declare class DefaultDiskBenchmark extends Benchmark {
    private static readonly BufferSize;
    private static readonly ChunkSize;
    private static readonly FileSize;
    private _fileName;
    private _fd;
    private _fileSize;
    private _buffer;
    constructor();
    setUp(callback: (err: any) => void): void;
    execute(callback: (err: any) => void): void;
    tearDown(callback: (err: any) => void): void;
}
