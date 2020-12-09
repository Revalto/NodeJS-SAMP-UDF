const chatLogDir = "C:/Users/Revalto/Documents/RADMIR CRMP User Files/SAMP/chatlog.txt";
const fs = require('fs');

fs.watchFile(chatLogDir, { interval: 100 }, () => {
    const data = fs.readFileSync(chatLogDir, 'utf-8');
    const str = data
        .split('\r\r\n')
        .splice(-2, 1)

    console.log(str[0]);
})