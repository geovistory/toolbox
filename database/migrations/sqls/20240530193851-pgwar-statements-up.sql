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
DECLARE label varchar;

BEGIN IF time_primitive.calendar = 'gregorian' THEN RETURN concat(
        to_char(
            (('J' || time_primitive.julian_day)::timestamp),
            'YYYY-MM-DD'
        ),
        ' (',
        time_primitive.duration,
        ')'
    );

ELSE
SELECT concat(
        to_char(t.year, 'fm0000'),
        '-',
        to_char(t.month, 'fm00'),
        '-',
        to_char(t.day, 'fm00')
    ) INTO label
FROM commons.julian_cal__year_month_day(from_day) t;

RETURN label;

END IF;

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