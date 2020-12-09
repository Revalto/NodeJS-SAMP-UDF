const memoryjs = require('memoryjs');
const EventEmitter = require('events');
const os = require("os");

// Base
const base = require('./configs/037R1.json');

// Classes
const Player = require('./classes/Player');
const Vehicle = require('./classes/Vehicle');
const Weather = require('./classes/Weather');
const Chat = require('./classes/Chat');
const Server = require('./classes/Server');
const Dialog = require('./classes/Dialog');

module.exports = class UDF {
    constructor(logger = null) {
        try {
            // Быстрая загрузка базы в класс...
            Object.entries(base).forEach(([key, value]) => this[key] = value)

            this.processName = "gta_sa.exe";
            this.chatLog = `${os.homedir()}/Documents/GTA San Andreas User Files/SAMP/chatlog.txt`;

            this.hProcess = memoryjs.openProcess(this.processName); // hGta
            this.hModule = memoryjs.findModule("samp.dll", this.hProcess.th32ProcessID); // dwSamp
            this.logger = logger;
            
            this.updates = new EventEmitter();
            this.Player = new Player(this);
            this.Vehicle = new Vehicle(this);
            this.Weather = new Weather(this);
            this.Chat = new Chat(this);
            this.Server = new Server(this);
            this.Dialog = new Dialog(this);

            if(this.logger) {
                this.logger(`[ NodeJS-SAMP-UDF ] Loaded!`)
            }
        } catch(e) {
            throw new Error(e);
        }
    }
}