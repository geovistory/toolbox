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
  -- TRIGGER FUNCTION create_entity_preview_full_text_and_ts_vector                        #1
  ------------------------------------------------------------------------------------------------------------

  CREATE OR REPLACE FUNCTION warehouse.create_entity_preview_full_text_and_ts_vector()
      RETURNS trigger
      LANGUAGE 'plpgsql'
  AS $BODY$

    DECLARE
      new_full_text TEXT;
	  new_ts_vector tsvector;
    BEGIN
    
    SELECT string_agg into new_full_text from (
      SELECT 1, string_agg(txt, ', ' ORDER BY rank) from (
        SELECT rank, txt 
        FROM (
          select 1 rank, NEW.own_full_text  as txt
          UNION
          select 2 rank, value as txt 
          from jsonb_each_text(NEW.full_texts_from_related_entity_previews)
        ) AS all_strings
        WHERE txt != ''
      ) AS rows
      GROUP BY 1
    ) as x;	   

    NEW.full_text = new_full_text;
    
    SELECT setweight(to_tsvector(coalesce(NEW.entity_label, '')), 'A') || 
        setweight(to_tsvector(coalesce(NEW.type_label, NEW.class_label, '')), 'B') || 
        setweight(to_tsvector(coalesce(NEW.full_text,'')), 'C')     
    INTO new_ts_vector;
          
    NEW.ts_vector = new_ts_vector;
										  
    RETURN NEW;
    END;
      
  $BODY$;
  
  
  
  ------------------------------------------------------------------------------------------------------------
  -- TRIGGER before_upsert_full_text                                                                     #2
  ------------------------------------------------------------------------------------------------------------
  CREATE TRIGGER before_upsert_full_text
    BEFORE UPDATE OR INSERT
    ON warehouse.entity_preview
    FOR EACH ROW
    EXECUTE PROCEDURE warehouse.create_entity_preview_full_text_and_ts_vector();
	


  ------------------------------------------------------------------------------------------------------------
  -- TRIGGER FUNCTION update_dependent_entity_previews                     					                      #3
  ------------------------------------------------------------------------------------------------------------
    CREATE OR REPLACE FUNCTION warehouse.update_dependent_entity_previews()
        RETURNS trigger
        LANGUAGE 'plpgsql'
    AS $BODY$
    BEGIN
    
      RAISE INFO 'Called TRIGGER FUNCTION update_dependent_entity_previews; pk_entity: % fk_project: %', NEW.pk_entity, NEW.fk_project;

      PERFORM 
      warehouse.fill_dependent_full_texts(NEW.pk_entity, NEW.fk_project),
      warehouse.fill_dependent_entity_labels(NEW.pk_entity, NEW.fk_project);
    
      RETURN NEW;
    END;
    $BODY$;
  
    
  
  ------------------------------------------------------------------------------------------------------------
  -- TRIGGER after_entity_preview_upsert                                                                   #4
  ------------------------------------------------------------------------------------------------------------
    CREATE TRIGGER after_entity_preview_upsert
      AFTER UPDATE OF entity_label, full_text OR INSERT
      ON warehouse.entity_preview
      FOR EACH ROW
      EXECUTE PROCEDURE warehouse.update_dependent_entity_previews();
	


  ------------------------------------------------------------------------------------------------------------
  -- TRIGGER FUNCTION update_after_pk_entity_for_entity_label_changed                     					       #5
  ------------------------------------------------------------------------------------------------------------
    CREATE OR REPLACE FUNCTION warehouse.update_after_pk_entity_for_entity_label_changed()
        RETURNS trigger
        LANGUAGE 'plpgsql'
    AS $BODY$
    BEGIN

      RAISE INFO 'Called TRIGGER FUNCTION update_after_pk_entity_for_entity_label_changed; NEW.pk_entity_for_entity_label: %, OLD.pk_entity_for_entity_label: %, fk_project: %', NEW.pk_entity_for_entity_label, OLD.pk_entity_for_entity_label, NEW.fk_project;

      PERFORM warehouse.fill_dependent_entity_labels(NEW.pk_entity_for_entity_label, NEW.fk_project),
        warehouse.fill_dependent_full_texts(NEW.pk_entity_for_entity_label, NEW.fk_project);

      RETURN NEW;
    END;
    $BODY$;

    

  ------------------------------------------------------------------------------------------------------------
  -- TRIGGER after_pk_entity_for_entity_label_changed                                                     #6
  ------------------------------------------------------------------------------------------------------------
    CREATE TRIGGER after_pk_entity_for_entity_label_changed
      AFTER UPDATE OF pk_entity_for_entity_label
      ON warehouse.entity_preview
      FOR EACH ROW
      EXECUTE PROCEDURE warehouse.update_after_pk_entity_for_entity_label_changed();
  


  ------------------------------------------------------------------------------------------------------------
  -- TRIGGER FUNCTION update_entity_preview                     					                                #7
  ------------------------------------------------------------------------------------------------------------
    CREATE OR REPLACE FUNCTION warehouse.update_entity_preview()
        RETURNS trigger
        LANGUAGE 'plpgsql'
    AS $BODY$
  DECLARE
    _table_name VARCHAR;
    _fk_project INT;
    _fk_entity INT;
    _fk_temporal_entity INT;
    BEGIN
    
    _fk_project = NEW.fk_project;
    
    SELECT table_name INTO _table_name
    FROM information.entity e
    WHERE e.pk_entity = NEW.fk_entity;


    -- if the inf.entity is a text_property
    IF (SELECT _table_name = 'text_property') THEN
    
      SELECT t.fk_concerned_entity into _fk_entity
      FROM information.text_property t
      WHERE t.pk_entity = NEW.fk_entity;
      
      RAISE INFO 'update_entity_preview of pk_entity: %, fk_project: %', _fk_entity, _fk_project;


      PERFORM
      warehouse.fill_own_entity_label_of_entity_preview( _fk_entity, _fk_project),
      warehouse.fill_own_entity_label_of_entity_preview( _fk_entity, NULL),

      warehouse.fill_own_full_text_of_entity_preview(_fk_entity, _fk_project),
      warehouse.fill_own_full_text_of_entity_preview(_fk_entity, NULL);
      
      
    ELSIF (SELECT _table_name = 'role') THEN
      
      SELECT r.fk_entity into _fk_entity
      FROM information.role r
      WHERE r.pk_entity = NEW.fk_entity;
      
      SELECT r.fk_temporal_entity into _fk_temporal_entity
      FROM information.role r
      WHERE r.pk_entity = NEW.fk_entity;
      
      RAISE INFO 'update_entity_preview of pk_entity: %, _fk_temporal_entity: %, fk_project: %', _fk_entity, _fk_temporal_entity, _fk_project;

      PERFORM
      warehouse.fill_own_entity_label_of_entity_preview(_fk_entity, _fk_project),
      warehouse.fill_own_full_text_of_entity_preview(_fk_entity, _fk_project),
      warehouse.create_keys_of_full_texts_from_related_entity_previews(_fk_entity, _fk_project),
      warehouse.create_pk_entity_for_entity_label(_fk_entity, _fk_project),

      warehouse.fill_own_entity_label_of_entity_preview(_fk_temporal_entity, _fk_project),
      warehouse.fill_own_full_text_of_entity_preview(_fk_temporal_entity, _fk_project),
      warehouse.create_keys_of_full_texts_from_related_entity_previews(_fk_temporal_entity, _fk_project),
      warehouse.create_pk_entity_for_entity_label(_fk_temporal_entity, _fk_project);

      
                                
    END IF;
    
    
    
      RETURN NEW;
    END;
    $BODY$;
  
    
  
  ------------------------------------------------------------------------------------------------------------
  -- TRIGGER after_epr_upsert                                                                   #8
  ------------------------------------------------------------------------------------------------------------
    CREATE TRIGGER after_epr_upsert
  After INSERT OR UPDATE 
  ON information.entity_version_project_rel
  FOR EACH ROW
  EXECUTE PROCEDURE warehouse.update_entity_preview();
  
  `

  db.runSql(sql, callback)

};

exports.down = function (db, callback) {

  const sql = `
  -- 8
  DROP TRIGGER after_epr_upsert ON information.entity_version_project_rel;

  -- 7
  DROP FUNCTION warehouse.update_entity_preview();

  -- 6
  DROP TRIGGER after_pk_entity_for_entity_label_changed ON warehouse.entity_preview;
 
  -- 5
  DROP FUNCTION warehouse.update_after_pk_entity_for_entity_label_changed();

  -- 4
  DROP TRIGGER after_entity_preview_upsert ON warehouse.entity_preview;

  -- 3
  DROP FUNCTION warehouse.update_dependent_entity_previews();

  -- 2
  DROP TRIGGER before_upsert_full_text ON warehouse.entity_preview;

  -- 1
  DROP FUNCTION warehouse.create_entity_preview_full_text_and_ts_vector();

  `

  db.runSql(sql, callback)
};

exports._meta = {
  "version": 1
};
