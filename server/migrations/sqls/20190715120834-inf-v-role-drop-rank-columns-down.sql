-- 22
ALTER TABLE warehouse.v_entity_association_per_project_and_repo RENAME TO v_entity_association_per_project_and_repo_no_ranks;

-- 22
ALTER TABLE information.v_entity_association RENAME TO v_entity_association_tmp;

-- 21
CREATE OR REPLACE VIEW information.v_entity_association AS
 WITH ea_project_count AS (
         SELECT ea_1.pk_entity,
            ea_1.fk_property,
            ea_1.fk_info_domain,
            ea_1.fk_info_range,
            ea_1.fk_data_domain,
            ea_1.fk_data_range,
            ea_1.notes,
            ea_1.tmsp_creation,
            ea_1.tmsp_last_modification,
            ea_1.sys_period,
            COALESCE(count(*) FILTER (WHERE epr.is_in_project = true), 0::bigint) AS is_in_project_count
           FROM information.entity_association ea_1
             LEFT JOIN projects.info_proj_rel epr ON epr.fk_entity = ea_1.pk_entity
          GROUP BY ea_1.pk_entity, ea_1.fk_property, ea_1.fk_info_domain, ea_1.fk_info_range, ea_1.fk_data_domain, ea_1.fk_data_range, ea_1.notes, ea_1.tmsp_creation, ea_1.tmsp_last_modification, ea_1.sys_period
        )
 SELECT ea.pk_entity,
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
    row_number() OVER (PARTITION BY (COALESCE(ea.fk_info_domain, ea.fk_data_domain)), ea.fk_property ORDER BY ea.is_in_project_count DESC, ea.tmsp_creation DESC) AS rank_for_domain,
    p.dfh_range_instances_max_quantifier AS range_max_quantifier,
    row_number() OVER (PARTITION BY (COALESCE(ea.fk_info_range, ea.fk_data_range)), ea.fk_property ORDER BY ea.is_in_project_count DESC, ea.tmsp_creation DESC) AS rank_for_range,
    p.dfh_domain_instances_max_quantifier AS domain_max_quantifier
   FROM ea_project_count ea
     LEFT JOIN data_for_history.property p ON ea.fk_property = p.dfh_pk_property;

ALTER TABLE information.v_entity_association
    OWNER TO postgres;


CREATE TRIGGER on_insert
    INSTEAD OF INSERT
    ON information.v_entity_association
    FOR EACH ROW
    EXECUTE PROCEDURE information.v_entity_association_find_or_create();


-- 20
CREATE OR REPLACE VIEW warehouse.v_entity_association_per_project_and_repo AS
 SELECT DISTINCT ea.pk_entity,
    ea.fk_info_domain,
    ea.fk_info_range,
    ea.fk_data_domain,
    ea.fk_data_range,
    ea.fk_property,
    epr.fk_project,
    epr.ord_num_of_domain AS rank_for_domain,
    epr.ord_num_of_domain AS rank_for_range,
    COALESCE(epr.fk_project, 0) AS project
   FROM information.v_entity_association ea
     LEFT JOIN projects.info_proj_rel epr ON epr.fk_entity = ea.pk_entity AND epr.is_in_project = true
UNION
 SELECT DISTINCT ea.pk_entity,
    ea.fk_info_domain,
    ea.fk_info_range,
    ea.fk_data_domain,
    ea.fk_data_range,
    ea.fk_property,
    NULL::integer AS fk_project,
    ea.rank_for_domain,
    ea.rank_for_range,
    0 AS project
   FROM information.v_entity_association ea
  WHERE ea.is_in_project_count > 0;


-- 19
CREATE OR REPLACE VIEW warehouse.v_fk_type AS
 WITH entities AS (
         SELECT v_entities.pk_entity,
            v_entities.fk_project,
            v_entities.project,
            v_entities.fk_class,
            v_entities.table_name,
            v_entities.entity_type
           FROM warehouse.v_entities
        )
 SELECT DISTINCT ea.fk_info_domain AS pk_entity,
    ea.fk_project,
    ea.project,
    ea.fk_info_range AS fk_type
   FROM warehouse.v_entity_association_per_project_and_repo ea
     JOIN projects.info_proj_rel epr ON ea.pk_entity = epr.fk_entity
     JOIN data_for_history.property p ON ea.fk_property = p.dfh_pk_property
     JOIN system.class_has_type_property hasprop ON hasprop.fk_property = p.dfh_pk_property
  WHERE ea.rank_for_domain = 1;

-- 18
DROP VIEW warehouse.v_entity_association_per_project_and_repo_no_ranks;

-- 17
DROP VIEW information.v_entity_association_tmp;

-- 16
DROP VIEW warehouse.v_entity_preview;
DROP VIEW warehouse.v_entity_preview_non_recursive ;
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

-- 15
DROP TRIGGER on_insert ON information.v_role;

-- 13
ALTER VIEW information.v_role RENAME TO v_role_tmp;

-- 14
CREATE FUNCTION information.v_role_tmp_find_or_create()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
    DECLARE
      resulting_pk integer;
      resulting_row information.v_role_tmp;
    BEGIN

      -- RAISE INFO 'input values: %', NEW;

      ------ if existing, store in result -----
      SELECT pk_entity FROM INTO resulting_pk information.role
        WHERE
            fk_entity = NEW.fk_entity
            AND fk_temporal_entity = NEW.fk_temporal_entity
            AND fk_property = NEW.fk_property;

            -- RAISE INFO 'result of select: %', resulting_row;

      ------- if not existing, insert and store in result -----
        IF NOT FOUND THEN

              -- RAISE INFO 'Not found, creating new...';

            WITH _insert AS (
                INSERT INTO information.role (
                    fk_entity,
                    fk_temporal_entity,
                    fk_property
                )
                VALUES (
                    NEW.fk_entity,
                    NEW.fk_temporal_entity,
                    NEW.fk_property
                )
                -- return all fields of the new row
                RETURNING *
                )
            SELECT pk_entity FROM INTO resulting_pk _insert;

              -- RAISE INFO 'result of insert: %', resulting_row;
      END IF;

  SELECT * FROM INTO resulting_row information.v_role_tmp
  WHERE pk_entity = resulting_pk;
RETURN resulting_row;
  END;
  $BODY$;

CREATE TRIGGER on_insert
    INSTEAD OF INSERT
    ON information.v_role_tmp
    FOR EACH ROW
    EXECUTE PROCEDURE information.v_role_tmp_find_or_create();

-- 12
ALTER VIEW warehouse.v_roles_per_project_and_repo RENAME TO v_roles_per_project_and_repo_no_rank;

-- 11
CREATE OR REPLACE VIEW information.v_role AS
 WITH role_project_count AS (
         SELECT r_1.pk_entity,
            r_1.fk_property,
            r_1.fk_entity,
            r_1.fk_temporal_entity,
            COALESCE(count(*) FILTER (WHERE epr.is_in_project = true), 0::bigint) AS is_in_project_count,
            COALESCE(count(*) FILTER (WHERE epr.ord_num_of_domain = 0), 0::bigint) AS is_standard_in_project_count,
            mode() WITHIN GROUP (ORDER BY epr.calendar) AS community_favorite_calendar,
            r_1.notes,
            r_1.tmsp_creation,
            r_1.tmsp_last_modification,
            r_1.sys_period
           FROM information.role r_1
             LEFT JOIN projects.info_proj_rel epr ON epr.fk_entity = r_1.pk_entity
          GROUP BY r_1.pk_entity, r_1.fk_property, r_1.fk_entity, r_1.fk_temporal_entity, r_1.notes, r_1.tmsp_creation, r_1.tmsp_last_modification, r_1.sys_period
        )
 SELECT r.pk_entity,
    r.fk_property,
    r.fk_entity,
    r.fk_temporal_entity,
    r.is_in_project_count,
    r.is_standard_in_project_count,
    r.community_favorite_calendar,
    r.notes,
    r.tmsp_creation,
    r.tmsp_last_modification,
    r.sys_period,
    row_number() OVER (PARTITION BY r.fk_temporal_entity, r.fk_property ORDER BY r.is_in_project_count DESC, r.tmsp_creation DESC) AS rank_for_te_ent,
    p.dfh_range_instances_max_quantifier AS range_max_quantifier,
    row_number() OVER (PARTITION BY r.fk_entity, r.fk_property ORDER BY r.is_in_project_count DESC, r.tmsp_creation DESC) AS rank_for_pe_it,
    p.dfh_domain_instances_max_quantifier AS domain_max_quantifier
   FROM role_project_count r
     JOIN data_for_history.property p ON r.fk_property = p.dfh_pk_property;

CREATE TRIGGER on_insert
    INSTEAD OF INSERT
    ON information.v_role
    FOR EACH ROW
    EXECUTE PROCEDURE information.v_role_find_or_create();

-- 10
CREATE OR REPLACE VIEW warehouse.v_roles_per_project_and_repo AS
 SELECT DISTINCT r.fk_entity,
    r.fk_temporal_entity,
    r.fk_property,
    epr.fk_project,
    epr.ord_num_of_domain AS rank_for_pe_it,
    epr.ord_num_of_domain AS rank_for_te_ent,
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

-- -- 9
-- CREATE OR REPLACE VIEW warehouse.v_entity_preview AS
--  WITH previews_non_recursive AS (
--          SELECT v_entity_preview_non_recursive.pk_entity,
--             v_entity_preview_non_recursive.fk_project,
--             v_entity_preview_non_recursive.project,
--             v_entity_preview_non_recursive.fk_class,
--             v_entity_preview_non_recursive.table_name,
--             v_entity_preview_non_recursive.entity_type,
--             v_entity_preview_non_recursive.class_label,
--             v_entity_preview_non_recursive.entity_label,
--             v_entity_preview_non_recursive.time_span,
--             v_entity_preview_non_recursive.own_full_text,
--             v_entity_preview_non_recursive.fk_entity_label,
--             v_entity_preview_non_recursive.fk_type
--            FROM warehouse.v_entity_preview_non_recursive
--         ), fill_entity_label AS (
--          SELECT t1.pk_entity,
--             t1.fk_project,
--             t1.project,
--             t1.fk_class,
--             t1.entity_type,
--             t1.class_label,
--             COALESCE(t1.entity_label, t2.entity_label) AS entity_label,
--             t1.time_span,
--             t1.own_full_text,
--             t1.fk_entity_label,
--             t1.fk_type
--            FROM previews_non_recursive t1
--              LEFT JOIN previews_non_recursive t2 ON t1.fk_entity_label = t2.pk_entity AND t1.project = t2.project
--         ), fill_type_label AS (
--          SELECT t1.pk_entity,
--             t1.fk_project,
--             t1.project,
--             t1.fk_class,
--             t1.entity_type,
--             t1.class_label,
--             t1.entity_label,
--             t1.time_span,
--             t1.own_full_text,
--             t1.fk_entity_label,
--             t1.fk_type,
--             t2.entity_label AS type_label
--            FROM fill_entity_label t1
--              LEFT JOIN fill_entity_label t2 ON t1.fk_type = t2.pk_entity AND t1.project = t2.project
--         ), full_text_dependencies AS (
--          SELECT r.fk_temporal_entity AS pk_entity,
--             r.project,
--             r.fk_project,
--             e.pk_entity AS pk_related_full_text,
--             pre.own_full_text
--            FROM warehouse.v_roles_per_project_and_repo r
--              JOIN information.entity e ON e.pk_entity = r.fk_entity AND e.table_name::text = 'persistent_item'::text
--              LEFT JOIN previews_non_recursive pre ON pre.pk_entity = e.pk_entity AND pre.project = r.project
--         UNION
--          SELECT r.fk_entity AS pk_entity,
--             r.project,
--             r.fk_project,
--             e.pk_entity AS pk_related_full_text,
--             pre.own_full_text
--            FROM warehouse.v_roles_per_project_and_repo r
--              JOIN information.entity e ON e.pk_entity = r.fk_temporal_entity AND e.table_name::text = 'temporal_entity'::text
--              LEFT JOIN previews_non_recursive pre ON pre.pk_entity = e.pk_entity AND pre.project = r.project
--         ), aggregated_related_full_texts AS (
--          SELECT full_text_dependencies.pk_entity,
--             full_text_dependencies.project,
--             full_text_dependencies.fk_project,
--             jsonb_object_agg(full_text_dependencies.pk_related_full_text::text, full_text_dependencies.own_full_text) AS related_full_texts
--            FROM full_text_dependencies
--           GROUP BY full_text_dependencies.pk_entity, full_text_dependencies.project, full_text_dependencies.fk_project
--         ), related_full_text AS (
--          SELECT t1.pk_entity,
--             t1.fk_project,
--             t1.project,
--             t1.fk_class,
--             t1.entity_type,
--             t1.class_label,
--             t1.entity_label,
--             t1.time_span,
--             t1.own_full_text,
--             t1.fk_entity_label,
--             t1.fk_type,
--             t1.type_label,
--             t2.related_full_texts
--            FROM fill_type_label t1
--              LEFT JOIN aggregated_related_full_texts t2 ON t1.pk_entity = t2.pk_entity AND t1.project = t2.project
--         ), add_full_text AS (
--          SELECT f.pk_entity,
--             f.fk_project,
--             f.project,
--             f.fk_class,
--             f.entity_type,
--             f.class_label,
--             f.entity_label,
--             f.time_span,
--             f.own_full_text,
--             f.fk_entity_label,
--             f.fk_type,
--             f.type_label,
--             f.related_full_texts,
--             ( SELECT array_to_string(ARRAY[f.own_full_text, array_to_string(array_agg(jsonb_each_text.value), ', '::text)], ', '::text) AS array_to_string
--                    FROM jsonb_each_text(f.related_full_texts) jsonb_each_text(key, value)) AS full_text
--            FROM related_full_text f
--         ), add_ts_vector AS (
--          SELECT t.pk_entity,
--             t.fk_project,
--             t.project,
--             t.fk_class,
--             t.entity_type,
--             t.class_label,
--             t.entity_label,
--             t.time_span,
--             t.own_full_text,
--             t.fk_entity_label,
--             t.fk_type,
--             t.type_label,
--             t.related_full_texts,
--             t.full_text,
--             (setweight(to_tsvector(COALESCE(t.entity_label, ''::text)), 'A'::"char") || setweight(to_tsvector(COALESCE(t.type_label, t.class_label::text, ''::text)), 'B'::"char")) || setweight(to_tsvector(COALESCE(t.full_text, ''::text)), 'C'::"char") AS ts_vector
--            FROM add_full_text t
--         )
--  SELECT add_ts_vector.pk_entity,
--     add_ts_vector.fk_project,
--     add_ts_vector.project,
--     add_ts_vector.fk_class,
--     add_ts_vector.entity_type,
--     add_ts_vector.class_label,
--     add_ts_vector.entity_label,
--     add_ts_vector.time_span,
--     add_ts_vector.own_full_text,
--     add_ts_vector.fk_entity_label,
--     add_ts_vector.fk_type,
--     add_ts_vector.type_label,
--     add_ts_vector.related_full_texts,
--     add_ts_vector.full_text,
--     add_ts_vector.ts_vector
--    FROM add_ts_vector;


-- 8
CREATE OR REPLACE VIEW warehouse.v_fk_entity_label AS
 WITH entities AS (
         SELECT v_entities.pk_entity,
            v_entities.fk_project,
            v_entities.project,
            v_entities.fk_class,
            v_entities.table_name,
            v_entities.entity_type
           FROM warehouse.v_entities
        )
 SELECT entities.pk_entity,
    entities.fk_project,
    entities.project,
    entities.fk_class,
    entities.table_name,
    entities.entity_type,
    a.fk_entity_label
   FROM entities
     LEFT JOIN ( SELECT r.fk_entity AS pk_entity,
            r.fk_temporal_entity AS fk_entity_label,
            r.fk_project,
            row_number() OVER (PARTITION BY r.fk_entity, (COALESCE(r.fk_project, 0)) ORDER BY r.rank_for_pe_it) AS rank
           FROM warehouse.v_roles_per_project_and_repo r
             JOIN projects.class_field_config ucc ON ucc.fk_property = r.fk_property AND ucc.ord_num = 0 AND ucc.property_is_outgoing = false AND ucc.fk_app_context = 45
             JOIN information.entity e ON r.fk_temporal_entity = e.pk_entity AND e.table_name::text = 'temporal_entity'::text
        UNION
         SELECT r.fk_temporal_entity AS pk_entity,
            r.fk_entity AS fk_entity_label,
            r.fk_project,
            row_number() OVER (PARTITION BY r.fk_temporal_entity, (COALESCE(r.fk_project, 0)) ORDER BY r.rank_for_te_ent) AS rank
           FROM warehouse.v_roles_per_project_and_repo r
             JOIN projects.class_field_config ucc ON ucc.fk_property = r.fk_property AND ucc.ord_num = 0 AND ucc.property_is_outgoing = true AND ucc.fk_app_context = 45
             JOIN information.entity e ON r.fk_entity = e.pk_entity AND e.table_name::text = 'persistent_item'::text) a ON a.pk_entity = entities.pk_entity AND NOT a.fk_project IS DISTINCT FROM entities.fk_project
  WHERE a.rank = 1;


-- --7
-- CREATE OR REPLACE VIEW warehouse.v_own_entity_label AS
--  WITH entities AS (
--          SELECT v_entities.pk_entity,
--             v_entities.fk_project,
--             v_entities.project,
--             v_entities.fk_class,
--             v_entities.table_name,
--             v_entities.entity_type
--            FROM warehouse.v_entities
--         ), first_field AS (
--          SELECT e.pk_entity,
--             e.fk_project,
--             e.project,
--             e.fk_class,
--             e.table_name,
--             e.entity_type,
--             f.fk_property,
--             f.fk_class_field,
--             f.fk_class
--            FROM information.v_ordered_fields_per_class f
--              JOIN entities e ON f.fk_class = e.fk_class
--           WHERE f.field_order = 0
--         ), string_from_first_role AS (
--          SELECT all_roles.pk_entity,
--             all_roles.fk_project,
--             all_roles.project,
--             all_roles.fk_class,
--             all_roles.table_name,
--             all_roles.entity_type,
--             all_roles.fk_property,
--             all_roles.fk_class_field,
--             all_roles.fk_class_1 AS fk_class,
--             all_roles.string_from_first_role,
--             all_roles.role_number
--            FROM ( SELECT first_field.pk_entity,
--                     first_field.fk_project,
--                     first_field.project,
--                     first_field.fk_class,
--                     first_field.table_name,
--                     first_field.entity_type,
--                     first_field.fk_property,
--                     first_field.fk_class_field,
--                     first_field.fk_class_1 AS fk_class,
--                     COALESCE(appe.string, lang.notes) AS string_from_first_role,
--                     row_number() OVER (PARTITION BY first_field.pk_entity, first_field.project ORDER BY r.rank_for_pe_it) AS role_number
--                    FROM first_field first_field(pk_entity, fk_project, project, fk_class, table_name, entity_type, fk_property, fk_class_field, fk_class_1)
--                      LEFT JOIN warehouse.v_roles_per_project_and_repo r ON first_field.fk_property = r.fk_property AND first_field.pk_entity = r.fk_temporal_entity AND NOT r.fk_project IS DISTINCT FROM first_field.fk_project
--                      LEFT JOIN information.v_appellation appe ON r.fk_entity = appe.pk_entity
--                      LEFT JOIN information.v_language lang ON r.fk_entity = lang.pk_entity) all_roles(pk_entity, fk_project, project, fk_class, table_name, entity_type, fk_property, fk_class_field, fk_class_1, string_from_first_role, role_number)
--           WHERE all_roles.role_number = 1
--         ), string_from_first_text_prop AS (
--          SELECT all_txtp.p,
--             all_txtp.pk_entity,
--             all_txtp.fk_project,
--             all_txtp.project,
--             all_txtp.fk_class,
--             all_txtp.table_name,
--             all_txtp.entity_type,
--             all_txtp.fk_property,
--             all_txtp.fk_class_field,
--             all_txtp.fk_class_1 AS fk_class,
--             all_txtp.string_from_first_role,
--             all_txtp.role_number,
--             all_txtp.string_from_first_text_prop,
--             all_txtp.txtp_number
--            FROM ( SELECT COALESCE(string_from_first_role.fk_project, 0) AS p,
--                     string_from_first_role.pk_entity,
--                     string_from_first_role.fk_project,
--                     string_from_first_role.project,
--                     string_from_first_role.fk_class,
--                     string_from_first_role.table_name,
--                     string_from_first_role.entity_type,
--                     string_from_first_role.fk_property,
--                     string_from_first_role.fk_class_field,
--                     string_from_first_role.fk_class_1 AS fk_class,
--                     string_from_first_role.string_from_first_role,
--                     string_from_first_role.role_number,
--                     txtp.string AS string_from_first_text_prop,
--                     row_number() OVER (PARTITION BY string_from_first_role.pk_entity, string_from_first_role.project ORDER BY txtp.tmsp_creation DESC) AS txtp_number
--                    FROM string_from_first_role string_from_first_role(pk_entity, fk_project, project, fk_class, table_name, entity_type, fk_property, fk_class_field, fk_class_1, string_from_first_role, role_number)
--                      LEFT JOIN warehouse.v_text_properties_per_project_and_repo txtp ON NOT string_from_first_role.fk_class_field IS DISTINCT FROM txtp.fk_class_field AND txtp.fk_concerned_entity = string_from_first_role.pk_entity AND NOT txtp.fk_project IS DISTINCT FROM string_from_first_role.fk_project) all_txtp(p, pk_entity, fk_project, project, fk_class, table_name, entity_type, fk_property, fk_class_field, fk_class_1, string_from_first_role, role_number, string_from_first_text_prop, txtp_number)
--           WHERE all_txtp.txtp_number = 1
--         )
--  SELECT string_from_first_text_prop.pk_entity,
--     string_from_first_text_prop.fk_project,
--     COALESCE(string_from_first_text_prop.string_from_first_role, string_from_first_text_prop.string_from_first_text_prop) AS entity_label,
--     string_from_first_text_prop.project
--    FROM string_from_first_text_prop string_from_first_text_prop(p, pk_entity, fk_project, project, fk_class, table_name, entity_type, fk_property, fk_class_field, fk_class_1, string_from_first_role, role_number, string_from_first_text_prop, txtp_number);


-- -- 6

-- CREATE OR REPLACE VIEW warehouse.v_own_full_text AS
--  WITH entities AS (
--          SELECT v_entities.pk_entity,
--             v_entities.fk_project,
--             v_entities.project,
--             v_entities.fk_class,
--             v_entities.table_name,
--             v_entities.entity_type
--            FROM warehouse.v_entities
--         ), field AS (
--          SELECT e.pk_entity,
--             e.fk_project,
--             e.project,
--             e.fk_class,
--             e.table_name,
--             e.entity_type,
--             f.fk_property,
--             f.fk_class_field,
--             f.fk_class,
--             f.field_order
--            FROM information.v_ordered_fields_per_class f
--              JOIN entities e ON f.fk_class = e.fk_class
--           WHERE f.field_order IS NOT NULL
--         ), string_from_role AS (
--          SELECT all_roles.pk_entity,
--             all_roles.fk_project,
--             all_roles.project,
--             all_roles.fk_class,
--             all_roles.table_name,
--             all_roles.entity_type,
--             all_roles.fk_property,
--             all_roles.fk_class_field,
--             all_roles.fk_class_1 AS fk_class,
--             all_roles.field_order,
--             all_roles.string,
--             all_roles.role_number
--            FROM ( SELECT field.pk_entity,
--                     field.fk_project,
--                     field.project,
--                     field.fk_class,
--                     field.table_name,
--                     field.entity_type,
--                     field.fk_property,
--                     field.fk_class_field,
--                     field.fk_class_1 AS fk_class,
--                     field.field_order,
--                     COALESCE(appe.string, lang.notes) AS string,
--                     row_number() OVER (PARTITION BY field.pk_entity, field.project ORDER BY r.rank_for_pe_it) AS role_number
--                    FROM field field(pk_entity, fk_project, project, fk_class, table_name, entity_type, fk_property, fk_class_field, fk_class_1, field_order)
--                      LEFT JOIN warehouse.v_roles_per_project_and_repo r ON field.fk_property = r.fk_property AND field.pk_entity = r.fk_temporal_entity AND NOT r.fk_project IS DISTINCT FROM field.fk_project
--                      LEFT JOIN information.v_appellation appe ON r.fk_entity = appe.pk_entity
--                      LEFT JOIN information.v_language lang ON r.fk_entity = lang.pk_entity) all_roles(pk_entity, fk_project, project, fk_class, table_name, entity_type, fk_property, fk_class_field, fk_class_1, field_order, string, role_number)
--         ), string_from_text_prop AS (
--          SELECT all_txtp.pk_entity,
--             all_txtp.fk_project,
--             all_txtp.project,
--             all_txtp.fk_class,
--             all_txtp.table_name,
--             all_txtp.entity_type,
--             all_txtp.fk_property,
--             all_txtp.fk_class_field,
--             all_txtp.fk_class_1 AS fk_class,
--             all_txtp.field_order,
--             all_txtp.string,
--             all_txtp.txtp_number
--            FROM ( SELECT field.pk_entity,
--                     field.fk_project,
--                     field.project,
--                     field.fk_class,
--                     field.table_name,
--                     field.entity_type,
--                     field.fk_property,
--                     field.fk_class_field,
--                     field.fk_class_1 AS fk_class,
--                     field.field_order,
--                     regexp_replace(txtp.string, '[

-- ]+'::text, ''::text, 'g'::text) AS string,
--                     row_number() OVER (PARTITION BY field.pk_entity, field.project ORDER BY txtp.tmsp_creation DESC) AS txtp_number
--                    FROM field field(pk_entity, fk_project, project, fk_class, table_name, entity_type, fk_property, fk_class_field, fk_class_1, field_order)
--                      LEFT JOIN warehouse.v_text_properties_per_project_and_repo txtp ON NOT field.fk_class_field IS DISTINCT FROM txtp.fk_class_field AND txtp.fk_concerned_entity = field.pk_entity AND NOT txtp.fk_project IS DISTINCT FROM field.fk_project) all_txtp(pk_entity, fk_project, project, fk_class, table_name, entity_type, fk_property, fk_class_field, fk_class_1, field_order, string, txtp_number)
--         ), all_stings AS (
--          SELECT string_from_text_prop.pk_entity,
--             string_from_text_prop.fk_project,
--             string_from_text_prop.project,
--             string_from_text_prop.fk_class,
--             string_from_text_prop.table_name,
--             string_from_text_prop.entity_type,
--             string_from_text_prop.fk_property,
--             string_from_text_prop.fk_class_field,
--             string_from_text_prop.fk_class_1 AS fk_class,
--             string_from_text_prop.field_order,
--             string_from_text_prop.string,
--             string_from_text_prop.txtp_number
--            FROM string_from_text_prop string_from_text_prop(pk_entity, fk_project, project, fk_class, table_name, entity_type, fk_property, fk_class_field, fk_class_1, field_order, string, txtp_number)
--         UNION
--          SELECT string_from_role.pk_entity,
--             string_from_role.fk_project,
--             string_from_role.project,
--             string_from_role.fk_class,
--             string_from_role.table_name,
--             string_from_role.entity_type,
--             string_from_role.fk_property,
--             string_from_role.fk_class_field,
--             string_from_role.fk_class_1 AS fk_class,
--             string_from_role.field_order,
--             string_from_role.string,
--             string_from_role.role_number
--            FROM string_from_role string_from_role(pk_entity, fk_project, project, fk_class, table_name, entity_type, fk_property, fk_class_field, fk_class_1, field_order, string, role_number)
--         ), aggregated AS (
--          SELECT all_stings.pk_entity,
--             all_stings.fk_project,
--             all_stings.project,
--             string_agg(all_stings.string, ', '::text ORDER BY all_stings.field_order) AS own_full_text
--            FROM all_stings all_stings(pk_entity, fk_project, project, fk_class, table_name, entity_type, fk_property, fk_class_field, fk_class_1, field_order, string, txtp_number)
--           GROUP BY all_stings.pk_entity, all_stings.fk_project, all_stings.project
--         )
--  SELECT aggregated.pk_entity,
--     aggregated.fk_project,
--     aggregated.project,
--     aggregated.own_full_text
--    FROM aggregated;

-- 5
DROP VIEW  warehouse.v_text_properties_per_project_and_repo CASCADE;
CREATE OR REPLACE VIEW warehouse.v_text_properties_per_project_and_repo AS
SELECT
  t1.pk_entity,
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
  COALESCE(
    t2.fk_project, 0) AS "coalesce"
FROM
  information.v_text_property t1,
  projects.info_proj_rel t2
WHERE
  t2.fk_entity = t1.pk_entity
  AND t2.is_in_project = TRUE
UNION
SELECT
  t1.pk_entity,
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
  0 AS "coalesce"
FROM
  information.v_text_property t1
WHERE
  t1.is_in_project_count > 0;
-- re 6
CREATE OR REPLACE VIEW warehouse.v_own_full_text AS
 WITH entities AS (
         SELECT v_entities.pk_entity,
            v_entities.fk_project,
            v_entities.project,
            v_entities.fk_class,
            v_entities.table_name,
            v_entities.entity_type
           FROM warehouse.v_entities
        ), field AS (
         SELECT e.pk_entity,
            e.fk_project,
            e.project,
            e.fk_class,
            e.table_name,
            e.entity_type,
            f.fk_property,
            f.fk_class_field,
            f.fk_class,
            f.field_order
           FROM information.v_ordered_fields_per_class f
             JOIN entities e ON f.fk_class = e.fk_class
          WHERE f.field_order IS NOT NULL
        ), string_from_role AS (
         SELECT all_roles.pk_entity,
            all_roles.fk_project,
            all_roles.project,
            all_roles.fk_class,
            all_roles.table_name,
            all_roles.entity_type,
            all_roles.fk_property,
            all_roles.fk_class_field,
            all_roles.fk_class_1 AS fk_class,
            all_roles.field_order,
            all_roles.string,
            all_roles.role_number
           FROM ( SELECT field.pk_entity,
                    field.fk_project,
                    field.project,
                    field.fk_class,
                    field.table_name,
                    field.entity_type,
                    field.fk_property,
                    field.fk_class_field,
                    field.fk_class_1 AS fk_class,
                    field.field_order,
                    COALESCE(appe.string, lang.notes) AS string,
                    row_number() OVER (PARTITION BY field.pk_entity, field.project ORDER BY r.rank_for_pe_it) AS role_number
                   FROM field field(pk_entity, fk_project, project, fk_class, table_name, entity_type, fk_property, fk_class_field, fk_class_1, field_order)
                     LEFT JOIN warehouse.v_roles_per_project_and_repo r ON field.fk_property = r.fk_property AND field.pk_entity = r.fk_temporal_entity AND NOT r.fk_project IS DISTINCT FROM field.fk_project
                     LEFT JOIN information.v_appellation appe ON r.fk_entity = appe.pk_entity
                     LEFT JOIN information.v_language lang ON r.fk_entity = lang.pk_entity) all_roles(pk_entity, fk_project, project, fk_class, table_name, entity_type, fk_property, fk_class_field, fk_class_1, field_order, string, role_number)
        ), string_from_text_prop AS (
         SELECT all_txtp.pk_entity,
            all_txtp.fk_project,
            all_txtp.project,
            all_txtp.fk_class,
            all_txtp.table_name,
            all_txtp.entity_type,
            all_txtp.fk_property,
            all_txtp.fk_class_field,
            all_txtp.fk_class_1 AS fk_class,
            all_txtp.field_order,
            all_txtp.string,
            all_txtp.txtp_number
           FROM ( SELECT field.pk_entity,
                    field.fk_project,
                    field.project,
                    field.fk_class,
                    field.table_name,
                    field.entity_type,
                    field.fk_property,
                    field.fk_class_field,
                    field.fk_class_1 AS fk_class,
                    field.field_order,
                    regexp_replace(txtp.string, '[

]+'::text, ''::text, 'g'::text) AS string,
                    row_number() OVER (PARTITION BY field.pk_entity, field.project ORDER BY txtp.tmsp_creation DESC) AS txtp_number
                   FROM field field(pk_entity, fk_project, project, fk_class, table_name, entity_type, fk_property, fk_class_field, fk_class_1, field_order)
                     LEFT JOIN warehouse.v_text_properties_per_project_and_repo txtp ON NOT field.fk_class_field IS DISTINCT FROM txtp.fk_class_field AND txtp.fk_concerned_entity = field.pk_entity AND NOT txtp.fk_project IS DISTINCT FROM field.fk_project) all_txtp(pk_entity, fk_project, project, fk_class, table_name, entity_type, fk_property, fk_class_field, fk_class_1, field_order, string, txtp_number)
        ), all_stings AS (
         SELECT string_from_text_prop.pk_entity,
            string_from_text_prop.fk_project,
            string_from_text_prop.project,
            string_from_text_prop.fk_class,
            string_from_text_prop.table_name,
            string_from_text_prop.entity_type,
            string_from_text_prop.fk_property,
            string_from_text_prop.fk_class_field,
            string_from_text_prop.fk_class_1 AS fk_class,
            string_from_text_prop.field_order,
            string_from_text_prop.string,
            string_from_text_prop.txtp_number
           FROM string_from_text_prop string_from_text_prop(pk_entity, fk_project, project, fk_class, table_name, entity_type, fk_property, fk_class_field, fk_class_1, field_order, string, txtp_number)
        UNION
         SELECT string_from_role.pk_entity,
            string_from_role.fk_project,
            string_from_role.project,
            string_from_role.fk_class,
            string_from_role.table_name,
            string_from_role.entity_type,
            string_from_role.fk_property,
            string_from_role.fk_class_field,
            string_from_role.fk_class_1 AS fk_class,
            string_from_role.field_order,
            string_from_role.string,
            string_from_role.role_number
           FROM string_from_role string_from_role(pk_entity, fk_project, project, fk_class, table_name, entity_type, fk_property, fk_class_field, fk_class_1, field_order, string, role_number)
        ), aggregated AS (
         SELECT all_stings.pk_entity,
            all_stings.fk_project,
            all_stings.project,
            string_agg(all_stings.string, ', '::text ORDER BY all_stings.field_order) AS own_full_text
           FROM all_stings all_stings(pk_entity, fk_project, project, fk_class, table_name, entity_type, fk_property, fk_class_field, fk_class_1, field_order, string, txtp_number)
          GROUP BY all_stings.pk_entity, all_stings.fk_project, all_stings.project
        )
 SELECT aggregated.pk_entity,
    aggregated.fk_project,
    aggregated.project,
    aggregated.own_full_text
   FROM aggregated;
--7
CREATE OR REPLACE VIEW warehouse.v_own_entity_label AS
 WITH entities AS (
         SELECT v_entities.pk_entity,
            v_entities.fk_project,
            v_entities.project,
            v_entities.fk_class,
            v_entities.table_name,
            v_entities.entity_type
           FROM warehouse.v_entities
        ), first_field AS (
         SELECT e.pk_entity,
            e.fk_project,
            e.project,
            e.fk_class,
            e.table_name,
            e.entity_type,
            f.fk_property,
            f.fk_class_field,
            f.fk_class
           FROM information.v_ordered_fields_per_class f
             JOIN entities e ON f.fk_class = e.fk_class
          WHERE f.field_order = 0
        ), string_from_first_role AS (
         SELECT all_roles.pk_entity,
            all_roles.fk_project,
            all_roles.project,
            all_roles.fk_class,
            all_roles.table_name,
            all_roles.entity_type,
            all_roles.fk_property,
            all_roles.fk_class_field,
            all_roles.fk_class_1 AS fk_class,
            all_roles.string_from_first_role,
            all_roles.role_number
           FROM ( SELECT first_field.pk_entity,
                    first_field.fk_project,
                    first_field.project,
                    first_field.fk_class,
                    first_field.table_name,
                    first_field.entity_type,
                    first_field.fk_property,
                    first_field.fk_class_field,
                    first_field.fk_class_1 AS fk_class,
                    COALESCE(appe.string, lang.notes) AS string_from_first_role,
                    row_number() OVER (PARTITION BY first_field.pk_entity, first_field.project ORDER BY r.rank_for_pe_it) AS role_number
                   FROM first_field first_field(pk_entity, fk_project, project, fk_class, table_name, entity_type, fk_property, fk_class_field, fk_class_1)
                     LEFT JOIN warehouse.v_roles_per_project_and_repo r ON first_field.fk_property = r.fk_property AND first_field.pk_entity = r.fk_temporal_entity AND NOT r.fk_project IS DISTINCT FROM first_field.fk_project
                     LEFT JOIN information.v_appellation appe ON r.fk_entity = appe.pk_entity
                     LEFT JOIN information.v_language lang ON r.fk_entity = lang.pk_entity) all_roles(pk_entity, fk_project, project, fk_class, table_name, entity_type, fk_property, fk_class_field, fk_class_1, string_from_first_role, role_number)
          WHERE all_roles.role_number = 1
        ), string_from_first_text_prop AS (
         SELECT all_txtp.p,
            all_txtp.pk_entity,
            all_txtp.fk_project,
            all_txtp.project,
            all_txtp.fk_class,
            all_txtp.table_name,
            all_txtp.entity_type,
            all_txtp.fk_property,
            all_txtp.fk_class_field,
            all_txtp.fk_class_1 AS fk_class,
            all_txtp.string_from_first_role,
            all_txtp.role_number,
            all_txtp.string_from_first_text_prop,
            all_txtp.txtp_number
           FROM ( SELECT COALESCE(string_from_first_role.fk_project, 0) AS p,
                    string_from_first_role.pk_entity,
                    string_from_first_role.fk_project,
                    string_from_first_role.project,
                    string_from_first_role.fk_class,
                    string_from_first_role.table_name,
                    string_from_first_role.entity_type,
                    string_from_first_role.fk_property,
                    string_from_first_role.fk_class_field,
                    string_from_first_role.fk_class_1 AS fk_class,
                    string_from_first_role.string_from_first_role,
                    string_from_first_role.role_number,
                    txtp.string AS string_from_first_text_prop,
                    row_number() OVER (PARTITION BY string_from_first_role.pk_entity, string_from_first_role.project ORDER BY txtp.tmsp_creation DESC) AS txtp_number
                   FROM string_from_first_role string_from_first_role(pk_entity, fk_project, project, fk_class, table_name, entity_type, fk_property, fk_class_field, fk_class_1, string_from_first_role, role_number)
                     LEFT JOIN warehouse.v_text_properties_per_project_and_repo txtp ON NOT string_from_first_role.fk_class_field IS DISTINCT FROM txtp.fk_class_field AND txtp.fk_concerned_entity = string_from_first_role.pk_entity AND NOT txtp.fk_project IS DISTINCT FROM string_from_first_role.fk_project) all_txtp(p, pk_entity, fk_project, project, fk_class, table_name, entity_type, fk_property, fk_class_field, fk_class_1, string_from_first_role, role_number, string_from_first_text_prop, txtp_number)
          WHERE all_txtp.txtp_number = 1
        )
 SELECT string_from_first_text_prop.pk_entity,
    string_from_first_text_prop.fk_project,
    COALESCE(string_from_first_text_prop.string_from_first_role, string_from_first_text_prop.string_from_first_text_prop) AS entity_label,
    string_from_first_text_prop.project
   FROM string_from_first_text_prop string_from_first_text_prop(p, pk_entity, fk_project, project, fk_class, table_name, entity_type, fk_property, fk_class_field, fk_class_1, string_from_first_role, role_number, string_from_first_text_prop, txtp_number);
-- new

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
-- 9
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

-- 4
DROP VIEW warehouse.v_related_full_texts;
CREATE OR REPLACE VIEW warehouse.v_related_full_texts AS
 WITH entities AS (
         SELECT v_entities.pk_entity,
            v_entities.fk_project,
            v_entities.project,
            v_entities.fk_class,
            v_entities.table_name,
            v_entities.entity_type
           FROM warehouse.v_entities
        ), all_dependencies AS (
         SELECT r.fk_temporal_entity AS pk_entity,
            r.project,
            r.fk_project,
            e.pk_entity AS pk_related_full_text
           FROM warehouse.v_roles_per_project_and_repo r
             JOIN information.entity e ON e.pk_entity = r.fk_entity AND e.table_name::text = 'persistent_item'::text
        UNION
         SELECT r.fk_entity AS pk_entity,
            r.project,
            r.fk_project,
            e.pk_entity AS pk_related_full_text
           FROM warehouse.v_roles_per_project_and_repo r
             JOIN information.entity e ON e.pk_entity = r.fk_temporal_entity AND e.table_name::text = 'temporal_entity'::text
        ), agg AS (
         SELECT all_dependencies.pk_entity,
            all_dependencies.project,
            all_dependencies.fk_project,
            jsonb_object_agg(all_dependencies.pk_related_full_text::text, '') AS related_full_texts
           FROM all_dependencies
          GROUP BY all_dependencies.pk_entity, all_dependencies.project, all_dependencies.fk_project
        )
 SELECT agg.pk_entity,
    agg.project,
    agg.fk_project,
    agg.related_full_texts
   FROM agg;

-- 3
DROP VIEW warehouse.v_roles_per_project_and_repo_no_rank;
CREATE OR REPLACE VIEW warehouse.v_roles_per_project_and_repo_no_rank AS SELECT DISTINCT
  r.fk_entity,
  r.fk_temporal_entity,
  r.fk_property,
  epr.fk_project,
  COALESCE(
    epr.fk_project, 0) AS project
FROM
  information.v_role_tmp r
  LEFT JOIN projects.info_proj_rel epr ON epr.fk_entity = r.pk_entity
    AND epr.is_in_project = TRUE
  UNION
  SELECT DISTINCT
    r.fk_entity,
    r.fk_temporal_entity,
    r.fk_property,
    NULL::integer AS fk_project,
    0 AS project
  FROM
    information.v_role_tmp r
WHERE
  r.is_in_project_count > 0;

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

-- 1
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

