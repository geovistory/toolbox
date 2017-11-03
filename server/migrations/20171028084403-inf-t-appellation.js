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
    pk_entity integer,
    schema_name character varying,
    table_name character varying,
    pk_appellation serial PRIMARY KEY,
    appellation_label jsonb,
    fk_class VARCHAR(7) REFERENCES data_for_history.class (data_for_history_id),
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

  ALTER TABLE information.appellation
  OWNER to postgres;

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
  BEFORE INSERT
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
