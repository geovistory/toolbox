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
  CREATE TABLE data_for_history.property (
    pk_property serial PRIMARY KEY,
    data_for_history_id VARCHAR(7) NOT NULL UNIQUE,
    notes text
  )
  `
  db.runSql(sql, callback)

};

exports.down = function(db, callback) {
  const sql = `
  DROP TABLE data_for_history.property;
  `
  db.runSql(sql, callback)
};


exports._meta = {
  "version": 1
};
