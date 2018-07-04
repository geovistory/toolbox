'use strict';

var dbm;
var type;
var seed;

exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, callback) {
  const sql = `
  
  CREATE TABLE commons.ui_class_config (
    fk_ui_context integer NOT NULL,
    fk_project integer REFERENCES commons.project (pk_project),
    fk_class integer REFERENCES data_for_history.class (dfh_pk_class) NOT NULL,
    fk_target_ui_context integer NOT NULL,
    ord_num integer
  )
  INHERITS (commons.entity);

  CREATE TRIGGER creation_tmsp
  BEFORE INSERT
  ON commons.ui_class_config
  FOR EACH ROW
  EXECUTE PROCEDURE commons.tmsp_creation();

  CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE
  ON commons.ui_class_config
  FOR EACH ROW
  EXECUTE PROCEDURE commons.tmsp_last_modification();

  CREATE TRIGGER insert_schema_table_name BEFORE INSERT
  ON commons.ui_class_config FOR EACH ROW
  EXECUTE PROCEDURE commons.insert_schema_table_name();

  -- Trigger: create_entity_version_key

  CREATE TRIGGER create_entity_version_key
  BEFORE INSERT
  ON commons.ui_class_config
  FOR EACH ROW
  EXECUTE PROCEDURE commons.create_entity_version_key();

  -- Trigger: update_entity_version_key

  CREATE TRIGGER update_entity_version_key
  BEFORE UPDATE
  ON commons.ui_class_config
  FOR EACH ROW
  EXECUTE PROCEDURE commons.update_entity_version_key();

  -- versioning

  CREATE TABLE commons.ui_class_config_vt (LIKE commons.ui_class_config);

  CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR UPDATE OR DELETE ON commons.ui_class_config
  FOR EACH ROW EXECUTE PROCEDURE versioning(
    'sys_period', 'commons.ui_class_config_vt', true
  );
  `
  db.runSql(sql, callback)

};

exports.down = function(db, callback) {
  const sql = `
  DROP TABLE IF EXISTS commons.ui_class_config CASCADE;
  DROP TABLE IF EXISTS commons.ui_class_config_vt CASCADE;
  `
  db.runSql(sql, callback)
};


exports._meta = {
  "version": 1
};
