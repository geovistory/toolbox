'use strict';

const clc = require('cli-color');

module.exports = require('tracer').console({
    filters: {
        log:   clc.black.bgWhite,
        trace: clc.magenta,
        debug: clc.cyan,
        info:  clc.green,
        warn:  clc.xterm(202).bgXterm(236),
        error: clc.red.bold
    },
    level: process.env.LOG_LEVEL || 'debug'
});