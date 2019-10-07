-- 4

CREATE OR REPLACE VIEW warehouse.v_text_properties_per_project_and_repo AS
 SELECT t1.pk_entity,
    t1.schema_name,
    t1.table_name,
    t1.notes,
    t1.fk_creator,
    t1.fk_last_modifier,
    t1.tmsp_creation,
    t1.tmsp_last_modification,
    t1.sys_period,
    t1.fk_concerned_entity,
    t1.fk_language,
    t1.fk_class_field,
    t1.quill_doc,
    t1.string,
    t1.is_in_project_count,
    t2.fk_project,
    COALESCE(t2.fk_project, 0) AS "coalesce",
    t2.ord_num_of_text_property
   FROM information.v_text_property t1,
    projects.info_proj_rel t2
  WHERE t2.fk_entity = t1.pk_entity AND t2.is_in_project = true
UNION
 SELECT t1.pk_entity,
    t1.schema_name,
    t1.table_name,
    t1.notes,
    t1.fk_creator,
    t1.fk_last_modifier,
    t1.tmsp_creation,
    t1.tmsp_last_modification,
    t1.sys_period,
    t1.fk_concerned_entity,
    t1.fk_language,
    t1.fk_class_field,
    t1.quill_doc,
    t1.string,
    t1.is_in_project_count,
    NULL::integer AS fk_project,
    0 AS "coalesce",
    NULL::integer AS ord_num_of_text_property
   FROM information.v_text_property t1
  WHERE t1.is_in_project_count > 0;


CREATE OR REPLACE VIEW warehouse.v_te_en_time_span_per_project_and_repo AS
 WITH role_with_time_primitive AS (
         SELECT r.fk_temporal_entity,
            r.fk_property,
            epr.fk_project,
            epr.calendar,
            tp.julian_day,
            tp.duration
           FROM information.role r,
            projects.info_proj_rel epr,
            information.v_time_primitive tp
          WHERE r.pk_entity = epr.fk_entity AND (r.fk_property = ANY (ARRAY[71, 72, 150, 151, 152, 153])) AND tp.pk_entity = r.fk_entity AND epr.is_in_project = true
        UNION
        ( SELECT DISTINCT ON (r.fk_temporal_entity, r.fk_property) r.fk_temporal_entity,
            r.fk_property,
            NULL::integer AS fk_project,
            r.community_favorite_calendar,
            tp.julian_day,
            tp.duration
           FROM information.v_role r
             JOIN information.v_time_primitive tp ON tp.pk_entity = r.fk_entity
          WHERE r.fk_property = ANY (ARRAY[71, 72, 150, 151, 152, 153])
          ORDER BY r.fk_temporal_entity, r.fk_property, r.is_in_project_count DESC, r.tmsp_creation DESC)
        )
 SELECT role_with_time_primitive.fk_project,
    role_with_time_primitive.fk_temporal_entity,
    jsonb_object_agg(
        CASE
            WHEN role_with_time_primitive.fk_property = 71 THEN 'p81'::text
            WHEN role_with_time_primitive.fk_property = 72 THEN 'p82'::text
            WHEN role_with_time_primitive.fk_property = 150 THEN 'p81a'::text
            WHEN role_with_time_primitive.fk_property = 151 THEN 'p81b'::text
            WHEN role_with_time_primitive.fk_property = 152 THEN 'p82a'::text
            WHEN role_with_time_primitive.fk_property = 153 THEN 'p82b'::text
            ELSE role_with_time_primitive.fk_property::text
        END, json_build_object('julianDay', role_with_time_primitive.julian_day, 'duration', role_with_time_primitive.duration, 'calendar', role_with_time_primitive.calendar)) AS time_span
   FROM role_with_time_primitive
  GROUP BY role_with_time_primitive.fk_project, role_with_time_primitive.fk_temporal_entity;

CREATE OR REPLACE VIEW warehouse.v_related_full_texts AS
 SELECT t1.fk_entity AS pk_entity,
    t1.project,
    t1.fk_project,
    jsonb_object_agg(t1.fk_temporal_entity::text, NULL::unknown) AS related_full_texts
   FROM warehouse.v_roles_per_project_and_repo t1
  GROUP BY t1.fk_entity, t1.fk_project, t1.project
UNION
 SELECT t1.fk_temporal_entity AS pk_entity,
    t1.project,
    t1.fk_project,
    jsonb_object_agg(t1.fk_entity::text, NULL::unknown) AS related_full_texts
   FROM warehouse.v_roles_per_project_and_repo t1,
    information.persistent_item t2
  WHERE t1.fk_entity = t2.pk_entity
  GROUP BY t1.fk_temporal_entity, t1.fk_project, t1.project;


CREATE OR REPLACE VIEW warehouse.v_own_full_text AS
 WITH tw1 AS (
         SELECT t1.fk_temporal_entity AS pk_entity,
            t1.fk_project,
            t1.project,
            COALESCE(t2.string, t3.notes) AS string,
            t5.field_order,
            t1.ord_num_of_domain AS ord_num,
            t1.is_in_project_count
           FROM warehouse.v_roles_per_project_and_repo t1
             LEFT JOIN information.appellation t2 ON t1.fk_entity = t2.pk_entity
             LEFT JOIN information.language t3 ON t1.fk_entity = t3.pk_entity
             JOIN information.temporal_entity t4 ON t1.fk_temporal_entity = t4.pk_entity
             JOIN information.v_ordered_fields_per_class t5 ON t5.fk_property = t1.fk_property AND t5.fk_class = t4.fk_class AND t5.field_order IS NOT NULL
        UNION ALL
         SELECT t1.fk_concerned_entity AS pk_entity,
            t1.fk_project,
            t1."coalesce" AS project,
            t1.string,
            t2.field_order,
            t1.ord_num_of_text_property AS ord_num,
            t1.is_in_project_count
           FROM warehouse.v_text_properties_per_project_and_repo t1,
            information.v_ordered_fields_per_class t2
          WHERE t1.fk_class_field = t2.fk_class_field
        ), tw2 AS (
         SELECT DISTINCT ON (tw1.pk_entity, tw1.fk_project, tw1.string) tw1.pk_entity,
            tw1.fk_project,
            tw1.project,
            tw1.string,
            tw1.field_order,
            tw1.ord_num,
            tw1.is_in_project_count
           FROM tw1
        )
 SELECT tw2.pk_entity,
    tw2.fk_project,
    tw2.project,
    string_agg(tw2.string, ', '::text ORDER BY tw2.field_order, tw2.ord_num, tw2.is_in_project_count DESC) AS own_full_text
   FROM tw2
  GROUP BY tw2.pk_entity, tw2.fk_project, tw2.project;


CREATE OR REPLACE VIEW warehouse.v_own_entity_label AS
 WITH tw1 AS (
         SELECT t1.fk_temporal_entity AS pk_entity,
            t1.fk_project,
            t1.project,
            COALESCE(t2.string, t3.notes) AS string,
            t5.field_order,
            t1.ord_num_of_domain AS ord_num,
            t1.is_in_project_count
           FROM warehouse.v_roles_per_project_and_repo t1
             LEFT JOIN information.appellation t2 ON t1.fk_entity = t2.pk_entity
             LEFT JOIN information.language t3 ON t1.fk_entity = t3.pk_entity
             JOIN information.temporal_entity t4 ON t1.fk_temporal_entity = t4.pk_entity
             JOIN information.v_ordered_fields_per_class t5 ON t5.fk_property = t1.fk_property AND t5.fk_class = t4.fk_class AND t5.field_order = 0
        UNION ALL
         SELECT t1.fk_concerned_entity AS pk_entity,
            t1.fk_project,
            t1."coalesce" AS project,
            t1.string,
            t2.field_order,
            t1.ord_num_of_text_property AS ord_num,
            t1.is_in_project_count
           FROM warehouse.v_text_properties_per_project_and_repo t1,
            information.v_ordered_fields_per_class t2
          WHERE t1.fk_class_field = t2.fk_class_field AND t2.field_order = 0
        )
 SELECT DISTINCT ON (tw1.pk_entity, tw1.fk_project) tw1.pk_entity,
    tw1.fk_project,
    tw1.string AS entity_label,
    tw1.project
   FROM tw1
  ORDER BY tw1.pk_entity, tw1.fk_project, tw1.field_order, tw1.ord_num, tw1.is_in_project_count DESC;



CREATE OR REPLACE VIEW warehouse.v_fk_entity_label AS
 WITH tw1 AS (
         SELECT temporal_entity.pk_entity,
            temporal_entity.fk_class,
            'temporal_entity'::character varying AS table_name,
            'teEnt'::text AS entity_type
           FROM information.temporal_entity
        UNION
         SELECT persistent_item.pk_entity,
            persistent_item.fk_class,
            'persistent_item'::character varying AS table_name,
            'peIt'::text AS entity_type
           FROM information.persistent_item
        )
 SELECT DISTINCT ON (t1.pk_entity, t3.fk_project, t4.fk_project, t1.fk_class) t1.pk_entity,
    COALESCE(t3.fk_project, t4.fk_project) AS fk_project,
    COALESCE(t3.fk_project, t4.fk_project, 0) AS project,
    t1.fk_class,
    t1.table_name,
    t1.entity_type,
    COALESCE(t4.fk_temporal_entity,
        CASE
            WHEN t5.table_name::text = ANY (ARRAY['persistent_item'::character varying::text, 'temporal_entity'::character varying::text]) THEN t3.fk_entity
            ELSE NULL::integer
        END) AS fk_entity_label
   FROM tw1 t1
     JOIN information.v_ordered_fields_per_class t2 ON t1.fk_class = t2.fk_class
     LEFT JOIN warehouse.v_roles_per_project_and_repo t3 ON t2.fk_property = t3.fk_property AND t1.pk_entity = t3.fk_temporal_entity
     LEFT JOIN information.entity t5 ON t3.fk_entity = t5.pk_entity
     LEFT JOIN warehouse.v_roles_per_project_and_repo t4 ON t2.fk_property = t4.fk_property AND t1.pk_entity = t4.fk_entity
  WHERE t2.field_order = 0
  ORDER BY t1.pk_entity, t3.fk_project, t4.fk_project, t1.fk_class, t2.field_order, t3.ord_num_of_domain, t4.ord_num_of_domain, t3.is_in_project_count DESC, t4.is_in_project_count DESC;

CREATE OR REPLACE VIEW warehouse.v_fk_type AS
 WITH tw1 AS (
         SELECT DISTINCT ON (t1.fk_project, t1.fk_property, t1.fk_info_domain) t1.fk_project,
            t1.fk_property,
            t1.fk_info_domain,
            t1.fk_info_range,
            t1.is_in_project_count
           FROM warehouse.v_entity_association_per_project_and_repo t1,
            system.class_has_type_property t2
          WHERE t1.fk_project IS NULL AND t1.fk_property = t2.fk_property
        UNION
         SELECT t3.fk_project,
            t3.fk_property,
            t3.fk_info_domain,
            t3.fk_info_range,
            t3.is_in_project_count
           FROM warehouse.v_entity_association_per_project_and_repo t3,
            system.class_has_type_property t4
          WHERE t3.fk_project IS NOT NULL AND t3.fk_property = t4.fk_property
  ORDER BY 1, 2, 3, 5 DESC
        )
 SELECT DISTINCT ON (tw1.fk_info_domain, tw1.fk_project) tw1.fk_info_domain AS pk_entity,
    tw1.fk_project,
    COALESCE(tw1.fk_project, 0) AS project,
    tw1.fk_info_range AS fk_type
   FROM tw1;

CREATE OR REPLACE VIEW warehouse.v_entities AS
 WITH tw1 AS (
         SELECT persistent_item.pk_entity,
            persistent_item.fk_class,
            'persistent_item'::character varying AS table_name,
            'peIt'::text AS entity_type
           FROM information.persistent_item
        UNION
         SELECT temporal_entity.pk_entity,
            temporal_entity.fk_class,
            'temporal_entity'::character varying AS table_name,
            'teEn'::text AS entity_type
           FROM information.temporal_entity
        )
 SELECT tw1.pk_entity,
    epr.fk_project,
    epr.fk_project AS project,
    tw1.fk_class,
    tw1.table_name,
    tw1.entity_type
   FROM projects.info_proj_rel epr,
    tw1
  WHERE epr.is_in_project = true AND tw1.pk_entity = epr.fk_entity
UNION
 SELECT tw1.pk_entity,
    NULL::integer AS fk_project,
    0 AS project,
    tw1.fk_class,
    tw1.table_name,
    tw1.entity_type
   FROM tw1;

CREATE OR REPLACE VIEW warehouse.v_entity_preview_non_recursive AS
 SELECT DISTINCT ON (t1.pk_entity, t1.fk_project) t1.pk_entity,
    t1.fk_project,
    t1.project,
    t1.fk_class,
    t1.table_name,
    t1.entity_type,
    t2.class_label,
    t3.entity_label,
    t4.time_span,
    t5.own_full_text,
    t6.fk_entity_label,
    t7.fk_type,
    t8.related_full_texts
   FROM warehouse.v_entities t1
     LEFT JOIN warehouse.class_preview t2 ON t2.dfh_pk_class = t1.fk_class
     LEFT JOIN warehouse.v_own_entity_label t3 ON t1.pk_entity = t3.pk_entity AND NOT t1.fk_project IS DISTINCT FROM t3.fk_project
     LEFT JOIN warehouse.v_te_en_time_span_per_project_and_repo t4 ON t1.pk_entity = t4.fk_temporal_entity AND NOT t1.fk_project IS DISTINCT FROM t4.fk_project
     LEFT JOIN warehouse.v_own_full_text t5 ON t1.pk_entity = t5.pk_entity AND NOT t1.fk_project IS DISTINCT FROM t5.fk_project
     LEFT JOIN warehouse.v_fk_entity_label t6 ON t1.pk_entity = t6.pk_entity AND NOT t1.fk_project IS DISTINCT FROM t6.fk_project
     LEFT JOIN warehouse.v_fk_type t7 ON t1.pk_entity = t7.pk_entity AND NOT t1.fk_project IS DISTINCT FROM t7.fk_project
     LEFT JOIN warehouse.v_related_full_texts t8 ON t1.pk_entity = t8.pk_entity AND NOT t1.fk_project IS DISTINCT FROM t8.fk_project;


CREATE OR REPLACE VIEW warehouse.v_entity_preview AS
 WITH previews_non_recursive AS (
         SELECT v_entity_preview_non_recursive.pk_entity,
            v_entity_preview_non_recursive.fk_project,
            v_entity_preview_non_recursive.project,
            v_entity_preview_non_recursive.fk_class,
            v_entity_preview_non_recursive.table_name,
            v_entity_preview_non_recursive.entity_type,
            v_entity_preview_non_recursive.class_label,
            v_entity_preview_non_recursive.entity_label,
            v_entity_preview_non_recursive.time_span,
            v_entity_preview_non_recursive.own_full_text,
            v_entity_preview_non_recursive.fk_entity_label,
            v_entity_preview_non_recursive.fk_type
           FROM warehouse.v_entity_preview_non_recursive
        ), fill_entity_label AS (
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
           FROM previews_non_recursive t1
             LEFT JOIN previews_non_recursive t2 ON t1.fk_entity_label = t2.pk_entity AND t1.project = t2.project
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
             LEFT JOIN previews_non_recursive pre ON pre.pk_entity = e.pk_entity AND pre.project = r.project
        UNION
         SELECT r.fk_entity AS pk_entity,
            r.project,
            r.fk_project,
            e.pk_entity AS pk_related_full_text,
            pre.own_full_text
           FROM warehouse.v_roles_per_project_and_repo r
             JOIN information.entity e ON e.pk_entity = r.fk_temporal_entity AND e.table_name::text = 'temporal_entity'::text
             LEFT JOIN previews_non_recursive pre ON pre.pk_entity = e.pk_entity AND pre.project = r.project
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

-- 3

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

CREATE OR REPLACE FUNCTION warehouse.entity_preview__fill_own_full_text(
	param_pk_entity integer,
	param_fk_project integer)
    RETURNS boolean
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE
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


CREATE OR REPLACE FUNCTION warehouse.entity_preview__fill_dependent_type_labels(
	param_pk_entity integer,
	param_fk_project integer)
    RETURNS boolean
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE
AS $BODY$
  DECLARE
  new_type_label TEXT;
  dependent_type_label TEXT;
  BEGIN

    ---------------------- REPO & PROJECTS VERSIONS ----------------------

    RAISE INFO 'entity_preview__fill_dependent_type_labels of pk_entity: %, fk_project: %', param_pk_entity, param_fk_project;

    -- get new_type_label
    SELECT entity_label INTO new_type_label
    FROM warehouse.entity_preview
    WHERE pk_entity = param_pk_entity
    AND fk_project IS NOT DISTINCT FROM param_fk_project;

    RAISE INFO 'new_type_label: %', new_type_label;

    -- update all dependent entity_previews with new_type_label (if DISTINCT)
    UPDATE warehouse.entity_preview
    SET type_label = new_type_label
    WHERE fk_type = param_pk_entity
    AND fk_project IS NOT DISTINCT FROM param_fk_project
    AND type_label IS DISTINCT FROM new_type_label;

    RETURN true;
  END;
  $BODY$;

CREATE OR REPLACE FUNCTION warehouse.entity_preview__fill_dependent_related_full_texts(
	param_pk_entity integer,
	param_fk_project integer)
    RETURNS boolean
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE
AS $BODY$
  DECLARE
  new_own_full_text TEXT;
  BEGIN

    ---------------------- REPO & PROJECTS VERSIONS ----------------------

    RAISE INFO 'entity_preview__fill_dependent_related_full_texts of pk_entity: %, fk_project: %', param_pk_entity, param_fk_project;

    -- get new_own_full_text
    SELECT own_full_text INTO new_own_full_text
    FROM warehouse.entity_preview
    WHERE pk_entity = param_pk_entity
    AND fk_project IS NOT DISTINCT FROM param_fk_project;

    RAISE INFO 'new_own_full_text: %', new_own_full_text;


    -- update all related_full_texts with new_own_full_text (if DISTINCT)
    UPDATE warehouse.entity_preview
    SET related_full_texts = (
      SELECT jsonb_set(
        related_full_texts,
         array_agg(param_pk_entity::text),
         to_jsonb(new_own_full_text)
        )
      )
    WHERE related_full_texts ? param_pk_entity::text
    AND related_full_texts->>param_pk_entity::text IS DISTINCT FROM new_own_full_text
    AND fk_project IS NOT DISTINCT FROM param_fk_project;

    RETURN true;
  END;
  $BODY$;

CREATE OR REPLACE FUNCTION warehouse.entity_preview__fill_dependent_entity_labels(
	param_pk_entity integer,
	param_fk_project integer)
    RETURNS boolean
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE
AS $BODY$
  DECLARE
  new_entity_label TEXT;
  dependent_entity_label TEXT;
  BEGIN

    ---------------------- REPO & PROJECTS VERSIONS ----------------------

    RAISE INFO 'entity_preview__fill_dependent_entity_labels of pk_entity: %, fk_project: %', param_pk_entity, param_fk_project;

    -- get new_entity_label
    SELECT entity_label INTO new_entity_label
    FROM warehouse.entity_preview
    WHERE pk_entity = param_pk_entity
    AND fk_project IS NOT DISTINCT FROM param_fk_project;

    RAISE INFO 'new_entity_label: %', new_entity_label;

    -- update all dependent entity_previews with new_entity_label (if DISTINCT)
    UPDATE warehouse.entity_preview
    SET entity_label = new_entity_label
    WHERE fk_entity_label = param_pk_entity
    AND fk_project IS NOT DISTINCT FROM param_fk_project
    AND entity_label IS DISTINCT FROM new_entity_label;


    RETURN true;
  END;
  $BODY$;

CREATE OR REPLACE FUNCTION warehouse.entity_preview__fill_dependent_class_labels(
	pk_class integer,
	param_class_label text DEFAULT NULL::text)
    RETURNS boolean
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE
AS $BODY$
  DECLARE
    new_class_label TEXT;
  BEGIN

    ---------------------- REPO & PROJECTS VERSIONS ----------------------

    RAISE INFO 'entity_preview__fill_dependent_class_labels of pk_entity: %', pk_class;

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
    UPDATE warehouse.entity_preview
    SET class_label = new_class_label
    WHERE fk_class = pk_class
    AND class_label IS DISTINCT FROM new_class_label;

    RETURN true;
  END;
  $BODY$;


CREATE OR REPLACE FUNCTION warehouse.entity_preview__create_related_full_texts(
	param_pk_entity integer,
	param_fk_project integer)
    RETURNS boolean
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE
AS $BODY$
  DECLARE
    new_related_full_texts jsonb;
    param_project INT;
  BEGIN
      RAISE INFO 'entity_preview__create_related_full_texts pk_entity: %, fk_project: %', param_pk_entity, param_fk_project;

		param_project = coalesce(param_fk_project, 0);

     	---------------------- REPO AND PROJECT VERSIONS ----------------------
		WITH full_text_dependencies AS (
			SELECT r.fk_temporal_entity as pk_entity, r.project, r.fk_project, e.pk_entity as pk_related_full_text, pre.own_full_text
			FROM warehouse.v_roles_per_project_and_repo r
			JOIN information.entity e ON e.pk_entity = r.fk_entity AND e.table_name = 'persistent_item'
			LEFT JOIN warehouse.entity_preview pre ON pre.pk_entity = e.pk_entity AND pre.project = r.project
			WHERE r.fk_temporal_entity = param_pk_entity
			UNION
			SELECT r.fk_entity as pk_entity, r.project,  r.fk_project,  e.pk_entity as pk_related_full_text, pre.own_full_text
			FROM warehouse.v_roles_per_project_and_repo r
			JOIN information.entity e ON e.pk_entity = r.fk_temporal_entity AND e.table_name = 'temporal_entity'
			LEFT JOIN warehouse.entity_preview pre ON pre.pk_entity = e.pk_entity AND pre.project = r.project
			WHERE r.fk_entity = param_pk_entity
		),
		aggregated_related_full_texts AS(
			select pk_entity, project, fk_project, jsonb_object_agg(full_text_dependencies.pk_related_full_text::text, full_text_dependencies.own_full_text) related_full_texts
			FROM full_text_dependencies
			group by pk_entity, project, fk_project
		)
        select related_full_texts INTO new_related_full_texts
        FROM aggregated_related_full_texts;

        RAISE INFO 'new_related_full_texts: %', new_related_full_texts;

        ----- Insert or update the entity_preview

        PERFORM pk_entity
        FROM warehouse.entity_preview pre
        WHERE pre.pk_entity = param_pk_entity
        AND pre.fk_project IS NOT DISTINCT FROM  param_fk_project;

        IF NOT FOUND THEN
            INSERT INTO warehouse.entity_preview (pk_entity, fk_project, project, related_full_texts)
            VALUES (param_pk_entity, param_fk_project, param_project, new_related_full_texts);

            RAISE INFO 'inserted new_related_full_texts: %', new_related_full_texts;

        ELSE

          UPDATE warehouse.entity_preview pre
                SET related_full_texts = new_related_full_texts
                where pre.pk_entity = param_pk_entity
          AND pre.fk_project IS NOT DISTINCT FROM  param_fk_project
          AND (
            pre.related_full_texts @> new_related_full_texts
            AND
            pre.related_full_texts <@ new_related_full_texts
            )  IS DISTINCT FROM true;

        END IF;

      RETURN true;
  END;
  $BODY$;

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

CREATE OR REPLACE FUNCTION warehouse.entity_preview__create_fk_entity_label(
	param_pk_entity integer,
	param_fk_project integer)
    RETURNS jsonb
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE
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

CREATE OR REPLACE FUNCTION warehouse.entity_preview__create(
	param_pk_entity integer,
	param_fk_project integer)
    RETURNS boolean
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE
AS $BODY$
  DECLARE
    e warehouse.v_entities;
    c warehouse.class_preview;
    p INT;
  BEGIN

    ---------- upsert the unchagable rows ----------

    p = coalesce(param_fk_project, 0);

    SELECT * INTO e
    FROM warehouse.v_entities
    WHERE pk_entity = param_pk_entity
    AND fk_project IS NOT DISTINCT FROM param_fk_project;

    SELECT * INTO c
    FROM warehouse.class_preview as cpre
    WHERE cpre.dfh_pk_class = e.fk_class;


    INSERT INTO warehouse.entity_preview (pk_entity, fk_project, project, fk_class, entity_type, class_label)
    VALUES (
      param_pk_entity,
      param_fk_project,
      p, -- project
      e.fk_class,
      e.entity_type,
      c.class_label
    )
    ON CONFLICT (pk_entity, project)
    DO
      UPDATE
        SET fk_class = e.fk_class, entity_type = e.entity_type, class_label = c.class_label
          WHERE entity_preview.pk_entity = param_pk_entity AND entity_preview.project = p;

    ---------- first create the dependency indexes ----------

    PERFORM warehouse.entity_preview__create_related_full_texts(param_pk_entity, param_fk_project);

    PERFORM warehouse.entity_preview__create_fk_entity_label(param_pk_entity, param_fk_project);

    PERFORM warehouse.entity_preview__create_fk_type(param_pk_entity, param_fk_project);

    ---------- second fill the own entity_label and own_full_text  ----------

    PERFORM warehouse.entity_preview__fill_own_entity_label(param_pk_entity, param_fk_project);

    PERFORM warehouse.entity_preview__fill_own_full_text(param_pk_entity, param_fk_project);


    ---------- third fill the dependencies ----------

    PERFORM warehouse.entity_preview__fill_dependent_entity_labels(param_pk_entity, param_fk_project);

    PERFORM warehouse.entity_preview__fill_dependent_related_full_texts(param_pk_entity, param_fk_project);

    PERFORM warehouse.entity_preview__fill_dependent_type_labels(param_pk_entity, param_fk_project);

    RETURN true;
  END;
  $BODY$;


-- 2
CREATE FUNCTION warehouse.entity_preview__update_dependent_entity_labels()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
    BEGIN

      RAISE INFO 'Called TRIGGER FUNCTION entity_preview__update_dependent_entity_labels; pk_entity: % fk_project: %', NEW.pk_entity, NEW.fk_project;

      PERFORM
      warehouse.entity_preview__fill_dependent_entity_labels(NEW.pk_entity, NEW.fk_project),
      warehouse.entity_preview__fill_dependent_type_labels(NEW.pk_entity, NEW.fk_project);

      RETURN NEW;
    END;
    $BODY$;

CREATE FUNCTION warehouse.entity_preview__get_entity_label()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
    BEGIN

      RAISE INFO 'Called TRIGGER FUNCTION entity_preview__get_entity_label; pk_entity: % fk_project: %', NEW.pk_entity, NEW.fk_project;

      IF (NEW.fk_entity_label IS NOT NULL) THEN
        UPDATE warehouse.entity_preview
        SET entity_label = pre.entity_label
        FROM (
          SELECT entity_label
          FROM warehouse.entity_preview
          WHERE pk_entity = NEW.fk_entity_label
          AND fk_project IS NOT DISTINCT FROM NEW.fk_project
        ) as pre
        WHERE pk_entity = NEW.pk_entity
        AND fk_project IS NOT DISTINCT FROM NEW.fk_project;
      END IF;

      RETURN NEW;
    END;
    $BODY$;

CREATE FUNCTION warehouse.entity_preview__get_type_label()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
    BEGIN

      RAISE INFO 'Called TRIGGER FUNCTION entity_preview__get_type_label; pk_entity: % fk_project: %', NEW.pk_entity, NEW.fk_project;

      IF (NEW.fk_type IS NOT NULL) THEN

        UPDATE warehouse.entity_preview
        SET type_label = pre.entity_label
        FROM (
            SELECT entity_label
            FROM warehouse.entity_preview
            WHERE pk_entity = NEW.fk_type
            AND fk_project IS NOT DISTINCT FROM NEW.fk_project
        ) as pre
        WHERE pk_entity = NEW.pk_entity
        AND fk_project IS NOT DISTINCT FROM NEW.fk_project;

      ELSE

        UPDATE warehouse.entity_preview
        SET type_label = NULL
        WHERE pk_entity = NEW.pk_entity
        AND fk_project IS NOT DISTINCT FROM NEW.fk_project;

      END IF;

      RETURN NEW;
    END;
    $BODY$;

CREATE FUNCTION warehouse.entity_preview__update_dependent_related_full_texts()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
    BEGIN

      RAISE INFO 'Called TRIGGER FUNCTION entity_preview__update_dependent_related_full_texts; pk_entity: % fk_project: %', NEW.pk_entity, NEW.fk_project;

      PERFORM warehouse.entity_preview__fill_dependent_related_full_texts(NEW.pk_entity, NEW.fk_project);

      RETURN NEW;
    END;
    $BODY$;


CREATE FUNCTION warehouse.entity_preview__concat_full_text()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
    BEGIN

      RAISE INFO 'Called TRIGGER FUNCTION entity_preview__concat_full_text; pk_entity: % fk_project: %', NEW.pk_entity, NEW.fk_project;


      SELECT string_agg into NEW.full_text from (
        SELECT 1, string_agg(txt, ', ' ORDER BY rank) from (
          SELECT rank, txt
          FROM (
            select 1 rank, coalesce(NEW.type_label, NEW.class_label, '') as txt
            UNION
            select 2 rank, NEW.own_full_text  as txt
            UNION
            select 3 rank, value as txt
            from jsonb_each_text(NEW.related_full_texts)
          ) AS all_strings
          WHERE txt != ''
        ) AS items
        GROUP BY 1
      ) as x;

      SELECT setweight(to_tsvector(coalesce(NEW.entity_label, '')), 'A') ||
          setweight(to_tsvector(coalesce(NEW.type_label, NEW.class_label, '')), 'B') ||
          setweight(to_tsvector(coalesce(NEW.full_text,'')), 'C')
      INTO NEW.ts_vector;

      RETURN NEW;
    END;
    $BODY$;

-- 1
CREATE TRIGGER after_update_on_entity_preview__entity_label
    AFTER UPDATE OF entity_label
    ON warehouse.entity_preview
    FOR EACH ROW
    WHEN ((new.skip_triggers <> true))
    EXECUTE PROCEDURE warehouse.entity_preview__update_dependent_entity_labels();


CREATE TRIGGER after_update_on_entity_preview__fk_entity_label
    AFTER UPDATE OF fk_entity_label
    ON warehouse.entity_preview
    FOR EACH ROW
    WHEN ((new.skip_triggers <> true))
    EXECUTE PROCEDURE warehouse.entity_preview__get_entity_label();

CREATE TRIGGER after_update_on_entity_preview__fk_type
    AFTER UPDATE OF fk_type
    ON warehouse.entity_preview
    FOR EACH ROW
    WHEN ((new.skip_triggers <> true))
    EXECUTE PROCEDURE warehouse.entity_preview__get_type_label();

CREATE TRIGGER after_update_on_entity_preview__own_full_text
    AFTER UPDATE OF own_full_text
    ON warehouse.entity_preview
    FOR EACH ROW
    WHEN ((new.skip_triggers <> true))
    EXECUTE PROCEDURE warehouse.entity_preview__update_dependent_related_full_texts();

CREATE TRIGGER before_update_on_entity_preview__own_full_text_or_related_full_
    BEFORE INSERT OR UPDATE OF own_full_text, related_full_texts
    ON warehouse.entity_preview
    FOR EACH ROW
    WHEN ((new.skip_triggers <> true))
    EXECUTE PROCEDURE warehouse.entity_preview__concat_full_text();
