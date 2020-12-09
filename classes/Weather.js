const memoryjs = require('memoryjs');

class Weather {
    constructor(base) {
        Object.entries(base).forEach(([key, value]) => this[key] = value)
    }

    getID() {
        return memoryjs.readMemory(this.hProcess.handle, 0xC81320, "byte");
    }

    getName() {
        const wId = this.getID();

        return this.oNames[wId - 1] || ""
    }
}

module.exports = Weather;