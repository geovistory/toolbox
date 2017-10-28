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
  //TODO decide if the REFERERENCED cols should have a ON DELETE Action
  // see: https://www.postgresql.org/docs/current/static/ddl-constraints.html
  const sql = `
  CREATE TABLE public.rolemapping
  (
      id serial PRIMARY KEY,
      principaltype text,
      principalid text,
      roleid integer REFERENCES public.role (id)
  )
  `
  db.runSql(sql, callback)

};

exports.down = function(db, callback) {
  const sql = `
  DROP TABLE public.rolemapping;
  `
  db.runSql(sql, callback)
};

exports._meta = {
  "version": 1
};
