/**
* Indexes used by get_project_entity_label
**/

CREATE INDEX IF NOT EXISTS entity_label_config_fk_class_idx
    ON projects.entity_label_config USING btree
    (fk_class ASC NULLS LAST);
	
CREATE INDEX IF NOT EXISTS entity_label_config_fk_project_idx
    ON projects.entity_label_config USING btree
    (fk_project ASC NULLS LAST);

CREATE INDEX IF NOT EXISTS project_statements_fk_project_fk_object_info_fk_project_idx
    ON pgwar.project_statements  (fk_project,fk_object_info,fk_project);

CREATE INDEX IF NOT EXISTS project_statements_fk_project_fk_subject_info_fk_project_idx
    ON pgwar.project_statements  (fk_project,fk_subject_info,fk_project);

/**
* View
**/
CREATE VIEW pgwar.v_entity_label AS
WITH label_parts AS (
    SELECT pk_entity,
        fk_project, 
        (field->'fkProperty')::int fk_property,
        (field->'isOutgoing')::bool is_outgoing,
        (field->'nrOfStatementsInLabel')::int nr_of_stmts,
        ROW_NUMBER() OVER (
            PARTITION BY pk_entity, fk_project
        ) AS ord_num
    FROM (
        SELECT 
            ep.pk_entity, 
            ep.fk_project, 
            jsonb_array_elements(COALESCE(conf.config, conf_def.config)->'labelParts')->'field' field
        FROM pgwar.entity_preview ep
        LEFT JOIN	projects.entity_label_config conf
            ON ep.fk_class = conf.fk_class
            AND ep.fk_project = conf.fk_project
        LEFT JOIN projects.entity_label_config conf_def
            ON ep.fk_class = conf_def.fk_class
            AND conf_def.fk_project = 375669
    ) subquery
), 
outgoing_label_statements AS(
    SELECT coalesce(
                pstmt.object_label, -- take the literal label
                pep.entity_label, -- else the project entity label,
                cep.entity_label -- else the community entity label
            )::VARCHAR AS label,
        ROW_NUMBER() OVER (
            PARTITION BY lp.pk_entity, lp.fk_project, lp.fk_property
            ORDER BY pstmt.ord_num_of_range ASC, pstmt.tmsp_last_modification DESC
        ) AS row_number,
        lp.nr_of_stmts,
        lp.pk_entity,
        lp.fk_project,
        lp.fk_property,
        lp.ord_num
    FROM 
        label_parts lp
    JOIN
        pgwar.v_statements_combined pstmt
        ON pstmt.fk_subject_info = lp.pk_entity
        AND pstmt.fk_project = lp.fk_project 
        AND pstmt.fk_property = lp.fk_property
    -- join the project entity
    LEFT JOIN pgwar.entity_preview pep 
        ON pep.fk_project = pstmt.fk_project
        AND pstmt.fk_object_info = pep.pk_entity
    -- join the community entity
    LEFT JOIN pgwar.entity_preview cep
        ON cep.fk_project = 0
        AND pstmt.fk_object_info = cep.pk_entity
    WHERE
        lp.is_outgoing   
),
incoming_label_statements AS(
    SELECT coalesce(
                pep.entity_label, -- else the project entity label,
                cep.entity_label -- else the community entity label
            )::VARCHAR AS label,
        ROW_NUMBER() OVER (
            PARTITION BY lp.pk_entity, lp.fk_project, lp.fk_property
            ORDER BY pstmt.ord_num_of_domain ASC, pstmt.tmsp_last_modification DESC
        ) AS row_number,
        lp.nr_of_stmts,
        lp.pk_entity,
        lp.fk_project,
        lp.fk_property,
        lp.ord_num
    FROM 
        label_parts lp
    JOIN
        pgwar.v_statements_combined pstmt
        ON pstmt.fk_object_info = lp.pk_entity
        AND pstmt.fk_project = lp.fk_project 
        AND pstmt.fk_property = lp.fk_property
    -- join the project entity
    LEFT JOIN pgwar.entity_preview pep 
        ON pep.fk_project = pstmt.fk_project
        AND pstmt.fk_subject_info = pep.pk_entity
    -- join the community entity
    LEFT JOIN pgwar.entity_preview cep
        ON cep.fk_project = 0
        AND pstmt.fk_subject_info = cep.pk_entity
    WHERE
        lp.is_outgoing IS false   
),
union_in_and_out AS (
    SELECT *
    FROM outgoing_label_statements
    UNION ALL
    SELECT *
    FROM incoming_label_statements
)
SELECT u.pk_entity, u.fk_project, STRING_AGG(u.label, ', ' ORDER BY u.ord_num ASC) AS entity_label
FROM union_in_and_out u
WHERE row_number <= nr_of_stmts
GROUP BY u.pk_entity, u.fk_project;

/***
* Functions
***/

-- get entity label or project entity
CREATE OR REPLACE FUNCTION pgwar.get_project_entity_label(entity_id int, project_id int)
RETURNS text AS $$
DECLARE 
	label text;
BEGIN
    
    SELECT entity_label INTO label
    FROM pgwar.v_entity_label u
    WHERE u.fk_project = project_id
    AND u.pk_entity = entity_id;

   RETURN label;
END;
$$ LANGUAGE plpgsql;


-- update entity label of entity preview, if distinct
CREATE OR REPLACE FUNCTION pgwar.update_entity_label_of_entity_preview(entity_id int, project_id int, new_label text)
RETURNS void AS $$
BEGIN
    UPDATE pgwar.entity_preview 
    SET entity_label = new_label
    WHERE pk_entity = entity_id
    AND fk_project = project_id
    AND entity_label IS DISTINCT FROM new_label;
END;
$$ LANGUAGE plpgsql;



-- get and update entity label or project entity
CREATE OR REPLACE FUNCTION pgwar.get_and_update_project_entity_label(entity_id int, project_id int)
RETURNS void AS $$
BEGIN
    IF EXISTS(
        SELECT
            pk_entity
        FROM
            pgwar.entity_preview
        WHERE
            pk_entity = entity_id
            AND fk_project = project_id) THEN
         PERFORM pgwar.update_entity_label_of_entity_preview(entity_id, project_id, pgwar.get_project_entity_label(entity_id, project_id));
     END IF;
END;
$$ LANGUAGE plpgsql;

/***
* Trigger Functions
***/


-- Update entity labels on change on project statement
CREATE OR REPLACE FUNCTION pgwar.update_entity_label_on_project_statement_change()
RETURNS TRIGGER AS $$
DECLARE
    project_id int;
    subject_entity_id int;
    object_entity_id int;
    new_label text;
BEGIN
    project_id := COALESCE(NEW.fk_project, OLD.fk_project);
    subject_entity_id := COALESCE(NEW.fk_subject_info, OLD.fk_subject_info);

    -- Update the label for the subject entity
    PERFORM pgwar.get_and_update_project_entity_label(subject_entity_id, project_id);

    -- Check if the object is an entity (object_label IS NULL)
    IF COALESCE(NEW.object_label, OLD.object_label) IS NULL THEN
        object_entity_id := COALESCE(NEW.fk_object_info, OLD.fk_object_info);
        PERFORM pgwar.get_and_update_project_entity_label(object_entity_id, project_id);
    END IF;

    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Update entity labels after inserting entity previews
CREATE OR REPLACE FUNCTION pgwar.update_entity_label_on_insert()
RETURNS TRIGGER AS $$
BEGIN

    UPDATE pgwar.entity_preview ep
    SET entity_label = newtab.entity_label
    FROM newtab,
         pgwar.v_entity_label el
    WHERE newtab.fk_project != 0
    AND ep.pk_entity = newtab.pk_entity
    AND ep.fk_project = newtab.fk_project
    AND ep.pk_entity = el.pk_entity
    AND ep.fk_project = el.fk_project
    AND ep.entity_label IS DISTINCT FROM el.entity_label;
   
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Update entity labels after modifying entity preview fk_class
CREATE OR REPLACE FUNCTION pgwar.update_entity_label_on_update_fk_class()
RETURNS TRIGGER AS $$
DECLARE
    is_not_empty BOOLEAN;
BEGIN
    -- Check if the table is not empty using EXISTS
    SELECT EXISTS(SELECT 1 FROM newtab) INTO is_not_empty;
    
    IF is_not_empty THEN
    
    	WITH to_update AS (
			SELECT 
				ep.pk_entity,
				ep.fk_project,
				el.entity_label AS new_entity_label
			FROM
				pgwar.entity_preview ep
			JOIN
				newtab ON ep.pk_entity = newtab.pk_entity AND ep.fk_project = newtab.fk_project
			JOIN
				oldtab ON oldtab.pk_entity = newtab.pk_entity AND oldtab.fk_project = newtab.fk_project
			LEFT JOIN
				pgwar.v_entity_label el ON ep.pk_entity = el.pk_entity AND ep.fk_project = el.fk_project
			WHERE
				ep.fk_project != 0
				AND oldtab.fk_class IS DISTINCT FROM newtab.fk_class
				AND ep.entity_label IS DISTINCT FROM el.entity_label
		)
		UPDATE pgwar.entity_preview ep
		SET entity_label = to_update.new_entity_label
		FROM to_update
		WHERE ep.pk_entity = to_update.pk_entity
		AND ep.fk_project = to_update.fk_project;
	END IF;

   
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;




-- Update entity labels of related entities, on change on entity preview entity_label
CREATE OR REPLACE FUNCTION pgwar.update_entity_label_on_entity_label_change()
RETURNS TRIGGER AS $$
DECLARE
    project_id int;
    entity_id int;
BEGIN
    IF TG_OP = 'INSERT' AND NEW.entity_label IS NULL THEN
        RETURN NULL; 
    END IF;

    project_id := COALESCE(NEW.fk_project, OLD.fk_project);
    entity_id := COALESCE(NEW.pk_entity, OLD.pk_entity);

    -- Update the entity labels of the related object entities
    PERFORM pgwar.get_and_update_project_entity_label(fk_object_info, project_id)
    FROM pgwar.project_statements
    WHERE fk_subject_info = entity_id
    AND object_label IS NULL
    AND fk_project = project_id;

    -- Update the entity labels of the related subject entities
    PERFORM pgwar.get_and_update_project_entity_label(fk_subject_info, project_id)
    FROM pgwar.project_statements
    WHERE fk_object_info = entity_id
    AND fk_project = project_id;

    RETURN NULL;
END;
$$ LANGUAGE plpgsql;


-- Update entity labels on change on entity label config
CREATE OR REPLACE FUNCTION pgwar.update_entity_label_on_entity_label_config_change()
RETURNS TRIGGER AS $$
DECLARE
    project_id int;
    class_id int;
BEGIN
    project_id := COALESCE(NEW.fk_project, OLD.fk_project);
    class_id := COALESCE(NEW.fk_class, OLD.fk_class);

    IF project_id = 375669 THEN 

        -- perform update of entity labels that depend on the default config of project 375669
        PERFORM pgwar.update_entity_label_of_entity_preview(ep.pk_entity, ep.fk_project, pgwar.get_project_entity_label(ep.pk_entity, ep.fk_project)) 
        FROM pgwar.entity_preview ep
        LEFT JOIN projects.entity_label_config c 
            ON c.fk_class = class_id 
            AND c.fk_project != project_id
        WHERE ep.fk_class = class_id
        AND ep.fk_project != 0
        AND c.config IS NULL; -- take only rows that have no proper project config

    ELSE

        PERFORM pgwar.update_entity_label_of_entity_preview(pk_entity, fk_project, pgwar.get_project_entity_label(pk_entity, fk_project)) 
        FROM pgwar.entity_preview
        WHERE fk_class = class_id
        AND fk_project = project_id;

    END IF;

    RETURN NULL;
END;
$$ LANGUAGE plpgsql;


/***
* Triggers
***/

CREATE TRIGGER after_insert_entity_preview_fk_class
AFTER INSERT ON pgwar.entity_preview
REFERENCING NEW TABLE AS newtab
EXECUTE FUNCTION pgwar.update_entity_label_on_insert();

CREATE TRIGGER after_update_entity_preview_fk_class
AFTER UPDATE ON pgwar.entity_preview
REFERENCING NEW TABLE AS newtab OLD TABLE AS oldtab
EXECUTE FUNCTION pgwar.update_entity_label_on_update_fk_class();

CREATE TRIGGER on_modify_project_statement
AFTER INSERT OR UPDATE OR DELETE ON pgwar.project_statements
FOR EACH ROW
EXECUTE FUNCTION pgwar.update_entity_label_on_project_statement_change();

CREATE TRIGGER after_upsert_entity_preview_entity_label_01
AFTER INSERT OR UPDATE OF entity_label ON pgwar.entity_preview
FOR EACH ROW
WHEN (NEW.fk_project IS DISTINCT FROM 0)
EXECUTE FUNCTION pgwar.update_entity_label_on_entity_label_change();

CREATE TRIGGER after_delete_entity_preview_01
AFTER DELETE ON pgwar.entity_preview
FOR EACH ROW
WHEN (OLD.fk_project IS DISTINCT FROM 0)
EXECUTE FUNCTION pgwar.update_entity_label_on_entity_label_change();

CREATE TRIGGER on_upsert_entity_label_config
AFTER DELETE OR INSERT OR UPDATE ON projects.entity_label_config
FOR EACH ROW
EXECUTE FUNCTION pgwar.update_entity_label_on_entity_label_config_change();