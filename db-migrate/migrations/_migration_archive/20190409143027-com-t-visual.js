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
    CREATE TABLE commons.visual (
      name        VARCHAR,
      description VARCHAR,
      visual       JSONB,
      fk_project  INT
    )
    INHERITS (commons.entity);

    ALTER TABLE commons.visual ADD CONSTRAINT visual__unique_name_per_project UNIQUE (name, fk_project);

    SELECT commons.init_entity_child_table('commons.visual');
  `

  db.runSql(sql, callback)

};

exports.down = function (db, callback) {

  const sql = `
 
    DROP TABLE IF EXISTS commons.visual;
    DROP TABLE IF EXISTS commons.visual_vt;

    `

  db.runSql(sql, callback)
};

exports._meta = {
  "version": 1
};
