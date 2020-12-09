class Vehicle {
    constructor(base) {
        Object.entries(base).forEach(([key, value]) => this[key] = value)
    }

    getVehicleHealth() {
        const dwAddr = memoryjs.readMemory(this.hProcess.handle, this.ADDR_VEHICLE_PTR, "dword");

        if(!dwAddr) {
            return -1;
        }

        return memoryjs.readMemory(this.hProcess.handle, dwAddr + this.ADDR_VEHICLE_HPOFF, "float");
    }

    getVehicleType() {
        const dwAddr = memoryjs.readMemory(this.hProcess.handle, this.ADDR_VEHICLE_PTR, "dword");

        if(!dwAddr) {
            return -1;
        }

        const cVal = memoryjs.readMemory(this.hProcess.handle, dwAddr + this.ADDR_VEHICLE_TYPE, "char");

        if(!cVal || cVal == 9) {
            const mid = this.getVehicleModelId();

            return this[!cVal ? "oAirplaneModels" : "oBikeModels"].indexOf(mid) != -1 
                ? (!cVal ? 5 : 6)
                : 1;
        }

        else if(cVal == 5 || cVal == 6) {
            return Math.floor(cVal / 2);
        }

        return 0;
    }

    getVehicleModelId() {
        const dwAddr = memoryjs.readMemory(this.hProcess.handle, this.ADDR_VEHICLE_PTR, "dword");

        if(!dwAddr) {
            return -1;
        }

        return memoryjs.readMemory(this.hProcess.handle, dwAddr + this.ADDR_VEHICLE_MODEL, "short");
    }

    getVehicleModelName() {
        const vehicleId = this.getVehicleModelId();

        return this.ovehicleNames[vehicleId - 399] || "";
    }

    getVehicleLightState() {
        const dwAddr = memoryjs.readMemory(this.hProcess.handle, this.ADDR_VEHICLE_PTR, "dword");

        if(!dwAddr) {
            return -1;
        }

        return memoryjs.readMemory(this.hProcess.handle, dwAddr + this.ADDR_VEHICLE_LIGHTSTATE, "byte") > 0;
    }

    getVehicleEngineState() {
        const dwAddr = memoryjs.readMemory(this.hProcess.handle, this.ADDR_VEHICLE_PTR, "dword");

        if(!dwAddr) {
            return -1;
        }

        const cVal = +memoryjs.readMemory(this.hProcess.handle, dwAddr + this.ADDR_VEHICLE_ENGINESTATE, "char");

        return (cVal == 24 || cVal == 56 || cVal == 88 || cVal == 120);
    }

    getVehicleSirenState() {
        const dwAddr = memoryjs.readMemory(this.hProcess.handle, this.ADDR_VEHICLE_PTR, "dword");

        if(!dwAddr) {
            return -1;
        }

        const cVal = +memoryjs.readMemory(this.hProcess.handle, dwAddr + this.ADDR_VEHICLE_SIRENSTATE, "char");

        return cVal == 48;
    }

    getVehicleLockState() {
        const dwAddr = memoryjs.readMemory(this.hProcess.handle, this.ADDR_VEHICLE_PTR, "dword");

        if(!dwAddr) {
            return -1;
        }

        const dwVal = +memoryjs.readMemory(this.hProcess.handle, dwAddr + this.ADDR_VEHICLE_DOORSTATE, "dword");

        return dwVal == 2;
    }

    getVehicleColor1() {
        const dwAddr = memoryjs.readMemory(this.hProcess.handle, this.ADDR_VEHICLE_PTR, "dword");

        if(!dwAddr) {
            return -1;
        }

        return memoryjs.readMemory(this.hProcess.handle, dwAddr + 1076, "byte");
    }

    getVehicleColor2() {
        const dwAddr = memoryjs.readMemory(this.hProcess.handle, this.ADDR_VEHICLE_PTR, "dword");

        if(!dwAddr) {
            return -1;
        }

        return memoryjs.readMemory(this.hProcess.handle, dwAddr + 1077, "byte");
    }

    getVehicleSpeed() {
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