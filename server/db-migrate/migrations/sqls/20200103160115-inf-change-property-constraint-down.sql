-- 3
-- No way back
-- 2

Create Or Replace Function information.get_ingoing_entity_associations_to_add (
    param_pk_entity integer
)
    Returns Table (
            pk_entity integer,
            fk_class integer,
            fk_info_domain integer,
            fk_property integer,
            fk_info_range integer,
            max_quantifier smallint
)
    Language 'plpgsql'
    Cost 100 Volatile Rows 1000
    As $BODY$
Begin
    Return QUERY With tw1 As (
        Select
            t1.pk_entity,
            t1.fk_class,
            'persistent_item' table_name
        From
            information.persistent_item t1
        Where
            t1.pk_entity = param_pk_entity
        Union All
        Select
            t2.pk_entity,
            t2.fk_class,
            'temporal_entity' table_name
        From
            information.temporal_entity t2
        Where
            t2.pk_entity = param_pk_entity
)
    Select Distinct
        ts2.pk_entity,
        ts1.fk_class,
        ts2.fk_info_domain,
        ts2.fk_property,
        ts2.fk_info_range,
        ts1.max_quantifier
    From (
        Select
            t1.dfh_pk_property,
            t1.fk_class,
            t1.max_quantifier
        From
            system.v_auto_add_properties t1,
            tw1
        Where
            t1.fk_class = tw1.fk_class) As ts1
    Cross Join Lateral (
        Select
            t1.pk_entity,
            t1.fk_info_domain,
            t1.fk_property,
            t1.fk_info_range
        From
            information.v_entity_association t1,
            tw1
        Where
            t1.fk_info_range = tw1.pk_entity
            And t1.fk_property = ts1.dfh_pk_property
            And t1.is_in_project_count Is Not Null
        Order By
            t1.is_in_project_count Desc,
            t1.tmsp_creation Desc
        Limit (
            Select
                Case When ts1.max_quantifier = - 1 Then
                    Null
                Else
                    ts1.max_quantifier
                End)) As ts2;
End;
$BODY$;

Create Or Replace Function information.get_outgoing_entity_associations_to_add (
    param_pk_entity integer
)
    Returns Table (
            pk_entity integer,
            fk_class integer,
            fk_info_domain integer,
            fk_property integer,
            fk_info_range integer,
            max_quantifier smallint
)
    Language 'plpgsql'
    Cost 100 Volatile Rows 1000
    As $BODY$
Begin
    Return QUERY With tw1 As (
        Select
            t1.pk_entity,
            t1.fk_class,
            'persistent_item' table_name
        From
            information.persistent_item t1
        Where
            t1.pk_entity = param_pk_entity
        Union All
        Select
            t2.pk_entity,
            t2.fk_class,
            'temporal_entity' table_name
        From
            information.temporal_entity t2
        Where
            t2.pk_entity = param_pk_entity
)
    Select Distinct
        ts2.pk_entity,
        ts1.fk_class,
        ts2.fk_info_domain,
        ts2.fk_property,
        ts2.fk_info_range,
        ts1.max_quantifier
    From (
        Select
            t1.dfh_pk_property,
            t1.fk_class,
            t1.max_quantifier
        From
            system.v_auto_add_properties t1,
            tw1
        Where
            t1.fk_class = tw1.fk_class) As ts1
    Cross Join Lateral (
        Select
            t1.pk_entity,
            t1.fk_info_domain,
            t1.fk_property,
            t1.fk_info_range
        From
            information.v_entity_association t1,
            tw1
        Where
            t1.fk_info_domain = tw1.pk_entity
            And t1.fk_property = ts1.dfh_pk_property
            And t1.is_in_project_count Is Not Null
        Order By
            t1.is_in_project_count Desc,
            t1.tmsp_creation Desc
        Limit (
            Select
                Case When ts1.max_quantifier = - 1 Then
                    Null
                Else
                    ts1.max_quantifier
                End)) As ts2;
End;
$BODY$;

Create Or Replace Function information.get_ingoing_roles_to_add (
    param_pk_entity integer
)
    Returns Table (
            pk_entity integer,
            fk_class integer,
            fk_temporal_entity integer,
            fk_property integer,
            fk_entity integer,
            max_quantifier smallint,
            calendar calendar_type
)
    Language 'plpgsql'
    Cost 100 Volatile Rows 1000
    As $BODY$
Begin
    Return QUERY With tw1 As (
        Select
            t1.pk_entity,
            t1.fk_class,
            'persistent_item' table_name
        From
            information.persistent_item t1
        Where
            t1.pk_entity = param_pk_entity
        Union All
        Select
            t2.pk_entity,
            t2.fk_class,
            'temporal_entity' table_name
        From
            information.temporal_entity t2
        Where
            t2.pk_entity = param_pk_entity
)
    Select Distinct
        ts2.pk_entity,
        ts1.fk_class,
        ts2.fk_temporal_entity,
        ts2.fk_property,
        ts2.fk_entity,
        ts1.max_quantifier,
        ts2.calendar
    From (
        Select
            t1.dfh_pk_property,
            t1.fk_class,
            t1.max_quantifier
        From
            system.v_auto_add_properties t1,
            tw1
        Where
            t1.fk_class = tw1.fk_class) As ts1
    Cross Join Lateral (
        Select
            t1.pk_entity,
            t1.fk_temporal_entity,
            t1.fk_property,
            t1.fk_entity,
            t1.community_favorite_calendar As calendar
        From
            information.v_role t1,
            tw1
        Where
            t1.fk_entity = tw1.pk_entity
            And t1.fk_property = ts1.dfh_pk_property
            And t1.is_in_project_count Is Not Null
        Order By
            t1.is_in_project_count Desc,
            t1.tmsp_creation Desc
        Limit (
            Select
                Case When ts1.max_quantifier = - 1 Then
                    Null
                Else
                    ts1.max_quantifier
                End)) As ts2;
End;
$BODY$;

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
    Language 'sql'
    Cost 100 Volatile Rows 1000
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

Create Or Replace Function information.add_te_en_to_project (
    param_pk_entity integer,
    param_pk_project integer,
    param_account_id integer
)
    Returns void
    Language 'plpgsql'
    Cost 100 Volatile
    As $BODY$
Begin
    -- Find all roles related to temporal entity
    With te_ent_roles As (
        Select
            *
        From
            information.get_outgoing_roles_to_add (param_pk_entity)
        Union All
        Select
            *
        From
            information.get_ingoing_roles_to_add (param_pk_entity)
),
-- Find all entity_associations of temporal entities
te_ent_entity_associations As (
    Select
        *
    From
        information.get_outgoing_entity_associations_to_add (param_pk_entity)
    Union All
    Select
        *
    From
        information.get_ingoing_entity_associations_to_add (param_pk_entity)
),
-- get a list of all pk_entities of repo version
pk_entities_of_repo As (
    Select
        param_pk_entity As pk_entity,
        null::calendar_type As calendar
    Union
    Select
        pk_entity,
        calendar
    From
        te_ent_roles
    Union
    Select
        pk_entity,
        null::calendar_type As calendar
    From
        te_ent_entity_associations)
    Insert Into projects.v_info_proj_rel (fk_project, is_in_project, fk_entity, calendar, fk_last_modifier)
Select
    param_pk_project,
    True,
    pk_entity,
    calendar,
    param_account_id
From
    pk_entities_of_repo;
End
$BODY$;

-- 1
Create Or Replace View information.v_entity_association As With ea_project_count As (
    Select
        ea_1.pk_entity,
        ea_1.fk_property,
        ea_1.fk_info_domain,
        ea_1.fk_info_range,
        ea_1.fk_data_domain,
        ea_1.fk_data_range,
        ea_1.notes,
        ea_1.tmsp_creation,
        ea_1.tmsp_last_modification,
        ea_1.sys_period,
        coalesce(count(*) Filter (Where epr.is_in_project = True), 0::bigint)::integer As is_in_project_count
    From
        information.entity_association ea_1
    Left Join projects.info_proj_rel epr On epr.fk_entity = ea_1.pk_entity
Group By
    ea_1.pk_entity,
    ea_1.fk_property,
    ea_1.fk_info_domain,
    ea_1.fk_info_range,
    ea_1.fk_data_domain,
    ea_1.fk_data_range,
    ea_1.notes,
    ea_1.tmsp_creation,
    ea_1.tmsp_last_modification,
    ea_1.sys_period
)
Select
    ea.pk_entity,
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
    p.dfh_range_instances_max_quantifier As range_max_quantifier,
    p.dfh_domain_instances_max_quantifier As domain_max_quantifier
From
    ea_project_count ea
    Left Join data_for_history.property p On ea.fk_property = p.dfh_pk_property;

