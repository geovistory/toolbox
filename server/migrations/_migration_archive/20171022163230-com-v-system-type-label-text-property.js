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
  CREATE OR REPLACE VIEW commons.v_system_type_label_text_property AS
  SELECT t1.pk_entity,
  t1.pk_system_type,
  t1.st_schema_name,
  t1.st_table_name,
  t2.label,
  t2.fk_language AS lang_label,
  t3.text_property,
  t3.fk_language AS lang_text_property
  FROM commons.system_type t1
  LEFT JOIN commons.label t2 ON t2.fk_entity = t1.pk_entity
  LEFT JOIN commons.text_property t3 ON t3.fk_entity = t1.pk_entity;
  `
  db.runSql(sql, callback)

};

exports.down = function(db, callback) {
  const sql = `
  DROP VIEW commons.v_system_type_label_text_property;
  `
  db.runSql(sql, callback)

};

exports._meta = {
  "version": 1
};
