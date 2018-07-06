'use strict';

var dbm;
var type;
var seed;

exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, callback) {
  const sql = `
  
  CREATE TABLE commons.property_set (
    label VARCHAR NOT NULL,
    description text
  )
  INHERITS (commons.entity);

  CREATE TRIGGER creation_tmsp
  BEFORE INSERT
  ON commons.property_set
  FOR EACH ROW
  EXECUTE PROCEDURE commons.tmsp_creation();

  CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE
  ON commons.property_set
  FOR EACH ROW
  EXECUTE PROCEDURE commons.tmsp_last_modification();

  CREATE TRIGGER insert_schema_table_name BEFORE INSERT
  ON commons.property_set FOR EACH ROW
  EXECUTE PROCEDURE commons.insert_schema_table_name();

  -- Trigger: create_entity_version_key

  CREATE TRIGGER create_entity_version_key
  BEFORE INSERT
  ON commons.property_set
  FOR EACH ROW
  EXECUTE PROCEDURE commons.create_entity_version_key();

  -- Trigger: update_entity_version_key

  CREATE TRIGGER update_entity_version_key
  BEFORE UPDATE
  ON commons.property_set
  FOR EACH ROW
  EXECUTE PROCEDURE commons.update_entity_version_key();

  -- versioning

  CREATE TABLE commons.property_set_vt (LIKE commons.property_set);

  CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR UPDATE OR DELETE ON commons.property_set
  FOR EACH ROW EXECUTE PROCEDURE versioning(
    'sys_period', 'commons.property_set_vt', true
  );

  `
  db.runSql(sql, callback)

};

exports.down = function(db, callback) {
  const sql = `
  DROP TABLE IF EXISTS commons.property_set CASCADE;
  DROP TABLE IF EXISTS commons.property_set_vt CASCADE;
  `
  db.runSql(sql, callback)
};


exports._meta = {
  "version": 1
};
