-- 1
Drop Function war.do_updates_for_difference_since2 (timestamp without time zone);

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
Create Index On projects.info_proj_rel (is_in_project);

Create Index On projects.info_proj_rel (tmsp_last_modification);

-- 4
Drop Function war.do_updates_for_difference_since;

Create Or Replace Function war.do_updates_for_difference_since (
    tmsp timestamp without time zone
)
    Returns void
    Language 'plpgsql'
    Cost 100 Volatile
    As $BODY$
Declare
    t_row record;
    node_ids war.node_id[];
    t timestamptz := clock_timestamp();
    -- used for DEBUGGING
    enrich_loop_count int := 0;
Begin
    Create TEMP Table changed_info_proj_rel On Commit Drop As
    -- select recently modified info_proj_rels
    Select
        t1.fk_entity, t1.fk_project, t1.is_in_project, t1.tmsp_last_modification
    From
        projects.info_proj_rel t1
    Where
        t1.tmsp_last_modification::timestamp >= tmsp;
    Drop Table If Exists to_enrich;
    Create TEMP Table to_enrich (
        pk_entity int,
        fk_project int
    );

    /*
     * 1. Delete enriched_nodes and entity previews
     *
     * Delete the enriched_nodes and entity_previews of PeIt’s or TeEn’s that have a
     * recently been removed from their project (modified info_proj_rel where
     * is_in_project = false)
     *
     * Read this about temp tables on commit drop:
     * https://stackoverflow.com/questions/10596896/postgresql-thread-safety-for-temporary-tables
     */
    -- DEBUG
    Raise notice '#1.a querying removed_crm_entities...';
    Create TEMP Table removed_crm_entities On Commit Drop As
    With tw1 As (
        -- select recent info_proj_rel where is_in_project = false
        Select
            t1.fk_entity,
            t1.fk_project
        From
            changed_info_proj_rel t1
        Where
            t1.is_in_project = False
),
tw2 As (
-- join persistent_items
Select
    t2.fk_entity,
    t2.fk_project
From
    information.persistent_item t1,
    tw1 t2
Where
    t1.pk_entity = t2.fk_entity
Union All
-- join temporal_entities
Select
    t2.fk_entity,
    t2.fk_project
From
    information.temporal_entity t1,
    tw1 t2
Where
    t1.pk_entity = t2.fk_entity
    )
Select
    fk_entity, fk_project
From
    tw2;
    -- DEBUG TIME
    Raise notice '...#1.a time spent=%', clock_timestamp() - t;
    t = clock_timestamp();
    Raise notice '#1.b deleting enriched_nodes and entity_previews...';
    -- START DEBUG
    -- show removed_crm_entities (PeIt's and TeEn's)
    For t_row In (
        Select
            *
        From
            removed_crm_entities)
    Loop
        Raise NOTICE 'Node to delete fk_project: %, fk_entity: %', t_row.fk_project, t_row.fk_entity;
    End Loop;
    -- END DEBUG
    -- delete enriched_nodes
    Delete From war.enriched_node t1 Using removed_crm_entities t2
    Where t1.pk_entity = t2.fk_entity
        And t1.fk_project Is Not Distinct From t2.fk_project;
    -- delete entity_previews
    Delete From war.entity_preview t1 Using removed_crm_entities t2
    Where t1.pk_entity = t2.fk_entity
        And t1.fk_project Is Not Distinct From t2.fk_project;
    -- DEBUG TIME
    Raise notice '...#1.b time spent=%', clock_timestamp() - t;
    t = clock_timestamp();
    Raise notice '#2.a querying affected_nodes';

    /*
     * 2. Update enriched_node table
     *
     * all enriched_nodes that are possibly affected by the modifications since last update,
     * need to be updated or inserted. Enriched_nodes are possibly affected, if a PeIt or
     * TeEn is added to project, if a role or text_property related to that PeIt or TeEn
     * is changed in its relation to the project.
     */
    Create TEMP Table affected_nodes On Commit Drop As
    /**********
     * Selects the pk_entities of nodes that need to be updated or deleted
     ***********/ With tw1 As (
        Select
            t1.fk_entity,
            t1.fk_project,
            t1.is_in_project,
            t1.tmsp_last_modification
        From
            changed_info_proj_rel t1
),
-- select fk_entity and fk_project of all affected persistent_items and temporal_entities
tw2 As (
-- persistent_items where info_proj_rel changed
Select
    t1.pk_entity As fk_entity,
    t2.fk_project,
    t2.tmsp_last_modification,
    t2.is_in_project
From
    information.persistent_item t1,
    tw1 t2
Where
    t1.pk_entity = t2.fk_entity And t2.is_in_project = True
Union All
-- temporal_entities where info_proj_rel changed
Select
    t1.pk_entity As fk_entity,
    t2.fk_project,
    t2.tmsp_last_modification,
    t2.is_in_project
From
    information.temporal_entity t1,
    tw1 t2
Where
    t1.pk_entity = t2.fk_entity And t2.is_in_project = True
Union All
-- domain entities of roles where info_proj_rel changed
Select
    t1.fk_temporal_entity As fk_entity,
    t2.fk_project,
    t2.tmsp_last_modification,
    t2.is_in_project
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
    t2.tmsp_last_modification,
    t2.is_in_project
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
    t2.tmsp_last_modification,
    t2.is_in_project
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
    t1.is_in_project,
    t1.tmsp_last_modification
From
    tw2 t1
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
    -- DEBUG TIME
    Raise notice '...#2.a time spent=%', clock_timestamp() - t;
    t = clock_timestamp();
    Raise notice '#2.b upserting affected_nodes...';

    /**
     * Loop over the affected nodes per project and upsert the enriched nodes
     * (the not recursive columns)
     */
    For t_row In (
        Select
            *
        From
            affected_nodes)
    Loop
        -- START DEBUG
        -- Show affected_nodes
        Raise NOTICE 'Nodes to upsert fk_project: %, pk_entities: %', t_row.fk_project, t_row.pk_entities;
        -- END DEBUG
        Insert Into to_enrich
        Select
            pk_entity,
            fk_project
        From
            war.enriched_nodes__upsert_some (t_row.pk_entities,
                t_row.fk_project);
    End Loop;
    -- DEBUG TIME
    Raise notice '...#2.b time spent=%', clock_timestamp() - t;
    t = clock_timestamp();
    Raise notice '#3.a query removed_roles...';

    /*
     * 3. Delete edges
     *
     * Delete the edges of roles that have a recently been removed from their project
     * (modified info_proj_rel where is_in_project = false)
     */
    Create TEMP Table removed_roles On Commit Drop As
    -- select recent info_proj_rel to roles where is_in_project = false
    Select
        t1.fk_entity As fk_role, t1.fk_project, t2.fk_entity, t2.fk_temporal_entity
    From
        changed_info_proj_rel t1, information.role t2
    Where
        t1.is_in_project = False
        And t1.fk_entity = t2.pk_entity;
    -- Add the entities, related to removed roles, to to_enrich
    Insert Into to_enrich
    -- select domain persistent_items
    Select
        t1.pk_entity,
        t2.fk_project
    From
        information.persistent_item t1,
        removed_roles t2
    Where
        t1.pk_entity = t2.fk_temporal_entity
    Union All
    -- select range persistent_items
    Select
        t1.pk_entity,
        t2.fk_project
    From
        information.persistent_item t1,
        removed_roles t2
    Where
        t1.pk_entity = t2.fk_entity
    Union All
    -- select domain temporal_entities
    Select
        t1.pk_entity,
        t2.fk_project
    From
        information.temporal_entity t1,
        removed_roles t2
    Where
        t1.pk_entity = t2.fk_temporal_entity
    Union All
    -- select range temporal_entities
    Select
        t1.pk_entity,
        t2.fk_project
    From
        information.temporal_entity t1,
        removed_roles t2
    Where
        t1.pk_entity = t2.fk_entity;
    -- START DEBUG
    -- show removed_crm_entities (PeIt's and TeEn's)
    For t_row In (
        Select
            *
        From
            removed_roles)
    Loop
        Raise NOTICE 'Edges to delete fk_project: %, fk_role: %', t_row.fk_project, t_row.fk_role;
    End Loop;
    -- END DEBUG
    Raise notice '...#3.a time spent=%', clock_timestamp() - t;
    t = clock_timestamp();
    Raise notice '#3.b delete edges...';
    Delete From war.edge t1 Using removed_roles t2
    Where t1.fk_project Is Not Distinct From t2.fk_project
        And t1.fk_role = t2.fk_role;
    -- DEBUG TIME
    Raise notice '...#3.b time spent=%', clock_timestamp() - t;
    t = clock_timestamp();
    Raise notice '#4.a query affected roles...';

    /*
     * 4. Update edges
     *
     * All edges that are affected by the modifications since last update need to be updated or inserted.
     */
    Create TEMP Table updated_roles On Commit Drop As
    -- select recent info_proj_rel to roles where is_in_project = false
    Select
        array_agg( t1.fk_entity
    ) As fk_roles, t1.fk_project
From
    changed_info_proj_rel t1, information.role t2
Where
    t1.fk_entity = t2.pk_entity
    And t1.is_in_project = True
Group By
    t1.fk_project;
    Raise notice '...#4.a time spent=%', clock_timestamp() - t;
    t = clock_timestamp();
    Raise notice '#4.b update edges...';
    -- Update the edges
    For t_row In (
        Select
            *
        From
            updated_roles)
    Loop
        -- DEBUG
        -- show the updated roles
        Raise NOTICE 'Updated roles fk_project: %, fk_roles: %', t_row.fk_project, t_row.fk_roles;
        Insert Into to_enrich
        Select
            fk_source,
            fk_project
        From
            war.edges__upsert_some (t_row.fk_roles,
                t_row.fk_project);
    End Loop;
    Raise notice '...#4.b time spent=%', clock_timestamp() - t;
    t = clock_timestamp();

    /*
     * 5. Enrich nodes
     *
     * Fill all recursive colums of all enriched_nodes that are not up to date.
     * After this step, the table enriched_node should be in a final state
     * so that the changes can be brought to the table entity_previews
     */
    -- START DEBUG
    Raise notice '#5 enrich nodes...';
    -- show removed_crm_entities (PeIt's and TeEn's)
    For t_row In (
        Select
            *
        From
            to_enrich)
    Loop
        Raise NOTICE 'Initial nodes to_enrich (before loop): fk_project%, pk_entity: %', t_row.fk_project, t_row.pk_entity;
    End Loop;
    -- END DEBUG
    /*******
     * enrich the enriched_nodes
     * Theory:
     * We have a tree of dependencies. The edges relate source to target nodes.
     * source (dependent) nodes depend on target (dependency) nodes.
     * Whenever an edge or a target node change, the source node needs to be (re-)enriched.
     *******/
    WHILE (
        Select
            (count(*) > 0
                And enrich_loop_count <= 50)
        From
            to_enrich)
    Loop
        -- breac
        -- get the war.node_id[] from to_enrich
        Select
            array_agg(Row (pk_entity, fk_project)::war.node_id) Into node_ids
        From ( Select Distinct
                pk_entity,
                fk_project
            From
                to_enrich) x;
        -- DEBUG
        -- Show node_ids to enrich
        Raise NOTICE 'node_ids from to_enrich %', node_ids;
        -- show number of iterations
        Raise NOTICE 'enrich_loop_count %', enrich_loop_count;
        enrich_loop_count = enrich_loop_count + 1;
        If enrich_loop_count = 50 Then
            Raise WARNING 'enrich_loop_count = 50. node_ids from to_enrich %', node_ids;
        End If;
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
    Raise notice '...#5 time spent=%', clock_timestamp() - t;
    t = clock_timestamp();
    Raise notice '#6 update entity_previews...';

    /*
     * 6. Update entity_previews
     *
     * Update all entity_previews with all enriched_nodes where tmsp_last_modification
     * is more recent than last update_log.tmsp_update_end.
     */
    Create TEMP Table modified_enriched_node On Commit Drop As
    With tw1 As (
        -- select the modified enriched_node
        Select
            *
        From
            war.enriched_node t1
        Where
            t1.tmsp_last_modification > tmsp )
        -- Select the entity_previews that are different in one of the columns
        Select
            t1.pk_entity, t1.fk_project, t1.project, t1.entity_type, t1.fk_class, t1.class_label, t1.entity_label, t1.full_text, t1.ts_vector, t1.type_label, t1.fk_type, t1.time_span, t1.first_second, t1.last_second
        From
            tw1 t1
        Except
        Select
            t1.pk_entity, t1.fk_project, t1.project, t1.entity_type, t1.fk_class, t1.class_label, t1.entity_label, t1.full_text, t1.ts_vector, t1.type_label, t1.fk_type, t1.time_span, t1.first_second, t1.last_second
        From
            war.entity_preview t1, tw1 t2
        Where
            t1.pk_entity = t2.pk_entity
            And t1.fk_project Is Not Distinct From t2.fk_project;
    -- Update the edges that are different in one of the non recursive columns
    Update
        war.entity_preview t1
    Set
        pk_entity = t2.pk_entity,
        fk_project = t2.fk_project,
        project = t2.project,
        entity_type = t2.entity_type,
        fk_class = t2.fk_class,
        class_label = t2.class_label,
        entity_label = t2.entity_label,
        full_text = t2.full_text,
        ts_vector = t2.ts_vector,
        type_label = t2.type_label,
        fk_type = t2.fk_type,
        time_span = t2.time_span,
        first_second = t2.first_second,
        last_second = t2.last_second
    From
        modified_enriched_node t2
    Where
        t1.pk_entity = t2.pk_entity
        And t1.fk_project Is Not Distinct From t2.fk_project;
    -- Insert the created edges that do not yet exist
    Insert Into war.entity_preview
    Select
        t1.pk_entity,
        t1.fk_project,
        t1.project,
        t1.entity_type,
        t1.fk_class,
        t1.class_label,
        t1.entity_label,
        t1.full_text,
        t1.ts_vector,
        t1.type_label,
        t1.fk_type,
        t1.time_span,
        t1.first_second,
        t1.last_second
    From
        modified_enriched_node t1
    On Conflict
        Do Nothing;
    Raise notice '...#6 time spent=%', clock_timestamp() - t;
End;
$BODY$;

