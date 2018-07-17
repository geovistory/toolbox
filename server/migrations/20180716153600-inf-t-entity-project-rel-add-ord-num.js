'use strict';

var dbm;
var type;
var seed;

exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, callback) {
  const sql = `
  
  Alter TABLE information.entity_version_project_rel 
  ADD COLUMN ord_num integer;

  `
  db.runSql(sql, callback)

};

exports.down = function(db, callback) {
  const sql = `
  Alter TABLE information.entity_version_project_rel 
  DROP COLUMN ord_num;
  `
  db.runSql(sql, callback)
};


exports._meta = {
  "version": 1
};
