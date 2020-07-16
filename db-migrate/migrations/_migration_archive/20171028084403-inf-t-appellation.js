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
  -- Table: information.appellation

  CREATE TABLE information.appellation
  (
    pk_appellation serial PRIMARY KEY,
    appellation_label jsonb,
    fk_class VARCHAR(7) NOT NULL REFERENCES data_for_history.class (data_for_history_id)
  )
  INHERITS (information.entity)
  WITH (
    OIDS = FALSE
  )
  TABLESPACE pg_default;


  -- Trigger: creation_tmsp

  CREATE TRIGGER creation_tmsp
  BEFORE INSERT
  ON information.appellation
  FOR EACH ROW
  EXECUTE PROCEDURE commons.tmsp_creation();

  -- Trigger: insert_schema_table_name

  CREATE TRIGGER insert_schema_table_name
  BEFORE INSERT
  ON information.appellation
  FOR EACH ROW
  EXECUTE PROCEDURE commons.insert_schema_table_name();

  -- Trigger: last_modification_tmsp

  CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE
  ON information.appellation
  FOR EACH ROW
  EXECUTE PROCEDURE commons.tmsp_last_modification();

  -- Table: information.appellation_vt

  CREATE TABLE information.appellation_vt (LIKE information.appellation);

  -- Trigger: versioning_trigger

  CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR UPDATE OR DELETE ON information.appellation
  FOR EACH ROW EXECUTE PROCEDURE versioning(
    'sys_period', 'information.appellation_vt', true
  );

  -- Trigger: create_entity_version_key

  CREATE TRIGGER create_entity_version_key
  BEFORE INSERT
  ON information.appellation
  FOR EACH ROW
  EXECUTE PROCEDURE commons.create_entity_version_key();

  -- Trigger: update_entity_version_key

  CREATE TRIGGER update_entity_version_key
  BEFORE UPDATE
  ON information.appellation
  FOR EACH ROW
  EXECUTE PROCEDURE commons.update_entity_version_key();

  `
  db.runSql(sql, callback)

};

exports.down = function(db, callback) {
  const sql = `
  DROP TABLE information.appellation;
  DROP TABLE information.appellation_vt;

  `
  db.runSql(sql, callback)
};


exports._meta = {
  "version": 1
};
