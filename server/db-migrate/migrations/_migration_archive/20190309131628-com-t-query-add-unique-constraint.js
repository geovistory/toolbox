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
    ALTER TABLE commons.query ADD CONSTRAINT unique_name_per_project UNIQUE (name, fk_project);
  `

  db.runSql(sql, callback)

};

exports.down = function (db, callback) {

  const sql = `
 
    ALTER TABLE commons.query DROP CONSTRAINT unique_name_per_project;

    `

  db.runSql(sql, callback)
};

exports._meta = {
  "version": 1
};
