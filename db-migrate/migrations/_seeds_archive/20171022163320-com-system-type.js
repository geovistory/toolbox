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
  INSERT INTO commons.system_type (notes)
  VALUES
  ('label of entity')
  `;


  db.runSql(sql, callback);

};

exports.down = function(db, callback) {
  const sql = `
    TRUNCATE commons.system_type CASCADE;
  `;

  db.runSql(sql, callback);
};



exports._meta = {
  "version": 1
};
