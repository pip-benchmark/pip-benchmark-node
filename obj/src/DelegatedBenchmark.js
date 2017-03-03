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
    setUp() { }
    execute() {
        this._executeCallback();
    }
    tearDown() { }
}
exports.DelegatedBenchmark = DelegatedBenchmark;
//# sourceMappingURL=DelegatedBenchmark.js.map