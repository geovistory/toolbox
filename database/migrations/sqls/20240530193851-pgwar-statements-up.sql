------ get_value_object() -------------------------------------------------------------------
---------------------------------------------------------------------------------------------
-- Function to get value_object json from information.appellation
-----------------------------------------------------------------
CREATE
OR REPLACE FUNCTION pgwar.get_value_object(appe information.appellation) RETURNS JSONB AS $$
BEGIN RETURN jsonb_build_object(
        'string',
        jsonb_build_object(
            'pkEntity',
            appe.pk_entity,
            'fkClass',
            appe.fk_class,
            'string',
            appe.string
        )
    );

END;

$$ LANGUAGE plpgsql;

-- Function to get value_object json from information.place
-----------------------------------------------------------------
CREATE
OR REPLACE FUNCTION pgwar.get_value_object(place information.place) RETURNS JSONB AS $$
BEGIN RETURN jsonb_build_object(
        'geometry',
        jsonb_build_object(
            'pkEntity',
            place.pk_entity,
            'fkClass',
            place.fk_class,
            'geoJSON',
            ST_AsGeoJSON(place.geo_point::geometry)::jsonb
        )
    );

END;

$$ LANGUAGE plpgsql;

-- Function to get value_object json from information.language
-----------------------------------------------------------------
CREATE
OR REPLACE FUNCTION pgwar.get_value_object(language information.language) RETURNS JSONB AS $$
BEGIN RETURN jsonb_build_object(
        'language',
        jsonb_build_object(
            'pkEntity',
            language .pk_entity,
            'fkClass',
            language .fk_class,
            'label',
            language .notes,
            'iso6391',
            trim(language .iso6391),
            'iso6392b',
            trim(language .iso6392b),
            'iso6392t',
            trim(language .iso6392t)
        )
    );

END;

$$ LANGUAGE plpgsql;

-- Function to get value_object json from information.time_primitive
--------------------------------------------------------------------
CREATE
OR REPLACE FUNCTION pgwar.get_value_object(time_primitive information.time_primitive) RETURNS JSONB AS $$
BEGIN RETURN jsonb_build_object(
        'timePrimitive',
        commons.time_primitive__pretty_json(time_primitive)
    );

END;

$$ LANGUAGE plpgsql;

-- Function to get value_object json from information.lang_string
-----------------------------------------------------------------
CREATE
OR REPLACE FUNCTION pgwar.get_value_object(lang_string information.lang_string) RETURNS JSONB AS $$
BEGIN RETURN jsonb_build_object(
        'langString',
        jsonb_build_object(
            'pkEntity',
            lang_string.pk_entity,
            'fkClass',
            lang_string.fk_class,
            'string',
            lang_string.string,
            'fkLanguage',
            lang_string.fk_language
        )
    );

END;

$$ LANGUAGE plpgsql;

-- Function to get value_object json from tables.cell
-----------------------------------------------------------------
CREATE
OR REPLACE FUNCTION pgwar.get_value_object(cell tables.cell) RETURNS JSONB AS $$
BEGIN RETURN jsonb_build_object(
        'cell',
        jsonb_build_object(
            'pkCell',
            cell.pk_cell,
            'fkClass',
            cell.fk_class,
            'numericValue',
            cell.numeric_value,
            'stringValue',
            cell.string_value,
            'fkRow',
            cell.fk_row,
            'fkColumn',
            cell.fk_column
        )
    );

END;

$$ LANGUAGE plpgsql;

-- Function to get value_object json from information.dimension
-----------------------------------------------------------------
CREATE
OR REPLACE FUNCTION pgwar.get_value_object(dimension information.dimension) RETURNS JSONB AS $$
BEGIN RETURN jsonb_build_object(
        'dimension',
        jsonb_build_object(
            'pkEntity',
            dimension.pk_entity,
            'fkClass',
            dimension.fk_class,
            'numericValue',
            dimension.numeric_value,
            'fkMeasurementUnit',
            dimension.fk_measurement_unit
        )
    );

END;

$$ LANGUAGE plpgsql;

------ get_value_label() --------------------------------------------------------------------
---------------------------------------------------------------------------------------------
-- Function to get value_label from information.appellation
-----------------------------------------------------------------
CREATE
OR REPLACE FUNCTION pgwar.get_value_label(appe information.appellation) RETURNS text AS $$
BEGIN RETURN appe.string;

END;

$$ LANGUAGE plpgsql;

-- Function to get value_label from information.place
-----------------------------------------------------------------
CREATE
OR REPLACE FUNCTION pgwar.get_value_label(place information.place) RETURNS text AS $$
BEGIN RETURN format(
        'WGS84: %s°, %s°',
        ST_X(place.geo_point::geometry),
        ST_Y(place.geo_point::geometry)
    );

END;

$$ LANGUAGE plpgsql;

-- Function to get value_label from information.language
-----------------------------------------------------------------
CREATE
OR REPLACE FUNCTION pgwar.get_value_label(language information.language) RETURNS text AS $$
BEGIN RETURN coalesce(
        language .notes,
        trim(language .pk_language)
    );

END;

$$ LANGUAGE plpgsql;

-- Function to get value_label from information.time_primitive
--------------------------------------------------------------------
CREATE
OR REPLACE FUNCTION pgwar.get_value_label(time_primitive information.time_primitive) RETURNS text AS $$
DECLARE date_string varchar;

BEGIN IF time_primitive.calendar = 'gregorian' THEN -- generate gregorian calendar string
SELECT to_char(
        (('J' || time_primitive.julian_day)::timestamp),
        'YYYY-MM-DD'
    ) INTO date_string;

ELSE -- generate julian calendar string
SELECT concat(
        to_char(t.year, 'fm0000'),
        '-',
        to_char(t.month, 'fm00'),
        '-',
        to_char(t.day, 'fm00')
    ) INTO date_string
FROM commons.julian_cal__year_month_day(time_primitive.julian_day) t;

END IF;

-- add duration
RETURN concat(
    date_string,
    ' (',
    time_primitive.duration,
    ')'
);

END;

$$ LANGUAGE plpgsql;

-- Function to get value_label from information.lang_string
-----------------------------------------------------------------
CREATE
OR REPLACE FUNCTION pgwar.get_value_label(lang_string information.lang_string) RETURNS text AS $$
BEGIN RETURN lang_string.string;

END;

$$ LANGUAGE plpgsql;

-- Function to get value_label from tables.cell
-----------------------------------------------------------------
CREATE
OR REPLACE FUNCTION pgwar.get_value_label(cell tables.cell) RETURNS text AS $$
BEGIN RETURN coalesce(cell.string_value, cell.numeric_value::text);

END;

$$ LANGUAGE plpgsql;

-- Function to get value_label from information.dimension
-----------------------------------------------------------------
CREATE
OR REPLACE FUNCTION pgwar.get_value_label(dimension information.dimension) RETURNS text AS $$
BEGIN RETURN dimension.numeric_value;

END;

$$ LANGUAGE plpgsql;

-- Fix commons.julian_second__to_iso_8601() to prefix BC dates with '-'
-----------------------------------------------------------------------
CREATE OR REPLACE FUNCTION commons.julian_second__to_iso_8601(
	julian_second bigint)
    RETURNS text
    LANGUAGE 'sql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
  SELECT
    CASE
        WHEN (julian_second / 86400) < 1721426 THEN '-' || to_char((('J' ||(julian_second / 86400)::text)::timestamp +(julian_second % 86400) * interval '1 second'), 'YYYY-MM-DD"T"HH24:MI:SS"Z"')
        ELSE to_char((('J' ||(julian_second / 86400)::text)::timestamp +(julian_second % 86400) * interval '1 second'), 'YYYY-MM-DD"T"HH24:MI:SS"Z"')
    END
$BODY$;

-- Create commons.julian_day_to_gregorian_pretty to convert julian day into gregorian pretty string
---------------------------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION commons.julian_day_to_gregorian_pretty(julian_day INTEGER)
RETURNS TEXT AS $$
DECLARE
    formatted_date TEXT;
BEGIN
    SELECT CASE
               WHEN julian_day < 1721426 THEN '-' || TO_CHAR(('J' || julian_day)::timestamp, 'YYYY-MM-DD')
               ELSE TO_CHAR(('J' || julian_day)::timestamp, 'YYYY-MM-DD')
           END
    INTO formatted_date;
    RETURN formatted_date;
END;
$$ LANGUAGE plpgsql;

-- Fix commons.time_primitive__pretty_json to prefix gregorian strings with '-' for BC dates 
--------------------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION commons.time_primitive__pretty_json(
	time_primitive information.time_primitive)
    RETURNS jsonb
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
DECLARE
  from_day int;
  from_second bigint;
  from_julian_cal varchar;
  from_gregorian_cal varchar;
  from_gregorian_cal_iso8601 varchar;
  to_day int;
  to_second bigint;
  to_julian_cal varchar;
  to_gregorian_cal varchar;
  to_gregorian_cal_iso8601 varchar;
  label varchar;
BEGIN
  from_day = time_primitive.julian_day;
  SELECT
    commons.time_primitive__get_first_second(from_day) INTO from_second;
  SELECT
    concat(to_char(t.year, 'fm0000'), '-', to_char(t.month, 'fm00'), '-', to_char(t.day, 'fm00')) INTO from_julian_cal
  FROM
    commons.julian_cal__year_month_day(from_day) t;
  SELECT
    commons.julian_day_to_gregorian_pretty(from_day) INTO from_gregorian_cal;
  SELECT
    commons.julian_second__to_iso_8601(from_second) INTO from_gregorian_cal_iso8601;
  SELECT
    commons.time_primitive__get_to_day(from_day, time_primitive.duration, time_primitive.calendar) INTO to_day;
  SELECT
    commons.time_primitive__get_first_second(to_day) INTO to_second;
  SELECT
    concat(to_char(t.year, 'fm0000'), '-', to_char(t.month, 'fm00'), '-', to_char(t.day, 'fm00')) INTO to_julian_cal
  FROM
    commons.julian_cal__year_month_day(to_day) t;
  SELECT
   commons.julian_day_to_gregorian_pretty(to_day) INTO to_gregorian_cal;
  SELECT
    commons.julian_second__to_iso_8601(to_second) INTO to_gregorian_cal_iso8601;
  SELECT
    CASE WHEN time_primitive.calendar = 'gregorian' THEN
      concat(from_gregorian_cal, ' (', time_primitive.duration, ')')
    ELSE
      concat(from_julian_cal, ' (', time_primitive.duration, ')')
    END INTO label;
  RETURN jsonb_build_object('pkEntity', time_primitive.pk_entity, 'fkClass', time_primitive.fk_class, 'julianDay', time_primitive.julian_day, 'duration', time_primitive.duration, 'calendar', time_primitive.calendar::text, 'label', label, 'from', jsonb_build_object('julianDay', from_day, 'julianSecond', from_second, 'calGregorian', from_gregorian_cal, 'calGregorianIso8601', from_gregorian_cal_iso8601, 'calJulian', from_julian_cal), 'to', jsonb_build_object('julianDay', to_day, 'julianSecond', to_second, 'calGregorian', to_gregorian_cal, 'calGregorianIso8601', to_gregorian_cal_iso8601, 'calJulian', to_julian_cal));
END;
$BODY$;
------ Table pgwar.statement ----------------------------------------------------------------
---------------------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS pgwar.statement(
    pk_entity int NOT NULL PRIMARY KEY,
    fk_subject_info int NOT NULL,
    fk_property int NOT NULL,
    fk_object_info int,
    fk_object_tables_cell bigint,
    object_label varchar(100),
    object_value jsonb
);
------ Table pgwar.statement ----------------------------------------------------------------
---------------------------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION pgwar.upsert_statement(stmt pgwar.statement)
    RETURNS VOID
    AS $$
BEGIN
    INSERT INTO pgwar.statement(pk_entity,fk_subject_info,fk_property,fk_object_info,fk_object_tables_cell,object_label,object_value)
        VALUES(
          stmt.pk_entity,
          stmt.fk_subject_info,
          stmt.fk_property,
          stmt.fk_object_info,
          stmt.fk_object_tables_cell,
          stmt.object_label,
          stmt.object_value
        )
    ON CONFLICT(pk_entity)
        DO UPDATE SET
            -- ... or update the fk_class
            fk_subject_info = EXCLUDED.fk_subject_info,
            fk_property = EXCLUDED.fk_property,
            fk_object_info = EXCLUDED.fk_object_info,
            fk_object_tables_cell = EXCLUDED.fk_object_tables_cell,
            object_label = EXCLUDED.object_label,
            object_value = EXCLUDED.object_value
        WHERE
            -- ... where it is distinct from previous value
            statement.fk_subject_info IS DISTINCT FROM EXCLUDED.fk_subject_info OR
            statement.fk_property IS DISTINCT FROM EXCLUDED.fk_property OR
            statement.fk_object_info IS DISTINCT FROM EXCLUDED.fk_object_info OR
            statement.fk_object_tables_cell IS DISTINCT FROM EXCLUDED.fk_object_tables_cell OR
            statement.object_label IS DISTINCT FROM EXCLUDED.object_label OR
            statement.object_value IS DISTINCT FROM EXCLUDED.object_value;
END;
$$
LANGUAGE plpgsql;

------ Trigger after upsert statement table -------------------------------------------------
---------------------------------------------------------------------------------------------
CREATE FUNCTION pgwar.after_upsert_statement()
    RETURNS TRIGGER
    LANGUAGE plpgsql
    AS $$
DECLARE
    entity information.resource;
    appellation information.appellation;
    dimension information.dimension;
    lang_string information.lang_string;
    language information.language;
    place information.place;
    time_primitive information.time_primitive;
    cell tables.cell;
BEGIN

    -- get the referenced appellation...
    SELECT * INTO appellation FROM information.appellation WHERE pk_entity = NEW.fk_object_info;
    -- ...if not null...
    IF appellation.pk_entity IS NOT NULL THEN
      -- create a pgwar.statement
      PERFORM pgwar.upsert_statement((NEW.pk_entity,NEW.fk_subject_info,NEW.fk_property,NEW.fk_object_info,NEW.fk_object_tables_cell,
        pgwar.get_value_label(appellation),
        pgwar.get_value_object(appellation)
      )::pgwar.statement);
      -- return!
      RETURN NEW;
    END IF;

    -- get the referenced dimension...
    SELECT * INTO dimension FROM information.dimension WHERE pk_entity = NEW.fk_object_info;
    -- ...if not null...
    IF dimension.pk_entity IS NOT NULL THEN
      -- create a pgwar.statement
      PERFORM pgwar.upsert_statement((NEW.pk_entity,NEW.fk_subject_info,NEW.fk_property,NEW.fk_object_info,NEW.fk_object_tables_cell,
        pgwar.get_value_label(dimension),
        pgwar.get_value_object(dimension)
      )::pgwar.statement);
      -- return!
      RETURN NEW;
    END IF;

    -- get the referenced lang_string...
    SELECT * INTO lang_string FROM information.lang_string WHERE pk_entity = NEW.fk_object_info;
    -- ...if not null...
    IF lang_string.pk_entity IS NOT NULL THEN
      -- create a pgwar.statement
      PERFORM pgwar.upsert_statement((NEW.pk_entity,NEW.fk_subject_info,NEW.fk_property,NEW.fk_object_info,NEW.fk_object_tables_cell,
        pgwar.get_value_label(lang_string),
        pgwar.get_value_object(lang_string)
      )::pgwar.statement);
      -- return!
      RETURN NEW;
    END IF;

    -- get the referenced dimension...
    SELECT * INTO language FROM information.language WHERE pk_entity = NEW.fk_object_info;
    -- ...if not null...
    IF language.pk_entity IS NOT NULL THEN
      -- create a pgwar.statement
      PERFORM pgwar.upsert_statement((NEW.pk_entity,NEW.fk_subject_info,NEW.fk_property,NEW.fk_object_info,NEW.fk_object_tables_cell,
        pgwar.get_value_label(language),
        pgwar.get_value_object(language)
      )::pgwar.statement);
      -- return!
      RETURN NEW;
    END IF;

    -- get the referenced place...
    SELECT * INTO place FROM information.place WHERE pk_entity = NEW.fk_object_info;
    -- ...if not null...
    IF place.pk_entity IS NOT NULL THEN
      -- create a pgwar.statement
      PERFORM pgwar.upsert_statement((NEW.pk_entity,NEW.fk_subject_info,NEW.fk_property,NEW.fk_object_info,NEW.fk_object_tables_cell,
        pgwar.get_value_label(place),
        pgwar.get_value_object(place)
      )::pgwar.statement);
      -- return!
      RETURN NEW;
    END IF;

    -- get the referenced time_primitive...
    SELECT * INTO time_primitive FROM information.time_primitive WHERE pk_entity = NEW.fk_object_info;
    -- ...if not null...
    IF time_primitive.pk_entity IS NOT NULL THEN
      -- create a pgwar.statement
      PERFORM pgwar.upsert_statement((NEW.pk_entity,NEW.fk_subject_info,NEW.fk_property,NEW.fk_object_info,NEW.fk_object_tables_cell,
        pgwar.get_value_label(time_primitive),
        pgwar.get_value_object(time_primitive)
      )::pgwar.statement);
      -- return!
      RETURN NEW;
    END IF;

    -- get the referenced cell...
    SELECT * INTO cell FROM tables.cell WHERE pk_cell = NEW.fk_object_tables_cell;
    -- ...if not null...
    IF cell.pk_cell IS NOT NULL THEN
      -- create a pgwar.statement
      PERFORM pgwar.upsert_statement((NEW.pk_entity,NEW.fk_subject_info,NEW.fk_property,NEW.fk_object_info,NEW.fk_object_tables_cell,
        pgwar.get_value_label(cell),
        pgwar.get_value_object(cell)
      )::pgwar.statement);
      -- return!
      RETURN NEW;
    END IF;

    

    -- get the referenced entity...
    SELECT * INTO entity FROM information.resource WHERE pk_entity = NEW.fk_object_info;
    -- ...if not null...
    IF entity.pk_entity IS NOT NULL THEN
      -- create a pgwar.statement
      PERFORM pgwar.upsert_statement((NEW.pk_entity,NEW.fk_subject_info,NEW.fk_property,NEW.fk_object_info,NEW.fk_object_tables_cell,NULL,NULL)::pgwar.statement);
      -- return!
      RETURN NEW;
    END IF;

    -- fallback
    RETURN NEW;
END;
$$;

CREATE TRIGGER after_upsert_statement
    AFTER INSERT OR UPDATE ON information.statement
    FOR EACH ROW
    EXECUTE FUNCTION pgwar.after_upsert_statement();

    ------ Trigger after delete statement table -------------------------------------------------
---------------------------------------------------------------------------------------------
CREATE FUNCTION pgwar.after_delete_statement()
    RETURNS TRIGGER
    LANGUAGE plpgsql
    AS $$
BEGIN
    DELETE FROM pgwar.statement
    WHERE pk_entity = OLD.pk_entity;
    
    RETURN OLD;
END;
$$;

CREATE TRIGGER after_delete_statement
    AFTER DELETE ON information.statement
    FOR EACH ROW
    EXECUTE FUNCTION pgwar.after_delete_statement();



------ Trigger after delete on literal table -------------------------------------------------
---------------------------------------------------------------------------------------------
CREATE FUNCTION pgwar.after_delete_object_info()
    RETURNS TRIGGER
    LANGUAGE plpgsql
    AS $$
DECLARE
BEGIN
    DELETE FROM pgwar.statement 
    WHERE fk_object_info = OLD.pk_entity;
    RETURN OLD;
END;
$$;
CREATE FUNCTION pgwar.after_delete_object_tables_cell()
    RETURNS TRIGGER
    LANGUAGE plpgsql
    AS $$
DECLARE
BEGIN
    DELETE FROM pgwar.statement 
    WHERE fk_object_tables_cell = OLD.pk_cell;
    RETURN OLD;
END;
$$;

CREATE TRIGGER after_delete_appellation
    AFTER DELETE ON information.appellation
    FOR EACH ROW
    EXECUTE FUNCTION pgwar.after_delete_object_info();

CREATE TRIGGER after_delete_dimension
    AFTER DELETE ON information.dimension
    FOR EACH ROW
    EXECUTE FUNCTION pgwar.after_delete_object_info();

CREATE TRIGGER after_delete_lang_string
    AFTER DELETE ON information.lang_string
    FOR EACH ROW
    EXECUTE FUNCTION pgwar.after_delete_object_info();

CREATE TRIGGER after_delete_language
    AFTER DELETE ON information.language
    FOR EACH ROW
    EXECUTE FUNCTION pgwar.after_delete_object_info();

CREATE TRIGGER after_delete_place
    AFTER DELETE ON information.place
    FOR EACH ROW
    EXECUTE FUNCTION pgwar.after_delete_object_info();

CREATE TRIGGER after_delete_time_primitive
    AFTER DELETE ON information.time_primitive
    FOR EACH ROW
    EXECUTE FUNCTION pgwar.after_delete_object_info();

    CREATE TRIGGER after_delete_cell
    AFTER DELETE ON tables.cell
    FOR EACH ROW
    EXECUTE FUNCTION pgwar.after_delete_object_tables_cell();

-- TODO add trigger-fn for tables.cell 


------ Trigger after upsert literal table -------------------------------------------------
---------------------------------------------------------------------------------------------
CREATE FUNCTION pgwar.after_upsert_object_info()
    RETURNS TRIGGER
    LANGUAGE plpgsql
    AS $$
DECLARE
BEGIN
    PERFORM pgwar.upsert_statement((stmt.pk_entity,stmt.fk_subject_info,stmt.fk_property,stmt.fk_object_info,stmt.fk_object_tables_cell,
        pgwar.get_value_label(NEW),
        pgwar.get_value_object(NEW)
      )::pgwar.statement)
    FROM information.statement stmt
    WHERE fk_object_info = NEW.pk_entity;
    RETURN NEW;
END;
$$;

CREATE FUNCTION pgwar.after_upsert_object_tables_cell()
    RETURNS TRIGGER
    LANGUAGE plpgsql
    AS $$
DECLARE
BEGIN
    PERFORM pgwar.upsert_statement((stmt.pk_entity,stmt.fk_subject_info,stmt.fk_property,stmt.fk_object_info,stmt.fk_object_tables_cell,
        pgwar.get_value_label(NEW),
        pgwar.get_value_object(NEW)
      )::pgwar.statement)
    FROM information.statement stmt
    WHERE fk_object_tables_cell = NEW.pk_cell;
    RETURN NEW;
END;
$$;

CREATE TRIGGER after_upsert_appellation
    AFTER INSERT OR UPDATE ON information.appellation
    FOR EACH ROW
    EXECUTE FUNCTION pgwar.after_upsert_object_info();

CREATE TRIGGER after_upsert_dimension
    AFTER INSERT OR UPDATE ON information.dimension
    FOR EACH ROW
    EXECUTE FUNCTION pgwar.after_upsert_object_info();

CREATE TRIGGER after_upsert_lang_string
    AFTER INSERT OR UPDATE ON information.lang_string
    FOR EACH ROW
    EXECUTE FUNCTION pgwar.after_upsert_object_info();

CREATE TRIGGER after_upsert_language
    AFTER INSERT OR UPDATE ON information.language
    FOR EACH ROW
    EXECUTE FUNCTION pgwar.after_upsert_object_info();

CREATE TRIGGER after_upsert_place
    AFTER INSERT OR UPDATE ON information.place
    FOR EACH ROW
    EXECUTE FUNCTION pgwar.after_upsert_object_info();

CREATE TRIGGER after_upsert_time_primitive
    AFTER INSERT OR UPDATE ON information.time_primitive
    FOR EACH ROW
    EXECUTE FUNCTION pgwar.after_upsert_object_info();

CREATE TRIGGER after_upsert_cell
    AFTER INSERT OR UPDATE ON tables.cell
    FOR EACH ROW
    EXECUTE FUNCTION pgwar.after_upsert_object_tables_cell();

