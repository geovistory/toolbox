-- 6
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
                    NULL::INT As fk_project,
                    fk_target,
                    target_provides,
                    is_in_project_count As ord_num_within_field,
                    Case When fk_property = 1111 Then
                        - 9
                    Else
                        field_order_of_default_project
                    End As field_order,
                    fk_role
                From
                    tw1;

$BODY$;

-- 5
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
                Union All
                Select
                    fk_source,
                    NULL::INT As fk_project,
                    fk_target,
                    target_provides,
                    is_in_project_count As ord_num_within_field,
                    Case When fk_property = 1111 Then
                        - 9
                    Else
                        field_order_of_default_project
                    End As field_order,
                    fk_role
                From
                    tw1;

$BODY$;

-- 4
Create Or Replace Function war.updater ()
    Returns boolean
    Language 'plpgsql'
    Cost 100 Volatile
    As $BODY$
Declare
    last_war_update timestamp without time zone;
    last_project_modification timestamp without time zone;
    pk_update bigint;
    -- pk_entity of the update done by this function
Begin
    /*
     * Get the timestamp of the begin of the last update
     */
    Select
        tmsp_update_begin Into last_war_update
    From
        war.update_log
    Order By
        pk_entity Desc
    Limit 1;
    -- if the update_log is empty
    If last_war_update Is Null Then
        -- update the whole warehouse (this will also add a record in update_log)
        Perform
            war.warehouse_update_all ();
        --Return true for indicating that tehere has been an update
        Return True;
    End If;

    /*
     * Get the timestamp of the last rojects.info_proj_rel modification
     */
    Select
        tmsp_last_modification::timestamp Into last_project_modification
    From
        projects.info_proj_rel
    Order By
        tmsp_last_modification Desc
    Limit 1;

    /*
     * Check if we need an update, i.e:
     * if last modification is newer than last update of war
     */
    If (last_project_modification > last_war_update) Then
        /*
         * Create a new record for this update.
         * the function now() is equivalent to transaction_timestamp() and
         * returns the start time of the current transaction.
         */
        Insert Into war.update_log (tmsp_update_begin)
        Values (now()::timestamp)
    Returning
        pk_entity Into pk_update;

        /*****
         * Perform the updates
         ******/
        Perform
            war.do_updates_for_difference_since (last_war_update);

        /**********
         * Store the timestamp of after the update so that we have a log of the execution time
         * clock_timestamp() returns the actual current time,
         * and therefore its value changes even within a single SQL command.
         **********/
        Update
            war.update_log
        Set
            tmsp_update_end = clock_timestamp()::timestamp
        Where
            pk_entity = pk_update;

        /******
         * Return true for indicating that tehere has been an update
         *******/
        Return True;
    Else
        /*
         * Return false for indicating that there has been no update
         */
        Return False;
    End If;
End;
$BODY$;

-- 3
-- 2
-- no back
-- 1

Create Or Replace Function war.enriched_nodes__enrich_entity_label ()
    Returns void
    Language 'plpgsql'
    Cost 100 Volatile
    As $BODY$
Declare
    needs_update boolean;
Begin
    needs_update = True;
    ---------- entity label completion ------------
    WHILE (needs_update = True)
    Loop
        -- fill entity label
        With tw0 As (
            Select
                t1.pk_entity,
                t1.fk_project,
                t1.entity_label old_l,
                t3.entity_label,
                t1.own_entity_label_field_order,
                t2.field_order
            From
                war.enriched_node t1
                Join ( Select Distinct On (fk_source,
                        fk_project)
                        *
                    From
                        war.edge j1
                    Order By
                        fk_source,
                        fk_project,
                        j1.field_order Asc,
                        j1.ord_num_within_field Asc) t2 On coalesce(t1.own_entity_label_field_order, 10000) > coalesce(t2.field_order, 10000)
                    And t1.pk_entity = t2.fk_source
                    And t1.fk_project Is Not Distinct From t2.fk_project
                    Join Lateral (
                        -- join the target enriched_node, in project variant, else in repo variant
                        Select Distinct On (j2.pk_entity)
                            j2.entity_label --, j2.pk_entity, j2.fk_project
                        From (
                            Select
                                t3.entity_label,
                                t3.pk_entity --, t3.fk_project
                            From
                                war.enriched_node t3
                            Where
                                t2.fk_target = t3.pk_entity
                                And t2.fk_project Is Not Distinct From t3.fk_project
                            Union All
                            Select
                                t3.entity_label,
                                t3.pk_entity --, t3.fk_project
                            From
                                war.enriched_node t3
                            Where
                                t2.fk_target = t3.pk_entity
                                And t3.fk_project Is Null) j2) t3 On t1.entity_label Is Distinct From t3.entity_label
),
tw1 As (
    Update
        war.enriched_node t1
    Set
        entity_label = t2.entity_label
    From
        tw0 t2
    Where
        t1.pk_entity = t2.pk_entity
        And t1.fk_project Is Not Distinct From t2.fk_project
    Returning
        *
)
Select
    count(*) > 0 Into needs_update
From
    tw1;
End Loop;
End;
$BODY$;

