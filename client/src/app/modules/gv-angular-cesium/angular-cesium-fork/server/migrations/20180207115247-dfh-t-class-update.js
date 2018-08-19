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
    RENAME COLUMN pk_class TO dfh_pk_class;

  ALTER TABLE data_for_history.class
    RENAME COLUMN identifier_in_namespace TO dfh_identifier_in_namespace;

  ALTER TABLE data_for_history.class
    RENAME COLUMN standard_label TO dfh_standard_label;

  ALTER TABLE data_for_history.class
    RENAME COLUMN fk_system_type TO dfh_fk_system_type;

--versioning

  ALTER TABLE data_for_history.class_vt
    RENAME COLUMN pk_class TO dfh_pk_class;

  ALTER TABLE data_for_history.class_vt
    RENAME COLUMN identifier_in_namespace TO dfh_identifier_in_namespace;

  ALTER TABLE data_for_history.class_vt
    RENAME COLUMN standard_label TO dfh_standard_label;

  ALTER TABLE data_for_history.class_vt
    RENAME COLUMN fk_system_type TO dfh_fk_system_type;

  `

  db.runSql(sql, callback)

};

exports.down = function(db, callback) {

  const sql = `
  ALTER TABLE data_for_history.class
    RENAME COLUMN dfh_pk_class TO pk_class;

  ALTER TABLE data_for_history.class
    RENAME COLUMN dfh_identifier_in_namespace TO identifier_in_namespace;

  ALTER TABLE data_for_history.class
    RENAME COLUMN dfh_standard_label TO standard_label;

  ALTER TABLE data_for_history.class
    RENAME COLUMN dfh_fk_system_type TO fk_system_type;

  --versioning

  ALTER TABLE data_for_history.class_vt
    RENAME COLUMN dfh_pk_class TO pk_class;

  ALTER TABLE data_for_history.class_vt
    RENAME COLUMN dfh_identifier_in_namespace TO identifier_in_namespace;

  ALTER TABLE data_for_history.class_vt
    RENAME COLUMN dfh_standard_label TO standard_label;

  ALTER TABLE data_for_history.class_vt
    RENAME COLUMN dfh_fk_system_type TO fk_system_type;
  `

  db.runSql(sql, callback)

};

exports._meta = {
  "version": 1
};
