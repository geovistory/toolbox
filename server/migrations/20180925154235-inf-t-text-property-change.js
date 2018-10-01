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

  -- drop own pk
  ALTER TABLE information.text_property DROP COLUMN pk_text_property;
  ALTER TABLE information.text_property_vt DROP COLUMN pk_text_property;

  -- drop xml field
  ALTER TABLE information.text_property DROP COLUMN text_property_xml;
  ALTER TABLE information.text_property_vt DROP COLUMN text_property_xml;

  -- add jsonb field
  ALTER TABLE information.text_property ADD COLUMN text_property_quill_doc JSONB;
  ALTER TABLE information.text_property_vt ADD COLUMN text_property_quill_doc JSONB;

  -- add fk system type fk-constraint
  ALTER TABLE information.text_property ADD CONSTRAINT text_property_fk_system_type_constraint FOREIGN KEY (fk_system_type) REFERENCES commons.system_type (pk_entity);

  -- fk language
  ALTER TABLE information.text_property DROP COLUMN fk_language;
  ALTER TABLE information.text_property_vt DROP COLUMN fk_language;
  ALTER TABLE information.text_property ADD COLUMN fk_language integer;
  ALTER TABLE information.text_property_vt ADD COLUMN fk_language integer;
  ALTER TABLE information.text_property ADD CONSTRAINT text_property_fk_language_constraint FOREIGN KEY (fk_language) REFERENCES information.language (pk_entity);

  -- fk concerned entity
  ALTER TABLE information.text_property RENAME COLUMN fk_entity TO fk_concerned_entity;
  ALTER TABLE information.text_property_vt RENAME COLUMN fk_entity TO fk_concerned_entity;  

  -- not null constraints
  ALTER TABLE information.text_property ALTER COLUMN fk_system_type SET NOT NULL;
  ALTER TABLE information.text_property ALTER COLUMN fk_language SET NOT NULL;
  ALTER TABLE information.text_property ALTER COLUMN fk_concerned_entity SET NOT NULL;
  ALTER TABLE information.text_property ALTER COLUMN text_property_quill_doc SET NOT NULL;

  -- unique identity contraint
  ALTER TABLE information.text_property ADD CONSTRAINT text_property_identity_unique UNIQUE (fk_system_type,fk_language,fk_concerned_entity,text_property_quill_doc);

  `
  db.runSql(sql, callback)

};

exports.down = function (db, callback) {
  const sql = `

  -- drop not null constraints
  ALTER TABLE information.text_property ALTER COLUMN fk_system_type DROP NOT NULL;
  ALTER TABLE information.text_property ALTER COLUMN fk_language DROP NOT NULL;
  ALTER TABLE information.text_property ALTER COLUMN fk_concerned_entity DROP NOT NULL;
  ALTER TABLE information.text_property ALTER COLUMN text_property_quill_doc DROP NOT NULL;

  -- add own pk
  ALTER TABLE information.text_property ADD COLUMN pk_text_property SERIAL PRIMARY KEY;
  ALTER TABLE information.text_property_vt ADD COLUMN pk_text_property INTEGER;

  -- add xml field
  ALTER TABLE information.text_property ADD COLUMN text_property_xml XML;
  ALTER TABLE information.text_property_vt ADD COLUMN text_property_xml XML;

  -- DROP jsonb field
  ALTER TABLE information.text_property DROP COLUMN text_property_quill_doc;
  ALTER TABLE information.text_property_vt DROP COLUMN text_property_quill_doc;

  -- drop fk system type fk-constraint
  ALTER TABLE information.text_property DROP CONSTRAINT text_property_fk_system_type_constraint;

  -- fk language
  ALTER TABLE information.text_property DROP COLUMN fk_language;
  ALTER TABLE information.text_property_vt DROP COLUMN fk_language;
  ALTER TABLE information.text_property ADD COLUMN fk_language character(3);
  ALTER TABLE information.text_property_vt ADD COLUMN fk_language character(3);

  -- fk concerned entity
  ALTER TABLE information.text_property RENAME COLUMN fk_concerned_entity TO fk_entity;
  ALTER TABLE information.text_property_vt RENAME COLUMN fk_concerned_entity TO fk_entity;
  ALTER TABLE information.text_property DROP CONSTRAINT text_property_fk_concerned_entity_constraint;
  
  `
  db.runSql(sql, callback)
};

exports._meta = {
  "version": 1
};
