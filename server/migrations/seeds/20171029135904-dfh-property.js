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
  INSERT INTO data_for_history.property (data_for_history_id, notes)
  VALUES
  ('R63', 'Named'),
  ('R64', 'Used Name'),
  ('R61', 'Occured in kind of context')
  `;
  console.log(sql);

  db.runSql(sql, callback);

};

exports.down = function(db, callback) {
  const sql = `
  TRUNCATE data_for_history.property CASCADE;
  `;

  db.runSql(sql, callback);
};


exports._meta = {
  "version": 1
};
