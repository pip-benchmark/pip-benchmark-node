"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultDiskBenchmark = void 0;
let fs = require('fs');
const Benchmark_1 = require("../../Benchmark");
class DefaultDiskBenchmark extends Benchmark_1.Benchmark {
    constructor() {
        super("Disk", "Measures system disk performance");
        this._fileSize = 0;
        this._buffer = Buffer.alloc(DefaultDiskBenchmark.BufferSize);
    }
    setUp(callback) {
        let id = Math.ceil(1000000 + Math.random() * 9000000);
        this._fileName = './DiskBenchmark-' + id + '.dat';
        try {
            this._fd = fs.openSync(this._fileName, 'w+');
            callback(null);
        }
        catch (ex) {
            callback(ex);
        }
    }
    execute(callback) {
        if (this._fd == null)
            return;
        try {
            if (this._fileSize == 0 || Math.random() < 0.5) {
                let position;
                if (this._fileSize < DefaultDiskBenchmark.FileSize) {
                    position = this._fileSize;
                }
                else {
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
            }
            else {
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
        }
        catch (ex) {
            callback(ex);
        }
    }
    tearDown(callback) {
        try {
            fs.closeSync(this._fd);
            this._fd = null;
            if (fs.existsSync(this._fileName)) {
                fs.unlinkSync(this._fileName);
            }
        }
        catch (ex) {
            // Ignore...
        }
        callback(null);
    }
}
exports.DefaultDiskBenchmark = DefaultDiskBenchmark;
DefaultDiskBenchmark.BufferSize = 512;
DefaultDiskBenchmark.ChunkSize = 1024000;
DefaultDiskBenchmark.FileSize = 102400000;
//# sourceMappingURL=DefaultDiskBenchmark.js.map