
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

    -- create temporary tables to create the temp_entity_preview_non_recursive
    CREATE TEMP TABLE temp_entities AS SELECT * FROM warehouse.v_entities;
    CREATE TEMP TABLE temp_own_entity_label AS SELECT * FROM warehouse.v_own_entity_label;
    CREATE TEMP TABLE temp_te_en_time_span_per_project_and_repo AS SELECT * FROM warehouse.v_te_en_time_span_per_project_and_repo;
    CREATE TEMP TABLE temp_own_full_text AS SELECT * FROM warehouse.v_own_full_text;
    CREATE TEMP TABLE temp_fk_entity_label AS SELECT * FROM warehouse.v_fk_entity_label;
    CREATE TEMP TABLE temp_fk_type AS SELECT * FROM warehouse.v_fk_type;

    -- create temporary table with previews non recursive
    CREATE TEMP TABLE temp_entity_preview_non_recursive AS
        WITH entities AS (
            SELECT temp_entities.pk_entity,
                temp_entities.fk_project,
                temp_entities.project,
                temp_entities.fk_class,
                temp_entities.table_name,
                temp_entities.entity_type
              FROM temp_entities
            ), add_class_label AS (
            SELECT entities.pk_entity,
                entities.fk_project,
                entities.project,
                entities.fk_class,
                entities.table_name,
                entities.entity_type,
                c.class_label
              FROM entities
                JOIN warehouse.class_preview c ON c.dfh_pk_class = entities.fk_class
            ), add_own_entity_label AS (
            SELECT a.pk_entity,
                a.fk_project,
                a.project,
                a.fk_class,
                a.table_name,
                a.entity_type,
                a.class_label,
                l.entity_label
              FROM add_class_label a
                LEFT JOIN temp_own_entity_label l ON a.pk_entity = l.pk_entity AND a.project = l.project
            ), add_time_span AS (
            SELECT a.pk_entity,
                a.fk_project,
                a.project,
                a.fk_class,
                a.table_name,
                a.entity_type,
                a.class_label,
                a.entity_label,
                t.time_span
              FROM add_own_entity_label a
                LEFT JOIN temp_te_en_time_span_per_project_and_repo t ON a.pk_entity = t.fk_temporal_entity AND NOT a.fk_project IS DISTINCT FROM t.fk_project
            ), add_own_full_text AS (
            SELECT a.pk_entity,
                a.fk_project,
                a.project,
                a.fk_class,
                a.table_name,
                a.entity_type,
                a.class_label,
                a.entity_label,
                a.time_span,
                t.own_full_text
              FROM add_time_span a
                LEFT JOIN temp_own_full_text t ON a.pk_entity = t.pk_entity AND a.project = t.project
            ), add_fk_entity_label AS (
            SELECT a.pk_entity,
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
              FROM add_own_full_text a
                LEFT JOIN temp_fk_entity_label t ON a.pk_entity = t.pk_entity AND NOT a.fk_project IS DISTINCT FROM t.fk_project
            ), add_fk_type AS (
            SELECT a.pk_entity,
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
              FROM add_fk_entity_label a
                LEFT JOIN temp_fk_type t ON a.pk_entity = t.pk_entity AND a.project = t.project
            )
    SELECT add_fk_type.pk_entity,
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
      FROM add_fk_type;



    -- init temp table
    DROP TABLE IF EXISTS warehouse.temp;
    CREATE TABLE warehouse.temp AS
		WITH fill_entity_label AS (
			 SELECT t1.pk_entity,
				t1.fk_project,
				t1.project,
				t1.fk_class,
				t1.entity_type,
				t1.class_label,
				COALESCE(t1.entity_label, t2.entity_label) AS entity_label,
				t1.time_span,
				t1.own_full_text,
				t1.fk_entity_label,
				t1.fk_type
			   FROM temp_entity_preview_non_recursive t1
				 LEFT JOIN temp_entity_preview_non_recursive t2 ON t1.fk_entity_label = t2.pk_entity AND t1.project = t2.project
			), fill_type_label AS (
			 SELECT t1.pk_entity,
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
			   FROM fill_entity_label t1
				 LEFT JOIN fill_entity_label t2 ON t1.fk_type = t2.pk_entity AND t1.project = t2.project
			), full_text_dependencies AS (
			 SELECT r.fk_temporal_entity AS pk_entity,
				r.project,
				r.fk_project,
				e.pk_entity AS pk_related_full_text,
				pre.own_full_text
			   FROM warehouse.v_roles_per_project_and_repo r
				 JOIN information.entity e ON e.pk_entity = r.fk_entity AND e.table_name::text = 'persistent_item'::text
				 LEFT JOIN temp_entity_preview_non_recursive pre ON pre.pk_entity = e.pk_entity AND pre.project = r.project
			UNION
			 SELECT r.fk_entity AS pk_entity,
				r.project,
				r.fk_project,
				e.pk_entity AS pk_related_full_text,
				pre.own_full_text
			   FROM warehouse.v_roles_per_project_and_repo r
				 JOIN information.entity e ON e.pk_entity = r.fk_temporal_entity AND e.table_name::text = 'temporal_entity'::text
				 LEFT JOIN temp_entity_preview_non_recursive pre ON pre.pk_entity = e.pk_entity AND pre.project = r.project
			), aggregated_related_full_texts AS (
			 SELECT full_text_dependencies.pk_entity,
				full_text_dependencies.project,
				full_text_dependencies.fk_project,
				jsonb_object_agg(full_text_dependencies.pk_related_full_text::text, full_text_dependencies.own_full_text) AS related_full_texts
			   FROM full_text_dependencies
			  GROUP BY full_text_dependencies.pk_entity, full_text_dependencies.project, full_text_dependencies.fk_project
			), related_full_text AS (
			 SELECT t1.pk_entity,
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
			   FROM fill_type_label t1
				 LEFT JOIN aggregated_related_full_texts t2 ON t1.pk_entity = t2.pk_entity AND t1.project = t2.project
			), add_full_text AS (
			 SELECT f.pk_entity,
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
				( SELECT array_to_string(ARRAY[f.own_full_text, array_to_string(array_agg(jsonb_each_text.value), ', '::text)], ', '::text) AS array_to_string
					   FROM jsonb_each_text(f.related_full_texts) jsonb_each_text(key, value)) AS full_text
			   FROM related_full_text f
			), add_ts_vector AS (
			 SELECT t.pk_entity,
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
				(setweight(to_tsvector(COALESCE(t.entity_label, ''::text)), 'A'::"char") || setweight(to_tsvector(COALESCE(t.type_label, t.class_label::text, ''::text)), 'B'::"char")) || setweight(to_tsvector(COALESCE(t.full_text, ''::text)), 'C'::"char") AS ts_vector
			   FROM add_full_text t
			)
	 SELECT add_ts_vector.pk_entity,
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
	   FROM add_ts_vector;



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
      FROM warehouse.temp t1
      LEFT JOIN warehouse.temp t2
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
      LEFT JOIN warehouse.temp pre ON pre.pk_entity = e.pk_entity AND pre.project = r.project
      UNION
      SELECT r.fk_entity as pk_entity, r.project,  r.fk_project,  e.pk_entity as pk_related_full_text, pre.own_full_text
      FROM warehouse.v_roles_per_project_and_repo r
      JOIN information.entity e ON e.pk_entity = r.fk_temporal_entity AND e.table_name = 'temporal_entity'
      LEFT JOIN warehouse.temp pre ON pre.pk_entity = e.pk_entity AND pre.project = r.project
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
