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
  ALTER TABLE information.persistent_item
  ADD CONSTRAINT fk_constraint_persistent_item_class
  FOREIGN KEY (fk_class)
  REFERENCES data_for_history.class (pk_class)
  MATCH FULL;
  `

  db.runSql(sql, callback)

};

exports.down = function(db, callback) {

  const sql = `
  ALTER TABLE information.persistent_item DROP CONSTRAINT fk_constraint_persistent_item_class
  `;

  db.runSql(sql, callback)

};

exports._meta = {
  "version": 1
};
