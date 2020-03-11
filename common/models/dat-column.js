'use strict';
const _ = require('lodash');

const Promise = require('bluebird');
const logSql = require('../../server/scripts/log-deserialized-sql');

module.exports = function(DatColumn) {
  /**
   * Get the columns related to the digital
   * @param {*} pkProject is needed to ensure the columns belong to a namespace of the project
   * @param {*} pkEntity the pk of the digital
   * @param {*} cb
   */
  DatColumn.ofDigital = function(pkProject, pkEntity, ctx, cb) {};
};
