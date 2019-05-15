-- 8
CREATE OR REPLACE FUNCTION information.v_entity_association_find_or_create()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF 
AS $BODY$
    DECLARE
	  resulting_pk integer;
    resulting_row information.v_entity_association;
    BEGIN

      -- RAISE INFO 'input values: %', NEW;
        
      ------ if existing, store in result -----
      SELECT pk_entity FROM INTO resulting_pk information.entity_association
        WHERE              
            fk_domain_entity = NEW.fk_domain_entity
            AND fk_range_entity = NEW.fk_range_entity
            AND fk_property = NEW.fk_property;

            -- RAISE INFO 'result of select: %', resulting_row;

      ------- if not existing, insert and store in result -----
        IF NOT FOUND THEN
          
              -- RAISE INFO 'Not found, creating new...';
        
            WITH _insert AS (
                INSERT INTO information.entity_association (
                    fk_domain_entity, 
                    fk_range_entity,
                    fk_property
                ) 
                VALUES (
                    NEW.fk_domain_entity, 
                    NEW.fk_range_entity,
                    NEW.fk_property
                )
                -- return all fields of the new row
                RETURNING *
                ) 
            SELECT pk_entity FROM INTO resulting_pk _insert;
        
              -- RAISE INFO 'result of insert: %', resulting_row;
      END IF;

  	SELECT * FROM INTO resulting_row information.v_entity_association
  	WHERE pk_entity = resulting_pk;
	  
    RETURN resulting_row;
      END;
      $BODY$;


-- 7
DROP  VIEW warehouse.v_entity_preview;

-- 6
DROP  VIEW warehouse.v_entity_preview_non_recursive;

-- 5
DROP VIEW warehouse.v_fk_type;

-- 4
DROP VIEW warehouse.v_entity_association_per_project_and_repo;

-- 3
DROP VIEW information.v_entity_association;

-- 2
CREATE OR REPLACE VIEW information.v_entity_association AS
 WITH ea_project_count AS (
         SELECT ea_1.pk_entity,
            ea_1.fk_property,
            ea_1.fk_info_domain AS fk_domain_entity,
            ea_1.fk_info_range AS fk_range_entity,
            ea_1.notes,
            ea_1.tmsp_creation,
            ea_1.tmsp_last_modification,
            ea_1.sys_period,
            COALESCE(count(*) FILTER (WHERE epr.is_in_project = true), 0::bigint) AS is_in_project_count
           FROM information.entity_association ea_1
             LEFT JOIN projects.info_proj_rel epr ON epr.fk_entity = ea_1.pk_entity
          GROUP BY ea_1.pk_entity, ea_1.fk_property, ea_1.fk_info_domain, ea_1.fk_info_range, ea_1.notes, ea_1.tmsp_creation, ea_1.tmsp_last_modification, ea_1.sys_period
        )
 SELECT ea.pk_entity,
    ea.fk_property,
    ea.fk_domain_entity,
    ea.fk_range_entity,
    ea.notes,
    ea.tmsp_creation,
    ea.tmsp_last_modification,
    ea.sys_period,
    ea.is_in_project_count,
    row_number() OVER (PARTITION BY ea.fk_domain_entity, ea.fk_property ORDER BY ea.is_in_project_count DESC, ea.tmsp_creation DESC) AS rank_for_domain,
    p.dfh_range_instances_max_quantifier AS range_max_quantifier,
    row_number() OVER (PARTITION BY ea.fk_range_entity, ea.fk_property ORDER BY ea.is_in_project_count DESC, ea.tmsp_creation DESC) AS rank_for_range,
    p.dfh_domain_instances_max_quantifier AS domain_max_quantifier
   FROM ea_project_count ea
     JOIN data_for_history.property p ON ea.fk_property = p.dfh_pk_property;

CREATE TRIGGER on_insert
    INSTEAD OF INSERT
    ON information.v_entity_association
    FOR EACH ROW
    EXECUTE PROCEDURE information.v_entity_association_find_or_create();

CREATE OR REPLACE VIEW warehouse.v_entity_association_per_project_and_repo AS
 SELECT DISTINCT ea.pk_entity,
    ea.fk_range_entity,
    ea.fk_domain_entity,
    ea.fk_property,
    epr._deprecated_fk_project AS fk_project,
    epr.ord_num AS rank_for_domain,
    epr.ord_num AS rank_for_range,
    COALESCE(epr._deprecated_fk_project, 0) AS project
   FROM information.v_entity_association ea
     LEFT JOIN projects.info_proj_rel epr ON epr.fk_entity = ea.pk_entity AND epr.is_in_project = true
UNION
 SELECT DISTINCT ea.pk_entity,
    ea.fk_range_entity,
    ea.fk_domain_entity,
    ea.fk_property,
    NULL::integer AS fk_project,
    ea.rank_for_domain,
    ea.rank_for_range,
    0 AS project
   FROM information.v_entity_association ea
  WHERE ea.is_in_project_count > 0;


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
 SELECT DISTINCT ea.fk_domain_entity AS pk_entity,
    ea.fk_project,
    ea.project,
    ea.fk_range_entity AS fk_type
   FROM warehouse.v_entity_association_per_project_and_repo ea
     JOIN projects.info_proj_rel epr ON ea.pk_entity = epr.fk_entity
     JOIN data_for_history.property p ON ea.fk_property = p.dfh_pk_property
  WHERE (p.dfh_pk_property = ANY (ARRAY[1110, 1190, 1205, 1206, 1214, 1204, 1066])) AND ea.rank_for_domain = 1;


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
             LEFT JOIN information.v_te_en_time_span_per_project_and_repo t ON a.pk_entity = t.fk_temporal_entity AND NOT a.fk_project IS DISTINCT FROM t.fk_project
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

-- 1
ALTER TABLE information.entity_association RENAME COLUMN fk_info_range TO fk_range_entity;
ALTER TABLE information.entity_association RENAME COLUMN fk_info_domain TO fk_domain_entity;
ALTER TABLE information.entity_association DROP COLUMN fk_data_domain; 
ALTER TABLE information.entity_association DROP COLUMN fk_data_range; 
