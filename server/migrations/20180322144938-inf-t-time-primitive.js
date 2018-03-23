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
  -- Table: information.time_primitive

  CREATE TYPE calendar_granularities AS ENUM ('1 year', '1 month', '1 day', '1 hour', '1 minute', '1 second');

  CREATE TABLE information.time_primitive
  (
    pk_time_primitive serial PRIMARY KEY,
    begin TIMESTAMP WITHOUT TIME ZONE,
    duration calendar_granularities,
    fk_class integer REFERENCES data_for_history.class (dfh_pk_class)
  )
  INHERITS (information.entity);

  -- Trigger: creation_tmsp

  CREATE TRIGGER creation_tmsp
  BEFORE INSERT
  ON information.time_primitive
  FOR EACH ROW
  EXECUTE PROCEDURE commons.tmsp_creation();

  -- Trigger: insert_schema_table_name

  CREATE TRIGGER insert_schema_table_name
  BEFORE INSERT
  ON information.time_primitive
  FOR EACH ROW
  EXECUTE PROCEDURE commons.insert_schema_table_name();

  -- Trigger: last_modification_tmsp

  CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE
  ON information.time_primitive
  FOR EACH ROW
  EXECUTE PROCEDURE commons.tmsp_last_modification();

  -- Table: information.time_primitive_vt

  CREATE TABLE information.time_primitive_vt (LIKE information.time_primitive);

  -- Trigger: versioning_trigger

  CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR UPDATE OR DELETE ON information.time_primitive
  FOR EACH ROW EXECUTE PROCEDURE versioning(
    'sys_period', 'information.time_primitive_vt', true
  );

  -- Trigger: create_entity_version_key

  CREATE TRIGGER create_entity_version_key
  BEFORE INSERT
  ON information.time_primitive
  FOR EACH ROW
  EXECUTE PROCEDURE commons.create_entity_version_key();

  -- Trigger: update_entity_version_key

  CREATE TRIGGER update_entity_version_key
  BEFORE UPDATE
  ON information.time_primitive
  FOR EACH ROW
  EXECUTE PROCEDURE commons.update_entity_version_key();

  `

  db.runSql(sql, callback)

};

exports.down = function(db, callback) {

  const sql = `
  DROP TABLE information.time_primitive;

  DROP TABLE information.time_primitive_vt;

  DROP TYPE calendar_granularities;
  `

  db.runSql(sql, callback)

};

exports._meta = {
  "version": 1
};
