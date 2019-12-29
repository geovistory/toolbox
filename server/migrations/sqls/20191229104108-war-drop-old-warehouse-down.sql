-- 1
-- 4 add schema warehouse
/**
* ADD SCHEMA WAREHOUSE START
**/
SET check_function_bodies = false;

--
-- Name: warehouse; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA warehouse;


--
-- Name: after_info_proj_rel_upsert(); Type: FUNCTION; Schema: warehouse; Owner: -
--

CREATE FUNCTION warehouse.after_info_proj_rel_upsert() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  PERFORM
    pg_notify('queue_updated', 'true');
  RETURN NEW;
END;
$$;


--
-- Name: do_updates_for_time_after(timestamp without time zone); Type: FUNCTION; Schema: warehouse; Owner: -
--

CREATE FUNCTION warehouse.do_updates_for_time_after(tmsp timestamp without time zone) RETURNS void
    LANGUAGE plpgsql
    AS $$
Declare
    t_row record;
Begin
    For t_row In (
        /**********
         * Selects the pk_entities that need to be updated.
         *
         * takes only the latest item for each pk_entity and project.
         * this helps to skip unneeded intermediate updates. For example:
         * Those update requests:
         * - entity 207386, project 24, is_in_project true
         * - entity 207386, project 24, is_in_project false
         * - entity 207386, project 82, is_in_project true
         * - entity 207386, project 24, is_in_project true
         *
         * is reduced to the latest ones per project and entity:
         * - entity 207386, project 24, is_in_project true
         * - entity 207386, project 82, is_in_project true
         *
         * also takes only pk_entity of persistent_item or temporal_entity
         * by joining a union of information.persistent_item and information.temporal_entity
         *
         * also takes only pk_entity of items that have a info_proj_rel.
         * this excludes entities that are related by project's properties (roles) but are not in project
         * themselfes.
         ***********/
        With tw1 As (
            Select
                t1.fk_entity,
                t1.fk_project,
                t1.tmsp_last_modification::timestamp
            From
                projects.info_proj_rel t1
            Where
                t1.tmsp_last_modification::timestamp >= tmsp),
            -- select fk_entity and fk_project of all affected persistent_items and temporal_entities
            tw2 As (
                -- persistent_items where info_proj_rel changed
                Select
                    t1.pk_entity As fk_entity,
                    t2.fk_project,
                    t2.tmsp_last_modification
                From
                    information.persistent_item t1,
                    tw1 t2
                Where
                    t1.pk_entity = t2.fk_entity
                Union All
                -- temporal_entities where info_proj_rel changed
                Select
                    t1.pk_entity As fk_entity,
                    t2.fk_project,
                    t2.tmsp_last_modification
                From
                    information.temporal_entity t1,
                    tw1 t2
                Where
                    t1.pk_entity = t2.fk_entity
                Union All
                -- domain entities of roles where info_proj_rel changed
                Select
                    t1.fk_temporal_entity As fk_entity,
                    t2.fk_project,
                    t2.tmsp_last_modification
                From
                    information.role t1,
                    tw1 t2
                Where
                    t1.pk_entity = t2.fk_entity
                Union All
                -- range entities of roles where info_proj_rel changed
                Select
                    t1.fk_entity As fk_entity,
                    t2.fk_project,
                    t2.tmsp_last_modification
                From
                    information.role t1,
                    tw1 t2
                Where
                    t1.pk_entity = t2.fk_entity
                Union All
                -- domain entities of entity_associations where info_proj_rel changed
                Select
                    t1.fk_info_domain As fk_entity,
                    t2.fk_project,
                    t2.tmsp_last_modification
                From
                    information.entity_association t1,
                    tw1 t2
                Where
                    t1.pk_entity = t2.fk_entity
                Union All
                -- range entities of entity_associations where info_proj_rel changed
                Select
                    t1.fk_info_range As fk_entity,
                    t2.fk_project,
                    t2.tmsp_last_modification
                From
                    information.entity_association t1,
                    tw1 t2
                Where
                    t1.pk_entity = t2.fk_entity
                Union All
                -- concerned entities of text_properties where info_proj_rel changed
                Select
                    t1.fk_concerned_entity As fk_entity,
                    t2.fk_project,
                    t2.tmsp_last_modification
                From
                    information.text_property t1,
                    tw1 t2
                Where
                    t1.pk_entity = t2.fk_entity),
                tw3 As (
                    Select Distinct On (t1.fk_project,
                        t1.fk_entity)
                        t1.fk_project,
                        t1.fk_entity,
                        t2.is_in_project,
                        t1.tmsp_last_modification
                    From
                        tw2 t1,
                        projects.info_proj_rel t2
                    Where
                        t1.fk_entity = t2.fk_entity
                        And t1.fk_project = t2.fk_project
                    Order By
                        t1.fk_project,
                        t1.fk_entity,
                        t1.tmsp_last_modification Desc)
                /**********
                 * Group the remaining update request by is_in_project and fk_projects
                 ***********/
                Select
                    is_in_project,
                    fk_project,
                    array_agg(fk_entity) pk_entities --, count(pk_entity)
                From
                    tw3
                Group By
                    fk_project,
                    is_in_project)
            /*******
             * Perform the updates on entity_preview_non_recursive
             *******/
            Loop
                If (t_row.is_in_project = True) Then
                    Perform
                        warehouse.entity_preview_non_recursive__upsert (t_row.pk_entities,
                            t_row.fk_project);
                    --RAISE INFO 'upserted entity_preview_non_recursive for fk_project: %, pk_entities: %', t_row.fk_project, t_row.pk_entities;
                    ELSEIF (t_row.is_in_project = False) Then
                    Perform
                        warehouse.entity_preview_non_recursive__delete (t_row.pk_entities,
                            t_row.fk_project);
                End If;
            End Loop;
End;
$$;


--
-- Name: entity_preview__add_missing(); Type: FUNCTION; Schema: warehouse; Owner: -
--

CREATE FUNCTION warehouse.entity_preview__add_missing() RETURNS boolean
    LANGUAGE plpgsql
    AS $$
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
$$;


--
-- Name: entity_preview__create_temporary(); Type: FUNCTION; Schema: warehouse; Owner: -
--

CREATE FUNCTION warehouse.entity_preview__create_temporary() RETURNS boolean
    LANGUAGE plpgsql
    AS $$
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
$$;


--
-- Name: entity_preview__full_text__add_missing(); Type: FUNCTION; Schema: warehouse; Owner: -
--

CREATE FUNCTION warehouse.entity_preview__full_text__add_missing() RETURNS boolean
    LANGUAGE plpgsql
    AS $$
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
$$;


--
-- Name: entity_preview__full_text__create_temporary(); Type: FUNCTION; Schema: warehouse; Owner: -
--

CREATE FUNCTION warehouse.entity_preview__full_text__create_temporary() RETURNS boolean
    LANGUAGE plpgsql
    AS $$
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
$$;


--
-- Name: entity_preview__full_text__remove_superfluous(); Type: FUNCTION; Schema: warehouse; Owner: -
--

CREATE FUNCTION warehouse.entity_preview__full_text__remove_superfluous() RETURNS boolean
    LANGUAGE plpgsql
    AS $$
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
$$;


--
-- Name: entity_preview__full_text__update_all(); Type: FUNCTION; Schema: warehouse; Owner: -
--

CREATE FUNCTION warehouse.entity_preview__full_text__update_all() RETURNS boolean
    LANGUAGE plpgsql
    AS $$
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
$$;


--
-- Name: entity_preview__full_text__update_modified(); Type: FUNCTION; Schema: warehouse; Owner: -
--

CREATE FUNCTION warehouse.entity_preview__full_text__update_modified() RETURNS boolean
    LANGUAGE plpgsql
    AS $$
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
$$;


--
-- Name: entity_preview__labels__add_missing(); Type: FUNCTION; Schema: warehouse; Owner: -
--

CREATE FUNCTION warehouse.entity_preview__labels__add_missing() RETURNS boolean
    LANGUAGE plpgsql
    AS $$
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
$$;


--
-- Name: entity_preview__labels__create_temporary(); Type: FUNCTION; Schema: warehouse; Owner: -
--

CREATE FUNCTION warehouse.entity_preview__labels__create_temporary() RETURNS boolean
    LANGUAGE plpgsql
    AS $$
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
$$;


--
-- Name: entity_preview__labels__remove_superfluous(); Type: FUNCTION; Schema: warehouse; Owner: -
--

CREATE FUNCTION warehouse.entity_preview__labels__remove_superfluous() RETURNS boolean
    LANGUAGE plpgsql
    AS $$
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
$$;


--
-- Name: entity_preview__labels__update_all(); Type: FUNCTION; Schema: warehouse; Owner: -
--

CREATE FUNCTION warehouse.entity_preview__labels__update_all() RETURNS boolean
    LANGUAGE plpgsql
    AS $$
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
$$;


--
-- Name: entity_preview__labels__update_modified(); Type: FUNCTION; Schema: warehouse; Owner: -
--

CREATE FUNCTION warehouse.entity_preview__labels__update_modified() RETURNS boolean
    LANGUAGE plpgsql
    AS $$
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
      first_second,
      last_second,
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
      first_second,
      last_second,
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
    first_second = tw1.first_second,
    last_second = tw1.last_second,
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
$$;


--
-- Name: entity_preview__notify_upsert(); Type: FUNCTION; Schema: warehouse; Owner: -
--

CREATE FUNCTION warehouse.entity_preview__notify_upsert() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
    BEGIN
      PERFORM pg_notify('entity_preview_updated'::text, json_build_object(
        'pk_entity', NEW.pk_entity,
      'fk_project', NEW.fk_project,
          'project', NEW.project,
          'fk_class', NEW.fk_class,
          'entity_type', NEW.entity_type,
          'class_label', NEW.class_label,
          'entity_label', NEW.entity_label,
          'time_span', NEW.time_span,
          'fk_type', NEW.fk_type,
          'type_label', NEW.type_label
      )::text);
    RETURN NEW;
    END;
    $$;


--
-- Name: entity_preview__refresh_all(); Type: FUNCTION; Schema: warehouse; Owner: -
--

CREATE FUNCTION warehouse.entity_preview__refresh_all() RETURNS boolean
    LANGUAGE plpgsql
    AS $$
Begin
    -- performs a complete refresh of entity preview from scratch
    Perform
        warehouse.entity_preview_non_recursive__refresh ();
    Perform
        warehouse.entity_preview__update_all ();
    Return True;
End;
$$;


--
-- Name: entity_preview__remove_superfluous(); Type: FUNCTION; Schema: warehouse; Owner: -
--

CREATE FUNCTION warehouse.entity_preview__remove_superfluous() RETURNS boolean
    LANGUAGE plpgsql
    AS $$
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
$$;


--
-- Name: entity_preview__update_all(); Type: FUNCTION; Schema: warehouse; Owner: -
--

CREATE FUNCTION warehouse.entity_preview__update_all() RETURNS boolean
    LANGUAGE plpgsql
    AS $$
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
$$;


--
-- Name: entity_preview__update_dependent_class_labels(); Type: FUNCTION; Schema: warehouse; Owner: -
--

CREATE FUNCTION warehouse.entity_preview__update_dependent_class_labels() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
      BEGIN

        RAISE INFO 'Called TRIGGER FUNCTION entity_preview__update_dependent_class_labels; dfh_pk_class: % class_label: %', NEW.dfh_pk_class, NEW.class_label;

        PERFORM warehouse.entity_preview_non_recursive__update_class_labels(NEW.dfh_pk_class, NEW.class_label);

        RETURN NEW;
      END;
      $$;


--
-- Name: entity_preview__update_modified(); Type: FUNCTION; Schema: warehouse; Owner: -
--

CREATE FUNCTION warehouse.entity_preview__update_modified() RETURNS boolean
    LANGUAGE plpgsql
    AS $$
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
      first_second,
      last_second,
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
      first_second,
      last_second,
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
    first_second = tw1.first_second,
    last_second = tw1.last_second,
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
$$;


--
-- Name: entity_preview_non_recursive; Type: TABLE; Schema: warehouse; Owner: -
--

CREATE TABLE warehouse.entity_preview_non_recursive (
    pk_entity integer,
    fk_class integer,
    fk_project integer,
    table_name character varying,
    class_label character varying,
    own_full_text text,
    own_entity_label text,
    time_span jsonb,
    related_full_texts jsonb,
    fk_entity_label integer,
    fk_type integer,
    first_second bigint,
    last_second bigint
);


--
-- Name: entity_preview_non_recursive__create(integer[]); Type: FUNCTION; Schema: warehouse; Owner: -
--

CREATE FUNCTION warehouse.entity_preview_non_recursive__create(param_pk_entities integer[]) RETURNS SETOF warehouse.entity_preview_non_recursive
    LANGUAGE sql
    AS $$
    With
    -- all entities per project with class label
    tw1 As (
        Select
            t1.pk_entity,
            t1.fk_class,
            t2.fk_project,
            'persistent_item'::varchar As table_name,
            t3.class_label
        From
            information.persistent_item t1,
            projects.info_proj_rel t2,
            warehouse.class_preview t3
        Where
            t1.pk_entity = Any (param_pk_entities)
            And t2.is_in_project = True
            And t1.pk_entity = t2.fk_entity
            And t1.fk_class = t3.dfh_pk_class
        Union
        Select
            t1.pk_entity,
            t1.fk_class,
            t2.fk_project,
            'temporal_entity'::varchar As table_name,
            t3.class_label
        From
            information.temporal_entity t1,
            projects.info_proj_rel t2,
            warehouse.class_preview t3
        Where
            t1.pk_entity = Any (param_pk_entities)
            And t2.is_in_project = True
            And t1.pk_entity = t2.fk_entity
            And t1.fk_class = t3.dfh_pk_class
),
-- all entities per project and repo
tw2 As (
    Select
        t1.pk_entity,
        t1.fk_class,
        t1.fk_project,
        t1.table_name,
        t1.class_label
    From
        tw1 t1
    Where
        t1.pk_entity = Any (param_pk_entities)
    Union
    Select Distinct On (pk_entity)
        t1.pk_entity,
        t1.fk_class,
        NULL::integer As fk_project,
        t1.table_name,
        t1.class_label
    From
        tw1 t1
    Where
        t1.pk_entity = Any (param_pk_entities)
),
-- fields
-- TODO: add fk_project for consideration of project-settings
/**
 * Start of selecting ordered fields per class and project
 */
-- all text_properties except comments
tw02 As (
    Select
        Case t2.pk_entity
        When 217 Then
            - 9
        When 218 Then
            - 8
        When 219 Then
            - 7
        Else
            null::int
        End As field_order,
        t1.pk_class As fk_class,
        t1.pk_class As fk_class_for_class_field,
        null::int As fk_domain_class,
        null::int As fk_range_class,
        null::int As fk_property,
        null::boolean As property_is_outgoing,
        t2.pk_entity As fk_class_field,
        t3.pk_entity As fk_project
    From
        tw2 t0,
        data_for_history.v_class t1,
        "system".class_field t2,
        projects.project t3
    Where
        pk_class != 365
        And t1.pk_class = t0.fk_class
        And t2.used_table = 'information.text_property'
        And t2.pk_entity != 3364
),
-- all outgoing property fields
-- outgoing property fields
tw05 As (
    Select Distinct
        t3.ord_num As field_order,
        t2.has_domain As fk_class,
        null::int As fk_class_for_class_field,
        t2.has_domain As fk_domain_class,
        null::int As fk_range_class,
        t2.pk_property As fk_property,
        True As property_is_outgoing,
        null::int As fk_class_field,
        t0.pk_entity As fk_project
    From
        projects.project t0
        Join ( Select Distinct
                fk_class As pk_class
            From
                tw2) t1 On True --t1.pk_class IN (365) AND t0.pk_entity IN (375669, 24, 27)
            Join data_for_history.v_property t2 On t1.pk_class = t2.has_domain
            Left Join projects.class_field_config t3 On t2.has_domain = t3.fk_domain_class
                And t2.pk_property = t3.fk_property
                And t3.fk_project = t0.pk_entity
            Order By
                fk_project
),
tw06 As (
    Select Distinct On (fk_class,
        fk_project)
        field_order,
        fk_class,
        fk_project
    From
        tw05 t1
),
-- field order comes from project
tw07 As (
    Select
        t1.field_order,
        t1.fk_class,
        t1.fk_class_for_class_field,
        t1.fk_domain_class,
        t1.fk_range_class,
        t1.fk_property,
        t1.property_is_outgoing,
        t1.fk_class_field,
        t1.fk_project
    From
        tw05 t1,
        tw06 t2
Where
    t2.fk_class = t1.fk_class
    And t2.fk_project = t1.fk_project
    And t2.field_order Is Not Null
Union All
-- field order comes from default project or is null
Select
    t3.field_order,
    t1.fk_class,
    t1.fk_class_for_class_field,
    t1.fk_domain_class,
    t1.fk_range_class,
    t1.fk_property,
    t1.property_is_outgoing,
    t1.fk_class_field,
    t1.fk_project
From
    tw05 t1
    Join tw06 t2 On t2.fk_class = t1.fk_class
        And t2.fk_project = t1.fk_project
        And t2.field_order Is Null
    Left Join tw05 t3 On t3.fk_class = t1.fk_class
        And t3.fk_property = t1.fk_property
        And t3.fk_project = 375669
    Order By
        fk_project
),
-- ingoing property fields
tw08 As (
    Select Distinct
        Case t2.pk_property
        When 1111 Then
            - 10::int
        Else
            t3.ord_num
        End As field_order,
        t2.has_range As fk_class,
        null::int As fk_class_for_class_field,
        null::int As fk_domain_class,
        t2.has_range As fk_range_class,
        t2.pk_property As fk_property,
        False As property_is_outgoing,
        null::int As fk_class_field,
        t0.pk_entity As fk_project
    From
        projects.project t0
    Join ( Select Distinct
            fk_class As pk_class
        From
            tw2) t1 On t1.pk_class != 365
        Join data_for_history.v_property t2 On t1.pk_class = t2.has_range
        Left Join projects.class_field_config t3 On t2.has_range = t3.fk_range_class
            And t2.pk_property = t3.fk_property
            And t3.fk_project = t0.pk_entity
        Order By
            fk_project
),
tw09 As (
    Select Distinct On (fk_class,
        fk_project)
        field_order,
        fk_class,
        fk_project
    From
        tw08 t1
),
tw010 As (
    -- field order comes from project
    Select
        t1.field_order,
        t1.fk_class,
        t1.fk_class_for_class_field,
        t1.fk_domain_class,
        t1.fk_range_class,
        t1.fk_property,
        t1.property_is_outgoing,
        t1.fk_class_field,
        t1.fk_project
    From
        tw08 t1,
        tw09 t2
Where
    t2.fk_class = t1.fk_class
    And t2.fk_project = t1.fk_project
    And t2.field_order Is Not Null
Union All
-- field order comes from default project or is null
Select
    t3.field_order,
    t1.fk_class,
    t1.fk_class_for_class_field,
    t1.fk_domain_class,
    t1.fk_range_class,
    t1.fk_property,
    t1.property_is_outgoing,
    t1.fk_class_field,
    t1.fk_project
From
    tw08 t1
    Join tw09 t2 On t2.fk_class = t1.fk_class
        And t2.fk_project = t1.fk_project
        And t2.field_order Is Null
    Left Join tw08 t3 On t3.fk_class = t1.fk_class
        And t3.fk_property = t1.fk_property
        And t3.fk_project = 375669
    Order By
        fk_project
),
-- all fields for all projects and all classes
tw011 As (
    Select
        *
    From
        tw02
    Union All
    Select
        *
    From
        tw07
    Union All
    Select
        *
    From
        tw010
),
/*
 * End of selecting ordered fields per class and project
 **/
-- explode with all fields: join all entities with their fields
tw4 As (
    --
    Select
        tw2.pk_entity,
        tw2.fk_class,
        tw2.fk_project,
        tw2.table_name,
        tw2.class_label,
        t2.field_order,
        t2.fk_class_field,
        t2.fk_property,
        t2.fk_range_class,
        t2.fk_domain_class,
        t2.property_is_outgoing
    From
        tw2,
        tw011 t2
Where
    tw2.fk_project = t2.fk_project
    And tw2.fk_class = t2.fk_class
),
-- select all roles per project with ord_num
tw5 As (
    Select
        t1.pk_entity,
        t1.fk_entity,
        t1.fk_temporal_entity,
        t1.fk_property,
        t2.fk_project,
        coalesce(t2.fk_project, 0) As project,
        t2.ord_num_of_domain,
        t2.ord_num_of_range,
        t1.is_in_project_count
    From
        information.v_role t1,
        projects.info_proj_rel t2
    Where (t1.fk_entity = Any (param_pk_entities)
        Or t1.fk_temporal_entity = Any (param_pk_entities))
    And t2.fk_entity = t1.pk_entity
    And t2.is_in_project = True
Union
Select
    t1.pk_entity,
    t1.fk_entity,
    t1.fk_temporal_entity,
    t1.fk_property,
    NULL::integer As fk_project,
    0 As project,
    NULL::integer As ord_num_of_domain,
    NULL::integer As ord_num_of_range,
    t1.is_in_project_count
From
    information.v_role t1
Where (t1.fk_entity = Any (param_pk_entities)
    Or t1.fk_temporal_entity = Any (param_pk_entities))
And t1.is_in_project_count > 0
),
-- select all text_properties per project with ord_num
tw6 As (
    Select
        t1.pk_entity,
        t1.fk_concerned_entity,
        t1.fk_language,
        t1.fk_class_field,
        t1.quill_doc,
        t1.string,
        t1.is_in_project_count,
        t2.fk_project,
        coalesce(t2.fk_project, 0) As "coalesce",
        t2.ord_num_of_text_property
    From
        information.v_text_property t1,
        projects.info_proj_rel t2
    Where
        t1.fk_concerned_entity = Any (param_pk_entities)
        And t2.fk_entity = t1.pk_entity
        And t2.is_in_project = True
    Union
    Select
        t1.pk_entity,
        t1.fk_concerned_entity,
        t1.fk_language,
        t1.fk_class_field,
        t1.quill_doc,
        t1.string,
        t1.is_in_project_count,
        NULL::integer As fk_project,
        0 As "coalesce",
        NULL::integer As ord_num_of_text_property
    From
        information.v_text_property t1
    Where
        t1.fk_concerned_entity = Any (param_pk_entities)
        And t1.is_in_project_count > 0
),
-- join directly related things and create string
tw7 As (
    Select
        t1.*,
        coalesce(t2.ord_num_of_range, t7.ord_num_of_text_property) As ord_num,
        coalesce(t3.string, t4.notes, t7.string) As string,
        coalesce(t5.pk_entity, t6.pk_entity, t9.pk_entity, t10.pk_entity) As fk_related_entity
    From
        tw4 t1
        -- join outgoing roles
    Left Join tw5 t2 On t1.fk_property = t2.fk_property
        And t1.fk_project Is Not Distinct From t2.fk_project
        And t1.property_is_outgoing = True
        And t2.fk_temporal_entity = t1.pk_entity
        -- join appellation with outgoing roles
    Left Join information.appellation t3 On t2.fk_entity = t3.pk_entity
    -- join language with outgoing roles
    Left Join information.language t4 On t2.fk_entity = t4.pk_entity
    -- join persistent_item with outgoing roles
    Left Join information.persistent_item t5 On t2.fk_entity = t5.pk_entity
    -- join temporal_entity with outgoing roles
    Left Join information.temporal_entity t6 On t2.fk_entity = t6.pk_entity
    -- join text properties
    Left Join tw6 t7 On t1.pk_entity = t7.fk_concerned_entity
        And t1.fk_class_field = t7.fk_class_field
        And t1.fk_project Is Not Distinct From t7.fk_project
        -- join ingoing roles
    Left Join tw5 t8 On t1.fk_property = t8.fk_property
        And t1.fk_project Is Not Distinct From t8.fk_project
        And t1.property_is_outgoing = False
        And t8.fk_entity = t1.pk_entity
        -- join persistent_item with ingoing roles
    Left Join information.persistent_item t9 On t8.fk_temporal_entity = t9.pk_entity
    -- join temporal_entity with ingoing roles
    Left Join information.temporal_entity t10 On t8.fk_temporal_entity = t10.pk_entity
),
-- group for ordered array of strings
tw8 As (
    Select
        pk_entity,
        fk_class,
        fk_project,
        table_name,
        class_label,
        array_agg(string Order By t1.field_order Asc, t1.ord_num Asc) Filter (Where string Is Not Null) string_array
    From
        tw7 t1
    Group By
        pk_entity,
        fk_class,
        fk_project,
        table_name,
        class_label
),
-- select roles with time primitive, first and last second
tw9 As (
    Select
        t1.fk_temporal_entity,
        t1.fk_property,
        t2.fk_project,
        t2.calendar,
        t3.julian_day,
        t3.duration,
        commons.time_primitive__get_first_second (t3.julian_day) As first_second,
        commons.time_primitive__get_last_second (t3.julian_day, t3.duration, t2.calendar) As last_second
    From
        information.role t1,
        projects.info_proj_rel t2,
        information.v_time_primitive t3
    Where
        t1.fk_temporal_entity = Any (param_pk_entities)
        And t1.pk_entity = t2.fk_entity
        And (t1.fk_property = Any (Array[71,
                72,
                150,
                151,
                152,
                153]))
        And t3.pk_entity = t1.fk_entity
        And t2.is_in_project = True
    Union ( Select Distinct On (t1.fk_temporal_entity,
            t1.fk_property)
            t1.fk_temporal_entity,
            t1.fk_property,
            NULL::integer As fk_project,
            t1.community_favorite_calendar,
            t3.julian_day,
            t3.duration,
            commons.time_primitive__get_first_second (t3.julian_day) As first_second,
            commons.time_primitive__get_last_second (t3.julian_day, t3.duration, t1.community_favorite_calendar) As last_second
        From
            information.v_role t1
            Join information.v_time_primitive t3 On t3.pk_entity = t1.fk_entity
        Where
            t1.fk_temporal_entity = Any (param_pk_entities)
            And t1.fk_property = Any (Array[71,
                72,
                150,
                151,
                152,
                153])
            And t1.is_in_project_count > 0
        Order By
            t1.fk_temporal_entity,
            t1.fk_property,
            t1.is_in_project_count Desc,
            t1.tmsp_creation Desc)
),
-- create time spans, first_second and last_second
tw10 As (
    Select
        tw9.fk_project,
        tw9.fk_temporal_entity,
        min(tw9.first_second) first_second,
        max(tw9.last_second) last_second,
        jsonb_object_agg(
            Case When tw9.fk_property = 71 Then
                'p81'::text
            When tw9.fk_property = 72 Then
                'p82'::text
            When tw9.fk_property = 150 Then
                'p81a'::text
            When tw9.fk_property = 151 Then
                'p81b'::text
            When tw9.fk_property = 152 Then
                'p82a'::text
            When tw9.fk_property = 153 Then
                'p82b'::text
            Else
                tw9.fk_property::text
            End, json_build_object('julianDay', tw9.julian_day, 'duration', tw9.duration, 'calendar', tw9.calendar)) As time_span
    From
        tw9
    Group By
        tw9.fk_project,
        tw9.fk_temporal_entity
),
tw11 As (
    Select
        t1.pk_entity,
        t1.fk_class,
        t1.fk_project,
        t1.table_name,
        t1.class_label,
        array_to_string(t1.string_array, '; ') own_full_text,
        t1.string_array[1] own_entity_label,
        t2.time_span,
        t2.first_second,
        t2.last_second
    From
        tw8 t1
    Left Join tw10 t2 On t1.pk_entity = t2.fk_temporal_entity
        And t1.fk_project Is Not Distinct From t2.fk_project
),
-- group related things and create object with fk_related_entities
tw12 As (
    Select
        t1.pk_entity,
        t1.fk_project,
        jsonb_object_agg(t1.fk_related_entity::text, NULL::unknown) As related_full_texts,
        array_agg(t1.fk_related_entity Order By t1.field_order Asc, t1.ord_num Asc) As fk_entity_labels
    From
        tw7 t1
Where
    t1.fk_related_entity Is Not Null
Group By
    pk_entity,
    fk_class,
    fk_project,
    table_name,
    class_label
),
-- join fk_entity_label and related_full_texts
tw13 As (
    Select
        t1.pk_entity,
        t1.fk_class,
        t1.fk_project,
        t1.table_name,
        t1.class_label,
        t1.own_full_text,
        t1.own_entity_label,
        t1.time_span,
        t1.first_second,
        t1.last_second,
        t2.related_full_texts,
        Case When t1.own_entity_label Is Not Null Then
            NULL::integer
        Else
            t2.fk_entity_labels[1]
        End As fk_entity_label
    From
        tw11 t1
    Left Join tw12 t2 On t1.pk_entity = t2.pk_entity
        And t1.fk_project Is Not Distinct From t2.fk_project
),
-- select all entity associations per project with ord_num
tw14 As (
    Select Distinct
        t1.pk_entity,
        t1.fk_info_domain,
        t1.fk_info_range,
        t1.fk_data_domain,
        t1.fk_data_range,
        t1.fk_property,
        t2.fk_project,
        coalesce(t2.fk_project, 0) As project,
        t1.is_in_project_count
    From
        information.v_entity_association t1,
        projects.info_proj_rel t2
Where (t1.fk_info_domain = Any (param_pk_entities)
    Or t1.fk_info_range = Any (param_pk_entities))
And t2.fk_entity = t1.pk_entity
And t2.is_in_project = True
Union
Select Distinct
    t1.pk_entity,
    t1.fk_info_domain,
    t1.fk_info_range,
    t1.fk_data_domain,
    t1.fk_data_range,
    t1.fk_property,
    NULL::integer As fk_project,
    0 As project,
    t1.is_in_project_count
From
    information.v_entity_association t1
Where (t1.fk_info_domain = Any (param_pk_entities)
    Or t1.fk_info_range = Any (param_pk_entities))
And t1.is_in_project_count > 0
),
-- get type entity_associations (DEPRECATED)
tw15 As (
    Select Distinct On (t1.fk_project,
        t1.fk_property,
        t1.fk_info_domain)
        t1.fk_project,
        t1.fk_property,
        t1.fk_info_domain,
        t1.fk_info_range,
        t1.is_in_project_count
    From
        tw14 t1,
        system.class_has_type_property t2
    Where (t1.fk_info_domain = Any (param_pk_entities)
        Or t1.fk_info_range = Any (param_pk_entities))
    And t1.fk_project Is Null
    And t1.fk_property = t2.fk_property
Union
Select
    t3.fk_project,
    t3.fk_property,
    t3.fk_info_domain,
    t3.fk_info_range,
    t3.is_in_project_count
From
    tw14 t3,
    system.class_has_type_property t4
Where (t3.fk_info_domain = Any (param_pk_entities)
    Or t3.fk_info_range = Any (param_pk_entities))
And t3.fk_project Is Not Null
And t3.fk_property = t4.fk_property
Order By
    1,
    2,
    3,
    5 Desc
),
-- join fk_type
tw16 As (
    Select
        t1.pk_entity,
        t1.fk_class,
        t1.fk_project,
        t1.table_name,
        t1.class_label,
        t1.own_full_text,
        t1.own_entity_label,
        t1.time_span,
        t1.related_full_texts,
        t1.fk_entity_label,
        t2.fk_info_range As fk_type,
        t1.first_second,
        t1.last_second
    From
        tw13 t1
    Left Join tw15 t2 On t1.pk_entity = t2.fk_info_domain
        And t1.fk_project Is Not Distinct From t2.fk_project
)
Select
    *
From
    tw16;

$$;


--
-- Name: entity_preview_non_recursive__create_all(); Type: FUNCTION; Schema: warehouse; Owner: -
--

CREATE FUNCTION warehouse.entity_preview_non_recursive__create_all() RETURNS SETOF warehouse.entity_preview_non_recursive
    LANGUAGE sql
    AS $$
    -- 1
    With
    -- all entities per project with class label
    tw1 As (
        Select
            t1.pk_entity,
            t1.fk_class,
            t2.fk_project,
            'persistent_item'::varchar As table_name,
            t3.class_label
        From
            information.persistent_item t1,
            projects.info_proj_rel t2,
            warehouse.class_preview t3
        Where
            t2.is_in_project = True
            And t1.pk_entity = t2.fk_entity
            And t1.fk_class = t3.dfh_pk_class
        Union
        Select
            t1.pk_entity,
            t1.fk_class,
            t2.fk_project,
            'temporal_entity'::varchar As table_name,
            t3.class_label
        From
            information.temporal_entity t1,
            projects.info_proj_rel t2,
            warehouse.class_preview t3
        Where
            t2.is_in_project = True
            And t1.pk_entity = t2.fk_entity
            And t1.fk_class = t3.dfh_pk_class
),
-- all entities per project and repo
tw2 As (
    Select
        t1.pk_entity,
        t1.fk_class,
        t1.fk_project,
        t1.table_name,
        t1.class_label
    From
        tw1 t1
    Union
    Select Distinct On (pk_entity)
        t1.pk_entity,
        t1.fk_class,
        NULL::integer As fk_project,
        t1.table_name,
        t1.class_label
    From
        tw1 t1
),
-- fields
-- TODO: add fk_project for consideration of project-settings
/**
 * Start of selecting ordered fields per class and project
 */
-- all text_properties except comments
tw02 As (
    Select
        Case t2.pk_entity
        When 217 Then
            - 9
        When 218 Then
            - 8
        When 219 Then
            - 7
        Else
            null::int
        End As field_order,
        t1.pk_class As fk_class,
        t1.pk_class As fk_class_for_class_field,
        null::int As fk_domain_class,
        null::int As fk_range_class,
        null::int As fk_property,
        null::boolean As property_is_outgoing,
        t2.pk_entity As fk_class_field,
        t3.pk_entity As fk_project
    From
        data_for_history.v_class t1,
        "system".class_field t2,
        projects.project t3
    Where
        pk_class != 365
        And t2.used_table = 'information.text_property'
        And t2.pk_entity != 3364
),
-- all outgoing property fields
-- outgoing property fields
tw05 As (
    Select Distinct
        t3.ord_num As field_order,
        t2.has_domain As fk_class,
        null::int As fk_class_for_class_field,
        t2.has_domain As fk_domain_class,
        null::int As fk_range_class,
        t2.pk_property As fk_property,
        True As property_is_outgoing,
        null::int As fk_class_field,
        t0.pk_entity As fk_project
    From
        projects.project t0
        Join data_for_history.v_class t1 On True --t1.pk_class IN (365) AND t0.pk_entity IN (375669, 24, 27)
        Join data_for_history.v_property t2 On t1.pk_class = t2.has_domain
        Left Join projects.class_field_config t3 On t2.has_domain = t3.fk_domain_class
            And t2.pk_property = t3.fk_property
            And t3.fk_project = t0.pk_entity
        Order By
            fk_project
),
tw06 As (
    Select Distinct On (fk_class,
        fk_project)
        field_order,
        fk_class,
        fk_project
    From
        tw05 t1
),
-- field order comes from project
tw07 As (
    Select
        t1.field_order,
        t1.fk_class,
        t1.fk_class_for_class_field,
        t1.fk_domain_class,
        t1.fk_range_class,
        t1.fk_property,
        t1.property_is_outgoing,
        t1.fk_class_field,
        t1.fk_project
    From
        tw05 t1,
        tw06 t2
Where
    t2.fk_class = t1.fk_class
    And t2.fk_project = t1.fk_project
    And t2.field_order Is Not Null
Union All
-- field order comes from default project or is null
Select
    t3.field_order,
    t1.fk_class,
    t1.fk_class_for_class_field,
    t1.fk_domain_class,
    t1.fk_range_class,
    t1.fk_property,
    t1.property_is_outgoing,
    t1.fk_class_field,
    t1.fk_project
From
    tw05 t1
    Join tw06 t2 On t2.fk_class = t1.fk_class
        And t2.fk_project = t1.fk_project
        And t2.field_order Is Null
    Left Join tw05 t3 On t3.fk_class = t1.fk_class
        And t3.fk_property = t1.fk_property
        And t3.fk_project = 375669
    Order By
        fk_project
),
-- ingoing property fields
tw08 As (
    Select Distinct
        Case t2.pk_property
        When 1111 Then
            - 10::int
        Else
            t3.ord_num
        End As field_order,
        t2.has_range As fk_class,
        null::int As fk_class_for_class_field,
        null::int As fk_domain_class,
        t2.has_range As fk_range_class,
        t2.pk_property As fk_property,
        False As property_is_outgoing,
        null::int As fk_class_field,
        t0.pk_entity As fk_project
    From
        projects.project t0
    Join data_for_history.v_class t1 On t1.pk_class != 365
    Join data_for_history.v_property t2 On t1.pk_class = t2.has_range
    Left Join projects.class_field_config t3 On t2.has_range = t3.fk_range_class
        And t2.pk_property = t3.fk_property
        And t3.fk_project = t0.pk_entity
    Order By
        fk_project
),
tw09 As (
    Select Distinct On (fk_class,
        fk_project)
        field_order,
        fk_class,
        fk_project
    From
        tw08 t1
),
tw010 As (
    -- field order comes from project
    Select
        t1.field_order,
        t1.fk_class,
        t1.fk_class_for_class_field,
        t1.fk_domain_class,
        t1.fk_range_class,
        t1.fk_property,
        t1.property_is_outgoing,
        t1.fk_class_field,
        t1.fk_project
    From
        tw08 t1,
        tw09 t2
Where
    t2.fk_class = t1.fk_class
    And t2.fk_project = t1.fk_project
    And t2.field_order Is Not Null
Union All
-- field order comes from default project or is null
Select
    t3.field_order,
    t1.fk_class,
    t1.fk_class_for_class_field,
    t1.fk_domain_class,
    t1.fk_range_class,
    t1.fk_property,
    t1.property_is_outgoing,
    t1.fk_class_field,
    t1.fk_project
From
    tw08 t1
    Join tw09 t2 On t2.fk_class = t1.fk_class
        And t2.fk_project = t1.fk_project
        And t2.field_order Is Null
    Left Join tw08 t3 On t3.fk_class = t1.fk_class
        And t3.fk_property = t1.fk_property
        And t3.fk_project = 375669
    Order By
        fk_project
),
-- all fields for all projects and all classes
tw011 As (
    Select
        *
    From
        tw02
    Union All
    Select
        *
    From
        tw07
    Union All
    Select
        *
    From
        tw010
),
/*
 * End of selecting ordered fields per class and project
 **/
-- explode with all fields: join all entities with their fields
tw4 As (
    Select
        t1.pk_entity,
        t1.fk_class,
        t1.fk_project,
        t1.table_name,
        t1.class_label,
        t2.field_order,
        t2.fk_class_field,
        t2.fk_property,
        t2.fk_range_class,
        t2.fk_domain_class,
        t2.property_is_outgoing
    From
        tw2 t1,
        tw011 t2
Where
    t1.fk_project = t2.fk_project
    And t1.fk_class = t2.fk_class
),
-- select all roles per project with ord_num
tw5 As (
    Select
        t1.pk_entity,
        t1.fk_entity,
        t1.fk_temporal_entity,
        t1.fk_property,
        t2.fk_project,
        coalesce(t2.fk_project, 0) As project,
        t2.ord_num_of_domain,
        t2.ord_num_of_range,
        t1.is_in_project_count
    From
        information.v_role t1,
        projects.info_proj_rel t2
    Where
        t2.fk_entity = t1.pk_entity
        And t2.is_in_project = True
    Union
    Select
        t1.pk_entity,
        t1.fk_entity,
        t1.fk_temporal_entity,
        t1.fk_property,
        NULL::integer As fk_project,
        0 As project,
        NULL::integer As ord_num_of_domain,
        NULL::integer As ord_num_of_range,
        t1.is_in_project_count
    From
        information.v_role t1
    Where
        t1.is_in_project_count > 0
),
-- select all text_properties per project with ord_num
tw6 As (
    Select
        t1.pk_entity,
        t1.fk_concerned_entity,
        t1.fk_language,
        t1.fk_class_field,
        t1.quill_doc,
        t1.string,
        t1.is_in_project_count,
        t2.fk_project,
        coalesce(t2.fk_project, 0) As "coalesce",
        t2.ord_num_of_text_property
    From
        information.v_text_property t1,
        projects.info_proj_rel t2
    Where
        t2.fk_entity = t1.pk_entity
        And t2.is_in_project = True
    Union
    Select
        t1.pk_entity,
        t1.fk_concerned_entity,
        t1.fk_language,
        t1.fk_class_field,
        t1.quill_doc,
        t1.string,
        t1.is_in_project_count,
        NULL::integer As fk_project,
        0 As "coalesce",
        NULL::integer As ord_num_of_text_property
    From
        information.v_text_property t1
    Where
        t1.is_in_project_count > 0
),
-- join directly related things and create string
tw7 As (
    Select
        t1.*,
        coalesce(t2.ord_num_of_range, t7.ord_num_of_text_property) As ord_num,
        coalesce(t3.string, t4.notes, t7.string) As string,
        coalesce(t5.pk_entity, t6.pk_entity, t9.pk_entity, t10.pk_entity) As fk_related_entity
    From
        tw4 t1
        -- join outgoing roles
    Left Join tw5 t2 On t1.fk_property = t2.fk_property
        And t1.fk_project Is Not Distinct From t2.fk_project
        And t1.property_is_outgoing = True
        And t2.fk_temporal_entity = t1.pk_entity
        -- join appellation with outgoing roles
    Left Join information.appellation t3 On t2.fk_entity = t3.pk_entity
    -- join language with outgoing roles
    Left Join information.language t4 On t2.fk_entity = t4.pk_entity
    -- join persistent_item with outgoing roles
    Left Join information.persistent_item t5 On t2.fk_entity = t5.pk_entity
    -- join temporal_entity with outgoing roles
    Left Join information.temporal_entity t6 On t2.fk_entity = t6.pk_entity
    -- join text properties
    Left Join tw6 t7 On t1.pk_entity = t7.fk_concerned_entity
        And t1.fk_class_field = t7.fk_class_field
        And t1.fk_project Is Not Distinct From t7.fk_project
        -- join ingoing roles
    Left Join tw5 t8 On t1.fk_property = t8.fk_property
        And t1.fk_project Is Not Distinct From t8.fk_project
        And t1.property_is_outgoing = False
        And t8.fk_entity = t1.pk_entity
        -- join persistent_item with ingoing roles
    Left Join information.persistent_item t9 On t8.fk_temporal_entity = t9.pk_entity
    -- join temporal_entity with ingoing roles
    Left Join information.temporal_entity t10 On t8.fk_temporal_entity = t10.pk_entity
),
-- group for ordered array of strings
tw8 As (
    Select
        pk_entity,
        fk_class,
        fk_project,
        table_name,
        class_label,
        array_agg(string Order By t1.field_order Asc, t1.ord_num Asc) Filter (Where string Is Not Null) string_array
    From
        tw7 t1
    Group By
        pk_entity,
        fk_class,
        fk_project,
        table_name,
        class_label
),
tw9 As (
    -- get first and last second of all time primitives
    Select
        t1.pk_entity,
        t1.julian_day,
        t1.duration,
        commons.time_primitive__get_first_second (t1.julian_day) As first_second,
        commons.time_primitive__get_last_second (t1.julian_day, t1.duration, 'gregorian') As last_second_gregorian,
        commons.time_primitive__get_last_second (t1.julian_day, t1.duration, 'julian') As last_second_julian
    From
        information.time_primitive t1
),
-- select roles with time primitive, first and last second
tw10 As (
    Select
        t1.fk_temporal_entity,
        t1.fk_property,
        t3.fk_project,
        t3.calendar,
        t2.julian_day,
        t2.duration,
        t2.first_second,
        Case When t3.calendar = 'gregorian' Then
            t2.last_second_gregorian
        Else
            t2.last_second_julian
        End last_second
    From
        information.role t1,
        tw9 t2,
        projects.info_proj_rel t3
    Where
        t1.pk_entity = t3.fk_entity
        And (t1.fk_property = Any (Array[71,
                72,
                150,
                151,
                152,
                153]))
        And t2.pk_entity = t1.fk_entity
        And t3.is_in_project = True
    Union ( Select Distinct On (t1.fk_temporal_entity,
            t1.fk_property)
            t1.fk_temporal_entity,
            t1.fk_property,
            NULL::integer As fk_project,
            t1.community_favorite_calendar,
            t2.julian_day,
            t2.duration,
            t2.first_second,
            Case When t1.community_favorite_calendar = 'gregorian' Then
                t2.last_second_gregorian
            Else
                t2.last_second_julian
            End last_second
        From
            information.v_role t1
            Join tw9 t2 On t2.pk_entity = t1.fk_entity
        Where
            t1.fk_property = Any (Array[71,
                72,
                150,
                151,
                152,
                153])
            And t1.is_in_project_count > 0
        Order By
            t1.fk_temporal_entity,
            t1.fk_property,
            t1.is_in_project_count Desc,
            t1.tmsp_creation Desc)
),
-- create time spans, first_second and last_second
tw11 As (
    Select
        tw10.fk_project,
        tw10.fk_temporal_entity,
        min(tw10.first_second) first_second,
        max(tw10.last_second) last_second,
        jsonb_object_agg(
            Case When tw10.fk_property = 71 Then
                'p81'::text
            When tw10.fk_property = 72 Then
                'p82'::text
            When tw10.fk_property = 150 Then
                'p81a'::text
            When tw10.fk_property = 151 Then
                'p81b'::text
            When tw10.fk_property = 152 Then
                'p82a'::text
            When tw10.fk_property = 153 Then
                'p82b'::text
            Else
                tw10.fk_property::text
            End, json_build_object('julianDay', tw10.julian_day, 'duration', tw10.duration, 'calendar', tw10.calendar)) As time_span
    From
        tw10
    Group By
        tw10.fk_project,
        tw10.fk_temporal_entity
),
tw12 As (
    Select
        t1.pk_entity,
        t1.fk_class,
        t1.fk_project,
        t1.table_name,
        t1.class_label,
        array_to_string(t1.string_array, ', ') own_full_text,
        t1.string_array[1] own_entity_label,
        t2.time_span,
        t2.first_second,
        t2.last_second
    From
        tw8 t1
    Left Join tw11 t2 On t1.pk_entity = t2.fk_temporal_entity
        And t1.fk_project Is Not Distinct From t2.fk_project
),
-- group related things and create object with fk_related_entities
tw13 As (
    Select
        t1.pk_entity,
        t1.fk_project,
        jsonb_object_agg(t1.fk_related_entity::text, NULL::unknown) As related_full_texts,
        array_agg(t1.fk_related_entity Order By t1.field_order Asc, t1.ord_num Asc) As fk_entity_labels
    From
        tw7 t1
Where
    t1.fk_related_entity Is Not Null
Group By
    pk_entity,
    fk_class,
    fk_project,
    table_name,
    class_label
),
-- join fk_entity_label and related_full_texts
tw14 As (
    Select
        t1.pk_entity,
        t1.fk_class,
        t1.fk_project,
        t1.table_name,
        t1.class_label,
        t1.own_full_text,
        t1.own_entity_label,
        t1.time_span,
        t1.first_second,
        t1.last_second,
        t2.related_full_texts,
        Case When t1.own_entity_label Is Not Null Then
            NULL::integer
        Else
            t2.fk_entity_labels[1]
        End As fk_entity_label
    From
        tw12 t1
    Left Join tw13 t2 On t1.pk_entity = t2.pk_entity
        And t1.fk_project Is Not Distinct From t2.fk_project
),
-- select all entity associations per project with ord_num
tw15 As (
    Select Distinct
        t1.pk_entity,
        t1.fk_info_domain,
        t1.fk_info_range,
        t1.fk_data_domain,
        t1.fk_data_range,
        t1.fk_property,
        t2.fk_project,
        coalesce(t2.fk_project, 0) As project,
        t1.is_in_project_count
    From
        information.v_entity_association t1,
        projects.info_proj_rel t2
Where
    t2.fk_entity = t1.pk_entity
    And t2.is_in_project = True
Union
Select Distinct
    t1.pk_entity,
    t1.fk_info_domain,
    t1.fk_info_range,
    t1.fk_data_domain,
    t1.fk_data_range,
    t1.fk_property,
    NULL::integer As fk_project,
    0 As project,
    t1.is_in_project_count
From
    information.v_entity_association t1
Where
    t1.is_in_project_count > 0
),
-- get type entity_associations (DEPRECATED)
tw16 As (
    Select Distinct On (t1.fk_project,
        t1.fk_property,
        t1.fk_info_domain)
        t1.fk_project,
        t1.fk_property,
        t1.fk_info_domain,
        t1.fk_info_range,
        t1.is_in_project_count
    From
        tw15 t1,
        system.class_has_type_property t2
    Where
        t1.fk_project Is Null
        And t1.fk_property = t2.fk_property
    Union
    Select
        t3.fk_project,
        t3.fk_property,
        t3.fk_info_domain,
        t3.fk_info_range,
        t3.is_in_project_count
    From
        tw15 t3,
        system.class_has_type_property t4
    Where
        t3.fk_project Is Not Null
        And t3.fk_property = t4.fk_property
    Order By
        1,
        2,
        3,
        5 Desc
),
-- join fk_type
tw17 As (
    Select
        t1.pk_entity,
        t1.fk_class,
        t1.fk_project,
        t1.table_name,
        t1.class_label,
        t1.own_full_text,
        t1.own_entity_label,
        t1.time_span,
        t1.related_full_texts,
        t1.fk_entity_label,
        t2.fk_info_range As fk_type,
        t1.first_second,
        t1.last_second
    From
        tw14 t1
    Left Join tw16 t2 On t1.pk_entity = t2.fk_info_domain
        And t1.fk_project Is Not Distinct From t2.fk_project
)
Select
    *
From
    tw17;

$$;


--
-- Name: entity_preview_non_recursive__delete(integer[], integer); Type: FUNCTION; Schema: warehouse; Owner: -
--

CREATE FUNCTION warehouse.entity_preview_non_recursive__delete(param_pk_entities integer[], param_fk_project integer) RETURNS void
    LANGUAGE sql
    AS $$

  /**
  * Delete the entity previews of the entities with given param_pk_entities
  * for the given param_fk_project
  */
  DELETE FROM  warehouse.entity_preview_non_recursive
  WHERE pk_entity = ANY(param_pk_entities)
  AND fk_project IS NOT DISTINCT FROM param_fk_project;

  /**
  * Clean up the repo
  * Delete repo entity_previews if the entity is removed from all projects
  */
  DELETE FROM  warehouse.entity_preview_non_recursive
  WHERE pk_entity IN (
    -- find entities that are in no project anymore
    SELECT pk_entity
    FROM warehouse.entity_preview_non_recursive
    WHERE pk_entity = ANY(param_pk_entities)
    EXCEPT
    SELECT pk_entity
    FROM warehouse.entity_preview_non_recursive
    WHERE pk_entity = ANY(param_pk_entities)
    AND fk_project IS NOT NULL
  )
  AND fk_project IS NULL;


$$;


--
-- Name: entity_preview_non_recursive__refresh(); Type: FUNCTION; Schema: warehouse; Owner: -
--

CREATE FUNCTION warehouse.entity_preview_non_recursive__refresh() RETURNS void
    LANGUAGE sql
    AS $$

    DELETE FROM warehouse.entity_preview_non_recursive;
    INSERT INTO warehouse.entity_preview_non_recursive
    SELECT * FROM warehouse.entity_preview_non_recursive__create_all();

$$;


--
-- Name: entity_preview_non_recursive__update_class_labels(integer, text); Type: FUNCTION; Schema: warehouse; Owner: -
--

CREATE FUNCTION warehouse.entity_preview_non_recursive__update_class_labels(pk_class integer, param_class_label text DEFAULT NULL::text) RETURNS boolean
    LANGUAGE plpgsql
    AS $$
  DECLARE
    new_class_label TEXT;
  BEGIN

    ---------------------- REPO & PROJECTS VERSIONS ----------------------

    RAISE INFO 'entity_preview_non_recursive__update_class_labels of pk_class: %', pk_class;

    -- get new_class_label
    IF (param_class_label IS NULL) THEN
      SELECT class_label INTO new_class_label
      FROM warehouse.class_preview
      WHERE dfh_pk_class = pk_class;
    ELSE
      new_class_label = param_class_label;
    END IF;

    RAISE INFO 'new_class_label: %', new_class_label;

    -- update all dependent entity_previews with new_class_label (if DISTINCT)
    UPDATE warehouse.entity_preview_non_recursive
    SET class_label = new_class_label
    WHERE fk_class = pk_class
    AND class_label IS DISTINCT FROM new_class_label;

    RETURN true;
  END;
  $$;


--
-- Name: entity_preview_non_recursive__upsert(integer[], integer); Type: FUNCTION; Schema: warehouse; Owner: -
--

CREATE FUNCTION warehouse.entity_preview_non_recursive__upsert(param_pk_entities integer[], param_fk_project integer) RETURNS void
    LANGUAGE sql
    AS $$

  /**
  * UPSERT the entity previews of the entities with given param_pk_entities
  * for the given param_fk_project and the repo version (fk_project = NULL)
  */
  INSERT INTO
  warehouse.entity_preview_non_recursive
  (
    SELECT * FROM warehouse.entity_preview_non_recursive__create(param_pk_entities)
    WHERE fk_project IS NULL OR fk_project = param_fk_project
  )
  ON CONFLICT (pk_entity, COALESCE(fk_project, 0))
    DO UPDATE
      SET
        fk_class = EXCLUDED.fk_class,
        table_name = EXCLUDED.table_name,
        class_label = EXCLUDED.class_label,
        own_full_text = EXCLUDED.own_full_text,
        own_entity_label = EXCLUDED.own_entity_label,
        time_span = EXCLUDED.time_span,
        first_second = EXCLUDED.first_second,
        last_second = EXCLUDED.last_second,
        related_full_texts = EXCLUDED.related_full_texts,
        fk_entity_label = EXCLUDED.fk_entity_label,
        fk_type = EXCLUDED.fk_type;

$$;


--
-- Name: entity_preview_update_queue_worker(); Type: FUNCTION; Schema: warehouse; Owner: -
--

CREATE FUNCTION warehouse.entity_preview_update_queue_worker() RETURNS boolean
    LANGUAGE plpgsql
    AS $$
Declare
    last_warehouse_update timestamp without time zone;
    last_project_modification timestamp without time zone;
    pk_update bigint;
    -- pk_entity of the update done by this function
Begin
    /*
     * Get the timestamp of the last warehouse.entity_preview_non_recursive update
     */
    Select
        tmsp_update_begin Into last_warehouse_update
    From
        warehouse.entity_preview_non_recursive_updates
    Order By
        pk_entity Desc
    Limit 1;
    -- set very early default
    If last_warehouse_update Is Null Then
        last_warehouse_update = '1970-01-01 00:00:00.000000'::timestamp;
    End If;

    /*
     * Get the timestamp of the last rojects.info_proj_rel modification
     */
    Select
        tmsp_last_modification::timestamp Into last_project_modification
    From
        projects.info_proj_rel
    Order By
        tmsp_last_modification Desc
    Limit 1;

    /*
     * Check if we need an update, i.e:
     * if last modification is newer than last update of warehouse
     */
    If (last_project_modification > last_warehouse_update) Then
        /*
         * Create a new record for this update.
         * the function now() is equivalent to transaction_timestamp() and
         * returns the start time of the current transaction.
         */
        Insert Into warehouse.entity_preview_non_recursive_updates (tmsp_update_begin)
        Values (now()::timestamp)
    Returning
        pk_entity Into pk_update;

        /*****
         * Perform the updates
         ******/
        Perform
            warehouse.do_updates_for_time_after (last_warehouse_update);

        /**********
         * Store the timestamp of after the update so that we have a log of the execution time
         * clock_timestamp() returns the actual current time,
         * and therefore its value changes even within a single SQL command.
         **********/
        Update
            warehouse.entity_preview_non_recursive_updates
        Set
            tmsp_update_end = clock_timestamp()::timestamp
        Where
            pk_entity = pk_update;

        /******
         * Return true for indicating that tehere has been an update
         *******/
        Return True;
    Else
        /*
         * Return false for indicating that there has been no update
         */
        Return False;
    End If;
End;
$$;


--
-- Name: needs_update(text, text[]); Type: FUNCTION; Schema: warehouse; Owner: -
--

CREATE FUNCTION warehouse.needs_update(fn_name text, fn_params text[]) RETURNS boolean
    LANGUAGE plpgsql
    AS $$
  DECLARE 
    fn_name_concat TEXT;
  BEGIN

    fn_name_concat = array_to_string(ARRAY['warehouse.', fn_name],'');

    PERFORM warehouse.notify_fn_call('warehouse_update_request'::text, fn_name_concat, fn_params);
  
  RETURN TRUE;

  END;
  $$;


--
-- Name: notify_fn_call(text, text, text[]); Type: FUNCTION; Schema: warehouse; Owner: -
--

CREATE FUNCTION warehouse.notify_fn_call(channel text, fn_name text, fn_params text[]) RETURNS boolean
    LANGUAGE plpgsql
    AS $$
  DECLARE 
    fn_concat TEXT;
  BEGIN

    fn_concat = fn_name || '(' || array_to_string(fn_params, ',', 'NULL'::text) || ')';

    PERFORM pg_notify(
      channel, 
      json_build_object('fn', fn_concat)::text
    );
  
  RETURN TRUE;

  END;
  $$;


--
-- Name: update_class_preview__on_class_profile_view_upsert(); Type: FUNCTION; Schema: warehouse; Owner: -
--

CREATE FUNCTION warehouse.update_class_preview__on_class_profile_view_upsert() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
  DECLARE
      label text;
      entity_type text;
  BEGIN

  INSERT INTO warehouse.class_preview (dfh_pk_class, class_label, entity_type)
  SELECT v.dfh_pk_class, v.class_label, v.entity_type
  FROM information.v_class_preview as v
  WHERE v.dfh_pk_class = NEW.dfh_fk_class
  ON CONFLICT ON CONSTRAINT dfh_pk_class_unique
    DO
      UPDATE
        SET (class_label, entity_type) = (
            SELECT v.class_label, v.entity_type
            FROM information.v_class_preview as v
            WHERE v.dfh_pk_class = NEW.dfh_fk_class
          );

  RETURN NEW;

  END;
  $$;


--
-- Name: update_class_preview__on_label_delete(); Type: FUNCTION; Schema: warehouse; Owner: -
--

CREATE FUNCTION warehouse.update_class_preview__on_label_delete() RETURNS trigger
    LANGUAGE plpgsql
    AS $$ BEGIN

  -- If it is a geovistory class label
  IF (OLD.dfh_fk_class IS NOT NULL AND OLD.com_fk_system_type = 184) THEN

    UPDATE warehouse.class_preview
    SET class_label = (
      SELECT dfh_standard_label 
      FROM data_for_history.class
      WHERE dfh_pk_class = OLD.dfh_fk_class
      )
    WHERE dfh_pk_class = OLD.dfh_fk_class;

  END IF;

  RETURN OLD;

  END;
  $$;


--
-- Name: update_class_preview__on_label_upsert(); Type: FUNCTION; Schema: warehouse; Owner: -
--

CREATE FUNCTION warehouse.update_class_preview__on_label_upsert() RETURNS trigger
    LANGUAGE plpgsql
    AS $$ BEGIN

  
  -- If it is a geovistory class label
  IF ( NEW.dfh_fk_class IS NOT NULL AND NEW.com_fk_system_type = 184) THEN
  
    UPDATE warehouse.class_preview
    SET class_label = NEW.dfh_label
    WHERE dfh_pk_class = NEW.dfh_fk_class;
    
  END IF;

  RETURN NEW;

  END;
  $$;


--
-- Name: class_preview; Type: TABLE; Schema: warehouse; Owner: -
--

CREATE TABLE warehouse.class_preview (
    class_label character varying,
    entity_type text,
    dfh_pk_class integer
);


--
-- Name: entity_preview; Type: TABLE; Schema: warehouse; Owner: -
--

CREATE TABLE warehouse.entity_preview (
    pk_entity integer,
    fk_project integer,
    project integer,
    fk_class integer,
    entity_type text,
    class_label character varying,
    entity_label text,
    time_span jsonb,
    own_full_text text,
    fk_entity_label integer,
    fk_type integer,
    type_label text,
    related_full_texts jsonb,
    full_text text,
    ts_vector tsvector,
    skip_triggers boolean,
    first_second bigint,
    last_second bigint
);


--
-- Name: entity_preview_non_recursive_updates; Type: TABLE; Schema: warehouse; Owner: -
--

CREATE TABLE warehouse.entity_preview_non_recursive_updates (
    pk_entity integer NOT NULL,
    tmsp_update_begin timestamp without time zone,
    tmsp_update_end timestamp without time zone
);


--
-- Name: entity_preview_non_recursive_updates_pk_entity_seq; Type: SEQUENCE; Schema: warehouse; Owner: -
--

CREATE SEQUENCE warehouse.entity_preview_non_recursive_updates_pk_entity_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: entity_preview_non_recursive_updates_pk_entity_seq; Type: SEQUENCE OWNED BY; Schema: warehouse; Owner: -
--

ALTER SEQUENCE warehouse.entity_preview_non_recursive_updates_pk_entity_seq OWNED BY warehouse.entity_preview_non_recursive_updates.pk_entity;


--
-- Name: v_entity_association_per_project_and_repo; Type: VIEW; Schema: warehouse; Owner: -
--

CREATE VIEW warehouse.v_entity_association_per_project_and_repo AS
 SELECT DISTINCT ea.pk_entity,
    ea.fk_info_domain,
    ea.fk_info_range,
    ea.fk_data_domain,
    ea.fk_data_range,
    ea.fk_property,
    epr.fk_project,
    COALESCE(epr.fk_project, 0) AS project,
    ea.is_in_project_count
   FROM information.v_entity_association ea,
    projects.info_proj_rel epr
  WHERE ((epr.fk_entity = ea.pk_entity) AND (epr.is_in_project = true))
UNION
 SELECT DISTINCT ea.pk_entity,
    ea.fk_info_domain,
    ea.fk_info_range,
    ea.fk_data_domain,
    ea.fk_data_range,
    ea.fk_property,
    NULL::integer AS fk_project,
    0 AS project,
    ea.is_in_project_count
   FROM information.v_entity_association ea
  WHERE (ea.is_in_project_count > 0);


--
-- Name: v_roles_per_project_and_repo; Type: VIEW; Schema: warehouse; Owner: -
--

CREATE VIEW warehouse.v_roles_per_project_and_repo AS
 WITH tw1 AS (
         SELECT t1.pk_entity,
            t1.fk_property,
            t1.fk_entity,
            t1.fk_temporal_entity,
            t2.is_in_project_count,
            t1.notes,
            t1.tmsp_creation,
            t1.tmsp_last_modification,
            t1.sys_period
           FROM (information.role t1
             LEFT JOIN LATERAL ( SELECT (count(info_proj_rel.pk_entity))::integer AS is_in_project_count
                   FROM projects.info_proj_rel
                  WHERE ((info_proj_rel.fk_entity = t1.pk_entity) AND (info_proj_rel.is_in_project = true))
                  GROUP BY info_proj_rel.fk_entity) t2 ON (true))
        )
 SELECT t1.pk_entity,
    t1.fk_entity,
    t1.fk_temporal_entity,
    t1.fk_property,
    t2.fk_project,
    COALESCE(t2.fk_project, 0) AS project,
    t2.ord_num_of_domain,
    t2.ord_num_of_range,
    t1.is_in_project_count
   FROM tw1 t1,
    projects.info_proj_rel t2
  WHERE ((t2.fk_entity = t1.pk_entity) AND (t2.is_in_project = true))
UNION
 SELECT t1.pk_entity,
    t1.fk_entity,
    t1.fk_temporal_entity,
    t1.fk_property,
    NULL::integer AS fk_project,
    0 AS project,
    NULL::integer AS ord_num_of_domain,
    NULL::integer AS ord_num_of_range,
    t1.is_in_project_count
   FROM tw1 t1
  WHERE (t1.is_in_project_count > 0);


--
-- Name: entity_preview_non_recursive_updates pk_entity; Type: DEFAULT; Schema: warehouse; Owner: -
--

ALTER TABLE ONLY warehouse.entity_preview_non_recursive_updates ALTER COLUMN pk_entity SET DEFAULT nextval('warehouse.entity_preview_non_recursive_updates_pk_entity_seq'::regclass);


--
-- Name: class_preview dfh_pk_class_unique; Type: CONSTRAINT; Schema: warehouse; Owner: -
--

ALTER TABLE ONLY warehouse.class_preview
    ADD CONSTRAINT dfh_pk_class_unique UNIQUE (dfh_pk_class);


--
-- Name: entity_preview entity_preview_unique; Type: CONSTRAINT; Schema: warehouse; Owner: -
--

ALTER TABLE ONLY warehouse.entity_preview
    ADD CONSTRAINT entity_preview_unique UNIQUE (pk_entity, project);


--
-- Name: entity_preview_first_second_idx; Type: INDEX; Schema: warehouse; Owner: -
--

CREATE INDEX entity_preview_first_second_idx ON warehouse.entity_preview USING hash (first_second);


--
-- Name: entity_preview_fk_class_idx; Type: INDEX; Schema: warehouse; Owner: -
--

CREATE INDEX entity_preview_fk_class_idx ON warehouse.entity_preview USING btree (fk_class);


--
-- Name: entity_preview_fk_project_idx; Type: INDEX; Schema: warehouse; Owner: -
--

CREATE INDEX entity_preview_fk_project_idx ON warehouse.entity_preview USING btree (fk_project);


--
-- Name: entity_preview_last_second_idx; Type: INDEX; Schema: warehouse; Owner: -
--

CREATE INDEX entity_preview_last_second_idx ON warehouse.entity_preview USING hash (last_second);


--
-- Name: entity_preview_pk_entity_idx; Type: INDEX; Schema: warehouse; Owner: -
--

CREATE INDEX entity_preview_pk_entity_idx ON warehouse.entity_preview USING btree (pk_entity);


--
-- Name: entity_preview_project_idx; Type: INDEX; Schema: warehouse; Owner: -
--

CREATE INDEX entity_preview_project_idx ON warehouse.entity_preview USING btree (project);


--
-- Name: pk_entity_fk_project_unique; Type: INDEX; Schema: warehouse; Owner: -
--

CREATE UNIQUE INDEX pk_entity_fk_project_unique ON warehouse.entity_preview_non_recursive USING btree (pk_entity, COALESCE(fk_project, 0));


--
-- Name: class_preview after_update_on_class_preview__class_label; Type: TRIGGER; Schema: warehouse; Owner: -
--

CREATE TRIGGER after_update_on_class_preview__class_label AFTER UPDATE OF class_label ON warehouse.class_preview FOR EACH ROW EXECUTE PROCEDURE warehouse.entity_preview__update_dependent_class_labels();


--
-- Name: entity_preview after_upsert_on_entity_preview; Type: TRIGGER; Schema: warehouse; Owner: -
--

CREATE TRIGGER after_upsert_on_entity_preview AFTER INSERT OR UPDATE OF entity_label, class_label, time_span, type_label ON warehouse.entity_preview FOR EACH ROW WHEN (((new.project IS NOT NULL) AND (new.fk_class IS NOT NULL) AND (new.entity_type IS NOT NULL))) EXECUTE PROCEDURE warehouse.entity_preview__notify_upsert();

ALTER TABLE warehouse.entity_preview DISABLE TRIGGER after_upsert_on_entity_preview;

/**
* ADD SCHEMA WAREHOUSE END
**/


-- trigger after_insert_or_update on table data_for_history.class_profile_view depends on function warehouse.update_class_preview__on_class_profile_view_upsert()
CREATE TRIGGER after_insert_or_update
    AFTER INSERT OR UPDATE 
    ON data_for_history.class_profile_view
    FOR EACH ROW
    EXECUTE PROCEDURE warehouse.update_class_preview__on_class_profile_view_upsert();

-- trigger after_delete on table data_for_history.label depends on function warehouse.update_class_preview__on_label_delete()
CREATE TRIGGER after_delete
    AFTER DELETE
    ON data_for_history.label
    FOR EACH ROW
    EXECUTE PROCEDURE warehouse.update_class_preview__on_label_delete();

-- trigger after_insert_or_update on table data_for_history.label depends on function warehouse.update_class_preview__on_label_upsert()
CREATE TRIGGER after_insert_or_update
    AFTER INSERT OR UPDATE 
    ON data_for_history.label
    FOR EACH ROW
    EXECUTE PROCEDURE warehouse.update_class_preview__on_label_upsert();