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
  -- Table: commons.text_property

  CREATE TABLE commons.text_property
  (
    pk_entity integer,
    schema_name character varying,
    table_name character varying,
    pk_text_property serial PRIMARY KEY,
    text_property text,
    text_property_xml xml,
    fk_system_type integer,
    fk_language character(3) REFERENCES commons.language (pk_language),
    fk_entity integer,
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

  ALTER TABLE commons.text_property
  OWNER to postgres;

  -- Trigger: creation_tmsp

  -- DROP TRIGGER creation_tmsp ON commons.text_property;

  CREATE TRIGGER creation_tmsp
  BEFORE INSERT
  ON commons.text_property
  FOR EACH ROW
  EXECUTE PROCEDURE commons.tmsp_creation();

  -- Trigger: insert_schema_table_name

  -- DROP TRIGGER insert_schema_table_name ON commons.text_property;

  CREATE TRIGGER insert_schema_table_name
  BEFORE INSERT
  ON commons.text_property
  FOR EACH ROW
  EXECUTE PROCEDURE commons.insert_schema_table_name();

  -- Trigger: last_modification_tmsp

  -- DROP TRIGGER last_modification_tmsp ON commons.text_property;

  CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE
  ON commons.text_property
  FOR EACH ROW
  EXECUTE PROCEDURE commons.tmsp_last_modification();

  -- Table: commons.text_property_vt

  CREATE TABLE commons.text_property_vt (LIKE commons.text_property);

  -- Trigger: versioning_trigger

  CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR UPDATE OR DELETE ON commons.text_property
  FOR EACH ROW EXECUTE PROCEDURE versioning(
    'sys_period', 'commons.text_property_vt', true
  );  `;

  db.runSql(sql, callback);
};

exports.down = function(db, callback) {
  const sql = `
   DROP TABLE commons.text_property;
   DROP TABLE commons.text_property_vt;
  `;

  db.runSql(sql, callback);
};

exports._meta = {
  "version": 1
};
