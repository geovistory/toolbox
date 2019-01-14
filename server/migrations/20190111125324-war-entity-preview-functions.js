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
  -- FUNCTION create_keys_of_full_texts_from_related_entity_previews                                      #1
  ------------------------------------------------------------------------------------------------------------
  CREATE OR REPLACE FUNCTION warehouse.create_keys_of_full_texts_from_related_entity_previews(
    param_pk_entity integer,
    param_fk_project integer
  )
  RETURNS BOOLEAN AS $$
  DECLARE 
    object jsonb;
    new_object jsonb;
    keys integer[];
    key INTEGER;
    needs_update BOOLEAN;
  BEGIN
      needs_update=false;

      ---------------------- REPO VERSIONS ----------------------

      IF param_fk_project IS NULL THEN
      
        RAISE INFO 'create_keys_of_full_texts_from_related_entity_previews pk_entity: %, fk_project: %', param_pk_entity, param_fk_project;
        -- get all keys

        WITH all_dependencies AS (
          SELECT e.*
          FROM information.v_role r
          JOIN information.entity e ON e.pk_entity = r.fk_entity AND e.table_name = 'persistent_item'
          WHERE r.fk_temporal_entity = param_pk_entity AND r.is_in_project_count > 0
          UNION
          SELECT e.*
          FROM information.v_role r
          JOIN information.entity e ON e.pk_entity = r.fk_temporal_entity AND e.table_name = 'temporal_entity'
          WHERE r.fk_entity = param_pk_entity AND r.is_in_project_count > 0
        ), 
        agg AS(
          select 1, array_agg(all_dependencies.pk_entity) pk_entities
          FROM all_dependencies
          group by 1
        )
        select pk_entities INTO keys 
        FROM agg;

        RAISE INFO 'keys: %', keys;

        ----- get the existing object
        
        SELECT full_texts_from_related_entity_previews INTO object FROM warehouse.entity_preview
        WHERE pk_entity = param_pk_entity AND fk_project IS NULL;
        
        RAISE INFO 'object: %', object;
        
        new_object = '{}'::jsonb;

        IF (keys IS NOT NULL) THEN
          FOREACH key IN ARRAY keys
          LOOP
              -- RAISE INFO 'key: %', key;
      
              new_object = (SELECT jsonb_set(
                new_object,
                array_agg(key::text),
                COALESCE((select object::jsonb->key::text), '""')::jsonb
              ));

              RAISE INFO 'new_object: %', new_object;
          END LOOP;        
        END IF;
        
        ----- Insert or update the entity_preview
        
        PERFORM pk_entity FROM warehouse.entity_preview
        WHERE pk_entity = param_pk_entity AND fk_project IS NULL;
        IF NOT FOUND THEN 
            INSERT INTO warehouse.entity_preview (pk_entity, fk_project, full_texts_from_related_entity_previews)
            VALUES (param_pk_entity, param_fk_project, new_object);

            RAISE INFO 'inserted new_object: %', new_object;

        ELSIF (SELECT (new_object @> object AND new_object <@ object) = false) THEN
            UPDATE warehouse.entity_preview 
            SET full_texts_from_related_entity_previews = new_object
            where pk_entity=param_pk_entity AND fk_project IS NULL;

            RAISE INFO 'updated object with new_object: %', new_object;
        ELSE
            RAISE INFO 'no update needed: %', new_object;
        END IF;


      ---------------------- PROJECTS VERSIONS ----------------------

      ELSE

        RAISE INFO 'create_keys_of_full_texts_from_related_entity_previews pk_entity: %, fk_project: %', param_pk_entity, param_fk_project;

        -- get all keys

        WITH all_dependencies AS (
          SELECT e.*
          FROM information.role r
          JOIN information.entity_version_project_rel epr ON r.pk_entity = epr.fk_entity AND epr.is_in_project 
          JOIN information.entity e ON e.pk_entity = r.fk_entity AND e.table_name = 'persistent_item'
          WHERE r.fk_temporal_entity = param_pk_entity AND epr.fk_project = param_fk_project
          UNION
          SELECT e.*
          FROM information.role r
          JOIN information.entity_version_project_rel epr ON r.pk_entity = epr.fk_entity AND epr.is_in_project 
          JOIN information.entity e ON e.pk_entity = r.fk_temporal_entity AND e.table_name = 'temporal_entity'
          WHERE r.fk_entity = param_pk_entity AND epr.fk_project = param_fk_project
        ), 
        agg AS(
          select 1, array_agg(all_dependencies.pk_entity) pk_entities
          FROM all_dependencies
          group by 1
        )
        select pk_entities INTO keys 
        FROM agg;

        RAISE INFO 'keys: %', keys;

        ----- get the existing object
        
        SELECT full_texts_from_related_entity_previews INTO object FROM warehouse.entity_preview
        WHERE pk_entity = param_pk_entity AND fk_project = param_fk_project;
        
        RAISE INFO 'object: %', object;
        
        new_object = '{}'::jsonb;

        IF (keys IS NOT NULL) THEN
          FOREACH key IN ARRAY keys
          LOOP
              -- RAISE INFO 'key: %', key;
      
              new_object = (SELECT jsonb_set(
                new_object,
                array_agg(key::text),
                COALESCE((select object::jsonb->key::text), '""')::jsonb
              ));

              RAISE INFO 'new_object: %', new_object;
          END LOOP;        
        END IF;

        ----- Insert or update the entity_preview
        
        PERFORM pk_entity FROM warehouse.entity_preview
        WHERE pk_entity = param_pk_entity AND fk_project = param_fk_project;
        IF NOT FOUND THEN 
            INSERT INTO warehouse.entity_preview (pk_entity, fk_project, full_texts_from_related_entity_previews)
            VALUES (param_pk_entity, param_fk_project, new_object);

            RAISE INFO 'inserted new_object: %', new_object;

        ELSIF (SELECT (new_object @> object AND new_object <@ object) = false) THEN
            UPDATE warehouse.entity_preview 
            SET full_texts_from_related_entity_previews = new_object
            where pk_entity=param_pk_entity AND fk_project=param_fk_project;

            RAISE INFO 'updated object with new_object: %', new_object;
        ELSE
            RAISE INFO 'no update needed: %', new_object;
        END IF;

      END IF; 

      RETURN true;
  END;
  $$ LANGUAGE plpgsql;


  ------------------------------------------------------------------------------------------------------------
  -- FUNCTION create_pk_entity_for_entity_label                                      #2
  ------------------------------------------------------------------------------------------------------------
  CREATE OR REPLACE FUNCTION warehouse.create_pk_entity_for_entity_label(
    param_pk_entity integer,
    param_fk_project integer
  )
  RETURNS BOOLEAN AS $$
  DECLARE
   old_pk_entity INT;
   new_pk_entity INT;
  BEGIN

      ---------------------- REPO VERSIONS ----------------------

      IF param_fk_project IS NULL THEN
      
 		RAISE INFO 'create_pk_entity_for_entity_label of pk_entity: %, fk_project: %', param_pk_entity, param_fk_project;

        -- get the pk_entity_for_entity_label
			
			SELECT pk INTO new_pk_entity 
			FROM 
			(
				(
          SELECT fk_temporal_entity as pk, r.rank_for_pe_it as rank
          FROM information.v_role r
          JOIN commons.ui_context_config ucc ON ucc.fk_property = r.fk_property AND ucc.ord_num = 0  AND ucc.property_is_outgoing = false
          JOIN information.entity e on r.fk_temporal_entity = e.pk_entity AND e.table_name = 'temporal_entity'
          WHERE r.fk_entity = param_pk_entity 
				  AND r.is_in_project_count > 0
				)
				UNION
				(
          SELECT r.fk_entity as pk, r.rank_for_te_ent as rank
          FROM information.v_role r
          JOIN commons.ui_context_config ucc ON ucc.fk_property = r.fk_property AND ucc.ord_num = 0 AND ucc.property_is_outgoing = true
          JOIN information.entity e on r.fk_entity = e.pk_entity AND e.table_name = 'persistent_item'
          WHERE r.fk_temporal_entity = param_pk_entity 
          AND r.is_in_project_count > 0
				)
			) AS a
			ORDER BY rank
			LIMIT 1;

        RAISE INFO 'new_pk_entity: %', new_pk_entity;
		
        ----- Insert or update column pk_entity_for_entity_label of table entity_preview
        
        SELECT pk_entity_for_entity_label INTO old_pk_entity FROM warehouse.entity_preview
        WHERE pk_entity = param_pk_entity AND fk_project IS NULL;
		
		RAISE INFO 'old_pk_entity: %', old_pk_entity;

        IF NOT FOUND THEN 
		
            INSERT INTO warehouse.entity_preview (pk_entity, fk_project, pk_entity_for_entity_label)
            VALUES (param_pk_entity, param_fk_project, new_pk_entity);

            RAISE INFO 'inserted new_pk_entity: %', new_pk_entity;

        ELSIF (SELECT (old_pk_entity IS DISTINCT FROM new_pk_entity)) THEN
			   
            UPDATE warehouse.entity_preview 
            SET pk_entity_for_entity_label = new_pk_entity
            where pk_entity=param_pk_entity AND fk_project IS NULL;

            RAISE INFO 'updated object with new_object: %', new_pk_entity;
        ELSE
            RAISE INFO 'no update needed: %', new_pk_entity;
        END IF;
					   
					   
      ---------------------- PROJECTS VERSIONS ----------------------

      ELSE

        RAISE INFO 'create_pk_entity_for_entity_label of pk_entity: %, fk_project: %', param_pk_entity, param_fk_project;

        -- get the pk_entity_for_entity_label
			
			SELECT pk INTO new_pk_entity 
			FROM 
			(
				(
          SELECT fk_temporal_entity as pk, epr.ord_num
          FROM information.role r
          JOIN information.entity_version_project_rel epr ON epr.fk_entity = r.pk_entity 
          JOIN commons.ui_context_config ucc ON ucc.fk_property = r.fk_property AND ucc.ord_num = 0  AND ucc.property_is_outgoing = false
          JOIN information.entity e on r.fk_temporal_entity = e.pk_entity AND e.table_name = 'temporal_entity'
          WHERE r.fk_entity = param_pk_entity 
          AND epr.fk_project = param_fk_project 
          AND epr.is_in_project = true
        )

				UNION

				(
          SELECT r.fk_entity as pk, epr.ord_num
          FROM information.role r
          JOIN information.entity_version_project_rel epr ON epr.fk_entity = r.pk_entity 
          JOIN commons.ui_context_config ucc ON ucc.fk_property = r.fk_property AND ucc.ord_num = 0 AND ucc.property_is_outgoing = true
          JOIN information.entity e on r.fk_entity = e.pk_entity AND e.table_name = 'persistent_item'
          WHERE r.fk_temporal_entity = param_pk_entity 
          AND epr.fk_project = param_fk_project
          AND epr.is_in_project = true
				)
			) AS a
			ORDER BY ord_num
			LIMIT 1;

        RAISE INFO 'new_pk_entity: %', new_pk_entity;
		
        ----- Insert or update column pk_entity_for_entity_label of table entity_preview
        
        SELECT pk_entity_for_entity_label INTO old_pk_entity FROM warehouse.entity_preview
        WHERE pk_entity = param_pk_entity AND fk_project = param_fk_project;
		
		RAISE INFO 'old_pk_entity: %', old_pk_entity;

        IF NOT FOUND THEN 
		
            INSERT INTO warehouse.entity_preview (pk_entity, fk_project, pk_entity_for_entity_label)
            VALUES (param_pk_entity, param_fk_project, new_pk_entity);

            RAISE INFO 'inserted new_pk_entity: %', new_pk_entity;

        ELSIF (SELECT (old_pk_entity IS DISTINCT FROM new_pk_entity)) THEN
			   
            UPDATE warehouse.entity_preview 
            SET pk_entity_for_entity_label = new_pk_entity
            where pk_entity=param_pk_entity AND fk_project=param_fk_project;

            RAISE INFO 'updated object with new_pk_entity: %', new_pk_entity;
        ELSE
            RAISE INFO 'no update needed: %', new_pk_entity;
        END IF;

      END IF; 

      RETURN true;
  END;
  $$ LANGUAGE plpgsql;
  
  ------------------------------------------------------------------------------------------------------------
  -- FUNCTION fill_own_entity_label_of_entity_preview                      				                #3
  ------------------------------------------------------------------------------------------------------------
  CREATE OR REPLACE FUNCTION warehouse.fill_own_entity_label_of_entity_preview(
  param_pk_entity integer,
  param_fk_project integer
  )
  RETURNS BOOLEAN AS $$
  DECLARE
  old_own_entity_label TEXT;
  new_own_entity_label TEXT;
  BEGIN

    ---------------------- REPO VERSIONS ----------------------

    IF param_fk_project IS NULL THEN

    RAISE INFO 'fill_own_entity_label_of_entity_preview of pk_entity: %, fk_project: %', param_pk_entity, param_fk_project;

    -- get the string new_own_entity_label

      
      WITH first_field AS (
        SELECT entity_field.fk_property, entity_field.fk_class_field, entity.pk_entity
        -- teen or peit
        from (
          SELECT t.pk_entity, t.fk_class 
        FROM information.temporal_entity as t
        WHERE  t.pk_entity = param_pk_entity
        UNION 
        SELECT p.pk_entity, p.fk_class 
        FROM information.persistent_item as p
        WHERE p.pk_entity = param_pk_entity
        ) as entity
        INNER JOIN  information.entity_version_project_rel as epr on epr.fk_entity = entity.pk_entity 
        AND epr.is_in_project = true

        -- field
        INNER JOIN information.v_ordered_fields_per_class entity_field on entity_field.fk_class = entity.fk_class 
        AND field_order = 0
      ),
      string_from_first_role AS (

        SELECT COALESCE(appe.string, lang.notes) as string
        FROM
        first_field
        LEFT JOIN information.v_role as r
          on first_field.fk_property = r.fk_property
          and first_field.pk_entity = r.fk_temporal_entity
          and r.is_in_project_count > 0

          -----------------------------------------------------------
          -- get the strings directly connected to entity via role-fk_entity (not via intermediate entity/PeIt)

          --   appellation
          LEFT JOIN information.v_appellation as appe
          ON r.fk_entity = appe.pk_entity
          --   language
          LEFT JOIN information.v_language as lang
          ON r.fk_entity = lang.pk_entity
          --   time_primitive
          --   place

        LIMIT 1
      ),
      string_from_first_text_prop AS (

        SELECT txtp.string
        FROM information.v_text_property as txtp
        INNER JOIN first_field on first_field.fk_class_field = txtp.fk_class_field 
          AND txtp.fk_concerned_entity = first_field.pk_entity 
        INNER JOIN information.entity_version_project_rel as epr ON epr.fk_entity=txtp.pk_entity
          AND  epr.is_in_project = true
        ORDER BY epr.ord_num
        LIMIT 1

      ),				   
      string AS (
        SELECT string
        FROM  string_from_first_role
        UNION
        SELECT string
        FROM string_from_first_text_prop
      )
      SELECT string INTO new_own_entity_label FROM string;


    RAISE INFO 'new_own_entity_label: %', new_own_entity_label;

    ----- Insert or update column own_entity_label of table entity_preview

    SELECT entity_label INTO old_own_entity_label FROM warehouse.entity_preview
    WHERE pk_entity = param_pk_entity AND fk_project IS NULL;

    RAISE INFO 'old_own_entity_label: %', old_own_entity_label;

    IF NOT FOUND THEN 

      INSERT INTO warehouse.entity_preview (pk_entity, fk_project, entity_label)
      VALUES (param_pk_entity, param_fk_project, new_own_entity_label);

      RAISE INFO 'inserted new_own_entity_label: %', new_own_entity_label;

    ELSIF (SELECT (old_own_entity_label IS DISTINCT FROM new_own_entity_label)) THEN

      UPDATE warehouse.entity_preview 
      SET entity_label = new_own_entity_label
      where pk_entity=param_pk_entity AND fk_project IS NULL;

      RAISE INFO 'updated object with new_own_entity_label: %', new_own_entity_label;
    ELSE
      RAISE INFO 'no update needed: %', new_own_entity_label;
    END IF;


    ---------------------- PROJECTS VERSIONS ----------------------

    ELSE

    RAISE INFO 'fill_own_entity_label_of_entity_preview of pk_entity: %, fk_project: %', param_pk_entity, param_fk_project;

    -- get the string new_own_entity_label

     WITH first_field AS (
        SELECT entity_field.fk_property, entity_field.fk_class_field, entity.pk_entity
        -- teen or peit
        from (
          SELECT t.pk_entity, t.fk_class 
        FROM information.temporal_entity as t
        WHERE  t.pk_entity = param_pk_entity
        UNION 
        SELECT p.pk_entity, p.fk_class 
        FROM information.persistent_item as p
        WHERE p.pk_entity = param_pk_entity
        ) as entity
        INNER JOIN  information.entity_version_project_rel as epr on epr.fk_entity = entity.pk_entity 
        AND epr.is_in_project = true

        -- field
        INNER JOIN information.v_ordered_fields_per_class entity_field on entity_field.fk_class = entity.fk_class 
        AND field_order = 0
      ),
      string_from_first_role AS (

        SELECT COALESCE(appe.string, lang.notes) as string
        FROM
        first_field
        LEFT JOIN information.v_role as r
          on first_field.fk_property = r.fk_property
          and first_field.pk_entity = r.fk_temporal_entity
          LEFT JOIN information.entity_version_project_rel as epr2 
            on epr2.fk_entity = r.pk_entity 
            and epr2.fk_project = param_fk_project
            and epr2.is_in_project = true

          -----------------------------------------------------------
          -- get the strings directly connected to entity via role-fk_entity (not via intermediate entity/PeIt)

          --   appellation
          LEFT JOIN information.v_appellation as appe
          ON r.fk_entity = appe.pk_entity
          --   language
          LEFT JOIN information.v_language as lang
          ON r.fk_entity = lang.pk_entity
          --   time_primitive
          --   place

        ORDER BY epr2.ord_num
        LIMIT 1
      ), 
      string_from_first_text_prop AS (

        SELECT txtp.string
        FROM information.v_text_property as txtp
        INNER JOIN first_field on first_field.fk_class_field = txtp.fk_class_field 
          AND txtp.fk_concerned_entity = first_field.pk_entity 
        INNER JOIN information.entity_version_project_rel as epr ON epr.fk_entity=txtp.pk_entity
          AND  epr.is_in_project = true AND epr.fk_project = param_fk_project
        ORDER BY epr.ord_num
        LIMIT 1

      ),				   
      string AS (
        SELECT string
        FROM  string_from_first_role
        UNION
        SELECT string
        FROM string_from_first_text_prop
      )
      SELECT string INTO new_own_entity_label FROM string;


    RAISE INFO 'new_own_entity_label: %', new_own_entity_label;

    ----- Insert or update column own_entity_label of table entity_preview

    SELECT entity_label INTO old_own_entity_label FROM warehouse.entity_preview
    WHERE pk_entity = param_pk_entity AND fk_project = param_fk_project;

    RAISE INFO 'old_own_entity_label: %', old_own_entity_label;

    IF NOT FOUND THEN 

      INSERT INTO warehouse.entity_preview (pk_entity, fk_project, entity_label)
      VALUES (param_pk_entity, param_fk_project, new_own_entity_label);

      RAISE INFO 'inserted new_own_entity_label: %', new_own_entity_label;

    ELSIF (SELECT (old_own_entity_label IS DISTINCT FROM new_own_entity_label)) THEN

      UPDATE warehouse.entity_preview 
      SET entity_label = new_own_entity_label
      where pk_entity=param_pk_entity AND fk_project=param_fk_project;

      RAISE INFO 'updated object with new_own_entity_label: %', new_own_entity_label;
    ELSE
      RAISE INFO 'no update needed: %', new_own_entity_label;
    END IF;

    END IF; 

    RETURN true;
  END;
  $$ LANGUAGE plpgsql;


  ------------------------------------------------------------------------------------------------------------
  -- FUNCTION fill_own_full_text_of_entity_preview                      				                #4
  ------------------------------------------------------------------------------------------------------------
  CREATE OR REPLACE FUNCTION warehouse.fill_own_full_text_of_entity_preview(
  param_pk_entity integer,
  param_fk_project integer
  )
  RETURNS BOOLEAN AS $$
  DECLARE
  old_own_full_text TEXT;
  new_own_full_text TEXT;
  BEGIN
  
    ---------------------- REPO VERSIONS ----------------------
  
    IF param_fk_project IS NULL THEN
  
      RAISE INFO 'fill_own_full_text_of_entity_preview of: pk_entity: %, fk_project: %', param_pk_entity, param_fk_project;
  
      -- get the string new_own_full_text
  
  
         WITH entity AS (
          SELECT t.pk_entity, t.fk_class 
          FROM information.temporal_entity as t
          WHERE  t.pk_entity = param_pk_entity
          UNION 
          SELECT p.pk_entity, p.fk_class 
          FROM information.persistent_item as p
          WHERE p.pk_entity = param_pk_entity
         ),
         fields AS (
          -- fields
          SELECT fields.fk_property, fields.fk_class_field, entity.pk_entity, field_order
          FROM information.v_ordered_fields_per_class AS fields 
          JOIN entity ON fields.fk_class = entity.fk_class 
          AND field_order IS NOT NULL
          ),
          strings_from_roles AS (
          SELECT COALESCE(appe.string, lang.notes) as string, field_order
          FROM fields
          JOIN information.v_role as r ON fields.fk_property = r.fk_property
            AND r.fk_temporal_entity = param_pk_entity AND r.is_in_project_count > 0
  
          -----------------------------------------------------------
          -- get the strings directly connected to entity via role-fk_entity (not via intermediate entity/PeIt)
  
          --   appellation
          LEFT JOIN information.v_appellation as appe
          ON r.fk_entity = appe.pk_entity
          --   language
          LEFT JOIN information.v_language as lang
          ON r.fk_entity = lang.pk_entity
          --   time_primitive
          --   place
          -----------------------------------------------------------
          ORDER BY r.rank_for_te_ent
          ), 
          strings_from_text_props AS (
  
          SELECT regexp_replace(txtp.string, E'[\\n\\r]+', '', 'g' ) as string, field_order
          FROM information.v_text_property as txtp
          INNER JOIN fields on fields.fk_class_field = txtp.fk_class_field 
            AND txtp.fk_concerned_entity = param_pk_entity
            -- TODO: Check if we need to exclude textproperties that are in 0 projects$
            -- TODO: Check if we need to order textproperties
          ),	   
          all_stings AS (
          SELECT string, field_order
          FROM  strings_from_roles
          UNION
          SELECT string, field_order
          FROM strings_from_text_props
          ),
          aggregated AS (
          SELECT 1, string_agg(string, ', ' ORDER BY field_order) as full_text
           FROM all_stings
            GROUP BY 1
          )					   
          SELECT full_text INTO new_own_full_text
          FROM aggregated;
  
      RAISE INFO 'new_own_full_text: %', new_own_full_text;
  
      ----- Insert or update column own_full_text of table entity_preview
  
      SELECT own_full_text INTO old_own_full_text FROM warehouse.entity_preview
      WHERE pk_entity = param_pk_entity AND fk_project IS NULL;
  
      RAISE INFO 'old_own_full_text: %', old_own_full_text;
  
      IF NOT FOUND THEN 
  
        INSERT INTO warehouse.entity_preview (pk_entity, fk_project, own_full_text)
        VALUES (param_pk_entity, param_fk_project, new_own_full_text);
  
        RAISE INFO 'inserted new_own_full_text: %', new_own_full_text;
  
      ELSIF (SELECT (old_own_full_text IS DISTINCT FROM new_own_full_text)) THEN
  
        UPDATE warehouse.entity_preview 
        SET own_full_text = new_own_full_text
        where pk_entity=param_pk_entity AND fk_project IS NULL;
  
        RAISE INFO 'updated object with new_own_full_text: %', new_own_full_text;
      ELSE
        RAISE INFO 'no update needed: %', new_own_full_text;
      END IF;
  
  
    ---------------------- PROJECTS VERSIONS ----------------------
  
    ELSE
               
      RAISE INFO 'fill_own_full_text_of_entity_preview of: pk_entity: %, fk_project: %', param_pk_entity, param_fk_project;
  
      -- get the string new_own_full_text
  
          WITH entity AS (
          SELECT t.pk_entity, t.fk_class 
          FROM information.temporal_entity as t
          WHERE  t.pk_entity = param_pk_entity
          UNION 
          SELECT p.pk_entity, p.fk_class 
          FROM information.persistent_item as p
          WHERE p.pk_entity = param_pk_entity
         ),
         fields AS (
          -- fields
          SELECT fields.fk_property, fields.fk_class_field, entity.pk_entity, field_order
          FROM information.v_ordered_fields_per_class AS fields 
          JOIN entity ON fields.fk_class = entity.fk_class 
          AND field_order IS NOT NULL
          ),
          strings_from_roles AS (
  
          SELECT COALESCE(appe.string, lang.notes) as string, field_order
          FROM fields
          JOIN information.v_role as r ON fields.fk_property = r.fk_property
            AND r.fk_temporal_entity = param_pk_entity
            LEFT JOIN information.entity_version_project_rel as epr ON epr.fk_entity = r.pk_entity 
            AND epr.fk_project = param_fk_project	AND epr.is_in_project = true
  
          -----------------------------------------------------------
          -- get the strings directly connected to entity via role-fk_entity (not via intermediate entity/PeIt)
  
          --   appellation
          LEFT JOIN information.v_appellation as appe
          ON r.fk_entity = appe.pk_entity
          --   language
          LEFT JOIN information.v_language as lang
          ON r.fk_entity = lang.pk_entity
          --   time_primitive
          --   place
          -----------------------------------------------------------
          ORDER BY epr.ord_num
          ), 
          strings_from_text_props AS (
  
          SELECT regexp_replace(txtp.string, E'[\\n\\r]+', '', 'g' ) as string, field_order
          FROM information.v_text_property as txtp
          INNER JOIN fields on fields.fk_class_field = txtp.fk_class_field 
            AND txtp.fk_concerned_entity = param_pk_entity
          INNER JOIN information.entity_version_project_rel as epr ON epr.fk_entity = txtp.pk_entity
            AND  epr.is_in_project = true AND epr.fk_project = param_fk_project
          ORDER BY epr.ord_num
          ),	   
          all_stings AS (
          SELECT string, field_order
          FROM  strings_from_roles
          UNION
          SELECT string, field_order
          FROM strings_from_text_props
          ),
          aggregated AS (
          SELECT 1, string_agg(string, ', ' ORDER BY field_order) as full_text
           FROM all_stings
            GROUP BY 1
          )					   
          SELECT full_text INTO new_own_full_text
          FROM aggregated;
               
  
      RAISE INFO 'new_own_full_text: %', new_own_full_text;
  
      ----- Insert or update column own_full_text of table entity_preview
  
      SELECT own_full_text INTO old_own_full_text FROM warehouse.entity_preview
      WHERE pk_entity = param_pk_entity AND fk_project = param_fk_project;
  
      RAISE INFO 'old_own_full_text: %', old_own_full_text;
  
      IF NOT FOUND THEN 
  
        INSERT INTO warehouse.entity_preview (pk_entity, fk_project, own_full_text)
        VALUES (param_pk_entity, param_fk_project, new_own_full_text);
  
        RAISE INFO 'inserted new_own_full_text: %', new_own_full_text;
  
      ELSIF (SELECT (old_own_full_text IS DISTINCT FROM new_own_full_text)) THEN
  
        UPDATE warehouse.entity_preview 
        SET own_full_text = new_own_full_text
        where pk_entity=param_pk_entity AND fk_project=param_fk_project;
  
        RAISE INFO 'updated object with new_own_full_text: %', new_own_full_text;
      ELSE
        RAISE INFO 'no update needed: %', new_own_full_text;
      END IF;
  
    END IF; 
  
    RETURN true;
  END;
  $$ LANGUAGE plpgsql;


  ------------------------------------------------------------------------------------------------------------
  -- FUNCTION fill_dependent_entity_labels                      				                #5
  ------------------------------------------------------------------------------------------------------------
  CREATE OR REPLACE FUNCTION warehouse.fill_dependent_entity_labels(
  param_pk_entity integer,
  param_fk_project integer
  )
  RETURNS BOOLEAN AS $$
  DECLARE
  new_entity_label TEXT;
  dependent_entity_label TEXT;
  BEGIN
  
    ---------------------- REPO & PROJECTS VERSIONS ----------------------
               
    RAISE INFO 'fill_dependent_entity_labels of pk_entity: %, fk_project: %', param_pk_entity, param_fk_project;
  
    -- get new_entity_label
    SELECT entity_label INTO new_entity_label
    FROM warehouse.entity_preview
    WHERE pk_entity = param_pk_entity
    AND fk_project IS NOT DISTINCT FROM param_fk_project;
  
    RAISE INFO 'new_entity_label: %', new_entity_label;
  
    -- update all dependent entity_previews with new_entity_label (if DISTINCT)
    UPDATE warehouse.entity_preview
    SET entity_label = new_entity_label
    WHERE pk_entity_for_entity_label = param_pk_entity
    AND fk_project IS NOT DISTINCT FROM param_fk_project
    AND entity_label IS DISTINCT FROM new_entity_label;
  
  
    RETURN true;
  END;
  $$ LANGUAGE plpgsql;


  ------------------------------------------------------------------------------------------------------------
  -- FUNCTION fill_dependent_full_texts                      				                                    #6
  ------------------------------------------------------------------------------------------------------------
  CREATE OR REPLACE FUNCTION warehouse.fill_dependent_full_texts(
  param_pk_entity integer,
  param_fk_project integer
  )
  RETURNS BOOLEAN AS $$
  DECLARE
  new_own_full_text TEXT;
  BEGIN
  
    ---------------------- REPO & PROJECTS VERSIONS ----------------------
               
    RAISE INFO 'fill_dependent_full_texts of pk_entity: %, fk_project: %', param_pk_entity, param_fk_project;
  
    -- get new_own_full_text
    SELECT own_full_text INTO new_own_full_text
    FROM warehouse.entity_preview
    WHERE pk_entity = param_pk_entity
    AND fk_project IS NOT DISTINCT FROM param_fk_project;
  
    RAISE INFO 'new_own_full_text: %', new_own_full_text;
  
  
    -- update all full_texts_from_related_entity_previews with new_own_full_text (if DISTINCT)
    UPDATE warehouse.entity_preview
    SET full_texts_from_related_entity_previews = (	
      SELECT jsonb_set(
        full_texts_from_related_entity_previews,
         array_agg(param_pk_entity::text),
        to_jsonb(new_own_full_text)
        )
      )												   
    WHERE full_texts_from_related_entity_previews ? param_pk_entity::text 
    AND full_texts_from_related_entity_previews->>param_pk_entity::text != new_own_full_text
    AND fk_project IS NOT DISTINCT FROM param_fk_project;
  
    RETURN true;
  END;
  $$ LANGUAGE plpgsql;


  ------------------------------------------------------------------------------------------------------------
  -- FUNCTION create_all_entity_previews                                                                  #7
  ------------------------------------------------------------------------------------------------------------
  CREATE OR REPLACE FUNCTION warehouse.create_all_entity_previews()
  RETURNS warehouse.entity_preview AS $$

  DECLARE 
    item record;
    results warehouse.entity_preview;
    t timestamptz;
  BEGIN

  -- empty table entity_preview
  DELETE from warehouse.entity_preview;

  -- select all <pk_entity, fk_project> combinations
  CREATE TEMP TABLE temp_items AS  ( 
    
    -- select all TeEn and PeIt per project
    SELECT DISTINCT e.pk_entity, epr.fk_project
    FROM information.entity_version_project_rel epr
    JOIN information.entity e on e.pk_entity = epr.fk_entity
    WHERE epr.is_in_project = true
    AND e.table_name IN ('temporal_entity', 'persistent_item')
    UNION

    -- select all TeEn and PeIt per repo
    SELECT DISTINCT e.pk_entity, NULL::integer as fk_project
    FROM information.entity e
    WHERE e.table_name IN ('temporal_entity', 'persistent_item')
  
    ORDER BY pk_entity
    LIMIT 50 -- TODO: UNCOMMENT !
  );

  -- create dependency indexes and own strings
  
  -- #1 create_keys_of_full_texts_from_related_entity_previews
  t = clock_timestamp();

  FOR item IN (SELECT * FROM temp_items) LOOP 
    PERFORM warehouse.create_keys_of_full_texts_from_related_entity_previews(item.pk_entity, item.fk_project);
  END LOOP;
  
  raise notice 'time spent for create_keys_of_full_texts_from_related_entity_previews=%', clock_timestamp() - t;

  -- #2 create_pk_entity_for_entity_label
  t = clock_timestamp();

  FOR item IN (SELECT * FROM temp_items) LOOP 
   PERFORM warehouse.create_pk_entity_for_entity_label(item.pk_entity, item.fk_project);
  END LOOP;
  
  raise notice 'time spent for create_pk_entity_for_entity_label=%', clock_timestamp() - t;


  -- #3 fill_own_entity_label_of_entity_preview
  t = clock_timestamp();

  FOR item IN (SELECT * FROM temp_items) LOOP 
   PERFORM warehouse.fill_own_entity_label_of_entity_preview(item.pk_entity, item.fk_project);
  END LOOP;
  
  raise notice 'time spent for fill_own_entity_label_of_entity_preview=%', clock_timestamp() - t;


  -- #4 fill_own_full_text_of_entity_preview
  t = clock_timestamp();

  FOR item IN (SELECT * FROM temp_items) LOOP 
    PERFORM warehouse.fill_own_full_text_of_entity_preview(item.pk_entity, item.fk_project);
  END LOOP;
  
  raise notice 'time spent for fill_own_full_text_of_entity_preview=%', clock_timestamp() - t;

  -- apply strings to dependent previews

  --  FOR item IN (SELECT * FROM temp_items)
  --  LOOP 
  --
  --    -- #5 fill_dependent_entity_labels
  --    PERFORM warehouse.fill_dependent_entity_labels(item.pk_entity, item.fk_project);
  --
  --    -- #6 fill_dependent_full_texts
  --    PERFORM warehouse.fill_dependent_full_texts(item.pk_entity, item.fk_project);
  --
  --  END LOOP;



  DROP TABLE temp_items;

  -- return the fresh entity_preview table
  SELECT * INTO results FROM warehouse.entity_preview;

  RETURN results;

  END;
  $$ LANGUAGE plpgsql;

  
  

  `

  db.runSql(sql, callback)

};

exports.down = function (db, callback) {

  const sql = `
  
  -- 7
  DROP FUNCTION warehouse.create_all_entity_previews();

  -- 6
  DROP FUNCTION warehouse.fill_dependent_full_texts(integer, integer);

  -- 5
  DROP FUNCTION warehouse.fill_dependent_entity_labels(integer, integer);

  -- 4
  DROP FUNCTION warehouse.fill_own_full_text_of_entity_preview(integer, integer);

  -- 3
  DROP FUNCTION warehouse.fill_own_entity_label_of_entity_preview(integer, integer);

  -- 2
  DROP FUNCTION warehouse.create_pk_entity_for_entity_label(integer, integer);

  -- 1
  DROP FUNCTION warehouse.create_keys_of_full_texts_from_related_entity_previews(integer, integer);

  `

  db.runSql(sql, callback)
};

exports._meta = {
  "version": 1
};
