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
  DROP COLUMN dfh_fk_system_type;

  ALTER TABLE data_for_history.label
  DROP COLUMN dfh_fk_system_type;

  ALTER TABLE data_for_history.text_property
  DROP COLUMN dfh_fk_text_property_type;


  -- versioning

  ALTER TABLE data_for_history.class_vt
  DROP COLUMN dfh_fk_system_type;

  ALTER TABLE data_for_history.label_vt
  DROP COLUMN dfh_fk_system_type;

  ALTER TABLE data_for_history.text_property_vt
  DROP COLUMN dfh_fk_text_property_type;
  `

  db.runSql(sql, callback)

};

exports.down = function(db, callback) {

  const sql = `
  ALTER TABLE data_for_history.class
  ADD COLUMN dfh_fk_system_type INTEGER;

  ALTER TABLE data_for_history.label
  ADD COLUMN dfh_fk_system_type INTEGER;

  ALTER TABLE data_for_history.text_property
  ADD COLUMN dfh_fk_text_property_type INTEGER;


  -- versioning

  ALTER TABLE data_for_history.class_vt
  ADD COLUMN dfh_fk_system_type INTEGER;

  ALTER TABLE data_for_history.label_vt
  ADD COLUMN dfh_fk_system_type INTEGER;

  ALTER TABLE data_for_history.text_property_vt
  ADD COLUMN dfh_fk_text_property_type INTEGER;
  `

  db.runSql(sql, callback)

};
exports._meta = {
  "version": 1
};
