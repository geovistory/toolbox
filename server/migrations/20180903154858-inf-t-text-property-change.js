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
    ALTER TABLE information.text_property
    ADD COLUMN text_property_quill_doc jsonb;

    ALTER TABLE information.text_property_vt
    ADD COLUMN text_property_quill_doc jsonb;

    ALTER TABLE information.text_property 
    DROP COLUMN text_property_xml;

    ALTER TABLE information.text_property_vt 
    DROP COLUMN text_property_xml;

    `

  db.runSql(sql, callback)

};

exports.down = function (db, callback) {


  const sql = `

  ALTER TABLE information.text_property
  ADD COLUMN text_property_xml xml;

  ALTER TABLE information.text_property_vt
  ADD COLUMN text_property_xml xml;

  ALTER TABLE information.text_property 
  DROP COLUMN text_property_quill_doc;

  ALTER TABLE information.text_property_vt 
  DROP COLUMN text_property_quill_doc;
  `

  db.runSql(sql, callback)

};


exports._meta = {
  "version": 1
};
