--
-- PostgreSQL database dump
--
-- Dumped from database version 14.5 (Debian 14.5-1.pgdg110+1)
-- Dumped by pg_dump version 16.0
-- Started on 2024-05-29 13:48:57 CEST
SET statement_timeout = 0;

SET lock_timeout = 0;

SET idle_in_transaction_session_timeout = 0;

SET client_encoding = 'UTF8';

SET standard_conforming_strings = ON;

SELECT
  pg_catalog.set_config('search_path', '', FALSE);

SET check_function_bodies = FALSE;

SET xmloption = content;

SET client_min_messages = warning;

SET row_security = OFF;

--
-- TOC entry 8 (class 2615 OID 19618)
-- Name: commons; Type: SCHEMA; Schema: -; Owner: -
--
CREATE SCHEMA commons;

--
-- TOC entry 9 (class 2615 OID 19619)
-- Name: data; Type: SCHEMA; Schema: -; Owner: -
--
CREATE SCHEMA data;

--
-- TOC entry 10 (class 2615 OID 19620)
-- Name: data_for_history; Type: SCHEMA; Schema: -; Owner: -
--
CREATE SCHEMA data_for_history;

--
-- TOC entry 11 (class 2615 OID 19621)
-- Name: information; Type: SCHEMA; Schema: -; Owner: -
--
CREATE SCHEMA information;

--
-- TOC entry 12 (class 2615 OID 19622)
-- Name: projects; Type: SCHEMA; Schema: -; Owner: -
--
CREATE SCHEMA projects;

--
-- TOC entry 6 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--
-- *not* creating schema, since initdb creates it
--
-- TOC entry 13 (class 2615 OID 19623)
-- Name: system; Type: SCHEMA; Schema: -; Owner: -
--
CREATE SCHEMA SYSTEM;

--
-- TOC entry 15 (class 2615 OID 23770)
-- Name: tables; Type: SCHEMA; Schema: -; Owner: -
--
CREATE SCHEMA tables;

--
-- TOC entry 14 (class 2615 OID 19624)
-- Name: topology; Type: SCHEMA; Schema: -; Owner: -
--
CREATE SCHEMA topology;

--
-- TOC entry 6471 (class 0 OID 0)
-- Dependencies: 14
-- Name: SCHEMA topology; Type: COMMENT; Schema: -; Owner: -
--
COMMENT ON SCHEMA topology IS 'PostGIS Topology schema';

--
-- TOC entry 18 (class 2615 OID 24158)
-- Name: war; Type: SCHEMA; Schema: -; Owner: -
--
CREATE SCHEMA war;

--
-- TOC entry 2 (class 3079 OID 19626)
-- Name: postgis; Type: EXTENSION; Schema: -; Owner: -
--
CREATE EXTENSION IF NOT EXISTS postgis WITH SCHEMA public;

--
-- TOC entry 6472 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION postgis; Type: COMMENT; Schema: -; Owner: -
--
COMMENT ON EXTENSION postgis IS 'PostGIS geometry and geography spatial types and functions';

--
-- TOC entry 3 (class 3079 OID 20657)
-- Name: postgis_topology; Type: EXTENSION; Schema: -; Owner: -
--
CREATE EXTENSION IF NOT EXISTS postgis_topology WITH SCHEMA topology;

--
-- TOC entry 6473 (class 0 OID 0)
-- Dependencies: 3
-- Name: EXTENSION postgis_topology; Type: COMMENT; Schema: -; Owner: -
--
COMMENT ON EXTENSION postgis_topology IS 'PostGIS topology spatial types and functions';

--
-- TOC entry 1996 (class 1247 OID 20818)
-- Name: calendar_granularities; Type: TYPE; Schema: public; Owner: -
--
CREATE TYPE public.calendar_granularities AS ENUM(
  '1 year',
  '1 month',
  '1 day',
  '1 hour',
  '1 minute',
  '1 second'
);

--
-- TOC entry 1999 (class 1247 OID 20832)
-- Name: calendar_type; Type: TYPE; Schema: public; Owner: -
--
CREATE TYPE public.calendar_type AS ENUM(
  'gregorian',
  'julian'
);

--
-- TOC entry 2395 (class 1247 OID 23945)
-- Name: month_and_day_of_month; Type: TYPE; Schema: public; Owner: -
--
CREATE TYPE public.month_and_day_of_month AS (
  month integer,
  day_of_month integer
);

--
-- TOC entry 2392 (class 1247 OID 23942)
-- Name: year_and_day_of_year; Type: TYPE; Schema: public; Owner: -
--
CREATE TYPE public.year_and_day_of_year AS (
  year integer,
  day_of_year integer
);

--
-- TOC entry 2398 (class 1247 OID 23949)
-- Name: year_month_day; Type: TYPE; Schema: public; Owner: -
--
CREATE TYPE public.year_month_day AS (
  year integer,
  month integer,
  day integer
);

--
-- TOC entry 2443 (class 1247 OID 24160)
-- Name: edge_target_type; Type: TYPE; Schema: war; Owner: -
--
CREATE TYPE war.edge_target_type AS ENUM(
  'text',
  'type'
);

--
-- TOC entry 2446 (class 1247 OID 24167)
-- Name: node_id; Type: TYPE; Schema: war; Owner: -
--
CREATE TYPE war.node_id AS (
  pk_entity integer,
  fk_project integer
);

--
-- TOC entry 1250 (class 1255 OID 20837)
-- Name: _validate_json_schema_type(text, jsonb); Type: FUNCTION; Schema: commons; Owner: -
--
CREATE FUNCTION commons._validate_json_schema_type(type text, data jsonb)
  RETURNS boolean
  LANGUAGE plpgsql
  IMMUTABLE
  AS $$
BEGIN
  IF type = 'integer' THEN
    IF jsonb_typeof(data) != 'number' THEN
      RETURN FALSE;
    END IF;
    IF trunc(data::text::numeric) != data::text::numeric THEN
      RETURN FALSE;
    END IF;
  ELSE
    IF type != jsonb_typeof(data) THEN
      RETURN FALSE;
    END IF;
  END IF;
  RETURN TRUE;
END;
$$;

--
-- TOC entry 1311 (class 1255 OID 24013)
-- Name: analysis__create_temporal_distribution(integer[], integer); Type: FUNCTION; Schema: commons; Owner: -
--
CREATE FUNCTION commons.analysis__create_temporal_distribution(param_pk_entities integer[], param_project integer)
  RETURNS jsonb
  LANGUAGE plpgsql
  AS $$
DECLARE
  res jsonb;
BEGIN
  WITH tw0 AS (
    SELECT
      first_second,
      last_second,
      pk_entity
    FROM
      war.entity_preview
    WHERE
      pk_entity = ANY (param_pk_entities)
      AND project_id = param_project
      AND first_second IS NOT NULL
      AND last_second IS NOT NULL
),
tw1 AS (
  SELECT
    first_second julian_second,
    pk_entity
  FROM
    tw0
  UNION
  SELECT
    last_second julian_second,
    pk_entity
  FROM
    tw0
  ORDER BY
    1
),
tw2 AS (
  SELECT DISTINCT ON (julian_second)
    julian_second
  FROM
    tw1
),
tw3 AS (
  SELECT
    julian_second,
    row_number() OVER () pk,
(row_number() OVER () + 1) fk_next
FROM tw2
),
tw4 AS (
  SELECT
    t1.julian_second x1,
    t2.julian_second x2
  FROM
    tw3 t1,
    tw3 t2
  WHERE
    t1.fk_next = t2.pk
),
tw5 AS (
  SELECT
    t1.x1,
    t1.x2,
    -- for czml we need to remove a very little ms here to that the x vals stay unique
    json_strip_nulls(json_agg(t2.pk_entity)) AS data,
    count(t2.pk_entity)
  FROM
    tw4 t1
    LEFT JOIN tw0 t2 ON t2.first_second < t1.x2
      AND t2.last_second > t1.x1
  GROUP BY
    t1.x1,
    t1.x2
  ORDER BY
    t1.x1
),
tw6 AS (
  -- select the very first point
  SELECT
    x1 x,
    0 y,
    '[]'::json AS data,
    x1,
    x2
  FROM
    tw5
  ORDER BY
    x1
  LIMIT 1
),
tw7 AS (
  -- select the very last point
  SELECT
    x2 x,
    0 y,
    '[]'::json AS data,
    x1,
    x2
  FROM
    tw5
  ORDER BY
    x1 DESC
  LIMIT 1
),
tw8 AS (
  -- first point
  SELECT
    0,
    x,
    y,
    data,
    x1,
    x2
  FROM
    tw6
  UNION ALL
  -- all other points
  SELECT
    2,
    x1 x,
    count y,
    data,
    x1,
    x2
  FROM
    tw5
  UNION ALL
  SELECT
    1,
    x2 x,
    count y,
    data,
    x1,
    x2
  FROM
    tw5
  UNION ALL
  -- last point
  SELECT
    3,
    x,
    y,
    data,
    x1,
    x2
  FROM
    tw7
  ORDER BY
    x,
    1
)
SELECT
  jsonb_agg(json_build_object('x', x, 'y', y, 'data', data)) INTO res
FROM
  tw8;
  RETURN coalesce(res, '[]'::jsonb);
END;
$$;

--
-- TOC entry 1336 (class 1255 OID 24026)
-- Name: analysis__time_chart_cont__czml_time_values(integer[], integer); Type: FUNCTION; Schema: commons; Owner: -
--
CREATE FUNCTION commons.analysis__time_chart_cont__czml_time_values(param_pk_entities integer[], param_project integer)
  RETURNS jsonb
  LANGUAGE plpgsql
  AS $$
DECLARE
  res jsonb;
BEGIN
  WITH tw0 AS (
    -- temporal entities
    SELECT
      first_second,
      last_second,
      pk_entity
    FROM
      war.entity_preview
    WHERE
      pk_entity = ANY (param_pk_entities)
      AND project_id = param_project
      AND first_second IS NOT NULL
      AND last_second IS NOT NULL
),
tw1 AS (
  SELECT
    first_second julian_second,
    pk_entity
  FROM
    tw0
  UNION
  SELECT
    last_second julian_second,
    pk_entity
  FROM
    tw0
  ORDER BY
    1
),
tw2 AS (
  SELECT DISTINCT ON (julian_second)
    julian_second
  FROM
    tw1
),
tw3 AS (
  SELECT
    julian_second,
    row_number() OVER () pk,
(row_number() OVER () + 1) fk_next
FROM tw2
),
tw4 AS (
  SELECT
    t1.julian_second x1,
    t2.julian_second x2
  FROM
    tw3 t1,
    tw3 t2
  WHERE
    t1.fk_next = t2.pk
),
tw5 AS (
  SELECT
    t1.x1,
    t1.x2,
    -- for czml we need to remove a very little ms here to that the x vals stay unique
    commons.julian_second__to_iso_8601(t1.x1 + 1) iso_x1,
  commons.julian_second__to_iso_8601(t1.x2) iso_x2,
  coalesce(json_agg(t2.pk_entity) FILTER (WHERE t2.pk_entity IS NOT NULL), '[]') AS data,
count(t2.pk_entity)
FROM
  tw4 t1
  LEFT JOIN tw0 t2 ON t2.first_second < t1.x2
    AND t2.last_second > t1.x1
GROUP BY
  t1.x1,
  t1.x2
ORDER BY
  t1.x1
),
tw6 AS (
  -- select the very first point
  SELECT
    x1 x,
    commons.julian_second__to_iso_8601(x1 - 1) iso_x,
    0 y,
    '[]'::json AS data,
    x1,
    x2,
    iso_x1,
    iso_x2
  FROM
    tw5
  ORDER BY
    x1
  LIMIT 1
),
tw7 AS (
  -- select the very last point
  SELECT
    x2 x,
    commons.julian_second__to_iso_8601(x2 + 1) iso_x,
    0 y,
    '[]'::json AS data,
    x1,
    x2,
    iso_x1,
    iso_x2
  FROM
    tw5
  ORDER BY
    x1 DESC
  LIMIT 1
),
tw8 AS (
  -- first point
  SELECT
    0,
    x,
    iso_x,
    y,
    data,
    x1,
    x2,
    iso_x1,
    iso_x2
  FROM
    tw6
  UNION ALL
  -- all other points
  SELECT
    2,
    x1 x,
    iso_x1 iso_x,
    count y,
    data,
    x1,
    x2,
    iso_x1,
    iso_x2
  FROM
    tw5
  UNION ALL
  SELECT
    1,
    x2 x,
    iso_x2 iso_x,
    count y,
    data,
    x1,
    x2,
    iso_x1,
    iso_x2
  FROM
    tw5
  UNION ALL
  -- last point
  SELECT
    3,
    x,
    iso_x,
    y,
    data,
    x1,
    x2,
    iso_x1,
    iso_x2
  FROM
    tw7
  ORDER BY
    x,
    1
),
tw9 AS (
  SELECT
    row_number() OVER () data_id,
    x,
    iso_x,
    y,
    data,
    x1,
    x2,
    iso_x1,
    iso_x2
  FROM tw8
)
SELECT
  json_build_object('data_lookup', coalesce(jsonb_object_agg(tw9.data_id, tw9.data), '{}'::jsonb), 'timeCzmlValues', coalesce(jsonb_agg(json_build_object('iso_x', tw9.iso_x, 'y', tw9.y, 'data_ref', tw9.data_id::text)), '[]'::jsonb), 'timeLinePoints', coalesce(jsonb_agg(json_build_object('x', tw9.x, 'y', tw9.y, 'data_ref', tw9.data_id::text)), '[]'::jsonb)) INTO res
FROM
  tw9;
  RETURN res;
END;
$$;

--
-- TOC entry 1251 (class 1255 OID 20838)
-- Name: appellation_label_to_quill_doc(jsonb); Type: FUNCTION; Schema: commons; Owner: -
--
CREATE FUNCTION commons.appellation_label_to_quill_doc(orig jsonb)
  RETURNS jsonb
  LANGUAGE plpgsql
  IMMUTABLE
  AS $$
BEGIN
  RETURN commons.text_to_quill_doc(information.appellation_label_to_string(orig));
END;
$$;

--
-- TOC entry 1252 (class 1255 OID 20839)
-- Name: change_fk_reference_of_versioned_table(character varying, character varying, character varying, character varying, character varying, character varying, boolean); Type: FUNCTION; Schema: commons; Owner: -
--
CREATE FUNCTION commons.change_fk_reference_of_versioned_table(schema_name character varying, table_name character varying, fk_column character varying, referenced_schema_and_table_name character varying, old_referenced_column character varying, new_referenced_column character varying, fk_col_not_null boolean DEFAULT TRUE)
  RETURNS void
  LANGUAGE plpgsql
  AS $_$
BEGIN
  EXECUTE format( '
      
        DROP TRIGGER IF EXISTS create_entity_version_key ON %1$s.%2$s;
        DROP TRIGGER IF EXISTS creation_tmsp ON %1$s.%2$s;
        DROP TRIGGER IF EXISTS insert_schema_table_name ON %1$s.%2$s;
        DROP TRIGGER IF EXISTS last_modification_tmsp ON %1$s.%2$s;
        DROP TRIGGER IF EXISTS update_entity_version_key ON %1$s.%2$s;
        DROP TRIGGER IF EXISTS versioning_trigger ON %1$s.%2$s;


        -- table
        ALTER TABLE %1$s.%2$s RENAME COLUMN %3$s TO _deprecated_%3$s;
        ALTER TABLE %1$s.%2$s ADD COLUMN %3$s integer;
        UPDATE %1$s.%2$s
        SET %3$s = subq.%6$s
        FROM (
            SELECT %6$s, %5$s
            FROM %4$s
        ) as subq
        WHERE _deprecated_%3$s = subq.%5$s;

        ALTER TABLE %1$s.%2$s 
          DROP CONSTRAINT IF EXISTS %2$s_%3$s_fkey;  
        
        ALTER TABLE %1$s.%2$s ADD FOREIGN KEY (%3$s) REFERENCES %4$s (%6$s);

        -- table_vt
        ALTER TABLE %1$s.%2$s_vt RENAME COLUMN %3$s TO _deprecated_%3$s;
        ALTER TABLE %1$s.%2$s_vt ADD COLUMN %3$s integer;
        UPDATE %1$s.%2$s_vt
        SET %3$s = subq.%6$s
        FROM (
            SELECT %6$s, %5$s
            FROM %4$s
        ) as subq
        WHERE _deprecated_%3$s = subq.%5$s;

        ALTER TABLE %1$s.%2$s_vt 
          DROP CONSTRAINT IF EXISTS %2$s_vt_%3$s_fkey;  

        ALTER TABLE %1$s.%2$s_vt ADD FOREIGN KEY (%3$s) REFERENCES %4$s (%6$s);

        SELECT commons.reinit_versioning_triggers(''%1$s.%2$s'');

        -- Trigger: creation_tmsp
        CREATE TRIGGER creation_tmsp
            BEFORE INSERT
            ON %1$s.%2$s
            FOR EACH ROW
            EXECUTE PROCEDURE commons.tmsp_creation();

        -- Trigger: insert_schema_table_name
        CREATE TRIGGER insert_schema_table_name
            BEFORE INSERT
            ON %1$s.%2$s
            FOR EACH ROW
            EXECUTE PROCEDURE commons.insert_schema_table_name();

        -- Trigger: last_modification_tmsp
        CREATE TRIGGER last_modification_tmsp
            BEFORE INSERT OR UPDATE 
            ON %1$s.%2$s
            FOR EACH ROW
            EXECUTE PROCEDURE commons.tmsp_last_modification();



    '
, schema_name, table_name, fk_column, referenced_schema_and_table_name, old_referenced_column, new_referenced_column);
  IF(fk_col_not_null = TRUE) THEN
    EXECUTE format('
            ALTER TABLE %1$s.%2$s ALTER COLUMN %3$s SET NOT NULL;
      ', schema_name, table_name, fk_column);
  END IF;
END
$_$;

--
-- TOC entry 1253 (class 1255 OID 20840)
-- Name: change_parent_entity_table(character varying, character varying, character varying); Type: FUNCTION; Schema: commons; Owner: -
--
CREATE FUNCTION commons.change_parent_entity_table(child_schema_and_table_name character varying, old_parent_schema_and_table_name character varying, new_parent_schema_and_table_name character varying)
  RETURNS void
  LANGUAGE plpgsql
  AS $_$
BEGIN
  -- Do the Magic:
  EXECUTE format('	
          ALTER TABLE %1$s ALTER COLUMN schema_name SET NOT NULL;
          ALTER TABLE %1$s ALTER COLUMN table_name SET NOT NULL;
          UPDATE %1$s SET entity_version = 1 WHERE entity_version IS NULL;
          ALTER TABLE %1$s ALTER COLUMN entity_version SET NOT NULL;

          ALTER TABLE %1$s NO INHERIT %2$s;
          ALTER TABLE %1$s INHERIT %3$s;
          SELECT setval(''%3$s_pk_entity_seq'', (SELECT MAX(pk_entity) FROM %1$s));      
      ', child_schema_and_table_name, old_parent_schema_and_table_name, new_parent_schema_and_table_name);
END
$_$;

--
-- TOC entry 1328 (class 1255 OID 24786)
-- Name: clone_project(integer, text, text); Type: FUNCTION; Schema: commons; Owner: -
--
CREATE FUNCTION commons.clone_project(pk_project integer, project_label text, project_description text)
  RETURNS integer
  LANGUAGE plpgsql
  AS $$
DECLARE
  fk_project_default_language int;
  fk_system_type__project_label int;
  fk_system_type__project_description int;
  pk_new_project int;
  pk_new_default_namespace int;
BEGIN
  -- system type for project label
  fk_system_type__project_label = 639;
  -- system type for project description
  fk_system_type__project_description = 638;
  SELECT
    fk_language INTO fk_project_default_language
  FROM
    projects.project
  WHERE
    pk_entity = pk_project;

  /*
   * create the project
   */
  INSERT INTO projects.project(fk_language, fk_cloned_from_project)
    VALUES (fk_project_default_language, pk_project)
  ON CONFLICT
    DO NOTHING
  RETURNING
    pk_entity INTO pk_new_project;

  /*
   * add label of project
   */
  INSERT INTO projects.text_property(fk_project, fk_pro_project, string, fk_system_type, fk_language)
    VALUES (pk_new_project, pk_new_project, project_label, fk_system_type__project_label, fk_project_default_language);

  /*
   * add description of project
   */
  INSERT INTO projects.text_property(fk_project, fk_pro_project, string, fk_system_type, fk_language)
    VALUES (pk_new_project, pk_new_project, project_description, fk_system_type__project_description, fk_project_default_language);

  /*
   * add dfh profiles to project
   */
  INSERT INTO projects.dfh_profile_proj_rel(fk_project, fk_profile, enabled)
  SELECT
    pk_new_project AS fk_project,
    fk_profile,
    enabled
  FROM
    projects.dfh_profile_proj_rel
  WHERE
    fk_project = pk_project;

  /*
   * add dfh classes to project
   */
  INSERT INTO projects.dfh_class_proj_rel(fk_project, fk_class, enabled_in_entities)
  SELECT
    pk_new_project AS fk_project,
    fk_class,
    enabled_in_entities
  FROM
    projects.dfh_class_proj_rel
  WHERE
    fk_project = pk_project;

  /*
   * add default namespace to project
   */
  INSERT INTO data.namespace(fk_project, standard_label)
    VALUES (pk_new_project, 'Default Namespace')
  RETURNING
    pk_entity INTO pk_new_default_namespace;

  /*
   * add all information to project except for statements referencing to data
   */
  WITH tw1 AS (
    /*
     * select all info_proj_rel of sandbox except those that are
     * referencing an statement associating entities in data schema
     */
    SELECT
      t1.pk_entity
    FROM
      projects.info_proj_rel t1
    WHERE
      fk_project = pk_project
    EXCEPT
    SELECT
      t1.pk_entity
    FROM
      projects.info_proj_rel t1,
      information.statement t2
    WHERE
      fk_project = pk_project
      AND t1.fk_entity = t2.pk_entity
      AND (t2.fk_subject_tables_cell != 0
        OR t2.fk_object_tables_cell != 0
        OR t2.fk_subject_tables_row != 0
        OR t2.fk_object_tables_row != 0
        OR t2.fk_subject_data != 0
        OR t2.fk_object_data != 0))
  INSERT INTO projects.info_proj_rel(fk_project, fk_entity, fk_entity_version, fk_entity_version_concat, is_in_project, is_standard_in_project, ord_num_of_domain, ord_num_of_range, ord_num_of_text_property, entity_version)
  SELECT
    pk_new_project AS fk_project,
    t1.fk_entity,
    t1.fk_entity_version,
    t1.fk_entity_version_concat,
    t1.is_in_project,
    t1.is_standard_in_project,
    t1.ord_num_of_domain,
    t1.ord_num_of_range,
    t1.ord_num_of_text_property,
    t1.entity_version
  FROM
    projects.info_proj_rel t1,
    tw1 t2
  WHERE
    t1.pk_entity = t2.pk_entity;

  /*
   * copy digitals from sandbox namespace to project's namespace, keeping track of the original pk_entity (in metadata, fk_cloned_from)
   */
  INSERT INTO data.digital(fk_namespace, fk_system_type, quill_doc, metadata)
  -- Select all digitals of sandbox project
  SELECT
    pk_new_default_namespace AS fk_namespace,
    t2.fk_system_type,
    t2.quill_doc,
    jsonb_build_object('fk_cloned_from', t2.pk_entity)
  FROM
    data.namespace t1,
    data.digital t2
  WHERE
    t1.fk_project = pk_project
    AND t1.pk_entity = t2.fk_namespace;

  /*
   * copy statements pointing to digitals, using the pk_entity of the above created, where fk_cloned_from
   * and add them to the project
   */
  INSERT INTO information.statement(fk_subject_info, fk_subject_data, fk_subject_tables_cell, fk_subject_tables_row, fk_property, fk_property_of_property, fk_object_info, fk_object_data, fk_object_tables_cell, fk_object_tables_row, metadata)
  -- select statements pointing to the new digital's fk_cloned_from
  SELECT
    coalesce(t2.fk_subject_info, 0),
    t3.pk_entity AS fk_subject_data, -- pk of new digital
    coalesce(t2.fk_subject_tables_cell, 0),
    coalesce(t2.fk_subject_tables_row, 0),
    coalesce(t2.fk_property, 0),
    coalesce(t2.fk_property_of_property, 0),
    coalesce(t2.fk_object_info, 0),
    coalesce(t2.fk_object_data, 0),
    coalesce(t2.fk_object_tables_cell, 0),
    coalesce(t2.fk_object_tables_row, 0),
    jsonb_build_object('fk_cloned_from', t2.pk_entity) -- keep track of original entity_asssociacion
  FROM
    projects.info_proj_rel t1,
    information.statement t2,
    data.digital t3
  WHERE
    fk_project = pk_project
    AND t1.is_in_project = TRUE
    AND t1.fk_entity = t2.pk_entity
    AND t2.fk_subject_data =(t3.metadata ->> 'fk_cloned_from')::int
    AND t3.fk_namespace = pk_new_default_namespace;

  /*
   * copy chunks from sandbox namespace to project's namespace, keeping track of original pk_entity (in metadata, fk_cloned_from)
   */
  INSERT INTO data.chunk(fk_namespace, quill_doc, fk_text, fk_entity_version, metadata)
  -- Select all chunks of sandbox project
  SELECT
    pk_new_default_namespace AS fk_namespace,
    t2.quill_doc,
    t4.pk_text,
    1 AS fk_entity_version,
    jsonb_build_object('fk_cloned_from', t2.pk_entity)
  FROM
    data.namespace t1,
    data.chunk t2,
    data.digital t3,
    data.digital t4
  WHERE
    t1.fk_project = pk_project
    AND t1.pk_entity = t2.fk_namespace
    AND t3.pk_text = t2.fk_text
    AND (t4.metadata ->> 'fk_cloned_from')::int = t3.pk_entity;

  /*
   * copy statements pointing to chunks, using the pk_entity of the above created, where fk_cloned_from
   * and add them to the project
   */
  INSERT INTO information.statement(fk_subject_info, fk_subject_data, fk_subject_tables_cell, fk_subject_tables_row, fk_property, fk_property_of_property, fk_object_info, fk_object_data, fk_object_tables_cell, fk_object_tables_row, metadata)
  -- select statements pointing to the new chunk's fk_cloned_from
  SELECT
    coalesce(t2.fk_subject_info, 0),
    t3.pk_entity AS fk_subject_data, -- pk of new chunk
    coalesce(t2.fk_subject_tables_cell, 0),
    coalesce(t2.fk_subject_tables_row, 0),
    coalesce(t2.fk_property, 0),
    coalesce(t2.fk_property_of_property, 0),
    coalesce(t2.fk_object_info, 0),
    coalesce(t2.fk_object_data, 0),
    coalesce(t2.fk_object_tables_cell, 0),
    coalesce(t2.fk_object_tables_row, 0),
    jsonb_build_object('fk_cloned_from', t2.pk_entity) -- keep track of original entity_asssociacion
  FROM
    projects.info_proj_rel t1,
    information.statement t2,
    data.chunk t3
  WHERE
    t1.fk_project = pk_project
    AND t1.is_in_project = TRUE
    AND t1.fk_entity = t2.pk_entity
    AND t2.fk_subject_data =(t3.metadata ->> 'fk_cloned_from')::int
    AND t3.fk_namespace = pk_new_default_namespace;
  -- make sure this is a chunk of this new project's namespace
  /*
   * Add the statements pointing to data to the new project
   */
  INSERT INTO projects.info_proj_rel(fk_entity, fk_project, is_in_project)
  SELECT
    t1.pk_entity AS fk_entity,
    pk_new_project AS fk_project,
    TRUE AS is_in_project
  FROM
    information.statement t1,
    data.entity t2
  WHERE
    t1.fk_subject_data = t2.pk_entity
    AND t2.fk_namespace = pk_new_default_namespace;

  /*
   * Clone all entity_previews from sandbox project
   * so that warehouse for this project is ready instantly
   */
  INSERT INTO war.entity_preview(pk_entity, fk_project, project, fk_class, entity_type, class_label, entity_label, time_span, fk_type, type_label, full_text, first_second, last_second, tmsp_last_modification)
  SELECT
    pk_entity,
    pk_new_project AS fk_project,
    pk_new_project AS project,
    fk_class,
    entity_type,
    class_label,
    entity_label,
    time_span,
    fk_type,
    type_label,
    full_text,
    first_second,
    last_second,
    tmsp_last_modification
  FROM
    war.entity_preview
  WHERE
    fk_project = pk_project
  ON CONFLICT ON CONSTRAINT war_entity_preview_unique
    DO NOTHING;

  /*
   * Clone analysis
   */
  INSERT INTO projects.analysis(fk_last_modifier, fk_project, fk_analysis_type, name, description, analysis_definition)
  SELECT
    fk_last_modifier,
    pk_new_project AS fk_project,
    fk_analysis_type,
    name,
    description,
    analysis_definition
  FROM
    projects.analysis
  WHERE
    fk_project = pk_project;
  RETURN pk_new_project;
END;
$$;

--
-- TOC entry 1304 (class 1255 OID 23934)
-- Name: clone_sandbox_project(integer); Type: FUNCTION; Schema: commons; Owner: -
--
CREATE FUNCTION commons.clone_sandbox_project(account_id integer)
  RETURNS void
  LANGUAGE plpgsql
  AS $$
DECLARE
  pk_sandbox_project int;
  fk_project_default_language int;
  fk_system_type__project_label int;
  fk_system_type__project_description int;
  project_label varchar;
  project_description varchar;
  pk_new_project int;
  pk_new_default_namespace int;
BEGIN
  -- pk_entity of the sandbox project
  pk_sandbox_project = 375232;
  -- default language = english
  fk_project_default_language = 18889;
  -- system type for project label
  fk_system_type__project_label = 639;
  -- system type for project description
  fk_system_type__project_description = 638;
  -- the label of the new project
  project_label = 'Sandbox Project';
  -- the description of the new project
  project_description = 'This is a sandbox project. You can use it to explore the functionalities of Geovistory BETA and experiment with them. Enjoy!';

  /*
   * create the project
   */
  INSERT INTO projects.project(fk_language, fk_cloned_from_project)
    VALUES (fk_project_default_language, pk_sandbox_project)
  ON CONFLICT
    DO NOTHING
  RETURNING
    pk_entity INTO pk_new_project;

  /*
   * add label of project
   */
  INSERT INTO projects.text_property(fk_project, fk_pro_project, string, fk_system_type, fk_language)
    VALUES (pk_new_project, pk_new_project, project_label, fk_system_type__project_label, fk_project_default_language);

  /*
   * add description of project
   */
  INSERT INTO projects.text_property(fk_project, fk_pro_project, string, fk_system_type, fk_language)
    VALUES (pk_new_project, pk_new_project, project_description, fk_system_type__project_description, fk_project_default_language);

  /*
   * add dfh profiles to project
   */
  INSERT INTO projects.dfh_profile_proj_rel(fk_project, fk_profile, enabled)
  SELECT
    pk_new_project AS fk_project,
    fk_profile,
    enabled
  FROM
    projects.dfh_profile_proj_rel
  WHERE
    fk_project = pk_sandbox_project;

  /*
   * add dfh classes to project
   */
  INSERT INTO projects.dfh_class_proj_rel(fk_project, fk_class, enabled_in_entities)
  SELECT
    pk_new_project AS fk_project,
    fk_class,
    enabled_in_entities
  FROM
    projects.dfh_class_proj_rel
  WHERE
    fk_project = pk_sandbox_project;

  /*
   * add default namespace to project
   */
  INSERT INTO data.namespace(fk_project, standard_label)
    VALUES (pk_new_project, 'Default Namespace')
  RETURNING
    pk_entity INTO pk_new_default_namespace;

  /*
   * add account to project
   */
  INSERT INTO public.account_project_rel(fk_project, account_id, ROLE)
    VALUES (pk_new_project, account_id, 'owner');

  /*
   * add all information to project except for statements referencing to data
   */
  WITH tw1 AS (
    /*
     * select all info_proj_rel of sandbox except those that are
     * referencing an statement associating entities in data schema
     */
    SELECT
      t1.pk_entity
    FROM
      projects.info_proj_rel t1
    WHERE
      fk_project = pk_sandbox_project
    EXCEPT
    SELECT
      t1.pk_entity
    FROM
      projects.info_proj_rel t1,
      information.statement t2
    WHERE
      fk_project = pk_sandbox_project
      AND t1.fk_entity = t2.pk_entity
      AND (t2.fk_subject_tables_cell != 0
        OR t2.fk_object_tables_cell != 0
        OR t2.fk_subject_tables_row != 0
        OR t2.fk_object_tables_row != 0
        OR t2.fk_subject_data != 0
        OR t2.fk_object_data != 0))
  INSERT INTO projects.info_proj_rel(fk_project, fk_entity, fk_entity_version, fk_entity_version_concat, is_in_project, is_standard_in_project, ord_num_of_domain, ord_num_of_range, ord_num_of_text_property, entity_version)
  SELECT
    pk_new_project AS fk_project,
    t1.fk_entity,
    t1.fk_entity_version,
    t1.fk_entity_version_concat,
    t1.is_in_project,
    t1.is_standard_in_project,
    t1.ord_num_of_domain,
    t1.ord_num_of_range,
    t1.ord_num_of_text_property,
    t1.entity_version
  FROM
    projects.info_proj_rel t1,
    tw1 t2
  WHERE
    t1.pk_entity = t2.pk_entity;

  /*
   * Clone all entity_previews from sandbox project
   * so that warehouse for this project is ready instantly
   */
  INSERT INTO war.entity_preview(pk_entity, fk_project, project, fk_class, entity_type, class_label, entity_label, time_span, fk_type, type_label, full_text, ts_vector, first_second, last_second, tmsp_last_modification, entity_id, parent_classes, ancestor_classes, project_id, type_id)
  SELECT
    pk_entity,
    pk_new_project AS fk_project,
    pk_new_project AS project,
    fk_class,
    entity_type,
    class_label,
    entity_label,
    time_span,
    fk_type,
    type_label,
    full_text,
    ts_vector,
    first_second,
    last_second,
    tmsp_last_modification,
    entity_id,
    parent_classes,
    ancestor_classes,
    project_id,
    type_id
  FROM
    war.entity_preview
  WHERE
    fk_project = pk_sandbox_project
  ON CONFLICT (entity_id,
    project_id)
    DO NOTHING;

  /*
   * Clone analysis
   */
  INSERT INTO projects.analysis(fk_last_modifier, fk_project, fk_analysis_type, name, description, analysis_definition)
  SELECT
    account_id AS fk_last_modifier,
    pk_new_project AS fk_project,
    fk_analysis_type,
    name,
    description,
    analysis_definition
  FROM
    projects.analysis
  WHERE
    fk_project = pk_sandbox_project;
END;
$$;

--
-- TOC entry 1254 (class 1255 OID 20841)
-- Name: create_entity_version_key(); Type: FUNCTION; Schema: commons; Owner: -
--
CREATE FUNCTION commons.create_entity_version_key()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  AS $$
BEGIN
  NEW.entity_version = 1;
  RETURN NEW;
END;
$$;

--
-- TOC entry 1255 (class 1255 OID 20842)
-- Name: evpr_fk_entity_fk_entity_version(); Type: FUNCTION; Schema: commons; Owner: -
--
CREATE FUNCTION commons.evpr_fk_entity_fk_entity_version()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  AS $$
DECLARE
  result text;
BEGIN
  -- Added if condition:
  -- only if there is a fk_entity_version_concat, generate fk_entity and fk_entity_version
  IF (NEW.fk_entity_version_concat IS NOT NULL) THEN
    NEW.fk_entity = split_part(NEW.fk_entity_version_concat, '_', 1)::integer;
    NEW.fk_entity_version = split_part(NEW.fk_entity_version_concat, '_', 2)::integer;
  END IF;
  RETURN NEW;
END;
$$;

--
-- TOC entry 1298 (class 1255 OID 23909)
-- Name: get_entity_appellation(integer); Type: FUNCTION; Schema: commons; Owner: -
--
CREATE FUNCTION commons.get_entity_appellation(pk_entity integer)
  RETURNS character varying
  LANGUAGE sql
  AS $_$
  SELECT
    t3.string
  FROM
    information.statement t1,
    information.statement t2,
    information.appellation t3
  WHERE
    t1.fk_object_info = $1
    AND t2.fk_subject_info = t1.fk_subject_info
    AND t2.fk_property = 1113
    AND t2.fk_object_info = t3.pk_entity;
$_$;

--
-- TOC entry 1337 (class 1255 OID 24967)
-- Name: get_entity_preview_table_name(); Type: FUNCTION; Schema: commons; Owner: -
--
CREATE FUNCTION commons.get_entity_preview_table_name()
  RETURNS text
  LANGUAGE plpgsql
  AS $$
DECLARE
  table_name text;
BEGIN
  SELECT
    substring(view_definition FROM 'FROM[[:space:]]+([[:alnum:]_\.]+)')
  FROM
    information_schema.views t1
  WHERE
    t1.table_schema = 'war'
    AND t1.table_name = 'entity_preview' INTO table_name;
  RETURN table_name;
END;
$$;

--
-- TOC entry 1317 (class 1255 OID 20843)
-- Name: init_entity_child_table(character varying); Type: FUNCTION; Schema: commons; Owner: -
--
CREATE FUNCTION commons.init_entity_child_table(schema_and_table_name character varying)
  RETURNS void
  LANGUAGE plpgsql
  AS $_$
DECLARE
  unique_constraint_name varchar;
BEGIN
  -- Create the name of the unique constraint that will be applied to the new table's pk_entity
  SELECT
    INTO unique_constraint_name replace(schema_and_table_name, '.', '_') _pk_entity_unique;
  -- Do the Magic:
  EXECUTE format( '

                  -- Add unique constraint to pk_entity of the new table, so that it can be referenced by foreign keys

                  ALTER TABLE %1$s ADD CONSTRAINT  %2$s_pk_entity_unique UNIQUE (pk_entity);

                  -- Trigger: creation_tmsp

                  CREATE TRIGGER creation_tmsp
                  BEFORE INSERT
                  ON %1$s
                  FOR EACH ROW
                  EXECUTE PROCEDURE commons.tmsp_creation();

                  -- Trigger: insert_schema_table_name

                  CREATE TRIGGER insert_schema_table_name
                  BEFORE INSERT
                  ON %1$s
                  FOR EACH ROW
                  EXECUTE PROCEDURE commons.insert_schema_table_name();

                  -- Trigger: last_modification_tmsp

                  CREATE TRIGGER last_modification_tmsp
                  BEFORE INSERT OR UPDATE
                  ON %1$s
                  FOR EACH ROW
                  EXECUTE PROCEDURE commons.tmsp_last_modification();

                  -- Table: <schema_and_table_name>_vt

                  CREATE TABLE %1$s_vt (LIKE %1$s);

                  -- Trigger: versioning_trigger

                  CREATE TRIGGER versioning_trigger
                  BEFORE INSERT OR UPDATE OR DELETE ON %1$s
                  FOR EACH ROW EXECUTE PROCEDURE versioning(
                  "sys_period", ''%1$s_vt'', true
                  );'
, schema_and_table_name, unique_constraint_name);
END
$_$;

--
-- TOC entry 1256 (class 1255 OID 20844)
-- Name: init_version_table(character varying); Type: FUNCTION; Schema: commons; Owner: -
--
CREATE FUNCTION commons.init_version_table(schema_and_table_name character varying)
  RETURNS void
  LANGUAGE plpgsql
  AS $_$
BEGIN
  -- Do the Magic:
  EXECUTE format( '	

        ALTER TABLE %1$s ADD COLUMN IF NOT EXISTS 
          sys_period tstzrange DEFAULT tstzrange(now(), NULL::timestamp with time zone);
          
        -- Table: <schema_and_table_name>_vt

        CREATE TABLE %1$s_vt (LIKE %1$s);

        -- Trigger: versioning_trigger

        CREATE TRIGGER versioning_trigger
        BEFORE INSERT OR UPDATE OR DELETE ON %1$s
        FOR EACH ROW EXECUTE PROCEDURE versioning(
        "sys_period", ''%1$s_vt'', true
        );

        -- Trigger: create_entity_version_key

        CREATE TRIGGER create_entity_version_key
        BEFORE INSERT
        ON %1$s
        FOR EACH ROW
        EXECUTE PROCEDURE commons.create_entity_version_key();

        -- Trigger: update_entity_version_key

        CREATE TRIGGER update_entity_version_key
        BEFORE UPDATE
        ON %1$s
        FOR EACH ROW
        EXECUTE PROCEDURE commons.update_entity_version_key();'
, schema_and_table_name);
END
$_$;

--
-- TOC entry 1257 (class 1255 OID 20845)
-- Name: insert_schema_table_name(); Type: FUNCTION; Schema: commons; Owner: -
--
CREATE FUNCTION commons.insert_schema_table_name()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  AS $$
  -- source https://www.postgresql.org/docs/current/static/plpgsql-trigger.html
BEGIN
  NEW.schema_name = TG_TABLE_SCHEMA;
  NEW.table_name = TG_TABLE_NAME;
  RETURN NEW;
END;
$$;

--
-- TOC entry 1296 (class 1255 OID 23908)
-- Name: isnumeric(text); Type: FUNCTION; Schema: commons; Owner: -
--
CREATE FUNCTION commons.isnumeric(text)
  RETURNS boolean
  LANGUAGE plpgsql
  IMMUTABLE STRICT
  AS $_$
DECLARE
  x numeric;
BEGIN
  x = $1::numeric;
  RETURN TRUE;
EXCEPTION
  WHEN OTHERS THEN
    RETURN FALSE;
END;

$_$;

--
-- TOC entry 1294 (class 1255 OID 23950)
-- Name: julian_cal__add_1_month(integer); Type: FUNCTION; Schema: commons; Owner: -
--
CREATE FUNCTION commons.julian_cal__add_1_month(julian_day integer)
  RETURNS integer
  LANGUAGE plpgsql
  AS $$
DECLARE
  x year_month_day;
  is_leap boolean;
  days_in_month int[];
BEGIN
  SELECT
    *
  FROM
    commons.julian_cal__year_month_day(julian_day) INTO x;
  is_leap = commons.julian_cal__is_leap_year(x.year);
  IF (is_leap = FALSE) THEN
    days_in_month = ARRAY[31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  ELSE
    days_in_month = ARRAY[31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  END IF;
  RETURN julian_day + days_in_month[x.month];
END;
$$;

--
-- TOC entry 1301 (class 1255 OID 23938)
-- Name: julian_cal__add_1_year(integer); Type: FUNCTION; Schema: commons; Owner: -
--
CREATE FUNCTION commons.julian_cal__add_1_year(julian_day integer)
  RETURNS integer
  LANGUAGE plpgsql
  AS $$
DECLARE
  _year integer;
BEGIN
  SELECT
    year INTO _year
  FROM
    commons.julian_cal__year_and_day_of_year(julian_day);
  IF (_year % 4) = 0 THEN
    RETURN julian_day + 366;
  ELSE
    RETURN julian_day + 365;
  END IF;
END;
$$;

--
-- TOC entry 1299 (class 1255 OID 23936)
-- Name: julian_cal__is_leap_year(integer); Type: FUNCTION; Schema: commons; Owner: -
--
CREATE FUNCTION commons.julian_cal__is_leap_year(year integer)
  RETURNS boolean
  LANGUAGE plpgsql
  AS $$
BEGIN
  -- year is the year BC: no year 0.
  IF(year > 0) THEN
    -- if devisable by 4 without remainder
    RETURN((year % 4) = 0);
  ELSE
    -- if devisable by 4 without remainder = -1
    RETURN((year % 4) = - 1);
  END IF;
END;
$$;

--
-- TOC entry 1302 (class 1255 OID 23939)
-- Name: julian_cal__month_and_day_of_month(integer, integer); Type: FUNCTION; Schema: commons; Owner: -
--
CREATE FUNCTION commons.julian_cal__month_and_day_of_month(year integer, day_of_year integer)
  RETURNS TABLE(
    month integer,
    day_of_month integer)
  LANGUAGE plpgsql
  AS $$
DECLARE
  -- true, if year is a leap year according to julian calendar
  is_leap boolean;
  -- month corrections (note that january has index 0)
  month_correnctions int[];
  -- month correction
  mc int;
  -- leap year correction
  lc int;
  -- resulting month, one-based (begins with 1)
  month int;
  -- resulting day of month, one-based (begins with 1)
  day_of_month int;
BEGIN
  -- leap year
  is_leap = commons.julian_cal__is_leap_year(year);
  -- month corrections (note that january has index 0)
  month_correnctions = ARRAY[-1, 0, -2, -1, -1, 0, 0, 1, +2, +2, +3, +3];
  -- resulting month
  month = floor((day_of_year + 1) / 30::numeric) + 1;
  -- month correction
  mc = month_correnctions[month];
  -- leap year correction
  IF (is_leap = TRUE AND month > 2) THEN
    lc = 1;
  ELSE
    lc = 0;
  END IF;
  -- resulting day
  day_of_month = day_of_year - 30 *(month - 1) -(lc + mc);
  -- check if month and day still valid
  IF (month > 12 OR day_of_month < 1) THEN
    month = month - 1;
    IF (month < 1) THEN
      is_leap = NOT is_leap;
    END IF;
    -- leap year correction
    IF (is_leap = TRUE AND month > 2) THEN
      lc = 1;
    ELSE
      lc = 0;
    END IF;
    -- month correction
    mc = month_correnctions[month];
    -- resulting day
    day_of_month = day_of_year - 30 *(month - 1) -(lc + mc);
  END IF;
  RETURN QUERY
  SELECT
    month,
    day_of_month;
END;
$$;

--
-- TOC entry 1300 (class 1255 OID 23937)
-- Name: julian_cal__year_and_day_of_year(integer); Type: FUNCTION; Schema: commons; Owner: -
--
CREATE FUNCTION commons.julian_cal__year_and_day_of_year(julian_day integer)
  RETURNS TABLE(
    year integer,
    day_of_year integer)
  LANGUAGE plpgsql
  AS $$
DECLARE
  -- number of full 4 year cycles
  n4 integer;
  -- number of days of the last uncomplete 4 years cycle
  r4 integer;
  -- number of full years of the last uncomplete 4 years cycle
  n1 integer;
  -- number of days in the last year, zero-based (begins with 0)
  day_of_year integer;
  -- number of years (counted from julian year 0 (=4713 BC))
  julian_year integer;
  -- year in christian counting
  year integer;
BEGIN
  /*
   * Inspired by
   * https://de.wikipedia.org/wiki/Umrechnung_zwischen_julianischem_Datum_und_julianischem_Kalender
   */
  -- number of full 4 year cycles
  n4 = floor((julian_day +(3 * 365)) / 1461::numeric)::integer;
  -- number of days of the last uncomplete 4 years cycle
  r4 =(julian_day +(3 * 365)) % 1461;
  -- number of full years of the last uncomplete 4 years cycle
  n1 = floor(r4 / 365::numeric);
  -- number of days in the last year
  day_of_year = r4 % 365;
  IF (n1 = 4) THEN
    n1 = 3;
    day_of_year = 365;
  END IF;
  -- number of years (counted from julian year 0 (=4713 BC))
  julian_year = 4 * n4 + n1;
  -- if BC
  IF (julian_year <= 4715) THEN
    -- resulting year
    year = julian_year - 4716;
    -- if AD
  ELSE
    year = julian_year - 4715;
  END IF;
  RETURN QUERY(
    SELECT
      year, day_of_year);
END;
$$;

--
-- TOC entry 1303 (class 1255 OID 23946)
-- Name: julian_cal__year_month_day(integer); Type: FUNCTION; Schema: commons; Owner: -
--
CREATE FUNCTION commons.julian_cal__year_month_day(julian_day integer)
  RETURNS TABLE(
    year integer,
    month integer,
    day integer)
  LANGUAGE plpgsql
  AS $$
DECLARE
  -- year and day_of_year according to julian calendar
  y year_and_day_of_year;
  -- month and day_of_month according to julian calendar
  m month_and_day_of_month;
BEGIN
  SELECT
    *
  FROM
    commons.julian_cal__year_and_day_of_year(julian_day) INTO y;
  SELECT
    *
  FROM
    commons.julian_cal__month_and_day_of_month(y.year, y.day_of_year) INTO m;
  RETURN QUERY
  SELECT
    y.year,
    m.month,
    m.day_of_month;
END;
$$;

--
-- TOC entry 1307 (class 1255 OID 24025)
-- Name: julian_second__to_iso_8601(bigint); Type: FUNCTION; Schema: commons; Owner: -
--
CREATE FUNCTION commons.julian_second__to_iso_8601(julian_second bigint)
  RETURNS text
  LANGUAGE sql
  AS $$
  SELECT
    to_char((('J' ||(julian_second / 86400)::text)::timestamp +(julian_second % 86400) * interval '1 second'), 'YYYY-MM-DD"T"HH24:MI:SS"Z"')
$$;

--
-- TOC entry 1258 (class 1255 OID 20846)
-- Name: make_table_child_of_text(character varying, character varying); Type: FUNCTION; Schema: commons; Owner: -
--
CREATE FUNCTION commons.make_table_child_of_text(schema_and_table_name character varying, parent_table_name character varying)
  RETURNS void
  LANGUAGE plpgsql
  AS $_$
BEGIN
  -- Do the Magic:
  EXECUTE format( '	
        ------ PREPARE THE TABLE
            
        UPDATE %1$s SET entity_version = 1 WHERE entity_version IS NULL;

        ALTER TABLE %1$s ALTER COLUMN entity_version SET NOT NULL;

        -- SET schema_name NOT NULL
        ALTER TABLE %1$s ALTER COLUMN schema_name SET NOT NULL;

        -- SET table_name NOT NULL
        ALTER TABLE %1$s ALTER COLUMN table_name SET NOT NULL;

        -- Add the column for the pk_text and fill the new pk_text column
        ALTER TABLE %1$s
        ADD COLUMN pk_text integer NOT NULL DEFAULT nextval(''commons.text_pk_text_seq'');

        -- Add the column for quill_doc and fill it with empty QuillDoc
        ALTER TABLE %1$s ADD COLUMN quill_doc jsonb;
        UPDATE %1$s SET quill_doc = jsonb_build_object(''latestId'', 0, ''ops'', ARRAY[]::integer[]) WHERE quill_doc IS NULL;
        ALTER TABLE %1$s ALTER COLUMN quill_doc SET NOT NULL;  

        -- Add the schema validation check
        ALTER TABLE %1$s
        ADD CONSTRAINT text_quill_doc_check CHECK (commons.validate_quill_doc(quill_doc));

        -- Add the column for string and fill with empty string
        ALTER TABLE %1$s  ADD COLUMN string text DEFAULT '''';
        UPDATE %1$s SET string = '''' WHERE string IS NULL;
        ALTER TABLE %1$s ALTER COLUMN string SET NOT NULL;  

        ---- SET THE INHERITANCE
        ALTER TABLE %1$s
        INHERIT commons.%2$s;

      '
, schema_and_table_name, parent_table_name);
END
$_$;

--
-- TOC entry 1259 (class 1255 OID 20847)
-- Name: make_versioned_table_child_of_text(character varying); Type: FUNCTION; Schema: commons; Owner: -
--
CREATE FUNCTION commons.make_versioned_table_child_of_text(schema_and_table_name character varying)
  RETURNS void
  LANGUAGE plpgsql
  AS $_$
BEGIN
  PERFORM
    commons.make_table_child_of_text(schema_and_table_name, 'text');
  PERFORM
    commons.make_table_child_of_text(schema_and_table_name || '_vt', 'text_vt');
  EXECUTE format( '	
        -- Create trigger for syncing quill_doc and string
        CREATE TRIGGER sync_quill_doc_and_string
        BEFORE INSERT OR UPDATE
        ON %1$s
        FOR EACH ROW
        EXECUTE PROCEDURE commons.text__sync_quill_doc_and_string();
    '
, schema_and_table_name);
END
$_$;

--
-- TOC entry 1260 (class 1255 OID 20848)
-- Name: modernize_quill_doc(jsonb); Type: FUNCTION; Schema: commons; Owner: -
--
CREATE FUNCTION commons.modernize_quill_doc(orig jsonb)
  RETURNS jsonb
  LANGUAGE plpgsql
  IMMUTABLE
  AS $$
DECLARE
  newJ jsonb;
  latestId int;
  newOps jsonb;
  oldOp jsonb;
  char text;
BEGIN
  newOps = jsonb_build_array();
  latestId = 0;
  -- LOOP over ops
  FOR oldOp IN
  SELECT
    *
  FROM
    jsonb_array_elements((orig -> 'contents' ->> 'ops')::jsonb)
    LOOP
      RAISE NOTICE 'Parsing Item % % %', oldOp ->> 'insert', oldOp ->> 'attributes',(
        SELECT
          char_length(oldOp ->> 'insert') > 1);
      -- LOOP over insert characters
      FOREACH char IN ARRAY (
        SELECT
          chars
        FROM (
          SELECT
            regexp_split_to_array(oldOp ->> 'insert', '')) AS x(chars))
        LOOP
          latestId = latestId + 1;
          IF char = E'\n' THEN
            newOps = newOps || jsonb_build_object('insert', char, 'attributes', jsonb_set(COALESCE(oldOp -> 'attributes', '{}'::jsonb), '{blockid}'::text[], to_json(latestId::text)::jsonb));
          ELSE
            newOps = newOps || jsonb_build_object('insert', char, 'attributes', jsonb_set(COALESCE(oldOp -> 'attributes', '{}'::jsonb) - 'node', '{charid}'::text[], to_json(latestId::text)::jsonb));
          END IF;
        END LOOP;
    END LOOP;
  RAISE NOTICE 'New Ops: %', newOps;
  newJ = jsonb_build_object('latestId', latestId, 'ops', newOps);
  RETURN newJ;
END;
$$;

--
-- TOC entry 1261 (class 1255 OID 20849)
-- Name: move_entity_child_with_vt_to_schema(character varying, character varying, character varying); Type: FUNCTION; Schema: commons; Owner: -
--
CREATE FUNCTION commons.move_entity_child_with_vt_to_schema(table_name character varying, old_schema character varying, new_schema character varying)
  RETURNS void
  LANGUAGE plpgsql
  AS $_$
BEGIN
  -- Do the Magic:
  EXECUTE format( '	
        -- MOVE TABLES
        ALTER TABLE %2$s.%1$s SET SCHEMA %3$s;
        ALTER TABLE %2$s.%1$s_vt SET SCHEMA %3$s;

        -- REINIT VERSIONING TRIGGERS
        SELECT commons.reinit_versioning_triggers(''%3$s.%1$s'');

        -- CHANGE PARENT ENTITY TABLE
        SELECT commons.change_parent_entity_table(''%3$s.%1$s'', ''%2$s.entity'', ''%3$s.entity'')
      '
, table_name, old_schema, new_schema);
END
$_$;

--
-- TOC entry 1319 (class 1255 OID 24512)
-- Name: notify_modification_trigger(); Type: FUNCTION; Schema: commons; Owner: -
--
CREATE FUNCTION commons.notify_modification_trigger()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  AS $$
BEGIN
  -- Notify the channel, e.g.: "modified_projects_text_property"
  PERFORM
    pg_notify('modified_' || TG_TABLE_SCHEMA || '_' || TG_TABLE_NAME, now()::text);
  RETURN NEW;
END;
$$;

--
-- TOC entry 1262 (class 1255 OID 20850)
-- Name: quill_doc_to_string(jsonb); Type: FUNCTION; Schema: commons; Owner: -
--
CREATE FUNCTION commons.quill_doc_to_string(text_property_quill_doc jsonb, OUT string text)
  RETURNS text
  LANGUAGE sql
  AS $$
  SELECT
    TRIM(TRAILING E'
' FROM STRING_AGG(l.ops->>'insert', ''))
FROM(
  SELECT
    jsonb_array_elements(text_property_quill_doc -> 'ops') AS ops) AS l
$$;

--
-- TOC entry 1263 (class 1255 OID 20851)
-- Name: reinit_versioning_triggers(character varying, character varying); Type: FUNCTION; Schema: commons; Owner: -
--
CREATE FUNCTION commons.reinit_versioning_triggers(schema_and_table_name character varying, schema_and_table_vt_name character varying DEFAULT NULL::character varying)
  RETURNS void
  LANGUAGE plpgsql
  AS $_$
BEGIN
  IF schema_and_table_vt_name IS NULL THEN
    schema_and_table_vt_name = schema_and_table_name || '_vt';
  END IF;
  -- Do the Magic:
  EXECUTE format( '	

        -- Trigger: versioning_trigger

        DROP TRIGGER IF EXISTS versioning_trigger ON %1$s;
        CREATE TRIGGER versioning_trigger
        BEFORE INSERT OR UPDATE OR DELETE ON %1$s
        FOR EACH ROW EXECUTE PROCEDURE versioning(
        "sys_period", ''%2$s'', true
        );

        -- Trigger: create_entity_version_key

        DROP TRIGGER IF EXISTS create_entity_version_key ON %1$s;
        CREATE TRIGGER create_entity_version_key
        BEFORE INSERT
        ON %1$s
        FOR EACH ROW
        EXECUTE PROCEDURE commons.create_entity_version_key();

        -- Trigger: update_entity_version_key

        DROP TRIGGER IF EXISTS update_entity_version_key ON %1$s;
        CREATE TRIGGER update_entity_version_key
        BEFORE UPDATE
        ON %1$s
        FOR EACH ROW
        EXECUTE PROCEDURE commons.update_entity_version_key();'
, schema_and_table_name, schema_and_table_vt_name);
END
$_$;

--
-- TOC entry 1264 (class 1255 OID 20852)
-- Name: rename_versioned_table(character varying, character varying, character varying); Type: FUNCTION; Schema: commons; Owner: -
--
CREATE FUNCTION commons.rename_versioned_table(schema character varying, old_table_name character varying, new_table_name character varying)
  RETURNS void
  LANGUAGE plpgsql
  AS $_$
BEGIN
  -- Do the Magic:
  EXECUTE format('	
        ALTER TABLE %1$s.%2$s RENAME TO %3$s;
        ALTER TABLE %1$s.%2$s_vt RENAME TO %3$s_vt;
        SELECT commons.reinit_versioning_triggers(''%1$s.%3$s'');
      ', schema, old_table_name, new_table_name);
END
$_$;

--
-- TOC entry 1284 (class 1255 OID 20853)
-- Name: string_to_quill_doc(text); Type: FUNCTION; Schema: commons; Owner: -
--
CREATE FUNCTION commons.string_to_quill_doc(text text)
  RETURNS jsonb
  LANGUAGE plpgsql
  IMMUTABLE
  AS $$
DECLARE
  latestId int;
  ops jsonb;
  char text;
BEGIN
  ops = jsonb_build_array();
  latestId = 1;
  -- LOOP over text characters
  FOREACH char IN ARRAY (
    SELECT
      CASE WHEN chars = ARRAY[''] THEN
        ARRAY[]::text[]
      ELSE
        chars
      END
    FROM (
      SELECT
        regexp_split_to_array(text, '')) AS x(chars))
    LOOP
      IF char = E'\n' THEN
        ops = ops || jsonb_build_object('insert', char, 'attributes', jsonb_build_object('blockid', to_json(latestId::text)::jsonb));
      ELSE
        ops = ops || jsonb_build_object('insert', char, 'attributes', jsonb_build_object('charid', to_json(latestId::text)::jsonb));
      END IF;
      latestId = latestId + 1;
    END LOOP;
  ops = ops || jsonb_build_object('insert', E'\n', 'attributes', jsonb_build_object('blockid', to_json(latestId::text)::jsonb));
  RETURN jsonb_build_object('latestId', latestId, 'ops', ops);
END;
$$;

--
-- TOC entry 1268 (class 1255 OID 20854)
-- Name: text__sync_quill_doc_and_string(); Type: FUNCTION; Schema: commons; Owner: -
--
CREATE FUNCTION commons.text__sync_quill_doc_and_string()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  AS $$
DECLARE
  string_is_new boolean;
  quill_doc_is_new boolean;
BEGIN
  IF TG_OP = 'UPDATE' THEN
    string_is_new =(NEW.string IS NOT NULL
      AND NEW.string != OLD.string);
    quill_doc_is_new =(NEW.quill_doc IS NOT NULL
      AND NEW.quill_doc != OLD.quill_doc);
  ELSE
    string_is_new =(NEW.string IS NOT NULL);
    quill_doc_is_new =(NEW.quill_doc IS NOT NULL);
  END IF;
  -- If both string and quill_doc are NOT NULL, raise exception
  IF (string_is_new = TRUE AND quill_doc_is_new = TRUE) THEN
    RAISE EXCEPTION 'You can not provide a string and a quill_doc at the same time when upserting a text.';
    -- If only string is NOT NULL create quill_doc
  ELSIF string_is_new = TRUE THEN
    NEW.quill_doc = commons.string_to_quill_doc(NEW.string);
    -- If only quill_doc is NOT NULL create string
  ELSIF quill_doc_is_new = TRUE THEN
    NEW.string = commons.quill_doc_to_string(NEW.quill_doc);
    -- If both string and quill_doc are NULL, do nothing
  END IF;
  RETURN NEW;
END;
$$;

--
-- TOC entry 1295 (class 1255 OID 23951)
-- Name: time_primitive__get_first_second(integer); Type: FUNCTION; Schema: commons; Owner: -
--
CREATE FUNCTION commons.time_primitive__get_first_second(julian_day integer)
  RETURNS bigint
  LANGUAGE sql
  AS $$
  SELECT
(julian_day::bigint * 86400::bigint);
    -- 86400 = 60 * 60 * 24 = number of seconds per day
$$;

--
-- TOC entry 1305 (class 1255 OID 23952)
-- Name: time_primitive__get_last_second(integer, public.calendar_granularities, public.calendar_type); Type: FUNCTION; Schema: commons; Owner: -
--
CREATE FUNCTION commons.time_primitive__get_last_second(julian_day integer, duration public.calendar_granularities, calendar public.calendar_type)
  RETURNS bigint
  LANGUAGE plpgsql
  AS $$
DECLARE
  day_after_added_duration int;
BEGIN
  IF (calendar IS NULL) THEN
    RAISE WARNING 'No calendar provided';
    IF (julian_day < 2299161) THEN
      calendar = 'julian';
    ELSE
      calendar = 'gregorian';
    END IF;
  END IF;
  IF (calendar = 'gregorian') THEN
    IF (duration = '1 day') THEN
      SELECT
        julian_day + 1 INTO day_after_added_duration;
    ELSIF (duration = '1 month') THEN
      SELECT
        to_char((('J' || julian_day::text)::date + INTERVAL '1 month'), 'J') INTO day_after_added_duration;
    ELSIF (duration = '1 year') THEN
      SELECT
        to_char((('J' || julian_day::text)::date + INTERVAL '1 year'), 'J') INTO day_after_added_duration;
    ELSE
      RAISE EXCEPTION 'duration not supported --> %', duration
        USING HINT = 'Supported durations: "1 day", "1 month", "1 year"';
      END IF;
    ELSIF (calendar = 'julian') THEN
      IF (duration = '1 day') THEN
        SELECT
          julian_day + 1 INTO day_after_added_duration;
      ELSIF (duration = '1 month') THEN
        SELECT
          commons.julian_cal__add_1_month(julian_day) INTO day_after_added_duration;
      ELSIF (duration = '1 year') THEN
        SELECT
          commons.julian_cal__add_1_year(julian_day) INTO day_after_added_duration;
      ELSE
        RAISE EXCEPTION 'duration not supported --> %', duration
          USING HINT = 'Supported durations: "1 day", "1 month", "1 year"';
        END IF;
      ELSE
        RAISE EXCEPTION 'calendar not supported --> %', calendar
          USING HINT = 'Supported calendars: "gregorian", "julian"';
        END IF;
        -- calculate the first second of the day after the added duration and subtract one second
        -- so that we get the last second of the duration
        RETURN commons.time_primitive__get_first_second(day_after_added_duration) - 1;
END;
$$;

--
-- TOC entry 1321 (class 1255 OID 24580)
-- Name: time_primitive__get_to_day(integer, public.calendar_granularities, public.calendar_type); Type: FUNCTION; Schema: commons; Owner: -
--
CREATE FUNCTION commons.time_primitive__get_to_day(julian_day integer, duration public.calendar_granularities, calendar public.calendar_type)
  RETURNS integer
  LANGUAGE plpgsql
  AS $$
DECLARE
  day_after_added_duration int;
BEGIN
  IF (calendar IS NULL) THEN
    RAISE WARNING 'No calendar provided';
    IF (julian_day < 2299161) THEN
      calendar = 'julian';
    ELSE
      calendar = 'gregorian';
    END IF;
  END IF;
  IF (calendar = 'gregorian') THEN
    IF (duration = '1 day') THEN
      SELECT
        julian_day + 1 INTO day_after_added_duration;
    ELSIF (duration = '1 month') THEN
      SELECT
        to_char((('J' || julian_day::text)::date + INTERVAL '1 month'), 'J') INTO day_after_added_duration;
    ELSIF (duration = '1 year') THEN
      SELECT
        to_char((('J' || julian_day::text)::date + INTERVAL '1 year'), 'J') INTO day_after_added_duration;
    ELSE
      RAISE EXCEPTION 'duration not supported --> %', duration
        USING HINT = 'Supported durations: "1 day", "1 month", "1 year"';
      END IF;
    ELSIF (calendar = 'julian') THEN
      IF (duration = '1 day') THEN
        SELECT
          julian_day + 1 INTO day_after_added_duration;
      ELSIF (duration = '1 month') THEN
        SELECT
          commons.julian_cal__add_1_month(julian_day) INTO day_after_added_duration;
      ELSIF (duration = '1 year') THEN
        SELECT
          commons.julian_cal__add_1_year(julian_day) INTO day_after_added_duration;
      ELSE
        RAISE EXCEPTION 'duration not supported --> %', duration
          USING HINT = 'Supported durations: "1 day", "1 month", "1 year"';
        END IF;
      ELSE
        RAISE EXCEPTION 'calendar not supported --> %', calendar
          USING HINT = 'Supported calendars: "gregorian", "julian"';
        END IF;
        RETURN day_after_added_duration;
END;
$$;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 233 (class 1259 OID 20867)
-- Name: entity; Type: TABLE; Schema: information; Owner: -
--
CREATE TABLE information.entity(
  pk_entity integer NOT NULL,
  schema_name character varying NOT NULL,
  table_name character varying NOT NULL,
  notes text,
  fk_creator integer,
  fk_last_modifier integer,
  tmsp_creation timestamp with time zone DEFAULT now(),
  tmsp_last_modification timestamp with time zone,
  sys_period tstzrange DEFAULT tstzrange(now(), NULL::timestamp with time zone),
  metadata jsonb
);

--
-- TOC entry 302 (class 1259 OID 21439)
-- Name: time_primitive; Type: TABLE; Schema: information; Owner: -
--
CREATE TABLE information.time_primitive(
  duration public.calendar_granularities,
  fk_class integer,
  julian_day integer,
  calendar public.calendar_type NOT NULL
)
INHERITS (
  information.entity
);

--
-- TOC entry 1316 (class 1255 OID 24695)
-- Name: time_primitive__pretty_json(information.time_primitive); Type: FUNCTION; Schema: commons; Owner: -
--
CREATE FUNCTION commons.time_primitive__pretty_json(time_primitive information.time_primitive)
  RETURNS jsonb
  LANGUAGE plpgsql
  AS $$
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
    to_char((('J' || from_day)::timestamp), 'YYYY-MM-DD') INTO from_gregorian_cal;
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
    to_char((('J' || to_day)::timestamp), 'YYYY-MM-DD') INTO to_gregorian_cal;
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
$$;

--
-- TOC entry 1322 (class 1255 OID 24581)
-- Name: time_primitive__pretty_json(information.time_primitive, public.calendar_type); Type: FUNCTION; Schema: commons; Owner: -
--
CREATE FUNCTION commons.time_primitive__pretty_json(time_primitive information.time_primitive, calendar public.calendar_type)
  RETURNS jsonb
  LANGUAGE plpgsql
  AS $$
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
    to_char((('J' || from_day)::timestamp), 'YYYY-MM-DD') INTO from_gregorian_cal;
  SELECT
    commons.julian_second__to_iso_8601(from_second) INTO from_gregorian_cal_iso8601;
  SELECT
    commons.time_primitive__get_to_day(from_day, time_primitive.duration, calendar) INTO to_day;
  SELECT
    commons.time_primitive__get_first_second(to_day) INTO to_second;
  SELECT
    concat(to_char(t.year, 'fm0000'), '-', to_char(t.month, 'fm00'), '-', to_char(t.day, 'fm00')) INTO to_julian_cal
  FROM
    commons.julian_cal__year_month_day(to_day) t;
  SELECT
    to_char((('J' || to_day)::timestamp), 'YYYY-MM-DD') INTO to_gregorian_cal;
  SELECT
    commons.julian_second__to_iso_8601(to_second) INTO to_gregorian_cal_iso8601;
  SELECT
    CASE WHEN calendar = 'gregorian' THEN
      concat(from_gregorian_cal, ' (', time_primitive.duration, ')')
    ELSE
      concat(from_julian_cal, ' (', time_primitive.duration, ')')
    END INTO label;
  RETURN jsonb_build_object('pkEntity', time_primitive.pk_entity, 'fkClass', time_primitive.fk_class, 'julianDay', time_primitive.julian_day, 'duration', time_primitive.duration, 'calendar', calendar::text, 'label', label, 'from', jsonb_build_object('julianDay', from_day, 'julianSecond', from_second, 'calGregorian', from_gregorian_cal, 'calGregorianIso8601', from_gregorian_cal_iso8601, 'calJulian', from_julian_cal), 'to', jsonb_build_object('julianDay', to_day, 'julianSecond', to_second, 'calGregorian', to_gregorian_cal, 'calGregorianIso8601', to_gregorian_cal_iso8601, 'calJulian', to_julian_cal));
END;
$$;

--
-- TOC entry 1265 (class 1255 OID 20855)
-- Name: tmsp_creation(); Type: FUNCTION; Schema: commons; Owner: -
--
CREATE FUNCTION commons.tmsp_creation()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  AS $$
BEGIN
  NEW.tmsp_creation = NOW();
  RETURN NEW;
END;
$$;

--
-- TOC entry 1266 (class 1255 OID 20856)
-- Name: tmsp_last_modification(); Type: FUNCTION; Schema: commons; Owner: -
--
CREATE FUNCTION commons.tmsp_last_modification()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  AS $$
BEGIN
  NEW.tmsp_last_modification = NOW();
  RETURN NEW;
END;
$$;

--
-- TOC entry 1269 (class 1255 OID 20857)
-- Name: unmake_change_fk_reference_of_versioned_table(character varying, character varying, character varying); Type: FUNCTION; Schema: commons; Owner: -
--
CREATE FUNCTION commons.unmake_change_fk_reference_of_versioned_table(schema_name character varying, table_name character varying, fk_column character varying)
  RETURNS void
  LANGUAGE plpgsql
  AS $_$
BEGIN
  EXECUTE format( '
      
    DROP TRIGGER IF EXISTS creation_tmsp ON %1$s.%2$s;
    DROP TRIGGER IF EXISTS insert_schema_table_name ON %1$s.%2$s;
    DROP TRIGGER IF EXISTS last_modification_tmsp ON %1$s.%2$s;

    DROP TRIGGER IF EXISTS versioning_trigger ON %1$s.%2$s;
    DROP TRIGGER IF EXISTS create_entity_version_key ON %1$s.%2$s;
    DROP TRIGGER IF EXISTS update_entity_version_key ON %1$s.%2$s;

    -- table_vt
    ALTER TABLE %1$s.%2$s_vt DROP CONSTRAINT %2$s_vt_%3$s_fkey;
    UPDATE %1$s.%2$s_vt
    SET %3$s = _deprecated_%3$s;
    ALTER TABLE %1$s.%2$s_vt DROP COLUMN %3$s;
    ALTER TABLE %1$s.%2$s_vt RENAME COLUMN _deprecated_%3$s TO %3$s;

    -- table
    ALTER TABLE %1$s.%2$s DROP CONSTRAINT %2$s_%3$s_fkey;
    UPDATE %1$s.%2$s
    SET %3$s = _deprecated_%3$s;
    ALTER TABLE %1$s.%2$s DROP COLUMN %3$s;
    ALTER TABLE %1$s.%2$s RENAME COLUMN _deprecated_%3$s TO %3$s;


    SELECT commons.reinit_versioning_triggers(''%1$s.%2$s'');

    -- Trigger: creation_tmsp
    CREATE TRIGGER creation_tmsp
        BEFORE INSERT
        ON %1$s.%2$s
        FOR EACH ROW
        EXECUTE PROCEDURE commons.tmsp_creation();

    -- Trigger: insert_schema_table_name
    CREATE TRIGGER insert_schema_table_name
        BEFORE INSERT
        ON %1$s.%2$s
        FOR EACH ROW
        EXECUTE PROCEDURE commons.insert_schema_table_name();

    -- Trigger: last_modification_tmsp
    CREATE TRIGGER last_modification_tmsp
        BEFORE INSERT OR UPDATE 
        ON %1$s.%2$s
        FOR EACH ROW
        EXECUTE PROCEDURE commons.tmsp_last_modification();
    '
, schema_name, table_name, fk_column);
END
$_$;

--
-- TOC entry 1270 (class 1255 OID 20858)
-- Name: unmake_table_child_of_text(character varying, character varying); Type: FUNCTION; Schema: commons; Owner: -
--
CREATE FUNCTION commons.unmake_table_child_of_text(schema_and_table_name character varying, parent_table_name character varying)
  RETURNS void
  LANGUAGE plpgsql
  AS $_$
BEGIN
  EXECUTE format('	
    ALTER TABLE %1$s NO INHERIT commons.%2$s;

    ALTER TABLE %1$s DROP COLUMN string;

    ALTER TABLE %1$s DROP CONSTRAINT text_quill_doc_check;

    ALTER TABLE %1$s DROP COLUMN quill_doc;

    ALTER TABLE %1$s DROP COLUMN pk_text;

      ', schema_and_table_name, parent_table_name);
END
$_$;

--
-- TOC entry 1271 (class 1255 OID 20859)
-- Name: unmake_versioned_table_child_of_text(character varying); Type: FUNCTION; Schema: commons; Owner: -
--
CREATE FUNCTION commons.unmake_versioned_table_child_of_text(schema_and_table_name character varying)
  RETURNS void
  LANGUAGE plpgsql
  AS $_$
BEGIN
  PERFORM
    commons.unmake_table_child_of_text(schema_and_table_name, 'text');
  PERFORM
    commons.unmake_table_child_of_text(schema_and_table_name || '_vt', 'text_vt');
  EXECUTE format('
        DROP TRIGGER sync_quill_doc_and_string ON %1$s;
    ', schema_and_table_name);
END
$_$;

--
-- TOC entry 1272 (class 1255 OID 20860)
-- Name: update_entity_version_key(); Type: FUNCTION; Schema: commons; Owner: -
--
CREATE FUNCTION commons.update_entity_version_key()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  AS $$
BEGIN
  NEW.entity_version := NEW.entity_version + 1;
  RETURN NEW;
END;
$$;

--
-- TOC entry 1273 (class 1255 OID 20861)
-- Name: validate_json_schema(jsonb, jsonb, jsonb); Type: FUNCTION; Schema: commons; Owner: -
--
CREATE FUNCTION commons.validate_json_schema(schema jsonb, data jsonb, root_schema jsonb DEFAULT NULL::jsonb)
  RETURNS boolean
  LANGUAGE plpgsql
  IMMUTABLE
  AS $_$
DECLARE
  prop text;
  item jsonb;
  path text[];
  types text[];
  pattern text;
  props text[];
BEGIN
  IF root_schema IS NULL THEN
    root_schema = SCHEMA;
  END IF;
  IF SCHEMA ? 'type' THEN
    IF jsonb_typeof(schema -> 'type') = 'array' THEN
      types = ARRAY (
        SELECT
          jsonb_array_elements_text(schema -> 'type'));
    ELSE
      types = ARRAY[SCHEMA ->> 'type'];
    END IF;
    IF (
      SELECT
        NOT bool_or(commons._validate_json_schema_type(type, data))
      FROM
        unnest(types)
        type) THEN
      RETURN FALSE;
    END IF;
  END IF;
  IF SCHEMA ? 'properties' THEN
    FOR prop IN
    SELECT
      jsonb_object_keys(schema -> 'properties')
      LOOP
        IF data ? prop AND NOT commons.validate_json_schema(schema -> 'properties' -> prop, data -> prop, root_schema) THEN
          RETURN FALSE;
        END IF;
      END LOOP;
  END IF;
  IF SCHEMA ? 'required' AND jsonb_typeof(data) = 'object' THEN
    IF NOT ARRAY (
      SELECT
        jsonb_object_keys(data)) @> ARRAY (
    SELECT
      jsonb_array_elements_text(schema -> 'required')) THEN
      RETURN FALSE;
    END IF;
  END IF;
  IF SCHEMA ? 'items' AND jsonb_typeof(data) = 'array' THEN
    IF jsonb_typeof(schema -> 'items') = 'object' THEN
      FOR item IN
      SELECT
        jsonb_array_elements(data)
        LOOP
          IF NOT commons.validate_json_schema(schema -> 'items', item, root_schema) THEN
            RETURN FALSE;
          END IF;
        END LOOP;
    ELSE
      IF NOT (
        SELECT
          bool_and(i > jsonb_array_length(schema -> 'items') OR commons.validate_json_schema(schema -> 'items' ->(i::int - 1), elem, root_schema))
        FROM
          jsonb_array_elements(data)
          WITH ORDINALITY AS t(elem, i)) THEN
        RETURN FALSE;
      END IF;
    END IF;
  END IF;
  IF jsonb_typeof(schema -> 'additionalItems') = 'boolean' AND NOT (schema -> 'additionalItems')::text::boolean AND jsonb_typeof(schema -> 'items') = 'array' THEN
    IF jsonb_array_length(data) > jsonb_array_length(schema -> 'items') THEN
      RETURN FALSE;
    END IF;
  END IF;
  IF jsonb_typeof(schema -> 'additionalItems') = 'object' THEN
    IF NOT (
      SELECT
        bool_and(validate_json_schema(schema -> 'additionalItems', elem, root_schema))
      FROM
        jsonb_array_elements(data)
        WITH ORDINALITY AS t(elem, i)
      WHERE
        i > jsonb_array_length(schema -> 'items')) THEN
      RETURN FALSE;
    END IF;
  END IF;
  IF SCHEMA ? 'minimum' AND jsonb_typeof(data) = 'number' THEN
    IF data::text::numeric <(schema ->> 'minimum')::numeric THEN
      RETURN FALSE;
    END IF;
  END IF;
  IF SCHEMA ? 'maximum' AND jsonb_typeof(data) = 'number' THEN
    IF data::text::numeric >(schema ->> 'maximum')::numeric THEN
      RETURN FALSE;
    END IF;
  END IF;
  IF COALESCE((schema -> 'exclusiveMinimum')::text::bool, FALSE) THEN
    IF data::text::numeric =(schema ->> 'minimum')::numeric THEN
      RETURN FALSE;
    END IF;
  END IF;
  IF COALESCE((schema -> 'exclusiveMaximum')::text::bool, FALSE) THEN
    IF data::text::numeric =(schema ->> 'maximum')::numeric THEN
      RETURN FALSE;
    END IF;
  END IF;
  IF SCHEMA ? 'anyOf' THEN
    IF NOT (
      SELECT
        bool_or(validate_json_schema(sub_schema, data, root_schema))
      FROM
        jsonb_array_elements(schema -> 'anyOf') sub_schema) THEN
      RETURN FALSE;
    END IF;
  END IF;
  IF SCHEMA ? 'allOf' THEN
    IF NOT (
      SELECT
        bool_and(validate_json_schema(sub_schema, data, root_schema))
      FROM
        jsonb_array_elements(schema -> 'allOf') sub_schema) THEN
      RETURN FALSE;
    END IF;
  END IF;
  IF SCHEMA ? 'oneOf' THEN
    IF 1 !=(
      SELECT
        COUNT(*)
    FROM jsonb_array_elements(schema -> 'oneOf') sub_schema
  WHERE
    commons.validate_json_schema(sub_schema, data, root_schema)) THEN
      RETURN FALSE;
    END IF;
  END IF;
  IF COALESCE((schema -> 'uniqueItems')::text::boolean, FALSE) THEN
    IF (
      SELECT
        COUNT(*)
      FROM
        jsonb_array_elements(data)) !=(
  SELECT
    count(DISTINCT val)
  FROM
    jsonb_array_elements(data) val) THEN
      RETURN FALSE;
    END IF;
  END IF;
  IF SCHEMA ? 'additionalProperties' AND jsonb_typeof(data) = 'object' THEN
    props := ARRAY (
      SELECT
        key
      FROM
        jsonb_object_keys(data)
        key
      WHERE
        key NOT IN (
          SELECT
            jsonb_object_keys(schema -> 'properties'))
          AND NOT EXISTS (
            SELECT
              *
            FROM
              jsonb_object_keys(schema -> 'patternProperties') pat
            WHERE
              key ~ pat));
    IF jsonb_typeof(schema -> 'additionalProperties') = 'boolean' THEN
      IF NOT (schema -> 'additionalProperties')::text::boolean AND jsonb_typeof(data) = 'object' AND NOT props <@ ARRAY (
      SELECT
        jsonb_object_keys(schema -> 'properties')) THEN
        RETURN FALSE;
      END IF;
      ELSEIF NOT (
        SELECT
          bool_and(validate_json_schema(schema -> 'additionalProperties', data -> key, root_schema))
        FROM
          unnest(props)
          key) THEN
      RETURN FALSE;
    END IF;
  END IF;
  IF SCHEMA ? '$ref' THEN
    path := ARRAY (
      SELECT
        regexp_replace(regexp_replace(path_part, '~1', '/'), '~0', '~')
      FROM
        UNNEST(regexp_split_to_array(schema ->> '$ref', '/')) path_part);
    -- ASSERT path[1] = '#', 'only refs anchored at the root are supported';
    IF NOT commons.validate_json_schema(root_schema #> path[2:array_length(path, 1)], data, root_schema) THEN
      RETURN FALSE;
    END IF;
  END IF;
  IF SCHEMA ? 'enum' THEN
    IF NOT EXISTS (
      SELECT
        *
      FROM
        jsonb_array_elements(schema -> 'enum') val
      WHERE
        val = data) THEN
    RETURN FALSE;
  END IF;
END IF;
  IF SCHEMA ? 'minLength' AND jsonb_typeof(data) = 'string' THEN
    IF char_length(data #>> '{}') <(schema ->> 'minLength')::numeric THEN
      RETURN FALSE;
    END IF;
  END IF;
  IF SCHEMA ? 'maxLength' AND jsonb_typeof(data) = 'string' THEN
    IF char_length(data #>> '{}') >(schema ->> 'maxLength')::numeric THEN
      RETURN FALSE;
    END IF;
  END IF;
  IF SCHEMA ? 'not' THEN
    IF commons.validate_json_schema(schema -> 'not', data, root_schema) THEN
      RETURN FALSE;
    END IF;
  END IF;
  IF SCHEMA ? 'maxProperties' AND jsonb_typeof(data) = 'object' THEN
    IF (
      SELECT
        count(*)
      FROM
        jsonb_object_keys(data)) >(schema ->> 'maxProperties')::numeric THEN
      RETURN FALSE;
    END IF;
  END IF;
  IF SCHEMA ? 'minProperties' AND jsonb_typeof(data) = 'object' THEN
    IF (
      SELECT
        count(*)
      FROM
        jsonb_object_keys(data)) <(schema ->> 'minProperties')::numeric THEN
      RETURN FALSE;
    END IF;
  END IF;
  IF SCHEMA ? 'maxItems' AND jsonb_typeof(data) = 'array' THEN
    IF (
      SELECT
        count(*)
      FROM
        jsonb_array_elements(data)) >(schema ->> 'maxItems')::numeric THEN
      RETURN FALSE;
    END IF;
  END IF;
  IF SCHEMA ? 'minItems' AND jsonb_typeof(data) = 'array' THEN
    IF (
      SELECT
        count(*)
      FROM
        jsonb_array_elements(data)) <(schema ->> 'minItems')::numeric THEN
      RETURN FALSE;
    END IF;
  END IF;
  IF SCHEMA ? 'dependencies' THEN
    FOR prop IN
    SELECT
      jsonb_object_keys(schema -> 'dependencies')
      LOOP
        IF data ? prop THEN
          IF jsonb_typeof(schema -> 'dependencies' -> prop) = 'array' THEN
            IF NOT (
              SELECT
                bool_and(data ? dep)
              FROM
                jsonb_array_elements_text(schema -> 'dependencies' -> prop) dep) THEN
              RETURN FALSE;
            END IF;
          ELSE
            IF NOT commons.validate_json_schema(schema -> 'dependencies' -> prop, data, root_schema) THEN
              RETURN FALSE;
            END IF;
          END IF;
        END IF;
      END LOOP;
  END IF;
  IF SCHEMA ? 'pattern' AND jsonb_typeof(data) = 'string' THEN
    IF (data #>> '{}') !~(schema ->> 'pattern') THEN
      RETURN FALSE;
    END IF;
  END IF;
  IF SCHEMA ? 'patternProperties' AND jsonb_typeof(data) = 'object' THEN
    FOR prop IN
    SELECT
      jsonb_object_keys(data)
      LOOP
        FOR pattern IN
        SELECT
          jsonb_object_keys(schema -> 'patternProperties')
          LOOP
            RAISE NOTICE 'prop %s, pattern %, schema %', prop, pattern, schema -> 'patternProperties' -> pattern;
            IF prop ~ pattern AND NOT commons.validate_json_schema(schema -> 'patternProperties' -> pattern, data -> prop, root_schema) THEN
              RETURN FALSE;
            END IF;
          END LOOP;
      END LOOP;
  END IF;
  IF SCHEMA ? 'multipleOf' AND jsonb_typeof(data) = 'number' THEN
    IF data::text::numeric %(schema ->> 'multipleOf')::numeric != 0 THEN
      RETURN FALSE;
    END IF;
  END IF;
  RETURN TRUE;
END;
$_$;

--
-- TOC entry 1274 (class 1255 OID 20863)
-- Name: validate_quill_doc(jsonb); Type: FUNCTION; Schema: commons; Owner: -
--
CREATE FUNCTION commons.validate_quill_doc(quilldoc jsonb)
  RETURNS boolean
  LANGUAGE plpgsql
  IMMUTABLE
  AS $_$
DECLARE
  isValid boolean;
BEGIN
  SELECT
    INTO isValid commons.validate_json_schema('{
      "$schema": "http://json-schema.org/draft-06/schema#",
      "definitions": {
        "QuillDoc": {
          "type": "object",
          "properties": {
            "latestId": {
              "type": "number"
            },
            "ops": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/Op"
              }
            }
          },
          "required": [
            "latestId"
          ],
          "additionalProperties": false
        },
        "Op": {
          "type": "object",
          "properties": {
            "insert": {
              "type": "string",
              "minLength": 1,
              "maxLength": 1
            },
            "attributes": {
              "type": "object",
              "properties": {
                "charid": {
                  "type": "string"
                },
                "blockid": {
                  "type": "string"
                }
              }
            }
          },
          "required": [
            "insert"
          ],
          "additionalProperties": false
        }
      },
      "$ref": "#/definitions/QuillDoc"
    }'::jsonb, quillDoc);
  RETURN isValid;
END;
$_$;

--
-- TOC entry 1286 (class 1255 OID 23556)
-- Name: rebuild_digital_table(integer, integer[]); Type: FUNCTION; Schema: data; Owner: -
--
CREATE FUNCTION data.rebuild_digital_table(id_digital integer, column_list integer[])
  RETURNS text
  LANGUAGE plpgsql
  AS $$
DECLARE
  query_start text;
  query_from text;
  query text;
  field text;
  field_label text;
  field_metadata json;
  n integer = 1;
  a integer;
  output_query text;
BEGIN
  query_start = 'DROP VIEW IF EXISTS tv_' || id_digital || ';
	   					CREATE OR REPLACE TEMPORARY VIEW tv_' || id_digital || ' AS
							SELECT dr.pk_entity';
  query_from = ' FROM data.row dr';
  IF array_length(column_list, 1) > 0 THEN
    FOR a IN
    SELECT
      UNNEST(column_list)
      LOOP
        SELECT
          row_to_json(pk_entity, id_for_import_txt, fk_data_type) INTO field_metadata
        FROM
          data.column
        WHERE
          pk_entity = a;
        field_label = replace(trim((field_metadata -> 'f2')::text), ' ', '_');
        IF (field_metadata -> 'f3')::varchar::integer = 3293 THEN
          field = 't' || n || '.numeric_value';
        ELSE
          field = 't' || n || '.id_for_import_txt';
          -- .string     .id_for_import_txt
        END IF;
        query_start = query_start || ', ' || field || ' AS ' || field_label;
        query_from = query_from || ' JOIN data.cell t' || n || ' ON dr.pk_entity = t' || n || '.fk_row AND t' || n || '.fk_column = ' ||(field_metadata -> 'f1')::text;
        n = n + 1;
        -- RAISE NOTICE '%', query_start ; -- return current row of SELECT
      END LOOP;
  ELSE
    FOR field_metadata IN
    SELECT
      row_to_json(pk_entity, id_for_import_txt, fk_data_type)
    FROM
      data.column
    WHERE
      fk_digital = id_digital
    ORDER BY
      pk_entity LOOP
        field_label = replace(trim((field_metadata -> 'f2')::text), ' ', '_');
        IF (field_metadata -> 'f3')::varchar::integer = 3293 THEN
          field = 't' || n || '.numeric_value';
        ELSE
          field = 't' || n || '.id_for_import_txt';
          -- .string     .id_for_import_txt
        END IF;
        query_start = query_start || ', ' || field || ' AS ' || field_label;
        query_from = query_from || ' JOIN data.cell t' || n || ' ON dr.pk_entity = t' || n || '.fk_row AND t' || n || '.fk_column = ' ||(field_metadata -> 'f1')::text;
        n = n + 1;
        -- RAISE NOTICE '%', query_start ; -- return current row of SELECT
      END LOOP;
  END IF;
  query := query_start || query_from || 'WHERE dr.fk_digital = ' || id_digital || ';';
  RAISE NOTICE '%', query;
  EXECUTE query;
  output_query := 'SELECT * FROM tv_' || id_digital || ' LIMIT 10';
  RETURN output_query;
END;
$$;

--
-- TOC entry 1285 (class 1255 OID 23228)
-- Name: v_chunk_find_or_create(); Type: FUNCTION; Schema: data; Owner: -
--
CREATE FUNCTION data.v_chunk_find_or_create()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  AS $$
DECLARE
  same_chunk data.chunk;
  same_chunk_version boolean;
  resulting_row data.v_chunk;
  resulting_pk int;
BEGIN
  ------ Search if such a chunk exists -----
  SELECT
    *
  FROM
    INTO same_chunk data.chunk
  WHERE
    quill_doc::jsonb = NEW.quill_doc::jsonb
    AND fk_text = NEW.fk_text;
  -- if not existing
  IF same_chunk.pk_entity IS NULL THEN
    -- insert a new chunk
    WITH _insert AS (
INSERT INTO data.chunk(quill_doc, fk_text, fk_entity_version, metadata, fk_namespace, fk_license, fk_publication_status)
        VALUES (NEW.quill_doc::jsonb, NEW.fk_text, NEW.fk_entity_version, NEW.metadata, NEW.fk_namespace, NEW.fk_license, NEW.fk_publication_status)
      RETURNING
        *)
      SELECT
        pk_entity
      FROM
        INTO resulting_pk _insert;
    -- if existing
  ELSIF same_chunk.pk_entity IS NOT NULL THEN
    -- if the fk_entity_version of the found chunk differs from the new
    IF NEW.fk_entity_version != same_chunk.fk_entity_version THEN
      -- update the chunk so that we keep track of when which version was annotated
      UPDATE
        data.chunk
      SET
        fk_entity_version = NEW.fk_entity_version
      WHERE
        pk_entity = same_chunk.pk_entity;
    END IF;
    -- set the resulting pk
    resulting_pk = same_chunk.pk_entity;
  END IF;
  -- select and return the latest chunk version from the view
  SELECT
    *
  FROM
    INTO resulting_row data.v_chunk
  WHERE
    pk_entity = resulting_pk;
  RETURN resulting_row;
END;
$$;

--
-- TOC entry 1308 (class 1255 OID 24129)
-- Name: update_api_classes_profile_table(integer, character varying, timestamp with time zone, json); Type: FUNCTION; Schema: data_for_history; Owner: -
--
CREATE FUNCTION data_for_history.update_api_classes_profile_table(param_profile_id integer, param_requested_language character varying, param_tmsp_last_dfh_update timestamp with time zone, param_classes_profile_data json DEFAULT '[]' ::json)
  RETURNS json
  LANGUAGE plpgsql
  AS $$
DECLARE
  removed json;
  updated json;
  inserted json;
BEGIN
  /*
   * create a table with same type as from json
   */
  DROP TABLE IF EXISTS classes_profile_from_api;
  CREATE TEMP TABLE classes_profile_from_api AS
  SELECT
    param_requested_language AS requested_language,
    "classID" AS dfh_pk_class,
    "classIdentifierInNamespace" AS dfh_class_identifier_in_namespace,
    "classLabelLanguage" AS dfh_class_label_language,
    "classLabel" AS dfh_class_label,
    "classScopeNoteLanguage" AS dfh_class_scope_note_language,
    "classScopeNote" AS dfh_class_scope_note,
    "entityBasicType" AS dfh_basic_type,
    "entityBasicTypeLabel" AS dfh_basic_type_label,
    "namespaceID" AS dfh_fk_namespace,
    "namespaceLabelLanguage" AS dfh_namespace_label_language,
    "namespaceLabel" AS dfh_namespace_label,
    "namespaceURI" AS dfh_namespace_uri,
    "profileAssociationType" AS dfh_profile_association_type,
    "profileID" AS dfh_fk_profile,
    "profileLabelLanguage" AS dfh_profile_label_language,
    "profileLabel" AS dfh_profile_label,
    "parentClasses" AS dfh_parent_classes,
    "ancestorClasses" AS dfh_ancestor_classes
  FROM
    json_to_recordset(param_classes_profile_data) AS x("classID" int,
    "classIdentifierInNamespace" varchar,
    "classLabel" text,
    "classLabelLanguage" varchar,
    "classScopeNote" text,
    "classScopeNoteLanguage" varchar,
    "entityBasicType" int,
    "entityBasicTypeLabel" text,
    "namespaceID" int,
    "namespaceLabel" text,
    "namespaceLabelLanguage" varchar,
    "namespaceURI" text,
    "profileAssociationType" text,
    "profileID" int,
    "profileLabel" text,
    "profileLabelLanguage" varchar,
    "parentClasses" int[],
    "ancestorClasses" int[]);

  /*
   * Update tmsp_last_dfh_update for all records of given
   * profile_id
   */
  UPDATE
    data_for_history.api_class
  SET
    tmsp_last_dfh_update = param_tmsp_last_dfh_update
  WHERE
    dfh_fk_profile = param_profile_id;

  /*
   * Mark all records missing in the json data
   * as removed from api.
   * (this is independent from the requested language)
   */
  WITH tw1 AS (
    SELECT
      dfh_pk_class,
      dfh_fk_profile
    FROM
      data_for_history.api_class
    WHERE
      dfh_fk_profile = param_profile_id
    EXCEPT
    SELECT
      dfh_pk_class,
      dfh_fk_profile
    FROM
      classes_profile_from_api
    WHERE
      dfh_fk_profile = param_profile_id
),
tw2 AS (
  UPDATE
    data_for_history.api_class t1
  SET
    removed_from_api = TRUE
  FROM
    tw1 t2
  WHERE
    t1.dfh_fk_profile = t2.dfh_fk_profile
    AND t1.dfh_pk_class = t2.dfh_pk_class
  RETURNING
    t1.*
)
SELECT
  jsonb_agg(jsonb_build_object('dfh_pk_class', dfh_pk_class, 'dfh_fk_profile', dfh_fk_profile, 'requested_language', requested_language, 'removed_from_api', removed_from_api, 'dfh_class_label', dfh_class_label)) INTO removed
FROM
  tw2;

  /*
   * Update class_label
   */
  UPDATE
    data_for_history.api_class t1
  SET
    dfh_class_label = t2.dfh_class_label
  FROM
    classes_profile_from_api t2
  WHERE
    t1.dfh_class_label_language = t2.dfh_class_label_language
    AND t1.dfh_fk_profile = t2.dfh_fk_profile
    AND t1.dfh_pk_class = t2.dfh_pk_class;

  /*
   * Update class_scope_note
   */
  UPDATE
    data_for_history.api_class t1
  SET
    dfh_class_scope_note = t2.dfh_class_scope_note
  FROM
    classes_profile_from_api t2
  WHERE
    t1.dfh_class_scope_note_language = t2.dfh_class_scope_note_language
    AND t1.dfh_fk_profile = t2.dfh_fk_profile
    AND t1.dfh_pk_class = t2.dfh_pk_class;

  /*
   * Update namespace_label
   */
  UPDATE
    data_for_history.api_class t1
  SET
    dfh_namespace_label = t2.dfh_namespace_label
  FROM
    classes_profile_from_api t2
  WHERE
    t1.dfh_namespace_label_language = t2.dfh_namespace_label_language
    AND t1.dfh_fk_profile = t2.dfh_fk_profile
    AND t1.dfh_pk_class = t2.dfh_pk_class;

  /*
   * Update profile_label
   */
  UPDATE
    data_for_history.api_class t1
  SET
    dfh_profile_label = t2.dfh_profile_label
  FROM
    classes_profile_from_api t2
  WHERE
    t1.dfh_profile_label_language = t2.dfh_profile_label_language
    AND t1.dfh_fk_profile = t2.dfh_fk_profile
    AND t1.dfh_pk_class = t2.dfh_pk_class;

  /*
   * Update language independent fields of existing records
   * This affects also records of other languages than the requested
   */
  WITH tw1 AS (
    UPDATE
      data_for_history.api_class t1
    SET
      removed_from_api = FALSE,
      dfh_class_identifier_in_namespace = t2.dfh_class_identifier_in_namespace,
      dfh_basic_type = t2.dfh_basic_type,
      dfh_basic_type_label = t2.dfh_basic_type_label,
      dfh_fk_namespace = t2.dfh_fk_namespace,
      dfh_namespace_uri = t2.dfh_namespace_uri,
      dfh_profile_association_type = t2.dfh_profile_association_type,
      dfh_parent_classes = t2.dfh_parent_classes,
      dfh_ancestor_classes = t2.dfh_ancestor_classes
    FROM
      classes_profile_from_api t2
    WHERE
      t1.dfh_fk_profile = t2.dfh_fk_profile
      AND t1.dfh_pk_class = t2.dfh_pk_class
    RETURNING
      t1.*
)
  SELECT
    jsonb_agg(jsonb_build_object('dfh_pk_class', dfh_pk_class, 'dfh_fk_profile', dfh_fk_profile, 'requested_language', requested_language, 'removed_from_api', removed_from_api, 'dfh_class_label', dfh_class_label, 'dfh_parent_classes', dfh_parent_classes, 'dfh_ancestor_classes', dfh_ancestor_classes)) INTO updated
  FROM
    tw1;

  /*
   * Insert all new records
   */
  WITH tw1 AS (
INSERT INTO data_for_history.api_class(tmsp_last_dfh_update, removed_from_api, requested_language, dfh_pk_class, dfh_class_identifier_in_namespace, dfh_class_label_language, dfh_class_label, dfh_class_scope_note_language, dfh_class_scope_note, dfh_basic_type, dfh_basic_type_label, dfh_fk_namespace, dfh_namespace_label_language, dfh_namespace_label, dfh_namespace_uri, dfh_profile_association_type, dfh_fk_profile, dfh_profile_label_language, dfh_profile_label, dfh_parent_classes, dfh_ancestor_classes)
    SELECT DISTINCT ON (t1.requested_language,
      t1.dfh_pk_class,
      t1.dfh_fk_profile)
      param_tmsp_last_dfh_update,
      FALSE,
      t1.requested_language,
      t1.dfh_pk_class,
      t1.dfh_class_identifier_in_namespace,
      t1.dfh_class_label_language,
      t1.dfh_class_label,
      t1.dfh_class_scope_note_language,
      t1.dfh_class_scope_note,
      t1.dfh_basic_type,
      t1.dfh_basic_type_label,
      t1.dfh_fk_namespace,
      t1.dfh_namespace_label_language,
      t1.dfh_namespace_label,
      t1.dfh_namespace_uri,
      t1.dfh_profile_association_type,
      t1.dfh_fk_profile,
      t1.dfh_profile_label_language,
      t1.dfh_profile_label,
      t1.dfh_parent_classes,
      t1.dfh_ancestor_classes
    FROM
      classes_profile_from_api t1
    WHERE
      t1.requested_language = param_requested_language
      AND t1.dfh_fk_profile = param_profile_id
    ON CONFLICT (requested_language,
      dfh_pk_class,
      dfh_fk_profile)
      DO UPDATE SET
        tmsp_last_dfh_update = EXCLUDED.tmsp_last_dfh_update,
        removed_from_api = EXCLUDED.removed_from_api,
        --requested_language = EXCLUDED.requested_language,
        --dfh_pk_class = EXCLUDED.dfh_pk_class,
        dfh_class_identifier_in_namespace = EXCLUDED.dfh_class_identifier_in_namespace,
        dfh_class_label_language = EXCLUDED.dfh_class_label_language,
        dfh_class_label = EXCLUDED.dfh_class_label,
        dfh_class_scope_note_language = EXCLUDED.dfh_class_scope_note_language,
        dfh_class_scope_note = EXCLUDED.dfh_class_scope_note,
        dfh_basic_type = EXCLUDED.dfh_basic_type,
        dfh_basic_type_label = EXCLUDED.dfh_basic_type_label,
        dfh_fk_namespace = EXCLUDED.dfh_fk_namespace,
        dfh_namespace_label_language = EXCLUDED.dfh_namespace_label_language,
        dfh_namespace_label = EXCLUDED.dfh_namespace_label,
        dfh_namespace_uri = EXCLUDED.dfh_namespace_uri,
        dfh_profile_association_type = EXCLUDED.dfh_profile_association_type,
        -- dfh_fk_profile = EXCLUDED.dfh_fk_profile,
        dfh_profile_label_language = EXCLUDED.dfh_profile_label_language,
        dfh_profile_label = EXCLUDED.dfh_profile_label,
        dfh_parent_classes = EXCLUDED.dfh_parent_classes,
        dfh_ancestor_classes = EXCLUDED.dfh_ancestor_classes
      RETURNING
        *
)
    SELECT
      jsonb_agg(jsonb_build_object('dfh_pk_class', dfh_pk_class, 'dfh_fk_profile', dfh_fk_profile, 'requested_language', requested_language, 'removed_from_api', removed_from_api, 'dfh_class_label', dfh_class_label, 'dfh_parent_classes', dfh_parent_classes, 'dfh_ancestor_classes', dfh_ancestor_classes)) INTO inserted
    FROM
      tw1;

  /*
   * Return kind of a protocol
   */
  RETURN json_build_object('removed', removed, 'updated', updated, 'inserted', inserted);
END;
$$;

--
-- TOC entry 1327 (class 1255 OID 24128)
-- Name: update_api_profiles_table(integer, character varying, timestamp with time zone, json); Type: FUNCTION; Schema: data_for_history; Owner: -
--
CREATE FUNCTION data_for_history.update_api_profiles_table(param_profile_id integer, param_requested_language character varying, param_tmsp_last_dfh_update timestamp with time zone, param_profile_data json DEFAULT NULL::json)
  RETURNS json
  LANGUAGE plpgsql
  AS $$
DECLARE
  removed json;
  updated json;
  inserted json;
BEGIN
  /*
   * Update tmsp_last_dfh_update for all records of given
   * profile_id
   */
  UPDATE
    data_for_history.api_profile
  SET
    tmsp_last_dfh_update = param_tmsp_last_dfh_update
  WHERE
    dfh_pk_profile = param_profile_id;

  /*
   * Q: Is profile still present in API ?
   */
  IF (param_profile_data IS NULL) THEN
    /*
     * A: No. Profile is removed from API
     */
    WITH tw1 AS (
      UPDATE
        data_for_history.api_profile
      SET
        removed_from_api = TRUE
      WHERE
        dfh_pk_profile = param_profile_id
        AND removed_from_api = FALSE
      RETURNING
        *
)
    SELECT
      jsonb_agg(jsonb_build_object('dfh_pk_profile', dfh_pk_profile, 'requested_language', requested_language, 'removed_from_api', removed_from_api, 'dfh_profile_label', dfh_profile_label)) INTO removed
    FROM
      tw1;
  ELSE
    /*
     * A: Yes. Profile is still present in API
     */
    /*
     * Update profile_label
     */
    UPDATE
      data_for_history.api_profile
    SET
      dfh_profile_label = param_profile_data ->> 'profileLabel'
    WHERE
      dfh_pk_profile = param_profile_id
      AND dfh_profile_label_language = param_profile_data ->> 'profileLabelLanguage';

    /*
     * Update profile_definition
     */
    UPDATE
      data_for_history.api_profile
    SET
      dfh_profile_definition = param_profile_data ->> 'profileDefinition'
    WHERE
      dfh_pk_profile = param_profile_id
      AND dfh_profile_definition_language = param_profile_data ->> 'profileDefinitionLanguage';

    /*
     * Update project_label
     */
    UPDATE
      data_for_history.api_profile
    SET
      dfh_project_label = param_profile_data ->> 'ownedByProjectLabel'
    WHERE
      dfh_pk_profile = param_profile_id
      AND dfh_project_label_language = param_profile_data ->> 'ownedByProjectLabelLanguage';

    /*
     * Update language independent fields of existing records
     * of the queried profile
     */
    WITH tw1 AS (
      UPDATE
        data_for_history.api_profile
      SET
        removed_from_api = FALSE,
        dfh_owned_by_project =(param_profile_data ->> 'ownedByProjectID')::int,
        dfh_is_ongoing_forced_publication =(param_profile_data ->> 'isOngoingForcedPublication')::bool,
        dfh_date_profile_published =(param_profile_data ->> 'dateProfilePublished')::timestamp With TIME ZONE,
        dfh_date_profile_deprecated =(param_profile_data ->> 'dateProfileDeprecated')::timestamp With TIME ZONE
      WHERE
        dfh_pk_profile = param_profile_id
      RETURNING
        *
)
    SELECT
      jsonb_agg(jsonb_build_object('dfh_pk_profile', dfh_pk_profile, 'requested_language', requested_language, 'dfh_profile_label', dfh_profile_label)) INTO updated
    FROM
      tw1;

    /*
     * Insert or update all fields
     * of the queried profile and the requested language
     */
    WITH tw1 AS (
INSERT INTO data_for_history.api_profile(tmsp_last_dfh_update, requested_language, dfh_pk_profile, dfh_profile_label_language, dfh_profile_label, dfh_profile_definition_language, dfh_profile_definition, dfh_owned_by_project, dfh_project_label_language, dfh_project_label, dfh_is_ongoing_forced_publication, dfh_date_profile_published, dfh_date_profile_deprecated, dfh_is_root_profile, dfh_fk_root_profile)
        VALUES (param_tmsp_last_dfh_update, param_requested_language,(param_profile_data ->> 'profileID')::int, param_profile_data ->> 'profileLabelLanguage', param_profile_data ->> 'profileLabel', param_profile_data ->> 'profileDefinitionLanguage', param_profile_data ->> 'profileDefinition',(param_profile_data ->> 'ownedByProjectID')::int, param_profile_data ->> 'ownedByProjectLabelLanguage', param_profile_data ->> 'ownedByProjectLabel',(param_profile_data ->> 'isOngoingForcedPublication')::bool,(param_profile_data ->> 'dateProfilePublished')::timestamp With TIME ZONE,(param_profile_data ->> 'dateProfileDeprecated')::timestamp With TIME ZONE,(param_profile_data ->> 'isRootProfile')::bool,(param_profile_data ->> 'fkRootProfile')::int)
      ON CONFLICT (dfh_pk_profile, requested_language)
        DO UPDATE SET
          tmsp_last_dfh_update = EXCLUDED.tmsp_last_dfh_update, requested_language = EXCLUDED.requested_language, dfh_pk_profile = EXCLUDED.dfh_pk_profile, dfh_profile_label_language = EXCLUDED.dfh_profile_label_language, dfh_profile_label = EXCLUDED.dfh_profile_label, dfh_profile_definition_language = EXCLUDED.dfh_profile_definition_language, dfh_profile_definition = EXCLUDED.dfh_profile_definition, dfh_owned_by_project = EXCLUDED.dfh_owned_by_project, dfh_project_label_language = EXCLUDED.dfh_project_label_language, dfh_project_label = EXCLUDED.dfh_project_label, dfh_is_ongoing_forced_publication = EXCLUDED.dfh_is_ongoing_forced_publication, dfh_date_profile_published = EXCLUDED.dfh_date_profile_published, dfh_date_profile_deprecated = EXCLUDED.dfh_date_profile_deprecated, dfh_is_root_profile = EXCLUDED.dfh_is_root_profile, dfh_fk_root_profile = EXCLUDED.dfh_fk_root_profile
        RETURNING
          *)
        SELECT
          jsonb_agg(jsonb_build_object('dfh_pk_profile', dfh_pk_profile, 'requested_language', requested_language, 'dfh_profile_label', dfh_profile_label)) INTO inserted
        FROM
          tw1;
  END IF;
  RETURN json_build_object('removed', removed, 'updated', updated, 'inserted', inserted);
END;
$$;

--
-- TOC entry 1310 (class 1255 OID 24131)
-- Name: update_api_properties_profile_table(integer, character varying, timestamp with time zone, json); Type: FUNCTION; Schema: data_for_history; Owner: -
--
CREATE FUNCTION data_for_history.update_api_properties_profile_table(param_profile_id integer, param_requested_language character varying, param_tmsp_last_dfh_update timestamp with time zone, param_properties_profile_data json DEFAULT '[]' ::json)
  RETURNS json
  LANGUAGE plpgsql
  AS $$
DECLARE
  removed json;
  updated json;
  inserted json;
BEGIN
  /*
   * create a table with same type as from json
   */
  DROP TABLE IF EXISTS properties_profile_from_api;
  CREATE TABLE properties_profile_from_api AS
  SELECT
    param_requested_language AS requested_language,
    "propertyID" AS dfh_pk_property,
    "propertyLabelLanguage" AS dfh_property_label_language,
    "propertyLabel" AS dfh_property_label,
    "propertyInverseLabel" AS dfh_property_inverse_label,
    "propertyScopeNoteLanguage" AS dfh_property_scope_note_language,
    "propertyScopeNote" AS dfh_property_scope_note,
    "isInherited" AS dfh_is_inherited,
    "propertyDomain" AS dfh_property_domain,
    "domainInstancesMinQuantifier" AS dfh_domain_instances_min_quantifier,
    "domainInstancesMaxQuantifier" AS dfh_domain_instances_max_quantifier,
    "propertyRange" AS dfh_property_range,
    "rangeInstancesMinQuantifier" AS dfh_range_instances_min_quantifier,
    "rangeInstancesMaxQuantifier" AS dfh_range_instances_max_quantifier,
    "identityDefining" AS dfh_identity_defining,
    "isHasTypeSubproperty" AS dfh_is_has_type_subproperty,
    "propertyIdentifierInNamespace" AS dfh_property_identifier_in_namespace,
    "namespaceURI" AS dfh_namespace_uri,
    "namespaceID" AS dfh_fk_namespace,
    "namespaceLabelLanguage" AS dfh_namespace_label_language,
    "namespaceLabel" AS dfh_namespace_label,
    "profileAssociationType" AS dfh_profile_association_type,
    "profileID" AS dfh_fk_profile,
    "profileLabelLanguage" AS dfh_profile_label_language,
    "profileLabel" AS dfh_profile_label,
    "parentProperties" AS dfh_parent_properties,
    coalesce("ancestorProperties", '{}'::int[]) AS dfh_ancestor_properties
  FROM
    json_to_recordset(param_properties_profile_data) AS x("propertyID" INT,
    "propertyLabelLanguage" VARCHAR,
    "propertyLabel" TEXT,
    "propertyInverseLabel" TEXT,
    "propertyScopeNoteLanguage" VARCHAR,
    "propertyScopeNote" TEXT,
    "isInherited" BOOLEAN,
    "propertyDomain" INTEGER,
    "domainInstancesMinQuantifier" INTEGER,
    "domainInstancesMaxQuantifier" INTEGER,
    "propertyRange" INTEGER,
    "rangeInstancesMinQuantifier" INTEGER,
    "rangeInstancesMaxQuantifier" INTEGER,
    "identityDefining" BOOLEAN,
    "isHasTypeSubproperty" BOOLEAN,
    "propertyIdentifierInNamespace" VARCHAR,
    "namespaceURI" TEXT,
    "namespaceID" INTEGER,
    "namespaceLabelLanguage" VARCHAR,
    "namespaceLabel" TEXT,
    "profileAssociationType" TEXT,
    "profileID" INTEGER,
    "profileLabelLanguage" VARCHAR,
    "profileLabel" TEXT,
    "parentProperties" int[],
    "ancestorProperties" int[]);

  /*
   * Update tmsp_last_dfh_update for all records of given
   * profile_id
   */
  UPDATE
    data_for_history.api_property
  SET
    tmsp_last_dfh_update = param_tmsp_last_dfh_update
  WHERE
    dfh_fk_profile = param_profile_id;

  /*
   * Mark all records missing in the json data
   * as removed from api.
   * (this is independent from the requested language)
   */
  WITH tw1 AS (
    SELECT
      dfh_pk_property,
      dfh_property_domain,
      dfh_property_range,
      dfh_fk_profile
    FROM
      data_for_history.api_property
    WHERE
      dfh_fk_profile = param_profile_id
    EXCEPT
    SELECT
      dfh_pk_property,
      dfh_property_domain,
      dfh_property_range,
      dfh_fk_profile
    FROM
      properties_profile_from_api
    WHERE
      dfh_fk_profile = param_profile_id
),
tw2 AS (
  UPDATE
    data_for_history.api_property t1
  SET
    removed_from_api = TRUE
  FROM
    tw1 t2
  WHERE
    t1.dfh_fk_profile = t2.dfh_fk_profile
    AND t1.dfh_pk_property = t2.dfh_pk_property
    AND t1.dfh_property_domain = t2.dfh_property_domain
    AND t1.dfh_property_range = t2.dfh_property_range
  RETURNING
    t1.*
)
SELECT
  jsonb_agg(jsonb_build_object('dfh_pk_property', dfh_pk_property, 'dfh_property_domain', dfh_property_domain, 'dfh_property_range', dfh_property_range, 'dfh_fk_profile', dfh_fk_profile, 'requested_language', requested_language, 'removed_from_api', removed_from_api, 'dfh_property_label', dfh_property_label)) INTO removed
FROM
  tw2;

  /*
   * Update language dependent fields of existing records
   */
  /*
   * Update property_labels
   */
  UPDATE
    data_for_history.api_property t1
  SET
    dfh_property_label = t2.dfh_property_label
  FROM
    properties_profile_from_api t2
  WHERE
    t1.dfh_property_label_language = t2.dfh_property_label_language
    AND t1.dfh_fk_profile = t2.dfh_fk_profile
    AND t1.dfh_pk_property = t2.dfh_pk_property;

  /*
   * Update property_inverse_labels
   */
  UPDATE
    data_for_history.api_property t1
  SET
    dfh_property_inverse_label = t2.dfh_property_inverse_label
  FROM
    properties_profile_from_api t2
  WHERE
    t1.dfh_property_label_language = t2.dfh_property_label_language
    AND t1.dfh_fk_profile = t2.dfh_fk_profile
    AND t1.dfh_pk_property = t2.dfh_pk_property;

  /*
   * Update scope_notes
   */
  UPDATE
    data_for_history.api_property t1
  SET
    dfh_property_scope_note = t2.dfh_property_scope_note
  FROM
    properties_profile_from_api t2
  WHERE
    t1.dfh_property_scope_note_language = t2.dfh_property_scope_note_language
    AND t1.dfh_fk_profile = t2.dfh_fk_profile
    AND t1.dfh_pk_property = t2.dfh_pk_property;

  /*
   * Update dfh_namespace_label
   */
  UPDATE
    data_for_history.api_property t1
  SET
    dfh_namespace_label = t2.dfh_namespace_label
  FROM
    properties_profile_from_api t2
  WHERE
    t1.dfh_namespace_label_language = t2.dfh_namespace_label_language
    AND t1.dfh_fk_profile = t2.dfh_fk_profile
    AND t1.dfh_pk_property = t2.dfh_pk_property;

  /*
   * Update dfh_profile_label
   */
  UPDATE
    data_for_history.api_property t1
  SET
    dfh_profile_label = t2.dfh_profile_label
  FROM
    properties_profile_from_api t2
  WHERE
    t1.dfh_profile_label_language = t2.dfh_profile_label_language
    AND t1.dfh_fk_profile = t2.dfh_fk_profile
    AND t1.dfh_pk_property = t2.dfh_pk_property;

  /*
   * Update language independent fields of existing records
   * This affects also records of other languages than the requested
   */
  WITH tw1 AS (
    UPDATE
      data_for_history.api_property t1
    SET
      removed_from_api = FALSE,
      dfh_pk_property = t2.dfh_pk_property,
      dfh_is_inherited = t2.dfh_is_inherited,
      dfh_property_domain = t2.dfh_property_domain,
      dfh_domain_instances_min_quantifier = t2.dfh_domain_instances_min_quantifier,
      dfh_domain_instances_max_quantifier = t2.dfh_domain_instances_max_quantifier,
      dfh_property_range = t2.dfh_property_range,
      dfh_range_instances_min_quantifier = t2.dfh_range_instances_min_quantifier,
      dfh_range_instances_max_quantifier = t2.dfh_range_instances_max_quantifier,
      dfh_identity_defining = t2.dfh_identity_defining,
      dfh_is_has_type_subproperty = t2.dfh_is_has_type_subproperty,
      dfh_property_identifier_in_namespace = t2.dfh_property_identifier_in_namespace,
      dfh_namespace_uri = t2.dfh_namespace_uri,
      dfh_fk_namespace = t2.dfh_fk_namespace,
      dfh_profile_association_type = t2.dfh_profile_association_type,
      dfh_fk_profile = t2.dfh_fk_profile,
      dfh_parent_properties = t2.dfh_parent_properties,
      dfh_ancestor_properties = t2.dfh_ancestor_properties
    FROM
      properties_profile_from_api t2
    WHERE
      t1.dfh_fk_profile = t2.dfh_fk_profile
      AND t1.dfh_pk_property = t2.dfh_pk_property
      AND t1.dfh_property_domain = t2.dfh_property_domain
      AND t1.dfh_property_range = t2.dfh_property_range
    RETURNING
      t1.*
)
  SELECT
    jsonb_agg(jsonb_build_object('dfh_pk_property', dfh_pk_property, 'dfh_property_domain', dfh_property_range, 'dfh_property_range', dfh_property_range, 'dfh_fk_profile', dfh_fk_profile, 'requested_language', requested_language, 'removed_from_api', removed_from_api, 'dfh_property_label', dfh_property_label)) INTO updated
  FROM
    tw1;

  /*
   * Insert or update all new records
   */
  WITH tw1 AS (
INSERT INTO data_for_history.api_property(tmsp_last_dfh_update, removed_from_api, requested_language, dfh_pk_property, dfh_property_label_language, dfh_property_label, dfh_property_inverse_label, dfh_property_scope_note_language, dfh_property_scope_note, dfh_is_inherited, dfh_property_domain, dfh_domain_instances_min_quantifier, dfh_domain_instances_max_quantifier, dfh_property_range, dfh_range_instances_min_quantifier, dfh_range_instances_max_quantifier, dfh_identity_defining, dfh_is_has_type_subproperty, dfh_property_identifier_in_namespace, dfh_namespace_uri, dfh_fk_namespace, dfh_namespace_label_language, dfh_namespace_label, dfh_profile_association_type, dfh_fk_profile, dfh_profile_label_language, dfh_profile_label, dfh_parent_properties, dfh_ancestor_properties)
    SELECT DISTINCT ON (t1.requested_language,
      t1.dfh_pk_property,
      t1.dfh_property_domain,
      t1.dfh_property_range,
      t1.dfh_fk_profile)
      param_tmsp_last_dfh_update,
      FALSE,
      t1.requested_language,
      t1.dfh_pk_property,
      t1.dfh_property_label_language,
      t1.dfh_property_label,
      t1.dfh_property_inverse_label,
      t1.dfh_property_scope_note_language,
      t1.dfh_property_scope_note,
      t1.dfh_is_inherited,
      t1.dfh_property_domain,
      t1.dfh_domain_instances_min_quantifier,
      t1.dfh_domain_instances_max_quantifier,
      t1.dfh_property_range,
      t1.dfh_range_instances_min_quantifier,
      t1.dfh_range_instances_max_quantifier,
      t1.dfh_identity_defining,
      t1.dfh_is_has_type_subproperty,
      t1.dfh_property_identifier_in_namespace,
      t1.dfh_namespace_uri,
      t1.dfh_fk_namespace,
      t1.dfh_namespace_label_language,
      t1.dfh_namespace_label,
      t1.dfh_profile_association_type,
      t1.dfh_fk_profile,
      t1.dfh_profile_label_language,
      t1.dfh_profile_label,
      t1.dfh_parent_properties,
      t1.dfh_ancestor_properties
    FROM
      properties_profile_from_api t1
    WHERE
      t1.requested_language = param_requested_language
      AND t1.dfh_fk_profile = param_profile_id
    ON CONFLICT (requested_language,
      dfh_pk_property,
      dfh_property_domain,
      dfh_property_range,
      dfh_fk_profile)
      DO UPDATE SET
        tmsp_last_dfh_update = EXCLUDED.tmsp_last_dfh_update,
        removed_from_api = EXCLUDED.removed_from_api,
        requested_language = EXCLUDED.requested_language,
        dfh_pk_property = EXCLUDED.dfh_pk_property,
        dfh_property_label_language = EXCLUDED.dfh_property_label_language,
        dfh_property_label = EXCLUDED.dfh_property_label,
        dfh_property_inverse_label = EXCLUDED.dfh_property_inverse_label,
        dfh_property_scope_note_language = EXCLUDED.dfh_property_scope_note_language,
        dfh_property_scope_note = EXCLUDED.dfh_property_scope_note,
        dfh_is_inherited = EXCLUDED.dfh_is_inherited,
        dfh_domain_instances_min_quantifier = EXCLUDED.dfh_domain_instances_min_quantifier,
        dfh_domain_instances_max_quantifier = EXCLUDED.dfh_domain_instances_max_quantifier,
        dfh_range_instances_min_quantifier = EXCLUDED.dfh_range_instances_min_quantifier,
        dfh_range_instances_max_quantifier = EXCLUDED.dfh_range_instances_max_quantifier,
        dfh_identity_defining = EXCLUDED.dfh_identity_defining,
        dfh_is_has_type_subproperty = EXCLUDED.dfh_is_has_type_subproperty,
        dfh_property_identifier_in_namespace = EXCLUDED.dfh_property_identifier_in_namespace,
        dfh_namespace_uri = EXCLUDED.dfh_namespace_uri,
        dfh_fk_namespace = EXCLUDED.dfh_fk_namespace,
        dfh_namespace_label_language = EXCLUDED.dfh_namespace_label_language,
        dfh_namespace_label = EXCLUDED.dfh_namespace_label,
        dfh_profile_association_type = EXCLUDED.dfh_profile_association_type,
        dfh_fk_profile = EXCLUDED.dfh_fk_profile,
        dfh_profile_label_language = EXCLUDED.dfh_profile_label_language,
        dfh_profile_label = EXCLUDED.dfh_profile_label,
        dfh_parent_properties = EXCLUDED.dfh_parent_properties,
        dfh_ancestor_properties = EXCLUDED.dfh_ancestor_properties
      RETURNING
        *
)
    SELECT
      jsonb_agg(jsonb_build_object('dfh_pk_property', dfh_pk_property, 'dfh_property_domain', dfh_property_range, 'dfh_property_range', dfh_property_range, 'dfh_fk_profile', dfh_fk_profile, 'requested_language', requested_language, 'removed_from_api', removed_from_api, 'dfh_property_label', dfh_property_label)) INTO inserted
    FROM
      tw1;

  /*
   * Return kind of a protocol
   */
  RETURN json_build_object('removed', removed, 'updated', updated, 'inserted', inserted);
END;
$$;

--
-- TOC entry 1306 (class 1255 OID 24133)
-- Name: update_api_tables(integer, character varying, timestamp with time zone, json, json, json); Type: FUNCTION; Schema: data_for_history; Owner: -
--
CREATE FUNCTION data_for_history.update_api_tables(param_profile_id integer, param_requested_language character varying, param_tmsp_last_dfh_update timestamp with time zone, param_profile_data json DEFAULT NULL::json, param_classes_profile_data json DEFAULT NULL::json, param_properties_profile_data json DEFAULT NULL::json)
  RETURNS json
  LANGUAGE plpgsql
  AS $$
DECLARE
  api_profile json;
  api_class json;
  api_property json;
BEGIN
  /**************************************************************
   * Profiles
   ***************************************************************/
  SELECT
    data_for_history.update_api_profiles_table(param_profile_id, param_requested_language, param_tmsp_last_dfh_update, param_profile_data) INTO api_profile;

  /**************************************************************
   * Classes-Profile
   ***************************************************************/
  SELECT
    data_for_history.update_api_classes_profile_table(param_profile_id, param_requested_language, param_tmsp_last_dfh_update, param_classes_profile_data) INTO api_class;

  /**************************************************************
   * Properties-Profile
   ***************************************************************/
  SELECT
    data_for_history.update_api_properties_profile_table(param_profile_id, param_requested_language, param_tmsp_last_dfh_update, param_properties_profile_data) INTO api_property;
  RETURN json_build_object('api_profile', api_profile, 'api_class', api_class, 'api_property', api_property);
END;
$$;

--
-- TOC entry 1291 (class 1255 OID 23700)
-- Name: add_te_en_to_project(integer, integer, integer); Type: FUNCTION; Schema: information; Owner: -
--
CREATE FUNCTION information.add_te_en_to_project(param_pk_entity integer, param_pk_project integer, param_account_id integer)
  RETURNS void
  LANGUAGE plpgsql
  AS $$
BEGIN
  -- Find all roles related to temporal entity
  WITH te_ent_roles AS(
    SELECT
      *
    FROM
      information.get_outgoing_roles_to_add(param_pk_entity)
    UNION ALL
    SELECT
      *
    FROM
      information.get_ingoing_roles_to_add(param_pk_entity)
),
-- Find all entity_associations of temporal entities
te_ent_entity_associations AS(
  SELECT
    *
  FROM
    information.get_outgoing_entity_associations_to_add(param_pk_entity)
  UNION ALL
  SELECT
    *
  FROM
    information.get_ingoing_entity_associations_to_add(param_pk_entity)
),
-- get a list of all pk_entities of repo version
pk_entities_of_repo AS(
  SELECT
    param_pk_entity AS pk_entity,
    NULL::calendar_type AS calendar
  UNION
  SELECT
    pk_entity,
    calendar
  FROM
    te_ent_roles
  UNION
  SELECT
    pk_entity,
    NULL::calendar_type AS calendar
  FROM
    te_ent_entity_associations)
  INSERT INTO projects.v_info_proj_rel(fk_project, is_in_project, fk_entity, calendar, fk_last_modifier)
  SELECT
    param_pk_project,
    TRUE,
    pk_entity,
    calendar,
    param_account_id
  FROM
    pk_entities_of_repo;
END
$$;

--
-- TOC entry 1275 (class 1255 OID 20865)
-- Name: appe_tokens_for_comparision(jsonb); Type: FUNCTION; Schema: information; Owner: -
--
CREATE FUNCTION information.appe_tokens_for_comparision(appe_label jsonb, OUT tokens_for_comparision jsonb)
  RETURNS jsonb
  LANGUAGE sql
  AS $$
  SELECT
    array_to_json(array_agg(json_build_object('string', tokens_without_ids.string, 'typeId', tokens_without_ids.typeId)))::jsonb AS tokens_for_comparision
  FROM(
    SELECT
      appe.tokens ->> 'string' AS string,
      appe.tokens ->> 'typeId' AS typeId
    FROM(
      SELECT
        jsonb_array_elements(appe_label -> 'tokens') AS tokens) AS appe) AS tokens_without_ids
$$;

--
-- TOC entry 1276 (class 1255 OID 20866)
-- Name: appellation_label_to_string(jsonb); Type: FUNCTION; Schema: information; Owner: -
--
CREATE FUNCTION information.appellation_label_to_string(appellation_label jsonb, OUT string text)
  RETURNS text
  LANGUAGE sql
  AS $$
  SELECT
    STRING_AGG(l.tokens ->> 'string', '')
  FROM(
    SELECT
      jsonb_array_elements(appellation_label -> 'tokens') AS tokens) AS l
$$;

--
-- TOC entry 1297 (class 1255 OID 23910)
-- Name: get_accociated_text_properties(integer); Type: FUNCTION; Schema: information; Owner: -
--
CREATE FUNCTION information.get_accociated_text_properties(param_pk_entity integer)
  RETURNS TABLE(
    pk_entity integer,
    fk_class_field integer)
  LANGUAGE plpgsql
  AS $$
BEGIN
  RETURN QUERY
  SELECT
    t1.pk_entity,
    t1.fk_class_field
  FROM
    information.text_property t1
  WHERE
    fk_concerned_entity = param_pk_entity;
END;
$$;

--
-- TOC entry 1290 (class 1255 OID 23698)
-- Name: get_ingoing_entity_associations_to_add(integer); Type: FUNCTION; Schema: information; Owner: -
--
CREATE FUNCTION information.get_ingoing_entity_associations_to_add(param_pk_entity integer)
  RETURNS TABLE(
    pk_entity integer,
    fk_class integer,
    fk_info_domain integer,
    fk_property integer,
    fk_info_range integer,
    max_quantifier smallint)
  LANGUAGE plpgsql
  AS $$
BEGIN
  RETURN QUERY WITH tw1 AS(
    SELECT
      t1.pk_entity,
      t1.fk_class,
      'persistent_item' table_name
    FROM
      information.persistent_item t1
    WHERE
      t1.pk_entity = param_pk_entity
    UNION ALL
    SELECT
      t2.pk_entity,
      t2.fk_class,
      'temporal_entity' table_name
    FROM
      information.temporal_entity t2
    WHERE
      t2.pk_entity = param_pk_entity
)
  SELECT DISTINCT
    ts2.pk_entity,
    ts1.fk_class,
    ts2.fk_info_domain,
    ts2.fk_property,
    ts2.fk_info_range,
    ts1.max_quantifier
  FROM(
    SELECT
      t1.dfh_pk_property,
      t1.fk_class,
      t1.max_quantifier
    FROM
      system.v_auto_add_properties t1,
      tw1
    WHERE
      t1.fk_class = tw1.fk_class) AS ts1
  CROSS JOIN LATERAL(
    SELECT
      t1.pk_entity,
      t1.fk_info_domain,
      t1.fk_property,
      t1.fk_info_range
    FROM
      information.v_entity_association t1,
      tw1
    WHERE
      t1.fk_info_range = tw1.pk_entity
      AND t1.fk_property = ts1.dfh_pk_property
      AND t1.is_in_project_count IS NOT NULL
    ORDER BY
      t1.is_in_project_count DESC,
      t1.tmsp_creation DESC
    LIMIT(
      SELECT
        CASE WHEN ts1.max_quantifier = - 1 THEN
          NULL
        ELSE
          ts1.max_quantifier
        END)) AS ts2;
END;
$$;

--
-- TOC entry 1288 (class 1255 OID 23695)
-- Name: get_ingoing_roles_to_add(integer); Type: FUNCTION; Schema: information; Owner: -
--
CREATE FUNCTION information.get_ingoing_roles_to_add(param_pk_entity integer)
  RETURNS TABLE(
    pk_entity integer,
    fk_class integer,
    fk_temporal_entity integer,
    fk_property integer,
    fk_entity integer,
    max_quantifier smallint,
    calendar public.calendar_type)
  LANGUAGE plpgsql
  AS $$
BEGIN
  RETURN QUERY WITH tw1 AS(
    SELECT
      t1.pk_entity,
      t1.fk_class,
      'persistent_item' table_name
    FROM
      information.persistent_item t1
    WHERE
      t1.pk_entity = param_pk_entity
    UNION ALL
    SELECT
      t2.pk_entity,
      t2.fk_class,
      'temporal_entity' table_name
    FROM
      information.temporal_entity t2
    WHERE
      t2.pk_entity = param_pk_entity
)
  SELECT DISTINCT
    ts2.pk_entity,
    ts1.fk_class,
    ts2.fk_temporal_entity,
    ts2.fk_property,
    ts2.fk_entity,
    ts1.max_quantifier,
    ts2.calendar
  FROM(
    SELECT
      t1.dfh_pk_property,
      t1.fk_class,
      t1.max_quantifier
    FROM
      system.v_auto_add_properties t1,
      tw1
    WHERE
      t1.fk_class = tw1.fk_class) AS ts1
  CROSS JOIN LATERAL(
    SELECT
      t1.pk_entity,
      t1.fk_temporal_entity,
      t1.fk_property,
      t1.fk_entity,
      t1.community_favorite_calendar AS calendar
    FROM
      information.v_role t1,
      tw1
    WHERE
      t1.fk_entity = tw1.pk_entity
      AND t1.fk_property = ts1.dfh_pk_property
      AND t1.is_in_project_count IS NOT NULL
    ORDER BY
      t1.is_in_project_count DESC,
      t1.tmsp_creation DESC
    LIMIT(
      SELECT
        CASE WHEN ts1.max_quantifier = - 1 THEN
          NULL
        ELSE
          ts1.max_quantifier
        END)) AS ts2;
END;
$$;

--
-- TOC entry 1315 (class 1255 OID 24285)
-- Name: get_ingoing_roles_to_add(integer, integer); Type: FUNCTION; Schema: information; Owner: -
--
CREATE FUNCTION information.get_ingoing_roles_to_add(entity_id integer, project_id integer)
  RETURNS TABLE(
    pk_entity integer,
    fk_entity integer,
    fk_temporal_entity integer,
    calendar public.calendar_type)
  LANGUAGE sql
  AS $$
  WITH tw1 AS(
    -- select profiles the project
    SELECT
      fk_profile
    FROM
      projects.dfh_profile_proj_rel
    WHERE
      fk_project = project_id
    UNION
    SELECT
      5 AS fk_profile -- GEOVISTORY BASICS
),
tw2 AS(
  -- select properties of the project
  SELECT DISTINCT ON(pk_property,
    has_domain,
    has_range)
    pk_property,
    has_domain,
    has_range,
    domain_instances_max_quantifier
  FROM
    tw1 t1,
    data_for_history.api_property t2,
    data_for_history.v_property t3
  WHERE
    t1.fk_profile = t2.dfh_fk_profile
    AND t3.pk_property = t2.dfh_pk_property
),
tw3 AS(
  -- select all ingoing roles, joined with range and domain class
  SELECT
    t1.pk_entity,
    t1.fk_entity,
    t1.fk_temporal_entity,
    t3.fk_class range_class,
    t1.fk_property,
    CASE WHEN t4.domain_instances_max_quantifier = - 1 THEN
      FLOAT8 '+infinity'
    WHEN t4.domain_instances_max_quantifier IS NULL THEN
      FLOAT8 '+infinity'
    ELSE
      t4.domain_instances_max_quantifier
    END target_max_quantifier,
    t1.is_in_project_count,
    -- counts the items of same range and property
    row_number() OVER(PARTITION BY t3.fk_class,
      t1.fk_property ORDER BY is_in_project_count DESC) AS rank,
    t1.community_favorite_calendar calendar
  FROM
    information.v_role t1,
    information.v_entity_class_map t2,
    information.v_entity_class_map t3,
    tw2 t4
  WHERE
    fk_entity = entity_id
    AND t1.fk_temporal_entity = t2.pk_entity
    AND t1.fk_entity = t3.pk_entity
    AND t1.fk_property = t4.pk_property
    AND t2.fk_class = t4.has_domain
    AND t3.fk_class = t4.has_range
)
SELECT
  pk_entity,
  fk_entity,
  fk_temporal_entity,
  calendar
FROM
  tw3
WHERE
  target_max_quantifier >= rank;
$$;

--
-- TOC entry 1289 (class 1255 OID 23697)
-- Name: get_outgoing_entity_associations_to_add(integer); Type: FUNCTION; Schema: information; Owner: -
--
CREATE FUNCTION information.get_outgoing_entity_associations_to_add(param_pk_entity integer)
  RETURNS TABLE(
    pk_entity integer,
    fk_class integer,
    fk_info_domain integer,
    fk_property integer,
    fk_info_range integer,
    max_quantifier smallint)
  LANGUAGE plpgsql
  AS $$
BEGIN
  RETURN QUERY WITH tw1 AS(
    SELECT
      t1.pk_entity,
      t1.fk_class,
      'persistent_item' table_name
    FROM
      information.persistent_item t1
    WHERE
      t1.pk_entity = param_pk_entity
    UNION ALL
    SELECT
      t2.pk_entity,
      t2.fk_class,
      'temporal_entity' table_name
    FROM
      information.temporal_entity t2
    WHERE
      t2.pk_entity = param_pk_entity
)
  SELECT DISTINCT
    ts2.pk_entity,
    ts1.fk_class,
    ts2.fk_info_domain,
    ts2.fk_property,
    ts2.fk_info_range,
    ts1.max_quantifier
  FROM(
    SELECT
      t1.dfh_pk_property,
      t1.fk_class,
      t1.max_quantifier
    FROM
      system.v_auto_add_properties t1,
      tw1
    WHERE
      t1.fk_class = tw1.fk_class) AS ts1
  CROSS JOIN LATERAL(
    SELECT
      t1.pk_entity,
      t1.fk_info_domain,
      t1.fk_property,
      t1.fk_info_range
    FROM
      information.v_entity_association t1,
      tw1
    WHERE
      t1.fk_info_domain = tw1.pk_entity
      AND t1.fk_property = ts1.dfh_pk_property
      AND t1.is_in_project_count IS NOT NULL
    ORDER BY
      t1.is_in_project_count DESC,
      t1.tmsp_creation DESC
    LIMIT(
      SELECT
        CASE WHEN ts1.max_quantifier = - 1 THEN
          NULL
        ELSE
          ts1.max_quantifier
        END)) AS ts2;
END;
$$;

--
-- TOC entry 1326 (class 1255 OID 24702)
-- Name: get_outgoing_statements_to_add(integer, integer); Type: FUNCTION; Schema: information; Owner: -
--
CREATE FUNCTION information.get_outgoing_statements_to_add(entity_id integer, project_id integer)
  RETURNS TABLE(
    pk_entity integer,
    fk_object_info integer,
    fk_subject_info integer)
  LANGUAGE sql
  AS $$
  WITH tw1 AS(
    -- select profiles the project
    SELECT
      fk_profile
    FROM
      projects.dfh_profile_proj_rel
    WHERE
      fk_project = project_id
    UNION
    SELECT
      5 AS fk_profile -- GEOVISTORY BASICS
),
tw2 AS(
  -- select properties of the project
  SELECT DISTINCT ON(pk_property,
    has_domain,
    has_range)
    pk_property,
    has_domain,
    has_range,
    range_instances_max_quantifier
  FROM
    tw1 t1,
    data_for_history.api_property t2,
    data_for_history.v_property t3
  WHERE
    t1.fk_profile = t2.dfh_fk_profile
    AND t3.pk_property = t2.dfh_pk_property
),
tw3 AS(
  -- select all outgoing statements, joined with range and domain class
  SELECT
    t1.pk_entity,
    t1.fk_object_info,
    t1.fk_subject_info,
    t3.fk_class range_class,
    t1.fk_property,
    CASE WHEN t4.range_instances_max_quantifier = - 1 THEN
      FLOAT8 '+infinity'
    WHEN t4.range_instances_max_quantifier IS NULL THEN
      FLOAT8 '+infinity'
    ELSE
      t4.range_instances_max_quantifier
    END target_max_quantifier,
    t1.is_in_project_count,
    -- counts the items of same domain and property
    row_number() OVER(PARTITION BY t3.fk_class,
      t1.fk_property ORDER BY is_in_project_count DESC) AS rank
  FROM
    information.v_statement t1,
    information.v_entity_class_map t2,
    information.v_entity_class_map t3,
    tw2 t4
  WHERE
    fk_subject_info = entity_id
    AND t1.fk_subject_info = t2.pk_entity
    AND t1.fk_object_info = t3.pk_entity
    AND t1.fk_property = t4.pk_property
    AND t1.is_in_project_count > 0
    AND t4.has_domain IN(t2.fk_class, 50 -- make every class to a timespan class
)
    AND t3.fk_class = t4.has_range
)
SELECT
  pk_entity,
  fk_object_info,
  fk_subject_info
FROM
  tw3
WHERE
  target_max_quantifier >= rank;
$$;

--
-- TOC entry 1277 (class 1255 OID 20882)
-- Name: text_property_to_string(jsonb); Type: FUNCTION; Schema: information; Owner: -
--
CREATE FUNCTION information.text_property_to_string(text_property_quill_doc jsonb, OUT string text)
  RETURNS text
  LANGUAGE sql
  AS $$
  SELECT
    STRING_AGG(l.ops ->> 'insert', '')
  FROM(
    SELECT
      jsonb_array_elements(text_property_quill_doc -> 'contents' -> 'ops') AS ops) AS l
$$;

--
-- TOC entry 1281 (class 1255 OID 23180)
-- Name: v_dimension_find_or_create(); Type: FUNCTION; Schema: information; Owner: -
--
CREATE FUNCTION information.v_dimension_find_or_create()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  AS $$
DECLARE
  resulting_pk integer;
  resulting_row information.v_dimension;
BEGIN
  -- RAISE INFO 'input values: %', NEW;
  ------ if existing, store in result -----
  SELECT
    pk_entity
  FROM
    INTO resulting_pk information.dimension
  WHERE
    fk_class = NEW.fk_class
    AND fk_measurement_unit = NEW.fk_measurement_unit
    AND numeric_value = NEW.numeric_value;
  -- RAISE INFO 'result of select: %', resulting_row;
  ------- if not existing, insert and store in result -----
  IF NOT FOUND THEN
    -- RAISE INFO 'Not found, creating new...';
    WITH _insert AS (
INSERT INTO information.dimension(fk_class, fk_measurement_unit, numeric_value)
        VALUES (NEW.fk_class, NEW.fk_measurement_unit, NEW.numeric_value)
        -- return all fields of the new row
      RETURNING
        *)
      SELECT
        pk_entity
      FROM
        INTO resulting_pk _insert;
    -- RAISE INFO 'result of insert: %', resulting_row;
  END IF;
  SELECT
    *
  FROM
    INTO resulting_row information.v_dimension
  WHERE
    pk_entity = resulting_pk;
  RETURN resulting_row;
END;
$$;

--
-- TOC entry 1318 (class 1255 OID 24425)
-- Name: v_lang_string_find_or_create(); Type: FUNCTION; Schema: information; Owner: -
--
CREATE FUNCTION information.v_lang_string_find_or_create()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  AS $$
DECLARE
  resulting_pk integer;
  resulting_row information.v_lang_string;
BEGIN
  ------ if existing, store in result -----
  SELECT
    pk_entity
  FROM
    INTO resulting_pk information.lang_string
  WHERE
    fk_class IS NOT DISTINCT FROM NEW.fk_class
    AND fk_language IS NOT DISTINCT FROM NEW.fk_language
    AND string = coalesce(NEW.string, commons.quill_doc_to_string(NEW.quill_doc));
  -- RAISE INFO 'resulting_pk: %', resulting_pk;
  ------- if not existing, insert and store in result -----
  IF NOT FOUND THEN
    --RAISE INFO 'Not found, creating new...';
    WITH _insert AS (
INSERT INTO information.lang_string(fk_class, fk_language, string, quill_doc)
        VALUES (NEW.fk_class, NEW.fk_language, NEW.string, NEW.quill_doc)
        -- return all fields of the new row
      RETURNING
        *)
      SELECT
        pk_entity
      FROM
        INTO resulting_pk _insert;
    -- RAISE INFO 'result of insert: %', resulting_row;
  END IF;
  SELECT
    *
  FROM
    INTO resulting_row information.v_lang_string
  WHERE
    pk_entity = resulting_pk;
  RETURN resulting_row;
END;
$$;

--
-- TOC entry 1278 (class 1255 OID 20885)
-- Name: v_language_find_or_create(); Type: FUNCTION; Schema: information; Owner: -
--
CREATE FUNCTION information.v_language_find_or_create()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  AS $$
DECLARE
  resulting_pk integer;
  resulting_row information.v_language;
BEGIN
  -- RAISE INFO 'input values: %', NEW;
  ------ if existing, store in result -----
  SELECT
    *
  FROM
    INTO resulting_row information.v_language
  WHERE
    fk_class = NEW.fk_class
    AND lang_type = NEW.lang_type
    AND scope = NEW.scope
    AND iso6392b = NEW.iso6392b
    AND iso6392t = NEW.iso6392t
    AND iso6391 = NEW.iso6391
    AND pk_language = NEW.pk_language;
  -- RAISE INFO 'result of select: %', resulting_row;
  ------- if not existing, insert and store in result -----
  IF NOT FOUND THEN
    -- RAISE INFO 'Not found, creating new...';
    WITH _insert AS (
INSERT INTO information.language(fk_class, lang_type, scope, iso6392b, iso6392t, iso6391, pk_language)
        VALUES (NEW.fk_class, NEW.lang_type, NEW.scope, NEW.iso6392b, NEW.iso6392t, NEW.iso6391, NEW.pk_language)
        -- return all fields of the new row
      RETURNING
        *)
      SELECT
        pk_entity
      FROM
        INTO resulting_pk _insert;
    -- RAISE INFO 'result of insert: %', resulting_row;
  END IF;
  SELECT
    *
  FROM
    INTO resulting_row information.v_language
  WHERE
    pk_entity = resulting_pk;
  RETURN resulting_row;
END;
$$;

--
-- TOC entry 1283 (class 1255 OID 20887)
-- Name: v_place_find_or_create(); Type: FUNCTION; Schema: information; Owner: -
--
CREATE FUNCTION information.v_place_find_or_create()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  AS $$
DECLARE
  resulting_pk integer;
  resulting_row information.v_place;
BEGIN
  -- RAISE INFO 'input values: %', NEW;
  ------ if existing, store in result -----
  SELECT
    *
  FROM
    INTO resulting_row information.v_place
  WHERE
    geo_point = ST_SetSRID(ST_MakePoint(NEW.long, NEW.lat), 4326)::geography
    AND fk_class = NEW.fk_class;
  -- RAISE INFO 'result of select: %', resulting_row;
  ------- if not existing, insert and store in result -----
  IF NOT FOUND THEN
    -- RAISE INFO 'Not found, creating new...';
    WITH _insert AS (
INSERT INTO information.place(geo_point, fk_class)
        VALUES (ST_SetSRID(ST_MakePoint(NEW.long, NEW.lat), 4326)::geography, NEW.fk_class)
        -- return all fields of the new row
      RETURNING
        *)
      SELECT
        pk_entity
      FROM
        INTO resulting_pk _insert;
    SELECT
      *
    FROM
      INTO resulting_row information.v_place
    WHERE
      pk_entity = resulting_pk;
    -- RAISE INFO 'result of insert: %', resulting_row;
  END IF;
  RETURN resulting_row;
END;
$$;

--
-- TOC entry 1279 (class 1255 OID 20889)
-- Name: v_statement_find_or_create(); Type: FUNCTION; Schema: information; Owner: -
--
CREATE FUNCTION information.v_statement_find_or_create()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  AS $$
DECLARE
  resulting_pk integer;
  resulting_row information.v_statement;
BEGIN
  -- RAISE INFO 'input values: %', NEW;
  ------ if existing, store in result -----
  SELECT
    pk_entity
  FROM
    INTO resulting_pk information.statement
  WHERE
    fk_property = NEW.fk_property
    AND fk_property_of_property = NEW.fk_property_of_property
    AND fk_subject_info = NEW.fk_subject_info
    AND fk_subject_data = NEW.fk_subject_data
    AND fk_subject_tables_row = NEW.fk_subject_tables_row
    AND fk_subject_tables_cell = NEW.fk_subject_tables_cell
    AND fk_object_info = NEW.fk_object_info
    AND fk_object_data = NEW.fk_object_data
    AND fk_object_tables_row = NEW.fk_object_tables_row
    AND fk_object_tables_cell = NEW.fk_object_tables_cell;
  -- RAISE INFO 'result of select: %', resulting_row;
  ------- if not existing, insert and store in result -----
  IF NOT FOUND THEN
    -- RAISE INFO 'Not found, creating new...';
    WITH _insert AS (
INSERT INTO information.statement(fk_property, fk_property_of_property, fk_subject_info, fk_subject_data, fk_subject_tables_row, fk_subject_tables_cell, fk_object_info, fk_object_data, fk_object_tables_row, fk_object_tables_cell)
        VALUES (NEW.fk_property, NEW.fk_property_of_property, NEW.fk_subject_info, NEW.fk_subject_data, NEW.fk_subject_tables_row, NEW.fk_subject_tables_cell, NEW.fk_object_info, NEW.fk_object_data, NEW.fk_object_tables_row, NEW.fk_object_tables_cell)
        -- return all fields of the new row
      RETURNING
        *)
      SELECT
        pk_entity
      FROM
        INTO resulting_pk _insert;
    -- RAISE INFO 'result of insert: %', resulting_row;
  END IF;
  SELECT
    *
  FROM
    INTO resulting_row information.v_statement
  WHERE
    pk_entity = resulting_pk;
  RETURN resulting_row;
END;
$$;

--
-- TOC entry 1282 (class 1255 OID 20891)
-- Name: v_text_property_find_or_create(); Type: FUNCTION; Schema: information; Owner: -
--
CREATE FUNCTION information.v_text_property_find_or_create()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  AS $$
DECLARE
  resulting_pk integer;
  resulting_row information.v_text_property;
BEGIN
  -- RAISE INFO 'input values: %', NEW;
  ------ if existing, store in result -----
  SELECT
    *
  FROM
    INTO resulting_row information.v_text_property
  WHERE
    string = COALESCE(NEW.string, commons.quill_doc_to_string(NEW.quill_doc))
    AND fk_class_field = NEW.fk_class_field
    AND fk_concerned_entity = NEW.fk_concerned_entity
    AND fk_language = NEW.fk_language;
  -- RAISE INFO 'result of select: %', resulting_pk;
  ------- if not existing, insert and store in result -----
  IF NOT FOUND THEN
    -- RAISE INFO 'Not found, creating new...';
    WITH _insert AS (
INSERT INTO information.text_property(string, quill_doc, fk_class_field, fk_concerned_entity, fk_language)
        VALUES (NEW.string, NEW.quill_doc::jsonb, NEW.fk_class_field, NEW.fk_concerned_entity, NEW.fk_language)
        -- return all fields of the new row
      RETURNING
        *)
      SELECT
        pk_entity
      FROM
        INTO resulting_pk _insert;
    SELECT
      *
    FROM
      INTO resulting_row information.v_text_property
    WHERE
      pk_entity = resulting_pk;
    -- RAISE INFO 'result of insert: %', resulting_pk;
  END IF;
  RETURN resulting_row;
END;
$$;

--
-- TOC entry 1280 (class 1255 OID 20892)
-- Name: v_time_primitive_find_or_create(); Type: FUNCTION; Schema: information; Owner: -
--
CREATE FUNCTION information.v_time_primitive_find_or_create()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  AS $$
DECLARE
  resulting_pk integer;
  resulting_row information.v_time_primitive;
BEGIN
  -- RAISE INFO 'input values: %', NEW;
  ------ if existing, store in result -----
  SELECT
    pk_entity
  FROM
    INTO resulting_pk information.time_primitive
  WHERE
    julian_day = NEW.julian_day
    AND duration = NEW.duration
    AND calendar = NEW.calendar
    AND fk_class = NEW.fk_class;
  -- RAISE INFO 'result of select: %', resulting_row;
  ------- if not existing, insert and store in result -----
  IF NOT FOUND THEN
    -- RAISE INFO 'Not found, creating new...';
    WITH _insert AS (
INSERT INTO information.time_primitive(julian_day, duration, calendar, fk_class)
        VALUES (NEW.julian_day, NEW.duration, NEW.calendar, NEW.fk_class)
        -- return all fields of the new row
      RETURNING
        *)
      SELECT
        pk_entity
      FROM
        INTO resulting_pk _insert;
    -- RAISE INFO 'result of insert: %', resulting_row;
  END IF;
  SELECT
    *
  FROM
    INTO resulting_row information.v_time_primitive
  WHERE
    pk_entity = resulting_pk;
  RETURN resulting_row;
END;
$$;

--
-- TOC entry 1334 (class 1255 OID 24968)
-- Name: add_entity_preview_partition(); Type: FUNCTION; Schema: projects; Owner: -
--
CREATE FUNCTION projects.add_entity_preview_partition()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  AS $_$
DECLARE
  entity_preview_table text;
BEGIN
  -- get the table name of the current
  SELECT
    commons.get_entity_preview_table_name() INTO entity_preview_table;
  -- create the partition
  EXECUTE format('CREATE TABLE %1$s_%2$s PARTITION OF %1$s FOR VALUES IN (%2$s);', entity_preview_table, NEW.pk_entity);
  RETURN NEW;
END;
$_$;

--
-- TOC entry 1314 (class 1255 OID 24279)
-- Name: deactivate_ontome_profile_for_geovistory_project(integer, integer); Type: FUNCTION; Schema: projects; Owner: -
--
CREATE FUNCTION projects.deactivate_ontome_profile_for_geovistory_project(profileid integer, projectid integer)
  RETURNS void
  LANGUAGE plpgsql
  AS $$
BEGIN
  /**
   * Deactivate Profile
   */
  UPDATE
    projects.dfh_profile_proj_rel
  SET
    enabled = FALSE
  WHERE
    fk_profile = profileId
    AND fk_project = projectId;

  /**
   * Deactivate Classes
   * (only classes that are not part of another ontome profile
   * activated by the geovistroy project)
   */
  -- select class profile relations
  WITH ctw1 AS(
    SELECT DISTINCT
      t1.dfh_pk_class fk_class,
      t1.dfh_fk_profile fk_profile
    FROM
      data_for_history.api_class t1
),
-- select the classes of deactivation-profile
ctw2 AS(
  SELECT
    pk_class,
    identifier_in_namespace
  FROM
    data_for_history.v_class t1,
    ctw1 t2
  WHERE
    t1.pk_class = t2.fk_class
    AND t2.fk_profile = profileId
),
-- select the profiles the project has without deactivation-profile
ctw3 AS(
  SELECT DISTINCT
    fk_profile
  FROM
    projects.dfh_profile_proj_rel
  WHERE
    fk_project = projectId
    AND fk_profile != profileId
    AND enabled = TRUE
  UNION
  SELECT
    5 AS fk_profile -- GEOVISTORY BASICS
),
-- select the classes of the profiles of the project except the deactivation-profile
ctw4 AS(
  SELECT DISTINCT
    pk_class,
    identifier_in_namespace
  FROM
    data_for_history.v_class t1,
    ctw1 t2,
    ctw3 t3
  WHERE
    t1.pk_class = t2.fk_class
    AND t2.fk_profile = t3.fk_profile
),
-- select the classes to be deactivated
ctw5 AS(
  SELECT
    pk_class
  FROM
    ctw2
  EXCEPT
  SELECT
    pk_class
  FROM
    ctw4)
UPDATE
  projects.dfh_class_proj_rel t1
SET
  enabled_in_entities = FALSE
FROM
  ctw5 t2
WHERE
  t1.fk_class = t2.pk_class
  AND t1.fk_project = projectId;
END;
$$;

--
-- TOC entry 1287 (class 1255 OID 23638)
-- Name: v_info_proj_rel_update_or_create(); Type: FUNCTION; Schema: projects; Owner: -
--
CREATE FUNCTION projects.v_info_proj_rel_update_or_create()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  AS $$
DECLARE
  resulting_pk integer;
  resulting_row projects.v_info_proj_rel;
BEGIN
  RAISE INFO 'input values: %', NEW;
  ------ if existing, store in resulting_pk ... -----
  SELECT
    *
  FROM
    INTO resulting_row projects.v_info_proj_rel
  WHERE
    fk_entity = NEW.fk_entity
    AND fk_project = NEW.fk_project;
  ------ ... and update the found row -----
  IF FOUND THEN
    -- RAISE INFO 'result of select: %', resulting_row;
    -- RAISE INFO 'v %', COALESCE(NEW.entity_version, resulting_row.entity_version);
    UPDATE
      projects.info_proj_rel
    SET
      fk_entity_version = COALESCE(NEW.fk_entity_version, resulting_row.fk_entity_version),
      fk_entity_version_concat = COALESCE(NEW.fk_entity_version_concat, resulting_row.fk_entity_version_concat),
      is_in_project = COALESCE(NEW.is_in_project, resulting_row.is_in_project),
      is_standard_in_project = COALESCE(NEW.is_standard_in_project, resulting_row.is_standard_in_project),
      ord_num_of_domain = COALESCE(NEW.ord_num_of_domain, resulting_row.ord_num_of_domain),
      ord_num_of_range = COALESCE(NEW.ord_num_of_range, resulting_row.ord_num_of_range),
      ord_num_of_text_property = COALESCE(NEW.ord_num_of_text_property, resulting_row.ord_num_of_text_property),
      fk_creator = COALESCE(NEW.fk_creator, resulting_row.fk_creator),
      fk_last_modifier = COALESCE(NEW.fk_last_modifier, resulting_row.fk_last_modifier),
      project_visibility = COALESCE(NEW.project_visibility, resulting_row.project_visibility)
    WHERE
      pk_entity = resulting_row.pk_entity;
    ------- if not existing, insert and store in result -----
  ELSE
    -- RAISE INFO 'Not found, creating new...';
    WITH _insert AS (
INSERT INTO projects.info_proj_rel(fk_project, fk_entity, fk_entity_version, fk_entity_version_concat, is_in_project, is_standard_in_project, ord_num_of_domain, ord_num_of_range, ord_num_of_text_property, entity_version, fk_creator, fk_last_modifier, project_visibility)
        VALUES (NEW.fk_project, NEW.fk_entity, NEW.fk_entity_version, NEW.fk_entity_version_concat, NEW.is_in_project, NEW.is_standard_in_project, NEW.ord_num_of_domain, NEW.ord_num_of_range, NEW.ord_num_of_text_property, 1, NEW.fk_creator, NEW.fk_last_modifier, NEW.project_visibility)
        -- return all fields of the new row
      RETURNING
        *)
      SELECT
        pk_entity
      FROM
        INTO resulting_pk _insert;
    -- RAISE INFO 'result of insert: %', resulting_row;
  END IF;
  SELECT
    *
  FROM
    INTO resulting_row projects.v_info_proj_rel
  WHERE
    pk_entity = resulting_pk
    OR pk_entity = resulting_row.pk_entity;
  RETURN resulting_row;
END;
$$;

--
-- TOC entry 1267 (class 1255 OID 20894)
-- Name: versioning(); Type: FUNCTION; Schema: public; Owner: -
--
CREATE FUNCTION public.versioning()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  AS $_$
DECLARE
  sys_period text;
  history_table text;
  manipulate jsonb;
  commonColumns text[];
  time_stamp_to_use timestamptz := CURRENT_TIMESTAMP;
  range_lower timestamptz;
  transaction_info txid_snapshot;
  existing_range tstzrange;
  holder record;
  holder2 record;
  pg_version integer;
BEGIN
  -- version 0.2.0
  IF TG_WHEN != 'BEFORE' OR TG_LEVEL != 'ROW' THEN
    RAISE TRIGGER_PROTOCOL_VIOLATED
    USING MESSAGE = 'function "versioning" must be fired BEFORE ROW';
  END IF;
    IF TG_OP != 'INSERT' AND TG_OP != 'UPDATE' AND TG_OP != 'DELETE' THEN
      RAISE TRIGGER_PROTOCOL_VIOLATED
      USING MESSAGE = 'function "versioning" must be fired for INSERT or UPDATE or DELETE';
    END IF;
      IF TG_NARGS != 3 THEN
        RAISE INVALID_PARAMETER_VALUE
        USING MESSAGE = 'wrong number of parameters for function "versioning"', HINT = 'expected 3 parameters but got ' || TG_NARGS;
      END IF;
        sys_period := TG_ARGV[0];
        history_table := TG_ARGV[1];
        -- check if sys_period exists on original table
        SELECT
          atttypid,
          attndims INTO holder
        FROM
          pg_attribute
        WHERE
          attrelid = TG_RELID
          AND attname = sys_period
          AND NOT attisdropped;
        IF NOT FOUND THEN
          RAISE 'column "%" of relation "%" does not exist', sys_period, TG_TABLE_NAME
          USING ERRCODE = 'undefined_column';
        END IF;
          IF holder.atttypid != to_regtype('tstzrange') THEN
            IF holder.attndims > 0 THEN
              RAISE 'system period column "%" of relation "%" is not a range but an array', sys_period, TG_TABLE_NAME
              USING ERRCODE = 'datatype_mismatch';
            END IF;
              SELECT
                rngsubtype INTO holder2
              FROM
                pg_range
              WHERE
                rngtypid = holder.atttypid;
              IF FOUND THEN
                RAISE 'system period column "%" of relation "%" is not a range of timestamp with timezone but of type %', sys_period, TG_TABLE_NAME, format_type(holder2.rngsubtype, NULL)
                USING ERRCODE = 'datatype_mismatch';
              END IF;
                RAISE 'system period column "%" of relation "%" is not a range but type %', sys_period, TG_TABLE_NAME, format_type(holder.atttypid, NULL)
                USING ERRCODE = 'datatype_mismatch';
              END IF;
                IF TG_OP = 'UPDATE' OR TG_OP = 'DELETE' THEN
                  -- Ignore rows already modified in this transaction
                  transaction_info := txid_current_snapshot();
                  IF OLD.xmin::text >=(txid_snapshot_xmin(transaction_info) %(2 ^ 32)::bigint)::text AND OLD.xmin::text <=(txid_snapshot_xmax(transaction_info) %(2 ^ 32)::bigint)::text THEN
                    IF TG_OP = 'DELETE' THEN
                      RETURN OLD;
                    END IF;
                    RETURN NEW;
                  END IF;
                  SELECT
                    current_setting('server_version_num')::integer INTO pg_version;
                  -- to support postgres < 9.6
                  IF pg_version < 90600 THEN
                    -- check if history table exits
                    IF to_regclass(history_table::cstring) IS NULL THEN
                      RAISE 'relation "%" does not exist', history_table;
                    END IF;
                  ELSE
                    IF to_regclass(history_table) IS NULL THEN
                      RAISE 'relation "%" does not exist', history_table;
                    END IF;
                  END IF;
                  -- check if history table has sys_period
                  IF NOT EXISTS (
                    SELECT
                      *
                    FROM
                      pg_attribute
                    WHERE
                      attrelid = history_table::regclass
                      AND attname = sys_period
                      AND NOT attisdropped) THEN
                  RAISE 'history relation "%" does not contain system period column "%"', history_table, sys_period
                  USING HINT = 'history relation must contain system period column with the same name and data type as the versioned one';
                END IF;
                  EXECUTE format('SELECT $1.%I', sys_period)
                  USING OLD INTO existing_range;
                  IF existing_range IS NULL THEN
                    RAISE 'system period column "%" of relation "%" must not be null', sys_period, TG_TABLE_NAME
                    USING ERRCODE = 'null_value_not_allowed';
                  END IF;
                    IF isempty(existing_range) OR NOT upper_inf(existing_range) THEN
                      RAISE 'system period column "%" of relation "%" contains invalid value', sys_period, TG_TABLE_NAME
                      USING ERRCODE = 'data_exception', DETAIL = 'valid ranges must be non-empty and unbounded on the high side';
                    END IF;
                      IF TG_ARGV[2] = 'true' THEN
                        -- mitigate update conflicts
                        range_lower := lower(existing_range);
                        IF range_lower >= time_stamp_to_use THEN
                          time_stamp_to_use := range_lower + interval '1 microseconds';
                        END IF;
                      END IF;
                      WITH history AS (
                        SELECT
                          attname,
                          atttypid
                        FROM
                          pg_attribute
                        WHERE
                          attrelid = history_table::regclass
                          AND attnum > 0
                          AND NOT attisdropped
),
main AS (
  SELECT
    attname,
    atttypid
  FROM
    pg_attribute
  WHERE
    attrelid = TG_RELID
    AND attnum > 0
    AND NOT attisdropped
)
SELECT
  history.attname AS history_name,
  main.attname AS main_name,
  history.atttypid AS history_type,
  main.atttypid AS main_type INTO holder
FROM
  history
  INNER JOIN main ON history.attname = main.attname
WHERE
  history.atttypid != main.atttypid;
  IF FOUND THEN
    RAISE 'column "%" of relation "%" is of type % but column "%" of history relation "%" is of type %', holder.main_name, TG_TABLE_NAME, format_type(holder.main_type, NULL), holder.history_name, history_table, format_type(holder.history_type, NULL)
    USING ERRCODE = 'datatype_mismatch';
  END IF;
    WITH history AS (
      SELECT
        attname
      FROM
        pg_attribute
      WHERE
        attrelid = history_table::regclass
        AND attnum > 0
        AND NOT attisdropped
),
main AS (
  SELECT
    attname
  FROM
    pg_attribute
  WHERE
    attrelid = TG_RELID
    AND attnum > 0
    AND NOT attisdropped
)
SELECT
  array_agg(quote_ident(history.attname)) INTO commonColumns
FROM
  history
  INNER JOIN main ON history.attname = main.attname
    AND history.attname != sys_period;
  EXECUTE ('INSERT INTO ' || CASE split_part(history_table, '.', 2)
    WHEN '' THEN
      quote_ident(history_table)
    ELSE
      quote_ident(split_part(history_table, '.', 1)) || '.' || quote_ident(split_part(history_table, '.', 2))
    END || '(' || array_to_string(commonColumns, ',') || ',' || quote_ident(sys_period) || ') VALUES ($1.' || array_to_string(commonColumns, ',$1.') || ',tstzrange($2, $3, ''[)''))')
  USING OLD, range_lower, time_stamp_to_use;
END IF;
  IF TG_OP = 'UPDATE' OR TG_OP = 'INSERT' THEN
    manipulate := jsonb_set('{}'::jsonb,('{' || sys_period || '}')::text[], to_jsonb(tstzrange(time_stamp_to_use, NULL, '[)')));
    RETURN jsonb_populate_record(NEW, manipulate);
  END IF;
  RETURN OLD;
END;
$_$;

--
-- TOC entry 1293 (class 1255 OID 23812)
-- Name: create_cell_table_for_digital(integer); Type: FUNCTION; Schema: tables; Owner: -
--
CREATE FUNCTION tables.create_cell_table_for_digital(pk_digital integer)
  RETURNS text
  LANGUAGE plpgsql
  AS $$
DECLARE
  test_query_result boolean;
  create_query text;
  result_text text;
BEGIN
  EXECUTE 'SELECT COUNT(*) > 0 FROM information_schema.tables WHERE table_schema = ''tables''
                    AND  table_name = ''cell_' || pk_digital::text || ''';' INTO test_query_result;
  IF test_query_result THEN
    result_text := 'tables.cell_' || pk_digital::text || ' already exists';
  ELSE
    create_query := 'CREATE TABLE IF NOT EXISTS  tables.cell_' || pk_digital::text || '
                    (
                    CHECK (fk_digital = ' || pk_digital::text || '),
                    CONSTRAINT data_cell_' || pk_digital::text || '_pk_entity_primary_key PRIMARY KEY (pk_cell),
                    CONSTRAINT cell_' || pk_digital::text || '_fk_column_fkey FOREIGN KEY (fk_column)
                        REFERENCES data."column" (pk_entity) MATCH SIMPLE
                        ON UPDATE NO ACTION
                        ON DELETE NO ACTION,
                    CONSTRAINT cell_' || pk_digital::text || '_fk_digital_fkey FOREIGN KEY (fk_digital)
                        REFERENCES data.digital (pk_entity) MATCH SIMPLE
                        ON UPDATE NO ACTION
                        ON DELETE NO ACTION,
                    CONSTRAINT cell_' || pk_digital::text || '_fk_row_fkey FOREIGN KEY (fk_row)
                        REFERENCES tables."row_' || pk_digital::text || '" (pk_row) MATCH SIMPLE
                        ON UPDATE NO ACTION
                        ON DELETE NO ACTION
                    )
                        INHERITS (tables.cell);

                        CREATE INDEX cell_' || pk_digital::text || '_fk_digital_idx
                            ON tables.cell_' || pk_digital::text || ' USING btree
                            (fk_digital);

                        CREATE TRIGGER creation_tmsp BEFORE INSERT ON tables.cell_' || pk_digital::text || '
                        FOR
                        EACH ROW EXECUTE PROCEDURE commons.tmsp_creation ();

                        CREATE TRIGGER last_modification_tmsp BEFORE INSERT OR UPDATE ON tables.cell_' || pk_digital::text || '
                        FOR
                        EACH ROW EXECUTE PROCEDURE commons.tmsp_last_modification ();

                        CREATE INDEX cell_' || pk_digital::text || '_fk_column_idx
                            ON tables.cell_' || pk_digital::text || ' USING btree
                            (fk_column);

                        CREATE INDEX cell_' || pk_digital::text || '_fk_row_idx
                            ON tables.cell_' || pk_digital::text || ' USING btree
                            (fk_row);

                        CREATE INDEX cell_' || pk_digital::text || '_id_for_import_txt_idx
                            ON tables.cell_' || pk_digital::text || ' USING hash(id_for_import_txt);

                    CREATE INDEX cell_' || pk_digital::text || '_pk_cell_idx
                          ON tables.cell_' || pk_digital::text || '  USING btree(pk_cell);

                        CREATE INDEX cell_' || pk_digital::text || '_string_value_idx
                          ON tables.cell_' || pk_digital::text || '  USING hash(string_value);

                        CREATE TRIGGER create_entity_version_key BEFORE INSERT ON tables.cell_' || pk_digital::text || '
                        FOR
                        EACH ROW EXECUTE PROCEDURE commons.create_entity_version_key ();

                        CREATE TRIGGER update_entity_version_key BEFORE UPDATE ON tables.cell_' || pk_digital::text || '
                        FOR
                        EACH ROW EXECUTE PROCEDURE commons.update_entity_version_key ();

                        CREATE TABLE IF NOT EXISTS  tables.cell_' || pk_digital::text || '_vt ( ) INHERITS (tables.cell_vt);

                        CREATE TRIGGER versioning_trigger
                            BEFORE INSERT OR DELETE OR UPDATE
                            ON tables.cell_' || pk_digital::text || '
                            FOR EACH ROW
                            EXECUTE PROCEDURE public.versioning(''sys_period'', ''tables.cell_' || pk_digital::text || '_vt'', ''true'');  ';
    RAISE NOTICE '%', create_query;
    EXECUTE create_query;
    result_text := 'tables.cell_' || pk_digital::text;
  END IF;
  RETURN result_text;
END;
$$;

--
-- TOC entry 1323 (class 1255 OID 24641)
-- Name: create_row_table_for_digital(integer); Type: FUNCTION; Schema: tables; Owner: -
--
CREATE FUNCTION tables.create_row_table_for_digital(pk_digital integer)
  RETURNS text
  LANGUAGE plpgsql
  AS $$
DECLARE
  test_query_result boolean;
  create_query text;
  result_text text;
BEGIN
  EXECUTE 'SELECT COUNT(*) > 0 FROM information_schema.tables WHERE table_schema = ''tables''
                    AND  table_name = ''row_' || pk_digital::text || ''';' INTO test_query_result;
  IF test_query_result THEN
    result_text := 'tables.row_' || pk_digital::text || ' already exists';
  ELSE
    create_query := 'CREATE TABLE IF NOT EXISTS  tables.row_' || pk_digital::text || '
                    (
                    CHECK (fk_digital = ' || pk_digital::text || '),
                    CONSTRAINT data_row_' || pk_digital::text || '_pk_entity_primary_key PRIMARY KEY (pk_row),
                    CONSTRAINT row_' || pk_digital::text || '_fk_digital_fkey FOREIGN KEY (fk_digital)
                        REFERENCES data.digital (pk_entity) MATCH SIMPLE
                        ON UPDATE NO ACTION
                        ON DELETE NO ACTION
                    )
                        INHERITS (tables.row);

                        CREATE INDEX row_' || pk_digital::text || '_fk_digital_idx
                            ON tables.row_' || pk_digital::text || ' USING btree
                            (fk_digital);

                        CREATE TRIGGER creation_tmsp BEFORE INSERT ON tables.row_' || pk_digital::text || '
                        FOR
                        EACH ROW EXECUTE PROCEDURE commons.tmsp_creation ();

                        CREATE TRIGGER last_modification_tmsp BEFORE INSERT OR UPDATE ON tables.row_' || pk_digital::text || '
                        FOR
                        EACH ROW EXECUTE PROCEDURE commons.tmsp_last_modification ();

                        CREATE INDEX row_' || pk_digital::text || '_id_for_import_txt_idx
                            ON tables.row_' || pk_digital::text || ' USING hash(id_for_import_txt);

                        CREATE INDEX row_' || pk_digital::text || '_pk_row_idx
                            ON tables.row_' || pk_digital::text || '  USING btree(pk_row);

                        CREATE TRIGGER create_entity_version_key BEFORE INSERT ON tables.row_' || pk_digital::text || '
                        FOR
                        EACH ROW EXECUTE PROCEDURE commons.create_entity_version_key ();

                        CREATE TRIGGER update_entity_version_key BEFORE UPDATE ON tables.row_' || pk_digital::text || '
                        FOR
                        EACH ROW EXECUTE PROCEDURE commons.update_entity_version_key ();

                        CREATE TABLE IF NOT EXISTS  tables.row_' || pk_digital::text || '_vt ( ) INHERITS (tables.row_vt);

                        CREATE TRIGGER versioning_trigger
                            BEFORE INSERT OR DELETE OR UPDATE
                            ON tables.row_' || pk_digital::text || '
                            FOR EACH ROW
                            EXECUTE PROCEDURE public.versioning(''sys_period'', ''tables.row_' || pk_digital::text || '_vt'', ''true'');  ';
    RAISE NOTICE '%', create_query;
    EXECUTE create_query;
    result_text := 'tables.row_' || pk_digital::text;
  END IF;
  RETURN result_text;
END;
$$;

--
-- TOC entry 1292 (class 1255 OID 23865)
-- Name: rebuild_partitioned_table(integer, text, integer[]); Type: FUNCTION; Schema: tables; Owner: -
--
CREATE FUNCTION tables.rebuild_partitioned_table(id_digital integer, view_name text, column_list integer[])
  RETURNS text
  LANGUAGE plpgsql
  AS $$
DECLARE
  new_view_name text;
  query_start text;
  query_from text;
  query text;
  field text;
  field_label text;
  field_metadata json;
  n integer = 1;
  a integer;
  output_query text;
BEGIN
  IF view_name IS NOT NULL THEN
    new_view_name = view_name;
  ELSE
    new_view_name = 'tv_' || id_digital;
  END IF;
  query_start = 'DROP VIEW IF EXISTS ' || new_view_name || ';
                        CREATE OR REPLACE TEMPORARY VIEW ' || new_view_name || ' AS
                            SELECT dr.pk_row';
  query_from = ' FROM tables.row dr';
  IF array_length(column_list, 1) > 0 THEN
    FOR a IN
    SELECT
      UNNEST(column_list)
      LOOP
        SELECT
          row_to_json(pk_entity, pk_entity::text, fk_data_type) INTO field_metadata --id_for_import_txt
        FROM
          data.column
        WHERE
          pk_entity = a;
        field_label = replace(trim((field_metadata -> 'f2')::text), ' ', '_');
        IF (field_metadata -> 'f3')::varchar::integer = 3293 THEN
          field = 't' || n || '.numeric_value';
        ELSE
          field = 't' || n || '.string_value';
          -- .string     .id_for_import_txt
        END IF;
        query_start = query_start || ', ' || field || ' AS ' || field_label;
        query_from = query_from || ' LEFT JOIN tables.cell_' || id_digital || ' t' || n || ' ON dr.pk_row = t' || n || '.fk_row AND t' || n || '.fk_column = ' ||(field_metadata -> 'f1')::text;
        n = n + 1;
        -- RAISE NOTICE '%', query_start ; -- return current row of SELECT
      END LOOP;
  ELSE
    FOR field_metadata IN
    SELECT
      row_to_json(pk_entity, pk_entity::text, fk_data_type) --id_for_import_txt
    FROM
      data.column
    WHERE
      fk_digital = id_digital
    ORDER BY
      pk_entity LOOP
        field_label = replace(trim((field_metadata -> 'f2')::text), ' ', '_');
        IF (field_metadata -> 'f3')::varchar::integer = 3293 THEN
          field = 't' || n || '.numeric_value';
        ELSE
          field = 't' || n || '.string_value';
          -- .string     .id_for_import_txt
        END IF;
        query_start = query_start || ', ' || field || ' AS ' || field_label;
        query_from = query_from || ' LEFT JOIN tables.cell_' || id_digital || ' t' || n || ' ON dr.pk_row = t' || n || '.fk_row AND t' || n || '.fk_column = ' ||(field_metadata -> 'f1')::text;
        n = n + 1;
        -- RAISE NOTICE '%', query_start ; -- return current row of SELECT
      END LOOP;
  END IF;
  query := query_start || query_from || ' WHERE dr.fk_digital = ' || id_digital || ';';
  RAISE NOTICE '%', query;
  EXECUTE query;
  output_query := 'SELECT * FROM ' || new_view_name || ' LIMIT 10';
  RETURN output_query;
END;
$$;

--
-- TOC entry 1309 (class 1255 OID 24207)
-- Name: after_info_proj_rel_upsert(); Type: FUNCTION; Schema: war; Owner: -
--
CREATE FUNCTION war.after_info_proj_rel_upsert()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  AS $$
BEGIN
  PERFORM
    pg_notify('project_updated', 'true');
  RETURN NEW;
END;
$$;

--
-- TOC entry 1333 (class 1255 OID 24920)
-- Name: create_sink_table_entity_preview(character varying); Type: FUNCTION; Schema: war; Owner: -
--
CREATE FUNCTION war.create_sink_table_entity_preview(schema_and_table_name character varying)
  RETURNS void
  LANGUAGE plpgsql
  AS $_$
DECLARE
  project_id int;
BEGIN
  -- Create table and triggers
  EXECUTE format('
  CREATE TABLE %1$s (LIKE war.entity_preview_template INCLUDING ALL)
  PARTITION BY LIST (project_id);

	CREATE TRIGGER generate_key
		BEFORE INSERT OR UPDATE
		ON %1$s
		FOR EACH ROW
		EXECUTE FUNCTION war.entity_preview_generate_key();

	CREATE TRIGGER last_modification_tmsp
		BEFORE INSERT OR UPDATE
		ON %1$s
		FOR EACH ROW
		EXECUTE FUNCTION commons.tmsp_last_modification();

	CREATE TRIGGER ts_vector
		BEFORE INSERT OR UPDATE
		ON %1$s
		FOR EACH ROW
		EXECUTE FUNCTION war.entity_preview_ts_vector();
				   ', schema_and_table_name);
  -- Create partitions for each project
  FOR project_id IN
  SELECT
    pk_entity
  FROM
    projects.project LOOP
      -- Construct and execute the dynamic SQL statement
      -- e.g CREATE TABLE war.entity_preview_xyz_33 PARTITION OF war.entity_preview_xyz FOR VALUES IN (33);
      EXECUTE format('CREATE TABLE %1$s_%2$s PARTITION OF %1$s FOR VALUES IN (%2$s);', schema_and_table_name, project_id);
    END LOOP;
  -- Create partition for community data
  EXECUTE format('CREATE TABLE %1$s_0 PARTITION OF %1$s FOR VALUES IN (0);', schema_and_table_name);
END
$_$;

--
-- TOC entry 1329 (class 1255 OID 24927)
-- Name: create_sink_table_field_change(character varying); Type: FUNCTION; Schema: war; Owner: -
--
CREATE FUNCTION war.create_sink_table_field_change(schema_and_table_name character varying)
  RETURNS void
  LANGUAGE plpgsql
  AS $_$
BEGIN
  EXECUTE format('CREATE TABLE %1$s (LIKE war.field_change_template INCLUDING ALL);', schema_and_table_name);
END
$_$;

--
-- TOC entry 1331 (class 1255 OID 24943)
-- Name: create_sink_table_statement(character varying); Type: FUNCTION; Schema: war; Owner: -
--
CREATE FUNCTION war.create_sink_table_statement(schema_and_table_name character varying)
  RETURNS void
  LANGUAGE plpgsql
  AS $_$
BEGIN
  EXECUTE format('CREATE TABLE %1$s (LIKE war.statement_template INCLUDING ALL);', schema_and_table_name);
END
$_$;

--
-- TOC entry 1325 (class 1255 OID 24690)
-- Name: entity_preview_generate_key(); Type: FUNCTION; Schema: war; Owner: -
--
CREATE FUNCTION war.entity_preview_generate_key()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  AS $$
BEGIN
  NEW.key = concat(NEW.project, '_', NEW.pk_entity);
  RETURN NEW;
END;
$$;

--
-- TOC entry 1320 (class 1255 OID 24555)
-- Name: entity_preview_ts_vector(); Type: FUNCTION; Schema: war; Owner: -
--
CREATE FUNCTION war.entity_preview_ts_vector()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  AS $$
BEGIN
  NEW.ts_vector =(
    SELECT
      setweight(to_tsvector(coalesce(NEW.entity_label, '')), 'A') || setweight(to_tsvector(coalesce(NEW.type_label, '')), 'B') || setweight(to_tsvector(coalesce(NEW.class_label, '')), 'B') || setweight(to_tsvector(coalesce(NEW.full_text, '')), 'C'));
  RETURN NEW;
END;
$$;

--
-- TOC entry 1312 (class 1255 OID 24227)
-- Name: entity_previews__notify_upsert(); Type: FUNCTION; Schema: war; Owner: -
--
CREATE FUNCTION war.entity_previews__notify_upsert()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  AS $$
DECLARE
  notification text;
BEGIN
  SELECT DISTINCT
    tmsp_last_modification::text INTO notification
  FROM
    new_table
  WHERE
    tmsp_last_modification IS NOT NULL
  LIMIT 1;
  IF notification IS NOT NULL THEN
    PERFORM
      pg_notify('entity_previews_updated'::text, notification);
  END IF;
  RETURN NEW;
END;
$$;

--
-- TOC entry 1324 (class 1255 OID 24686)
-- Name: field_change__notify_upsert(); Type: FUNCTION; Schema: war; Owner: -
--
CREATE FUNCTION war.field_change__notify_upsert()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  AS $$
DECLARE
  item json;
BEGIN
  FOR item IN
  SELECT
    row_to_json(new_table)
  FROM
    new_table LOOP
      PERFORM
        pg_notify('field_change'::text, item::text);
    END LOOP;
  RETURN NEW;
END;
$$;

--
-- TOC entry 1313 (class 1255 OID 24235)
-- Name: notify__need_to_check_class_labels(); Type: FUNCTION; Schema: war; Owner: -
--
CREATE FUNCTION war.notify__need_to_check_class_labels()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  AS $$
BEGIN
  PERFORM
    pg_notify('need_to_check_class_labels', 'check for updates');
  RETURN NULL;
END;
$$;

--
-- TOC entry 1335 (class 1255 OID 24970)
-- Name: switch_entity_preview_table(character varying); Type: FUNCTION; Schema: war; Owner: -
--
CREATE FUNCTION war.switch_entity_preview_table(schema_and_table_name character varying)
  RETURNS void
  LANGUAGE plpgsql
  AS $_$
BEGIN
  EXECUTE format('
    CREATE OR REPLACE VIEW war.entity_preview AS
	  SELECT
        pk_entity,
        entity_type,
        fk_class,
        class_label,
        entity_label,
        full_text,
        ts_vector,
        type_label,
        fk_type,
        time_span,
        first_second,
        last_second,
        tmsp_last_modification,
        key,
        entity_id,
        parent_classes,
        ancestor_classes,
        project_id,
        type_id
    FROM %1$s;

    DROP TRIGGER IF EXISTS after_insert_on_entity_preview ON %1$s;

    CREATE TRIGGER after_insert_on_entity_preview
    AFTER INSERT
    ON %1$s
    REFERENCING NEW TABLE AS new_table
    FOR EACH STATEMENT
    EXECUTE FUNCTION war.entity_previews__notify_upsert();

    DROP TRIGGER IF EXISTS after_update_on_entity_preview ON %1$s;

    CREATE TRIGGER after_update_on_entity_preview
    AFTER UPDATE
    ON %1$s
    REFERENCING NEW TABLE AS new_table
    FOR EACH STATEMENT
    EXECUTE FUNCTION war.entity_previews__notify_upsert();

				   ', schema_and_table_name);
END
$_$;

--
-- TOC entry 1330 (class 1255 OID 24928)
-- Name: switch_field_change_table(character varying); Type: FUNCTION; Schema: war; Owner: -
--
CREATE FUNCTION war.switch_field_change_table(schema_and_table_name character varying)
  RETURNS void
  LANGUAGE plpgsql
  AS $_$
BEGIN
  EXECUTE format('
		CREATE OR REPLACE VIEW war.field_change AS
		SELECT * FROM %1$s;

		DROP TRIGGER IF EXISTS after_insert_field_change ON %1$s;

		CREATE TRIGGER after_insert_field_change
		AFTER INSERT
		ON %1$s
		REFERENCING NEW TABLE AS new_table
		FOR EACH STATEMENT
		EXECUTE FUNCTION war.field_change__notify_upsert();

		DROP TRIGGER IF EXISTS after_update_field_change ON %1$s;

		CREATE TRIGGER after_update_field_change
		AFTER UPDATE
		ON %1$s
		REFERENCING NEW TABLE AS new_table
		FOR EACH STATEMENT
		EXECUTE FUNCTION war.field_change__notify_upsert();', schema_and_table_name);
END
$_$;

--
-- TOC entry 1332 (class 1255 OID 24944)
-- Name: switch_statement_table(character varying); Type: FUNCTION; Schema: war; Owner: -
--
CREATE FUNCTION war.switch_statement_table(schema_and_table_name character varying)
  RETURNS void
  LANGUAGE plpgsql
  AS $_$
BEGIN
  EXECUTE format('
		CREATE OR REPLACE VIEW war.statement AS
		SELECT * FROM %1$s;
		', schema_and_table_name);
END
$_$;

--
-- TOC entry 235 (class 1259 OID 20921)
-- Name: text; Type: TABLE; Schema: commons; Owner: -
--
CREATE TABLE commons.text (
  pk_text integer NOT NULL,
  schema_name character varying NOT NULL,
  table_name character varying NOT NULL,
  entity_version integer NOT NULL,
  quill_doc jsonb,
  string text
);

--
-- TOC entry 236 (class 1259 OID 20927)
-- Name: text_pk_text_seq; Type: SEQUENCE; Schema: commons; Owner: -
--
CREATE SEQUENCE commons.text_pk_text_seq
  AS integer START WITH 1
  INCREMENT BY 1
  NO MINVALUE
  NO MAXVALUE
  CACHE 1;

--
-- TOC entry 6474 (class 0 OID 0)
-- Dependencies: 236
-- Name: text_pk_text_seq; Type: SEQUENCE OWNED BY; Schema: commons; Owner: -
--
ALTER SEQUENCE commons.text_pk_text_seq OWNED BY commons.text.pk_text;

--
-- TOC entry 237 (class 1259 OID 20928)
-- Name: text_vt; Type: TABLE; Schema: commons; Owner: -
--
CREATE TABLE commons.text_vt(
  pk_text integer NOT NULL,
  schema_name character varying NOT NULL,
  table_name character varying NOT NULL,
  entity_version integer NOT NULL,
  quill_doc jsonb,
  string text
);

--
-- TOC entry 238 (class 1259 OID 20933)
-- Name: v_text_version; Type: VIEW; Schema: commons; Owner: -
--
CREATE VIEW commons.v_text_version AS
SELECT
  t.pk_text,
  t.schema_name,
  t.table_name,
  t.entity_version,
  t.quill_doc,
  t.string,
  concat(((t.pk_text || '_'::text) || t.entity_version)) AS pk_text_version
FROM
  commons.text t
UNION ALL
SELECT
  t.pk_text,
  t.schema_name,
  t.table_name,
  t.entity_version,
  t.quill_doc,
  t.string,
  concat(((t.pk_text || '_'::text) || t.entity_version)) AS pk_text_version
FROM
  commons.text_vt t;

--
-- TOC entry 239 (class 1259 OID 20937)
-- Name: entity; Type: TABLE; Schema: data; Owner: -
--
CREATE TABLE data.entity(
  pk_entity integer NOT NULL,
  schema_name character varying NOT NULL,
  table_name character varying NOT NULL,
  entity_version integer NOT NULL,
  notes text,
  fk_namespace integer,
  fk_creator integer,
  fk_last_modifier integer,
  tmsp_creation timestamp with time zone DEFAULT now(),
  tmsp_last_modification timestamp with time zone,
  sys_period tstzrange DEFAULT tstzrange(now(), NULL::timestamp with time zone),
  metadata jsonb,
  id_for_import integer,
  id_for_import_txt text,
  fk_publication_status integer,
  fk_license integer
);

--
-- TOC entry 240 (class 1259 OID 20944)
-- Name: avatar; Type: TABLE; Schema: data; Owner: -
--
CREATE TABLE data.avatar(
  fk_class integer NOT NULL
)
INHERITS (
  data.entity
);

--
-- TOC entry 241 (class 1259 OID 20951)
-- Name: avatar_vt; Type: TABLE; Schema: data; Owner: -
--
CREATE TABLE data.avatar_vt(
  pk_entity integer NOT NULL,
  schema_name character varying NOT NULL,
  table_name character varying NOT NULL,
  entity_version integer NOT NULL,
  notes text,
  fk_namespace integer,
  fk_creator integer,
  fk_last_modifier integer,
  tmsp_creation timestamp with time zone,
  tmsp_last_modification timestamp with time zone,
  sys_period tstzrange,
  metadata jsonb,
  fk_class integer NOT NULL,
  id_for_import integer,
  id_for_import_txt text,
  fk_publication_status integer,
  fk_license integer
);

--
-- TOC entry 242 (class 1259 OID 20974)
-- Name: chunk; Type: TABLE; Schema: data; Owner: -
--
CREATE TABLE data.chunk(
  pk_text integer DEFAULT nextval('commons.text_pk_text_seq'::regclass),
  quill_doc jsonb NOT NULL,
  string text NOT NULL,
  fk_text integer,
  fk_entity_version integer,
  CONSTRAINT text_quill_doc_check CHECK (((quill_doc IS NULL) OR commons.validate_quill_doc(quill_doc)))
)
INHERITS (
  data.entity,
  commons.text
);

--
-- TOC entry 243 (class 1259 OID 20984)
-- Name: chunk_vt; Type: TABLE; Schema: data; Owner: -
--
CREATE TABLE data.chunk_vt(
  pk_text integer DEFAULT nextval('commons.text_pk_text_seq'::regclass),
  schema_name character varying,
  table_name character varying,
  entity_version integer,
  quill_doc jsonb NOT NULL,
  string text DEFAULT ''::text NOT NULL,
  pk_entity integer NOT NULL,
  notes text,
  fk_namespace integer,
  fk_creator integer,
  fk_last_modifier integer,
  tmsp_creation timestamp with time zone,
  tmsp_last_modification timestamp with time zone,
  sys_period tstzrange,
  metadata jsonb,
  fk_text integer,
  fk_entity_version integer,
  id_for_import integer,
  id_for_import_txt text,
  fk_publication_status integer,
  fk_license integer
)
INHERITS (
  commons.text_vt
);

--
-- TOC entry 244 (class 1259 OID 20992)
-- Name: class_column_mapping; Type: TABLE; Schema: data; Owner: -
--
CREATE TABLE data.class_column_mapping(
  fk_class integer NOT NULL,
  fk_column integer NOT NULL
)
INHERITS (
  data.entity
);

--
-- TOC entry 245 (class 1259 OID 20999)
-- Name: class_column_mapping_vt; Type: TABLE; Schema: data; Owner: -
--
CREATE TABLE data.class_column_mapping_vt(
  pk_entity integer NOT NULL,
  schema_name character varying NOT NULL,
  table_name character varying NOT NULL,
  entity_version integer NOT NULL,
  notes text,
  fk_namespace integer,
  fk_creator integer,
  fk_last_modifier integer,
  tmsp_creation timestamp with time zone,
  tmsp_last_modification timestamp with time zone,
  sys_period tstzrange,
  metadata jsonb,
  fk_class integer NOT NULL,
  fk_column integer NOT NULL,
  id_for_import integer,
  id_for_import_txt text,
  fk_publication_status integer,
  fk_license integer
);

--
-- TOC entry 246 (class 1259 OID 21004)
-- Name: column; Type: TABLE; Schema: data; Owner: -
--
CREATE TABLE data."column"(
  fk_digital integer NOT NULL,
  fk_data_type integer NOT NULL,
  fk_column_content_type integer NOT NULL,
  fk_original_column integer,
  is_imported boolean DEFAULT FALSE NOT NULL,
  fk_column_relationship_type integer DEFAULT 3367 NOT NULL
)
INHERITS (
  data.entity
);

--
-- TOC entry 247 (class 1259 OID 21011)
-- Name: column_vt; Type: TABLE; Schema: data; Owner: -
--
CREATE TABLE data.column_vt(
  pk_entity integer NOT NULL,
  schema_name character varying NOT NULL,
  table_name character varying NOT NULL,
  entity_version integer NOT NULL,
  notes text,
  fk_namespace integer,
  fk_creator integer,
  fk_last_modifier integer,
  tmsp_creation timestamp with time zone,
  tmsp_last_modification timestamp with time zone,
  sys_period tstzrange,
  metadata jsonb,
  fk_digital integer NOT NULL,
  fk_data_type integer NOT NULL,
  fk_column_content_type integer NOT NULL,
  fk_original_column integer,
  is_imported boolean NOT NULL,
  id_for_import integer,
  id_for_import_txt text,
  fk_publication_status integer,
  fk_license integer,
  fk_column_relationship_type integer
);

--
-- TOC entry 248 (class 1259 OID 21016)
-- Name: data_association; Type: TABLE; Schema: data; Owner: -
--
CREATE TABLE data.data_association(
  fk_property integer NOT NULL,
  fk_data_domain integer,
  fk_data_range integer,
  fk_info_value_range integer,
  fk_info_domain bigint,
  fk_info_range bigint,
  fk_cell_domain bigint,
  fk_cell_range bigint
)
INHERITS (
  data.entity
);

--
-- TOC entry 266 (class 1259 OID 21146)
-- Name: data_association_mapping; Type: TABLE; Schema: data; Owner: -
--
CREATE TABLE data.data_association_mapping(
  fk_property integer NOT NULL,
  fk_domain_column integer NOT NULL,
  fk_range_column integer NOT NULL,
  fk_factoid_mapping integer NOT NULL
)
INHERITS (
  data.entity
);

--
-- TOC entry 267 (class 1259 OID 21153)
-- Name: data_association_mapping_vt; Type: TABLE; Schema: data; Owner: -
--
CREATE TABLE data.data_association_mapping_vt(
  pk_entity integer NOT NULL,
  schema_name character varying NOT NULL,
  table_name character varying NOT NULL,
  entity_version integer NOT NULL,
  notes text,
  fk_namespace integer,
  fk_creator integer,
  fk_last_modifier integer,
  tmsp_creation timestamp with time zone,
  tmsp_last_modification timestamp with time zone,
  sys_period tstzrange,
  metadata jsonb,
  fk_property integer NOT NULL,
  fk_domain_column integer NOT NULL,
  fk_range_column integer NOT NULL,
  fk_factoid_mapping integer NOT NULL,
  id_for_import integer,
  id_for_import_txt text,
  fk_publication_status integer,
  fk_license integer
);

--
-- TOC entry 249 (class 1259 OID 21023)
-- Name: data_association_vt; Type: TABLE; Schema: data; Owner: -
--
CREATE TABLE data.data_association_vt(
  pk_entity integer NOT NULL,
  schema_name character varying NOT NULL,
  table_name character varying NOT NULL,
  entity_version integer NOT NULL,
  notes text,
  fk_namespace integer,
  fk_creator integer,
  fk_last_modifier integer,
  tmsp_creation timestamp with time zone,
  tmsp_last_modification timestamp with time zone,
  sys_period tstzrange,
  metadata jsonb,
  fk_property integer NOT NULL,
  fk_data_domain integer,
  fk_data_range integer,
  fk_info_value_range integer,
  id_for_import integer,
  id_for_import_txt text,
  fk_publication_status integer,
  fk_license integer
);

--
-- TOC entry 253 (class 1259 OID 21050)
-- Name: entity_pk_entity_seq; Type: SEQUENCE; Schema: data; Owner: -
--
CREATE SEQUENCE data.entity_pk_entity_seq
  AS integer START WITH 1
  INCREMENT BY 1
  NO MINVALUE
  NO MAXVALUE
  CACHE 1;

--
-- TOC entry 6475 (class 0 OID 0)
-- Dependencies: 253
-- Name: entity_pk_entity_seq; Type: SEQUENCE OWNED BY; Schema: data; Owner: -
--
ALTER SEQUENCE data.entity_pk_entity_seq OWNED BY data.entity.pk_entity;

--
-- TOC entry 251 (class 1259 OID 21029)
-- Name: digital; Type: TABLE; Schema: data; Owner: -
--
CREATE TABLE data.digital(
  pk_entity integer DEFAULT nextval('data.entity_pk_entity_seq'::regclass),
  schema_name character varying,
  table_name character varying,
  entity_version integer DEFAULT 1,
  notes text,
  fk_namespace integer,
  fk_creator integer,
  fk_last_modifier integer,
  tmsp_creation timestamp with time zone DEFAULT now(),
  tmsp_last_modification timestamp with time zone,
  sys_period tstzrange DEFAULT tstzrange(now(), NULL::timestamp with time zone),
  metadata jsonb,
  pk_text integer DEFAULT nextval('commons.text_pk_text_seq'::regclass),
  quill_doc jsonb NOT NULL,
  string text NOT NULL,
  fk_system_type integer,
  CONSTRAINT text_quill_doc_check CHECK (((quill_doc IS NULL) OR commons.validate_quill_doc(quill_doc)))
)
INHERITS (
  data.entity,
  commons.text
);

--
-- TOC entry 252 (class 1259 OID 21042)
-- Name: digital_vt; Type: TABLE; Schema: data; Owner: -
--
CREATE TABLE data.digital_vt(
  pk_text integer DEFAULT nextval('commons.text_pk_text_seq'::regclass),
  schema_name character varying,
  table_name character varying,
  entity_version integer,
  quill_doc jsonb NOT NULL,
  string text DEFAULT ''::text NOT NULL,
  pk_entity integer NOT NULL,
  notes text,
  fk_creator integer,
  fk_last_modifier integer,
  tmsp_creation timestamp with time zone,
  tmsp_last_modification timestamp with time zone,
  sys_period tstzrange,
  fk_namespace integer,
  metadata jsonb,
  fk_system_type integer,
  id_for_import integer,
  id_for_import_txt text,
  fk_publication_status integer,
  fk_license integer
)
INHERITS (
  commons.text_vt
);

--
-- TOC entry 254 (class 1259 OID 21051)
-- Name: factoid; Type: TABLE; Schema: data; Owner: -
--
CREATE TABLE data.factoid(
  fk_class integer NOT NULL
)
INHERITS (
  data.entity
);

--
-- TOC entry 255 (class 1259 OID 21058)
-- Name: factoid_mapping; Type: TABLE; Schema: data; Owner: -
--
CREATE TABLE data.factoid_mapping(
  fk_digital integer NOT NULL,
  fk_class integer NOT NULL,
  title text,
  comment text
)
INHERITS (
  data.entity
);

--
-- TOC entry 256 (class 1259 OID 21065)
-- Name: factoid_mapping_vt; Type: TABLE; Schema: data; Owner: -
--
CREATE TABLE data.factoid_mapping_vt(
  pk_entity integer NOT NULL,
  schema_name character varying NOT NULL,
  table_name character varying NOT NULL,
  entity_version integer NOT NULL,
  notes text,
  fk_namespace integer,
  fk_creator integer,
  fk_last_modifier integer,
  tmsp_creation timestamp with time zone,
  tmsp_last_modification timestamp with time zone,
  sys_period tstzrange,
  metadata jsonb,
  fk_digital integer NOT NULL,
  fk_class integer NOT NULL,
  id_for_import integer,
  id_for_import_txt text,
  fk_publication_status integer,
  fk_license integer
);

--
-- TOC entry 257 (class 1259 OID 21070)
-- Name: factoid_property_mapping; Type: TABLE; Schema: data; Owner: -
--
CREATE TABLE data.factoid_property_mapping(
  fk_property integer NOT NULL,
  fk_column integer NOT NULL,
  fk_factoid_mapping integer NOT NULL,
  is_outgoing boolean DEFAULT TRUE NOT NULL,
  comment text,
  fk_default integer
)
INHERITS (
  data.entity
);

--
-- TOC entry 258 (class 1259 OID 21077)
-- Name: factoid_property_mapping_vt; Type: TABLE; Schema: data; Owner: -
--
CREATE TABLE data.factoid_property_mapping_vt(
  pk_entity integer NOT NULL,
  schema_name character varying NOT NULL,
  table_name character varying NOT NULL,
  entity_version integer NOT NULL,
  notes text,
  fk_namespace integer,
  fk_creator integer,
  fk_last_modifier integer,
  tmsp_creation timestamp with time zone,
  tmsp_last_modification timestamp with time zone,
  sys_period tstzrange,
  metadata jsonb,
  fk_property integer NOT NULL,
  fk_column integer NOT NULL,
  fk_factoid_mapping integer NOT NULL,
  id_for_import integer,
  id_for_import_txt text,
  fk_publication_status integer,
  fk_license integer
);

--
-- TOC entry 259 (class 1259 OID 21082)
-- Name: factoid_role; Type: TABLE; Schema: data; Owner: -
--
CREATE TABLE data.factoid_role(
  fk_property integer NOT NULL,
  fk_domain_factoid integer NOT NULL,
  fk_data_range integer,
  fk_info_value_range integer
)
INHERITS (
  data.entity
);

--
-- TOC entry 260 (class 1259 OID 21089)
-- Name: factoid_role_vt; Type: TABLE; Schema: data; Owner: -
--
CREATE TABLE data.factoid_role_vt(
  pk_entity integer NOT NULL,
  schema_name character varying NOT NULL,
  table_name character varying NOT NULL,
  entity_version integer NOT NULL,
  notes text,
  fk_namespace integer,
  fk_creator integer,
  fk_last_modifier integer,
  tmsp_creation timestamp with time zone,
  tmsp_last_modification timestamp with time zone,
  sys_period tstzrange,
  metadata jsonb,
  fk_property integer NOT NULL,
  fk_domain_factoid integer NOT NULL,
  fk_data_range integer,
  fk_info_value_range integer,
  id_for_import integer,
  id_for_import_txt text,
  fk_publication_status integer,
  fk_license integer
);

--
-- TOC entry 261 (class 1259 OID 21094)
-- Name: factoid_vt; Type: TABLE; Schema: data; Owner: -
--
CREATE TABLE data.factoid_vt(
  pk_entity integer NOT NULL,
  schema_name character varying NOT NULL,
  table_name character varying NOT NULL,
  entity_version integer NOT NULL,
  notes text,
  fk_namespace integer,
  fk_creator integer,
  fk_last_modifier integer,
  tmsp_creation timestamp with time zone,
  tmsp_last_modification timestamp with time zone,
  sys_period tstzrange,
  metadata jsonb,
  fk_class integer NOT NULL,
  id_for_import integer,
  id_for_import_txt text,
  fk_publication_status integer,
  fk_license integer
);

--
-- TOC entry 262 (class 1259 OID 21099)
-- Name: namespace; Type: TABLE; Schema: data; Owner: -
--
CREATE TABLE data.namespace(
  fk_root_namespace integer,
  fk_project integer,
  standard_label text
)
INHERITS (
  data.entity
);

--
-- TOC entry 263 (class 1259 OID 21106)
-- Name: namespace_vt; Type: TABLE; Schema: data; Owner: -
--
CREATE TABLE data.namespace_vt(
  pk_entity integer NOT NULL,
  schema_name character varying NOT NULL,
  table_name character varying NOT NULL,
  entity_version integer NOT NULL,
  notes text,
  fk_namespace integer,
  fk_creator integer,
  fk_last_modifier integer,
  tmsp_creation timestamp with time zone,
  tmsp_last_modification timestamp with time zone,
  sys_period tstzrange,
  metadata jsonb,
  fk_root_namespace integer,
  fk_project integer,
  standard_label text,
  id_for_import integer,
  id_for_import_txt text,
  fk_publication_status integer,
  fk_license integer
);

--
-- TOC entry 358 (class 1259 OID 23099)
-- Name: property_of_property; Type: TABLE; Schema: data; Owner: -
--
CREATE TABLE data.property_of_property(
  fk_property_of_property integer NOT NULL,
  fk_domain_factoid_property integer,
  fk_domain_data_association integer,
  fk_data_range integer NOT NULL,
  fk_info_value_range integer NOT NULL
)
INHERITS (
  data.entity
);

--
-- TOC entry 356 (class 1259 OID 23037)
-- Name: property_of_property_mapping; Type: TABLE; Schema: data; Owner: -
--
CREATE TABLE data.property_of_property_mapping(
  fk_property_of_property integer NOT NULL,
  fk_domain_factoid_property_mapping integer,
  fk_domain_data_association_mapping integer,
  fk_range_column integer NOT NULL
)
INHERITS (
  data.entity
);

--
-- TOC entry 357 (class 1259 OID 23070)
-- Name: property_of_property_mapping_vt; Type: TABLE; Schema: data; Owner: -
--
CREATE TABLE data.property_of_property_mapping_vt(
  pk_entity integer NOT NULL,
  schema_name character varying NOT NULL,
  table_name character varying NOT NULL,
  entity_version integer NOT NULL,
  notes text,
  fk_namespace integer,
  fk_creator integer,
  fk_last_modifier integer,
  tmsp_creation timestamp with time zone,
  tmsp_last_modification timestamp with time zone,
  sys_period tstzrange,
  metadata jsonb,
  fk_property_of_property integer NOT NULL,
  fk_domain_factoid_property_mapping_vt integer,
  fk_domain_data_association_mapping integer,
  fk_range_column integer NOT NULL,
  id_for_import integer,
  id_for_import_txt text,
  fk_publication_status integer,
  fk_license integer
);

--
-- TOC entry 359 (class 1259 OID 23127)
-- Name: property_of_property_vt; Type: TABLE; Schema: data; Owner: -
--
CREATE TABLE data.property_of_property_vt(
  pk_entity integer NOT NULL,
  schema_name character varying NOT NULL,
  table_name character varying NOT NULL,
  entity_version integer NOT NULL,
  notes text,
  fk_namespace integer,
  fk_creator integer,
  fk_last_modifier integer,
  tmsp_creation timestamp with time zone,
  tmsp_last_modification timestamp with time zone,
  sys_period tstzrange,
  metadata jsonb,
  fk_property_of_property integer NOT NULL,
  fk_domain_factoid_property_vt integer,
  fk_domain_data_association integer,
  fk_data_range integer NOT NULL,
  fk_info_value_range integer NOT NULL,
  id_for_import integer,
  id_for_import_txt text,
  fk_publication_status integer,
  fk_license integer
);

--
-- TOC entry 264 (class 1259 OID 21123)
-- Name: text_property; Type: TABLE; Schema: data; Owner: -
--
CREATE TABLE data.text_property(
  pk_text integer DEFAULT nextval('commons.text_pk_text_seq'::regclass),
  quill_doc jsonb NOT NULL,
  string text NOT NULL,
  fk_system_type integer NOT NULL,
  fk_language integer NOT NULL,
  fk_entity integer,
  CONSTRAINT text_quill_doc_check CHECK (((quill_doc IS NULL) OR commons.validate_quill_doc(quill_doc)))
)
INHERITS (
  data.entity,
  commons.text
);

--
-- TOC entry 265 (class 1259 OID 21133)
-- Name: text_property_vt; Type: TABLE; Schema: data; Owner: -
--
CREATE TABLE data.text_property_vt(
  pk_text integer DEFAULT nextval('commons.text_pk_text_seq'::regclass),
  schema_name character varying,
  table_name character varying,
  entity_version integer,
  quill_doc jsonb NOT NULL,
  string text DEFAULT ''::text NOT NULL,
  pk_entity integer NOT NULL,
  notes text,
  fk_namespace integer,
  fk_creator integer,
  fk_last_modifier integer,
  tmsp_creation timestamp with time zone,
  tmsp_last_modification timestamp with time zone,
  sys_period tstzrange,
  metadata jsonb,
  fk_system_type integer NOT NULL,
  fk_language integer NOT NULL,
  id_for_import integer,
  id_for_import_txt text,
  fk_publication_status integer,
  fk_license integer,
  fk_entity integer
)
INHERITS (
  commons.text_vt
);

--
-- TOC entry 364 (class 1259 OID 23224)
-- Name: v_chunk; Type: VIEW; Schema: data; Owner: -
--
CREATE VIEW data.v_chunk AS
SELECT
  chunk.pk_entity,
  chunk.schema_name,
  chunk.table_name,
  chunk.entity_version,
  chunk.notes,
  chunk.fk_namespace,
  chunk.fk_creator,
  chunk.fk_last_modifier,
  chunk.tmsp_creation,
  chunk.tmsp_last_modification,
  chunk.sys_period,
  chunk.metadata,
  chunk.pk_text,
  chunk.quill_doc,
  chunk.string,
  chunk.fk_text,
  chunk.fk_entity_version,
  chunk.id_for_import,
  chunk.id_for_import_txt,
  chunk.fk_publication_status,
  chunk.fk_license
FROM
  data.chunk;

--
-- TOC entry 268 (class 1259 OID 21158)
-- Name: values_association; Type: TABLE; Schema: data; Owner: -
--
CREATE TABLE data.values_association(
  fk_property integer NOT NULL,
  fk_domain_cell integer,
  fk_range_cell integer,
  fk_domain_chunk integer,
  fk_range_chunk integer
)
INHERITS (
  data.entity
);

--
-- TOC entry 269 (class 1259 OID 21165)
-- Name: values_association_vt; Type: TABLE; Schema: data; Owner: -
--
CREATE TABLE data.values_association_vt(
  pk_entity integer NOT NULL,
  schema_name character varying NOT NULL,
  table_name character varying NOT NULL,
  entity_version integer NOT NULL,
  notes text,
  fk_namespace integer,
  fk_creator integer,
  fk_last_modifier integer,
  tmsp_creation timestamp with time zone,
  tmsp_last_modification timestamp with time zone,
  sys_period tstzrange,
  metadata jsonb,
  fk_property integer NOT NULL,
  fk_domain_cell integer,
  fk_range_cell integer,
  fk_domain_chunk integer,
  fk_range_chunk integer,
  id_for_import integer,
  id_for_import_txt text,
  fk_publication_status integer,
  fk_license integer
);

--
-- TOC entry 270 (class 1259 OID 21170)
-- Name: entity; Type: TABLE; Schema: data_for_history; Owner: -
--
CREATE TABLE data_for_history.entity(
  pk_entity integer NOT NULL,
  schema_name character varying,
  table_name character varying,
  entity_version integer,
  notes text,
  fk_creator integer,
  fk_last_modifier integer,
  tmsp_creation timestamp with time zone DEFAULT now(),
  tmsp_last_modification timestamp with time zone,
  sys_period tstzrange DEFAULT tstzrange(now(), NULL::timestamp with time zone),
  tmsp_last_dfh_update timestamp with time zone,
  is_enabled_in_profile boolean,
  removed_from_api boolean DEFAULT FALSE
);

--
-- TOC entry 386 (class 1259 OID 24080)
-- Name: api_class; Type: TABLE; Schema: data_for_history; Owner: -
--
CREATE TABLE data_for_history.api_class(
  requested_language character varying,
  dfh_pk_class integer,
  dfh_class_identifier_in_namespace character varying,
  dfh_class_label_language character varying,
  dfh_class_label text,
  dfh_class_scope_note_language character varying,
  dfh_class_scope_note text,
  dfh_basic_type integer,
  dfh_basic_type_label text,
  dfh_fk_namespace integer,
  dfh_namespace_label_language character varying,
  dfh_namespace_label text,
  dfh_namespace_uri text,
  dfh_profile_association_type text,
  dfh_fk_profile integer,
  dfh_profile_label_language character varying,
  dfh_profile_label text,
  dfh_parent_classes integer[] DEFAULT '{}' ::integer[] NOT NULL,
  dfh_ancestor_classes integer[] DEFAULT '{}' ::integer[] NOT NULL
)
INHERITS (
  data_for_history.entity
);

--
-- TOC entry 387 (class 1259 OID 24094)
-- Name: api_class_vt; Type: TABLE; Schema: data_for_history; Owner: -
--
CREATE TABLE data_for_history.api_class_vt(
  pk_entity integer NOT NULL,
  schema_name character varying,
  table_name character varying,
  entity_version integer,
  notes text,
  fk_creator integer,
  fk_last_modifier integer,
  tmsp_creation timestamp with time zone,
  tmsp_last_modification timestamp with time zone,
  sys_period tstzrange,
  tmsp_last_dfh_update timestamp with time zone,
  is_enabled_in_profile boolean,
  removed_from_api boolean,
  requested_language character varying,
  dfh_pk_class integer,
  dfh_class_identifier_in_namespace character varying,
  dfh_class_label_language character varying,
  dfh_class_label text,
  dfh_class_scope_note_language character varying,
  dfh_class_scope_note text,
  dfh_basic_type integer,
  dfh_basic_type_label text,
  dfh_fk_namespace integer,
  dfh_namespace_label_language character varying,
  dfh_namespace_label text,
  dfh_namespace_uri text,
  dfh_profile_association_type text,
  dfh_fk_profile integer,
  dfh_profile_label_language character varying,
  dfh_profile_label text,
  dfh_parent_classes integer[] DEFAULT '{}' ::integer[] NOT NULL,
  dfh_ancestor_classes integer[] DEFAULT '{}' ::integer[] NOT NULL
);

--
-- TOC entry 278 (class 1259 OID 21230)
-- Name: api_profile; Type: TABLE; Schema: data_for_history; Owner: -
--
CREATE TABLE data_for_history.api_profile(
  dfh_pk_profile integer,
  requested_language character varying(4),
  dfh_profile_label_language character varying(4),
  dfh_profile_label text,
  dfh_profile_definition_language character varying(4),
  dfh_profile_definition text,
  dfh_owned_by_project integer,
  dfh_project_label_language character varying(4),
  dfh_project_label text,
  dfh_is_ongoing_forced_publication boolean,
  dfh_date_profile_published date,
  dfh_date_profile_deprecated date,
  dfh_is_root_profile boolean DEFAULT FALSE,
  dfh_fk_root_profile integer
)
INHERITS (
  data_for_history.entity
);

--
-- TOC entry 279 (class 1259 OID 21238)
-- Name: api_profile_vt; Type: TABLE; Schema: data_for_history; Owner: -
--
CREATE TABLE data_for_history.api_profile_vt(
  pk_entity integer NOT NULL,
  schema_name character varying,
  table_name character varying,
  entity_version integer,
  notes text,
  fk_creator integer,
  fk_last_modifier integer,
  tmsp_creation timestamp with time zone,
  tmsp_last_modification timestamp with time zone,
  sys_period tstzrange,
  tmsp_last_dfh_update timestamp with time zone,
  dfh_pk_profile integer,
  requested_language character varying(4),
  dfh_profile_label_language character varying(4),
  dfh_profile_label text,
  dfh_profile_definition_language character varying(4),
  dfh_profile_definition text,
  dfh_owned_by_project integer,
  dfh_project_label_language character varying(4),
  dfh_project_label text,
  dfh_is_ongoing_forced_publication boolean,
  dfh_date_profile_published date,
  dfh_date_profile_deprecated date,
  dfh_is_root_profile boolean DEFAULT FALSE,
  dfh_fk_root_profile integer
);

--
-- TOC entry 388 (class 1259 OID 24104)
-- Name: api_property; Type: TABLE; Schema: data_for_history; Owner: -
--
CREATE TABLE data_for_history.api_property(
  requested_language character varying,
  dfh_pk_property integer,
  dfh_property_label_language character varying,
  dfh_property_label text,
  dfh_property_scope_note_language character varying,
  dfh_property_scope_note text,
  dfh_is_inherited boolean,
  dfh_property_domain integer,
  dfh_domain_instances_min_quantifier integer,
  dfh_domain_instances_max_quantifier integer,
  dfh_property_range integer,
  dfh_range_instances_min_quantifier integer,
  dfh_range_instances_max_quantifier integer,
  dfh_identity_defining boolean,
  dfh_is_has_type_subproperty boolean,
  dfh_property_identifier_in_namespace character varying,
  dfh_namespace_uri text,
  dfh_fk_namespace integer,
  dfh_namespace_label_language character varying,
  dfh_namespace_label text,
  dfh_profile_association_type character varying,
  dfh_fk_profile integer,
  dfh_profile_label_language character varying,
  dfh_profile_label text,
  dfh_property_inverse_label text,
  dfh_parent_properties integer[] DEFAULT '{}' ::integer[] NOT NULL,
  dfh_ancestor_properties integer[] DEFAULT '{}' ::integer[] NOT NULL
)
INHERITS (
  data_for_history.entity
);

--
-- TOC entry 389 (class 1259 OID 24118)
-- Name: api_property_vt; Type: TABLE; Schema: data_for_history; Owner: -
--
CREATE TABLE data_for_history.api_property_vt(
  pk_entity integer NOT NULL,
  schema_name character varying,
  table_name character varying,
  entity_version integer,
  notes text,
  fk_creator integer,
  fk_last_modifier integer,
  tmsp_creation timestamp with time zone,
  tmsp_last_modification timestamp with time zone,
  sys_period tstzrange,
  tmsp_last_dfh_update timestamp with time zone,
  is_enabled_in_profile boolean,
  removed_from_api boolean,
  requested_language character varying,
  dfh_pk_property integer,
  dfh_property_label_language character varying,
  dfh_property_label text,
  dfh_property_scope_note_language character varying,
  dfh_property_scope_note text,
  dfh_is_inherited boolean,
  dfh_property_domain integer,
  dfh_domain_instances_min_quantifier integer,
  dfh_domain_instances_max_quantifier integer,
  dfh_property_range integer,
  dfh_range_instances_min_quantifier integer,
  dfh_range_instances_max_quantifier integer,
  dfh_identity_defining boolean,
  dfh_is_has_type_subproperty boolean,
  dfh_property_identifier_in_namespace character varying,
  dfh_namespace_uri text,
  dfh_fk_namespace integer,
  dfh_namespace_label_language character varying,
  dfh_namespace_label text,
  dfh_profile_association_type character varying,
  dfh_fk_profile integer,
  dfh_profile_label_language character varying,
  dfh_profile_label text,
  dfh_property_inverse_label text,
  dfh_parent_properties integer[] DEFAULT '{}' ::integer[] NOT NULL,
  dfh_ancestor_properties integer[] DEFAULT '{}' ::integer[] NOT NULL
);

--
-- TOC entry 271 (class 1259 OID 21178)
-- Name: associates_system_type_deprecated; Type: TABLE; Schema: data_for_history; Owner: -
--
CREATE TABLE data_for_history.associates_system_type_deprecated(
  is_enabled_in_profile boolean,
  removed_from_api boolean DEFAULT FALSE,
  dfh_pk_associates_system_type integer,
  dfh_fk_system_type integer,
  dfh_fk_class integer,
  dfh_fk_class_type integer,
  dfh_fk_property integer,
  dfh_fk_property_type integer,
  dfh_fk_namespace integer,
  dfh_fk_label integer,
  dfh_fk_text_property integer,
  dfh_fk_project integer,
  dfh_fk_profile integer,
  dfh_fk_entity_association integer
)
INHERITS (
  data_for_history.entity
);

--
-- TOC entry 272 (class 1259 OID 21186)
-- Name: associates_system_type_vt_deprecated; Type: TABLE; Schema: data_for_history; Owner: -
--
CREATE TABLE data_for_history.associates_system_type_vt_deprecated(
  pk_entity integer NOT NULL,
  schema_name character varying,
  table_name character varying,
  entity_version integer,
  notes text,
  fk_creator integer,
  fk_last_modifier integer,
  tmsp_creation timestamp with time zone,
  tmsp_last_modification timestamp with time zone,
  sys_period tstzrange,
  tmsp_last_dfh_update timestamp with time zone,
  dfh_pk_associates_system_type integer,
  dfh_fk_system_type integer,
  dfh_fk_class integer,
  dfh_fk_class_type integer,
  dfh_fk_property integer,
  dfh_fk_property_type integer,
  dfh_fk_namespace integer,
  dfh_fk_label integer,
  dfh_fk_text_property integer,
  dfh_fk_project integer,
  dfh_fk_profile integer,
  dfh_fk_entity_association integer,
  is_inabled_in_profile boolean,
  removed_from_api boolean
);

--
-- TOC entry 273 (class 1259 OID 21199)
-- Name: class_profile_view_deprecated; Type: TABLE; Schema: data_for_history; Owner: -
--
CREATE TABLE data_for_history.class_profile_view_deprecated(
  tmsp_last_dfh_update timestamp with time zone,
  removed_from_api boolean DEFAULT NULL,
  dfh_fk_class integer,
  dfh_identifier_in_namespace text,
  dfh_class_standard_label character varying,
  dfh_fk_system_type integer,
  dfh_type_label character varying,
  dfh_root_namespace text,
  dfh_profile_association_type character varying,
  dfh_fk_profile integer,
  dfh_profile_label character varying
)
INHERITS (
  data_for_history.entity
);

--
-- TOC entry 274 (class 1259 OID 21206)
-- Name: class_profile_view_vt_deprecated; Type: TABLE; Schema: data_for_history; Owner: -
--
CREATE TABLE data_for_history.class_profile_view_vt_deprecated(
  pk_entity integer NOT NULL,
  schema_name character varying,
  table_name character varying,
  entity_version integer,
  notes text,
  fk_creator integer,
  fk_last_modifier integer,
  tmsp_creation timestamp with time zone,
  tmsp_last_modification timestamp with time zone,
  sys_period tstzrange,
  dfh_fk_class integer,
  dfh_identifier_in_namespace text,
  dfh_class_standard_label character varying,
  dfh_fk_system_type integer,
  dfh_type_label character varying,
  dfh_root_namespace text,
  dfh_profile_association_type character varying,
  dfh_fk_profile integer,
  dfh_profile_label character varying,
  is_enabled_in_profile boolean,
  tmsp_last_dfh_update timestamp with time zone,
  removed_from_api boolean
);

--
-- TOC entry 275 (class 1259 OID 21216)
-- Name: entity_pk_entity_seq; Type: SEQUENCE; Schema: data_for_history; Owner: -
--
CREATE SEQUENCE data_for_history.entity_pk_entity_seq
  AS integer START WITH 1
  INCREMENT BY 1
  NO MINVALUE
  NO MAXVALUE
  CACHE 1;

--
-- TOC entry 6476 (class 0 OID 0)
-- Dependencies: 275
-- Name: entity_pk_entity_seq; Type: SEQUENCE OWNED BY; Schema: data_for_history; Owner: -
--
ALTER SEQUENCE data_for_history.entity_pk_entity_seq OWNED BY data_for_history.entity.pk_entity;

--
-- TOC entry 276 (class 1259 OID 21217)
-- Name: label_deprecated; Type: TABLE; Schema: data_for_history; Owner: -
--
CREATE TABLE data_for_history.label_deprecated(
  dfh_pk_label integer,
  dfh_label text,
  dfh_language_iso_code character varying,
  dfh_is_standard_label_for_language boolean,
  dfh_fk_property integer,
  dfh_fk_namespace integer,
  dfh_fk_class integer,
  dfh_fk_project integer,
  dfh_fk_class_type integer,
  dfh_fk_property_type integer,
  dfh_fk_profile integer,
  dfh_creation_time timestamp without time zone,
  dfh_modification_time timestamp without time zone,
  dfh_fk_system_type integer,
  com_fk_system_type integer,
  inf_fk_language integer
)
INHERITS (
  data_for_history.entity
);

--
-- TOC entry 277 (class 1259 OID 21225)
-- Name: label_vt_deprecated; Type: TABLE; Schema: data_for_history; Owner: -
--
CREATE TABLE data_for_history.label_vt_deprecated(
  pk_entity integer NOT NULL,
  schema_name character varying,
  table_name character varying,
  entity_version integer,
  notes text,
  fk_creator integer,
  fk_last_modifier integer,
  tmsp_creation timestamp with time zone,
  tmsp_last_modification timestamp with time zone,
  sys_period tstzrange,
  tmsp_last_dfh_update timestamp with time zone,
  dfh_pk_label integer,
  dfh_label text,
  dfh_language_iso_code character varying,
  dfh_is_standard_label_for_language boolean,
  dfh_fk_property integer,
  dfh_fk_namespace integer,
  dfh_fk_class integer,
  dfh_fk_project integer,
  dfh_fk_class_type integer,
  dfh_fk_property_type integer,
  dfh_fk_profile integer,
  dfh_creation_time timestamp without time zone,
  dfh_modification_time timestamp without time zone
);

--
-- TOC entry 280 (class 1259 OID 21243)
-- Name: property; Type: TABLE; Schema: data_for_history; Owner: -
--
CREATE TABLE data_for_history.property(
  dfh_pk_property integer,
  dfh_identifier_in_namespace text,
  dfh_has_domain integer,
  dfh_has_range integer,
  dfh_creation_time timestamp without time zone,
  dfh_modification_time timestamp without time zone,
  dfh_standard_label character varying(500),
  dfh_domain_instances_min_quantifier smallint,
  dfh_domain_instances_max_quantifier smallint,
  dfh_range_instances_min_quantifier smallint,
  dfh_range_instances_max_quantifier smallint,
  dfh_fk_property_of_origin integer,
  identity_defining boolean DEFAULT FALSE
)
INHERITS (
  data_for_history.entity
);

--
-- TOC entry 6477 (class 0 OID 0)
-- Dependencies: 280
-- Name: COLUMN property.identity_defining; Type: COMMENT; Schema: data_for_history; Owner: -
--
COMMENT ON COLUMN data_for_history.property.identity_defining IS 'If the value is set to true, this means that this property is relevant for the TeEn identity.';

--
-- TOC entry 401 (class 1259 OID 24427)
-- Name: property_of_property; Type: TABLE; Schema: data_for_history; Owner: -
--
CREATE TABLE data_for_history.property_of_property(
  pk_property_of_property integer NOT NULL,
  label text,
  label_language character varying,
  scope_note text,
  scope_note_language character varying,
  is_inherited boolean,
  has_domain integer,
  dfh_domain_instances_min_quantifier integer,
  dfh_domain_instances_max_quantifier integer,
  has_range integer,
  dfh_range_instances_min_quantifier integer,
  dfh_range_instances_max_quantifier integer,
  identifier_in_namespace character varying,
  fk_profile integer
)
INHERITS (
  data_for_history.entity
);

--
-- TOC entry 402 (class 1259 OID 24445)
-- Name: property_of_property_vt; Type: TABLE; Schema: data_for_history; Owner: -
--
CREATE TABLE data_for_history.property_of_property_vt(
  pk_entity integer NOT NULL,
  schema_name character varying,
  table_name character varying,
  entity_version integer,
  notes text,
  fk_creator integer,
  fk_last_modifier integer,
  tmsp_creation timestamp with time zone,
  tmsp_last_modification timestamp with time zone,
  sys_period tstzrange,
  tmsp_last_dfh_update timestamp with time zone,
  is_enabled_in_profile boolean,
  removed_from_api boolean,
  pk_property_of_property integer NOT NULL,
  label text,
  label_language character varying,
  scope_note text,
  scope_note_language character varying,
  is_inherited boolean,
  has_domain integer,
  dfh_domain_instances_min_quantifier integer,
  dfh_domain_instances_max_quantifier integer,
  has_range integer,
  dfh_range_instances_min_quantifier integer,
  dfh_range_instances_max_quantifier integer,
  identifier_in_namespace character varying,
  fk_profile integer
);

--
-- TOC entry 281 (class 1259 OID 21252)
-- Name: property_profile_view_deprecated; Type: TABLE; Schema: data_for_history; Owner: -
--
CREATE TABLE data_for_history.property_profile_view_deprecated(
  is_enabled_in_profile boolean,
  removed_from_api boolean DEFAULT NULL,
  dfh_pk_property integer,
  dfh_identifier_in_namespace text,
  dfh_has_domain integer,
  dfh_has_range integer,
  dfh_fk_property_of_origin integer,
  dfh_standard_label character varying,
  dfh_root_namespace text,
  dfh_pk_profile integer,
  dfh_profile_label character varying
)
INHERITS (
  data_for_history.entity
);

--
-- TOC entry 282 (class 1259 OID 21259)
-- Name: property_profile_view_vt_deprecated; Type: TABLE; Schema: data_for_history; Owner: -
--
CREATE TABLE data_for_history.property_profile_view_vt_deprecated(
  pk_entity integer NOT NULL,
  schema_name character varying,
  table_name character varying,
  entity_version integer,
  notes text,
  fk_creator integer,
  fk_last_modifier integer,
  tmsp_creation timestamp with time zone,
  tmsp_last_modification timestamp with time zone,
  sys_period tstzrange,
  tmsp_last_dfh_update timestamp with time zone,
  dfh_pk_property integer,
  dfh_identifier_in_namespace text,
  dfh_has_domain integer,
  dfh_has_range integer,
  dfh_fk_property_of_origin integer,
  dfh_standard_label character varying,
  dfh_root_namespace text,
  dfh_pk_profile integer,
  dfh_profile_label character varying,
  is_inabled_in_profile boolean,
  removed_from_api boolean
);

--
-- TOC entry 283 (class 1259 OID 21264)
-- Name: property_vt; Type: TABLE; Schema: data_for_history; Owner: -
--
CREATE TABLE data_for_history.property_vt(
  pk_entity integer NOT NULL,
  schema_name character varying,
  table_name character varying,
  entity_version integer,
  notes text,
  fk_creator integer,
  fk_last_modifier integer,
  tmsp_creation timestamp with time zone,
  tmsp_last_modification timestamp with time zone,
  sys_period tstzrange,
  tmsp_last_dfh_update timestamp with time zone,
  dfh_pk_property integer,
  dfh_identifier_in_namespace text,
  dfh_has_domain integer,
  dfh_has_range integer,
  dfh_creation_time timestamp without time zone,
  dfh_modification_time timestamp without time zone,
  dfh_domain_instances_cardinality smallint,
  dfh_range_instances_cardinality smallint,
  dfh_standard_label character varying(500),
  dfh_fk_property_of_origin integer,
  identity_defining boolean
);

--
-- TOC entry 284 (class 1259 OID 21269)
-- Name: system_type_deprecated; Type: TABLE; Schema: data_for_history; Owner: -
--
CREATE TABLE data_for_history.system_type_deprecated(
  dfh_pk_system_type integer,
  dfh_used_in_table character varying(250),
  dfh_standard_label character varying(500),
  dfh_creation_time timestamp without time zone,
  dfh_modification_time timestamp without time zone
)
INHERITS (
  data_for_history.entity
);

--
-- TOC entry 285 (class 1259 OID 21277)
-- Name: system_type_vt_deprecated; Type: TABLE; Schema: data_for_history; Owner: -
--
CREATE TABLE data_for_history.system_type_vt_deprecated(
  pk_entity integer NOT NULL,
  schema_name character varying,
  table_name character varying,
  entity_version integer,
  notes text,
  fk_creator integer,
  fk_last_modifier integer,
  tmsp_creation timestamp with time zone,
  tmsp_last_modification timestamp with time zone,
  sys_period tstzrange,
  tmsp_last_dfh_update timestamp with time zone,
  is_inabled_in_profile boolean,
  removed_from_api boolean,
  dfh_pk_system_type integer,
  dfh_used_in_table character varying(250),
  dfh_standard_label character varying(500),
  dfh_creation_time timestamp without time zone,
  dfh_modification_time timestamp without time zone
);

--
-- TOC entry 286 (class 1259 OID 21282)
-- Name: text_property_deprecated; Type: TABLE; Schema: data_for_history; Owner: -
--
CREATE TABLE data_for_history.text_property_deprecated(
  dfh_pk_text_property integer,
  dfh_text_property text,
  dfh_language_iso_code character varying,
  dfh_creation_time timestamp without time zone,
  dfh_modification_time timestamp without time zone,
  dfh_fk_property integer,
  dfh_fk_namespace integer,
  dfh_fk_class integer,
  dfh_fk_project integer,
  dfh_fk_class_type integer,
  dfh_fk_property_type integer,
  dfh_fk_system_type integer,
  dfh_fk_entity_association integer,
  dfh_fk_profile integer,
  dfh_fk_is_subclass_of integer
)
INHERITS (
  data_for_history.entity
);

--
-- TOC entry 287 (class 1259 OID 21290)
-- Name: text_property_vt_deprecated; Type: TABLE; Schema: data_for_history; Owner: -
--
CREATE TABLE data_for_history.text_property_vt_deprecated(
  pk_entity integer NOT NULL,
  schema_name character varying,
  table_name character varying,
  entity_version integer,
  notes text,
  fk_creator integer,
  fk_last_modifier integer,
  tmsp_creation timestamp with time zone,
  tmsp_last_modification timestamp with time zone,
  sys_period tstzrange,
  tmsp_last_dfh_update timestamp with time zone,
  dfh_pk_text_property integer,
  dfh_text_property text,
  dfh_language_iso_code character varying,
  dfh_creation_time timestamp without time zone,
  dfh_modification_time timestamp without time zone,
  dfh_fk_property integer,
  dfh_fk_namespace integer,
  dfh_fk_class integer,
  dfh_fk_project integer,
  dfh_fk_class_type integer,
  dfh_fk_property_type integer,
  dfh_fk_system_type integer,
  dfh_fk_entity_association integer,
  dfh_fk_profile integer,
  dfh_fk_is_subclass_of integer
);

--
-- TOC entry 392 (class 1259 OID 24143)
-- Name: v_class; Type: VIEW; Schema: data_for_history; Owner: -
--
CREATE VIEW data_for_history.v_class AS
WITH tw1 AS (
  SELECT
    t1_1.dfh_pk_class,
    jsonb_agg(DISTINCT jsonb_build_object('fk_profile', t1_1.dfh_fk_profile, 'removed_from_api', t1_1.removed_from_api)) AS profiles
  FROM
    data_for_history.api_class t1_1
  GROUP BY
    t1_1.dfh_pk_class
)
SELECT DISTINCT ON (t1.dfh_pk_class)
  t1.dfh_pk_class AS pk_class,
  t1.dfh_class_identifier_in_namespace AS identifier_in_namespace,
  t1.dfh_basic_type AS basic_type,
  t1.dfh_basic_type_label AS basic_type_label,
  tw1.profiles,
  t1.dfh_parent_classes AS parent_classes,
  t1.dfh_ancestor_classes AS ancestor_classes
FROM
  tw1,
  data_for_history.api_class t1
WHERE (tw1.dfh_pk_class = t1.dfh_pk_class);

--
-- TOC entry 391 (class 1259 OID 24138)
-- Name: v_label; Type: VIEW; Schema: data_for_history; Owner: -
--
CREATE VIEW data_for_history.v_label AS SELECT DISTINCT ON (t1.dfh_pk_profile, t1.dfh_profile_label, t1.dfh_profile_label_language)
  'label'::text AS type,
  t1.dfh_profile_label AS label,
  t1.dfh_profile_label_language AS
  LANGUAGE,
  t1.dfh_pk_profile AS fk_profile,
  NULL::integer AS fk_project,
  NULL::integer AS fk_property,
  NULL::integer AS fk_class,
  NULL::integer AS fk_property_of_property
FROM
  data_for_history.api_profile t1
UNION
SELECT DISTINCT ON (t1.dfh_pk_profile, t1.dfh_profile_definition, t1.dfh_profile_definition_language)
  'definition'::text AS type,
  t1.dfh_profile_definition AS label,
  t1.dfh_profile_definition_language AS
  LANGUAGE,
  t1.dfh_pk_profile AS fk_profile,
  NULL::integer AS fk_project,
  NULL::integer AS fk_property,
  NULL::integer AS fk_class,
  NULL::integer AS fk_property_of_property
FROM
  data_for_history.api_profile t1
UNION
SELECT DISTINCT ON (t1.dfh_owned_by_project, t1.dfh_project_label, t1.dfh_project_label_language)
  'label'::text AS type,
  t1.dfh_project_label AS label,
  t1.dfh_project_label_language AS
  LANGUAGE,
  NULL::integer AS fk_profile,
  t1.dfh_owned_by_project AS fk_project,
  NULL::integer AS fk_property,
  NULL::integer AS fk_class,
  NULL::integer AS fk_property_of_property
FROM
  data_for_history.api_profile t1
UNION
SELECT DISTINCT ON (t1.dfh_pk_property, t1.dfh_property_label, t1.dfh_property_label_language)
  'label'::text AS type,
  t1.dfh_property_label AS label,
  t1.dfh_property_label_language AS
  LANGUAGE,
  NULL::integer AS fk_profile,
  NULL::integer AS fk_project,
  t1.dfh_pk_property AS fk_property,
  NULL::integer AS fk_class,
  NULL::integer AS fk_property_of_property
FROM
  data_for_history.api_property t1
UNION
SELECT DISTINCT ON (t1.dfh_pk_property, t1.dfh_property_inverse_label, t1.dfh_property_label_language)
  'inverse_label'::text AS type,
  t1.dfh_property_inverse_label AS label,
  t1.dfh_property_label_language AS
  LANGUAGE,
  NULL::integer AS fk_profile,
  NULL::integer AS fk_project,
  t1.dfh_pk_property AS fk_property,
  NULL::integer AS fk_class,
  NULL::integer AS fk_property_of_property
FROM
  data_for_history.api_property t1
WHERE (t1.dfh_property_inverse_label IS NOT NULL)
UNION
SELECT DISTINCT ON (t1.dfh_pk_property, t1.dfh_property_scope_note, t1.dfh_property_scope_note_language)
  'scope_note'::text AS type,
  t1.dfh_property_scope_note AS label,
  t1.dfh_property_scope_note_language AS
  LANGUAGE,
  NULL::integer AS fk_profile,
  NULL::integer AS fk_project,
  t1.dfh_pk_property AS fk_property,
  NULL::integer AS fk_class,
  NULL::integer AS fk_property_of_property
FROM
  data_for_history.api_property t1
UNION
SELECT DISTINCT ON (t1.dfh_pk_class, t1.dfh_class_label, t1.dfh_class_label_language)
  'label'::text AS type,
  t1.dfh_class_label AS label,
  t1.dfh_class_label_language AS
  LANGUAGE,
  NULL::integer AS fk_profile,
  NULL::integer AS fk_project,
  NULL::integer AS fk_property,
  t1.dfh_pk_class AS fk_class,
  NULL::integer AS fk_property_of_property
FROM
  data_for_history.api_class t1
UNION
SELECT DISTINCT ON (t1.dfh_pk_class, t1.dfh_class_scope_note, t1.dfh_class_scope_note_language)
  'scope_note'::text AS type,
  t1.dfh_class_scope_note AS label,
  t1.dfh_class_scope_note_language AS
  LANGUAGE,
  NULL::integer AS fk_profile,
  NULL::integer AS fk_project,
  NULL::integer AS fk_property,
  t1.dfh_pk_class AS fk_class,
  NULL::integer AS fk_property_of_property
FROM
  data_for_history.api_class t1
UNION
SELECT DISTINCT ON (t1.pk_property_of_property, t1.label, t1.label_language)
  'label'::text AS type,
  t1.label,
  t1.label_language AS
  LANGUAGE,
  NULL::integer AS fk_profile,
  NULL::integer AS fk_project,
  NULL::integer AS fk_property,
  NULL::integer AS fk_class,
  t1.pk_property_of_property AS fk_property_of_property
FROM
  data_for_history.property_of_property t1
UNION
SELECT DISTINCT ON (t1.pk_property_of_property, t1.scope_note, t1.scope_note_language)
  'scope_note'::text AS type,
  t1.scope_note AS label,
  t1.scope_note_language AS
  LANGUAGE,
  NULL::integer AS fk_profile,
  NULL::integer AS fk_project,
  NULL::integer AS fk_property,
  NULL::integer AS fk_class,
  t1.pk_property_of_property AS fk_property_of_property
FROM
  data_for_history.property_of_property t1;

--
-- TOC entry 390 (class 1259 OID 24134)
-- Name: v_profile; Type: VIEW; Schema: data_for_history; Owner: -
--
CREATE VIEW data_for_history.v_profile AS SELECT DISTINCT
  t1.dfh_pk_profile AS pk_profile,
  t1.dfh_owned_by_project AS owned_by_project,
  t1.dfh_is_ongoing_forced_publication AS is_ongoing_forced_publication,
  t1.dfh_date_profile_published AS date_profile_published,
  t1.dfh_date_profile_deprecated AS date_profile_deprecated,
  t1.tmsp_last_dfh_update
FROM
  data_for_history.api_profile t1;

--
-- TOC entry 420 (class 1259 OID 24731)
-- Name: v_property; Type: VIEW; Schema: data_for_history; Owner: -
--
CREATE VIEW data_for_history.v_property AS
WITH tw0 AS (
  SELECT
    t1_1.dfh_pk_property,
    t1_1.dfh_is_inherited,
    t1_1.dfh_property_domain,
    t1_1.dfh_domain_instances_min_quantifier,
    t1_1.dfh_domain_instances_max_quantifier,
    t1_1.dfh_property_range,
    t1_1.dfh_range_instances_min_quantifier,
    t1_1.dfh_range_instances_max_quantifier,
    t1_1.dfh_property_identifier_in_namespace,
    t1_1.dfh_fk_profile,
    t1_1.removed_from_api,
    t1_1.dfh_parent_properties,
    t1_1.dfh_ancestor_properties
  FROM
    data_for_history.api_property t1_1
),
tw1 AS (
  SELECT
    t1_1.dfh_pk_property,
    t1_1.dfh_property_domain,
    t1_1.dfh_property_range,
    jsonb_agg(DISTINCT jsonb_build_object('fk_profile', t1_1.dfh_fk_profile, 'removed_from_api', t1_1.removed_from_api)) AS profiles
FROM
  tw0 t1_1
GROUP BY
  t1_1.dfh_pk_property,
  t1_1.dfh_property_domain,
  t1_1.dfh_property_range
)
SELECT DISTINCT ON (t1.dfh_pk_property, t1.dfh_property_domain, t1.dfh_property_range)
  t1.dfh_pk_property AS pk_property,
  t1.dfh_property_domain AS has_domain,
  t1.dfh_domain_instances_min_quantifier AS domain_instances_min_quantifier,
  t1.dfh_domain_instances_max_quantifier AS domain_instances_max_quantifier,
  t1.dfh_property_range AS has_range,
  t1.dfh_range_instances_min_quantifier AS range_instances_min_quantifier,
  t1.dfh_range_instances_max_quantifier AS range_instances_max_quantifier,
  t1.dfh_property_identifier_in_namespace AS identifier_in_namespace,
  t1.dfh_parent_properties AS parent_properties,
  t1.dfh_ancestor_properties AS ancestor_properties,
  t2.profiles
FROM
  tw0 t1,
  tw1 t2
WHERE ((t1.dfh_pk_property = t2.dfh_pk_property)
  AND (t1.dfh_property_domain = t2.dfh_property_domain)
  AND (t1.dfh_property_range = t2.dfh_property_range))
ORDER BY
  t1.dfh_pk_property,
  t1.dfh_property_domain,
  t1.dfh_property_range,
  t1.removed_from_api;

--
-- TOC entry 367 (class 1259 OID 23707)
-- Name: v_property_deprecated; Type: VIEW; Schema: data_for_history; Owner: -
--
CREATE VIEW data_for_history.v_property_deprecated AS SELECT DISTINCT
  t1.pk_entity,
  CASE WHEN (t1.dfh_fk_property_of_origin IS NOT NULL) THEN
    TRUE
  ELSE
    FALSE
  END AS is_inherited,
  t1.dfh_has_domain,
  COALESCE(t1.dfh_fk_property_of_origin, t1.dfh_pk_property) AS fk_property,
  t1.dfh_has_range,
  t1.dfh_pk_property,
  t1.dfh_identifier_in_namespace,
  t1.dfh_standard_label,
  t1.is_enabled_in_profile,
  t1.removed_from_api,
  t1.dfh_fk_property_of_origin,
  t1.dfh_domain_instances_min_quantifier,
  t1.dfh_domain_instances_max_quantifier,
  t1.dfh_range_instances_min_quantifier,
  t1.dfh_range_instances_max_quantifier,
  t1.identity_defining
FROM
  data_for_history.property t1
ORDER BY
  t1.dfh_has_domain,
  COALESCE(t1.dfh_fk_property_of_origin, t1.dfh_pk_property),
  CASE WHEN (t1.dfh_fk_property_of_origin IS NOT NULL) THEN
    TRUE
  ELSE
    FALSE
  END,
  t1.dfh_pk_property;

--
-- TOC entry 366 (class 1259 OID 23702)
-- Name: v_property_profile_view_deprecated; Type: VIEW; Schema: data_for_history; Owner: -
--
CREATE VIEW data_for_history.v_property_profile_view_deprecated AS SELECT DISTINCT
  t1.pk_entity,
  CASE WHEN (t1.dfh_fk_property_of_origin IS NOT NULL) THEN
    TRUE
  ELSE
    FALSE
  END AS is_inherited,
  t1.dfh_has_domain,
  COALESCE(t1.dfh_fk_property_of_origin, t1.dfh_pk_property) AS fk_property,
  t1.dfh_has_range,
  t1.dfh_pk_property,
  t1.dfh_identifier_in_namespace,
  t1.dfh_standard_label,
  t1.dfh_pk_profile,
  t1.dfh_profile_label,
  t1.is_enabled_in_profile,
  t1.removed_from_api,
  t1.dfh_fk_property_of_origin,
  t2.dfh_domain_instances_min_quantifier,
  t2.dfh_domain_instances_max_quantifier,
  t2.dfh_range_instances_min_quantifier,
  t2.dfh_range_instances_max_quantifier,
  t2.identity_defining
FROM
  data_for_history.property_profile_view_deprecated t1,
  data_for_history.property t2
WHERE (t1.dfh_pk_property = t2.dfh_pk_property)
ORDER BY
  CASE WHEN (t1.dfh_fk_property_of_origin IS NOT NULL) THEN
    TRUE
  ELSE
    FALSE
  END,
  COALESCE(t1.dfh_fk_property_of_origin, t1.dfh_pk_property),
  t1.dfh_pk_property;

--
-- TOC entry 290 (class 1259 OID 21340)
-- Name: _backup_entity_association; Type: TABLE; Schema: information; Owner: -
--
CREATE TABLE information._backup_entity_association(
  fk_info_domain integer,
  fk_info_range integer,
  fk_property integer,
  fk_data_domain integer,
  fk_data_range integer,
  fk_cell_domain bigint,
  fk_cell_range bigint
)
INHERITS (
  information.entity
);

--
-- TOC entry 288 (class 1259 OID 21321)
-- Name: appellation; Type: TABLE; Schema: information; Owner: -
--
CREATE TABLE information.appellation(
  pk_text integer DEFAULT nextval('commons.text_pk_text_seq'::regclass),
  entity_version integer,
  quill_doc jsonb NOT NULL,
  string text NOT NULL,
  fk_class integer NOT NULL
)
INHERITS (
  commons.text,
  information.entity
);

--
-- TOC entry 289 (class 1259 OID 21332)
-- Name: appellation_vt; Type: TABLE; Schema: information; Owner: -
--
CREATE TABLE information.appellation_vt(
  pk_text integer DEFAULT nextval('commons.text_pk_text_seq'::regclass),
  schema_name character varying,
  table_name character varying,
  entity_version integer,
  quill_doc jsonb NOT NULL,
  string text DEFAULT ''::text NOT NULL,
  pk_entity integer NOT NULL,
  notes text,
  fk_creator integer,
  fk_last_modifier integer,
  tmsp_creation timestamp with time zone,
  tmsp_last_modification timestamp with time zone,
  sys_period tstzrange,
  fk_class integer NOT NULL
)
INHERITS (
  commons.text_vt
);

--
-- TOC entry 360 (class 1259 OID 23145)
-- Name: dimension; Type: TABLE; Schema: information; Owner: -
--
CREATE TABLE information.dimension(
  fk_class integer NOT NULL,
  fk_measurement_unit integer NOT NULL,
  numeric_value numeric NOT NULL
)
INHERITS (
  information.entity
);

--
-- TOC entry 361 (class 1259 OID 23168)
-- Name: dimension_vt; Type: TABLE; Schema: information; Owner: -
--
CREATE TABLE information.dimension_vt(
  pk_entity integer NOT NULL,
  schema_name character varying NOT NULL,
  table_name character varying NOT NULL,
  notes text,
  fk_creator integer,
  fk_last_modifier integer,
  tmsp_creation timestamp with time zone,
  tmsp_last_modification timestamp with time zone,
  sys_period tstzrange,
  metadata jsonb,
  fk_class integer NOT NULL,
  fk_measurement_unit integer NOT NULL,
  numeric_value numeric NOT NULL
);

--
-- TOC entry 250 (class 1259 OID 21028)
-- Name: entity_pk_entity_seq; Type: SEQUENCE; Schema: information; Owner: -
--
CREATE SEQUENCE information.entity_pk_entity_seq
  AS integer START WITH 1
  INCREMENT BY 1
  NO MINVALUE
  NO MAXVALUE
  CACHE 1;

--
-- TOC entry 6478 (class 0 OID 0)
-- Dependencies: 250
-- Name: entity_pk_entity_seq; Type: SEQUENCE OWNED BY; Schema: information; Owner: -
--
ALTER SEQUENCE information.entity_pk_entity_seq OWNED BY information.entity.pk_entity;

--
-- TOC entry 398 (class 1259 OID 24388)
-- Name: lang_string; Type: TABLE; Schema: information; Owner: -
--
CREATE TABLE information.lang_string(
  entity_version integer DEFAULT 1,
  fk_language integer NOT NULL,
  fk_class integer NOT NULL
)
INHERITS (
  information.entity,
  commons.text
);

--
-- TOC entry 399 (class 1259 OID 24415)
-- Name: lang_string_vt; Type: TABLE; Schema: information; Owner: -
--
CREATE TABLE information.lang_string_vt(
  pk_entity integer NOT NULL,
  schema_name character varying,
  table_name character varying,
  notes text,
  fk_creator integer,
  fk_last_modifier integer,
  tmsp_creation timestamp with time zone,
  tmsp_last_modification timestamp with time zone,
  sys_period tstzrange,
  metadata jsonb,
  pk_text integer,
  entity_version integer,
  quill_doc jsonb,
  string text,
  fk_language integer NOT NULL,
  fk_class integer NOT NULL
)
INHERITS (
  commons.text_vt
);

--
-- TOC entry 291 (class 1259 OID 21353)
-- Name: language; Type: TABLE; Schema: information; Owner: -
--
CREATE TABLE information.language(
  pk_language character(3) NOT NULL,
  fk_class integer,
  lang_type character varying,
  scope character varying,
  iso6392b character(3),
  iso6392t character(3),
  iso6391 character(3)
)
INHERITS (
  information.entity
);

--
-- TOC entry 292 (class 1259 OID 21360)
-- Name: language_vt; Type: TABLE; Schema: information; Owner: -
--
CREATE TABLE information.language_vt(
  pk_entity integer NOT NULL,
  schema_name character varying NOT NULL,
  table_name character varying NOT NULL,
  notes text,
  fk_creator integer,
  fk_last_modifier integer,
  tmsp_creation timestamp with time zone,
  tmsp_last_modification timestamp with time zone,
  sys_period tstzrange,
  pk_language character(3) NOT NULL,
  fk_class integer,
  lang_type character varying,
  scope character varying,
  iso6392b character(3),
  iso6392t character(3),
  iso6391 character(3)
);

--
-- TOC entry 293 (class 1259 OID 21365)
-- Name: persistent_item_backup; Type: TABLE; Schema: information; Owner: -
--
CREATE TABLE information.persistent_item_backup(
  pk_entity integer DEFAULT nextval('information.entity_pk_entity_seq'::regclass) NOT NULL,
  schema_name character varying NOT NULL,
  table_name character varying NOT NULL,
  notes text,
  fk_creator integer,
  fk_last_modifier integer,
  tmsp_creation timestamp with time zone DEFAULT now(),
  tmsp_last_modification timestamp with time zone,
  sys_period tstzrange DEFAULT tstzrange(now(), NULL::timestamp with time zone),
  metadata jsonb,
  fk_class integer
);

--
-- TOC entry 294 (class 1259 OID 21373)
-- Name: persistent_item_vt_backup; Type: TABLE; Schema: information; Owner: -
--
CREATE TABLE information.persistent_item_vt_backup(
  pk_entity integer NOT NULL,
  schema_name character varying NOT NULL,
  table_name character varying NOT NULL,
  notes text,
  fk_creator integer,
  fk_last_modifier integer,
  tmsp_creation timestamp with time zone,
  tmsp_last_modification timestamp with time zone,
  sys_period tstzrange,
  fk_class integer
);

--
-- TOC entry 295 (class 1259 OID 21378)
-- Name: place; Type: TABLE; Schema: information; Owner: -
--
CREATE TABLE information.place(
  geo_point public.geography(point, 4326),
  fk_class integer
)
INHERITS (
  information.entity
);

--
-- TOC entry 296 (class 1259 OID 21385)
-- Name: place_vt; Type: TABLE; Schema: information; Owner: -
--
CREATE TABLE information.place_vt(
  pk_entity integer NOT NULL,
  schema_name character varying NOT NULL,
  table_name character varying NOT NULL,
  notes text,
  fk_creator integer,
  fk_last_modifier integer,
  tmsp_creation timestamp with time zone,
  tmsp_last_modification timestamp with time zone,
  sys_period tstzrange,
  geo_point public.geography(point, 4326),
  fk_class integer
);

--
-- TOC entry 416 (class 1259 OID 24647)
-- Name: resource; Type: TABLE; Schema: information; Owner: -
--
CREATE TABLE information.resource(
  pk_entity integer DEFAULT nextval('information.entity_pk_entity_seq'::regclass),
  schema_name character varying,
  table_name character varying,
  notes text,
  fk_creator integer,
  fk_last_modifier integer,
  tmsp_creation timestamp with time zone DEFAULT NULL,
  tmsp_last_modification timestamp with time zone,
  sys_period tstzrange DEFAULT NULL,
  metadata jsonb,
  fk_class integer,
  community_visibility jsonb
)
INHERITS (
  information.entity
);

--
-- TOC entry 417 (class 1259 OID 24658)
-- Name: resource_vt; Type: TABLE; Schema: information; Owner: -
--
CREATE TABLE information.resource_vt(
  pk_entity integer NOT NULL,
  schema_name character varying NOT NULL,
  table_name character varying NOT NULL,
  notes text,
  fk_creator integer,
  fk_last_modifier integer,
  tmsp_creation timestamp with time zone,
  tmsp_last_modification timestamp with time zone,
  sys_period tstzrange,
  metadata jsonb,
  fk_class integer,
  community_visibility jsonb
);

--
-- TOC entry 297 (class 1259 OID 21402)
-- Name: statement; Type: TABLE; Schema: information; Owner: -
--
CREATE TABLE information.statement(
  fk_object_info integer DEFAULT 0 NOT NULL,
  fk_subject_info integer DEFAULT 0 NOT NULL,
  fk_property integer DEFAULT 0 NOT NULL,
  fk_property_of_property integer DEFAULT 0 NOT NULL,
  fk_subject_data integer DEFAULT 0 NOT NULL,
  fk_subject_tables_row bigint DEFAULT 0 NOT NULL,
  fk_subject_tables_cell bigint DEFAULT 0 NOT NULL,
  fk_object_data integer DEFAULT 0 NOT NULL,
  fk_object_tables_row bigint DEFAULT 0 NOT NULL,
  fk_object_tables_cell bigint DEFAULT 0 NOT NULL
)
INHERITS (
  information.entity
);

--
-- TOC entry 298 (class 1259 OID 21410)
-- Name: statement_vt; Type: TABLE; Schema: information; Owner: -
--
CREATE TABLE information.statement_vt(
  pk_entity integer NOT NULL,
  schema_name character varying NOT NULL,
  table_name character varying NOT NULL,
  notes text,
  fk_creator integer,
  fk_last_modifier integer,
  tmsp_creation timestamp with time zone,
  tmsp_last_modification timestamp with time zone,
  sys_period tstzrange,
  fk_object_info integer,
  fk_subject_info integer,
  fk_property integer,
  fk_property_of_property integer DEFAULT 0 NOT NULL,
  fk_subject_data integer DEFAULT 0 NOT NULL,
  fk_subject_tables_row bigint DEFAULT 0 NOT NULL,
  fk_subject_tables_cell bigint DEFAULT 0 NOT NULL,
  fk_object_data integer DEFAULT 0 NOT NULL,
  fk_object_tables_row bigint DEFAULT 0 NOT NULL,
  fk_object_tables_cell bigint DEFAULT 0 NOT NULL
);

--
-- TOC entry 234 (class 1259 OID 20874)
-- Name: temporal_entity_backup; Type: TABLE; Schema: information; Owner: -
--
CREATE TABLE information.temporal_entity_backup(
  pk_entity integer DEFAULT nextval('information.entity_pk_entity_seq'::regclass) NOT NULL,
  schema_name character varying NOT NULL,
  table_name character varying NOT NULL,
  notes text,
  fk_creator integer,
  fk_last_modifier integer,
  tmsp_creation timestamp with time zone DEFAULT now(),
  tmsp_last_modification timestamp with time zone,
  sys_period tstzrange DEFAULT tstzrange(now(), NULL::timestamp with time zone),
  metadata jsonb,
  fk_class integer
);

--
-- TOC entry 299 (class 1259 OID 21416)
-- Name: temporal_entity_vt_backup; Type: TABLE; Schema: information; Owner: -
--
CREATE TABLE information.temporal_entity_vt_backup(
  pk_entity integer NOT NULL,
  schema_name character varying NOT NULL,
  table_name character varying NOT NULL,
  notes text,
  fk_creator integer,
  fk_last_modifier integer,
  tmsp_creation timestamp with time zone,
  tmsp_last_modification timestamp with time zone,
  sys_period tstzrange,
  fk_class integer
);

--
-- TOC entry 300 (class 1259 OID 21421)
-- Name: text_property; Type: TABLE; Schema: information; Owner: -
--
CREATE TABLE information.text_property(
  pk_text integer DEFAULT nextval('commons.text_pk_text_seq'::regclass),
  entity_version integer,
  quill_doc jsonb NOT NULL,
  string text NOT NULL,
  _deprecated_text_property text,
  fk_concerned_entity integer NOT NULL,
  _deprecated_text_property_quill_doc jsonb,
  fk_language integer NOT NULL,
  fk_class_field integer,
  CONSTRAINT text_quill_doc_check CHECK (((quill_doc IS NULL) OR commons.validate_quill_doc(quill_doc)))
)
INHERITS (
  commons.text,
  information.entity
);

--
-- TOC entry 301 (class 1259 OID 21431)
-- Name: text_property_vt; Type: TABLE; Schema: information; Owner: -
--
CREATE TABLE information.text_property_vt(
  pk_text integer DEFAULT nextval('commons.text_pk_text_seq'::regclass),
  schema_name character varying,
  table_name character varying,
  entity_version integer,
  quill_doc jsonb NOT NULL,
  string text DEFAULT ''::text NOT NULL,
  pk_entity integer NOT NULL,
  notes text,
  fk_creator integer,
  fk_last_modifier integer,
  tmsp_creation timestamp with time zone,
  tmsp_last_modification timestamp with time zone,
  sys_period tstzrange,
  _deprecated_text_property text,
  fk_concerned_entity integer,
  _deprecated_text_property_quill_doc jsonb,
  fk_language integer,
  fk_class_field integer
)
INHERITS (
  commons.text_vt
);

--
-- TOC entry 303 (class 1259 OID 21447)
-- Name: time_primitive_vt; Type: TABLE; Schema: information; Owner: -
--
CREATE TABLE information.time_primitive_vt(
  pk_entity integer NOT NULL,
  schema_name character varying NOT NULL,
  table_name character varying NOT NULL,
  notes text,
  fk_creator integer,
  fk_last_modifier integer,
  tmsp_creation timestamp with time zone,
  tmsp_last_modification timestamp with time zone,
  sys_period tstzrange,
  duration public.calendar_granularities,
  fk_class integer,
  julian_day integer,
  calendar public.calendar_type
);

--
-- TOC entry 362 (class 1259 OID 23176)
-- Name: v_dimension; Type: VIEW; Schema: information; Owner: -
--
CREATE VIEW information.v_dimension AS
SELECT
  dimension.pk_entity,
  dimension.schema_name,
  dimension.table_name,
  dimension.notes,
  dimension.fk_creator,
  dimension.fk_last_modifier,
  dimension.tmsp_creation,
  dimension.tmsp_last_modification,
  dimension.sys_period,
  dimension.metadata,
  dimension.fk_class,
  dimension.fk_measurement_unit,
  dimension.numeric_value
FROM
  information.dimension;

--
-- TOC entry 397 (class 1259 OID 24280)
-- Name: v_entity_class_map; Type: VIEW; Schema: information; Owner: -
--
CREATE VIEW information.v_entity_class_map AS
SELECT
  appellation.pk_entity,
  appellation.fk_class,
  'appellation'::text AS table_name
FROM
  information.appellation
UNION ALL
SELECT
  language.pk_entity,
  language.fk_class,
  'language'::text AS table_name
FROM
  information.language
UNION ALL
SELECT
  resource.pk_entity,
  resource.fk_class,
  'resource'::text AS table_name
FROM
  information.resource
UNION ALL
SELECT
  place.pk_entity,
  place.fk_class,
  'place'::text AS table_name
FROM
  information.place
UNION ALL
SELECT
  dimension.pk_entity,
  dimension.fk_class,
  'dimension'::text AS table_name
FROM
  information.dimension
UNION ALL
SELECT
  lang_string.pk_entity,
  lang_string.fk_class,
  'lang_string'::text AS table_name
FROM
  information.lang_string
UNION ALL
SELECT
  time_primitive.pk_entity,
  time_primitive.fk_class,
  'time_primitive'::text AS table_name
FROM
  information.time_primitive;

--
-- TOC entry 400 (class 1259 OID 24421)
-- Name: v_lang_string; Type: VIEW; Schema: information; Owner: -
--
CREATE VIEW information.v_lang_string AS
SELECT
  lang_string.pk_entity,
  lang_string.schema_name,
  lang_string.table_name,
  lang_string.notes,
  lang_string.fk_creator,
  lang_string.fk_last_modifier,
  lang_string.tmsp_creation,
  lang_string.tmsp_last_modification,
  lang_string.sys_period,
  lang_string.metadata,
  lang_string.pk_text,
  lang_string.entity_version,
  lang_string.quill_doc,
  lang_string.string,
  lang_string.fk_language,
  lang_string.fk_class
FROM
  information.lang_string;

--
-- TOC entry 306 (class 1259 OID 21481)
-- Name: v_language; Type: VIEW; Schema: information; Owner: -
--
CREATE VIEW information.v_language AS
SELECT
  language.pk_entity,
  language.schema_name,
  language.table_name,
  language.notes,
  language.fk_creator,
  language.fk_last_modifier,
  language.tmsp_creation,
  language.tmsp_last_modification,
  language.sys_period,
  language.pk_language,
  language.fk_class,
  language.lang_type,
  language.scope,
  language.iso6392b,
  language.iso6392t,
  language.iso6391
FROM
  information.language;

--
-- TOC entry 304 (class 1259 OID 21461)
-- Name: entity; Type: TABLE; Schema: projects; Owner: -
--
CREATE TABLE projects.entity(
  pk_entity integer NOT NULL,
  schema_name character varying,
  table_name character varying,
  entity_version integer,
  notes text,
  fk_creator integer,
  fk_last_modifier integer,
  tmsp_creation timestamp with time zone DEFAULT now(),
  tmsp_last_modification timestamp with time zone,
  sys_period tstzrange DEFAULT tstzrange(now(), NULL::timestamp with time zone)
);

--
-- TOC entry 307 (class 1259 OID 21485)
-- Name: class_field_config; Type: TABLE; Schema: projects; Owner: -
--
CREATE TABLE projects.class_field_config(
  fk_app_context integer,
  _deprecated_fk_project integer,
  fk_property integer,
  property_is_outgoing boolean,
  fk_class_field integer,
  fk_class_for_class_field integer,
  ord_num integer,
  fk_project integer NOT NULL,
  fk_domain_class integer,
  fk_range_class integer,
  fk_property_deprecated integer
)
INHERITS (
  projects.entity
);

--
-- TOC entry 309 (class 1259 OID 21493)
-- Name: entity; Type: TABLE; Schema: system; Owner: -
--
CREATE TABLE system.entity(
  pk_entity integer NOT NULL,
  schema_name character varying NOT NULL,
  table_name character varying NOT NULL,
  entity_version integer NOT NULL,
  notes text,
  fk_creator integer,
  fk_last_modifier integer,
  tmsp_creation timestamp with time zone DEFAULT now(),
  tmsp_last_modification timestamp with time zone,
  sys_period tstzrange DEFAULT tstzrange(now(), NULL::timestamp with time zone)
);

--
-- TOC entry 349 (class 1259 OID 21755)
-- Name: entity_pk_entity_seq; Type: SEQUENCE; Schema: system; Owner: -
--
CREATE SEQUENCE system.entity_pk_entity_seq
  AS integer START WITH 1
  INCREMENT BY 1
  NO MINVALUE
  NO MAXVALUE
  CACHE 1;

--
-- TOC entry 6479 (class 0 OID 0)
-- Dependencies: 349
-- Name: entity_pk_entity_seq; Type: SEQUENCE OWNED BY; Schema: system; Owner: -
--
ALTER SEQUENCE system.entity_pk_entity_seq OWNED BY system.entity.pk_entity;

--
-- TOC entry 310 (class 1259 OID 21500)
-- Name: class_field; Type: TABLE; Schema: system; Owner: -
--
CREATE TABLE system.class_field(
  pk_entity integer DEFAULT nextval('system.entity_pk_entity_seq'::regclass),
  schema_name character varying,
  table_name character varying,
  entity_version integer,
  notes text,
  fk_creator integer,
  fk_last_modifier integer,
  tmsp_creation timestamp with time zone DEFAULT now(),
  tmsp_last_modification timestamp with time zone,
  sys_period tstzrange DEFAULT tstzrange(now(), NULL::timestamp with time zone),
  label character varying NOT NULL,
  description text,
  used_table text,
  fk_system_type_ng_component integer
)
INHERITS (
  system.entity
);

--
-- TOC entry 311 (class 1259 OID 21508)
-- Name: v_ordered_fields_per_class; Type: VIEW; Schema: information; Owner: -
--
CREATE VIEW information.v_ordered_fields_per_class AS
SELECT
  c.pk_entity,
  c.ord_num AS field_order,
  CASE WHEN (c.property_is_outgoing = TRUE) THEN
    p.dfh_has_domain
  WHEN (c.property_is_outgoing = FALSE) THEN
    p.dfh_has_range
  ELSE
    c.fk_class_for_class_field
  END AS fk_class,
  c.fk_property,
  c.property_is_outgoing,
  c.fk_class_field,
  f.used_table
FROM ((projects.class_field_config c
  LEFT JOIN data_for_history.property p ON (p.dfh_pk_property = c.fk_property))
  LEFT JOIN system.class_field f ON (f.pk_entity = c.fk_class_field))
WHERE (c.fk_app_context = 45)
ORDER BY
  CASE WHEN (c.property_is_outgoing = TRUE) THEN
    p.dfh_has_domain
  WHEN (c.property_is_outgoing = FALSE) THEN
    p.dfh_has_range
  ELSE
    c.fk_class_for_class_field
  END,
  c.ord_num;

--
-- TOC entry 312 (class 1259 OID 21517)
-- Name: v_place; Type: VIEW; Schema: information; Owner: -
--
CREATE VIEW information.v_place AS
SELECT
  place.pk_entity,
  place.schema_name,
  place.table_name,
  place.notes,
  place.fk_creator,
  place.fk_last_modifier,
  place.tmsp_creation,
  place.tmsp_last_modification,
  place.sys_period,
  place.geo_point,
  place.fk_class,
  public.st_x((place.geo_point)::public.geometry) AS long,
  public.st_y((place.geo_point)::public.geometry) AS lat
FROM
  information.place;

--
-- TOC entry 308 (class 1259 OID 21492)
-- Name: entity_pk_entity_seq; Type: SEQUENCE; Schema: projects; Owner: -
--
CREATE SEQUENCE projects.entity_pk_entity_seq
  AS integer START WITH 1
  INCREMENT BY 1
  NO MINVALUE
  NO MAXVALUE
  CACHE 1;

--
-- TOC entry 6480 (class 0 OID 0)
-- Dependencies: 308
-- Name: entity_pk_entity_seq; Type: SEQUENCE OWNED BY; Schema: projects; Owner: -
--
ALTER SEQUENCE projects.entity_pk_entity_seq OWNED BY projects.entity.pk_entity;

--
-- TOC entry 305 (class 1259 OID 21468)
-- Name: info_proj_rel; Type: TABLE; Schema: projects; Owner: -
--
CREATE TABLE projects.info_proj_rel(
  pk_entity integer DEFAULT nextval('projects.entity_pk_entity_seq'::regclass),
  schema_name character varying NOT NULL,
  table_name character varying NOT NULL,
  entity_version integer NOT NULL,
  notes text,
  fk_creator integer,
  fk_last_modifier integer,
  tmsp_creation timestamp with time zone DEFAULT now(),
  tmsp_last_modification timestamp with time zone,
  sys_period tstzrange DEFAULT tstzrange(now(), NULL::timestamp with time zone),
  fk_entity integer NOT NULL,
  fk_entity_version integer,
  fk_entity_version_concat text,
  is_in_project boolean,
  is_standard_in_project boolean,
  calendar_backup public.calendar_type,
  ord_num_of_domain integer,
  fk_project integer NOT NULL,
  ord_num_of_range integer,
  ord_num_of_text_property integer,
  project_visibility jsonb
)
INHERITS (
  projects.entity
);

--
-- TOC entry 418 (class 1259 OID 24696)
-- Name: v_statement; Type: VIEW; Schema: information; Owner: -
--
CREATE VIEW information.v_statement AS
SELECT
  t1.pk_entity,
  t1.fk_property,
  t1.fk_property_of_property,
  t1.fk_object_info,
  t1.fk_subject_info,
  t1.fk_subject_data,
  t1.fk_subject_tables_row,
  t1.fk_subject_tables_cell,
  t1.fk_object_data,
  t1.fk_object_tables_row,
  t1.fk_object_tables_cell,
  t2.is_in_project_count,
  t2.is_standard_in_project_count,
  t1.notes,
  t1.tmsp_creation,
  t1.tmsp_last_modification,
  t1.sys_period
FROM (information.statement t1
  LEFT JOIN LATERAL (
    SELECT
      (count(info_proj_rel.pk_entity))::integer AS is_in_project_count,
(COALESCE(count(*) FILTER (WHERE (info_proj_rel.ord_num_of_domain = 0)),(0)::bigint))::integer AS is_standard_in_project_count
    FROM
      projects.info_proj_rel
    WHERE ((info_proj_rel.fk_entity = t1.pk_entity)
      AND (info_proj_rel.is_in_project = TRUE))
  GROUP BY
    info_proj_rel.fk_entity) t2 ON (TRUE));

--
-- TOC entry 313 (class 1259 OID 21534)
-- Name: v_text_property; Type: VIEW; Schema: information; Owner: -
--
CREATE VIEW information.v_text_property AS
SELECT
  text_property.pk_entity,
  text_property.schema_name,
  text_property.table_name,
  text_property.notes,
  text_property.fk_creator,
  text_property.fk_last_modifier,
  text_property.tmsp_creation,
  text_property.tmsp_last_modification,
  text_property.sys_period,
  text_property.fk_concerned_entity,
  text_property.fk_language,
  text_property.fk_class_field,
  text_property.quill_doc,
  text_property.string,
  count(epr.fk_project) AS is_in_project_count
FROM (information.text_property
  LEFT JOIN projects.info_proj_rel epr ON (((epr.fk_entity = text_property.pk_entity)
        AND (epr.is_in_project = TRUE))))
GROUP BY
  text_property.pk_entity,
  text_property.schema_name,
  text_property.table_name,
  text_property.notes,
  text_property.fk_creator,
  text_property.fk_last_modifier,
  text_property.tmsp_creation,
  text_property.tmsp_last_modification,
  text_property.sys_period,
  text_property._deprecated_text_property,
  text_property.fk_concerned_entity,
  text_property.quill_doc,
  text_property.fk_language,
  text_property.fk_class_field,
  text_property.string;

--
-- TOC entry 363 (class 1259 OID 23192)
-- Name: v_time_primitive; Type: VIEW; Schema: information; Owner: -
--
CREATE VIEW information.v_time_primitive AS
SELECT
  time_primitive.pk_entity,
  time_primitive.schema_name,
  time_primitive.table_name,
  time_primitive.notes,
  time_primitive.fk_creator,
  time_primitive.fk_last_modifier,
  time_primitive.tmsp_creation,
  time_primitive.tmsp_last_modification,
  time_primitive.sys_period,
  time_primitive.metadata,
  time_primitive.duration,
  time_primitive.fk_class,
  time_primitive.julian_day,
  time_primitive.calendar
FROM
  information.time_primitive;

--
-- TOC entry 383 (class 1259 OID 24028)
-- Name: _backup_class_field_config; Type: TABLE; Schema: projects; Owner: -
--
CREATE TABLE projects._backup_class_field_config(
  pk_entity integer NOT NULL,
  schema_name character varying,
  table_name character varying,
  entity_version integer,
  notes text,
  fk_creator integer,
  fk_last_modifier integer,
  tmsp_creation timestamp with time zone,
  tmsp_last_modification timestamp with time zone,
  sys_period tstzrange,
  fk_app_context integer,
  _deprecated_fk_project integer,
  fk_property integer,
  property_is_outgoing boolean,
  fk_class_field integer,
  fk_class_for_class_field integer,
  ord_num integer,
  fk_project integer,
  fk_domain_class integer,
  fk_range_class integer,
  fk_property_deprecated integer
);

--
-- TOC entry 381 (class 1259 OID 23977)
-- Name: analysis; Type: TABLE; Schema: projects; Owner: -
--
CREATE TABLE projects.analysis(
  fk_project integer NOT NULL,
  fk_analysis_type integer NOT NULL,
  name text,
  description text,
  analysis_definition jsonb
)
INHERITS (
  projects.entity
);

--
-- TOC entry 382 (class 1259 OID 24000)
-- Name: analysis_vt; Type: TABLE; Schema: projects; Owner: -
--
CREATE TABLE projects.analysis_vt(
  pk_entity integer NOT NULL,
  schema_name character varying,
  table_name character varying,
  entity_version integer,
  notes text,
  fk_creator integer,
  fk_last_modifier integer,
  tmsp_creation timestamp with time zone,
  tmsp_last_modification timestamp with time zone,
  sys_period tstzrange,
  fk_project integer NOT NULL,
  fk_analysis_type integer NOT NULL,
  name text,
  description text,
  analysis_definition jsonb
);

--
-- TOC entry 314 (class 1259 OID 21556)
-- Name: argument; Type: TABLE; Schema: projects; Owner: -
--
CREATE TABLE projects.argument(
  pk_entity integer DEFAULT nextval('projects.entity_pk_entity_seq'::regclass),
  schema_name character varying NOT NULL,
  table_name character varying NOT NULL,
  entity_version integer NOT NULL,
  notes text,
  fk_creator integer,
  fk_last_modifier integer,
  tmsp_creation timestamp with time zone DEFAULT now(),
  tmsp_last_modification timestamp with time zone,
  sys_period tstzrange DEFAULT tstzrange(now(), NULL::timestamp with time zone),
  fk_argument_method_type integer NOT NULL,
  is_based_on_reliability integer,
  value integer,
  fk_is_about_info_entity integer,
  fk_is_based_on_info_entity integer,
  fk_is_based_on_data_entity integer,
  fk_project integer NOT NULL
)
INHERITS (
  projects.entity
);

--
-- TOC entry 315 (class 1259 OID 21564)
-- Name: argument_vt; Type: TABLE; Schema: projects; Owner: -
--
CREATE TABLE projects.argument_vt(
  pk_entity integer NOT NULL,
  schema_name character varying NOT NULL,
  table_name character varying NOT NULL,
  entity_version integer NOT NULL,
  notes text,
  fk_creator integer,
  fk_last_modifier integer,
  tmsp_creation timestamp with time zone,
  tmsp_last_modification timestamp with time zone,
  sys_period tstzrange,
  fk_argument_method_type integer NOT NULL,
  is_based_on_reliability integer,
  value integer,
  fk_is_about_info_entity integer,
  fk_is_based_on_info_entity integer,
  fk_is_based_on_data_entity integer,
  fk_project integer NOT NULL
);

--
-- TOC entry 316 (class 1259 OID 21569)
-- Name: class_field_config_vt; Type: TABLE; Schema: projects; Owner: -
--
CREATE TABLE projects.class_field_config_vt(
  pk_entity integer NOT NULL,
  schema_name character varying,
  table_name character varying,
  entity_version integer,
  notes text,
  fk_creator integer,
  fk_last_modifier integer,
  tmsp_creation timestamp with time zone,
  tmsp_last_modification timestamp with time zone,
  sys_period tstzrange,
  fk_app_context integer,
  _deprecated_fk_project integer,
  fk_property integer,
  property_is_outgoing boolean,
  fk_class_field integer,
  fk_class_for_class_field integer,
  ord_num integer,
  fk_project integer,
  fk_domain_class integer,
  fk_range_class integer,
  fk_property_deprecated integer
);

--
-- TOC entry 317 (class 1259 OID 21574)
-- Name: dfh_class_proj_rel; Type: TABLE; Schema: projects; Owner: -
--
CREATE TABLE projects.dfh_class_proj_rel(
  pk_entity integer DEFAULT nextval('projects.entity_pk_entity_seq'::regclass),
  schema_name character varying NOT NULL,
  table_name character varying NOT NULL,
  entity_version integer NOT NULL,
  notes text,
  fk_creator integer,
  fk_last_modifier integer,
  tmsp_creation timestamp with time zone DEFAULT now(),
  tmsp_last_modification timestamp with time zone,
  sys_period tstzrange DEFAULT tstzrange(now(), NULL::timestamp with time zone),
  tmsp_last_dfh_update timestamp with time zone,
  is_enabled_in_profile boolean,
  removed_from_api boolean DEFAULT FALSE,
  _deprecated_fk_project integer,
  fk_entity_deprecated integer,
  enabled_in_entities boolean,
  fk_project integer NOT NULL,
  fk_class integer
)
INHERITS (
  projects.entity
);

--
-- TOC entry 6481 (class 0 OID 0)
-- Dependencies: 317
-- Name: TABLE dfh_class_proj_rel; Type: COMMENT; Schema: projects; Owner: -
--
COMMENT ON TABLE projects.dfh_class_proj_rel IS 'This table relates any child table of the data_for_history.entity to a project.';

--
-- TOC entry 6482 (class 0 OID 0)
-- Dependencies: 317
-- Name: COLUMN dfh_class_proj_rel.enabled_in_entities; Type: COMMENT; Schema: projects; Owner: -
--
COMMENT ON COLUMN projects.dfh_class_proj_rel.enabled_in_entities IS 'If true, the entity is (added / activated / visible) in the project, if false it is not in the project';

--
-- TOC entry 318 (class 1259 OID 21583)
-- Name: dfh_class_proj_rel_vt; Type: TABLE; Schema: projects; Owner: -
--
CREATE TABLE projects.dfh_class_proj_rel_vt(
  pk_entity integer NOT NULL,
  schema_name character varying,
  table_name character varying,
  entity_version integer,
  notes text,
  fk_creator integer,
  fk_last_modifier integer,
  tmsp_creation timestamp with time zone,
  tmsp_last_modification timestamp with time zone,
  sys_period tstzrange,
  tmsp_last_dfh_update timestamp with time zone,
  is_enabled_in_profile boolean,
  removed_from_api boolean,
  _deprecated_fk_project integer,
  fk_entity integer,
  enabled_in_entities boolean,
  fk_project integer,
  fk_class integer
);

--
-- TOC entry 384 (class 1259 OID 24052)
-- Name: dfh_profile_proj_rel; Type: TABLE; Schema: projects; Owner: -
--
CREATE TABLE projects.dfh_profile_proj_rel(
  fk_project integer NOT NULL,
  fk_profile integer NOT NULL,
  enabled boolean NOT NULL
)
INHERITS (
  projects.entity
);

--
-- TOC entry 385 (class 1259 OID 24070)
-- Name: dfh_profile_proj_rel_vt; Type: TABLE; Schema: projects; Owner: -
--
CREATE TABLE projects.dfh_profile_proj_rel_vt(
  pk_entity integer NOT NULL,
  schema_name character varying,
  table_name character varying,
  entity_version integer,
  notes text,
  fk_creator integer,
  fk_last_modifier integer,
  tmsp_creation timestamp with time zone,
  tmsp_last_modification timestamp with time zone,
  sys_period tstzrange,
  fk_project integer NOT NULL,
  fk_profile integer NOT NULL,
  enabled boolean NOT NULL
);

--
-- TOC entry 409 (class 1259 OID 24532)
-- Name: entity_label_config; Type: TABLE; Schema: projects; Owner: -
--
CREATE TABLE projects.entity_label_config(
  entity_version integer DEFAULT 1,
  fk_project integer,
  fk_class integer,
  config jsonb
)
INHERITS (
  projects.entity
);

--
-- TOC entry 410 (class 1259 OID 24546)
-- Name: entity_label_config_vt; Type: TABLE; Schema: projects; Owner: -
--
CREATE TABLE projects.entity_label_config_vt(
  pk_entity integer NOT NULL,
  schema_name character varying,
  table_name character varying,
  entity_version integer,
  notes text,
  fk_creator integer,
  fk_last_modifier integer,
  tmsp_creation timestamp with time zone,
  tmsp_last_modification timestamp with time zone,
  sys_period tstzrange,
  fk_project integer,
  fk_class integer,
  config jsonb
);

--
-- TOC entry 319 (class 1259 OID 21589)
-- Name: info_proj_rel_vt; Type: TABLE; Schema: projects; Owner: -
--
CREATE TABLE projects.info_proj_rel_vt(
  pk_entity integer NOT NULL,
  schema_name character varying NOT NULL,
  table_name character varying NOT NULL,
  entity_version integer NOT NULL,
  notes text,
  fk_creator integer,
  fk_last_modifier integer,
  tmsp_creation timestamp with time zone,
  tmsp_last_modification timestamp with time zone,
  sys_period tstzrange,
  fk_entity integer,
  fk_entity_version integer,
  fk_entity_version_concat text,
  is_in_project boolean,
  is_standard_in_project boolean,
  calendar_backup public.calendar_type,
  ord_num_of_domain integer,
  fk_project integer,
  ord_num_of_range integer,
  ord_num_of_text_property integer,
  project_visibility jsonb
);

--
-- TOC entry 320 (class 1259 OID 21595)
-- Name: language; Type: TABLE; Schema: projects; Owner: -
--
CREATE TABLE projects.language(
  pk_language character(3) NOT NULL,
  lang_type character varying,
  scope character varying,
  iso6392b character(3),
  iso6392t character(3),
  iso6391 character(3),
  notes text,
  fk_creator integer,
  fk_last_modifier integer,
  tmsp_creation timestamp with time zone DEFAULT now(),
  tmsp_last_modification timestamp with time zone,
  sys_period tstzrange DEFAULT tstzrange(now(), NULL::timestamp with time zone)
);

--
-- TOC entry 321 (class 1259 OID 21602)
-- Name: language_vt; Type: TABLE; Schema: projects; Owner: -
--
CREATE TABLE projects.language_vt(
  pk_language character(3) NOT NULL,
  lang_type character varying,
  scope character varying,
  iso6392b character(3),
  iso6392t character(3),
  iso6391 character(3),
  notes text,
  fk_creator integer,
  fk_last_modifier integer,
  tmsp_creation timestamp with time zone,
  tmsp_last_modification timestamp with time zone,
  sys_period tstzrange
);

--
-- TOC entry 322 (class 1259 OID 21607)
-- Name: project; Type: TABLE; Schema: projects; Owner: -
--
CREATE TABLE projects.project(
  pk_entity integer DEFAULT nextval('projects.entity_pk_entity_seq'::regclass),
  schema_name character varying,
  table_name character varying,
  notes text,
  fk_creator integer,
  fk_last_modifier integer,
  tmsp_creation timestamp with time zone DEFAULT now(),
  tmsp_last_modification timestamp with time zone,
  sys_period tstzrange DEFAULT tstzrange(now(), NULL::timestamp with time zone),
  fk_language integer,
  fk_cloned_from_project integer
)
INHERITS (
  projects.entity
);

--
-- TOC entry 323 (class 1259 OID 21616)
-- Name: project_vt; Type: TABLE; Schema: projects; Owner: -
--
CREATE TABLE projects.project_vt(
  pk_entity integer NOT NULL,
  schema_name character varying,
  table_name character varying,
  fk_creator integer,
  fk_last_modifier integer,
  tmsp_creation timestamp with time zone,
  tmsp_last_modification timestamp with time zone,
  notes text,
  sys_period tstzrange
);

--
-- TOC entry 368 (class 1259 OID 23724)
-- Name: property_label_deprecated; Type: TABLE; Schema: projects; Owner: -
--
CREATE TABLE projects.property_label_deprecated(
  pk_entity integer DEFAULT nextval('projects.entity_pk_entity_seq'::regclass),
  label text,
  fk_project integer,
  fk_language integer,
  fk_system_type integer,
  fk_property integer,
  fk_domain_class integer,
  fk_range_class integer
)
INHERITS (
  projects.entity
);

--
-- TOC entry 369 (class 1259 OID 23762)
-- Name: property_label_deprecated_vt; Type: TABLE; Schema: projects; Owner: -
--
CREATE TABLE projects.property_label_deprecated_vt(
  pk_entity integer NOT NULL,
  schema_name character varying,
  table_name character varying,
  entity_version integer,
  notes text,
  fk_creator integer,
  fk_last_modifier integer,
  tmsp_creation timestamp with time zone,
  tmsp_last_modification timestamp with time zone,
  sys_period tstzrange,
  label text,
  fk_project integer,
  fk_language integer,
  fk_system_type integer,
  fk_property integer,
  fk_domain_class integer,
  fk_range_class integer
);

--
-- TOC entry 324 (class 1259 OID 21621)
-- Name: query; Type: TABLE; Schema: projects; Owner: -
--
CREATE TABLE projects.query(
  name character varying,
  description character varying,
  query jsonb,
  _deprecated_fk_project integer,
  fk_project integer NOT NULL,
  fk_cloned_from_query integer
)
INHERITS (
  projects.entity
);

--
-- TOC entry 325 (class 1259 OID 21628)
-- Name: query_vt; Type: TABLE; Schema: projects; Owner: -
--
CREATE TABLE projects.query_vt(
  pk_entity integer NOT NULL,
  schema_name character varying,
  table_name character varying,
  entity_version integer,
  notes text,
  fk_creator integer,
  fk_last_modifier integer,
  tmsp_creation timestamp with time zone,
  tmsp_last_modification timestamp with time zone,
  sys_period tstzrange,
  name character varying,
  description character varying,
  query jsonb,
  _deprecated_fk_project integer,
  fk_project integer,
  fk_cloned_from_query integer
);

--
-- TOC entry 412 (class 1259 OID 24584)
-- Name: table_config; Type: TABLE; Schema: projects; Owner: -
--
CREATE TABLE projects.table_config(
  fk_project integer NOT NULL,
  account_id integer,
  fk_digital integer NOT NULL,
  config jsonb
)
INHERITS (
  projects.entity
);

--
-- TOC entry 413 (class 1259 OID 24612)
-- Name: table_config_vt; Type: TABLE; Schema: projects; Owner: -
--
CREATE TABLE projects.table_config_vt(
  pk_entity integer NOT NULL,
  schema_name character varying,
  table_name character varying,
  entity_version integer,
  notes text,
  fk_creator integer,
  fk_last_modifier integer,
  tmsp_creation timestamp with time zone,
  tmsp_last_modification timestamp with time zone,
  sys_period tstzrange,
  fk_project integer NOT NULL,
  account_id integer,
  fk_digital integer NOT NULL,
  config jsonb
);

--
-- TOC entry 326 (class 1259 OID 21633)
-- Name: text_property; Type: TABLE; Schema: projects; Owner: -
--
CREATE TABLE projects.text_property(
  pk_entity integer DEFAULT nextval('projects.entity_pk_entity_seq'::regclass),
  schema_name character varying,
  table_name character varying,
  notes text,
  fk_creator integer,
  fk_last_modifier integer,
  tmsp_creation timestamp with time zone DEFAULT now(),
  tmsp_last_modification timestamp with time zone,
  sys_period tstzrange DEFAULT tstzrange(now(), NULL::timestamp with time zone),
  pk_text integer DEFAULT nextval('commons.text_pk_text_seq'::regclass),
  quill_doc jsonb NOT NULL,
  string text NOT NULL,
  fk_system_type integer,
  fk_pro_project integer,
  fk_language integer,
  fk_project integer,
  fk_dfh_property integer,
  fk_dfh_property_domain integer,
  fk_dfh_property_range integer,
  fk_dfh_class integer,
  CONSTRAINT text_quill_doc_check CHECK (((quill_doc IS NULL) OR commons.validate_quill_doc(quill_doc)))
)
INHERITS (
  projects.entity,
  commons.text
);

--
-- TOC entry 327 (class 1259 OID 21645)
-- Name: text_property_vt; Type: TABLE; Schema: projects; Owner: -
--
CREATE TABLE projects.text_property_vt(
  pk_text integer DEFAULT nextval('commons.text_pk_text_seq'::regclass),
  schema_name character varying,
  table_name character varying,
  entity_version integer,
  quill_doc jsonb NOT NULL,
  string text DEFAULT ''::text NOT NULL,
  pk_entity integer NOT NULL,
  fk_system_type integer,
  notes text,
  fk_creator integer,
  fk_last_modifier integer,
  tmsp_creation timestamp with time zone,
  tmsp_last_modification timestamp with time zone,
  sys_period tstzrange,
  fk_language integer,
  fk_dfh_property integer,
  fk_dfh_property_domain integer,
  fk_dfh_property_range integer,
  fk_dfh_class integer,
  fk_project integer,
  fk_pro_project integer
)
INHERITS (
  commons.text_vt
);

--
-- TOC entry 419 (class 1259 OID 24703)
-- Name: v_info_proj_rel; Type: VIEW; Schema: projects; Owner: -
--
CREATE VIEW projects.v_info_proj_rel AS
SELECT
  info_proj_rel.pk_entity,
  info_proj_rel.schema_name,
  info_proj_rel.table_name,
  info_proj_rel.entity_version,
  info_proj_rel.notes,
  info_proj_rel.fk_creator,
  info_proj_rel.fk_last_modifier,
  info_proj_rel.tmsp_creation,
  info_proj_rel.tmsp_last_modification,
  info_proj_rel.sys_period,
  info_proj_rel.fk_entity,
  info_proj_rel.fk_entity_version,
  info_proj_rel.fk_entity_version_concat,
  info_proj_rel.is_in_project,
  info_proj_rel.is_standard_in_project,
  info_proj_rel.calendar_backup,
  info_proj_rel.ord_num_of_domain,
  info_proj_rel.fk_project,
  info_proj_rel.ord_num_of_range,
  info_proj_rel.ord_num_of_text_property,
  info_proj_rel.project_visibility
FROM
  projects.info_proj_rel;

--
-- TOC entry 424 (class 1259 OID 24971)
-- Name: visibility_settings; Type: TABLE; Schema: projects; Owner: -
--
CREATE TABLE projects.visibility_settings(
  fk_project integer NOT NULL,
  settings jsonb NOT NULL
)
INHERITS (
  projects.entity
);

--
-- TOC entry 425 (class 1259 OID 24991)
-- Name: visibility_settings_vt; Type: TABLE; Schema: projects; Owner: -
--
CREATE TABLE projects.visibility_settings_vt(
  pk_entity integer NOT NULL,
  schema_name character varying,
  table_name character varying,
  entity_version integer,
  notes text,
  fk_creator integer,
  fk_last_modifier integer,
  tmsp_creation timestamp with time zone,
  tmsp_last_modification timestamp with time zone,
  sys_period tstzrange,
  fk_project integer NOT NULL,
  settings jsonb NOT NULL
);

--
-- TOC entry 328 (class 1259 OID 21657)
-- Name: visual; Type: TABLE; Schema: projects; Owner: -
--
CREATE TABLE projects.visual(
  name character varying,
  description character varying,
  visual jsonb,
  _deprecated_fk_project integer,
  fk_project integer NOT NULL
)
INHERITS (
  projects.entity
);

--
-- TOC entry 329 (class 1259 OID 21664)
-- Name: visual_vt; Type: TABLE; Schema: projects; Owner: -
--
CREATE TABLE projects.visual_vt(
  pk_entity integer NOT NULL,
  schema_name character varying,
  table_name character varying,
  entity_version integer,
  notes text,
  fk_creator integer,
  fk_last_modifier integer,
  tmsp_creation timestamp with time zone,
  tmsp_last_modification timestamp with time zone,
  sys_period tstzrange,
  name character varying,
  description character varying,
  visual jsonb,
  _deprecated_fk_project integer,
  fk_project integer
);

--
-- TOC entry 330 (class 1259 OID 21669)
-- Name: accesstoken; Type: TABLE; Schema: public; Owner: -
--
CREATE TABLE public.accesstoken(
  id text NOT NULL,
  ttl integer DEFAULT 1209600,
  scopes text,
  created timestamp with time zone,
  userid integer
);

--
-- TOC entry 331 (class 1259 OID 21675)
-- Name: account; Type: TABLE; Schema: public; Owner: -
--
CREATE TABLE public.account(
  realm text,
  username text,
  email text NOT NULL,
  emailverified boolean,
  verificationtoken text,
  id integer NOT NULL
);

--
-- TOC entry 332 (class 1259 OID 21680)
-- Name: account_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--
CREATE SEQUENCE public.account_id_seq
  AS integer START WITH 1
  INCREMENT BY 1
  NO MINVALUE
  NO MAXVALUE
  CACHE 1;

--
-- TOC entry 6483 (class 0 OID 0)
-- Dependencies: 332
-- Name: account_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--
ALTER SEQUENCE public.account_id_seq OWNED BY public.account.id;

--
-- TOC entry 333 (class 1259 OID 21681)
-- Name: account_project_rel; Type: TABLE; Schema: public; Owner: -
--
CREATE TABLE public.account_project_rel(
  account_id integer NOT NULL,
  _deprecated_fk_project integer,
  role text NOT NULL,
  id integer NOT NULL,
  sys_period tstzrange DEFAULT tstzrange(now(), NULL::timestamp with time zone),
  fk_project integer NOT NULL,
  entity_version integer
);

--
-- TOC entry 334 (class 1259 OID 21687)
-- Name: account_project_rel_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--
CREATE SEQUENCE public.account_project_rel_id_seq
  AS integer START WITH 1
  INCREMENT BY 1
  NO MINVALUE
  NO MAXVALUE
  CACHE 1;

--
-- TOC entry 6484 (class 0 OID 0)
-- Dependencies: 334
-- Name: account_project_rel_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--
ALTER SEQUENCE public.account_project_rel_id_seq OWNED BY public.account_project_rel.id;

--
-- TOC entry 335 (class 1259 OID 21688)
-- Name: account_project_rel_vt; Type: TABLE; Schema: public; Owner: -
--
CREATE TABLE public.account_project_rel_vt(
  account_id integer NOT NULL,
  _deprecated_fk_project integer,
  role text NOT NULL,
  id integer NOT NULL,
  sys_period tstzrange,
  fk_project integer,
  entity_version integer
);

--
-- TOC entry 336 (class 1259 OID 21693)
-- Name: acl; Type: TABLE; Schema: public; Owner: -
--
CREATE TABLE public.acl(
  model text,
  property text,
  accesstype text,
  permission text,
  principaltype text,
  principalid text,
  id integer NOT NULL
);

--
-- TOC entry 337 (class 1259 OID 21698)
-- Name: acl_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--
CREATE SEQUENCE public.acl_id_seq
  AS integer START WITH 1
  INCREMENT BY 1
  NO MINVALUE
  NO MAXVALUE
  CACHE 1;

--
-- TOC entry 6485 (class 0 OID 0)
-- Dependencies: 337
-- Name: acl_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--
ALTER SEQUENCE public.acl_id_seq OWNED BY public.acl.id;

--
-- TOC entry 405 (class 1259 OID 24477)
-- Name: credential; Type: TABLE; Schema: public; Owner: -
--
CREATE TABLE public.credential(
  id integer NOT NULL,
  accountid integer NOT NULL,
  password text NOT NULL
);

--
-- TOC entry 404 (class 1259 OID 24476)
-- Name: credential_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--
CREATE SEQUENCE public.credential_id_seq
  AS integer START WITH 1
  INCREMENT BY 1
  NO MINVALUE
  NO MAXVALUE
  CACHE 1;

--
-- TOC entry 6486 (class 0 OID 0)
-- Dependencies: 404
-- Name: credential_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--
ALTER SEQUENCE public.credential_id_seq OWNED BY public.credential.id;

--
-- TOC entry 338 (class 1259 OID 21699)
-- Name: role; Type: TABLE; Schema: public; Owner: -
--
CREATE TABLE public.role(
  id integer NOT NULL,
  name text NOT NULL,
  description text,
  created timestamp with time zone,
  modified timestamp with time zone
);

--
-- TOC entry 339 (class 1259 OID 21704)
-- Name: role_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--
CREATE SEQUENCE public.role_id_seq
  AS integer START WITH 1
  INCREMENT BY 1
  NO MINVALUE
  NO MAXVALUE
  CACHE 1;

--
-- TOC entry 6487 (class 0 OID 0)
-- Dependencies: 339
-- Name: role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--
ALTER SEQUENCE public.role_id_seq OWNED BY public.role.id;

--
-- TOC entry 340 (class 1259 OID 21705)
-- Name: rolemapping; Type: TABLE; Schema: public; Owner: -
--
CREATE TABLE public.rolemapping(
  id integer NOT NULL,
  principaltype text,
  principalid text,
  roleid integer
);

--
-- TOC entry 341 (class 1259 OID 21710)
-- Name: rolemapping_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--
CREATE SEQUENCE public.rolemapping_id_seq
  AS integer START WITH 1
  INCREMENT BY 1
  NO MINVALUE
  NO MAXVALUE
  CACHE 1;

--
-- TOC entry 6488 (class 0 OID 0)
-- Dependencies: 341
-- Name: rolemapping_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--
ALTER SEQUENCE public.rolemapping_id_seq OWNED BY public.rolemapping.id;

--
-- TOC entry 379 (class 1259 OID 23956)
-- Name: analysis_type_deprecated; Type: TABLE; Schema: system; Owner: -
--
CREATE TABLE system.analysis_type_deprecated(
  standard_label text,
  rows_limit integer
)
INHERITS (
  system.entity
);

--
-- TOC entry 380 (class 1259 OID 23969)
-- Name: analysis_type_vt_deprecated; Type: TABLE; Schema: system; Owner: -
--
CREATE TABLE system.analysis_type_vt_deprecated(
  pk_entity integer NOT NULL,
  schema_name character varying NOT NULL,
  table_name character varying NOT NULL,
  entity_version integer NOT NULL,
  notes text,
  fk_creator integer,
  fk_last_modifier integer,
  tmsp_creation timestamp with time zone,
  tmsp_last_modification timestamp with time zone,
  sys_period tstzrange,
  standard_label text,
  rows_limit integer
);

--
-- TOC entry 342 (class 1259 OID 21711)
-- Name: app_context; Type: TABLE; Schema: system; Owner: -
--
CREATE TABLE system.app_context(
  pk_entity integer DEFAULT nextval('system.entity_pk_entity_seq'::regclass),
  schema_name character varying,
  table_name character varying,
  entity_version integer,
  notes text,
  fk_creator integer,
  fk_last_modifier integer,
  tmsp_creation timestamp with time zone DEFAULT now(),
  tmsp_last_modification timestamp with time zone,
  sys_period tstzrange DEFAULT tstzrange(now(), NULL::timestamp with time zone),
  label character varying NOT NULL,
  description text
)
INHERITS (
  system.entity
);

--
-- TOC entry 343 (class 1259 OID 21719)
-- Name: app_context_vt; Type: TABLE; Schema: system; Owner: -
--
CREATE TABLE system.app_context_vt(
  pk_entity integer NOT NULL,
  schema_name character varying,
  table_name character varying,
  entity_version integer,
  notes text,
  fk_creator integer,
  fk_last_modifier integer,
  tmsp_creation timestamp with time zone,
  tmsp_last_modification timestamp with time zone,
  sys_period tstzrange,
  label character varying NOT NULL,
  description text
);

--
-- TOC entry 344 (class 1259 OID 21724)
-- Name: class_field_property_rel; Type: TABLE; Schema: system; Owner: -
--
CREATE TABLE system.class_field_property_rel(
  pk_entity integer DEFAULT nextval('system.entity_pk_entity_seq'::regclass),
  schema_name character varying,
  table_name character varying,
  entity_version integer,
  notes text,
  fk_creator integer,
  fk_last_modifier integer,
  tmsp_creation timestamp with time zone DEFAULT now(),
  tmsp_last_modification timestamp with time zone,
  sys_period tstzrange DEFAULT tstzrange(now(), NULL::timestamp with time zone),
  fk_class_field integer,
  fk_property integer,
  property_is_outgoing boolean,
  ord_num integer
)
INHERITS (
  system.entity
);

--
-- TOC entry 6489 (class 0 OID 0)
-- Dependencies: 344
-- Name: TABLE class_field_property_rel; Type: COMMENT; Schema: system; Owner: -
--
COMMENT ON TABLE system.class_field_property_rel IS 'This table stores, what properties are bundled in the property set';

--
-- TOC entry 6490 (class 0 OID 0)
-- Dependencies: 344
-- Name: COLUMN class_field_property_rel.fk_class_field; Type: COMMENT; Schema: system; Owner: -
--
COMMENT ON COLUMN system.class_field_property_rel.fk_class_field IS 'The property set';

--
-- TOC entry 6491 (class 0 OID 0)
-- Dependencies: 344
-- Name: COLUMN class_field_property_rel.fk_property; Type: COMMENT; Schema: system; Owner: -
--
COMMENT ON COLUMN system.class_field_property_rel.fk_property IS 'The property belonging to the property set';

--
-- TOC entry 6492 (class 0 OID 0)
-- Dependencies: 344
-- Name: COLUMN class_field_property_rel.property_is_outgoing; Type: COMMENT; Schema: system; Owner: -
--
COMMENT ON COLUMN system.class_field_property_rel.property_is_outgoing IS 'Wether the property is outgoing, seen from the class that will use it';

--
-- TOC entry 6493 (class 0 OID 0)
-- Dependencies: 344
-- Name: COLUMN class_field_property_rel.ord_num; Type: COMMENT; Schema: system; Owner: -
--
COMMENT ON COLUMN system.class_field_property_rel.ord_num IS 'The order number of the property within the property set.';

--
-- TOC entry 345 (class 1259 OID 21732)
-- Name: class_field_property_rel_vt; Type: TABLE; Schema: system; Owner: -
--
CREATE TABLE system.class_field_property_rel_vt(
  pk_entity integer NOT NULL,
  schema_name character varying,
  table_name character varying,
  entity_version integer,
  notes text,
  fk_creator integer,
  fk_last_modifier integer,
  tmsp_creation timestamp with time zone,
  tmsp_last_modification timestamp with time zone,
  sys_period tstzrange,
  fk_class_field integer,
  fk_property integer,
  property_is_outgoing boolean,
  ord_num integer
);

--
-- TOC entry 346 (class 1259 OID 21737)
-- Name: class_field_vt; Type: TABLE; Schema: system; Owner: -
--
CREATE TABLE system.class_field_vt(
  pk_entity integer NOT NULL,
  schema_name character varying,
  table_name character varying,
  entity_version integer,
  notes text,
  fk_creator integer,
  fk_last_modifier integer,
  tmsp_creation timestamp with time zone,
  tmsp_last_modification timestamp with time zone,
  sys_period tstzrange,
  label character varying NOT NULL,
  description text,
  used_table text,
  fk_system_type_ng_component integer
);

--
-- TOC entry 347 (class 1259 OID 21742)
-- Name: class_has_type_property; Type: TABLE; Schema: system; Owner: -
--
CREATE TABLE system.class_has_type_property(
  pk_entity integer DEFAULT nextval('system.entity_pk_entity_seq'::regclass),
  schema_name character varying,
  table_name character varying,
  entity_version integer,
  notes text,
  fk_creator integer,
  fk_last_modifier integer,
  tmsp_creation timestamp with time zone DEFAULT now(),
  tmsp_last_modification timestamp with time zone,
  sys_period tstzrange DEFAULT tstzrange(now(), NULL::timestamp with time zone),
  fk_class integer,
  fk_property integer
)
INHERITS (
  system.entity
);

--
-- TOC entry 348 (class 1259 OID 21750)
-- Name: class_has_type_property_vt; Type: TABLE; Schema: system; Owner: -
--
CREATE TABLE system.class_has_type_property_vt(
  pk_entity integer NOT NULL,
  schema_name character varying,
  table_name character varying,
  entity_version integer,
  notes text,
  fk_creator integer,
  fk_last_modifier integer,
  tmsp_creation timestamp with time zone,
  tmsp_last_modification timestamp with time zone,
  sys_period tstzrange,
  fk_class integer,
  fk_property integer
);

--
-- TOC entry 406 (class 1259 OID 24491)
-- Name: config; Type: TABLE; Schema: system; Owner: -
--
CREATE TABLE system.config(
  entity_version integer DEFAULT 1,
  key character varying,
  config jsonb
)
INHERITS (
  system.entity
);

--
-- TOC entry 407 (class 1259 OID 24505)
-- Name: config_vt; Type: TABLE; Schema: system; Owner: -
--
CREATE TABLE system.config_vt(
  pk_entity integer NOT NULL,
  schema_name character varying NOT NULL,
  table_name character varying NOT NULL,
  entity_version integer NOT NULL,
  notes text,
  fk_creator integer,
  fk_last_modifier integer,
  tmsp_creation timestamp with time zone,
  tmsp_last_modification timestamp with time zone,
  sys_period tstzrange,
  key character varying,
  config jsonb
);

--
-- TOC entry 350 (class 1259 OID 21756)
-- Name: system_relevant_class; Type: TABLE; Schema: system; Owner: -
--
CREATE TABLE system.system_relevant_class(
  fk_class integer NOT NULL,
  required_by_entities boolean,
  required_by_sources boolean,
  required_by_basics boolean,
  excluded_from_entities boolean
)
INHERITS (
  system.entity
);

--
-- TOC entry 351 (class 1259 OID 21763)
-- Name: system_relevant_class_vt; Type: TABLE; Schema: system; Owner: -
--
CREATE TABLE system.system_relevant_class_vt(
  pk_entity integer NOT NULL,
  schema_name character varying NOT NULL,
  table_name character varying NOT NULL,
  entity_version integer NOT NULL,
  notes text,
  fk_creator integer,
  fk_last_modifier integer,
  tmsp_creation timestamp with time zone,
  tmsp_last_modification timestamp with time zone,
  sys_period tstzrange,
  fk_class integer NOT NULL,
  required_by_entities boolean,
  required_by_sources boolean,
  required_by_basics boolean,
  excluded_from_entities boolean
);

--
-- TOC entry 352 (class 1259 OID 21768)
-- Name: system_relevant_type; Type: TABLE; Schema: system; Owner: -
--
CREATE TABLE system.system_relevant_type(
  fk_type integer NOT NULL
)
INHERITS (
  system.entity
);

--
-- TOC entry 353 (class 1259 OID 21775)
-- Name: system_relevant_type_vt; Type: TABLE; Schema: system; Owner: -
--
CREATE TABLE system.system_relevant_type_vt(
  pk_entity integer NOT NULL,
  schema_name character varying NOT NULL,
  table_name character varying NOT NULL,
  entity_version integer NOT NULL,
  notes text,
  fk_creator integer,
  fk_last_modifier integer,
  tmsp_creation timestamp with time zone,
  tmsp_last_modification timestamp with time zone,
  sys_period tstzrange,
  fk_type integer NOT NULL
);

--
-- TOC entry 354 (class 1259 OID 21780)
-- Name: system_type; Type: TABLE; Schema: system; Owner: -
--
CREATE TABLE system.system_type(
  pk_entity integer DEFAULT nextval('system.entity_pk_entity_seq'::regclass),
  schema_name character varying,
  table_name character varying,
  entity_version integer,
  notes text,
  fk_creator integer,
  fk_last_modifier integer,
  tmsp_creation timestamp with time zone DEFAULT now(),
  tmsp_last_modification timestamp with time zone,
  sys_period tstzrange DEFAULT tstzrange(now(), NULL::timestamp with time zone),
  st_schema_name character varying,
  st_table_name character varying,
  definition text,
  st_column_name text,
  st_group text
)
INHERITS (
  system.entity
);

--
-- TOC entry 355 (class 1259 OID 21788)
-- Name: system_type_vt; Type: TABLE; Schema: system; Owner: -
--
CREATE TABLE system.system_type_vt(
  pk_entity integer NOT NULL,
  schema_name character varying,
  table_name character varying,
  st_schema_name character varying,
  st_table_name character varying,
  notes text,
  fk_creator integer,
  fk_last_modifier integer,
  tmsp_creation timestamp with time zone,
  tmsp_last_modification timestamp with time zone,
  sys_period tstzrange,
  definition text,
  st_column_name text,
  st_group text,
  entity_version integer
);

--
-- TOC entry 365 (class 1259 OID 23690)
-- Name: v_auto_add_properties; Type: VIEW; Schema: system; Owner: -
--
CREATE VIEW system.v_auto_add_properties AS
SELECT
  p.dfh_has_domain AS fk_class,
  p.fk_property AS dfh_pk_property,
  p.dfh_range_instances_max_quantifier AS max_quantifier
FROM (data_for_history.v_property_deprecated p
  JOIN projects.class_field_config ctxt ON (p.fk_property = ctxt.fk_property))
WHERE ((ctxt.fk_app_context = 45)
  AND (ctxt.ord_num IS NOT NULL)
  AND (ctxt.property_is_outgoing = TRUE))
UNION
SELECT
  p.dfh_has_range AS fk_class,
  p.fk_property AS dfh_pk_property,
  p.dfh_domain_instances_max_quantifier AS max_quantifier
FROM (data_for_history.v_property_deprecated p
  JOIN projects.class_field_config ctxt ON (p.fk_property = ctxt.fk_property))
WHERE ((ctxt.fk_app_context = 45)
  AND (ctxt.ord_num IS NOT NULL)
  AND (ctxt.property_is_outgoing = FALSE))
UNION
SELECT
  ctxt.fk_class_for_class_field AS fk_class,
  psprel.fk_property AS dfh_pk_property,
  p.dfh_domain_instances_max_quantifier AS max_quantifier
FROM ((data_for_history.v_property_deprecated p
    JOIN system.class_field_property_rel psprel ON (psprel.fk_property = p.fk_property))
  JOIN projects.class_field_config ctxt ON (psprel.fk_class_field = ctxt.fk_class_field))
WHERE ((ctxt.fk_app_context = 45)
  AND (ctxt.ord_num IS NOT NULL)
  AND (psprel.property_is_outgoing = FALSE))
UNION
SELECT
  ctxt.fk_class_for_class_field AS fk_class,
  psprel.fk_property AS dfh_pk_property,
  p.dfh_range_instances_max_quantifier AS max_quantifier
FROM ((data_for_history.v_property_deprecated p
    JOIN system.class_field_property_rel psprel ON (psprel.fk_property = p.fk_property))
  JOIN projects.class_field_config ctxt ON (psprel.fk_class_field = ctxt.fk_class_field))
WHERE ((ctxt.fk_app_context = 45)
  AND (ctxt.ord_num IS NOT NULL)
  AND (psprel.property_is_outgoing = TRUE));

--
-- TOC entry 373 (class 1259 OID 23813)
-- Name: cell_pk_cell_seq; Type: SEQUENCE; Schema: tables; Owner: -
--
CREATE SEQUENCE tables.cell_pk_cell_seq
  START WITH 1
  INCREMENT BY 1
  NO MINVALUE
  NO MAXVALUE
  CACHE 1;

--
-- TOC entry 371 (class 1259 OID 23798)
-- Name: cell; Type: TABLE; Schema: tables; Owner: -
--
CREATE TABLE tables.cell(
  pk_cell bigint DEFAULT nextval('tables.cell_pk_cell_seq'::regclass) NOT NULL,
  fk_column integer NOT NULL,
  fk_row bigint NOT NULL,
  fk_digital integer NOT NULL,
  numeric_value numeric,
  string_value text,
  entity_version integer NOT NULL,
  notes text,
  fk_namespace integer,
  fk_creator integer,
  fk_last_modifier integer,
  tmsp_creation timestamp with time zone DEFAULT now(),
  tmsp_last_modification timestamp with time zone,
  sys_period tstzrange DEFAULT tstzrange(now(), NULL::timestamp with time zone),
  metadata jsonb,
  id_for_import integer,
  id_for_import_txt text,
  fk_publication_status integer,
  fk_license integer,
  fk_class integer DEFAULT 521 NOT NULL
);

--
-- TOC entry 372 (class 1259 OID 23807)
-- Name: cell_vt; Type: TABLE; Schema: tables; Owner: -
--
CREATE TABLE tables.cell_vt(
  pk_cell bigint NOT NULL,
  fk_column integer NOT NULL,
  fk_row bigint NOT NULL,
  fk_digital integer NOT NULL,
  numeric_value numeric,
  string_value text,
  entity_version integer NOT NULL,
  notes text,
  fk_namespace integer,
  fk_creator integer,
  fk_last_modifier integer,
  tmsp_creation timestamp with time zone,
  tmsp_last_modification timestamp with time zone,
  sys_period tstzrange,
  metadata jsonb,
  id_for_import integer,
  id_for_import_txt text,
  fk_publication_status integer,
  fk_license integer,
  fk_class integer
);

--
-- TOC entry 374 (class 1259 OID 23815)
-- Name: quill_doc_cell; Type: TABLE; Schema: tables; Owner: -
--
CREATE TABLE tables.quill_doc_cell()
INHERITS (
  tables.cell,
  commons.text
);

--
-- TOC entry 375 (class 1259 OID 23842)
-- Name: quill_doc_cell_vt; Type: TABLE; Schema: tables; Owner: -
--
CREATE TABLE tables.quill_doc_cell_vt()
INHERITS (
  tables.cell_vt,
  commons.text_vt
);

--
-- TOC entry 370 (class 1259 OID 23790)
-- Name: row_pk_row_seq; Type: SEQUENCE; Schema: tables; Owner: -
--
CREATE SEQUENCE tables.row_pk_row_seq
  START WITH 1
  INCREMENT BY 1
  NO MINVALUE
  NO MAXVALUE
  CACHE 1;

--
-- TOC entry 414 (class 1259 OID 24621)
-- Name: row; Type: TABLE; Schema: tables; Owner: -
--
CREATE TABLE tables."row"(
  pk_row bigint DEFAULT nextval('tables.row_pk_row_seq'::regclass) NOT NULL,
  fk_digital integer NOT NULL,
  "position" numeric NOT NULL,
  entity_version integer NOT NULL,
  fk_publication_status integer,
  fk_license integer,
  fk_namespace integer,
  notes text,
  fk_creator integer,
  fk_last_modifier integer,
  tmsp_creation timestamp with time zone DEFAULT now(),
  tmsp_last_modification timestamp with time zone,
  sys_period tstzrange DEFAULT tstzrange(now(), NULL::timestamp with time zone),
  metadata jsonb,
  id_for_import integer,
  id_for_import_txt text
);

--
-- TOC entry 415 (class 1259 OID 24636)
-- Name: row_vt; Type: TABLE; Schema: tables; Owner: -
--
CREATE TABLE tables.row_vt(
  pk_row bigint NOT NULL,
  fk_digital integer NOT NULL,
  "position" numeric NOT NULL,
  entity_version integer NOT NULL,
  fk_publication_status integer,
  fk_license integer,
  fk_namespace integer,
  notes text,
  fk_creator integer,
  fk_last_modifier integer,
  tmsp_creation timestamp with time zone,
  tmsp_last_modification timestamp with time zone,
  sys_period tstzrange,
  metadata jsonb,
  id_for_import integer,
  id_for_import_txt text
);

--
-- TOC entry 408 (class 1259 OID 24523)
-- Name: class_preview; Type: TABLE; Schema: war; Owner: -
--
CREATE TABLE war.class_preview(
  fk_class integer NOT NULL,
  fk_project integer NOT NULL,
  label text,
  tmsp_last_modification timestamp with time zone
);

--
-- TOC entry 394 (class 1259 OID 24181)
-- Name: entity_preview; Type: TABLE; Schema: war; Owner: -
--
CREATE TABLE war.entity_preview(
  pk_entity integer,
  fk_project integer,
  project integer DEFAULT 0 NOT NULL,
  entity_type text,
  fk_class integer,
  class_label character varying,
  entity_label text,
  full_text text,
  ts_vector tsvector,
  type_label text,
  fk_type integer,
  time_span jsonb,
  first_second bigint,
  last_second bigint,
  tmsp_last_modification timestamp with time zone,
  key character varying
);

--
-- TOC entry 423 (class 1259 OID 24953)
-- Name: entity_preview_template; Type: TABLE; Schema: war; Owner: -
--
CREATE TABLE war.entity_preview_template(
  pk_entity integer NOT NULL,
  fk_project integer,
  project integer DEFAULT 0 NOT NULL,
  entity_type text,
  fk_class integer,
  class_label character varying,
  entity_label text,
  full_text text,
  ts_vector tsvector,
  type_label text,
  fk_type integer,
  time_span jsonb,
  first_second bigint,
  last_second bigint,
  tmsp_last_modification timestamp with time zone,
  key character varying NOT NULL,
  entity_id character varying NOT NULL,
  parent_classes jsonb NOT NULL,
  ancestor_classes jsonb NOT NULL,
  project_id integer NOT NULL,
  type_id character varying
)
PARTITION BY LIST (project_id);

--
-- TOC entry 421 (class 1259 OID 24922)
-- Name: field_change_template; Type: TABLE; Schema: war; Owner: -
--
CREATE TABLE war.field_change_template(
  fk_project integer NOT NULL,
  fk_source_info integer NOT NULL,
  fk_source_tables_cell bigint NOT NULL,
  fk_property integer NOT NULL,
  fk_property_of_property integer NOT NULL,
  is_outgoing boolean NOT NULL,
  tmsp_last_modification timestamp with time zone NOT NULL
);

--
-- TOC entry 411 (class 1259 OID 24563)
-- Name: statement_backup; Type: TABLE; Schema: war; Owner: -
--
CREATE TABLE war.statement_backup(
  pk_entity integer NOT NULL,
  fk_project integer,
  project integer DEFAULT 0 NOT NULL,
  fk_property integer,
  fk_object_info integer,
  fk_subject_info integer,
  ord_num_of_domain integer,
  ord_num_of_range integer,
  is_in_project_count integer,
  object_info_value jsonb
);

--
-- TOC entry 422 (class 1259 OID 24929)
-- Name: statement_template; Type: TABLE; Schema: war; Owner: -
--
CREATE TABLE war.statement_template(
  pk_entity integer NOT NULL,
  project integer DEFAULT 0 NOT NULL,
  fk_project integer,
  fk_property integer,
  fk_object_info integer,
  fk_subject_info integer,
  ord_num_of_domain integer,
  ord_num_of_range integer,
  is_in_project_count integer,
  object_info_value jsonb
);

--
-- TOC entry 395 (class 1259 OID 24191)
-- Name: v_class_preview; Type: VIEW; Schema: war; Owner: -
--
CREATE VIEW war.v_class_preview AS
WITH tw0 AS (
  SELECT
    project.pk_entity,
    project.fk_language
  FROM
    projects.project
  UNION ALL
  SELECT
    NULL::integer AS int4,
    18889
),
tw1 AS (
  SELECT
    t2.fk_dfh_class AS fk_class,
    t1.pk_entity AS fk_project,
    t2.string AS label,
    1 AS rank,
    'project label'::text AS text
  FROM
    tw0 t1,
    projects.text_property t2
  WHERE ((t1.pk_entity = t2.fk_project)
    AND (t2.fk_dfh_class IS NOT NULL)
    AND (t2.fk_language = t1.fk_language))
UNION ALL
SELECT
  t2.fk_dfh_class AS fk_class,
  t1.pk_entity AS fk_project,
  t2.string AS label,
  2 AS rank,
  'default project label in default lang'::text AS text
FROM
  tw0 t1,
  projects.text_property t2
  WHERE ((375669 = t2.fk_project)
    AND (t2.fk_dfh_class IS NOT NULL)
    AND (t2.fk_language = t1.fk_language))
UNION ALL
SELECT
  t3.fk_class,
  t1.pk_entity AS fk_project,
  t3.label,
  3 AS rank,
  'ontome label in default lang'::text AS text
FROM
  tw0 t1,
  information.language t2,
  data_for_history.v_label t3
  WHERE ((t3.fk_class IS NOT NULL)
    AND (t1.fk_language = t2.pk_entity)
    AND ((t3.language)::bpchar = t2.iso6391)
    AND (t3.type = 'label'::text))
UNION ALL
SELECT
  t2.fk_dfh_class AS fk_class,
  t1.pk_entity AS fk_project,
  t2.string AS label,
  4 AS rank,
  'default project label in en'::text AS text
FROM
  tw0 t1,
  projects.text_property t2
  WHERE ((375669 = t2.fk_project)
    AND (t2.fk_dfh_class IS NOT NULL)
    AND (t2.fk_language = 18889))
UNION ALL
SELECT
  t3.fk_class,
  t1.pk_entity AS fk_project,
  t3.label,
  5 AS rank,
  'ontome label in en'::text AS text
FROM
  tw0 t1,
  data_for_history.v_label t3
  WHERE ((t3.fk_class IS NOT NULL)
    AND ((t3.language)::text = 'en'::text)
    AND (t3.type = 'label'::text)))
SELECT DISTINCT ON (tw1.fk_project, tw1.fk_class)
  tw1.fk_class,
  tw1.fk_project,
  tw1.label
FROM
  tw1
ORDER BY
  tw1.fk_project,
  tw1.fk_class,
  tw1.rank;

--
-- TOC entry 396 (class 1259 OID 24274)
-- Name: v_property_preview; Type: VIEW; Schema: war; Owner: -
--
CREATE VIEW war.v_property_preview AS
WITH tw0 AS (
  SELECT
    project.pk_entity,
    project.fk_language
  FROM
    projects.project
  UNION ALL
  SELECT
    NULL::integer AS int4,
    18889
),
tw1 AS (
  SELECT
    t2.fk_dfh_property AS fk_property,
    t1.pk_entity AS fk_project,
    t2.string AS label,
    1 AS rank,
    'project label'::text AS text
  FROM
    tw0 t1,
    projects.text_property t2
  WHERE ((t1.pk_entity = t2.fk_project)
    AND (t2.fk_dfh_property IS NOT NULL)
    AND (t2.fk_language = t1.fk_language))
UNION ALL
SELECT
  t2.fk_dfh_property AS fk_property,
  t1.pk_entity AS fk_project,
  t2.string AS label,
  2 AS rank,
  'default project label in default lang'::text AS text
FROM
  tw0 t1,
  projects.text_property t2
  WHERE ((375669 = t2.fk_project)
    AND (t2.fk_dfh_property IS NOT NULL)
    AND (t2.fk_language = t1.fk_language))
UNION ALL
SELECT
  t3.fk_property,
  t1.pk_entity AS fk_project,
  t3.label,
  3 AS rank,
  'ontome label in default lang'::text AS text
FROM
  tw0 t1,
  information.language t2,
  data_for_history.v_label t3
  WHERE ((t3.fk_property IS NOT NULL)
    AND ((t3.language)::bpchar = t2.iso6391)
    AND (t3.type = 'label'::text))
UNION ALL
SELECT
  t2.fk_dfh_property AS fk_property,
  t1.pk_entity AS fk_project,
  t2.string AS label,
  4 AS rank,
  'default project label in en'::text AS text
FROM
  tw0 t1,
  projects.text_property t2
  WHERE ((375669 = t2.fk_project)
    AND (t2.fk_dfh_property IS NOT NULL)
    AND (t2.fk_language = 18889))
UNION ALL
SELECT
  t3.fk_property,
  t1.pk_entity AS fk_project,
  t3.label,
  3 AS rank,
  'ontome label in en'::text AS text
FROM
  tw0 t1,
  data_for_history.v_label t3
  WHERE ((t3.fk_property IS NOT NULL)
    AND ((t3.language)::text = 'en'::text)
    AND (t3.type = 'label'::text)))
SELECT DISTINCT ON (tw1.fk_project, tw1.fk_property)
  tw1.fk_property,
  tw1.fk_project,
  tw1.label
FROM
  tw1
ORDER BY
  tw1.fk_project,
  tw1.fk_property,
  tw1.rank;

--
-- TOC entry 403 (class 1259 OID 24465)
-- Name: vm_statement; Type: MATERIALIZED VIEW; Schema: war; Owner: -
--
CREATE MATERIALIZED VIEW war.vm_statement AS
WITH tw1 AS (
  SELECT
    t1.pk_entity,
    t1.fk_property,
    t1.fk_object_info,
    t1.fk_subject_info,
    t2.is_in_project_count,
    t1.notes,
    t1.tmsp_creation,
    t1.tmsp_last_modification,
    t1.sys_period
  FROM (information.statement t1
    LEFT JOIN LATERAL (
      SELECT
        (count(info_proj_rel.pk_entity))::integer AS is_in_project_count
      FROM
        projects.info_proj_rel
      WHERE ((info_proj_rel.fk_entity = t1.pk_entity)
        AND (info_proj_rel.is_in_project = TRUE))
    GROUP BY
      info_proj_rel.fk_entity) t2 ON (TRUE)))
SELECT
  t1.pk_entity,
  t1.fk_object_info,
  t1.fk_subject_info,
  t1.fk_property,
  t2.fk_project,
  COALESCE(t2.fk_project, 0) AS project,
  t2.ord_num_of_domain,
  t2.ord_num_of_range,
  t1.is_in_project_count
FROM
  tw1 t1,
  projects.info_proj_rel t2
WHERE ((t2.fk_entity = t1.pk_entity)
  AND (t2.is_in_project = TRUE))
UNION
SELECT
  t1.pk_entity,
  t1.fk_object_info,
  t1.fk_subject_info,
  t1.fk_property,
  NULL::integer AS fk_project,
  0 AS project,
  NULL::integer AS ord_num_of_domain,
  NULL::integer AS ord_num_of_range,
  t1.is_in_project_count
FROM
  tw1 t1
WHERE (t1.is_in_project_count > 0
)
WITH NO DATA;

--
-- TOC entry 5023 (class 2604 OID 21863)
-- Name: text pk_text; Type: DEFAULT; Schema: commons; Owner: -
--
ALTER TABLE ONLY commons.text
  ALTER COLUMN pk_text SET DEFAULT nextval('commons.text_pk_text_seq'::regclass);

--
-- TOC entry 5027 (class 2604 OID 23441)
-- Name: avatar pk_entity; Type: DEFAULT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.avatar
  ALTER COLUMN pk_entity SET DEFAULT nextval('data.entity_pk_entity_seq'::regclass);

--
-- TOC entry 5028 (class 2604 OID 21865)
-- Name: avatar tmsp_creation; Type: DEFAULT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.avatar
  ALTER COLUMN tmsp_creation SET DEFAULT now();

--
-- TOC entry 5029 (class 2604 OID 21866)
-- Name: avatar sys_period; Type: DEFAULT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.avatar
  ALTER COLUMN sys_period SET DEFAULT tstzrange(now(), NULL::timestamp with time zone);

--
-- TOC entry 5030 (class 2604 OID 23443)
-- Name: chunk pk_entity; Type: DEFAULT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.chunk
  ALTER COLUMN pk_entity SET DEFAULT nextval('data.entity_pk_entity_seq'::regclass);

--
-- TOC entry 5031 (class 2604 OID 21871)
-- Name: chunk tmsp_creation; Type: DEFAULT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.chunk
  ALTER COLUMN tmsp_creation SET DEFAULT now();

--
-- TOC entry 5032 (class 2604 OID 21872)
-- Name: chunk sys_period; Type: DEFAULT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.chunk
  ALTER COLUMN sys_period SET DEFAULT tstzrange(now(), NULL::timestamp with time zone);

--
-- TOC entry 5036 (class 2604 OID 23444)
-- Name: class_column_mapping pk_entity; Type: DEFAULT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.class_column_mapping
  ALTER COLUMN pk_entity SET DEFAULT nextval('data.entity_pk_entity_seq'::regclass);

--
-- TOC entry 5037 (class 2604 OID 21874)
-- Name: class_column_mapping tmsp_creation; Type: DEFAULT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.class_column_mapping
  ALTER COLUMN tmsp_creation SET DEFAULT now();

--
-- TOC entry 5038 (class 2604 OID 21875)
-- Name: class_column_mapping sys_period; Type: DEFAULT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.class_column_mapping
  ALTER COLUMN sys_period SET DEFAULT tstzrange(now(), NULL::timestamp with time zone);

--
-- TOC entry 5039 (class 2604 OID 23445)
-- Name: column pk_entity; Type: DEFAULT; Schema: data; Owner: -
--
ALTER TABLE ONLY data."column"
  ALTER COLUMN pk_entity SET DEFAULT nextval('data.entity_pk_entity_seq'::regclass);

--
-- TOC entry 5040 (class 2604 OID 21877)
-- Name: column tmsp_creation; Type: DEFAULT; Schema: data; Owner: -
--
ALTER TABLE ONLY data."column"
  ALTER COLUMN tmsp_creation SET DEFAULT now();

--
-- TOC entry 5041 (class 2604 OID 21878)
-- Name: column sys_period; Type: DEFAULT; Schema: data; Owner: -
--
ALTER TABLE ONLY data."column"
  ALTER COLUMN sys_period SET DEFAULT tstzrange(now(), NULL::timestamp with time zone);

--
-- TOC entry 5044 (class 2604 OID 23446)
-- Name: data_association pk_entity; Type: DEFAULT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.data_association
  ALTER COLUMN pk_entity SET DEFAULT nextval('data.entity_pk_entity_seq'::regclass);

--
-- TOC entry 5045 (class 2604 OID 21880)
-- Name: data_association tmsp_creation; Type: DEFAULT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.data_association
  ALTER COLUMN tmsp_creation SET DEFAULT now();

--
-- TOC entry 5046 (class 2604 OID 21881)
-- Name: data_association sys_period; Type: DEFAULT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.data_association
  ALTER COLUMN sys_period SET DEFAULT tstzrange(now(), NULL::timestamp with time zone);

--
-- TOC entry 5076 (class 2604 OID 23466)
-- Name: data_association_mapping pk_entity; Type: DEFAULT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.data_association_mapping
  ALTER COLUMN pk_entity SET DEFAULT nextval('data.entity_pk_entity_seq'::regclass);

--
-- TOC entry 5077 (class 2604 OID 21906)
-- Name: data_association_mapping tmsp_creation; Type: DEFAULT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.data_association_mapping
  ALTER COLUMN tmsp_creation SET DEFAULT now();

--
-- TOC entry 5078 (class 2604 OID 21907)
-- Name: data_association_mapping sys_period; Type: DEFAULT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.data_association_mapping
  ALTER COLUMN sys_period SET DEFAULT tstzrange(now(), NULL::timestamp with time zone);

--
-- TOC entry 5024 (class 2604 OID 23440)
-- Name: entity pk_entity; Type: DEFAULT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.entity
  ALTER COLUMN pk_entity SET DEFAULT nextval('data.entity_pk_entity_seq'::regclass);

--
-- TOC entry 5054 (class 2604 OID 23459)
-- Name: factoid pk_entity; Type: DEFAULT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.factoid
  ALTER COLUMN pk_entity SET DEFAULT nextval('data.entity_pk_entity_seq'::regclass);

--
-- TOC entry 5055 (class 2604 OID 21885)
-- Name: factoid tmsp_creation; Type: DEFAULT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.factoid
  ALTER COLUMN tmsp_creation SET DEFAULT now();

--
-- TOC entry 5056 (class 2604 OID 21886)
-- Name: factoid sys_period; Type: DEFAULT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.factoid
  ALTER COLUMN sys_period SET DEFAULT tstzrange(now(), NULL::timestamp with time zone);

--
-- TOC entry 5057 (class 2604 OID 23460)
-- Name: factoid_mapping pk_entity; Type: DEFAULT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.factoid_mapping
  ALTER COLUMN pk_entity SET DEFAULT nextval('data.entity_pk_entity_seq'::regclass);

--
-- TOC entry 5058 (class 2604 OID 21888)
-- Name: factoid_mapping tmsp_creation; Type: DEFAULT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.factoid_mapping
  ALTER COLUMN tmsp_creation SET DEFAULT now();

--
-- TOC entry 5059 (class 2604 OID 21889)
-- Name: factoid_mapping sys_period; Type: DEFAULT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.factoid_mapping
  ALTER COLUMN sys_period SET DEFAULT tstzrange(now(), NULL::timestamp with time zone);

--
-- TOC entry 5060 (class 2604 OID 23461)
-- Name: factoid_property_mapping pk_entity; Type: DEFAULT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.factoid_property_mapping
  ALTER COLUMN pk_entity SET DEFAULT nextval('data.entity_pk_entity_seq'::regclass);

--
-- TOC entry 5061 (class 2604 OID 21891)
-- Name: factoid_property_mapping tmsp_creation; Type: DEFAULT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.factoid_property_mapping
  ALTER COLUMN tmsp_creation SET DEFAULT now();

--
-- TOC entry 5062 (class 2604 OID 21892)
-- Name: factoid_property_mapping sys_period; Type: DEFAULT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.factoid_property_mapping
  ALTER COLUMN sys_period SET DEFAULT tstzrange(now(), NULL::timestamp with time zone);

--
-- TOC entry 5064 (class 2604 OID 23462)
-- Name: factoid_role pk_entity; Type: DEFAULT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.factoid_role
  ALTER COLUMN pk_entity SET DEFAULT nextval('data.entity_pk_entity_seq'::regclass);

--
-- TOC entry 5065 (class 2604 OID 21894)
-- Name: factoid_role tmsp_creation; Type: DEFAULT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.factoid_role
  ALTER COLUMN tmsp_creation SET DEFAULT now();

--
-- TOC entry 5066 (class 2604 OID 21895)
-- Name: factoid_role sys_period; Type: DEFAULT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.factoid_role
  ALTER COLUMN sys_period SET DEFAULT tstzrange(now(), NULL::timestamp with time zone);

--
-- TOC entry 5067 (class 2604 OID 23463)
-- Name: namespace pk_entity; Type: DEFAULT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.namespace
  ALTER COLUMN pk_entity SET DEFAULT nextval('data.entity_pk_entity_seq'::regclass);

--
-- TOC entry 5068 (class 2604 OID 21897)
-- Name: namespace tmsp_creation; Type: DEFAULT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.namespace
  ALTER COLUMN tmsp_creation SET DEFAULT now();

--
-- TOC entry 5069 (class 2604 OID 21898)
-- Name: namespace sys_period; Type: DEFAULT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.namespace
  ALTER COLUMN sys_period SET DEFAULT tstzrange(now(), NULL::timestamp with time zone);

--
-- TOC entry 5233 (class 2604 OID 23534)
-- Name: property_of_property pk_entity; Type: DEFAULT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.property_of_property
  ALTER COLUMN pk_entity SET DEFAULT nextval('data.entity_pk_entity_seq'::regclass);

--
-- TOC entry 5234 (class 2604 OID 23103)
-- Name: property_of_property tmsp_creation; Type: DEFAULT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.property_of_property
  ALTER COLUMN tmsp_creation SET DEFAULT now();

--
-- TOC entry 5235 (class 2604 OID 23104)
-- Name: property_of_property sys_period; Type: DEFAULT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.property_of_property
  ALTER COLUMN sys_period SET DEFAULT tstzrange(now(), NULL::timestamp with time zone);

--
-- TOC entry 5230 (class 2604 OID 23533)
-- Name: property_of_property_mapping pk_entity; Type: DEFAULT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.property_of_property_mapping
  ALTER COLUMN pk_entity SET DEFAULT nextval('data.entity_pk_entity_seq'::regclass);

--
-- TOC entry 5231 (class 2604 OID 23041)
-- Name: property_of_property_mapping tmsp_creation; Type: DEFAULT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.property_of_property_mapping
  ALTER COLUMN tmsp_creation SET DEFAULT now();

--
-- TOC entry 5232 (class 2604 OID 23042)
-- Name: property_of_property_mapping sys_period; Type: DEFAULT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.property_of_property_mapping
  ALTER COLUMN sys_period SET DEFAULT tstzrange(now(), NULL::timestamp with time zone);

--
-- TOC entry 5070 (class 2604 OID 23465)
-- Name: text_property pk_entity; Type: DEFAULT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.text_property
  ALTER COLUMN pk_entity SET DEFAULT nextval('data.entity_pk_entity_seq'::regclass);

--
-- TOC entry 5071 (class 2604 OID 21903)
-- Name: text_property tmsp_creation; Type: DEFAULT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.text_property
  ALTER COLUMN tmsp_creation SET DEFAULT now();

--
-- TOC entry 5072 (class 2604 OID 21904)
-- Name: text_property sys_period; Type: DEFAULT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.text_property
  ALTER COLUMN sys_period SET DEFAULT tstzrange(now(), NULL::timestamp with time zone);

--
-- TOC entry 5079 (class 2604 OID 23467)
-- Name: values_association pk_entity; Type: DEFAULT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.values_association
  ALTER COLUMN pk_entity SET DEFAULT nextval('data.entity_pk_entity_seq'::regclass);

--
-- TOC entry 5080 (class 2604 OID 21909)
-- Name: values_association tmsp_creation; Type: DEFAULT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.values_association
  ALTER COLUMN tmsp_creation SET DEFAULT now();

--
-- TOC entry 5081 (class 2604 OID 21910)
-- Name: values_association sys_period; Type: DEFAULT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.values_association
  ALTER COLUMN sys_period SET DEFAULT tstzrange(now(), NULL::timestamp with time zone);

--
-- TOC entry 5260 (class 2604 OID 24083)
-- Name: api_class pk_entity; Type: DEFAULT; Schema: data_for_history; Owner: -
--
ALTER TABLE ONLY data_for_history.api_class
  ALTER COLUMN pk_entity SET DEFAULT nextval('data_for_history.entity_pk_entity_seq'::regclass);

--
-- TOC entry 5261 (class 2604 OID 24084)
-- Name: api_class tmsp_creation; Type: DEFAULT; Schema: data_for_history; Owner: -
--
ALTER TABLE ONLY data_for_history.api_class
  ALTER COLUMN tmsp_creation SET DEFAULT now();

--
-- TOC entry 5262 (class 2604 OID 24085)
-- Name: api_class sys_period; Type: DEFAULT; Schema: data_for_history; Owner: -
--
ALTER TABLE ONLY data_for_history.api_class
  ALTER COLUMN sys_period SET DEFAULT tstzrange(now(), NULL::timestamp with time zone);

--
-- TOC entry 5263 (class 2604 OID 24086)
-- Name: api_class removed_from_api; Type: DEFAULT; Schema: data_for_history; Owner: -
--
ALTER TABLE ONLY data_for_history.api_class
  ALTER COLUMN removed_from_api SET DEFAULT FALSE;

--
-- TOC entry 5097 (class 2604 OID 23483)
-- Name: api_profile pk_entity; Type: DEFAULT; Schema: data_for_history; Owner: -
--
ALTER TABLE ONLY data_for_history.api_profile
  ALTER COLUMN pk_entity SET DEFAULT nextval('data_for_history.entity_pk_entity_seq'::regclass);

--
-- TOC entry 5098 (class 2604 OID 21927)
-- Name: api_profile tmsp_creation; Type: DEFAULT; Schema: data_for_history; Owner: -
--
ALTER TABLE ONLY data_for_history.api_profile
  ALTER COLUMN tmsp_creation SET DEFAULT now();

--
-- TOC entry 5099 (class 2604 OID 21928)
-- Name: api_profile sys_period; Type: DEFAULT; Schema: data_for_history; Owner: -
--
ALTER TABLE ONLY data_for_history.api_profile
  ALTER COLUMN sys_period SET DEFAULT tstzrange(now(), NULL::timestamp with time zone);

--
-- TOC entry 5100 (class 2604 OID 21929)
-- Name: api_profile removed_from_api; Type: DEFAULT; Schema: data_for_history; Owner: -
--
ALTER TABLE ONLY data_for_history.api_profile
  ALTER COLUMN removed_from_api SET DEFAULT FALSE;

--
-- TOC entry 5268 (class 2604 OID 24107)
-- Name: api_property pk_entity; Type: DEFAULT; Schema: data_for_history; Owner: -
--
ALTER TABLE ONLY data_for_history.api_property
  ALTER COLUMN pk_entity SET DEFAULT nextval('data_for_history.entity_pk_entity_seq'::regclass);

--
-- TOC entry 5269 (class 2604 OID 24108)
-- Name: api_property tmsp_creation; Type: DEFAULT; Schema: data_for_history; Owner: -
--
ALTER TABLE ONLY data_for_history.api_property
  ALTER COLUMN tmsp_creation SET DEFAULT now();

--
-- TOC entry 5270 (class 2604 OID 24109)
-- Name: api_property sys_period; Type: DEFAULT; Schema: data_for_history; Owner: -
--
ALTER TABLE ONLY data_for_history.api_property
  ALTER COLUMN sys_period SET DEFAULT tstzrange(now(), NULL::timestamp with time zone);

--
-- TOC entry 5271 (class 2604 OID 24110)
-- Name: api_property removed_from_api; Type: DEFAULT; Schema: data_for_history; Owner: -
--
ALTER TABLE ONLY data_for_history.api_property
  ALTER COLUMN removed_from_api SET DEFAULT FALSE;

--
-- TOC entry 5086 (class 2604 OID 23472)
-- Name: associates_system_type_deprecated pk_entity; Type: DEFAULT; Schema: data_for_history; Owner: -
--
ALTER TABLE ONLY data_for_history.associates_system_type_deprecated
  ALTER COLUMN pk_entity SET DEFAULT nextval('data_for_history.entity_pk_entity_seq'::regclass);

--
-- TOC entry 5087 (class 2604 OID 21912)
-- Name: associates_system_type_deprecated tmsp_creation; Type: DEFAULT; Schema: data_for_history; Owner: -
--
ALTER TABLE ONLY data_for_history.associates_system_type_deprecated
  ALTER COLUMN tmsp_creation SET DEFAULT now();

--
-- TOC entry 5088 (class 2604 OID 21913)
-- Name: associates_system_type_deprecated sys_period; Type: DEFAULT; Schema: data_for_history; Owner: -
--
ALTER TABLE ONLY data_for_history.associates_system_type_deprecated
  ALTER COLUMN sys_period SET DEFAULT tstzrange(now(), NULL::timestamp with time zone);

--
-- TOC entry 5090 (class 2604 OID 23474)
-- Name: class_profile_view_deprecated pk_entity; Type: DEFAULT; Schema: data_for_history; Owner: -
--
ALTER TABLE ONLY data_for_history.class_profile_view_deprecated
  ALTER COLUMN pk_entity SET DEFAULT nextval('data_for_history.entity_pk_entity_seq'::regclass);

--
-- TOC entry 5091 (class 2604 OID 21919)
-- Name: class_profile_view_deprecated tmsp_creation; Type: DEFAULT; Schema: data_for_history; Owner: -
--
ALTER TABLE ONLY data_for_history.class_profile_view_deprecated
  ALTER COLUMN tmsp_creation SET DEFAULT now();

--
-- TOC entry 5092 (class 2604 OID 21920)
-- Name: class_profile_view_deprecated sys_period; Type: DEFAULT; Schema: data_for_history; Owner: -
--
ALTER TABLE ONLY data_for_history.class_profile_view_deprecated
  ALTER COLUMN sys_period SET DEFAULT tstzrange(now(), NULL::timestamp with time zone);

--
-- TOC entry 5082 (class 2604 OID 23471)
-- Name: entity pk_entity; Type: DEFAULT; Schema: data_for_history; Owner: -
--
ALTER TABLE ONLY data_for_history.entity
  ALTER COLUMN pk_entity SET DEFAULT nextval('data_for_history.entity_pk_entity_seq'::regclass);

--
-- TOC entry 5093 (class 2604 OID 23482)
-- Name: label_deprecated pk_entity; Type: DEFAULT; Schema: data_for_history; Owner: -
--
ALTER TABLE ONLY data_for_history.label_deprecated
  ALTER COLUMN pk_entity SET DEFAULT nextval('data_for_history.entity_pk_entity_seq'::regclass);

--
-- TOC entry 5094 (class 2604 OID 21923)
-- Name: label_deprecated tmsp_creation; Type: DEFAULT; Schema: data_for_history; Owner: -
--
ALTER TABLE ONLY data_for_history.label_deprecated
  ALTER COLUMN tmsp_creation SET DEFAULT now();

--
-- TOC entry 5095 (class 2604 OID 21924)
-- Name: label_deprecated sys_period; Type: DEFAULT; Schema: data_for_history; Owner: -
--
ALTER TABLE ONLY data_for_history.label_deprecated
  ALTER COLUMN sys_period SET DEFAULT tstzrange(now(), NULL::timestamp with time zone);

--
-- TOC entry 5096 (class 2604 OID 21925)
-- Name: label_deprecated removed_from_api; Type: DEFAULT; Schema: data_for_history; Owner: -
--
ALTER TABLE ONLY data_for_history.label_deprecated
  ALTER COLUMN removed_from_api SET DEFAULT FALSE;

--
-- TOC entry 5103 (class 2604 OID 23484)
-- Name: property pk_entity; Type: DEFAULT; Schema: data_for_history; Owner: -
--
ALTER TABLE ONLY data_for_history.property
  ALTER COLUMN pk_entity SET DEFAULT nextval('data_for_history.entity_pk_entity_seq'::regclass);

--
-- TOC entry 5104 (class 2604 OID 21931)
-- Name: property tmsp_creation; Type: DEFAULT; Schema: data_for_history; Owner: -
--
ALTER TABLE ONLY data_for_history.property
  ALTER COLUMN tmsp_creation SET DEFAULT now();

--
-- TOC entry 5105 (class 2604 OID 21932)
-- Name: property sys_period; Type: DEFAULT; Schema: data_for_history; Owner: -
--
ALTER TABLE ONLY data_for_history.property
  ALTER COLUMN sys_period SET DEFAULT tstzrange(now(), NULL::timestamp with time zone);

--
-- TOC entry 5106 (class 2604 OID 21933)
-- Name: property removed_from_api; Type: DEFAULT; Schema: data_for_history; Owner: -
--
ALTER TABLE ONLY data_for_history.property
  ALTER COLUMN removed_from_api SET DEFAULT FALSE;

--
-- TOC entry 5282 (class 2604 OID 24430)
-- Name: property_of_property pk_entity; Type: DEFAULT; Schema: data_for_history; Owner: -
--
ALTER TABLE ONLY data_for_history.property_of_property
  ALTER COLUMN pk_entity SET DEFAULT nextval('data_for_history.entity_pk_entity_seq'::regclass);

--
-- TOC entry 5283 (class 2604 OID 24431)
-- Name: property_of_property tmsp_creation; Type: DEFAULT; Schema: data_for_history; Owner: -
--
ALTER TABLE ONLY data_for_history.property_of_property
  ALTER COLUMN tmsp_creation SET DEFAULT now();

--
-- TOC entry 5284 (class 2604 OID 24432)
-- Name: property_of_property sys_period; Type: DEFAULT; Schema: data_for_history; Owner: -
--
ALTER TABLE ONLY data_for_history.property_of_property
  ALTER COLUMN sys_period SET DEFAULT tstzrange(now(), NULL::timestamp with time zone);

--
-- TOC entry 5285 (class 2604 OID 24433)
-- Name: property_of_property removed_from_api; Type: DEFAULT; Schema: data_for_history; Owner: -
--
ALTER TABLE ONLY data_for_history.property_of_property
  ALTER COLUMN removed_from_api SET DEFAULT FALSE;

--
-- TOC entry 5108 (class 2604 OID 23485)
-- Name: property_profile_view_deprecated pk_entity; Type: DEFAULT; Schema: data_for_history; Owner: -
--
ALTER TABLE ONLY data_for_history.property_profile_view_deprecated
  ALTER COLUMN pk_entity SET DEFAULT nextval('data_for_history.entity_pk_entity_seq'::regclass);

--
-- TOC entry 5109 (class 2604 OID 21935)
-- Name: property_profile_view_deprecated tmsp_creation; Type: DEFAULT; Schema: data_for_history; Owner: -
--
ALTER TABLE ONLY data_for_history.property_profile_view_deprecated
  ALTER COLUMN tmsp_creation SET DEFAULT now();

--
-- TOC entry 5110 (class 2604 OID 21936)
-- Name: property_profile_view_deprecated sys_period; Type: DEFAULT; Schema: data_for_history; Owner: -
--
ALTER TABLE ONLY data_for_history.property_profile_view_deprecated
  ALTER COLUMN sys_period SET DEFAULT tstzrange(now(), NULL::timestamp with time zone);

--
-- TOC entry 5111 (class 2604 OID 23486)
-- Name: system_type_deprecated pk_entity; Type: DEFAULT; Schema: data_for_history; Owner: -
--
ALTER TABLE ONLY data_for_history.system_type_deprecated
  ALTER COLUMN pk_entity SET DEFAULT nextval('data_for_history.entity_pk_entity_seq'::regclass);

--
-- TOC entry 5112 (class 2604 OID 21938)
-- Name: system_type_deprecated tmsp_creation; Type: DEFAULT; Schema: data_for_history; Owner: -
--
ALTER TABLE ONLY data_for_history.system_type_deprecated
  ALTER COLUMN tmsp_creation SET DEFAULT now();

--
-- TOC entry 5113 (class 2604 OID 21939)
-- Name: system_type_deprecated sys_period; Type: DEFAULT; Schema: data_for_history; Owner: -
--
ALTER TABLE ONLY data_for_history.system_type_deprecated
  ALTER COLUMN sys_period SET DEFAULT tstzrange(now(), NULL::timestamp with time zone);

--
-- TOC entry 5114 (class 2604 OID 21940)
-- Name: system_type_deprecated removed_from_api; Type: DEFAULT; Schema: data_for_history; Owner: -
--
ALTER TABLE ONLY data_for_history.system_type_deprecated
  ALTER COLUMN removed_from_api SET DEFAULT FALSE;

--
-- TOC entry 5115 (class 2604 OID 23487)
-- Name: text_property_deprecated pk_entity; Type: DEFAULT; Schema: data_for_history; Owner: -
--
ALTER TABLE ONLY data_for_history.text_property_deprecated
  ALTER COLUMN pk_entity SET DEFAULT nextval('data_for_history.entity_pk_entity_seq'::regclass);

--
-- TOC entry 5116 (class 2604 OID 21942)
-- Name: text_property_deprecated tmsp_creation; Type: DEFAULT; Schema: data_for_history; Owner: -
--
ALTER TABLE ONLY data_for_history.text_property_deprecated
  ALTER COLUMN tmsp_creation SET DEFAULT now();

--
-- TOC entry 5117 (class 2604 OID 21943)
-- Name: text_property_deprecated sys_period; Type: DEFAULT; Schema: data_for_history; Owner: -
--
ALTER TABLE ONLY data_for_history.text_property_deprecated
  ALTER COLUMN sys_period SET DEFAULT tstzrange(now(), NULL::timestamp with time zone);

--
-- TOC entry 5118 (class 2604 OID 21944)
-- Name: text_property_deprecated removed_from_api; Type: DEFAULT; Schema: data_for_history; Owner: -
--
ALTER TABLE ONLY data_for_history.text_property_deprecated
  ALTER COLUMN removed_from_api SET DEFAULT FALSE;

--
-- TOC entry 5125 (class 2604 OID 23501)
-- Name: _backup_entity_association pk_entity; Type: DEFAULT; Schema: information; Owner: -
--
ALTER TABLE ONLY information._backup_entity_association
  ALTER COLUMN pk_entity SET DEFAULT nextval('information.entity_pk_entity_seq'::regclass);

--
-- TOC entry 5126 (class 2604 OID 21955)
-- Name: _backup_entity_association tmsp_creation; Type: DEFAULT; Schema: information; Owner: -
--
ALTER TABLE ONLY information._backup_entity_association
  ALTER COLUMN tmsp_creation SET DEFAULT now();

--
-- TOC entry 5127 (class 2604 OID 21956)
-- Name: _backup_entity_association sys_period; Type: DEFAULT; Schema: information; Owner: -
--
ALTER TABLE ONLY information._backup_entity_association
  ALTER COLUMN sys_period SET DEFAULT tstzrange(now(), NULL::timestamp with time zone);

--
-- TOC entry 5120 (class 2604 OID 23491)
-- Name: appellation pk_entity; Type: DEFAULT; Schema: information; Owner: -
--
ALTER TABLE ONLY information.appellation
  ALTER COLUMN pk_entity SET DEFAULT nextval('information.entity_pk_entity_seq'::regclass);

--
-- TOC entry 5121 (class 2604 OID 21950)
-- Name: appellation tmsp_creation; Type: DEFAULT; Schema: information; Owner: -
--
ALTER TABLE ONLY information.appellation
  ALTER COLUMN tmsp_creation SET DEFAULT now();

--
-- TOC entry 5122 (class 2604 OID 21951)
-- Name: appellation sys_period; Type: DEFAULT; Schema: information; Owner: -
--
ALTER TABLE ONLY information.appellation
  ALTER COLUMN sys_period SET DEFAULT tstzrange(now(), NULL::timestamp with time zone);

--
-- TOC entry 5236 (class 2604 OID 23535)
-- Name: dimension pk_entity; Type: DEFAULT; Schema: information; Owner: -
--
ALTER TABLE ONLY information.dimension
  ALTER COLUMN pk_entity SET DEFAULT nextval('information.entity_pk_entity_seq'::regclass);

--
-- TOC entry 5237 (class 2604 OID 23149)
-- Name: dimension tmsp_creation; Type: DEFAULT; Schema: information; Owner: -
--
ALTER TABLE ONLY information.dimension
  ALTER COLUMN tmsp_creation SET DEFAULT now();

--
-- TOC entry 5238 (class 2604 OID 23150)
-- Name: dimension sys_period; Type: DEFAULT; Schema: information; Owner: -
--
ALTER TABLE ONLY information.dimension
  ALTER COLUMN sys_period SET DEFAULT tstzrange(now(), NULL::timestamp with time zone);

--
-- TOC entry 5017 (class 2604 OID 23489)
-- Name: entity pk_entity; Type: DEFAULT; Schema: information; Owner: -
--
ALTER TABLE ONLY information.entity
  ALTER COLUMN pk_entity SET DEFAULT nextval('information.entity_pk_entity_seq'::regclass);

--
-- TOC entry 5277 (class 2604 OID 24391)
-- Name: lang_string pk_entity; Type: DEFAULT; Schema: information; Owner: -
--
ALTER TABLE ONLY information.lang_string
  ALTER COLUMN pk_entity SET DEFAULT nextval('information.entity_pk_entity_seq'::regclass);

--
-- TOC entry 5278 (class 2604 OID 24392)
-- Name: lang_string tmsp_creation; Type: DEFAULT; Schema: information; Owner: -
--
ALTER TABLE ONLY information.lang_string
  ALTER COLUMN tmsp_creation SET DEFAULT now();

--
-- TOC entry 5279 (class 2604 OID 24393)
-- Name: lang_string sys_period; Type: DEFAULT; Schema: information; Owner: -
--
ALTER TABLE ONLY information.lang_string
  ALTER COLUMN sys_period SET DEFAULT tstzrange(now(), NULL::timestamp with time zone);

--
-- TOC entry 5280 (class 2604 OID 24394)
-- Name: lang_string pk_text; Type: DEFAULT; Schema: information; Owner: -
--
ALTER TABLE ONLY information.lang_string
  ALTER COLUMN pk_text SET DEFAULT nextval('commons.text_pk_text_seq'::regclass);

--
-- TOC entry 5128 (class 2604 OID 23502)
-- Name: language pk_entity; Type: DEFAULT; Schema: information; Owner: -
--
ALTER TABLE ONLY information.language
  ALTER COLUMN pk_entity SET DEFAULT nextval('information.entity_pk_entity_seq'::regclass);

--
-- TOC entry 5129 (class 2604 OID 21959)
-- Name: language tmsp_creation; Type: DEFAULT; Schema: information; Owner: -
--
ALTER TABLE ONLY information.language
  ALTER COLUMN tmsp_creation SET DEFAULT now();

--
-- TOC entry 5130 (class 2604 OID 21960)
-- Name: language sys_period; Type: DEFAULT; Schema: information; Owner: -
--
ALTER TABLE ONLY information.language
  ALTER COLUMN sys_period SET DEFAULT tstzrange(now(), NULL::timestamp with time zone);

--
-- TOC entry 5134 (class 2604 OID 23504)
-- Name: place pk_entity; Type: DEFAULT; Schema: information; Owner: -
--
ALTER TABLE ONLY information.place
  ALTER COLUMN pk_entity SET DEFAULT nextval('information.entity_pk_entity_seq'::regclass);

--
-- TOC entry 5135 (class 2604 OID 21966)
-- Name: place tmsp_creation; Type: DEFAULT; Schema: information; Owner: -
--
ALTER TABLE ONLY information.place
  ALTER COLUMN tmsp_creation SET DEFAULT now();

--
-- TOC entry 5136 (class 2604 OID 21967)
-- Name: place sys_period; Type: DEFAULT; Schema: information; Owner: -
--
ALTER TABLE ONLY information.place
  ALTER COLUMN sys_period SET DEFAULT tstzrange(now(), NULL::timestamp with time zone);

--
-- TOC entry 5137 (class 2604 OID 23506)
-- Name: statement pk_entity; Type: DEFAULT; Schema: information; Owner: -
--
ALTER TABLE ONLY information.statement
  ALTER COLUMN pk_entity SET DEFAULT nextval('information.entity_pk_entity_seq'::regclass);

--
-- TOC entry 5138 (class 2604 OID 21972)
-- Name: statement tmsp_creation; Type: DEFAULT; Schema: information; Owner: -
--
ALTER TABLE ONLY information.statement
  ALTER COLUMN tmsp_creation SET DEFAULT now();

--
-- TOC entry 5139 (class 2604 OID 21973)
-- Name: statement sys_period; Type: DEFAULT; Schema: information; Owner: -
--
ALTER TABLE ONLY information.statement
  ALTER COLUMN sys_period SET DEFAULT tstzrange(now(), NULL::timestamp with time zone);

--
-- TOC entry 5158 (class 2604 OID 23508)
-- Name: text_property pk_entity; Type: DEFAULT; Schema: information; Owner: -
--
ALTER TABLE ONLY information.text_property
  ALTER COLUMN pk_entity SET DEFAULT nextval('information.entity_pk_entity_seq'::regclass);

--
-- TOC entry 5159 (class 2604 OID 21980)
-- Name: text_property tmsp_creation; Type: DEFAULT; Schema: information; Owner: -
--
ALTER TABLE ONLY information.text_property
  ALTER COLUMN tmsp_creation SET DEFAULT now();

--
-- TOC entry 5160 (class 2604 OID 21981)
-- Name: text_property sys_period; Type: DEFAULT; Schema: information; Owner: -
--
ALTER TABLE ONLY information.text_property
  ALTER COLUMN sys_period SET DEFAULT tstzrange(now(), NULL::timestamp with time zone);

--
-- TOC entry 5163 (class 2604 OID 23509)
-- Name: time_primitive pk_entity; Type: DEFAULT; Schema: information; Owner: -
--
ALTER TABLE ONLY information.time_primitive
  ALTER COLUMN pk_entity SET DEFAULT nextval('information.entity_pk_entity_seq'::regclass);

--
-- TOC entry 5164 (class 2604 OID 21983)
-- Name: time_primitive tmsp_creation; Type: DEFAULT; Schema: information; Owner: -
--
ALTER TABLE ONLY information.time_primitive
  ALTER COLUMN tmsp_creation SET DEFAULT now();

--
-- TOC entry 5165 (class 2604 OID 21984)
-- Name: time_primitive sys_period; Type: DEFAULT; Schema: information; Owner: -
--
ALTER TABLE ONLY information.time_primitive
  ALTER COLUMN sys_period SET DEFAULT tstzrange(now(), NULL::timestamp with time zone);

--
-- TOC entry 5254 (class 2604 OID 23980)
-- Name: analysis pk_entity; Type: DEFAULT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects.analysis
  ALTER COLUMN pk_entity SET DEFAULT nextval('projects.entity_pk_entity_seq'::regclass);

--
-- TOC entry 5255 (class 2604 OID 23981)
-- Name: analysis tmsp_creation; Type: DEFAULT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects.analysis
  ALTER COLUMN tmsp_creation SET DEFAULT now();

--
-- TOC entry 5256 (class 2604 OID 23982)
-- Name: analysis sys_period; Type: DEFAULT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects.analysis
  ALTER COLUMN sys_period SET DEFAULT tstzrange(now(), NULL::timestamp with time zone);

--
-- TOC entry 5172 (class 2604 OID 23513)
-- Name: class_field_config pk_entity; Type: DEFAULT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects.class_field_config
  ALTER COLUMN pk_entity SET DEFAULT nextval('projects.entity_pk_entity_seq'::regclass);

--
-- TOC entry 5173 (class 2604 OID 21988)
-- Name: class_field_config tmsp_creation; Type: DEFAULT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects.class_field_config
  ALTER COLUMN tmsp_creation SET DEFAULT now();

--
-- TOC entry 5174 (class 2604 OID 21989)
-- Name: class_field_config sys_period; Type: DEFAULT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects.class_field_config
  ALTER COLUMN sys_period SET DEFAULT tstzrange(now(), NULL::timestamp with time zone);

--
-- TOC entry 5257 (class 2604 OID 24055)
-- Name: dfh_profile_proj_rel pk_entity; Type: DEFAULT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects.dfh_profile_proj_rel
  ALTER COLUMN pk_entity SET DEFAULT nextval('projects.entity_pk_entity_seq'::regclass);

--
-- TOC entry 5258 (class 2604 OID 24056)
-- Name: dfh_profile_proj_rel tmsp_creation; Type: DEFAULT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects.dfh_profile_proj_rel
  ALTER COLUMN tmsp_creation SET DEFAULT now();

--
-- TOC entry 5259 (class 2604 OID 24057)
-- Name: dfh_profile_proj_rel sys_period; Type: DEFAULT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects.dfh_profile_proj_rel
  ALTER COLUMN sys_period SET DEFAULT tstzrange(now(), NULL::timestamp with time zone);

--
-- TOC entry 5166 (class 2604 OID 23511)
-- Name: entity pk_entity; Type: DEFAULT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects.entity
  ALTER COLUMN pk_entity SET DEFAULT nextval('projects.entity_pk_entity_seq'::regclass);

--
-- TOC entry 5291 (class 2604 OID 24535)
-- Name: entity_label_config pk_entity; Type: DEFAULT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects.entity_label_config
  ALTER COLUMN pk_entity SET DEFAULT nextval('projects.entity_pk_entity_seq'::regclass);

--
-- TOC entry 5293 (class 2604 OID 24536)
-- Name: entity_label_config tmsp_creation; Type: DEFAULT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects.entity_label_config
  ALTER COLUMN tmsp_creation SET DEFAULT now();

--
-- TOC entry 5294 (class 2604 OID 24537)
-- Name: entity_label_config sys_period; Type: DEFAULT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects.entity_label_config
  ALTER COLUMN sys_period SET DEFAULT tstzrange(now(), NULL::timestamp with time zone);

--
-- TOC entry 5240 (class 2604 OID 23727)
-- Name: property_label_deprecated tmsp_creation; Type: DEFAULT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects.property_label_deprecated
  ALTER COLUMN tmsp_creation SET DEFAULT now();

--
-- TOC entry 5241 (class 2604 OID 23728)
-- Name: property_label_deprecated sys_period; Type: DEFAULT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects.property_label_deprecated
  ALTER COLUMN sys_period SET DEFAULT tstzrange(now(), NULL::timestamp with time zone);

--
-- TOC entry 5193 (class 2604 OID 23520)
-- Name: query pk_entity; Type: DEFAULT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects.query
  ALTER COLUMN pk_entity SET DEFAULT nextval('projects.entity_pk_entity_seq'::regclass);

--
-- TOC entry 5194 (class 2604 OID 21994)
-- Name: query tmsp_creation; Type: DEFAULT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects.query
  ALTER COLUMN tmsp_creation SET DEFAULT now();

--
-- TOC entry 5195 (class 2604 OID 21995)
-- Name: query sys_period; Type: DEFAULT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects.query
  ALTER COLUMN sys_period SET DEFAULT tstzrange(now(), NULL::timestamp with time zone);

--
-- TOC entry 5296 (class 2604 OID 24587)
-- Name: table_config pk_entity; Type: DEFAULT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects.table_config
  ALTER COLUMN pk_entity SET DEFAULT nextval('projects.entity_pk_entity_seq'::regclass);

--
-- TOC entry 5297 (class 2604 OID 24588)
-- Name: table_config tmsp_creation; Type: DEFAULT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects.table_config
  ALTER COLUMN tmsp_creation SET DEFAULT now();

--
-- TOC entry 5298 (class 2604 OID 24589)
-- Name: table_config sys_period; Type: DEFAULT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects.table_config
  ALTER COLUMN sys_period SET DEFAULT tstzrange(now(), NULL::timestamp with time zone);

--
-- TOC entry 5305 (class 2604 OID 24974)
-- Name: visibility_settings pk_entity; Type: DEFAULT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects.visibility_settings
  ALTER COLUMN pk_entity SET DEFAULT nextval('projects.entity_pk_entity_seq'::regclass);

--
-- TOC entry 5306 (class 2604 OID 24975)
-- Name: visibility_settings tmsp_creation; Type: DEFAULT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects.visibility_settings
  ALTER COLUMN tmsp_creation SET DEFAULT now();

--
-- TOC entry 5307 (class 2604 OID 24976)
-- Name: visibility_settings sys_period; Type: DEFAULT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects.visibility_settings
  ALTER COLUMN sys_period SET DEFAULT tstzrange(now(), NULL::timestamp with time zone);

--
-- TOC entry 5202 (class 2604 OID 23521)
-- Name: visual pk_entity; Type: DEFAULT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects.visual
  ALTER COLUMN pk_entity SET DEFAULT nextval('projects.entity_pk_entity_seq'::regclass);

--
-- TOC entry 5203 (class 2604 OID 21998)
-- Name: visual tmsp_creation; Type: DEFAULT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects.visual
  ALTER COLUMN tmsp_creation SET DEFAULT now();

--
-- TOC entry 5204 (class 2604 OID 21999)
-- Name: visual sys_period; Type: DEFAULT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects.visual
  ALTER COLUMN sys_period SET DEFAULT tstzrange(now(), NULL::timestamp with time zone);

--
-- TOC entry 5206 (class 2604 OID 22000)
-- Name: account id; Type: DEFAULT; Schema: public; Owner: -
--
ALTER TABLE ONLY public.account
  ALTER COLUMN id SET DEFAULT nextval('public.account_id_seq'::regclass);

--
-- TOC entry 5207 (class 2604 OID 22001)
-- Name: account_project_rel id; Type: DEFAULT; Schema: public; Owner: -
--
ALTER TABLE ONLY public.account_project_rel
  ALTER COLUMN id SET DEFAULT nextval('public.account_project_rel_id_seq'::regclass);

--
-- TOC entry 5209 (class 2604 OID 22002)
-- Name: acl id; Type: DEFAULT; Schema: public; Owner: -
--
ALTER TABLE ONLY public.acl
  ALTER COLUMN id SET DEFAULT nextval('public.acl_id_seq'::regclass);

--
-- TOC entry 5286 (class 2604 OID 24480)
-- Name: credential id; Type: DEFAULT; Schema: public; Owner: -
--
ALTER TABLE ONLY public.credential
  ALTER COLUMN id SET DEFAULT nextval('public.credential_id_seq'::regclass);

--
-- TOC entry 5210 (class 2604 OID 22003)
-- Name: role id; Type: DEFAULT; Schema: public; Owner: -
--
ALTER TABLE ONLY public.role
  ALTER COLUMN id SET DEFAULT nextval('public.role_id_seq'::regclass);

--
-- TOC entry 5211 (class 2604 OID 22004)
-- Name: rolemapping id; Type: DEFAULT; Schema: public; Owner: -
--
ALTER TABLE ONLY public.rolemapping
  ALTER COLUMN id SET DEFAULT nextval('public.rolemapping_id_seq'::regclass);

--
-- TOC entry 5251 (class 2604 OID 23959)
-- Name: analysis_type_deprecated pk_entity; Type: DEFAULT; Schema: system; Owner: -
--
ALTER TABLE ONLY system.analysis_type_deprecated
  ALTER COLUMN pk_entity SET DEFAULT nextval('system.entity_pk_entity_seq'::regclass);

--
-- TOC entry 5252 (class 2604 OID 23960)
-- Name: analysis_type_deprecated tmsp_creation; Type: DEFAULT; Schema: system; Owner: -
--
ALTER TABLE ONLY system.analysis_type_deprecated
  ALTER COLUMN tmsp_creation SET DEFAULT now();

--
-- TOC entry 5253 (class 2604 OID 23961)
-- Name: analysis_type_deprecated sys_period; Type: DEFAULT; Schema: system; Owner: -
--
ALTER TABLE ONLY system.analysis_type_deprecated
  ALTER COLUMN sys_period SET DEFAULT tstzrange(now(), NULL::timestamp with time zone);

--
-- TOC entry 5287 (class 2604 OID 24494)
-- Name: config pk_entity; Type: DEFAULT; Schema: system; Owner: -
--
ALTER TABLE ONLY system.config
  ALTER COLUMN pk_entity SET DEFAULT nextval('system.entity_pk_entity_seq'::regclass);

--
-- TOC entry 5289 (class 2604 OID 24495)
-- Name: config tmsp_creation; Type: DEFAULT; Schema: system; Owner: -
--
ALTER TABLE ONLY system.config
  ALTER COLUMN tmsp_creation SET DEFAULT now();

--
-- TOC entry 5290 (class 2604 OID 24496)
-- Name: config sys_period; Type: DEFAULT; Schema: system; Owner: -
--
ALTER TABLE ONLY system.config
  ALTER COLUMN sys_period SET DEFAULT tstzrange(now(), NULL::timestamp with time zone);

--
-- TOC entry 5175 (class 2604 OID 23522)
-- Name: entity pk_entity; Type: DEFAULT; Schema: system; Owner: -
--
ALTER TABLE ONLY system.entity
  ALTER COLUMN pk_entity SET DEFAULT nextval('system.entity_pk_entity_seq'::regclass);

--
-- TOC entry 5221 (class 2604 OID 23530)
-- Name: system_relevant_class pk_entity; Type: DEFAULT; Schema: system; Owner: -
--
ALTER TABLE ONLY system.system_relevant_class
  ALTER COLUMN pk_entity SET DEFAULT nextval('system.entity_pk_entity_seq'::regclass);

--
-- TOC entry 5222 (class 2604 OID 22007)
-- Name: system_relevant_class tmsp_creation; Type: DEFAULT; Schema: system; Owner: -
--
ALTER TABLE ONLY system.system_relevant_class
  ALTER COLUMN tmsp_creation SET DEFAULT now();

--
-- TOC entry 5223 (class 2604 OID 22008)
-- Name: system_relevant_class sys_period; Type: DEFAULT; Schema: system; Owner: -
--
ALTER TABLE ONLY system.system_relevant_class
  ALTER COLUMN sys_period SET DEFAULT tstzrange(now(), NULL::timestamp with time zone);

--
-- TOC entry 5224 (class 2604 OID 23531)
-- Name: system_relevant_type pk_entity; Type: DEFAULT; Schema: system; Owner: -
--
ALTER TABLE ONLY system.system_relevant_type
  ALTER COLUMN pk_entity SET DEFAULT nextval('system.entity_pk_entity_seq'::regclass);

--
-- TOC entry 5225 (class 2604 OID 22010)
-- Name: system_relevant_type tmsp_creation; Type: DEFAULT; Schema: system; Owner: -
--
ALTER TABLE ONLY system.system_relevant_type
  ALTER COLUMN tmsp_creation SET DEFAULT now();

--
-- TOC entry 5226 (class 2604 OID 22011)
-- Name: system_relevant_type sys_period; Type: DEFAULT; Schema: system; Owner: -
--
ALTER TABLE ONLY system.system_relevant_type
  ALTER COLUMN sys_period SET DEFAULT tstzrange(now(), NULL::timestamp with time zone);

--
-- TOC entry 5246 (class 2604 OID 23818)
-- Name: quill_doc_cell pk_cell; Type: DEFAULT; Schema: tables; Owner: -
--
ALTER TABLE ONLY tables.quill_doc_cell
  ALTER COLUMN pk_cell SET DEFAULT nextval('tables.cell_pk_cell_seq'::regclass);

--
-- TOC entry 5247 (class 2604 OID 23819)
-- Name: quill_doc_cell tmsp_creation; Type: DEFAULT; Schema: tables; Owner: -
--
ALTER TABLE ONLY tables.quill_doc_cell
  ALTER COLUMN tmsp_creation SET DEFAULT now();

--
-- TOC entry 5248 (class 2604 OID 23820)
-- Name: quill_doc_cell sys_period; Type: DEFAULT; Schema: tables; Owner: -
--
ALTER TABLE ONLY tables.quill_doc_cell
  ALTER COLUMN sys_period SET DEFAULT tstzrange(now(), NULL::timestamp with time zone);

--
-- TOC entry 5249 (class 2604 OID 23821)
-- Name: quill_doc_cell pk_text; Type: DEFAULT; Schema: tables; Owner: -
--
ALTER TABLE ONLY tables.quill_doc_cell
  ALTER COLUMN pk_text SET DEFAULT nextval('commons.text_pk_text_seq'::regclass);

--
-- TOC entry 5250 (class 2604 OID 24709)
-- Name: quill_doc_cell fk_class; Type: DEFAULT; Schema: tables; Owner: -
--
ALTER TABLE ONLY tables.quill_doc_cell
  ALTER COLUMN fk_class SET DEFAULT 521;

--
-- TOC entry 5334 (class 2606 OID 22013)
-- Name: text text_pkey; Type: CONSTRAINT; Schema: commons; Owner: -
--
ALTER TABLE ONLY commons.text
  ADD CONSTRAINT text_pkey PRIMARY KEY (pk_text);

--
-- TOC entry 5337 (class 2606 OID 22015)
-- Name: text text_version_unique; Type: CONSTRAINT; Schema: commons; Owner: -
--
ALTER TABLE ONLY commons.text
  ADD CONSTRAINT text_version_unique UNIQUE (pk_text, entity_version);

--
-- TOC entry 5343 (class 2606 OID 24789)
-- Name: avatar avatar_pkey; Type: CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.avatar
  ADD CONSTRAINT avatar_pkey PRIMARY KEY (pk_entity);

--
-- TOC entry 5348 (class 2606 OID 24791)
-- Name: chunk chunk_pkey; Type: CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.chunk
  ADD CONSTRAINT chunk_pkey PRIMARY KEY (pk_entity);

--
-- TOC entry 5355 (class 2606 OID 24793)
-- Name: class_column_mapping class_column_mapping_pkey; Type: CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.class_column_mapping
  ADD CONSTRAINT class_column_mapping_pkey PRIMARY KEY (pk_entity);

--
-- TOC entry 5360 (class 2606 OID 24795)
-- Name: column column_pkey; Type: CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data."column"
  ADD CONSTRAINT column_pkey PRIMARY KEY (pk_entity);

--
-- TOC entry 5413 (class 2606 OID 24799)
-- Name: data_association_mapping data_association_mapping_pkey; Type: CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.data_association_mapping
  ADD CONSTRAINT data_association_mapping_pkey PRIMARY KEY (pk_entity);

--
-- TOC entry 5369 (class 2606 OID 24797)
-- Name: data_association data_association_pkey; Type: CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.data_association
  ADD CONSTRAINT data_association_pkey PRIMARY KEY (pk_entity);

--
-- TOC entry 5345 (class 2606 OID 22017)
-- Name: avatar data_avatar_pk_entity_unique; Type: CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.avatar
  ADD CONSTRAINT data_avatar_pk_entity_unique UNIQUE (pk_entity);

--
-- TOC entry 5351 (class 2606 OID 22021)
-- Name: chunk data_chunk_pk_entity_unique; Type: CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.chunk
  ADD CONSTRAINT data_chunk_pk_entity_unique UNIQUE (pk_entity);

--
-- TOC entry 5357 (class 2606 OID 22023)
-- Name: class_column_mapping data_class_column_rel_pk_entity_unique; Type: CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.class_column_mapping
  ADD CONSTRAINT data_class_column_rel_pk_entity_unique UNIQUE (pk_entity);

--
-- TOC entry 5362 (class 2606 OID 22025)
-- Name: column data_column_pk_entity_unique; Type: CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data."column"
  ADD CONSTRAINT data_column_pk_entity_unique UNIQUE (pk_entity);

--
-- TOC entry 5371 (class 2606 OID 22027)
-- Name: data_association data_data_association_pk_entity_unique; Type: CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.data_association
  ADD CONSTRAINT data_data_association_pk_entity_unique UNIQUE (pk_entity);

--
-- TOC entry 5385 (class 2606 OID 22029)
-- Name: factoid_mapping data_factoid_class_digital_rel_pk_entity_unique; Type: CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.factoid_mapping
  ADD CONSTRAINT data_factoid_class_digital_rel_pk_entity_unique UNIQUE (pk_entity);

--
-- TOC entry 5380 (class 2606 OID 22031)
-- Name: factoid data_factoid_pk_entity_unique; Type: CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.factoid
  ADD CONSTRAINT data_factoid_pk_entity_unique UNIQUE (pk_entity);

--
-- TOC entry 5390 (class 2606 OID 22033)
-- Name: factoid_property_mapping data_factoid_property_column_rel_pk_entity_unique; Type: CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.factoid_property_mapping
  ADD CONSTRAINT data_factoid_property_column_rel_pk_entity_unique UNIQUE (pk_entity);

--
-- TOC entry 5395 (class 2606 OID 22035)
-- Name: factoid_role data_factoid_role_pk_entity_unique; Type: CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.factoid_role
  ADD CONSTRAINT data_factoid_role_pk_entity_unique UNIQUE (pk_entity);

--
-- TOC entry 5400 (class 2606 OID 22037)
-- Name: namespace data_namespace_pk_entity_unique; Type: CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.namespace
  ADD CONSTRAINT data_namespace_pk_entity_unique UNIQUE (pk_entity);

--
-- TOC entry 5638 (class 2606 OID 23066)
-- Name: property_of_property_mapping data_property_of_property_mapping_pk_entity_unique; Type: CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.property_of_property_mapping
  ADD CONSTRAINT data_property_of_property_mapping_pk_entity_unique UNIQUE (pk_entity);

--
-- TOC entry 5643 (class 2606 OID 23123)
-- Name: property_of_property data_property_of_property_pk_entity_unique; Type: CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.property_of_property
  ADD CONSTRAINT data_property_of_property_pk_entity_unique UNIQUE (pk_entity);

--
-- TOC entry 5405 (class 2606 OID 22041)
-- Name: text_property data_text_property_pk_entity_unique; Type: CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.text_property
  ADD CONSTRAINT data_text_property_pk_entity_unique UNIQUE (pk_entity);

--
-- TOC entry 5415 (class 2606 OID 22043)
-- Name: data_association_mapping data_value_association_columns_rel_pk_entity_unique; Type: CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.data_association_mapping
  ADD CONSTRAINT data_value_association_columns_rel_pk_entity_unique UNIQUE (pk_entity);

--
-- TOC entry 5417 (class 2606 OID 22045)
-- Name: values_association data_values_association_pk_entity_unique; Type: CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.values_association
  ADD CONSTRAINT data_values_association_pk_entity_unique UNIQUE (pk_entity);

--
-- TOC entry 5374 (class 2606 OID 24801)
-- Name: digital digital_pkey; Type: CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.digital
  ADD CONSTRAINT digital_pkey PRIMARY KEY (pk_entity);

--
-- TOC entry 5340 (class 2606 OID 22049)
-- Name: entity entity_pkey; Type: CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.entity
  ADD CONSTRAINT entity_pkey PRIMARY KEY (pk_entity);

--
-- TOC entry 5388 (class 2606 OID 24805)
-- Name: factoid_mapping factoid_mapping_pkey; Type: CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.factoid_mapping
  ADD CONSTRAINT factoid_mapping_pkey PRIMARY KEY (pk_entity);

--
-- TOC entry 5383 (class 2606 OID 24803)
-- Name: factoid factoid_pkey; Type: CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.factoid
  ADD CONSTRAINT factoid_pkey PRIMARY KEY (pk_entity);

--
-- TOC entry 5392 (class 2606 OID 24807)
-- Name: factoid_property_mapping factoid_property_mapping_pkey; Type: CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.factoid_property_mapping
  ADD CONSTRAINT factoid_property_mapping_pkey PRIMARY KEY (pk_entity);

--
-- TOC entry 5398 (class 2606 OID 24809)
-- Name: factoid_role factoid_role_pkey; Type: CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.factoid_role
  ADD CONSTRAINT factoid_role_pkey PRIMARY KEY (pk_entity);

--
-- TOC entry 5377 (class 2606 OID 22051)
-- Name: digital information_digital_object_pk_entity_unique; Type: CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.digital
  ADD CONSTRAINT information_digital_object_pk_entity_unique UNIQUE (pk_entity);

--
-- TOC entry 5403 (class 2606 OID 24811)
-- Name: namespace namespace_pkey; Type: CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.namespace
  ADD CONSTRAINT namespace_pkey PRIMARY KEY (pk_entity);

--
-- TOC entry 5641 (class 2606 OID 24815)
-- Name: property_of_property_mapping property_of_property_mapping_pkey; Type: CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.property_of_property_mapping
  ADD CONSTRAINT property_of_property_mapping_pkey PRIMARY KEY (pk_entity);

--
-- TOC entry 5646 (class 2606 OID 24813)
-- Name: property_of_property property_of_property_pkey; Type: CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.property_of_property
  ADD CONSTRAINT property_of_property_pkey PRIMARY KEY (pk_entity);

--
-- TOC entry 5408 (class 2606 OID 24817)
-- Name: text_property text_property_pkey; Type: CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.text_property
  ADD CONSTRAINT text_property_pkey PRIMARY KEY (pk_entity);

--
-- TOC entry 5419 (class 2606 OID 24819)
-- Name: values_association values_association_pkey; Type: CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.values_association
  ADD CONSTRAINT values_association_pkey PRIMARY KEY (pk_entity);

--
-- TOC entry 5687 (class 2606 OID 24821)
-- Name: api_class api_class_pkey; Type: CONSTRAINT; Schema: data_for_history; Owner: -
--
ALTER TABLE ONLY data_for_history.api_class
  ADD CONSTRAINT api_class_pkey PRIMARY KEY (pk_entity);

--
-- TOC entry 5438 (class 2606 OID 24823)
-- Name: api_profile api_profile_pkey; Type: CONSTRAINT; Schema: data_for_history; Owner: -
--
ALTER TABLE ONLY data_for_history.api_profile
  ADD CONSTRAINT api_profile_pkey PRIMARY KEY (pk_entity);

--
-- TOC entry 5693 (class 2606 OID 24825)
-- Name: api_property api_property_pkey; Type: CONSTRAINT; Schema: data_for_history; Owner: -
--
ALTER TABLE ONLY data_for_history.api_property
  ADD CONSTRAINT api_property_pkey PRIMARY KEY (pk_entity);

--
-- TOC entry 5423 (class 2606 OID 24827)
-- Name: associates_system_type_deprecated associates_system_type_deprecated_pkey; Type: CONSTRAINT; Schema: data_for_history; Owner: -
--
ALTER TABLE ONLY data_for_history.associates_system_type_deprecated
  ADD CONSTRAINT associates_system_type_deprecated_pkey PRIMARY KEY (pk_entity);

--
-- TOC entry 5428 (class 2606 OID 24829)
-- Name: class_profile_view_deprecated class_profile_view_deprecated_pkey; Type: CONSTRAINT; Schema: data_for_history; Owner: -
--
ALTER TABLE ONLY data_for_history.class_profile_view_deprecated
  ADD CONSTRAINT class_profile_view_deprecated_pkey PRIMARY KEY (pk_entity);

--
-- TOC entry 5689 (class 2606 OID 24090)
-- Name: api_class data_for_history_api_class_pk_entity_unique; Type: CONSTRAINT; Schema: data_for_history; Owner: -
--
ALTER TABLE ONLY data_for_history.api_class
  ADD CONSTRAINT data_for_history_api_class_pk_entity_unique UNIQUE (pk_entity);

--
-- TOC entry 5695 (class 2606 OID 24114)
-- Name: api_property data_for_history_api_property_pk_entity_unique; Type: CONSTRAINT; Schema: data_for_history; Owner: -
--
ALTER TABLE ONLY data_for_history.api_property
  ADD CONSTRAINT data_for_history_api_property_pk_entity_unique UNIQUE (pk_entity);

--
-- TOC entry 5426 (class 2606 OID 22053)
-- Name: associates_system_type_deprecated data_for_history_associates_system_type_pk_entity_unique; Type: CONSTRAINT; Schema: data_for_history; Owner: -
--
ALTER TABLE ONLY data_for_history.associates_system_type_deprecated
  ADD CONSTRAINT data_for_history_associates_system_type_pk_entity_unique UNIQUE (pk_entity);

--
-- TOC entry 5431 (class 2606 OID 22057)
-- Name: class_profile_view_deprecated data_for_history_class_profile_view_pk_entity_unique; Type: CONSTRAINT; Schema: data_for_history; Owner: -
--
ALTER TABLE ONLY data_for_history.class_profile_view_deprecated
  ADD CONSTRAINT data_for_history_class_profile_view_pk_entity_unique UNIQUE (pk_entity);

--
-- TOC entry 5433 (class 2606 OID 22059)
-- Name: label_deprecated data_for_history_label_pk_entity_unique; Type: CONSTRAINT; Schema: data_for_history; Owner: -
--
ALTER TABLE ONLY data_for_history.label_deprecated
  ADD CONSTRAINT data_for_history_label_pk_entity_unique UNIQUE (pk_entity);

--
-- TOC entry 5440 (class 2606 OID 22061)
-- Name: api_profile data_for_history_profile_pk_entity_unique; Type: CONSTRAINT; Schema: data_for_history; Owner: -
--
ALTER TABLE ONLY data_for_history.api_profile
  ADD CONSTRAINT data_for_history_profile_pk_entity_unique UNIQUE (pk_entity);

--
-- TOC entry 5713 (class 2606 OID 24441)
-- Name: property_of_property data_for_history_property_of_property_pk_entity_unique; Type: CONSTRAINT; Schema: data_for_history; Owner: -
--
ALTER TABLE ONLY data_for_history.property_of_property
  ADD CONSTRAINT data_for_history_property_of_property_pk_entity_unique UNIQUE (pk_entity);

--
-- TOC entry 5445 (class 2606 OID 22063)
-- Name: property data_for_history_property_pk_entity_unique; Type: CONSTRAINT; Schema: data_for_history; Owner: -
--
ALTER TABLE ONLY data_for_history.property
  ADD CONSTRAINT data_for_history_property_pk_entity_unique UNIQUE (pk_entity);

--
-- TOC entry 5450 (class 2606 OID 22065)
-- Name: property_profile_view_deprecated data_for_history_property_profile_view_pk_entity_unique; Type: CONSTRAINT; Schema: data_for_history; Owner: -
--
ALTER TABLE ONLY data_for_history.property_profile_view_deprecated
  ADD CONSTRAINT data_for_history_property_profile_view_pk_entity_unique UNIQUE (pk_entity);

--
-- TOC entry 5455 (class 2606 OID 22067)
-- Name: system_type_deprecated data_for_history_system_type_pk_entity_unique; Type: CONSTRAINT; Schema: data_for_history; Owner: -
--
ALTER TABLE ONLY data_for_history.system_type_deprecated
  ADD CONSTRAINT data_for_history_system_type_pk_entity_unique UNIQUE (pk_entity);

--
-- TOC entry 5460 (class 2606 OID 22069)
-- Name: text_property_deprecated data_for_history_text_property_pk_entity_unique; Type: CONSTRAINT; Schema: data_for_history; Owner: -
--
ALTER TABLE ONLY data_for_history.text_property_deprecated
  ADD CONSTRAINT data_for_history_text_property_pk_entity_unique UNIQUE (pk_entity);

--
-- TOC entry 5421 (class 2606 OID 22071)
-- Name: entity entity_pkey; Type: CONSTRAINT; Schema: data_for_history; Owner: -
--
ALTER TABLE ONLY data_for_history.entity
  ADD CONSTRAINT entity_pkey PRIMARY KEY (pk_entity);

--
-- TOC entry 5435 (class 2606 OID 24831)
-- Name: label_deprecated label_deprecated_pkey; Type: CONSTRAINT; Schema: data_for_history; Owner: -
--
ALTER TABLE ONLY data_for_history.label_deprecated
  ADD CONSTRAINT label_deprecated_pkey PRIMARY KEY (pk_entity);

--
-- TOC entry 5715 (class 2606 OID 24439)
-- Name: property_of_property property_of_property_has_domain_pk_property_of_property_has_key; Type: CONSTRAINT; Schema: data_for_history; Owner: -
--
ALTER TABLE ONLY data_for_history.property_of_property
  ADD CONSTRAINT property_of_property_has_domain_pk_property_of_property_has_key UNIQUE (has_domain, pk_property_of_property, has_range);

--
-- TOC entry 5717 (class 2606 OID 24437)
-- Name: property_of_property property_of_property_pk_entity_key; Type: CONSTRAINT; Schema: data_for_history; Owner: -
--
ALTER TABLE ONLY data_for_history.property_of_property
  ADD CONSTRAINT property_of_property_pk_entity_key UNIQUE (pk_entity);

--
-- TOC entry 5719 (class 2606 OID 24833)
-- Name: property_of_property property_of_property_pkey; Type: CONSTRAINT; Schema: data_for_history; Owner: -
--
ALTER TABLE ONLY data_for_history.property_of_property
  ADD CONSTRAINT property_of_property_pkey PRIMARY KEY (pk_entity);

--
-- TOC entry 5452 (class 2606 OID 24835)
-- Name: property_profile_view_deprecated property_profile_view_deprecated_pkey; Type: CONSTRAINT; Schema: data_for_history; Owner: -
--
ALTER TABLE ONLY data_for_history.property_profile_view_deprecated
  ADD CONSTRAINT property_profile_view_deprecated_pkey PRIMARY KEY (pk_entity);

--
-- TOC entry 5457 (class 2606 OID 24837)
-- Name: system_type_deprecated system_type_deprecated_pkey; Type: CONSTRAINT; Schema: data_for_history; Owner: -
--
ALTER TABLE ONLY data_for_history.system_type_deprecated
  ADD CONSTRAINT system_type_deprecated_pkey PRIMARY KEY (pk_entity);

--
-- TOC entry 5462 (class 2606 OID 24839)
-- Name: text_property_deprecated text_property_deprecated_pkey; Type: CONSTRAINT; Schema: data_for_history; Owner: -
--
ALTER TABLE ONLY data_for_history.text_property_deprecated
  ADD CONSTRAINT text_property_deprecated_pkey PRIMARY KEY (pk_entity);

--
-- TOC entry 5443 (class 2606 OID 24051)
-- Name: api_profile unique_dfh_pk_profile_requested_language; Type: CONSTRAINT; Schema: data_for_history; Owner: -
--
ALTER TABLE ONLY data_for_history.api_profile
  ADD CONSTRAINT unique_dfh_pk_profile_requested_language UNIQUE (dfh_pk_profile, requested_language);

--
-- TOC entry 5448 (class 2606 OID 22077)
-- Name: property unique_dfh_pk_property; Type: CONSTRAINT; Schema: data_for_history; Owner: -
--
ALTER TABLE ONLY data_for_history.property
  ADD CONSTRAINT unique_dfh_pk_property UNIQUE (dfh_pk_property);

--
-- TOC entry 5691 (class 2606 OID 24103)
-- Name: api_class unique_requested_language_dfh_pk_class_dfh_fk_profile; Type: CONSTRAINT; Schema: data_for_history; Owner: -
--
ALTER TABLE ONLY data_for_history.api_class
  ADD CONSTRAINT unique_requested_language_dfh_pk_class_dfh_fk_profile UNIQUE (requested_language, dfh_pk_class, dfh_fk_profile);

--
-- TOC entry 5697 (class 2606 OID 24127)
-- Name: api_property unique_requested_language_dfh_pk_property_dfh_fk_profile; Type: CONSTRAINT; Schema: data_for_history; Owner: -
--
ALTER TABLE ONLY data_for_history.api_property
  ADD CONSTRAINT unique_requested_language_dfh_pk_property_dfh_fk_profile UNIQUE (requested_language, dfh_pk_property, dfh_property_domain, dfh_property_range, dfh_fk_profile);

--
-- TOC entry 5470 (class 2606 OID 24841)
-- Name: _backup_entity_association _backup_entity_association_pkey; Type: CONSTRAINT; Schema: information; Owner: -
--
ALTER TABLE ONLY information._backup_entity_association
  ADD CONSTRAINT _backup_entity_association_pkey PRIMARY KEY (pk_entity);

--
-- TOC entry 5466 (class 2606 OID 24843)
-- Name: appellation appellation_pkey; Type: CONSTRAINT; Schema: information; Owner: -
--
ALTER TABLE ONLY information.appellation
  ADD CONSTRAINT appellation_pkey PRIMARY KEY (pk_entity);

--
-- TOC entry 5649 (class 2606 OID 24845)
-- Name: dimension dimension_pkey; Type: CONSTRAINT; Schema: information; Owner: -
--
ALTER TABLE ONLY information.dimension
  ADD CONSTRAINT dimension_pkey PRIMARY KEY (pk_entity);

--
-- TOC entry 5329 (class 2606 OID 22083)
-- Name: entity entity_pkey; Type: CONSTRAINT; Schema: information; Owner: -
--
ALTER TABLE ONLY information.entity
  ADD CONSTRAINT entity_pkey PRIMARY KEY (pk_entity);

--
-- TOC entry 5468 (class 2606 OID 22085)
-- Name: appellation information_appellation_pk_entity_unique; Type: CONSTRAINT; Schema: information; Owner: -
--
ALTER TABLE ONLY information.appellation
  ADD CONSTRAINT information_appellation_pk_entity_unique UNIQUE (pk_entity);

--
-- TOC entry 5651 (class 2606 OID 23164)
-- Name: dimension information_dimension_pk_entity_unique; Type: CONSTRAINT; Schema: information; Owner: -
--
ALTER TABLE ONLY information.dimension
  ADD CONSTRAINT information_dimension_pk_entity_unique UNIQUE (pk_entity);

--
-- TOC entry 5477 (class 2606 OID 22087)
-- Name: _backup_entity_association information_entity_association_pk_entity_unique; Type: CONSTRAINT; Schema: information; Owner: -
--
ALTER TABLE ONLY information._backup_entity_association
  ADD CONSTRAINT information_entity_association_pk_entity_unique UNIQUE (pk_entity);

--
-- TOC entry 5705 (class 2606 OID 24411)
-- Name: lang_string information_lang_string_pk_entity_unique; Type: CONSTRAINT; Schema: information; Owner: -
--
ALTER TABLE ONLY information.lang_string
  ADD CONSTRAINT information_lang_string_pk_entity_unique UNIQUE (pk_entity);

--
-- TOC entry 5479 (class 2606 OID 22089)
-- Name: language information_language_pk_entity_unique; Type: CONSTRAINT; Schema: information; Owner: -
--
ALTER TABLE ONLY information.language
  ADD CONSTRAINT information_language_pk_entity_unique UNIQUE (pk_entity);

--
-- TOC entry 5484 (class 2606 OID 22093)
-- Name: persistent_item_backup information_persistent_item_pk_entity_unique; Type: CONSTRAINT; Schema: information; Owner: -
--
ALTER TABLE ONLY information.persistent_item_backup
  ADD CONSTRAINT information_persistent_item_pk_entity_unique UNIQUE (pk_entity);

--
-- TOC entry 5487 (class 2606 OID 22095)
-- Name: place information_place_pk_entity_unique; Type: CONSTRAINT; Schema: information; Owner: -
--
ALTER TABLE ONLY information.place
  ADD CONSTRAINT information_place_pk_entity_unique UNIQUE (pk_entity);

--
-- TOC entry 5757 (class 2606 OID 24654)
-- Name: resource information_resource_pk_entity_unique; Type: CONSTRAINT; Schema: information; Owner: -
--
ALTER TABLE ONLY information.resource
  ADD CONSTRAINT information_resource_pk_entity_unique UNIQUE (pk_entity);

--
-- TOC entry 5492 (class 2606 OID 22099)
-- Name: statement information_statement_pk_entity_unique; Type: CONSTRAINT; Schema: information; Owner: -
--
ALTER TABLE ONLY information.statement
  ADD CONSTRAINT information_statement_pk_entity_unique UNIQUE (pk_entity);

--
-- TOC entry 5331 (class 2606 OID 22101)
-- Name: temporal_entity_backup information_temporal_entity_pk_entity_unique; Type: CONSTRAINT; Schema: information; Owner: -
--
ALTER TABLE ONLY information.temporal_entity_backup
  ADD CONSTRAINT information_temporal_entity_pk_entity_unique UNIQUE (pk_entity);

--
-- TOC entry 5502 (class 2606 OID 22103)
-- Name: text_property information_text_property_pk_entity_unique; Type: CONSTRAINT; Schema: information; Owner: -
--
ALTER TABLE ONLY information.text_property
  ADD CONSTRAINT information_text_property_pk_entity_unique UNIQUE (pk_entity);

--
-- TOC entry 5512 (class 2606 OID 22105)
-- Name: time_primitive information_time_primitive_pk_entity_unique; Type: CONSTRAINT; Schema: information; Owner: -
--
ALTER TABLE ONLY information.time_primitive
  ADD CONSTRAINT information_time_primitive_pk_entity_unique UNIQUE (pk_entity);

--
-- TOC entry 5709 (class 2606 OID 24847)
-- Name: lang_string lang_string_pkey; Type: CONSTRAINT; Schema: information; Owner: -
--
ALTER TABLE ONLY information.lang_string
  ADD CONSTRAINT lang_string_pkey PRIMARY KEY (pk_entity);

--
-- TOC entry 5482 (class 2606 OID 22109)
-- Name: language language_pkey; Type: CONSTRAINT; Schema: information; Owner: -
--
ALTER TABLE ONLY information.language
  ADD CONSTRAINT language_pkey PRIMARY KEY (pk_language);

--
-- TOC entry 5490 (class 2606 OID 24849)
-- Name: place place_pkey; Type: CONSTRAINT; Schema: information; Owner: -
--
ALTER TABLE ONLY information.place
  ADD CONSTRAINT place_pkey PRIMARY KEY (pk_entity);

--
-- TOC entry 5761 (class 2606 OID 24851)
-- Name: resource resource_pkey; Type: CONSTRAINT; Schema: information; Owner: -
--
ALTER TABLE ONLY information.resource
  ADD CONSTRAINT resource_pkey PRIMARY KEY (pk_entity);

--
-- TOC entry 5500 (class 2606 OID 24853)
-- Name: statement statement_pkey; Type: CONSTRAINT; Schema: information; Owner: -
--
ALTER TABLE ONLY information.statement
  ADD CONSTRAINT statement_pkey PRIMARY KEY (pk_entity);

--
-- TOC entry 5505 (class 2606 OID 22117)
-- Name: text_property text_property_identity_unique; Type: CONSTRAINT; Schema: information; Owner: -
--
ALTER TABLE ONLY information.text_property
  ADD CONSTRAINT text_property_identity_unique UNIQUE (fk_class_field, fk_language, fk_concerned_entity, _deprecated_text_property_quill_doc);

--
-- TOC entry 5508 (class 2606 OID 24855)
-- Name: text_property text_property_pkey; Type: CONSTRAINT; Schema: information; Owner: -
--
ALTER TABLE ONLY information.text_property
  ADD CONSTRAINT text_property_pkey PRIMARY KEY (pk_entity);

--
-- TOC entry 5515 (class 2606 OID 24857)
-- Name: time_primitive time_primitive_pkey; Type: CONSTRAINT; Schema: information; Owner: -
--
ALTER TABLE ONLY information.time_primitive
  ADD CONSTRAINT time_primitive_pkey PRIMARY KEY (pk_entity);

--
-- TOC entry 5517 (class 2606 OID 24694)
-- Name: time_primitive time_primitive_unique_constraint; Type: CONSTRAINT; Schema: information; Owner: -
--
ALTER TABLE ONLY information.time_primitive
  ADD CONSTRAINT time_primitive_unique_constraint UNIQUE (julian_day, duration, calendar, fk_class);

--
-- TOC entry 5711 (class 2606 OID 24409)
-- Name: lang_string unique__fk_language__fk_class__string; Type: CONSTRAINT; Schema: information; Owner: -
--
ALTER TABLE ONLY information.lang_string
  ADD CONSTRAINT unique__fk_language__fk_class__string UNIQUE (fk_language, fk_class, string);

--
-- TOC entry 5679 (class 2606 OID 24859)
-- Name: _backup_class_field_config _backup_class_field_config_pkey; Type: CONSTRAINT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects._backup_class_field_config
  ADD CONSTRAINT _backup_class_field_config_pkey PRIMARY KEY (pk_entity);

--
-- TOC entry 5675 (class 2606 OID 24861)
-- Name: analysis analysis_pkey; Type: CONSTRAINT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects.analysis
  ADD CONSTRAINT analysis_pkey PRIMARY KEY (pk_entity);

--
-- TOC entry 5548 (class 2606 OID 24863)
-- Name: argument argument_pkey; Type: CONSTRAINT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects.argument
  ADD CONSTRAINT argument_pkey PRIMARY KEY (pk_entity);

--
-- TOC entry 5536 (class 2606 OID 24865)
-- Name: class_field_config class_field_config_pkey; Type: CONSTRAINT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects.class_field_config
  ADD CONSTRAINT class_field_config_pkey PRIMARY KEY (pk_entity);

--
-- TOC entry 5550 (class 2606 OID 22123)
-- Name: argument commons_assertion_pk_entity_unique; Type: CONSTRAINT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects.argument
  ADD CONSTRAINT commons_assertion_pk_entity_unique UNIQUE (pk_entity);

--
-- TOC entry 5559 (class 2606 OID 22127)
-- Name: project commons_project_pk_entity_unique; Type: CONSTRAINT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects.project
  ADD CONSTRAINT commons_project_pk_entity_unique UNIQUE (pk_entity);

--
-- TOC entry 5564 (class 2606 OID 22129)
-- Name: query commons_query_pk_entity_unique; Type: CONSTRAINT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects.query
  ADD CONSTRAINT commons_query_pk_entity_unique UNIQUE (pk_entity);

--
-- TOC entry 5571 (class 2606 OID 22131)
-- Name: text_property commons_text_property_pk_entity_unique; Type: CONSTRAINT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects.text_property
  ADD CONSTRAINT commons_text_property_pk_entity_unique UNIQUE (pk_entity);

--
-- TOC entry 5538 (class 2606 OID 22133)
-- Name: class_field_config commons_ui_context_config_pk_entity_unique; Type: CONSTRAINT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects.class_field_config
  ADD CONSTRAINT commons_ui_context_config_pk_entity_unique UNIQUE (pk_entity);

--
-- TOC entry 5582 (class 2606 OID 22135)
-- Name: visual commons_visual_pk_entity_unique; Type: CONSTRAINT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects.visual
  ADD CONSTRAINT commons_visual_pk_entity_unique UNIQUE (pk_entity);

--
-- TOC entry 5552 (class 2606 OID 22137)
-- Name: dfh_class_proj_rel data_for_history_proj_rel_pk_entity; Type: CONSTRAINT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects.dfh_class_proj_rel
  ADD CONSTRAINT data_for_history_proj_rel_pk_entity PRIMARY KEY (pk_entity);

--
-- TOC entry 5555 (class 2606 OID 24154)
-- Name: dfh_class_proj_rel dfh_class_project_rel__class_and_project_unique; Type: CONSTRAINT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects.dfh_class_proj_rel
  ADD CONSTRAINT dfh_class_project_rel__class_and_project_unique UNIQUE (fk_class, fk_project);

--
-- TOC entry 5681 (class 2606 OID 24867)
-- Name: dfh_profile_proj_rel dfh_profile_proj_rel_pkey; Type: CONSTRAINT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects.dfh_profile_proj_rel
  ADD CONSTRAINT dfh_profile_proj_rel_pkey PRIMARY KEY (pk_entity);

--
-- TOC entry 5737 (class 2606 OID 24869)
-- Name: entity_label_config entity_label_config_pkey; Type: CONSTRAINT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects.entity_label_config
  ADD CONSTRAINT entity_label_config_pkey PRIMARY KEY (pk_entity);

--
-- TOC entry 5519 (class 2606 OID 22141)
-- Name: entity entity_pkey; Type: CONSTRAINT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects.entity
  ADD CONSTRAINT entity_pkey PRIMARY KEY (pk_entity);

--
-- TOC entry 5521 (class 2606 OID 22143)
-- Name: info_proj_rel entity_version_project_rel_fk_entity_fk_project_key; Type: CONSTRAINT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects.info_proj_rel
  ADD CONSTRAINT entity_version_project_rel_fk_entity_fk_project_key UNIQUE (fk_entity, fk_project);

--
-- TOC entry 5523 (class 2606 OID 22145)
-- Name: info_proj_rel entity_version_project_rel_fk_entity_version_concat_fk_proj_key; Type: CONSTRAINT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects.info_proj_rel
  ADD CONSTRAINT entity_version_project_rel_fk_entity_version_concat_fk_proj_key UNIQUE (fk_entity_version_concat, fk_project);

--
-- TOC entry 5529 (class 2606 OID 24871)
-- Name: info_proj_rel info_proj_rel_pkey; Type: CONSTRAINT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects.info_proj_rel
  ADD CONSTRAINT info_proj_rel_pkey PRIMARY KEY (fk_entity, fk_project);

--
-- TOC entry 5532 (class 2606 OID 22149)
-- Name: info_proj_rel information_entity_version_project_rel_pk_entity_unique; Type: CONSTRAINT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects.info_proj_rel
  ADD CONSTRAINT information_entity_version_project_rel_pk_entity_unique UNIQUE (pk_entity);

--
-- TOC entry 5557 (class 2606 OID 22153)
-- Name: language language_pkey; Type: CONSTRAINT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects.language
  ADD CONSTRAINT language_pkey PRIMARY KEY (pk_language);

--
-- TOC entry 5562 (class 2606 OID 24873)
-- Name: project project_pkey; Type: CONSTRAINT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects.project
  ADD CONSTRAINT project_pkey PRIMARY KEY (pk_entity);

--
-- TOC entry 5677 (class 2606 OID 23996)
-- Name: analysis projects_analysis_pk_entity_unique; Type: CONSTRAINT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects.analysis
  ADD CONSTRAINT projects_analysis_pk_entity_unique UNIQUE (pk_entity);

--
-- TOC entry 5683 (class 2606 OID 24066)
-- Name: dfh_profile_proj_rel projects_dfh_profile_proj_rel_pk_entity_unique; Type: CONSTRAINT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects.dfh_profile_proj_rel
  ADD CONSTRAINT projects_dfh_profile_proj_rel_pk_entity_unique UNIQUE (pk_entity);

--
-- TOC entry 5739 (class 2606 OID 24542)
-- Name: entity_label_config projects_entity_label_config_pk_entity_unique; Type: CONSTRAINT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects.entity_label_config
  ADD CONSTRAINT projects_entity_label_config_pk_entity_unique UNIQUE (pk_entity);

--
-- TOC entry 5653 (class 2606 OID 23758)
-- Name: property_label_deprecated projects_property_label_pk_entity_unique; Type: CONSTRAINT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects.property_label_deprecated
  ADD CONSTRAINT projects_property_label_pk_entity_unique UNIQUE (pk_entity);

--
-- TOC entry 5751 (class 2606 OID 24608)
-- Name: table_config projects_table_config_pk_entity_unique; Type: CONSTRAINT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects.table_config
  ADD CONSTRAINT projects_table_config_pk_entity_unique UNIQUE (pk_entity);

--
-- TOC entry 5783 (class 2606 OID 24987)
-- Name: visibility_settings projects_visibility_settings_pk_entity_unique; Type: CONSTRAINT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects.visibility_settings
  ADD CONSTRAINT projects_visibility_settings_pk_entity_unique UNIQUE (pk_entity);

--
-- TOC entry 5655 (class 2606 OID 24875)
-- Name: property_label_deprecated property_label_deprecated_pkey; Type: CONSTRAINT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects.property_label_deprecated
  ADD CONSTRAINT property_label_deprecated_pkey PRIMARY KEY (pk_entity);

--
-- TOC entry 5566 (class 2606 OID 22157)
-- Name: query query__unique_name_per_project; Type: CONSTRAINT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects.query
  ADD CONSTRAINT query__unique_name_per_project UNIQUE (name, fk_project);

--
-- TOC entry 5569 (class 2606 OID 24877)
-- Name: query query_pkey; Type: CONSTRAINT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects.query
  ADD CONSTRAINT query_pkey PRIMARY KEY (pk_entity);

--
-- TOC entry 5753 (class 2606 OID 24879)
-- Name: table_config table_config_pkey; Type: CONSTRAINT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects.table_config
  ADD CONSTRAINT table_config_pkey PRIMARY KEY (pk_entity);

--
-- TOC entry 5574 (class 2606 OID 24881)
-- Name: text_property text_property_pkey; Type: CONSTRAINT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects.text_property
  ADD CONSTRAINT text_property_pkey PRIMARY KEY (pk_entity);

--
-- TOC entry 5577 (class 2606 OID 24560)
-- Name: text_property uniq_incoming_property_label; Type: CONSTRAINT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects.text_property
  ADD CONSTRAINT uniq_incoming_property_label UNIQUE (fk_project, fk_dfh_property, fk_dfh_property_range, fk_language);

--
-- TOC entry 5579 (class 2606 OID 24558)
-- Name: text_property uniq_outgoing_property_label; Type: CONSTRAINT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects.text_property
  ADD CONSTRAINT uniq_outgoing_property_label UNIQUE (fk_project, fk_dfh_property, fk_dfh_property_domain, fk_language);

--
-- TOC entry 5685 (class 2606 OID 24079)
-- Name: dfh_profile_proj_rel unique_fk_project_fk_profile; Type: CONSTRAINT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects.dfh_profile_proj_rel
  ADD CONSTRAINT unique_fk_project_fk_profile UNIQUE (fk_project, fk_profile);

--
-- TOC entry 5785 (class 2606 OID 24980)
-- Name: visibility_settings visibility_settings_fk_project_key; Type: CONSTRAINT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects.visibility_settings
  ADD CONSTRAINT visibility_settings_fk_project_key UNIQUE (fk_project);

--
-- TOC entry 5584 (class 2606 OID 22161)
-- Name: visual visual__unique_name_per_project; Type: CONSTRAINT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects.visual
  ADD CONSTRAINT visual__unique_name_per_project UNIQUE (name, fk_project);

--
-- TOC entry 5586 (class 2606 OID 24883)
-- Name: visual visual_pkey; Type: CONSTRAINT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects.visual
  ADD CONSTRAINT visual_pkey PRIMARY KEY (pk_entity);

--
-- TOC entry 5588 (class 2606 OID 22163)
-- Name: accesstoken accesstoken_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY public.accesstoken
  ADD CONSTRAINT accesstoken_pkey PRIMARY KEY (id);

--
-- TOC entry 5590 (class 2606 OID 22165)
-- Name: account account_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY public.account
  ADD CONSTRAINT account_email_key UNIQUE (email);

--
-- TOC entry 5592 (class 2606 OID 22167)
-- Name: account account_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY public.account
  ADD CONSTRAINT account_pkey PRIMARY KEY (id);

--
-- TOC entry 5596 (class 2606 OID 22169)
-- Name: account_project_rel account_project_rel_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY public.account_project_rel
  ADD CONSTRAINT account_project_rel_pkey PRIMARY KEY (id);

--
-- TOC entry 5594 (class 2606 OID 22171)
-- Name: account account_username_key; Type: CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY public.account
  ADD CONSTRAINT account_username_key UNIQUE (username);

--
-- TOC entry 5598 (class 2606 OID 22173)
-- Name: acl acl_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY public.acl
  ADD CONSTRAINT acl_pkey PRIMARY KEY (id);

--
-- TOC entry 5727 (class 2606 OID 24484)
-- Name: credential credential_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY public.credential
  ADD CONSTRAINT credential_pkey PRIMARY KEY (id);

--
-- TOC entry 5600 (class 2606 OID 22175)
-- Name: role role_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY public.role
  ADD CONSTRAINT role_pkey PRIMARY KEY (id);

--
-- TOC entry 5602 (class 2606 OID 22177)
-- Name: rolemapping rolemapping_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY public.rolemapping
  ADD CONSTRAINT rolemapping_pkey PRIMARY KEY (id);

--
-- TOC entry 5671 (class 2606 OID 24885)
-- Name: analysis_type_deprecated analysis_type_deprecated_pkey; Type: CONSTRAINT; Schema: system; Owner: -
--
ALTER TABLE ONLY system.analysis_type_deprecated
  ADD CONSTRAINT analysis_type_deprecated_pkey PRIMARY KEY (pk_entity);

--
-- TOC entry 5605 (class 2606 OID 24887)
-- Name: app_context app_context_pkey; Type: CONSTRAINT; Schema: system; Owner: -
--
ALTER TABLE ONLY system.app_context
  ADD CONSTRAINT app_context_pkey PRIMARY KEY (pk_entity);

--
-- TOC entry 5543 (class 2606 OID 24889)
-- Name: class_field class_field_pkey; Type: CONSTRAINT; Schema: system; Owner: -
--
ALTER TABLE ONLY system.class_field
  ADD CONSTRAINT class_field_pkey PRIMARY KEY (pk_entity);

--
-- TOC entry 5610 (class 2606 OID 24891)
-- Name: class_field_property_rel class_field_property_rel_pkey; Type: CONSTRAINT; Schema: system; Owner: -
--
ALTER TABLE ONLY system.class_field_property_rel
  ADD CONSTRAINT class_field_property_rel_pkey PRIMARY KEY (pk_entity);

--
-- TOC entry 5614 (class 2606 OID 22179)
-- Name: class_has_type_property class_has_type_property_fk_class_key; Type: CONSTRAINT; Schema: system; Owner: -
--
ALTER TABLE ONLY system.class_has_type_property
  ADD CONSTRAINT class_has_type_property_fk_class_key UNIQUE (fk_class);

--
-- TOC entry 5617 (class 2606 OID 24893)
-- Name: class_has_type_property class_has_type_property_pkey; Type: CONSTRAINT; Schema: system; Owner: -
--
ALTER TABLE ONLY system.class_has_type_property
  ADD CONSTRAINT class_has_type_property_pkey PRIMARY KEY (pk_entity);

--
-- TOC entry 5619 (class 2606 OID 22181)
-- Name: class_has_type_property commons_class_has_type_property_pk_entity_unique; Type: CONSTRAINT; Schema: system; Owner: -
--
ALTER TABLE ONLY system.class_has_type_property
  ADD CONSTRAINT commons_class_has_type_property_pk_entity_unique UNIQUE (pk_entity);

--
-- TOC entry 5545 (class 2606 OID 22183)
-- Name: class_field commons_property_set_pk_entity_unique; Type: CONSTRAINT; Schema: system; Owner: -
--
ALTER TABLE ONLY system.class_field
  ADD CONSTRAINT commons_property_set_pk_entity_unique UNIQUE (pk_entity);

--
-- TOC entry 5612 (class 2606 OID 22185)
-- Name: class_field_property_rel commons_property_set_property_rel_pk_entity_unique; Type: CONSTRAINT; Schema: system; Owner: -
--
ALTER TABLE ONLY system.class_field_property_rel
  ADD CONSTRAINT commons_property_set_property_rel_pk_entity_unique UNIQUE (pk_entity);

--
-- TOC entry 5631 (class 2606 OID 22187)
-- Name: system_type commons_system_type_pk_entity_unique; Type: CONSTRAINT; Schema: system; Owner: -
--
ALTER TABLE ONLY system.system_type
  ADD CONSTRAINT commons_system_type_pk_entity_unique UNIQUE (pk_entity);

--
-- TOC entry 5607 (class 2606 OID 22189)
-- Name: app_context commons_ui_context_pk_entity_unique; Type: CONSTRAINT; Schema: system; Owner: -
--
ALTER TABLE ONLY system.app_context
  ADD CONSTRAINT commons_ui_context_pk_entity_unique UNIQUE (pk_entity);

--
-- TOC entry 5729 (class 2606 OID 24895)
-- Name: config config_pkey; Type: CONSTRAINT; Schema: system; Owner: -
--
ALTER TABLE ONLY system.config
  ADD CONSTRAINT config_pkey PRIMARY KEY (pk_entity);

--
-- TOC entry 5540 (class 2606 OID 22191)
-- Name: entity entity_pkey; Type: CONSTRAINT; Schema: system; Owner: -
--
ALTER TABLE ONLY system.entity
  ADD CONSTRAINT entity_pkey PRIMARY KEY (pk_entity);

--
-- TOC entry 5673 (class 2606 OID 23965)
-- Name: analysis_type_deprecated system_analysis_type_pk_entity_unique; Type: CONSTRAINT; Schema: system; Owner: -
--
ALTER TABLE ONLY system.analysis_type_deprecated
  ADD CONSTRAINT system_analysis_type_pk_entity_unique UNIQUE (pk_entity);

--
-- TOC entry 5731 (class 2606 OID 24501)
-- Name: config system_config_pk_entity_unique; Type: CONSTRAINT; Schema: system; Owner: -
--
ALTER TABLE ONLY system.config
  ADD CONSTRAINT system_config_pk_entity_unique UNIQUE (pk_entity);

--
-- TOC entry 5622 (class 2606 OID 24897)
-- Name: system_relevant_class system_relevant_class_pkey; Type: CONSTRAINT; Schema: system; Owner: -
--
ALTER TABLE ONLY system.system_relevant_class
  ADD CONSTRAINT system_relevant_class_pkey PRIMARY KEY (pk_entity);

--
-- TOC entry 5627 (class 2606 OID 24899)
-- Name: system_relevant_type system_relevant_type_pkey; Type: CONSTRAINT; Schema: system; Owner: -
--
ALTER TABLE ONLY system.system_relevant_type
  ADD CONSTRAINT system_relevant_type_pkey PRIMARY KEY (pk_entity);

--
-- TOC entry 5624 (class 2606 OID 22193)
-- Name: system_relevant_class system_system_relevant_class_pk_entity_unique; Type: CONSTRAINT; Schema: system; Owner: -
--
ALTER TABLE ONLY system.system_relevant_class
  ADD CONSTRAINT system_system_relevant_class_pk_entity_unique UNIQUE (pk_entity);

--
-- TOC entry 5629 (class 2606 OID 22195)
-- Name: system_relevant_type system_system_relevant_type_pk_entity_unique; Type: CONSTRAINT; Schema: system; Owner: -
--
ALTER TABLE ONLY system.system_relevant_type
  ADD CONSTRAINT system_system_relevant_type_pk_entity_unique UNIQUE (pk_entity);

--
-- TOC entry 5634 (class 2606 OID 24901)
-- Name: system_type system_type_pkey; Type: CONSTRAINT; Schema: system; Owner: -
--
ALTER TABLE ONLY system.system_type
  ADD CONSTRAINT system_type_pkey PRIMARY KEY (pk_entity);

--
-- TOC entry 5636 (class 2606 OID 22197)
-- Name: system_type unique_note; Type: CONSTRAINT; Schema: system; Owner: -
--
ALTER TABLE ONLY system.system_type
  ADD CONSTRAINT unique_note UNIQUE (notes);

--
-- TOC entry 5660 (class 2606 OID 23806)
-- Name: cell cell_pk_cell_primary_key; Type: CONSTRAINT; Schema: tables; Owner: -
--
ALTER TABLE ONLY tables.cell
  ADD CONSTRAINT cell_pk_cell_primary_key PRIMARY KEY (pk_cell);

--
-- TOC entry 5667 (class 2606 OID 23826)
-- Name: quill_doc_cell quill_doc_cell_pk_cell_primary_key; Type: CONSTRAINT; Schema: tables; Owner: -
--
ALTER TABLE ONLY tables.quill_doc_cell
  ADD CONSTRAINT quill_doc_cell_pk_cell_primary_key PRIMARY KEY (pk_cell);

--
-- TOC entry 5755 (class 2606 OID 24630)
-- Name: row row_pkey; Type: CONSTRAINT; Schema: tables; Owner: -
--
ALTER TABLE ONLY tables."row"
  ADD CONSTRAINT row_pkey PRIMARY KEY (pk_row);

--
-- TOC entry 5733 (class 2606 OID 24903)
-- Name: class_preview class_preview_pkey; Type: CONSTRAINT; Schema: war; Owner: -
--
ALTER TABLE ONLY war.class_preview
  ADD CONSTRAINT class_preview_pkey PRIMARY KEY (fk_class, fk_project);

--
-- TOC entry 5773 (class 2606 OID 24958)
-- Name: entity_preview_template entity_preview_template_pkey; Type: CONSTRAINT; Schema: war; Owner: -
--
ALTER TABLE ONLY war.entity_preview_template
  ADD CONSTRAINT entity_preview_template_pkey PRIMARY KEY (entity_id, project_id);

--
-- TOC entry 5763 (class 2606 OID 24926)
-- Name: field_change_template field_change_pkey; Type: CONSTRAINT; Schema: war; Owner: -
--
ALTER TABLE ONLY war.field_change_template
  ADD CONSTRAINT field_change_pkey PRIMARY KEY (fk_project, fk_source_info, fk_source_tables_cell, fk_property, fk_property_of_property, is_outgoing);

--
-- TOC entry 5747 (class 2606 OID 24579)
-- Name: statement_backup statement_pk_entity_project_key; Type: CONSTRAINT; Schema: war; Owner: -
--
ALTER TABLE ONLY war.statement_backup
  ADD CONSTRAINT statement_pk_entity_project_key UNIQUE (pk_entity, project);

--
-- TOC entry 5749 (class 2606 OID 24907)
-- Name: statement_backup statement_pkey; Type: CONSTRAINT; Schema: war; Owner: -
--
ALTER TABLE ONLY war.statement_backup
  ADD CONSTRAINT statement_pkey PRIMARY KEY (pk_entity, project);

--
-- TOC entry 5771 (class 2606 OID 24936)
-- Name: statement_template statement_template_pkey; Type: CONSTRAINT; Schema: war; Owner: -
--
ALTER TABLE ONLY war.statement_template
  ADD CONSTRAINT statement_template_pkey PRIMARY KEY (pk_entity, project);

--
-- TOC entry 5735 (class 2606 OID 24529)
-- Name: class_preview war_class_preview_unique; Type: CONSTRAINT; Schema: war; Owner: -
--
ALTER TABLE ONLY war.class_preview
  ADD CONSTRAINT war_class_preview_unique UNIQUE (fk_class, fk_project);

--
-- TOC entry 5703 (class 2606 OID 24206)
-- Name: entity_preview war_entity_preview_unique; Type: CONSTRAINT; Schema: war; Owner: -
--
ALTER TABLE ONLY war.entity_preview
  ADD CONSTRAINT war_entity_preview_unique UNIQUE (pk_entity, project);

--
-- TOC entry 5335 (class 1259 OID 23542)
-- Name: text_string_idx; Type: INDEX; Schema: commons; Owner: -
--
CREATE INDEX text_string_idx ON commons.text USING btree(string);

--
-- TOC entry 5338 (class 1259 OID 23543)
-- Name: text_vt_string_idx; Type: INDEX; Schema: commons; Owner: -
--
CREATE INDEX text_vt_string_idx ON commons.text_vt USING btree(string);

--
-- TOC entry 5341 (class 1259 OID 23572)
-- Name: avatar_pk_entity_idx; Type: INDEX; Schema: data; Owner: -
--
CREATE INDEX avatar_pk_entity_idx ON data.avatar USING btree(pk_entity);

--
-- TOC entry 5346 (class 1259 OID 23573)
-- Name: chunk_pk_entity_idx; Type: INDEX; Schema: data; Owner: -
--
CREATE INDEX chunk_pk_entity_idx ON data.chunk USING btree(pk_entity);

--
-- TOC entry 5349 (class 1259 OID 23554)
-- Name: chunk_string_idx; Type: INDEX; Schema: data; Owner: -
--
CREATE INDEX chunk_string_idx ON data.chunk USING btree(string);

--
-- TOC entry 5352 (class 1259 OID 23555)
-- Name: chunk_vt_string_idx; Type: INDEX; Schema: data; Owner: -
--
CREATE INDEX chunk_vt_string_idx ON data.chunk_vt USING btree(string);

--
-- TOC entry 5353 (class 1259 OID 23558)
-- Name: class_column_mapping_pk_entity_idx; Type: INDEX; Schema: data; Owner: -
--
CREATE INDEX class_column_mapping_pk_entity_idx ON data.class_column_mapping USING btree(pk_entity);

--
-- TOC entry 5358 (class 1259 OID 23559)
-- Name: column_pk_entity_idx; Type: INDEX; Schema: data; Owner: -
--
CREATE INDEX column_pk_entity_idx ON data."column" USING btree(pk_entity);

--
-- TOC entry 5363 (class 1259 OID 23870)
-- Name: data_association_fk_cell_domain_idx; Type: INDEX; Schema: data; Owner: -
--
CREATE INDEX data_association_fk_cell_domain_idx ON data.data_association USING btree(fk_cell_domain);

--
-- TOC entry 5364 (class 1259 OID 23871)
-- Name: data_association_fk_cell_range_idx; Type: INDEX; Schema: data; Owner: -
--
CREATE INDEX data_association_fk_cell_range_idx ON data.data_association USING btree(fk_cell_range);

--
-- TOC entry 5365 (class 1259 OID 23868)
-- Name: data_association_fk_info_domain_idx; Type: INDEX; Schema: data; Owner: -
--
CREATE INDEX data_association_fk_info_domain_idx ON data.data_association USING btree(fk_info_domain);

--
-- TOC entry 5366 (class 1259 OID 23869)
-- Name: data_association_fk_info_range_idx; Type: INDEX; Schema: data; Owner: -
--
CREATE INDEX data_association_fk_info_range_idx ON data.data_association USING btree(fk_info_range);

--
-- TOC entry 5411 (class 1259 OID 23571)
-- Name: data_association_mapping_pk_entity_idx; Type: INDEX; Schema: data; Owner: -
--
CREATE INDEX data_association_mapping_pk_entity_idx ON data.data_association_mapping USING btree(pk_entity);

--
-- TOC entry 5367 (class 1259 OID 23560)
-- Name: data_association_pk_entity_idx; Type: INDEX; Schema: data; Owner: -
--
CREATE INDEX data_association_pk_entity_idx ON data.data_association USING btree(pk_entity);

--
-- TOC entry 5372 (class 1259 OID 23561)
-- Name: digital_pk_entity_idx; Type: INDEX; Schema: data; Owner: -
--
CREATE INDEX digital_pk_entity_idx ON data.digital USING btree(pk_entity);

--
-- TOC entry 5375 (class 1259 OID 23864)
-- Name: digital_string_idx; Type: INDEX; Schema: data; Owner: -
--
CREATE INDEX digital_string_idx ON data.digital USING HASH (string);

--
-- TOC entry 5378 (class 1259 OID 23872)
-- Name: digital_vt_string_idx; Type: INDEX; Schema: data; Owner: -
--
CREATE INDEX digital_vt_string_idx ON data.digital_vt USING HASH (string);

--
-- TOC entry 5386 (class 1259 OID 23564)
-- Name: factoid_mapping_pk_entity_idx; Type: INDEX; Schema: data; Owner: -
--
CREATE INDEX factoid_mapping_pk_entity_idx ON data.factoid_mapping USING btree(pk_entity);

--
-- TOC entry 5381 (class 1259 OID 23563)
-- Name: factoid_pk_entity_idx; Type: INDEX; Schema: data; Owner: -
--
CREATE INDEX factoid_pk_entity_idx ON data.factoid USING btree(pk_entity);

--
-- TOC entry 5393 (class 1259 OID 23566)
-- Name: factoid_role_mapping_pk_entity_idx; Type: INDEX; Schema: data; Owner: -
--
CREATE INDEX factoid_role_mapping_pk_entity_idx ON data.factoid_property_mapping USING btree(pk_entity);

--
-- TOC entry 5396 (class 1259 OID 23567)
-- Name: factoid_role_pk_entity_idx; Type: INDEX; Schema: data; Owner: -
--
CREATE INDEX factoid_role_pk_entity_idx ON data.factoid_role USING btree(pk_entity);

--
-- TOC entry 5401 (class 1259 OID 23568)
-- Name: namespace_pk_entity_idx; Type: INDEX; Schema: data; Owner: -
--
CREATE INDEX namespace_pk_entity_idx ON data.namespace USING btree(pk_entity);

--
-- TOC entry 5639 (class 1259 OID 23565)
-- Name: property_of_property_mapping_pk_entity_idx; Type: INDEX; Schema: data; Owner: -
--
CREATE INDEX property_of_property_mapping_pk_entity_idx ON data.property_of_property_mapping USING btree(pk_entity);

--
-- TOC entry 5644 (class 1259 OID 23562)
-- Name: property_of_property_pk_entity_idx; Type: INDEX; Schema: data; Owner: -
--
CREATE INDEX property_of_property_pk_entity_idx ON data.property_of_property USING btree(pk_entity);

--
-- TOC entry 5406 (class 1259 OID 23570)
-- Name: text_property_pk_entity_idx; Type: INDEX; Schema: data; Owner: -
--
CREATE INDEX text_property_pk_entity_idx ON data.text_property USING btree(pk_entity);

--
-- TOC entry 5409 (class 1259 OID 23550)
-- Name: text_property_string_idx; Type: INDEX; Schema: data; Owner: -
--
CREATE INDEX text_property_string_idx ON data.text_property USING btree(string);

--
-- TOC entry 5410 (class 1259 OID 23551)
-- Name: text_property_vt_string_idx; Type: INDEX; Schema: data; Owner: -
--
CREATE INDEX text_property_vt_string_idx ON data.text_property_vt USING btree(string);

--
-- TOC entry 5424 (class 1259 OID 23583)
-- Name: associates_system_type_pk_entity_idx; Type: INDEX; Schema: data_for_history; Owner: -
--
CREATE INDEX associates_system_type_pk_entity_idx ON data_for_history.associates_system_type_deprecated USING btree(pk_entity);

--
-- TOC entry 5429 (class 1259 OID 23575)
-- Name: class_profile_view_pk_entity_idx; Type: INDEX; Schema: data_for_history; Owner: -
--
CREATE INDEX class_profile_view_pk_entity_idx ON data_for_history.class_profile_view_deprecated USING btree(pk_entity);

--
-- TOC entry 5436 (class 1259 OID 23577)
-- Name: label_pk_entity_idx; Type: INDEX; Schema: data_for_history; Owner: -
--
CREATE INDEX label_pk_entity_idx ON data_for_history.label_deprecated USING btree(pk_entity);

--
-- TOC entry 5441 (class 1259 OID 23578)
-- Name: profile_pk_entity_idx; Type: INDEX; Schema: data_for_history; Owner: -
--
CREATE INDEX profile_pk_entity_idx ON data_for_history.api_profile USING btree(pk_entity);

--
-- TOC entry 5446 (class 1259 OID 23579)
-- Name: property_pk_entity_idx; Type: INDEX; Schema: data_for_history; Owner: -
--
CREATE INDEX property_pk_entity_idx ON data_for_history.property USING btree(pk_entity);

--
-- TOC entry 5453 (class 1259 OID 23580)
-- Name: property_profile_view_pk_entity_idx; Type: INDEX; Schema: data_for_history; Owner: -
--
CREATE INDEX property_profile_view_pk_entity_idx ON data_for_history.property_profile_view_deprecated USING btree(pk_entity);

--
-- TOC entry 5458 (class 1259 OID 23581)
-- Name: system_type_pk_entity_idx; Type: INDEX; Schema: data_for_history; Owner: -
--
CREATE INDEX system_type_pk_entity_idx ON data_for_history.system_type_deprecated USING btree(pk_entity);

--
-- TOC entry 5463 (class 1259 OID 23582)
-- Name: text_property_pk_entity_idx; Type: INDEX; Schema: data_for_history; Owner: -
--
CREATE INDEX text_property_pk_entity_idx ON data_for_history.text_property_deprecated USING btree(pk_entity);

--
-- TOC entry 5464 (class 1259 OID 23585)
-- Name: appellation_pk_entity_idx; Type: INDEX; Schema: information; Owner: -
--
CREATE INDEX appellation_pk_entity_idx ON information.appellation USING btree(pk_entity);

--
-- TOC entry 5647 (class 1259 OID 23594)
-- Name: dimension_pk_entity_idx; Type: INDEX; Schema: information; Owner: -
--
CREATE INDEX dimension_pk_entity_idx ON information.dimension USING btree(pk_entity);

--
-- TOC entry 5471 (class 1259 OID 23866)
-- Name: entity_association_fk_cell_domain_idx; Type: INDEX; Schema: information; Owner: -
--
CREATE INDEX entity_association_fk_cell_domain_idx ON information._backup_entity_association USING btree(fk_cell_domain);

--
-- TOC entry 5472 (class 1259 OID 23867)
-- Name: entity_association_fk_cell_range_idx; Type: INDEX; Schema: information; Owner: -
--
CREATE INDEX entity_association_fk_cell_range_idx ON information._backup_entity_association USING btree(fk_cell_range);

--
-- TOC entry 5473 (class 1259 OID 23617)
-- Name: entity_association_fk_info_domain_idx; Type: INDEX; Schema: information; Owner: -
--
CREATE INDEX entity_association_fk_info_domain_idx ON information._backup_entity_association USING btree(fk_info_domain);

--
-- TOC entry 5474 (class 1259 OID 23618)
-- Name: entity_association_fk_info_range_idx; Type: INDEX; Schema: information; Owner: -
--
CREATE INDEX entity_association_fk_info_range_idx ON information._backup_entity_association USING btree(fk_info_range);

--
-- TOC entry 5475 (class 1259 OID 23586)
-- Name: entity_association_pk_entity_idx; Type: INDEX; Schema: information; Owner: -
--
CREATE INDEX entity_association_pk_entity_idx ON information._backup_entity_association USING btree(pk_entity);

--
-- TOC entry 5706 (class 1259 OID 24405)
-- Name: lang_string_fk_language_idx; Type: INDEX; Schema: information; Owner: -
--
CREATE INDEX lang_string_fk_language_idx ON information.lang_string USING btree(fk_language);

--
-- TOC entry 5707 (class 1259 OID 24404)
-- Name: lang_string_pk_entity_idx; Type: INDEX; Schema: information; Owner: -
--
CREATE INDEX lang_string_pk_entity_idx ON information.lang_string USING btree(pk_entity);

--
-- TOC entry 5480 (class 1259 OID 23587)
-- Name: language_pk_entity_idx; Type: INDEX; Schema: information; Owner: -
--
CREATE INDEX language_pk_entity_idx ON information.language USING btree(pk_entity);

--
-- TOC entry 5485 (class 1259 OID 23588)
-- Name: persistent_item_pk_entity_idx; Type: INDEX; Schema: information; Owner: -
--
CREATE INDEX persistent_item_pk_entity_idx ON information.persistent_item_backup USING btree(pk_entity);

--
-- TOC entry 5488 (class 1259 OID 23589)
-- Name: place_pk_entity_idx; Type: INDEX; Schema: information; Owner: -
--
CREATE INDEX place_pk_entity_idx ON information.place USING btree(pk_entity);

--
-- TOC entry 5758 (class 1259 OID 24950)
-- Name: resource_fk_class_idx; Type: INDEX; Schema: information; Owner: -
--
CREATE INDEX resource_fk_class_idx ON information.resource USING btree(fk_class);

--
-- TOC entry 5759 (class 1259 OID 24949)
-- Name: resource_pk_entity_idx; Type: INDEX; Schema: information; Owner: -
--
CREATE INDEX resource_pk_entity_idx ON information.resource USING btree(pk_entity);

--
-- TOC entry 5493 (class 1259 OID 23615)
-- Name: statement_fk_object_info_idx; Type: INDEX; Schema: information; Owner: -
--
CREATE INDEX statement_fk_object_info_idx ON information.statement USING btree(fk_object_info);

--
-- TOC entry 5494 (class 1259 OID 24785)
-- Name: statement_fk_object_tables_cell_idx; Type: INDEX; Schema: information; Owner: -
--
CREATE INDEX statement_fk_object_tables_cell_idx ON information.statement USING btree(fk_object_tables_cell);

--
-- TOC entry 5495 (class 1259 OID 24740)
-- Name: statement_fk_property_idx; Type: INDEX; Schema: information; Owner: -
--
CREATE INDEX statement_fk_property_idx ON information.statement USING btree(fk_property);

--
-- TOC entry 5496 (class 1259 OID 23616)
-- Name: statement_fk_subject_info_idx; Type: INDEX; Schema: information; Owner: -
--
CREATE INDEX statement_fk_subject_info_idx ON information.statement USING btree(fk_subject_info);

--
-- TOC entry 5497 (class 1259 OID 24741)
-- Name: statement_fk_subject_tables_cell_idx; Type: INDEX; Schema: information; Owner: -
--
CREATE INDEX statement_fk_subject_tables_cell_idx ON information.statement USING btree(fk_subject_tables_cell);

--
-- TOC entry 5498 (class 1259 OID 23591)
-- Name: statement_pk_entity_idx; Type: INDEX; Schema: information; Owner: -
--
CREATE INDEX statement_pk_entity_idx ON information.statement USING btree(pk_entity);

--
-- TOC entry 5332 (class 1259 OID 23584)
-- Name: temporal_entity_pk_entity_idx; Type: INDEX; Schema: information; Owner: -
--
CREATE INDEX temporal_entity_pk_entity_idx ON information.temporal_entity_backup USING btree(pk_entity);

--
-- TOC entry 5503 (class 1259 OID 23619)
-- Name: text_property_fk_concerned_entity_idx; Type: INDEX; Schema: information; Owner: -
--
CREATE INDEX text_property_fk_concerned_entity_idx ON information.text_property USING btree(fk_concerned_entity);

--
-- TOC entry 5506 (class 1259 OID 23592)
-- Name: text_property_pk_entity_idx; Type: INDEX; Schema: information; Owner: -
--
CREATE INDEX text_property_pk_entity_idx ON information.text_property USING btree(pk_entity);

--
-- TOC entry 5509 (class 1259 OID 23546)
-- Name: text_property_string_idx; Type: INDEX; Schema: information; Owner: -
--
CREATE INDEX text_property_string_idx ON information.text_property USING btree(string);

--
-- TOC entry 5510 (class 1259 OID 23547)
-- Name: text_property_vt_string_idx; Type: INDEX; Schema: information; Owner: -
--
CREATE INDEX text_property_vt_string_idx ON information.text_property_vt USING btree(string);

--
-- TOC entry 5513 (class 1259 OID 23593)
-- Name: time_primitive_pk_entity_idx; Type: INDEX; Schema: information; Owner: -
--
CREATE INDEX time_primitive_pk_entity_idx ON information.time_primitive USING btree(pk_entity);

--
-- TOC entry 5546 (class 1259 OID 23601)
-- Name: argument_pk_entity_idx; Type: INDEX; Schema: projects; Owner: -
--
CREATE INDEX argument_pk_entity_idx ON projects.argument USING btree(pk_entity);

--
-- TOC entry 5533 (class 1259 OID 24027)
-- Name: class_field_config_fk_app_context_fk_project_fk_property_fk_idx; Type: INDEX; Schema: projects; Owner: -
--
CREATE UNIQUE INDEX class_field_config_fk_app_context_fk_project_fk_property_fk_idx ON projects.class_field_config USING btree(fk_app_context, fk_project, fk_property, fk_domain_class, fk_range_class);

--
-- TOC entry 5534 (class 1259 OID 23599)
-- Name: class_field_config_pk_entity_idx; Type: INDEX; Schema: projects; Owner: -
--
CREATE INDEX class_field_config_pk_entity_idx ON projects.class_field_config USING btree(pk_entity);

--
-- TOC entry 5553 (class 1259 OID 23595)
-- Name: dfh_class_proj_rel_pk_entity_idx; Type: INDEX; Schema: projects; Owner: -
--
CREATE INDEX dfh_class_proj_rel_pk_entity_idx ON projects.dfh_class_proj_rel USING btree(pk_entity);

--
-- TOC entry 5524 (class 1259 OID 23613)
-- Name: info_proj_rel_fk_entity_idx; Type: INDEX; Schema: projects; Owner: -
--
CREATE INDEX info_proj_rel_fk_entity_idx ON projects.info_proj_rel USING btree(fk_entity);

--
-- TOC entry 5525 (class 1259 OID 23614)
-- Name: info_proj_rel_fk_project_idx; Type: INDEX; Schema: projects; Owner: -
--
CREATE INDEX info_proj_rel_fk_project_idx ON projects.info_proj_rel USING btree(fk_project);

--
-- TOC entry 5526 (class 1259 OID 24304)
-- Name: info_proj_rel_is_in_project_idx; Type: INDEX; Schema: projects; Owner: -
--
CREATE INDEX info_proj_rel_is_in_project_idx ON projects.info_proj_rel USING btree(is_in_project);

--
-- TOC entry 5527 (class 1259 OID 23600)
-- Name: info_proj_rel_pk_entity_idx; Type: INDEX; Schema: projects; Owner: -
--
CREATE INDEX info_proj_rel_pk_entity_idx ON projects.info_proj_rel USING btree(pk_entity);

--
-- TOC entry 5530 (class 1259 OID 24305)
-- Name: info_proj_rel_tmsp_last_modification_idx; Type: INDEX; Schema: projects; Owner: -
--
CREATE INDEX info_proj_rel_tmsp_last_modification_idx ON projects.info_proj_rel USING btree(tmsp_last_modification);

--
-- TOC entry 5560 (class 1259 OID 23596)
-- Name: project_pk_entity_idx; Type: INDEX; Schema: projects; Owner: -
--
CREATE INDEX project_pk_entity_idx ON projects.project USING btree(pk_entity);

--
-- TOC entry 5567 (class 1259 OID 23598)
-- Name: query_pk_entity_idx; Type: INDEX; Schema: projects; Owner: -
--
CREATE INDEX query_pk_entity_idx ON projects.query USING btree(pk_entity);

--
-- TOC entry 5572 (class 1259 OID 23597)
-- Name: text_property_pk_entity_idx; Type: INDEX; Schema: projects; Owner: -
--
CREATE INDEX text_property_pk_entity_idx ON projects.text_property USING btree(pk_entity);

--
-- TOC entry 5575 (class 1259 OID 23548)
-- Name: text_property_string_idx; Type: INDEX; Schema: projects; Owner: -
--
CREATE INDEX text_property_string_idx ON projects.text_property USING btree(string);

--
-- TOC entry 5580 (class 1259 OID 23549)
-- Name: text_property_vt_string_idx; Type: INDEX; Schema: projects; Owner: -
--
CREATE INDEX text_property_vt_string_idx ON projects.text_property_vt USING btree(string);

--
-- TOC entry 5603 (class 1259 OID 23608)
-- Name: app_context_pk_entity_idx; Type: INDEX; Schema: system; Owner: -
--
CREATE INDEX app_context_pk_entity_idx ON system.app_context USING btree(pk_entity);

--
-- TOC entry 5541 (class 1259 OID 23607)
-- Name: class_field_pk_entity_idx; Type: INDEX; Schema: system; Owner: -
--
CREATE INDEX class_field_pk_entity_idx ON system.class_field USING btree(pk_entity);

--
-- TOC entry 5608 (class 1259 OID 23606)
-- Name: class_field_property_rel_pk_entity_idx; Type: INDEX; Schema: system; Owner: -
--
CREATE INDEX class_field_property_rel_pk_entity_idx ON system.class_field_property_rel USING btree(pk_entity);

--
-- TOC entry 5615 (class 1259 OID 23602)
-- Name: class_has_type_property_pk_entity_idx; Type: INDEX; Schema: system; Owner: -
--
CREATE INDEX class_has_type_property_pk_entity_idx ON system.class_has_type_property USING btree(pk_entity);

--
-- TOC entry 5620 (class 1259 OID 23604)
-- Name: system_relevant_class_pk_entity_idx; Type: INDEX; Schema: system; Owner: -
--
CREATE INDEX system_relevant_class_pk_entity_idx ON system.system_relevant_class USING btree(pk_entity);

--
-- TOC entry 5625 (class 1259 OID 23605)
-- Name: system_relevant_type_pk_entity_idx; Type: INDEX; Schema: system; Owner: -
--
CREATE INDEX system_relevant_type_pk_entity_idx ON system.system_relevant_type USING btree(pk_entity);

--
-- TOC entry 5632 (class 1259 OID 23603)
-- Name: system_type_pk_entity_idx; Type: INDEX; Schema: system; Owner: -
--
CREATE INDEX system_type_pk_entity_idx ON system.system_type USING btree(pk_entity);

--
-- TOC entry 5656 (class 1259 OID 24737)
-- Name: cell_fk_column_idx; Type: INDEX; Schema: tables; Owner: -
--
CREATE INDEX cell_fk_column_idx ON tables.cell USING btree(fk_column);

--
-- TOC entry 5657 (class 1259 OID 24738)
-- Name: cell_fk_row_idx; Type: INDEX; Schema: tables; Owner: -
--
CREATE INDEX cell_fk_row_idx ON tables.cell USING btree(fk_row);

--
-- TOC entry 5658 (class 1259 OID 24739)
-- Name: cell_pk_cell_idx; Type: INDEX; Schema: tables; Owner: -
--
CREATE INDEX cell_pk_cell_idx ON tables.cell USING btree(pk_cell);

--
-- TOC entry 5661 (class 1259 OID 23848)
-- Name: quill_doc_cell_fk_column_idx; Type: INDEX; Schema: tables; Owner: -
--
CREATE INDEX quill_doc_cell_fk_column_idx ON tables.quill_doc_cell USING btree(fk_column);

--
-- TOC entry 5662 (class 1259 OID 23849)
-- Name: quill_doc_cell_fk_digital_idx; Type: INDEX; Schema: tables; Owner: -
--
CREATE INDEX quill_doc_cell_fk_digital_idx ON tables.quill_doc_cell USING btree(fk_digital);

--
-- TOC entry 5663 (class 1259 OID 23850)
-- Name: quill_doc_cell_fk_row_idx; Type: INDEX; Schema: tables; Owner: -
--
CREATE INDEX quill_doc_cell_fk_row_idx ON tables.quill_doc_cell USING btree(fk_row);

--
-- TOC entry 5664 (class 1259 OID 23851)
-- Name: quill_doc_cell_id_for_import_txt_idx; Type: INDEX; Schema: tables; Owner: -
--
CREATE INDEX quill_doc_cell_id_for_import_txt_idx ON tables.quill_doc_cell USING btree(id_for_import_txt);

--
-- TOC entry 5665 (class 1259 OID 23852)
-- Name: quill_doc_cell_pk_cell_idx; Type: INDEX; Schema: tables; Owner: -
--
CREATE INDEX quill_doc_cell_pk_cell_idx ON tables.quill_doc_cell USING btree(pk_cell);

--
-- TOC entry 5668 (class 1259 OID 23853)
-- Name: quill_doc_cell_string_value_idx; Type: INDEX; Schema: tables; Owner: -
--
CREATE INDEX quill_doc_cell_string_value_idx ON tables.quill_doc_cell USING btree(string_value);

--
-- TOC entry 5669 (class 1259 OID 23859)
-- Name: text_string_idx; Type: INDEX; Schema: tables; Owner: -
--
CREATE INDEX text_string_idx ON tables.quill_doc_cell USING btree(string);

--
-- TOC entry 5698 (class 1259 OID 24254)
-- Name: entity_preview_entity_label_idx; Type: INDEX; Schema: war; Owner: -
--
CREATE INDEX entity_preview_entity_label_idx ON war.entity_preview USING btree(entity_label);

--
-- TOC entry 5699 (class 1259 OID 24784)
-- Name: entity_preview_full_text; Type: INDEX; Schema: war; Owner: -
--
CREATE INDEX entity_preview_full_text ON war.entity_preview USING gin(ts_vector);

--
-- TOC entry 5700 (class 1259 OID 24692)
-- Name: entity_preview_key_idx; Type: INDEX; Schema: war; Owner: -
--
CREATE INDEX entity_preview_key_idx ON war.entity_preview USING btree(key);

--
-- TOC entry 5701 (class 1259 OID 24256)
-- Name: entity_preview_pk_entity_idx; Type: INDEX; Schema: war; Owner: -
--
CREATE INDEX entity_preview_pk_entity_idx ON war.entity_preview USING btree(pk_entity);

--
-- TOC entry 5774 (class 1259 OID 24963)
-- Name: ep__entity_label_idx; Type: INDEX; Schema: war; Owner: -
--
CREATE INDEX ep__entity_label_idx ON ONLY war.entity_preview_template USING btree(entity_label);

--
-- TOC entry 5775 (class 1259 OID 24959)
-- Name: ep__entity_type_idx; Type: INDEX; Schema: war; Owner: -
--
CREATE INDEX ep__entity_type_idx ON ONLY war.entity_preview_template USING btree(entity_type);

--
-- TOC entry 5776 (class 1259 OID 24960)
-- Name: ep__fk_class_idx; Type: INDEX; Schema: war; Owner: -
--
CREATE INDEX ep__fk_class_idx ON ONLY war.entity_preview_template USING btree(fk_class);

--
-- TOC entry 5777 (class 1259 OID 24961)
-- Name: ep__fk_project_idx; Type: INDEX; Schema: war; Owner: -
--
CREATE INDEX ep__fk_project_idx ON ONLY war.entity_preview_template USING btree(fk_project);

--
-- TOC entry 5778 (class 1259 OID 24964)
-- Name: ep__key_idx; Type: INDEX; Schema: war; Owner: -
--
CREATE INDEX ep__key_idx ON ONLY war.entity_preview_template USING btree(key);

--
-- TOC entry 5779 (class 1259 OID 24965)
-- Name: ep__pk_entity_idx; Type: INDEX; Schema: war; Owner: -
--
CREATE INDEX ep__pk_entity_idx ON ONLY war.entity_preview_template USING btree(pk_entity);

--
-- TOC entry 5780 (class 1259 OID 24962)
-- Name: ep__project_idx; Type: INDEX; Schema: war; Owner: -
--
CREATE INDEX ep__project_idx ON ONLY war.entity_preview_template USING btree(project);

--
-- TOC entry 5781 (class 1259 OID 24966)
-- Name: ep__ts_vector_idx; Type: INDEX; Schema: war; Owner: -
--
CREATE INDEX ep__ts_vector_idx ON ONLY war.entity_preview_template USING gin(ts_vector);

--
-- TOC entry 5740 (class 1259 OID 24567)
-- Name: statement_fk_object_info_idx; Type: INDEX; Schema: war; Owner: -
--
CREATE INDEX statement_fk_object_info_idx ON war.statement_backup USING btree(fk_object_info);

--
-- TOC entry 5741 (class 1259 OID 24568)
-- Name: statement_fk_project_idx; Type: INDEX; Schema: war; Owner: -
--
CREATE INDEX statement_fk_project_idx ON war.statement_backup USING btree(fk_project);

--
-- TOC entry 5742 (class 1259 OID 24569)
-- Name: statement_fk_property_idx; Type: INDEX; Schema: war; Owner: -
--
CREATE INDEX statement_fk_property_idx ON war.statement_backup USING btree(fk_property);

--
-- TOC entry 5743 (class 1259 OID 24570)
-- Name: statement_fk_subject_info_idx; Type: INDEX; Schema: war; Owner: -
--
CREATE INDEX statement_fk_subject_info_idx ON war.statement_backup USING btree(fk_subject_info);

--
-- TOC entry 5744 (class 1259 OID 24571)
-- Name: statement_pk_entity_idx; Type: INDEX; Schema: war; Owner: -
--
CREATE INDEX statement_pk_entity_idx ON war.statement_backup USING btree(pk_entity);

--
-- TOC entry 5745 (class 1259 OID 24572)
-- Name: statement_pk_entity_project_idx; Type: INDEX; Schema: war; Owner: -
--
CREATE UNIQUE INDEX statement_pk_entity_project_idx ON war.statement_backup USING btree(pk_entity, project);

--
-- TOC entry 5764 (class 1259 OID 24937)
-- Name: statement_template_fk_object_info_idx; Type: INDEX; Schema: war; Owner: -
--
CREATE INDEX statement_template_fk_object_info_idx ON war.statement_template USING btree(fk_object_info);

--
-- TOC entry 5765 (class 1259 OID 24938)
-- Name: statement_template_fk_project_idx; Type: INDEX; Schema: war; Owner: -
--
CREATE INDEX statement_template_fk_project_idx ON war.statement_template USING btree(fk_project);

--
-- TOC entry 5766 (class 1259 OID 24939)
-- Name: statement_template_fk_property_idx; Type: INDEX; Schema: war; Owner: -
--
CREATE INDEX statement_template_fk_property_idx ON war.statement_template USING btree(fk_property);

--
-- TOC entry 5767 (class 1259 OID 24940)
-- Name: statement_template_fk_subject_info_idx; Type: INDEX; Schema: war; Owner: -
--
CREATE INDEX statement_template_fk_subject_info_idx ON war.statement_template USING btree(fk_subject_info);

--
-- TOC entry 5768 (class 1259 OID 24941)
-- Name: statement_template_pk_entity_idx; Type: INDEX; Schema: war; Owner: -
--
CREATE INDEX statement_template_pk_entity_idx ON war.statement_template USING btree(pk_entity);

--
-- TOC entry 5769 (class 1259 OID 24942)
-- Name: statement_template_pk_entity_project_idx; Type: INDEX; Schema: war; Owner: -
--
CREATE UNIQUE INDEX statement_template_pk_entity_project_idx ON war.statement_template USING btree(pk_entity, project);

--
-- TOC entry 5720 (class 1259 OID 24470)
-- Name: vm_statement_fk_object_info_idx; Type: INDEX; Schema: war; Owner: -
--
CREATE INDEX vm_statement_fk_object_info_idx ON war.vm_statement USING btree(fk_object_info);

--
-- TOC entry 5721 (class 1259 OID 24471)
-- Name: vm_statement_fk_project_idx; Type: INDEX; Schema: war; Owner: -
--
CREATE INDEX vm_statement_fk_project_idx ON war.vm_statement USING btree(fk_project);

--
-- TOC entry 5722 (class 1259 OID 24472)
-- Name: vm_statement_fk_property_idx; Type: INDEX; Schema: war; Owner: -
--
CREATE INDEX vm_statement_fk_property_idx ON war.vm_statement USING btree(fk_property);

--
-- TOC entry 5723 (class 1259 OID 24473)
-- Name: vm_statement_fk_subject_info_idx; Type: INDEX; Schema: war; Owner: -
--
CREATE INDEX vm_statement_fk_subject_info_idx ON war.vm_statement USING btree(fk_subject_info);

--
-- TOC entry 5724 (class 1259 OID 24474)
-- Name: vm_statement_pk_entity_idx; Type: INDEX; Schema: war; Owner: -
--
CREATE INDEX vm_statement_pk_entity_idx ON war.vm_statement USING btree(pk_entity);

--
-- TOC entry 5725 (class 1259 OID 24475)
-- Name: vm_statement_pk_entity_project_idx; Type: INDEX; Schema: war; Owner: -
--
CREATE UNIQUE INDEX vm_statement_pk_entity_project_idx ON war.vm_statement USING btree(pk_entity, project);

--
-- TOC entry 5905 (class 2620 OID 22206)
-- Name: text sync_quill_doc_and_string; Type: TRIGGER; Schema: commons; Owner: -
--
CREATE TRIGGER sync_quill_doc_and_string
  BEFORE INSERT OR UPDATE ON commons.text
  FOR EACH ROW
  EXECUTE FUNCTION commons.text__sync_quill_doc_and_string();

--
-- TOC entry 5906 (class 2620 OID 22220)
-- Name: avatar create_entity_version_key; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER create_entity_version_key
  BEFORE INSERT ON data.avatar
  FOR EACH ROW
  EXECUTE FUNCTION commons.create_entity_version_key();

--
-- TOC entry 5912 (class 2620 OID 22208)
-- Name: chunk create_entity_version_key; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER create_entity_version_key
  BEFORE INSERT ON data.chunk
  FOR EACH ROW
  EXECUTE FUNCTION commons.create_entity_version_key();

--
-- TOC entry 5919 (class 2620 OID 23035)
-- Name: class_column_mapping create_entity_version_key; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER create_entity_version_key
  BEFORE INSERT ON data.class_column_mapping
  FOR EACH ROW
  EXECUTE FUNCTION commons.create_entity_version_key();

--
-- TOC entry 5925 (class 2620 OID 22210)
-- Name: column create_entity_version_key; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER create_entity_version_key
  BEFORE INSERT ON data."column"
  FOR EACH ROW
  EXECUTE FUNCTION commons.create_entity_version_key();

--
-- TOC entry 5931 (class 2620 OID 22219)
-- Name: data_association create_entity_version_key; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER create_entity_version_key
  BEFORE INSERT ON data.data_association
  FOR EACH ROW
  EXECUTE FUNCTION commons.create_entity_version_key();

--
-- TOC entry 5981 (class 2620 OID 23032)
-- Name: data_association_mapping create_entity_version_key; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER create_entity_version_key
  BEFORE INSERT ON data.data_association_mapping
  FOR EACH ROW
  EXECUTE FUNCTION commons.create_entity_version_key();

--
-- TOC entry 5937 (class 2620 OID 22207)
-- Name: digital create_entity_version_key; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER create_entity_version_key
  BEFORE INSERT ON data.digital
  FOR EACH ROW
  EXECUTE FUNCTION commons.create_entity_version_key();

--
-- TOC entry 5944 (class 2620 OID 22216)
-- Name: factoid create_entity_version_key; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER create_entity_version_key
  BEFORE INSERT ON data.factoid
  FOR EACH ROW
  EXECUTE FUNCTION commons.create_entity_version_key();

--
-- TOC entry 5950 (class 2620 OID 23026)
-- Name: factoid_mapping create_entity_version_key; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER create_entity_version_key
  BEFORE INSERT ON data.factoid_mapping
  FOR EACH ROW
  EXECUTE FUNCTION commons.create_entity_version_key();

--
-- TOC entry 5956 (class 2620 OID 23029)
-- Name: factoid_property_mapping create_entity_version_key; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER create_entity_version_key
  BEFORE INSERT ON data.factoid_property_mapping
  FOR EACH ROW
  EXECUTE FUNCTION commons.create_entity_version_key();

--
-- TOC entry 5962 (class 2620 OID 22217)
-- Name: factoid_role create_entity_version_key; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER create_entity_version_key
  BEFORE INSERT ON data.factoid_role
  FOR EACH ROW
  EXECUTE FUNCTION commons.create_entity_version_key();

--
-- TOC entry 5968 (class 2620 OID 22222)
-- Name: namespace create_entity_version_key; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER create_entity_version_key
  BEFORE INSERT ON data.namespace
  FOR EACH ROW
  EXECUTE FUNCTION commons.create_entity_version_key();

--
-- TOC entry 6196 (class 2620 OID 23133)
-- Name: property_of_property create_entity_version_key; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER create_entity_version_key
  BEFORE INSERT ON data.property_of_property
  FOR EACH ROW
  EXECUTE FUNCTION commons.create_entity_version_key();

--
-- TOC entry 6190 (class 2620 OID 23076)
-- Name: property_of_property_mapping create_entity_version_key; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER create_entity_version_key
  BEFORE INSERT ON data.property_of_property_mapping
  FOR EACH ROW
  EXECUTE FUNCTION commons.create_entity_version_key();

--
-- TOC entry 5974 (class 2620 OID 22221)
-- Name: text_property create_entity_version_key; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER create_entity_version_key
  BEFORE INSERT ON data.text_property
  FOR EACH ROW
  EXECUTE FUNCTION commons.create_entity_version_key();

--
-- TOC entry 5987 (class 2620 OID 22218)
-- Name: values_association create_entity_version_key; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER create_entity_version_key
  BEFORE INSERT ON data.values_association
  FOR EACH ROW
  EXECUTE FUNCTION commons.create_entity_version_key();

--
-- TOC entry 5907 (class 2620 OID 22236)
-- Name: avatar creation_tmsp; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER creation_tmsp
  BEFORE INSERT ON data.avatar
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_creation();

--
-- TOC entry 5913 (class 2620 OID 22224)
-- Name: chunk creation_tmsp; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER creation_tmsp
  BEFORE INSERT ON data.chunk
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_creation();

--
-- TOC entry 5920 (class 2620 OID 22230)
-- Name: class_column_mapping creation_tmsp; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER creation_tmsp
  BEFORE INSERT ON data.class_column_mapping
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_creation();

--
-- TOC entry 5926 (class 2620 OID 22226)
-- Name: column creation_tmsp; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER creation_tmsp
  BEFORE INSERT ON data."column"
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_creation();

--
-- TOC entry 5932 (class 2620 OID 22235)
-- Name: data_association creation_tmsp; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER creation_tmsp
  BEFORE INSERT ON data.data_association
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_creation();

--
-- TOC entry 5982 (class 2620 OID 22229)
-- Name: data_association_mapping creation_tmsp; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER creation_tmsp
  BEFORE INSERT ON data.data_association_mapping
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_creation();

--
-- TOC entry 5938 (class 2620 OID 22223)
-- Name: digital creation_tmsp; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER creation_tmsp
  BEFORE INSERT ON data.digital
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_creation();

--
-- TOC entry 5945 (class 2620 OID 22232)
-- Name: factoid creation_tmsp; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER creation_tmsp
  BEFORE INSERT ON data.factoid
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_creation();

--
-- TOC entry 5951 (class 2620 OID 22228)
-- Name: factoid_mapping creation_tmsp; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER creation_tmsp
  BEFORE INSERT ON data.factoid_mapping
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_creation();

--
-- TOC entry 5957 (class 2620 OID 22231)
-- Name: factoid_property_mapping creation_tmsp; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER creation_tmsp
  BEFORE INSERT ON data.factoid_property_mapping
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_creation();

--
-- TOC entry 5963 (class 2620 OID 22233)
-- Name: factoid_role creation_tmsp; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER creation_tmsp
  BEFORE INSERT ON data.factoid_role
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_creation();

--
-- TOC entry 5969 (class 2620 OID 22238)
-- Name: namespace creation_tmsp; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER creation_tmsp
  BEFORE INSERT ON data.namespace
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_creation();

--
-- TOC entry 6197 (class 2620 OID 23124)
-- Name: property_of_property creation_tmsp; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER creation_tmsp
  BEFORE INSERT ON data.property_of_property
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_creation();

--
-- TOC entry 6191 (class 2620 OID 23067)
-- Name: property_of_property_mapping creation_tmsp; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER creation_tmsp
  BEFORE INSERT ON data.property_of_property_mapping
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_creation();

--
-- TOC entry 5975 (class 2620 OID 22237)
-- Name: text_property creation_tmsp; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER creation_tmsp
  BEFORE INSERT ON data.text_property
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_creation();

--
-- TOC entry 5988 (class 2620 OID 22234)
-- Name: values_association creation_tmsp; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER creation_tmsp
  BEFORE INSERT ON data.values_association
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_creation();

--
-- TOC entry 5908 (class 2620 OID 22252)
-- Name: avatar insert_schema_table_name; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER insert_schema_table_name
  BEFORE INSERT ON data.avatar
  FOR EACH ROW
  EXECUTE FUNCTION commons.insert_schema_table_name();

--
-- TOC entry 5914 (class 2620 OID 22240)
-- Name: chunk insert_schema_table_name; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER insert_schema_table_name
  BEFORE INSERT ON data.chunk
  FOR EACH ROW
  EXECUTE FUNCTION commons.insert_schema_table_name();

--
-- TOC entry 5921 (class 2620 OID 22246)
-- Name: class_column_mapping insert_schema_table_name; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER insert_schema_table_name
  BEFORE INSERT ON data.class_column_mapping
  FOR EACH ROW
  EXECUTE FUNCTION commons.insert_schema_table_name();

--
-- TOC entry 5927 (class 2620 OID 22242)
-- Name: column insert_schema_table_name; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER insert_schema_table_name
  BEFORE INSERT ON data."column"
  FOR EACH ROW
  EXECUTE FUNCTION commons.insert_schema_table_name();

--
-- TOC entry 5933 (class 2620 OID 22251)
-- Name: data_association insert_schema_table_name; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER insert_schema_table_name
  BEFORE INSERT ON data.data_association
  FOR EACH ROW
  EXECUTE FUNCTION commons.insert_schema_table_name();

--
-- TOC entry 5983 (class 2620 OID 22245)
-- Name: data_association_mapping insert_schema_table_name; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER insert_schema_table_name
  BEFORE INSERT ON data.data_association_mapping
  FOR EACH ROW
  EXECUTE FUNCTION commons.insert_schema_table_name();

--
-- TOC entry 5939 (class 2620 OID 22239)
-- Name: digital insert_schema_table_name; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER insert_schema_table_name
  BEFORE INSERT ON data.digital
  FOR EACH ROW
  EXECUTE FUNCTION commons.insert_schema_table_name();

--
-- TOC entry 5946 (class 2620 OID 22248)
-- Name: factoid insert_schema_table_name; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER insert_schema_table_name
  BEFORE INSERT ON data.factoid
  FOR EACH ROW
  EXECUTE FUNCTION commons.insert_schema_table_name();

--
-- TOC entry 5952 (class 2620 OID 22244)
-- Name: factoid_mapping insert_schema_table_name; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER insert_schema_table_name
  BEFORE INSERT ON data.factoid_mapping
  FOR EACH ROW
  EXECUTE FUNCTION commons.insert_schema_table_name();

--
-- TOC entry 5958 (class 2620 OID 22247)
-- Name: factoid_property_mapping insert_schema_table_name; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER insert_schema_table_name
  BEFORE INSERT ON data.factoid_property_mapping
  FOR EACH ROW
  EXECUTE FUNCTION commons.insert_schema_table_name();

--
-- TOC entry 5964 (class 2620 OID 22249)
-- Name: factoid_role insert_schema_table_name; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER insert_schema_table_name
  BEFORE INSERT ON data.factoid_role
  FOR EACH ROW
  EXECUTE FUNCTION commons.insert_schema_table_name();

--
-- TOC entry 5970 (class 2620 OID 22254)
-- Name: namespace insert_schema_table_name; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER insert_schema_table_name
  BEFORE INSERT ON data.namespace
  FOR EACH ROW
  EXECUTE FUNCTION commons.insert_schema_table_name();

--
-- TOC entry 6198 (class 2620 OID 23125)
-- Name: property_of_property insert_schema_table_name; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER insert_schema_table_name
  BEFORE INSERT ON data.property_of_property
  FOR EACH ROW
  EXECUTE FUNCTION commons.insert_schema_table_name();

--
-- TOC entry 6192 (class 2620 OID 23068)
-- Name: property_of_property_mapping insert_schema_table_name; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER insert_schema_table_name
  BEFORE INSERT ON data.property_of_property_mapping
  FOR EACH ROW
  EXECUTE FUNCTION commons.insert_schema_table_name();

--
-- TOC entry 5976 (class 2620 OID 22253)
-- Name: text_property insert_schema_table_name; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER insert_schema_table_name
  BEFORE INSERT ON data.text_property
  FOR EACH ROW
  EXECUTE FUNCTION commons.insert_schema_table_name();

--
-- TOC entry 5989 (class 2620 OID 22250)
-- Name: values_association insert_schema_table_name; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER insert_schema_table_name
  BEFORE INSERT ON data.values_association
  FOR EACH ROW
  EXECUTE FUNCTION commons.insert_schema_table_name();

--
-- TOC entry 5909 (class 2620 OID 22268)
-- Name: avatar last_modification_tmsp; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE ON data.avatar
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_last_modification();

--
-- TOC entry 5915 (class 2620 OID 22256)
-- Name: chunk last_modification_tmsp; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE ON data.chunk
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_last_modification();

--
-- TOC entry 5922 (class 2620 OID 22262)
-- Name: class_column_mapping last_modification_tmsp; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE ON data.class_column_mapping
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_last_modification();

--
-- TOC entry 5928 (class 2620 OID 22258)
-- Name: column last_modification_tmsp; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE ON data."column"
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_last_modification();

--
-- TOC entry 5934 (class 2620 OID 22267)
-- Name: data_association last_modification_tmsp; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE ON data.data_association
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_last_modification();

--
-- TOC entry 5984 (class 2620 OID 22261)
-- Name: data_association_mapping last_modification_tmsp; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE ON data.data_association_mapping
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_last_modification();

--
-- TOC entry 5940 (class 2620 OID 22255)
-- Name: digital last_modification_tmsp; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE ON data.digital
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_last_modification();

--
-- TOC entry 5947 (class 2620 OID 22264)
-- Name: factoid last_modification_tmsp; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE ON data.factoid
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_last_modification();

--
-- TOC entry 5953 (class 2620 OID 22260)
-- Name: factoid_mapping last_modification_tmsp; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE ON data.factoid_mapping
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_last_modification();

--
-- TOC entry 5959 (class 2620 OID 22263)
-- Name: factoid_property_mapping last_modification_tmsp; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE ON data.factoid_property_mapping
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_last_modification();

--
-- TOC entry 5965 (class 2620 OID 22265)
-- Name: factoid_role last_modification_tmsp; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE ON data.factoid_role
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_last_modification();

--
-- TOC entry 5971 (class 2620 OID 22270)
-- Name: namespace last_modification_tmsp; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE ON data.namespace
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_last_modification();

--
-- TOC entry 6199 (class 2620 OID 23126)
-- Name: property_of_property last_modification_tmsp; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE ON data.property_of_property
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_last_modification();

--
-- TOC entry 6193 (class 2620 OID 23069)
-- Name: property_of_property_mapping last_modification_tmsp; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE ON data.property_of_property_mapping
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_last_modification();

--
-- TOC entry 5977 (class 2620 OID 22269)
-- Name: text_property last_modification_tmsp; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE ON data.text_property
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_last_modification();

--
-- TOC entry 5990 (class 2620 OID 22266)
-- Name: values_association last_modification_tmsp; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE ON data.values_association
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_last_modification();

--
-- TOC entry 6208 (class 2620 OID 23229)
-- Name: v_chunk on_insert; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER on_insert
  INSTEAD OF INSERT ON data.v_chunk
  FOR EACH ROW
  EXECUTE FUNCTION data.v_chunk_find_or_create();

--
-- TOC entry 5916 (class 2620 OID 22273)
-- Name: chunk sync_quill_doc_and_string; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER sync_quill_doc_and_string
  BEFORE INSERT OR UPDATE ON data.chunk
  FOR EACH ROW
  EXECUTE FUNCTION commons.text__sync_quill_doc_and_string();

--
-- TOC entry 5941 (class 2620 OID 22272)
-- Name: digital sync_quill_doc_and_string; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER sync_quill_doc_and_string
  BEFORE INSERT OR UPDATE ON data.digital
  FOR EACH ROW
  EXECUTE FUNCTION commons.text__sync_quill_doc_and_string();

--
-- TOC entry 5978 (class 2620 OID 22275)
-- Name: text_property sync_quill_doc_and_string; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER sync_quill_doc_and_string
  BEFORE INSERT OR UPDATE ON data.text_property
  FOR EACH ROW
  EXECUTE FUNCTION commons.text__sync_quill_doc_and_string();

--
-- TOC entry 5910 (class 2620 OID 22289)
-- Name: avatar update_entity_version_key; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER update_entity_version_key
  BEFORE UPDATE ON data.avatar
  FOR EACH ROW
  EXECUTE FUNCTION commons.update_entity_version_key();

--
-- TOC entry 5917 (class 2620 OID 22277)
-- Name: chunk update_entity_version_key; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER update_entity_version_key
  BEFORE UPDATE ON data.chunk
  FOR EACH ROW
  EXECUTE FUNCTION commons.update_entity_version_key();

--
-- TOC entry 5923 (class 2620 OID 23036)
-- Name: class_column_mapping update_entity_version_key; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER update_entity_version_key
  BEFORE UPDATE ON data.class_column_mapping
  FOR EACH ROW
  EXECUTE FUNCTION commons.update_entity_version_key();

--
-- TOC entry 5929 (class 2620 OID 22279)
-- Name: column update_entity_version_key; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER update_entity_version_key
  BEFORE UPDATE ON data."column"
  FOR EACH ROW
  EXECUTE FUNCTION commons.update_entity_version_key();

--
-- TOC entry 5935 (class 2620 OID 22288)
-- Name: data_association update_entity_version_key; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER update_entity_version_key
  BEFORE UPDATE ON data.data_association
  FOR EACH ROW
  EXECUTE FUNCTION commons.update_entity_version_key();

--
-- TOC entry 5985 (class 2620 OID 23033)
-- Name: data_association_mapping update_entity_version_key; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER update_entity_version_key
  BEFORE UPDATE ON data.data_association_mapping
  FOR EACH ROW
  EXECUTE FUNCTION commons.update_entity_version_key();

--
-- TOC entry 5942 (class 2620 OID 22276)
-- Name: digital update_entity_version_key; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER update_entity_version_key
  BEFORE UPDATE ON data.digital
  FOR EACH ROW
  EXECUTE FUNCTION commons.update_entity_version_key();

--
-- TOC entry 5948 (class 2620 OID 22285)
-- Name: factoid update_entity_version_key; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER update_entity_version_key
  BEFORE UPDATE ON data.factoid
  FOR EACH ROW
  EXECUTE FUNCTION commons.update_entity_version_key();

--
-- TOC entry 5954 (class 2620 OID 23027)
-- Name: factoid_mapping update_entity_version_key; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER update_entity_version_key
  BEFORE UPDATE ON data.factoid_mapping
  FOR EACH ROW
  EXECUTE FUNCTION commons.update_entity_version_key();

--
-- TOC entry 5960 (class 2620 OID 23030)
-- Name: factoid_property_mapping update_entity_version_key; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER update_entity_version_key
  BEFORE UPDATE ON data.factoid_property_mapping
  FOR EACH ROW
  EXECUTE FUNCTION commons.update_entity_version_key();

--
-- TOC entry 5966 (class 2620 OID 22286)
-- Name: factoid_role update_entity_version_key; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER update_entity_version_key
  BEFORE UPDATE ON data.factoid_role
  FOR EACH ROW
  EXECUTE FUNCTION commons.update_entity_version_key();

--
-- TOC entry 5972 (class 2620 OID 22291)
-- Name: namespace update_entity_version_key; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER update_entity_version_key
  BEFORE UPDATE ON data.namespace
  FOR EACH ROW
  EXECUTE FUNCTION commons.update_entity_version_key();

--
-- TOC entry 6200 (class 2620 OID 23134)
-- Name: property_of_property update_entity_version_key; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER update_entity_version_key
  BEFORE UPDATE ON data.property_of_property
  FOR EACH ROW
  EXECUTE FUNCTION commons.update_entity_version_key();

--
-- TOC entry 6194 (class 2620 OID 23077)
-- Name: property_of_property_mapping update_entity_version_key; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER update_entity_version_key
  BEFORE UPDATE ON data.property_of_property_mapping
  FOR EACH ROW
  EXECUTE FUNCTION commons.update_entity_version_key();

--
-- TOC entry 5979 (class 2620 OID 22290)
-- Name: text_property update_entity_version_key; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER update_entity_version_key
  BEFORE UPDATE ON data.text_property
  FOR EACH ROW
  EXECUTE FUNCTION commons.update_entity_version_key();

--
-- TOC entry 5991 (class 2620 OID 22287)
-- Name: values_association update_entity_version_key; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER update_entity_version_key
  BEFORE UPDATE ON data.values_association
  FOR EACH ROW
  EXECUTE FUNCTION commons.update_entity_version_key();

--
-- TOC entry 5911 (class 2620 OID 22305)
-- Name: avatar versioning_trigger; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR DELETE OR UPDATE ON data.avatar
  FOR EACH ROW
  EXECUTE FUNCTION public.versioning('sys_period', 'data.avatar_vt', 'true');

--
-- TOC entry 5918 (class 2620 OID 22293)
-- Name: chunk versioning_trigger; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR DELETE OR UPDATE ON data.chunk
  FOR EACH ROW
  EXECUTE FUNCTION public.versioning('sys_period', 'data.chunk_vt', 'true');

--
-- TOC entry 5924 (class 2620 OID 23034)
-- Name: class_column_mapping versioning_trigger; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR DELETE OR UPDATE ON data.class_column_mapping
  FOR EACH ROW
  EXECUTE FUNCTION public.versioning('sys_period', 'data.class_column_mapping_vt', 'true');

--
-- TOC entry 5930 (class 2620 OID 22295)
-- Name: column versioning_trigger; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR DELETE OR UPDATE ON data."column"
  FOR EACH ROW
  EXECUTE FUNCTION public.versioning('sys_period', 'data.column_vt', 'true');

--
-- TOC entry 5936 (class 2620 OID 22304)
-- Name: data_association versioning_trigger; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR DELETE OR UPDATE ON data.data_association
  FOR EACH ROW
  EXECUTE FUNCTION public.versioning('sys_period', 'data.data_association_vt', 'true');

--
-- TOC entry 5986 (class 2620 OID 23031)
-- Name: data_association_mapping versioning_trigger; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR DELETE OR UPDATE ON data.data_association_mapping
  FOR EACH ROW
  EXECUTE FUNCTION public.versioning('sys_period', 'data.data_association_mapping_vt', 'true');

--
-- TOC entry 5943 (class 2620 OID 22292)
-- Name: digital versioning_trigger; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR DELETE OR UPDATE ON data.digital
  FOR EACH ROW
  EXECUTE FUNCTION public.versioning('sys_period', 'data.digital_vt', 'true');

--
-- TOC entry 5949 (class 2620 OID 22301)
-- Name: factoid versioning_trigger; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR DELETE OR UPDATE ON data.factoid
  FOR EACH ROW
  EXECUTE FUNCTION public.versioning('sys_period', 'data.factoid_vt', 'true');

--
-- TOC entry 5955 (class 2620 OID 23025)
-- Name: factoid_mapping versioning_trigger; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR DELETE OR UPDATE ON data.factoid_mapping
  FOR EACH ROW
  EXECUTE FUNCTION public.versioning('sys_period', 'data.factoid_mapping_vt', 'true');

--
-- TOC entry 5961 (class 2620 OID 24562)
-- Name: factoid_property_mapping versioning_trigger; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR DELETE OR UPDATE ON data.factoid_property_mapping
  FOR EACH ROW
  EXECUTE FUNCTION public.versioning('sys_period', 'data.factoid_property_mapping_vt', 'true');

--
-- TOC entry 5967 (class 2620 OID 22302)
-- Name: factoid_role versioning_trigger; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR DELETE OR UPDATE ON data.factoid_role
  FOR EACH ROW
  EXECUTE FUNCTION public.versioning('sys_period', 'data.factoid_role_vt', 'true');

--
-- TOC entry 5973 (class 2620 OID 22307)
-- Name: namespace versioning_trigger; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR DELETE OR UPDATE ON data.namespace
  FOR EACH ROW
  EXECUTE FUNCTION public.versioning('sys_period', 'data.namespace_vt', 'true');

--
-- TOC entry 6201 (class 2620 OID 23132)
-- Name: property_of_property versioning_trigger; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR DELETE OR UPDATE ON data.property_of_property
  FOR EACH ROW
  EXECUTE FUNCTION public.versioning('sys_period', 'data.property_of_property_vt', 'true');

--
-- TOC entry 6195 (class 2620 OID 23075)
-- Name: property_of_property_mapping versioning_trigger; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR DELETE OR UPDATE ON data.property_of_property_mapping
  FOR EACH ROW
  EXECUTE FUNCTION public.versioning('sys_period', 'data.property_of_property_mapping_vt', 'true');

--
-- TOC entry 5980 (class 2620 OID 22306)
-- Name: text_property versioning_trigger; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR DELETE OR UPDATE ON data.text_property
  FOR EACH ROW
  EXECUTE FUNCTION public.versioning('sys_period', 'data.text_property_vt', 'true');

--
-- TOC entry 5992 (class 2620 OID 22303)
-- Name: values_association versioning_trigger; Type: TRIGGER; Schema: data; Owner: -
--
CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR DELETE OR UPDATE ON data.values_association
  FOR EACH ROW
  EXECUTE FUNCTION public.versioning('sys_period', 'data.values_association_vt', 'true');

--
-- TOC entry 6241 (class 2620 OID 24267)
-- Name: api_class after_api_class_upsert; Type: TRIGGER; Schema: data_for_history; Owner: -
--
CREATE TRIGGER after_api_class_upsert
  AFTER INSERT OR UPDATE ON data_for_history.api_class
  FOR EACH STATEMENT
  EXECUTE FUNCTION war.notify__need_to_check_class_labels();

--
-- TOC entry 6242 (class 2620 OID 24100)
-- Name: api_class create_entity_version_key; Type: TRIGGER; Schema: data_for_history; Owner: -
--
CREATE TRIGGER create_entity_version_key
  BEFORE INSERT ON data_for_history.api_class
  FOR EACH ROW
  EXECUTE FUNCTION commons.create_entity_version_key();

--
-- TOC entry 6011 (class 2620 OID 24048)
-- Name: api_profile create_entity_version_key; Type: TRIGGER; Schema: data_for_history; Owner: -
--
CREATE TRIGGER create_entity_version_key
  BEFORE INSERT ON data_for_history.api_profile
  FOR EACH ROW
  EXECUTE FUNCTION commons.create_entity_version_key();

--
-- TOC entry 6249 (class 2620 OID 24124)
-- Name: api_property create_entity_version_key; Type: TRIGGER; Schema: data_for_history; Owner: -
--
CREATE TRIGGER create_entity_version_key
  BEFORE INSERT ON data_for_history.api_property
  FOR EACH ROW
  EXECUTE FUNCTION commons.create_entity_version_key();

--
-- TOC entry 5993 (class 2620 OID 22318)
-- Name: associates_system_type_deprecated create_entity_version_key; Type: TRIGGER; Schema: data_for_history; Owner: -
--
CREATE TRIGGER create_entity_version_key
  BEFORE INSERT ON data_for_history.associates_system_type_deprecated
  FOR EACH ROW
  EXECUTE FUNCTION commons.create_entity_version_key();

--
-- TOC entry 5999 (class 2620 OID 22312)
-- Name: class_profile_view_deprecated create_entity_version_key; Type: TRIGGER; Schema: data_for_history; Owner: -
--
CREATE TRIGGER create_entity_version_key
  BEFORE INSERT ON data_for_history.class_profile_view_deprecated
  FOR EACH ROW
  EXECUTE FUNCTION commons.create_entity_version_key();

--
-- TOC entry 6005 (class 2620 OID 22313)
-- Name: label_deprecated create_entity_version_key; Type: TRIGGER; Schema: data_for_history; Owner: -
--
CREATE TRIGGER create_entity_version_key
  BEFORE INSERT ON data_for_history.label_deprecated
  FOR EACH ROW
  EXECUTE FUNCTION commons.create_entity_version_key();

--
-- TOC entry 6017 (class 2620 OID 22314)
-- Name: property create_entity_version_key; Type: TRIGGER; Schema: data_for_history; Owner: -
--
CREATE TRIGGER create_entity_version_key
  BEFORE INSERT ON data_for_history.property
  FOR EACH ROW
  EXECUTE FUNCTION commons.create_entity_version_key();

--
-- TOC entry 6023 (class 2620 OID 22317)
-- Name: property_profile_view_deprecated create_entity_version_key; Type: TRIGGER; Schema: data_for_history; Owner: -
--
CREATE TRIGGER create_entity_version_key
  BEFORE INSERT ON data_for_history.property_profile_view_deprecated
  FOR EACH ROW
  EXECUTE FUNCTION commons.create_entity_version_key();

--
-- TOC entry 6029 (class 2620 OID 22319)
-- Name: system_type_deprecated create_entity_version_key; Type: TRIGGER; Schema: data_for_history; Owner: -
--
CREATE TRIGGER create_entity_version_key
  BEFORE INSERT ON data_for_history.system_type_deprecated
  FOR EACH ROW
  EXECUTE FUNCTION commons.create_entity_version_key();

--
-- TOC entry 6034 (class 2620 OID 22315)
-- Name: text_property_deprecated create_entity_version_key; Type: TRIGGER; Schema: data_for_history; Owner: -
--
CREATE TRIGGER create_entity_version_key
  BEFORE INSERT ON data_for_history.text_property_deprecated
  FOR EACH ROW
  EXECUTE FUNCTION commons.create_entity_version_key();

--
-- TOC entry 6243 (class 2620 OID 24091)
-- Name: api_class creation_tmsp; Type: TRIGGER; Schema: data_for_history; Owner: -
--
CREATE TRIGGER creation_tmsp
  BEFORE INSERT ON data_for_history.api_class
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_creation();

--
-- TOC entry 6012 (class 2620 OID 22325)
-- Name: api_profile creation_tmsp; Type: TRIGGER; Schema: data_for_history; Owner: -
--
CREATE TRIGGER creation_tmsp
  BEFORE INSERT ON data_for_history.api_profile
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_creation();

--
-- TOC entry 6250 (class 2620 OID 24115)
-- Name: api_property creation_tmsp; Type: TRIGGER; Schema: data_for_history; Owner: -
--
CREATE TRIGGER creation_tmsp
  BEFORE INSERT ON data_for_history.api_property
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_creation();

--
-- TOC entry 5994 (class 2620 OID 22327)
-- Name: associates_system_type_deprecated creation_tmsp; Type: TRIGGER; Schema: data_for_history; Owner: -
--
CREATE TRIGGER creation_tmsp
  BEFORE INSERT ON data_for_history.associates_system_type_deprecated
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_creation();

--
-- TOC entry 6000 (class 2620 OID 22320)
-- Name: class_profile_view_deprecated creation_tmsp; Type: TRIGGER; Schema: data_for_history; Owner: -
--
CREATE TRIGGER creation_tmsp
  BEFORE INSERT ON data_for_history.class_profile_view_deprecated
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_creation();

--
-- TOC entry 6006 (class 2620 OID 22322)
-- Name: label_deprecated creation_tmsp; Type: TRIGGER; Schema: data_for_history; Owner: -
--
CREATE TRIGGER creation_tmsp
  BEFORE INSERT ON data_for_history.label_deprecated
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_creation();

--
-- TOC entry 6018 (class 2620 OID 22324)
-- Name: property creation_tmsp; Type: TRIGGER; Schema: data_for_history; Owner: -
--
CREATE TRIGGER creation_tmsp
  BEFORE INSERT ON data_for_history.property
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_creation();

--
-- TOC entry 6268 (class 2620 OID 24442)
-- Name: property_of_property creation_tmsp; Type: TRIGGER; Schema: data_for_history; Owner: -
--
CREATE TRIGGER creation_tmsp
  BEFORE INSERT ON data_for_history.property_of_property
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_creation();

--
-- TOC entry 6024 (class 2620 OID 22326)
-- Name: property_profile_view_deprecated creation_tmsp; Type: TRIGGER; Schema: data_for_history; Owner: -
--
CREATE TRIGGER creation_tmsp
  BEFORE INSERT ON data_for_history.property_profile_view_deprecated
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_creation();

--
-- TOC entry 6030 (class 2620 OID 22328)
-- Name: system_type_deprecated creation_tmsp; Type: TRIGGER; Schema: data_for_history; Owner: -
--
CREATE TRIGGER creation_tmsp
  BEFORE INSERT ON data_for_history.system_type_deprecated
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_creation();

--
-- TOC entry 6035 (class 2620 OID 22323)
-- Name: text_property_deprecated creation_tmsp; Type: TRIGGER; Schema: data_for_history; Owner: -
--
CREATE TRIGGER creation_tmsp
  BEFORE INSERT ON data_for_history.text_property_deprecated
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_creation();

--
-- TOC entry 6244 (class 2620 OID 24092)
-- Name: api_class insert_schema_table_name; Type: TRIGGER; Schema: data_for_history; Owner: -
--
CREATE TRIGGER insert_schema_table_name
  BEFORE INSERT ON data_for_history.api_class
  FOR EACH ROW
  EXECUTE FUNCTION commons.insert_schema_table_name();

--
-- TOC entry 6013 (class 2620 OID 22334)
-- Name: api_profile insert_schema_table_name; Type: TRIGGER; Schema: data_for_history; Owner: -
--
CREATE TRIGGER insert_schema_table_name
  BEFORE INSERT ON data_for_history.api_profile
  FOR EACH ROW
  EXECUTE FUNCTION commons.insert_schema_table_name();

--
-- TOC entry 6251 (class 2620 OID 24116)
-- Name: api_property insert_schema_table_name; Type: TRIGGER; Schema: data_for_history; Owner: -
--
CREATE TRIGGER insert_schema_table_name
  BEFORE INSERT ON data_for_history.api_property
  FOR EACH ROW
  EXECUTE FUNCTION commons.insert_schema_table_name();

--
-- TOC entry 5995 (class 2620 OID 22336)
-- Name: associates_system_type_deprecated insert_schema_table_name; Type: TRIGGER; Schema: data_for_history; Owner: -
--
CREATE TRIGGER insert_schema_table_name
  BEFORE INSERT ON data_for_history.associates_system_type_deprecated
  FOR EACH ROW
  EXECUTE FUNCTION commons.insert_schema_table_name();

--
-- TOC entry 6001 (class 2620 OID 22329)
-- Name: class_profile_view_deprecated insert_schema_table_name; Type: TRIGGER; Schema: data_for_history; Owner: -
--
CREATE TRIGGER insert_schema_table_name
  BEFORE INSERT ON data_for_history.class_profile_view_deprecated
  FOR EACH ROW
  EXECUTE FUNCTION commons.insert_schema_table_name();

--
-- TOC entry 6007 (class 2620 OID 22331)
-- Name: label_deprecated insert_schema_table_name; Type: TRIGGER; Schema: data_for_history; Owner: -
--
CREATE TRIGGER insert_schema_table_name
  BEFORE INSERT ON data_for_history.label_deprecated
  FOR EACH ROW
  EXECUTE FUNCTION commons.insert_schema_table_name();

--
-- TOC entry 6019 (class 2620 OID 22333)
-- Name: property insert_schema_table_name; Type: TRIGGER; Schema: data_for_history; Owner: -
--
CREATE TRIGGER insert_schema_table_name
  BEFORE INSERT ON data_for_history.property
  FOR EACH ROW
  EXECUTE FUNCTION commons.insert_schema_table_name();

--
-- TOC entry 6269 (class 2620 OID 24443)
-- Name: property_of_property insert_schema_table_name; Type: TRIGGER; Schema: data_for_history; Owner: -
--
CREATE TRIGGER insert_schema_table_name
  BEFORE INSERT ON data_for_history.property_of_property
  FOR EACH ROW
  EXECUTE FUNCTION commons.insert_schema_table_name();

--
-- TOC entry 6025 (class 2620 OID 22335)
-- Name: property_profile_view_deprecated insert_schema_table_name; Type: TRIGGER; Schema: data_for_history; Owner: -
--
CREATE TRIGGER insert_schema_table_name
  BEFORE INSERT ON data_for_history.property_profile_view_deprecated
  FOR EACH ROW
  EXECUTE FUNCTION commons.insert_schema_table_name();

--
-- TOC entry 6031 (class 2620 OID 22337)
-- Name: system_type_deprecated insert_schema_table_name; Type: TRIGGER; Schema: data_for_history; Owner: -
--
CREATE TRIGGER insert_schema_table_name
  BEFORE INSERT ON data_for_history.system_type_deprecated
  FOR EACH ROW
  EXECUTE FUNCTION commons.insert_schema_table_name();

--
-- TOC entry 6036 (class 2620 OID 22332)
-- Name: text_property_deprecated insert_schema_table_name; Type: TRIGGER; Schema: data_for_history; Owner: -
--
CREATE TRIGGER insert_schema_table_name
  BEFORE INSERT ON data_for_history.text_property_deprecated
  FOR EACH ROW
  EXECUTE FUNCTION commons.insert_schema_table_name();

--
-- TOC entry 6245 (class 2620 OID 24093)
-- Name: api_class last_modification_tmsp; Type: TRIGGER; Schema: data_for_history; Owner: -
--
CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE ON data_for_history.api_class
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_last_modification();

--
-- TOC entry 6014 (class 2620 OID 22343)
-- Name: api_profile last_modification_tmsp; Type: TRIGGER; Schema: data_for_history; Owner: -
--
CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE ON data_for_history.api_profile
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_last_modification();

--
-- TOC entry 6252 (class 2620 OID 24117)
-- Name: api_property last_modification_tmsp; Type: TRIGGER; Schema: data_for_history; Owner: -
--
CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE ON data_for_history.api_property
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_last_modification();

--
-- TOC entry 5996 (class 2620 OID 22345)
-- Name: associates_system_type_deprecated last_modification_tmsp; Type: TRIGGER; Schema: data_for_history; Owner: -
--
CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE ON data_for_history.associates_system_type_deprecated
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_last_modification();

--
-- TOC entry 6002 (class 2620 OID 22338)
-- Name: class_profile_view_deprecated last_modification_tmsp; Type: TRIGGER; Schema: data_for_history; Owner: -
--
CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE ON data_for_history.class_profile_view_deprecated
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_last_modification();

--
-- TOC entry 6008 (class 2620 OID 22340)
-- Name: label_deprecated last_modification_tmsp; Type: TRIGGER; Schema: data_for_history; Owner: -
--
CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE ON data_for_history.label_deprecated
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_last_modification();

--
-- TOC entry 6020 (class 2620 OID 22342)
-- Name: property last_modification_tmsp; Type: TRIGGER; Schema: data_for_history; Owner: -
--
CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE ON data_for_history.property
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_last_modification();

--
-- TOC entry 6270 (class 2620 OID 24444)
-- Name: property_of_property last_modification_tmsp; Type: TRIGGER; Schema: data_for_history; Owner: -
--
CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE ON data_for_history.property_of_property
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_last_modification();

--
-- TOC entry 6026 (class 2620 OID 22344)
-- Name: property_profile_view_deprecated last_modification_tmsp; Type: TRIGGER; Schema: data_for_history; Owner: -
--
CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE ON data_for_history.property_profile_view_deprecated
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_last_modification();

--
-- TOC entry 6032 (class 2620 OID 22346)
-- Name: system_type_deprecated last_modification_tmsp; Type: TRIGGER; Schema: data_for_history; Owner: -
--
CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE ON data_for_history.system_type_deprecated
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_last_modification();

--
-- TOC entry 6037 (class 2620 OID 22341)
-- Name: text_property_deprecated last_modification_tmsp; Type: TRIGGER; Schema: data_for_history; Owner: -
--
CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE ON data_for_history.text_property_deprecated
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_last_modification();

--
-- TOC entry 6246 (class 2620 OID 24519)
-- Name: api_class notify_modification; Type: TRIGGER; Schema: data_for_history; Owner: -
--
CREATE TRIGGER notify_modification
  AFTER INSERT OR DELETE OR UPDATE ON data_for_history.api_class
  FOR EACH STATEMENT
  EXECUTE FUNCTION commons.notify_modification_trigger();

--
-- TOC entry 6253 (class 2620 OID 24521)
-- Name: api_property notify_modification; Type: TRIGGER; Schema: data_for_history; Owner: -
--
CREATE TRIGGER notify_modification
  AFTER INSERT OR DELETE OR UPDATE ON data_for_history.api_property
  FOR EACH STATEMENT
  EXECUTE FUNCTION commons.notify_modification_trigger();

--
-- TOC entry 6247 (class 2620 OID 24101)
-- Name: api_class update_entity_version_key; Type: TRIGGER; Schema: data_for_history; Owner: -
--
CREATE TRIGGER update_entity_version_key
  BEFORE UPDATE ON data_for_history.api_class
  FOR EACH ROW
  EXECUTE FUNCTION commons.update_entity_version_key();

--
-- TOC entry 6015 (class 2620 OID 24049)
-- Name: api_profile update_entity_version_key; Type: TRIGGER; Schema: data_for_history; Owner: -
--
CREATE TRIGGER update_entity_version_key
  BEFORE UPDATE ON data_for_history.api_profile
  FOR EACH ROW
  EXECUTE FUNCTION commons.update_entity_version_key();

--
-- TOC entry 6254 (class 2620 OID 24125)
-- Name: api_property update_entity_version_key; Type: TRIGGER; Schema: data_for_history; Owner: -
--
CREATE TRIGGER update_entity_version_key
  BEFORE UPDATE ON data_for_history.api_property
  FOR EACH ROW
  EXECUTE FUNCTION commons.update_entity_version_key();

--
-- TOC entry 5997 (class 2620 OID 22354)
-- Name: associates_system_type_deprecated update_entity_version_key; Type: TRIGGER; Schema: data_for_history; Owner: -
--
CREATE TRIGGER update_entity_version_key
  BEFORE UPDATE ON data_for_history.associates_system_type_deprecated
  FOR EACH ROW
  EXECUTE FUNCTION commons.update_entity_version_key();

--
-- TOC entry 6003 (class 2620 OID 22348)
-- Name: class_profile_view_deprecated update_entity_version_key; Type: TRIGGER; Schema: data_for_history; Owner: -
--
CREATE TRIGGER update_entity_version_key
  BEFORE UPDATE ON data_for_history.class_profile_view_deprecated
  FOR EACH ROW
  EXECUTE FUNCTION commons.update_entity_version_key();

--
-- TOC entry 6009 (class 2620 OID 22349)
-- Name: label_deprecated update_entity_version_key; Type: TRIGGER; Schema: data_for_history; Owner: -
--
CREATE TRIGGER update_entity_version_key
  BEFORE UPDATE ON data_for_history.label_deprecated
  FOR EACH ROW
  EXECUTE FUNCTION commons.update_entity_version_key();

--
-- TOC entry 6021 (class 2620 OID 22350)
-- Name: property update_entity_version_key; Type: TRIGGER; Schema: data_for_history; Owner: -
--
CREATE TRIGGER update_entity_version_key
  BEFORE UPDATE ON data_for_history.property
  FOR EACH ROW
  EXECUTE FUNCTION commons.update_entity_version_key();

--
-- TOC entry 6027 (class 2620 OID 22353)
-- Name: property_profile_view_deprecated update_entity_version_key; Type: TRIGGER; Schema: data_for_history; Owner: -
--
CREATE TRIGGER update_entity_version_key
  BEFORE UPDATE ON data_for_history.property_profile_view_deprecated
  FOR EACH ROW
  EXECUTE FUNCTION commons.update_entity_version_key();

--
-- TOC entry 6038 (class 2620 OID 22351)
-- Name: text_property_deprecated update_entity_version_key; Type: TRIGGER; Schema: data_for_history; Owner: -
--
CREATE TRIGGER update_entity_version_key
  BEFORE UPDATE ON data_for_history.text_property_deprecated
  FOR EACH ROW
  EXECUTE FUNCTION commons.update_entity_version_key();

--
-- TOC entry 6248 (class 2620 OID 24099)
-- Name: api_class versioning_trigger; Type: TRIGGER; Schema: data_for_history; Owner: -
--
CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR DELETE OR UPDATE ON data_for_history.api_class
  FOR EACH ROW
  EXECUTE FUNCTION public.versioning('sys_period', 'data_for_history.api_class_vt', 'true');

--
-- TOC entry 6016 (class 2620 OID 24047)
-- Name: api_profile versioning_trigger; Type: TRIGGER; Schema: data_for_history; Owner: -
--
CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR DELETE OR UPDATE ON data_for_history.api_profile
  FOR EACH ROW
  EXECUTE FUNCTION public.versioning('sys_period', 'data_for_history.api_profile_vt', 'true');

--
-- TOC entry 6255 (class 2620 OID 24123)
-- Name: api_property versioning_trigger; Type: TRIGGER; Schema: data_for_history; Owner: -
--
CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR DELETE OR UPDATE ON data_for_history.api_property
  FOR EACH ROW
  EXECUTE FUNCTION public.versioning('sys_period', 'data_for_history.api_property_vt', 'true');

--
-- TOC entry 5998 (class 2620 OID 22362)
-- Name: associates_system_type_deprecated versioning_trigger; Type: TRIGGER; Schema: data_for_history; Owner: -
--
CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR DELETE OR UPDATE ON data_for_history.associates_system_type_deprecated
  FOR EACH ROW
  EXECUTE FUNCTION public.versioning('sys_period', 'data_for_history.associates_system_type_vt', 'true');

--
-- TOC entry 6004 (class 2620 OID 22355)
-- Name: class_profile_view_deprecated versioning_trigger; Type: TRIGGER; Schema: data_for_history; Owner: -
--
CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR DELETE OR UPDATE ON data_for_history.class_profile_view_deprecated
  FOR EACH ROW
  EXECUTE FUNCTION public.versioning('sys_period', 'data_for_history.class_profile_view_vt', 'true');

--
-- TOC entry 6010 (class 2620 OID 22357)
-- Name: label_deprecated versioning_trigger; Type: TRIGGER; Schema: data_for_history; Owner: -
--
CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR DELETE OR UPDATE ON data_for_history.label_deprecated
  FOR EACH ROW
  EXECUTE FUNCTION public.versioning('sys_period', 'data_for_history.label_vt', 'true');

--
-- TOC entry 6022 (class 2620 OID 22359)
-- Name: property versioning_trigger; Type: TRIGGER; Schema: data_for_history; Owner: -
--
CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR DELETE OR UPDATE ON data_for_history.property
  FOR EACH ROW
  EXECUTE FUNCTION public.versioning('sys_period', 'data_for_history.property_vt', 'true');

--
-- TOC entry 6271 (class 2620 OID 24450)
-- Name: property_of_property versioning_trigger; Type: TRIGGER; Schema: data_for_history; Owner: -
--
CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR DELETE OR UPDATE ON data_for_history.property_of_property
  FOR EACH ROW
  EXECUTE FUNCTION public.versioning('sys_period', 'data_for_history.property_of_property_vt', 'true');

--
-- TOC entry 6028 (class 2620 OID 22361)
-- Name: property_profile_view_deprecated versioning_trigger; Type: TRIGGER; Schema: data_for_history; Owner: -
--
CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR DELETE OR UPDATE ON data_for_history.property_profile_view_deprecated
  FOR EACH ROW
  EXECUTE FUNCTION public.versioning('sys_period', 'data_for_history.property_profile_view_vt', 'true');

--
-- TOC entry 6033 (class 2620 OID 22363)
-- Name: system_type_deprecated versioning_trigger; Type: TRIGGER; Schema: data_for_history; Owner: -
--
CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR DELETE OR UPDATE ON data_for_history.system_type_deprecated
  FOR EACH ROW
  EXECUTE FUNCTION public.versioning('sys_period', 'data_for_history.system_type_vt', 'true');

--
-- TOC entry 6039 (class 2620 OID 22358)
-- Name: text_property_deprecated versioning_trigger; Type: TRIGGER; Schema: data_for_history; Owner: -
--
CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR DELETE OR UPDATE ON data_for_history.text_property_deprecated
  FOR EACH ROW
  EXECUTE FUNCTION public.versioning('sys_period', 'data_for_history.text_property_vt', 'true');

--
-- TOC entry 6104 (class 2620 OID 22366)
-- Name: v_text_property _02_find_or_create; Type: TRIGGER; Schema: information; Owner: -
--
CREATE TRIGGER _02_find_or_create
  INSTEAD OF INSERT ON information.v_text_property
  FOR EACH ROW
  EXECUTE FUNCTION information.v_text_property_find_or_create();

--
-- TOC entry 6040 (class 2620 OID 22371)
-- Name: appellation create_entity_version_key; Type: TRIGGER; Schema: information; Owner: -
--
CREATE TRIGGER create_entity_version_key
  BEFORE INSERT ON information.appellation
  FOR EACH ROW
  EXECUTE FUNCTION commons.create_entity_version_key();

--
-- TOC entry 6069 (class 2620 OID 22370)
-- Name: text_property create_entity_version_key; Type: TRIGGER; Schema: information; Owner: -
--
CREATE TRIGGER create_entity_version_key
  BEFORE INSERT ON information.text_property
  FOR EACH ROW
  EXECUTE FUNCTION commons.create_entity_version_key();

--
-- TOC entry 6047 (class 2620 OID 22374)
-- Name: _backup_entity_association creation_tmsp; Type: TRIGGER; Schema: information; Owner: -
--
CREATE TRIGGER creation_tmsp
  BEFORE INSERT ON information._backup_entity_association
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_creation();

--
-- TOC entry 6041 (class 2620 OID 22373)
-- Name: appellation creation_tmsp; Type: TRIGGER; Schema: information; Owner: -
--
CREATE TRIGGER creation_tmsp
  BEFORE INSERT ON information.appellation
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_creation();

--
-- TOC entry 6202 (class 2620 OID 23165)
-- Name: dimension creation_tmsp; Type: TRIGGER; Schema: information; Owner: -
--
CREATE TRIGGER creation_tmsp
  BEFORE INSERT ON information.dimension
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_creation();

--
-- TOC entry 6261 (class 2620 OID 24412)
-- Name: lang_string creation_tmsp; Type: TRIGGER; Schema: information; Owner: -
--
CREATE TRIGGER creation_tmsp
  BEFORE INSERT ON information.lang_string
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_creation();

--
-- TOC entry 6051 (class 2620 OID 22379)
-- Name: language creation_tmsp; Type: TRIGGER; Schema: information; Owner: -
--
CREATE TRIGGER creation_tmsp
  BEFORE INSERT ON information.language
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_creation();

--
-- TOC entry 6055 (class 2620 OID 22375)
-- Name: persistent_item_backup creation_tmsp; Type: TRIGGER; Schema: information; Owner: -
--
CREATE TRIGGER creation_tmsp
  BEFORE INSERT ON information.persistent_item_backup
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_creation();

--
-- TOC entry 6060 (class 2620 OID 22381)
-- Name: place creation_tmsp; Type: TRIGGER; Schema: information; Owner: -
--
CREATE TRIGGER creation_tmsp
  BEFORE INSERT ON information.place
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_creation();

--
-- TOC entry 6288 (class 2620 OID 24655)
-- Name: resource creation_tmsp; Type: TRIGGER; Schema: information; Owner: -
--
CREATE TRIGGER creation_tmsp
  BEFORE INSERT ON information.resource
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_creation();

--
-- TOC entry 6064 (class 2620 OID 24381)
-- Name: statement creation_tmsp; Type: TRIGGER; Schema: information; Owner: -
--
CREATE TRIGGER creation_tmsp
  BEFORE INSERT ON information.statement
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_creation();

--
-- TOC entry 5900 (class 2620 OID 22377)
-- Name: temporal_entity_backup creation_tmsp; Type: TRIGGER; Schema: information; Owner: -
--
CREATE TRIGGER creation_tmsp
  BEFORE INSERT ON information.temporal_entity_backup
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_creation();

--
-- TOC entry 6070 (class 2620 OID 22378)
-- Name: text_property creation_tmsp; Type: TRIGGER; Schema: information; Owner: -
--
CREATE TRIGGER creation_tmsp
  BEFORE INSERT ON information.text_property
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_creation();

--
-- TOC entry 6076 (class 2620 OID 22380)
-- Name: time_primitive creation_tmsp; Type: TRIGGER; Schema: information; Owner: -
--
CREATE TRIGGER creation_tmsp
  BEFORE INSERT ON information.time_primitive
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_creation();

--
-- TOC entry 6048 (class 2620 OID 22386)
-- Name: _backup_entity_association insert_schema_table_name; Type: TRIGGER; Schema: information; Owner: -
--
CREATE TRIGGER insert_schema_table_name
  BEFORE INSERT ON information._backup_entity_association
  FOR EACH ROW
  EXECUTE FUNCTION commons.insert_schema_table_name();

--
-- TOC entry 6042 (class 2620 OID 22385)
-- Name: appellation insert_schema_table_name; Type: TRIGGER; Schema: information; Owner: -
--
CREATE TRIGGER insert_schema_table_name
  BEFORE INSERT ON information.appellation
  FOR EACH ROW
  EXECUTE FUNCTION commons.insert_schema_table_name();

--
-- TOC entry 6203 (class 2620 OID 23166)
-- Name: dimension insert_schema_table_name; Type: TRIGGER; Schema: information; Owner: -
--
CREATE TRIGGER insert_schema_table_name
  BEFORE INSERT ON information.dimension
  FOR EACH ROW
  EXECUTE FUNCTION commons.insert_schema_table_name();

--
-- TOC entry 6262 (class 2620 OID 24413)
-- Name: lang_string insert_schema_table_name; Type: TRIGGER; Schema: information; Owner: -
--
CREATE TRIGGER insert_schema_table_name
  BEFORE INSERT ON information.lang_string
  FOR EACH ROW
  EXECUTE FUNCTION commons.insert_schema_table_name();

--
-- TOC entry 6052 (class 2620 OID 22391)
-- Name: language insert_schema_table_name; Type: TRIGGER; Schema: information; Owner: -
--
CREATE TRIGGER insert_schema_table_name
  BEFORE INSERT ON information.language
  FOR EACH ROW
  EXECUTE FUNCTION commons.insert_schema_table_name();

--
-- TOC entry 6056 (class 2620 OID 22387)
-- Name: persistent_item_backup insert_schema_table_name; Type: TRIGGER; Schema: information; Owner: -
--
CREATE TRIGGER insert_schema_table_name
  BEFORE INSERT ON information.persistent_item_backup
  FOR EACH ROW
  EXECUTE FUNCTION commons.insert_schema_table_name();

--
-- TOC entry 6061 (class 2620 OID 22393)
-- Name: place insert_schema_table_name; Type: TRIGGER; Schema: information; Owner: -
--
CREATE TRIGGER insert_schema_table_name
  BEFORE INSERT ON information.place
  FOR EACH ROW
  EXECUTE FUNCTION commons.insert_schema_table_name();

--
-- TOC entry 6289 (class 2620 OID 24656)
-- Name: resource insert_schema_table_name; Type: TRIGGER; Schema: information; Owner: -
--
CREATE TRIGGER insert_schema_table_name
  BEFORE INSERT ON information.resource
  FOR EACH ROW
  EXECUTE FUNCTION commons.insert_schema_table_name();

--
-- TOC entry 6065 (class 2620 OID 22388)
-- Name: statement insert_schema_table_name; Type: TRIGGER; Schema: information; Owner: -
--
CREATE TRIGGER insert_schema_table_name
  BEFORE INSERT ON information.statement
  FOR EACH ROW
  EXECUTE FUNCTION commons.insert_schema_table_name();

--
-- TOC entry 5901 (class 2620 OID 22389)
-- Name: temporal_entity_backup insert_schema_table_name; Type: TRIGGER; Schema: information; Owner: -
--
CREATE TRIGGER insert_schema_table_name
  BEFORE INSERT ON information.temporal_entity_backup
  FOR EACH ROW
  EXECUTE FUNCTION commons.insert_schema_table_name();

--
-- TOC entry 6071 (class 2620 OID 22390)
-- Name: text_property insert_schema_table_name; Type: TRIGGER; Schema: information; Owner: -
--
CREATE TRIGGER insert_schema_table_name
  BEFORE INSERT ON information.text_property
  FOR EACH ROW
  EXECUTE FUNCTION commons.insert_schema_table_name();

--
-- TOC entry 6077 (class 2620 OID 22392)
-- Name: time_primitive insert_schema_table_name; Type: TRIGGER; Schema: information; Owner: -
--
CREATE TRIGGER insert_schema_table_name
  BEFORE INSERT ON information.time_primitive
  FOR EACH ROW
  EXECUTE FUNCTION commons.insert_schema_table_name();

--
-- TOC entry 6049 (class 2620 OID 22398)
-- Name: _backup_entity_association last_modification_tmsp; Type: TRIGGER; Schema: information; Owner: -
--
CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE ON information._backup_entity_association
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_last_modification();

--
-- TOC entry 6043 (class 2620 OID 22397)
-- Name: appellation last_modification_tmsp; Type: TRIGGER; Schema: information; Owner: -
--
CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE ON information.appellation
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_last_modification();

--
-- TOC entry 6204 (class 2620 OID 23167)
-- Name: dimension last_modification_tmsp; Type: TRIGGER; Schema: information; Owner: -
--
CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE ON information.dimension
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_last_modification();

--
-- TOC entry 6263 (class 2620 OID 24414)
-- Name: lang_string last_modification_tmsp; Type: TRIGGER; Schema: information; Owner: -
--
CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE ON information.lang_string
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_last_modification();

--
-- TOC entry 6053 (class 2620 OID 22403)
-- Name: language last_modification_tmsp; Type: TRIGGER; Schema: information; Owner: -
--
CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE ON information.language
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_last_modification();

--
-- TOC entry 6057 (class 2620 OID 22399)
-- Name: persistent_item_backup last_modification_tmsp; Type: TRIGGER; Schema: information; Owner: -
--
CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE ON information.persistent_item_backup
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_last_modification();

--
-- TOC entry 6062 (class 2620 OID 22405)
-- Name: place last_modification_tmsp; Type: TRIGGER; Schema: information; Owner: -
--
CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE ON information.place
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_last_modification();

--
-- TOC entry 6290 (class 2620 OID 24657)
-- Name: resource last_modification_tmsp; Type: TRIGGER; Schema: information; Owner: -
--
CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE ON information.resource
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_last_modification();

--
-- TOC entry 6066 (class 2620 OID 24382)
-- Name: statement last_modification_tmsp; Type: TRIGGER; Schema: information; Owner: -
--
CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE ON information.statement
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_last_modification();

--
-- TOC entry 5902 (class 2620 OID 22401)
-- Name: temporal_entity_backup last_modification_tmsp; Type: TRIGGER; Schema: information; Owner: -
--
CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE ON information.temporal_entity_backup
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_last_modification();

--
-- TOC entry 6072 (class 2620 OID 22402)
-- Name: text_property last_modification_tmsp; Type: TRIGGER; Schema: information; Owner: -
--
CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE ON information.text_property
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_last_modification();

--
-- TOC entry 6078 (class 2620 OID 22404)
-- Name: time_primitive last_modification_tmsp; Type: TRIGGER; Schema: information; Owner: -
--
CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE ON information.time_primitive
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_last_modification();

--
-- TOC entry 6058 (class 2620 OID 24516)
-- Name: persistent_item_backup notify_modification; Type: TRIGGER; Schema: information; Owner: -
--
CREATE TRIGGER notify_modification
  AFTER INSERT OR DELETE OR UPDATE ON information.persistent_item_backup
  FOR EACH STATEMENT
  EXECUTE FUNCTION commons.notify_modification_trigger();

--
-- TOC entry 6291 (class 2620 OID 24664)
-- Name: resource notify_modification; Type: TRIGGER; Schema: information; Owner: -
--
CREATE TRIGGER notify_modification
  AFTER INSERT OR DELETE OR UPDATE ON information.resource
  FOR EACH STATEMENT
  EXECUTE FUNCTION commons.notify_modification_trigger();

--
-- TOC entry 6067 (class 2620 OID 24515)
-- Name: statement notify_modification; Type: TRIGGER; Schema: information; Owner: -
--
CREATE TRIGGER notify_modification
  AFTER INSERT OR DELETE OR UPDATE ON information.statement
  FOR EACH STATEMENT
  EXECUTE FUNCTION commons.notify_modification_trigger();

--
-- TOC entry 5903 (class 2620 OID 24517)
-- Name: temporal_entity_backup notify_modification; Type: TRIGGER; Schema: information; Owner: -
--
CREATE TRIGGER notify_modification
  AFTER INSERT OR DELETE OR UPDATE ON information.temporal_entity_backup
  FOR EACH STATEMENT
  EXECUTE FUNCTION commons.notify_modification_trigger();

--
-- TOC entry 6206 (class 2620 OID 23181)
-- Name: v_dimension on_insert; Type: TRIGGER; Schema: information; Owner: -
--
CREATE TRIGGER on_insert
  INSTEAD OF INSERT ON information.v_dimension
  FOR EACH ROW
  EXECUTE FUNCTION information.v_dimension_find_or_create();

--
-- TOC entry 6267 (class 2620 OID 24426)
-- Name: v_lang_string on_insert; Type: TRIGGER; Schema: information; Owner: -
--
CREATE TRIGGER on_insert
  INSTEAD OF INSERT ON information.v_lang_string
  FOR EACH ROW
  EXECUTE FUNCTION information.v_lang_string_find_or_create();

--
-- TOC entry 6089 (class 2620 OID 22411)
-- Name: v_language on_insert; Type: TRIGGER; Schema: information; Owner: -
--
CREATE TRIGGER on_insert
  INSTEAD OF INSERT ON information.v_language
  FOR EACH ROW
  EXECUTE FUNCTION information.v_language_find_or_create();

--
-- TOC entry 6103 (class 2620 OID 22412)
-- Name: v_place on_insert; Type: TRIGGER; Schema: information; Owner: -
--
CREATE TRIGGER on_insert
  INSTEAD OF INSERT ON information.v_place
  FOR EACH ROW
  EXECUTE FUNCTION information.v_place_find_or_create();

--
-- TOC entry 6293 (class 2620 OID 24701)
-- Name: v_statement on_insert; Type: TRIGGER; Schema: information; Owner: -
--
CREATE TRIGGER on_insert
  INSTEAD OF INSERT ON information.v_statement
  FOR EACH ROW
  EXECUTE FUNCTION information.v_statement_find_or_create();

--
-- TOC entry 6207 (class 2620 OID 23211)
-- Name: v_time_primitive on_insert; Type: TRIGGER; Schema: information; Owner: -
--
CREATE TRIGGER on_insert
  INSTEAD OF INSERT ON information.v_time_primitive
  FOR EACH ROW
  EXECUTE FUNCTION information.v_time_primitive_find_or_create();

--
-- TOC entry 6044 (class 2620 OID 22417)
-- Name: appellation sync_quill_doc_and_string; Type: TRIGGER; Schema: information; Owner: -
--
CREATE TRIGGER sync_quill_doc_and_string
  BEFORE INSERT OR UPDATE ON information.appellation
  FOR EACH ROW
  EXECUTE FUNCTION commons.text__sync_quill_doc_and_string();

--
-- TOC entry 6264 (class 2620 OID 24407)
-- Name: lang_string sync_quill_doc_and_string; Type: TRIGGER; Schema: information; Owner: -
--
CREATE TRIGGER sync_quill_doc_and_string
  BEFORE INSERT OR UPDATE ON information.lang_string
  FOR EACH ROW
  EXECUTE FUNCTION commons.text__sync_quill_doc_and_string();

--
-- TOC entry 6073 (class 2620 OID 22416)
-- Name: text_property sync_quill_doc_and_string; Type: TRIGGER; Schema: information; Owner: -
--
CREATE TRIGGER sync_quill_doc_and_string
  BEFORE INSERT OR UPDATE ON information.text_property
  FOR EACH ROW
  EXECUTE FUNCTION commons.text__sync_quill_doc_and_string();

--
-- TOC entry 6045 (class 2620 OID 22421)
-- Name: appellation update_entity_version_key; Type: TRIGGER; Schema: information; Owner: -
--
CREATE TRIGGER update_entity_version_key
  BEFORE UPDATE ON information.appellation
  FOR EACH ROW
  EXECUTE FUNCTION commons.update_entity_version_key();

--
-- TOC entry 6265 (class 2620 OID 24406)
-- Name: lang_string update_entity_version_key; Type: TRIGGER; Schema: information; Owner: -
--
CREATE TRIGGER update_entity_version_key
  BEFORE UPDATE ON information.lang_string
  FOR EACH ROW
  EXECUTE FUNCTION commons.update_entity_version_key();

--
-- TOC entry 6074 (class 2620 OID 22420)
-- Name: text_property update_entity_version_key; Type: TRIGGER; Schema: information; Owner: -
--
CREATE TRIGGER update_entity_version_key
  BEFORE UPDATE ON information.text_property
  FOR EACH ROW
  EXECUTE FUNCTION commons.update_entity_version_key();

--
-- TOC entry 6050 (class 2620 OID 22423)
-- Name: _backup_entity_association versioning_trigger; Type: TRIGGER; Schema: information; Owner: -
--
CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR DELETE OR UPDATE ON information._backup_entity_association
  FOR EACH ROW
  EXECUTE FUNCTION public.versioning('sys_period', 'information.entity_association_vt', 'true');

--
-- TOC entry 6046 (class 2620 OID 22433)
-- Name: appellation versioning_trigger; Type: TRIGGER; Schema: information; Owner: -
--
CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR DELETE OR UPDATE ON information.appellation
  FOR EACH ROW
  EXECUTE FUNCTION public.versioning('sys_period', 'information.appellation_vt', 'true');

--
-- TOC entry 6205 (class 2620 OID 23173)
-- Name: dimension versioning_trigger; Type: TRIGGER; Schema: information; Owner: -
--
CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR DELETE OR UPDATE ON information.dimension
  FOR EACH ROW
  EXECUTE FUNCTION public.versioning('sys_period', 'information.dimension_vt', 'true');

--
-- TOC entry 6266 (class 2620 OID 24420)
-- Name: lang_string versioning_trigger; Type: TRIGGER; Schema: information; Owner: -
--
CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR DELETE OR UPDATE ON information.lang_string
  FOR EACH ROW
  EXECUTE FUNCTION public.versioning('sys_period', 'information.lang_string_vt', 'true');

--
-- TOC entry 6054 (class 2620 OID 22424)
-- Name: language versioning_trigger; Type: TRIGGER; Schema: information; Owner: -
--
CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR DELETE OR UPDATE ON information.language
  FOR EACH ROW
  EXECUTE FUNCTION public.versioning('sys_period', 'information.language_vt', 'true');

--
-- TOC entry 6059 (class 2620 OID 22425)
-- Name: persistent_item_backup versioning_trigger; Type: TRIGGER; Schema: information; Owner: -
--
CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR DELETE OR UPDATE ON information.persistent_item_backup
  FOR EACH ROW
  EXECUTE FUNCTION public.versioning('sys_period', 'information.persistent_item_vt', 'true');

--
-- TOC entry 6063 (class 2620 OID 22428)
-- Name: place versioning_trigger; Type: TRIGGER; Schema: information; Owner: -
--
CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR DELETE OR UPDATE ON information.place
  FOR EACH ROW
  EXECUTE FUNCTION public.versioning('sys_period', 'information.place_vt', 'true');

--
-- TOC entry 6292 (class 2620 OID 24663)
-- Name: resource versioning_trigger; Type: TRIGGER; Schema: information; Owner: -
--
CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR DELETE OR UPDATE ON information.resource
  FOR EACH ROW
  EXECUTE FUNCTION public.versioning('sys_period', 'information.resource_vt', 'true');

--
-- TOC entry 6068 (class 2620 OID 24511)
-- Name: statement versioning_trigger; Type: TRIGGER; Schema: information; Owner: -
--
CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR DELETE OR UPDATE ON information.statement
  FOR EACH ROW
  EXECUTE FUNCTION public.versioning('sys_period', 'information.statement_vt', 'true');

--
-- TOC entry 5904 (class 2620 OID 22427)
-- Name: temporal_entity_backup versioning_trigger; Type: TRIGGER; Schema: information; Owner: -
--
CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR DELETE OR UPDATE ON information.temporal_entity_backup
  FOR EACH ROW
  EXECUTE FUNCTION public.versioning('sys_period', 'information.temporal_entity_vt', 'true');

--
-- TOC entry 6075 (class 2620 OID 22432)
-- Name: text_property versioning_trigger; Type: TRIGGER; Schema: information; Owner: -
--
CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR DELETE OR UPDATE ON information.text_property
  FOR EACH ROW
  EXECUTE FUNCTION public.versioning('sys_period', 'information.text_property_vt', 'true');

--
-- TOC entry 6079 (class 2620 OID 22429)
-- Name: time_primitive versioning_trigger; Type: TRIGGER; Schema: information; Owner: -
--
CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR DELETE OR UPDATE ON information.time_primitive
  FOR EACH ROW
  EXECUTE FUNCTION public.versioning('sys_period', 'information.time_primitive_vt', 'true');

--
-- TOC entry 6122 (class 2620 OID 24969)
-- Name: project add_entity_preview_partition; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER add_entity_preview_partition
  BEFORE INSERT ON projects.project
  FOR EACH ROW
  EXECUTE FUNCTION projects.add_entity_preview_partition();

--
-- TOC entry 6080 (class 2620 OID 24266)
-- Name: info_proj_rel after_epr_upsert; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER after_epr_upsert
  AFTER INSERT OR UPDATE ON projects.info_proj_rel
  FOR EACH STATEMENT
  EXECUTE FUNCTION war.after_info_proj_rel_upsert();

--
-- TOC entry 6136 (class 2620 OID 24268)
-- Name: text_property after_update_or_insert_of_class_label; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER after_update_or_insert_of_class_label
  AFTER INSERT OR UPDATE ON projects.text_property
  FOR EACH ROW
  WHEN((new.fk_dfh_class IS NOT NULL))
  EXECUTE FUNCTION war.notify__need_to_check_class_labels();

--
-- TOC entry 6228 (class 2620 OID 24006)
-- Name: analysis create_entity_version_key; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER create_entity_version_key
  BEFORE INSERT ON projects.analysis
  FOR EACH ROW
  EXECUTE FUNCTION commons.create_entity_version_key();

--
-- TOC entry 6105 (class 2620 OID 22436)
-- Name: argument create_entity_version_key; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER create_entity_version_key
  BEFORE INSERT ON projects.argument
  FOR EACH ROW
  EXECUTE FUNCTION commons.create_entity_version_key();

--
-- TOC entry 6090 (class 2620 OID 22445)
-- Name: class_field_config create_entity_version_key; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER create_entity_version_key
  BEFORE INSERT ON projects.class_field_config
  FOR EACH ROW
  EXECUTE FUNCTION commons.create_entity_version_key();

--
-- TOC entry 6111 (class 2620 OID 22444)
-- Name: dfh_class_proj_rel create_entity_version_key; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER create_entity_version_key
  BEFORE INSERT ON projects.dfh_class_proj_rel
  FOR EACH ROW
  EXECUTE FUNCTION commons.create_entity_version_key();

--
-- TOC entry 6234 (class 2620 OID 24076)
-- Name: dfh_profile_proj_rel create_entity_version_key; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER create_entity_version_key
  BEFORE INSERT ON projects.dfh_profile_proj_rel
  FOR EACH ROW
  EXECUTE FUNCTION commons.create_entity_version_key();

--
-- TOC entry 6081 (class 2620 OID 22443)
-- Name: info_proj_rel create_entity_version_key; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER create_entity_version_key
  BEFORE INSERT ON projects.info_proj_rel
  FOR EACH ROW
  EXECUTE FUNCTION commons.create_entity_version_key();

--
-- TOC entry 6117 (class 2620 OID 22438)
-- Name: language create_entity_version_key; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER create_entity_version_key
  BEFORE INSERT ON projects.language
  FOR EACH ROW
  EXECUTE FUNCTION commons.create_entity_version_key();

--
-- TOC entry 6123 (class 2620 OID 22437)
-- Name: project create_entity_version_key; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER create_entity_version_key
  BEFORE INSERT ON projects.project
  FOR EACH ROW
  EXECUTE FUNCTION commons.create_entity_version_key();

--
-- TOC entry 6209 (class 2620 OID 23768)
-- Name: property_label_deprecated create_entity_version_key; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER create_entity_version_key
  BEFORE INSERT ON projects.property_label_deprecated
  FOR EACH ROW
  EXECUTE FUNCTION commons.create_entity_version_key();

--
-- TOC entry 6130 (class 2620 OID 22441)
-- Name: query create_entity_version_key; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER create_entity_version_key
  BEFORE INSERT ON projects.query
  FOR EACH ROW
  EXECUTE FUNCTION commons.create_entity_version_key();

--
-- TOC entry 6137 (class 2620 OID 22439)
-- Name: text_property create_entity_version_key; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER create_entity_version_key
  BEFORE INSERT ON projects.text_property
  FOR EACH ROW
  EXECUTE FUNCTION commons.create_entity_version_key();

--
-- TOC entry 6145 (class 2620 OID 22442)
-- Name: visual create_entity_version_key; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER create_entity_version_key
  BEFORE INSERT ON projects.visual
  FOR EACH ROW
  EXECUTE FUNCTION commons.create_entity_version_key();

--
-- TOC entry 6229 (class 2620 OID 23997)
-- Name: analysis creation_tmsp; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER creation_tmsp
  BEFORE INSERT ON projects.analysis
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_creation();

--
-- TOC entry 6106 (class 2620 OID 22450)
-- Name: argument creation_tmsp; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER creation_tmsp
  BEFORE INSERT ON projects.argument
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_creation();

--
-- TOC entry 6091 (class 2620 OID 22455)
-- Name: class_field_config creation_tmsp; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER creation_tmsp
  BEFORE INSERT ON projects.class_field_config
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_creation();

--
-- TOC entry 6112 (class 2620 OID 22454)
-- Name: dfh_class_proj_rel creation_tmsp; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER creation_tmsp
  BEFORE INSERT ON projects.dfh_class_proj_rel
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_creation();

--
-- TOC entry 6235 (class 2620 OID 24067)
-- Name: dfh_profile_proj_rel creation_tmsp; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER creation_tmsp
  BEFORE INSERT ON projects.dfh_profile_proj_rel
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_creation();

--
-- TOC entry 6279 (class 2620 OID 24543)
-- Name: entity_label_config creation_tmsp; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER creation_tmsp
  BEFORE INSERT ON projects.entity_label_config
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_creation();

--
-- TOC entry 6082 (class 2620 OID 22453)
-- Name: info_proj_rel creation_tmsp; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER creation_tmsp
  BEFORE INSERT ON projects.info_proj_rel
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_creation();

--
-- TOC entry 6118 (class 2620 OID 22446)
-- Name: language creation_tmsp; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER creation_tmsp
  BEFORE INSERT ON projects.language
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_creation();

--
-- TOC entry 6124 (class 2620 OID 22448)
-- Name: project creation_tmsp; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER creation_tmsp
  BEFORE INSERT ON projects.project
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_creation();

--
-- TOC entry 6210 (class 2620 OID 23759)
-- Name: property_label_deprecated creation_tmsp; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER creation_tmsp
  BEFORE INSERT ON projects.property_label_deprecated
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_creation();

--
-- TOC entry 6131 (class 2620 OID 22451)
-- Name: query creation_tmsp; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER creation_tmsp
  BEFORE INSERT ON projects.query
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_creation();

--
-- TOC entry 6284 (class 2620 OID 24609)
-- Name: table_config creation_tmsp; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER creation_tmsp
  BEFORE INSERT ON projects.table_config
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_creation();

--
-- TOC entry 6138 (class 2620 OID 22449)
-- Name: text_property creation_tmsp; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER creation_tmsp
  BEFORE INSERT ON projects.text_property
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_creation();

--
-- TOC entry 6295 (class 2620 OID 24988)
-- Name: visibility_settings creation_tmsp; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER creation_tmsp
  BEFORE INSERT ON projects.visibility_settings
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_creation();

--
-- TOC entry 6146 (class 2620 OID 22452)
-- Name: visual creation_tmsp; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER creation_tmsp
  BEFORE INSERT ON projects.visual
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_creation();

--
-- TOC entry 6230 (class 2620 OID 23998)
-- Name: analysis insert_schema_table_name; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER insert_schema_table_name
  BEFORE INSERT ON projects.analysis
  FOR EACH ROW
  EXECUTE FUNCTION commons.insert_schema_table_name();

--
-- TOC entry 6107 (class 2620 OID 22459)
-- Name: argument insert_schema_table_name; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER insert_schema_table_name
  BEFORE INSERT ON projects.argument
  FOR EACH ROW
  EXECUTE FUNCTION commons.insert_schema_table_name();

--
-- TOC entry 6092 (class 2620 OID 22464)
-- Name: class_field_config insert_schema_table_name; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER insert_schema_table_name
  BEFORE INSERT ON projects.class_field_config
  FOR EACH ROW
  EXECUTE FUNCTION commons.insert_schema_table_name();

--
-- TOC entry 6113 (class 2620 OID 22463)
-- Name: dfh_class_proj_rel insert_schema_table_name; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER insert_schema_table_name
  BEFORE INSERT ON projects.dfh_class_proj_rel
  FOR EACH ROW
  EXECUTE FUNCTION commons.insert_schema_table_name();

--
-- TOC entry 6236 (class 2620 OID 24068)
-- Name: dfh_profile_proj_rel insert_schema_table_name; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER insert_schema_table_name
  BEFORE INSERT ON projects.dfh_profile_proj_rel
  FOR EACH ROW
  EXECUTE FUNCTION commons.insert_schema_table_name();

--
-- TOC entry 6280 (class 2620 OID 24544)
-- Name: entity_label_config insert_schema_table_name; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER insert_schema_table_name
  BEFORE INSERT ON projects.entity_label_config
  FOR EACH ROW
  EXECUTE FUNCTION commons.insert_schema_table_name();

--
-- TOC entry 6083 (class 2620 OID 22462)
-- Name: info_proj_rel insert_schema_table_name; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER insert_schema_table_name
  BEFORE INSERT ON projects.info_proj_rel
  FOR EACH ROW
  EXECUTE FUNCTION commons.insert_schema_table_name();

--
-- TOC entry 6125 (class 2620 OID 22457)
-- Name: project insert_schema_table_name; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER insert_schema_table_name
  BEFORE INSERT ON projects.project
  FOR EACH ROW
  EXECUTE FUNCTION commons.insert_schema_table_name();

--
-- TOC entry 6211 (class 2620 OID 23760)
-- Name: property_label_deprecated insert_schema_table_name; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER insert_schema_table_name
  BEFORE INSERT ON projects.property_label_deprecated
  FOR EACH ROW
  EXECUTE FUNCTION commons.insert_schema_table_name();

--
-- TOC entry 6132 (class 2620 OID 22460)
-- Name: query insert_schema_table_name; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER insert_schema_table_name
  BEFORE INSERT ON projects.query
  FOR EACH ROW
  EXECUTE FUNCTION commons.insert_schema_table_name();

--
-- TOC entry 6285 (class 2620 OID 24610)
-- Name: table_config insert_schema_table_name; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER insert_schema_table_name
  BEFORE INSERT ON projects.table_config
  FOR EACH ROW
  EXECUTE FUNCTION commons.insert_schema_table_name();

--
-- TOC entry 6139 (class 2620 OID 22458)
-- Name: text_property insert_schema_table_name; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER insert_schema_table_name
  BEFORE INSERT ON projects.text_property
  FOR EACH ROW
  EXECUTE FUNCTION commons.insert_schema_table_name();

--
-- TOC entry 6296 (class 2620 OID 24989)
-- Name: visibility_settings insert_schema_table_name; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER insert_schema_table_name
  BEFORE INSERT ON projects.visibility_settings
  FOR EACH ROW
  EXECUTE FUNCTION commons.insert_schema_table_name();

--
-- TOC entry 6147 (class 2620 OID 22461)
-- Name: visual insert_schema_table_name; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER insert_schema_table_name
  BEFORE INSERT ON projects.visual
  FOR EACH ROW
  EXECUTE FUNCTION commons.insert_schema_table_name();

--
-- TOC entry 6231 (class 2620 OID 23999)
-- Name: analysis last_modification_tmsp; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE ON projects.analysis
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_last_modification();

--
-- TOC entry 6108 (class 2620 OID 22469)
-- Name: argument last_modification_tmsp; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE ON projects.argument
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_last_modification();

--
-- TOC entry 6093 (class 2620 OID 22474)
-- Name: class_field_config last_modification_tmsp; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE ON projects.class_field_config
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_last_modification();

--
-- TOC entry 6114 (class 2620 OID 22473)
-- Name: dfh_class_proj_rel last_modification_tmsp; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE ON projects.dfh_class_proj_rel
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_last_modification();

--
-- TOC entry 6237 (class 2620 OID 24069)
-- Name: dfh_profile_proj_rel last_modification_tmsp; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE ON projects.dfh_profile_proj_rel
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_last_modification();

--
-- TOC entry 6281 (class 2620 OID 24545)
-- Name: entity_label_config last_modification_tmsp; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE ON projects.entity_label_config
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_last_modification();

--
-- TOC entry 6084 (class 2620 OID 24383)
-- Name: info_proj_rel last_modification_tmsp; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE ON projects.info_proj_rel
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_last_modification();

--
-- TOC entry 6119 (class 2620 OID 22465)
-- Name: language last_modification_tmsp; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE ON projects.language
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_last_modification();

--
-- TOC entry 6126 (class 2620 OID 22467)
-- Name: project last_modification_tmsp; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE ON projects.project
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_last_modification();

--
-- TOC entry 6212 (class 2620 OID 23761)
-- Name: property_label_deprecated last_modification_tmsp; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE ON projects.property_label_deprecated
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_last_modification();

--
-- TOC entry 6133 (class 2620 OID 22470)
-- Name: query last_modification_tmsp; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE ON projects.query
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_last_modification();

--
-- TOC entry 6286 (class 2620 OID 24611)
-- Name: table_config last_modification_tmsp; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE ON projects.table_config
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_last_modification();

--
-- TOC entry 6140 (class 2620 OID 22468)
-- Name: text_property last_modification_tmsp; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE ON projects.text_property
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_last_modification();

--
-- TOC entry 6297 (class 2620 OID 24990)
-- Name: visibility_settings last_modification_tmsp; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE ON projects.visibility_settings
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_last_modification();

--
-- TOC entry 6148 (class 2620 OID 22471)
-- Name: visual last_modification_tmsp; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE ON projects.visual
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_last_modification();

--
-- TOC entry 6094 (class 2620 OID 24522)
-- Name: class_field_config notify_modification; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER notify_modification
  AFTER INSERT OR DELETE OR UPDATE ON projects.class_field_config
  FOR EACH STATEMENT
  EXECUTE FUNCTION commons.notify_modification_trigger();

--
-- TOC entry 6238 (class 2620 OID 24520)
-- Name: dfh_profile_proj_rel notify_modification; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER notify_modification
  AFTER INSERT OR DELETE OR UPDATE ON projects.dfh_profile_proj_rel
  FOR EACH STATEMENT
  EXECUTE FUNCTION commons.notify_modification_trigger();

--
-- TOC entry 6282 (class 2620 OID 24552)
-- Name: entity_label_config notify_modification; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER notify_modification
  AFTER INSERT OR DELETE OR UPDATE ON projects.entity_label_config
  FOR EACH STATEMENT
  EXECUTE FUNCTION commons.notify_modification_trigger();

--
-- TOC entry 6085 (class 2620 OID 24518)
-- Name: info_proj_rel notify_modification; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER notify_modification
  AFTER INSERT OR DELETE OR UPDATE ON projects.info_proj_rel
  FOR EACH STATEMENT
  EXECUTE FUNCTION commons.notify_modification_trigger();

--
-- TOC entry 6127 (class 2620 OID 24513)
-- Name: project notify_modification; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER notify_modification
  AFTER INSERT OR DELETE OR UPDATE ON projects.project
  FOR EACH STATEMENT
  EXECUTE FUNCTION commons.notify_modification_trigger();

--
-- TOC entry 6141 (class 2620 OID 24514)
-- Name: text_property notify_modification; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER notify_modification
  AFTER INSERT OR DELETE OR UPDATE ON projects.text_property
  FOR EACH STATEMENT
  EXECUTE FUNCTION commons.notify_modification_trigger();

--
-- TOC entry 6294 (class 2620 OID 24742)
-- Name: v_info_proj_rel on_insert; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER on_insert
  INSTEAD OF INSERT ON projects.v_info_proj_rel
  FOR EACH ROW
  EXECUTE FUNCTION projects.v_info_proj_rel_update_or_create();

--
-- TOC entry 6086 (class 2620 OID 24384)
-- Name: info_proj_rel on_upsert; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER on_upsert
  BEFORE INSERT OR UPDATE ON projects.info_proj_rel
  FOR EACH ROW
  EXECUTE FUNCTION commons.evpr_fk_entity_fk_entity_version();

--
-- TOC entry 6142 (class 2620 OID 22477)
-- Name: text_property sync_quill_doc_and_string; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER sync_quill_doc_and_string
  BEFORE INSERT OR UPDATE ON projects.text_property
  FOR EACH ROW
  EXECUTE FUNCTION commons.text__sync_quill_doc_and_string();

--
-- TOC entry 6232 (class 2620 OID 24007)
-- Name: analysis update_entity_version_key; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER update_entity_version_key
  BEFORE UPDATE ON projects.analysis
  FOR EACH ROW
  EXECUTE FUNCTION commons.update_entity_version_key();

--
-- TOC entry 6109 (class 2620 OID 22478)
-- Name: argument update_entity_version_key; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER update_entity_version_key
  BEFORE UPDATE ON projects.argument
  FOR EACH ROW
  EXECUTE FUNCTION commons.update_entity_version_key();

--
-- TOC entry 6095 (class 2620 OID 22487)
-- Name: class_field_config update_entity_version_key; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER update_entity_version_key
  BEFORE UPDATE ON projects.class_field_config
  FOR EACH ROW
  EXECUTE FUNCTION commons.update_entity_version_key();

--
-- TOC entry 6115 (class 2620 OID 22486)
-- Name: dfh_class_proj_rel update_entity_version_key; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER update_entity_version_key
  BEFORE UPDATE ON projects.dfh_class_proj_rel
  FOR EACH ROW
  EXECUTE FUNCTION commons.update_entity_version_key();

--
-- TOC entry 6239 (class 2620 OID 24077)
-- Name: dfh_profile_proj_rel update_entity_version_key; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER update_entity_version_key
  BEFORE UPDATE ON projects.dfh_profile_proj_rel
  FOR EACH ROW
  EXECUTE FUNCTION commons.update_entity_version_key();

--
-- TOC entry 6087 (class 2620 OID 24385)
-- Name: info_proj_rel update_entity_version_key; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER update_entity_version_key
  BEFORE UPDATE ON projects.info_proj_rel
  FOR EACH ROW
  EXECUTE FUNCTION commons.update_entity_version_key();

--
-- TOC entry 6120 (class 2620 OID 22480)
-- Name: language update_entity_version_key; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER update_entity_version_key
  BEFORE UPDATE ON projects.language
  FOR EACH ROW
  EXECUTE FUNCTION commons.update_entity_version_key();

--
-- TOC entry 6128 (class 2620 OID 22479)
-- Name: project update_entity_version_key; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER update_entity_version_key
  BEFORE UPDATE ON projects.project
  FOR EACH ROW
  EXECUTE FUNCTION commons.update_entity_version_key();

--
-- TOC entry 6213 (class 2620 OID 23769)
-- Name: property_label_deprecated update_entity_version_key; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER update_entity_version_key
  BEFORE UPDATE ON projects.property_label_deprecated
  FOR EACH ROW
  EXECUTE FUNCTION commons.update_entity_version_key();

--
-- TOC entry 6134 (class 2620 OID 22483)
-- Name: query update_entity_version_key; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER update_entity_version_key
  BEFORE UPDATE ON projects.query
  FOR EACH ROW
  EXECUTE FUNCTION commons.update_entity_version_key();

--
-- TOC entry 6143 (class 2620 OID 22481)
-- Name: text_property update_entity_version_key; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER update_entity_version_key
  BEFORE UPDATE ON projects.text_property
  FOR EACH ROW
  EXECUTE FUNCTION commons.update_entity_version_key();

--
-- TOC entry 6149 (class 2620 OID 22484)
-- Name: visual update_entity_version_key; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER update_entity_version_key
  BEFORE UPDATE ON projects.visual
  FOR EACH ROW
  EXECUTE FUNCTION commons.update_entity_version_key();

--
-- TOC entry 6233 (class 2620 OID 24005)
-- Name: analysis versioning_trigger; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR DELETE OR UPDATE ON projects.analysis
  FOR EACH ROW
  EXECUTE FUNCTION public.versioning('sys_period', 'projects.analysis_vt', 'true');

--
-- TOC entry 6110 (class 2620 OID 22488)
-- Name: argument versioning_trigger; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR DELETE OR UPDATE ON projects.argument
  FOR EACH ROW
  EXECUTE FUNCTION public.versioning('sys_period', 'projects.argument_vt', 'true');

--
-- TOC entry 6096 (class 2620 OID 22497)
-- Name: class_field_config versioning_trigger; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR DELETE OR UPDATE ON projects.class_field_config
  FOR EACH ROW
  EXECUTE FUNCTION public.versioning('sys_period', 'projects.class_field_config_vt', 'true');

--
-- TOC entry 6116 (class 2620 OID 22496)
-- Name: dfh_class_proj_rel versioning_trigger; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR DELETE OR UPDATE ON projects.dfh_class_proj_rel
  FOR EACH ROW
  EXECUTE FUNCTION public.versioning('sys_period', 'projects.dfh_class_proj_rel_vt', 'true');

--
-- TOC entry 6240 (class 2620 OID 24075)
-- Name: dfh_profile_proj_rel versioning_trigger; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR DELETE OR UPDATE ON projects.dfh_profile_proj_rel
  FOR EACH ROW
  EXECUTE FUNCTION public.versioning('sys_period', 'projects.dfh_profile_proj_rel_vt', 'true');

--
-- TOC entry 6283 (class 2620 OID 24551)
-- Name: entity_label_config versioning_trigger; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR DELETE OR UPDATE ON projects.entity_label_config
  FOR EACH ROW
  EXECUTE FUNCTION public.versioning('sys_period', 'projects.entity_label_config_vt', 'true');

--
-- TOC entry 6088 (class 2620 OID 24386)
-- Name: info_proj_rel versioning_trigger; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR DELETE OR UPDATE ON projects.info_proj_rel
  FOR EACH ROW
  EXECUTE FUNCTION public.versioning('sys_period', 'projects.info_proj_rel_vt', 'true');

--
-- TOC entry 6121 (class 2620 OID 22490)
-- Name: language versioning_trigger; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR DELETE OR UPDATE ON projects.language
  FOR EACH ROW
  EXECUTE FUNCTION public.versioning('sys_period', 'projects.language_vt', 'true');

--
-- TOC entry 6129 (class 2620 OID 22489)
-- Name: project versioning_trigger; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR DELETE OR UPDATE ON projects.project
  FOR EACH ROW
  EXECUTE FUNCTION public.versioning('sys_period', 'projects.project_vt', 'true');

--
-- TOC entry 6214 (class 2620 OID 23767)
-- Name: property_label_deprecated versioning_trigger; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR DELETE OR UPDATE ON projects.property_label_deprecated
  FOR EACH ROW
  EXECUTE FUNCTION public.versioning('sys_period', 'projects.property_label_vt', 'true');

--
-- TOC entry 6135 (class 2620 OID 22493)
-- Name: query versioning_trigger; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR DELETE OR UPDATE ON projects.query
  FOR EACH ROW
  EXECUTE FUNCTION public.versioning('sys_period', 'projects.query_vt', 'true');

--
-- TOC entry 6287 (class 2620 OID 24617)
-- Name: table_config versioning_trigger; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR DELETE OR UPDATE ON projects.table_config
  FOR EACH ROW
  EXECUTE FUNCTION public.versioning('sys_period', 'projects.table_config_vt', 'true');

--
-- TOC entry 6144 (class 2620 OID 22491)
-- Name: text_property versioning_trigger; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR DELETE OR UPDATE ON projects.text_property
  FOR EACH ROW
  EXECUTE FUNCTION public.versioning('sys_period', 'projects.text_property_vt', 'true');

--
-- TOC entry 6298 (class 2620 OID 24996)
-- Name: visibility_settings versioning_trigger; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR DELETE OR UPDATE ON projects.visibility_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.versioning('sys_period', 'projects.visibility_settings_vt', 'true');

--
-- TOC entry 6150 (class 2620 OID 22494)
-- Name: visual versioning_trigger; Type: TRIGGER; Schema: projects; Owner: -
--
CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR DELETE OR UPDATE ON projects.visual
  FOR EACH ROW
  EXECUTE FUNCTION public.versioning('sys_period', 'projects.visual_vt', 'true');

--
-- TOC entry 6151 (class 2620 OID 22498)
-- Name: account_project_rel create_entity_version_key; Type: TRIGGER; Schema: public; Owner: -
--
CREATE TRIGGER create_entity_version_key
  BEFORE INSERT ON public.account_project_rel
  FOR EACH ROW
  EXECUTE FUNCTION commons.create_entity_version_key();

--
-- TOC entry 6152 (class 2620 OID 22499)
-- Name: account_project_rel update_entity_version_key; Type: TRIGGER; Schema: public; Owner: -
--
CREATE TRIGGER update_entity_version_key
  BEFORE UPDATE ON public.account_project_rel
  FOR EACH ROW
  EXECUTE FUNCTION commons.update_entity_version_key();

--
-- TOC entry 6153 (class 2620 OID 22500)
-- Name: account_project_rel versioning_trigger; Type: TRIGGER; Schema: public; Owner: -
--
CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR DELETE OR UPDATE ON public.account_project_rel
  FOR EACH ROW
  EXECUTE FUNCTION public.versioning('sys_period', 'public.account_project_rel_vt', 'true');

--
-- TOC entry 6222 (class 2620 OID 23975)
-- Name: analysis_type_deprecated create_entity_version_key; Type: TRIGGER; Schema: system; Owner: -
--
CREATE TRIGGER create_entity_version_key
  BEFORE INSERT ON system.analysis_type_deprecated
  FOR EACH ROW
  EXECUTE FUNCTION commons.create_entity_version_key();

--
-- TOC entry 6154 (class 2620 OID 22505)
-- Name: app_context create_entity_version_key; Type: TRIGGER; Schema: system; Owner: -
--
CREATE TRIGGER create_entity_version_key
  BEFORE INSERT ON system.app_context
  FOR EACH ROW
  EXECUTE FUNCTION commons.create_entity_version_key();

--
-- TOC entry 6097 (class 2620 OID 22502)
-- Name: class_field create_entity_version_key; Type: TRIGGER; Schema: system; Owner: -
--
CREATE TRIGGER create_entity_version_key
  BEFORE INSERT ON system.class_field
  FOR EACH ROW
  EXECUTE FUNCTION commons.create_entity_version_key();

--
-- TOC entry 6160 (class 2620 OID 22503)
-- Name: class_field_property_rel create_entity_version_key; Type: TRIGGER; Schema: system; Owner: -
--
CREATE TRIGGER create_entity_version_key
  BEFORE INSERT ON system.class_field_property_rel
  FOR EACH ROW
  EXECUTE FUNCTION commons.create_entity_version_key();

--
-- TOC entry 6166 (class 2620 OID 22504)
-- Name: class_has_type_property create_entity_version_key; Type: TRIGGER; Schema: system; Owner: -
--
CREATE TRIGGER create_entity_version_key
  BEFORE INSERT ON system.class_has_type_property
  FOR EACH ROW
  EXECUTE FUNCTION commons.create_entity_version_key();

--
-- TOC entry 6172 (class 2620 OID 22506)
-- Name: system_relevant_class create_entity_version_key; Type: TRIGGER; Schema: system; Owner: -
--
CREATE TRIGGER create_entity_version_key
  BEFORE INSERT ON system.system_relevant_class
  FOR EACH ROW
  EXECUTE FUNCTION commons.create_entity_version_key();

--
-- TOC entry 6178 (class 2620 OID 22507)
-- Name: system_relevant_type create_entity_version_key; Type: TRIGGER; Schema: system; Owner: -
--
CREATE TRIGGER create_entity_version_key
  BEFORE INSERT ON system.system_relevant_type
  FOR EACH ROW
  EXECUTE FUNCTION commons.create_entity_version_key();

--
-- TOC entry 6184 (class 2620 OID 22501)
-- Name: system_type create_entity_version_key; Type: TRIGGER; Schema: system; Owner: -
--
CREATE TRIGGER create_entity_version_key
  BEFORE INSERT ON system.system_type
  FOR EACH ROW
  EXECUTE FUNCTION commons.create_entity_version_key();

--
-- TOC entry 6223 (class 2620 OID 23966)
-- Name: analysis_type_deprecated creation_tmsp; Type: TRIGGER; Schema: system; Owner: -
--
CREATE TRIGGER creation_tmsp
  BEFORE INSERT ON system.analysis_type_deprecated
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_creation();

--
-- TOC entry 6155 (class 2620 OID 22509)
-- Name: app_context creation_tmsp; Type: TRIGGER; Schema: system; Owner: -
--
CREATE TRIGGER creation_tmsp
  BEFORE INSERT ON system.app_context
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_creation();

--
-- TOC entry 6098 (class 2620 OID 22510)
-- Name: class_field creation_tmsp; Type: TRIGGER; Schema: system; Owner: -
--
CREATE TRIGGER creation_tmsp
  BEFORE INSERT ON system.class_field
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_creation();

--
-- TOC entry 6161 (class 2620 OID 22511)
-- Name: class_field_property_rel creation_tmsp; Type: TRIGGER; Schema: system; Owner: -
--
CREATE TRIGGER creation_tmsp
  BEFORE INSERT ON system.class_field_property_rel
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_creation();

--
-- TOC entry 6167 (class 2620 OID 22512)
-- Name: class_has_type_property creation_tmsp; Type: TRIGGER; Schema: system; Owner: -
--
CREATE TRIGGER creation_tmsp
  BEFORE INSERT ON system.class_has_type_property
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_creation();

--
-- TOC entry 6272 (class 2620 OID 24502)
-- Name: config creation_tmsp; Type: TRIGGER; Schema: system; Owner: -
--
CREATE TRIGGER creation_tmsp
  BEFORE INSERT ON system.config
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_creation();

--
-- TOC entry 6173 (class 2620 OID 22513)
-- Name: system_relevant_class creation_tmsp; Type: TRIGGER; Schema: system; Owner: -
--
CREATE TRIGGER creation_tmsp
  BEFORE INSERT ON system.system_relevant_class
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_creation();

--
-- TOC entry 6179 (class 2620 OID 22514)
-- Name: system_relevant_type creation_tmsp; Type: TRIGGER; Schema: system; Owner: -
--
CREATE TRIGGER creation_tmsp
  BEFORE INSERT ON system.system_relevant_type
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_creation();

--
-- TOC entry 6185 (class 2620 OID 22508)
-- Name: system_type creation_tmsp; Type: TRIGGER; Schema: system; Owner: -
--
CREATE TRIGGER creation_tmsp
  BEFORE INSERT ON system.system_type
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_creation();

--
-- TOC entry 6224 (class 2620 OID 23967)
-- Name: analysis_type_deprecated insert_schema_table_name; Type: TRIGGER; Schema: system; Owner: -
--
CREATE TRIGGER insert_schema_table_name
  BEFORE INSERT ON system.analysis_type_deprecated
  FOR EACH ROW
  EXECUTE FUNCTION commons.insert_schema_table_name();

--
-- TOC entry 6156 (class 2620 OID 22516)
-- Name: app_context insert_schema_table_name; Type: TRIGGER; Schema: system; Owner: -
--
CREATE TRIGGER insert_schema_table_name
  BEFORE INSERT ON system.app_context
  FOR EACH ROW
  EXECUTE FUNCTION commons.insert_schema_table_name();

--
-- TOC entry 6099 (class 2620 OID 22517)
-- Name: class_field insert_schema_table_name; Type: TRIGGER; Schema: system; Owner: -
--
CREATE TRIGGER insert_schema_table_name
  BEFORE INSERT ON system.class_field
  FOR EACH ROW
  EXECUTE FUNCTION commons.insert_schema_table_name();

--
-- TOC entry 6162 (class 2620 OID 22518)
-- Name: class_field_property_rel insert_schema_table_name; Type: TRIGGER; Schema: system; Owner: -
--
CREATE TRIGGER insert_schema_table_name
  BEFORE INSERT ON system.class_field_property_rel
  FOR EACH ROW
  EXECUTE FUNCTION commons.insert_schema_table_name();

--
-- TOC entry 6168 (class 2620 OID 22519)
-- Name: class_has_type_property insert_schema_table_name; Type: TRIGGER; Schema: system; Owner: -
--
CREATE TRIGGER insert_schema_table_name
  BEFORE INSERT ON system.class_has_type_property
  FOR EACH ROW
  EXECUTE FUNCTION commons.insert_schema_table_name();

--
-- TOC entry 6273 (class 2620 OID 24503)
-- Name: config insert_schema_table_name; Type: TRIGGER; Schema: system; Owner: -
--
CREATE TRIGGER insert_schema_table_name
  BEFORE INSERT ON system.config
  FOR EACH ROW
  EXECUTE FUNCTION commons.insert_schema_table_name();

--
-- TOC entry 6174 (class 2620 OID 22520)
-- Name: system_relevant_class insert_schema_table_name; Type: TRIGGER; Schema: system; Owner: -
--
CREATE TRIGGER insert_schema_table_name
  BEFORE INSERT ON system.system_relevant_class
  FOR EACH ROW
  EXECUTE FUNCTION commons.insert_schema_table_name();

--
-- TOC entry 6180 (class 2620 OID 22521)
-- Name: system_relevant_type insert_schema_table_name; Type: TRIGGER; Schema: system; Owner: -
--
CREATE TRIGGER insert_schema_table_name
  BEFORE INSERT ON system.system_relevant_type
  FOR EACH ROW
  EXECUTE FUNCTION commons.insert_schema_table_name();

--
-- TOC entry 6186 (class 2620 OID 22515)
-- Name: system_type insert_schema_table_name; Type: TRIGGER; Schema: system; Owner: -
--
CREATE TRIGGER insert_schema_table_name
  BEFORE INSERT ON system.system_type
  FOR EACH ROW
  EXECUTE FUNCTION commons.insert_schema_table_name();

--
-- TOC entry 6225 (class 2620 OID 23968)
-- Name: analysis_type_deprecated last_modification_tmsp; Type: TRIGGER; Schema: system; Owner: -
--
CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE ON system.analysis_type_deprecated
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_last_modification();

--
-- TOC entry 6157 (class 2620 OID 22523)
-- Name: app_context last_modification_tmsp; Type: TRIGGER; Schema: system; Owner: -
--
CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE ON system.app_context
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_last_modification();

--
-- TOC entry 6100 (class 2620 OID 22524)
-- Name: class_field last_modification_tmsp; Type: TRIGGER; Schema: system; Owner: -
--
CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE ON system.class_field
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_last_modification();

--
-- TOC entry 6163 (class 2620 OID 22525)
-- Name: class_field_property_rel last_modification_tmsp; Type: TRIGGER; Schema: system; Owner: -
--
CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE ON system.class_field_property_rel
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_last_modification();

--
-- TOC entry 6169 (class 2620 OID 22526)
-- Name: class_has_type_property last_modification_tmsp; Type: TRIGGER; Schema: system; Owner: -
--
CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE ON system.class_has_type_property
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_last_modification();

--
-- TOC entry 6274 (class 2620 OID 24504)
-- Name: config last_modification_tmsp; Type: TRIGGER; Schema: system; Owner: -
--
CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE ON system.config
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_last_modification();

--
-- TOC entry 6175 (class 2620 OID 22527)
-- Name: system_relevant_class last_modification_tmsp; Type: TRIGGER; Schema: system; Owner: -
--
CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE ON system.system_relevant_class
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_last_modification();

--
-- TOC entry 6181 (class 2620 OID 22528)
-- Name: system_relevant_type last_modification_tmsp; Type: TRIGGER; Schema: system; Owner: -
--
CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE ON system.system_relevant_type
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_last_modification();

--
-- TOC entry 6187 (class 2620 OID 22522)
-- Name: system_type last_modification_tmsp; Type: TRIGGER; Schema: system; Owner: -
--
CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE ON system.system_type
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_last_modification();

--
-- TOC entry 6275 (class 2620 OID 24783)
-- Name: config notify_modification; Type: TRIGGER; Schema: system; Owner: -
--
CREATE TRIGGER notify_modification
  AFTER INSERT OR DELETE OR UPDATE ON system.config
  FOR EACH STATEMENT
  EXECUTE FUNCTION commons.notify_modification_trigger();

--
-- TOC entry 6226 (class 2620 OID 23976)
-- Name: analysis_type_deprecated update_entity_version_key; Type: TRIGGER; Schema: system; Owner: -
--
CREATE TRIGGER update_entity_version_key
  BEFORE UPDATE ON system.analysis_type_deprecated
  FOR EACH ROW
  EXECUTE FUNCTION commons.update_entity_version_key();

--
-- TOC entry 6158 (class 2620 OID 22533)
-- Name: app_context update_entity_version_key; Type: TRIGGER; Schema: system; Owner: -
--
CREATE TRIGGER update_entity_version_key
  BEFORE UPDATE ON system.app_context
  FOR EACH ROW
  EXECUTE FUNCTION commons.update_entity_version_key();

--
-- TOC entry 6101 (class 2620 OID 22530)
-- Name: class_field update_entity_version_key; Type: TRIGGER; Schema: system; Owner: -
--
CREATE TRIGGER update_entity_version_key
  BEFORE UPDATE ON system.class_field
  FOR EACH ROW
  EXECUTE FUNCTION commons.update_entity_version_key();

--
-- TOC entry 6164 (class 2620 OID 22531)
-- Name: class_field_property_rel update_entity_version_key; Type: TRIGGER; Schema: system; Owner: -
--
CREATE TRIGGER update_entity_version_key
  BEFORE UPDATE ON system.class_field_property_rel
  FOR EACH ROW
  EXECUTE FUNCTION commons.update_entity_version_key();

--
-- TOC entry 6170 (class 2620 OID 22532)
-- Name: class_has_type_property update_entity_version_key; Type: TRIGGER; Schema: system; Owner: -
--
CREATE TRIGGER update_entity_version_key
  BEFORE UPDATE ON system.class_has_type_property
  FOR EACH ROW
  EXECUTE FUNCTION commons.update_entity_version_key();

--
-- TOC entry 6176 (class 2620 OID 22534)
-- Name: system_relevant_class update_entity_version_key; Type: TRIGGER; Schema: system; Owner: -
--
CREATE TRIGGER update_entity_version_key
  BEFORE UPDATE ON system.system_relevant_class
  FOR EACH ROW
  EXECUTE FUNCTION commons.update_entity_version_key();

--
-- TOC entry 6182 (class 2620 OID 22535)
-- Name: system_relevant_type update_entity_version_key; Type: TRIGGER; Schema: system; Owner: -
--
CREATE TRIGGER update_entity_version_key
  BEFORE UPDATE ON system.system_relevant_type
  FOR EACH ROW
  EXECUTE FUNCTION commons.update_entity_version_key();

--
-- TOC entry 6188 (class 2620 OID 22529)
-- Name: system_type update_entity_version_key; Type: TRIGGER; Schema: system; Owner: -
--
CREATE TRIGGER update_entity_version_key
  BEFORE UPDATE ON system.system_type
  FOR EACH ROW
  EXECUTE FUNCTION commons.update_entity_version_key();

--
-- TOC entry 6227 (class 2620 OID 23974)
-- Name: analysis_type_deprecated versioning_trigger; Type: TRIGGER; Schema: system; Owner: -
--
CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR DELETE OR UPDATE ON system.analysis_type_deprecated
  FOR EACH ROW
  EXECUTE FUNCTION public.versioning('sys_period', 'system.analysis_type_vt', 'true');

--
-- TOC entry 6159 (class 2620 OID 22540)
-- Name: app_context versioning_trigger; Type: TRIGGER; Schema: system; Owner: -
--
CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR DELETE OR UPDATE ON system.app_context
  FOR EACH ROW
  EXECUTE FUNCTION public.versioning('sys_period', 'system.app_context_vt', 'true');

--
-- TOC entry 6102 (class 2620 OID 22537)
-- Name: class_field versioning_trigger; Type: TRIGGER; Schema: system; Owner: -
--
CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR DELETE OR UPDATE ON system.class_field
  FOR EACH ROW
  EXECUTE FUNCTION public.versioning('sys_period', 'system.class_field_vt', 'true');

--
-- TOC entry 6165 (class 2620 OID 22538)
-- Name: class_field_property_rel versioning_trigger; Type: TRIGGER; Schema: system; Owner: -
--
CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR DELETE OR UPDATE ON system.class_field_property_rel
  FOR EACH ROW
  EXECUTE FUNCTION public.versioning('sys_period', 'system.class_field_property_rel_vt', 'true');

--
-- TOC entry 6171 (class 2620 OID 22539)
-- Name: class_has_type_property versioning_trigger; Type: TRIGGER; Schema: system; Owner: -
--
CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR DELETE OR UPDATE ON system.class_has_type_property
  FOR EACH ROW
  EXECUTE FUNCTION public.versioning('sys_period', 'system.class_has_type_property_vt', 'true');

--
-- TOC entry 6276 (class 2620 OID 24510)
-- Name: config versioning_trigger; Type: TRIGGER; Schema: system; Owner: -
--
CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR DELETE OR UPDATE ON system.config
  FOR EACH ROW
  EXECUTE FUNCTION public.versioning('sys_period', 'system.config_vt', 'true');

--
-- TOC entry 6177 (class 2620 OID 22541)
-- Name: system_relevant_class versioning_trigger; Type: TRIGGER; Schema: system; Owner: -
--
CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR DELETE OR UPDATE ON system.system_relevant_class
  FOR EACH ROW
  EXECUTE FUNCTION public.versioning('sys_period', 'system.system_relevant_class_vt', 'true');

--
-- TOC entry 6183 (class 2620 OID 22542)
-- Name: system_relevant_type versioning_trigger; Type: TRIGGER; Schema: system; Owner: -
--
CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR DELETE OR UPDATE ON system.system_relevant_type
  FOR EACH ROW
  EXECUTE FUNCTION public.versioning('sys_period', 'system.system_relevant_type_vt', 'true');

--
-- TOC entry 6189 (class 2620 OID 22536)
-- Name: system_type versioning_trigger; Type: TRIGGER; Schema: system; Owner: -
--
CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR DELETE OR UPDATE ON system.system_type
  FOR EACH ROW
  EXECUTE FUNCTION public.versioning('sys_period', 'system.system_type_vt', 'true');

--
-- TOC entry 6215 (class 2620 OID 23854)
-- Name: quill_doc_cell create_entity_version_key; Type: TRIGGER; Schema: tables; Owner: -
--
CREATE TRIGGER create_entity_version_key
  BEFORE INSERT ON tables.quill_doc_cell
  FOR EACH ROW
  EXECUTE FUNCTION commons.create_entity_version_key();

--
-- TOC entry 6216 (class 2620 OID 23855)
-- Name: quill_doc_cell creation_tmsp; Type: TRIGGER; Schema: tables; Owner: -
--
CREATE TRIGGER creation_tmsp
  BEFORE INSERT ON tables.quill_doc_cell
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_creation();

--
-- TOC entry 6217 (class 2620 OID 23858)
-- Name: quill_doc_cell insert_schema_table_name; Type: TRIGGER; Schema: tables; Owner: -
--
CREATE TRIGGER insert_schema_table_name
  BEFORE INSERT ON tables.quill_doc_cell
  FOR EACH ROW
  EXECUTE FUNCTION commons.insert_schema_table_name();

--
-- TOC entry 6218 (class 2620 OID 23856)
-- Name: quill_doc_cell last_modification_tmsp; Type: TRIGGER; Schema: tables; Owner: -
--
CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE ON tables.quill_doc_cell
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_last_modification();

--
-- TOC entry 6219 (class 2620 OID 23860)
-- Name: quill_doc_cell sync_quill_doc_and_string; Type: TRIGGER; Schema: tables; Owner: -
--
CREATE TRIGGER sync_quill_doc_and_string
  BEFORE INSERT OR UPDATE ON tables.quill_doc_cell
  FOR EACH ROW
  EXECUTE FUNCTION commons.text__sync_quill_doc_and_string();

--
-- TOC entry 6220 (class 2620 OID 23857)
-- Name: quill_doc_cell update_entity_version_key; Type: TRIGGER; Schema: tables; Owner: -
--
CREATE TRIGGER update_entity_version_key
  BEFORE UPDATE ON tables.quill_doc_cell
  FOR EACH ROW
  EXECUTE FUNCTION commons.update_entity_version_key();

--
-- TOC entry 6221 (class 2620 OID 23847)
-- Name: quill_doc_cell versioning_trigger; Type: TRIGGER; Schema: tables; Owner: -
--
CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR DELETE OR UPDATE ON tables.quill_doc_cell
  FOR EACH ROW
  EXECUTE FUNCTION public.versioning('sys_period', 'tables.quill_doc_cell_vt', 'true');

--
-- TOC entry 6256 (class 2620 OID 24263)
-- Name: entity_preview after_insert_on_entity_preview; Type: TRIGGER; Schema: war; Owner: -
--
CREATE TRIGGER after_insert_on_entity_preview
  AFTER INSERT ON war.entity_preview REFERENCING NEW TABLE AS new_table
  FOR EACH STATEMENT
  EXECUTE FUNCTION war.entity_previews__notify_upsert();

--
-- TOC entry 6257 (class 2620 OID 24264)
-- Name: entity_preview after_update_on_entity_preview; Type: TRIGGER; Schema: war; Owner: -
--
CREATE TRIGGER after_update_on_entity_preview
  AFTER UPDATE ON war.entity_preview REFERENCING NEW TABLE AS new_table
  FOR EACH STATEMENT
  EXECUTE FUNCTION war.entity_previews__notify_upsert();

--
-- TOC entry 6258 (class 2620 OID 24691)
-- Name: entity_preview generate_key; Type: TRIGGER; Schema: war; Owner: -
--
CREATE TRIGGER generate_key
  BEFORE INSERT OR UPDATE ON war.entity_preview
  FOR EACH ROW
  EXECUTE FUNCTION war.entity_preview_generate_key();

--
-- TOC entry 6277 (class 2620 OID 24530)
-- Name: class_preview last_modification_tmsp; Type: TRIGGER; Schema: war; Owner: -
--
CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE ON war.class_preview
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_last_modification();

--
-- TOC entry 6259 (class 2620 OID 24265)
-- Name: entity_preview last_modification_tmsp; Type: TRIGGER; Schema: war; Owner: -
--
CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE ON war.entity_preview
  FOR EACH ROW
  EXECUTE FUNCTION commons.tmsp_last_modification();

--
-- TOC entry 6278 (class 2620 OID 24531)
-- Name: class_preview notify_modification; Type: TRIGGER; Schema: war; Owner: -
--
CREATE TRIGGER notify_modification
  AFTER INSERT OR DELETE OR UPDATE ON war.class_preview
  FOR EACH STATEMENT
  EXECUTE FUNCTION commons.notify_modification_trigger();

--
-- TOC entry 6260 (class 2620 OID 24556)
-- Name: entity_preview ts_vector; Type: TRIGGER; Schema: war; Owner: -
--
CREATE TRIGGER ts_vector
  BEFORE INSERT OR UPDATE ON war.entity_preview
  FOR EACH ROW
  EXECUTE FUNCTION war.entity_preview_ts_vector();

--
-- TOC entry 5789 (class 2606 OID 23333)
-- Name: avatar_vt avatar_vt_fk_license_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.avatar_vt
  ADD CONSTRAINT avatar_vt_fk_license_fkey FOREIGN KEY (fk_license) REFERENCES system.system_type(pk_entity);

--
-- TOC entry 5790 (class 2606 OID 23238)
-- Name: avatar_vt avatar_vt_fk_publication_status_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.avatar_vt
  ADD CONSTRAINT avatar_vt_fk_publication_status_fkey FOREIGN KEY (fk_publication_status) REFERENCES system.system_type(pk_entity);

--
-- TOC entry 5791 (class 2606 OID 23343)
-- Name: chunk_vt chunk_vt_fk_license_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.chunk_vt
  ADD CONSTRAINT chunk_vt_fk_license_fkey FOREIGN KEY (fk_license) REFERENCES system.system_type(pk_entity);

--
-- TOC entry 5792 (class 2606 OID 23248)
-- Name: chunk_vt chunk_vt_fk_publication_status_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.chunk_vt
  ADD CONSTRAINT chunk_vt_fk_publication_status_fkey FOREIGN KEY (fk_publication_status) REFERENCES system.system_type(pk_entity);

--
-- TOC entry 5794 (class 2606 OID 23348)
-- Name: class_column_mapping_vt class_column_mapping_vt_fk_license_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.class_column_mapping_vt
  ADD CONSTRAINT class_column_mapping_vt_fk_license_fkey FOREIGN KEY (fk_license) REFERENCES system.system_type(pk_entity);

--
-- TOC entry 5795 (class 2606 OID 23253)
-- Name: class_column_mapping_vt class_column_mapping_vt_fk_publication_status_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.class_column_mapping_vt
  ADD CONSTRAINT class_column_mapping_vt_fk_publication_status_fkey FOREIGN KEY (fk_publication_status) REFERENCES system.system_type(pk_entity);

--
-- TOC entry 5793 (class 2606 OID 22571)
-- Name: class_column_mapping class_column_rel_fk_column_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.class_column_mapping
  ADD CONSTRAINT class_column_rel_fk_column_fkey FOREIGN KEY (fk_column) REFERENCES data."column"(pk_entity);

--
-- TOC entry 5796 (class 2606 OID 23078)
-- Name: column column_fk_column_type_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data."column"
  ADD CONSTRAINT column_fk_column_type_fkey FOREIGN KEY (fk_column_content_type) REFERENCES system.system_type(pk_entity);

--
-- TOC entry 5797 (class 2606 OID 22576)
-- Name: column column_fk_data_type_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data."column"
  ADD CONSTRAINT column_fk_data_type_fkey FOREIGN KEY (fk_data_type) REFERENCES system.system_type(pk_entity);

--
-- TOC entry 5798 (class 2606 OID 22581)
-- Name: column column_fk_digital_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data."column"
  ADD CONSTRAINT column_fk_digital_fkey FOREIGN KEY (fk_digital) REFERENCES data.digital(pk_entity);

--
-- TOC entry 5799 (class 2606 OID 23088)
-- Name: column column_fk_original_column_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data."column"
  ADD CONSTRAINT column_fk_original_column_fkey FOREIGN KEY (fk_original_column) REFERENCES data."column"(pk_entity);

--
-- TOC entry 5800 (class 2606 OID 23083)
-- Name: column_vt column_vt_fk_column_type_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.column_vt
  ADD CONSTRAINT column_vt_fk_column_type_fkey FOREIGN KEY (fk_column_content_type) REFERENCES system.system_type(pk_entity);

--
-- TOC entry 5801 (class 2606 OID 23353)
-- Name: column_vt column_vt_fk_license_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.column_vt
  ADD CONSTRAINT column_vt_fk_license_fkey FOREIGN KEY (fk_license) REFERENCES system.system_type(pk_entity);

--
-- TOC entry 5802 (class 2606 OID 23093)
-- Name: column_vt column_vt_fk_original_column_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.column_vt
  ADD CONSTRAINT column_vt_fk_original_column_fkey FOREIGN KEY (fk_original_column) REFERENCES data."column"(pk_entity);

--
-- TOC entry 5803 (class 2606 OID 23258)
-- Name: column_vt column_vt_fk_publication_status_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.column_vt
  ADD CONSTRAINT column_vt_fk_publication_status_fkey FOREIGN KEY (fk_publication_status) REFERENCES system.system_type(pk_entity);

--
-- TOC entry 5804 (class 2606 OID 22591)
-- Name: data_association data_association_fk_property_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.data_association
  ADD CONSTRAINT data_association_fk_property_fkey FOREIGN KEY (fk_property) REFERENCES data_for_history.property(dfh_pk_property);

--
-- TOC entry 5836 (class 2606 OID 23358)
-- Name: data_association_mapping_vt data_association_mapping_vt_fk_license_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.data_association_mapping_vt
  ADD CONSTRAINT data_association_mapping_vt_fk_license_fkey FOREIGN KEY (fk_license) REFERENCES system.system_type(pk_entity);

--
-- TOC entry 5837 (class 2606 OID 23263)
-- Name: data_association_mapping_vt data_association_mapping_vt_fk_publication_status_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.data_association_mapping_vt
  ADD CONSTRAINT data_association_mapping_vt_fk_publication_status_fkey FOREIGN KEY (fk_publication_status) REFERENCES system.system_type(pk_entity);

--
-- TOC entry 5805 (class 2606 OID 23363)
-- Name: data_association_vt data_association_vt_fk_license_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.data_association_vt
  ADD CONSTRAINT data_association_vt_fk_license_fkey FOREIGN KEY (fk_license) REFERENCES system.system_type(pk_entity);

--
-- TOC entry 5806 (class 2606 OID 23268)
-- Name: data_association_vt data_association_vt_fk_publication_status_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.data_association_vt
  ADD CONSTRAINT data_association_vt_fk_publication_status_fkey FOREIGN KEY (fk_publication_status) REFERENCES system.system_type(pk_entity);

--
-- TOC entry 5807 (class 2606 OID 22596)
-- Name: digital digital_fk_system_type_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.digital
  ADD CONSTRAINT digital_fk_system_type_fkey FOREIGN KEY (fk_system_type) REFERENCES system.system_type(pk_entity);

--
-- TOC entry 5808 (class 2606 OID 23368)
-- Name: digital_vt digital_vt_fk_license_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.digital_vt
  ADD CONSTRAINT digital_vt_fk_license_fkey FOREIGN KEY (fk_license) REFERENCES system.system_type(pk_entity);

--
-- TOC entry 5809 (class 2606 OID 23273)
-- Name: digital_vt digital_vt_fk_publication_status_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.digital_vt
  ADD CONSTRAINT digital_vt_fk_publication_status_fkey FOREIGN KEY (fk_publication_status) REFERENCES system.system_type(pk_entity);

--
-- TOC entry 5786 (class 2606 OID 23328)
-- Name: entity entity_fk_license_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.entity
  ADD CONSTRAINT entity_fk_license_fkey FOREIGN KEY (fk_license) REFERENCES system.system_type(pk_entity);

--
-- TOC entry 5787 (class 2606 OID 22601)
-- Name: entity entity_fk_namespace_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.entity
  ADD CONSTRAINT entity_fk_namespace_fkey FOREIGN KEY (fk_namespace) REFERENCES data.namespace(pk_entity);

--
-- TOC entry 5788 (class 2606 OID 23233)
-- Name: entity entity_fk_publication_status_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.entity
  ADD CONSTRAINT entity_fk_publication_status_fkey FOREIGN KEY (fk_publication_status) REFERENCES system.system_type(pk_entity);

--
-- TOC entry 5810 (class 2606 OID 22611)
-- Name: factoid_mapping factoid_class_digital_rel_fk_digital_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.factoid_mapping
  ADD CONSTRAINT factoid_class_digital_rel_fk_digital_fkey FOREIGN KEY (fk_digital) REFERENCES data.digital(pk_entity);

--
-- TOC entry 5811 (class 2606 OID 23373)
-- Name: factoid_mapping_vt factoid_mapping_vt_fk_license_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.factoid_mapping_vt
  ADD CONSTRAINT factoid_mapping_vt_fk_license_fkey FOREIGN KEY (fk_license) REFERENCES system.system_type(pk_entity);

--
-- TOC entry 5812 (class 2606 OID 23278)
-- Name: factoid_mapping_vt factoid_mapping_vt_fk_publication_status_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.factoid_mapping_vt
  ADD CONSTRAINT factoid_mapping_vt_fk_publication_status_fkey FOREIGN KEY (fk_publication_status) REFERENCES system.system_type(pk_entity);

--
-- TOC entry 5813 (class 2606 OID 22621)
-- Name: factoid_property_mapping factoid_property_column_rel_fk_column_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.factoid_property_mapping
  ADD CONSTRAINT factoid_property_column_rel_fk_column_fkey FOREIGN KEY (fk_column) REFERENCES data."column"(pk_entity);

--
-- TOC entry 5814 (class 2606 OID 22626)
-- Name: factoid_property_mapping factoid_property_column_rel_fk_factoid_class_digital_rel_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.factoid_property_mapping
  ADD CONSTRAINT factoid_property_column_rel_fk_factoid_class_digital_rel_fkey FOREIGN KEY (fk_factoid_mapping) REFERENCES data.factoid_mapping(pk_entity);

--
-- TOC entry 5815 (class 2606 OID 22631)
-- Name: factoid_property_mapping factoid_property_column_rel_fk_property_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.factoid_property_mapping
  ADD CONSTRAINT factoid_property_column_rel_fk_property_fkey FOREIGN KEY (fk_property) REFERENCES data_for_history.property(dfh_pk_property);

--
-- TOC entry 5818 (class 2606 OID 22636)
-- Name: factoid_role factoid_role_fk_domain_factoid_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.factoid_role
  ADD CONSTRAINT factoid_role_fk_domain_factoid_fkey FOREIGN KEY (fk_domain_factoid) REFERENCES data.factoid(pk_entity);

--
-- TOC entry 5819 (class 2606 OID 22641)
-- Name: factoid_role factoid_role_fk_property_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.factoid_role
  ADD CONSTRAINT factoid_role_fk_property_fkey FOREIGN KEY (fk_property) REFERENCES data_for_history.property(dfh_pk_property);

--
-- TOC entry 5816 (class 2606 OID 23378)
-- Name: factoid_property_mapping_vt factoid_role_mapping_vt_fk_license_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.factoid_property_mapping_vt
  ADD CONSTRAINT factoid_role_mapping_vt_fk_license_fkey FOREIGN KEY (fk_license) REFERENCES system.system_type(pk_entity);

--
-- TOC entry 5817 (class 2606 OID 23283)
-- Name: factoid_property_mapping_vt factoid_role_mapping_vt_fk_publication_status_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.factoid_property_mapping_vt
  ADD CONSTRAINT factoid_role_mapping_vt_fk_publication_status_fkey FOREIGN KEY (fk_publication_status) REFERENCES system.system_type(pk_entity);

--
-- TOC entry 5820 (class 2606 OID 23383)
-- Name: factoid_role_vt factoid_role_vt_fk_license_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.factoid_role_vt
  ADD CONSTRAINT factoid_role_vt_fk_license_fkey FOREIGN KEY (fk_license) REFERENCES system.system_type(pk_entity);

--
-- TOC entry 5821 (class 2606 OID 23288)
-- Name: factoid_role_vt factoid_role_vt_fk_publication_status_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.factoid_role_vt
  ADD CONSTRAINT factoid_role_vt_fk_publication_status_fkey FOREIGN KEY (fk_publication_status) REFERENCES system.system_type(pk_entity);

--
-- TOC entry 5822 (class 2606 OID 23388)
-- Name: factoid_vt factoid_vt_fk_license_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.factoid_vt
  ADD CONSTRAINT factoid_vt_fk_license_fkey FOREIGN KEY (fk_license) REFERENCES system.system_type(pk_entity);

--
-- TOC entry 5823 (class 2606 OID 23293)
-- Name: factoid_vt factoid_vt_fk_publication_status_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.factoid_vt
  ADD CONSTRAINT factoid_vt_fk_publication_status_fkey FOREIGN KEY (fk_publication_status) REFERENCES system.system_type(pk_entity);

--
-- TOC entry 5824 (class 2606 OID 22656)
-- Name: namespace namespace_fk_project_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.namespace
  ADD CONSTRAINT namespace_fk_project_fkey FOREIGN KEY (fk_project) REFERENCES projects.project(pk_entity);

--
-- TOC entry 5825 (class 2606 OID 22661)
-- Name: namespace namespace_fk_root_namespace_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.namespace
  ADD CONSTRAINT namespace_fk_root_namespace_fkey FOREIGN KEY (fk_root_namespace) REFERENCES data.namespace(pk_entity);

--
-- TOC entry 5826 (class 2606 OID 23393)
-- Name: namespace_vt namespace_vt_fk_license_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.namespace_vt
  ADD CONSTRAINT namespace_vt_fk_license_fkey FOREIGN KEY (fk_license) REFERENCES system.system_type(pk_entity);

--
-- TOC entry 5827 (class 2606 OID 23298)
-- Name: namespace_vt namespace_vt_fk_publication_status_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.namespace_vt
  ADD CONSTRAINT namespace_vt_fk_publication_status_fkey FOREIGN KEY (fk_publication_status) REFERENCES system.system_type(pk_entity);

--
-- TOC entry 5879 (class 2606 OID 23117)
-- Name: property_of_property property_of_property_fk_domain_data_association_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.property_of_property
  ADD CONSTRAINT property_of_property_fk_domain_data_association_fkey FOREIGN KEY (fk_domain_data_association) REFERENCES data.data_association(pk_entity);

--
-- TOC entry 5880 (class 2606 OID 23112)
-- Name: property_of_property property_of_property_fk_domain_factoid_role_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.property_of_property
  ADD CONSTRAINT property_of_property_fk_domain_factoid_role_fkey FOREIGN KEY (fk_domain_factoid_property) REFERENCES data.factoid_role(pk_entity);

--
-- TOC entry 5874 (class 2606 OID 23055)
-- Name: property_of_property_mapping property_of_property_mapping_fk_domain_data_association_ma_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.property_of_property_mapping
  ADD CONSTRAINT property_of_property_mapping_fk_domain_data_association_ma_fkey FOREIGN KEY (fk_domain_data_association_mapping) REFERENCES data.data_association_mapping(pk_entity);

--
-- TOC entry 5875 (class 2606 OID 23050)
-- Name: property_of_property_mapping property_of_property_mapping_fk_domain_factoid_role_mappin_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.property_of_property_mapping
  ADD CONSTRAINT property_of_property_mapping_fk_domain_factoid_role_mappin_fkey FOREIGN KEY (fk_domain_factoid_property_mapping) REFERENCES data.factoid_property_mapping(pk_entity);

--
-- TOC entry 5876 (class 2606 OID 23060)
-- Name: property_of_property_mapping property_of_property_mapping_fk_range_column_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.property_of_property_mapping
  ADD CONSTRAINT property_of_property_mapping_fk_range_column_fkey FOREIGN KEY (fk_range_column) REFERENCES data."column"(pk_entity);

--
-- TOC entry 5877 (class 2606 OID 23398)
-- Name: property_of_property_mapping_vt property_of_property_mapping_vt_fk_license_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.property_of_property_mapping_vt
  ADD CONSTRAINT property_of_property_mapping_vt_fk_license_fkey FOREIGN KEY (fk_license) REFERENCES system.system_type(pk_entity);

--
-- TOC entry 5878 (class 2606 OID 23303)
-- Name: property_of_property_mapping_vt property_of_property_mapping_vt_fk_publication_status_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.property_of_property_mapping_vt
  ADD CONSTRAINT property_of_property_mapping_vt_fk_publication_status_fkey FOREIGN KEY (fk_publication_status) REFERENCES system.system_type(pk_entity);

--
-- TOC entry 5881 (class 2606 OID 23403)
-- Name: property_of_property_vt property_of_property_vt_fk_license_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.property_of_property_vt
  ADD CONSTRAINT property_of_property_vt_fk_license_fkey FOREIGN KEY (fk_license) REFERENCES system.system_type(pk_entity);

--
-- TOC entry 5882 (class 2606 OID 23308)
-- Name: property_of_property_vt property_of_property_vt_fk_publication_status_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.property_of_property_vt
  ADD CONSTRAINT property_of_property_vt_fk_publication_status_fkey FOREIGN KEY (fk_publication_status) REFERENCES system.system_type(pk_entity);

--
-- TOC entry 5828 (class 2606 OID 22676)
-- Name: text_property text_property_fk_language_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.text_property
  ADD CONSTRAINT text_property_fk_language_fkey FOREIGN KEY (fk_language) REFERENCES information.language(pk_entity);

--
-- TOC entry 5829 (class 2606 OID 22681)
-- Name: text_property text_property_fk_system_type_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.text_property
  ADD CONSTRAINT text_property_fk_system_type_fkey FOREIGN KEY (fk_system_type) REFERENCES system.system_type(pk_entity);

--
-- TOC entry 5830 (class 2606 OID 23413)
-- Name: text_property_vt text_property_vt_fk_license_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.text_property_vt
  ADD CONSTRAINT text_property_vt_fk_license_fkey FOREIGN KEY (fk_license) REFERENCES system.system_type(pk_entity);

--
-- TOC entry 5831 (class 2606 OID 23318)
-- Name: text_property_vt text_property_vt_fk_publication_status_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.text_property_vt
  ADD CONSTRAINT text_property_vt_fk_publication_status_fkey FOREIGN KEY (fk_publication_status) REFERENCES system.system_type(pk_entity);

--
-- TOC entry 5832 (class 2606 OID 22686)
-- Name: data_association_mapping value_association_columns_rel_fk_domain_column_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.data_association_mapping
  ADD CONSTRAINT value_association_columns_rel_fk_domain_column_fkey FOREIGN KEY (fk_domain_column) REFERENCES data."column"(pk_entity);

--
-- TOC entry 5833 (class 2606 OID 22691)
-- Name: data_association_mapping value_association_columns_rel_fk_factoid_class_digital_rel_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.data_association_mapping
  ADD CONSTRAINT value_association_columns_rel_fk_factoid_class_digital_rel_fkey FOREIGN KEY (fk_factoid_mapping) REFERENCES data.factoid_mapping(pk_entity);

--
-- TOC entry 5834 (class 2606 OID 22696)
-- Name: data_association_mapping value_association_columns_rel_fk_property_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.data_association_mapping
  ADD CONSTRAINT value_association_columns_rel_fk_property_fkey FOREIGN KEY (fk_property) REFERENCES data_for_history.property(dfh_pk_property);

--
-- TOC entry 5835 (class 2606 OID 22701)
-- Name: data_association_mapping value_association_columns_rel_fk_range_column_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.data_association_mapping
  ADD CONSTRAINT value_association_columns_rel_fk_range_column_fkey FOREIGN KEY (fk_range_column) REFERENCES data."column"(pk_entity);

--
-- TOC entry 5838 (class 2606 OID 22711)
-- Name: values_association values_association_fk_domain_chunk_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.values_association
  ADD CONSTRAINT values_association_fk_domain_chunk_fkey FOREIGN KEY (fk_domain_chunk) REFERENCES data.chunk(pk_entity);

--
-- TOC entry 5839 (class 2606 OID 22716)
-- Name: values_association values_association_fk_property_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.values_association
  ADD CONSTRAINT values_association_fk_property_fkey FOREIGN KEY (fk_property) REFERENCES data_for_history.property(dfh_pk_property);

--
-- TOC entry 5840 (class 2606 OID 22726)
-- Name: values_association values_association_fk_range_chunk_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.values_association
  ADD CONSTRAINT values_association_fk_range_chunk_fkey FOREIGN KEY (fk_range_chunk) REFERENCES data.chunk(pk_entity);

--
-- TOC entry 5841 (class 2606 OID 23418)
-- Name: values_association_vt values_association_vt_fk_license_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.values_association_vt
  ADD CONSTRAINT values_association_vt_fk_license_fkey FOREIGN KEY (fk_license) REFERENCES system.system_type(pk_entity);

--
-- TOC entry 5842 (class 2606 OID 23323)
-- Name: values_association_vt values_association_vt_fk_publication_status_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--
ALTER TABLE ONLY data.values_association_vt
  ADD CONSTRAINT values_association_vt_fk_publication_status_fkey FOREIGN KEY (fk_publication_status) REFERENCES system.system_type(pk_entity);

--
-- TOC entry 5843 (class 2606 OID 22731)
-- Name: label_deprecated label_com_fk_system_type_fkey; Type: FK CONSTRAINT; Schema: data_for_history; Owner: -
--
ALTER TABLE ONLY data_for_history.label_deprecated
  ADD CONSTRAINT label_com_fk_system_type_fkey FOREIGN KEY (com_fk_system_type) REFERENCES system.system_type(pk_entity);

--
-- TOC entry 5844 (class 2606 OID 22736)
-- Name: label_deprecated label_inf_fk_language_fkey; Type: FK CONSTRAINT; Schema: data_for_history; Owner: -
--
ALTER TABLE ONLY data_for_history.label_deprecated
  ADD CONSTRAINT label_inf_fk_language_fkey FOREIGN KEY (inf_fk_language) REFERENCES information.language(pk_entity);

--
-- TOC entry 5883 (class 2606 OID 24665)
-- Name: dimension dimension_fk_measurement_unit_fkey; Type: FK CONSTRAINT; Schema: information; Owner: -
--
ALTER TABLE ONLY information.dimension
  ADD CONSTRAINT dimension_fk_measurement_unit_fkey FOREIGN KEY (fk_measurement_unit) REFERENCES information.resource(pk_entity);

--
-- TOC entry 5893 (class 2606 OID 24399)
-- Name: lang_string lang_string_fk_language_fkey; Type: FK CONSTRAINT; Schema: information; Owner: -
--
ALTER TABLE ONLY information.lang_string
  ADD CONSTRAINT lang_string_fk_language_fkey FOREIGN KEY (fk_language) REFERENCES information.language(pk_entity);

--
-- TOC entry 5845 (class 2606 OID 22791)
-- Name: text_property text_property_fk_class_field_fkey; Type: FK CONSTRAINT; Schema: information; Owner: -
--
ALTER TABLE ONLY information.text_property
  ADD CONSTRAINT text_property_fk_class_field_fkey FOREIGN KEY (fk_class_field) REFERENCES system.class_field(pk_entity);

--
-- TOC entry 5846 (class 2606 OID 22796)
-- Name: text_property text_property_fk_language_constraint; Type: FK CONSTRAINT; Schema: information; Owner: -
--
ALTER TABLE ONLY information.text_property
  ADD CONSTRAINT text_property_fk_language_constraint FOREIGN KEY (fk_language) REFERENCES information.language(pk_entity);

--
-- TOC entry 5890 (class 2606 OID 24573)
-- Name: analysis analysis_fk_analysis_type_fkey; Type: FK CONSTRAINT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects.analysis
  ADD CONSTRAINT analysis_fk_analysis_type_fkey FOREIGN KEY (fk_analysis_type) REFERENCES system.system_type(pk_entity);

--
-- TOC entry 5891 (class 2606 OID 23985)
-- Name: analysis analysis_fk_project_fkey; Type: FK CONSTRAINT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects.analysis
  ADD CONSTRAINT analysis_fk_project_fkey FOREIGN KEY (fk_project) REFERENCES projects.project(pk_entity);

--
-- TOC entry 5851 (class 2606 OID 23135)
-- Name: argument argument_fk_project_fkey; Type: FK CONSTRAINT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects.argument
  ADD CONSTRAINT argument_fk_project_fkey FOREIGN KEY (fk_project) REFERENCES projects.project(pk_entity);

--
-- TOC entry 5853 (class 2606 OID 23140)
-- Name: argument_vt argument_vt_fk_project_fkey; Type: FK CONSTRAINT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects.argument_vt
  ADD CONSTRAINT argument_vt_fk_project_fkey FOREIGN KEY (fk_project) REFERENCES projects.project(pk_entity);

--
-- TOC entry 5852 (class 2606 OID 24670)
-- Name: argument assertion_fk_assertion_method_type_fkey; Type: FK CONSTRAINT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects.argument
  ADD CONSTRAINT assertion_fk_assertion_method_type_fkey FOREIGN KEY (fk_argument_method_type) REFERENCES information.resource(pk_entity);

--
-- TOC entry 5848 (class 2606 OID 22846)
-- Name: class_field_config class_field_config_fk_project_fkey; Type: FK CONSTRAINT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects.class_field_config
  ADD CONSTRAINT class_field_config_fk_project_fkey FOREIGN KEY (fk_project) REFERENCES projects.project(pk_entity);

--
-- TOC entry 5854 (class 2606 OID 22856)
-- Name: dfh_class_proj_rel dfh_class_proj_rel_fk_project_fkey; Type: FK CONSTRAINT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects.dfh_class_proj_rel
  ADD CONSTRAINT dfh_class_proj_rel_fk_project_fkey FOREIGN KEY (fk_project) REFERENCES projects.project(pk_entity);

--
-- TOC entry 5892 (class 2606 OID 24060)
-- Name: dfh_profile_proj_rel dfh_profile_proj_rel_fk_project_fkey; Type: FK CONSTRAINT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects.dfh_profile_proj_rel
  ADD CONSTRAINT dfh_profile_proj_rel_fk_project_fkey FOREIGN KEY (fk_project) REFERENCES projects.project(pk_entity);

--
-- TOC entry 5847 (class 2606 OID 22866)
-- Name: info_proj_rel info_proj_rel_fk_project_fkey; Type: FK CONSTRAINT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects.info_proj_rel
  ADD CONSTRAINT info_proj_rel_fk_project_fkey FOREIGN KEY (fk_project) REFERENCES projects.project(pk_entity);

--
-- TOC entry 5855 (class 2606 OID 23924)
-- Name: project project_fk_cloned_from_project_fkey; Type: FK CONSTRAINT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects.project
  ADD CONSTRAINT project_fk_cloned_from_project_fkey FOREIGN KEY (fk_cloned_from_project) REFERENCES projects.project(pk_entity);

--
-- TOC entry 5856 (class 2606 OID 22886)
-- Name: project project_fk_creator_fkey; Type: FK CONSTRAINT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects.project
  ADD CONSTRAINT project_fk_creator_fkey FOREIGN KEY (fk_creator) REFERENCES public.account(id);

--
-- TOC entry 5857 (class 2606 OID 22891)
-- Name: project project_fk_language_fkey; Type: FK CONSTRAINT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects.project
  ADD CONSTRAINT project_fk_language_fkey FOREIGN KEY (fk_language) REFERENCES information.language(pk_entity);

--
-- TOC entry 5858 (class 2606 OID 22896)
-- Name: project project_fk_last_modifier_fkey; Type: FK CONSTRAINT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects.project
  ADD CONSTRAINT project_fk_last_modifier_fkey FOREIGN KEY (fk_last_modifier) REFERENCES public.account(id);

--
-- TOC entry 5884 (class 2606 OID 23752)
-- Name: property_label_deprecated property_label_fk_language_fkey; Type: FK CONSTRAINT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects.property_label_deprecated
  ADD CONSTRAINT property_label_fk_language_fkey FOREIGN KEY (fk_language) REFERENCES information.language(pk_entity);

--
-- TOC entry 5885 (class 2606 OID 23732)
-- Name: property_label_deprecated property_label_fk_project_fkey; Type: FK CONSTRAINT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects.property_label_deprecated
  ADD CONSTRAINT property_label_fk_project_fkey FOREIGN KEY (fk_project) REFERENCES projects.project(pk_entity);

--
-- TOC entry 5886 (class 2606 OID 23747)
-- Name: property_label_deprecated property_label_fk_system_type_fkey; Type: FK CONSTRAINT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects.property_label_deprecated
  ADD CONSTRAINT property_label_fk_system_type_fkey FOREIGN KEY (fk_system_type) REFERENCES system.system_type(pk_entity);

--
-- TOC entry 5859 (class 2606 OID 23929)
-- Name: query query_fk_cloned_from_query_fkey; Type: FK CONSTRAINT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects.query
  ADD CONSTRAINT query_fk_cloned_from_query_fkey FOREIGN KEY (fk_cloned_from_query) REFERENCES projects.query(pk_entity);

--
-- TOC entry 5860 (class 2606 OID 22901)
-- Name: query query_fk_project_fkey; Type: FK CONSTRAINT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects.query
  ADD CONSTRAINT query_fk_project_fkey FOREIGN KEY (fk_project) REFERENCES projects.project(pk_entity);

--
-- TOC entry 5861 (class 2606 OID 22906)
-- Name: query_vt query_vt_fk_project_fkey; Type: FK CONSTRAINT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects.query_vt
  ADD CONSTRAINT query_vt_fk_project_fkey FOREIGN KEY (fk_project) REFERENCES projects.project(pk_entity);

--
-- TOC entry 5895 (class 2606 OID 24597)
-- Name: table_config tables_config_account_id_fkey; Type: FK CONSTRAINT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects.table_config
  ADD CONSTRAINT tables_config_account_id_fkey FOREIGN KEY (account_id) REFERENCES public.account(id);

--
-- TOC entry 5896 (class 2606 OID 24602)
-- Name: table_config tables_config_fk_digital_fkey; Type: FK CONSTRAINT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects.table_config
  ADD CONSTRAINT tables_config_fk_digital_fkey FOREIGN KEY (fk_digital) REFERENCES data.digital(pk_entity);

--
-- TOC entry 5897 (class 2606 OID 24592)
-- Name: table_config tables_config_fk_project_fkey; Type: FK CONSTRAINT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects.table_config
  ADD CONSTRAINT tables_config_fk_project_fkey FOREIGN KEY (fk_project) REFERENCES projects.project(pk_entity);

--
-- TOC entry 5862 (class 2606 OID 22911)
-- Name: text_property text_property_fk_language_fkey; Type: FK CONSTRAINT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects.text_property
  ADD CONSTRAINT text_property_fk_language_fkey FOREIGN KEY (fk_language) REFERENCES information.language(pk_entity);

--
-- TOC entry 5863 (class 2606 OID 22916)
-- Name: text_property text_property_fk_system_type_fkey; Type: FK CONSTRAINT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects.text_property
  ADD CONSTRAINT text_property_fk_system_type_fkey FOREIGN KEY (fk_system_type) REFERENCES system.system_type(pk_entity);

--
-- TOC entry 5849 (class 2606 OID 22926)
-- Name: class_field_config ui_context_config_fk_ui_context_fkey; Type: FK CONSTRAINT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects.class_field_config
  ADD CONSTRAINT ui_context_config_fk_ui_context_fkey FOREIGN KEY (fk_app_context) REFERENCES system.app_context(pk_entity);

--
-- TOC entry 5899 (class 2606 OID 24981)
-- Name: visibility_settings visibility_settings_fk_project_fkey; Type: FK CONSTRAINT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects.visibility_settings
  ADD CONSTRAINT visibility_settings_fk_project_fkey FOREIGN KEY (fk_project) REFERENCES projects.project(pk_entity);

--
-- TOC entry 5864 (class 2606 OID 22931)
-- Name: visual visual_fk_project_fkey; Type: FK CONSTRAINT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects.visual
  ADD CONSTRAINT visual_fk_project_fkey FOREIGN KEY (fk_project) REFERENCES projects.project(pk_entity);

--
-- TOC entry 5865 (class 2606 OID 22936)
-- Name: visual_vt visual_vt_fk_project_fkey; Type: FK CONSTRAINT; Schema: projects; Owner: -
--
ALTER TABLE ONLY projects.visual_vt
  ADD CONSTRAINT visual_vt_fk_project_fkey FOREIGN KEY (fk_project) REFERENCES projects.project(pk_entity);

--
-- TOC entry 5866 (class 2606 OID 22941)
-- Name: accesstoken accesstoken_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY public.accesstoken
  ADD CONSTRAINT accesstoken_userid_fkey FOREIGN KEY (userid) REFERENCES public.account(id);

--
-- TOC entry 5894 (class 2606 OID 24485)
-- Name: credential account_credential_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY public.credential
  ADD CONSTRAINT account_credential_fkey FOREIGN KEY (accountid) REFERENCES public.account(id);

--
-- TOC entry 5867 (class 2606 OID 22946)
-- Name: account_project_rel account_project_rel_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY public.account_project_rel
  ADD CONSTRAINT account_project_rel_account_id_fkey FOREIGN KEY (account_id) REFERENCES public.account(id);

--
-- TOC entry 5868 (class 2606 OID 22951)
-- Name: account_project_rel account_project_rel_fk_project_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY public.account_project_rel
  ADD CONSTRAINT account_project_rel_fk_project_fkey FOREIGN KEY (fk_project) REFERENCES projects.project(pk_entity);

--
-- TOC entry 5869 (class 2606 OID 22961)
-- Name: rolemapping rolemapping_roleid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY public.rolemapping
  ADD CONSTRAINT rolemapping_roleid_fkey FOREIGN KEY (roleid) REFERENCES public.role(id);

--
-- TOC entry 5872 (class 2606 OID 22971)
-- Name: class_has_type_property class_has_type_property_fk_property_fkey; Type: FK CONSTRAINT; Schema: system; Owner: -
--
ALTER TABLE ONLY system.class_has_type_property
  ADD CONSTRAINT class_has_type_property_fk_property_fkey FOREIGN KEY (fk_property) REFERENCES data_for_history.property(dfh_pk_property);

--
-- TOC entry 5850 (class 2606 OID 22976)
-- Name: class_field fk_system_type_ng_component_fkey; Type: FK CONSTRAINT; Schema: system; Owner: -
--
ALTER TABLE ONLY system.class_field
  ADD CONSTRAINT fk_system_type_ng_component_fkey FOREIGN KEY (fk_system_type_ng_component) REFERENCES system.system_type(pk_entity);

--
-- TOC entry 5870 (class 2606 OID 22981)
-- Name: class_field_property_rel property_set_property_rel_fk_property_fkey; Type: FK CONSTRAINT; Schema: system; Owner: -
--
ALTER TABLE ONLY system.class_field_property_rel
  ADD CONSTRAINT property_set_property_rel_fk_property_fkey FOREIGN KEY (fk_property) REFERENCES data_for_history.property(dfh_pk_property);

--
-- TOC entry 5871 (class 2606 OID 22986)
-- Name: class_field_property_rel property_set_property_rel_fk_property_set_fkey; Type: FK CONSTRAINT; Schema: system; Owner: -
--
ALTER TABLE ONLY system.class_field_property_rel
  ADD CONSTRAINT property_set_property_rel_fk_property_set_fkey FOREIGN KEY (fk_class_field) REFERENCES system.class_field(pk_entity);

--
-- TOC entry 5873 (class 2606 OID 24675)
-- Name: system_relevant_type system_relevant_type_fk_type_fkey; Type: FK CONSTRAINT; Schema: system; Owner: -
--
ALTER TABLE ONLY system.system_relevant_type
  ADD CONSTRAINT system_relevant_type_fk_type_fkey FOREIGN KEY (fk_type) REFERENCES information.resource(pk_entity);

--
-- TOC entry 5887 (class 2606 OID 23827)
-- Name: quill_doc_cell quill_doc_cell_fk_column_fkey; Type: FK CONSTRAINT; Schema: tables; Owner: -
--
ALTER TABLE ONLY tables.quill_doc_cell
  ADD CONSTRAINT quill_doc_cell_fk_column_fkey FOREIGN KEY (fk_column) REFERENCES data."column"(pk_entity);

--
-- TOC entry 5888 (class 2606 OID 23832)
-- Name: quill_doc_cell quill_doc_cell_fk_digital_fkey; Type: FK CONSTRAINT; Schema: tables; Owner: -
--
ALTER TABLE ONLY tables.quill_doc_cell
  ADD CONSTRAINT quill_doc_cell_fk_digital_fkey FOREIGN KEY (fk_digital) REFERENCES data.digital(pk_entity);

--
-- TOC entry 5889 (class 2606 OID 24642)
-- Name: quill_doc_cell quill_doc_cell_fk_row_fkey; Type: FK CONSTRAINT; Schema: tables; Owner: -
--
ALTER TABLE ONLY tables.quill_doc_cell
  ADD CONSTRAINT quill_doc_cell_fk_row_fkey FOREIGN KEY (fk_row) REFERENCES tables."row"(pk_row);

--
-- TOC entry 5898 (class 2606 OID 24631)
-- Name: row row_fk_digital_fkey; Type: FK CONSTRAINT; Schema: tables; Owner: -
--
ALTER TABLE ONLY tables."row"
  ADD CONSTRAINT row_fk_digital_fkey FOREIGN KEY (fk_digital) REFERENCES data.digital(pk_entity);

--
-- TOC entry 6470 (class 0 OID 0)
-- Dependencies: 6
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--
REVOKE USAGE ON SCHEMA public FROM PUBLIC;

GRANT ALL ON SCHEMA public TO PUBLIC;

-- Completed on 2024-05-29 13:48:57 CEST
--
-- PostgreSQL database dump complete
--
