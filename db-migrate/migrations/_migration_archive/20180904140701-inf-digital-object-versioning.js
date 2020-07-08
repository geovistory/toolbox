'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db, callback) {
  const sql = `
  
  -- add entity_version column on table information.digital_object
  -------------------------------------------------------------------
  ALTER TABLE information.digital_object
    ADD COLUMN entity_version integer default 1;

  ALTER TABLE information.digital_object_vt
    ADD COLUMN entity_version integer;
  
  -- add triggers for entity_version key
  -------------------------------------------------------------------

  -- Trigger: create_entity_version_key

  CREATE TRIGGER create_entity_version_key
  BEFORE INSERT
  ON information.digital_object
  FOR EACH ROW
  EXECUTE PROCEDURE commons.create_entity_version_key();

  -- Trigger: update_entity_version_key

  CREATE TRIGGER update_entity_version_key
  BEFORE UPDATE
  ON information.digital_object
  FOR EACH ROW
  EXECUTE PROCEDURE commons.update_entity_version_key();

  -- create view with union of all versions
  -------------------------------------------------------------------
  
  `
  db.runSql(sql, callback)

};

exports.down = function (db, callback) {
  const sql = `
  -- remove entity_version column on table information.digital_object
  -------------------------------------------------------------------
  ALTER TABLE information.digital_object
    DROP COLUMN IF EXISTS entity_version;
  ALTER TABLE information.digital_object_vt
    DROP COLUMN IF EXISTS entity_version;

  
  -- remove triggers for entity_version key
  -------------------------------------------------------------------

  DROP TRIGGER create_entity_version_key
  ON information.digital_object;
  
  DROP TRIGGER update_entity_version_key
  ON information.digital_object;

  `
  db.runSql(sql, callback)
};


exports._meta = {
  "version": 1
};


