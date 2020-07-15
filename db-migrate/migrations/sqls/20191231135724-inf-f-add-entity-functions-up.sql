-- 1
Create View information.v_entity_class_map As (
    Select
        pk_entity,
        fk_class,
        'appellation' table_name
    From
        information.appellation
    Union All
    Select
        pk_entity,
        fk_class,
        'language' table_name
    From
        information.language
    Union All
    Select
        pk_entity,
        fk_class,
        'persistent_item' table_name
    From
        information.persistent_item
    Union All
    Select
        pk_entity,
        fk_class,
        'place' table_name
    From
        information.place
    Union All
    Select
        pk_entity,
        fk_class,
        'temporal_entity' table_name
    From
        information.temporal_entity
    Union All
    Select
        pk_entity,
        fk_class,
        'time_primitive' table_name
    From
        information.time_primitive);

-- 2 f: get ingoing roles to add
--Drop Function information.get_ingoing_roles_to_add (param_pk_entity int);

Create Or Replace Function information.get_ingoing_roles_to_add (
    entity_id integer,
    project_id integer
)
    Returns Table (
            pk_entity integer,
            fk_entity integer,
            fk_temporal_entity integer,
            calendar calendar_type
)
    Language SQL
    As $BODY$
    With tw1 As (
        -- select profiles the project
        Select
            fk_profile
        From
            projects.dfh_profile_proj_rel
        Where
            fk_project = project_id
        Union
        Select
            5 As fk_profile -- GEOVISTORY BASICS
),
tw2 As (
    -- select properties of the project
    Select Distinct On (pk_property,
        has_domain,
        has_range)
        pk_property,
        has_domain,
        has_range,
        domain_instances_max_quantifier
    From
        tw1 t1,
        data_for_history.api_property t2,
        data_for_history.v_property t3
    Where
        t1.fk_profile = t2.dfh_fk_profile
        And t3.pk_property = t2.dfh_pk_property
),
tw3 As (
    -- select all ingoing roles, joined with range and domain class
    Select
        t1.pk_entity,
        t1.fk_entity,
        t1.fk_temporal_entity,
        t3.fk_class range_class,
        t1.fk_property,
        Case When t4.domain_instances_max_quantifier = - 1 Then
            FLOAT8 '+infinity'
        When t4.domain_instances_max_quantifier Is Null Then
            FLOAT8 '+infinity'
        Else
            t4.domain_instances_max_quantifier
        End target_max_quantifier,
        t1.is_in_project_count,
        -- counts the items of same range and property
        row_number() Over (Partition By t3.fk_class,
            t1.fk_property Order By is_in_project_count Desc) As rank,
        t1.community_favorite_calendar calendar
    From
        information.v_role t1,
        information.v_entity_class_map t2,
        information.v_entity_class_map t3,
        tw2 t4
    Where
        fk_entity = entity_id
        And t1.fk_temporal_entity = t2.pk_entity
        And t1.fk_entity = t3.pk_entity
        And t1.fk_property = t4.pk_property
        And t2.fk_class = t4.has_domain
        And t3.fk_class = t4.has_range
)
Select
    pk_entity,
    fk_entity,
    fk_temporal_entity,
    calendar
From
    tw3
Where
    target_max_quantifier >= rank;

$BODY$;

-- 3 f: get outgoing roles to add
Drop Function information.get_outgoing_roles_to_add (param_pk_entity int);

Create Or Replace Function information.get_outgoing_roles_to_add (
    entity_id integer,
    project_id integer
)
    Returns Table (
            pk_entity integer,
            fk_entity integer,
            fk_temporal_entity integer,
            calendar calendar_type
)
    Language SQL
    As $BODY$
    With tw1 As (
        -- select profiles the project
        Select
            fk_profile
        From
            projects.dfh_profile_proj_rel
        Where
            fk_project = project_id
        Union
        Select
            5 As fk_profile -- GEOVISTORY BASICS
),
tw2 As (
    -- select properties of the project
    Select Distinct On (pk_property,
        has_domain,
        has_range)
        pk_property,
        has_domain,
        has_range,
        range_instances_max_quantifier
    From
        tw1 t1,
        data_for_history.api_property t2,
        data_for_history.v_property t3
    Where
        t1.fk_profile = t2.dfh_fk_profile
        And t3.pk_property = t2.dfh_pk_property
),
tw3 As (
    -- select all outgoing roles, joined with range and domain class
    Select
        t1.pk_entity,
        t1.fk_entity,
        t1.fk_temporal_entity,
        t3.fk_class range_class,
        t1.fk_property,
        Case When t4.range_instances_max_quantifier = - 1 Then
            FLOAT8 '+infinity'
        When t4.range_instances_max_quantifier Is Null Then
            FLOAT8 '+infinity'
        Else
            t4.range_instances_max_quantifier
        End target_max_quantifier,
        t1.is_in_project_count,
        -- counts the items of same domain and property
        row_number() Over (Partition By t3.fk_class,
            t1.fk_property Order By is_in_project_count Desc) As rank,
        t1.community_favorite_calendar calendar
    From
        information.v_role t1,
        information.v_entity_class_map t2,
        information.v_entity_class_map t3,
        tw2 t4
    Where
        fk_temporal_entity = entity_id
        And t1.fk_temporal_entity = t2.pk_entity
        And t1.fk_entity = t3.pk_entity
        And t1.fk_property = t4.pk_property
        And t4.has_domain In (t2.fk_class,
            50 -- make every class to a timespan class
)
        And t3.fk_class = t4.has_range
)
Select
    pk_entity,
    fk_entity,
    fk_temporal_entity,
    calendar
From
    tw3
Where
    target_max_quantifier >= rank;

$BODY$;

-- 4
Create Or Replace Function information.add_pe_it_to_project (
    param_pk_entity integer,
    param_pk_project integer,
    param_account_id integer
)
    Returns void
    Language 'sql'
    As $BODY$
    /**
     * Adds a persistent item to a project, with general properties:
     *
     * Appellations
     * - incoming roles of property 'has appellation for language' and is_in_projects_count > 0
     *	- temporal entities of class 'appellation use for language'
     *		- outgoing roles of those 'appellation use for languages',
     *			while in each group of property not more then the max quantifier allows
     *
     * Type
     * - max. one outgoing role fullfilling those criteria
     *		- it is of a has-type subproperty
     *		- it is the role with highes is_in_projects_count
     *		- is_in_projects_count > 0
     *
     * Text Properties
     * - All related text_properties that are in at least one project
     */
    With tw1 As (
        -- select roles 'has appellation for language'
        Select
            pk_entity,
            fk_temporal_entity
        From
            information.v_role
        Where
            fk_entity = param_pk_entity
            And fk_property = 1111
            And is_in_project_count > 0
),
tw2 As (
    -- select temporal entities 'appellation use for language'
    Select
        fk_temporal_entity As pk_entity
    From
        tw1
),
tw3 As (
    -- select outgoing roles of those 'appellation use for languages'
    Select
        t2.pk_entity,
        calendar
    From
        tw2 t1
    Cross Join Lateral (
        Select
            *
        From
            information.get_outgoing_roles_to_add (t1.pk_entity,
                param_pk_project)) As t2
),
tw4 As (
    -- select has type role
    Select
        t1.pk_entity
    From
        information.v_role t1,
        data_for_history.v_property t2
    Where
        t1.fk_temporal_entity = param_pk_entity
        And t1.fK_property = t2.pk_property
        And t2.is_has_type_subproperty
        And t1.is_in_project_count > 0
    Order By
        t1.is_in_project_count Desc
    Limit 1
),
tw5 As (
    -- select text properties
    Select Distinct
        t1.pk_entity
    From
        information.text_property t1,
        projects.info_proj_rel t2
    Where
        t1.fk_concerned_entity = param_pk_entity
        And t1.pk_entity = t2.fk_entity
        And t2.is_in_project = True
),
tw6 As (
    -- union all entities to add to project
    Select
        param_pk_entity pk_entity,
        null::calendar_type calendar
    Union
    Select
        pk_entity,
        null::calendar_type calendar
    From
        tw1
    Union
    Select
        pk_entity,
        null::calendar_type calendar
    From
        tw2
    Union
    Select
        pk_entity,
        calendar calendar
    From
        tw3
    Union
    Select
        pk_entity,
        null::calendar_type calendar
    From
        tw4
    Union
    Select
        pk_entity,
        null::calendar_type calendar
    From
        tw5)
    Insert Into projects.info_proj_rel (fk_project, is_in_project, fk_entity, calendar, fk_last_modifier)
Select
    param_pk_project,
    True,
    pk_entity,
    calendar,
    param_account_id
From
    tw6 t1 On Conflict On Constraint entity_version_project_rel_fk_entity_fk_project_key Do
    Update
        Set
            is_in_project = EXCLUDED.is_in_project, calendar = EXCLUDED.calendar, fk_last_modifier = EXCLUDED.fk_last_modifier;

$BODY$;

-- 5
Drop Function information.add_outgoing_roles_with_te_ens_to_project;

Create Or Replace Function information.relate_outgoing_roles_with_te_ens_to_project (
    param_pk_roles integer[],
    param_pk_project integer,
    param_account_id integer,
    param_is_in_project boolean
)
    Returns Setof projects.info_proj_rel
    Language SQL
    Cost 100 Volatile
    As $BODY$
    /**
     * Changes relation of temporal entities to project that are domain of given roles.
     *
     * For each temporal entity, select:
     *
     * * General properties
     *
     * Appellations
     * - incoming roles of property 'has appellation for language' and is_in_projects_count > 0
     *	- temporal entities of class 'appellation use for language'
     *		- outgoing roles of those 'appellation use for languages',
     *			while in each group of property not more then the max quantifier allows
     *
     * Type
     * - max. one outgoing role fullfilling those criteria
     *		- it is of a has-type subproperty
     *		- it is the role with highes is_in_projects_count
     *		- is_in_projects_count > 0
     *
     * Text Properties
     * - All related text_properties that are in at least one project
     *
     * * Specific properties
     *
     * Outgoing Roles
     * - outgoing role of properties, fullfilling those criteria:
     *	- property is enabled by the given project
     *	- max number of roles per property is not bigger than max range quantifier
     *	- role is_in_projects_count > 0
     *
     */
    /*
     *
     */
    With tw01 As (
        -- select the ingoing roles
        Select
            pk_entity,
            fk_temporal_entity
        From
            information.v_role
        Where
            pk_entity In (
                Select
                    (unnest(param_pk_roles)))
),
tw02 As (
    -- select the ids of the temproal entities
    Select
        fk_temporal_entity As pk_entity
    From
        tw01
),
/*
 * General properties
 */
tw1 As (
    -- select roles 'has appellation for language'
    Select
        t1.pk_entity,
        t1.fk_temporal_entity
    From
        information.v_role t1,
        tw02 t2
    Where
        t1.fk_entity = t2.pk_entity
        And t1.fk_property = 1111
        And t1.is_in_project_count > 0
),
tw2 As (
    -- select temporal entities 'appellation use for language'
    Select
        fk_temporal_entity As pk_entity
    From
        tw1
),
tw3 As (
    -- select outgoing roles of those 'appellation use for languages'
    Select
        t2.pk_entity,
        calendar
    From
        tw2 t1
    Cross Join Lateral (
        Select
            *
        From
            information.get_outgoing_roles_to_add (t1.pk_entity,
                param_pk_project)) As t2
),
tw4 As (
    -- select has type role
    Select
        t1.pk_entity
    From
        information.v_role t1,
        data_for_history.v_property t2,
        tw02 t3
    Where
        t1.fk_temporal_entity = t3.pk_entity
        And t1.fK_property = t2.pk_property
        And t2.is_has_type_subproperty
        And t1.is_in_project_count > 0
    Order By
        t1.is_in_project_count Desc
    Limit 1
),
tw5 As (
    -- select text properties
    Select Distinct
        t1.pk_entity
    From
        information.text_property t1,
        projects.info_proj_rel t2,
        tw02 t3
    Where
        t1.fk_concerned_entity = t3.pk_entity
        And t1.pk_entity = t2.fk_entity
        And t2.is_in_project = True
),
/**
 * Specific properties
 */
tw6 As (
    -- select outgoing roles of the temporal entities
    Select
        t2.pk_entity,
        calendar
    From
        tw02 t1
    Cross Join Lateral (
        Select
            *
        From
            information.get_outgoing_roles_to_add (t1.pk_entity,
                param_pk_project)) As t2
),
tw7 As (
    -- union all entities to add to project
    Select
        pk_entity,
        null::calendar_type calendar
    From
        tw02
Union
Select
    pk_entity,
    null::calendar_type calendar
From
    tw1
Union
Select
    pk_entity,
    null::calendar_type calendar
From
    tw2
Union
Select
    pk_entity,
    calendar calendar
From
    tw3
Union
Select
    pk_entity,
    null::calendar_type calendar
From
    tw4
Union
Select
    pk_entity,
    null::calendar_type calendar
From
    tw5
Union
Select
    pk_entity,
    calendar calendar
From
    tw6)
    Insert Into projects.info_proj_rel (fk_project, is_in_project, fk_entity, calendar, fk_last_modifier)
Select
    param_pk_project,
    param_is_in_project,
    pk_entity,
    calendar,
    param_account_id
From
    tw7 t1 On Conflict On Constraint entity_version_project_rel_fk_entity_fk_project_key Do
    Update
        Set
            is_in_project = EXCLUDED.is_in_project, calendar = EXCLUDED.calendar, fk_last_modifier = EXCLUDED.fk_last_modifier
        Returning
            *;

$BODY$;

