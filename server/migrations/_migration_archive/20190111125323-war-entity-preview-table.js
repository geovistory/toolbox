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
  ------------------------------------------------------------------------------------------------------------
  -- TABLE that stores entity previews                                                                    #1
  ------------------------------------------------------------------------------------------------------------
  CREATE TABLE warehouse.entity_preview AS SELECT * FROM warehouse.v_entity_preview;
  ALTER TABLE warehouse.entity_preview ADD CONSTRAINT entity_preview_unique UNIQUE (pk_entity, project);

  `

  db.runSql(sql, callback)

};

exports.down = function (db, callback) {

  const sql = `
  
  -- 1 
  DROP TABLE warehouse.entity_preview CASCADE;

  `

  db.runSql(sql, callback)
};

exports._meta = {
  "version": 1
};
