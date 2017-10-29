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
  -- Table: information.dating

  CREATE TABLE information.dating
  (
    pk_entity integer,
    schema_name character varying,
    table_name character varying,
    pk_dating serial PRIMARY KEY,
    date_iso_value jsonb,
    comment text,
    fk_system_type integer,
    notes text,
    fk_creator integer,
    fk_last_modifier integer,
    tmsp_creation timestamp with time zone DEFAULT now(),
    tmsp_last_modification timestamp with time zone,
    sys_period tstzrange DEFAULT tstzrange(now(), NULL::timestamp with time zone)
  )
  INHERITS (information.entity)
  WITH (
    OIDS = FALSE
  )
  TABLESPACE pg_default;

  ALTER TABLE information.dating
  OWNER to postgres;

  -- Trigger: creation_tmsp

  CREATE TRIGGER creation_tmsp
  BEFORE INSERT
  ON information.dating
  FOR EACH ROW
  EXECUTE PROCEDURE commons.tmsp_creation();

  -- Trigger: insert_schema_table_name

  -- DROP TRIGGER insert_schema_table_name ON information.dating;

  CREATE TRIGGER insert_schema_table_name
  BEFORE INSERT
  ON information.dating
  FOR EACH ROW
  EXECUTE PROCEDURE commons.insert_schema_table_name();

  -- Trigger: last_modification_tmsp

  -- DROP TRIGGER last_modification_tmsp ON information.dating;

  CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT
  ON information.dating
  FOR EACH ROW
  EXECUTE PROCEDURE commons.tmsp_last_modification();

  -- Table: information.dating_vt

  CREATE TABLE information.dating_vt (LIKE information.dating);

  -- Trigger: versioning_trigger

  CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR UPDATE OR DELETE ON information.dating
  FOR EACH ROW EXECUTE PROCEDURE versioning(
    'sys_period', 'information.dating_vt', true
  );
  `
  db.runSql(sql, callback)

};

exports.down = function(db, callback) {
  const sql = `
  DROP TABLE information.dating;

  DROP TABLE information.dating_vt;
  `
  db.runSql(sql, callback)
};

exports._meta = {
  "version": 1
};
