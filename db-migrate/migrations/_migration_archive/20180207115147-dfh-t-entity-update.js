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
  /*
  According to inheritance functioning in postgreSQL 9.6 this column is merged
  with the existing ones having the same name and type:
  - merging definition of column "tmsp_last_dfh_update" for child "class_profile_view"
  - merging definition of column "tmsp_last_dfh_update" for child "class"

  It is therefore not necessary to drop them in the tables and the present data should be
  preserved (this behaviour concerning existing data was not tested)
  */
  ALTER TABLE data_for_history.entity
    ADD COLUMN tmsp_last_dfh_update timestamptz;

  `

  db.runSql(sql, callback)

};

exports.down = function(db, callback) {

  const sql = `
  ALTER TABLE data_for_history.entity
    DROP COLUMN tmsp_last_dfh_update;

  `

  db.runSql(sql, callback)

};

exports._meta = {
  "version": 1
};
