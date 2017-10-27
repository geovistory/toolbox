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
  CREATE TABLE public.accesstoken
  (
    id text PRIMARY KEY,
    ttl integer DEFAULT 1209600,
    scopes text,
    created timestamp with time zone,
    userid integer REFERENCES account (id)
  );
  `
  db.runSql(sql, callback)

};

exports.down = function(db, callback) {
  const sql = `
  DROP TABLE public.accesstoken;
  `
  db.runSql(sql, callback)
};

exports._meta = {
  "version": 1
};
