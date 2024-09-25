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

 CREATE OR REPLACE FUNCTION commons.field_page_incoming_in_project (_project_id int, _fk_property int, _source_info_id int, _source_data_id int, _source_tables_cell_id bigint, _source_tables_row_id bigint, _limit int, _offset int)
      RETURNS TABLE (valid_for timestamp with time zone, paginated_statement json, target_class int, target_entity_id int,ord_num bigint, count int)
      LANGUAGE plpgsql
      AS $func$
    DECLARE 
      res jsonb;
    BEGIN
      RETURN QUERY
      --------------------------------------------------------------------------
      -- FINAL SELECT
      --------------------------------------------------------------------------
      SELECT
        	now() valid_for,
          stmt.obj paginated_statement,
          stmt.target_class,
          stmt.target_entity_id,
          ROW_NUMBER() OVER (ORDER BY ord_num_of_domain ASC NULLS LAST, pk_entity DESC) ord_num,
          COALESCE(full_count, 0)::int count
      FROM (
        --------------------------------------------------------------------------
        -- PAGINATED SELECT
        --------------------------------------------------------------------------
        SELECT
          json_strip_nulls (json_build_object('projRel', gv_to_jsonb (t2), 'isOutgoing', false, 'ordNum', t2.ord_num_of_domain, 'target', t3.target_obj, 'targetClass', t3.target_class, 'targetLabel', t3.target_label, 'statement', gv_to_jsonb (t1))) obj,
          count(*) OVER () AS full_count,
          t2.ord_num_of_domain,
          t1.pk_entity,
          t3.target_class,
          (t3.target_obj->'entity'->'resource'->'pk_entity')::int target_entity_id
        FROM
          information.v_statement t1,
          projects.v_info_proj_rel t2,
          commons.get_statement_target(_project_id, t1.fk_subject_info, t1.fk_subject_data, t1.fk_subject_tables_cell, t1.fk_subject_tables_row) t3
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
    END
    $func$;


    CREATE OR REPLACE FUNCTION commons.field_page_incoming_in_repo (_fk_property int, _source_info_id int, _source_data_id int, _source_tables_cell_id bigint, _source_tables_row_id bigint, _limit int, _offset int)
      RETURNS TABLE (valid_for timestamp with time zone, paginated_statement json, target_class int, target_entity_id int,ord_num bigint, count int)
      LANGUAGE plpgsql
      AS $func$
    DECLARE 
      res jsonb;
    BEGIN
      RETURN QUERY
      --------------------------------------------------------------------------
      -- FINAL SELECT
      --------------------------------------------------------------------------
      SELECT
        now() valid_for,
        stmt.obj paginated_statements,
        stmt.target_class,
        stmt.target_entity_id,
        ROW_NUMBER() OVER () ord_num,
        COALESCE(full_count, 0)::int count
      FROM (
        --------------------------------------------------------------------------
        -- PAGINATED SELECT
        --------------------------------------------------------------------------
        SELECT
          json_strip_nulls (json_build_object('isOutgoing', false, 'target', t3.target_obj, 'targetClass', t3.target_class, 'targetLabel', t3.target_label, 'statement', gv_to_jsonb (t1))) obj,
          count(*) OVER () AS full_count,
          t3.target_class,
          (t3.target_obj->'entity'->'resource'->'pk_entity')::int target_entity_id
        FROM
          information.v_statement t1,
          commons.get_statement_target(0, t1.fk_subject_info, t1.fk_subject_data, t1.fk_subject_tables_cell, t1.fk_subject_tables_row) t3
        WHERE
          --------------------------------------------------------------------------
          -- JOIN SOURCE ENTITY WITH STATEMENTS
          --------------------------------------------------------------------------
          t1.fk_object_info = _source_info_id
          AND t1.fk_object_data = _source_data_id
          AND t1.fk_object_tables_cell = _source_tables_cell_id
          AND t1.fk_object_tables_row = _source_tables_row_id
          AND t1.fk_property = _fk_property
          AND t1.is_in_project_count > 0

        --------------------------------------------------------------------------
        -- THE FOLLOWING ORDER BY CLAUSE IS DISABLED FOR PERFORMANCE REASONS
        -- ORDER BY
        --   t1.pk_entity DESC

        --------------------------------------------------------------------------
        -- paginate according to the requested limit / offset
        --------------------------------------------------------------------------
        LIMIT CASE WHEN _limit=0 THEN 1 ELSE _limit END
        OFFSET _offset) AS stmt;
    END
    $func$;

     CREATE OR REPLACE FUNCTION commons.field_page_incoming_no_constraint (_fk_property int, _source_info_id int, _source_data_id int, _source_tables_cell_id bigint, _source_tables_row_id bigint, _limit int, _offset int)
      RETURNS TABLE (valid_for timestamp with time zone, paginated_statement json, target_class int, target_entity_id int,ord_num bigint, count int)
      LANGUAGE plpgsql
      AS $func$
    DECLARE 
      res jsonb;
    BEGIN
      RETURN QUERY
      --------------------------------------------------------------------------
      -- FINAL SELECT
      --------------------------------------------------------------------------
      SELECT
        now() valid_for,
        stmt.obj paginated_statements,
        stmt.target_class,
        stmt.target_entity_id,
        ROW_NUMBER() OVER () ord_num,
        COALESCE(full_count, 0)::int count
      FROM (
        --------------------------------------------------------------------------
        -- PAGINATED SELECT
        --------------------------------------------------------------------------
        SELECT
          json_strip_nulls (json_build_object('isOutgoing', false, 'target', t3.target_obj, 'targetClass', t3.target_class, 'targetLabel', t3.target_label, 'statement', gv_to_jsonb (t1))) obj,
          count(*) OVER () AS full_count,
          t3.target_class,
          (t3.target_obj->'entity'->'resource'->'pk_entity')::int target_entity_id
        FROM
          information.v_statement t1,
          commons.get_statement_target(0, t1.fk_subject_info, t1.fk_subject_data, t1.fk_subject_tables_cell, t1.fk_subject_tables_row) t3
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
        -- THE FOLLOWING ORDER BY CLAUSE IS DISABLED FOR PERFORMANCE REASONS
        -- ORDER BY
        --   t1.pk_entity DESC

        --------------------------------------------------------------------------
        -- paginate according to the requested limit / offset
        --------------------------------------------------------------------------
        LIMIT CASE WHEN _limit=0 THEN 1 ELSE _limit END
        OFFSET _offset) AS stmt;
    END
    $func$;


 CREATE OR REPLACE FUNCTION commons.field_page_incoming_not_in_project (_project_id int, _fk_property int, _source_info_id int, _source_data_id int, _source_tables_cell_id bigint, _source_tables_row_id bigint, _limit int, _offset int)
      RETURNS TABLE (valid_for timestamp with time zone, paginated_statement json, target_class int, target_entity_id int,ord_num bigint, count int)
      LANGUAGE plpgsql
      AS $func$
    DECLARE 
      res jsonb;
    BEGIN
      RETURN QUERY
      --------------------------------------------------------------------------
      -- FINAL SELECT
      --------------------------------------------------------------------------
      SELECT
        now() valid_for,
        stmt.obj paginated_statements,
        stmt.target_class,
        stmt.target_entity_id,
        ROW_NUMBER() OVER () ord_num,
        COALESCE(full_count, 0)::int count
      FROM (
        --------------------------------------------------------------------------
        -- PAGINATED SELECT
        --------------------------------------------------------------------------
        SELECT
          json_strip_nulls (json_build_object('isOutgoing', false, 'target', t3.target_obj, 'targetClass', t3.target_class, 'targetLabel', t3.target_label, 'statement', gv_to_jsonb (t1))) obj,
          count(*) OVER () AS full_count,
          t3.target_class,
          (t3.target_obj->'entity'->'resource'->'pk_entity')::int target_entity_id
        FROM
          information.v_statement t1,
          commons.get_statement_target(_project_id, t1.fk_subject_info, t1.fk_subject_data, t1.fk_subject_tables_cell, t1.fk_subject_tables_row) t3
        WHERE
          --------------------------------------------------------------------------
          -- JOIN SOURCE ENTITY WITH STATEMENTS
          --------------------------------------------------------------------------
          t1.fk_object_info = _source_info_id
          AND t1.fk_object_data = _source_data_id
          AND t1.fk_object_tables_cell = _source_tables_cell_id
          AND t1.fk_object_tables_row = _source_tables_row_id
          AND t1.fk_property = _fk_property
          AND t1.is_in_project_count > 0

          --------------------------------------------------------------------------
          -- EXCLUDE STATEMENTS REFERENCING HIDDEN ENTITY
          --------------------------------------------------------------------------
          AND (t3.target_obj->'entity'->'resource'->'community_visibility'->>'toolbox')::boolean IS DISTINCT FROM false

          AND t1.pk_entity NOT IN (
            --------------------------------------------------------------------------
            -- EXCLUDE STATEMENTS OF PROJECT
            --------------------------------------------------------------------------
            SELECT t1.pk_entity
            FROM
              information.v_statement t1,
              projects.v_info_proj_rel t2
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
          )

        --------------------------------------------------------------------------
        -- THE FOLLOWING ORDER BY CLAUSE IS DISABLED FOR PERFORMANCE REASONS
        -- ORDER BY
        --   t1.pk_entity DESC

        --------------------------------------------------------------------------
        -- paginate according to the requested limit / offset
        --------------------------------------------------------------------------
        LIMIT CASE WHEN _limit=0 THEN 1 ELSE _limit END
        OFFSET _offset) AS stmt;
    END
    $func$;

     CREATE OR REPLACE FUNCTION commons.field_page_outgoing_in_project (_project_id int, _fk_property int, _fk_subject_info int, _fk_subject_data int, _fk_subject_tables_cell bigint, _fk_subject_tables_row bigint, _limit int, _offset int)
      RETURNS TABLE (valid_for timestamp with time zone, paginated_statement json, target_class int, target_entity_id int,ord_num bigint, count int)
      LANGUAGE plpgsql
      AS $func$
    DECLARE 
      res jsonb;
    BEGIN
      RETURN QUERY
      --------------------------------------------------------------------------
      -- FINAL SELECT
      --------------------------------------------------------------------------
      SELECT
        now() valid_for,
        stmt.obj paginated_statement,
        stmt.target_class,
        stmt.target_entity_id,
        ROW_NUMBER() OVER (ORDER BY ord_num_of_range ASC NULLS LAST, pk_entity DESC) ord_num,
        COALESCE(full_count, 0)::int count
      FROM (
        --------------------------------------------------------------------------
        -- PAGINATED SELECT
        --------------------------------------------------------------------------
        SELECT
          json_strip_nulls (json_build_object('projRel', gv_to_jsonb (t2), 'isOutgoing', true, 'ordNum', t2.ord_num_of_range, 'target', t3.target_obj, 'targetClass', t3.target_class, 'targetLabel', t3.target_label, 'statement', gv_to_jsonb (t1))) obj,
          count(*) OVER () AS full_count,
          t2.ord_num_of_range,
          t1.pk_entity,
          t3.target_class,
          (t3.target_obj->'entity'->'resource'->'pk_entity')::int target_entity_id
        FROM
          information.v_statement t1,
          projects.v_info_proj_rel t2,
          commons.get_statement_target(_project_id, t1.fk_object_info, t1.fk_object_data, t1.fk_object_tables_cell, t1.fk_object_tables_row) t3
        WHERE
          --------------------------------------------------------------------------
          -- JOIN SOURCE ENTITY WITH STATEMENTS
          --------------------------------------------------------------------------
          t1.fk_subject_info = _fk_subject_info
          AND t1.fk_subject_data = _fk_subject_data
          AND t1.fk_subject_tables_cell = _fk_subject_tables_cell
          AND t1.fk_subject_tables_row = _fk_subject_tables_row
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
          t2.ord_num_of_range ASC NULLS LAST, t1.pk_entity DESC
          --------------------------------------------------------------------------
          -- paginate according to the requested limit / offset
          --------------------------------------------------------------------------
        LIMIT CASE WHEN _limit=0 THEN 1 ELSE _limit END
        OFFSET _offset) AS stmt;
    END
    $func$;

       CREATE OR REPLACE FUNCTION commons.field_page_outgoing_in_repo (_fk_property int, _fk_subject_info int, _fk_subject_data int, _fk_subject_tables_cell bigint, _fk_subject_tables_row bigint, _limit int, _offset int)
      RETURNS TABLE (valid_for timestamp with time zone, paginated_statement json, target_class int, target_entity_id int,ord_num bigint, count int)
      LANGUAGE plpgsql
      AS $func$
    DECLARE 
      res jsonb;
    BEGIN
      RETURN QUERY
      --------------------------------------------------------------------------
      -- FINAL SELECT
      --------------------------------------------------------------------------
      SELECT
        now() valid_for,
        stmt.obj paginated_statements,
        stmt.target_class,
        stmt.target_entity_id,
        ROW_NUMBER() OVER () ord_num,
        COALESCE(full_count, 0)::int count
      FROM (
        --------------------------------------------------------------------------
        -- PAGINATED SELECT
        --------------------------------------------------------------------------
        SELECT
          json_strip_nulls (json_build_object('isOutgoing', true, 'target', t3.target_obj, 'targetClass', t3.target_class, 'targetLabel', t3.target_label, 'statement', gv_to_jsonb (t1))) obj,
          count(*) OVER () AS full_count,
          t3.target_class,
          (t3.target_obj->'entity'->'resource'->'pk_entity')::int target_entity_id
        FROM
          information.v_statement t1,
          commons.get_statement_target(0, t1.fk_object_info, t1.fk_object_data, t1.fk_object_tables_cell, t1.fk_object_tables_row) t3
        WHERE
          --------------------------------------------------------------------------
          -- JOIN SOURCE ENTITY WITH STATEMENTS
          --------------------------------------------------------------------------
          t1.fk_subject_info = _fk_subject_info
          AND t1.fk_subject_data = _fk_subject_data
          AND t1.fk_subject_tables_cell = _fk_subject_tables_cell
          AND t1.fk_subject_tables_row = _fk_subject_tables_row
          AND t1.fk_property = _fk_property
          AND t1.is_in_project_count > 0

        --------------------------------------------------------------------------
        -- THE FOLLOWING ORDER BY CLAUSE IS DISABLED FOR PERFORMANCE REASONS
        -- ORDER BY
        --   t1.pk_entity DESC

        --------------------------------------------------------------------------
        -- paginate according to the requested limit / offset
        --------------------------------------------------------------------------
        LIMIT CASE WHEN _limit=0 THEN 1 ELSE _limit END
        OFFSET _offset) AS stmt;
    END
    $func$;


  CREATE OR REPLACE FUNCTION commons.field_page_outgoing_no_constraint (_fk_property int, _fk_subject_info int, _fk_subject_data int, _fk_subject_tables_cell bigint, _fk_subject_tables_row bigint, _limit int, _offset int)
      RETURNS TABLE (valid_for timestamp with time zone, paginated_statement json, target_class int, target_entity_id int,ord_num bigint, count int)
      LANGUAGE plpgsql
      AS $func$
    DECLARE 
      res jsonb;
    BEGIN
      RETURN QUERY
      --------------------------------------------------------------------------
      -- FINAL SELECT
      --------------------------------------------------------------------------
      SELECT
        now() valid_for,
        stmt.obj paginated_statements,
        stmt.target_class,
        stmt.target_entity_id,
        ROW_NUMBER() OVER () ord_num,
        COALESCE(full_count, 0)::int count
      FROM (
        --------------------------------------------------------------------------
        -- PAGINATED SELECT
        --------------------------------------------------------------------------
        SELECT
          json_strip_nulls (json_build_object('isOutgoing', true, 'target', t3.target_obj, 'targetClass', t3.target_class, 'targetLabel', t3.target_label, 'statement', gv_to_jsonb (t1))) obj,
          count(*) OVER () AS full_count,
          t3.target_class,
          (t3.target_obj->'entity'->'resource'->'pk_entity')::int target_entity_id
        FROM
          information.v_statement t1,
          commons.get_statement_target(0, t1.fk_object_info, t1.fk_object_data, t1.fk_object_tables_cell, t1.fk_object_tables_row) t3
        WHERE
          --------------------------------------------------------------------------
          -- JOIN SOURCE ENTITY WITH STATEMENTS
          --------------------------------------------------------------------------
          t1.fk_subject_info = _fk_subject_info
          AND t1.fk_subject_data = _fk_subject_data
          AND t1.fk_subject_tables_cell = _fk_subject_tables_cell
          AND t1.fk_subject_tables_row = _fk_subject_tables_row
          AND t1.fk_property = _fk_property

        --------------------------------------------------------------------------
        -- THE FOLLOWING ORDER BY CLAUSE IS DISABLED FOR PERFORMANCE REASONS
        -- ORDER BY
        --   t1.pk_entity DESC

        --------------------------------------------------------------------------
        -- paginate according to the requested limit / offset
        --------------------------------------------------------------------------
        LIMIT CASE WHEN _limit=0 THEN 1 ELSE _limit END
        OFFSET _offset) AS stmt;
    END
    $func$;

  CREATE OR REPLACE FUNCTION commons.field_page_outgoing_not_in_project (_project_id int, _fk_property int, _fk_subject_info int, _fk_subject_data int, _fk_subject_tables_cell bigint, _fk_subject_tables_row bigint, _limit int, _offset int)
      RETURNS TABLE (valid_for timestamp with time zone, paginated_statement json, target_class int, target_entity_id int,ord_num bigint, count int)
      LANGUAGE plpgsql
      AS $func$
    DECLARE 
      res jsonb;
    BEGIN
      RETURN QUERY
      --------------------------------------------------------------------------
      -- FINAL SELECT
      --------------------------------------------------------------------------
      SELECT
        now() valid_for,
        stmt.obj paginated_statements,
        stmt.target_class,
        stmt.target_entity_id,
        ROW_NUMBER() OVER () ord_num,
        COALESCE(full_count, 0)::int count
      FROM (
        --------------------------------------------------------------------------
        -- PAGINATED SELECT
        --------------------------------------------------------------------------
        SELECT
          json_strip_nulls (json_build_object('isOutgoing', true, 'target', t3.target_obj, 'targetClass', t3.target_class, 'targetLabel', t3.target_label, 'statement', gv_to_jsonb (t1))) obj,
          count(*) OVER () AS full_count,
          t3.target_class,
          (t3.target_obj->'entity'->'resource'->'pk_entity')::int target_entity_id
        FROM
          information.v_statement t1,
          commons.get_statement_target(_project_id, t1.fk_object_info, t1.fk_object_data, t1.fk_object_tables_cell, t1.fk_object_tables_row) t3
        WHERE
          --------------------------------------------------------------------------
          -- JOIN SOURCE ENTITY WITH STATEMENTS
          --------------------------------------------------------------------------
          t1.fk_subject_info = _fk_subject_info
          AND t1.fk_subject_data = _fk_subject_data
          AND t1.fk_subject_tables_cell = _fk_subject_tables_cell
          AND t1.fk_subject_tables_row = _fk_subject_tables_row
          AND t1.fk_property = _fk_property
          AND t1.is_in_project_count > 0

          --------------------------------------------------------------------------
          -- EXCLUDE STATEMENTS REFERENCING HIDDEN ENTITY
          --------------------------------------------------------------------------
          AND (t3.target_obj->'entity'->'resource'->'community_visibility'->>'toolbox')::boolean IS DISTINCT FROM false

          AND t1.pk_entity NOT IN (
            --------------------------------------------------------------------------
            -- EXCLUDE STATEMENTS OF PROJECT
            --------------------------------------------------------------------------
            SELECT t1.pk_entity
            FROM
              information.v_statement t1,
              projects.v_info_proj_rel t2
            WHERE
            --------------------------------------------------------------------------
            -- JOIN SOURCE ENTITY WITH STATEMENTS
            --------------------------------------------------------------------------
            t1.fk_subject_info = _fk_subject_info
            AND t1.fk_subject_data = _fk_subject_data
            AND t1.fk_subject_tables_cell = _fk_subject_tables_cell
            AND t1.fk_subject_tables_row = _fk_subject_tables_row
            AND t1.fk_property = _fk_property
            --------------------------------------------------------------------------
            -- JOIN STATEMENTS WITH PROJECT RELS
            --------------------------------------------------------------------------
            AND t1.pk_entity = t2.fk_entity
            AND t2.is_in_project = TRUE
            AND t2.fk_project = _project_id
          )

        --------------------------------------------------------------------------
        -- THE FOLLOWING ORDER BY CLAUSE IS DISABLED FOR PERFORMANCE REASONS
        -- ORDER BY
        --   t1.pk_entity DESC

        --------------------------------------------------------------------------
        -- paginate according to the requested limit / offset
        --------------------------------------------------------------------------
        LIMIT CASE WHEN _limit=0 THEN 1 ELSE _limit END
        OFFSET _offset) AS stmt;
    END
    $func$;

CREATE TYPE field_page_row AS (
    -- this request
    pk_project int,
    scope_type text,
    is_outgoing bool,
    fk_property int,
    source_info_id int,
    source_data_id int,
    source_tables_cell_id bigint,
    source_tables_row_id bigint,
    is_circular bool,
    _limit int,		
    _offset int,
    -- resulting statement
    paginated_statement json,
    ord_num bigint,
    count int,
    -- child request
    child_pk_project int,
    child_scope_type text,
    child_is_outgoing bool,
    child_fk_property int,
    child_source_info_id int,
    child_source_data_id int,
    child_source_tables_cell_id bigint,
    child_source_tables_row_id bigint,
    child_is_circular bool,
    child_limit int,		
    child_offset int,
    child_targets jsonb
);

---- functions

CREATE OR REPLACE FUNCTION commons.create_field_page_req(
	project_id int, 
	source_id int, 
	parent_scope_type text,
	nestedReqs jsonb
)
RETURNS TABLE (
	pk_project int,
	scope_type text,
	is_outgoing bool,
	fk_property int,
	source_info_id int,
	source_data_id int,
	source_tables_cell_id bigint,
	source_tables_row_id bigint,
    is_circular bool,
	_limit int,		
	_offset int,
	targets jsonb
) AS $$
DECLARE
    scope_type text;
    subReq jsonb;
    page jsonb;
    targets jsonb;
    req jsonb;
BEGIN
    -- Generate the scope type of the subpages
    IF parent_scope_type = 'notInProject' THEN
        scope_type := 'inRepo';
    ELSE
        scope_type := parent_scope_type;
    END IF;

	RETURN QUERY
	SELECT 
		project_id AS pk_project,
		scope_type,
		(page_request->'page'->'isOutgoing')::bool is_outgoing,
		(page_request->'page'->'property'->'fkProperty')::int AS fk_property,
		source_id AS source_info_id,
		NULL::int AS source_data_id,
		NULL::bigint AS source_tables_cell_id,
		NULL::bigint AS source_tables_row_id,
        (page_request->'page'->'isCircular')::bool AS is_circular,		
		(page_request->'page'->'limit')::int AS _limit,		
		(page_request->'page'->'offset')::int AS _offset,
		page_request->'targets' targets
	FROM jsonb_array_elements(nestedReqs) page_request;  
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION commons.get_field_statements_and_child_requests(
	_pk_project int,
	_scope_type text,
	_is_outgoing bool,
	_fk_property int,
	_source_info_id int,
	_source_data_id int,
	_source_tables_cell_id bigint,
	_source_tables_row_id bigint,
    _is_circular boolean,
	__limit int,		
	__offset int,
	_targets jsonb
)
RETURNS SETOF field_page_row AS $$
DECLARE 
    coal_source_info_id int;
    coal_source_data_id int;
    coal_source_tables_cell_id bigint;
    coal_source_tables_row_id bigint;
BEGIN
    coal_source_info_id := COALESCE(_source_info_id, 0);
    coal_source_data_id := COALESCE(_source_data_id, 0);
    coal_source_tables_cell_id := COALESCE(_source_tables_cell_id, 0);
    coal_source_tables_row_id := COALESCE(_source_tables_row_id, 0);

	RETURN QUERY	
	SELECT 	
		-- this request
		_pk_project AS pk_project,
		_scope_type AS scope_type,
		_is_outgoing AS is_outgoing,
		_fk_property AS fk_property,
		_source_info_id AS source_info_id,
		_source_data_id AS source_data_id,
		_source_tables_cell_id AS source_tables_cell_id,
		_source_tables_row_id AS source_tables_row_id,
        _is_circular AS is_circular,
		__limit AS _limit,
		__offset AS _offset,
		
		-- resulting data
		stmt.paginated_statement,
		stmt.ord_num,
		stmt.count,
		
		--- resulting child request
		child.pk_project AS child_pk_project, 
		child.scope_type AS child_scope_type,
		child.is_outgoing AS child_is_outgoing, 
		child.fk_property AS child_fk_property, 
		child.source_info_id AS child_source_info_id, 
		child.source_data_id AS child_source_data_id, 
		child.source_tables_cell_id AS child_source_tables_cell_id, 
		child.source_tables_row_id AS child_source_tables_row_id, 
        child.is_circular AS child_is_circular,
		child._limit AS child_limit, 		
		child._offset AS child_offset, 
		child.targets AS child_targets 
	FROM
			(	
				SELECT * 
				FROM commons.field_page_incoming_in_project(_pk_project,_fk_property,coal_source_info_id,coal_source_data_id,coal_source_tables_cell_id,coal_source_tables_row_id,__limit,__offset)
				WHERE _scope_type = 'inProject' AND _is_outgoing IS FALSE
				UNION ALL 				
				SELECT * 
				FROM commons.field_page_outgoing_in_project(_pk_project,_fk_property,coal_source_info_id,coal_source_data_id,coal_source_tables_cell_id,coal_source_tables_row_id,__limit,__offset)
				WHERE _scope_type = 'inProject' AND _is_outgoing IS TRUE
				UNION ALL 	

                SELECT * 
				FROM commons.field_page_incoming_not_in_project(_pk_project,_fk_property,coal_source_info_id,coal_source_data_id,coal_source_tables_cell_id,coal_source_tables_row_id,__limit,__offset)
				WHERE _scope_type = 'notInProject' AND _is_outgoing IS FALSE
				UNION ALL 				
				SELECT * 
				FROM commons.field_page_outgoing_not_in_project(_pk_project,_fk_property,coal_source_info_id,coal_source_data_id,coal_source_tables_cell_id,coal_source_tables_row_id,__limit,__offset)
				WHERE _scope_type = 'notInProject' AND _is_outgoing IS TRUE
				UNION ALL 				

                SELECT * 
				FROM commons.field_page_incoming_in_repo(_fk_property,coal_source_info_id,coal_source_data_id,coal_source_tables_cell_id,coal_source_tables_row_id,__limit,__offset)
				WHERE _scope_type = 'inRepo' AND _is_outgoing IS FALSE
				UNION ALL 				
				SELECT * 
				FROM commons.field_page_outgoing_in_repo(_fk_property,coal_source_info_id,coal_source_data_id,coal_source_tables_cell_id,coal_source_tables_row_id,__limit,__offset)
				WHERE _scope_type = 'inRepo' AND _is_outgoing IS TRUE
				UNION ALL 				

                SELECT * 
				FROM commons.field_page_incoming_no_constraint(_fk_property,coal_source_info_id,coal_source_data_id,coal_source_tables_cell_id,coal_source_tables_row_id,__limit,__offset)
				WHERE _scope_type = 'noContraint' AND _is_outgoing IS FALSE
				UNION ALL 				
				SELECT * 
				FROM commons.field_page_outgoing_no_constraint(_fk_property,coal_source_info_id,coal_source_data_id,coal_source_tables_cell_id,coal_source_tables_row_id,__limit,__offset)
				WHERE _scope_type = 'noContraint' AND _is_outgoing IS TRUE   
			)
			AS stmt
		LEFT JOIN LATERAL commons.create_field_page_req(
				_pk_project, -- from parent's child request
				stmt.target_entity_id, -- from resulting data
				_scope_type, -- from parent's child request
				_targets->target_class::text->'nestedResource' -- from parent's child request
			) AS child ON TRUE; -- child requests
 END;
$$ LANGUAGE plpgsql;



CREATE OR REPLACE FUNCTION commons.get_field_statements_and_child_requests_recursive(
	_pk_project int,
	_scope_type text,
	_is_outgoing bool,
	_fk_property int,
	_source_info_id int,
	_source_data_id int,
	_source_tables_cell_id bigint,
	_source_tables_row_id bigint,
    _is_circular bool,
	__limit int,		
	__offset int,
	_targets jsonb,
	_parent_rows field_page_row[]
)
RETURNS field_page_row[] AS $$
DECLARE
    rec field_page_row;
    _rows field_page_row[];
BEGIN
    -- initialize rows
	_rows := _parent_rows;

	FOR rec IN 
		SELECT *
		FROM commons.get_field_statements_and_child_requests(
			_pk_project, _scope_type, _is_outgoing, _fk_property, _source_info_id, _source_data_id, _source_tables_cell_id, _source_tables_row_id, _is_circular, __limit, __offset, _targets
		) AS s
	LOOP
	
		IF rec.child_pk_project IS NOT NULL THEN
			_rows := _rows || commons.get_field_statements_and_child_requests_recursive(
				rec.child_pk_project, rec.child_scope_type, rec.child_is_outgoing, rec.child_fk_property, rec.child_source_info_id, rec.child_source_data_id, rec.child_source_tables_cell_id, rec.child_source_tables_row_id, rec.child_is_circular, rec.child_limit, rec.child_offset, rec.child_targets,
				ARRAY[rec]
			);
        ELSE 
            -- append this row to final result
		    _rows := _rows || rec;
		END IF;

		
	END LOOP;
	
	RETURN _rows; 
	
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION commons.get_field_page(
	page_request jsonb
)
RETURNS jsonb AS $$
DECLARE
  -- request vars
  _pkProject int;
	_scope_type text;
  _isOutgoing bool;
  _propertyFkProperty int;
  _sourceFkInfo int;
  _sourceFkData int;
  _sourceFkTablesCell bigint;
  _sourceFkTablesRow bigint;
  _isCircular bool;
  _limit int;		
  _offset int;
	
  -- response
  _result jsonb;
BEGIN

  -- decompose page request
  _pkProject := (page_request->'pkProject')::int;
  _isOutgoing := (page_request->'page'->'isOutgoing')::bool;
  _propertyFkProperty := (page_request->'page'->'property'->'fkProperty')::int;
  _sourceFkInfo := (page_request->'page'->'source'->'fkInfo')::int;
  _sourceFkData := (page_request->'page'->'source'->'fkData')::int;
  _sourceFkTablesCell := (page_request->'page'->'source'->'fkTablesCell')::bigint;
  _sourceFkTablesRow := (page_request->'page'->'source'->'fkTablesRow')::bigint;
  _isCircular := (page_request->'page'->'isCircular')::bool;
  _limit := (page_request->'page'->'limit')::int;		
  _offset := (page_request->'page'->'offset')::int;
	
	-- get the scope type
	SELECT key INTO _scope_type
	FROM jsonb_object_keys(page_request->'page'->'scope') key
	LIMIT 1;
		
	WITH field_pages_with_statements AS (
		SELECT (unnest(x)).* 
		FROM commons.get_field_statements_and_child_requests_recursive(
      _pkProject,
      _scope_type,
      _isOutgoing,
      _propertyFkProperty,
      _sourceFkInfo,
      _sourceFkData,
      _sourceFkTablesCell,
      _sourceFkTablesRow,
      _isCircular,
      _limit,
      _offset,
			page_request->'targets',
			ARRAY[]::field_page_row[]
		) x
	), 
	grouped_by_page AS (
		SELECT jsonb_build_object(
			'paginatedStatements', json_agg(fpws.paginated_statement),
			'count', fpws.count,
            'validFor', now(),
			'page', jsonb_strip_nulls(jsonb_build_object(
					'source', jsonb_strip_nulls(jsonb_build_object(
						'fkInfo', fpws.source_info_id,
						'fkData', fpws.source_data_id,
						'fkTablesCell', fpws.source_tables_cell_id,
						'fkTablesRow', fpws.source_tables_row_id
					)),
					'property', jsonb_build_object(
						'fkProperty', fpws.fk_property
					),
					'isOutgoing', fpws.is_outgoing,
					'isCircular', fpws.is_circular,
          'limit', fpws._limit,
					'offset', fpws._offset,
					'scope',  (CASE WHEN fpws.scope_type IN ('inRepo', 'noContraint')
                                    THEN '{"' || fpws.scope_type || '": true }'
                                    ELSE '{"' || fpws.scope_type || '": '|| fpws.pk_project ||'}'
                                END)::jsonb
			))
		) AS field_page
		FROM field_pages_with_statements fpws
		GROUP BY 
		fpws.pk_project,
		fpws.scope_type,
		fpws.is_outgoing,
		fpws.fk_property,
		fpws.source_info_id,
		fpws.source_data_id,
		fpws.source_tables_cell_id,
		fpws.source_tables_row_id,
    fpws.is_circular,
		fpws._limit,		
		fpws._offset,
		fpws.count
	)
	SELECT json_agg(field_page) INTO _result
	FROM grouped_by_page;

  -- if _result is null then ...?

  IF _result IS NULL THEN 

    SELECT jsonb_build_object(
			'paginatedStatements', '[]'::jsonb,
			'count', 0,
            'validFor', now(),
			'page', jsonb_strip_nulls(jsonb_build_object(
					'source', jsonb_strip_nulls(jsonb_build_object(
						'fkInfo', _sourceFkInfo,
						'fkData', _sourceFkData,
						'fkTablesCell', _sourceFkTablesCell,
						'fkTablesRow', _sourceFkTablesRow
					)),
					'property', jsonb_build_object(
						'fkProperty', _propertyFkProperty
					),
					'isOutgoing', _isOutgoing,
					'isCircular', _isCircular,
          'limit', _limit,
					'offset', _offset,
					'scope',  (CASE WHEN _scope_type IN ('inRepo', 'noContraint')
                                    THEN '{"' || _scope_type || '": true }'
                                    ELSE '{"' || _scope_type || '": '|| _pkProject ||'}'
                                END)::jsonb
			))
		) INTO _result;

  END IF;
	
	RETURN _result;
	
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION commons.get_field_pages(
	page_requests jsonb
)
RETURNS jsonb AS $$
DECLARE
	rec jsonb;
	_field_pages jsonb := '[]'::jsonb;
BEGIN

	-- Loop over each element in the JSONB array
    FOR rec IN SELECT * FROM jsonb_array_elements(page_requests)
    LOOP
        -- Process each element
        _field_pages := _field_pages || commons.get_field_page(rec);

    END LOOP;
	
	RETURN jsonb_build_object(
		'subfieldPages', _field_pages
	);
	
END;
$$ LANGUAGE plpgsql;	





