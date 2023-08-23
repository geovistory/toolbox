DO $$
BEGIN
  IF NOT EXISTS(
    SELECT
      1
    FROM
      pg_type
    WHERE
      typname = 'war_gv_statement_target') THEN
  CREATE TYPE public.war_gv_statement_target AS(
    target_obj jsonb,
    target_class integer,
    target_label text
);
END IF;
END
$$;

CREATE OR REPLACE FUNCTION war.gv_field_page_incoming_in_project(_project_id integer, _fk_property integer, _source_info_id integer, _source_data_id integer, _source_tables_cell_id bigint, _source_tables_row_id bigint, _limit integer, _offset integer, _req json)
  RETURNS TABLE(
    "validFor" timestamp with time zone,
    "paginatedStatements" json,
    count integer,
    req json)
  LANGUAGE 'plpgsql'
  COST 100 VOLATILE PARALLEL UNSAFE ROWS 1
  AS $BODY$
BEGIN
  RETURN QUERY
  --------------------------------------------------------------------------
  -- FINAL SELECT
  --------------------------------------------------------------------------
  SELECT
    now() "validFor",
    CASE WHEN _limit = 0 THEN
      '[]'::json
    ELSE
      COALESCE(json_agg(stmt.obj ORDER BY ord_num_of_domain ASC NULLS LAST, pk_entity DESC), '[]'::json)
    END AS "paginatedStatements",
    COALESCE(max(full_count), 0)::int "count",
    _req req
  FROM(
    --------------------------------------------------------------------------
    -- PAGINATED SELECT
    --------------------------------------------------------------------------
    SELECT
      json_strip_nulls(json_build_object('projRel', war.gv_to_jsonb(t2), 'isOutgoing', FALSE, 'ordNum', t2.ord_num_of_domain, 'target', t3.target_obj, 'targetClass', t3.target_class, 'targetLabel', t3.target_label, 'statement', war.gv_to_jsonb(t1))) obj,
      count(*) OVER() AS full_count,
      t2.ord_num_of_domain,
      t1.pk_entity
    FROM
      information.v_statement t1,
      projects.v_info_proj_rel t2,
      war.gv_get_statement_target(_project_id, t1.fk_subject_info, t1.fk_subject_data, t1.fk_subject_tables_cell, t1.fk_subject_tables_row) t3
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
      t2.ord_num_of_domain ASC NULLS LAST,
      t1.pk_entity DESC
      --------------------------------------------------------------------------
      -- paginate according to the requested limit / offset
      --------------------------------------------------------------------------
    LIMIT CASE WHEN _limit = 0 THEN
      1
    ELSE
      _limit
    END OFFSET _offset) AS stmt;
END
$BODY$;

CREATE OR REPLACE FUNCTION war.gv_field_page_incoming_in_repo(_fk_property integer, _source_info_id integer, _source_data_id integer, _source_tables_cell_id bigint, _source_tables_row_id bigint, _limit integer, _offset integer, _req json)
  RETURNS TABLE(
    "validFor" timestamp with time zone,
    "paginatedStatements" json,
    count integer,
    req json)
  LANGUAGE 'plpgsql'
  COST 100 VOLATILE PARALLEL UNSAFE ROWS 1
  AS $BODY$
BEGIN
  RETURN QUERY
  --------------------------------------------------------------------------
  -- FINAL SELECT
  --------------------------------------------------------------------------
  SELECT
    now() "validFor",
    CASE WHEN _limit = 0 THEN
      '[]'::json
    ELSE
      COALESCE(json_agg(stmt.obj), '[]'::json)
    END AS "paginatedStatements",
    COALESCE(max(full_count), 0)::int "count",
    _req req
  FROM(
    --------------------------------------------------------------------------
    -- PAGINATED SELECT
    --------------------------------------------------------------------------
    SELECT
      json_strip_nulls(json_build_object('isOutgoing', FALSE, 'target', t3.target_obj, 'targetClass', t3.target_class, 'targetLabel', t3.target_label, 'statement', war.gv_to_jsonb(t1))) obj,
      count(*) OVER() AS full_count
    FROM
      information.v_statement t1,
      war.gv_get_statement_target(0, t1.fk_subject_info, t1.fk_subject_data, t1.fk_subject_tables_cell, t1.fk_subject_tables_row) t3
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
      -- ORDER STATEMENTS USED BY MORE PROJECTS FIRST
      --------------------------------------------------------------------------
    ORDER BY
      t1.is_in_project_count DESC
      --------------------------------------------------------------------------
      -- paginate according to the requested limit / offset
      --------------------------------------------------------------------------
    LIMIT CASE WHEN _limit = 0 THEN
      1
    ELSE
      _limit
    END OFFSET _offset) AS stmt;
END
$BODY$;

CREATE OR REPLACE FUNCTION war.gv_field_page_outgoing_in_project(_project_id integer, _fk_property integer, _fk_subject_info integer, _fk_subject_data integer, _fk_subject_tables_cell bigint, _fk_subject_tables_row bigint, _limit integer, _offset integer, _req json)
  RETURNS TABLE(
    "validFor" timestamp with time zone,
    "paginatedStatements" json,
    count integer,
    req json)
  LANGUAGE 'plpgsql'
  COST 100 VOLATILE PARALLEL UNSAFE ROWS 1
  AS $BODY$
BEGIN
  RETURN QUERY
  --------------------------------------------------------------------------
  -- FINAL SELECT
  --------------------------------------------------------------------------
  SELECT
    now() "validFor",
    CASE WHEN _limit = 0 THEN
      '[]'::json
    ELSE
      COALESCE(json_agg(stmt.obj ORDER BY ord_num_of_range ASC NULLS LAST, pk_entity DESC), '[]'::json)
    END AS "paginatedStatements",
    COALESCE(max(full_count), 0)::int "count",
    _req req
  FROM(
    --------------------------------------------------------------------------
    -- PAGINATED SELECT
    --------------------------------------------------------------------------
    SELECT
      json_strip_nulls(json_build_object('projRel', war.gv_to_jsonb(t2), 'isOutgoing', TRUE, 'ordNum', t2.ord_num_of_range, 'target', t3.target_obj, 'targetClass', t3.target_class, 'targetLabel', t3.target_label, 'statement', war.gv_to_jsonb(t1))) obj,
      count(*) OVER() AS full_count,
      t2.ord_num_of_range,
      t1.pk_entity
    FROM
      information.v_statement t1,
      projects.v_info_proj_rel t2,
      war.gv_get_statement_target(_project_id, t1.fk_object_info, t1.fk_object_data, t1.fk_object_tables_cell, t1.fk_object_tables_row) t3
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
      t2.ord_num_of_range ASC NULLS LAST,
      t1.pk_entity DESC
      --------------------------------------------------------------------------
      -- paginate according to the requested limit / offset
      --------------------------------------------------------------------------
    LIMIT CASE WHEN _limit = 0 THEN
      1
    ELSE
      _limit
    END OFFSET _offset) AS stmt;
END
$BODY$;

CREATE OR REPLACE FUNCTION war.gv_field_page_outgoing_in_repo(_fk_property integer, _fk_subject_info integer, _fk_subject_data integer, _fk_subject_tables_cell bigint, _fk_subject_tables_row bigint, _limit integer, _offset integer, _req json)
  RETURNS TABLE(
    "validFor" timestamp with time zone,
    "paginatedStatements" json,
    count integer,
    req json)
  LANGUAGE 'plpgsql'
  COST 100 VOLATILE PARALLEL UNSAFE ROWS 1
  AS $BODY$
BEGIN
  RETURN QUERY
  --------------------------------------------------------------------------
  -- FINAL SELECT
  --------------------------------------------------------------------------
  SELECT
    now() "validFor",
    CASE WHEN _limit = 0 THEN
      '[]'::json
    ELSE
      COALESCE(json_agg(stmt.obj), '[]'::json)
    END AS "paginatedStatements",
    COALESCE(max(full_count), 0)::int "count",
    _req req
  FROM(
    --------------------------------------------------------------------------
    -- PAGINATED SELECT
    --------------------------------------------------------------------------
    SELECT
      json_strip_nulls(json_build_object('isOutgoing', TRUE, 'target', t3.target_obj, 'targetClass', t3.target_class, 'targetLabel', t3.target_label, 'statement', war.gv_to_jsonb(t1))) obj,
      count(*) OVER() AS full_count
    FROM
      information.v_statement t1,
      war.gv_get_statement_target(0, t1.fk_object_info, t1.fk_object_data, t1.fk_object_tables_cell, t1.fk_object_tables_row) t3
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
      -- ORDER STATEMENTS USED BY MORE PROJECTS FIRST
      --------------------------------------------------------------------------
    ORDER BY
      t1.is_in_project_count DESC
      --------------------------------------------------------------------------
      -- paginate according to the requested limit / offset
      --------------------------------------------------------------------------
    LIMIT CASE WHEN _limit = 0 THEN
      1
    ELSE
      _limit
    END OFFSET _offset) AS stmt;
END
$BODY$;

CREATE OR REPLACE FUNCTION war.gv_get_statement_target(_project_id integer, _info_id integer, _data_id integer, _tables_cell_id bigint, _tables_row_id bigint)
  RETURNS SETOF war_gv_statement_target
  LANGUAGE 'plpgsql'
  COST 100 VOLATILE PARALLEL UNSAFE ROWS 1000
  AS $BODY$
BEGIN
  ----------------------------------------------------------------------
  --JOIN STATEMENT'S TARGET LANGUAGE
  ----------------------------------------------------------------------
  RETURN QUERY
  SELECT
    jsonb_build_object('language', war.gv_to_jsonb(t3)) target_obj,
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
    jsonb_build_object('appellation', war.gv_to_jsonb(t3)) target_obj,
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
    jsonb_build_object('langString', jsonb_build_object('langString', war.gv_to_jsonb(t3), 'language', language.obj)) target_obj,
    fk_class target_class,
    --concat(t3.string, ' (', language.iso6391, ')' ) target_label
    t3.string target_label
  FROM
    information.v_lang_string t3
  LEFT JOIN LATERAL(
    -- LANGUAGE OF LANG_STRING
    SELECT
      war.gv_to_jsonb(t4) obj,
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
    jsonb_build_object('place', war.gv_to_jsonb(t3)) target_obj,
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
    jsonb_build_object('timePrimitive', jsonb_build_object('infTimePrimitive', war.gv_to_jsonb(t3), 'timePrimitive', json_build_object('duration', t3.duration, 'julianDay', t3.julian_day, 'calendar', t3.calendar, 'firstSecond', commons.time_primitive__get_first_second(t3.julian_day), 'lastSecond', commons.time_primitive__get_last_second(t3.julian_day, t3.duration, t3.calendar)))) target_obj,
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
    jsonb_build_object('dimension', jsonb_build_object('dimension', war.gv_to_jsonb(t3), 'unitPreview', entity_preview.obj)) target_obj,
    fk_class target_class,
    concat_ws(' ', t3.numeric_value, entity_preview.entity_label) target_label
  FROM
    information.v_dimension t3
  LEFT JOIN LATERAL( SELECT DISTINCT ON(pk_entity)
      war.gv_to_jsonb(e.t4) obj,
      e.entity_label
    FROM(
      --repo version
      SELECT
        t4,
        entity_label
      FROM
        war.entity_preview t4
      WHERE
        t4.pk_entity = t3.fk_measurement_unit
        AND t4.project = 0
      UNION
      --project version
      SELECT
        t4,
        entity_label
      FROM
        war.entity_preview t4
      WHERE
        t4.pk_entity = t3.fk_measurement_unit
        AND t4.project = _project_id) e) entity_preview ON TRUE
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
    jsonb_build_object('entity', jsonb_build_object('resource', war.gv_to_jsonb(t3), 'entityPreview', entity_preview.obj)) target_obj,
    fk_class target_class,
    entity_preview.entity_label target_label
  FROM
    information.resource t3
  LEFT JOIN LATERAL( SELECT DISTINCT ON(pk_entity)
      war.gv_to_jsonb(e.t4) obj,
      e.entity_label
    FROM(
      --repo version
      SELECT
        t4,
        entity_label
      FROM
        war.entity_preview t4
      WHERE
        t4.pk_entity = _info_id
        AND t4.project = 0
      UNION
      --project version
      SELECT
        t4,
        entity_label
      FROM
        war.entity_preview t4
      WHERE
        t4.pk_entity = _info_id
        AND t4.project = _project_id) e) entity_preview ON TRUE
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
    jsonb_build_object('digital', war.gv_to_jsonb(t3)) target_obj,
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
    jsonb_build_object('cell', war.gv_to_jsonb(t3)) target_obj,
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
  --   jsonb_build_object('row', war.gv_to_jsonb (t3)) target_obj,
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
$BODY$;

CREATE OR REPLACE FUNCTION war.gv_to_jsonb(_row data.digital)
  RETURNS jsonb
  LANGUAGE 'plpgsql'
  COST 100 VOLATILE PARALLEL UNSAFE
  AS $BODY$
BEGIN
  RETURN jsonb_build_object('pk_entity', _row.pk_entity, 'entity_version', _row.entity_version, 'pk_text', _row.pk_text, 'quill_doc', _row.quill_doc, 'string', _row.string, 'fk_system_type', _row.fk_system_type, 'fk_namespace', _row.fk_namespace);
END;
$BODY$;

CREATE OR REPLACE FUNCTION war.gv_to_jsonb(_row information.appellation)
  RETURNS jsonb
  LANGUAGE 'plpgsql'
  COST 100 VOLATILE PARALLEL UNSAFE
  AS $BODY$
BEGIN
  RETURN jsonb_build_object('pk_entity', _row.pk_entity, 'quill_doc', _row.quill_doc, 'fk_class', _row.fk_class, 'string', _row.string);
END;
$BODY$;

CREATE OR REPLACE FUNCTION war.gv_to_jsonb(_row information.language)
  RETURNS jsonb
  LANGUAGE 'plpgsql'
  COST 100 VOLATILE PARALLEL UNSAFE
  AS $BODY$
BEGIN
  RETURN jsonb_build_object('pk_entity', _row.pk_entity, 'fk_class', _row.fk_class, 'pk_language', _row.pk_language, 'lang_type', _row.lang_type, 'scope', _row.scope, 'iso6392b', _row.iso6392b, 'iso6392t', _row.iso6392t, 'iso6391', _row.iso6391, 'notes', _row.notes);
END;
$BODY$;

CREATE OR REPLACE FUNCTION war.gv_to_jsonb(_row information.resource)
  RETURNS jsonb
  LANGUAGE 'plpgsql'
  COST 100 VOLATILE PARALLEL UNSAFE
  AS $BODY$
BEGIN
  RETURN jsonb_build_object('pk_entity', _row.pk_entity, 'fk_class', _row.fk_class, 'community_visibility', _row.community_visibility);
END;
$BODY$;

CREATE OR REPLACE FUNCTION war.gv_to_jsonb(_row information.v_dimension)
  RETURNS jsonb
  LANGUAGE 'plpgsql'
  COST 100 VOLATILE PARALLEL UNSAFE
  AS $BODY$
BEGIN
  RETURN jsonb_build_object('pk_entity', _row.pk_entity, 'fk_class', _row.fk_class, 'fk_measurement_unit', _row.fk_measurement_unit, 'numeric_value', _row.numeric_value);
END;
$BODY$;

CREATE OR REPLACE FUNCTION war.gv_to_jsonb(_row information.v_lang_string)
  RETURNS jsonb
  LANGUAGE 'plpgsql'
  COST 100 VOLATILE PARALLEL UNSAFE
  AS $BODY$
BEGIN
  RETURN jsonb_build_object('pk_entity', _row.pk_entity, 'fk_class', _row.fk_class, 'quill_doc', _row.quill_doc, 'string', _row.string, 'fk_language', _row.fk_language);
END;
$BODY$;

CREATE OR REPLACE FUNCTION war.gv_to_jsonb(_row information.v_place)
  RETURNS jsonb
  LANGUAGE 'plpgsql'
  COST 100 VOLATILE PARALLEL UNSAFE
  AS $BODY$
BEGIN
  RETURN jsonb_build_object('pk_entity', _row.pk_entity, 'long', _row.long, 'lat', _row.lat, 'fk_class', _row.fk_class);
END;
$BODY$;

CREATE OR REPLACE FUNCTION war.gv_to_jsonb(_row information.v_statement)
  RETURNS jsonb
  LANGUAGE 'plpgsql'
  COST 100 VOLATILE PARALLEL UNSAFE
  AS $BODY$
BEGIN
  RETURN jsonb_build_object('pk_entity', _row.pk_entity, 'fk_subject_info', _row.fk_subject_info, 'fk_subject_data', _row.fk_subject_data, 'fk_subject_tables_cell', _row.fk_subject_tables_cell, 'fk_subject_tables_row', _row.fk_subject_tables_row, 'fk_property', _row.fk_property, 'fk_property_of_property', _row.fk_property_of_property, 'fk_object_info', _row.fk_object_info, 'fk_object_data', _row.fk_object_data, 'fk_object_tables_cell', _row.fk_object_tables_cell, 'fk_object_tables_row', _row.fk_object_tables_row, 'is_in_project_count', _row.is_in_project_count, 'is_standard_in_project_count', _row.is_standard_in_project_count);
END;
$BODY$;

CREATE OR REPLACE FUNCTION war.gv_to_jsonb(_row information.v_time_primitive)
  RETURNS jsonb
  LANGUAGE 'plpgsql'
  COST 100 VOLATILE PARALLEL UNSAFE
  AS $BODY$
BEGIN
  RETURN jsonb_build_object('pk_entity', _row.pk_entity, 'fk_class', _row.fk_class, 'julian_day', _row.julian_day, 'duration', _row.duration, 'calendar', _row.calendar);
END;
$BODY$;

CREATE OR REPLACE FUNCTION war.gv_to_jsonb(_row projects.v_info_proj_rel)
  RETURNS jsonb
  LANGUAGE 'plpgsql'
  COST 100 VOLATILE PARALLEL UNSAFE
  AS $BODY$
BEGIN
  RETURN jsonb_build_object('pk_entity', _row.pk_entity, 'fk_project', _row.fk_project, 'fk_entity', _row.fk_entity, 'fk_entity_version', _row.fk_entity_version, 'fk_entity_version_concat', _row.fk_entity_version_concat, 'is_in_project', _row.is_in_project, 'is_standard_in_project', _row.is_standard_in_project, 'ord_num_of_domain', _row.ord_num_of_domain, 'ord_num_of_range', _row.ord_num_of_range, 'fk_creator', _row.fk_creator, 'fk_last_modifier', _row.fk_last_modifier, 'project_visibility', _row.project_visibility);
END;
$BODY$;

CREATE OR REPLACE FUNCTION war.gv_to_jsonb(_row tables."row")
  RETURNS jsonb
  LANGUAGE 'plpgsql'
  COST 100 VOLATILE PARALLEL UNSAFE
  AS $BODY$
BEGIN
  RETURN jsonb_build_object('pk_row', _row.pk_row, 'fk_digital', _row.fk_digital, 'position', _row.position);
END;
$BODY$;

CREATE OR REPLACE FUNCTION war.gv_to_jsonb(_row tables.cell)
  RETURNS jsonb
  LANGUAGE 'plpgsql'
  COST 100 VOLATILE PARALLEL UNSAFE
  AS $BODY$
BEGIN
  RETURN jsonb_build_object('pk_cell', _row.pk_cell, 'fk_class', _row.fk_class, 'fk_column', _row.fk_column, 'fk_row', _row.fk_row, 'fk_digital', _row.fk_digital, 'string_value', _row.string_value, 'numeric_value', _row.numeric_value);
END;
$BODY$;

CREATE OR REPLACE FUNCTION war.gv_to_jsonb(_row war.entity_preview)
  RETURNS jsonb
  LANGUAGE 'plpgsql'
  COST 100 VOLATILE PARALLEL UNSAFE
  AS $BODY$
BEGIN
  RETURN jsonb_build_object('key', _row.key, 'pk_entity', _row.pk_entity, 'fk_project', _row.fk_project, 'project', _row.project, 'fk_class', _row.fk_class, 'class_label', _row.class_label, 'entity_label', _row.entity_label, 'entity_type', _row.entity_type, 'type_label', _row.type_label, 'fk_type', _row.fk_type, 'time_span', _row.time_span, 'first_second', _row.first_second, 'last_second', _row.last_second, 'tmsp_last_modification', _row.tmsp_last_modification);
END;
$BODY$;

CREATE OR REPLACE FUNCTION war.update_view_entity_preview(schema_and_table_name character varying)
  RETURNS void
  LANGUAGE 'plpgsql'
  COST 100 VOLATILE PARALLEL UNSAFE
  AS $BODY$
BEGIN
  EXECUTE format('
	DROP VIEW IF EXISTS war.entity_preview;

    CREATE VIEW war.entity_preview AS
	SELECT * FROM %1$s;
				   ', schema_and_table_name);
END
$BODY$;

