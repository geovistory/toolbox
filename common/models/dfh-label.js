'use strict';
const Promise = require('bluebird');

module.exports = function(DfhLabel) {
    DfhLabel.bulkReplaceOrCreate = function (items) {
        const promiseArray = items.map(item => DfhLabel.replaceOrCreate(item))
        return Promise.map(promiseArray, (promise) => promise)
    };

    DfhLabel.bulkDelete = function (items) {
        const promiseArray = items.map(item => item.destroy())
        return Promise.map(promiseArray, (promise) => promise)
    };
};
