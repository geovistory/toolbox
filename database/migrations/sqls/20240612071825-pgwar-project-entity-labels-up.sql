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
* Views
**/
CREATE VIEW pgwar.v_project_entity_label AS
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

CREATE VIEW pgwar.v_community_entity_label AS
WITH entity_label_counts AS (
    SELECT
        ep.pk_entity,
        ep.entity_label,
        COUNT(*) AS label_count
    FROM
        pgwar.entity_preview ep
    WHERE ep.fk_project != 0
    GROUP BY
        ep.pk_entity, ep.entity_label
),
ranked_entity_labels AS (
    SELECT
        pk_entity,
        entity_label,
        label_count,
        ROW_NUMBER() OVER (PARTITION BY pk_entity ORDER BY label_count DESC, entity_label) AS rn
    FROM
        entity_label_counts
)
SELECT
    pk_entity,
    entity_label
FROM
    ranked_entity_labels
WHERE
    rn = 1;


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
    FROM pgwar.v_project_entity_label u
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


-- Update entity labels on upsert on project statement
CREATE OR REPLACE FUNCTION pgwar.update_entity_label_on_project_statement_upsert()
RETURNS TRIGGER AS $$
BEGIN

    -- Update the label for the subject entity
    UPDATE pgwar.entity_preview ep
    SET entity_label = el.entity_label
    FROM newtab stmt,
         pgwar.v_project_entity_label el
    WHERE stmt.fk_subject_info = ep.pk_entity
    AND stmt.fk_project = ep.fk_project
    AND stmt.fk_subject_info = el.pk_entity
    AND stmt.fk_project = el.fk_project
    AND ep.entity_label IS DISTINCT FROM el.entity_label;

    -- Update the entity labels of the related object entities
    UPDATE pgwar.entity_preview ep
    SET entity_label = el.entity_label
    FROM  newtab stmt,
         pgwar.v_project_entity_label el
    WHERE stmt.object_label IS NULL
    AND stmt.fk_object_info = ep.pk_entity
    AND stmt.fk_project = ep.fk_project
    AND stmt.fk_object_info = el.pk_entity
    AND stmt.fk_project = el.fk_project
    AND ep.entity_label IS DISTINCT FROM el.entity_label;
    
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Update entity labels on delete on project statement
CREATE OR REPLACE FUNCTION pgwar.update_entity_label_on_project_statement_delete()
RETURNS TRIGGER AS $$
BEGIN

    WITH to_update AS (
        -- get new labels of subject entities
        SELECT  ep.pk_entity,
                ep.fk_project,
                el.entity_label
        FROM oldtab stmt
        JOIN pgwar.entity_preview ep
            ON stmt.fk_subject_info = ep.pk_entity
            AND stmt.fk_project = ep.fk_project
        LEFT JOIN pgwar.v_project_entity_label el
            ON ep.pk_entity = el.pk_entity
            AND el.pk_entity = el.fk_project
        WHERE ep.entity_label IS DISTINCT FROM el.entity_label
        UNION
        -- get new labels of object entities
        SELECT  ep.pk_entity,
                ep.fk_project,
                el.entity_label
        FROM oldtab stmt
        JOIN pgwar.entity_preview ep
            ON stmt.fk_object_info = ep.pk_entity
            AND stmt.fk_project = ep.fk_project
        LEFT JOIN pgwar.v_project_entity_label el
            ON ep.pk_entity = el.pk_entity
            AND el.pk_entity = el.fk_project
        WHERE stmt.object_label IS NULL 
        AND ep.entity_label IS DISTINCT FROM el.entity_label
    )
    UPDATE pgwar.entity_preview ep
    SET entity_label = u.entity_label
    FROM to_update u
    WHERE u.pk_entity = ep.pk_entity
    AND u.fk_project = ep.fk_project;

    
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Update entity labels after inserting entity previews
CREATE OR REPLACE FUNCTION pgwar.update_entity_labels_after_insert()
RETURNS TRIGGER AS $$
BEGIN

    UPDATE pgwar.entity_preview ep
    SET entity_label = el.entity_label
    FROM newtab,
         pgwar.v_project_entity_label el
    WHERE newtab.fk_project != 0
    AND ep.pk_entity = newtab.pk_entity
    AND ep.fk_project = newtab.fk_project
    AND ep.pk_entity = el.pk_entity
    AND ep.fk_project = el.fk_project
    AND ep.entity_label IS DISTINCT FROM el.entity_label;


    -- Update the entity labels of the related object entities
    UPDATE pgwar.entity_preview ep
    SET entity_label = el.entity_label
    FROM pgwar.project_statements stmt,
         newtab,
         pgwar.v_project_entity_label el
    WHERE newtab.entity_label IS NOT NULL 
    AND newtab.fk_project != 0
    AND stmt.fk_subject_info = newtab.pk_entity
    AND stmt.fk_project = newtab.fk_project
    AND stmt.object_label IS NULL
    AND stmt.fk_object_info = el.pk_entity
    AND stmt.fk_project = el.fk_project
    AND ep.entity_label IS DISTINCT FROM el.entity_label;

    -- Update the entity labels of the related subject entities
    UPDATE pgwar.entity_preview ep
    SET entity_label = el.entity_label
    FROM pgwar.project_statements stmt,
         newtab,
         pgwar.v_project_entity_label el
    WHERE newtab.entity_label IS NOT NULL 
    AND newtab.fk_project != 0
    AND stmt.fk_object_info = newtab.pk_entity
    AND stmt.fk_project = newtab.fk_project
    AND stmt.fk_subject_info = el.pk_entity
    AND stmt.fk_project = el.fk_project
    AND ep.entity_label IS DISTINCT FROM el.entity_label;

    -- Update community entity labels
    UPDATE pgwar.entity_preview ep
    SET entity_label = el.entity_label
    FROM newtab,
         pgwar.v_community_entity_label el
    WHERE newtab.fk_project != 0
    AND newtab.pk_entity = el.pk_entity
    AND newtab.pk_entity = ep.pk_entity
    AND ep.fk_project = 0
    AND ep.entity_label IS DISTINCT FROM el.entity_label;

    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION pgwar.update_entity_labels_after_update()
RETURNS TRIGGER AS $$
DECLARE
    is_not_empty BOOLEAN;
BEGIN
    -- Check if the table is not empty using EXISTS
    SELECT EXISTS(SELECT 1 FROM newtab) INTO is_not_empty;
    
    IF is_not_empty THEN
    
        -- Update entity labels after modifying entity preview fk_class
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
				pgwar.v_project_entity_label el ON ep.pk_entity = el.pk_entity AND ep.fk_project = el.fk_project
			WHERE
				ep.fk_project != 0
				AND oldtab.fk_class IS DISTINCT FROM newtab.fk_class -- fk_class changed ! 
				AND ep.entity_label IS DISTINCT FROM el.entity_label
		)
        UPDATE pgwar.entity_preview ep
        SET entity_label = to_update.new_entity_label
        FROM to_update
        WHERE ep.pk_entity = to_update.pk_entity
        AND ep.fk_project = to_update.fk_project;

         -- Update entity labels after modifying entity preview entity_label
    	WITH to_update AS (
			SELECT 
				newtab.pk_entity,
				newtab.fk_project
			FROM
				newtab,
				oldtab 
            WHERE  
				newtab.fk_project != 0 AND
                oldtab.pk_entity = newtab.pk_entity AND
                oldtab.fk_project = newtab.fk_project AND
				oldtab.entity_label IS DISTINCT FROM newtab.entity_label -- entity_label changed ! 
		),
        propagate_to_objects AS (
            -- Update the entity labels of the related object entities
            UPDATE pgwar.entity_preview ep
            SET entity_label = el.entity_label
            FROM pgwar.project_statements stmt,
                to_update,
                pgwar.v_project_entity_label el
            WHERE stmt.fk_subject_info = to_update.pk_entity
            AND stmt.fk_project = to_update.fk_project
            AND stmt.object_label IS NULL
            AND stmt.fk_object_info = el.pk_entity
            AND stmt.fk_project = el.fk_project
            AND stmt.fk_object_info = ep.pk_entity
            AND stmt.fk_project = ep.fk_project
            AND ep.entity_label IS DISTINCT FROM el.entity_label
        ),
        propagate_to_subjects AS (
            -- Update the entity labels of the related subject entities
            UPDATE pgwar.entity_preview ep
            SET entity_label = el.entity_label
            FROM pgwar.project_statements stmt,
                to_update,
                pgwar.v_project_entity_label el
            WHERE stmt.fk_object_info = to_update.pk_entity
            AND stmt.fk_project = to_update.fk_project
            AND stmt.fk_subject_info = el.pk_entity
            AND stmt.fk_project = el.fk_project
            AND stmt.fk_subject_info = ep.pk_entity
            AND stmt.fk_project = ep.fk_project
            AND ep.entity_label IS DISTINCT FROM el.entity_label
        )
        -- Update community entity labels
        UPDATE pgwar.entity_preview ep
        SET entity_label = el.entity_label
        FROM to_update,
            pgwar.v_community_entity_label el
        WHERE to_update.pk_entity = el.pk_entity
        AND to_update.pk_entity = ep.pk_entity
        AND ep.fk_project = 0
        AND ep.entity_label IS DISTINCT FROM el.entity_label;

	END IF;

   
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION pgwar.update_entity_labels_after_delete()
RETURNS TRIGGER AS $$
DECLARE
    is_not_empty BOOLEAN;
BEGIN
    -- Check if the table is not empty using EXISTS
    SELECT EXISTS(SELECT 1 FROM oldtab) INTO is_not_empty;
    
    IF is_not_empty THEN
    
        -- Update the entity labels of the related object entities
        UPDATE pgwar.entity_preview ep
        SET entity_label = el.entity_label
        FROM pgwar.project_statements stmt,
            oldtab,
            pgwar.v_project_entity_label el
        WHERE stmt.fk_subject_info = oldtab.pk_entity
        AND stmt.fk_project = oldtab.fk_project
        AND stmt.object_label IS NULL
        AND stmt.fk_object_info = el.pk_entity
        AND stmt.fk_project = el.fk_project
        AND stmt.fk_object_info = ep.pk_entity
        AND stmt.fk_project = ep.fk_project
        AND ep.entity_label IS DISTINCT FROM el.entity_label;

        -- Update the entity labels of the related subject entities
        UPDATE pgwar.entity_preview ep
        SET entity_label = el.entity_label
        FROM pgwar.project_statements stmt,
            oldtab,
            pgwar.v_project_entity_label el
        WHERE stmt.fk_object_info = oldtab.pk_entity
        AND stmt.fk_project = oldtab.fk_project
        AND stmt.fk_subject_info = el.pk_entity
        AND stmt.fk_project = el.fk_project
        AND stmt.fk_subject_info = ep.pk_entity
        AND stmt.fk_project = ep.fk_project
        AND ep.entity_label IS DISTINCT FROM el.entity_label;

        -- Update community entity labels
        UPDATE pgwar.entity_preview ep
        SET entity_label = el.entity_label
        FROM oldtab,
            pgwar.v_community_entity_label el
        WHERE oldtab.fk_project != 0
        AND oldtab.pk_entity = el.pk_entity
        AND oldtab.pk_entity = ep.pk_entity
        AND ep.fk_project = 0
        AND ep.entity_label IS DISTINCT FROM el.entity_label;

	END IF;

   
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

        WITH to_update AS (
            SELECT  ep.pk_entity, 
                    ep.fk_project,
                    el.entity_label
            FROM pgwar.entity_preview ep
            JOIN pgwar.v_project_entity_label el
                ON ep.pk_entity = el.pk_entity
                AND ep.fk_project = el.fk_project
            LEFT JOIN projects.entity_label_config c 
                ON c.fk_class = ep.fk_class 
                AND c.fk_project = ep.fk_project
            WHERE ep.fk_class = class_id
            AND ep.fk_project != 0 -- all projects except 0
            AND c.config IS NULL -- take only rows that have no own project config

        )
        -- perform update of entity labels that depend on the default config of project 375669
        UPDATE pgwar.entity_preview ep
        SET entity_label = el.entity_label
        FROM to_update
        WHERE to_update.pk_entity = ep.pk_entity
        AND to_update.fk_project = ep.fk_project
        AND ep.entity_label IS DISTINCT FROM el.entity_label;
      
    ELSE

        UPDATE pgwar.entity_preview ep
        SET entity_label = el.entity_label
        FROM pgwar.v_project_entity_label el
        WHERE ep.pk_entity = el.pk_entity
        AND ep.fk_project = el.fk_project
        AND ep.fk_class = class_id
        AND ep.fk_project = project_id
        AND ep.entity_label IS DISTINCT FROM el.entity_label;

    END IF;

    RETURN NULL;
END;
$$ LANGUAGE plpgsql;


/***
* Triggers
***/

CREATE TRIGGER after_insert_entity_preview
AFTER INSERT ON pgwar.entity_preview
REFERENCING NEW TABLE AS newtab
EXECUTE FUNCTION pgwar.update_entity_labels_after_insert();

CREATE TRIGGER after_update_entity_preview
AFTER UPDATE ON pgwar.entity_preview
REFERENCING NEW TABLE AS newtab OLD TABLE AS oldtab
EXECUTE FUNCTION pgwar.update_entity_labels_after_update();

CREATE TRIGGER after_delete_entity_preview_01
AFTER DELETE ON pgwar.entity_preview
REFERENCING OLD TABLE AS oldtab
EXECUTE FUNCTION pgwar.update_entity_labels_after_delete();

CREATE TRIGGER after_insert_project_statement
AFTER INSERT ON pgwar.project_statements
REFERENCING NEW TABLE AS newtab
EXECUTE FUNCTION pgwar.update_entity_label_on_project_statement_upsert();

CREATE TRIGGER after_update_project_statement
AFTER UPDATE ON pgwar.project_statements
REFERENCING NEW TABLE AS newtab
EXECUTE FUNCTION pgwar.update_entity_label_on_project_statement_upsert();

CREATE TRIGGER after_delete_project_statement
AFTER DELETE ON pgwar.project_statements
REFERENCING OLD TABLE AS oldtab
EXECUTE FUNCTION pgwar.update_entity_label_on_project_statement_delete();

CREATE TRIGGER on_upsert_entity_label_config
AFTER DELETE OR INSERT OR UPDATE ON projects.entity_label_config
FOR EACH ROW
EXECUTE FUNCTION pgwar.update_entity_label_on_entity_label_config_change();