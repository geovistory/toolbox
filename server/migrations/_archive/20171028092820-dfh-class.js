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
  INSERT INTO data_for_history.class (dfh_pk_class, dfh_identifier_in_namespace, dfh_standard_label)
  VALUES
  (1, 'E21', 'Person'),
  (2, 'E82', 'Actor Appellation'),
  (3, 'F52', 'Name Use Activity'),
  (4, 'E56', 'Language'),
  (5, 'E67', 'Birth'),
  (335, 'E61', 'Time Primitive'),
  (22, 'E2', 'Temporal Entity')

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
