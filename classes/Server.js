class Server {
    constructor(base) {
        Object.entries(base).forEach(([key, value]) => this[key] = value)
    }

    getServerName() {
        const dwAddress = memoryjs.readMemory(this.hProcess.handle, this.hModule.modBaseAddr + this.SAMP_INFO_OFFSET, "int");

        return memoryjs.readMemory(this.hProcess.handle, dwAddress + 0x121, "str");
    }

    getServerIP() {
        const dwAddress = memoryjs.readMemory(this.hProcess.handle, this.hModule.modBaseAddr + this.SAMP_INFO_OFFSET, "int");

        return memoryjs.readMemory(this.hProcess.handle, dwAddress + 0x20, "str");
    }

    getServerIP() {
        const dwAddress = memoryjs.readMemory(this.hProcess.handle, this.hModule.modBaseAddr + this.SAMP_INFO_OFFSET, "int");

        return memoryjs.readMemory(this.hProcess.handle, dwAddress + 0x225, "str");
    }

    getUserName() {
        return memoryjs.readMemory(this.hProcess.handle, this.hModule.modBaseAddr + this.ADDR_SAMP_USERNAME, "str");
    }
}

module.exports = Server;