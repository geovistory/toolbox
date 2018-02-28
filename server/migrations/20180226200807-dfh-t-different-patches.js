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
  ALTER TABLE data_for_history.class
        ADD COLUMN dfh_creation_time TIMESTAMP,
        ADD COLUMN dfh_modification_time TIMESTAMP;
        
  ALTER TABLE data_for_history.label ADD COLUMN dfh_fk_system_type INTEGER;
  `

  db.runSql(sql, callback)

};

exports.down = function(db, callback) {

  const sql = `
  ALTER TABLE data_for_history.class
        DROP COLUMN dfh_creation_time,
        DROP COLUMN dfh_modification_time;

  ALTER TABLE data_for_history.label DROP COLUMN dfh_fk_system_type;
  `

  db.runSql(sql, callback)

};
exports._meta = {
  "version": 1
};
