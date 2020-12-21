-- 1 create function that gets all text properties of an entity

CREATE OR REPLACE FUNCTION information.get_accociated_text_properties(
	param_pk_entity integer)
    RETURNS TABLE(pk_entity integer, fk_class_field integer)
    LANGUAGE 'plpgsql'
AS $BODY$
BEGIN
   RETURN QUERY
	SELECT t1.pk_entity, t1.fk_class_field
	FROM information.text_property t1
	WHERE fk_concerned_entity = param_pk_entity;
END; $BODY$;

-- 2 extend add pe it to project to also add text properties
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
      UNION
      select pk_entity, null::calendar_type as calendar from information.get_accociated_text_properties(param_pk_entity)
		  )
		  insert into projects.info_proj_rel (fk_project, is_in_project, fk_entity, calendar, fk_last_modifier)
		  SELECT param_pk_project, true, pk_entity, calendar, param_account_id
		  FROM pk_entities_of_repo t1
      ON CONFLICT ON CONSTRAINT entity_version_project_rel_fk_entity_fk_project_key DO UPDATE SET
        is_in_project = EXCLUDED.is_in_project,
        calendar = EXCLUDED.calendar,
        fk_last_modifier = EXCLUDED.fk_last_modifier ;


  END $BODY$;
