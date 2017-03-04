"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PassiveBenchmark_1 = require("../../PassiveBenchmark");
class DefaultVideoBenchmark extends PassiveBenchmark_1.PassiveBenchmark {
    constructor() {
        super("Video", "Measures performance of video card");
    }
}
DefaultVideoBenchmark.MaxLength = 100;
exports.DefaultVideoBenchmark = DefaultVideoBenchmark;
//# sourceMappingURL=DefaultVideoBenchmark.js.map