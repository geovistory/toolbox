-- 4
Create Or Replace Function war.do_updates_for_difference_since (
    tmsp timestamp without time zone
)
    Returns void
    Language 'plpgsql'
    Cost 100 Volatile
    As $BODY$
Declare
    t_row record;
Begin
    For t_row In (
        /**********
         * Selects the pk_entities of nodes that need to be updated.
         *
         * takes only the latest item for each pk_entity and project.
         * this helps to skip unneeded intermediate updates. For example:
         * Those update requests:
         * - entity 207386, project 24, is_in_project true
         * - entity 207386, project 24, is_in_project false
         * - entity 207386, project 82, is_in_project true
         * - entity 207386, project 24, is_in_project true
         *
         * is reduced to the latest ones per project and entity:
         * - entity 207386, project 24, is_in_project true
         * - entity 207386, project 82, is_in_project true
         *
         * also takes only pk_entity of persistent_item or temporal_entity
         * by joining a union of information.persistent_item and information.temporal_entity
         *
         * also takes only pk_entity of items that have a info_proj_rel.
         * this excludes entities that are related by project's properties (roles) but are not in project
         * themselfes.
         ***********/
        With tw1 As (
            Select
                t1.fk_entity,
                t1.fk_project,
                t1.tmsp_last_modification::timestamp
            From
                projects.info_proj_rel t1
            Where
                t1.tmsp_last_modification::timestamp >= tmsp),
            -- select fk_entity and fk_project of all affected persistent_items and temporal_entities
            tw2 As (
                -- persistent_items where info_proj_rel changed
                Select
                    t1.pk_entity As fk_entity,
                    t2.fk_project,
                    t2.tmsp_last_modification
                From
                    information.persistent_item t1,
                    tw1 t2
                Where
                    t1.pk_entity = t2.fk_entity
                Union All
                -- temporal_entities where info_proj_rel changed
                Select
                    t1.pk_entity As fk_entity,
                    t2.fk_project,
                    t2.tmsp_last_modification
                From
                    information.temporal_entity t1,
                    tw1 t2
                Where
                    t1.pk_entity = t2.fk_entity
                Union All
                -- domain entities of roles where info_proj_rel changed
                Select
                    t1.fk_temporal_entity As fk_entity,
                    t2.fk_project,
                    t2.tmsp_last_modification
                From
                    information.role t1,
                    tw1 t2
                Where
                    t1.pk_entity = t2.fk_entity
                Union All
                -- range entities of roles where info_proj_rel changed
                Select
                    t1.fk_entity As fk_entity,
                    t2.fk_project,
                    t2.tmsp_last_modification
                From
                    information.role t1,
                    tw1 t2
                Where
                    t1.pk_entity = t2.fk_entity
                Union All
                -- concerned entities of text_properties where info_proj_rel changed
                Select
                    t1.fk_concerned_entity As fk_entity,
                    t2.fk_project,
                    t2.tmsp_last_modification
                From
                    information.text_property t1,
                    tw1 t2
                Where
                    t1.pk_entity = t2.fk_entity),
                tw3 As (
                    Select Distinct On (t1.fk_project,
                        t1.fk_entity)
                        t1.fk_project,
                        t1.fk_entity,
                        t2.is_in_project,
                        t1.tmsp_last_modification
                    From
                        tw2 t1,
                        projects.info_proj_rel t2
                    Where
                        t1.fk_entity = t2.fk_entity
                        And t1.fk_project = t2.fk_project
                    Order By
                        t1.fk_project,
                        t1.fk_entity,
                        t1.tmsp_last_modification Desc)
                /**********
                 * Group the remaining update request by is_in_project and fk_projects
                 ***********/
                Select
                    is_in_project,
                    fk_project,
                    array_agg(fk_entity) pk_entities --, count(pk_entity)
                From
                    tw3
                Group By
                    fk_project,
                    is_in_project)
            /*******
             * Perform the updates on nodes
             *******/
            Loop
                If (t_row.is_in_project = True) Then
                    Perform
                        war.nodes__upsert_some (t_row.pk_entities,
                            t_row.fk_project);
                    ELSEIF (t_row.is_in_project = False) Then
                    Perform
                        war.nodes__delete_some (t_row.pk_entities,
                            t_row.fk_project);
                End If;
            End Loop;
    For t_row In (
        /**********
         * Selects the pk_roles of edges that need to be updated.
         *
         ***********/
        Select
            array_agg(t1.fk_entity) As fk_roles,
            t1.fk_project,
            t1.is_in_project
        From
            projects.info_proj_rel t1,
            information.role t2
        Where
            t1.tmsp_last_modification::timestamp >= tmsp
            And t1.fk_entity = t2.pk_entity
        Group By
            t1.fk_project,
            t1.is_in_project)
    /*******
     * Perform the updates on nodes
     *******/
    Loop
        If (t_row.is_in_project = True) Then
            Perform
                war.edges__upsert_some (t_row.fk_roles,
                    t_row.fk_project);
            ELSEIF (t_row.is_in_project = False) Then
            Perform
                war.edges__delete_some (t_row.fk_roles,
                    t_row.fk_project);
        End If;
    End Loop;
End;
$BODY$;

-- 3
Drop Index projects.info_proj_rel_is_in_project_idx;

Drop Index projects.info_proj_rel_tmsp_last_modification_idx;

-- 2
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
            war.do_updates_for_difference_since2 (last_war_update);

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

-- 1
Create Or Replace Function war.do_updates_for_difference_since2 (
    tmsp timestamp without time zone
)
    Returns Setof war.node_id
    Language 'plpgsql'
    Cost 100 Volatile Rows 1000
    As $BODY$
Declare
    t_row record;
    node_ids war.node_id[];
Begin
    Drop Table If Exists to_enrich;
    Create TEMP Table to_enrich (
        pk_entity int,
        fk_project int
    );
    Drop Table If Exists temp_node_changes;
    Create TEMP Table temp_node_changes As
    /**********
     * Selects the pk_entities of nodes that need to be updated or deleted
     ***********/ With tw1 As (
        Select
            t1.fk_entity,
            t1.fk_project,
            t1.tmsp_last_modification ::timestamp
        From
            projects.info_proj_rel t1
        Where
            t1.tmsp_last_modification ::timestamp >= tmsp
),
-- select fk_entity and fk_project of all affected persistent_items and temporal_entities
tw2 As (
-- persistent_items where info_proj_rel changed
Select
    t1.pk_entity As fk_entity,
    t2.fk_project,
    t2.tmsp_last_modification
From
    information.persistent_item t1,
    tw1 t2
Where
    t1.pk_entity = t2.fk_entity
Union All
-- temporal_entities where info_proj_rel changed
Select
    t1.pk_entity As fk_entity,
    t2.fk_project,
    t2.tmsp_last_modification
From
    information.temporal_entity t1,
    tw1 t2
Where
    t1.pk_entity = t2.fk_entity
Union All
-- domain entities of roles where info_proj_rel changed
Select
    t1.fk_temporal_entity As fk_entity,
    t2.fk_project,
    t2.tmsp_last_modification
From
    information.role t1,
    tw1 t2
Where
    t1.pk_entity = t2.fk_entity
Union All
-- range entities of roles where info_proj_rel changed
Select
    t1.fk_entity As fk_entity,
    t2.fk_project,
    t2.tmsp_last_modification
From
    information.role t1,
    tw1 t2
Where
    t1.pk_entity = t2.fk_entity
Union All
-- concerned entities of text_properties where info_proj_rel changed
Select
    t1.fk_concerned_entity As fk_entity,
    t2.fk_project,
    t2.tmsp_last_modification
From
    information.text_property t1,
    tw1 t2
Where
    t1.pk_entity = t2.fk_entity
),
tw3 As (
Select Distinct On (t1.fk_project,
    t1.fk_entity )
    t1.fk_project,
    t1.fk_entity,
    t2.is_in_project,
    t1.tmsp_last_modification
From
    tw2 t1,
    projects.info_proj_rel t2
Where
    t1.fk_entity = t2.fk_entity And t1.fk_project = t2.fk_project
Order By
    t1.fk_project,
    t1.fk_entity,
    t1.tmsp_last_modification Desc )
/**********
 * Group the remaining update request by is_in_project and fk_projects
 ***********/
Select
    is_in_project, fk_project, array_agg(fk_entity ) pk_entities --, count(pk_entity)
From
    tw3
Group By
    fk_project, is_in_project;
    Drop Table If Exists temp_edge_changes;
    Create TEMP Table temp_edge_changes As
    /**********
     * Selects the pk_roles of edges that need to be updated or deleted
     ***********/
    Select
        array_agg( t1.fk_entity
    ) As fk_roles,
    t1.fk_project,
    t1.is_in_project
From
    projects.info_proj_rel t1,
    information.role t2
Where
    t1.tmsp_last_modification::timestamp >= tmsp
    And t1.fk_entity = t2.pk_entity
Group By
    t1.fk_project,
    t1.is_in_project;

    /*******
     * Perform the updates on nodes
     *******/
    For t_row In (
        Select
            *
        From
            temp_node_changes)
    Loop
        If (t_row.is_in_project = True) Then
            Insert Into to_enrich
            Select
                pk_entity,
                fk_project
            From
                war.nodes__upsert_some (t_row.pk_entities,
                    t_row.fk_project);
            ELSEIF (t_row.is_in_project = False) Then
            Perform
                war.nodes__delete_some (t_row.pk_entities,
                    t_row.fk_project);
        End If;
    End Loop;

    /*******
     * Perform the updates on edges
     *******/
    For t_row In (
        Select
            *
        From
            temp_edge_changes)
    Loop
        If (t_row.is_in_project = True) Then
            Insert Into to_enrich
            Select
                fk_source,
                fk_project
            From
                war.edges__upsert_some (t_row.fk_roles,
                    t_row.fk_project);
            ELSEIF (t_row.is_in_project = False) Then
            Insert Into to_enrich
            Select
                fk_source,
                fk_project
            From
                war.edges__delete_some (t_row.fk_roles,
                    t_row.fk_project);
        End If;
    End Loop;
    Perform
        pg_notify('test', 'here');

    /*******
     * enrich the enriched_nodes
     * Theory:
     * We have a tree of dependencies. The edges relate source to target nodes.
     * source (dependent) nodes depend on target (dependency) nodes.
     * Whenever an edge or a target node change, the source node needs to be (re-)enriched.
     *******/
    -- Step 1: get the keys of nodes that need enrichment:
    -- - source node keys of updated, inserted or deleted edges
    -- - keys of updated or inserted nodes
    -- This is done above in the loops
    /*******
     * REMARK: THE FOLLOWING LOOP HAS UNEXPECTED SIDE EFFECTS!
     * IT DELETES THE LABELS OF SOME ENTITIES
     *******/
    -- start a loop that runs while to_enrich is not empty
    WHILE (
        Select
            count(*) > 0
        From
            to_enrich)
    Loop
        -- get the war.node_id[] from to_enrich
        Select
            array_agg(Row (pk_entity, fk_project)::war.node_id) Into node_ids
            From ( Select Distinct
                    pk_entity,
                    fk_project
                From
                    to_enrich) x;
        Raise NOTICE 'node_ids %', node_ids;
        Perform
            pg_notify('test', 'node_ids');
        -- empty table to_enrich
        Delete From to_enrich;
        -- enrich the nodes and
        -- query keys of nodes that depend on changed nodes
        -- put those source nodes in to_enrich
        Insert Into to_enrich Select Distinct
            t1.fk_source,
            t1.fk_project
        From
            war.edge t1,
            (
                -- enrich the nodes
                Select
                    pk_entity,
                    fk_project
                From
                    war.enriched_nodes__enrich_some (node_ids)) t2
        Where
            t1.fk_target = t2.pk_entity
            And t1.fk_project Is Not Distinct From t2.fk_project;
    End Loop;

    /*******
     * update the entity_preview, TODO
     *******/
    -- Select
    --     war.entity_preview__update_all ();
    Return QUERY Select Distinct
        *
    From
        to_enrich;
End;
$BODY$;

