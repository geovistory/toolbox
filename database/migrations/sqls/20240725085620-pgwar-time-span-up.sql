CREATE OR REPLACE FUNCTION pgwar.update_time_span() RETURNS void AS $$
DECLARE
    _job_name text; -- Variable to store the job name
    _current_offset timestamp; -- Variable to store the current offset timestamp
BEGIN
    _job_name := 'update-time_span'; -- Initialize the job name

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

        

    WITH ranked_statements AS (
        -- Assign a row number to each statement within the partition of fk_project, fk_subject_info, and fk_property,
        -- ordered by the columns you want to prioritize (e.g., timestamps or some other criteria).
        SELECT
            stmt.fk_project,
            stmt.fk_subject_info,
            stmt.fk_property,
            stmt.object_value,
            stmt.tmsp_last_modification AS stmt_modified,
            ROW_NUMBER() OVER (
                PARTITION BY stmt.fk_project, stmt.fk_subject_info, stmt.fk_property
                ORDER BY stmt.ord_num_of_range ASC, stmt.tmsp_last_modification DESC) AS rn
        FROM
            pgwar.v_statements_combined stmt
        WHERE
            stmt.fk_property IN (71,72,150,151,152,153)
    ),
    time_spans AS (
    -- Select only the first row (rn = 1) from each partition and aggregate results into JSON objects.
        SELECT
            fk_project,
            fk_subject_info,
            jsonb_object_agg(
                -- key
                CASE
                    WHEN fk_property = 71 THEN 'p81'
                    WHEN fk_property = 72 THEN 'p82'
                    WHEN fk_property = 150 THEN 'p81a'
                    WHEN fk_property = 151 THEN 'p81b'
                    WHEN fk_property = 152 THEN 'p82a'
                    WHEN fk_property = 153 THEN 'p82b'
                    ELSE fk_property::text -- Handle other properties if necessary
                END,
                -- value
                jsonb_build_object(
                    'calendar', object_value->'timePrimitive'->'calendar',
                    'duration', object_value->'timePrimitive'->'duration',
                    'julianDay', object_value->'timePrimitive'->'julianDay'
                )
            ) AS time_span,
            max(stmt_modified) AS most_recent_stmt_modification,
            min(( object_value->'timePrimitive'->'julianDay')::bigint * 24 * 60 * 60) AS first_second,
            max((( object_value->'timePrimitive'->'julianDay')::bigint +
                CASE
                    WHEN object_value->'timePrimitive'->'duration' = '"1 day"' THEN 1
                    WHEN object_value->'timePrimitive'->'duration' = '"1 month"' THEN 30
                    ELSE 365
                END
            )* 24 * 60 * 60 ) AS last_second
        FROM
            ranked_statements
        WHERE
            rn = 1
        GROUP BY
            fk_project,
            fk_subject_info
    ),
    get_time_spans AS (
        SELECT *
        FROM time_spans
        WHERE most_recent_stmt_modification > '2000-01-01 00:00:00.000000+00'
    )
    UPDATE pgwar.entity_preview ep
    SET time_span = ts.time_span,
        first_second = ts.first_second,
        last_second = ts.last_second
    FROM get_time_spans ts
    WHERE ts.fk_project = ep.fk_project
    AND ts.fk_subject_info = ep.pk_entity
    AND ep.time_span IS DISTINCT FROM ts.time_span;


    -- Update the offset table with the current timestamp to mark the job completion time
    UPDATE pgwar.offsets
    SET offset_tmsp = CURRENT_TIMESTAMP
    WHERE job_name = _job_name;

END;
$$ LANGUAGE plpgsql;
