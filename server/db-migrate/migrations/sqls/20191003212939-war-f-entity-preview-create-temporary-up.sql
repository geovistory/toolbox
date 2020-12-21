
CREATE OR REPLACE FUNCTION warehouse.entity_preview__create_temporary(
	)
    RETURNS boolean
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE
AS $BODY$
BEGIN
  DROP TABLE IF EXISTS entity_preview_temporary;
  CREATE TEMP TABLE entity_preview_temporary AS
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
