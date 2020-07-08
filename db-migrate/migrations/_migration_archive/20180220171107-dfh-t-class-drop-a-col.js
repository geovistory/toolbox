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
  DROP CONSTRAINT class_data_for_history_id_key;

  ALTER TABLE data_for_history.class
  DROP COLUMN data_for_history_id;

  -- versioning

  ALTER TABLE data_for_history.class_vt
  DROP COLUMN data_for_history_id;
  `

  db.runSql(sql, callback)

};

exports.down = function(db, callback) {

  const sql = `
  ALTER TABLE data_for_history.class
  ADD COLUMN data_for_history_id VARCHAR(7);

  ALTER TABLE data_for_history.class
  ADD CONSTRAINT class_data_for_history_id_key
  UNIQUE (data_for_history_id);

  -- versioning

  ALTER TABLE data_for_history.class_vt
  ADD COLUMN data_for_history_id varchar(7);

  `

  db.runSql(sql, callback)

};
exports._meta = {
  "version": 1
};
