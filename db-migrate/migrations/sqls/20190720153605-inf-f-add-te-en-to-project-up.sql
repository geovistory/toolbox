-- 1
CREATE OR REPLACE FUNCTION information.add_te_en_to_project(
	param_pk_entity integer,
	param_pk_project integer,
	param_account_id integer)
    RETURNS void
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE
AS $BODY$ BEGIN
		  -- Find all roles related to temporal entity
		  WITH te_ent_roles AS (
			SELECT * FROM information.get_outgoing_roles_to_add(param_pk_entity)
			UNION ALL
			SELECT * FROM information.get_ingoing_roles_to_add(param_pk_entity)
		  ),
		  -- Find all entity_associations of temporal entities
		  te_ent_entity_associations AS (
			SELECT * FROM information.get_outgoing_entity_associations_to_add(param_pk_entity)
			UNION ALL
			SELECT * FROM information.get_ingoing_entity_associations_to_add(param_pk_entity)
		  ),
		  -- get a list of all pk_entities of repo version
		  pk_entities_of_repo AS (
			select param_pk_entity as pk_entity, null::calendar_type as calendar
			UNION
			select pk_entity, calendar from te_ent_roles
			UNION
			select pk_entity, null::calendar_type as calendar from te_ent_entity_associations
		  )
		  insert into projects.v_info_proj_rel (fk_project, is_in_project, fk_entity, calendar, fk_last_modifier)
		  SELECT param_pk_project, true, pk_entity, calendar, param_account_id
		  from pk_entities_of_repo;

  END $BODY$;


-- 2
CREATE OR REPLACE FUNCTION information.add_outgoing_roles_with_te_ens_to_project(
	param_pk_roles integer[],
	param_pk_project integer,
	param_account_id integer)
    RETURNS void
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE
AS $BODY$ BEGIN
		 WITH pe_it_roles AS (
			  select pk_entity, fk_temporal_entity
			  from information.v_role
			  where pk_entity IN (select(unnest(param_pk_roles)))
		  ),
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
			select pk_entity, null::calendar_type as calendar from pe_it_roles
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
