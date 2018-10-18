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
      ALTER TABLE data_for_history.property
      ADD COLUMN identity_defining BOOLEAN DEFAULT false;

      ALTER TABLE data_for_history.property_vt
      ADD COLUMN identity_defining BOOLEAN;

      COMMENT ON COLUMN data_for_history.property.identity_defining IS 'If the value is set to true, this means that this property is relevant for the TeEn identity.';
      `
  db.runSql(sql, callback)

};

exports.down = function (db, callback) {
  const sql = `
      ALTER TABLE data_for_history.property
      DROP COLUMN identity_defining;

      ALTER TABLE data_for_history.property_vt
      DROP COLUMN identity_defining;
  `
  db.runSql(sql, callback)
};


exports._meta = {
  "version": 1
};
