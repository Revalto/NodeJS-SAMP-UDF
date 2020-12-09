const memoryjs = require('memoryjs');

class Vehicle {
    constructor(base) {
        Object.entries(base).forEach(([key, value]) => this[key] = value)
    }

    getHealth() {
        const dwAddr = memoryjs.readMemory(this.hProcess.handle, this.ADDR_VEHICLE_PTR, "dword");

        if(!dwAddr) {
            return -1;
        }

        return memoryjs.readMemory(this.hProcess.handle, dwAddr + this.ADDR_VEHICLE_HPOFF, "float");
    }

    getType() {
        const dwAddr = memoryjs.readMemory(this.hProcess.handle, this.ADDR_VEHICLE_PTR, "dword");

        if(!dwAddr) {
            return -1;
        }

        const cVal = memoryjs.readMemory(this.hProcess.handle, dwAddr + this.ADDR_VEHICLE_TYPE, "char");

        if(!cVal || cVal == 9) {
            const mid = this.getModelId();

            return this[!cVal ? "oAirplaneModels" : "oBikeModels"].indexOf(mid) != -1 
                ? (!cVal ? 5 : 6)
                : 1;
        }

        else if(cVal == 5 || cVal == 6) {
            return Math.floor(cVal / 2);
        }

        return 0;
    }

    getModelId() {
        const dwAddr = memoryjs.readMemory(this.hProcess.handle, this.ADDR_VEHICLE_PTR, "dword");

        if(!dwAddr) {
            return -1;
        }

        return memoryjs.readMemory(this.hProcess.handle, dwAddr + this.ADDR_VEHICLE_MODEL, "short");
    }

    getModelName() {
        const vehicleId = this.getModelId();

        return this.ovehicleNames[vehicleId - 399] || "";
    }

    getLightState() {
        const dwAddr = memoryjs.readMemory(this.hProcess.handle, this.ADDR_VEHICLE_PTR, "dword");

        if(!dwAddr) {
            return -1;
        }

        return memoryjs.readMemory(this.hProcess.handle, dwAddr + this.ADDR_VEHICLE_LIGHTSTATE, "byte") > 0;
    }

    getEngineState() {
        const dwAddr = memoryjs.readMemory(this.hProcess.handle, this.ADDR_VEHICLE_PTR, "dword");

        if(!dwAddr) {
            return -1;
        }

        const cVal = +memoryjs.readMemory(this.hProcess.handle, dwAddr + this.ADDR_VEHICLE_ENGINESTATE, "char");

        return (cVal == 24 || cVal == 56 || cVal == 88 || cVal == 120);
    }

    getSirenState() {
        const dwAddr = memoryjs.readMemory(this.hProcess.handle, this.ADDR_VEHICLE_PTR, "dword");

        if(!dwAddr) {
            return -1;
        }

        const cVal = +memoryjs.readMemory(this.hProcess.handle, dwAddr + this.ADDR_VEHICLE_SIRENSTATE, "char");

        return cVal == 48;
    }

    getLockState() {
        const dwAddr = memoryjs.readMemory(this.hProcess.handle, this.ADDR_VEHICLE_PTR, "dword");

        if(!dwAddr) {
            return -1;
        }

        const dwVal = +memoryjs.readMemory(this.hProcess.handle, dwAddr + this.ADDR_VEHICLE_DOORSTATE, "dword");

        return dwVal == 2;
    }

    getColor1() {
        const dwAddr = memoryjs.readMemory(this.hProcess.handle, this.ADDR_VEHICLE_PTR, "dword");

        if(!dwAddr) {
            return -1;
        }

        return memoryjs.readMemory(this.hProcess.handle, dwAddr + 1076, "byte");
    }

    getColor2() {
        const dwAddr = memoryjs.readMemory(this.hProcess.handle, this.ADDR_VEHICLE_PTR, "dword");

        if(!dwAddr) {
            return -1;
        }

        return memoryjs.readMemory(this.hProcess.handle, dwAddr + 1077, "byte");
    }

    getSpeed() {
        const dwAddr = memoryjs.readMemory(this.hProcess.handle, this.ADDR_VEHICLE_PTR, "dword");

        if(!dwAddr) {
            return -1;
        }

        const fSpeedX = memoryjs.readMemory(this.hProcess.handle, dwAddr + this.ADDR_VEHICLE_X, "float");
        const fSpeedY = memoryjs.readMemory(this.hProcess.handle, dwAddr + this.ADDR_VEHICLE_Y, "float");
        const fSpeedZ = memoryjs.readMemory(this.hProcess.handle, dwAddr + this.ADDR_VEHICLE_Z, "float");

        return (Math.sqrt(( fSpeedX + fSpeedX ) + ( fSpeedY + fSpeedY ) + ( fSpeedZ + fSpeedZ )) * 100) * 1.43
    }
}

module.exports = Vehicle;