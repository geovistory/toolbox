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
        And t4.has_domain In (t2.fk_class, 50 -- make every class to a timespan class
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

