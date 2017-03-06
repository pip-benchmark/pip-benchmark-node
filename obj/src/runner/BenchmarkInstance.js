"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PassiveBenchmark_1 = require("../PassiveBenchmark");
class BenchmarkInstance {
    constructor(suite, benchmark) {
        this._selected = false;
        this._proportion = 100;
        this._suite = suite;
        this._benchmark = benchmark;
    }
    get suite() {
        return this._suite;
    }
    get benchmark() {
        return this._benchmark;
    }
    get name() {
        return this._benchmark.name;
    }
    get fullName() {
        return '' + this._suite.name + '.' + this.name;
    }
    get description() {
        return this._benchmark.description;
    }
    get selected() {
        return this._selected;
    }
    set selected(value) {
        this._selected = value;
    }
    get passive() {
        return this._benchmark instanceof PassiveBenchmark_1.PassiveBenchmark;
    }
    get proportion() {
        return this._proportion;
    }
    set proportion(value) {
        this._proportion = Math.max(0, Math.min(10000, value));
    }
    get startProportionRange() {
        return this._startProportionRange;
    }
    set startProportionRange(value) {
        this._startProportionRange = value;
    }
    get endProportionRange() {
        return this._endProportionRange;
    }
    set endProportionRange(value) {
        this._endProportionRange = value;
    }
    withinProportionRange(proportion) {
        return proportion >= this._startProportionRange
            && proportion < this._endProportionRange;
    }
    setUp(context, callback) {
        this._benchmark.context = context;
        try {
            this._benchmark.setUp(callback);
        }
        catch (ex) {
            callback(ex);
        }
    }
    execute(callback) {
        try {
            this._benchmark.execute(callback);
        }
        catch (ex) {
            callback(ex);
        }
    }
    tearDown(callback) {
        try {
            this._benchmark.tearDown(callback);
        }
        catch (ex) {
            callback(ex);
        }
        this._benchmark.context = null;
    }
}
exports.BenchmarkInstance = BenchmarkInstance;
//# sourceMappingURL=BenchmarkInstance.js.map