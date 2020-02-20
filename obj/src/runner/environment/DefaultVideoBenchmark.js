"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PassiveBenchmark_1 = require("../../PassiveBenchmark");
class DefaultVideoBenchmark extends PassiveBenchmark_1.PassiveBenchmark {
    constructor() {
        super("Video", "Measures performance of video card");
    }
}
exports.DefaultVideoBenchmark = DefaultVideoBenchmark;
DefaultVideoBenchmark.MaxLength = 100;
//# sourceMappingURL=DefaultVideoBenchmark.js.map