const winston = require('winston');
const { redBright , magentaBright} =require("colorette")
const myCustomLevels = {
    levels: {
        error: 0,
        debug: 2,
        warn: 1,
        info: 4,
        
    },
    colors: {
        error: 'bold red',
        warn: 'italic yellow',
        info: 'bold yellow',
        debug: 'bold red cyanBG'
    }
};


const loggerClass = "SMARTIN_DASHBOARD"
winston.addColors(myCustomLevels.colors);
const logger = winston.createLogger({
    levels: myCustomLevels.levels,
    format: winston.format.combine(
        // winston.format.colorize(),
        winston.format.timestamp({
            format: 'DD/MM/YYYY, HH:mm:ss'
        }),
        winston.format.printf(info => {
            let level = info.level.toUpperCase();  
            let message = info.message;
            if(level == 'ERROR'){
                message = redBright(message);
            }
            if(level == 'DEBUG'){
                message = magentaBright(message);
            }
            // console.log(level);
            return `\x1b[32m[NODE] -\x1b[0m ${info.timestamp} - \x1B[33m[${level}\x1B[33m]: \x1b[32mLOG \x1B[33m[${loggerClass}]\x1b[0m ${message}`;
        })
    ),
    transports: [
        new winston.transports.Console()
    ]
});

module.exports = logger;