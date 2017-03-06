var os = require('os');

export class SystemInformation {

    public constructor() {
        this.fillSystemInformation();
    }

    private fillSystemInformation(): void {
        this.addSystemInfo("Machine Name", os.hostname());
        this.addSystemInfo("User Name", os.userInfo().username);
        this.addSystemInfo("Operating System Name", os.type());
        this.addSystemInfo("Operating System Version", os.release());
        this.addSystemInfo("Operating System Architecture", os.arch());
        this.addSystemInfo("Node.js Name", (<any>process).release.name);
        this.addSystemInfo("Node.js Version", process.version);
    }

    private addSystemInfo(parameter: string, value: string): void {
        this[parameter] = value;
    }
}
