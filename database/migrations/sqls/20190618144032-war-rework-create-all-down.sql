
CREATE OR REPLACE FUNCTION warehouse.entity_preview__create_all(
	)
    RETURNS boolean
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE
AS $BODY$

    DECLARE
      item record;
      results warehouse.entity_preview;
      t timestamptz;
      number_of_unfinished INT;
    BEGIN

    t = clock_timestamp();

    -- empty table entity_preview
    DELETE from warehouse.entity_preview;

    -- init temp table
    DROP TABLE IF EXISTS warehouse.temp;
    CREATE TABLE warehouse.temp AS SELECT * FROM warehouse.v_entity_preview;

    WITH previews_non_recursive AS (
      SELECT * FROM warehouse.temp
      ),
      fill_entity_label AS (
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
      FROM previews_non_recursive t1
      LEFT JOIN previews_non_recursive t2
      ON t1.fk_entity_label = t2.pk_entity
      AND t1.project = t2.project
      ),
      fill_type_label AS (
      SELECT
      t1.*,
      t2.entity_label type_label
      FROM fill_entity_label t1
      LEFT JOIN fill_entity_label t2
      ON t1.fk_type = t2.pk_entity
      AND t1.project = t2.project
      ),
    full_text_dependencies AS (
      SELECT r.fk_temporal_entity as pk_entity, r.project, r.fk_project, e.pk_entity as pk_related_full_text, pre.own_full_text
      FROM warehouse.v_roles_per_project_and_repo r
      JOIN information.entity e ON e.pk_entity = r.fk_entity AND e.table_name = 'persistent_item'
      LEFT JOIN previews_non_recursive pre ON pre.pk_entity = e.pk_entity AND pre.project = r.project
      UNION
      SELECT r.fk_entity as pk_entity, r.project,  r.fk_project,  e.pk_entity as pk_related_full_text, pre.own_full_text
      FROM warehouse.v_roles_per_project_and_repo r
      JOIN information.entity e ON e.pk_entity = r.fk_temporal_entity AND e.table_name = 'temporal_entity'
      LEFT JOIN previews_non_recursive pre ON pre.pk_entity = e.pk_entity AND pre.project = r.project
      ),
      aggregated_related_full_texts AS(
      select pk_entity, project, fk_project, jsonb_object_agg(full_text_dependencies.pk_related_full_text::text, full_text_dependencies.own_full_text) related_full_texts
      FROM full_text_dependencies
      group by pk_entity, project, fk_project
      ),
      related_full_text AS (
      SELECT t1.*, t2.related_full_texts
      FROM fill_type_label t1
      LEFT JOIN aggregated_related_full_texts t2
      ON t1.pk_entity = t2.pk_entity
      AND t1.project = t2.project
      ),
      add_full_text AS (
      SELECT
        *,
        (
        SELECT array_to_string(ARRAY[
          --coalesce(f.type_label, f.class_label, ''),
          f.own_full_text,
          array_to_string(array_agg(value), ', ')
        ]::text[] , ', ')
        FROM jsonb_each_text(f.related_full_texts)
        ) as full_text
      FROM related_full_text  f
      ),
      add_ts_vector AS (
      SELECT
        t.*,
        setweight(to_tsvector(coalesce(t.entity_label, '')), 'A') ||
        setweight(to_tsvector(coalesce(t.type_label, t.class_label, '')), 'B') ||
        setweight(to_tsvector(coalesce(t.full_text,'')), 'C') as ts_vector
      FROM add_full_text t
      ),
      updated AS (
        SELECT * FROM add_ts_vector
    )
    UPDATE warehouse.temp
    SET entity_label = updated.entity_label
    FROM updated
    WHERE temp.pk_entity = updated.pk_entity
    AND temp.fk_project IS NOT DISTINCT FROM updated.fk_project;

    SELECT count(*) INTO number_of_unfinished
    FROM warehouse.temp a
    JOIN warehouse.temp b ON a.fk_entity_label = b.pk_entity AND a.entity_label IS DISTINCT FROM b.entity_label
    AND a.project = b.project;

    raise notice 'number_of_unfinished entity_previews (if zero, everything fine): %', number_of_unfinished;


    -- empty table entity_preview
    DELETE from warehouse.entity_preview;

    INSERT INTO warehouse.entity_preview  (
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
    )
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
    FROM  warehouse.temp;

    DROP TABLE warehouse.temp;

    raise notice 'time spent for entity_preview__fill_own_full_text=%', clock_timestamp() - t;


    RETURN TRUE;

    END;
    $BODY$;
