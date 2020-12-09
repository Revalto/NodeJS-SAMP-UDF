const memoryjs = require('memoryjs');
const fs = require('fs');

class Chat {
    constructor(base) {
        Object.entries(base).forEach(([key, value]) => this[key] = value);
    }

    startPolling() {
        fs.watchFile(chatLogDir, { interval: 100 }, () => {
            const data = fs.readFileSync(chatLogDir, 'utf-8');
            const str = data
                .split('\r\r\n')
                .splice(-2, 1)
        
            this.updates.emit('message_new', str[0]);
        })
    }

    IsSAMPAvailable() {
        const dwChatInfo = memoryjs.readMemory(this.hProcess.handle, this.hModule.modBaseAddr + this.ADDR_SAMP_CHATMSG_PTR, "dword");
    
        return dwChatInfo != 0 && dwChatInfo != "ERROR"
    }

    isInChat() {
        const dwAddress = memoryjs.readMemory(this.hProcess.handle, this.hModule.modBaseAddr + this.ADDR_SAMP_INCHAT_PTR, "dword");

        return memoryjs.readMemory(this.hProcess.handle, dwAddress + this.ADDR_SAMP_INCHAT_PTR_OFF, "dword");
    }
}

module.exports = Chat;