-- 5
Drop Function information.relate_outgoing_roles_with_te_ens_to_project;

Create Or Replace Function information.add_outgoing_roles_with_te_ens_to_project (
    param_pk_roles integer[],
    param_pk_project integer,
    param_account_id integer
)
    Returns void
    Language 'plpgsql'
    Cost 100 Volatile
    As $BODY$
Begin
    With pe_it_roles As (
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
te_ents As (
    Select
        fk_temporal_entity As pk_entity
    From
        pe_it_roles
),
-- Find all roles related to temporal entities mached by pe_it_roles
te_ent_roles As (
    Select
        ts2.*
    From
        te_ents t2
    Cross Join Lateral (
        Select
            *
        From
            information.get_outgoing_roles_to_add (t2.pk_entity)) As ts2
Union All
Select
    ts2.*
From
    te_ents t2
    Cross Join Lateral (
        Select
            *
        From
            information.get_ingoing_roles_to_add (t2.pk_entity)) As ts2
),
-- Find all entity_associations of temporal entities
te_ent_entity_associations As (
    Select
        ts2.*
    From
        te_ents t2
        Cross Join Lateral (
            Select
                *
            From
                information.get_outgoing_entity_associations_to_add (t2.pk_entity)) As ts2
    Union All
    Select
        ts2.*
    From
        te_ents t2
    Cross Join Lateral (
        Select
            *
        From
            information.get_ingoing_entity_associations_to_add (t2.pk_entity)) As ts2
),
-- get a list of all pk_entities of repo version
pk_entities_of_repo As (
    Select
        pk_entity,
        null::calendar_type As calendar
    From
        pe_it_roles
Union
Select
    pk_entity,
    null::calendar_type As calendar
From
    te_ents
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

-- 4
Create Or Replace Function information.add_pe_it_to_project (
    param_pk_entity integer,
    param_pk_project integer,
    param_account_id integer
)
    Returns void
    Language 'plpgsql'
    Cost 100 Volatile
    As $BODY$
Begin
    With pe_it_roles As (
        Select
            *
        From
            information.get_ingoing_roles_to_add (param_pk_entity)
),
-- find all entity associations that involve the pe_it
pe_it_entity_associations As (
    -- where pe_it is domain
    Select
        *
    From
        information.get_outgoing_entity_associations_to_add (param_pk_entity)
    Union
    -- where pe_it is range
    Select
        *
    From
        information.get_ingoing_entity_associations_to_add (param_pk_entity)
),
-- Find all temporal entities related to pe_it_roles
-- that are of an auto-add property
te_ents As (
    Select
        fk_temporal_entity As pk_entity
    From
        pe_it_roles
),
-- Find all roles related to temporal entities mached by pe_it_roles
te_ent_roles As (
    Select
        ts2.*
    From
        te_ents t2
    Cross Join Lateral (
        Select
            *
        From
            information.get_outgoing_roles_to_add (t2.pk_entity)) As ts2
Union All
Select
    ts2.*
From
    te_ents t2
    Cross Join Lateral (
        Select
            *
        From
            information.get_ingoing_roles_to_add (t2.pk_entity)) As ts2
),
-- Find all entity_associations of temporal entities
te_ent_entity_associations As (
    Select
        ts2.*
    From
        te_ents t2
        Cross Join Lateral (
            Select
                *
            From
                information.get_outgoing_entity_associations_to_add (t2.pk_entity)) As ts2
    Union All
    Select
        ts2.*
    From
        te_ents t2
    Cross Join Lateral (
        Select
            *
        From
            information.get_ingoing_entity_associations_to_add (t2.pk_entity)) As ts2
),
-- get a list of all pk_entities of repo version
pk_entities_of_repo As (
    Select
        param_pk_entity As pk_entity,
        null::calendar_type As calendar
Union
Select
    pk_entity,
    null::calendar_type As calendar
From
    pe_it_entity_associations
Union
Select
    pk_entity,
    calendar
From
    pe_it_roles
Union
Select
    pk_entity,
    null::calendar_type As calendar
From
    te_ents
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
    te_ent_entity_associations
Union
Select
    pk_entity,
    null::calendar_type As calendar
From
    information.get_accociated_text_properties (param_pk_entity))
    Insert Into projects.info_proj_rel (fk_project, is_in_project, fk_entity, calendar, fk_last_modifier)
Select
    param_pk_project,
    True,
    pk_entity,
    calendar,
    param_account_id
From
    pk_entities_of_repo t1 On Conflict On Constraint entity_version_project_rel_fk_entity_fk_project_key Do
    Update
        Set
            is_in_project = EXCLUDED.is_in_project, calendar = EXCLUDED.calendar, fk_last_modifier = EXCLUDED.fk_last_modifier;
End
$BODY$;

-- 3
Drop Function information.get_outgoing_roles_to_add (entity_id integer, project_id integer);

Create Or Replace Function information.get_outgoing_roles_to_add (
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
            t1.fk_temporal_entity = tw1.pk_entity
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

-- 2
Drop Function information.get_ingoing_roles_to_add (entity_id integer, project_id integer);

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

-- 1
Drop View information.v_entity_class_map;

