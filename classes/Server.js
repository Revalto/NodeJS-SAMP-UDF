const memoryjs = require('memoryjs');

class Server {
    constructor(base) {
        Object.entries(base).forEach(([key, value]) => this[key] = value)
    }

    getName() {
        const dwAddress = memoryjs.readMemory(this.hProcess.handle, this.hModule.modBaseAddr + this.SAMP_INFO_OFFSET, "int");

        return memoryjs.readMemory(this.hProcess.handle, dwAddress + 0x121, "str");
    }

    getIP() {
        const dwAddress = memoryjs.readMemory(this.hProcess.handle, this.hModule.modBaseAddr + this.SAMP_INFO_OFFSET, "int");

        return memoryjs.readMemory(this.hProcess.handle, dwAddress + 0x20, "str");
    }

    getIP() {
        const dwAddress = memoryjs.readMemory(this.hProcess.handle, this.hModule.modBaseAddr + this.SAMP_INFO_OFFSET, "int");

        return memoryjs.readMemory(this.hProcess.handle, dwAddress + 0x225, "str");
    }
}

module.exports = Server;