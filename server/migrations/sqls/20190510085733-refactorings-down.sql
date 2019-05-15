
-- 16

CREATE OR REPLACE FUNCTION information.v_time_primitive_find_or_create()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF 
AS $BODY$
    DECLARE
      resulting_row information.time_primitive;
    BEGIN

          -- RAISE INFO 'input values: %', NEW;
        
      ------ if existing, store in result -----
      SELECT * FROM INTO resulting_row information.time_primitive
        WHERE              
            julian_day = NEW.julian_day
            AND duration = NEW.duration
            AND fk_class = NEW.fk_class;

            -- RAISE INFO 'result of select: %', resulting_row;

      ------- if not existing, insert and store in result -----
        IF NOT FOUND THEN
          
              -- RAISE INFO 'Not found, creating new...';
        
            WITH _insert AS (
                INSERT INTO information.time_primitive (
                    julian_day, 
                    duration,
                    fk_class
                ) 
                VALUES (
                    NEW.julian_day, 
                    NEW.duration,
                    NEW.fk_class
                )
                -- return all fields of the new row
                RETURNING *
                ) 
            SELECT * FROM INTO resulting_row _insert;
        
              -- RAISE INFO 'result of insert: %', resulting_row;
      END IF;

    RETURN resulting_row;
      END;
      $BODY$;

-- 15

CREATE OR REPLACE FUNCTION warehouse.entity_preview__create_fk_type(
	param_pk_entity integer,
	param_fk_project integer)
    RETURNS jsonb
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE 
AS $BODY$
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
  $BODY$;


-- 14

CREATE OR REPLACE FUNCTION warehouse.entity_preview__fill_own_entity_label(
	param_pk_entity integer,
	param_fk_project integer)
    RETURNS boolean
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE 
AS $BODY$
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
  $BODY$;

-- 13

CREATE OR REPLACE FUNCTION warehouse.entity_preview__fill_own_full_text(
	param_pk_entity integer,
	param_fk_project integer)
    RETURNS boolean
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE 
AS $BODY$
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
  
          SELECT regexp_replace(txtp.string, E'[\n\r]+', '', 'g' ) as string, field_order
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
  
          SELECT regexp_replace(txtp.string, E'[\n\r]+', '', 'g' ) as string, field_order
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
  $BODY$;

-- 12

CREATE OR REPLACE FUNCTION warehouse.entity_preview__fill_time_span(
	param_pk_entity integer,
	param_fk_project integer)
    RETURNS boolean
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE 
AS $BODY$
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
  $BODY$;

-- 11

CREATE OR REPLACE FUNCTION warehouse.entity_preview__create_fk_entity_label(
	param_pk_entity integer,
	param_fk_project integer)
    RETURNS jsonb
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE 
AS $BODY$
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
  $BODY$;


-- 10
DROP VIEW information.v_persistent_item;
CREATE VIEW information.v_persistent_item AS
 SELECT persistent_item.pk_entity,
    persistent_item.schema_name,
    persistent_item.table_name,
    persistent_item.notes,
    persistent_item.fk_creator,
    persistent_item.fk_last_modifier,
    persistent_item.tmsp_creation,
    persistent_item.tmsp_last_modification,
    persistent_item.sys_period,
    persistent_item.fk_class
   FROM information.persistent_item;

-- 9
-- no way back

-- 8
CREATE OR REPLACE FUNCTION warehouse.entity_preview__upsert_entity_preview()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF 
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
          warehouse.needs_update('entity_preview__fill_own_entity_label'::text, ARRAY[_fk_entity::text, _fk_project::text]),
          warehouse.needs_update('entity_preview__fill_own_entity_label'::text, ARRAY[_fk_entity::text, NULL::text]),
          
          -- fill own full text
          warehouse.needs_update('entity_preview__fill_own_full_text'::text, ARRAY[_fk_entity::text, _fk_project::text]),
          warehouse.needs_update('entity_preview__fill_own_full_text'::text, ARRAY[_fk_entity::text, NULL::text]);
          
          
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

        --------------------- temporal_entity or persistent_item -----------------
        ELSIF (SELECT _table_name IN ('temporal_entity', 'persistent_item')) THEN
        
          RAISE INFO 'updated crm entity with pk_entity: %, fk_project: %', NEW.fk_entity, _fk_project;
          
          IF (NEW.is_in_project = true) THEN
            PERFORM
            -- create fk type
            warehouse.needs_update('entity_preview__create'::text, ARRAY[NEW.fk_entity::text, _fk_project::text]),
            warehouse.needs_update('entity_preview__create'::text, ARRAY[NEW.fk_entity::text, NULL::text]);

          ELSIF (NEW.is_in_project = false) THEN

            DELETE FROM warehouse.entity_preview 
            WHERE fk_project IS NOT DISTINCT FROM NEW.fk_project 
            AND pk_entity = NEW.fk_entity;

          END IF;
        END IF;
      
      
      
      RETURN NEW;
    END;
    $BODY$;

-- 7
CREATE OR REPLACE VIEW warehouse.v_text_properties_per_project_and_repo AS
 SELECT DISTINCT t.pk_entity,
    t.schema_name,
    t.table_name,
    t.notes,
    t.fk_creator,
    t.fk_last_modifier,
    t.tmsp_creation,
    t.tmsp_last_modification,
    t.sys_period,
    t.fk_concerned_entity,
    t.fk_language,
    t.fk_class_field,
    t.quill_doc,
    t.string,
    t.is_in_project_count,
    epr._deprecated_fk_project AS fk_project,
    COALESCE(epr._deprecated_fk_project, 0) AS "coalesce"
   FROM information.v_text_property t
     JOIN projects.info_proj_rel epr ON epr.fk_entity = t.pk_entity AND epr.is_in_project = true
UNION
 SELECT DISTINCT t.pk_entity,
    t.schema_name,
    t.table_name,
    t.notes,
    t.fk_creator,
    t.fk_last_modifier,
    t.tmsp_creation,
    t.tmsp_last_modification,
    t.sys_period,
    t.fk_concerned_entity,
    t.fk_language,
    t.fk_class_field,
    t.quill_doc,
    t.string,
    t.is_in_project_count,
    NULL::integer AS fk_project,
    0 AS "coalesce"
   FROM information.v_text_property t
  WHERE t.is_in_project_count > 0;
  
  -- 6
CREATE OR REPLACE VIEW information.v_text_property AS
 SELECT text_property.pk_entity,
    text_property.schema_name,
    text_property.table_name,
    text_property.notes,
    text_property.fk_creator,
    text_property.fk_last_modifier,
    text_property.tmsp_creation,
    text_property.tmsp_last_modification,
    text_property.sys_period,
    text_property.fk_concerned_entity,
    text_property.fk_language,
    text_property.fk_class_field,
    text_property.quill_doc,
    text_property.string,
    count(epr._deprecated_fk_project) AS is_in_project_count
   FROM information.text_property
     LEFT JOIN projects.info_proj_rel epr ON epr.fk_entity = text_property.pk_entity AND epr.is_in_project = true
  GROUP BY text_property.pk_entity, text_property.schema_name, text_property.table_name, text_property.notes, text_property.fk_creator, text_property.fk_last_modifier, text_property.tmsp_creation, text_property.tmsp_last_modification, text_property.sys_period, text_property._deprecated_text_property, text_property.fk_concerned_entity, text_property.quill_doc, text_property.fk_language, text_property.fk_class_field, text_property.string;


-- 5
CREATE OR REPLACE VIEW warehouse.v_roles_per_project_and_repo AS
 SELECT DISTINCT r.fk_entity,
    r.fk_temporal_entity,
    r.fk_property,
    epr._deprecated_fk_project AS fk_project,
    epr.ord_num AS rank_for_pe_it,
    epr.ord_num AS rank_for_te_ent,
    COALESCE(epr._deprecated_fk_project, 0) AS project
   FROM information.v_role r
     LEFT JOIN projects.info_proj_rel epr ON epr.fk_entity = r.pk_entity AND epr.is_in_project = true
UNION
 SELECT DISTINCT r.fk_entity,
    r.fk_temporal_entity,
    r.fk_property,
    NULL::integer AS fk_project,
    r.rank_for_pe_it,
    r.rank_for_te_ent,
    0 AS project
   FROM information.v_role r
  WHERE r.is_in_project_count > 0;

-- 4
ALTER VIEW warehouse.v_te_en_time_span_per_project_and_repo SET SCHEMA information;

CREATE OR REPLACE VIEW information.v_te_en_time_span_per_project_and_repo AS
 WITH role_with_time_primitive AS (
         SELECT r.fk_temporal_entity,
            r.fk_property,
            epr._deprecated_fk_project AS fk_project,
            epr.calendar,
            tp.julian_day,
            tp.duration
           FROM projects.info_proj_rel epr
             JOIN information.v_role r ON r.pk_entity = epr.fk_entity
             JOIN information.v_time_primitive tp ON tp.pk_entity = r.fk_entity
          WHERE epr.is_in_project = true
        UNION
         SELECT r.fk_temporal_entity,
            r.fk_property,
            NULL::integer AS fk_project,
            r.community_favorite_calendar,
            tp.julian_day,
            tp.duration
           FROM information.v_role r
             JOIN information.v_time_primitive tp ON tp.pk_entity = r.fk_entity AND r.rank_for_te_ent = 1
        )
 SELECT role_with_time_primitive.fk_project,
    role_with_time_primitive.fk_temporal_entity,
    jsonb_object_agg(
        CASE
            WHEN role_with_time_primitive.fk_property = 71 THEN 'p81'::text
            WHEN role_with_time_primitive.fk_property = 72 THEN 'p82'::text
            WHEN role_with_time_primitive.fk_property = 150 THEN 'p81a'::text
            WHEN role_with_time_primitive.fk_property = 151 THEN 'p81b'::text
            WHEN role_with_time_primitive.fk_property = 152 THEN 'p82a'::text
            WHEN role_with_time_primitive.fk_property = 153 THEN 'p82b'::text
            ELSE role_with_time_primitive.fk_property::text
        END, json_build_object('julianDay', role_with_time_primitive.julian_day, 'duration', role_with_time_primitive.duration, 'calendar', role_with_time_primitive.calendar)) AS time_span
   FROM role_with_time_primitive
  GROUP BY role_with_time_primitive.fk_project, role_with_time_primitive.fk_temporal_entity;


-- 3
CREATE OR REPLACE VIEW projects.v_info_proj_rel AS
 SELECT info_proj_rel.pk_entity,
    info_proj_rel.schema_name,
    info_proj_rel.table_name,
    info_proj_rel.notes,
    info_proj_rel.fk_creator,
    info_proj_rel.fk_last_modifier,
    info_proj_rel.tmsp_creation,
    info_proj_rel.tmsp_last_modification,
    info_proj_rel.sys_period,
    info_proj_rel._deprecated_pk_entity_version_project_rel AS pk_entity_version_project_rel,
    info_proj_rel._deprecated_fk_project AS fk_project,
    info_proj_rel.fk_entity,
    info_proj_rel.fk_entity_version,
    info_proj_rel.fk_entity_version_concat,
    info_proj_rel.is_in_project,
    info_proj_rel.is_standard_in_project,
    info_proj_rel.calendar,
    info_proj_rel.ord_num,
    info_proj_rel.entity_version
   FROM projects.info_proj_rel;
   
-- 2

CREATE OR REPLACE VIEW warehouse.v_entities AS
 SELECT DISTINCT e.pk_entity,
    epr._deprecated_fk_project AS fk_project,
    epr._deprecated_fk_project AS project,
        CASE
            WHEN pi.pk_entity IS NOT NULL THEN pi.fk_class
            ELSE te.fk_class
        END AS fk_class,
    e.table_name,
        CASE
            WHEN e.table_name::text = 'persistent_item'::text THEN 'peIt'::text
            WHEN e.table_name::text = 'temporal_entity'::text THEN 'teEn'::text
            ELSE NULL::text
        END AS entity_type
   FROM projects.info_proj_rel epr
     JOIN information.entity e ON e.pk_entity = epr.fk_entity
     LEFT JOIN information.persistent_item pi ON e.pk_entity = pi.pk_entity
     LEFT JOIN information.temporal_entity te ON e.pk_entity = te.pk_entity
  WHERE epr.is_in_project = true AND (e.table_name::text = ANY (ARRAY['temporal_entity'::character varying::text, 'persistent_item'::character varying::text]))
UNION
 SELECT DISTINCT e.pk_entity,
    NULL::integer AS fk_project,
    0 AS project,
        CASE
            WHEN pi.pk_entity IS NOT NULL THEN pi.fk_class
            ELSE te.fk_class
        END AS fk_class,
    e.table_name,
        CASE
            WHEN e.table_name::text = 'persistent_item'::text THEN 'peIt'::text
            WHEN e.table_name::text = 'temporal_entity'::text THEN 'teEn'::text
            ELSE NULL::text
        END AS entity_type
   FROM information.entity e
     LEFT JOIN information.persistent_item pi ON e.pk_entity = pi.pk_entity
     LEFT JOIN information.temporal_entity te ON e.pk_entity = te.pk_entity
  WHERE e.table_name::text = ANY (ARRAY['temporal_entity'::character varying::text, 'persistent_item'::character varying::text])
  ORDER BY 1;


-- 1
ALTER TABLE public.account_project_rel DROP COLUMN entity_version;
ALTER TABLE public.account_project_rel_vt DROP COLUMN entity_version;

-- ALTER TABLE public.account_project_rel ALTER COLUMN _deprecated_fk_project SET NOT NULL ;
-- ALTER TABLE public.account_project_rel_vt ALTER COLUMN _deprecated_fk_project SET NOT NULL;

CREATE TRIGGER creation_tmsp
    BEFORE INSERT
    ON public.account_project_rel
    FOR EACH ROW
    EXECUTE PROCEDURE commons.tmsp_creation();

CREATE TRIGGER insert_schema_table_name
    BEFORE INSERT
    ON public.account_project_rel
    FOR EACH ROW
    EXECUTE PROCEDURE commons.insert_schema_table_name();

CREATE TRIGGER last_modification_tmsp
    BEFORE INSERT OR UPDATE 
    ON public.account_project_rel
    FOR EACH ROW
    EXECUTE PROCEDURE commons.tmsp_last_modification();
