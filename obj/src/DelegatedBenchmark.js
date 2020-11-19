"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Benchmark_1 = require("./Benchmark");
class DelegatedBenchmark extends Benchmark_1.Benchmark {
    constructor(name, description, executeCallback) {
        super(name, description);
        if (executeCallback == null)
            throw new Error("ExecuteCallback cannot be null");
        this._executeCallback = executeCallback;
    }
    execute(callback) {
        this._executeCallback(callback);
    }
}
exports.DelegatedBenchmark = DelegatedBenchmark;
//# sourceMappingURL=DelegatedBenchmark.js.map