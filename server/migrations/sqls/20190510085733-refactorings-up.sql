-- 1
ALTER TABLE public.account_project_rel ADD COLUMN entity_version int ;
ALTER TABLE public.account_project_rel_vt ADD COLUMN entity_version int;

ALTER TABLE public.account_project_rel ALTER COLUMN _deprecated_fk_project DROP NOT NULL;
ALTER TABLE public.account_project_rel_vt ALTER COLUMN _deprecated_fk_project DROP NOT NULL;

DROP TRIGGER insert_schema_table_name ON public.account_project_rel;
DROP TRIGGER last_modification_tmsp ON public.account_project_rel;
DROP TRIGGER creation_tmsp ON public.account_project_rel;


-- 2
CREATE OR REPLACE VIEW warehouse.v_entities AS
 SELECT DISTINCT e.pk_entity,
    epr.fk_project,
    epr.fk_project AS project,
        CASE
            WHEN pi.pk_entity IS NOT NULL THEN pi.fk_class
            ELSE te.fk_class
        END AS fk_class,
    e.table_name,
        CASE
            WHEN e.table_name::text = 'persistent_item'::text THEN 'peIt'::text
            WHEN e.table_name::text = 'temporal_entity'::text THEN 'teEn'::text
            ELSE NULL::text
        END AS entity_type
   FROM projects.info_proj_rel epr
     JOIN information.entity e ON e.pk_entity = epr.fk_entity
     LEFT JOIN information.persistent_item pi ON e.pk_entity = pi.pk_entity
     LEFT JOIN information.temporal_entity te ON e.pk_entity = te.pk_entity
  WHERE epr.is_in_project = true AND (e.table_name::text = ANY (ARRAY['temporal_entity'::character varying::text, 'persistent_item'::character varying::text]))
UNION
 SELECT DISTINCT e.pk_entity,
    NULL::integer AS fk_project,
    0 AS project,
        CASE
            WHEN pi.pk_entity IS NOT NULL THEN pi.fk_class
            ELSE te.fk_class
        END AS fk_class,
    e.table_name,
        CASE
            WHEN e.table_name::text = 'persistent_item'::text THEN 'peIt'::text
            WHEN e.table_name::text = 'temporal_entity'::text THEN 'teEn'::text
            ELSE NULL::text
        END AS entity_type
   FROM information.entity e
     LEFT JOIN information.persistent_item pi ON e.pk_entity = pi.pk_entity
     LEFT JOIN information.temporal_entity te ON e.pk_entity = te.pk_entity
  WHERE e.table_name::text = ANY (ARRAY['temporal_entity'::character varying::text, 'persistent_item'::character varying::text])
  ORDER BY 1;


-- 3
CREATE OR REPLACE VIEW projects.v_info_proj_rel AS
 SELECT info_proj_rel.pk_entity,
    info_proj_rel.schema_name,
    info_proj_rel.table_name,
    info_proj_rel.notes,
    info_proj_rel.fk_creator,
    info_proj_rel.fk_last_modifier,
    info_proj_rel.tmsp_creation,
    info_proj_rel.tmsp_last_modification,
    info_proj_rel.sys_period,
    info_proj_rel._deprecated_pk_entity_version_project_rel AS pk_entity_version_project_rel,
    info_proj_rel.fk_project,
    info_proj_rel.fk_entity,
    info_proj_rel.fk_entity_version,
    info_proj_rel.fk_entity_version_concat,
    info_proj_rel.is_in_project,
    info_proj_rel.is_standard_in_project,
    info_proj_rel.calendar,
    info_proj_rel.ord_num,
    info_proj_rel.entity_version
   FROM projects.info_proj_rel;

-- 4

CREATE OR REPLACE VIEW information.v_te_en_time_span_per_project_and_repo AS
 WITH role_with_time_primitive AS (
         SELECT r.fk_temporal_entity,
            r.fk_property,
            epr.fk_project,
            epr.calendar,
            tp.julian_day,
            tp.duration
           FROM projects.info_proj_rel epr
             JOIN information.v_role r ON r.pk_entity = epr.fk_entity
             JOIN information.v_time_primitive tp ON tp.pk_entity = r.fk_entity
          WHERE epr.is_in_project = true
        UNION
         SELECT r.fk_temporal_entity,
            r.fk_property,
            NULL::integer AS fk_project,
            r.community_favorite_calendar,
            tp.julian_day,
            tp.duration
           FROM information.v_role r
             JOIN information.v_time_primitive tp ON tp.pk_entity = r.fk_entity AND r.rank_for_te_ent = 1
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


ALTER VIEW information.v_te_en_time_span_per_project_and_repo SET SCHEMA warehouse;

-- 5
CREATE OR REPLACE VIEW warehouse.v_roles_per_project_and_repo AS
 SELECT DISTINCT r.fk_entity,
    r.fk_temporal_entity,
    r.fk_property,
    epr.fk_project,
    epr.ord_num AS rank_for_pe_it,
    epr.ord_num AS rank_for_te_ent,
    COALESCE(epr.fk_project, 0) AS project
   FROM information.v_role r
     LEFT JOIN projects.info_proj_rel epr ON epr.fk_entity = r.pk_entity AND epr.is_in_project = true
UNION
 SELECT DISTINCT r.fk_entity,
    r.fk_temporal_entity,
    r.fk_property,
    NULL::integer AS fk_project,
    r.rank_for_pe_it,
    r.rank_for_te_ent,
    0 AS project
   FROM information.v_role r
  WHERE r.is_in_project_count > 0;

-- 6

CREATE OR REPLACE VIEW information.v_text_property AS
 SELECT text_property.pk_entity,
    text_property.schema_name,
    text_property.table_name,
    text_property.notes,
    text_property.fk_creator,
    text_property.fk_last_modifier,
    text_property.tmsp_creation,
    text_property.tmsp_last_modification,
    text_property.sys_period,
    text_property.fk_concerned_entity,
    text_property.fk_language,
    text_property.fk_class_field,
    text_property.quill_doc,
    text_property.string,
    count(epr.fk_project) AS is_in_project_count
   FROM information.text_property
     LEFT JOIN projects.info_proj_rel epr ON epr.fk_entity = text_property.pk_entity AND epr.is_in_project = true
  GROUP BY text_property.pk_entity, text_property.schema_name, text_property.table_name, text_property.notes, text_property.fk_creator, text_property.fk_last_modifier, text_property.tmsp_creation, text_property.tmsp_last_modification, text_property.sys_period, text_property._deprecated_text_property, text_property.fk_concerned_entity, text_property.quill_doc, text_property.fk_language, text_property.fk_class_field, text_property.string;

-- 7
CREATE OR REPLACE VIEW warehouse.v_text_properties_per_project_and_repo AS
 SELECT DISTINCT t.pk_entity,
    t.schema_name,
    t.table_name,
    t.notes,
    t.fk_creator,
    t.fk_last_modifier,
    t.tmsp_creation,
    t.tmsp_last_modification,
    t.sys_period,
    t.fk_concerned_entity,
    t.fk_language,
    t.fk_class_field,
    t.quill_doc,
    t.string,
    t.is_in_project_count,
    epr.fk_project AS fk_project,
    COALESCE(epr.fk_project, 0) AS "coalesce"
   FROM information.v_text_property t
     JOIN projects.info_proj_rel epr ON epr.fk_entity = t.pk_entity AND epr.is_in_project = true
UNION
 SELECT DISTINCT t.pk_entity,
    t.schema_name,
    t.table_name,
    t.notes,
    t.fk_creator,
    t.fk_last_modifier,
    t.tmsp_creation,
    t.tmsp_last_modification,
    t.sys_period,
    t.fk_concerned_entity,
    t.fk_language,
    t.fk_class_field,
    t.quill_doc,
    t.string,
    t.is_in_project_count,
    NULL::integer AS fk_project,
    0 AS "coalesce"
   FROM information.v_text_property t
  WHERE t.is_in_project_count > 0;