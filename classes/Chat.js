class Chat {
    constructor(base) {
        Object.entries(base).forEach(([key, value]) => this[key] = value)
    }

    IsSAMPAvailable() {
        const dwChatInfo = memoryjs.readMemory(this.hProcess.handle, this.hModule.modBaseAddr + this.ADDR_SAMP_CHATMSG_PTR, "dword");
    
        return dwChatInfo != 0 && dwChatInfo != "ERROR"
    }

    isInChat() {
        const dwAddress = memoryjs.readMemory(this.hProcess.handle, this.hModule.modBaseAddr + this.ADDR_SAMP_INCHAT_PTR, "dword");

        return memoryjs.readMemory(this.hProcess.handle, dwAddress + this.ADDR_SAMP_INCHAT_PTR_OFF, "dword");
    }

    readChatLog(callback) {
        
    }
}

module.exports = Chat;