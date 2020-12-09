class Sever {
    constructor(base) {
        Object.entries(base).forEach(([key, value]) => this[key] = value)
    }

    getWeatherID() {
        return memoryjs.readMemory(this.hProcess.handle, 0xC81320, "byte");
    }

    getWeatherName() {
        const wId = this.getWeatherID();

        return this.oweatherNames[wId - 1] || ""
    }
}

module.exports = Sever;