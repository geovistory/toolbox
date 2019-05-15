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
  CREATE TYPE calendar_type AS ENUM ('gregorian', 'julian');

  ALTER TABLE information.entity_version_project_rel 
  ADD COLUMN calendar calendar_type;


  -- versioning

  ALTER TABLE  information.entity_version_project_rel_vt 
  ADD COLUMN calendar calendar_type;

  `

  db.runSql(sql, callback)

};

exports.down = function(db, callback) {

  const sql = `
  ALTER TABLE information.entity_version_project_rel 
  DROP COLUMN calendar;
  
  -- versioning
  
  ALTER TABLE  information.entity_version_project_rel_vt 
  DROP COLUMN calendar;
  
  -- type
  
  DROP TYPE calendar_type;

  `

  db.runSql(sql, callback)

};


exports._meta = {
  "version": 1
};
