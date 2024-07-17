/**
* Indexes used by get_project_entity_label
**/

CREATE INDEX IF NOT EXISTS project_statements_fk_object_info_fk_project_fk_property_idx
    ON pgwar.project_statements  (fk_object_info,fk_project,fk_property);

CREATE INDEX IF NOT EXISTS project_statements_fk_subject_info_fk_project_fk_property_dx
    ON pgwar.project_statements  (fk_subject_info,fk_project,fk_property);

CREATE INDEX IF NOT EXISTS project_statements_fk_project_fk_property_dx
    ON pgwar.project_statements  (fk_project,fk_property);

CREATE INDEX IF NOT EXISTS project_statements_fk_project_dx
    ON pgwar.project_statements  (fk_project);

CREATE INDEX IF NOT EXISTS resource_pk_entity_fk_class_dx
    ON information.resource  (pk_entity,fk_class);

/**
* Views
**/
CREATE MATERIALIZED VIEW pgwar.project_label_config AS
SELECT subquery.fk_project, 
    subquery.fk_class, 
    (field->'fkProperty')::int fk_property,
    (field->'isOutgoing')::bool is_outgoing,
    (field->'nrOfStatementsInLabel')::int nr_of_stmts,
    ROW_NUMBER() OVER (
        PARTITION BY subquery.fk_class, subquery.fk_project
    ) AS ord_num
FROM (
	SELECT 
		COALESCE(default_elc.fk_project, elc.fk_project) AS fk_project,
		COALESCE(elc.fk_class, default_elc.fk_class) AS fk_class,
		jsonb_array_elements(COALESCE(elc.config, default_elc.config)->'labelParts')->'field' field
	FROM (
		SELECT p.pk_entity AS fk_project, fk_class, config
		FROM projects.project p
		JOIN projects.entity_label_config default_elc 
			ON default_elc.fk_project = 375669
	) default_elc
	FULL OUTER JOIN projects.entity_label_config elc 
			ON elc.fk_project = default_elc.fk_project
			AND elc.fk_class = default_elc.fk_class
) subquery;


CREATE INDEX project_label_config_fk_class_idx
ON pgwar.project_label_config (fk_class);

CREATE INDEX project_label_config_idx
ON pgwar.project_label_config (fk_project, fk_property, is_outgoing, nr_of_stmts);


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

-- get label of project entity
CREATE OR REPLACE FUNCTION pgwar.get_entity_label_config(class_id int, project_id int)
RETURNS jsonb AS $$
DECLARE
    label_config jsonb;
BEGIN
   
    SELECT config INTO label_config
    FROM projects.entity_label_config 
    WHERE fk_class = class_id
    AND fk_project = project_id;

    IF label_config IS NULL THEN
        SELECT config INTO label_config
        FROM projects.entity_label_config 
        WHERE fk_class = class_id
        AND fk_project = 375669;
    END IF;  
    
    RETURN label_config;
END;
$$ LANGUAGE plpgsql;

-- get entity label or project entity
CREATE OR REPLACE FUNCTION pgwar.get_project_entity_label(entity_id int, project_id int)
RETURNS text AS $$
DECLARE
    class_id int;
    label text;
BEGIN
    -- get class_id
    SELECT fk_class INTO class_id
    FROM information.resource
    WHERE pk_entity = entity_id;   
    -- get label
    SELECT pgwar.get_project_entity_label(entity_id, project_id, class_id) INTO label;

    RETURN label;
END;
$$ LANGUAGE plpgsql;

-- get entity label or project entity
CREATE OR REPLACE FUNCTION pgwar.get_project_entity_label(entity_id int, project_id int, class_id int)
RETURNS text AS $$
DECLARE
    label_config jsonb;
    label text;
BEGIN
    -- get label config
    SELECT pgwar.get_entity_label_config(class_id, project_id) INTO label_config;   
    -- get label
    SELECT pgwar.get_project_entity_label(entity_id, project_id, label_config) INTO label;

    RETURN label;
END;
$$ LANGUAGE plpgsql;

-- get entity label or project entity
CREATE OR REPLACE FUNCTION pgwar.get_project_entity_label(entity_id int, project_id int, label_config jsonb)
RETURNS text AS $$
DECLARE
    label text;
BEGIN
    -- join labels of fields
	SELECT substring(string_agg(
        -- get label per field
        pgwar.get_target_label_of_field(entity_id, project_id, part->'field'),
        -- separator
         ', '
    ), 1, 100) INTO label
	FROM 
    -- expand fields
    jsonb_array_elements(label_config->'labelParts') part;

    RETURN label;
END;
$$ LANGUAGE plpgsql;


-- update entity label of entity preview, if distinct
CREATE OR REPLACE FUNCTION pgwar.update_entity_label_of_entity_preview(entity_id int, project_id int, new_label text)
RETURNS void AS $$
BEGIN
    UPDATE pgwar.entity_preview 
    SET entity_label = new_label,
        tmsp_entity_label_modification = CURRENT_TIMESTAMP
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

    IF EXISTS(
        SELECT ep.pk_entity, ep.fk_project
		FROM pgwar.entity_preview ep,
		newtab stmt
		WHERE stmt.fk_subject_info = ep.pk_entity
		AND stmt.fk_project = ep.fk_project
    ) THEN
        -- Update the label for the subject entity
        WITH new_labels AS (
            SELECT  newtab.fk_subject_info AS pk_entity,
                    newtab.fk_project,
                    pgwar.get_project_entity_label(newtab.fk_subject_info, newtab.fk_project) AS entity_label
            FROM newtab
        )
        UPDATE pgwar.entity_preview ep
        SET entity_label = new_labels.entity_label
        FROM new_labels 
        WHERE new_labels.pk_entity = ep.pk_entity
        AND new_labels.fk_project = ep.fk_project
        AND ep.entity_label IS DISTINCT FROM new_labels.entity_label;
    END IF;

    IF EXISTS(
        SELECT ep.pk_entity, ep.fk_project
        FROM pgwar.entity_preview ep,
        newtab stmt
        WHERE stmt.fk_object_info = ep.pk_entity
        AND stmt.fk_project = ep.fk_project
    ) THEN
        -- Update the entity labels of the related object entities
        WITH new_labels AS (
            SELECT  newtab.fk_object_info AS pk_entity,
                    newtab.fk_project,
                    pgwar.get_project_entity_label(newtab.fk_object_info, newtab.fk_project) AS entity_label
            FROM newtab
            WHERE newtab.object_label IS NULL
        )
        UPDATE pgwar.entity_preview ep
        SET entity_label = new_labels.entity_label
        FROM new_labels 
        WHERE new_labels.pk_entity = ep.pk_entity
        AND new_labels.fk_project = ep.fk_project
        AND ep.entity_label IS DISTINCT FROM new_labels.entity_label;

    END IF;
    
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Update entity labels on delete on project statement
CREATE OR REPLACE FUNCTION pgwar.update_entity_label_on_project_statement_delete()
RETURNS TRIGGER AS $$
BEGIN

    WITH new_labels AS (
        -- get new labels of subject entities
        SELECT  oldtab.fk_subject_info AS pk_entity, 
                oldtab.fk_project, 
                pgwar.get_project_entity_label(oldtab.fk_subject_info, oldtab.fk_project) AS entity_label
        FROM oldtab
        UNION
        -- get new labels of object entities
        SELECT  oldtab.fk_object_info AS pk_entity,
                oldtab.fk_project, 
                pgwar.get_project_entity_label(oldtab.fk_object_info, oldtab.fk_project) AS entity_label
        FROM oldtab
        WHERE oldtab.object_label IS NULL
    )
    UPDATE pgwar.entity_preview ep
    SET entity_label = new_labels.entity_label
    FROM new_labels
    WHERE new_labels.pk_entity = ep.pk_entity
    AND new_labels.fk_project = ep.fk_project
    AND ep.entity_label IS DISTINCT FROM new_labels.entity_label;

    
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Update entity labels after inserting entity previews
CREATE OR REPLACE FUNCTION pgwar.update_entity_labels_after_insert()
RETURNS TRIGGER AS $$
BEGIN

    WITH new_labels AS (

        -- create entity labels of inserted entity
        SELECT  newtab.pk_entity, 
                newtab.fk_project, 
                pgwar.get_project_entity_label(newtab.pk_entity, newtab.fk_project) AS entity_label
        FROM newtab
        WHERE newtab.fk_project != 0
        UNION ALL

        -- Create entity labels of the related object entities
        SELECT  stmt.fk_object_info AS pk_entity, 
                newtab.fk_project, 
                pgwar.get_project_entity_label(stmt.fk_object_info, newtab.fk_project) AS entity_label
        FROM pgwar.project_statements stmt,
            newtab
        WHERE newtab.entity_label IS NOT NULL 
        AND newtab.fk_project != 0
        AND stmt.fk_subject_info = newtab.pk_entity
        AND stmt.fk_project = newtab.fk_project
        AND stmt.object_label IS NULL
        UNION ALL

        -- Create entity labels of the related subject entities
        SELECT  stmt.fk_subject_info AS pk_entity, 
                newtab.fk_project, 
                pgwar.get_project_entity_label(stmt.fk_subject_info, newtab.fk_project) AS entity_label
        FROM pgwar.project_statements stmt,
            newtab
        WHERE newtab.entity_label IS NOT NULL 
        AND newtab.fk_project != 0
        AND stmt.fk_object_info = newtab.pk_entity
        AND stmt.fk_project = newtab.fk_project
        AND stmt.object_label IS NULL
    )
    -- Update the project entity labels
    UPDATE pgwar.entity_preview ep
    SET entity_label = new_labels.entity_label
    FROM new_labels
    WHERE ep.pk_entity = new_labels.pk_entity
    AND ep.fk_project = new_labels.fk_project
    AND ep.entity_label IS DISTINCT FROM new_labels.entity_label;



    -- Update community entity labels
    WITH uniq_entities AS (
        SELECT DISTINCT pk_entity
        FROM newtab
        WHERE newtab.fk_project != 0 
    )
    UPDATE pgwar.entity_preview ep
    SET entity_label = el.entity_label
    FROM uniq_entities,
         pgwar.v_community_entity_label el
    WHERE uniq_entities.pk_entity = el.pk_entity
    AND uniq_entities.pk_entity = ep.pk_entity
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

    IF pg_trigger_depth() > 100 THEN
        RETURN NULL; 
    END IF;

    -- Check if the table is not empty using EXISTS
    SELECT EXISTS(SELECT 1 FROM newtab) INTO is_not_empty;
    
    IF is_not_empty THEN
    
        -- Create new entity labels after modifying entity preview fk_class
    	WITH fk_class_modified AS (
			SELECT 
				ep.pk_entity,
				ep.fk_project,
				pgwar.get_project_entity_label(ep.pk_entity, ep.fk_project) AS entity_label
			FROM
				pgwar.entity_preview ep
			JOIN
				newtab ON ep.pk_entity = newtab.pk_entity AND ep.fk_project = newtab.fk_project
			JOIN
				oldtab ON oldtab.pk_entity = newtab.pk_entity AND oldtab.fk_project = newtab.fk_project
			WHERE
				ep.fk_project != 0
				AND oldtab.fk_class IS DISTINCT FROM newtab.fk_class -- fk_class changed ! 
		)
        UPDATE pgwar.entity_preview ep
        SET entity_label = fk_class_modified.entity_label
        FROM fk_class_modified
        WHERE ep.pk_entity = fk_class_modified.pk_entity
        AND ep.fk_project = fk_class_modified.fk_project
        AND ep.entity_label IS DISTINCT FROM fk_class_modified.entity_label;

         -- Update entity labels after modifying entity preview entity_label
    	WITH label_changed AS (
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
        new_labels AS (
            -- Create entity labels of the related object entities
            SELECT  stmt.fk_object_info AS pk_entity, 
                    label_changed.fk_project, 
                    pgwar.get_project_entity_label(stmt.fk_object_info, label_changed.fk_project) AS entity_label
            FROM pgwar.project_statements stmt,
                label_changed
            WHERE stmt.fk_subject_info = label_changed.pk_entity
            AND stmt.fk_project = label_changed.fk_project
            AND stmt.object_label IS NULL
            UNION ALL

            -- Create entity labels of the related subject entities
            SELECT  stmt.fk_subject_info AS pk_entity, 
                    label_changed.fk_project, 
                    pgwar.get_project_entity_label(stmt.fk_subject_info, label_changed.fk_project) AS entity_label
            FROM pgwar.project_statements stmt,
                label_changed
            WHERE stmt.fk_object_info = label_changed.pk_entity
            AND stmt.fk_project = label_changed.fk_project
            AND stmt.object_label IS NULL
        ),
        update_project_labels AS (
            -- Update the project entity labels
            UPDATE pgwar.entity_preview ep
            SET entity_label = new_labels.entity_label
            FROM new_labels
            WHERE ep.pk_entity = new_labels.pk_entity
            AND ep.fk_project = new_labels.fk_project
            AND ep.entity_label IS DISTINCT FROM new_labels.entity_label
        ),
        uniq_entities AS (
            SELECT DISTINCT pk_entity
            FROM label_changed
        )
        -- Update community entity labels
        UPDATE pgwar.entity_preview ep
        SET entity_label = el.entity_label
        FROM uniq_entities,
            pgwar.v_community_entity_label el
        WHERE uniq_entities.pk_entity = el.pk_entity
        AND uniq_entities.pk_entity = ep.pk_entity
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
    
        WITH new_labels AS (

            -- Create entity labels of the related object entities
            SELECT  stmt.fk_object_info AS pk_entity, 
                    oldtab.fk_project, 
                    pgwar.get_project_entity_label(stmt.fk_object_info, oldtab.fk_project) AS entity_label
            FROM pgwar.project_statements stmt,
                oldtab
            WHERE oldtab.entity_label IS NOT NULL 
            AND oldtab.fk_project != 0
            AND stmt.fk_subject_info = oldtab.pk_entity
            AND stmt.fk_project = oldtab.fk_project
            AND stmt.object_label IS NULL
            UNION ALL

            -- Create entity labels of the related subject entities
            SELECT  stmt.fk_subject_info AS pk_entity, 
                    oldtab.fk_project, 
                    pgwar.get_project_entity_label(stmt.fk_subject_info, oldtab.fk_project) AS entity_label
            FROM pgwar.project_statements stmt,
                oldtab
            WHERE oldtab.entity_label IS NOT NULL 
            AND oldtab.fk_project != 0
            AND stmt.fk_object_info = oldtab.pk_entity
            AND stmt.fk_project = oldtab.fk_project
            AND stmt.object_label IS NULL
        )
        -- Update the project entity labels
        UPDATE pgwar.entity_preview ep
        SET entity_label = new_labels.entity_label
        FROM new_labels
        WHERE ep.pk_entity = new_labels.pk_entity
        AND ep.fk_project = new_labels.fk_project
        AND ep.entity_label IS DISTINCT FROM new_labels.entity_label;



        -- Update community entity labels
        WITH uniq_entities AS (
            SELECT DISTINCT pk_entity
            FROM oldtab
            WHERE oldtab.fk_project != 0 
        )
        UPDATE pgwar.entity_preview ep
        SET entity_label = el.entity_label
        FROM uniq_entities,
            pgwar.v_community_entity_label el
        WHERE uniq_entities.pk_entity = el.pk_entity
        AND uniq_entities.pk_entity = ep.pk_entity
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

    REFRESH MATERIALIZED VIEW pgwar.project_label_config;

    project_id := COALESCE(NEW.fk_project, OLD.fk_project);
    class_id := COALESCE(NEW.fk_class, OLD.fk_class);

    IF project_id = 375669 THEN 

        -- perform update of entity labels that depend on the default config of project 375669
        WITH new_labels AS (
            SELECT  ep.pk_entity, 
                    ep.fk_project,
                    pgwar.get_project_entity_label(ep.pk_entity, ep.fk_project) AS entity_label
            FROM pgwar.entity_preview ep
            LEFT JOIN projects.entity_label_config c 
                ON c.fk_class = ep.fk_class 
                AND c.fk_project = ep.fk_project
            WHERE ep.fk_class = class_id
            AND ep.fk_project != 0 -- all projects except 0
            AND c.config IS NULL -- take only rows that have no own project config
        )
        UPDATE pgwar.entity_preview ep
        SET entity_label = new_labels.entity_label
        FROM new_labels
        WHERE new_labels.pk_entity = ep.pk_entity
        AND new_labels.fk_project = ep.fk_project
        AND ep.entity_label IS DISTINCT FROM new_labels.entity_label;
      
    ELSE
        -- Update the project entity labels
        WITH new_labels AS (
            SELECT  ep.pk_entity, 
                    ep.fk_project,
                    pgwar.get_project_entity_label(ep.pk_entity, ep.fk_project) AS entity_label
            FROM pgwar.entity_preview ep
            WHERE ep.fk_project != 0 -- all projects except 0
        )
        UPDATE pgwar.entity_preview ep
        SET entity_label = new_labels.entity_label
        FROM new_labels
        WHERE ep.pk_entity = new_labels.pk_entity
        AND ep.fk_project = new_labels.fk_project
        AND ep.entity_label IS DISTINCT FROM new_labels.entity_label;

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