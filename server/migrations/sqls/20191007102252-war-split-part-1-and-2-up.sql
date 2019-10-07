-- 1 create function entity_preview__labels__create_temporary ();
CREATE OR REPLACE FUNCTION warehouse.entity_preview__labels__create_temporary(
	)
    RETURNS boolean
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE
AS $BODY$
BEGIN
  DROP TABLE IF EXISTS entity_preview_labels_temporary;
  CREATE TEMP TABLE entity_preview_labels_temporary AS
  SELECT
    *,
    COALESCE(fk_project, 0)::integer project,
    CASE WHEN table_name = 'persistent_item' THEN 'peIt'
    ELSE 'teEn'
    END AS entity_type,
    own_entity_label AS entity_label,
    NULL::text type_label
  FROM
    warehouse.entity_preview_non_recursive;

  ALTER TABLE entity_preview_labels_temporary ADD UNIQUE (pk_entity, fk_project);

  ---------- entity label completion ------------
  WHILE
  -- check if entity labels still need update
  (
    SELECT
      count(t1.pk_entity) > 0
    FROM
      entity_preview_labels_temporary t1,
      entity_preview_labels_temporary t2
    WHERE
      t1.fk_entity_label IS NOT NULL
      AND t1.fk_entity_label = t2.pk_entity
      AND t1.fk_project IS NOT DISTINCT FROM t2.fk_project
      AND t1.entity_label IS DISTINCT FROM t2.entity_label)
    LOOP
      -- fill entity label
      UPDATE
        entity_preview_labels_temporary t1
      SET
        entity_label = t2.entity_label
      FROM
        entity_preview_labels_temporary t2
      WHERE
        t1.fk_entity_label IS NOT NULL
        AND t1.fk_entity_label = t2.pk_entity
        AND t1.fk_project IS NOT DISTINCT FROM t2.fk_project
        AND t1.entity_label IS DISTINCT FROM t2.entity_label;
    END LOOP;

  ---------- type label completion ------------
  WHILE
  -- check if type labels still need update
  (
    SELECT
      count(t1.pk_entity) > 0
    FROM
      entity_preview_labels_temporary t1,
      entity_preview_labels_temporary t2
    WHERE
      t1.fk_type IS NOT NULL
      AND t1.fk_type = t2.pk_entity
      AND t1.fk_project IS NOT DISTINCT FROM t2.fk_project
      AND t1.type_label IS DISTINCT FROM t2.entity_label)
    LOOP
      -- fill type label
      UPDATE
        entity_preview_labels_temporary t1
      SET
        type_label = t2.entity_label
      FROM
        entity_preview_labels_temporary t2
      WHERE
        t1.fk_type IS NOT NULL
        AND t1.fk_type = t2.pk_entity
        AND t1.fk_project IS NOT DISTINCT FROM t2.fk_project
        AND t1.entity_label IS DISTINCT FROM t2.entity_label;
    END LOOP;
  ----------- create full text ---------
   RETURN TRUE;
END;
$BODY$;


-- 2 create function entity_preview__labels_add_missing

CREATE OR REPLACE FUNCTION warehouse.entity_preview__labels__add_missing(
	)
    RETURNS boolean
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE
AS $BODY$
BEGIN
  -- Add missing entity previews
  WITH tw1 AS (
    SELECT
      pk_entity,
      fk_project,
      'not in entity_preview, to be added' AS note
    FROM
      entity_preview_labels_temporary
    EXCEPT
    SELECT
      pk_entity,
      fk_project,
      'not in entity_preview, to be added' AS note
    FROM
      warehouse.entity_preview
) INSERT INTO warehouse.entity_preview (pk_entity, fk_project, project, fk_class, entity_type, class_label, entity_label, time_span, fk_entity_label, fk_type, type_label, skip_triggers)
SELECT
  t1.pk_entity,
  t1.fk_project,
  t1.project,
  t1.fk_class,
  t1.entity_type,
  t1.class_label,
  t1.entity_label,
  t1.time_span,
  t1.fk_entity_label,
  t1.fk_type,
  t1.type_label,
  TRUE
FROM
  entity_preview_labels_temporary t1,
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


-- 3 create function entity_preview__labels_remove_superfluous

CREATE OR REPLACE FUNCTION warehouse.entity_preview__labels__remove_superfluous(
	)
    RETURNS boolean
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE
AS $BODY$
BEGIN
  -- remove superfluous entity previews
  WITH tw1 AS (
    SELECT
      pk_entity,
      fk_project,
      'not in entity_preview_labels_temporary, to be deleted' AS note
    FROM
      warehouse.entity_preview
    EXCEPT
    SELECT
      pk_entity,
      fk_project,
      'not in entity_preview_labels_temporary, to be deleted' AS note
    FROM
      entity_preview_labels_temporary
) DELETE FROM warehouse.entity_preview t1 USING tw1
WHERE t1.pk_entity = tw1.pk_entity
  AND t1.fk_project IS NOT DISTINCT FROM tw1.fk_project;

RETURN TRUE;

END;
$BODY$;

-- 4 create function entity_preview__labels__update_modified ();
CREATE OR REPLACE FUNCTION warehouse.entity_preview__labels__update_modified(
	)
    RETURNS boolean
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE
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
      fk_entity_label,
      fk_type,
      type_label,
      'different from entity_preview_labels_temporary, to be updated' AS note
    FROM
      entity_preview_labels_temporary
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
      fk_entity_label,
      fk_type,
      type_label,
      'different from entity_preview_labels_temporary, to be updated' AS note
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
    fk_entity_label = tw1.fk_entity_label,
    fk_type = tw1.fk_type,
    type_label = tw1.type_label,
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

-- 5 create function entity_preview__labels__update_all ();
CREATE OR REPLACE FUNCTION warehouse.entity_preview__labels__update_all(
	)
    RETURNS boolean
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE
AS $BODY$
BEGIN
  PERFORM
    warehouse.entity_preview__labels__create_temporary ();
  PERFORM
    warehouse.entity_preview__labels__add_missing ();
  PERFORM
    warehouse.entity_preview__labels__remove_superfluous ();
  PERFORM
    warehouse.entity_preview__labels__update_modified ();
  RETURN TRUE;
END;
$BODY$;

-- 6 create function entity_preview__full_text__create_temporary ();
CREATE OR REPLACE FUNCTION warehouse.entity_preview__full_text__create_temporary(
	)
    RETURNS boolean
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE
AS $BODY$
BEGIN
  DROP TABLE IF EXISTS entity_preview_full_text_temporary;
  CREATE TEMP TABLE entity_preview_full_text_temporary AS
  SELECT
    *,
    COALESCE(fk_project, 0)::integer project,
    CASE WHEN table_name = 'persistent_item' THEN 'peIt'
    ELSE 'teEn'
    END AS entity_type,
    own_entity_label AS entity_label,
    NULL::text type_label,
    NULL::text full_text,
    NULL::tsvector ts_vector
  FROM
    warehouse.entity_preview_non_recursive;

  ALTER TABLE entity_preview_full_text_temporary ADD UNIQUE (pk_entity, fk_project);

  -- fill related full texts
  WITH tw1 AS (
    SELECT
      pk_entity,
      fk_project,
      related_full_texts,
      jsonb_object_keys(related_full_texts)::integer fk_full_text
    FROM
      entity_preview_full_text_temporary
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
    entity_preview_full_text_temporary t2
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
  entity_preview_full_text_temporary t2
SET
  related_full_texts = tw3.related_full_texts
FROM
  tw3
WHERE
  tw3.pk_entity = t2.pk_entity
  AND tw3.fk_project IS NOT DISTINCT FROM t2.fk_project;

  ----------- create full text ---------
  UPDATE
    entity_preview_full_text_temporary t1
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
    entity_preview_full_text_temporary t1
  SET
    ts_vector = (
      SELECT
        setweight(to_tsvector(coalesce(t1.entity_label, '')), 'A') || setweight(to_tsvector(coalesce(t1.type_label, t1.class_label, '')), 'B') || setweight(to_tsvector(coalesce(t1.full_text, '')), 'C'));
  RETURN TRUE;
END;
$BODY$;


-- 7 create function entity_preview__full_text__add_missing ();

CREATE OR REPLACE FUNCTION warehouse.entity_preview__full_text__add_missing(
	)
    RETURNS boolean
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE
AS $BODY$
BEGIN
  -- Add missing entity previews
  WITH tw1 AS (
    SELECT
      pk_entity,
      fk_project,
      'not in entity_preview, to be added' AS note
    FROM
      entity_preview_full_text_temporary
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
  entity_preview_full_text_temporary t1,
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


-- 8 create function entity_preview__full_text__remove_superfluous ();

CREATE OR REPLACE FUNCTION warehouse.entity_preview__full_text__remove_superfluous(
	)
    RETURNS boolean
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE
AS $BODY$
BEGIN
  -- remove superfluous entity previews
  WITH tw1 AS (
    SELECT
      pk_entity,
      fk_project,
      'not in entity_preview_full_text_temporary, to be deleted' AS note
    FROM
      warehouse.entity_preview
    EXCEPT
    SELECT
      pk_entity,
      fk_project,
      'not in entity_preview_full_text_temporary, to be deleted' AS note
    FROM
      entity_preview_full_text_temporary
) DELETE FROM warehouse.entity_preview t1 USING tw1
WHERE t1.pk_entity = tw1.pk_entity
  AND t1.fk_project IS NOT DISTINCT FROM tw1.fk_project;

RETURN TRUE;

END;
$BODY$;

-- 9 create function entity_preview__full_text__update_modified ();

CREATE OR REPLACE FUNCTION warehouse.entity_preview__full_text__update_modified(
	)
    RETURNS boolean
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE
AS $BODY$
BEGIN
  -- update modified entity previews
  WITH tw1 AS (
    SELECT
      pk_entity,
      fk_project,
      project,
      own_full_text,
      related_full_texts,
      full_text,
      ts_vector,
      'different from entity_preview_full_text_temporary, to be updated' AS note
    FROM
      entity_preview_full_text_temporary
    EXCEPT
    SELECT
      pk_entity,
      fk_project,
      project,
      own_full_text,
      related_full_texts,
      full_text,
      ts_vector,
      'different from entity_preview_full_text_temporary, to be updated' AS note
    FROM
      warehouse.entity_preview
)
UPDATE
  warehouse.entity_preview t1
SET
  own_full_text = tw1.own_full_text,
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

-- 10 create function entity_preview__full_text__update_all ();
CREATE OR REPLACE FUNCTION warehouse.entity_preview__full_text__update_all(
	)
    RETURNS boolean
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE
AS $BODY$
BEGIN
  PERFORM
    warehouse.entity_preview__full_text__create_temporary ();
  PERFORM
    warehouse.entity_preview__full_text__add_missing ();
  PERFORM
    warehouse.entity_preview__full_text__remove_superfluous ();
  PERFORM
    warehouse.entity_preview__full_text__update_modified ();
  RETURN TRUE;
END;
$BODY$;


-- 11 drop function entity_preview__create_temporary ();
-- 14 drop function entity_preview__update_modified ();
-- 15 drop function entity_preview__update_all ();
