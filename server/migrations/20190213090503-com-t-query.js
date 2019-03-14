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


exports.up = function (db, callback) {

  const sql = `
    CREATE TABLE commons.query (
      name        VARCHAR,
      description VARCHAR,
      query       JSONB,
      fk_project  INT
    )
    INHERITS (commons.entity);
    
    SELECT commons.init_entity_child_table('commons.query');
  `

  db.runSql(sql, callback)

};

exports.down = function (db, callback) {

  const sql = `
 
    DROP TABLE IF EXISTS commons.query;
    DROP TABLE IF EXISTS commons.query_vt;

    `

  db.runSql(sql, callback)
};

exports._meta = {
  "version": 1
};
