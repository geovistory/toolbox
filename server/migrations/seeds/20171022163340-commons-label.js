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
  INSERT INTO commons.label (label, fk_entity, fk_system_type, fk_language, notes)
  VALUES
  ('Senatoren', 1, 1, 'fra', 'Sample note')
  `;
  console.log(sql);

  db.runSql(sql, callback);

};

exports.down = function(db, callback) {
  const sql = `
    TRUNCATE commons.label CASCADE;
  `;

  db.runSql(sql, callback);
};

exports._meta = {
  "version": 1
};
