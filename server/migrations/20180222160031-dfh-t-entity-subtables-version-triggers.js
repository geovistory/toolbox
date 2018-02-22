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

  --------- class

  -- Trigger: create_entity_version_key

  CREATE TRIGGER create_entity_version_key
  BEFORE INSERT
  ON data_for_history.class
  FOR EACH ROW
  EXECUTE PROCEDURE commons.create_entity_version_key();

  -- Trigger: update_entity_version_key

  CREATE TRIGGER update_entity_version_key
  BEFORE UPDATE
  ON data_for_history.class
  FOR EACH ROW
  EXECUTE PROCEDURE commons.update_entity_version_key();


  --------- class_profile_view

  -- Trigger: create_entity_version_key

  CREATE TRIGGER create_entity_version_key
  BEFORE INSERT
  ON data_for_history.class_profile_view
  FOR EACH ROW
  EXECUTE PROCEDURE commons.create_entity_version_key();

  -- Trigger: update_entity_version_key

  CREATE TRIGGER update_entity_version_key
  BEFORE UPDATE
  ON data_for_history.class_profile_view
  FOR EACH ROW
  EXECUTE PROCEDURE commons.update_entity_version_key();


  --------- label

  -- Trigger: create_entity_version_key

  CREATE TRIGGER create_entity_version_key
  BEFORE INSERT
  ON data_for_history.label
  FOR EACH ROW
  EXECUTE PROCEDURE commons.create_entity_version_key();

  -- Trigger: update_entity_version_key

  CREATE TRIGGER update_entity_version_key
  BEFORE UPDATE
  ON data_for_history.label
  FOR EACH ROW
  EXECUTE PROCEDURE commons.update_entity_version_key();


  --------- property

  -- Trigger: create_entity_version_key

  CREATE TRIGGER create_entity_version_key
  BEFORE INSERT
  ON data_for_history.property
  FOR EACH ROW
  EXECUTE PROCEDURE commons.create_entity_version_key();

  -- Trigger: update_entity_version_key

  CREATE TRIGGER update_entity_version_key
  BEFORE UPDATE
  ON data_for_history.property
  FOR EACH ROW
  EXECUTE PROCEDURE commons.update_entity_version_key();


  --------- text_property

  -- Trigger: create_entity_version_key

  CREATE TRIGGER create_entity_version_key
  BEFORE INSERT
  ON data_for_history.text_property
  FOR EACH ROW
  EXECUTE PROCEDURE commons.create_entity_version_key();

  -- Trigger: update_entity_version_key

  CREATE TRIGGER update_entity_version_key
  BEFORE UPDATE
  ON data_for_history.text_property
  FOR EACH ROW
  EXECUTE PROCEDURE commons.update_entity_version_key();


  `

  db.runSql(sql, callback)

};

exports.down = function(db, callback) {

  const sql = `

  --------- class

  DROP TRIGGER create_entity_version_key ON data_for_history.class;
  DROP TRIGGER update_entity_version_key ON data_for_history.class;

  --------- class_profile_view

  DROP TRIGGER create_entity_version_key ON data_for_history.class_profile_view;
  DROP TRIGGER update_entity_version_key ON data_for_history.class_profile_view;

  --------- label

  DROP TRIGGER create_entity_version_key ON data_for_history.label;
  DROP TRIGGER update_entity_version_key ON data_for_history.label;

  --------- property

  DROP TRIGGER create_entity_version_key ON data_for_history.property;
  DROP TRIGGER update_entity_version_key ON data_for_history.property;

  --------- text_property

  DROP TRIGGER create_entity_version_key ON data_for_history.text_property;
  DROP TRIGGER update_entity_version_key ON data_for_history.text_property;

  `

  db.runSql(sql, callback)

};


exports._meta = {
  "version": 1
};