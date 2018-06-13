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
  CREATE EXTENSION IF NOT EXISTS postgis;
  CREATE EXTENSION IF NOT EXISTS postgis_topology;
  CREATE EXTENSION IF NOT EXISTS fuzzystrmatch;
  CREATE EXTENSION IF NOT EXISTS postgis_tiger_geocoder;
  `

  db.runSql(sql, callback)

};

exports.down = function (db, callback) {


  const sql = `
  DROP EXTENSION postgis_tiger_geocoder;
  DROP EXTENSION fuzzystrmatch;
  DROP EXTENSION postgis_topology;
  DROP EXTENSION postgis;
  `

  db.runSql(sql, callback)

};
exports._meta = {
  "version": 1
};
