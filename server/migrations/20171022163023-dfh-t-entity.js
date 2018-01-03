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
  CREATE TABLE data_for_history.entity
  (
    pk_entity  serial PRIMARY KEY,
    schema_name        varchar,
    table_name        varchar,
    entity_version integer,
    notes text,
    fk_creator integer,
    fk_last_modifier integer,
    tmsp_creation timestamp with time zone DEFAULT now(),
    tmsp_last_modification timestamp with time zone,
    sys_period tstzrange DEFAULT tstzrange(now(), NULL::timestamp with time zone)
  );
  `

  db.runSql(sql, callback)

};

exports.down = function(db, callback) {

  const sql = `
  DROP TABLE data_for_history.entity;
  `

  db.runSql(sql, callback)

};

exports._meta = {
  "version": 1
};
