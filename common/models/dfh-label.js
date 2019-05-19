'use strict';

module.exports = function(DfhLabel) {
    DfhLabel.bulkReplaceOrCreate = function (items) {
        const promiseArray = items.map(item => DfhLabel.replaceOrCreate(item))
        return Promise.map(promiseArray, (promise) => promise)
    };
};
