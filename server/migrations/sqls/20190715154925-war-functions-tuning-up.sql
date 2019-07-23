---------------------------------------------------------------------------------------------------
-- tune performace of warehouse.entity_preview__create_all function
-- execution time before preceding 2 migrations: 340881.262 ms ~5.6min
-- execution time after preceding 2 migrations:  359328.770 ms ~5.6min
-- execution time after tuning: depending on the number of rows to upsert 15 sec to 5 min

ALTER TABLE warehouse.entity_preview
  ADD COLUMN skip_triggers BOOLEAN;

CREATE OR REPLACE FUNCTION warehouse.entity_preview__create_temporary ()
  RETURNS boolean
  LANGUAGE 'plpgsql'
  COST 100 VOLATILE
  AS $BODY$
BEGIN
  DROP TABLE IF EXISTS entity_preview_temporary;
  CREATE TEMP TABLE entity_preview_temporary AS
  SELECT
    *,
    NULL::text type_label,
    NULL::text full_text,
    NULL::tsvector ts_vector
  FROM
    warehouse.v_entity_preview_non_recursive;

  ALTER TABLE entity_preview_temporary ADD UNIQUE (pk_entity, fk_project);

  ---------- entity label completion ------------
  WHILE
  -- check if entity labels still need update
  (
    SELECT
      count(t1.pk_entity) > 0
    FROM
      entity_preview_temporary t1,
      entity_preview_temporary t2
    WHERE
      t1.fk_entity_label IS NOT NULL
      AND t1.fk_entity_label = t2.pk_entity
      AND t1.fk_project IS NOT DISTINCT FROM t2.fk_project
      AND t1.entity_label IS DISTINCT FROM t2.entity_label)
    LOOP
      -- fill entity label
      UPDATE
        entity_preview_temporary t1
      SET
        entity_label = t2.entity_label
      FROM
        entity_preview_temporary t2
      WHERE
        t1.fk_entity_label IS NOT NULL
        AND t1.fk_entity_label = t2.pk_entity
        AND t1.fk_project IS NOT DISTINCT FROM t2.fk_project
        AND t1.entity_label IS DISTINCT FROM t2.entity_label;
    END LOOP;
  ---------- full text completion ------------
  -- fill related full texts
  WITH tw1 AS (
    SELECT
      pk_entity,
      fk_project,
      related_full_texts,
      jsonb_object_keys(related_full_texts)::integer fk_full_text
    FROM
      entity_preview_temporary
),
tw2 AS (
  SELECT
    tw1.pk_entity,
    tw1.fk_project,
    tw1.related_full_texts,
    tw1.fk_full_text,
    t2.own_full_text AS related_full_text
  FROM
    tw1,
    entity_preview_temporary t2
  WHERE
    tw1.fk_full_text = t2.pk_entity
    AND tw1.fk_project IS NOT DISTINCT FROM t2.fk_project
),
tw3 AS (
  SELECT
    tw2.pk_entity, tw2.fk_project, json_object_agg(tw2.fk_full_text, tw2.related_full_text) related_full_texts
  FROM
    tw2
  GROUP BY
    tw2.pk_entity,
    tw2.fk_project
)
UPDATE
  entity_preview_temporary t2
SET
  related_full_texts = tw3.related_full_texts
FROM
  tw3
WHERE
  tw3.pk_entity = t2.pk_entity
  AND tw3.fk_project IS NOT DISTINCT FROM t2.fk_project;
  ---------- type label completion ------------
  WHILE
  -- check if type labels still need update
  (
    SELECT
      count(t1.pk_entity) > 0
    FROM
      entity_preview_temporary t1,
      entity_preview_temporary t2
    WHERE
      t1.fk_type IS NOT NULL
      AND t1.fk_type = t2.pk_entity
      AND t1.fk_project IS NOT DISTINCT FROM t2.fk_project
      AND t1.type_label IS DISTINCT FROM t2.entity_label)
    LOOP
      -- fill type label
      UPDATE
        entity_preview_temporary t1
      SET
        type_label = t2.entity_label
      FROM
        entity_preview_temporary t2
      WHERE
        t1.fk_type IS NOT NULL
        AND t1.fk_type = t2.pk_entity
        AND t1.fk_project IS NOT DISTINCT FROM t2.fk_project
        AND t1.entity_label IS DISTINCT FROM t2.entity_label;
    END LOOP;
  ----------- create full text ---------
  UPDATE
    entity_preview_temporary t1
  SET
    full_text = (
      SELECT
        string_agg
      FROM (
        SELECT
          1,
          string_agg(txt, ', ' ORDER BY rank)
        FROM (
          SELECT
            rank,
            txt
          FROM (
            SELECT
              1 rank,
              coalesce(t1.type_label, t1.class_label, '') AS txt
            UNION
            SELECT
              2 rank,
              t1.own_full_text AS txt
            UNION
            SELECT
              3 rank,
              value AS txt
            FROM
              jsonb_each_text(t1.related_full_texts)) AS all_strings
          WHERE
            txt != '') AS items
        GROUP BY
          1) AS x);
  ----------- create tsvector ----------
  UPDATE
    entity_preview_temporary t1
  SET
    ts_vector = (
      SELECT
        setweight(to_tsvector(coalesce(t1.entity_label, '')), 'A') || setweight(to_tsvector(coalesce(t1.type_label, t1.class_label, '')), 'B') || setweight(to_tsvector(coalesce(t1.full_text, '')), 'C'));
  RETURN TRUE;
END;
$BODY$;

CREATE OR REPLACE FUNCTION warehouse.entity_preview__add_missing ()
  RETURNS boolean
  LANGUAGE 'plpgsql'
  COST 100 VOLATILE
  AS $BODY$
BEGIN
  -- Add missing entity previews
  WITH tw1 AS (
    SELECT
      pk_entity,
      fk_project,
      'not in entity_preview, to be added' AS note
    FROM
      entity_preview_temporary
    EXCEPT
    SELECT
      pk_entity,
      fk_project,
      'not in entity_preview, to be added' AS note
    FROM
      warehouse.entity_preview
) INSERT INTO warehouse.entity_preview (pk_entity, fk_project, project, fk_class, entity_type, class_label, entity_label, time_span, own_full_text, fk_entity_label, fk_type, type_label, related_full_texts, full_text, ts_vector, skip_triggers)
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
  t1.related_full_texts,
  t1.full_text,
  t1.ts_vector,
  TRUE
FROM
  entity_preview_temporary t1,
  tw1
WHERE
  t1.pk_entity = tw1.pk_entity
  AND t1.fk_project IS NOT DISTINCT FROM tw1.fk_project;


UPDATE warehouse.entity_preview
SET skip_triggers = false
WHERE skip_triggers = true;


RETURN TRUE;

END;
$BODY$;

CREATE OR REPLACE FUNCTION warehouse.entity_preview__remove_superfluous ()
  RETURNS boolean
  LANGUAGE 'plpgsql'
  COST 100 VOLATILE
  AS $BODY$
BEGIN
  -- remove superfluous entity previews
  WITH tw1 AS (
    SELECT
      pk_entity,
      fk_project,
      'not in entity_preview_temporary, to be deleted' AS note
    FROM
      warehouse.entity_preview
    EXCEPT
    SELECT
      pk_entity,
      fk_project,
      'not in entity_preview_temporary, to be deleted' AS note
    FROM
      entity_preview_temporary
) DELETE FROM warehouse.entity_preview t1 USING tw1
WHERE t1.pk_entity = tw1.pk_entity
  AND t1.fk_project IS NOT DISTINCT FROM tw1.fk_project;

RETURN TRUE;

END;
$BODY$;

CREATE OR REPLACE FUNCTION warehouse.entity_preview__update_modified ()
  RETURNS boolean
  LANGUAGE 'plpgsql'
  COST 100 VOLATILE
  AS $BODY$
BEGIN
  -- update modified entity previews
  WITH tw1 AS (
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
      ts_vector,
      'different from entity_preview_temporary, to be updated' AS note
    FROM
      entity_preview_temporary
    EXCEPT
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
      ts_vector,
      'different from entity_preview_temporary, to be updated' AS note
    FROM
      warehouse.entity_preview
)
UPDATE
  warehouse.entity_preview t1
SET
  fk_class = tw1.fk_class,
  entity_type = tw1.entity_type,
  class_label = tw1.class_label,
  entity_label = tw1.entity_label,
  time_span = tw1.time_span,
  own_full_text = tw1.own_full_text,
  fk_entity_label = tw1.fk_entity_label,
  fk_type = tw1.fk_type,
  type_label = tw1.type_label,
  related_full_texts = tw1.related_full_texts,
  full_text = tw1.full_text,
  ts_vector = tw1.ts_vector,
  skip_triggers = TRUE
FROM
  tw1
WHERE
  t1.pk_entity = tw1.pk_entity
  AND t1.fk_project IS NOT DISTINCT FROM tw1.fk_project;

UPDATE warehouse.entity_preview
SET skip_triggers = false
WHERE skip_triggers = true;


  RETURN TRUE;
END;
$BODY$;

CREATE OR REPLACE FUNCTION warehouse.entity_preview__create_all ()
  RETURNS boolean
  LANGUAGE 'plpgsql'
  COST 100 VOLATILE
  AS $BODY$
BEGIN
  PERFORM
    warehouse.entity_preview__create_temporary ();
  PERFORM
    warehouse.entity_preview__add_missing ();
  PERFORM
    warehouse.entity_preview__remove_superfluous ();
  PERFORM
    warehouse.entity_preview__update_modified ();
  RETURN TRUE;
END;
$BODY$;

DROP TRIGGER after_update_on_entity_preview__entity_label ON warehouse.entity_preview;

CREATE TRIGGER after_update_on_entity_preview__entity_label
  AFTER UPDATE OF entity_label ON warehouse.entity_preview
  FOR EACH ROW
  WHEN (NEW.skip_triggers != TRUE)
  EXECUTE PROCEDURE warehouse.entity_preview__update_dependent_entity_labels ();

DROP TRIGGER after_update_on_entity_preview__fk_entity_label ON warehouse.entity_preview;

CREATE TRIGGER after_update_on_entity_preview__fk_entity_label
  AFTER UPDATE OF fk_entity_label ON warehouse.entity_preview
  FOR EACH ROW
  WHEN (NEW.skip_triggers != TRUE)
  EXECUTE PROCEDURE warehouse.entity_preview__get_entity_label ();

DROP TRIGGER after_update_on_entity_preview__fk_type ON warehouse.entity_preview;

CREATE TRIGGER after_update_on_entity_preview__fk_type
  AFTER UPDATE OF fk_type ON warehouse.entity_preview
  FOR EACH ROW
  WHEN (NEW.skip_triggers != TRUE)
  EXECUTE PROCEDURE warehouse.entity_preview__get_type_label ();

DROP TRIGGER after_update_on_entity_preview__own_full_text ON warehouse.entity_preview;

CREATE TRIGGER after_update_on_entity_preview__own_full_text
  AFTER UPDATE OF own_full_text ON warehouse.entity_preview
  FOR EACH ROW
  WHEN (NEW.skip_triggers != TRUE)
  EXECUTE PROCEDURE warehouse.entity_preview__update_dependent_related_full_texts ();

DROP TRIGGER before_update_on_entity_preview__own_full_text ON warehouse.entity_preview;

DROP TRIGGER before_update_on_entity_preview__related_full_texts ON warehouse.entity_preview;

CREATE TRIGGER before_update_on_entity_preview__own_full_text_or_related_full_texts
  BEFORE INSERT
  OR UPDATE OF related_full_texts, own_full_text ON warehouse.entity_preview
  FOR EACH ROW
  WHEN (NEW.skip_triggers != TRUE)
  EXECUTE PROCEDURE warehouse.entity_preview__concat_full_text ();

---------------------------------------------------------------------------------------------------
-- tune performace of warehouse.entity_preview__create function
-- execution time before preceding 2 migrations (project / repo): 4123.498 ms / 5367.959 ms
-- execution time after preceding 2 migration (project / repo): 154.646 ms / 154.646 ms
-- execution time after tuning (project / repo):
---------------------------------------------------------------------------------------------------
-- tune performacek of warehouse.entity_preview__create_fk_entity_label function
-- execution time before preceding 2 migrations (project / repo):  3.787 ms / 1434.483 ms
-- execution time after preceding 2 migration (project / repo): CRASHED
-- execution time after tuning (project / repo): 1.292 ms / 3.793 ms

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
  RAISE INFO 'entity_preview__create_fk_entity_label of pk_entity: %, fk_project: %', param_pk_entity, param_fk_project;
  -- get the fk_entity_label
  -- SELECT
  --   fk_entity_label INTO new_fk_entity_label
  -- FROM
  --   warehouse.v_fk_entity_label
  -- WHERE
  --   pk_entity = param_pk_entity
  --   AND fk_project IS NOT DISTINCT FROM param_fk_project;
  WITH tw1 AS (
    SELECT
      temporal_entity.pk_entity,
      temporal_entity.fk_class,
      'temporal_entity'::character varying AS table_name,
      'teEnt'::text AS entity_type
    FROM
      information.temporal_entity
    WHERE
      pk_entity = param_pk_entity
    UNION
    SELECT
      persistent_item.pk_entity,
      persistent_item.fk_class,
      'persistent_item'::character varying AS table_name,
      'peIt'::text AS entity_type
    FROM
      information.persistent_item
    WHERE
      pk_entity = param_pk_entity
),
tw2 AS (
  SELECT
    fk_project, fk_property, fk_entity, fk_temporal_entity, ord_num_of_domain, is_in_project_count
  FROM
    warehouse.v_roles_per_project_and_repo
  WHERE
    fk_temporal_entity = param_pk_entity
    AND fk_project IS NOT DISTINCT FROM param_fk_project
),
tw3 AS (
  SELECT
    fk_project, fk_property, fk_entity, fk_temporal_entity, ord_num_of_domain, is_in_project_count
  FROM
    warehouse.v_roles_per_project_and_repo
  WHERE
    fk_entity = param_pk_entity
    AND fk_project IS NOT DISTINCT FROM param_fk_project
) SELECT DISTINCT ON (t1.pk_entity, t3.fk_project, t4.fk_project, t1.fk_class)
  COALESCE(t4.fk_temporal_entity, CASE WHEN EXISTS (
        SELECT
          pk_entity FROM information.persistent_item
        WHERE
          pk_entity = t3.fk_entity
        UNION
        SELECT
          pk_entity FROM information.temporal_entity
        WHERE
          pk_entity = t3.fk_entity) = TRUE THEN
        t3.fk_entity
      ELSE
        NULL
      END) INTO new_fk_entity_label
  FROM
    tw1 t1
    JOIN information.v_ordered_fields_per_class t2 ON t1.fk_class = t2.fk_class
    LEFT JOIN tw2 t3 ON t2.fk_property = t3.fk_property
      AND t1.pk_entity = t3.fk_temporal_entity
  LEFT JOIN tw3 t4 ON t2.fk_property = t4.fk_property
    AND t1.pk_entity = t4.fk_entity
WHERE
  t2.field_order = 0
ORDER BY
  t1.pk_entity, t3.fk_project, t4.fk_project, t1.fk_class, t2.field_order, t3.ord_num_of_domain, t4.ord_num_of_domain, t3.is_in_project_count DESC, t4.is_in_project_count DESC;
    RAISE INFO 'new_fk_entity_label: %', new_fk_entity_label;
    ----- Insert or update column fk_entity_label of table entity_preview
    SELECT
      fk_entity_label INTO old_fk_entity_label
    FROM
      warehouse.entity_preview
    WHERE
      pk_entity = param_pk_entity
      AND fk_project IS NOT DISTINCT FROM param_fk_project;
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
          AND fk_project IS NOT DISTINCT FROM param_fk_project;
      RAISE INFO 'updated object with new_fk_entity_label: %', new_fk_entity_label;
    ELSE
      RAISE INFO 'no update needed: %', new_fk_entity_label;
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
-- execution time before preceding 2 migrations (project / repo): 1.574 ms / 2.626 ms
-- execution time after preceding 2 migration (project / repo):  1.891 ms /  3.075 ms
-- execution time after tuning (project / repo): NO NEED

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

    --- get the fk_type
    SELECT fk_type INTO  new_fk_type
    FROM
      warehouse.v_fk_type
    WHERE
      pk_entity = param_pk_entity
    AND
      fk_project IS NOT DISTINCT FROM param_fk_project;

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
-- execution time before preceding 2 migrations (project / repo): 2912.905 ms / 2955.224 ms
-- execution time after preceding 2 migration (project / repo): 0.990 ms / 2.192 ms
-- execution time after tuning (project / repo): -- NO NEED
---------------------------------------------------------------------------------------------------
-- tune performace of warehouse.entity_preview__fill_own_entity_label function
-- execution time before preceding 2 migrations (project / repo): 598.411 ms / 318.201 ms
-- execution time after preceding 2 migration (project / repo): CRASHED
-- execution time after tuning (project / repo):  0.135 ms /  0.241 ms

CREATE OR REPLACE FUNCTION warehouse.entity_preview__fill_own_entity_label (param_pk_entity integer, param_fk_project integer)
  RETURNS boolean
  LANGUAGE 'plpgsql'
  COST 100 VOLATILE
  AS $BODY$
DECLARE
  old_own_entity_label TEXT;
  new_own_entity_label TEXT;
BEGIN
  -- if this has a fk_entity_label skip the whole function
  -- because the entity label is provided by that other entity
  IF (
      SELECT
        (
          SELECT
            fk_entity_label
          FROM
            warehouse.entity_preview
          WHERE
            pk_entity = param_pk_entity AND fk_project IS NOT DISTINCT FROM param_fk_project
          LIMIT 1) IS NULL) THEN
      RAISE INFO 'entity_preview__fill_own_entity_label of pk_entity: %, fk_project: %', param_pk_entity, param_fk_project;
    -- get the string new_own_entity_label
    WITH tw1 AS (
      SELECT
        t1.fk_temporal_entity AS pk_entity,
        t1.fk_project,
        t1.project,
        COALESCE(t2.string, t3.notes) AS string,
        t5.field_order,
        t1.ord_num_of_domain AS ord_num,
        t1.is_in_project_count
      FROM
        warehouse.v_roles_per_project_and_repo t1
      LEFT JOIN information.appellation t2 ON t1.fk_entity = t2.pk_entity
      LEFT JOIN information.language t3 ON t1.fk_entity = t3.pk_entity
      JOIN information.temporal_entity t4 ON t1.fk_temporal_entity = t4.pk_entity
      JOIN information.v_ordered_fields_per_class t5 ON t5.fk_property = t1.fk_property
        AND t5.fk_class = t4.fk_class
        AND t5.field_order = 0
        AND t1.fk_temporal_entity = param_pk_entity
        AND t1.fk_project IS NOT DISTINCT FROM param_fk_project
      UNION ALL
      SELECT
        t1.fk_concerned_entity AS pk_entity,
        t1.fk_project,
        t1. "coalesce" AS project,
        t1.string,
        t2.field_order,
        t1.ord_num_of_text_property AS ord_num,
        t1.is_in_project_count
      FROM
        warehouse.v_text_properties_per_project_and_repo t1,
        information.v_ordered_fields_per_class t2
    WHERE
      t1.fk_class_field = t2.fk_class_field
      AND t2.field_order = 0
      AND t1.fk_concerned_entity = param_pk_entity
      AND t1.fk_project IS NOT DISTINCT FROM param_fk_project
) SELECT DISTINCT ON (tw1.pk_entity, tw1.fk_project)
  tw1.string INTO new_own_entity_label
FROM
  tw1
ORDER BY
  tw1.pk_entity,
  tw1.fk_project,
  tw1.field_order,
  tw1.ord_num,
  tw1.is_in_project_count DESC;
    RAISE INFO 'new_own_entity_label: %', new_own_entity_label;
    ----- Insert or update column own_entity_label of table entity_preview
    SELECT
      entity_label INTO old_own_entity_label
    FROM
      warehouse.entity_preview
    WHERE
      pk_entity = param_pk_entity
      AND fk_project IS NOT DISTINCT FROM param_fk_project;
    RAISE INFO 'old_own_entity_label: %', old_own_entity_label;
    IF NOT FOUND THEN
      INSERT INTO warehouse.entity_preview (pk_entity, fk_project, entity_label)
        VALUES (param_pk_entity, param_fk_project, new_own_entity_label);
      RAISE INFO 'inserted new_own_entity_label: %', new_own_entity_label;
    ELSIF (
        SELECT
          (old_own_entity_label IS DISTINCT FROM new_own_entity_label)) THEN
        UPDATE
          warehouse.entity_preview
        SET
          entity_label = new_own_entity_label
        WHERE
          pk_entity = param_pk_entity
          AND fk_project IS NOT DISTINCT FROM param_fk_project;
      RAISE INFO 'updated object with new_own_entity_label: %', new_own_entity_label;
    ELSE
      RAISE INFO 'no update needed: %', new_own_entity_label;
    END IF;
END IF;
    RETURN TRUE;
END;
$BODY$;

---------------------------------------------------------------------------------------------------
-- tune performace of warehouse.entity_preview__fill_own_full_text function
-- execution time before preceding 2 migrations (project / repo): 588.048 ms / 740.127 ms
-- execution time after preceding 2 migration (project / repo): CRASHED
-- execution time after tuning (project / repo): 4.473 ms / 5.979 ms

CREATE OR REPLACE FUNCTION warehouse.entity_preview__fill_own_full_text (param_pk_entity integer, param_fk_project integer)
  RETURNS boolean
  LANGUAGE 'plpgsql'
  COST 100 VOLATILE
  AS $BODY$
DECLARE
  old_own_full_text TEXT;
  new_own_full_text TEXT;
BEGIN
  RAISE INFO 'entity_preview__fill_own_full_text of: pk_entity: %, fk_project: %', param_pk_entity, param_fk_project;
  -- get the string new_own_full_text
  WITH tw1 AS (
    SELECT
      t1.fk_temporal_entity AS pk_entity,
      t1.fk_project,
      t1.project,
      COALESCE(t2.string, t3.notes) AS string,
      t5.field_order,
      t1.ord_num_of_domain AS ord_num,
      t1.is_in_project_count
    FROM
      warehouse.v_roles_per_project_and_repo t1
    LEFT JOIN information.appellation t2 ON t1.fk_entity = t2.pk_entity
    LEFT JOIN information.language t3 ON t1.fk_entity = t3.pk_entity
    JOIN information.temporal_entity t4 ON t1.fk_temporal_entity = t4.pk_entity
    JOIN information.v_ordered_fields_per_class t5 ON t5.fk_property = t1.fk_property
      AND t5.fk_class = t4.fk_class
      AND t5.field_order IS NOT NULL
  WHERE
    t1.fk_temporal_entity = param_pk_entity
    AND t1.fk_project IS NOT DISTINCT FROM param_fk_project
  UNION ALL
  SELECT
    t1.fk_concerned_entity AS pk_entity,
    t1.fk_project,
    t1. "coalesce" AS project,
    t1.string,
    t2.field_order,
    t1.ord_num_of_text_property AS ord_num,
    t1.is_in_project_count
  FROM
    warehouse.v_text_properties_per_project_and_repo t1,
    information.v_ordered_fields_per_class t2
  WHERE
    t1.fk_class_field = t2.fk_class_field
    AND t1.fk_concerned_entity = param_pk_entity
    AND t1.fk_project IS NOT DISTINCT FROM param_fk_project
),
tw2 AS (
  SELECT DISTINCT ON (tw1.pk_entity, tw1.fk_project, tw1.string)
    tw1.pk_entity, tw1.fk_project, tw1.project, tw1.string, tw1.field_order, tw1.ord_num, tw1.is_in_project_count
  FROM
    tw1
)
SELECT
  string_agg(tw2.string, ', '::text ORDER BY tw2.field_order, tw2.ord_num, tw2.is_in_project_count DESC) INTO new_own_full_text
FROM
  tw2
GROUP BY
  tw2.pk_entity,
  tw2.fk_project,
  tw2.project;
    RAISE INFO 'new_own_full_text: %', new_own_full_text;
    ----- Insert or update column own_full_text of table entity_preview
    SELECT
      own_full_text INTO old_own_full_text
    FROM
      warehouse.entity_preview
    WHERE
      pk_entity = param_pk_entity
      AND fk_project IS NOT DISTINCT FROM param_fk_project;
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
          AND fk_project IS NOT DISTINCT FROM param_fk_project;
      RAISE INFO 'updated object with new_own_full_text: %', new_own_full_text;
    ELSE
      RAISE INFO 'no update needed: %', new_own_full_text;
    END IF;
    RETURN TRUE;
END;
$BODY$;

---------------------------------------------------------------------------------------------------
-- tune performace of warehouse.entity_preview__fill_time_span function
-- execution time before preceding 2 migrations (project / repo): 1472.373 ms / 1556.207 ms
-- execution time after preceding 2 migration (project / repo): 136.578 ms /  115.624 ms
-- execution time after tuning (project / repo): 1.445 ms / 0.898 ms

CREATE OR REPLACE FUNCTION warehouse.entity_preview__fill_time_span (param_pk_entity integer, param_fk_project integer)
  RETURNS boolean
  LANGUAGE 'plpgsql'
  COST 100 VOLATILE
  AS $BODY$
DECLARE
  new_time_span jsonb;
BEGIN
  ---------------------- REPO & PROJECTS VERSIONS ----------------------
  RAISE INFO 'entity_preview__fill_time_span: %, fk_project: %', param_pk_entity, param_fk_project;
  -- get new_time_span
  -- SELECT time_span INTO new_time_span
  -- FROM warehouse.v_te_en_time_span_per_project_and_repo
  -- WHERE fk_temporal_entity = param_pk_entity
  -- AND fk_project IS NOT DISTINCT FROM param_fk_project;
  WITH role_with_time_primitive AS (
    SELECT
      r.fk_temporal_entity,
      r.fk_property,
      epr.fk_project,
      epr.calendar,
      tp.julian_day,
      tp.duration
    FROM
      information.role r,
      projects.info_proj_rel epr,
      information.v_time_primitive tp
    WHERE
      r.pk_entity = epr.fk_entity
      AND (r.fk_property = ANY (ARRAY[71, 72, 150, 151, 152, 153]))
      AND tp.pk_entity = r.fk_entity
      AND epr.is_in_project = TRUE
      AND r.fk_temporal_entity = param_pk_entity
      AND epr.fk_project IS NOT DISTINCT FROM param_fk_project
    UNION ( SELECT DISTINCT ON (r.fk_temporal_entity, r.fk_property)
        r.fk_temporal_entity,
        r.fk_property,
        NULL::integer AS fk_project,
        r.community_favorite_calendar,
        tp.julian_day,
        tp.duration
      FROM
        information.v_role r
        JOIN information.v_time_primitive tp ON tp.pk_entity = r.fk_entity
      WHERE
        r.fk_property = ANY (ARRAY[71, 72, 150, 151, 152, 153])
        AND r.fk_temporal_entity = param_pk_entity
      ORDER BY
        r.fk_temporal_entity,
        r.fk_property,
        r.is_in_project_count DESC,
        r.tmsp_creation DESC)
)
SELECT
  jsonb_object_agg(
    CASE WHEN role_with_time_primitive.fk_property = 71 THEN
      'p81'::text
    WHEN role_with_time_primitive.fk_property = 72 THEN
      'p82'::text
    WHEN role_with_time_primitive.fk_property = 150 THEN
      'p81a'::text
    WHEN role_with_time_primitive.fk_property = 151 THEN
      'p81b'::text
    WHEN role_with_time_primitive.fk_property = 152 THEN
      'p82a'::text
    WHEN role_with_time_primitive.fk_property = 153 THEN
      'p82b'::text
    ELSE
      role_with_time_primitive.fk_property::text
    END, json_build_object('julianDay', role_with_time_primitive.julian_day, 'duration', role_with_time_primitive.duration, 'calendar', role_with_time_primitive.calendar)) INTO new_time_span
FROM
  role_with_time_primitive
GROUP BY
  role_with_time_primitive.fk_project,
  role_with_time_primitive.fk_temporal_entity;
    RAISE INFO 'new_time_span: %', new_time_span;
    -- update this entity_preview with new_time_span
    UPDATE
      warehouse.entity_preview
    SET
      time_span = new_time_span
    WHERE
      pk_entity = param_pk_entity
      AND fk_project IS NOT DISTINCT FROM param_fk_project;
    RETURN TRUE;
    END;
$BODY$;

