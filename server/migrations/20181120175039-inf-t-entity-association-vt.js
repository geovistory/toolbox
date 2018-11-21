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
    ALTER TABLE information.entity_association_vt
    ALTER COLUMN fk_property SET DATA TYPE integer USING fk_property::integer;
  `
  db.runSql(sql, callback)

};

exports.down = function (db, callback) {
  const sql = `

  `
  db.runSql(sql, callback)
};


exports._meta = {
  "version": 1
};



