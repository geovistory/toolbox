'use strict';

var dbm;
var type;
var seed;

/**
* We receive the dbmigrate dependency from dbmigrate initially.
* This enables us to not have to rely on NODE_PATH.
*/
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, callback) {

  const sql = `
  CREATE SCHEMA IF NOT EXISTS commons;

  CREATE SCHEMA IF NOT EXISTS information;

  CREATE SCHEMA IF NOT EXISTS data_for_history;

  CREATE SCHEMA IF NOT EXISTS che;
  `

  db.runSql(sql, callback)

};

exports.down = function(db, callback) {

  const sql = `
  DROP SCHEMA commons;

  DROP SCHEMA information;

  DROP SCHEMA data_for_history;

  DROP SCHEMA che;
  `

  db.runSql(sql, callback)
};

exports._meta = {
  "version": 1
};
