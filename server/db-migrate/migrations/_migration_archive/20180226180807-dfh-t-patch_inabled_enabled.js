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
  ALTER TABLE data_for_history.class_profile_view DROP COLUMN is_enabled_in_profile;
  ALTER TABLE data_for_history.entity RENAME COLUMN is_inabled_in_profile TO is_enabled_in_profile;


  `

  db.runSql(sql, callback)

};

exports.down = function(db, callback) {

  const sql = `
  -- no way back !
  `

  db.runSql(sql, callback)

};
exports._meta = {
  "version": 1
};
