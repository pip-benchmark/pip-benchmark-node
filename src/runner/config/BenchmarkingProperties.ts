var path = require('path');

import { Properties } from './Properties';

export class BenchmarkingProperties extends Properties {

    private getFilePath(): string {
        return "BenchmarkEnvironment.properties";
    }

    public load(): void {
        if (path.existSync(this.getFilePath())) {
            this.loadFromFile(this.getFilePath());
        }
    }

    public save(): void {
        this.saveToFile(this.getFilePath());
    }
}