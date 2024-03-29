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
  
  CREATE TABLE commons.property_set_property_rel (
    fk_property_set integer REFERENCES commons.property_set (pk_entity),
    fk_property integer REFERENCES data_for_history.property (dfh_pk_property),
    property_is_outgoing BOOLEAN,
    ord_num INTEGER
    )
    INHERITS (commons.entity);

  ALTER TABLE commons.property_set_property_rel ADD CONSTRAINT commons_property_set_property_rel_pk_entity_unique UNIQUE (pk_entity);
  
  COMMENT ON TABLE commons.property_set_property_rel IS 'This table stores, what properties are bundled in the property set';
  COMMENT ON COLUMN commons.property_set_property_rel.fk_property IS 'The property belonging to the property set';
  COMMENT ON COLUMN commons.property_set_property_rel.fk_property_set IS 'The property set';
  COMMENT ON COLUMN commons.property_set_property_rel.property_is_outgoing IS 'Wether the property is outgoing, seen from the class that will use it';
  COMMENT ON COLUMN commons.property_set_property_rel.ord_num IS 'The order number of the property within the property set.';

  CREATE TRIGGER creation_tmsp
  BEFORE INSERT
  ON commons.property_set_property_rel
  FOR EACH ROW
  EXECUTE PROCEDURE commons.tmsp_creation();

  CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE
  ON commons.property_set_property_rel
  FOR EACH ROW
  EXECUTE PROCEDURE commons.tmsp_last_modification();

  CREATE TRIGGER insert_schema_table_name BEFORE INSERT
  ON commons.property_set_property_rel FOR EACH ROW
  EXECUTE PROCEDURE commons.insert_schema_table_name();

  -- Trigger: create_entity_version_key

  CREATE TRIGGER create_entity_version_key
  BEFORE INSERT
  ON commons.property_set_property_rel
  FOR EACH ROW
  EXECUTE PROCEDURE commons.create_entity_version_key();

  -- Trigger: update_entity_version_key

  CREATE TRIGGER update_entity_version_key
  BEFORE UPDATE
  ON commons.property_set_property_rel
  FOR EACH ROW
  EXECUTE PROCEDURE commons.update_entity_version_key();

  -- versioning

  CREATE TABLE commons.property_set_property_rel_vt (LIKE commons.property_set_property_rel);

  CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR UPDATE OR DELETE ON commons.property_set_property_rel
  FOR EACH ROW EXECUTE PROCEDURE versioning(
    'sys_period', 'commons.property_set_property_rel_vt', true
  );

--  Insert into commons.property_set_property_rel ("fk_property_set","fk_property", "property_is_outgoing")
--  VALUES 
--  (48, 71, true),
--  (48, 72, true),
--  (48, 150, true),
--  (48, 151, true),
--  (48, 152, true),
--  (48, 153, true);
  `
  db.runSql(sql, callback)

};

exports.down = function (db, callback) {
  const sql = `
  DROP TABLE IF EXISTS commons.property_set_property_rel CASCADE;
  DROP TABLE IF EXISTS commons.property_set_property_rel_vt CASCADE;
  `
  db.runSql(sql, callback)
};


exports._meta = {
  "version": 1
};
