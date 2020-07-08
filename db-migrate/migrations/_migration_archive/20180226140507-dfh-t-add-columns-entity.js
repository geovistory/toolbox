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
  ALTER TABLE data_for_history.entity
    ADD COLUMN is_inabled_in_profile BOOLEAN,
    ADD COLUMN removed_from_api BOOLEAN DEFAULT FALSE;
  `

  db.runSql(sql, callback)

};

exports.down = function(db, callback) {

  const sql = `
  -- this part won't restore the former existing columns on other tables
  ALTER TABLE data_for_history.entity
    DROP COLUMN is_inabled_in_profile BOOLEAN,
    DROP COLUMN removed_from_api BOOLEAN DEFAULT FALSE;
  `

  db.runSql(sql, callback)

};
exports._meta = {
  "version": 1
};
