const memoryjs = require('memoryjs');
const processName = "gta_sa.exe";

// let process = memoryjs.openProcess(processName)
// // let moduleList = memoryjs.getModules(process.th32ProcessID)
// let dwSAMP = memoryjs.findModule("samp.dll", process.th32ProcessID)

// const userName = memoryjs.readMemory(process.handle, dwSAMP.modBaseAddr + ADDR_SAMP_USERNAME, "str")

// console.log(userName)

module.exports = class UDF {
    constructor() {
        this.processName = "gta_sa.exe";

        this.ADDR_SET_POSITION                    = 0xB7CD98
        this.ADDR_SET_POSITION_OFFSET             = 0x14
        this.ADDR_SET_POSITION_X_OFFSET           = 0x30
        this.ADDR_SET_POSITION_Y_OFFSET           = 0x34
        this.ADDR_SET_POSITION_Z_OFFSET           = 0x38
        this.ADDR_SET_INTERIOR_OFFSET             = 0xB72914
        this.SAMP_SZIP_OFFSET                     = 0x20
        // //~ this.SAMP_SZHOSTNAME_OFFSET               = 0x121
        this.SAMP_INFO_SETTINGS_OFFSET            = 0x3C5
        this.SAMP_DIALOG_LINENUMBER_OFFSET        = 0x140

        // ErrorLevels
        this.ERROR_OK                             = 0
        this.ERROR_PROCESS_NOT_FOUND              = 1
        this.ERROR_OPEN_PROCESS                   = 2
        this.ERROR_INVALID_HANDLE                 = 3
        this.ERROR_MODULE_NOT_FOUND               = 4
        this.ERROR_ENUM_PROCESS_MODULES           = 5
        this.ERROR_ZONE_NOT_FOUND                 = 6
        this.ERROR_CITY_NOT_FOUND                 = 7
        this.ERROR_READ_MEMORY                    = 8
        this.ERROR_WRITE_MEMORY                   = 9
        this.ERROR_ALLOC_MEMORY                   = 10
        this.ERROR_FREE_MEMORY                    = 11
        this.ERROR_WAIT_FOR_OBJECT                = 12
        this.ERROR_CREATE_THREAD                  = 13
                    
        // GTA Addresses         
        this.ADDR_ZONECODE                        = 0xA49AD4      //Player Zone
        this.ADDR_POSITION_X                      = 0xB6F2E4      //Player X Position
        this.ADDR_POSITION_Y                      = 0xB6F2E8      //Player Y Position
        this.ADDR_POSITION_Z                      = 0xB6F2EC      //Player Z Position
        this.ADDR_CPED_PTR                        = 0xB6F5F0      //Player CPED Pointer
        this.ADDR_CPED_HPOFF                      = 0x540         //Player Health
        this.ADDR_CPED_ARMOROFF                   = 0x548         //Player Armour
        this.ADDR_CPED_MONEY                      = 0x0B7CE54     //Player Money
        this.ADDR_CPED_INTID                      = 0xA4ACE8      //Player Interior-ID
        this.ADDR_CPED_SKINIDOFF                  = 0x22          //Player Skin-ID
        //           
        this.ADDR_VEHICLE_PTR                     = 0xBA18FC      //Vehicle CPED Pointer
        this.ADDR_VEHICLE_HPOFF                   = 0x4C0         //Vehicle Health
        this.ADDR_VEHICLE_DOORSTATE               = 0x4F8         //Vehicle Door Status
        this.ADDR_VEHICLE_ENGINESTATE             = 0x428         //Vehicle Engine Status
        this.ADDR_VEHICLE_SIRENSTATE              = 0x1069 
        this.ADDR_VEHICLE_SIRENSTATE2             = 0x1300 
        this.ADDR_VEHICLE_LIGHTSTATE              = 0x584         //Vehicle Light Status
        this.ADDR_VEHICLE_MODEL                   = 0x22          //Vehicle Car-ID & Car-Name
        this.ADDR_VEHICLE_TYPE                    = 0x590         //Vehicle Typ-ID (1 = Car)
        this.ADDR_VEHICLE_DRIVER                  = 0x460         //Vehicle Driver
        this.ADDR_VEHICLE_X                       = 0x44          //Vehicle Speed X
        this.ADDR_VEHICLE_Y                       = 0x48          //Vehicle Speed Y
        this.ADDR_VEHICLE_Z                       = 0x4C          //Vehicle Speed Z
        this.oAirplaneModels = [417, 425, 447, 460, 469, 476, 487, 488, 497, 511, 512, 513, 519, 520, 548, 553, 563, 577, 592, 593]
        this.oBikeModels = [481, 509, 510]
        this.ovehicleNames = ["Landstalker", "Bravura", "Buffalo", "Linerunner", "Perrenial", "Sentinel", "Dumper", "Firetruck", "Trashmaster", "Stretch", "Manana", "Infernus", "Voodoo", "Pony", "Mule", "Cheetah", "Ambulance", "Leviathan", "Moonbeam", "Esperanto", "Taxi", "Washington", "Bobcat", "Whoopee", "BFInjection", "Hunter", "Premier", "Enforcer", "Securicar", "Banshee", "Predator", "Bus", "Rhino", "Barracks", "Hotknife", "Trailer", "Previon", "Coach", "Cabbie", "Stallion", "Rumpo", "RCBandit", "Romero", "Packer", "Monster", "Admiral", "Squalo", "Seasparrow", "Pizzaboy", "Tram", "Trailer", "Turismo", "Speeder", "Reefer", "Tropic", "Flatbed", "Yankee", "Caddy", "Solair", "Berkley'sRCVan", "Skimmer", "PCJ-600", "Faggio", "Freeway", "RCBaron", "RCRaider", "Glendale", "Oceanic", "Sanchez", "Sparrow", "Patriot", "Quad", "Coastguard", "Dinghy", "Hermes", "Sabre", "Rustler", "ZR-350", "Walton", "Regina", "Comet", "BMX", "Burrito", "Camper", "Marquis", "Baggage", "Dozer", "Maverick", "NewsChopper", "Rancher", "FBIRancher", "Virgo", "Greenwood", "Jetmax", "Hotring", "Sandking", "BlistaCompact", "PoliceMaverick", "Boxvillde", "Benson", "Mesa", "RCGoblin", "HotringRacerA", "HotringRacerB", "BloodringBanger", "Rancher", "SuperGT", "Elegant", "Journey", "Bike", "MountainBike", "Beagle", "Cropduster", "Stunt", "Tanker", "Roadtrain", "Nebula", "Majestic", "Buccaneer", "Shamal", "hydra", "FCR-900", "NRG-500", "HPV1000", "CementTruck", "TowTruck", "Fortune", "Cadrona", "FBITruck", "Willard", "Forklift", "Tractor", "Combine", "Feltzer", "Remington", "Slamvan", "Blade", "Freight", "Streak", "Vortex", "Vincent", "Bullet", "Clover", "Sadler", "Firetruck", "Hustler", "Intruder", "Primo", "Cargobob", "Tampa", "Sunrise", "Merit", "Utility", "Nevada", "Yosemite", "Windsor", "Monster", "Monster", "Uranus", "Jester", "Sultan", "Stratum", "Elegy", "Raindance", "RCTiger", "Flash", "Tahoma", "Savanna", "Bandito", "FreightFlat", "StreakCarriage", "Kart", "Mower", "Dune", "Sweeper", "Broadway", "Tornado", "AT-400", "DFT-30", "Huntley", "Stafford", "BF-400", "NewsVan", "Tug", "Trailer", "Emperor", "Wayfarer", "Euros", "Hotdog", "Club", "FreightBox", "Trailer", "Andromada", "Dodo", "RCCam", "Launch", "PoliceCar", "PoliceCar", "PoliceCar", "PoliceRanger", "Picador", "S.W.A.T", "Alpha", "Phoenix", "GlendaleShit", "SadlerShit", "Luggage", "Luggage", "Stairs", "Boxville", "Tiller", "UtilityTrailer"]
        this.oweaponNames = ["Fist", "Brass Knuckles", "Golf Club", "Nightstick", "Knife", "Baseball Bat", "Shovel", "Pool Cue", "Katana", "Chainsaw", "Purple Dildo", "Dildo", "Vibrator", "Silver Vibrator", "Flowers", "Cane", "Grenade", "Tear Gas", "Molotov Cocktail", "", "", "", "9mm", "Silenced 9mm", "21Desert Eagle", "Shotgun", "Sawnoff Shotgun", "Combat Shotgun", "Micro SMG/Uzi", "MP5", "AK-47", "M4", "Tec-9", "Country Rifle", "Sniper Rifle", "RPG", "HS Rocket", "Flamethrower", "Minigun", "Satchel Charge", "Detonator", "Spraycan", "Fire Extinguisher", "Camera", "Night Vis Goggles", "Thermal Goggles", "Parachute"]
        this.oradiostationNames = ["Playback FM", "K Rose", "K-DST", "Bounce FM", "SF-UR", "Radio Los Santos", "Radio X", "CSR 103.9", "K-JAH West", "Master Sounds 98.3", "WCTR Talk Radio", "User Track Player", "Radio Off"]
        this.oweatherNames = ["EXTRASUNNY_LA", "SUNNY_LA", "EXTRASUNNY_SMOG_LA", "SUNNY_SMOG_LA", "CLOUDY_LA", "SUNNY_SF", "EXTRASUNNY_SF", "CLOUDY_SF", "RAINY_SF", "FOGGY_SF", "SUNNY_VEGAS", "EXTRASUNNY_VEGAS", "CLOUDY_VEGAS", "EXTRASUNNY_COUNTRYSIDE", "SUNNY_COUNTRYSIDE", "CLOUDY_COUNTRYSIDE", "RAINY_COUNTRYSIDE", "EXTRASUNNY_DESERT", "SUNNY_DESERT", "SANDSTORM_DESERT", "UNDERWATER", "EXTRACOLOURS_1", "EXTRACOLOURS_2"]
        this.oWeaponIdForModel = { 1: 331, 2: 333, 3: 334, 4: 335, 5: 336, 6: 337, 7: 338, 8: 339, 9: 341, 10: 321, 11: 322, 12: 323, 13: 324, 14: 325, 15: 326, 16: 342, 17: 343, 18: 344, 22: 346, 23: 347, 24: 348, 25: 349, 26: 350, 27: 351, 28: 352, 29: 353, 30: 355, 31: 356, 32: 372, 33: 357, 34: 358, 35: 359, 36: 360, 37: 361, 38: 362, 39: 363, 40: 364, 41: 365, 42: 366, 43: 367, 44: 368, 45: 369, 46: 371 }

        // SAMP ������
        this.ADDR_SAMP_INCHAT_PTR                 = 0x21a10c
        this.ADDR_SAMP_INCHAT_PTR_OFF             = 0x55
        this.ADDR_SAMP_USERNAME                   = 0x219A6F
        this.FUNC_SAMP_SENDCMD                    = 0x65c60
        this.FUNC_SAMP_SENDSAY                    = 0x57f0
        this.FUNC_SAMP_ADDTOCHATWND               = 0x64520
        this.ADDR_SAMP_CHATMSG_PTR                = 0x21a0e4
        this.FUNC_SAMP_SHOWGAMETEXT               = 0x9c2c0
        this.FUNC_SAMP_PLAYAUDIOSTR               = 0x62da0
        this.FUNC_SAMP_STOPAUDIOSTR               = 0x629a0
        // ########################## ����� ������� ##########################
        this.DIALOG_STYLE_MSGBOX			        = 0
        this.DIALOG_STYLE_INPUT 			        = 1
        this.DIALOG_STYLE_LIST			        = 2
        this.DIALOG_STYLE_PASSWORD		        = 3
        this.DIALOG_STYLE_TABLIST			        = 4
        this.DIALOG_STYLE_TABLIST_HEADERS	        = 5
        // ######################### ��������� ������� #########################
        this.SAMP_DIALOG_STRUCT_PTR				= 0x21A0B8
        this.SAMP_DIALOG_PTR1_OFFSET				= 0x1C
        this.SAMP_DIALOG_LINES_OFFSET 			= 0x44C
        this.SAMP_DIALOG_INDEX_OFFSET				= 0x443
        this.SAMP_DIALOG_BUTTON_HOVERING_OFFSET	= 0x465
        this.SAMP_DIALOG_BUTTON_CLICKED_OFFSET	= 0x466
        this.SAMP_DIALOG_PTR2_OFFSET 				= 0x20
        this.SAMP_DIALOG_LINECOUNT_OFFSET			= 0x150
        this.SAMP_DIALOG_OPEN_OFFSET				= 0x28
        this.SAMP_DIALOG_STYLE_OFFSET				= 0x2C
        this.SAMP_DIALOG_ID_OFFSET				= 0x30
        this.SAMP_DIALOG_TEXT_PTR_OFFSET			= 0x34
        this.SAMP_DIALOG_CAPTION_OFFSET			= 0x40
        this.FUNC_SAMP_SHOWDIALOG				 	= 0x6B9C0
        this.FUNC_SAMP_CLOSEDIALOG				= 0x6C040
        this.FUNC_UPDATESCOREBOARD                = 0x8A10
        this.SAMP_INFO_OFFSET                     = 0x21A0F8
        this.ADDR_SAMP_CRASHREPORT 				= 0x5CF2C
        this.SAMP_PPOOLS_OFFSET                   = 0x3CD
        this.SAMP_PPOOL_PLAYER_OFFSET             = 0x18
        this.SAMP_SLOCALPLAYERID_OFFSET           = 0x4
        this.SAMP_ISTRLEN_LOCALPLAYERNAME_OFFSET  = 0x1A
        this.SAMP_SZLOCALPLAYERNAME_OFFSET        = 0xA
        this.SAMP_PSZLOCALPLAYERNAME_OFFSET       = 0xA
        this.SAMP_PREMOTEPLAYER_OFFSET            = 0x2E
        this.SAMP_ISTRLENNAME___OFFSET            = 0x1C
        this.SAMP_SZPLAYERNAME_OFFSET             = 0xC
        this.SAMP_PSZPLAYERNAME_OFFSET            = 0xC
        this.SAMP_ILOCALPLAYERPING_OFFSET         = 0x26
        this.SAMP_ILOCALPLAYERSCORE_OFFSET        = 0x2A
        this.SAMP_IPING_OFFSET                    = 0x28
        this.SAMP_ISCORE_OFFSET                   = 0x24
        this.SAMP_ISNPC_OFFSET                    = 0x4
        this.SAMP_PLAYER_MAX                      = 1004
        this.SAMP_KILLSTAT_OFFSET                 = 0x21A0EC
        this.multVehicleSpeed_tick                = 0
        this.CheckpointCheck 						= 0xC7DEEA
        this.rmaddrs 								= [0xC7DEC8, 0xC7DECC, 0xC7DED0]

        // Sizes
        this.SIZE_SAMP_CHATMSG                    = 0xFC
        // Internal
        this.hGTA                                 = 0x0
        this.dwGTAPID                             = 0x0
        this.dwSAMP                               = 0x0
        this.pMemory                              = 0x0
        this.pParam1                              = 0x0
        this.pParam2                              = 0x0
        this.pParam3                              = 0x0
        this.pParam4                              = 0x0
        this.pParam5                              = 0x0
        this.pInjectFunc                          = 0x0
        this.nZone                                = 1
        this.nCity                                = 1
        this.bInitZaC                             = 0
        this.iRefreshScoreboard                   = 0
        this.oScoreboardData                      = ""
        this.iRefreshHandles                      = 0
        this.iUpdateTick                          = 2500

        try {
            this.hProcess = memoryjs.openProcess(processName); // hGta
            this.hModule = memoryjs.findModule("samp.dll", this.hProcess.th32ProcessID); // dwSamp

            console.log(`Loaded!`);
        } catch(e) {
            throw new Error(e);
        }
    }

    //

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

    // ##### Fahrzeugfunktionen #####
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

    IsSAMPAvailable() {
        const dwChatInfo = memoryjs.readMemory(this.hProcess.handle, this.hModule.modBaseAddr + this.ADDR_SAMP_CHATMSG_PTR, "dword");
    
        return dwChatInfo != 0 && dwChatInfo != "ERROR"
    }

    isInChat() {
        const dwAddress = memoryjs.readMemory(this.hProcess.handle, this.hModule.modBaseAddr + this.ADDR_SAMP_INCHAT_PTR, "dword");

        return memoryjs.readMemory(this.hProcess.handle, dwAddress + this.ADDR_SAMP_INCHAT_PTR_OFF, "dword");
    }

    SendChat(wText) {
        const dwFunc = wText.substring(1, 1) == '/'
            ? this.hModule.modBaseAddr + this.FUNC_SAMP_SENDCMD
            : this.hModule.modBaseAddr + this.FUNC_SAMP_SENDSAY;

        return memoryjs.callFunction(this.hProcess.handle, [["s", wText]], false, dwFunc);
    }

    getUserName() {
        return memoryjs.readMemory(this.hProcess.handle, this.hModule.modBaseAddr + this.ADDR_SAMP_USERNAME, "str");
    }
}