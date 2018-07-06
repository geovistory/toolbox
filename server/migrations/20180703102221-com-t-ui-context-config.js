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
  
  CREATE TABLE commons.ui_context_config (
    fk_ui_context integer NOT NULL,
    fk_project integer REFERENCES commons.project (pk_project),
    fk_property integer REFERENCES data_for_history.property (dfh_pk_property),
    property_is_outgoing boolean,
    fk_property_set integer,
    ord_num integer
  )
  INHERITS (commons.entity);

  -- unique indexes instead of unique constraint because of nullable pk_project
  -- see: https://stackoverflow.com/questions/8289100/create-unique-constraint-with-null-columns
  CREATE UNIQUE INDEX ui_context_config_for_prop_and_proj_uni_idx ON commons.ui_context_config  (fk_ui_context, fk_project, fk_property, property_is_outgoing)
  WHERE fk_project IS NOT NULL;

  CREATE UNIQUE INDEX ui_context_config_for_prop_no_proj_uni_idx ON commons.ui_context_config  (fk_ui_context, fk_property, property_is_outgoing)
  WHERE fk_project IS NULL;

  CREATE UNIQUE INDEX ui_context_config_for_prop_set_and_proj_uni_idx ON commons.ui_context_config  (fk_ui_context, fk_project, fk_property_set)
  WHERE fk_project IS NOT NULL;

  CREATE UNIQUE INDEX ui_context_config_for_prop_set_no_proj_uni_idx ON commons.ui_context_config  (fk_ui_context, fk_property_set)
  WHERE fk_project IS NULL;


  CREATE TRIGGER creation_tmsp
  BEFORE INSERT
  ON commons.ui_context_config
  FOR EACH ROW
  EXECUTE PROCEDURE commons.tmsp_creation();

  CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE
  ON commons.ui_context_config
  FOR EACH ROW
  EXECUTE PROCEDURE commons.tmsp_last_modification();

  CREATE TRIGGER insert_schema_table_name BEFORE INSERT
  ON commons.ui_context_config FOR EACH ROW
  EXECUTE PROCEDURE commons.insert_schema_table_name();

  -- Trigger: create_entity_version_key

  CREATE TRIGGER create_entity_version_key
  BEFORE INSERT
  ON commons.ui_context_config
  FOR EACH ROW
  EXECUTE PROCEDURE commons.create_entity_version_key();

  -- Trigger: update_entity_version_key

  CREATE TRIGGER update_entity_version_key
  BEFORE UPDATE
  ON commons.ui_context_config
  FOR EACH ROW
  EXECUTE PROCEDURE commons.update_entity_version_key();

  -- versioning

  CREATE TABLE commons.ui_context_config_vt (LIKE commons.ui_context_config);

  CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR UPDATE OR DELETE ON commons.ui_context_config
  FOR EACH ROW EXECUTE PROCEDURE versioning(
    'sys_period', 'commons.ui_context_config_vt', true
  );
  `
  db.runSql(sql, callback)

};

exports.down = function(db, callback) {
  const sql = `
  DROP TABLE IF EXISTS commons.ui_context_config CASCADE;
  DROP TABLE IF EXISTS commons.ui_context_config_vt CASCADE;
  `
  db.runSql(sql, callback)
};


exports._meta = {
  "version": 1
};
