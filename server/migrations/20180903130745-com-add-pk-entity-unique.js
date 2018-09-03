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
  'system_type'
]

const createUpSql=(tablename)=> `
ALTER TABLE commons.${tablename} ADD CONSTRAINT ${tablename}_unique_pk_entity UNIQUE (pk_entity);
`

exports.up = function(db, callback) {
  
  const sql = tableNames.map(t=>createUpSql(t)).join('');

  db.runSql(sql, callback)

};


const createDownSql=(tablename)=> `
ALTER TABLE commons.${tablename} DROP CONSTRAINT ${tablename}_unique_pk_entity;
`

exports.down = function(db, callback) {

  const sql = tableNames.map(t=>createDownSql(t)).join('');

  db.runSql(sql, callback)
};


exports._meta = {
  "version": 1
};
