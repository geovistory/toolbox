-- 3
ALTER TABLE projects.info_proj_rel RENAME COLUMN calendar_backup TO calendar;

ALTER TABLE projects.info_proj_rel_vt RENAME COLUMN calendar_backup TO calendar;

-- 1
-- View: information.v_statement
DROP VIEW information.v_statement;

CREATE OR REPLACE VIEW information.v_statement AS
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
  t2.community_favorite_calendar,
  t1.notes,
  t1.tmsp_creation,
  t1.tmsp_last_modification,
  t1.sys_period
FROM
  information.statement t1
  LEFT JOIN LATERAL (
    SELECT
      count(info_proj_rel.pk_entity)::integer AS is_in_project_count,
      COALESCE(count(*) FILTER (WHERE info_proj_rel.ord_num_of_domain = 0), 0::bigint)::integer AS is_standard_in_project_count,
      mode() WITHIN GROUP (ORDER BY info_proj_rel.calendar) AS community_favorite_calendar
    FROM
      projects.info_proj_rel
    WHERE
      info_proj_rel.fk_entity = t1.pk_entity
      AND info_proj_rel.is_in_project = TRUE GROUP BY
        info_proj_rel.fk_entity) t2 ON TRUE;

CREATE TRIGGER on_insert
  INSTEAD OF INSERT ON information.v_statement
  FOR EACH ROW
  EXECUTE PROCEDURE information.v_statement_find_or_create ();

-- 2
DROP FUNCTION information.get_outgoing_statements_to_add (integer, integer);

CREATE OR REPLACE FUNCTION information.get_outgoing_statements_to_add (entity_id integer, project_id integer)
  RETURNS TABLE (
    pk_entity integer,
    fk_object_info integer,
    fk_subject_info integer,
    calendar calendar_type)
  LANGUAGE 'sql'
  COST 100 VOLATILE ROWS 1000
  AS $BODY$
  WITH tw1 AS (
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
tw2 AS (
  -- select properties of the project
  SELECT DISTINCT ON (pk_property,
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
tw3 AS (
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
    row_number() OVER (PARTITION BY t3.fk_class,
      t1.fk_property ORDER BY is_in_project_count DESC) AS rank,
    t1.community_favorite_calendar calendar
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
    AND t4.has_domain IN (t2.fk_class, 50 -- make every class to a timespan class
)
    AND t3.fk_class = t4.has_range
)
SELECT
  pk_entity,
  fk_object_info,
  fk_subject_info,
  calendar
FROM
  tw3
WHERE
  target_max_quantifier >= rank;

$BODY$;

-- 4
DROP VIEW projects.v_info_proj_rel;

CREATE OR REPLACE VIEW projects.v_info_proj_rel AS
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
  info_proj_rel.calendar,
  info_proj_rel.ord_num_of_domain,
  info_proj_rel.fk_project,
  info_proj_rel.ord_num_of_range,
  info_proj_rel.ord_num_of_text_property,
  info_proj_rel.project_visibility
FROM
  projects.info_proj_rel;

-- 5
CREATE OR REPLACE FUNCTION projects.v_info_proj_rel_update_or_create ()
  RETURNS TRIGGER
  LANGUAGE 'plpgsql'
  COST 100 VOLATILE NOT LEAKPROOF
  AS $BODY$
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
      calendar = COALESCE(NEW.calendar, resulting_row.calendar),
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
INSERT INTO projects.info_proj_rel (fk_project, fk_entity, fk_entity_version, fk_entity_version_concat, is_in_project, is_standard_in_project, calendar, ord_num_of_domain, ord_num_of_range, ord_num_of_text_property, entity_version, fk_creator, fk_last_modifier, project_visibility)
        VALUES (NEW.fk_project, NEW.fk_entity, NEW.fk_entity_version, NEW.fk_entity_version_concat, NEW.is_in_project, NEW.is_standard_in_project, NEW.calendar, NEW.ord_num_of_domain, NEW.ord_num_of_range, NEW.ord_num_of_text_property, 1, NEW.fk_creator, NEW.fk_last_modifier, NEW.project_visibility)
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
$BODY$;

