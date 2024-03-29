'use strict';

var dbm;
var type;
var seed;

exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db, callback) {
  const sql = `

  CREATE TABLE commons.ui_context (
    label VARCHAR NOT NULL,
    description text
  )
  INHERITS (commons.entity);

  CREATE TRIGGER creation_tmsp
  BEFORE INSERT
  ON commons.ui_context
  FOR EACH ROW
  EXECUTE PROCEDURE commons.tmsp_creation();

  CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE
  ON commons.ui_context
  FOR EACH ROW
  EXECUTE PROCEDURE commons.tmsp_last_modification();

  CREATE TRIGGER insert_schema_table_name BEFORE INSERT
  ON commons.ui_context FOR EACH ROW
  EXECUTE PROCEDURE commons.insert_schema_table_name();

  -- Trigger: create_entity_version_key

  CREATE TRIGGER create_entity_version_key
  BEFORE INSERT
  ON commons.ui_context
  FOR EACH ROW
  EXECUTE PROCEDURE commons.create_entity_version_key();

  -- Trigger: update_entity_version_key

  CREATE TRIGGER update_entity_version_key
  BEFORE UPDATE
  ON commons.ui_context
  FOR EACH ROW
  EXECUTE PROCEDURE commons.update_entity_version_key();

  -- versioning

  CREATE TABLE commons.ui_context_vt (LIKE commons.ui_context);

  CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR UPDATE OR DELETE ON commons.ui_context
  FOR EACH ROW EXECUTE PROCEDURE versioning(
    'sys_period', 'commons.ui_context_vt', true
  );


  insert into commons.ui_context (label, description)
  Values 
  ('View-Repo', 'In public, where data of all projects is shown'),
  ('View-Project', 'In public, where data of a project is shown'),
  ('Editable', 'In toolbox, where data of a project is shown and ready for editing. Applies also to the dropdown to add a property'),
  ('Create', 'In toolbox, when a entity (peIt or TeEn) is created'),
  ('Add', 'In toolbox, when a entity (peIt or TeEn) is being added to a project')
  `
  db.runSql(sql, callback)

};

exports.down = function (db, callback) {
  const sql = `
  DROP TABLE IF EXISTS commons.ui_context CASCADE;
  DROP TABLE IF EXISTS commons.ui_context_vt CASCADE;
  `
  db.runSql(sql, callback)
};


exports._meta = {
  "version": 1
};
