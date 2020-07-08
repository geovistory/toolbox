-- 5
DROP VIEW information.v_entity_association CASCADE;

CREATE OR REPLACE VIEW information.v_entity_association AS WITH ea_project_count AS (
  SELECT
    ea_1.pk_entity,
    ea_1.fk_property,
    ea_1.fk_info_domain,
    ea_1.fk_info_range,
    ea_1.fk_data_domain,
    ea_1.fk_data_range,
    ea_1.notes,
    ea_1.tmsp_creation,
    ea_1.tmsp_last_modification,
    ea_1.sys_period,
    COALESCE(count(*) FILTER (WHERE epr.is_in_project = TRUE), 0::bigint) AS is_in_project_count
  FROM
    information.entity_association ea_1
  LEFT JOIN projects.info_proj_rel epr ON epr.fk_entity = ea_1.pk_entity
GROUP BY
  ea_1.pk_entity,
  ea_1.fk_property,
  ea_1.fk_info_domain,
  ea_1.fk_info_range,
  ea_1.fk_data_domain,
  ea_1.fk_data_range,
  ea_1.notes,
  ea_1.tmsp_creation,
  ea_1.tmsp_last_modification,
  ea_1.sys_period
)
SELECT
  ea.pk_entity,
  ea.fk_property,
  ea.fk_info_domain,
  ea.fk_info_range,
  ea.fk_data_domain,
  ea.fk_data_range,
  ea.notes,
  ea.tmsp_creation,
  ea.tmsp_last_modification,
  ea.sys_period,
  ea.is_in_project_count,
  p.dfh_range_instances_max_quantifier AS range_max_quantifier,
  p.dfh_domain_instances_max_quantifier AS domain_max_quantifier
FROM
  ea_project_count ea
  LEFT JOIN data_for_history.property p ON ea.fk_property = p.dfh_pk_property;

CREATE OR REPLACE VIEW warehouse.v_entity_association_per_project_and_repo AS SELECT DISTINCT
  ea.pk_entity,
  ea.fk_info_domain,
  ea.fk_info_range,
  ea.fk_data_domain,
  ea.fk_data_range,
  ea.fk_property,
  epr.fk_project,
  COALESCE(epr.fk_project, 0) AS project,
  ea.is_in_project_count
FROM
  information.v_entity_association ea,
  projects.info_proj_rel epr
WHERE
  epr.fk_entity = ea.pk_entity
  AND epr.is_in_project = TRUE
UNION
SELECT DISTINCT
  ea.pk_entity,
  ea.fk_info_domain,
  ea.fk_info_range,
  ea.fk_data_domain,
  ea.fk_data_range,
  ea.fk_property,
  NULL::integer AS fk_project,
  0 AS project,
  ea.is_in_project_count
FROM
  information.v_entity_association ea
WHERE
  ea.is_in_project_count > 0;

CREATE OR REPLACE VIEW warehouse.v_fk_type AS WITH tw1 AS (
  SELECT DISTINCT ON (t1.fk_project,
    t1.fk_property,
    t1.fk_info_domain)
    t1.fk_project,
    t1.fk_property,
    t1.fk_info_domain,
    t1.fk_info_range,
    t1.is_in_project_count
  FROM
    warehouse.v_entity_association_per_project_and_repo t1,
    system.class_has_type_property t2
  WHERE
    t1.fk_project IS NULL
    AND t1.fk_property = t2.fk_property
  UNION
  SELECT
    t3.fk_project,
    t3.fk_property,
    t3.fk_info_domain,
    t3.fk_info_range,
    t3.is_in_project_count
  FROM
    warehouse.v_entity_association_per_project_and_repo t3,
    system.class_has_type_property t4
  WHERE
    t3.fk_project IS NOT NULL
    AND t3.fk_property = t4.fk_property
  ORDER BY
    1,
    2,
    3,
    5 DESC
)
SELECT DISTINCT ON (tw1.fk_info_domain, tw1.fk_project)
  tw1.fk_info_domain AS pk_entity,
  tw1.fk_project,
  COALESCE(tw1.fk_project, 0) AS project,
  tw1.fk_info_range AS fk_type
FROM
  tw1;

CREATE OR REPLACE VIEW warehouse.v_entity_preview_non_recursive AS
SELECT
  t1.pk_entity,
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
FROM
  warehouse.v_entities t1
  LEFT JOIN warehouse.class_preview t2 ON t2.dfh_pk_class = t1.fk_class
  LEFT JOIN warehouse.v_own_entity_label t3 ON t1.pk_entity = t3.pk_entity
    AND NOT t1.fk_project IS DISTINCT FROM t3.fk_project
  LEFT JOIN warehouse.v_te_en_time_span_per_project_and_repo t4 ON t1.pk_entity = t4.fk_temporal_entity
    AND NOT t1.fk_project IS DISTINCT FROM t4.fk_project
  LEFT JOIN warehouse.v_own_full_text t5 ON t1.pk_entity = t5.pk_entity
    AND NOT t1.fk_project IS DISTINCT FROM t5.fk_project
  LEFT JOIN warehouse.v_fk_entity_label t6 ON t1.pk_entity = t6.pk_entity
    AND NOT t1.fk_project IS DISTINCT FROM t6.fk_project
  LEFT JOIN warehouse.v_fk_type t7 ON t1.pk_entity = t7.pk_entity
    AND NOT t1.fk_project IS DISTINCT FROM t7.fk_project
  LEFT JOIN warehouse.v_related_full_texts t8 ON t1.pk_entity = t8.pk_entity
    AND NOT t1.fk_project IS DISTINCT FROM t8.fk_project;

CREATE OR REPLACE VIEW warehouse.v_entity_preview AS WITH previews_non_recursive AS (
  SELECT
    v_entity_preview_non_recursive.pk_entity,
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
  FROM
    warehouse.v_entity_preview_non_recursive
),
fill_entity_label AS (
  SELECT
    t1.pk_entity,
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
  FROM
    previews_non_recursive t1
  LEFT JOIN previews_non_recursive t2 ON t1.fk_entity_label = t2.pk_entity
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
  LEFT JOIN previews_non_recursive pre ON pre.pk_entity = e.pk_entity
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
  LEFT JOIN previews_non_recursive pre ON pre.pk_entity = e.pk_entity
    AND pre.project = r.project
),
aggregated_related_full_texts AS (
  SELECT
    full_text_dependencies.pk_entity,
    full_text_dependencies.project,
    full_text_dependencies.fk_project,
    jsonb_object_agg(full_text_dependencies.pk_related_full_text::text, full_text_dependencies.own_full_text) AS related_full_texts
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
        array_to_string(ARRAY[f.own_full_text, array_to_string(array_agg(jsonb_each_text.value), ', '::text)], ', '::text) AS array_to_string
      FROM
        jsonb_each_text(f.related_full_texts) jsonb_each_text(KEY, value)) AS full_text
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
    (setweight(to_tsvector(COALESCE(t.entity_label, ''::text)), 'A'::"char") || setweight(to_tsvector(COALESCE(t.type_label, t.class_label::text, ''::text)), 'B'::"char")) || setweight(to_tsvector(COALESCE(t.full_text, ''::text)), 'C'::"char") AS ts_vector
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

-- 3
DROP VIEW information.v_role CASCADE;

CREATE OR REPLACE VIEW information.v_role AS
SELECT
  t1.pk_entity,
  t1.fk_property,
  t1.fk_entity,
  t1.fk_temporal_entity,
  t2.is_in_project_count,
  t2.is_standard_in_project_count,
  t2.community_favorite_calendar,
  t1.notes,
  t1.tmsp_creation,
  t1.tmsp_last_modification,
  t1.sys_period,
  p.dfh_range_instances_max_quantifier AS range_max_quantifier,
  p.dfh_domain_instances_max_quantifier AS domain_max_quantifier
FROM
  information.role t1
  JOIN data_for_history.property p ON t1.fk_property = p.dfh_pk_property
  LEFT JOIN LATERAL (
    SELECT
      count(info_proj_rel.pk_entity) AS is_in_project_count,
      COALESCE(count(*) FILTER (WHERE info_proj_rel.ord_num_of_domain = 0), 0::bigint) AS is_standard_in_project_count,
      mode() WITHIN GROUP (ORDER BY info_proj_rel.calendar) AS community_favorite_calendar
    FROM
      projects.info_proj_rel
    WHERE
      info_proj_rel.fk_entity = t1.pk_entity
      AND info_proj_rel.is_in_project = TRUE GROUP BY
        info_proj_rel.fk_entity) t2 ON TRUE
LIMIT 1;

CREATE OR REPLACE VIEW warehouse.v_roles_per_project_and_repo AS
SELECT
  t1.pk_entity,
  t1.fk_entity,
  t1.fk_temporal_entity,
  t1.fk_property,
  t2.fk_project,
  COALESCE(t2.fk_project, 0) AS project,
  t2.ord_num_of_domain,
  t2.ord_num_of_range,
  t1.is_in_project_count
FROM
  information.v_role t1,
  projects.info_proj_rel t2
WHERE
  t2.fk_entity = t1.pk_entity
  AND t2.is_in_project = TRUE
UNION
SELECT
  t1.pk_entity,
  t1.fk_entity,
  t1.fk_temporal_entity,
  t1.fk_property,
  NULL::integer AS fk_project,
  0 AS project,
  NULL::integer AS ord_num_of_domain,
  NULL::integer AS ord_num_of_range,
  t1.is_in_project_count
FROM
  information.v_role t1
WHERE
  t1.is_in_project_count > 0;

CREATE OR REPLACE VIEW warehouse.v_te_en_time_span_per_project_and_repo AS WITH role_with_time_primitive AS (
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
    AND (r.fk_property = ANY (ARRAY[71,
        72,
        150,
        151,
        152,
        153]))
    AND tp.pk_entity = r.fk_entity
    AND epr.is_in_project = TRUE
  UNION ( SELECT DISTINCT ON (r.fk_temporal_entity,
      r.fk_property)
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
      r.fk_property = ANY (ARRAY[71,
        72,
        150,
        151,
        152,
        153])
    ORDER BY
      r.fk_temporal_entity,
      r.fk_property,
      r.is_in_project_count DESC,
      r.tmsp_creation DESC))
SELECT
  role_with_time_primitive.fk_project,
  role_with_time_primitive.fk_temporal_entity,
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
    END, json_build_object('julianDay', role_with_time_primitive.julian_day, 'duration', role_with_time_primitive.duration, 'calendar', role_with_time_primitive.calendar)) AS time_span
FROM
  role_with_time_primitive
GROUP BY
  role_with_time_primitive.fk_project,
  role_with_time_primitive.fk_temporal_entity;

CREATE OR REPLACE VIEW warehouse.v_fk_entity_label AS WITH tw1 AS (
  SELECT
    temporal_entity.pk_entity,
    temporal_entity.fk_class,
    'temporal_entity'::character varying AS table_name,
    'teEnt'::text AS entity_type
  FROM
    information.temporal_entity
  UNION
  SELECT
    persistent_item.pk_entity,
    persistent_item.fk_class,
    'persistent_item'::character varying AS table_name,
    'peIt'::text AS entity_type
  FROM
    information.persistent_item
)
SELECT DISTINCT ON (t1.pk_entity, t3.fk_project, t4.fk_project, t1.fk_class)
  t1.pk_entity,
  COALESCE(t3.fk_project, t4.fk_project) AS fk_project,
  COALESCE(t3.fk_project, t4.fk_project, 0) AS project,
  t1.fk_class,
  t1.table_name,
  t1.entity_type,
  COALESCE(t4.fk_temporal_entity, CASE WHEN t5.table_name::text = ANY (ARRAY['persistent_item'::character varying::text, 'temporal_entity'::character varying::text]) THEN
      t3.fk_entity
    ELSE
      NULL::integer
    END) AS fk_entity_label
FROM
  tw1 t1
  JOIN information.v_ordered_fields_per_class t2 ON t1.fk_class = t2.fk_class
  LEFT JOIN warehouse.v_roles_per_project_and_repo t3 ON t2.fk_property = t3.fk_property
    AND t1.pk_entity = t3.fk_temporal_entity
  LEFT JOIN information.entity t5 ON t3.fk_entity = t5.pk_entity
  LEFT JOIN warehouse.v_roles_per_project_and_repo t4 ON t2.fk_property = t4.fk_property
    AND t1.pk_entity = t4.fk_entity
WHERE
  t2.field_order = 0
ORDER BY
  t1.pk_entity,
  t3.fk_project,
  t4.fk_project,
  t1.fk_class,
  t2.field_order,
  t3.ord_num_of_domain,
  t4.ord_num_of_domain,
  t3.is_in_project_count DESC,
  t4.is_in_project_count DESC;

CREATE OR REPLACE VIEW warehouse.v_own_entity_label AS WITH tw1 AS (
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
)
SELECT DISTINCT ON (tw1.pk_entity, tw1.fk_project)
  tw1.pk_entity,
  tw1.fk_project,
  tw1.string AS entity_label,
  tw1.project
FROM
  tw1
ORDER BY
  tw1.pk_entity,
  tw1.fk_project,
  tw1.field_order,
  tw1.ord_num,
  tw1.is_in_project_count DESC;

CREATE OR REPLACE VIEW warehouse.v_own_full_text AS WITH tw1 AS (
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
),
tw2 AS (
  SELECT DISTINCT ON (tw1.pk_entity,
    tw1.fk_project,
    tw1.string)
    tw1.pk_entity,
    tw1.fk_project,
    tw1.project,
    tw1.string,
    tw1.field_order,
    tw1.ord_num,
    tw1.is_in_project_count
  FROM
    tw1
)
SELECT
  tw2.pk_entity,
  tw2.fk_project,
  tw2.project,
  string_agg(tw2.string, ', '::text ORDER BY tw2.field_order, tw2.ord_num, tw2.is_in_project_count DESC) AS own_full_text
FROM
  tw2
GROUP BY
  tw2.pk_entity,
  tw2.fk_project,
  tw2.project;

CREATE OR REPLACE VIEW warehouse.v_related_full_texts AS
SELECT
  t1.fk_entity AS pk_entity,
  t1.project,
  t1.fk_project,
  jsonb_object_agg(t1.fk_temporal_entity::text, NULL::unknown) AS related_full_texts
FROM
  warehouse.v_roles_per_project_and_repo t1
GROUP BY
  t1.fk_entity,
  t1.fk_project,
  t1.project
UNION
SELECT
  t1.fk_temporal_entity AS pk_entity,
  t1.project,
  t1.fk_project,
  jsonb_object_agg(t1.fk_entity::text, NULL::unknown) AS related_full_texts
FROM
  warehouse.v_roles_per_project_and_repo t1,
  information.persistent_item t2
WHERE
  t1.fk_entity = t2.pk_entity
GROUP BY
  t1.fk_temporal_entity,
  t1.fk_project,
  t1.project;

CREATE OR REPLACE VIEW warehouse.v_entity_preview_non_recursive AS
SELECT
  t1.pk_entity,
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
FROM
  warehouse.v_entities t1
  LEFT JOIN warehouse.class_preview t2 ON t2.dfh_pk_class = t1.fk_class
  LEFT JOIN warehouse.v_own_entity_label t3 ON t1.pk_entity = t3.pk_entity
    AND NOT t1.fk_project IS DISTINCT FROM t3.fk_project
  LEFT JOIN warehouse.v_te_en_time_span_per_project_and_repo t4 ON t1.pk_entity = t4.fk_temporal_entity
    AND NOT t1.fk_project IS DISTINCT FROM t4.fk_project
  LEFT JOIN warehouse.v_own_full_text t5 ON t1.pk_entity = t5.pk_entity
    AND NOT t1.fk_project IS DISTINCT FROM t5.fk_project
  LEFT JOIN warehouse.v_fk_entity_label t6 ON t1.pk_entity = t6.pk_entity
    AND NOT t1.fk_project IS DISTINCT FROM t6.fk_project
  LEFT JOIN warehouse.v_fk_type t7 ON t1.pk_entity = t7.pk_entity
    AND NOT t1.fk_project IS DISTINCT FROM t7.fk_project
  LEFT JOIN warehouse.v_related_full_texts t8 ON t1.pk_entity = t8.pk_entity
    AND NOT t1.fk_project IS DISTINCT FROM t8.fk_project;

CREATE OR REPLACE VIEW warehouse.v_entity_preview AS WITH previews_non_recursive AS (
  SELECT
    v_entity_preview_non_recursive.pk_entity,
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
  FROM
    warehouse.v_entity_preview_non_recursive
),
fill_entity_label AS (
  SELECT
    t1.pk_entity,
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
  FROM
    previews_non_recursive t1
  LEFT JOIN previews_non_recursive t2 ON t1.fk_entity_label = t2.pk_entity
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
  LEFT JOIN previews_non_recursive pre ON pre.pk_entity = e.pk_entity
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
  LEFT JOIN previews_non_recursive pre ON pre.pk_entity = e.pk_entity
    AND pre.project = r.project
),
aggregated_related_full_texts AS (
  SELECT
    full_text_dependencies.pk_entity,
    full_text_dependencies.project,
    full_text_dependencies.fk_project,
    jsonb_object_agg(full_text_dependencies.pk_related_full_text::text, full_text_dependencies.own_full_text) AS related_full_texts
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
        array_to_string(ARRAY[f.own_full_text, array_to_string(array_agg(jsonb_each_text.value), ', '::text)], ', '::text) AS array_to_string
      FROM
        jsonb_each_text(f.related_full_texts) jsonb_each_text(KEY, value)) AS full_text
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
    (setweight(to_tsvector(COALESCE(t.entity_label, ''::text)), 'A'::"char") || setweight(to_tsvector(COALESCE(t.type_label, t.class_label::text, ''::text)), 'B'::"char")) || setweight(to_tsvector(COALESCE(t.full_text, ''::text)), 'C'::"char") AS ts_vector
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

-- 2
DROP FUNCTION commons.get_dependent_objects;

-- 1
DROP FUNCTION commons.create_sql_for_updating_view_with_dependencies;

