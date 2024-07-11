-- add functions to convert records into json

CREATE OR REPLACE FUNCTION public.gv_to_jsonb(
	_row data.digital)
    RETURNS jsonb
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
    BEGIN
      RETURN  jsonb_build_object(
        'pk_entity', _row.pk_entity, 'entity_version', _row.entity_version, 'pk_text', _row.pk_text, 'quill_doc', _row.quill_doc, 'string', _row.string, 'fk_system_type', _row.fk_system_type, 'fk_namespace', _row.fk_namespace
      );
    END;
$BODY$;

CREATE OR REPLACE FUNCTION public.gv_to_jsonb(
	_row information.appellation)
    RETURNS jsonb
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
    BEGIN
      RETURN  jsonb_build_object(
        'pk_entity', _row.pk_entity, 'quill_doc', _row.quill_doc, 'fk_class', _row.fk_class, 'string', _row.string
      );
    END;
$BODY$;


CREATE OR REPLACE FUNCTION public.gv_to_jsonb(
	_row information.language)
    RETURNS jsonb
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
    BEGIN
      RETURN  jsonb_build_object(
        'pk_entity', _row.pk_entity, 'fk_class', _row.fk_class, 'pk_language', _row.pk_language, 'lang_type', _row.lang_type, 'scope', _row.scope, 'iso6392b', _row.iso6392b, 'iso6392t', _row.iso6392t, 'iso6391', _row.iso6391, 'notes', _row.notes
      );
    END;
$BODY$;

CREATE OR REPLACE FUNCTION public.gv_to_jsonb(
	_row information.resource)
    RETURNS jsonb
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
    BEGIN
      RETURN  jsonb_build_object(
        'pk_entity', _row.pk_entity, 'fk_class', _row.fk_class, 'community_visibility', _row.community_visibility
      );
    END;
$BODY$;

CREATE OR REPLACE FUNCTION public.gv_to_jsonb(
	_row information.v_dimension)
    RETURNS jsonb
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
    BEGIN
      RETURN  jsonb_build_object(
        'pk_entity', _row.pk_entity, 'fk_class', _row.fk_class, 'fk_measurement_unit', _row.fk_measurement_unit, 'numeric_value', _row.numeric_value
      );
    END;
$BODY$;


CREATE OR REPLACE FUNCTION public.gv_to_jsonb(
	_row information.v_lang_string)
    RETURNS jsonb
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
    BEGIN
      RETURN  jsonb_build_object(
        'pk_entity', _row.pk_entity, 'fk_class', _row.fk_class, 'quill_doc', _row.quill_doc, 'string', _row.string, 'fk_language', _row.fk_language
      );
    END;
$BODY$;


CREATE OR REPLACE FUNCTION public.gv_to_jsonb(
	_row information.v_place)
    RETURNS jsonb
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
    BEGIN
      RETURN  jsonb_build_object(
        'pk_entity', _row.pk_entity, 'long', _row.long, 'lat', _row.lat, 'fk_class', _row.fk_class
      );
    END;
$BODY$;


CREATE OR REPLACE FUNCTION public.gv_to_jsonb(
	_row information.v_statement)
    RETURNS jsonb
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
    BEGIN
      RETURN  jsonb_build_object(
        'pk_entity', _row.pk_entity, 'fk_subject_info', _row.fk_subject_info, 'fk_subject_data', _row.fk_subject_data, 'fk_subject_tables_cell', _row.fk_subject_tables_cell, 'fk_subject_tables_row', _row.fk_subject_tables_row, 'fk_property', _row.fk_property, 'fk_property_of_property', _row.fk_property_of_property, 'fk_object_info', _row.fk_object_info, 'fk_object_data', _row.fk_object_data, 'fk_object_tables_cell', _row.fk_object_tables_cell, 'fk_object_tables_row', _row.fk_object_tables_row, 'is_in_project_count', _row.is_in_project_count, 'is_standard_in_project_count', _row.is_standard_in_project_count
      );
    END;
$BODY$;


CREATE OR REPLACE FUNCTION public.gv_to_jsonb(
	_row information.v_time_primitive)
    RETURNS jsonb
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
    BEGIN
      RETURN  jsonb_build_object(
        'pk_entity', _row.pk_entity, 'fk_class', _row.fk_class, 'julian_day', _row.julian_day, 'duration', _row.duration, 'calendar', _row.calendar
      );
    END;
$BODY$;


CREATE OR REPLACE FUNCTION public.gv_to_jsonb(
	_row pgwar.entity_preview)
    RETURNS jsonb
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
    BEGIN
      RETURN  jsonb_build_object(
        'pk_entity', _row.pk_entity, 'fk_project', _row.fk_project, 'fk_class', _row.fk_class, 'class_label', _row.class_label, 'entity_label', _row.entity_label, 'entity_type', _row.entity_type, 'type_label', _row.type_label, 'fk_type', _row.fk_type, 'time_span', _row.time_span, 'first_second', _row.first_second, 'last_second', _row.last_second, 'tmsp_last_modification', _row.tmsp_last_modification
      );
    END;
$BODY$;


CREATE OR REPLACE FUNCTION public.gv_to_jsonb(
	_row projects.v_info_proj_rel)
    RETURNS jsonb
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
    BEGIN
      RETURN  jsonb_build_object(
        'pk_entity', _row.pk_entity, 'fk_project', _row.fk_project, 'fk_entity', _row.fk_entity, 'fk_entity_version', _row.fk_entity_version, 'fk_entity_version_concat', _row.fk_entity_version_concat, 'is_in_project', _row.is_in_project, 'is_standard_in_project', _row.is_standard_in_project, 'ord_num_of_domain', _row.ord_num_of_domain, 'ord_num_of_range', _row.ord_num_of_range, 'fk_creator', _row.fk_creator, 'fk_last_modifier', _row.fk_last_modifier, 'project_visibility', _row.project_visibility
      );
    END;
$BODY$;

CREATE OR REPLACE FUNCTION public.gv_to_jsonb(
	_row tables."row")
    RETURNS jsonb
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
    BEGIN
      RETURN  jsonb_build_object(
        'pk_row', _row.pk_row, 'fk_digital', _row.fk_digital, 'position', _row.position
      );
    END;
$BODY$;

CREATE OR REPLACE FUNCTION public.gv_to_jsonb(
	_row tables.cell)
    RETURNS jsonb
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
    BEGIN
      RETURN  jsonb_build_object(
        'pk_cell', _row.pk_cell, 'fk_class', _row.fk_class, 'fk_column', _row.fk_column, 'fk_row', _row.fk_row, 'fk_digital', _row.fk_digital, 'string_value', _row.string_value, 'numeric_value', _row.numeric_value
      );
    END;
$BODY$;

-- create function to select statement target
DO $$ BEGIN
    CREATE TYPE gv_statement_target AS (
    target_obj jsonb,
    target_class int,
    target_label text
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;


CREATE OR REPLACE FUNCTION commons.get_statement_target (_project_id int, _info_id int, _data_id int, _tables_cell_id bigint, _tables_row_id bigint)
    RETURNS SETOF gv_statement_target
    LANGUAGE plpgsql
    AS $func$
BEGIN
    ----------------------------------------------------------------------
    --JOIN STATEMENT'S TARGET LANGUAGE
    ----------------------------------------------------------------------
    RETURN QUERY
    SELECT
    jsonb_build_object('language', gv_to_jsonb (t3)) target_obj,
    fk_class target_class,
    notes target_label
    FROM
    information.language t3
    WHERE
    t3.pk_entity = _info_id;
    IF FOUND THEN
    RETURN;
    END IF;
    ----------------------------------------------------------------------
    --JOIN STATEMENT'S TARGET APPPELLATION
    ----------------------------------------------------------------------
    RETURN QUERY
    SELECT
    jsonb_build_object('appellation', gv_to_jsonb (t3)) target_obj,
    fk_class target_class,
    string target_label
    FROM
    information.appellation t3
    WHERE
    t3.pk_entity = _info_id;
    IF FOUND THEN
    RETURN;
    END IF;
    ----------------------------------------------------------------------
    --JOIN STATEMENT'S TARGET LANG_STRING
    ----------------------------------------------------------------------
    RETURN QUERY
    SELECT
    jsonb_build_object('langString', jsonb_build_object('langString', gv_to_jsonb (t3), 'language', language.obj)) target_obj,
    fk_class target_class,
    concat(t3.string, ' (', language.iso6391, ')' ) target_label
    FROM
    information.v_lang_string t3
    LEFT JOIN LATERAL (
    -- LANGUAGE OF LANG_STRING
    SELECT
        gv_to_jsonb (t4) obj,
        iso6391
    FROM
        information.language t4
    WHERE
        t4.pk_entity = t3.fk_language)
    LANGUAGE ON
    TRUE
    WHERE
    t3.pk_entity = _info_id;
    IF FOUND THEN
    RETURN;
    END IF;
    ----------------------------------------------------------------------
    --JOIN STATEMENT'S TARGET PLACE
    ----------------------------------------------------------------------
    RETURN QUERY
    SELECT
    jsonb_build_object('place', gv_to_jsonb (t3)) target_obj,
    fk_class target_class,
    concat('WGS84: ', lat, '°, ', long, '°') target_label
    FROM
    information.v_place t3
    WHERE
    t3.pk_entity = _info_id;
    IF FOUND THEN
    RETURN;
    END IF;
    ----------------------------------------------------------------------
    --JOIN STATEMENT'S TARGET TIME PRIMITIVE
    ----------------------------------------------------------------------
    RETURN QUERY
    SELECT
    jsonb_build_object('timePrimitive', jsonb_build_object('infTimePrimitive', gv_to_jsonb (t3), 'timePrimitive', json_build_object('duration', t3.duration, 'julianDay', t3.julian_day, 'calendar', t3.calendar))) target_obj,
    fk_class target_class,
    'todo' target_label
    FROM
    information.v_time_primitive t3
    WHERE
    t3.pk_entity = _info_id;
    IF FOUND THEN
    RETURN;
    END IF;
    ----------------------------------------------------------------------
    --JOIN STATEMENT'S TARGET DIMENSION
    ----------------------------------------------------------------------
    RETURN QUERY
    SELECT
    jsonb_build_object('dimension',jsonb_build_object('dimension', gv_to_jsonb (t3), 'unitPreview', entity_preview.obj)) target_obj,
    fk_class target_class,
    concat_ws(' ', t3.numeric_value, entity_preview.entity_label) target_label
    FROM
    information.v_dimension t3
    LEFT JOIN LATERAL ( SELECT DISTINCT ON (pk_entity)
        gv_to_jsonb (e.t4) obj,
        e.entity_label
    FROM (
        --repo version
        SELECT
        t4, entity_label
        FROM
        pgwar.entity_preview t4
        WHERE
        t4.pk_entity = t3.fk_measurement_unit
        AND fk_project = 0
        UNION
        --project version
        SELECT
        t4, entity_label
        FROM
        pgwar.entity_preview t4
        WHERE
        t4.pk_entity = t3.fk_measurement_unit
        AND fk_project = _project_id) e) entity_preview ON TRUE
    WHERE
    t3.pk_entity = _info_id;
    IF FOUND THEN
        RETURN;
    END IF;
    ----------------------------------------------------------------------
    --JOIN STATEMENT'S TARGET ENTITY
    ----------------------------------------------------------------------
    RETURN QUERY
    SELECT
    jsonb_build_object('entity', jsonb_build_object('resource', gv_to_jsonb (t3), 'entityPreview', entity_preview.obj)) target_obj,
    fk_class target_class,
    entity_preview.entity_label target_label
    FROM
    information.resource t3
    LEFT JOIN LATERAL ( SELECT DISTINCT ON (pk_entity)
        gv_to_jsonb (e.t4) obj,
        e.entity_label
    FROM (
        --repo version
        SELECT
        t4, entity_label
        FROM
        pgwar.entity_preview t4
        WHERE
        t4.pk_entity = _info_id
        AND fk_project = 0
        UNION
        --project version
        SELECT
        t4, entity_label
        FROM
        pgwar.entity_preview t4
        WHERE
        t4.pk_entity = _info_id
        AND fk_project = _project_id) e) entity_preview ON TRUE
    WHERE
    t3.pk_entity = _info_id;
    IF FOUND THEN
        RETURN;
    END IF;
    ----------------------------------------------------------------------
    --JOIN STATEMENT'S TARGET DIGITAL
    ----------------------------------------------------------------------
    RETURN QUERY
    SELECT
    jsonb_build_object('digital', gv_to_jsonb (t3)) target_obj,
    0 target_class,
    '' target_label
    FROM
    data.digital t3
    WHERE
    t3.pk_entity = _data_id;
    IF FOUND THEN
    RETURN;
    END IF;
    ----------------------------------------------------------------------
    --JOIN STATEMENT'S TARGET CELL
    ----------------------------------------------------------------------
    RETURN QUERY
    SELECT
    jsonb_build_object('cell', gv_to_jsonb (t3)) target_obj,
    fk_class target_class,
    coalesce(string_value, numeric_value::text) target_label
    FROM
    tables.cell t3
    WHERE
    t3.pk_cell = _tables_cell_id;
    IF FOUND THEN
    RETURN;
    END IF;

    -- Uncomment this block for joining rows and create column row (fk_class)
    -- ----------------------------------------------------------------------
    -- --JOIN STATEMENT'S TARGET ROW
    -- ----------------------------------------------------------------------
    -- RETURN QUERY
    -- SELECT
    --   jsonb_build_object('row', gv_to_jsonb (t3)) target_obj,
    --   fk_class  target_class,
    --   'todo' target_label
    -- FROM
    --   tables.row t3
    -- WHERE
    --   t3.pk_row = _tables_row_id;
    -- IF FOUND THEN
    --   RETURN;
    -- END IF;
    ----------------------------------------------------------------------
    --ELSE RETURN 0 ROWS
    ----------------------------------------------------------------------
    RETURN;
END
$func$;

-- add functions to get field pages


CREATE OR REPLACE FUNCTION commons.field_page_incoming_in_project (_project_id int, _fk_property int, _source_info_id int, _source_data_id int, _source_tables_cell_id bigint, _source_tables_row_id bigint, _limit int, _offset int, _page json)
    RETURNS jsonb
    LANGUAGE plpgsql
    AS $func$
DECLARE 
    res jsonb;
BEGIN
    --------------------------------------------------------------------------
    -- FINAL SELECT
    --------------------------------------------------------------------------
    SELECT
    jsonb_build_object(
        'validFor', now(),
        'paginatedStatements', 
            CASE WHEN _limit=0 THEN
                '[]'::json ELSE
                COALESCE(json_agg(stmt.obj ORDER BY ord_num_of_domain ASC NULLS LAST, pk_entity DESC), '[]'::json)
                END,
        'count', COALESCE(max(full_count), 0)::int,
        'page', _page
    ) INTO res
    FROM (
    --------------------------------------------------------------------------
    -- PAGINATED SELECT
    --------------------------------------------------------------------------
    SELECT
        json_strip_nulls (json_build_object('projRel', gv_to_jsonb (t2), 'isOutgoing', false, 'ordNum', t2.ord_num_of_domain, 'target', t3.target_obj, 'targetClass', t3.target_class, 'targetLabel', t3.target_label, 'statement', gv_to_jsonb (t1))) obj,
        count(*) OVER () AS full_count,
        t2.ord_num_of_domain,
        t1.pk_entity
    FROM
        information.v_statement t1,
        projects.v_info_proj_rel t2,
        commons.get_statement_target (_project_id, t1.fk_subject_info, t1.fk_subject_data, t1.fk_subject_tables_cell, t1.fk_subject_tables_row) t3
    WHERE
        --------------------------------------------------------------------------
        -- JOIN SOURCE ENTITY WITH STATEMENTS
        --------------------------------------------------------------------------
        t1.fk_object_info = _source_info_id
        AND t1.fk_object_data = _source_data_id
        AND t1.fk_object_tables_cell = _source_tables_cell_id
        AND t1.fk_object_tables_row = _source_tables_row_id
        AND t1.fk_property = _fk_property
        --------------------------------------------------------------------------
        -- JOIN STATEMENTS WITH PROJECT RELS
        --------------------------------------------------------------------------
        AND t1.pk_entity = t2.fk_entity
        AND t2.is_in_project = TRUE
        AND t2.fk_project = _project_id
        --------------------------------------------------------------------------
        -- order the statements according to order number of target
        --------------------------------------------------------------------------
    ORDER BY
        t2.ord_num_of_domain ASC NULLS LAST, t1.pk_entity DESC
        --------------------------------------------------------------------------
        -- paginate according to the requested limit / offset
        --------------------------------------------------------------------------
    LIMIT CASE WHEN _limit=0 THEN 1 ELSE _limit END
    OFFSET _offset) AS stmt;
    
    RETURN res;
END
$func$;

CREATE OR REPLACE FUNCTION commons.get_field_pages(_req jsonb)
RETURNS jsonb AS $$
DECLARE
    result jsonb;
BEGIN
  
    WITH expand_page_requests AS (
        SELECT jsonb_array_elements(_req) page_request
    ),
    decompose_page_request AS (
        SELECT 
            jsonb_object_keys(page_request->'page'->'scope') AS scope_type,
            (page_request->'page'->'isOutgoing')::bool is_outgoing,
            page_request->'page'->'scope' AS scope,
            (page_request->'page'->'property'->'fkProperty')::int AS fk_property,
            (page_request->'page'->'source'->'fkInfo')::int AS source_info_id,
            (page_request->'page'->'source'->'fkData')::int AS source_data_id,
            (page_request->'page'->'source'->'fkTablesCell')::bigint AS source_tables_cell_id,
            (page_request->'page'->'source'->'fkTablesRow')::bigint AS source_tables_row_id,
            (page_request->'page'->'limit')::int AS _limit,		
            (page_request->'page'->'offset')::int AS _offset,
            page_request->'page' AS page
        FROM expand_page_requests
    ),
    join_field_page AS (
        SELECT
            CASE WHEN scope_type = 'inProject' THEN
                CASE WHEN is_outgoing IS FALSE THEN
                    commons.field_page_incoming_in_project(
                        (scope->'inProject')::int,
                        fk_property,
                        COALESCE(source_info_id, 0),
                        COALESCE(source_data_id, 0),
                        COALESCE(source_tables_cell_id, 0),
                        COALESCE(source_tables_row_id, 0),
                        _limit,
                        _offset,
                        page::json
                    )
                END
            END resulting_page
        FROM decompose_page_request 
    )
    SELECT jsonb_build_object('subfieldPages', jsonb_agg(resulting_page)) INTO result
    FROM join_field_page;

    -- Return a value
    RETURN result;
END;
$$ LANGUAGE plpgsql;