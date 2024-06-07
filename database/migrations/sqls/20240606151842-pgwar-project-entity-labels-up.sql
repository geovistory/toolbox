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



-- get target labels of incoming field
CREATE OR REPLACE FUNCTION pgwar.get_target_labels_of_incoming_field(
    entity_id INT,
    project_id INT,
    property_id INT,
    limit_count INT
)
RETURNS TABLE(label VARCHAR) AS $$
BEGIN
    RETURN QUERY
    SELECT coalesce(
                t2.entity_label, -- take the project entity label,
                t3.entity_label -- else the community entity label
            )::VARCHAR AS label
    FROM pgwar.statement t1 -- TODO: change to pgwar.project_statement t1
    -- join the project entity
    LEFT JOIN pgwar.entity_preview t2 
        ON t2.fk_project = project_id
        AND t1.fk_subject_info = t2.pk_entity
    -- join the community entity
    LEFT JOIN pgwar.entity_preview t3
        ON t3.fk_project = 0
        AND t1.fk_subject_info = t3.pk_entity
    WHERE
        t1.fk_object_info = entity_id
      	-- TODO: add: AND t1.fk_project = project_id 
        AND t1.fk_property = property_id
    -- TODO: add: ORDER BY t1.ord_num_of_domain ASC, t1.tmsp_last_modification DESC
    LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;

-- get target labels of outgoing field
CREATE OR REPLACE FUNCTION pgwar.get_target_labels_of_outgoing_field(
    entity_id INT,
    project_id INT,
    property_id INT,
    limit_count INT
)
RETURNS TABLE(label VARCHAR) AS $$
BEGIN
    RETURN QUERY
    SELECT coalesce(
                t1.object_label, -- take the literal label
                t2.entity_label, -- else the project entity label,
                t3.entity_label -- else the community entity label
            )::VARCHAR AS label
    FROM pgwar.statement t1 -- TODO: change to pgwar.project_statement t1
    -- join the project entity
    LEFT JOIN pgwar.entity_preview t2 
        ON t2.fk_project = project_id
        AND t1.fk_object_info = t2.pk_entity
    -- join the community entity
    LEFT JOIN pgwar.entity_preview t3
        ON t3.fk_project = 0
        AND t1.fk_object_info = t3.pk_entity
    WHERE
        t1.fk_subject_info = entity_id
      	-- TODO: add: AND t1.fk_project = project_id 
        AND t1.fk_property = property_id
    -- TODO: add: ORDER BY t1.ord_num_of_domain ASC, t1.tmsp_last_modification DESC
    LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;


-- get target label of field
CREATE OR REPLACE FUNCTION pgwar.get_target_label_of_field(entity_id int, project_id int, field jsonb)
RETURNS text AS $$
DECLARE
    is_outgoing bool;
    property_id int;
    limit_count int;
    label text;
BEGIN
	is_outgoing := (field->'isOutgoing')::bool;
    property_id := (field->'fkProperty')::int;
	limit_count := (field->'nrOfStatementsInLabel')::int;


    IF is_outgoing = true THEN
        SELECT string_agg(labels.label, ', ') INTO label 
        FROM pgwar.get_target_labels_of_outgoing_field(entity_id, project_id, property_id, limit_count) AS labels;
    ELSE
        SELECT string_agg(labels.label,', ') INTO label 
        FROM pgwar.get_target_labels_of_incoming_field(entity_id, project_id, property_id, limit_count) AS labels;
    END IF;

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
	SELECT string_agg(
        -- get label per field
        pgwar.get_target_label_of_field(entity_id, project_id, part->'field'),
        -- separator
         ', '
    ) INTO label
	FROM 
    -- expand fields
    jsonb_array_elements(label_config->'labelParts') part;

    RETURN label;
END;
$$ LANGUAGE plpgsql;

-- update entity label or project entity
CREATE OR REPLACE FUNCTION pgwar.update_project_entity_label(entity_id int, project_id int, new_label text)
RETURNS void AS $$
BEGIN
    UPDATE pgwar.entity_preview 
    SET entity_label = new_label
    WHERE pk_entity = entity_id
    AND fk_project = project_id
    AND entity_label IS DISTINCT FROM new_label;
END;
$$ LANGUAGE plpgsql;
