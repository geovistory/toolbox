-- 5
DROP FUNCTION information.add_pe_it_to_project(integer, integer, integer);

CREATE OR REPLACE FUNCTION information.add_pe_it_to_project(
	pk_entity integer,
	pk_project integer,
	account_id integer)
    RETURNS void
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE
AS $BODY$ BEGIN

    EXECUTE format('

      -- Relate given persistent item to given project --
      ----------------------------------------------------

      WITH pe_it AS (
        select pk_entity, fk_class from information.persistent_item where pk_entity = %1$s
        ),
      -- Find "auto-add-properties" for all classes
      -- TODO: Add a filter for properties enabled by given project
      auto_add_properties AS (
        -- select the fk_class and the properties that are auto add because of a class_field_config
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
        Where ctxt.fk_app_context = 47 AND ctxt.ord_num is not null AND psprel.property_is_outgoing = true
      ),
      -- Find all roles related to the given persistent item pk_entity
      -- that are of an auto-add property
      pe_it_roles AS (
        select r.pk_entity, r.fk_temporal_entity, r.fk_property, r.fk_entity, addp.max_quantifier, r.community_favorite_calendar as calendar
        from information.v_role as r
        inner join pe_it on r.fk_entity = pe_it.pk_entity
        inner join auto_add_properties as addp on (
          addp.dfh_pk_property = r.fk_property AND addp.fk_class = pe_it.fk_class
        )
        -- take only the max quantity of rows for that property, exclude repo-alternatives
        WHERE r.rank_for_pe_it <= r.domain_max_quantifier OR r.domain_max_quantifier = -1  OR r.domain_max_quantifier IS NULL
      ),
      -- Find all temporal entities related to pe_it_roles
      -- that are of an auto-add property
      te_ents AS (
        select fk_temporal_entity as pk_entity
        from pe_it_roles
      ),
      -- Find all roles related to temporal entities mached by pe_it_roles
      -- that are of an auto-add property
      te_ent_roles AS (
        select r.pk_entity, r.fk_temporal_entity, r.fk_property, r.fk_entity, addp.max_quantifier, r.community_favorite_calendar as calendar
        from information.v_role as r
        inner join pe_it_roles as pi_r on pi_r.fk_temporal_entity = r.fk_temporal_entity
        inner join information.temporal_entity as te on te.pk_entity = pi_r.fk_temporal_entity
        inner join auto_add_properties as addp on (addp.dfh_pk_property = r.fk_property AND addp.fk_class = te.fk_class)
        -- take only the max quantity of rows for that property, exclude repo-alternatives
        WHERE r.rank_for_te_ent <= r.range_max_quantifier OR r.range_max_quantifier = -1 OR r.range_max_quantifier IS NULL
      ),
      -- find all entity associations that involve the pe_it
      -- that are of an auto-add property
      pe_it_entity_associations AS (
        -- where pe_it is domain
        select ea.pk_entity, ea.fk_info_domain, ea.fk_property, ea.fk_info_domain, addp.max_quantifier
        from information.v_entity_association as ea
        inner join pe_it on ea.fk_info_domain = pe_it.pk_entity
        inner join auto_add_properties as addp on (addp.dfh_pk_property = ea.fk_property AND addp.fk_class = pe_it.fk_class)
        -- take only the max allowed rows
        WHERE ea.rank_for_domain <= ea.range_max_quantifier OR ea.range_max_quantifier = -1 OR ea.range_max_quantifier IS NULL

        UNION

        -- where pe_it is range
        select ea.pk_entity, ea.fk_info_domain, ea.fk_property, ea.fk_info_domain, addp.max_quantifier
        from information.v_entity_association as ea
        inner join pe_it on ea.fk_info_domain = pe_it.pk_entity
        inner join auto_add_properties as addp on (addp.dfh_pk_property = ea.fk_property AND addp.fk_class = pe_it.fk_class)
        -- take only the max allowed rows
        WHERE ea.rank_for_range <= ea.domain_max_quantifier OR ea.domain_max_quantifier = -1  OR ea.domain_max_quantifier IS NULL
      ),
      -- TODO: find all entity associations that involve the te_ents (for types or mentionings of te_ents!)

      -- get a list of all pk_entities of repo version
      pk_entities_of_repo AS (
        select pk_entity, null::calendar_type as calendar from pe_it
        UNION
        select pk_entity, null::calendar_type as calendar from pe_it_entity_associations
        UNION
        select pk_entity, calendar from pe_it_roles
        UNION
        select pk_entity, null::calendar_type as calendar from te_ents
        UNION
        select pk_entity, calendar from te_ent_roles
      )

      insert into projects.v_info_proj_rel (fk_project, is_in_project, fk_entity, calendar, fk_last_modifier)
      SELECT %2$s, true, pk_entity, calendar, %3$s
      from pk_entities_of_repo;
    ',
        pk_entity,
        pk_project,
        account_id
    );

  END $BODY$;

-- 4
DROP FUNCTION information.get_ingoing_entity_associations_to_add (param_pk_entity INT);

-- 3
DROP FUNCTION information.get_outgoing_entity_associations_to_add(param_pk_entity INT);

-- 2
DROP FUNCTION information.get_outgoing_roles_to_add (param_pk_entity INT);

-- 1
DROP FUNCTION information.get_ingoing_roles_to_add (param_pk_entity INT);

-- 0
DROP VIEW system.v_auto_add_properties;
