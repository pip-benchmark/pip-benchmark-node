"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BenchmarkException extends Error {
    constructor(message, cause) {
        super(message);
        // Set the prototype explicitly.
        // https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
        this.__proto__ = BenchmarkException.prototype;
        this.cause = cause;
    }
}
exports.BenchmarkException = BenchmarkException;
//# sourceMappingURL=BenchmarkException.js.map