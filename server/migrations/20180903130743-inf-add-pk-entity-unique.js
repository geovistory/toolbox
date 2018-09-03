'use strict';

var dbm;
var type;
var seed;

exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

const tableNames = [
  'appellation',
  'chunk',
  'digital_object',
  'entity_association',
  'language',
  'persistent_item',
  'place',
  'role',
  'temporal_entity',
  'text_property',
  'time_primitive'
]

/**
 * This function adds a unique constraint to the column pk_entity
 * of the given tablename. The unique constraint will allow to
 * create foreign keys referencing on it and may improve performance 
 * on joins using pk_entity.
 * @param {*} tablename 
 */
const createUpSql=(tablename)=> `
ALTER TABLE information.${tablename} ADD CONSTRAINT ${tablename}_unique_pk_entity UNIQUE (pk_entity);
`

exports.up = function(db, callback) {
  
  const sql = tableNames.map(t=>createUpSql(t)).join('');

  db.runSql(sql, callback)

};


const createDownSql=(tablename)=> `
ALTER TABLE information.${tablename} DROP CONSTRAINT ${tablename}_unique_pk_entity;
`

exports.down = function(db, callback) {

  const sql = tableNames.map(t=>createDownSql(t)).join('');

  db.runSql(sql, callback)
};


exports._meta = {
  "version": 1
};
