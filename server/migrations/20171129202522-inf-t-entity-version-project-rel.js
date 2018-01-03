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
  -- Table: information.entity_version_project_rel

  CREATE TABLE information.entity_version_project_rel
  (
    pk_entity_version_project_rel serial PRIMARY KEY,
    fk_project integer REFERENCES commons.project (pk_project),
    fk_entity integer,
    fk_entity_version integer,
    fk_entity_version_concat TEXT,
    is_in_project boolean,
    is_standard_in_project boolean,
    UNIQUE (fk_entity_version_concat, fk_project),
    UNIQUE (fk_entity, fk_project)
  )
  INHERITS (information.entity)
  WITH (
    OIDS = FALSE
  )
  TABLESPACE pg_default;

  ALTER TABLE information.entity_version_project_rel
  OWNER to postgres;

  -- Trigger: creation_tmsp

  CREATE TRIGGER creation_tmsp
  BEFORE INSERT
  ON information.entity_version_project_rel
  FOR EACH ROW
  EXECUTE PROCEDURE commons.tmsp_creation();

  -- Trigger: insert_schema_table_name

  -- DROP TRIGGER insert_schema_table_name ON information.entity_version_project_rel;

  CREATE TRIGGER insert_schema_table_name
  BEFORE INSERT
  ON information.entity_version_project_rel
  FOR EACH ROW
  EXECUTE PROCEDURE commons.insert_schema_table_name();

  -- Trigger: last_modification_tmsp

  -- DROP TRIGGER last_modification_tmsp ON information.entity_version_project_rel;

  CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE
  ON information.entity_version_project_rel
  FOR EACH ROW
  EXECUTE PROCEDURE commons.tmsp_last_modification();

  -- Table: information.entity_version_project_rel_vt

  CREATE TABLE information.entity_version_project_rel_vt (LIKE information.entity_version_project_rel);

  -- Trigger: versioning_trigger

  CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR UPDATE OR DELETE ON information.entity_version_project_rel
  FOR EACH ROW EXECUTE PROCEDURE versioning(
    'sys_period', 'information.entity_version_project_rel_vt', true
  );


  -- Trigger: create_entity_version_key

  CREATE TRIGGER create_entity_version_key
  BEFORE INSERT
  ON information.entity_version_project_rel
  FOR EACH ROW
  EXECUTE PROCEDURE commons.create_entity_version_key();

  -- Trigger: update_entity_version_key

  CREATE TRIGGER update_entity_version_key
  BEFORE UPDATE
  ON information.entity_version_project_rel
  FOR EACH ROW
  EXECUTE PROCEDURE commons.update_entity_version_key();

  -- Trigger: on_upsert

  CREATE TRIGGER on_upsert
  BEFORE INSERT OR UPDATE
  ON information.entity_version_project_rel
  FOR EACH ROW
  EXECUTE PROCEDURE commons.evpr_fk_entity_fk_entity_version();

  `
  db.runSql(sql, callback)

};

exports.down = function(db, callback) {
  const sql = `
  DROP TABLE information.entity_version_project_rel;

  DROP TABLE information.entity_version_project_rel_vt;
  `
  db.runSql(sql, callback)
};

exports._meta = {
  "version": 1
};
