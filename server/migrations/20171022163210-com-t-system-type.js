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
  -- Table: commons.system_type

  CREATE TABLE commons.system_type
  (
    pk_entity integer,
    schema_name character varying,
    table_name character varying,
    pk_system_type serial PRIMARY KEY,
    st_schema_name character varying,
    st_table_name character varying,
    notes text,
    fk_creator integer,
    fk_last_modifier integer,
    tmsp_creation timestamp with time zone DEFAULT now(),
    tmsp_last_modification timestamp with time zone,
    sys_period tstzrange DEFAULT tstzrange(now(), NULL::timestamp with time zone)
  )
  INHERITS (commons.entity)
  WITH (
    OIDS = FALSE
  )
  TABLESPACE pg_default;

  ALTER TABLE commons.system_type
  OWNER to postgres;

  -- Trigger: creation_tmsp

  -- DROP TRIGGER creation_tmsp ON commons.system_type;

  CREATE TRIGGER creation_tmsp
  BEFORE INSERT
  ON commons.system_type
  FOR EACH ROW
  EXECUTE PROCEDURE commons.tmsp_creation();

  -- Trigger: insert_schema_table_name

  -- DROP TRIGGER insert_schema_table_name ON commons.system_type;

  CREATE TRIGGER insert_schema_table_name
  BEFORE INSERT
  ON commons.system_type
  FOR EACH ROW
  EXECUTE PROCEDURE commons.insert_schema_table_name();

  -- Trigger: last_modification_tmsp

  -- DROP TRIGGER last_modification_tmsp ON commons.system_type;

  CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE
  ON commons.system_type
  FOR EACH ROW
  EXECUTE PROCEDURE commons.tmsp_last_modification();

  -- Table: commons.system_type_vt

  CREATE TABLE commons.system_type_vt (LIKE commons.system_type);

  -- Trigger: versioning_trigger

  CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR UPDATE OR DELETE ON commons.system_type
  FOR EACH ROW EXECUTE PROCEDURE versioning(
    'sys_period', 'commons.system_type_vt', true
  );
  `;

  db.runSql(sql, callback);
};

exports.down = function(db, callback) {
  const sql = `
  DROP TABLE commons.system_type;
  DROP TABLE commons.system_type_vt;
  `;

  db.runSql(sql, callback);
};

exports._meta = {
  "version": 1
};
