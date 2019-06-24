-- 0
CREATE OR REPLACE VIEW information.v_role_tmp AS
	 SELECT t1.pk_entity,
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
   FROM information.role t1
   JOIN data_for_history.property p ON t1.fk_property = p.dfh_pk_property
   LEFT JOIN LATERAL (
		 SELECT
		 	count(pk_entity) is_in_project_count,
		 	COALESCE(count(*) FILTER (WHERE ord_num = 0), 0::bigint) AS is_standard_in_project_count,
		 	mode() WITHIN GROUP (ORDER BY calendar) AS community_favorite_calendar
		 FROM projects.info_proj_rel
		 WHERE fk_entity = t1.pk_entity AND is_in_project = true
		 GROUP BY fk_entity
	 ) AS t2 ON TRUE;

CREATE TRIGGER on_insert
    INSTEAD OF INSERT
    ON information.v_role_tmp
    FOR EACH ROW
    EXECUTE PROCEDURE information.v_role_find_or_create();

-- 1
CREATE OR REPLACE VIEW warehouse.v_roles_per_project_and_repo_no_rank AS
 SELECT DISTINCT r.fk_entity,
    r.fk_temporal_entity,
    r.fk_property,
    epr.fk_project,
    COALESCE(epr.fk_project, 0) AS project
   FROM information.v_role_tmp r
     LEFT JOIN projects.info_proj_rel epr ON epr.fk_entity = r.pk_entity AND epr.is_in_project = true
UNION
 SELECT DISTINCT r.fk_entity,
    r.fk_temporal_entity,
    r.fk_property,
    NULL::integer AS fk_project,
    0 AS project
   FROM information.v_role_tmp r
  WHERE r.is_in_project_count > 0;

-- 1 make warehouse.v_fk_entity_label independent from rank_for_pe_it and rank_for_te_ent
-- CREATE OR REPLACE VIEW warehouse.v_fk_entity_label AS
-- WITH entities AS (
--          SELECT v_entities.pk_entity,
--             v_entities.fk_project,
--             v_entities.project,
--             v_entities.fk_class,
--             v_entities.table_name,
--             v_entities.entity_type
--            FROM warehouse.v_entities
--         )
--  SELECT DISTINCT ON (entities.pk_entity, entities.project)
--  	entities.pk_entity,
--     entities.fk_project,
--     entities.project,
--     entities.fk_class,
--     entities.table_name,
--     entities.entity_type,
--     a.fk_entity_label
--     FROM entities
--      LEFT JOIN (
--         (
-- 			SELECT
-- 				r.fk_entity AS pk_entity,
-- 				r.fk_temporal_entity AS fk_entity_label,
-- 				prel.fk_project,
-- 				 r.is_in_project_count
-- 			FROM information.v_role r, projects.info_proj_rel prel, projects.class_field_config ucc, information.entity e
-- 			WHERE r.pk_entity = prel.fk_entity and prel.is_in_project = TRUE
-- 			AND ucc.fk_property = r.fk_property AND ucc.ord_num = 0 AND ucc.property_is_outgoing = false AND ucc.fk_app_context = 45
-- 			AND r.fk_temporal_entity = e.pk_entity AND e.table_name::text = 'temporal_entity'::text
-- 			ORDER BY r.is_in_project_count DESC
-- 		)
--         UNION
--         (
-- 			SELECT
-- 				r.fk_temporal_entity AS pk_entity,
-- 				r.fk_entity AS fk_entity_label,
-- 				prel.fk_project,
-- 				r.is_in_project_count
-- 			FROM information.v_role r, projects.info_proj_rel prel, projects.class_field_config ucc, information.entity e
-- 			WHERE r.pk_entity = prel.fk_entity and prel.is_in_project = TRUE
-- 			AND ucc.fk_property = r.fk_property AND ucc.ord_num = 0 AND ucc.property_is_outgoing = true AND ucc.fk_app_context = 45
-- 			AND r.fk_entity = e.pk_entity AND e.table_name::text = 'persistent_item'::text
-- 			ORDER BY r.is_in_project_count DESC
-- 		)
--   ) a ON a.pk_entity = entities.pk_entity AND a.fk_project IS NOT DISTINCT FROM entities.fk_project;
