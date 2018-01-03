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
  -- Table: commons.label

  CREATE TABLE commons.label
  (
    pk_entity integer,
    schema_name character varying,
    table_name character varying,
    fk_creator integer,
    fk_last_modifier integer,
    tmsp_creation timestamp with time zone DEFAULT now(),
    tmsp_last_modification timestamp with time zone,
    pk_label serial PRIMARY KEY,
    label text,
    fk_system_type integer,
    fk_language character(3) REFERENCES commons.language(pk_language),
    fk_entity integer,
    notes text,
    sys_period tstzrange DEFAULT tstzrange(now(), NULL::timestamp with time zone)
  )
  INHERITS (commons.entity)
  WITH (
    OIDS = FALSE
  )
  TABLESPACE pg_default;

  ALTER TABLE commons.label
  OWNER to postgres;

  -- Trigger: creation_tmsp

  CREATE TRIGGER creation_tmsp
  BEFORE INSERT
  ON commons.label
  FOR EACH ROW
  EXECUTE PROCEDURE commons.tmsp_creation();

  -- Trigger: insert_schema_table_name

  CREATE TRIGGER insert_schema_table_name
  BEFORE INSERT
  ON commons.label
  FOR EACH ROW
  EXECUTE PROCEDURE commons.insert_schema_table_name();

  -- Trigger: last_modification_tmsp

  CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE
  ON commons.label
  FOR EACH ROW
  EXECUTE PROCEDURE commons.tmsp_last_modification();

  -- Table: commons.label_vt

  CREATE TABLE commons.label_vt (LIKE commons.label);

  -- Trigger: versioning_trigger

  CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR UPDATE OR DELETE ON commons.label
  FOR EACH ROW EXECUTE PROCEDURE versioning(
    'sys_period', 'commons.label_vt', true
  );
  `;

  db.runSql(sql, callback);
};

exports.down = function(db, callback) {
  const sql = `
  DROP TABLE commons.label;
  DROP TABLE commons.label_vt;
  `;

  db.runSql(sql, callback);
};

exports._meta = {
  "version": 1
};
