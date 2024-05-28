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
  ALTER TABLE data_for_history.class_profile_view
    RENAME COLUMN fk_class TO dfh_fk_class;

  ALTER TABLE data_for_history.class_profile_view
      RENAME COLUMN identifier_in_namespace TO dfh_identifier_in_namespace;

  ALTER TABLE data_for_history.class_profile_view
      RENAME COLUMN class_standard_label TO dfh_class_standard_label;

  ALTER TABLE data_for_history.class_profile_view
      RENAME COLUMN fk_system_type TO dfh_fk_system_type;

  ALTER TABLE data_for_history.class_profile_view
      RENAME COLUMN type_label TO dfh_type_label;

  ALTER TABLE data_for_history.class_profile_view
      RENAME COLUMN root_namespace TO dfh_root_namespace;

  ALTER TABLE data_for_history.class_profile_view
      RENAME COLUMN profile_association_type TO dfh_profile_association_type;

  ALTER TABLE data_for_history.class_profile_view
      RENAME COLUMN fk_profile TO dfh_fk_profile;

  ALTER TABLE data_for_history.class_profile_view
      RENAME COLUMN profile_label TO dfh_profile_label;


  ALTER TABLE data_for_history.class_profile_view
    ADD COLUMN removed_from_api boolean;

  -- versioning

  ALTER TABLE data_for_history.class_profile_view_vt
    RENAME COLUMN fk_class TO dfh_fk_class;

  ALTER TABLE data_for_history.class_profile_view_vt
      RENAME COLUMN identifier_in_namespace TO dfh_identifier_in_namespace;

  ALTER TABLE data_for_history.class_profile_view_vt
      RENAME COLUMN class_standard_label TO dfh_class_standard_label;

  ALTER TABLE data_for_history.class_profile_view_vt
      RENAME COLUMN fk_system_type TO dfh_fk_system_type;

  ALTER TABLE data_for_history.class_profile_view_vt
      RENAME COLUMN type_label TO dfh_type_label;

  ALTER TABLE data_for_history.class_profile_view_vt
      RENAME COLUMN root_namespace TO dfh_root_namespace;

  ALTER TABLE data_for_history.class_profile_view_vt
      RENAME COLUMN profile_association_type TO dfh_profile_association_type;

  ALTER TABLE data_for_history.class_profile_view_vt
      RENAME COLUMN fk_profile TO dfh_fk_profile;

  ALTER TABLE data_for_history.class_profile_view_vt
      RENAME COLUMN profile_label TO dfh_profile_label;


  ALTER TABLE data_for_history.class_profile_view_vt
    ADD COLUMN removed_from_api boolean;


  `

  db.runSql(sql, callback)

};

exports.down = function(db, callback) {

  const sql = `
  ALTER TABLE data_for_history.class_profile_view
    RENAME COLUMN dfh_fk_class TO fk_class;

  ALTER TABLE data_for_history.class_profile_view
      RENAME COLUMN dfh_identifier_in_namespace TO identifier_in_namespace;

  ALTER TABLE data_for_history.class_profile_view
      RENAME COLUMN dfh_class_standard_label TO class_standard_label;

  ALTER TABLE data_for_history.class_profile_view
      RENAME COLUMN dfh_fk_system_type TO fk_system_type;

  ALTER TABLE data_for_history.class_profile_view
      RENAME COLUMN dfh_type_label TO type_label;

  ALTER TABLE data_for_history.class_profile_view
      RENAME COLUMN dfh_root_namespace TO root_namespace;

  ALTER TABLE data_for_history.class_profile_view
      RENAME COLUMN dfh_profile_association_type TO profile_association_type;

  ALTER TABLE data_for_history.class_profile_view
      RENAME COLUMN dfh_fk_profile TO fk_profile;

  ALTER TABLE data_for_history.class_profile_view
      RENAME COLUMN dfh_profile_label TO profile_label;


  ALTER TABLE data_for_history.class_profile_view
    DROP COLUMN removed_from_api;

  --versioning

  ALTER TABLE data_for_history.class_profile_view_vt
    RENAME COLUMN dfh_fk_class TO fk_class;

  ALTER TABLE data_for_history.class_profile_view_vt
      RENAME COLUMN dfh_identifier_in_namespace TO identifier_in_namespace;

  ALTER TABLE data_for_history.class_profile_view_vt
      RENAME COLUMN dfh_class_standard_label TO class_standard_label;

  ALTER TABLE data_for_history.class_profile_view_vt
      RENAME COLUMN dfh_fk_system_type TO fk_system_type;

  ALTER TABLE data_for_history.class_profile_view_vt
      RENAME COLUMN dfh_type_label TO type_label;

  ALTER TABLE data_for_history.class_profile_view_vt
      RENAME COLUMN dfh_root_namespace TO root_namespace;

  ALTER TABLE data_for_history.class_profile_view_vt
      RENAME COLUMN dfh_profile_association_type TO profile_association_type;

  ALTER TABLE data_for_history.class_profile_view_vt
      RENAME COLUMN dfh_fk_profile TO fk_profile;

  ALTER TABLE data_for_history.class_profile_view_vt
      RENAME COLUMN dfh_profile_label TO profile_label;


  ALTER TABLE data_for_history.class_profile_view_vt
    DROP COLUMN removed_from_api;

  `

  db.runSql(sql, callback)

};

exports._meta = {
  "version": 1
};
