let fs = require('fs');

import { Benchmark } from '../../Benchmark';

export class DefaultDiskBenchmark extends Benchmark {
    private static readonly BufferSize = 512;
    private static readonly ChunkSize = 1024000;
    private static readonly FileSize = 102400000;

    private _fileName: string;
    private _fd: number;
    private _fileSize: number = 0;
    private _buffer =  Buffer.alloc(DefaultDiskBenchmark.BufferSize);

    public constructor() {
        super("Disk", "Measures system disk performance");
    }

    public setUp(callback: (err: any) => void): void {
        let id = Math.ceil(1000000 + Math.random() * 9000000);
        this._fileName = './DiskBenchmark-' + id + '.dat';

        try {
            this._fd = fs.openSync(this._fileName, 'w+');
            callback(null);
        } catch (ex) {
            callback(ex);
        }
    }

    public execute(callback: (err: any) => void): void {
        if (this._fd == null) return;

        try {
            if (this._fileSize == 0 || Math.random() < 0.5) {
                let position;

                if (this._fileSize < DefaultDiskBenchmark.FileSize) {
                    position = this._fileSize;
                } else {
                    position = Math.ceil(Math.random() * (this._fileSize - DefaultDiskBenchmark.ChunkSize));
                }

                let sizeToWrite = DefaultDiskBenchmark.ChunkSize;
                while (sizeToWrite > 0) {
                    let length = Math.min(DefaultDiskBenchmark.BufferSize, sizeToWrite);
                    fs.writeSync(this._fd, this._buffer, 0, length, position);

                    position += length;
                    this._fileSize = Math.max(this._fileSize, position);
                    sizeToWrite -= length;
                }
            } else {
                let position = Math.ceil(Math.random() * (this._fileSize - DefaultDiskBenchmark.ChunkSize));

                let sizeToRead = DefaultDiskBenchmark.ChunkSize;
                while (sizeToRead > 0) {
                    let length = Math.min(DefaultDiskBenchmark.BufferSize, sizeToRead);
                    fs.readSync(this._fd, this._buffer, 0, length, position);

                    position += length;
                    this._fileSize = Math.max(this._fileSize, position);
                    sizeToRead -= length;
                }
            }

            callback(null);
        } catch (ex) {
            callback(ex);
        }
    }

    public tearDown(callback: (err: any) => void): void {
        try {
            fs.closeSync(this._fd);
            this._fd = null;

            if (fs.existsSync(this._fileName)) {
                fs.unlinkSync(this._fileName);
            }
        } catch (ex) {
            // Ignore...
        }

        callback(null);
    }
}
