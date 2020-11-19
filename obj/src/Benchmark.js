"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Benchmark = void 0;
class Benchmark {
    constructor(name, description) {
        this._name = name;
        this._description = description;
    }
    get name() {
        return this._name;
    }
    get description() {
        return this._description;
    }
    get context() {
        return this._context;
    }
    set context(value) {
        this._context = value;
    }
    setUp(callback) {
        callback(null);
    }
    tearDown(callback) {
        callback(null);
    }
}
exports.Benchmark = Benchmark;
//# sourceMappingURL=Benchmark.js.map