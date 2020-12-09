class Player {
    constructor(base) {
        Object.entries(base).forEach(([key, value]) => this[key] = value)
    }

    getPlayerHealth() {
        const cPed = memoryjs.readMemory(this.hProcess.handle, this.ADDR_CPED_PTR, "dword");

        return memoryjs.readMemory(this.hProcess.handle, cPed + this.ADDR_CPED_HPOFF, "float");
    }

    getPlayerArmor() {
        const cPed = memoryjs.readMemory(this.hProcess.handle, this.ADDR_CPED_PTR, "dword");

        return memoryjs.readMemory(this.hProcess.handle, cPed + this.ADDR_CPED_ARMOROFF, "float");
    }

    getPlayerInteriorId() {
        return memoryjs.readMemory(this.hProcess.handle, this.ADDR_CPED_INTID, "Int");
    }

    getPlayerSkinID() {
        const cPed = memoryjs.readMemory(this.hProcess.handle, this.ADDR_CPED_PTR, "dword");

        return memoryjs.readMemory(this.hProcess.handle, cPed + this.ADDR_CPED_SKINIDOFF, "byte");
    }

    getPlayerMoney() {
        return memoryjs.readMemory(this.hProcess.handle, this.ADDR_CPED_MONEY, "int");
    }

    getPlayerWanteds() {
        return memoryjs.readMemory(this.hProcess.handle, 0x58DB60, "byte");
    }

    getPlayerWeaponId() {
        return memoryjs.readMemory(this.hProcess.handle, 0xBAA410, "byte");
    }

    getPlayerWeaponName() {
        const weaponId = this.getPlayerWeaponId();

        return oweaponNames[weaponId + 1] || "";
    }

    getPlayerState() {
        const cPed = memoryjs.readMemory(this.hProcess.handle, this.ADDR_CPED_PTR, "dword");

        return memoryjs.readMemory(this.hProcess.handle, cPed + 0x530, "dword");
    }

    IsPlayerInMenu() {
        return memoryjs.readMemory(this.hProcess.handle, 0xBA67A4, "byte");
    }

    getPlayerMapPosX() {
        return memoryjs.readMemory(this.hProcess.handle, 0xBA67B8, "float");
    }

    getPlayerMapPosY() {
        return memoryjs.readMemory(this.hProcess.handle, 0xBA67BC, "float");
    }

    getPlayerMapZoom() {
        return memoryjs.readMemory(this.hProcess.handle, 0xBA67AC, "float");
    }

    IsPlayerFreezed() {
        return memoryjs.readMemory(this.hProcess.handle, this.hProcess.modBaseAddr + 0x690495, "byte");
    }

    isPlayerInAnyVehicle() {
        return memoryjs.readMemory(this.hProcess.handle, this.ADDR_VEHICLE_PTR5, "dword") > 0;
    }

    isPlayerDriver() {
        return memoryjs.readMemory(this.hProcess.handle, this.ADDR_VEHICLE_PTR, "dword");
    }

    isPlayerDriver() {
        const dwAddr = memoryjs.readMemory(this.hProcess.handle, this.ADDR_VEHICLE_PTR, "dword");

        if(!dwAddr) {
            return -1;
        }

        const dwCPedPtr = memoryjs.readMemory(this.hProcess.handle, this.ADDR_CPED_PTR, "dword");
        const dwVal = memoryjs.readMemory(this.hProcess.handle, dwAddr + this.ADDR_VEHICLE_DRIVER, "dword");

        return dwVal == dwCPedPtr;
    }

    // 

    getPlayerRadiostationID() {
        if(this.isPlayerInAnyVehicle() == 0) {
            return -1;
        }

        return memoryjs.readMemory(this.hProcess.handle, this.hProcess.modBaseAddr + 0x4CB7E1, "byte");
    }

    getPlayerRadiostationName() {
        const rId = this.getPlayerRadiostationID();

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
}

module.exports = Player;