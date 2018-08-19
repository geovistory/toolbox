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

  CREATE TABLE commons.project
  (
    pk_project serial PRIMARY KEY,
    pk_entity integer,
    schema_name character varying,
    table_name character varying,
    fk_creator integer REFERENCES public.account (id),
    fk_last_modifier integer REFERENCES public.account (id),
    tmsp_creation timestamp with time zone DEFAULT now(),
    tmsp_last_modification timestamp with time zone,
    fk_language character(3) REFERENCES commons.language (pk_language),
    notes text,
    sys_period tstzrange DEFAULT tstzrange(now(), NULL::timestamp with time zone)
  )
  INHERITS (commons.entity)
  WITH (
    OIDS = FALSE
  )
  TABLESPACE pg_default;

  ALTER TABLE commons.project
  OWNER to postgres;

  -- Trigger: creation_tmsp

  -- DROP TRIGGER creation_tmsp ON commons.project;

  CREATE TRIGGER creation_tmsp
  BEFORE INSERT
  ON commons.project
  FOR EACH ROW
  EXECUTE PROCEDURE commons.tmsp_creation();

  -- Trigger: insert_schema_table_name

  -- DROP TRIGGER insert_schema_table_name ON commons.project;

  CREATE TRIGGER insert_schema_table_name
  BEFORE INSERT
  ON commons.project
  FOR EACH ROW
  EXECUTE PROCEDURE commons.insert_schema_table_name();

  -- Trigger: last_modification_tmsp

  -- DROP TRIGGER last_modification_tmsp ON commons.project;

  CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE
  ON commons.project
  FOR EACH ROW
  EXECUTE PROCEDURE commons.tmsp_last_modification();

  -- Table: commons.project_vt

  CREATE TABLE commons.project_vt (LIKE commons.project);

  -- Trigger: versioning_trigger

  CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR UPDATE OR DELETE ON commons.project
  FOR EACH ROW EXECUTE PROCEDURE versioning(
    'sys_period', 'commons.project_vt', true
  );
  `;

  db.runSql(sql, callback);
};

exports.down = function(db, callback) {
  const sql = `
  DROP TABLE commons.project;
  DROP TABLE commons.project_vt;
  `;

  db.runSql(sql, callback);
};

exports._meta = {
  "version": 1
};
