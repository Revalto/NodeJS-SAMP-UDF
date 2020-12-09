const memoryjs = require('memoryjs');

class Player {
    constructor(base) {
        Object.entries(base).forEach(([key, value]) => this[key] = value)
    }

    getHealth() {
        const cPed = memoryjs.readMemory(this.hProcess.handle, this.ADDR_CPED_PTR, "dword");

        return memoryjs.readMemory(this.hProcess.handle, cPed + this.ADDR_CPED_HPOFF, "float");
    }

    getArmor() {
        const cPed = memoryjs.readMemory(this.hProcess.handle, this.ADDR_CPED_PTR, "dword");

        return memoryjs.readMemory(this.hProcess.handle, cPed + this.ADDR_CPED_ARMOROFF, "float");
    }

    getInteriorId() {
        return memoryjs.readMemory(this.hProcess.handle, this.ADDR_CPED_INTID, "Int");
    }

    getSkinID() {
        const cPed = memoryjs.readMemory(this.hProcess.handle, this.ADDR_CPED_PTR, "dword");

        return memoryjs.readMemory(this.hProcess.handle, cPed + this.ADDR_CPED_SKINIDOFF, "byte");
    }

    getMoney() {
        return memoryjs.readMemory(this.hProcess.handle, this.ADDR_CPED_MONEY, "int");
    }

    getWanteds() {
        return memoryjs.readMemory(this.hProcess.handle, 0x58DB60, "byte");
    }

    getWeaponId() {
        return memoryjs.readMemory(this.hProcess.handle, 0xBAA410, "byte");
    }

    getWeaponName() {
        const weaponId = this.getWeaponId();

        return oweaponNames[weaponId + 1] || "";
    }

    getState() {
        const cPed = memoryjs.readMemory(this.hProcess.handle, this.ADDR_CPED_PTR, "dword");

        return memoryjs.readMemory(this.hProcess.handle, cPed + 0x530, "dword");
    }

    IsInMenu() {
        return memoryjs.readMemory(this.hProcess.handle, 0xBA67A4, "byte");
    }

    getMapPosX() {
        return memoryjs.readMemory(this.hProcess.handle, 0xBA67B8, "float");
    }

    getMapPosY() {
        return memoryjs.readMemory(this.hProcess.handle, 0xBA67BC, "float");
    }

    getMapZoom() {
        return memoryjs.readMemory(this.hProcess.handle, 0xBA67AC, "float");
    }

    IsFreezed() {
        return memoryjs.readMemory(this.hProcess.handle, this.hProcess.modBaseAddr + 0x690495, "byte");
    }

    isInAnyVehicle() {
        return memoryjs.readMemory(this.hProcess.handle, this.ADDR_VEHICLE_PTR5, "dword") > 0;
    }

    isDriver() {
        return memoryjs.readMemory(this.hProcess.handle, this.ADDR_VEHICLE_PTR, "dword");
    }

    isDriver() {
        const dwAddr = memoryjs.readMemory(this.hProcess.handle, this.ADDR_VEHICLE_PTR, "dword");

        if(!dwAddr) {
            return -1;
        }

        const dwCPedPtr = memoryjs.readMemory(this.hProcess.handle, this.ADDR_CPED_PTR, "dword");
        const dwVal = memoryjs.readMemory(this.hProcess.handle, dwAddr + this.ADDR_VEHICLE_DRIVER, "dword");

        return dwVal == dwCPedPtr;
    }

    // 

    getRadiostationID() {
        if(this.isInAnyVehicle() == 0) {
            return -1;
        }

        return memoryjs.readMemory(this.hProcess.handle, this.hProcess.modBaseAddr + 0x4CB7E1, "byte");
    }

    getRadiostationName() {
        const rId = this.getRadiostationID();

        return this.oradiostationNames[rId] || "";
    }

    // 
    getTargetPed() {
        const dwAddress = memoryjs.readMemory(this.hProcess.handle, 0xB6F3B8, "dword");

        if(!dwAddress) {
            return -1;
        }

        return memoryjs.readMemory(this.hProcess.handle, dwAddress + 0x79C, "dword");
    }

    //
    getUserName() {
        return memoryjs.readMemory(this.hProcess.handle, this.hModule.modBaseAddr + this.ADDR_SAMP_USERNAME, "str");
    }
}

module.exports = Player;