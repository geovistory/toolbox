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
  CREATE FOREIGN TABLE che.class
  (
    pk_class                 integer,
    identifier_in_namespace  text,
    fk_system_type           integer,
    standard_label           varchar(500)
  )

  SERVER dfh_publi OPTIONS (schema_name 'che',  table_name 'class') ;

  `

  db.runSql(sql, callback)

};

exports.down = function(db, callback) {

  const sql = `
  DROP FOREIGN TABLE che.class;
  `

  db.runSql(sql, callback)

};

exports._meta = {
  "version": 1
};
