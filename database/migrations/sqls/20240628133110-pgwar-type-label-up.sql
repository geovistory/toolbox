CREATE OR REPLACE FUNCTION pgwar.update_type_label() RETURNS void AS $$
DECLARE
    _job_name text; -- Variable to store the job name
    _current_offset timestamp; -- Variable to store the current offset timestamp
BEGIN
    _job_name := 'update-type-label'; -- Initialize the job name

    -- Check if the offset for the job is already initialized
    IF NOT EXISTS(
        SELECT offset_tmsp
        FROM pgwar.offsets
        WHERE job_name = _job_name
    ) THEN
        -- If not, initialize it with a default value
        INSERT INTO pgwar.offsets (job_name, offset_tmsp)
        VALUES (_job_name, '2000-01-01 00:00:00.000000+00');
    END IF;

    -- Retrieve the current offset timestamp for the job
    SELECT offset_tmsp INTO _current_offset
    FROM pgwar.offsets
    WHERE job_name = _job_name;

    -- Identify the records in the entity_preview table that need updating
    WITH to_update AS (
        SELECT 
            origin.pk_entity, -- Primary key of the entity from the origin table
            origin.fk_project, -- Foreign key of the project from the origin table
            target.entity_label AS type_label -- Target entity label that will become the type_label of origin
        FROM 
            pgwar.entity_preview origin -- Origin entity preview (having fk_type)
        LEFT JOIN
            pgwar.entity_preview target ON -- Left join with the same table to find the referenced type entity 
                origin.fk_type = target.pk_entity AND -- Match type entity on fk_type
                origin.fk_project = target.fk_project AND -- Match on project ID
                origin.type_label IS DISTINCT FROM target.entity_label -- Ensure the type label is different between origin and target
        WHERE 
            origin.fk_type_modified > _current_offset -- Check if origin's fk_type changed since the last offset timestamp
            OR target.entity_label_modified > _current_offset -- Check if the target's label changed since the last offset timestamp
    )
    -- Update the entity_preview table with the new type labels
    UPDATE pgwar.entity_preview ep
    SET type_label = to_update.type_label
    FROM to_update
    WHERE ep.pk_entity = to_update.pk_entity
    AND ep.fk_project = to_update.fk_project;

    -- Update the offset table with the current timestamp to mark the job completion time
    UPDATE pgwar.offsets
    SET offset_tmsp = CURRENT_TIMESTAMP
    WHERE job_name = _job_name;

END;
$$ LANGUAGE plpgsql;
