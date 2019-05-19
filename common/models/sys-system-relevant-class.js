'use strict';
const Promise = require('bluebird');

module.exports = function (SysSystemRelevantClass) {

    SysSystemRelevantClass.bulkReplaceOrCreate = function (items) {
        const promiseArray = items.map(item => SysSystemRelevantClass.replaceOrCreate(item))
        return Promise.map(promiseArray, (promise) => promise)
    };

};
