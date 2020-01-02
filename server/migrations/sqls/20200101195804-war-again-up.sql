-- 1

CREATE OR REPLACE FUNCTION war.enriched_nodes__enrich_entity_label(
	)
    RETURNS void
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE 
AS $BODY$
Declare
    needs_update boolean;
Begin
    needs_update = True;
    ---------- entity label completion ------------
    WHILE (needs_update = True)
    Loop
        -- fill entity label
	With tw0  AS (
 Select
        t1.pk_entity,
        t1.fk_project,
		--t1.fk_class,
		--CASE WHEN t1.fk_project IS NOT NULL THEN
		--	t2.target_field_overrides_own_label
		--ELSE 
		--	t4.target_field_overrides_own_label
		--END target_field_overrides_own_label,
		--t1.own_entity_label,
    --    t1.own_entity_label_field_order,
    --    t2.field_order,
	  -- 	t2.ord_num_within_field,
	 	--t4.field_order field_order_in_repo,
		Case
        -- never override entity_label of 'appellation use for lang' entity
			When t1.fk_class = 365 Then t1.own_entity_label
			WHEN t1.fk_project IS NOT NULL THEN
				CASE 
					When t2.target_field_overrides_own_label = false Then
						t1.own_entity_label
					Else
						t2.entity_label
				END
			ELSE 
				CASE
					When t4.target_field_overrides_own_label = false Then
						t1.own_entity_label
					Else
						t4.entity_label
				END	
        End entity_label
    From
        war.enriched_node t1
		-- JOIN the project variants (here the ord_num in field is important)
	  	LEFT JOIN LATERAL (
			SELECT Distinct On (t1.pk_entity) 
				t3.pk_entity,
				t3.entity_label, 
				t2.field_order,
				t2.ord_num_within_field,
				( 
					t1.own_entity_label_field_order IS NULL 
					OR 
					t1.own_entity_label_field_order > coalesce(t2.field_order, 10000)
				) target_field_overrides_own_label
			FROM war.edge t2
			left Join Lateral (
				Select Distinct On (t6.pk_entity)
					t6.entity_label,
					t6.pk_entity 
					, t6.fk_project
				From (
					Select
						t3.entity_label,
						t3.pk_entity, t3.fk_project
					From
						war.enriched_node t3
					Where
						t2.fk_target = t3.pk_entity
						And t2.fk_project = t3.fk_project
						And t3.entity_label Is Not Null
					Union All
					Select
						t3.entity_label,
						t3.pk_entity, t3.fk_project
					From
						war.enriched_node t3
					Where
						t2.fk_target = t3.pk_entity
						And t3.fk_project Is Null
						And t3.entity_label Is Not Null
				) t6
			) t3 On True
			WHERE t1.pk_entity = t2.fk_source 
			AND t1.fk_project = t2.fk_project -- '=' (sic!)
			ORDER BY t1.pk_entity, t2.field_order, t2.ord_num_within_field ASC
		) t2  ON TRUE 
		
		-- JOIN the repo variants (here the frequency of entity_label is relevant)
		LEFT JOIN LATERAL ( 
			SELECT
				count(t5.pk_entity),
				t5.entity_label, 
				t4.field_order,
				( 
					t1.own_entity_label_field_order IS NULL 
					OR 
					t1.own_entity_label_field_order > coalesce(t2.field_order, 10000)
				) target_field_overrides_own_label
			FROM war.edge t4
			LEFT JOIN LATERAL (
				SELECT *
				FROM war.enriched_node t5
				WHERE	t4.fk_target = t5.pk_entity
				And t5.fk_project Is Null
				And t5.entity_label Is Not Null
			) t5 ON TRUE
			WHERE  t1.pk_entity = t4.fk_source
			AND t1.fk_project IS NULL AND t4.fk_project IS NULL
			GROUP BY t5.entity_label, t4.field_order
			ORDER BY t4.field_order, count(t5.pk_entity) DESC
			LIMIT 1
		) t4 ON TRUE 
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
        And t1.entity_label Is Distinct From t2.entity_label
    Returning
        t1.entity_label,
        t2.entity_label
)
Select
    count(*) > 0 Into needs_update
From
    tw1;
End Loop;
End;
$BODY$;


-- 2


CREATE OR REPLACE FUNCTION war.enriched_nodes__enrich_some(
	node_ids war.node_id[])
    RETURNS SETOF war.enriched_node 
    LANGUAGE 'sql'

    COST 100
    VOLATILE 
    ROWS 1000
AS $BODY$
    With tw1 As (
        Select
            t1.*
        From
            war.enriched_node t1,
            unnest(node_ids) t2
        Where
            t1.pk_entity = t2.pk_entity
            And t1.fk_project Is Not Distinct From t2.fk_project
),
-- select entity_label
tw2 AS (
 Select
        t1.pk_entity,
        t1.fk_project,
		--t1.fk_class,
		--CASE WHEN t1.fk_project IS NOT NULL THEN
		--	t2.target_field_overrides_own_label
		--ELSE 
		--	t4.target_field_overrides_own_label
		--END target_field_overrides_own_label,
		--t1.own_entity_label,
        --t1.own_entity_label_field_order,
        --t2.field_order,
	   	--t2.ord_num_within_field,
	 	--t4.field_order field_order_in_repo,
		Case
        -- never override entity_label of 'appellation use for lang' entity
			When t1.fk_class = 365 Then t1.own_entity_label
			WHEN t1.fk_project IS NOT NULL THEN
				CASE 
					When t2.target_field_overrides_own_label = false Then
						t1.own_entity_label
					Else
						t2.entity_label
				END
			ELSE 
				CASE
					When t4.target_field_overrides_own_label = false Then
						t1.own_entity_label
					Else
						t4.entity_label
				END	
        End entity_label
    From
        tw1 t1
		-- JOIN the project variants (here the ord_num in field is important)
	  	LEFT JOIN LATERAL (
			SELECT Distinct On (t1.pk_entity) 
				t3.pk_entity,
				t3.entity_label, 
				t2.field_order,
				t2.ord_num_within_field,
				( 
					t1.own_entity_label_field_order IS NULL 
					OR 
					t1.own_entity_label_field_order > coalesce(t2.field_order, 10000)
				) target_field_overrides_own_label
			FROM war.edge t2
			left Join Lateral (
				Select Distinct On (t6.pk_entity)
					t6.entity_label,
					t6.pk_entity 
					, t6.fk_project
				From (
					Select
						t3.entity_label,
						t3.pk_entity, t3.fk_project
					From
						war.enriched_node t3
					Where
						t2.fk_target = t3.pk_entity
						And t2.fk_project = t3.fk_project
						And t3.entity_label Is Not Null
					Union All
					Select
						t3.entity_label,
						t3.pk_entity, t3.fk_project
					From
						war.enriched_node t3
					Where
						t2.fk_target = t3.pk_entity
						And t3.fk_project Is Null
						And t3.entity_label Is Not Null
				) t6
			) t3 On True
			WHERE t1.pk_entity = t2.fk_source 
			AND t1.fk_project = t2.fk_project -- '=' (sic!)
			ORDER BY t1.pk_entity, t2.field_order, t2.ord_num_within_field ASC
		) t2  ON TRUE 
		
		-- JOIN the repo variants (here the frequency of entity_label is relevant)
		LEFT JOIN LATERAL ( 
			SELECT
				count(t5.pk_entity),
				t5.entity_label, 
				t4.field_order,
				( 
					t1.own_entity_label_field_order IS NULL 
					OR 
					t1.own_entity_label_field_order > coalesce(t2.field_order, 10000)
				) target_field_overrides_own_label
			FROM war.edge t4
			LEFT JOIN LATERAL (
				SELECT *
				FROM war.enriched_node t5
				WHERE	t4.fk_target = t5.pk_entity
				And t5.fk_project Is Null
				And t5.entity_label Is Not Null
			) t5 ON TRUE
			WHERE  t1.pk_entity = t4.fk_source
			AND t1.fk_project IS NULL AND t4.fk_project IS NULL
			GROUP BY t5.entity_label, t4.field_order
			ORDER BY t4.field_order, count(t5.pk_entity) DESC
			LIMIT 1
		) t4 ON TRUE 
),
-- select type_label
tw3 As (
    Select
        t1.pk_entity,
        t1.fk_project,
        t3.entity_label type_label,
        t3.pk_entity fk_type
    From
        tw1 t1
        Join Lateral (
            Select
                *
            From
                war.edge j1
            Where
                j1.target_provides = 'type'
                And j1.fk_source = t1.pk_entity
                And j1.fk_project Is Not Distinct From t1.fk_project
            Order By
                j1.field_order Asc,
                j1.ord_num_within_field
            Limit 1) t2 On True
        Join Lateral (
            -- join the target enriched_node, in project variant, else in repo variant
            Select Distinct On (j2.pk_entity)
                j2.entity_label,
                j2.pk_entity --, j2.fk_project
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
                    And t3.fk_project Is Null) j2) t3 On True
),
-- select full_text
tw4 As (
    Select
        t1.pk_entity,
        t1.fk_project,
        t4.entity_label,
        t1.class_label,
        t5.type_label,
        array_to_string(array_remove(Array[t1.class_label, t5.type_label, t1.own_full_text, string_agg(t3.own_full_text, ', ' Order By t2.field_order Asc, t2.ord_num_within_field), t4.entity_label], Null), ', ') As full_text
    From
        tw1 t1
        Join war.edge t2 On t1.pk_entity = t2.fk_source
            And t1.fk_project Is Not Distinct From t2.fk_project
        Join war.enriched_node t3 On t2.fk_target = t3.pk_entity
            And t2.fk_project Is Not Distinct From t3.fk_project
    Left Join tw2 t4 On t1.pk_entity = t4.pk_entity
        And t1.fk_project Is Not Distinct From t4.fk_project
    Left Join tw3 t5 On t1.pk_entity = t5.pk_entity
        And t1.fk_project Is Not Distinct From t5.fk_project
Group By
    t1.pk_entity,
    t1.fk_project,
    t1.class_label,
    t5.type_label,
    t4.entity_label,
    t1.own_full_text
),
-- left join entity_label, full_text, fk_type and type_label, where at least one needs update
tw5 As (
    Select
        t1.pk_entity,
        t1.fk_project,
        t1.entity_label old_label,
        t2.entity_label,
        t1.fk_type old_fk_type,
        t3.fk_type,
        t1.type_label old_type_label,
        t3.type_label,
        t1.full_text old_full_text,
        t4.full_text
    From
        tw1 t1
    Left Join tw2 t2 On t1.pk_entity = t2.pk_entity
        And t1.fk_project Is Not Distinct From t2.fk_project
    Left Join tw3 t3 On t1.pk_entity = t3.pk_entity
        And t1.fk_project Is Not Distinct From t3.fk_project
    Left Join tw4 t4 On t1.pk_entity = t4.pk_entity
        And t1.fk_project Is Not Distinct From t4.fk_project
Where (t1.entity_label Is Distinct From t2.entity_label
    Or t1.type_label Is Distinct From t3.type_label
    Or t1.fk_type Is Distinct From t3.fk_type
    Or t1.full_text Is Distinct From t4.full_text))
Update
    war.enriched_node t1
Set
    entity_label = t2.entity_label,
    fk_type = t2.fk_type,
    type_label = t2.type_label,
    full_text = t2.full_text,
    ts_vector = (
        Select
            setweight(to_tsvector(coalesce(t2.entity_label, '')), 'A') || setweight(to_tsvector(coalesce(t2.type_label, t1.class_label, '')), 'B') || setweight(to_tsvector(coalesce(t2.full_text, '')), 'C'))
From
    tw5 t2
Where
    t1.pk_entity = t2.pk_entity
    And t1.fk_project Is Not Distinct From t2.fk_project
Returning
    t1.*;

$BODY$;



-- 3
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
     ***********/
    With tw1 As (
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
        t1.fk_entity = t2.fk_entity
        And t1.fk_project = t2.fk_project
    Order By
        t1.fk_project,
        t1.fk_entity,
        t1.tmsp_last_modification Desc )
/**********
 * Group the remaining update request by is_in_project and fk_projects
 ***********/
Select
    is_in_project,
    fk_project,
    array_agg(fk_entity ) pk_entities --, count(pk_entity)
From
    tw3
Group By
    fk_project,
    is_in_project;
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
            RAISE NOTICE 'node_ids %', node_ids;
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

-- 5
CREATE OR REPLACE FUNCTION war.edges__create_all(
	)
    RETURNS SETOF war.edge 
    LANGUAGE 'sql'

    COST 100
    VOLATILE 
    ROWS 1000
AS $BODY$
	WITH tw1 AS (
		---- outgoing edges of project
		SELECT 
		t2.fk_project,
		t1.pk_entity as fk_role,
		t1.fk_temporal_entity as fk_source,
		t1.fk_entity as fk_target,
		t1.fk_property,
		t6.field_order as field_order_of_project,
		t7.field_order as field_order_of_default_project,
		CASE WHEN (
			EXISTS (
				SELECT pk_entity
				FROM projects.class_field_config j1
				WHERE j1.fk_domain_class =  t5.has_domain
				AND j1.fk_project = t2.fk_project
				)
			) 
			THEN true
			ELSE false
		END project_has_own_field_order,
		t2.ord_num_of_range as ord_num_within_field,
		t1.is_in_project_count,
		CASE WHEN t5.is_has_type_subproperty THEN 'type'::war.edge_target_type
		ELSE 'text'::war.edge_target_type
		END as target_provides
		FROM
		information.v_role t1,
		projects.info_proj_rel t2
		JOIN LATERAL (
			SELECT pk_entity,fk_class
			FROM information.persistent_item
			WHERE pk_entity = t1.fk_temporal_entity
			UNION ALL
			SELECT pk_entity,fk_class
			FROM information.temporal_entity
			WHERE pk_entity = t1.fk_temporal_entity
		) AS t3 ON TRUE
		JOIN LATERAL (
			SELECT pk_entity,fk_class
			FROM information.persistent_item
			WHERE pk_entity = t1.fk_entity
			UNION ALL
			SELECT pk_entity,fk_class
			FROM information.temporal_entity
			WHERE pk_entity = t1.fk_entity
		) AS t4 ON TRUE,
		data_for_history.v_property t5
		LEFT JOIN LATERAL (
			SELECT j1.ord_num as field_order
			FROM projects.class_field_config j1
			WHERE j1.fk_property = t5.pk_property
			AND j1.fk_domain_class = t5.has_domain
			AND j1.fk_project = t2.fk_project
		) AS t6 ON true
		LEFT JOIN LATERAL (
			SELECT j1.ord_num as field_order
			FROM projects.class_field_config j1
			WHERE j1.fk_property = t5.pk_property
			AND j1.fk_domain_class = t5.has_domain
			AND j1.fk_project = 375669 -- Default config project
		) AS t7 ON true	
		WHERE
		t1.pk_entity = t2.fk_entity
		AND t2.is_in_project = true
		AND t5.pk_property = t1.fk_property
		AND t5.has_domain = t3.fk_class
		AND t5.has_range = t4.fk_class
		UNION ALL
		---- ingoing edges of project
		SELECT 
		t2.fk_project,
		t1.pk_entity as fk_role,
		t1.fk_entity as fk_source,
		t1.fk_temporal_entity as fk_target,
		t1.fk_property,
		t6.field_order as field_order_of_project,
		t7.field_order as field_order_of_default_project,
		CASE WHEN (
			EXISTS (
				SELECT pk_entity
				FROM projects.class_field_config j1
				WHERE j1.fk_range_class =  t5.has_range
				AND j1.fk_project = t2.fk_project
				)
			) 
			THEN true
			ELSE false
		END project_has_own_field_order,
		t2.ord_num_of_domain as ord_num_within_field,
		t1.is_in_project_count,
		'text'::war.edge_target_type as target_provides
		FROM
		information.v_role t1,
		projects.info_proj_rel t2
		JOIN LATERAL (
			SELECT pk_entity, fk_class
			FROM information.persistent_item
			WHERE pk_entity = t1.fk_entity
			UNION ALL
			SELECT pk_entity,fk_class
			FROM information.temporal_entity
			WHERE pk_entity = t1.fk_entity
		) AS t3 ON TRUE
		JOIN LATERAL (
			SELECT pk_entity,fk_class
			FROM information.persistent_item
			WHERE pk_entity = t1.fk_temporal_entity
			UNION ALL
			SELECT pk_entity,fk_class
			FROM information.temporal_entity
			WHERE pk_entity = t1.fk_temporal_entity
		) AS t4 ON TRUE,
		data_for_history.v_property t5
		LEFT JOIN LATERAL (
			SELECT j1.ord_num as field_order
			FROM projects.class_field_config j1
			WHERE j1.fk_property = t5.pk_property
			AND j1.fk_range_class = t5.has_range
			AND j1.fk_project = t2.fk_project
		) AS t6 ON true
		LEFT JOIN LATERAL (
			SELECT j1.ord_num as field_order
			FROM projects.class_field_config j1
			WHERE j1.fk_property = t5.pk_property
			AND j1.fk_range_class = t5.has_range
			AND j1.fk_project = 375669 -- Default config project
		) AS t7 ON true	
		WHERE
		t1.pk_entity = t2.fk_entity
		AND t2.is_in_project = true
		AND t5.pk_property = t1.fk_property
		AND t5.has_range = t3.fk_class
		AND t5.has_domain = t4.fk_class

	)
	SELECT 
	 fk_source,
	 fk_project,
	 fk_target,
	 target_provides,
	 ord_num_within_field,
	 case 
	 	WHEN fk_property = 1111 THEN -9
	 	WHEN project_has_own_field_order = true THEN field_order_of_project
		ELSE field_order_of_default_project
	 END AS field_order,
	 fk_role
	from tw1
	UNION ALL
	SELECT DISTINCT
	 fk_source,
	 NULL::INT AS fk_project,
	 fk_target,
	 target_provides,
	 --is_in_project_count as ord_num_within_field,
   null::int as ord_num_within_field,
	 case 
	 	WHEN fk_property = 1111 THEN -9
		ELSE field_order_of_default_project
	 END AS field_order,
	 fk_role
	from tw1;

$BODY$;


-- 6
CREATE OR REPLACE FUNCTION war.edges__create_some(
	param_pk_roles integer[],
	param_fk_project integer)
    RETURNS SETOF war.edge 
    LANGUAGE 'sql'

    COST 100
    VOLATILE 
    ROWS 1000
AS $BODY$
WITH tw1 AS (
		---- outgoing edges of project
		SELECT 
		t2.fk_project,
		t1.pk_entity as fk_role,
		t1.fk_temporal_entity as fk_source,
		t1.fk_entity as fk_target,
		t1.fk_property,
		t6.field_order as field_order_of_project,
		t7.field_order as field_order_of_default_project,
		CASE WHEN (
			EXISTS (
				SELECT pk_entity
				FROM projects.class_field_config j1
				WHERE j1.fk_domain_class =  t5.has_domain
				AND j1.fk_project = t2.fk_project
				)
			) 
			THEN true
			ELSE false
		END project_has_own_field_order,
		t2.ord_num_of_range as ord_num_within_field,
		t1.is_in_project_count,
		CASE WHEN t5.is_has_type_subproperty THEN 'type'::war.edge_target_type
		ELSE 'text'::war.edge_target_type
		END as target_provides
		FROM
		information.v_role t1,
		projects.info_proj_rel t2
		JOIN LATERAL (
			SELECT pk_entity,fk_class
			FROM information.persistent_item
			WHERE pk_entity = t1.fk_temporal_entity
			UNION ALL
			SELECT pk_entity,fk_class
			FROM information.temporal_entity
			WHERE pk_entity = t1.fk_temporal_entity
		) AS t3 ON TRUE
		JOIN LATERAL (
			SELECT pk_entity,fk_class
			FROM information.persistent_item
			WHERE pk_entity = t1.fk_entity
			UNION ALL
			SELECT pk_entity,fk_class
			FROM information.temporal_entity
			WHERE pk_entity = t1.fk_entity
		) AS t4 ON TRUE,
		data_for_history.v_property t5
		LEFT JOIN LATERAL (
			SELECT j1.ord_num as field_order
			FROM projects.class_field_config j1
			WHERE j1.fk_property = t5.pk_property
			AND j1.fk_domain_class = t5.has_domain
			AND j1.fk_project = t2.fk_project
		) AS t6 ON true
		LEFT JOIN LATERAL (
			SELECT j1.ord_num as field_order
			FROM projects.class_field_config j1
			WHERE j1.fk_property = t5.pk_property
			AND j1.fk_domain_class = t5.has_domain
			AND j1.fk_project = 375669 -- Default config project
		) AS t7 ON true	
		WHERE
		t1.pk_entity = ANY(param_pk_roles)
		AND t2.fk_project = param_fk_project
		AND t1.pk_entity = t2.fk_entity
		AND t2.is_in_project = true
		AND t5.pk_property = t1.fk_property
		AND t5.has_domain = t3.fk_class
		AND t5.has_range = t4.fk_class
		UNION ALL
		---- ingoing edges of project
		SELECT 
		t2.fk_project,
		t1.pk_entity as fk_role,
		t1.fk_entity as fk_source,
		t1.fk_temporal_entity as fk_target,
		t1.fk_property,
		t6.field_order as field_order_of_project,
		t7.field_order as field_order_of_default_project,
		CASE WHEN (
			EXISTS (
				SELECT pk_entity
				FROM projects.class_field_config j1
				WHERE j1.fk_range_class =  t5.has_range
				AND j1.fk_project = t2.fk_project
				)
			) 
			THEN true
			ELSE false
		END project_has_own_field_order,
		t2.ord_num_of_domain as ord_num_within_field,
		t1.is_in_project_count,
		'text'::war.edge_target_type as target_provides
		FROM
		information.v_role t1,
		projects.info_proj_rel t2
		JOIN LATERAL (
			SELECT pk_entity, fk_class
			FROM information.persistent_item
			WHERE pk_entity = t1.fk_entity
			UNION ALL
			SELECT pk_entity,fk_class
			FROM information.temporal_entity
			WHERE pk_entity = t1.fk_entity
		) AS t3 ON TRUE
		JOIN LATERAL (
			SELECT pk_entity,fk_class
			FROM information.persistent_item
			WHERE pk_entity = t1.fk_temporal_entity
			UNION ALL
			SELECT pk_entity,fk_class
			FROM information.temporal_entity
			WHERE pk_entity = t1.fk_temporal_entity
		) AS t4 ON TRUE,
		data_for_history.v_property t5
		LEFT JOIN LATERAL (
			SELECT j1.ord_num as field_order
			FROM projects.class_field_config j1
			WHERE j1.fk_property = t5.pk_property
			AND j1.fk_range_class = t5.has_range
			AND j1.fk_project = t2.fk_project
		) AS t6 ON true
		LEFT JOIN LATERAL (
			SELECT j1.ord_num as field_order
			FROM projects.class_field_config j1
			WHERE j1.fk_property = t5.pk_property
			AND j1.fk_range_class = t5.has_range
			AND j1.fk_project = 375669 -- Default config project
		) AS t7 ON true	
		WHERE
		t1.pk_entity = ANY(param_pk_roles)
		AND t2.fk_project = param_fk_project
		AND t1.pk_entity = t2.fk_entity
		AND t2.is_in_project = true
		AND t5.pk_property = t1.fk_property
		AND t5.has_range = t3.fk_class
		AND t5.has_domain = t4.fk_class

	)
	SELECT 
	 fk_source,
	 fk_project,
	 fk_target,
	 target_provides,
	 ord_num_within_field,
	 case 
	 	WHEN fk_property = 1111 THEN -9
	 	WHEN project_has_own_field_order = true THEN field_order_of_project
		ELSE field_order_of_default_project
	 END AS field_order,
	 fk_role
	from tw1
	UNION ALL
	SELECT Distinct
	 fk_source,
	 NULL::INT AS fk_project,
	 fk_target,
	 target_provides,
	 --is_in_project_count as ord_num_within_field,
	 null::int as ord_num_within_field,
	 case 
	 	WHEN fk_property = 1111 THEN -9
		ELSE field_order_of_default_project
	 END AS field_order,
	 fk_role
	from tw1;
$BODY$;