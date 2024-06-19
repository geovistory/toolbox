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
                pep.entity_label, -- take the project entity label,
                cep.entity_label -- else the community entity label
            )::VARCHAR AS label
    FROM pgwar.project_statements pstmt
    -- join the project entity
    LEFT JOIN pgwar.entity_preview pep 
        ON pep.fk_project = project_id
        AND pstmt.fk_subject_info = pep.pk_entity
    -- join the community entity
    LEFT JOIN pgwar.entity_preview cep
        ON cep.fk_project = 0
        AND pstmt.fk_subject_info = cep.pk_entity
    WHERE
        pstmt.fk_object_info = entity_id
      	AND pstmt.fk_project = project_id 
        AND pstmt.fk_property = property_id
    ORDER BY pstmt.ord_num_of_domain ASC, pstmt.tmsp_last_modification DESC
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
                pstmt.object_label, -- take the literal label
                pep.entity_label, -- else the project entity label,
                cep.entity_label -- else the community entity label
            )::VARCHAR AS label
    FROM pgwar.project_statements pstmt
    -- join the project entity
    LEFT JOIN pgwar.entity_preview pep 
        ON pep.fk_project = project_id
        AND pstmt.fk_object_info = pep.pk_entity
    -- join the community entity
    LEFT JOIN pgwar.entity_preview cep
        ON cep.fk_project = 0
        AND pstmt.fk_object_info = cep.pk_entity
    WHERE
        pstmt.fk_subject_info = entity_id
      	AND pstmt.fk_project = project_id 
        AND pstmt.fk_property = property_id
    ORDER BY pstmt.ord_num_of_range ASC, pstmt.tmsp_last_modification DESC
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
    AND fk_project != 0
    AND entity_label IS DISTINCT FROM new_label;
END;
$$ LANGUAGE plpgsql;

/***
* Triggers
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
    PERFORM pgwar.update_project_entity_label(subject_entity_id, project_id, pgwar.get_project_entity_label(subject_entity_id, project_id));

    -- Check if the object is an entity (object_label IS NULL)
    IF COALESCE(NEW.object_label, OLD.object_label) IS NULL THEN
        object_entity_id := COALESCE(NEW.fk_object_info, OLD.fk_object_info);
        PERFORM pgwar.update_project_entity_label(object_entity_id, project_id, pgwar.get_project_entity_label(object_entity_id, project_id));
    END IF;

    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_modify_project_statement
AFTER INSERT OR UPDATE OR DELETE ON pgwar.project_statements
FOR EACH ROW
EXECUTE FUNCTION pgwar.update_entity_label_on_project_statement_change();

-- Update entity labels on change on entity preview fk_class

CREATE OR REPLACE FUNCTION pgwar.update_entity_label_on_fk_class_change()
RETURNS TRIGGER AS $$
DECLARE
    project_id int;
    entity_id int;
    new_label text;
BEGIN
    project_id := COALESCE(NEW.fk_project, OLD.fk_project);
    entity_id := COALESCE(NEW.pk_entity, OLD.pk_entity);

    -- Update the entity label in pgwar.entity_preview
    PERFORM pgwar.update_project_entity_label(entity_id, project_id, pgwar.get_project_entity_label(entity_id, project_id));

    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_upsert_entity_preview_fk_class
AFTER INSERT OR UPDATE OF fk_class ON pgwar.entity_preview
FOR EACH ROW
WHEN (NEW.fk_project IS DISTINCT FROM 0)
EXECUTE FUNCTION pgwar.update_entity_label_on_fk_class_change();

-- Update entity labels of related entities, on change on entity preview entity_label
CREATE OR REPLACE FUNCTION pgwar.update_entity_label_on_entity_label_change()
RETURNS TRIGGER AS $$
DECLARE
    project_id int;
    entity_id int;
BEGIN
    project_id := COALESCE(NEW.fk_project, OLD.fk_project);
    entity_id := COALESCE(NEW.pk_entity, OLD.pk_entity);

    -- Update the entity labels of the related object entities
    PERFORM pgwar.update_project_entity_label(fk_object_info, project_id, pgwar.get_project_entity_label(fk_object_info, project_id))
    FROM pgwar.project_statements
    WHERE fk_subject_info = entity_id
    AND object_label IS NULL
    AND fk_project = project_id;

    -- Update the entity labels of the related subject entities
    PERFORM pgwar.update_project_entity_label(fk_subject_info, project_id, pgwar.get_project_entity_label(fk_subject_info, project_id))
    FROM pgwar.project_statements
    WHERE fk_object_info = entity_id
    AND fk_project = project_id;

    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_upsert_entity_preview_entity_label
AFTER DELETE OR INSERT OR UPDATE OF entity_label ON pgwar.entity_preview
FOR EACH ROW
EXECUTE FUNCTION pgwar.update_entity_label_on_entity_label_change();


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
        PERFORM pgwar.update_project_entity_label(ep.pk_entity, ep.fk_project, pgwar.get_project_entity_label(ep.pk_entity, ep.fk_project)) 
        FROM pgwar.entity_preview ep
        LEFT JOIN projects.entity_label_config c 
            ON c.fk_class = class_id 
            AND c.fk_project != project_id
        WHERE ep.fk_class = class_id
        AND ep.fk_project != 0
        AND c.config IS NULL; -- take only rows that have no proper project config

    ELSE

        PERFORM pgwar.update_project_entity_label(pk_entity, fk_project, pgwar.get_project_entity_label(pk_entity, fk_project)) 
        FROM pgwar.entity_preview
        WHERE fk_class = class_id
        AND fk_project = project_id;

    END IF;

    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_upsert_entity_label_config
AFTER DELETE OR INSERT OR UPDATE ON projects.entity_label_config
FOR EACH ROW
EXECUTE FUNCTION pgwar.update_entity_label_on_entity_label_config_change();