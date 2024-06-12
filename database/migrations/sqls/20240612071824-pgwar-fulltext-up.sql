-- create dblink extension for accessing database with pg_cron
CREATE EXTENSION dblink;

/***
* Functions
***/

-- get label of outgoing field
CREATE OR REPLACE FUNCTION pgwar.get_label_of_outgoing_field(
    entity_id INT,
    project_id INT,
    property_id INT,
    limit_count INT
)
RETURNS text AS $$
DECLARE
    label text;
BEGIN
    SELECT string_agg(labels.label, ', ') INTO label 
    FROM pgwar.get_target_labels_of_outgoing_field(entity_id, project_id, property_id, limit_count) AS labels;
    RETURN label;
END;
$$ LANGUAGE plpgsql;

-- get label of incoming field
CREATE OR REPLACE FUNCTION pgwar.get_label_of_incoming_field(
    entity_id INT,
    project_id INT,
    property_id INT,
    limit_count INT
)
RETURNS text AS $$
DECLARE
    label text;
BEGIN
    SELECT string_agg(labels.label, ', ') INTO label 
    FROM pgwar.get_target_labels_of_incoming_field(entity_id, project_id, property_id, limit_count) AS labels;
    RETURN label;
END;
$$ LANGUAGE plpgsql;


-- get the label of a property in the language (or in the english fallback) 
CREATE OR REPLACE FUNCTION pgwar.get_property_label(property_id int, lang_code text)
RETURNS text AS $$
DECLARE
    label text;
BEGIN
    -- get newest label in requested language
    SELECT dfh_property_label INTO label
    FROM data_for_history.api_property
    WHERE dfh_pk_property = property_id
    AND dfh_property_label_language = lang_code
    ORDER BY tmsp_last_dfh_update DESC
    LIMIT 1;

    IF label IS NOT NULL THEN RETURN label; END IF;

    -- get newest label in english
    SELECT dfh_property_label INTO label
    FROM data_for_history.api_property
    WHERE dfh_pk_property = property_id
    AND dfh_property_label_language = 'en'
    ORDER BY tmsp_last_dfh_update DESC
    LIMIT 1;

    RETURN label;
    
END;
$$ LANGUAGE plpgsql;


-- get the inverse label of a property in the language (or in the english fallback) 
CREATE OR REPLACE FUNCTION pgwar.get_property_inverse_label(property_id int, lang_code text)
RETURNS text AS $$
DECLARE
    label text;
BEGIN
    -- get newest inverse label in requested language
    SELECT dfh_property_inverse_label INTO label
    FROM data_for_history.api_property
    WHERE dfh_pk_property = property_id
    AND dfh_property_label_language = lang_code
    ORDER BY tmsp_last_dfh_update DESC
    LIMIT 1;

    IF label IS NOT NULL THEN RETURN label; END IF;

    -- get newest inverse label in english
    SELECT dfh_property_inverse_label INTO label
    FROM data_for_history.api_property
    WHERE dfh_pk_property = property_id
    AND dfh_property_label_language = 'en'
    ORDER BY tmsp_last_dfh_update DESC
    LIMIT 1;

    RETURN label;
    
END;
$$ LANGUAGE plpgsql;

-- get project language code (useful for joining OntoME language codes)
CREATE OR REPLACE FUNCTION pgwar.get_project_lang_code(project_id int)
RETURNS text AS $$
DECLARE
    lang_code text;
BEGIN
    -- get language code of the project language
    SELECT trim(iso6391) INTO lang_code
    FROM information.language lang,
         projects.project pro
    WHERE pro.pk_entity = project_id
    AND pro.fk_language = lang.pk_entity
    LIMIT 1;

    RETURN lang_code;
    
END;
$$ LANGUAGE plpgsql;

-- create the fulltext of an entity
CREATE OR REPLACE FUNCTION pgwar.get_project_fulltext(project_id int, entity_id int)
RETURNS text AS $$
DECLARE
    full_text text;
    lang_code text;
BEGIN
    -- get language code of the project language
    lang_code := pgwar.get_project_lang_code(project_id);  

    WITH fields AS (
        SELECT DISTINCT ON (fk_property) 
            concat(
                pgwar.get_property_label(fk_property, lang_code), 
                ': ',
                pgwar.get_label_of_outgoing_field(entity_id, project_id, fk_property, 5)
            ) AS field_string
        FROM pgwar.project_statements
        WHERE fk_subject_info = entity_id
        AND fk_project = project_id 
        UNION 
        SELECT DISTINCT ON (fk_property) 
            concat(
                pgwar.get_property_inverse_label(fk_property, lang_code), 
                ': ',
                pgwar.get_label_of_incoming_field(entity_id, project_id, fk_property, 5)
            ) AS field_string
        FROM pgwar.project_statements
        WHERE fk_object_info = entity_id
        AND fk_project = project_id 

    )
    SELECT string_agg(fields.field_string, '\n ') INTO full_text  
    FROM fields;
    
    RETURN full_text;
END;
$$ LANGUAGE plpgsql;

------ Table pgwar.project_statements_deleted ----------------------------------------------------------------
---------------------------------------------------------------------------------------------
-- this table is used by the fulltext cron job to find entities that need an fulltext update
-- because they are the subject or object of a deleted project statement
CREATE TABLE IF NOT EXISTS pgwar.project_statements_deleted(
  pk_entity integer NOT NULL,
  fk_project integer NOT NULL,
  fk_subject_info integer,
  fk_property integer NOT NULL,
  fk_object_info integer,
  tmsp_deletion timestamp with time zone,
  PRIMARY KEY (pk_entity, fk_project)
);

CREATE OR REPLACE FUNCTION pgwar.handle_project_statements_delete() 
RETURNS TRIGGER AS $$
BEGIN
    -- Insert or update the deleted row in pgwar.project_statements_deleted
    INSERT INTO pgwar.project_statements_deleted (pk_entity, fk_project, fk_subject_info, fk_property, fk_object_info, tmsp_deletion)
    VALUES (OLD.pk_entity, OLD.fk_project, OLD.fk_subject_info, OLD.fk_property, OLD.fk_object_info, CURRENT_TIMESTAMP)
    ON CONFLICT (pk_entity, fk_project)
    DO UPDATE SET 
        fk_subject_info = EXCLUDED.fk_subject_info,
        fk_property = EXCLUDED.fk_property,
        fk_object_info = EXCLUDED.fk_object_info,
        tmsp_deletion = EXCLUDED.tmsp_deletion;

    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_delete_project_statements
AFTER DELETE ON pgwar.project_statements
FOR EACH ROW
EXECUTE FUNCTION pgwar.handle_project_statements_delete();
