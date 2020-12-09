const memoryjs = require('memoryjs');

class Dialog {
    constructor(base) {
        Object.entries(base).forEach(([key, value]) => this[key] = value)
    }

    getDialogStructPtr() {
        return memoryjs.readMemory(this.hProcess.handle, this.hModule.modBaseAddr + this.SAMP_DIALOG_STRUCT_PTR, "dword");
    }

    isOpen() {
        const dwPointer = this.getDialogStructPtr();

        return memoryjs.readMemory(this.hProcess.handle, dwPointer + this.SAMP_DIALOG_OPEN_OFFSET, "dword")
            ? true
            : false;
    }

    getStyle() {
        const dwPointer = this.getDialogStructPtr();

        return memoryjs.readMemory(this.hProcess.handle, dwPointer + this.SAMP_DIALOG_STYLE_OFFSET, "int");
    }

    getID() {
        const dwPointer = this.getDialogStructPtr();

        return memoryjs.readMemory(this.hProcess.handle, dwPointer + this.SAMP_DIALOG_ID_OFFSET, "int");
    }

    setID() {
        const dwPointer = this.getDialogStructPtr();

        return memoryjs.writeMemory(this.hProcess.handle, dwPointer + this.SAMP_DIALOG_ID_OFFSET, id, "int");
    }

    getCaption() {
        const dwPointer = this.getDialogStructPtr();

        return memoryjs.readMemory(this.hProcess.handle, dwPointer + this.SAMP_DIALOG_CAPTION_OFFSET, "str");
    }

    getTextSize() {
        // WHAT !?
    }

    getText() {
        const dwPointer = this.getDialogStructPtr();
        const dwTextPointer = memoryjs.readMemory(this.hProcess.handle, dwPointer + this.SAMP_DIALOG_TEXT_PTR_OFFSET, "dword");
    
        return memoryjs.readMemory(this.hProcess.handle, dwTextPointer, "str");
    }

    getLineCount() {
        const dwPointer = this.getDialogStructPtr();
        const dwTextPointer = memoryjs.readMemory(this.hProcess.handle, dwPointer + this.SAMP_DIALOG_PTR2_OFFSET, "dword");
    
        return memoryjs.readMemory(this.hProcess.handle, dwTextPointer + this.SAMP_DIALOG_LINECOUNT_OFFSET, "int");
    }

    _getLine(index) {
        const dwPointer = this.getDialogStructPtr();
        const dwTextPointer = memoryjs.readMemory(this.hProcess.handle, dwPointer + this.SAMP_DIALOG_PTR1_OFFSET, "dword");
        const dwLinePointer = memoryjs.readMemory(this.hProcess.handle, dwTextPointer + this.SAMP_DIALOG_LINES_OFFSET, "dword");
        const dwLinesPointer = memoryjs.readMemory(this.hProcess.handle, dwLinePointer + (index - 1) * 0x4, "dword");
    
        return memoryjs.readMemory(this.hProcess.handle, dwLinesPointer, "str");
    }
}

module.exports = Dialog;