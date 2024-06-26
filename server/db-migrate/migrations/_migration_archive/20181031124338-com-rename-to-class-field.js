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

      -- rename tables (replace property_set with class_field)
      
      DROP TRIGGER versioning_trigger ON commons.property_set;

      ALTER TABLE commons.property_set
      RENAME TO class_field;

      ALTER TABLE commons.property_set_vt
      RENAME TO class_field_vt;

      CREATE TRIGGER versioning_trigger
      BEFORE INSERT OR DELETE OR UPDATE 
      ON commons.class_field
      FOR EACH ROW
      EXECUTE PROCEDURE public.versioning('sys_period', 'commons.class_field_vt', 'true');


      DROP TRIGGER versioning_trigger ON commons.property_set_property_rel;

      ALTER TABLE commons.property_set_property_rel
      RENAME TO class_field_property_rel;
      
      ALTER TABLE commons.property_set_property_rel_vt
      RENAME TO class_field_property_rel_vt;

      CREATE TRIGGER versioning_trigger
      BEFORE INSERT OR DELETE OR UPDATE 
      ON commons.class_field_property_rel
      FOR EACH ROW
      EXECUTE PROCEDURE public.versioning('sys_period', 'commons.class_field_property_rel_vt', 'true');

    
      -- rename columns accordingly
      
      ALTER TABLE commons.ui_context_config
      RENAME COLUMN fk_property_set TO fk_class_field;

      ALTER TABLE commons.ui_context_config_vt
      RENAME COLUMN fk_property_set TO fk_class_field;

      ALTER TABLE commons.ui_context_config
      RENAME COLUMN fk_class_for_property_set TO fk_class_for_class_field;
      
      ALTER TABLE commons.ui_context_config_vt
      RENAME COLUMN fk_class_for_property_set TO fk_class_for_class_field;

      ALTER TABLE commons.class_field_property_rel
      RENAME COLUMN fk_property_set TO fk_class_field;

      ALTER TABLE commons.class_field_property_rel_vt
      RENAME COLUMN fk_property_set TO fk_class_field;

      `
  db.runSql(sql, callback)

};

exports.down = function (db, callback) {
  const sql = `

      
  -- rename columns accordingly
      
  ALTER TABLE commons.ui_context_config
  RENAME COLUMN fk_class_field TO fk_property_set;

  ALTER TABLE commons.ui_context_config_vt
  RENAME COLUMN fk_class_field TO fk_property_set;

  ALTER TABLE commons.ui_context_config
  RENAME COLUMN fk_class_for_class_field TO fk_class_for_property_set;

  ALTER TABLE commons.ui_context_config_vt
  RENAME COLUMN fk_class_for_class_field TO fk_class_for_property_set;

  ALTER TABLE commons.class_field_property_rel
  RENAME COLUMN fk_class_field TO fk_property_set;

  ALTER TABLE commons.class_field_property_rel_vt
  RENAME COLUMN fk_class_field TO fk_property_set;

  -- rename tables 

  DROP TRIGGER versioning_trigger ON commons.class_field;

  ALTER TABLE commons.class_field
  RENAME TO property_set;

  ALTER TABLE commons.class_field_vt
  RENAME TO property_set_vt;

  CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR DELETE OR UPDATE 
  ON commons.property_set
  FOR EACH ROW
  EXECUTE PROCEDURE public.versioning('sys_period', 'commons.property_set_vt', 'true');


  DROP TRIGGER versioning_trigger ON commons.class_field_property_rel;

  ALTER TABLE commons.class_field_property_rel
  RENAME TO property_set_property_rel;
  
  ALTER TABLE commons.class_field_property_rel_vt
  RENAME TO property_set_property_rel_vt;

  CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR DELETE OR UPDATE 
  ON commons.property_set_property_rel
  FOR EACH ROW
  EXECUTE PROCEDURE public.versioning('sys_period', 'commons.property_set_property_rel_vt', 'true');
  `
  db.runSql(sql, callback)
};


exports._meta = {
  "version": 1
};
