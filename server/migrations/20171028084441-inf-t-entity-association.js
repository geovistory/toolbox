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
  -- Table: information.entity_association

  CREATE TABLE information.entity_association
  (
    pk_entity integer,
    schema_name character varying,
    table_name character varying,
    pk_entity_association serial PRIMARY KEY,
    fk_domain_entity integer,
    fk_range_entity integer,
    fk_property integer,
    notes text COLLATE pg_catalog."default",
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

  ALTER TABLE information.entity_association
  OWNER to postgres;

  -- Trigger: creation_tmsp

  CREATE TRIGGER creation_tmsp
  BEFORE INSERT
  ON information.entity_association
  FOR EACH ROW
  EXECUTE PROCEDURE commons.tmsp_creation();

  -- Trigger: insert_schema_table_name

  -- DROP TRIGGER insert_schema_table_name ON information.entity_association;

  CREATE TRIGGER insert_schema_table_name
  BEFORE INSERT
  ON information.entity_association
  FOR EACH ROW
  EXECUTE PROCEDURE commons.insert_schema_table_name();

  -- Trigger: last_modification_tmsp

  -- DROP TRIGGER last_modification_tmsp ON information.entity_association;

  CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT
  ON information.entity_association
  FOR EACH ROW
  EXECUTE PROCEDURE commons.tmsp_last_modification();


  -- Table: information.entity_association_vt

  CREATE TABLE information.entity_association_vt (LIKE information.entity_association);

  -- Trigger: versioning_trigger

  CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR UPDATE OR DELETE ON information.entity_association
  FOR EACH ROW EXECUTE PROCEDURE versioning(
    'sys_period', 'information.entity_association_vt', true
  );
  `
  db.runSql(sql, callback)

};

exports.down = function(db, callback) {
  const sql = `
  DROP TABLE information.entity_association;

  DROP TABLE information.entity_association_vt;
  `
  db.runSql(sql, callback)
};

exports._meta = {
  "version": 1
};
