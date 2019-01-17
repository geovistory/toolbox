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
  
  CREATE TABLE warehouse.entity_preview (
    pk_entity INTEGER,
    fk_project INTEGER,
    fk_class INTEGER,
    class_label varchar,
    entity_type varchar,
    type_label varchar,
    fk_type INTEGER,
    entity_label varchar,
    full_text varchar, 
    ts_vector tsvector,
    time_span jsonb,

    -- own_entity_label varchar,
    own_full_text varchar,
    fk_entity_label integer,
    related_full_texts jsonb
  );



  `

  db.runSql(sql, callback)

};

exports.down = function (db, callback) {

  const sql = `
  
  -- 1 
  DROP TABLE warehouse.entity_preview;

  `

  db.runSql(sql, callback)
};

exports._meta = {
  "version": 1
};
