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

  CREATE TABLE public.account
  (
    realm text,
    username text UNIQUE,
    password text NOT NULL,
    email text NOT NULL UNIQUE,
    emailverified boolean,
    verificationtoken text,
    id serial PRIMARY KEY
  )
  `
  db.runSql(sql, callback)

};

exports.down = function(db, callback) {
  const sql = `
  DROP TABLE public.account;
  `
  db.runSql(sql, callback)
};

exports._meta = {
  "version": 1
};
