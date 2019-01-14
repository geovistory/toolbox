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
  ------------------------------------------------------------------------------------------------------------
  -- TABLE that stores class previews (with label)                                                        #1
  ------------------------------------------------------------------------------------------------------------
  
  CREATE TABLE warehouse.class_preview AS SELECT * FROM  information.v_class_preview;
  ALTER TABLE warehouse.class_preview ADD CONSTRAINT dfh_pk_class_unique UNIQUE (dfh_pk_class);
  
  ------------------------------------------------------------------------------------------------------------
  -- TRIGGER FUNCTION update_class_preview__on_label_upsert                                               #2
  ------------------------------------------------------------------------------------------------------------
  CREATE FUNCTION warehouse.update_class_preview__on_label_upsert()
  RETURNS trigger LANGUAGE 'plpgsql' AS $BODY$ BEGIN

  
  -- If it is a geovistory class label
  IF ( NEW.dfh_fk_class IS NOT NULL AND NEW.com_fk_system_type = 184) THEN
  
    UPDATE warehouse.class_preview
    SET class_label = NEW.dfh_label
    WHERE dfh_pk_class = NEW.dfh_fk_class;
    
  END IF;

  RETURN NEW;

  END;
  $BODY$;

  ------------------------------------------------------------------------------------------------------------
  -- TRIGGER FUNCTION update_class_preview__on_label_delete                                                #3
  ------------------------------------------------------------------------------------------------------------
  CREATE FUNCTION warehouse.update_class_preview__on_label_delete()
  RETURNS trigger LANGUAGE 'plpgsql' AS $BODY$ BEGIN

  -- If it is a geovistory class label
  IF (OLD.dfh_fk_class IS NOT NULL AND OLD.com_fk_system_type = 184) THEN

    UPDATE warehouse.class_preview
    SET class_label = (
      SELECT dfh_standard_label 
      FROM data_for_history.class
      WHERE dfh_pk_class = OLD.dfh_fk_class
      )
    WHERE dfh_pk_class = OLD.dfh_fk_class;

  END IF;

  RETURN OLD;

  END;
  $BODY$;


  ------------------------------------------------------------------------------------------------------------
  -- TRIGGER after_insert_or_update                                                                        #4
  ------------------------------------------------------------------------------------------------------------

  CREATE TRIGGER after_insert_or_update
    AFTER INSERT OR UPDATE
    ON data_for_history.label
    FOR EACH ROW
    EXECUTE PROCEDURE warehouse.update_class_preview__on_label_upsert();


  ------------------------------------------------------------------------------------------------------------
  -- TRIGGER after_delete                                                                                  #5
  ------------------------------------------------------------------------------------------------------------
  
  CREATE TRIGGER after_delete
    AFTER DELETE
    ON data_for_history.label
    FOR EACH ROW
    EXECUTE PROCEDURE warehouse.update_class_preview__on_label_delete();

  ------------------------------------------------------------------------------------------------------------
  -- TRIGGER AND TRIGGER FUNCTION update_class_preview__on_class_profile_view_upsert                      #6
  ------------------------------------------------------------------------------------------------------------
  CREATE FUNCTION warehouse.update_class_preview__on_class_profile_view_upsert()
  RETURNS trigger LANGUAGE 'plpgsql' AS $BODY$ 
  DECLARE
      label text;
      entity_type text;
  BEGIN

  INSERT INTO warehouse.class_preview (dfh_pk_class, class_label, entity_type)  
  SELECT v.dfh_pk_class, v.class_label, v.entity_type 
  FROM information.v_class_preview as v
  WHERE v.dfh_pk_class = NEW.dfh_fk_class
  ON CONFLICT (dfh_pk_class) 
    DO 
      UPDATE 
        SET (class_label, entity_type) = (
            SELECT v.class_label, v.entity_type 
            FROM information.v_class_preview as v
            WHERE v.dfh_pk_class = NEW.dfh_fk_class
          );
  
  RETURN NEW;

  END;
  $BODY$;  


  ------------------------------------------------------------------------------------------------------------
  -- TRIGGER after_insert_or_update                                                                        #7
  ------------------------------------------------------------------------------------------------------------

  CREATE TRIGGER after_insert_or_update
    AFTER INSERT OR UPDATE
    ON data_for_history.class_profile_view
    FOR EACH ROW
    EXECUTE PROCEDURE warehouse.update_class_preview__on_class_profile_view_upsert();

  `

  db.runSql(sql, callback)

};

exports.down = function (db, callback) {

  const sql = `
  -- 7
  DROP TRIGGER after_insert_or_update ON data_for_history.class_profile_view;

  -- 6
  DROP FUNCTION warehouse.update_class_preview__on_class_profile_view_upsert();

  -- 5
  DROP TRIGGER after_delete ON data_for_history.label;

  -- 4
  DROP TRIGGER after_insert_or_update ON data_for_history.label;
  
  -- 3 
  DROP FUNCTION warehouse.update_class_preview__on_label_delete();

  -- 2 
  DROP FUNCTION warehouse.update_class_preview__on_label_upsert();
  
  -- 1 
  DROP TABLE warehouse.class_preview;;

  `

  db.runSql(sql, callback)
};

exports._meta = {
  "version": 1
};
