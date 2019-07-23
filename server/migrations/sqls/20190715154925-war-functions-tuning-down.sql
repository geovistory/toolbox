---------------------------------------------------------------------------------------------------
-- tune performace of warehouse.entity_preview__create_all function

CREATE OR REPLACE FUNCTION warehouse.entity_preview__create_all ()
  RETURNS boolean
  LANGUAGE 'plpgsql'
  COST 100 VOLATILE
  AS $BODY$
DECLARE
  item record;
  results warehouse.entity_preview;
  t timestamptz;
  number_of_unfinished INT;
BEGIN
  t = clock_timestamp();
  -- create temporary tables to create the temp_entity_preview_non_recursive
  CREATE TEMP TABLE temp_entities AS
  SELECT
    *
  FROM
    warehouse.v_entities;
  CREATE TEMP TABLE temp_own_entity_label AS
  SELECT
    *
  FROM
    warehouse.v_own_entity_label;
  CREATE TEMP TABLE temp_te_en_time_span_per_project_and_repo AS
  SELECT
    *
  FROM
    warehouse.v_te_en_time_span_per_project_and_repo;
  CREATE TEMP TABLE temp_own_full_text AS
  SELECT
    *
  FROM
    warehouse.v_own_full_text;
  CREATE TEMP TABLE temp_fk_entity_label AS
  SELECT
    *
  FROM
    warehouse.v_fk_entity_label;
  CREATE TEMP TABLE temp_fk_type AS
  SELECT
    *
  FROM
    warehouse.v_fk_type;
  -- create temporary table with previews non recursive
  CREATE TEMP TABLE temp_entity_preview_non_recursive AS WITH entities AS (
    SELECT
      temp_entities.pk_entity,
      temp_entities.fk_project,
      temp_entities.project,
      temp_entities.fk_class,
      temp_entities.table_name,
      temp_entities.entity_type
    FROM
      temp_entities
    ),
add_class_label AS (
  SELECT
    entities.pk_entity,
    entities.fk_project,
    entities.project,
    entities.fk_class,
    entities.table_name,
    entities.entity_type,
    c.class_label
  FROM
    entities
    JOIN warehouse.class_preview c ON c.dfh_pk_class = entities.fk_class
  ),
add_own_entity_label AS (
  SELECT
    a.pk_entity,
    a.fk_project,
    a.project,
    a.fk_class,
    a.table_name,
    a.entity_type,
    a.class_label,
    l.entity_label
  FROM
    add_class_label a
    LEFT JOIN temp_own_entity_label l ON a.pk_entity = l.pk_entity
      AND a.project = l.project
    ),
add_time_span AS (
  SELECT
    a.pk_entity,
    a.fk_project,
    a.project,
    a.fk_class,
    a.table_name,
    a.entity_type,
    a.class_label,
    a.entity_label,
    t.time_span
  FROM
    add_own_entity_label a
  LEFT JOIN temp_te_en_time_span_per_project_and_repo t ON a.pk_entity = t.fk_temporal_entity
    AND NOT a.fk_project IS DISTINCT FROM t.fk_project
  ),
add_own_full_text AS (
  SELECT
    a.pk_entity,
    a.fk_project,
    a.project,
    a.fk_class,
    a.table_name,
    a.entity_type,
    a.class_label,
    a.entity_label,
    a.time_span,
    t.own_full_text
  FROM
    add_time_span a
  LEFT JOIN temp_own_full_text t ON a.pk_entity = t.pk_entity
    AND a.project = t.project
  ),
add_fk_entity_label AS (
  SELECT
    a.pk_entity,
    a.fk_project,
    a.project,
    a.fk_class,
    a.table_name,
    a.entity_type,
    a.class_label,
    a.entity_label,
    a.time_span,
    a.own_full_text,
    t.fk_entity_label
  FROM
    add_own_full_text a
  LEFT JOIN temp_fk_entity_label t ON a.pk_entity = t.pk_entity
    AND NOT a.fk_project IS DISTINCT FROM t.fk_project
  ),
add_fk_type AS (
  SELECT
    a.pk_entity,
    a.fk_project,
    a.project,
    a.fk_class,
    a.table_name,
    a.entity_type,
    a.class_label,
    a.entity_label,
    a.time_span,
    a.own_full_text,
    a.fk_entity_label,
    t.fk_type
  FROM
    add_fk_entity_label a
  LEFT JOIN temp_fk_type t ON a.pk_entity = t.pk_entity
    AND a.project = t.project
  )
SELECT
  add_fk_type.pk_entity,
  add_fk_type.fk_project,
  add_fk_type.project,
  add_fk_type.fk_class,
  add_fk_type.table_name,
  add_fk_type.entity_type,
  add_fk_type.class_label,
  add_fk_type.entity_label,
  add_fk_type.time_span,
  add_fk_type.own_full_text,
  add_fk_type.fk_entity_label,
  add_fk_type.fk_type
FROM
  add_fk_type;
  -- init temp table
  DROP TABLE IF EXISTS warehouse.temp;
  CREATE TABLE warehouse.temp AS WITH fill_entity_label AS (
    SELECT
      t1.pk_entity,
      t1.fk_project,
      t1.project,
      t1.fk_class,
      t1.entity_type,
      t1.class_label,
      COALESCE(t1.entity_label, t2.entity_label ) AS entity_label,
      t1.time_span,
      t1.own_full_text,
      t1.fk_entity_label,
      t1.fk_type
    FROM
      temp_entity_preview_non_recursive t1
    LEFT JOIN temp_entity_preview_non_recursive t2 ON t1.fk_entity_label = t2.pk_entity
      AND t1.project = t2.project
    ),
fill_type_label AS (
  SELECT
    t1.pk_entity,
    t1.fk_project,
    t1.project,
    t1.fk_class,
    t1.entity_type,
    t1.class_label,
    t1.entity_label,
    t1.time_span,
    t1.own_full_text,
    t1.fk_entity_label,
    t1.fk_type,
    t2.entity_label AS type_label
  FROM
    fill_entity_label t1
  LEFT JOIN fill_entity_label t2 ON t1.fk_type = t2.pk_entity
    AND t1.project = t2.project
  ),
full_text_dependencies AS (
  SELECT
    r.fk_temporal_entity AS pk_entity,
    r.project,
    r.fk_project,
    e.pk_entity AS pk_related_full_text,
    pre.own_full_text
  FROM
    warehouse.v_roles_per_project_and_repo r
  JOIN information.entity e ON e.pk_entity = r.fk_entity
    AND e.table_name::text = 'persistent_item'::text
  LEFT JOIN temp_entity_preview_non_recursive pre ON pre.pk_entity = e.pk_entity
    AND pre.project = r.project
  UNION
  SELECT
    r.fk_entity AS pk_entity,
    r.project,
    r.fk_project,
    e.pk_entity AS pk_related_full_text,
    pre.own_full_text
  FROM
    warehouse.v_roles_per_project_and_repo r
  JOIN information.entity e ON e.pk_entity = r.fk_temporal_entity
    AND e.table_name::text = 'temporal_entity'::text
  LEFT JOIN temp_entity_preview_non_recursive pre ON pre.pk_entity = e.pk_entity
    AND pre.project = r.project
  ),
aggregated_related_full_texts AS (
  SELECT
    full_text_dependencies.pk_entity,
    full_text_dependencies.project,
    full_text_dependencies.fk_project,
    jsonb_object_agg(full_text_dependencies.pk_related_full_text::text, full_text_dependencies.own_full_text ) AS related_full_texts
  FROM
    full_text_dependencies
  GROUP BY
    full_text_dependencies.pk_entity,
    full_text_dependencies.project,
    full_text_dependencies.fk_project
  ),
related_full_text AS (
  SELECT
    t1.pk_entity,
    t1.fk_project,
    t1.project,
    t1.fk_class,
    t1.entity_type,
    t1.class_label,
    t1.entity_label,
    t1.time_span,
    t1.own_full_text,
    t1.fk_entity_label,
    t1.fk_type,
    t1.type_label,
    t2.related_full_texts
  FROM
    fill_type_label t1
  LEFT JOIN aggregated_related_full_texts t2 ON t1.pk_entity = t2.pk_entity
    AND t1.project = t2.project
  ),
add_full_text AS (
  SELECT
    f.pk_entity,
    f.fk_project,
    f.project,
    f.fk_class,
    f.entity_type,
    f.class_label,
    f.entity_label,
    f.time_span,
    f.own_full_text,
    f.fk_entity_label,
    f.fk_type,
    f.type_label,
    f.related_full_texts,
    (
      SELECT
        array_to_string(ARRAY[f.own_full_text, array_to_string(array_agg(jsonb_each_text.value ), ', '::text )], ', '::text ) AS array_to_string
      FROM
        jsonb_each_text(f.related_full_texts ) jsonb_each_text(KEY, value ) ) AS full_text
    FROM
      related_full_text f
    ),
add_ts_vector AS (
  SELECT
    t.pk_entity,
    t.fk_project,
    t.project,
    t.fk_class,
    t.entity_type,
    t.class_label,
    t.entity_label,
    t.time_span,
    t.own_full_text,
    t.fk_entity_label,
    t.fk_type,
    t.type_label,
    t.related_full_texts,
    t.full_text,
    (setweight(to_tsvector(COALESCE(t.entity_label, ''::text ) ), 'A'::"char" ) || setweight(to_tsvector(COALESCE(t.type_label, t.class_label::text, ''::text ) ), 'B'::"char" ) ) || setweight(to_tsvector(COALESCE(t.full_text, ''::text ) ), 'C'::"char" ) AS ts_vector
  FROM
    add_full_text t
  )
SELECT
  add_ts_vector.pk_entity,
  add_ts_vector.fk_project,
  add_ts_vector.project,
  add_ts_vector.fk_class,
  add_ts_vector.entity_type,
  add_ts_vector.class_label,
  add_ts_vector.entity_label,
  add_ts_vector.time_span,
  add_ts_vector.own_full_text,
  add_ts_vector.fk_entity_label,
  add_ts_vector.fk_type,
  add_ts_vector.type_label,
  add_ts_vector.related_full_texts,
  add_ts_vector.full_text,
  add_ts_vector.ts_vector
FROM
  add_ts_vector;
  WITH fill_entity_label AS (
    SELECT
      t1.pk_entity,
      t1.fk_project,
      t1.project,
      t1.fk_class,
      t1.entity_type,
      t1.class_label,
      coalesce(t2.entity_label, t1.entity_label) entity_label,
      t1.time_span,
      t1.own_full_text,
      t1.fk_entity_label,
      t1.fk_type
    FROM
      warehouse.temp t1
    LEFT JOIN warehouse.temp t2 ON t1.fk_entity_label = t2.pk_entity
      AND t1.project = t2.project
),
fill_type_label AS (
  SELECT
    t1.*,
    t2.entity_label type_label
  FROM
    fill_entity_label t1
  LEFT JOIN fill_entity_label t2 ON t1.fk_type = t2.pk_entity
    AND t1.project = t2.project
),
full_text_dependencies AS (
  SELECT
    r.fk_temporal_entity AS pk_entity,
    r.project,
    r.fk_project,
    e.pk_entity AS pk_related_full_text,
    pre.own_full_text
  FROM
    warehouse.v_roles_per_project_and_repo r
  JOIN information.entity e ON e.pk_entity = r.fk_entity
    AND e.table_name = 'persistent_item'
  LEFT JOIN warehouse.temp pre ON pre.pk_entity = e.pk_entity
    AND pre.project = r.project
  UNION
  SELECT
    r.fk_entity AS pk_entity,
    r.project,
    r.fk_project,
    e.pk_entity AS pk_related_full_text,
    pre.own_full_text
  FROM
    warehouse.v_roles_per_project_and_repo r
  JOIN information.entity e ON e.pk_entity = r.fk_temporal_entity
    AND e.table_name = 'temporal_entity'
  LEFT JOIN warehouse.temp pre ON pre.pk_entity = e.pk_entity
    AND pre.project = r.project
),
aggregated_related_full_texts AS (
  SELECT
    pk_entity,
    project,
    fk_project,
    jsonb_object_agg(full_text_dependencies.pk_related_full_text::text, full_text_dependencies.own_full_text) related_full_texts
  FROM
    full_text_dependencies
  GROUP BY
    pk_entity,
    project,
    fk_project
),
related_full_text AS (
  SELECT
    t1.*,
    t2.related_full_texts
  FROM
    fill_type_label t1
  LEFT JOIN aggregated_related_full_texts t2 ON t1.pk_entity = t2.pk_entity
    AND t1.project = t2.project
),
add_full_text AS (
  SELECT
    *,
    (
      SELECT
        array_to_string(ARRAY[
          --coalesce(f.type_label, f.class_label, ''),
          f.own_full_text, array_to_string(array_agg(value), ', ')]::text[], ', ')
      FROM
        jsonb_each_text(f.related_full_texts)) AS full_text
    FROM
      related_full_text f
),
add_ts_vector AS (
  SELECT
    t.*,
    setweight(to_tsvector(coalesce(t.entity_label, '')), 'A') || setweight(to_tsvector(coalesce(t.type_label, t.class_label, '')), 'B') || setweight(to_tsvector(coalesce(t.full_text, '')), 'C') AS ts_vector
  FROM
    add_full_text t
),
updated AS (
  SELECT
    *
  FROM
    add_ts_vector
)
UPDATE
  warehouse.temp
SET
  entity_label = updated.entity_label
FROM
  updated
WHERE
  temp.pk_entity = updated.pk_entity
  AND temp.fk_project IS NOT DISTINCT FROM updated.fk_project;
  SELECT
    count(*) INTO number_of_unfinished
  FROM
    warehouse.temp a
    JOIN warehouse.temp b ON a.fk_entity_label = b.pk_entity
      AND a.entity_label IS DISTINCT FROM b.entity_label
      AND a.project = b.project;
  raise notice 'number_of_unfinished entity_previews (if zero, everything fine): %', number_of_unfinished;
  -- empty table entity_preview
  DELETE FROM warehouse.entity_preview;
  INSERT INTO warehouse.entity_preview (pk_entity, fk_project, project, fk_class, entity_type, class_label, entity_label, time_span, own_full_text, fk_entity_label, fk_type, type_label, related_full_texts, full_text, ts_vector)
SELECT
  pk_entity,
  fk_project,
  project,
  fk_class,
  entity_type,
  class_label,
  entity_label,
  time_span,
  own_full_text,
  fk_entity_label,
  fk_type,
  type_label,
  related_full_texts,
  full_text,
  ts_vector
FROM
  warehouse.temp;
  DROP TABLE warehouse.temp;
  raise notice 'time spent for entity_preview__fill_own_full_text=%', clock_timestamp() - t;
  RETURN TRUE;
END;
$BODY$;

DROP FUNCTION warehouse.entity_preview__create_temporary;
DROP FUNCTION warehouse.entity_preview__add_missing;
DROP FUNCTION warehouse.entity_preview__remove_superfluous ;
DROP FUNCTION warehouse.entity_preview__update_modified;

DROP TRIGGER after_update_on_entity_preview__entity_label ON warehouse.entity_preview;

CREATE TRIGGER after_update_on_entity_preview__entity_label
    AFTER UPDATE OF entity_label
    ON warehouse.entity_preview
    FOR EACH ROW
    EXECUTE PROCEDURE warehouse.entity_preview__update_dependent_entity_labels();

DROP TRIGGER after_update_on_entity_preview__fk_entity_label ON warehouse.entity_preview;

CREATE TRIGGER after_update_on_entity_preview__fk_entity_label
    AFTER UPDATE OF fk_entity_label
    ON warehouse.entity_preview
    FOR EACH ROW
    EXECUTE PROCEDURE warehouse.entity_preview__get_entity_label();

DROP TRIGGER after_update_on_entity_preview__fk_type ON warehouse.entity_preview;

CREATE TRIGGER after_update_on_entity_preview__fk_type
    AFTER UPDATE OF fk_type
    ON warehouse.entity_preview
    FOR EACH ROW
    EXECUTE PROCEDURE warehouse.entity_preview__get_type_label();

DROP TRIGGER after_update_on_entity_preview__own_full_text ON warehouse.entity_preview;

CREATE TRIGGER after_update_on_entity_preview__own_full_text
    AFTER UPDATE OF own_full_text
    ON warehouse.entity_preview
    FOR EACH ROW
    EXECUTE PROCEDURE warehouse.entity_preview__update_dependent_related_full_texts();

DROP TRIGGER before_update_on_entity_preview__own_full_text_or_related_full_texts ON warehouse.entity_preview;

CREATE TRIGGER before_update_on_entity_preview__own_full_text
    BEFORE UPDATE OF own_full_text
    ON warehouse.entity_preview
    FOR EACH ROW
    EXECUTE PROCEDURE warehouse.entity_preview__concat_full_text();

CREATE TRIGGER before_update_on_entity_preview__related_full_texts
    BEFORE INSERT OR UPDATE OF related_full_texts
    ON warehouse.entity_preview
    FOR EACH ROW
    EXECUTE PROCEDURE warehouse.entity_preview__concat_full_text();

ALTER TABLE warehouse.entity_preview DROP COLUMN skip_triggers;


---------------------------------------------------------------------------------------------------
-- tune performace of warehouse.entity_preview__create function
---------------------------------------------------------------------------------------------------
-- tune performace of warehouse.entity_preview__create_fk_entity_label function

CREATE OR REPLACE FUNCTION warehouse.entity_preview__create_fk_entity_label (param_pk_entity integer, param_fk_project integer)
  RETURNS jsonb
  LANGUAGE 'plpgsql'
  COST 100 VOLATILE
  AS $BODY$
DECLARE
  old_fk_entity_label INT;
  new_fk_entity_label INT;
  result_info JSONB;
BEGIN
  ---------------------- REPO VERSIONS ----------------------
  IF param_fk_project IS NULL THEN
    RAISE INFO 'entity_preview__create_fk_entity_label of pk_entity: %, fk_project: %', param_pk_entity, param_fk_project;
    -- get the fk_entity_label
    SELECT
      pk INTO new_fk_entity_label
    FROM ((
        SELECT
          fk_temporal_entity AS pk,
          r.rank_for_pe_it AS rank
        FROM
          information.v_role r
          JOIN projects.class_field_config ucc ON ucc.fk_property = r.fk_property
            AND ucc.ord_num = 0
            AND ucc.property_is_outgoing = FALSE
            AND ucc.fk_app_context = 45
          JOIN information.entity e ON r.fk_temporal_entity = e.pk_entity
            AND e.table_name = 'temporal_entity'
        WHERE
          r.fk_entity = param_pk_entity
          AND r.is_in_project_count > 0)
      UNION (
        SELECT
          r.fk_entity AS pk,
          r.rank_for_te_ent AS rank
        FROM
          information.v_role r
          JOIN projects.class_field_config ucc ON ucc.fk_property = r.fk_property
            AND ucc.ord_num = 0
            AND ucc.property_is_outgoing = TRUE
            AND ucc.fk_app_context = 45
          JOIN information.entity e ON r.fk_entity = e.pk_entity
            AND e.table_name = 'persistent_item'
        WHERE
          r.fk_temporal_entity = param_pk_entity
          AND r.is_in_project_count > 0)) AS a
    ORDER BY
      rank
    LIMIT 1;
    RAISE INFO 'new_fk_entity_label: %', new_fk_entity_label;
    ----- Insert or update column fk_entity_label of table entity_preview
    SELECT
      fk_entity_label INTO old_fk_entity_label
    FROM
      warehouse.entity_preview
    WHERE
      pk_entity = param_pk_entity
      AND fk_project IS NULL;
    RAISE INFO 'old_fk_entity_label: %', old_fk_entity_label;
    IF NOT FOUND THEN
      INSERT INTO warehouse.entity_preview (pk_entity, fk_project, fk_entity_label)
        VALUES (param_pk_entity, param_fk_project, new_fk_entity_label);
      RAISE INFO 'inserted new_fk_entity_label: %', new_fk_entity_label;
    ELSIF (
        SELECT
          (old_fk_entity_label IS DISTINCT FROM new_fk_entity_label)) THEN
        UPDATE
          warehouse.entity_preview
        SET
          fk_entity_label = new_fk_entity_label
        WHERE
          pk_entity = param_pk_entity
          AND fk_project IS NULL;
      RAISE INFO 'updated object with new_object: %', new_fk_entity_label;
    ELSE
      RAISE INFO 'no update needed: %', new_fk_entity_label;
    END IF;
    ---------------------- PROJECTS VERSIONS ----------------------
  ELSE
    RAISE INFO 'entity_preview__create_fk_entity_label of pk_entity: %, fk_project: %', param_pk_entity, param_fk_project;
    -- get the fk_entity_label
    SELECT
      pk INTO new_fk_entity_label
    FROM ((
        SELECT
          fk_temporal_entity AS pk,
          epr.ord_num
        FROM
          information.role r
          JOIN projects.info_proj_rel epr ON epr.fk_entity = r.pk_entity
          JOIN projects.class_field_config ucc ON ucc.fk_property = r.fk_property
            AND ucc.ord_num = 0
            AND ucc.property_is_outgoing = FALSE
            AND ucc.fk_app_context = 45
          JOIN information.entity e ON r.fk_temporal_entity = e.pk_entity
            AND e.table_name = 'temporal_entity'
        WHERE
          r.fk_entity = param_pk_entity
          AND epr.fk_project = param_fk_project
          AND epr.is_in_project = TRUE)
      UNION (
        SELECT
          r.fk_entity AS pk,
          epr.ord_num
        FROM
          information.role r
          JOIN projects.info_proj_rel epr ON epr.fk_entity = r.pk_entity
          JOIN projects.class_field_config ucc ON ucc.fk_property = r.fk_property
            AND ucc.ord_num = 0
            AND ucc.property_is_outgoing = TRUE
            AND ucc.fk_app_context = 45
          JOIN information.entity e ON r.fk_entity = e.pk_entity
            AND e.table_name = 'persistent_item'
        WHERE
          r.fk_temporal_entity = param_pk_entity
          AND epr.fk_project = param_fk_project
          AND epr.is_in_project = TRUE)) AS a
    ORDER BY
      ord_num
    LIMIT 1;
    RAISE INFO 'new_fk_entity_label: %', new_fk_entity_label;
    ----- Insert or update column fk_entity_label of table entity_preview
    SELECT
      fk_entity_label INTO old_fk_entity_label
    FROM
      warehouse.entity_preview
    WHERE
      pk_entity = param_pk_entity
      AND fk_project = param_fk_project;
    RAISE INFO 'old_fk_entity_label: %', old_fk_entity_label;
    IF NOT FOUND THEN
      INSERT INTO warehouse.entity_preview (pk_entity, fk_project, fk_entity_label)
        VALUES (param_pk_entity, param_fk_project, new_fk_entity_label);
      RAISE INFO 'inserted new_fk_entity_label: %', new_fk_entity_label;
    ELSIF (
        SELECT
          (old_fk_entity_label IS DISTINCT FROM new_fk_entity_label)) THEN
        UPDATE
          warehouse.entity_preview
        SET
          fk_entity_label = new_fk_entity_label
        WHERE
          pk_entity = param_pk_entity
          AND fk_project = param_fk_project;
      RAISE INFO 'updated object with new_fk_entity_label: %', new_fk_entity_label;
    ELSE
      RAISE INFO 'no update needed: %', new_fk_entity_label;
    END IF;
  END IF;
  SELECT
    jsonb_build_object ('changed',
      (
        SELECT
          (old_fk_entity_label IS DISTINCT FROM new_fk_entity_label)),
        'old_val',
        old_fk_entity_label,
        'new_val',
        new_fk_entity_label) INTO result_info;
  RETURN result_info;
END;
$BODY$;

---------------------------------------------------------------------------------------------------
-- tune performace of warehouse.entity_preview__create_fk_type function

CREATE OR REPLACE FUNCTION warehouse.entity_preview__create_fk_type(
	param_pk_entity integer,
	param_fk_project integer)
    RETURNS jsonb
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE
AS $BODY$
  DECLARE
    old_fk_type INT;
    new_fk_type INT;
    result_info JSONB;
  BEGIN

    RAISE INFO 'entity_preview__create_fk_type of pk_entity: %, fk_project: %', param_pk_entity, param_fk_project;


    IF param_fk_project IS NULL THEN
      ------------------------------------ REPO QUERY ------------------------------------
      SELECT DISTINCT ea.fk_info_range INTO new_fk_type
      FROM information.v_entity_association ea
      JOIN projects.info_proj_rel epr ON ea.pk_entity = epr.fk_entity
      JOIN system.class_has_type_property p ON ea.fk_property = p.fk_property
      WHERE ea.fk_info_domain = param_pk_entity
      AND ea.rank_for_domain = 1
      LIMIT 1;
    ELSE
        ---------------------------------- PROJECT QUERY ----------------------------------
        SELECT DISTINCT ea.fk_info_range INTO new_fk_type
        FROM information.entity_association ea
        JOIN projects.info_proj_rel epr ON ea.pk_entity = epr.fk_entity
        JOIN system.class_has_type_property p ON ea.fk_property = p.fk_property
        WHERE ea.fk_info_domain = param_pk_entity
        AND epr.is_in_project = true
        AND epr.fk_project = param_fk_project
        LIMIT 1;
    END IF;

    RAISE INFO 'new_fk_type: %', new_fk_type;

        ----- Insert or update column fk_type of table entity_preview

        SELECT fk_type INTO old_fk_type FROM warehouse.entity_preview
        WHERE pk_entity = param_pk_entity AND fk_project IS NOT DISTINCT FROM param_fk_project;

		RAISE INFO 'old_fk_type: %', old_fk_type;

    IF NOT FOUND THEN

        INSERT INTO warehouse.entity_preview (pk_entity, fk_project, fk_type)
        VALUES (param_pk_entity, param_fk_project, new_fk_type);

        RAISE INFO 'inserted new_fk_type: %', new_fk_type;

    ELSIF (SELECT (old_fk_type IS DISTINCT FROM new_fk_type)) THEN

        UPDATE warehouse.entity_preview
        SET fk_type = new_fk_type
        where pk_entity=param_pk_entity AND fk_project IS NOT DISTINCT FROM param_fk_project;

        RAISE INFO 'updated object with new_fk_type: %', new_fk_type;
    ELSE
        RAISE INFO 'no update needed: %', new_fk_type;
    END IF;

    SELECT jsonb_build_object(
      'changed', (SELECT (old_fk_type IS DISTINCT FROM new_fk_type)),
      'old_val', old_fk_type,
      'new_val', new_fk_type)
    INTO result_info;

    RETURN result_info;

  END;
  $BODY$;
---------------------------------------------------------------------------------------------------
-- tune performace of warehouse.entity_preview__create_related_full_texts function
---------------------------------------------------------------------------------------------------
-- tune performace of warehouse.entity_preview__fill_own_entity_label function
CREATE OR REPLACE FUNCTION warehouse.entity_preview__fill_own_entity_label(
	param_pk_entity integer,
	param_fk_project integer)
    RETURNS boolean
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE
AS $BODY$
  DECLARE
  old_own_entity_label TEXT;
  new_own_entity_label TEXT;
  BEGIN

  -- if this has a fk_entity_label skip the whole function
  -- because the entity label is provided by that other entity
  IF (
    SELECT (
      SELECT fk_entity_label
      FROM warehouse.entity_preview
      WHERE pk_entity = param_pk_entity AND fk_project IS NOT DISTINCT FROM param_fk_project
      LIMIT 1
      ) IS NULL
  ) THEN


      RAISE INFO 'entity_preview__fill_own_entity_label of pk_entity: %, fk_project: %', param_pk_entity, param_fk_project;

      -- get the string new_own_entity_label
	  SELECT own_entity_label INTO new_own_entity_label
	  FROM warehouse.v_own_entity_label
	  WHERE pk_entity = param_pk_entity
	  AND fk_project IS NOT DISTINCT FROM param_fk_project;

      RAISE INFO 'new_own_entity_label: %', new_own_entity_label;

      ----- Insert or update column own_entity_label of table entity_preview

      SELECT entity_label INTO old_own_entity_label FROM warehouse.entity_preview
      WHERE pk_entity = param_pk_entity AND fk_project IS NOT DISTINCT FROM param_fk_project;

      RAISE INFO 'old_own_entity_label: %', old_own_entity_label;

      IF NOT FOUND THEN

        INSERT INTO warehouse.entity_preview (pk_entity, fk_project, entity_label)
        VALUES (param_pk_entity, param_fk_project, new_own_entity_label);

        RAISE INFO 'inserted new_own_entity_label: %', new_own_entity_label;

      ELSIF (SELECT (old_own_entity_label IS DISTINCT FROM new_own_entity_label)) THEN

        UPDATE warehouse.entity_preview
        SET entity_label = new_own_entity_label
        where pk_entity=param_pk_entity AND fk_project IS NOT DISTINCT FROM param_fk_project;

        RAISE INFO 'updated object with new_own_entity_label: %', new_own_entity_label;
      ELSE
        RAISE INFO 'no update needed: %', new_own_entity_label;
      END IF;

    END IF;
    RETURN true;
  END;
  $BODY$;


---------------------------------------------------------------------------------------------------
-- tune performace of warehouse.entity_preview__fill_own_full_text function

CREATE OR REPLACE FUNCTION warehouse.entity_preview__fill_own_full_text (param_pk_entity integer, param_fk_project integer)
  RETURNS boolean
  LANGUAGE 'plpgsql'
  COST 100 VOLATILE
  AS $BODY$
DECLARE
  old_own_full_text TEXT;
  new_own_full_text TEXT;
BEGIN
  ---------------------- REPO VERSIONS ----------------------
  IF param_fk_project IS NULL THEN
    RAISE INFO 'entity_preview__fill_own_full_text of: pk_entity: %, fk_project: %', param_pk_entity, param_fk_project;
    -- get the string new_own_full_text
    WITH entity AS (
      SELECT
        t.pk_entity,
        t.fk_class
      FROM
        information.temporal_entity AS t
      WHERE
        t.pk_entity = param_pk_entity
      UNION
      SELECT
        p.pk_entity,
        p.fk_class
      FROM
        information.persistent_item AS p
      WHERE
        p.pk_entity = param_pk_entity
),
fields AS (
  -- fields
  SELECT
    fields.fk_property, fields.fk_class_field, entity.pk_entity, field_order
  FROM
    information.v_ordered_fields_per_class AS fields
    JOIN entity ON fields.fk_class = entity.fk_class
      AND field_order IS NOT NULL
),
strings_from_roles AS (
  SELECT
    COALESCE(appe.string, lang.notes) AS string,
    field_order
  FROM
    fields
  JOIN information.v_role AS r ON fields.fk_property = r.fk_property
    AND r.fk_temporal_entity = param_pk_entity
    AND r.is_in_project_count > 0
    -----------------------------------------------------------
    -- get the strings directly connected to entity via role-fk_entity (not via intermediate entity/PeIt)
    --   appellation
  LEFT JOIN information.v_appellation AS appe ON r.fk_entity = appe.pk_entity
  --   language
  LEFT JOIN information.v_language AS lang ON r.fk_entity = lang.pk_entity
  --   time_primitive
  --   place
  -----------------------------------------------------------
ORDER BY
  r.rank_for_te_ent
),
strings_from_text_props AS (
  SELECT
    regexp_replace(txtp.string, E'[\n\r]+', '', 'g') AS string,
    field_order
  FROM
    information.v_text_property AS txtp
    INNER JOIN fields ON fields.fk_class_field = txtp.fk_class_field
      AND txtp.fk_concerned_entity = param_pk_entity
      -- TODO: Check if we need to exclude textproperties that are in 0 projects$
      -- TODO: Check if we need to order textproperties
),
all_stings AS (
  SELECT
    string,
    field_order
  FROM
    strings_from_roles
  UNION
  SELECT
    string,
    field_order
  FROM
    strings_from_text_props
),
aggregated AS (
  SELECT
    1,
    string_agg(string, ', ' ORDER BY field_order) AS full_text
  FROM
    all_stings
  GROUP BY
    1
)
SELECT
  full_text INTO new_own_full_text
FROM
  aggregated;
  RAISE INFO 'new_own_full_text: %', new_own_full_text;
  ----- Insert or update column own_full_text of table entity_preview
  SELECT
    own_full_text INTO old_own_full_text
  FROM
    warehouse.entity_preview
  WHERE
    pk_entity = param_pk_entity
    AND fk_project IS NULL;
  RAISE INFO 'old_own_full_text: %', old_own_full_text;
  IF NOT FOUND THEN
    INSERT INTO warehouse.entity_preview (pk_entity, fk_project, own_full_text)
      VALUES (param_pk_entity, param_fk_project, new_own_full_text);
    RAISE INFO 'inserted new_own_full_text: %', new_own_full_text;
  ELSIF (
      SELECT
        (old_own_full_text IS DISTINCT FROM new_own_full_text)) THEN
      UPDATE
        warehouse.entity_preview
      SET
        own_full_text = new_own_full_text
      WHERE
        pk_entity = param_pk_entity
        AND fk_project IS NULL;
    RAISE INFO 'updated object with new_own_full_text: %', new_own_full_text;
  ELSE
    RAISE INFO 'no update needed: %', new_own_full_text;
  END IF;
  ---------------------- PROJECTS VERSIONS ----------------------
ELSE
  RAISE INFO 'entity_preview__fill_own_full_text of: pk_entity: %, fk_project: %', param_pk_entity, param_fk_project;
  -- get the string new_own_full_text
  WITH entity AS (
    SELECT
      t.pk_entity,
      t.fk_class
    FROM
      information.temporal_entity AS t
    WHERE
      t.pk_entity = param_pk_entity
    UNION
    SELECT
      p.pk_entity,
      p.fk_class
    FROM
      information.persistent_item AS p
    WHERE
      p.pk_entity = param_pk_entity
),
fields AS (
  -- fields
  SELECT
    fields.fk_property, fields.fk_class_field, entity.pk_entity, field_order
  FROM
    information.v_ordered_fields_per_class AS fields
    JOIN entity ON fields.fk_class = entity.fk_class
      AND field_order IS NOT NULL
),
strings_from_roles AS (
  SELECT
    COALESCE(appe.string, lang.notes) AS string,
    field_order
  FROM
    fields
  JOIN information.v_role AS r ON fields.fk_property = r.fk_property
    AND r.fk_temporal_entity = param_pk_entity
  LEFT JOIN projects.info_proj_rel AS epr ON epr.fk_entity = r.pk_entity
    AND epr.fk_project = param_fk_project
    AND epr.is_in_project = TRUE
    -----------------------------------------------------------
    -- get the strings directly connected to entity via role-fk_entity (not via intermediate entity/PeIt)
    --   appellation
  LEFT JOIN information.v_appellation AS appe ON r.fk_entity = appe.pk_entity
  --   language
  LEFT JOIN information.v_language AS lang ON r.fk_entity = lang.pk_entity
  --   time_primitive
  --   place
  -----------------------------------------------------------
ORDER BY
  epr.ord_num
),
strings_from_text_props AS (
  SELECT
    regexp_replace(txtp.string, E'[\n\r]+', '', 'g') AS string,
    field_order
  FROM
    information.v_text_property AS txtp
    INNER JOIN fields ON fields.fk_class_field = txtp.fk_class_field
      AND txtp.fk_concerned_entity = param_pk_entity
    INNER JOIN projects.info_proj_rel AS epr ON epr.fk_entity = txtp.pk_entity
      AND epr.is_in_project = TRUE
      AND epr.fk_project = param_fk_project
    ORDER BY
      epr.ord_num
),
all_stings AS (
  SELECT
    string,
    field_order
  FROM
    strings_from_roles
  UNION
  SELECT
    string,
    field_order
  FROM
    strings_from_text_props
),
aggregated AS (
  SELECT
    1,
    string_agg(string, ', ' ORDER BY field_order) AS full_text
  FROM
    all_stings
  GROUP BY
    1
)
SELECT
  full_text INTO new_own_full_text
FROM
  aggregated;
  RAISE INFO 'new_own_full_text: %', new_own_full_text;
  ----- Insert or update column own_full_text of table entity_preview
  SELECT
    own_full_text INTO old_own_full_text
  FROM
    warehouse.entity_preview
  WHERE
    pk_entity = param_pk_entity
    AND fk_project = param_fk_project;
  RAISE INFO 'old_own_full_text: %', old_own_full_text;
  IF NOT FOUND THEN
    INSERT INTO warehouse.entity_preview (pk_entity, fk_project, own_full_text)
      VALUES (param_pk_entity, param_fk_project, new_own_full_text);
    RAISE INFO 'inserted new_own_full_text: %', new_own_full_text;
  ELSIF (
      SELECT
        (old_own_full_text IS DISTINCT FROM new_own_full_text)) THEN
      UPDATE
        warehouse.entity_preview
      SET
        own_full_text = new_own_full_text
      WHERE
        pk_entity = param_pk_entity
        AND fk_project = param_fk_project;
    RAISE INFO 'updated object with new_own_full_text: %', new_own_full_text;
  ELSE
    RAISE INFO 'no update needed: %', new_own_full_text;
  END IF;
END IF;
  RETURN TRUE;
END;
$BODY$;

---------------------------------------------------------------------------------------------------
-- tune performace of warehouse.entity_preview__fill_time_span function
CREATE OR REPLACE FUNCTION warehouse.entity_preview__fill_time_span(
	param_pk_entity integer,
	param_fk_project integer)
    RETURNS boolean
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE
AS $BODY$
  DECLARE
  new_time_span jsonb;
  BEGIN

    ---------------------- REPO & PROJECTS VERSIONS ----------------------

    RAISE INFO 'entity_preview__fill_time_span: %, fk_project: %', param_pk_entity, param_fk_project;

    -- get new_time_span
	SELECT time_span INTO new_time_span
	FROM warehouse.v_te_en_time_span_per_project_and_repo
	WHERE fk_temporal_entity = param_pk_entity
	AND fk_project IS NOT DISTINCT FROM param_fk_project;

    RAISE INFO 'new_time_span: %', new_time_span;

    -- update this entity_preview with new_time_span
    UPDATE warehouse.entity_preview
    SET time_span = new_time_span
    WHERE pk_entity = param_pk_entity
    AND fk_project IS NOT DISTINCT FROM param_fk_project;

    RETURN true;
  END;
  $BODY$;

