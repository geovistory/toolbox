CREATE
OR REPLACE FUNCTION  pgwar.update_fk_entity() RETURNS void AS $$
DECLARE
    _job_name text;
    _current_offset timestamp;
BEGIN
    _job_name := 'update-fk-entity';
    -- Function logic goes here

     -- initialize offset, if needed
    IF NOT EXISTS(
        SELECT offset_tmsp
        FROM pgwar.offsets
        WHERE job_name = _job_name
    ) THEN
        INSERT INTO pgwar.offsets (job_name, offset_tmsp)
        VALUES (_job_name, '2000-01-01 00:00:00.000000+00');
    END IF;

    -- get current offset
    SELECT offset_tmsp INTO _current_offset
    FROM pgwar.offsets
    WHERE job_name = _job_name;

    WITH hastypeprop AS (
        -- Select distinct domain class, property ID, and last modification timestamp
        -- from the api_property table where the property or its parent/ancestor properties
        -- contain the value 2
        SELECT DISTINCT ON (prop.dfh_pk_property)
            prop.dfh_property_domain, 
            prop.dfh_pk_property,
            prop.tmsp_last_modification 
        FROM data_for_history.api_property prop
        WHERE 
            2 = ANY(prop.dfh_pk_property || (prop.dfh_parent_properties || prop.dfh_ancestor_properties))
        ORDER BY 
            prop.dfh_pk_property, 
            prop.tmsp_last_modification DESC
    ),

    entity_preview_with_hastypeprop AS (
        -- Join entity_preview with hastypeprop to get entity ID, project ID, and the
        -- last modification timestamps of both the fk_class of the entity_preview
        -- and the property.
        SELECT 
            ep.pk_entity,
            ep.fk_project,
            ep.fk_class_modified,
            prop.dfh_pk_property,
            prop.tmsp_last_modification AS prop_modified
        FROM 
            pgwar.entity_preview ep,
            hastypeprop prop
        WHERE 
            prop.dfh_property_domain = ep.fk_class
    ),

    with_hastypestmt AS (
        -- Join v_statements_combined with entity_preview_with_hastypeprop to get the
        -- fk_type and the last modification timestamp of the has-type statement
        -- distinct by entity ID, project ID
        SELECT DISTINCT ON (typeprop.pk_entity, typeprop.fk_project)
            typeprop.pk_entity,
            typeprop.fk_project,
            stmt.fk_object_info AS fk_type,
            stmt.tmsp_last_modification AS stmt_modified
        FROM 
            pgwar.v_statements_combined stmt,
            entity_preview_with_hastypeprop typeprop
        WHERE 
            typeprop.pk_entity = stmt.fk_subject_info
            AND typeprop.fk_project = stmt.fk_project
            AND typeprop.dfh_pk_property = stmt.fk_property
        ORDER BY 
            typeprop.pk_entity,
            typeprop.fk_project,
            stmt.ord_num_of_range ASC,
            stmt.tmsp_last_modification DESC
    ),

    with_hastypestmt_del AS (
        -- Join v_statements_deleted_combined with entity_preview_with_hastypeprop to get the
        -- deletion timestamp of of the has-type statement
        -- distinct by entity ID, project ID
        SELECT DISTINCT ON (typeprop.pk_entity, typeprop.fk_project)
            typeprop.pk_entity,
            typeprop.fk_project,
            stmt.tmsp_deletion AS stmt_deleted
        FROM 
            pgwar.v_statements_deleted_combined stmt,
            entity_preview_with_hastypeprop typeprop
        WHERE 
            typeprop.pk_entity = stmt.fk_subject_info
            AND typeprop.fk_project = stmt.fk_project
            AND typeprop.dfh_pk_property = stmt.fk_property
        ORDER BY 
            typeprop.pk_entity,
            typeprop.fk_project,
            stmt.tmsp_deletion DESC
    )

    -- Final selection combining the previous CTE results with a LEFT JOIN to include
    -- all relevant project-entities, the statement with fk_type and timestamps.
    -- The WHERE clause ensures that only records modified after the _current_offset 
    -- and fk_type disctinct from the current fk_type are used for updating
    -- the pgwar.entity_preview table
    UPDATE pgwar.entity_preview ep
    SET fk_type = stmt.fk_type,
        fk_type_modified = CURRENT_TIMESTAMP
    FROM 
        entity_preview_with_hastypeprop ep_prop
    LEFT JOIN 
        with_hastypestmt stmt 
        ON ep_prop.pk_entity = stmt.pk_entity 
        AND ep_prop.fk_project = stmt.fk_project 
    LEFT JOIN 
        with_hastypestmt_del stmtdel 
        ON ep_prop.pk_entity = stmtdel.pk_entity 
        AND ep_prop.fk_project = stmtdel.fk_project 
    WHERE
        ep.fk_type IS DISTINCT FROM stmt.fk_type 
    AND
        ep.pk_entity = ep_prop.pk_entity 
    AND
        ep.fk_project = ep_prop.fk_project
    AND (
            ep_prop.fk_class_modified > _current_offset OR
            ep_prop.prop_modified > _current_offset OR
            stmt.stmt_modified > _current_offset OR
            stmtdel.stmt_deleted > _current_offset
        );

    -- set the offset
    UPDATE pgwar.offsets
    SET offset_tmsp = CURRENT_TIMESTAMP
	WHERE job_name = _job_name;

END;
$$ LANGUAGE plpgsql;

