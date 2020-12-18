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

/**
 *  Function creates a sql statement that removes the versioning for
 * the table in schema information with given tableName
 * @param string name of table in schema information
*/
const createSqlStatementUp = (tableName) => {
  const upSql = `
  
  ----- ${tableName} -----
  
  -- Drop Trigger create_entity_version_key 
  DROP TRIGGER IF EXISTS create_entity_version_key ON information.${tableName};

  -- Drop Trigger update_entity_version_key 
  DROP TRIGGER IF EXISTS update_entity_version_key ON information.${tableName};

  `

  return upSql;
}

/**
 *  Function creates a sql statement that adds the versioning for
 * the table in schema information with given tableName
 * @param string name of table in schema information
*/
const createSqlStatementDown = (tableName) => {
  const downSql = `
  
  ----- ${tableName} -----

  -- Create Trigger create_entity_version_key
  CREATE TRIGGER create_entity_version_key
  BEFORE INSERT
  ON information.${tableName}
  FOR EACH ROW
  EXECUTE PROCEDURE commons.create_entity_version_key();

  -- Create Trigger update_entity_version_key
  CREATE TRIGGER update_entity_version_key
  BEFORE UPDATE
  ON information.${tableName}
  FOR EACH ROW
  EXECUTE PROCEDURE commons.update_entity_version_key();
  `

  return downSql;
}


exports.up = function (db, callback) {

  // Creates sql to modify all entity children tables listed in 'tablesToModify' 
  const sql = tablesToModify.map(tablename => createSqlStatementUp(tablename)).join('');

  db.runSql(sql, callback)

};

exports.down = function (db, callback) {

  // creates and concatenates piece of sql for each table in the array 'tablesToModify' 
  const sql = tablesToModify.map(tablename => createSqlStatementDown(tablename)).join('');

  db.runSql(sql, callback)
};
exports._meta = {
  "version": 1
};
