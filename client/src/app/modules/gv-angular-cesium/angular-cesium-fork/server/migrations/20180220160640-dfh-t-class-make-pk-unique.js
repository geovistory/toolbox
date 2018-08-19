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
  -- add unique constraint to pk
  ALTER TABLE data_for_history.class
  ADD CONSTRAINT unique_dfh_pk_class
  UNIQUE (dfh_pk_class);
  `

  db.runSql(sql, callback)

};

exports.down = function(db, callback) {

  const sql = `
  -- drop unique constraint to pk
  ALTER TABLE data_for_history.class
  DROP CONSTRAINT unique_dfh_pk_class;
  `

  db.runSql(sql, callback)

};

exports._meta = {
  "version": 1
};
