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
  
  -- add view that unions all digital_object versions
  -------------------------------------------------------------------

  CREATE OR REPLACE VIEW information.v_digital_object_version AS
    SELECT *, concat((v.pk_entity || '_'::text) || v.entity_version) AS pk_entity_version_concat FROM information.digital_object as v
    UNION ALL
    SELECT *, concat((v.pk_entity || '_'::text) || v.entity_version) AS pk_entity_version_concat FROM information.digital_object_vt as v;




   
  
  -- add trigger instead of insert or update
  -------------------------------------------------------------------

  -- create trigger function for insert

  CREATE FUNCTION information.v_digital_object_version_insert()
  RETURNS trigger
  LANGUAGE 'plpgsql'
  AS $BODY$
  DECLARE
    resulting_concat_pk text;
      resulting_row information.v_digital_object_version; 
  BEGIN
  -- if there is a pk_entity, update the existing entity
  IF (NEW.pk_entity IS NOT NULL) THEN

  UPDATE information.digital_object SET
  notes = NEW.notes,
  js_quill_data = NEW.js_quill_data
  WHERE pk_entity = NEW.pk_entity
  RETURNING concat(pk_entity || '_' || entity_version)::text as pk_entity_version_concat INTO resulting_concat_pk;

  -- else if there is no pk_entity, insert a new entity
  ELSE

  INSERT INTO information.digital_object (notes, js_quill_data)
  VALUES(NEW.notes, NEW.js_quill_data)
  RETURNING concat(pk_entity || '_' || entity_version)::text as pk_entity_version_concat INTO resulting_concat_pk;

  END IF;

  -- in both cases return the pk_entity_version_concat, so that one can query the new version in the view
  SELECT * FROM INTO resulting_row information.v_digital_object_version where pk_entity_version_concat = resulting_concat_pk;
  
  RETURN resulting_row;
  END;

  $BODY$;


  -- create trigger on insert

  CREATE TRIGGER on_insert
  INSTEAD OF INSERT
  ON information.v_digital_object_version
  FOR EACH ROW
  EXECUTE PROCEDURE information.v_digital_object_version_insert();

  
  `
  db.runSql(sql, callback)

};

exports.down = function (db, callback) {
  const sql = `
  -- remove entity_version column on table information.digital_object
  -------------------------------------------------------------------
  DROP VIEW IF EXISTS information.v_digital_object_version;

  
  -- remove triggers for entity_version key
  -------------------------------------------------------------------
  DROP TRIGGER IF EXISTS on_insert ON information.v_digital_object_version;
  DROP FUNCTION information.v_digital_object_version_insert();

  `
  db.runSql(sql, callback)
};


exports._meta = {
  "version": 1
};


