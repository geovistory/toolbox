-- create dblink extension for accessing database with pg_cron
CREATE EXTENSION dblink;

/***
* Functions for the creation of fulltext
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
CREATE OR REPLACE FUNCTION pgwar.get_project_full_text(project_id int, entity_id int)
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
        FROM pgwar.v_statements_combined
        WHERE fk_subject_info = entity_id
        AND fk_project = project_id 
        UNION 
        SELECT DISTINCT ON (fk_property) 
            concat(
                pgwar.get_property_inverse_label(fk_property, lang_code), 
                ': ',
                pgwar.get_label_of_incoming_field(entity_id, project_id, fk_property, 5)
            ) AS field_string
        FROM pgwar.v_statements_combined
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
  object_value jsonb,
  tmsp_deletion timestamp with time zone,
  PRIMARY KEY (pk_entity, fk_project)
);

CREATE OR REPLACE FUNCTION pgwar.handle_project_statements_delete() 
RETURNS TRIGGER AS $$
BEGIN
    -- Insert or update the deleted row in pgwar.project_statements_deleted
    INSERT INTO pgwar.project_statements_deleted (pk_entity, fk_project, fk_subject_info, fk_property, fk_object_info, object_value, tmsp_deletion)
    VALUES (OLD.pk_entity, OLD.fk_project, OLD.fk_subject_info, OLD.fk_property, OLD.fk_object_info, OLD.object_value, CURRENT_TIMESTAMP)
    ON CONFLICT (pk_entity, fk_project)
    DO UPDATE SET 
        fk_subject_info = EXCLUDED.fk_subject_info,
        fk_property = EXCLUDED.fk_property,
        fk_object_info = EXCLUDED.fk_object_info,
        object_value = EXCLUDED.object_value,
        tmsp_deletion = EXCLUDED.tmsp_deletion;

    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_delete_project_statements
AFTER DELETE ON pgwar.project_statements
FOR EACH ROW
EXECUTE FUNCTION pgwar.handle_project_statements_delete();



------ Table pgwar.entity_full_text ----------------------------------------------------------------
---------------------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS pgwar.entity_full_text(
  pk_entity integer NOT NULL,
  fk_project integer NOT NULL,
  full_text text,
  tmsp_last_modification timestamp with time zone,
  PRIMARY KEY (pk_entity, fk_project)
);
-- add trigger for last_modification_tmsp
CREATE OR REPLACE TRIGGER last_modification_tmsp
    BEFORE INSERT OR UPDATE 
    ON pgwar.entity_full_text
    FOR EACH ROW
    EXECUTE FUNCTION commons.tmsp_last_modification();


/***
* Find outdated full texts in subjects of statements
***/
CREATE OR REPLACE FUNCTION pgwar.get_outdated_full_texts_in_subjects_of_stmt(max_limit int)
RETURNS TABLE(pk_entity integer, fk_project integer) AS $$
BEGIN
    RETURN QUERY
    -- find subjects of modified statements
    SELECT DISTINCT s.pk_entity, s.fk_project
    FROM (
        SELECT pstmt.fk_subject_info as pk_entity, pstmt.fk_project
        FROM pgwar.v_statements_combined pstmt
        LEFT JOIN pgwar.entity_full_text ftxt 
            ON pstmt.fk_subject_info = ftxt.pk_entity
            AND pstmt.fk_project = ftxt.fk_project
        WHERE ftxt.tmsp_last_modification IS NULL
        OR ftxt.tmsp_last_modification < pstmt.tmsp_last_modification
        ORDER BY pstmt.tmsp_last_modification DESC
        LIMIT max_limit
    ) AS s;
END;
$$ LANGUAGE plpgsql;
/***
* Find outdated full texts in objects of statements
***/
CREATE OR REPLACE FUNCTION pgwar.get_outdated_full_texts_in_objects_of_stmt(max_limit int)
RETURNS TABLE(pk_entity integer, fk_project integer) AS $$
BEGIN
    RETURN QUERY
    -- find objects of modified statements
    SELECT DISTINCT s.pk_entity, s.fk_project
    FROM (
        SELECT pstmt.fk_object_info as pk_entity, pstmt.fk_project
        FROM pgwar.v_statements_combined pstmt
        LEFT JOIN pgwar.entity_full_text ftxt 
            ON pstmt.fk_object_info = ftxt.pk_entity
            AND pstmt.fk_project = ftxt.fk_project
        WHERE pstmt.object_value IS NULL
        AND (ftxt.tmsp_last_modification IS NULL
        OR ftxt.tmsp_last_modification < pstmt.tmsp_last_modification)
        ORDER BY pstmt.tmsp_last_modification DESC
        LIMIT max_limit
    ) AS s;
END;
$$ LANGUAGE plpgsql;


/***
* Find outdated full texts in subjects of statements deleted
***/
CREATE OR REPLACE FUNCTION pgwar.get_outdated_full_texts_in_subjects_of_stmt_del(max_limit int)
RETURNS TABLE(pk_entity integer, fk_project integer) AS $$
BEGIN
    RETURN QUERY
    -- find subjects of deleted statements
    SELECT DISTINCT s.pk_entity, s.fk_project
    FROM (
        SELECT pstmt.fk_subject_info as pk_entity, pstmt.fk_project
        FROM pgwar.v_statements_deleted_combined pstmt
        LEFT JOIN pgwar.entity_full_text ftxt 
            ON pstmt.fk_subject_info = ftxt.pk_entity
            AND pstmt.fk_project = ftxt.fk_project
        WHERE ftxt.tmsp_last_modification IS NULL
        OR ftxt.tmsp_last_modification < pstmt.tmsp_deletion
        ORDER BY pstmt.tmsp_deletion DESC
        LIMIT max_limit
    ) AS s;
END;
$$ LANGUAGE plpgsql;


/***
* Find outdated full texts in objects of statements deleted
***/
CREATE OR REPLACE FUNCTION pgwar.get_outdated_full_texts_in_objects_of_stmt_del(max_limit int)
RETURNS TABLE(pk_entity integer, fk_project integer) AS $$
BEGIN
    RETURN QUERY
    -- find objects of deleted statements
    SELECT DISTINCT s.pk_entity, s.fk_project
    FROM (
        SELECT pstmt.fk_object_info as pk_entity, pstmt.fk_project
        FROM pgwar.v_statements_deleted_combined pstmt
        LEFT JOIN pgwar.entity_full_text ftxt 
            ON pstmt.fk_object_info = ftxt.pk_entity
            AND pstmt.fk_project = ftxt.fk_project
        WHERE  pstmt.object_value IS NULL
        AND (ftxt.tmsp_last_modification IS NULL
            OR ftxt.tmsp_last_modification < pstmt.tmsp_deletion)
        ORDER BY pstmt.tmsp_deletion DESC
        LIMIT max_limit
    ) AS s;
END;
$$ LANGUAGE plpgsql;


/***
* Find outdated full texts in subjects of statements with modified dfh-prop
***/
CREATE OR REPLACE FUNCTION pgwar.get_outdated_full_texts_in_subjects_of_stmt_by_dfh_prop(max_limit int)
RETURNS TABLE(pk_entity integer, fk_project integer) AS $$
BEGIN
    RETURN QUERY
    -- find subjects of statements with modified dfh-prop
    SELECT DISTINCT s.pk_entity, s.fk_project
    FROM (
        SELECT pstmt.fk_subject_info as pk_entity, pstmt.fk_project
        FROM 
                pgwar.v_statements_combined pstmt,
                data_for_history.api_property dfh_prop,
                pgwar.entity_full_text ftxt 
        WHERE
            pstmt.fk_subject_info = ftxt.pk_entity
        AND pstmt.fk_project = ftxt.fk_project
        AND dfh_prop.dfh_pk_property = pstmt.fk_property
        AND ftxt.tmsp_last_modification < dfh_prop.tmsp_last_dfh_update
        ORDER BY dfh_prop.tmsp_last_modification DESC
        LIMIT max_limit
    ) AS s;
END;
$$ LANGUAGE plpgsql;

/***
* Find outdated full texts in objects of statements with modified dfh-prop
***/
CREATE OR REPLACE FUNCTION pgwar.get_outdated_full_texts_in_objects_of_stmt_by_dfh_prop(max_limit int)
RETURNS TABLE(pk_entity integer, fk_project integer) AS $$
BEGIN
    RETURN QUERY
    -- find objects of statements with modified dfh-prop
    SELECT DISTINCT s.pk_entity, s.fk_project
    FROM (
        SELECT pstmt.fk_object_info as pk_entity, pstmt.fk_project
        FROM 
                pgwar.v_statements_combined pstmt,
                data_for_history.api_property dfh_prop,
                pgwar.entity_full_text ftxt 
        WHERE
            pstmt.fk_object_info = ftxt.pk_entity
        AND pstmt.object_value IS NULL
        AND pstmt.fk_project = ftxt.fk_project
        AND dfh_prop.dfh_pk_property = pstmt.fk_property
        AND ftxt.tmsp_last_modification < dfh_prop.tmsp_last_dfh_update
        ORDER BY dfh_prop.tmsp_last_modification DESC
        LIMIT max_limit
    ) AS s;
END;
$$ LANGUAGE plpgsql;

/***
* Function to get outdated full texts
***/
CREATE OR REPLACE FUNCTION pgwar.get_outdated_full_texts(max_limit int)
RETURNS TABLE(pk_entity integer, fk_project integer) AS $$
DECLARE
    current_set RECORD;
    result_set RECORD;
    pair_count int;
    updated_count int;
BEGIN
    pair_count := 0;

    -- Drop the temporary table if it already exists within transaction
    DROP TABLE IF EXISTS temp_unique_pairs;
    
    -- Initialize the temporary table to store unique pairs
    CREATE TEMP TABLE temp_unique_pairs (
        pk_entity integer,
        fk_project integer,
        CONSTRAINT unique_pairs_pk_project UNIQUE (pk_entity, fk_project)
    ) ON COMMIT DROP;

    -- Execute functions sequentially and add unique pairs
    FOR current_set IN SELECT unnest(array[
        'pgwar.get_outdated_full_texts_in_subjects_of_stmt',
        'pgwar.get_outdated_full_texts_in_objects_of_stmt',
        'pgwar.get_outdated_full_texts_in_subjects_of_stmt_del',
        'pgwar.get_outdated_full_texts_in_objects_of_stmt_del',
        'pgwar.get_outdated_full_texts_in_subjects_of_stmt_by_dfh_prop',
        'pgwar.get_outdated_full_texts_in_objects_of_stmt_by_dfh_prop'
    ]) AS function_name
    LOOP
        EXECUTE 'INSERT INTO temp_unique_pairs (pk_entity, fk_project) ' ||
                'SELECT pk_entity, fk_project ' ||
                'FROM ' || current_set.function_name || '(' || max_limit || ') ' ||
                'ON CONFLICT DO NOTHING';

        -- Update the pair count
        SELECT COUNT(*) INTO pair_count FROM temp_unique_pairs;
				
        -- Check if the limit has been reached
        IF pair_count >= max_limit THEN
            EXIT;
        END IF;
    END LOOP;

    RETURN QUERY
	SELECT t.pk_entity, t.fk_project
    FROM temp_unique_pairs t
	LIMIT max_limit;
    
END;
$$ LANGUAGE plpgsql;

/***
* Update the full texts
***/

CREATE OR REPLACE FUNCTION pgwar.update_full_texts(max_limit int)
RETURNS text AS $$
DECLARE
    updated_count int;
BEGIN

    -- Insert or update pgwar.entity_full_text from the outdated full texts
   	INSERT INTO pgwar.entity_full_text (pk_entity, fk_project, full_text)
	SELECT pk_entity, fk_project, pgwar.get_project_full_text(fk_project, pk_entity)
	FROM pgwar.get_outdated_full_texts(max_limit)
	ON CONFLICT (pk_entity, fk_project)
	DO UPDATE
    SET full_text = EXCLUDED.full_text
	WHERE entity_full_text.full_text IS DISTINCT FROM EXCLUDED.full_text;
	
    -- Get the number of rows updated
    GET DIAGNOSTICS updated_count = ROW_COUNT;

    -- Return the result message
    RETURN 'Number of rows updated: ' || updated_count;
END;
$$ LANGUAGE plpgsql;


-- Create the trigger function to update entity preview full text
CREATE OR REPLACE FUNCTION pgwar.update_entity_preview_full_text()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE pgwar.entity_preview
    SET full_text = NEW.full_text
    WHERE pk_entity = NEW.pk_entity
    AND fk_project = NEW.fk_project;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the trigger after_upsert_entity_full_text
CREATE TRIGGER after_upsert_entity_full_text
AFTER INSERT OR UPDATE ON pgwar.entity_full_text
FOR EACH ROW
EXECUTE FUNCTION pgwar.update_entity_preview_full_text();