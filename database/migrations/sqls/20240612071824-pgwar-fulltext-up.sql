-- create dblink extension for accessing postgres cron
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

-- -- create the fulltext of an entity
-- CREATE OR REPLACE FUNCTION pgwar.get_fulltext(project_id int, entity_id int)
-- RETURNS text AS $$
-- DECLARE
--     full_text text;
-- BEGIN
--     -- get language code of the project language
--     lang_code := pgwar.get_project_lang_code(project_id);  

--     WITH outgoing_fields AS (
--         SELECT DISTINCT ON (fk_property) 
--             concat(
--                 pgwar.get_property_label(fk_property, lang_code), 
--                 ': ',
--                 pgwar.get_label_of_outgoing_field(entity_id, project_id, fk_property, 5)
--             ) field_string
--         FROM pgwar.statement -- TODO: change to project statement
--         WHERE fk_subject_info = entity_id
--         -- TODO: AND fk_project = project_id ;
--     )
    
    
-- END;
-- $$ LANGUAGE plpgsql;