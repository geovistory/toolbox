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
 -- CREATE EXTENSION IF NOT EXISTS postgres_fdw;
 -- SELECT * FROM pg_extension;
--
 -- CREATE SERVER dfh_publi
 --     FOREIGN DATA WRAPPER postgres_fdw
 --     OPTIONS (host 'bhp-publi.ish-lyon.cnrs.fr', dbname 'crm_hist_extension', port '9375');
--
--
 -- --DROP USER MAPPING IF EXISTS FOR PUBLIC SERVER publi_dfh_profiles;
--
 -- CREATE USER MAPPING FOR postgres SERVER dfh_publi   -- FOR PUBLIC
 --     OPTIONS ("user" 'utilisateur_dfh', password 'ipo9X!L0w');
  `
  db.runSql(sql, callback)

};

exports.down = function(db, callback) {
  const sql = `
 -- DROP USER MAPPING FOR postgres SERVER dfh_publi;
--
 -- DROP USER MAPPING IF EXISTS FOR PUBLIC SERVER publi_dfh_profiles;
--
 -- DROP SERVER dfh_publi;
--
 -- DROP EXTENSION IF EXISTS postgres_fdw;
  `
  db.runSql(sql, callback)
};
exports._meta = {
  "version": 1
};
