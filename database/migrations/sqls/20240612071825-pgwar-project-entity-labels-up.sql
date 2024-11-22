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
    to_update_community INTEGER[];
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

        WITH label_changed AS (
                    SELECT 
                        newtab.pk_entity,
                        newtab.fk_project
                    FROM
                        newtab
                        JOIN oldtab 
                            ON  oldtab.pk_entity = newtab.pk_entity AND
                                oldtab.fk_project = newtab.fk_project AND
                                oldtab.entity_label IS DISTINCT FROM newtab.entity_label -- entity_label changed ! 
                    WHERE  
                        newtab.fk_project != 0
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
                )
                    -- Update the project entity labels
                    UPDATE pgwar.entity_preview ep
                    SET entity_label = new_labels.entity_label
                    FROM new_labels
                    WHERE ep.pk_entity = new_labels.pk_entity
                    AND ep.fk_project = new_labels.fk_project
                    AND ep.entity_label IS DISTINCT FROM new_labels.entity_label
            ;


        WITH label_changed AS (
                    SELECT 
                        newtab.pk_entity,
                        newtab.fk_project
                    FROM
                        newtab
                        JOIN oldtab 
                            ON  oldtab.pk_entity = newtab.pk_entity AND
                                oldtab.fk_project = newtab.fk_project AND
                                oldtab.entity_label IS DISTINCT FROM newtab.entity_label -- entity_label changed ! 
                    WHERE  
                        newtab.fk_project != 0
                ),
                new_labels AS (
                    -- Create entity labels of the related subject entities
                    SELECT  stmt.fk_subject_info AS pk_entity, 
                            label_changed.fk_project, 
                            pgwar.get_project_entity_label(stmt.fk_subject_info, label_changed.fk_project) AS entity_label
                    FROM pgwar.project_statements stmt,
                        label_changed
                    WHERE stmt.fk_object_info = label_changed.pk_entity
                    AND stmt.fk_project = label_changed.fk_project
                    AND stmt.object_label IS NULL
                )   -- Update the project entity labels
                    UPDATE pgwar.entity_preview ep
                    SET entity_label = new_labels.entity_label
                    FROM new_labels
                    WHERE ep.pk_entity = new_labels.pk_entity
                    AND ep.fk_project = new_labels.fk_project
                    AND ep.entity_label IS DISTINCT FROM new_labels.entity_label
                ;

        -- get ids that need update of community label
        SELECT array_agg(pk_entity) INTO to_update_community
        FROM (
            SELECT newtab.pk_entity
            FROM
                newtab
                JOIN oldtab 
                    ON  oldtab.pk_entity = newtab.pk_entity AND
                        oldtab.fk_project = newtab.fk_project AND
                        oldtab.entity_label IS DISTINCT FROM newtab.entity_label -- entity_label changed ! 
            WHERE  
                newtab.fk_project != 0
            GROUP BY newtab.pk_entity
        ) as changed;

        UPDATE pgwar.entity_preview ep
        SET entity_label = el.entity_label
        FROM unnest(to_update_community) as changed_pk_entity(pk_entity),
            pgwar.v_community_entity_label el
        WHERE changed_pk_entity.pk_entity = el.pk_entity
        AND changed_pk_entity.pk_entity = ep.pk_entity
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

-- Update entity labels manually based on entity label config changes
CREATE OR REPLACE FUNCTION pgwar.update_entity_label_on_config_change()
    RETURNS VOID AS $$
DECLARE
    _job_name text; -- Variable to store the job name
    _current_offset timestamp; -- Variable to store the current offset timestam
    project_id int;
    class_id int;
BEGIN
    _job_name := 'update-entity-label-on-config-change'; -- Initialize the job name

    -- Check if the offset for the job is already initialized
    IF NOT EXISTS(
        SELECT offset_tmsp
        FROM pgwar.offsets
        WHERE job_name = _job_name
    ) THEN
        -- If not, initialize it with a default value
        INSERT INTO pgwar.offsets (job_name, offset_tmsp)
        VALUES (_job_name, '2024-10-17 00:00:00.000000+00');
    END IF;

    -- Retrieve the current offset timestamp for the job
    SELECT offset_tmsp INTO _current_offset
    FROM pgwar.offsets
    WHERE job_name = _job_name;

    -- Get project_id and class_id from the entity_label_config table
    FOR project_id, class_id IN
        SELECT fk_project, fk_class
        FROM projects.entity_label_config
        WHERE tmsp_last_modification > _current_offset
        LOOP
            IF project_id = 375669 THEN
                -- Perform update of entity labels that depend on the default config of project 375669
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
                    WHERE ep.fk_project != 0 AND ep.fk_project = project_id -- all projects except 0
                )
                UPDATE pgwar.entity_preview ep
                SET entity_label = new_labels.entity_label
                FROM new_labels
                WHERE ep.pk_entity = new_labels.pk_entity
                  AND ep.fk_project = new_labels.fk_project
                  AND ep.entity_label IS DISTINCT FROM new_labels.entity_label;
            END IF;
        END LOOP;

    -- Update the offset table with the current timestamp to mark the job completion time
    UPDATE pgwar.offsets
    SET offset_tmsp = CURRENT_TIMESTAMP
    WHERE job_name = _job_name;

END;
$$ LANGUAGE plpgsql;

-- Update entity_preview label
CREATE OR REPLACE FUNCTION pgwar.update_entity_preview_entity_label()
    RETURNS VOID AS $$
DECLARE
    _job_name text;
    _current_offset timestamp;
BEGIN
    _job_name := 'update-entity-label';
    -- initialize offset, if needed
    IF NOT EXISTS(
        SELECT offset_tmsp
        FROM pgwar.offsets
        WHERE job_name = _job_name
    ) THEN
        INSERT INTO pgwar.offsets (job_name, offset_tmsp)
        VALUES (_job_name, '2000-01-01 00:00:00.000000+00');
    END IF;

    -- Get the current offset timestamp
    SELECT offset_tmsp INTO _current_offset
    FROM pgwar.offsets
    WHERE job_name = _job_name;

    -- Retrieve and update entity labels for rows inserted/updated after the last offset
    WITH new_labels AS (
        -- Select entities that were inserted or updated after the last offset
        SELECT  ep.pk_entity,
                ep.fk_project,
                pgwar.get_project_entity_label(ep.pk_entity, ep.fk_project) AS entity_label
        FROM pgwar.entity_preview ep
        WHERE ep.fk_project != 0
          AND (ep.tmsp_entity_label_modification > _current_offset OR ep.tmsp_fk_class_modification > _current_offset OR ep.tmsp_entity_label_modification IS NULL)
    )
    -- Update the project entity labels
    UPDATE pgwar.entity_preview ep
    SET entity_label = new_labels.entity_label,
        tmsp_entity_label_modification = CURRENT_TIMESTAMP
    FROM new_labels
    WHERE ep.pk_entity = new_labels.pk_entity
      AND ep.fk_project = new_labels.fk_project
      AND ep.entity_label IS DISTINCT FROM new_labels.entity_label;

    -- Update community entity labels
    WITH uniq_entities AS (
        SELECT DISTINCT ep.pk_entity
        FROM pgwar.entity_preview ep
        WHERE ep.fk_project != 0
          AND (ep.tmsp_entity_label_modification > _current_offset OR ep.tmsp_fk_class_modification > _current_offset OR ep.tmsp_entity_label_modification IS NULL)
    )
    UPDATE pgwar.entity_preview ep
    SET entity_label = el.entity_label,
        tmsp_entity_label_modification = CURRENT_TIMESTAMP
    FROM uniq_entities,
         pgwar.v_community_entity_label el
    WHERE uniq_entities.pk_entity = el.pk_entity
      AND uniq_entities.pk_entity = ep.pk_entity
      AND ep.fk_project = 0
      AND ep.entity_label IS DISTINCT FROM el.entity_label;

    -- Update the offset table with the current timestamp to mark the job completion time
    UPDATE pgwar.offsets
    SET offset_tmsp = CURRENT_TIMESTAMP
    WHERE job_name = _job_name;

END;
$$ LANGUAGE plpgsql;

-- Update entity_preview label
CREATE OR REPLACE FUNCTION pgwar.update_entity_preview_entity_label_after_stmt_delete()
    RETURNS VOID AS $$
DECLARE
    _job_name text;
    _current_offset timestamp;
BEGIN
    _job_name := 'update-entity-label-after-stmt-delete';
    -- initialize offset, if needed
    IF NOT EXISTS(
        SELECT offset_tmsp
        FROM pgwar.offsets
        WHERE job_name = _job_name
    ) THEN
        INSERT INTO pgwar.offsets (job_name, offset_tmsp)
        VALUES (_job_name, '2000-01-01 00:00:00.000000+00');
    END IF;

    -- Get the current offset timestamp
    SELECT offset_tmsp INTO _current_offset
    FROM pgwar.offsets
    WHERE job_name = _job_name;

    -- Retrieve and update entity labels for rows inserted/updated after the last offset
    WITH new_labels AS (
        -- Select entities that have a deleted statement after the last offset
        SELECT 	ep.pk_entity,
                  ep.fk_project,
                  pgwar.get_project_entity_label(ep.pk_entity, ep.fk_project) AS entity_label
        FROM pgwar.entity_preview ep
                 JOIN pgwar.project_statements ps ON ps.fk_subject_info = ep.pk_entity AND ep.fk_project = ps.fk_project
                 JOIN pgwar.v_statements_deleted_combined sdc ON sdc.fk_object_info = ps.fk_object_info AND ps.fk_project = sdc.fk_project
        WHERE sdc.tmsp_deletion > _current_offset
    )
    -- Update the project entity labels
    UPDATE pgwar.entity_preview ep
    SET entity_label = new_labels.entity_label,
        tmsp_entity_label_modification = CURRENT_TIMESTAMP
    FROM new_labels
    WHERE ep.pk_entity = new_labels.pk_entity
      AND ep.fk_project = new_labels.fk_project
      AND ep.entity_label IS DISTINCT FROM new_labels.entity_label;

    -- Update community entity labels
    WITH uniq_entities AS (
        SELECT DISTINCT ep.pk_entity
        FROM pgwar.entity_preview ep
                 JOIN pgwar.project_statements ps ON ps.fk_subject_info = ep.pk_entity AND ep.fk_project = ps.fk_project
                 JOIN pgwar.v_statements_deleted_combined sdc ON sdc.fk_object_info = ps.fk_object_info AND ps.fk_project = sdc.fk_project
        WHERE sdc.tmsp_deletion > _current_offset AND ep.fk_project != 0
    )
    UPDATE pgwar.entity_preview ep
    SET entity_label = el.entity_label,
        tmsp_entity_label_modification = CURRENT_TIMESTAMP
    FROM uniq_entities,
         pgwar.v_community_entity_label el
    WHERE uniq_entities.pk_entity = el.pk_entity
      AND uniq_entities.pk_entity = ep.pk_entity
      AND ep.fk_project = 0
      AND ep.entity_label IS DISTINCT FROM el.entity_label;

    -- Update the offset table with the current timestamp to mark the job completion time
    UPDATE pgwar.offsets
    SET offset_tmsp = CURRENT_TIMESTAMP
    WHERE job_name = _job_name;

END;
$$ LANGUAGE plpgsql;


-- -- Update entity labels on change on entity label config
-- CREATE OR REPLACE FUNCTION pgwar.update_entity_label_on_entity_label_config_change()
-- RETURNS TRIGGER AS $$
-- DECLARE
--     project_id int;
--     class_id int;
-- BEGIN
--
--     project_id := COALESCE(NEW.fk_project, OLD.fk_project);
--     class_id := COALESCE(NEW.fk_class, OLD.fk_class);
--
--     IF project_id = 375669 THEN
--
--         -- perform update of entity labels that depend on the default config of project 375669
--         WITH new_labels AS (
--             SELECT  ep.pk_entity,
--                     ep.fk_project,
--                     pgwar.get_project_entity_label(ep.pk_entity, ep.fk_project) AS entity_label
--             FROM pgwar.entity_preview ep
--             LEFT JOIN projects.entity_label_config c
--                 ON c.fk_class = ep.fk_class
--                 AND c.fk_project = ep.fk_project
--             WHERE ep.fk_class = class_id
--             AND ep.fk_project != 0 -- all projects except 0
--             AND c.config IS NULL -- take only rows that have no own project config
--         )
--         UPDATE pgwar.entity_preview ep
--         SET entity_label = new_labels.entity_label
--         FROM new_labels
--         WHERE new_labels.pk_entity = ep.pk_entity
--         AND new_labels.fk_project = ep.fk_project
--         AND ep.entity_label IS DISTINCT FROM new_labels.entity_label;
--
--     ELSE
--         -- Update the project entity labels
--         WITH new_labels AS (
--             SELECT  ep.pk_entity,
--                     ep.fk_project,
--                     pgwar.get_project_entity_label(ep.pk_entity, ep.fk_project) AS entity_label
--             FROM pgwar.entity_preview ep
--             WHERE ep.fk_project != 0 -- all projects except 0
--         )
--         UPDATE pgwar.entity_preview ep
--         SET entity_label = new_labels.entity_label
--         FROM new_labels
--         WHERE ep.pk_entity = new_labels.pk_entity
--         AND ep.fk_project = new_labels.fk_project
--         AND ep.entity_label IS DISTINCT FROM new_labels.entity_label;
--
--     END IF;
--
--     RETURN NULL;
-- END;
-- $$ LANGUAGE plpgsql;


/***
* Triggers
***/

-- CREATE TRIGGER after_insert_entity_preview
-- AFTER INSERT ON pgwar.entity_preview
-- REFERENCING NEW TABLE AS newtab
-- EXECUTE FUNCTION pgwar.update_entity_labels_after_insert();

-- CREATE TRIGGER after_update_entity_preview
-- AFTER UPDATE ON pgwar.entity_preview
-- REFERENCING NEW TABLE AS newtab OLD TABLE AS oldtab
-- EXECUTE FUNCTION pgwar.update_entity_labels_after_update();

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

-- CREATE TRIGGER on_upsert_entity_label_config
-- AFTER DELETE OR INSERT OR UPDATE ON projects.entity_label_config
-- FOR EACH ROW
-- EXECUTE FUNCTION pgwar.update_entity_label_on_entity_label_config_change();