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
    pk_entity_association serial PRIMARY KEY,
    fk_domain_entity integer,
    fk_range_entity integer,
    fk_property VARCHAR(7) REFERENCES data_for_history.property (data_for_history_id)
  )
  INHERITS (information.entity)
  WITH (
    OIDS = FALSE
  )
  TABLESPACE pg_default;

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
  BEFORE INSERT OR UPDATE
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

  -- Trigger: create_entity_version_key

  CREATE TRIGGER create_entity_version_key
  BEFORE INSERT
  ON information.entity_association
  FOR EACH ROW
  EXECUTE PROCEDURE commons.create_entity_version_key();

  -- Trigger: update_entity_version_key

  CREATE TRIGGER update_entity_version_key
  BEFORE UPDATE
  ON information.entity_association
  FOR EACH ROW
  EXECUTE PROCEDURE commons.update_entity_version_key();

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
