-- 0
CREATE VIEW system.v_auto_add_properties AS
		select p.dfh_has_domain as fk_class, p.dfh_pk_property, p.dfh_range_instances_max_quantifier as max_quantifier
        from data_for_history.property as p
        inner join projects.class_field_config as ctxt on p.dfh_pk_property = ctxt.fk_property
        Where ctxt.fk_app_context = 47 AND ctxt.ord_num is not null AND ctxt.property_is_outgoing = true
        UNION
        select p.dfh_has_range as fk_class, p.dfh_pk_property, p.dfh_domain_instances_max_quantifier as max_quantifier
        from data_for_history.property as p
        inner join projects.class_field_config as ctxt on p.dfh_pk_property = ctxt.fk_property
        Where ctxt.fk_app_context = 47 AND ctxt.ord_num is not null AND ctxt.property_is_outgoing = false
        UNION
        -- select the fk_class and the properties that are auto add because of a property set
          select ctxt.fk_class_for_class_field, psprel.fk_property, p.dfh_domain_instances_max_quantifier as max_quantifier
        from data_for_history.property as p
        inner join system.class_field_property_rel as psprel on psprel.fk_property = p.dfh_pk_property
        inner join projects.class_field_config as ctxt on psprel.fk_class_field = ctxt.fk_class_field
        Where ctxt.fk_app_context = 47 AND ctxt.ord_num is not null AND psprel.property_is_outgoing = false
        UNION
          select ctxt.fk_class_for_class_field, psprel.fk_property, p.dfh_range_instances_max_quantifier as max_quantifier
        from data_for_history.property as p
        inner join system.class_field_property_rel as psprel on psprel.fk_property = p.dfh_pk_property
        inner join projects.class_field_config as ctxt on psprel.fk_class_field = ctxt.fk_class_field
        Where ctxt.fk_app_context = 47 AND ctxt.ord_num is not null AND psprel.property_is_outgoing = true;



-- 1 function that returns a table containing the ingoing_roles_to_add of an entity
CREATE OR REPLACE FUNCTION information.get_ingoing_roles_to_add (param_pk_entity INT)
   RETURNS TABLE (
       pk_entity INT,
	   fk_class INT,
	   fk_temporal_entity INT,
	   fk_property INT,
	   fk_entity INT,
	   max_quantifier SMALLINT,
	   calendar calendar_type
)
AS $$
BEGIN
   RETURN QUERY
	WITH tw1 AS (
		SELECT t1.pk_entity, t1.fk_class, 'persistent_item' table_name
		FROM information.persistent_item t1
		WHERE t1.pk_entity = param_pk_entity
		UNION ALL
		SELECT t2.pk_entity, t2.fk_class, 'temporal_entity' table_name
		FROM information.temporal_entity t2
		WHERE t2.pk_entity = param_pk_entity
	)
	SELECT DISTINCT
		ts2.pk_entity,
		ts1.fk_class,
		ts2.fk_temporal_entity,
		ts2.fk_property,
		ts2.fk_entity,
		ts1.max_quantifier,
		ts2.calendar
	FROM
		(
			SELECT
				t1.dfh_pk_property,
				t1.fk_class,
				t1.max_quantifier
			FROM
				system.v_auto_add_properties t1,
				tw1
			WHERE
				t1.fk_class = tw1.fk_class
		) AS ts1
		CROSS JOIN LATERAL (
			SELECT
				t1.pk_entity,
				t1.fk_temporal_entity,
				t1.fk_property,
				t1.fk_entity,
				t1.community_favorite_calendar as calendar
			FROM
				information.v_role t1,
				tw1
			WHERE
				t1.fk_entity = tw1.pk_entity
			AND
				t1.fk_property = ts1.dfh_pk_property
			AND
				t1.is_in_project_count IS NOT NULL
			ORDER BY t1.is_in_project_count DESC, t1.tmsp_creation DESC
			LIMIT (
				SELECT CASE WHEN ts1.max_quantifier = -1 THEN NULL ELSE ts1.max_quantifier END
			)
		) AS ts2;

END; $$

LANGUAGE 'plpgsql';


-- 2 function that returns a table containing the ingoing_roles_to_add of an entity

CREATE OR REPLACE FUNCTION information.get_outgoing_roles_to_add (param_pk_entity INT)
   RETURNS TABLE (
       pk_entity INT,
	   fk_class INT,
	   fk_temporal_entity INT,
	   fk_property INT,
	   fk_entity INT,
	   max_quantifier SMALLINT,
	   calendar calendar_type
)
AS $$
BEGIN
   RETURN QUERY
	WITH tw1 AS (
		SELECT t1.pk_entity, t1.fk_class, 'persistent_item' table_name
		FROM information.persistent_item t1
		WHERE t1.pk_entity = param_pk_entity
		UNION ALL
		SELECT t2.pk_entity, t2.fk_class, 'temporal_entity' table_name
		FROM information.temporal_entity t2
		WHERE t2.pk_entity = param_pk_entity
	)
	SELECT DISTINCT
		ts2.pk_entity,
		ts1.fk_class,
		ts2.fk_temporal_entity,
		ts2.fk_property,
		ts2.fk_entity,
		ts1.max_quantifier,
		ts2.calendar
	FROM
		(
			SELECT
				t1.dfh_pk_property,
				t1.fk_class,
				t1.max_quantifier
			FROM
				system.v_auto_add_properties t1,
				tw1
			WHERE
				t1.fk_class = tw1.fk_class
		) AS ts1
		CROSS JOIN LATERAL (
			SELECT
				t1.pk_entity,
				t1.fk_temporal_entity,
				t1.fk_property,
				t1.fk_entity,
				t1.community_favorite_calendar as calendar
			FROM
				information.v_role t1,
				tw1
			WHERE
				t1.fk_temporal_entity = tw1.pk_entity
			AND
				t1.fk_property = ts1.dfh_pk_property
			AND
				t1.is_in_project_count IS NOT NULL
			ORDER BY t1.is_in_project_count DESC, t1.tmsp_creation DESC
			LIMIT (
				SELECT CASE WHEN ts1.max_quantifier = -1 THEN NULL ELSE ts1.max_quantifier END
			)
		) AS ts2;

END; $$

LANGUAGE 'plpgsql';


-- 3
CREATE OR REPLACE FUNCTION information.get_outgoing_entity_associations_to_add (param_pk_entity INT)
   RETURNS TABLE (
       pk_entity INT,
	   fk_class INT,
	   fk_info_domain INT,
	   fk_property INT,
	   fk_info_range INT,
	   max_quantifier SMALLINT
)
AS $$
BEGIN
   RETURN QUERY
	WITH tw1 AS (
		SELECT t1.pk_entity, t1.fk_class, 'persistent_item' table_name
		FROM information.persistent_item t1
		WHERE t1.pk_entity = param_pk_entity
		UNION ALL
		SELECT t2.pk_entity, t2.fk_class, 'temporal_entity' table_name
		FROM information.temporal_entity t2
		WHERE t2.pk_entity = param_pk_entity
	)
	SELECT DISTINCT
		ts2.pk_entity,
		ts1.fk_class,
		ts2.fk_info_domain,
		ts2.fk_property,
		ts2.fk_info_range,
		ts1.max_quantifier
	FROM
		(
			SELECT
				t1.dfh_pk_property,
				t1.fk_class,
				t1.max_quantifier
			FROM
				system.v_auto_add_properties t1,
				tw1
			WHERE
				t1.fk_class = tw1.fk_class
		) AS ts1
		CROSS JOIN LATERAL (
			SELECT
				t1.pk_entity,
				t1.fk_info_domain,
				t1.fk_property,
				t1.fk_info_range
			FROM
				information.v_entity_association t1,
				tw1
			WHERE
				t1.fk_info_domain = tw1.pk_entity
			AND
				t1.fk_property = ts1.dfh_pk_property
			AND
				t1.is_in_project_count IS NOT NULL
			ORDER BY t1.is_in_project_count DESC, t1.tmsp_creation DESC
			LIMIT (
				SELECT CASE WHEN ts1.max_quantifier = -1 THEN NULL ELSE ts1.max_quantifier END
			)
		) AS ts2;

END; $$
LANGUAGE 'plpgsql';


-- 4
CREATE OR REPLACE FUNCTION information.get_ingoing_entity_associations_to_add (param_pk_entity INT)
   RETURNS TABLE (
       pk_entity INT,
	   fk_class INT,
	   fk_info_domain INT,
	   fk_property INT,
	   fk_info_range INT,
	   max_quantifier SMALLINT
)
AS $$
BEGIN
   RETURN QUERY
	WITH tw1 AS (
		SELECT t1.pk_entity, t1.fk_class, 'persistent_item' table_name
		FROM information.persistent_item t1
		WHERE t1.pk_entity = param_pk_entity
		UNION ALL
		SELECT t2.pk_entity, t2.fk_class, 'temporal_entity' table_name
		FROM information.temporal_entity t2
		WHERE t2.pk_entity = param_pk_entity
	)
	SELECT DISTINCT
		ts2.pk_entity,
		ts1.fk_class,
		ts2.fk_info_domain,
		ts2.fk_property,
		ts2.fk_info_range,
		ts1.max_quantifier
	FROM
		(
			SELECT
				t1.dfh_pk_property,
				t1.fk_class,
				t1.max_quantifier
			FROM
				system.v_auto_add_properties t1,
				tw1
			WHERE
				t1.fk_class = tw1.fk_class
		) AS ts1
		CROSS JOIN LATERAL (
			SELECT
				t1.pk_entity,
				t1.fk_info_domain,
				t1.fk_property,
				t1.fk_info_range
			FROM
				information.v_entity_association t1,
				tw1
			WHERE
				t1.fk_info_range = tw1.pk_entity
			AND
				t1.fk_property = ts1.dfh_pk_property
			AND
				t1.is_in_project_count IS NOT NULL
			ORDER BY t1.is_in_project_count DESC, t1.tmsp_creation DESC
			LIMIT (
				SELECT CASE WHEN ts1.max_quantifier = -1 THEN NULL ELSE ts1.max_quantifier END
			)
		) AS ts2;

END; $$
LANGUAGE 'plpgsql';


-- 5

DROP FUNCTION information.add_pe_it_to_project(integer,integer,integer);
CREATE OR REPLACE FUNCTION information.add_pe_it_to_project(
	param_pk_entity integer,
	param_pk_project integer,
	param_account_id integer)
    RETURNS void
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE
AS $BODY$ BEGIN
		WITH pe_it_roles AS (
			SELECT * FROM information.get_ingoing_roles_to_add(param_pk_entity)
		  ),
		  -- find all entity associations that involve the pe_it
		  pe_it_entity_associations AS (
			-- where pe_it is domain
			SELECT * FROM information.get_outgoing_entity_associations_to_add (param_pk_entity)
			UNION
			-- where pe_it is range
			SELECT * FROM information.get_ingoing_entity_associations_to_add (param_pk_entity)
		  ),
		  -- Find all temporal entities related to pe_it_roles
		  -- that are of an auto-add property
		  te_ents AS (
			SELECT fk_temporal_entity  as pk_entity
			FROM pe_it_roles
		  ),
		  -- Find all roles related to temporal entities mached by pe_it_roles
		  te_ent_roles AS (
			SELECT ts2.* FROM te_ents t2
			CROSS JOIN LATERAL ( SELECT * FROM information.get_outgoing_roles_to_add(t2.pk_entity) ) AS ts2
			UNION ALL
			SELECT ts2.* FROM te_ents t2
			CROSS JOIN LATERAL ( SELECT * FROM information.get_ingoing_roles_to_add(t2.pk_entity) ) AS ts2
		  ),
		  -- Find all entity_associations of temporal entities
		  te_ent_entity_associations AS (
			SELECT ts2.* FROM te_ents t2
			CROSS JOIN LATERAL ( SELECT * FROM information.get_outgoing_entity_associations_to_add(t2.pk_entity) ) AS ts2
			UNION ALL
			SELECT ts2.* FROM te_ents t2
			CROSS JOIN LATERAL ( SELECT * FROM information.get_ingoing_entity_associations_to_add(t2.pk_entity) ) AS ts2
		  ),
		  -- get a list of all pk_entities of repo version
		  pk_entities_of_repo AS (
			select param_pk_entity as pk_entity, null::calendar_type as calendar
			UNION
			select pk_entity, null::calendar_type as calendar from pe_it_entity_associations
			UNION
			select pk_entity, calendar from pe_it_roles
			UNION
			select pk_entity, null::calendar_type as calendar from te_ents
			UNION
			select pk_entity, calendar from te_ent_roles
			UNION
			select pk_entity, null::calendar_type as calendar from te_ent_entity_associations
		  )
		  insert into projects.v_info_proj_rel (fk_project, is_in_project, fk_entity, calendar, fk_last_modifier)
		  SELECT param_pk_project, true, pk_entity, calendar, param_account_id
		  from pk_entities_of_repo;

  END $BODY$;
