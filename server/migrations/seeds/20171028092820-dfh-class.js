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
  INSERT INTO data_for_history.class (data_for_history_id, notes)
  VALUES
  ('E21', 'Person'),
  ('E82', 'Actor Appellation'),
  ('F52', 'Name Use Activity'),
  ('E56', 'Language')
  `;
  console.log(sql);

  db.runSql(sql, callback);

};

exports.down = function(db, callback) {
  const sql = `
  TRUNCATE data_for_history.class CASCADE;
  `;

  db.runSql(sql, callback);
};


exports._meta = {
  "version": 1
};
