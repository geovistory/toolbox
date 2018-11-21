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
    ALTER TABLE commons.class_field
    ADD COLUMN used_table TEXT;

    ALTER TABLE commons.class_field
    ADD COLUMN fk_system_type_ng_component INTEGER,
    ADD CONSTRAINT fk_system_type_ng_component_fkey FOREIGN KEY (fk_system_type_ng_component) REFERENCES commons.system_type (pk_entity);


    ALTER TABLE commons.class_field_vt
    ADD COLUMN used_table TEXT;

    ALTER TABLE commons.class_field_vt
    ADD COLUMN fk_system_type_ng_component INTEGER;
  `
  db.runSql(sql, callback)

};

exports.down = function (db, callback) {
  const sql = `
    ALTER TABLE commons.class_field
    DROP COLUMN used_table ;

    ALTER TABLE commons.class_field
    DROP COLUMN fk_system_type_ng_component;
  `
  db.runSql(sql, callback)
};


exports._meta = {
  "version": 1
};



