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
  -- TRIGGER FUNCTION entity_preview__upsert_entity_preview                					                      #1
  ------------------------------------------------------------------------------------------------------------
  CREATE OR REPLACE FUNCTION warehouse.entity_preview__upsert_entity_preview()
        RETURNS trigger
        LANGUAGE 'plpgsql'
    AS $BODY$
    DECLARE
      _table_name VARCHAR;
      _fk_project INT;
      _fk_entity INT;
      _fk_temporal_entity INT;
      _fk_domain_entity INT;
      _fk_range_entity INT;
      _BOOL BOOLEAN;
      _result JSONB;
      _new_label TEXT;
      BEGIN
      
        _fk_project = NEW.fk_project;
        
        SELECT table_name INTO _table_name
        FROM information.entity e
        WHERE e.pk_entity = NEW.fk_entity;

        
        --------------------- text_property ---------------------
        IF (SELECT _table_name = 'text_property') THEN
        
          SELECT t.fk_concerned_entity into _fk_entity
          FROM information.text_property t
          WHERE t.pk_entity = NEW.fk_entity;
          
          RAISE INFO 'updated epr of text_property for entity: %, fk_project: %', _fk_entity, _fk_project;

          PERFORM
          -- fill own entity label
          warehouse.entity_preview__fill_own_entity_label( _fk_entity, _fk_project),
          warehouse.entity_preview__fill_own_entity_label( _fk_entity, NULL),
          
          -- fill own full text
          warehouse.entity_preview__fill_own_full_text(_fk_entity, _fk_project),
          warehouse.entity_preview__fill_own_full_text(_fk_entity, NULL);
          
          
        --------------------- role -----------------------------
        ELSIF (SELECT _table_name = 'role') THEN
          
          SELECT r.fk_entity into _fk_entity
          FROM information.role r
          WHERE r.pk_entity = NEW.fk_entity;
          SELECT r.fk_temporal_entity into _fk_temporal_entity
          FROM information.role r
          WHERE r.pk_entity = NEW.fk_entity;
          
          RAISE INFO 'updated epr of role of pk_entity: %, fk_temporal_entity: %, fk_project: %', _fk_entity, _fk_temporal_entity, _fk_project;
        
          PERFORM

          -- fill own entity label
          warehouse.needs_update('entity_preview__fill_own_entity_label'::text, ARRAY[_fk_entity::text, _fk_project::text]),
          warehouse.needs_update('entity_preview__fill_own_entity_label'::text, ARRAY[_fk_entity::text, NULL::text]),
          warehouse.needs_update('entity_preview__fill_own_entity_label'::text, ARRAY[_fk_temporal_entity::text, _fk_project::text]),
          warehouse.needs_update('entity_preview__fill_own_entity_label'::text, ARRAY[_fk_temporal_entity::text, NULL::text]),
          
          -- fill own full text
          warehouse.needs_update('entity_preview__fill_own_full_text'::text, ARRAY[_fk_entity::text, _fk_project::text]),
          warehouse.needs_update('entity_preview__fill_own_full_text'::text, ARRAY[_fk_entity::text, NULL::text]),
          warehouse.needs_update('entity_preview__fill_own_full_text'::text, ARRAY[_fk_temporal_entity::text, _fk_project::text]),
          warehouse.needs_update('entity_preview__fill_own_full_text'::text, ARRAY[_fk_temporal_entity::text, NULL::text]),

          -- fill time span 
          warehouse.needs_update('entity_preview__fill_time_span'::text, ARRAY[_fk_temporal_entity::text, _fk_project::text]),
          warehouse.needs_update('entity_preview__fill_time_span'::text, ARRAY[_fk_temporal_entity::text, NULL::text]),

          -- create fk entity label
          warehouse.needs_update('entity_preview__create_fk_entity_label'::text, ARRAY[_fk_entity::text, _fk_project::text]),
          warehouse.needs_update('entity_preview__create_fk_entity_label'::text, ARRAY[_fk_entity::text, NULL::text]),
          warehouse.needs_update('entity_preview__create_fk_entity_label'::text, ARRAY[_fk_temporal_entity::text, _fk_project::text]),
          warehouse.needs_update('entity_preview__create_fk_entity_label'::text, ARRAY[_fk_temporal_entity::text, NULL::text]),

          -- create related full texts
          warehouse.needs_update('entity_preview__create_related_full_texts'::text, ARRAY[_fk_entity::text, _fk_project::text]),
          warehouse.needs_update('entity_preview__create_related_full_texts'::text, ARRAY[_fk_entity::text, NULL::text]),
          warehouse.needs_update('entity_preview__create_related_full_texts'::text, ARRAY[_fk_temporal_entity::text, _fk_project::text]),
          warehouse.needs_update('entity_preview__create_related_full_texts'::text, ARRAY[_fk_temporal_entity::text, NULL::text]);
          
        --------------------- entity_association -----------------
        ELSIF (SELECT _table_name = 'entity_association') THEN
          SELECT ea.fk_domain_entity into _fk_domain_entity
          FROM information.entity_association ea
          WHERE ea.pk_entity = NEW.fk_entity;
          SELECT ea.fk_range_entity into _fk_range_entity
          FROM information.entity_association ea
          WHERE ea.pk_entity = NEW.fk_entity;

          RAISE INFO 'updated epr of entity_association with fk_domain_entity: %, fk_range_entity: %, fk_project: %', _fk_domain_entity, _fk_range_entity, _fk_project;
          
          PERFORM

          -- create fk type
          warehouse.needs_update('entity_preview__create_fk_type'::text, ARRAY[_fk_domain_entity::text, _fk_project::text]),
          warehouse.needs_update('entity_preview__create_fk_type'::text, ARRAY[_fk_domain_entity::text, NULL::text]),
          warehouse.needs_update('entity_preview__create_fk_type'::text, ARRAY[_fk_range_entity::text, _fk_project::text]),
          warehouse.needs_update('entity_preview__create_fk_type'::text, ARRAY[_fk_range_entity::text, NULL::text]);

        END IF;
      
      
      
      RETURN NEW;
    END;
    $BODY$;
  


  ------------------------------------------------------------------------------------------------------------
  -- TRIGGER FUNCTION entity_preview__get_entity_label                					                        #2
  ------------------------------------------------------------------------------------------------------------
    CREATE OR REPLACE FUNCTION warehouse.entity_preview__get_entity_label()
        RETURNS trigger
        LANGUAGE 'plpgsql'
    AS $BODY$
    BEGIN
    
      RAISE INFO 'Called TRIGGER FUNCTION entity_preview__get_entity_label; pk_entity: % fk_project: %', NEW.pk_entity, NEW.fk_project;

      IF (NEW.fk_entity_label IS NOT NULL) THEN
        UPDATE warehouse.entity_preview
        SET entity_label = pre.entity_label
        FROM (
          SELECT entity_label 
          FROM warehouse.entity_preview
          WHERE pk_entity = NEW.fk_entity_label
          AND fk_project IS NOT DISTINCT FROM NEW.fk_project
        ) as pre
        WHERE pk_entity = NEW.pk_entity
        AND fk_project IS NOT DISTINCT FROM NEW.fk_project;
      END IF;

      RETURN NEW;
    END;
    $BODY$;


  ------------------------------------------------------------------------------------------------------------
  -- TRIGGER FUNCTION entity_preview__get_type_label                					                          #3
  ------------------------------------------------------------------------------------------------------------
    CREATE OR REPLACE FUNCTION warehouse.entity_preview__get_type_label()
        RETURNS trigger
        LANGUAGE 'plpgsql'
    AS $BODY$
    BEGIN
    
      RAISE INFO 'Called TRIGGER FUNCTION entity_preview__get_type_label; pk_entity: % fk_project: %', NEW.pk_entity, NEW.fk_project;

      IF (NEW.fk_type IS NOT NULL) THEN
      UPDATE warehouse.entity_preview
      SET type_label = pre.entity_label
      FROM (
        SELECT entity_label 
        FROM warehouse.entity_preview
        WHERE pk_entity = NEW.fk_type
        AND fk_project IS NOT DISTINCT FROM NEW.fk_project
      ) as pre
      WHERE pk_entity = NEW.pk_entity
      AND fk_project IS NOT DISTINCT FROM NEW.fk_project;
    END IF;

      RETURN NEW;
    END;
    $BODY$;

  
  ------------------------------------------------------------------------------------------------------------
  -- TRIGGER FUNCTION entity_preview__concat_full_text                					                         #4
  ------------------------------------------------------------------------------------------------------------
    CREATE OR REPLACE FUNCTION warehouse.entity_preview__concat_full_text()
        RETURNS trigger
        LANGUAGE 'plpgsql'
    AS $BODY$
    BEGIN
    
      RAISE INFO 'Called TRIGGER FUNCTION entity_preview__concat_full_text; pk_entity: % fk_project: %', NEW.pk_entity, NEW.fk_project;
      

      SELECT string_agg into NEW.full_text from (
        SELECT 1, string_agg(txt, ', ' ORDER BY rank) from (
          SELECT rank, txt 
          FROM (
            select 1 rank, coalesce(NEW.type_label, NEW.class_label, '') as txt
            UNION
            select 2 rank, NEW.own_full_text  as txt
            UNION
            select 3 rank, value as txt 
            from jsonb_each_text(NEW.related_full_texts)
          ) AS all_strings
          WHERE txt != ''
        ) AS items
        GROUP BY 1
      ) as x;	   
      
      SELECT setweight(to_tsvector(coalesce(NEW.entity_label, '')), 'A') || 
          setweight(to_tsvector(coalesce(NEW.type_label, NEW.class_label, '')), 'B') || 
          setweight(to_tsvector(coalesce(NEW.full_text,'')), 'C')     
      INTO NEW.ts_vector;



      RETURN NEW;
    END;
    $BODY$;

    
  
  ------------------------------------------------------------------------------------------------------------
  -- TRIGGER FUNCTION entity_preview__update_dependent_related_full_texts                				   #5
  ------------------------------------------------------------------------------------------------------------
    CREATE OR REPLACE FUNCTION warehouse.entity_preview__update_dependent_related_full_texts()
        RETURNS trigger
        LANGUAGE 'plpgsql'
    AS $BODY$
    BEGIN
    
      RAISE INFO 'Called TRIGGER FUNCTION entity_preview__update_dependent_related_full_texts; pk_entity: % fk_project: %', NEW.pk_entity, NEW.fk_project;
        
      PERFORM warehouse.entity_preview__fill_dependent_related_full_texts(NEW.pk_entity, NEW.fk_project);

      RETURN NEW;
    END;
    $BODY$;

    
  ------------------------------------------------------------------------------------------------------------
  -- TRIGGER FUNCTION entity_preview__update_dependent_entity_labels                			          	   #6
  ------------------------------------------------------------------------------------------------------------
    CREATE OR REPLACE FUNCTION warehouse.entity_preview__update_dependent_entity_labels()
        RETURNS trigger
        LANGUAGE 'plpgsql'
    AS $BODY$
    BEGIN
    
      RAISE INFO 'Called TRIGGER FUNCTION entity_preview__update_dependent_entity_labels; pk_entity: % fk_project: %', NEW.pk_entity, NEW.fk_project;

      PERFORM 
      warehouse.entity_preview__fill_dependent_entity_labels(NEW.pk_entity, NEW.fk_project),
      warehouse.entity_preview__fill_dependent_type_labels(NEW.pk_entity, NEW.fk_project);

      RETURN NEW;
    END;
    $BODY$;

  ------------------------------------------------------------------------------------------------------------
  -- TRIGGER FUNCTION entity_preview__update_dependent_class_labels                		          		   #7
  ------------------------------------------------------------------------------------------------------------
    CREATE OR REPLACE FUNCTION warehouse.entity_preview__update_dependent_class_labels()
        RETURNS trigger
        LANGUAGE 'plpgsql'
    AS $BODY$
    BEGIN
    
      RAISE INFO 'Called TRIGGER FUNCTION entity_preview__update_dependent_class_labels; pk_entity: % fk_project: %', NEW.pk_entity, NEW.fk_project;

      PERFORM warehouse.entity_preview__fill_dependent_class_labels(NEW.pk_entity, NEW.fk_project);


      RETURN NEW;
    END;
    $BODY$;
  
  ------------------------------------------------------------------------------------------------------------
  -- TRIGGER FUNCTION entity_preview__notify_upsert                		                            		   #8
  ------------------------------------------------------------------------------------------------------------
    CREATE OR REPLACE FUNCTION warehouse.entity_preview__notify_upsert()
        RETURNS trigger
        LANGUAGE 'plpgsql'
    AS $BODY$
    BEGIN
      PERFORM pg_notify('entity_preview_updated', json_build_object(
        'pk_entity', NEW.pk_entity,
        'fk_project', NEW.fk_project,
        'project', NEW.project,
        'fk_class', NEW.fk_class,
        'table_name', NEW.table_name,
        'class_label', NEW.class_label,
        'entity_label', NEW.entity_label,
        'time_span', NEW.time_span,
        'fk_type', NEW.fk_type,
        'type_label', NEW.type_label
      )::text);
    RETURN NEW;
    END;
    $BODY$;
  
  `

  db.runSql(sql, callback)

};

exports.down = function (db, callback) {

  const sql = `
  -- 8
  DROP FUNCTION warehouse.entity_preview__notify_upsert();

  -- 7
  DROP FUNCTION warehouse.entity_preview__update_dependent_class_labels();

  -- 6
  DROP FUNCTION warehouse.entity_preview__update_dependent_entity_labels();

  -- 5
  DROP FUNCTION warehouse.entity_preview__update_dependent_related_full_texts();

  -- 4
  DROP FUNCTION warehouse.entity_preview__concat_full_text();

  -- 3
  DROP FUNCTION warehouse.entity_preview__get_type_label();

  -- 2
  DROP FUNCTION warehouse.entity_preview__get_entity_label();

  -- 1
  DROP FUNCTION warehouse.entity_preview__upsert_entity_preview();

  `

  db.runSql(sql, callback)
};

exports._meta = {
  "version": 1
};
