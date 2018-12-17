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
  --CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;
  --COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';
--
  --CREATE EXTENSION IF NOT EXISTS temporal_tables WITH SCHEMA public;
  --COMMENT ON EXTENSION temporal_tables IS 'temporal tables';
  `;

  db.runSql(sql, callback)
};

exports.down = function(db, callback) {
  const sql = `
  DROP EXTENSION plpgsql;
  DROP EXTENSION temporal_tables;
  `;

  db.runSql(sql, callback)
};

exports._meta = {
  "version": 1
};
