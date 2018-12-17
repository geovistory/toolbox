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
  CREATE FOREIGN TABLE che.v_api_property_profile_project
  (
    has_domain                 integer,
    has_range    integer,
    identifier_in_namespace  text,
    pk_property  integer,
    standard_label                           varchar,
    root_namespace text,
    pk_profile integer,
    profile_label varchar,
    pk_project integer,
    project_label varchar
  )

  SERVER dfh_publi OPTIONS (schema_name 'api',  table_name 'v_property_profile_project') ;

  `

  db.runSql(sql, callback)

};

exports.down = function(db, callback) {

  const sql = `
  DROP FOREIGN TABLE che.v_api_property_profile_project;
  `

  db.runSql(sql, callback)

};

exports._meta = {
  "version": 1
};
