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
  CREATE FOREIGN TABLE che.v_api_property_all_profile_project(
    has_domain integer NULL,
    has_range integer NULL,
    identifier_in_namespace text NULL COLLATE pg_catalog."default",
    pk_property integer NULL,
    pk_inherited_property integer NULL,
    standard_label character varying NULL COLLATE pg_catalog."default",
    root_namespace text NULL COLLATE pg_catalog."default",
    pk_profile integer NULL,
    profile_label character varying NULL COLLATE pg_catalog."default",
    pk_project integer NULL,
    project_label character varying NULL COLLATE pg_catalog."default"
  )
  SERVER dfh_publi
  OPTIONS (schema_name 'api', table_name 'v_property_all_profile_project');
  `

  db.runSql(sql, callback)

};

exports.down = function(db, callback) {

  const sql = `
  DROP FOREIGN TABLE che.v_api_property_all_profile_project;
  `

  db.runSql(sql, callback)

};

exports._meta = {
  "version": 1
};
