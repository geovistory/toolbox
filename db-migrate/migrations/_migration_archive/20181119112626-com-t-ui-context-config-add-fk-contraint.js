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
    ALTER TABLE commons.ui_context_config
    ADD CONSTRAINT ui_context_config_fk_ui_context_fkey FOREIGN KEY (fk_ui_context) REFERENCES commons.ui_context (pk_entity);
  `
  db.runSql(sql, callback)

};

exports.down = function (db, callback) {
  const sql = `
    ALTER TABLE commons.ui_context_config
    DROP CONSTRAINT ui_context_config_fk_ui_context_fkey;
  `
  db.runSql(sql, callback)
};


exports._meta = {
  "version": 1
};



