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
  CREATE TABLE commons.entity
  (
    pk_entity serial PRIMARY KEY,
    schema_name character varying COLLATE pg_catalog."default",
    table_name character varying COLLATE pg_catalog."default"
    );
  `;

  db.runSql(sql, callback);
};

exports.down = function(db, callback) {
  const sql = `
  DROP TABLE commons.entity;
  `;

  db.runSql(sql, callback);
};

exports._meta = {
  "version": 1
};
