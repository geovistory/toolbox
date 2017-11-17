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
  -- Table: information.entity_project_rel

  CREATE TABLE information.entity_project_rel
  (
    pk_entity integer,
    schema_name character varying,
    table_name character varying,
    pk_entity_project_rel serial PRIMARY KEY,
    fk_entity integer,
    fk_project integer,
    comment text COLLATE pg_catalog."default",
    notes text COLLATE pg_catalog."default",
    fk_creator integer,
    fk_last_modifier integer,
    tmsp_creation timestamp with time zone DEFAULT now(),
    tmsp_last_modification timestamp with time zone,
    sys_period tstzrange DEFAULT tstzrange(now(), NULL::timestamp with time zone),
    is_in_project boolean,
    is_standard_in_project boolean
  )
  INHERITS (information.entity)
  WITH (
    OIDS = FALSE
  )
  TABLESPACE pg_default;

  ALTER TABLE information.entity_project_rel
  OWNER to postgres;

  -- Trigger: creation_tmsp

  CREATE TRIGGER creation_tmsp
  BEFORE INSERT
  ON information.entity_project_rel
  FOR EACH ROW
  EXECUTE PROCEDURE commons.tmsp_creation();

  -- Trigger: insert_schema_table_name

  -- DROP TRIGGER insert_schema_table_name ON information.entity_project_rel;

  CREATE TRIGGER insert_schema_table_name
  BEFORE INSERT
  ON information.entity_project_rel
  FOR EACH ROW
  EXECUTE PROCEDURE commons.insert_schema_table_name();

  -- Trigger: last_modification_tmsp

  -- DROP TRIGGER last_modification_tmsp ON information.entity_project_rel;

  CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT
  ON information.entity_project_rel
  FOR EACH ROW
  EXECUTE PROCEDURE commons.tmsp_last_modification();

  -- Table: information.entity_project_rel_vt

  CREATE TABLE information.entity_project_rel_vt (LIKE information.entity_project_rel);

  -- Trigger: versioning_trigger

  CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR UPDATE OR DELETE ON information.entity_project_rel
  FOR EACH ROW EXECUTE PROCEDURE versioning(
    'sys_period', 'information.entity_project_rel_vt', true
  );

  `
  db.runSql(sql, callback)

};

exports.down = function(db, callback) {
  const sql = `
  DROP TABLE information.entity_project_rel;

  DROP TABLE information.entity_project_rel_vt;
  `
  db.runSql(sql, callback)
};

exports._meta = {
  "version": 1
};
