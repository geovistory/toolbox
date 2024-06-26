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
  -- FUNCTION entity_preview__create_related_full_texts                                      #1
  ------------------------------------------------------------------------------------------------------------
  CREATE OR REPLACE FUNCTION warehouse.entity_preview__create_related_full_texts(
    param_pk_entity integer,
    param_fk_project integer
  )
  RETURNS BOOLEAN AS $$
  DECLARE 
    new_related_full_texts jsonb;
    param_project INT;
  BEGIN
      RAISE INFO 'entity_preview__create_related_full_texts pk_entity: %, fk_project: %', param_pk_entity, param_fk_project;
	
		param_project = coalesce(param_fk_project, 0);
		
     	---------------------- REPO AND PROJECT VERSIONS ----------------------
		WITH full_text_dependencies AS (
			SELECT r.fk_temporal_entity as pk_entity, r.project, r.fk_project, e.pk_entity as pk_related_full_text, pre.own_full_text
			FROM warehouse.v_roles_per_project_and_repo r
			JOIN information.entity e ON e.pk_entity = r.fk_entity AND e.table_name = 'persistent_item'
			LEFT JOIN warehouse.entity_preview pre ON pre.pk_entity = e.pk_entity AND pre.project = r.project
			WHERE r.fk_temporal_entity = param_pk_entity
			UNION
			SELECT r.fk_entity as pk_entity, r.project,  r.fk_project,  e.pk_entity as pk_related_full_text, pre.own_full_text
			FROM warehouse.v_roles_per_project_and_repo r
			JOIN information.entity e ON e.pk_entity = r.fk_temporal_entity AND e.table_name = 'temporal_entity'
			LEFT JOIN warehouse.entity_preview pre ON pre.pk_entity = e.pk_entity AND pre.project = r.project
			WHERE r.fk_entity = param_pk_entity
		), 
		aggregated_related_full_texts AS(
			select pk_entity, project, fk_project, jsonb_object_agg(full_text_dependencies.pk_related_full_text::text, full_text_dependencies.own_full_text) related_full_texts
			FROM full_text_dependencies
			group by pk_entity, project, fk_project
		)
        select related_full_texts INTO new_related_full_texts 
        FROM aggregated_related_full_texts;

        RAISE INFO 'new_related_full_texts: %', new_related_full_texts;

        ----- Insert or update the entity_preview
        
        PERFORM pk_entity 
        FROM warehouse.entity_preview pre
        WHERE pre.pk_entity = param_pk_entity 
        AND pre.fk_project IS NOT DISTINCT FROM  param_fk_project;

        IF NOT FOUND THEN 
            INSERT INTO warehouse.entity_preview (pk_entity, fk_project, project, related_full_texts)
            VALUES (param_pk_entity, param_fk_project, param_project, new_related_full_texts);

            RAISE INFO 'inserted new_related_full_texts: %', new_related_full_texts;

        ELSE
           
          UPDATE warehouse.entity_preview pre
                SET related_full_texts = new_related_full_texts
                where pre.pk_entity = param_pk_entity 
          AND pre.fk_project IS NOT DISTINCT FROM  param_fk_project
          AND (
            pre.related_full_texts @> new_related_full_texts
            AND
            pre.related_full_texts <@ new_related_full_texts
            )  IS DISTINCT FROM true;
   
        END IF;


      RETURN true;
  END;
  $$ LANGUAGE plpgsql;


  ------------------------------------------------------------------------------------------------------------
  -- FUNCTION entity_preview__create_fk_entity_label                                      #2
  ------------------------------------------------------------------------------------------------------------
  CREATE OR REPLACE FUNCTION warehouse.entity_preview__create_fk_entity_label(
    param_pk_entity integer,
    param_fk_project integer
  )
  RETURNS JSONB AS $$
  DECLARE
   old_fk_entity_label INT;
   new_fk_entity_label INT;
   result_info JSONB;
  BEGIN

      ---------------------- REPO VERSIONS ----------------------

      IF param_fk_project IS NULL THEN
      
 		RAISE INFO 'entity_preview__create_fk_entity_label of pk_entity: %, fk_project: %', param_pk_entity, param_fk_project;

        -- get the fk_entity_label
			
			SELECT pk INTO new_fk_entity_label 
			FROM 
			(
				(
          SELECT fk_temporal_entity as pk, r.rank_for_pe_it as rank
          FROM information.v_role r
          JOIN commons.ui_context_config ucc ON ucc.fk_property = r.fk_property 
            AND ucc.ord_num = 0  
            AND ucc.property_is_outgoing = false
            AND ucc.fk_ui_context = 45
          JOIN information.entity e on r.fk_temporal_entity = e.pk_entity AND e.table_name = 'temporal_entity'
          WHERE r.fk_entity = param_pk_entity 
				  AND r.is_in_project_count > 0
				)
				UNION
				(
          SELECT r.fk_entity as pk, r.rank_for_te_ent as rank
          FROM information.v_role r
          JOIN commons.ui_context_config ucc ON ucc.fk_property = r.fk_property 
            AND ucc.ord_num = 0 
            AND ucc.property_is_outgoing = true
            AND ucc.fk_ui_context = 45
          JOIN information.entity e on r.fk_entity = e.pk_entity AND e.table_name = 'persistent_item'
          WHERE r.fk_temporal_entity = param_pk_entity 
          AND r.is_in_project_count > 0
				)
			) AS a
			ORDER BY rank
			LIMIT 1;

        RAISE INFO 'new_fk_entity_label: %', new_fk_entity_label;
		
        ----- Insert or update column fk_entity_label of table entity_preview
        
        SELECT fk_entity_label INTO old_fk_entity_label FROM warehouse.entity_preview
        WHERE pk_entity = param_pk_entity AND fk_project IS NULL;
		
		RAISE INFO 'old_fk_entity_label: %', old_fk_entity_label;

        IF NOT FOUND THEN 
		
            INSERT INTO warehouse.entity_preview (pk_entity, fk_project, fk_entity_label)
            VALUES (param_pk_entity, param_fk_project, new_fk_entity_label);

            RAISE INFO 'inserted new_fk_entity_label: %', new_fk_entity_label;

        ELSIF (SELECT (old_fk_entity_label IS DISTINCT FROM new_fk_entity_label)) THEN
			   
            UPDATE warehouse.entity_preview 
            SET fk_entity_label = new_fk_entity_label
            where pk_entity=param_pk_entity AND fk_project IS NULL;

            RAISE INFO 'updated object with new_object: %', new_fk_entity_label;
        ELSE
            RAISE INFO 'no update needed: %', new_fk_entity_label;
        END IF;
					   
					   
      ---------------------- PROJECTS VERSIONS ----------------------

      ELSE

        RAISE INFO 'entity_preview__create_fk_entity_label of pk_entity: %, fk_project: %', param_pk_entity, param_fk_project;

        -- get the fk_entity_label
			
			SELECT pk INTO new_fk_entity_label 
			FROM 
			(
				(
          SELECT fk_temporal_entity as pk, epr.ord_num
          FROM information.role r
          JOIN information.entity_version_project_rel epr ON epr.fk_entity = r.pk_entity 
          JOIN commons.ui_context_config ucc ON ucc.fk_property = r.fk_property 
            AND ucc.ord_num = 0  
            AND ucc.property_is_outgoing = false
            AND ucc.fk_ui_context = 45
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
          JOIN commons.ui_context_config ucc ON ucc.fk_property = r.fk_property 
            AND ucc.ord_num = 0 
            AND ucc.property_is_outgoing = true
            AND ucc.fk_ui_context = 45
          JOIN information.entity e on r.fk_entity = e.pk_entity AND e.table_name = 'persistent_item'
          WHERE r.fk_temporal_entity = param_pk_entity 
          AND epr.fk_project = param_fk_project
          AND epr.is_in_project = true
				)
			) AS a
			ORDER BY ord_num
			LIMIT 1;

        RAISE INFO 'new_fk_entity_label: %', new_fk_entity_label;
		
        ----- Insert or update column fk_entity_label of table entity_preview
        
        SELECT fk_entity_label INTO old_fk_entity_label FROM warehouse.entity_preview
        WHERE pk_entity = param_pk_entity AND fk_project = param_fk_project;
		
		RAISE INFO 'old_fk_entity_label: %', old_fk_entity_label;

        IF NOT FOUND THEN 
		
            INSERT INTO warehouse.entity_preview (pk_entity, fk_project, fk_entity_label)
            VALUES (param_pk_entity, param_fk_project, new_fk_entity_label);

            RAISE INFO 'inserted new_fk_entity_label: %', new_fk_entity_label;

        ELSIF (SELECT (old_fk_entity_label IS DISTINCT FROM new_fk_entity_label)) THEN
			   
            UPDATE warehouse.entity_preview 
            SET fk_entity_label = new_fk_entity_label
            where pk_entity=param_pk_entity AND fk_project=param_fk_project;

            RAISE INFO 'updated object with new_fk_entity_label: %', new_fk_entity_label;
        ELSE
            RAISE INFO 'no update needed: %', new_fk_entity_label;
        END IF;

      END IF; 

      SELECT jsonb_build_object(
        'changed', (SELECT (old_fk_entity_label IS DISTINCT FROM new_fk_entity_label)),
        'old_val', old_fk_entity_label,
        'new_val', new_fk_entity_label) 
      INTO result_info;

      RETURN result_info;
  END;
  $$ LANGUAGE plpgsql;
  

  ------------------------------------------------------------------------------------------------------------
  -- FUNCTION entity_preview__create_fk_type                                      #3
  ------------------------------------------------------------------------------------------------------------
  CREATE OR REPLACE FUNCTION warehouse.entity_preview__create_fk_type(
    param_pk_entity integer,
    param_fk_project integer
  )
  RETURNS JSONB AS $$
  DECLARE
    old_fk_type INT;
    new_fk_type INT;
    result_info JSONB;
    has_type_properties INT[] = ARRAY[1110, 1190, 1205, 1206, 1214, 1204, 1066];
  BEGIN

    RAISE INFO 'entity_preview__create_fk_type of pk_entity: %, fk_project: %', param_pk_entity, param_fk_project;

    
    IF param_fk_project IS NULL THEN
      ------------------------------------ REPO QUERY ------------------------------------
      SELECT DISTINCT ea.fk_range_entity INTO new_fk_type 
      FROM information.v_entity_association ea
      JOIN information.entity_version_project_rel epr ON ea.pk_entity = epr.fk_entity
      JOIN data_for_history.property p ON ea.fk_property = p.dfh_pk_property
      WHERE p.dfh_pk_property = ANY (ARRAY[1110, 1190, 1205, 1206, 1214, 1204, 1066])
      AND ea.fk_domain_entity = param_pk_entity
      AND ea.rank_for_domain = 1
      LIMIT 1;
    ELSE
        ---------------------------------- PROJECT QUERY ----------------------------------         
        SELECT DISTINCT ea.fk_range_entity INTO new_fk_type 
        FROM information.entity_association ea
        JOIN information.entity_version_project_rel epr ON ea.pk_entity = epr.fk_entity
        JOIN data_for_history.property p ON ea.fk_property = p.dfh_pk_property
        WHERE p.dfh_pk_property = ANY (has_type_properties)
        AND ea.fk_domain_entity = param_pk_entity
        AND epr.is_in_project = true
        AND epr.fk_project = param_fk_project
        LIMIT 1;
    END IF; 

    RAISE INFO 'new_fk_type: %', new_fk_type;
		
        ----- Insert or update column fk_type of table entity_preview
        
        SELECT fk_type INTO old_fk_type FROM warehouse.entity_preview
        WHERE pk_entity = param_pk_entity AND fk_project IS NOT DISTINCT FROM param_fk_project;
		
		RAISE INFO 'old_fk_type: %', old_fk_type;

    IF NOT FOUND THEN 

        INSERT INTO warehouse.entity_preview (pk_entity, fk_project, fk_type)
        VALUES (param_pk_entity, param_fk_project, new_fk_type);

        RAISE INFO 'inserted new_fk_type: %', new_fk_type;

    ELSIF (SELECT (old_fk_type IS DISTINCT FROM new_fk_type)) THEN
      
        UPDATE warehouse.entity_preview 
        SET fk_type = new_fk_type
        where pk_entity=param_pk_entity AND fk_project IS NOT DISTINCT FROM param_fk_project;

        RAISE INFO 'updated object with new_fk_type: %', new_fk_type;
    ELSE
        RAISE INFO 'no update needed: %', new_fk_type;
    END IF;


    SELECT jsonb_build_object(
      'changed', (SELECT (old_fk_type IS DISTINCT FROM new_fk_type)),
      'old_val', old_fk_type,
      'new_val', new_fk_type) 
    INTO result_info;

    RETURN result_info;

  END;
  $$ LANGUAGE plpgsql;
  


  ------------------------------------------------------------------------------------------------------------
  -- FUNCTION entity_preview__fill_own_entity_label                      				                #4
  ------------------------------------------------------------------------------------------------------------
  CREATE OR REPLACE FUNCTION warehouse.entity_preview__fill_own_entity_label(
  param_pk_entity integer,
  param_fk_project integer
  )
  RETURNS BOOLEAN AS $$
  DECLARE
  old_own_entity_label TEXT;
  new_own_entity_label TEXT;
  BEGIN

  
  
  -- if this has a fk_entity_label skip the whole function
  -- because the entity label is provided by that other entity 
  IF (
    SELECT (
      SELECT fk_entity_label 
      FROM warehouse.entity_preview
      WHERE pk_entity = param_pk_entity AND fk_project IS NOT DISTINCT FROM param_fk_project
      LIMIT 1
      ) IS NULL
  ) THEN
    
    IF param_fk_project IS NULL THEN
    
    ---------------------- REPO VERSIONS ----------------------
      RAISE INFO 'entity_preview__fill_own_entity_label of pk_entity: %, fk_project: %', param_pk_entity, param_fk_project;

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


      ---------------------- PROJECTS VERSIONS ----------------------

      ELSE

      RAISE INFO 'entity_preview__fill_own_entity_label of pk_entity: %, fk_project: %', param_pk_entity, param_fk_project;

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


        
        
      END IF; 
        



      RAISE INFO 'new_own_entity_label: %', new_own_entity_label;


      ----- Insert or update column own_entity_label of table entity_preview

      SELECT entity_label INTO old_own_entity_label FROM warehouse.entity_preview
      WHERE pk_entity = param_pk_entity AND fk_project IS NOT DISTINCT FROM param_fk_project;

      RAISE INFO 'old_own_entity_label: %', old_own_entity_label;

      IF NOT FOUND THEN 

        INSERT INTO warehouse.entity_preview (pk_entity, fk_project, entity_label)
        VALUES (param_pk_entity, param_fk_project, new_own_entity_label);

        RAISE INFO 'inserted new_own_entity_label: %', new_own_entity_label;

      ELSIF (SELECT (old_own_entity_label IS DISTINCT FROM new_own_entity_label)) THEN

        UPDATE warehouse.entity_preview 
        SET entity_label = new_own_entity_label
        where pk_entity=param_pk_entity AND fk_project IS NOT DISTINCT FROM param_fk_project;

        RAISE INFO 'updated object with new_own_entity_label: %', new_own_entity_label;
      ELSE
        RAISE INFO 'no update needed: %', new_own_entity_label;
      END IF;

    END IF;
    RETURN true;
  END;
  $$ LANGUAGE plpgsql;


  ------------------------------------------------------------------------------------------------------------
  -- FUNCTION entity_preview__fill_own_full_text                      				                #5
  ------------------------------------------------------------------------------------------------------------
  CREATE OR REPLACE FUNCTION warehouse.entity_preview__fill_own_full_text(
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
  
      RAISE INFO 'entity_preview__fill_own_full_text of: pk_entity: %, fk_project: %', param_pk_entity, param_fk_project;
  
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
               
      RAISE INFO 'entity_preview__fill_own_full_text of: pk_entity: %, fk_project: %', param_pk_entity, param_fk_project;
  
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
  -- FUNCTION entity_preview__fill_dependent_entity_labels                      				                #6
  ------------------------------------------------------------------------------------------------------------
  CREATE OR REPLACE FUNCTION warehouse.entity_preview__fill_dependent_entity_labels(
  param_pk_entity integer,
  param_fk_project integer
  )
  RETURNS BOOLEAN AS $$
  DECLARE
  new_entity_label TEXT;
  dependent_entity_label TEXT;
  BEGIN
  
    ---------------------- REPO & PROJECTS VERSIONS ----------------------
               
    RAISE INFO 'entity_preview__fill_dependent_entity_labels of pk_entity: %, fk_project: %', param_pk_entity, param_fk_project;
  
    -- get new_entity_label
    SELECT entity_label INTO new_entity_label
    FROM warehouse.entity_preview
    WHERE pk_entity = param_pk_entity
    AND fk_project IS NOT DISTINCT FROM param_fk_project;
  
    RAISE INFO 'new_entity_label: %', new_entity_label;
  
    -- update all dependent entity_previews with new_entity_label (if DISTINCT)
    UPDATE warehouse.entity_preview
    SET entity_label = new_entity_label
    WHERE fk_entity_label = param_pk_entity
    AND fk_project IS NOT DISTINCT FROM param_fk_project
    AND entity_label IS DISTINCT FROM new_entity_label;
  
  
    RETURN true;
  END;
  $$ LANGUAGE plpgsql;


  ------------------------------------------------------------------------------------------------------------
  -- FUNCTION entity_preview__fill_dependent_related_full_texts                      				               #7
  ------------------------------------------------------------------------------------------------------------
  CREATE OR REPLACE FUNCTION warehouse.entity_preview__fill_dependent_related_full_texts(
  param_pk_entity integer,
  param_fk_project integer
  )
  RETURNS BOOLEAN AS $$
  DECLARE
  new_own_full_text TEXT;
  BEGIN
  
    ---------------------- REPO & PROJECTS VERSIONS ----------------------
               
    RAISE INFO 'entity_preview__fill_dependent_related_full_texts of pk_entity: %, fk_project: %', param_pk_entity, param_fk_project;
  
    -- get new_own_full_text
    SELECT own_full_text INTO new_own_full_text
    FROM warehouse.entity_preview
    WHERE pk_entity = param_pk_entity
    AND fk_project IS NOT DISTINCT FROM param_fk_project;
  
    RAISE INFO 'new_own_full_text: %', new_own_full_text;
  
  
    -- update all related_full_texts with new_own_full_text (if DISTINCT)
    UPDATE warehouse.entity_preview
    SET related_full_texts = (	
      SELECT jsonb_set(
        related_full_texts,
         array_agg(param_pk_entity::text),
         to_jsonb(new_own_full_text)
        )
      )												   
    WHERE related_full_texts ? param_pk_entity::text 
    AND related_full_texts->>param_pk_entity::text IS DISTINCT FROM new_own_full_text
    AND fk_project IS NOT DISTINCT FROM param_fk_project;
  
    RETURN true;
  END;
  $$ LANGUAGE plpgsql;


  ------------------------------------------------------------------------------------------------------------
  -- FUNCTION entity_preview__fill_dependent_class_labels                        				                #8
  ------------------------------------------------------------------------------------------------------------
  CREATE OR REPLACE FUNCTION warehouse.entity_preview__fill_dependent_class_labels(
  pk_class integer,
  param_class_label TEXT default NULL
  )
  RETURNS BOOLEAN AS $$
  DECLARE
    new_class_label TEXT;
  BEGIN
  
    ---------------------- REPO & PROJECTS VERSIONS ----------------------
               
    RAISE INFO 'entity_preview__fill_dependent_class_labels of pk_entity: %', pk_class;
  
    -- get new_class_label
    IF (param_class_label IS NULL) THEN 
      SELECT class_label INTO new_class_label
      FROM warehouse.class_preview
      WHERE dfh_pk_class = pk_class;
    ELSE
      new_class_label = param_class_label;
    END IF; 

    RAISE INFO 'new_class_label: %', new_class_label;
  
    -- update all dependent entity_previews with new_class_label (if DISTINCT)
    UPDATE warehouse.entity_preview
    SET class_label = new_class_label
    WHERE fk_class = pk_class
    AND class_label IS DISTINCT FROM new_class_label;
  
    RETURN true;
  END;
  $$ LANGUAGE plpgsql;


  ------------------------------------------------------------------------------------------------------------
  -- FUNCTION entity_preview__fill_dependent_type_labels                      				                #9
  ------------------------------------------------------------------------------------------------------------
  CREATE OR REPLACE FUNCTION warehouse.entity_preview__fill_dependent_type_labels(
  param_pk_entity integer,
  param_fk_project integer
  )
  RETURNS BOOLEAN AS $$
  DECLARE
  new_type_label TEXT;
  dependent_type_label TEXT;
  BEGIN
  
    ---------------------- REPO & PROJECTS VERSIONS ----------------------
               
    RAISE INFO 'entity_preview__fill_dependent_type_labels of pk_entity: %, fk_project: %', param_pk_entity, param_fk_project;
  
    -- get new_type_label
    SELECT entity_label INTO new_type_label
    FROM warehouse.entity_preview
    WHERE pk_entity = param_pk_entity
    AND fk_project IS NOT DISTINCT FROM param_fk_project;
  
    RAISE INFO 'new_type_label: %', new_type_label;
  
    -- update all dependent entity_previews with new_type_label (if DISTINCT)
    UPDATE warehouse.entity_preview
    SET type_label = new_type_label
    WHERE fk_type = param_pk_entity
    AND fk_project IS NOT DISTINCT FROM param_fk_project
    AND type_label IS DISTINCT FROM new_type_label;
  
    RETURN true;
  END;
  $$ LANGUAGE plpgsql;


  ------------------------------------------------------------------------------------------------------------
  -- FUNCTION entity_preview__fill_time_span                   				                #10
  ------------------------------------------------------------------------------------------------------------
  CREATE OR REPLACE FUNCTION warehouse.entity_preview__fill_time_span(
  param_pk_entity integer,
  param_fk_project integer
  )
  RETURNS BOOLEAN AS $$
  DECLARE
  new_time_span jsonb;
  BEGIN
  
    ---------------------- REPO & PROJECTS VERSIONS ----------------------
               
    RAISE INFO 'entity_preview__fill_time_span: %, fk_project: %', param_pk_entity, param_fk_project;
  
    -- get new_time_span
	SELECT time_span INTO new_time_span
	FROM information.v_te_en_time_span_per_project_and_repo
	WHERE fk_temporal_entity = param_pk_entity 
	AND fk_project IS NOT DISTINCT FROM param_fk_project;
  
    RAISE INFO 'new_time_span: %', new_time_span;
  
    -- update this entity_preview with new_time_span
    UPDATE warehouse.entity_preview
    SET time_span = new_time_span
    WHERE pk_entity = param_pk_entity
    AND fk_project IS NOT DISTINCT FROM param_fk_project;
  
    RETURN true;
  END;
  $$ LANGUAGE plpgsql;


  ------------------------------------------------------------------------------------------------------------
  -- FUNCTION entity_preview__create                      				                                    #11
  ------------------------------------------------------------------------------------------------------------
  CREATE OR REPLACE FUNCTION warehouse.entity_preview__create(
  param_pk_entity integer,
  param_fk_project integer
  )
  RETURNS BOOLEAN AS $$
  DECLARE 
    e warehouse.v_entities;
    c warehouse.class_preview;
    p INT;
  BEGIN
    
    ---------- upsert the unchagable rows ----------

    p = coalesce(param_fk_project, 0);

    SELECT * INTO e
    FROM warehouse.v_entities
    WHERE pk_entity = param_pk_entity
    AND fk_project IS NOT DISTINCT FROM param_fk_project;

    SELECT * INTO c
    FROM warehouse.class_preview as cpre
    WHERE cpre.dfh_pk_class = e.fk_class;

   
    INSERT INTO warehouse.entity_preview (pk_entity, fk_project, project, fk_class, entity_type, class_label)
    VALUES (
      param_pk_entity,
      param_fk_project,
      p, -- project
      e.fk_class,
      e.entity_type,
      c.class_label
    )
    ON CONFLICT (pk_entity, project) 
    DO
      UPDATE
        SET fk_class = e.fk_class, entity_type = e.entity_type, class_label = c.class_label
          WHERE entity_preview.pk_entity = param_pk_entity AND entity_preview.project = p;


    ---------- first create the dependency indexes ----------
    
    PERFORM warehouse.entity_preview__create_related_full_texts(param_pk_entity, param_fk_project);
    
    PERFORM warehouse.entity_preview__create_fk_entity_label(param_pk_entity, param_fk_project);
    
    PERFORM warehouse.entity_preview__create_fk_type(param_pk_entity, param_fk_project);

    ---------- second fill the own entity_label and own_full_text  ----------
    
    PERFORM warehouse.entity_preview__fill_own_entity_label(param_pk_entity, param_fk_project);
    
    PERFORM warehouse.entity_preview__fill_own_full_text(param_pk_entity, param_fk_project);
    
    
    ---------- third fill the dependencies ----------
    
    PERFORM warehouse.entity_preview__fill_dependent_entity_labels(param_pk_entity, param_fk_project);  
    
    PERFORM warehouse.entity_preview__fill_dependent_related_full_texts(param_pk_entity, param_fk_project);
    
    PERFORM warehouse.entity_preview__fill_dependent_type_labels(param_pk_entity, param_fk_project);
    
    RETURN true;
  END;
  $$ LANGUAGE plpgsql;


  ------------------------------------------------------------------------------------------------------------
  -- FUNCTION entity_preview__create_all                                                                  #12
  ------------------------------------------------------------------------------------------------------------
  CREATE OR REPLACE FUNCTION warehouse.entity_preview__create_all()
  RETURNS BOOLEAN AS $$

  DECLARE 
    item record;
    results warehouse.entity_preview;
    t timestamptz;
    number_of_unfinished INT;
  BEGIN

  t = clock_timestamp();

  -- empty table entity_preview
  DELETE from warehouse.entity_preview;

  CREATE TABLE warehouse.temp AS SELECT * FROM warehouse.v_entity_preview;

  WITH previews_non_recursive AS (
    SELECT * FROM warehouse.temp
    ),
    fill_entity_label AS (
    SELECT 
    t1.pk_entity,
    t1.fk_project,
    t1.project,
    t1.fk_class,
    t1.entity_type,
    t1.class_label,
    coalesce(t2.entity_label, t1.entity_label) entity_label,
    t1.time_span,
    t1.own_full_text,
    t1.fk_entity_label,
    t1.fk_type
    FROM warehouse.previews_non_recursive t1
    LEFT JOIN warehouse.previews_non_recursive t2
    ON t1.fk_entity_label = t2.pk_entity
    AND t1.project = t2.project
    ),
    fill_type_label AS (
    SELECT 
    t1.*,
    t2.entity_label type_label
    FROM fill_entity_label t1
    LEFT JOIN fill_entity_label t2
    ON t1.fk_type = t2.pk_entity
    AND t1.project = t2.project
    ),
  full_text_dependencies AS (
    SELECT r.fk_temporal_entity as pk_entity, r.project, r.fk_project, e.pk_entity as pk_related_full_text, pre.own_full_text
    FROM warehouse.v_roles_per_project_and_repo r
    JOIN information.entity e ON e.pk_entity = r.fk_entity AND e.table_name = 'persistent_item'
    LEFT JOIN previews_non_recursive pre ON pre.pk_entity = e.pk_entity AND pre.project = r.project
    UNION
    SELECT r.fk_entity as pk_entity, r.project,  r.fk_project,  e.pk_entity as pk_related_full_text, pre.own_full_text
    FROM warehouse.v_roles_per_project_and_repo r
    JOIN information.entity e ON e.pk_entity = r.fk_temporal_entity AND e.table_name = 'temporal_entity'
    LEFT JOIN previews_non_recursive pre ON pre.pk_entity = e.pk_entity AND pre.project = r.project
    ), 
    aggregated_related_full_texts AS(
    select pk_entity, project, fk_project, jsonb_object_agg(full_text_dependencies.pk_related_full_text::text, full_text_dependencies.own_full_text) related_full_texts
    FROM full_text_dependencies
    group by pk_entity, project, fk_project
    ),
    related_full_text AS (
    SELECT t1.*, t2.related_full_texts
    FROM fill_type_label t1
    LEFT JOIN aggregated_related_full_texts t2
     ON t1.pk_entity = t2.pk_entity
     AND t1.project = t2.project
    ),
    add_full_text AS (
    SELECT 
      *, 
      (
      SELECT array_to_string(ARRAY[
        --coalesce(f.type_label, f.class_label, ''),
        f.own_full_text,
        array_to_string(array_agg(value), ', ')
      ]::text[] , ', ')
      FROM jsonb_each_text(f.related_full_texts)	
      ) as full_text	 
    FROM related_full_text  f   
    ),
    add_ts_vector AS (
    SELECT 
      t.*,
      setweight(to_tsvector(coalesce(t.entity_label, '')), 'A') || 
      setweight(to_tsvector(coalesce(t.type_label, t.class_label, '')), 'B') || 
      setweight(to_tsvector(coalesce(t.full_text,'')), 'C') as ts_vector
    FROM add_full_text t
    ),
    updated AS (
      SELECT * FROM add_ts_vector
  )
  UPDATE warehouse.temp 
  SET entity_label = updated.entity_label
  FROM updated
  WHERE temp.pk_entity = updated.pk_entity 
  AND temp.fk_project IS NOT DISTINCT FROM updated.fk_project;
        
  SELECT count(*) INTO number_of_unfinished
  FROM warehouse.temp a
  JOIN warehouse.temp b ON a.fk_entity_label = b.pk_entity AND a.entity_label IS DISTINCT FROM b.entity_label 
  AND a.project = b.project;

  raise notice 'number_of_unfinished entity_previews (if zero, everything fine): %', number_of_unfinished;

  
  -- empty table entity_preview
  DELETE from warehouse.entity_preview;
  
  INSERT INTO warehouse.entity_preview  (  
    pk_entity,
    fk_project,
    project,
    fk_class,
    entity_type,
    class_label,
    entity_label,
    time_span,
    own_full_text,
    fk_entity_label,
    fk_type,
    type_label,
    related_full_texts,
    full_text,
    ts_vector
  )
  SELECT   
    pk_entity,
    fk_project,
    project,
    fk_class,
    entity_type,
    class_label,
    entity_label,
    time_span,
    own_full_text,
    fk_entity_label,
    fk_type,
    type_label,
    related_full_texts,
    full_text,
    ts_vector
  FROM  warehouse.temp;
          
  DROP TABLE warehouse.temp;

  raise notice 'time spent for entity_preview__fill_own_full_text=%', clock_timestamp() - t;

 
  RETURN TRUE;

  END;
  $$ LANGUAGE plpgsql;



  ------------------------------------------------------------------------------------------------------------
  -- FUNCTION                                                                   #13
  ------------------------------------------------------------------------------------------------------------
  CREATE OR REPLACE FUNCTION warehouse.notify_fn_call(channel TEXT, fn_name TEXT, fn_params TEXT[])
  RETURNS BOOLEAN AS $$
  DECLARE 
    fn_concat TEXT;
  BEGIN

    fn_concat = fn_name || '(' || array_to_string(fn_params, ',', 'NULL'::text) || ')';

    PERFORM pg_notify(
      channel, 
      json_build_object('fn', fn_concat)::text
    );
  
  RETURN TRUE;

  END;
  $$ LANGUAGE plpgsql;
  

  ------------------------------------------------------------------------------------------------------------
  -- FUNCTION needs_update                                                                  #14
  ------------------------------------------------------------------------------------------------------------
  CREATE OR REPLACE FUNCTION warehouse.needs_update(fn_name TEXT, fn_params TEXT[])
  RETURNS BOOLEAN AS $$
  DECLARE 
    fn_name_concat TEXT;
  BEGIN

    fn_name_concat = array_to_string(ARRAY['warehouse.', fn_name],'');

    PERFORM warehouse.notify_fn_call('warehouse_update_request'::text, fn_name_concat, fn_params);
  
  RETURN TRUE;

  END;
  $$ LANGUAGE plpgsql;
  `

  db.runSql(sql, callback)

};

exports.down = function (db, callback) {

  const sql = `
  -- 14
  DROP FUNCTION warehouse.needs_update(text, text[]);
  
  -- 13
  DROP FUNCTION warehouse.notify_fn_call(text, text, text[]);
  
  -- 12
  DROP FUNCTION warehouse.entity_preview__create_all();
  
  -- 11
  DROP FUNCTION warehouse.entity_preview__create(integer, integer);
  
  -- 10
  DROP FUNCTION warehouse.entity_preview__fill_time_span(integer, integer);
 
  -- 9
  DROP FUNCTION warehouse.entity_preview__fill_dependent_type_labels(integer, integer);
  
  -- 8
  DROP FUNCTION warehouse.entity_preview__fill_dependent_class_labels(integer, text);
  
  -- 7
  DROP FUNCTION warehouse.entity_preview__fill_dependent_related_full_texts(integer, integer);

  -- 6
  DROP FUNCTION warehouse.entity_preview__fill_dependent_entity_labels(integer, integer);

  -- 5
  DROP FUNCTION warehouse.entity_preview__fill_own_full_text(integer, integer);

  -- 4
  DROP FUNCTION warehouse.entity_preview__fill_own_entity_label(integer, integer);
 
  -- 3
  DROP FUNCTION warehouse.entity_preview__create_fk_type(integer, integer);
  
  -- 2
  DROP FUNCTION warehouse.entity_preview__create_fk_entity_label(integer, integer);

  -- 1
  DROP FUNCTION warehouse.entity_preview__create_related_full_texts(integer, integer);

  `

  db.runSql(sql, callback)
};

exports._meta = {
  "version": 1
};
