-- create dblink extension for accessing postgres cron
CREATE EXTENSION dblink;

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

  