"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemInfo = void 0;
let os = require('os');
class SystemInfo {
    constructor() {
        this.put("Machine Name", os.hostname());
        this.put("User Name", os.userInfo().username);
        this.put("Operating System Name", os.type());
        this.put("Operating System Version", os.release());
        this.put("Operating System Architecture", os.arch());
        this.put("Node.js Name", process.release.name);
        this.put("Node.js Version", process.version);
    }
    put(parameter, value) {
        this[parameter] = value;
    }
}
exports.SystemInfo = SystemInfo;
//# sourceMappingURL=SystemInfo.js.map