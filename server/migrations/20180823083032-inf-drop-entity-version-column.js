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

// Array of tables that do not need versioning anymore
const tablesToModify = [
  'appellation',
  'dating',
  'entity_association',
  'language',
  'persistent_item',
  'role',
  'sourcing',
  'temporal_entity',
  'text_property'
]

const createSql = (tableName) =>{
  return `
    ALTER TABLE information.${tableName} 
      DROP COLUMN IF EXISTS entity_version CASCADE;
  `
}

exports.up = function (db, callback) {
  const sql1 = `
  
  -- Create backup col of entity_version column in table entity_version_project_rel
  ALTER TABLE information.entity_version_project_rel 
    ADD COLUMN entity_version_backup integer;

  -- Fill backup col
  UPDATE information.entity_version_project_rel SET entity_version_backup=entity_version;

  -- Remove histroy (irreversible)
  DELETE FROM information.entity_version_project_rel_vt;

  -- Drop Column entity_version of generic parent table 'entity'
  ALTER TABLE information.entity DROP COLUMN entity_version CASCADE;

  -- Drop inherited entity_version column of entity_version_project_rel
  ALTER TABLE information.entity_version_project_rel DROP COLUMN IF EXISTS entity_version;
  
  -- Rename a entity_version_backup to entity_version
  ALTER TABLE information.entity_version_project_rel 
    RENAME COLUMN entity_version_backup to entity_version;

  `
  const sql2 = tablesToModify.map(tableName => createSql(tableName)).join('');

  const sql = sql1 + sql2;

  db.runSql(sql, callback)

};

exports.down = function (db, callback) {
  const sql = `
  -- ADD Column entity_version of generic parent table 'entity'
  ALTER TABLE information.entity 
    ADD COLUMN entity_version integer;

  -- Fill default entity_version 1 where empty
  UPDATE information.entity 
    SET entity_version=1
    WHERE entity_version IS NULL;

  `
  db.runSql(sql, callback)
};


exports._meta = {
  "version": 1
};
