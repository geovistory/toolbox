-- 1 
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
  BEGIN

    RAISE INFO 'entity_preview__create_fk_type of pk_entity: %, fk_project: %', param_pk_entity, param_fk_project;

    
    IF param_fk_project IS NULL THEN
      ------------------------------------ REPO QUERY ------------------------------------
      SELECT DISTINCT ea.fk_info_range INTO new_fk_type 
      FROM information.v_entity_association ea
      JOIN projects.info_proj_rel epr ON ea.pk_entity = epr.fk_entity
      JOIN system.class_has_type_property p ON ea.fk_property = p.fk_property
      WHERE ea.fk_info_domain = param_pk_entity
      AND ea.rank_for_domain = 1
      LIMIT 1;
    ELSE
        ---------------------------------- PROJECT QUERY ----------------------------------         
        SELECT DISTINCT ea.fk_info_range INTO new_fk_type 
        FROM information.entity_association ea
        JOIN projects.info_proj_rel epr ON ea.pk_entity = epr.fk_entity
        JOIN system.class_has_type_property p ON ea.fk_property = p.fk_property
        WHERE ea.fk_info_domain = param_pk_entity
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


-- 2
CREATE OR REPLACE FUNCTION warehouse.entity_preview__get_type_label()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF 
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

      ELSE
       
        UPDATE warehouse.entity_preview
        SET type_label = NULL
        WHERE pk_entity = NEW.pk_entity
        AND fk_project IS NOT DISTINCT FROM NEW.fk_project;

      END IF;

      RETURN NEW;
    END;
    $BODY$;
