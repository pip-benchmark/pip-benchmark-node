"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var os = require('os');
class SystemInformation {
    constructor() {
        this.fillSystemInformation();
    }
    fillSystemInformation() {
        this.addSystemInfo("Machine Name", os.hostname());
        this.addSystemInfo("User Name", os.userInfo().username);
        this.addSystemInfo("Operating System Name", os.type());
        this.addSystemInfo("Operating System Version", os.release());
        this.addSystemInfo("Operating System Architecture", os.arch);
        this.addSystemInfo("Node.js Name", process.release.name);
        this.addSystemInfo("Node.js Version", process.version);
    }
    addSystemInfo(parameter, value) {
        this[parameter] = value;
    }
}
exports.SystemInformation = SystemInformation;
//# sourceMappingURL=SystemInformation.js.map