"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Random {
    constructor() {
    }
    randomStringList(minCount, maxCount, itemSize) {
        let result = [];
        let count = Math.max(0, minCount + Math.random() * (maxCount - minCount));
        for (let index = 0; index < count; index++)
            result.push(this.randomString(itemSize));
        return result;
    }
    randomString(size) {
        let text = '';
        for (let index = 0; index < size; index++) {
            text += Random.AllowStringChars.charAt(this.randomInteger(0, Random.AllowStringChars.length));
        }
        return text.toString();
    }
    randomByteArray(size) {
        let result = [];
        for (let index = 0; index < size; index++) {
            result.push(this.randomInteger(0, 256));
        }
        return result;
    }
    randomInteger(minValue, maxValue) {
        return Math.ceil(this.randomDouble(minValue, maxValue));
    }
    randomDouble(minValue, maxValue) {
        return minValue + Math.random() * (maxValue - minValue);
    }
    randomBoolean() {
        return this.randomDouble(0, 100) >= 50;
    }
}
exports.Random = Random;
Random.AllowStringChars = "ABCDEFGHIGKLMNOPQRSTUVWXYZabcdefghigklmnopqrstuvwxyz -";
//# sourceMappingURL=Random.js.map