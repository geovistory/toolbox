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

  CREATE TABLE data_for_history.profile (
    dfh_pk_profile               integer,
    dfh_fk_is_subprofile_of      integer,
    dfh_standard_label           varchar(500),
    dfh_fk_project_of_belonging  integer,
    dfh_start_date               date,
    dfh_end_date                 date,
    dfh_creation_time            timestamp,
    dfh_modification_time        timestamp
  )
  INHERITS (data_for_history.entity);

  ALTER TABLE data_for_history.profile
  ADD CONSTRAINT unique_dfh_pk_profile
  UNIQUE (dfh_pk_profile);

  CREATE TRIGGER creation_tmsp
  BEFORE INSERT
  ON data_for_history.profile
  FOR EACH ROW
  EXECUTE PROCEDURE commons.tmsp_creation();

  CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE
  ON data_for_history.profile
  FOR EACH ROW
  EXECUTE PROCEDURE commons.tmsp_last_modification();

  CREATE TRIGGER insert_schema_table_name BEFORE INSERT
  ON data_for_history.profile FOR EACH ROW
  EXECUTE PROCEDURE commons.insert_schema_table_name();

  -- Trigger: create_entity_version_key

  CREATE TRIGGER create_entity_version_key
  BEFORE INSERT
  ON data_for_history.profile
  FOR EACH ROW
  EXECUTE PROCEDURE commons.create_entity_version_key();

  -- Trigger: update_entity_version_key

  CREATE TRIGGER update_entity_version_key
  BEFORE UPDATE
  ON data_for_history.profile
  FOR EACH ROW
  EXECUTE PROCEDURE commons.update_entity_version_key();

  -- versioning

  CREATE TABLE data_for_history.profile_vt (LIKE data_for_history.profile);

  CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR UPDATE OR DELETE ON data_for_history.profile
  FOR EACH ROW EXECUTE PROCEDURE versioning(
    'sys_period', 'data_for_history.profile_vt', true
  );
  `
  db.runSql(sql, callback)

};

exports.down = function(db, callback) {
  const sql = `
  DROP TABLE IF EXISTS data_for_history.profile CASCADE;
  DROP TABLE IF EXISTS data_for_history.profile_vt CASCADE;
  `
  db.runSql(sql, callback)
};


exports._meta = {
  "version": 1
};
