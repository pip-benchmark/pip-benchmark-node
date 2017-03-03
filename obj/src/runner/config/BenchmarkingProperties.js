"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require('path');
const Properties_1 = require("./Properties");
class BenchmarkingProperties extends Properties_1.Properties {
    getFilePath() {
        return "BenchmarkSettings.properties";
    }
    load() {
        if (path.existSync(this.getFilePath())) {
            this.loadFromFile(this.getFilePath());
        }
    }
    save() {
        this.saveToFile(this.getFilePath());
    }
}
exports.BenchmarkingProperties = BenchmarkingProperties;
//# sourceMappingURL=BenchmarkingProperties.js.map