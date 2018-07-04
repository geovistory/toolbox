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
  
  CREATE TABLE commons.ui_property_config (
    fk_ui_context integer NOT NULL,
    fk_project integer REFERENCES commons.project (pk_project),
    fk_property integer REFERENCES data_for_history.property (dfh_pk_property) NOT NULL,
    property_is_outgoing boolean NOT NULL,
    ord_num integer
  )
  INHERITS (commons.entity);

  Alter table commons.ui_property_config 
  ADD CONSTRAINT ui_property_config_unique_constraint UNIQUE (fk_ui_context, fk_project, fk_property, property_is_outgoing);

  CREATE TRIGGER creation_tmsp
  BEFORE INSERT
  ON commons.ui_property_config
  FOR EACH ROW
  EXECUTE PROCEDURE commons.tmsp_creation();

  CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE
  ON commons.ui_property_config
  FOR EACH ROW
  EXECUTE PROCEDURE commons.tmsp_last_modification();

  CREATE TRIGGER insert_schema_table_name BEFORE INSERT
  ON commons.ui_property_config FOR EACH ROW
  EXECUTE PROCEDURE commons.insert_schema_table_name();

  -- Trigger: create_entity_version_key

  CREATE TRIGGER create_entity_version_key
  BEFORE INSERT
  ON commons.ui_property_config
  FOR EACH ROW
  EXECUTE PROCEDURE commons.create_entity_version_key();

  -- Trigger: update_entity_version_key

  CREATE TRIGGER update_entity_version_key
  BEFORE UPDATE
  ON commons.ui_property_config
  FOR EACH ROW
  EXECUTE PROCEDURE commons.update_entity_version_key();

  -- versioning

  CREATE TABLE commons.ui_property_config_vt (LIKE commons.ui_property_config);

  CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR UPDATE OR DELETE ON commons.ui_property_config
  FOR EACH ROW EXECUTE PROCEDURE versioning(
    'sys_period', 'commons.ui_property_config_vt', true
  );
  `
  db.runSql(sql, callback)

};

exports.down = function(db, callback) {
  const sql = `
  DROP TABLE IF EXISTS commons.ui_property_config CASCADE;
  DROP TABLE IF EXISTS commons.ui_property_config_vt CASCADE;
  `
  db.runSql(sql, callback)
};


exports._meta = {
  "version": 1
};
