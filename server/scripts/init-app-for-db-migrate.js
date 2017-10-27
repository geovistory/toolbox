const loopback = require('loopback');
const boot = require('loopback-boot');

const logger = require('./logger');

const app = loopback();
// This module resides in /scripts so we should boot project from /..
boot(app, __dirname + '/..');

logger.debug('Loopback initialized');

app.stop = function () {
    // Disconnect from every data source
    Object.keys(app.dataSources).forEach(name => {
        let d = app.dataSources[name];
        if (typeof d.disconnect === 'function') {
            d.disconnect();
            // console.log(name + ' disconnected')
        }
    });
};

module.exports = app;