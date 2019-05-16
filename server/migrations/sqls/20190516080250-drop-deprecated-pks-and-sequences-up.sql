ALTER TABLE data.digital DROP COLUMN IF EXISTS _deprecated_pk_digital_object;
ALTER TABLE data.digital_vt DROP COLUMN IF EXISTS _deprecated_pk_digital_object;
ALTER TABLE data.digital DROP COLUMN IF EXISTS _deprecated_js_quill_data;
ALTER TABLE data.digital_vt DROP COLUMN IF EXISTS _deprecated_js_quill_data;
-- DROP SEQUENCE data.digital_object_pk_digital_object_seq;

ALTER TABLE information.appellation DROP COLUMN IF EXISTS _deprecated_pk_appellation;
ALTER TABLE information.appellation_vt DROP COLUMN IF EXISTS _deprecated_pk_appellation;
ALTER TABLE information.appellation DROP COLUMN IF EXISTS _deprecated_appellation_label;
ALTER TABLE information.appellation_vt DROP COLUMN IF EXISTS _deprecated_appellation_label;
-- DROP SEQUENCE information.appellation_pk_appellation_seq;

ALTER TABLE information.entity_association DROP COLUMN IF EXISTS pk_entity_association;
ALTER TABLE information.entity_association_vt DROP COLUMN IF EXISTS pk_entity_association;
-- DROP SEQUENCE information.entity_association_pk_entity_association_seq;


DROP VIEW information.v_persistent_item;
ALTER TABLE information.persistent_item DROP COLUMN IF EXISTS _deprecated_pk_persistent_item;
ALTER TABLE information.persistent_item_vt DROP COLUMN IF EXISTS pk_persistent_item;
CREATE VIEW information.v_persistent_item AS SELECT * FROM information.persistent_item;
CREATE TRIGGER on_insert
    INSTEAD OF INSERT
    ON information.v_persistent_item
    FOR EACH ROW
    EXECUTE PROCEDURE information.v_persistent_item_find_or_create();

-- DROP SEQUENCE information.persistent_item_pk_persistent_item_seq;

ALTER TABLE information.role DROP COLUMN IF EXISTS _deprecated_pk_role;
ALTER TABLE information.role_vt DROP COLUMN IF EXISTS pk_role;
-- DROP SEQUENCE information.role_pk_role_seq;

ALTER TABLE information.temporal_entity DROP COLUMN IF EXISTS _deprecated_pk_temporal_entity;
ALTER TABLE information.temporal_entity_vt DROP COLUMN IF EXISTS pk_temporal_entity;
-- DROP SEQUENCE information.temporal_entity_pk_temporal_entity_seq;

DROP view warehouse.v_entity_preview;
DROP view warehouse.v_entity_preview_non_recursive ;
DROP view warehouse.v_te_en_time_span_per_project_and_repo;
DROP view information.v_time_primitive;
ALTER TABLE information.time_primitive DROP COLUMN IF EXISTS pk_time_primitive;
ALTER TABLE information.time_primitive_vt DROP COLUMN IF EXISTS pk_time_primitive;
-- DROP SEQUENCE information.time_primitive_pk_time_primitive_seq;

DROP TABLE IF EXISTS information._deprecated_type_namespace_rel;
DROP TABLE IF EXISTS information._deprecated_type_namespace_rel_vt;

DROP TABLE IF EXISTS information._deprecated_namespace;
DROP TABLE IF EXISTS information._deprecated_namespace_vt;

DROP TABLE IF EXISTS projects._deprecated_label;
DROP TABLE IF EXISTS projects._deprecated_label_vt;
-- DROP SEQUENCE projects.label_pk_label_seq;
DROP VIEW projects.v_info_proj_rel;
ALTER TABLE projects.info_proj_rel DROP COLUMN IF EXISTS _deprecated_pk_entity_version_project_rel;
ALTER TABLE projects.info_proj_rel_vt DROP COLUMN IF EXISTS _deprecated_pk_entity_version_project_rel;
ALTER TABLE projects.info_proj_rel DROP COLUMN IF EXISTS _deprecated_fk_project;
ALTER TABLE projects.info_proj_rel_vt DROP COLUMN IF EXISTS _deprecated_fk_project;
CREATE OR REPLACE VIEW projects.v_info_proj_rel AS
 SELECT * FROM projects.info_proj_rel;
CREATE TRIGGER on_insert
    INSTEAD OF INSERT
    ON projects.v_info_proj_rel
    FOR EACH ROW
    EXECUTE PROCEDURE projects.v_info_proj_rel_update_or_creat();



-- DROP SEQUENCE projects.entity_version_project_rel_pk_entity_version_project_rel_seq;

ALTER TABLE projects.project DROP COLUMN IF EXISTS _deprecated_pk_project;
ALTER TABLE projects.project_vt DROP COLUMN IF EXISTS _deprecated_pk_project;
ALTER TABLE projects.project DROP COLUMN IF EXISTS _deprecated_fk_language;
ALTER TABLE projects.project_vt DROP COLUMN IF EXISTS _deprecated_fk_language;
-- DROP SEQUENCE projects.project_pk_project_seq;

ALTER TABLE projects.text_property DROP COLUMN IF EXISTS _deprecated_pk_text_property;
ALTER TABLE projects.text_property_vt DROP COLUMN IF EXISTS _deprecated_pk_text_property;
ALTER TABLE projects.text_property DROP COLUMN IF EXISTS _deprecated_text_property;
ALTER TABLE projects.text_property_vt DROP COLUMN IF EXISTS _deprecated_text_property;
ALTER TABLE projects.text_property DROP COLUMN IF EXISTS _deprecated_text_property_xml;
ALTER TABLE projects.text_property_vt DROP COLUMN IF EXISTS _deprecated_text_property_xml;
ALTER TABLE projects.text_property DROP COLUMN IF EXISTS _deprecated_fk_language;
ALTER TABLE projects.text_property_vt DROP COLUMN IF EXISTS _deprecated_fk_language;

-- DROP SEQUENCE projects.text_property_pk_text_property_seq;




CREATE VIEW information.v_time_primitive AS
 SELECT * FROM information.time_primitive;

CREATE OR REPLACE VIEW warehouse.v_te_en_time_span_per_project_and_repo AS
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


CREATE OR REPLACE VIEW warehouse.v_entity_preview_non_recursive AS
 WITH entities AS (
         SELECT v_entities.pk_entity,
            v_entities.fk_project,
            v_entities.project,
            v_entities.fk_class,
            v_entities.table_name,
            v_entities.entity_type
           FROM warehouse.v_entities
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
             LEFT JOIN warehouse.v_own_entity_label l ON a.pk_entity = l.pk_entity AND a.project = l.project
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
             LEFT JOIN warehouse.v_te_en_time_span_per_project_and_repo t ON a.pk_entity = t.fk_temporal_entity AND NOT a.fk_project IS DISTINCT FROM t.fk_project
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
             LEFT JOIN warehouse.v_own_full_text t ON a.pk_entity = t.pk_entity AND a.project = t.project
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
             LEFT JOIN warehouse.v_fk_entity_label t ON a.pk_entity = t.pk_entity AND NOT a.fk_project IS DISTINCT FROM t.fk_project
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
             LEFT JOIN warehouse.v_fk_type t ON a.pk_entity = t.pk_entity AND a.project = t.project
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