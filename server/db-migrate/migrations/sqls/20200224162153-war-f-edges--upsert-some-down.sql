-- 4
Create Or Replace Function war.edges__upsert_some (
    param_pk_roles integer[],
    param_fk_project integer
)
    Returns Setof war.edge
    Language 'sql'
    Cost 100 Volatile Rows 1000
    As $BODY$
    Select
        war.edges__delete_some (param_pk_roles,
            param_fk_project);

Insert Into war.edge
Select
    *
From
    war.edges__create_some (param_pk_roles,
        param_fk_project)
Returning
    *;

$BODY$;

-- 3
Drop Index war.edge_unique_project;

Drop Index war.edge_unique_repo;

-- 2
Create Or Replace Function war.edges__create_some (
    param_pk_roles integer[],
    param_fk_project integer
)
    Returns Setof war.edge
    Language 'sql'
    Cost 100 Volatile Rows 1000
    As $BODY$
    With tw1 As (
        ---- outgoing edges of project
        Select
            t2.fk_project,
            t1.pk_entity As fk_role,
            t1.fk_temporal_entity As fk_source,
            t1.fk_entity As fk_target,
            t1.fk_property,
            t6.field_order As field_order_of_project,
            t7.field_order As field_order_of_default_project,
            Case When (Exists (
                    Select
                        pk_entity
                    From
                        projects.class_field_config j1
                    Where
                        j1.fk_domain_class = t5.has_domain
                        And j1.fk_project = t2.fk_project)) Then
                True
            Else
                False
            End project_has_own_field_order,
            t2.ord_num_of_range As ord_num_within_field,
            t1.is_in_project_count,
            Case When t5.is_has_type_subproperty Then
                'type'::war.edge_target_type
            Else
                'text'::war.edge_target_type
            End As target_provides
        From
            information.v_role t1,
            projects.info_proj_rel t2
            Join Lateral (
                Select
                    pk_entity,
                    fk_class
                From
                    information.persistent_item
                Where
                    pk_entity = t1.fk_temporal_entity
                Union All
                Select
                    pk_entity,
                    fk_class
                From
                    information.temporal_entity
                Where
                    pk_entity = t1.fk_temporal_entity) As t3 On True
                Join Lateral (
                    Select
                        pk_entity,
                        fk_class
                    From
                        information.persistent_item
                    Where
                        pk_entity = t1.fk_entity
                    Union All
                    Select
                        pk_entity,
                        fk_class
                    From
                        information.temporal_entity
                    Where
                        pk_entity = t1.fk_entity) As t4 On True,
                    data_for_history.v_property t5
                Left Join Lateral (
                    Select
                        j1.ord_num As field_order
                    From
                        projects.class_field_config j1
                    Where
                        j1.fk_property = t5.pk_property
                        And j1.fk_domain_class = t5.has_domain
                        And j1.fk_project = t2.fk_project) As t6 On True
                Left Join Lateral (
                    Select
                        j1.ord_num As field_order
                    From
                        projects.class_field_config j1
                    Where
                        j1.fk_property = t5.pk_property
                        And j1.fk_domain_class = t5.has_domain
                        And j1.fk_project = 375669 -- Default config project
) As t7 On True
                Where
                    t1.pk_entity = Any (param_pk_roles)
                    And t2.fk_project = param_fk_project
                    And t1.pk_entity = t2.fk_entity
                    And t2.is_in_project = True
                    And t5.pk_property = t1.fk_property
                    And t5.has_domain = t3.fk_class
                    And t5.has_range = t4.fk_class
                Union All
                ---- ingoing edges of project
                Select
                    t2.fk_project,
                    t1.pk_entity As fk_role,
                    t1.fk_entity As fk_source,
                    t1.fk_temporal_entity As fk_target,
                    t1.fk_property,
                    t6.field_order As field_order_of_project,
                    t7.field_order As field_order_of_default_project,
                    Case When (Exists (
                            Select
                                pk_entity
                            From
                                projects.class_field_config j1
                            Where
                                j1.fk_range_class = t5.has_range
                                And j1.fk_project = t2.fk_project)) Then
                        True
                    Else
                        False
                    End project_has_own_field_order,
                    t2.ord_num_of_domain As ord_num_within_field,
                    t1.is_in_project_count,
                    'text'::war.edge_target_type As target_provides
                From
                    information.v_role t1,
                    projects.info_proj_rel t2
                    Join Lateral (
                        Select
                            pk_entity,
                            fk_class
                        From
                            information.persistent_item
                        Where
                            pk_entity = t1.fk_entity
                        Union All
                        Select
                            pk_entity,
                            fk_class
                        From
                            information.temporal_entity
                        Where
                            pk_entity = t1.fk_entity) As t3 On True
                        Join Lateral (
                            Select
                                pk_entity,
                                fk_class
                            From
                                information.persistent_item
                            Where
                                pk_entity = t1.fk_temporal_entity
                            Union All
                            Select
                                pk_entity,
                                fk_class
                            From
                                information.temporal_entity
                            Where
                                pk_entity = t1.fk_temporal_entity) As t4 On True,
                            data_for_history.v_property t5
                        Left Join Lateral (
                            Select
                                j1.ord_num As field_order
                            From
                                projects.class_field_config j1
                            Where
                                j1.fk_property = t5.pk_property
                                And j1.fk_range_class = t5.has_range
                                And j1.fk_project = t2.fk_project) As t6 On True
                        Left Join Lateral (
                            Select
                                j1.ord_num As field_order
                            From
                                projects.class_field_config j1
                            Where
                                j1.fk_property = t5.pk_property
                                And j1.fk_range_class = t5.has_range
                                And j1.fk_project = 375669 -- Default config project
) As t7 On True
                        Where
                            t1.pk_entity = Any (param_pk_roles)
                            And t2.fk_project = param_fk_project
                            And t1.pk_entity = t2.fk_entity
                            And t2.is_in_project = True
                            And t5.pk_property = t1.fk_property
                            And t5.has_range = t3.fk_class
                            And t5.has_domain = t4.fk_class
)
                Select
                    fk_source,
                    fk_project,
                    fk_target,
                    target_provides,
                    ord_num_within_field,
                    Case When fk_property = 1111 Then
                        - 9
                    When project_has_own_field_order = True Then
                        field_order_of_project
                    Else
                        field_order_of_default_project
                    End As field_order,
                    fk_role
                From
                    tw1
                Union All Select Distinct
                    fk_source,
                    Null::int As fk_project,
                    fk_target,
                    target_provides,
                    --is_in_project_count as ord_num_within_field,
                    Null::int As ord_num_within_field,
                    Case When fk_property = 1111 Then
                        - 9
                    Else
                        field_order_of_default_project
                    End As field_order,
                    fk_role
                From
                    tw1;

$BODY$;

-- 1
Create Or Replace Function war.edges__create_all ()
    Returns Setof war.edge
    Language 'sql'
    Cost 100 Volatile Rows 1000
    As $BODY$
    With tw1 As (
        ---- outgoing edges of project
        Select
            t2.fk_project,
            t1.pk_entity As fk_role,
            t1.fk_temporal_entity As fk_source,
            t1.fk_entity As fk_target,
            t1.fk_property,
            t6.field_order As field_order_of_project,
            t7.field_order As field_order_of_default_project,
            Case When (Exists (
                    Select
                        pk_entity
                    From
                        projects.class_field_config j1
                    Where
                        j1.fk_domain_class = t5.has_domain
                        And j1.fk_project = t2.fk_project)) Then
                True
            Else
                False
            End project_has_own_field_order,
            t2.ord_num_of_range As ord_num_within_field,
            t1.is_in_project_count,
            Case When t5.is_has_type_subproperty Then
                'type'::war.edge_target_type
            Else
                'text'::war.edge_target_type
            End As target_provides
        From
            information.v_role t1,
            projects.info_proj_rel t2
            Join Lateral (
                Select
                    pk_entity,
                    fk_class
                From
                    information.persistent_item
                Where
                    pk_entity = t1.fk_temporal_entity
                Union All
                Select
                    pk_entity,
                    fk_class
                From
                    information.temporal_entity
                Where
                    pk_entity = t1.fk_temporal_entity) As t3 On True
                Join Lateral (
                    Select
                        pk_entity,
                        fk_class
                    From
                        information.persistent_item
                    Where
                        pk_entity = t1.fk_entity
                    Union All
                    Select
                        pk_entity,
                        fk_class
                    From
                        information.temporal_entity
                    Where
                        pk_entity = t1.fk_entity) As t4 On True,
                    data_for_history.v_property t5
                Left Join Lateral (
                    Select
                        j1.ord_num As field_order
                    From
                        projects.class_field_config j1
                    Where
                        j1.fk_property = t5.pk_property
                        And j1.fk_domain_class = t5.has_domain
                        And j1.fk_project = t2.fk_project) As t6 On True
                Left Join Lateral (
                    Select
                        j1.ord_num As field_order
                    From
                        projects.class_field_config j1
                    Where
                        j1.fk_property = t5.pk_property
                        And j1.fk_domain_class = t5.has_domain
                        And j1.fk_project = 375669 -- Default config project
) As t7 On True
                Where
                    t1.pk_entity = t2.fk_entity
                    And t2.is_in_project = True
                    And t5.pk_property = t1.fk_property
                    And t5.has_domain = t3.fk_class
                    And t5.has_range = t4.fk_class
                Union All
                ---- ingoing edges of project
                Select
                    t2.fk_project,
                    t1.pk_entity As fk_role,
                    t1.fk_entity As fk_source,
                    t1.fk_temporal_entity As fk_target,
                    t1.fk_property,
                    t6.field_order As field_order_of_project,
                    t7.field_order As field_order_of_default_project,
                    Case When (Exists (
                            Select
                                pk_entity
                            From
                                projects.class_field_config j1
                            Where
                                j1.fk_range_class = t5.has_range
                                And j1.fk_project = t2.fk_project)) Then
                        True
                    Else
                        False
                    End project_has_own_field_order,
                    t2.ord_num_of_domain As ord_num_within_field,
                    t1.is_in_project_count,
                    'text'::war.edge_target_type As target_provides
                From
                    information.v_role t1,
                    projects.info_proj_rel t2
                    Join Lateral (
                        Select
                            pk_entity,
                            fk_class
                        From
                            information.persistent_item
                        Where
                            pk_entity = t1.fk_entity
                        Union All
                        Select
                            pk_entity,
                            fk_class
                        From
                            information.temporal_entity
                        Where
                            pk_entity = t1.fk_entity) As t3 On True
                        Join Lateral (
                            Select
                                pk_entity,
                                fk_class
                            From
                                information.persistent_item
                            Where
                                pk_entity = t1.fk_temporal_entity
                            Union All
                            Select
                                pk_entity,
                                fk_class
                            From
                                information.temporal_entity
                            Where
                                pk_entity = t1.fk_temporal_entity) As t4 On True,
                            data_for_history.v_property t5
                        Left Join Lateral (
                            Select
                                j1.ord_num As field_order
                            From
                                projects.class_field_config j1
                            Where
                                j1.fk_property = t5.pk_property
                                And j1.fk_range_class = t5.has_range
                                And j1.fk_project = t2.fk_project) As t6 On True
                        Left Join Lateral (
                            Select
                                j1.ord_num As field_order
                            From
                                projects.class_field_config j1
                            Where
                                j1.fk_property = t5.pk_property
                                And j1.fk_range_class = t5.has_range
                                And j1.fk_project = 375669 -- Default config project
) As t7 On True
                        Where
                            t1.pk_entity = t2.fk_entity
                            And t2.is_in_project = True
                            And t5.pk_property = t1.fk_property
                            And t5.has_range = t3.fk_class
                            And t5.has_domain = t4.fk_class
)
                Select
                    fk_source,
                    fk_project,
                    fk_target,
                    target_provides,
                    ord_num_within_field,
                    Case When fk_property = 1111 Then
                        - 9
                    When project_has_own_field_order = True Then
                        field_order_of_project
                    Else
                        field_order_of_default_project
                    End As field_order,
                    fk_role
                From
                    tw1
                Union All Select Distinct
                    fk_source,
                    Null::int As fk_project,
                    fk_target,
                    target_provides,
                    --is_in_project_count as ord_num_within_field,
                    Null::int As ord_num_within_field,
                    Case When fk_property = 1111 Then
                        - 9
                    Else
                        field_order_of_default_project
                    End As field_order,
                    fk_role
                From
                    tw1;

$BODY$;

