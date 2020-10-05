"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BenchmarkMeter = void 0;
const Measurement_1 = require("../results/Measurement");
class BenchmarkMeter {
    constructor() {
        this.clear();
    }
    get measurement() {
        return new Measurement_1.Measurement(this.currentValue, this.minValue, this.averageValue, this.maxValue);
    }
    get lastMeasuredTime() {
        return this._lastMeasuredTime;
    }
    set lastMeasuredTime(value) {
        this._lastMeasuredTime = value;
    }
    get currentValue() {
        return this._currentValue;
    }
    set currentValue(value) {
        this._currentValue = value;
    }
    get minValue() {
        return this._minValue < Number.MAX_VALUE ? this._minValue : 0;
    }
    set minValue(value) {
        this._minValue = value;
    }
    get maxValue() {
        return this._maxValue > Number.MIN_VALUE ? this._maxValue : 0;
    }
    set maxValue(value) {
        this._minValue = value;
    }
    get averageValue() {
        return this._averageValue;
    }
    set averageValue(value) {
        this._averageValue = value;
    }
    clear() {
        this._lastMeasuredTime = Date.now();
        this._currentValue = this.performMeasurement();
        this._minValue = Number.MAX_VALUE;
        this._maxValue = Number.MIN_VALUE;
        this._averageValue = 0;
        this._sumOfValues = 0;
        this._numberOfMeasurements = 0;
    }
    calculateAggregates() {
        this._sumOfValues += this._currentValue;
        this._numberOfMeasurements++;
        this._averageValue = this._sumOfValues / this._numberOfMeasurements;
        this._maxValue = Math.max(this._maxValue, this._currentValue);
        this._minValue = Math.min(this._minValue, this._currentValue);
    }
    measure() {
        this._currentValue = this.performMeasurement();
        this._lastMeasuredTime = Date.now();
        this.calculateAggregates();
        return this._currentValue;
    }
}
exports.BenchmarkMeter = BenchmarkMeter;
//# sourceMappingURL=BenchmarkMeter.js.map