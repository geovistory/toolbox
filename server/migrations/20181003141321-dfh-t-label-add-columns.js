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
    ALTER TABLE data_for_history.label ADD COLUMN com_fk_system_type integer REFERENCES commons.system_type (pk_entity);
    ALTER TABLE data_for_history.label ADD COLUMN inf_fk_language integer REFERENCES information.language (pk_entity);
  `
  db.runSql(sql, callback)

};

exports.down = function (db, callback) {
  const sql = `
    ALTER TABLE data_for_history.label DROP COLUMN com_fk_system_type;
    ALTER TABLE data_for_history.label DROP COLUMN inf_fk_language;
  `
  db.runSql(sql, callback)
};


exports._meta = {
  "version": 1
};
