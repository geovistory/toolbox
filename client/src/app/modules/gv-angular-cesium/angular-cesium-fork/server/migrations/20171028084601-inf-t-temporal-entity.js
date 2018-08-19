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
  -- Table: information.temporal_entity

  CREATE TABLE information.temporal_entity
  (
    entity_version integer,
    pk_temporal_entity serial PRIMARY KEY,
    fk_class VARCHAR(7) REFERENCES data_for_history.class (data_for_history_id)
  )
  INHERITS (information.entity)
  WITH (
    OIDS = FALSE
  )
  TABLESPACE pg_default;

  ALTER TABLE information.temporal_entity
  OWNER to postgres;

  -- Trigger: creation_tmsp

  CREATE TRIGGER creation_tmsp
  BEFORE INSERT
  ON information.temporal_entity
  FOR EACH ROW
  EXECUTE PROCEDURE commons.tmsp_creation();

  -- Trigger: insert_schema_table_name

  CREATE TRIGGER insert_schema_table_name
  BEFORE INSERT
  ON information.temporal_entity
  FOR EACH ROW
  EXECUTE PROCEDURE commons.insert_schema_table_name();

  -- Trigger: last_modification_tmsp

  CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE
  ON information.temporal_entity
  FOR EACH ROW
  EXECUTE PROCEDURE commons.tmsp_last_modification();

  -- Table: information.temporal_entity_vt

  CREATE TABLE information.temporal_entity_vt (LIKE information.temporal_entity);

  -- Trigger: versioning_trigger

  CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR UPDATE OR DELETE ON information.temporal_entity
  FOR EACH ROW EXECUTE PROCEDURE versioning(
    'sys_period', 'information.temporal_entity_vt', true
  );

  -- Trigger: create_entity_version_key

  CREATE TRIGGER create_entity_version_key
  BEFORE INSERT
  ON information.temporal_entity
  FOR EACH ROW
  EXECUTE PROCEDURE commons.create_entity_version_key();

  -- Trigger: update_entity_version_key

  CREATE TRIGGER update_entity_version_key
  BEFORE UPDATE
  ON information.temporal_entity
  FOR EACH ROW
  EXECUTE PROCEDURE commons.update_entity_version_key();


  `
  db.runSql(sql, callback)

};

exports.down = function(db, callback) {
  const sql = `
  DROP TABLE information.temporal_entity;

  DROP TABLE information.temporal_entity_vt;
  `
  db.runSql(sql, callback)
};

exports._meta = {
  "version": 1
};
