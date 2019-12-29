-- 0 prepare workaround for missing is_has_type_subproperty in ontome api
Create Or Replace View data_for_history.v_property As With tw1 As (
    Select
        t1.dfh_pk_property As pk_property,
        t1.dfh_is_inherited As is_inherited,
        t1.dfh_property_domain As has_domain,
        t1.dfh_domain_instances_min_quantifier As domain_instances_min_quantifier,
        t1.dfh_domain_instances_max_quantifier As domain_instances_max_quantifier,
        t1.dfh_property_range As has_range,
        t1.dfh_range_instances_min_quantifier As range_instances_min_quantifier,
        t1.dfh_range_instances_max_quantifier As range_instances_max_quantifier,
        t1.dfh_identity_defining As identity_defining,
        t1.dfh_is_has_type_subproperty As is_has_type_subproperty,
        t1.dfh_property_identifier_in_namespace As identifier_in_namespace,
        jsonb_agg(Distinct jsonb_build_object('fk_profile', t1.dfh_fk_profile, 'removed_from_api', t1.removed_from_api)) As profiles
    From
        data_for_history.api_property t1
    Group By
        t1.dfh_pk_property,
        t1.dfh_is_inherited,
        t1.dfh_property_domain,
        t1.dfh_domain_instances_min_quantifier,
        t1.dfh_domain_instances_max_quantifier,
        t1.dfh_property_range,
        t1.dfh_range_instances_min_quantifier,
        t1.dfh_range_instances_max_quantifier,
        t1.dfh_identity_defining,
        t1.dfh_is_has_type_subproperty,
        t1.dfh_property_identifier_in_namespace
)
Select
    t1.pk_property,
    t1.is_inherited,
    t1.has_domain,
    t1.domain_instances_min_quantifier,
    t1.domain_instances_max_quantifier,
    t1.has_range,
    t1.range_instances_min_quantifier,
    t1.range_instances_max_quantifier,
    t1.identity_defining,
    Case When (t2.pk_entity Is Not Null) Then
        True
    Else
        t1.is_has_type_subproperty
    End As is_has_type_subproperty,
    t1.identifier_in_namespace,
    t1.profiles
From
    tw1 t1
    Left Join system.class_has_type_property t2 On t1.pk_property = t2.fk_property;


-- 1 add schema war
/**
* ADD SCHEMA WAR START
**/
SET check_function_bodies = false;

--
-- Name: war; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA war;


--
-- Name: edge_target_type; Type: TYPE; Schema: war; Owner: -
--

CREATE TYPE war.edge_target_type AS ENUM (
    'text',
    'type'
);


--
-- Name: node_id; Type: TYPE; Schema: war; Owner: -
--

CREATE TYPE war.node_id AS (
	pk_entity integer,
	fk_project integer
);


--
-- Name: edge; Type: TABLE; Schema: war; Owner: -
--

CREATE TABLE war.edge (
    fk_source integer,
    fk_project integer,
    fk_target integer,
    target_provides war.edge_target_type,
    ord_num_within_field integer,
    field_order integer,
    fk_role integer
);

--
-- Name: node; Type: TABLE; Schema: war; Owner: -
--

CREATE TABLE war.node (
    pk_entity integer,
    fk_project integer,
    project integer,
    fk_class integer,
    entity_type text,
    own_entity_label text,
    own_full_text text,
    time_span jsonb,
    first_second bigint,
    last_second bigint,
    own_entity_label_field_order integer
);

--
-- Name: enriched_node; Type: TABLE; Schema: war; Owner: -
--

CREATE TABLE war.enriched_node (
    pk_entity integer,
    fk_project integer,
    project integer,
    fk_class integer,
    class_label character varying,
    entity_type text,
    own_entity_label text,
    own_full_text text,
    time_span jsonb,
    first_second bigint,
    last_second bigint,
    own_entity_label_field_order integer,
    entity_label text,
    type_label text,
    full_text text,
    ts_vector tsvector
);


--
-- Name: entity_preview; Type: TABLE; Schema: war; Owner: -
--

CREATE TABLE war.entity_preview (
    pk_entity integer,
    fk_project integer,
    project integer,
    entity_type text,
    fk_class integer,
    class_label character varying,
    entity_label text,
    full_text text,
    ts_vector tsvector,
    type_label text,
    fk_type integer,
    time_span jsonb,
    first_second bigint,
    last_second bigint,
    tmsp_last_modification timestamp with time zone
);


--
-- Name: update_log; Type: TABLE; Schema: war; Owner: -
--

CREATE TABLE war.update_log (
    pk_entity serial,
    tmsp_update_begin timestamp without time zone,
    tmsp_update_end timestamp without time zone
);


--
-- Name: v_class_preview; Type: VIEW; Schema: war; Owner: -
--

CREATE VIEW war.v_class_preview AS
 WITH tw0 AS (
         SELECT project.pk_entity,
            project.fk_language
           FROM projects.project
        UNION ALL
         SELECT NULL::integer AS int4,
            18889
        ), tw1 AS (
         SELECT t2.fk_dfh_class AS fk_class,
            t1.pk_entity AS fk_project,
            t2.string AS label,
            1 AS rank,
            'project label'::text
           FROM tw0 t1,
            projects.text_property t2
          WHERE ((t1.pk_entity = t2.fk_project) AND (t2.fk_dfh_class IS NOT NULL) AND (t2.fk_language = t1.fk_language))
        UNION ALL
         SELECT t2.fk_dfh_class AS fk_class,
            t1.pk_entity AS fk_project,
            t2.string AS label,
            2 AS rank,
            'default project label in default lang'::text
           FROM tw0 t1,
            projects.text_property t2
          WHERE ((375669 = t2.fk_project) AND (t2.fk_dfh_class IS NOT NULL) AND (t2.fk_language = t1.fk_language))
        UNION ALL
         SELECT t3.fk_class,
            t1.pk_entity AS fk_project,
            t3.label,
            3 AS rank,
            'ontome label in default lang'::text
           FROM tw0 t1,
            information.language t2,
            data_for_history.v_label t3
          WHERE ((t3.fk_class IS NOT NULL) AND ((t3.language)::bpchar = t2.iso6391) AND (t3.type = 'label'::text))
        UNION ALL
         SELECT t2.fk_dfh_class AS fk_class,
            t1.pk_entity AS fk_project,
            t2.string AS label,
            4 AS rank,
            'default project label in en'::text
           FROM tw0 t1,
            projects.text_property t2
          WHERE ((375669 = t2.fk_project) AND (t2.fk_dfh_class IS NOT NULL) AND (t2.fk_language = 18889))
        UNION ALL
         SELECT t3.fk_class,
            t1.pk_entity AS fk_project,
            t3.label,
            3 AS rank,
            'ontome label in en'::text
           FROM tw0 t1,
            data_for_history.v_label t3
          WHERE ((t3.fk_class IS NOT NULL) AND ((t3.language)::text = 'en'::text) AND (t3.type = 'label'::text))
        )
 SELECT DISTINCT ON (tw1.fk_project, tw1.fk_class) tw1.fk_class,
    tw1.fk_project,
    tw1.label
   FROM tw1
  ORDER BY tw1.fk_project, tw1.fk_class, tw1.rank;


--
-- Name: vm_statement; Type: MATERIALIZED VIEW; Schema: war; Owner: -
--

CREATE MATERIALIZED VIEW war.vm_statement AS
 WITH tw1 AS (
         SELECT t1.pk_entity,
            t1.fk_property,
            t1.fk_entity,
            t1.fk_temporal_entity,
            t2.is_in_project_count,
            t1.notes,
            t1.tmsp_creation,
            t1.tmsp_last_modification,
            t1.sys_period
           FROM (information.role t1
             LEFT JOIN LATERAL ( SELECT (count(info_proj_rel.pk_entity))::integer AS is_in_project_count
                   FROM projects.info_proj_rel
                  WHERE ((info_proj_rel.fk_entity = t1.pk_entity) AND (info_proj_rel.is_in_project = true))
                  GROUP BY info_proj_rel.fk_entity) t2 ON (true))
        )
 SELECT t1.pk_entity,
    t1.fk_entity,
    t1.fk_temporal_entity,
    t1.fk_property,
    t2.fk_project,
    COALESCE(t2.fk_project, 0) AS project,
    t2.ord_num_of_domain,
    t2.ord_num_of_range,
    t1.is_in_project_count
   FROM tw1 t1,
    projects.info_proj_rel t2
  WHERE ((t2.fk_entity = t1.pk_entity) AND (t2.is_in_project = true))
UNION
 SELECT t1.pk_entity,
    t1.fk_entity,
    t1.fk_temporal_entity,
    t1.fk_property,
    NULL::integer AS fk_project,
    0 AS project,
    NULL::integer AS ord_num_of_domain,
    NULL::integer AS ord_num_of_range,
    t1.is_in_project_count
   FROM tw1 t1
  WHERE (t1.is_in_project_count > 0)
  WITH NO DATA;


--
-- Name: enriched_node enriched_node_unique; Type: CONSTRAINT; Schema: war; Owner: -
--

ALTER TABLE ONLY war.enriched_node
    ADD CONSTRAINT enriched_node_unique UNIQUE (pk_entity, project);


--
-- Name: node entity_preview_unique; Type: CONSTRAINT; Schema: war; Owner: -
--

ALTER TABLE ONLY war.node
    ADD CONSTRAINT entity_preview_unique UNIQUE (pk_entity, project);


--
-- Name: entity_preview war_entity_preview_unique; Type: CONSTRAINT; Schema: war; Owner: -
--

ALTER TABLE ONLY war.entity_preview
    ADD CONSTRAINT war_entity_preview_unique UNIQUE (pk_entity, project);




--
-- Name: after_info_proj_rel_upsert(); Type: FUNCTION; Schema: war; Owner: -
--

CREATE FUNCTION war.after_info_proj_rel_upsert() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  PERFORM
    pg_notify('project_updated', 'true');
  RETURN NEW;
END;
$$;


--
-- Name: do_updates_for_difference_since(timestamp without time zone); Type: FUNCTION; Schema: war; Owner: -
--

CREATE FUNCTION war.do_updates_for_difference_since(tmsp timestamp without time zone) RETURNS void
    LANGUAGE plpgsql
    AS $$
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
                array_agg(t1.fk_entity) as fk_roles,
                t1.fk_project,
				t1.is_in_project
            From
                projects.info_proj_rel t1,
				information.role t2
            Where
                t1.tmsp_last_modification::timestamp >= tmsp
			AND t1.fk_entity = t2.pk_entity
		 	Group By
				t1.fk_project,
				t1.is_in_project
		)
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
$$;


--
-- Name: do_updates_for_difference_since2(timestamp without time zone); Type: FUNCTION; Schema: war; Owner: -
--

CREATE FUNCTION war.do_updates_for_difference_since2(tmsp timestamp without time zone) RETURNS SETOF war.node_id
    LANGUAGE plpgsql
    AS $$
Declare
    t_row record;
	node_ids war.node_id[];
Begin
	DROP TABLE IF EXISTS to_enrich;
	CREATE TEMP TABLE to_enrich(
		pk_entity int,
		fk_project int
	);


	DROP TABLE IF EXISTS temp_node_changes;
	CREATE TEMP TABLE temp_node_changes As
	/**********
	 * Selects the pk_entities of nodes that need to be updated or deleted
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
			is_in_project;
			
			
	DROP TABLE IF EXISTS temp_edge_changes;
	CREATE TEMP TABLE temp_edge_changes As
 	/**********
	 * Selects the pk_roles of edges that need to be updated or deleted
	 ***********/
	Select
		array_agg(t1.fk_entity) as fk_roles,
		t1.fk_project,
		t1.is_in_project
	From
		projects.info_proj_rel t1,
		information.role t2
	Where
		t1.tmsp_last_modification::timestamp >= tmsp
	AND t1.fk_entity = t2.pk_entity
	Group By
		t1.fk_project,
		t1.is_in_project;

	/*******
	 * Perform the updates on nodes
	 *******/
    For t_row In (SELECT * FROM temp_node_changes)
	Loop
		If (t_row.is_in_project = True) Then
		
			INSERT INTO to_enrich
			SELECT pk_entity, fk_project 
			FROM war.nodes__upsert_some (t_row.pk_entities, t_row.fk_project);
			
		ELSEIF (t_row.is_in_project = False) Then
			
			Perform
				war.nodes__delete_some (t_row.pk_entities, t_row.fk_project);
				
		End If;
	End Loop;
			
	/*******
	 * Perform the updates on edges
	 *******/		
	For t_row In (SELECT * FROM temp_edge_changes)
	Loop
		If (t_row.is_in_project = True) Then
		
			INSERT INTO to_enrich 
			SELECT fk_source, fk_project
			FROM war.edges__upsert_some(t_row.fk_roles,	t_row.fk_project);
				
		ELSEIF (t_row.is_in_project = False) Then
			
			INSERT INTO to_enrich 
			SELECT fk_source, fk_project
			FROM war.edges__delete_some(t_row.fk_roles, t_row.fk_project);
			
		End If;
	End Loop;
	
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
	--WHILE (SELECT count(*) > 0	FROM to_enrich)   
  	--LOOP
	--	-- get the war.node_id[] from to_enrich
	--	SELECT array_agg(ROW(pk_entity, fk_project)::war.node_id) INTO node_ids
	--	FROM (
	--		SELECT DISTINCT pk_entity,fk_project
	--		FROM to_enrich
	--	) x;
	--	
	--	RAISE NOTICE 'node_ids %', node_ids;
	--	
	--	-- empty table to_enrich
	--	DELETE FROM to_enrich;
	--	
	--	-- enrich the nodes and
	--	-- query keys of nodes that depend on changed nodes
	--	-- put those source nodes in to_enrich
	--	INSERT INTO to_enrich
	--	SELECT DISTINCT t1.fk_source, t1.fk_project
	--	FROM 
	--		war.edge t1,
	--		(
	--			-- enrich the nodes
	--			SELECT pk_entity, fk_project
	--			FROM war.enriched_nodes__enrich_some(node_ids)
	--		) t2
	--	WHERE t1.fk_target = t2.pk_entity
	--	AND t1.fk_project IS NOT DISTINCT FROM t2.fk_project;
	--
	--END LOOP;
	
	
	/*******
	 * update the entity_preview
	 *******/
	-- todo
	RETURN QUERY SELECT DISTINCT * FROM to_enrich;
End;

$$;


--
-- Name: edges__create_all(); Type: FUNCTION; Schema: war; Owner: -
--

CREATE FUNCTION war.edges__create_all() RETURNS SETOF war.edge
    LANGUAGE sql
    AS $$
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
	SELECT 
	 fk_source,
	 NULL::INT AS fk_project,
	 fk_target,
	 target_provides,
	 is_in_project_count as ord_num_within_field,
	 case 
	 	WHEN fk_property = 1111 THEN -9
		ELSE field_order_of_default_project
	 END AS field_order,
	 fk_role
	from tw1;

$$;


--
-- Name: edges__create_some(integer[], integer); Type: FUNCTION; Schema: war; Owner: -
--

CREATE FUNCTION war.edges__create_some(param_pk_roles integer[], param_fk_project integer) RETURNS SETOF war.edge
    LANGUAGE sql
    AS $$
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
	SELECT 
	 fk_source,
	 NULL::INT AS fk_project,
	 fk_target,
	 target_provides,
	 is_in_project_count as ord_num_within_field,
	 case 
	 	WHEN fk_property = 1111 THEN -9
		ELSE field_order_of_default_project
	 END AS field_order,
	 fk_role
	from tw1;
$$;


--
-- Name: edges__delete_some(integer[], integer); Type: FUNCTION; Schema: war; Owner: -
--

CREATE FUNCTION war.edges__delete_some(param_pk_roles integer[], param_fk_project integer) RETURNS SETOF war.edge
    LANGUAGE sql
    AS $$

	DELETE 
	FROM war.edge 
	WHERE fk_role = ANY(param_pk_roles)
	AND (
		fk_project IS NULL
		OR
		fk_project = param_fk_project
	)
	RETURNING *;
	
$$;


--
-- Name: edges__upsert_some(integer[], integer); Type: FUNCTION; Schema: war; Owner: -
--

CREATE FUNCTION war.edges__upsert_some(param_pk_roles integer[], param_fk_project integer) RETURNS SETOF war.edge
    LANGUAGE sql
    AS $$

	SELECT war.edges__delete_some(param_pk_roles, param_fk_project);
	INSERT INTO war.edge 
	SELECT * FROM war.edges__create_some(param_pk_roles, param_fk_project)
	RETURNING *;
	
$$;



--
-- Name: enriched_nodes__create_all(); Type: FUNCTION; Schema: war; Owner: -
--

CREATE FUNCTION war.enriched_nodes__create_all() RETURNS SETOF war.enriched_node
    LANGUAGE sql
    AS $$
	
	SELECT
	t1.pk_entity,
	t1.fk_project,
	t1.project,
	t1.fk_class,
	t2.label as class_label,
	t1.entity_type,
	t1.own_entity_label,
	t1.own_full_text,
	t1.time_span,
	t1.first_second,
	t1.last_second,
	t1.own_entity_label_field_order,
	t1.own_entity_label AS entity_label,
	NULL::text type_label,
	NULL::text full_text,
	NULL::tsvector ts_vector
	FROM
	war.node t1,
	war.v_class_preview t2
	WHERE t1.fk_class = t2.fk_class
	AND t1.fk_project is not distinct from t2.fk_project;
	
$$;


--
-- Name: enriched_nodes__create_some(integer[], integer); Type: FUNCTION; Schema: war; Owner: -
--

CREATE FUNCTION war.enriched_nodes__create_some(param_pk_entities integer[], param_fk_project integer) RETURNS SETOF war.enriched_node
    LANGUAGE sql
    AS $$
	
	SELECT
		t1.pk_entity,
		t1.fk_project,
		t1.project,
		t1.fk_class,
		t2.label as class_label,
		t1.entity_type,
		t1.own_entity_label,
		t1.own_full_text,
		t1.time_span,
		t1.first_second,
		t1.last_second,
		t1.own_entity_label_field_order,
		t1.own_entity_label AS entity_label,
		NULL::text type_label,
		NULL::text full_text,
		NULL::tsvector ts_vector
	FROM
	war.nodes__create_some(param_pk_entities, param_fk_project) t1,
	war.v_class_preview t2
	WHERE t1.fk_class = t2.fk_class
	AND t1.fk_project is not distinct from t2.fk_project;
	
	
$$;


--
-- Name: enriched_nodes__enrich(); Type: FUNCTION; Schema: war; Owner: -
--

CREATE FUNCTION war.enriched_nodes__enrich() RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
 
 perform war.enriched_nodes__enrich_entity_label();
 perform war.enriched_nodes__enrich_full_text();
 perform war.enriched_nodes__enrich_type_label();
	
END;
$$;


--
-- Name: enriched_nodes__enrich_entity_label(); Type: FUNCTION; Schema: war; Owner: -
--

CREATE FUNCTION war.enriched_nodes__enrich_entity_label() RETURNS void
    LANGUAGE plpgsql
    AS $$
DECLARE
	needs_update boolean;
BEGIN
  needs_update = true;

  ---------- entity label completion ------------
  WHILE ( needs_update = true)   
  LOOP
      -- fill entity label
	  	WITH tw0 AS (	
		 SELECT t1.pk_entity, t1.fk_project, t1.entity_label old_l, t3.entity_label, t1.own_entity_label_field_order, t2.field_order
		 FROM
		  war.enriched_node t1	  
		 JOIN (	
			  SELECT DISTINCT ON (fk_source, fk_project)
			 	*
			  FROM war.edge j1
			  ORDER BY fk_source, fk_project, j1.field_order asc, j1.ord_num_within_field asc  
		  ) t2 ON
			coalesce(t1.own_entity_label_field_order,10000) > coalesce(t2.field_order,10000)
			AND t1.pk_entity = t2.fk_source 
			AND t1.fk_project IS NOT DISTINCT FROM t2.fk_project
		 JOIN LATERAL (
			 -- join the target enriched_node, in project variant, else in repo variant
			  SELECT DISTINCT ON (j2.pk_entity)
			   j2.entity_label--, j2.pk_entity, j2.fk_project
			  FROM 
				(
				  SELECT t3.entity_label, t3.pk_entity--, t3.fk_project
				  FROM
					war.enriched_node t3
				  WHERE
					t2.fk_target = t3.pk_entity 
				  AND t2.fk_project IS NOT DISTINCT FROM t3.fk_project 
					UNION ALL
				  SELECT t3.entity_label, t3.pk_entity--, t3.fk_project
				  FROM
					war.enriched_node t3
				  WHERE
					t2.fk_target = t3.pk_entity 
				  AND t3.fk_project IS NULL
				) j2
		 ) t3 ON 
		 t1.entity_label IS DISTINCT FROM t3.entity_label
		
		),
	  	 tw1 AS (
			UPDATE
			  war.enriched_node t1
			SET
			  entity_label = t2.entity_label
			FROM
			 tw0 t2
			 WHERE t1.pk_entity = t2.pk_entity
			 AND t1.fk_project IS NOT DISTINCT FROM t2.fk_project
			 RETURNING * 
		)
			SELECT count(*) > 0 into needs_update
			FROM tw1;
    END LOOP;
	
END;
$$;


--
-- Name: enriched_nodes__enrich_full_text(); Type: FUNCTION; Schema: war; Owner: -
--

CREATE FUNCTION war.enriched_nodes__enrich_full_text() RETURNS boolean
    LANGUAGE plpgsql
    AS $$
BEGIN
----------- create full text ---------  
WITH tw1 AS (
	SELECT
	  t1.pk_entity, 
	  t1.fk_project,
	  t1.entity_label,
	  t1.class_label,
	  t1.type_label,
	  array_to_string(array_remove(ARRAY[
		  t1.class_label, 
		  t1.type_label, 
		  t1.own_full_text,
		  string_agg(t3.own_full_text, ', ' ORDER BY t2.field_order asc, t2.ord_num_within_field),
		  t1.entity_label
	  ], null), ', ') as full_text
	FROM
	  war.enriched_node t1,
	  war.edge t2,
	  war.enriched_node t3
	WHERE
	  t1.pk_entity = t2.fk_source  AND t1.fk_project IS NOT DISTINCT FROM t2.fk_project
	  AND t2.fk_target = t3.pk_entity AND t2.fk_project IS NOT DISTINCT FROM t3.fk_project 
	  -- todo: join target nodes of repo too, order by fk_project, select distinct on fk_source, fk_property?, fk_target
	GROUP BY
		t1.pk_entity
		, t1.fk_project
		, t1.class_label
		, t1.type_label
		, t1.entity_label
		, t1.own_full_text		
)
UPDATE
	war.enriched_node t1
SET
	full_text = t2.full_text,
	----------- create tsvector ----------
	ts_vector = (
		SELECT
		setweight(to_tsvector(coalesce(t2.entity_label, '')), 'A') || 
		setweight(to_tsvector(coalesce(t2.type_label, t2.class_label, '')), 'B') || 
		setweight(to_tsvector(coalesce(t2.full_text, '')), 'C')
				)
FROM 
	tw1 t2
WHERE
	t1.pk_entity = t2.pk_entity 
AND 
	t1.fk_project IS NOT DISTINCT FROM t2.fk_project
AND 
	t1.full_text IS DISTINCT FROM t2.full_text;


 RETURN TRUE;
END;
$$;


--
-- Name: enriched_nodes__enrich_some(war.node_id[]); Type: FUNCTION; Schema: war; Owner: -
--

CREATE FUNCTION war.enriched_nodes__enrich_some(node_ids war.node_id[]) RETURNS SETOF war.enriched_node
    LANGUAGE sql
    AS $$

	WITH tw1 AS(
		SELECT t1.* 
		FROM war.enriched_node t1,
			unnest(node_ids) t2
		WHERE t1.pk_entity = t2.pk_entity 
		AND t1.fk_project IS NOT DISTINCT FROM t2.fk_project
	),
	-- select entity_label
	tw2 AS (	
	SELECT t1.pk_entity, t1.fk_project, t1.entity_label old_l, t3.entity_label, t1.own_entity_label_field_order, t2.field_order
	FROM
		tw1 t1
	JOIN LATERAL (	
		SELECT DISTINCT ON (fk_source, fk_project)
		*
		FROM war.edge j1
		WHERE
		coalesce(t1.own_entity_label_field_order,10000) > coalesce(j1.field_order,10000)
		AND 
		t1.pk_entity = j1.fk_source 
		AND t1.fk_project IS NOT DISTINCT FROM j1.fk_project
		ORDER BY fk_source, fk_project, j1.field_order asc, j1.ord_num_within_field asc  
	  ) t2 ON TRUE
	 JOIN LATERAL (
		 -- join the target enriched_node, in project variant, else in repo variant
		  SELECT DISTINCT ON (j2.pk_entity)
		   j2.entity_label--, j2.pk_entity, j2.fk_project
		  FROM 
			(
			  SELECT t3.entity_label, t3.pk_entity--, t3.fk_project
			  FROM
				war.enriched_node t3
			  WHERE
				t2.fk_target = t3.pk_entity 
			  AND t2.fk_project IS NOT DISTINCT FROM t3.fk_project 
				UNION ALL
			  SELECT t3.entity_label, t3.pk_entity--, t3.fk_project
			  FROM
				war.enriched_node t3
			  WHERE
				t2.fk_target = t3.pk_entity 
			  AND t3.fk_project IS NULL
			) j2
	 ) t3 ON TRUE
	),
	-- select type_label
	tw3 AS (	
		SELECT t1.pk_entity, t1.fk_project, t3.entity_label type_label
		FROM
		tw1 t1	  
		JOIN LATERAL (	
		  SELECT *
		  FROM war.edge j1
		  WHERE j1.target_provides = 'type'
		  AND j1.fk_source = t1.pk_entity
		  AND j1.fk_project IS NOT DISTINCT FROM t1.fk_project
		  ORDER BY j1.field_order asc, j1.ord_num_within_field
		  LIMIT 1
		) t2 ON TRUE
		JOIN LATERAL (
		 -- join the target enriched_node, in project variant, else in repo variant
		  SELECT DISTINCT ON (j2.pk_entity)
		   j2.entity_label--, j2.pk_entity, j2.fk_project
		  FROM 
			(
			  SELECT t3.entity_label, t3.pk_entity--, t3.fk_project
			  FROM
				war.enriched_node t3
			  WHERE
				t2.fk_target = t3.pk_entity 
			  AND t2.fk_project IS NOT DISTINCT FROM t3.fk_project 
				UNION ALL
			  SELECT t3.entity_label, t3.pk_entity--, t3.fk_project
			  FROM
				war.enriched_node t3
			  WHERE
				t2.fk_target = t3.pk_entity 
			  AND t3.fk_project IS NULL
			) j2
		) t3 ON true
	),
	-- select full_text
	tw4 AS (
		SELECT
		  t1.pk_entity, 
		  t1.fk_project,
		  t4.entity_label,
		  t1.class_label,
		  t5.type_label,
		  array_to_string(array_remove(ARRAY[
			  t1.class_label, 
			  t5.type_label, 
			  t1.own_full_text,
			  string_agg(t3.own_full_text, ', ' ORDER BY t2.field_order asc, t2.ord_num_within_field),
			  t4.entity_label
		  ], null), ', ') as full_text
		FROM
	 	  tw1 t1
		  JOIN war.edge t2 ON  t1.pk_entity = t2.fk_source  AND t1.fk_project IS NOT DISTINCT FROM t2.fk_project
		  JOIN war.enriched_node t3 ON t2.fk_target = t3.pk_entity AND t2.fk_project IS NOT DISTINCT FROM t3.fk_project 
		  LEFT JOIN tw2 t4 ON t1.pk_entity = t4.pk_entity AND t1.fk_project IS NOT DISTINCT FROM t4.fk_project
		  LEFT JOIN tw3 t5 ON t1.pk_entity = t5.pk_entity  AND t1.fk_project IS NOT DISTINCT FROM t5.fk_project
		GROUP BY
			t1.pk_entity
			, t1.fk_project
			, t1.class_label
			, t5.type_label
			, t4.entity_label
			, t1.own_full_text	
	),
	-- left join entity_label, full_text and type_label, where at least one needs update
	tw5 AS (
		SELECT 
			t1.pk_entity,
			t1.fk_project,
			t1.entity_label old_label, t2.entity_label, 
			t1.type_label old_type_label, t3.type_label,
			t1.full_text old_full_text, t4.full_text
		FROM tw1 t1
		LEFT JOIN tw2 t2
			ON
			t1.pk_entity = t2.pk_entity 
			AND t1.fk_project IS NOT DISTINCT FROM t2.fk_project
		LEFT JOIN tw3 t3
			ON
			t1.pk_entity = t3.pk_entity 
			AND t1.fk_project IS NOT DISTINCT FROM t3.fk_project
		LEFT JOIN tw4 t4
			ON
			t1.pk_entity = t4.pk_entity 
			AND t1.fk_project IS NOT DISTINCT FROM t4.fk_project
		WHERE (
			t1.entity_label IS DISTINCT FROM t2.entity_label
			OR
			t1.type_label IS DISTINCT FROM t3.type_label
			OR
			t1.full_text IS DISTINCT FROM t4.full_text
		)
	)
	UPDATE
		war.enriched_node t1
	SET
		entity_label = t2.entity_label,
		type_label = t2.type_label,
		full_text = t2.full_text,
		ts_vector = (
			SELECT
			setweight(to_tsvector(coalesce(t2.entity_label, '')), 'A') || 
			setweight(to_tsvector(coalesce(t2.type_label, t1.class_label, '')), 'B') || 
			setweight(to_tsvector(coalesce(t2.full_text, '')), 'C')
		)
	FROM
		tw5 t2
	WHERE t1.pk_entity = t2.pk_entity
	AND t1.fk_project IS NOT DISTINCT FROM t2.fk_project
	RETURNING t1.*;


$$;


--
-- Name: enriched_nodes__enrich_type_label(); Type: FUNCTION; Schema: war; Owner: -
--

CREATE FUNCTION war.enriched_nodes__enrich_type_label() RETURNS void
    LANGUAGE plpgsql
    AS $$
DECLARE
	needs_update boolean;
BEGIN
  needs_update = true;

  ---------- type label completion ------------
  WHILE ( needs_update = true)   
  LOOP
      -- fill type label
	  	WITH tw0 AS (	
		 SELECT t1.pk_entity, t1.fk_project, t1.type_label, t3.entity_label
		 FROM
		  war.enriched_node t1	  
		 JOIN LATERAL (	
			  SELECT *
			  FROM war.edge j1
			  WHERE j1.target_provides = 'type'
			  AND j1.fk_source = t1.pk_entity
			  AND j1.fk_project IS NOT DISTINCT FROM t1.fk_project
			  ORDER BY j1.field_order asc, j1.ord_num_within_field
			  LIMIT 1
		  ) t2 ON TRUE
		 JOIN LATERAL (
			 -- join the target enriched_node, in project variant, else in repo variant
			  SELECT DISTINCT ON (j2.pk_entity)
			   j2.entity_label--, j2.pk_entity, j2.fk_project
			  FROM 
				(
				  SELECT t3.entity_label, t3.pk_entity--, t3.fk_project
				  FROM
					war.enriched_node t3
				  WHERE
					t2.fk_target = t3.pk_entity 
				  AND t2.fk_project IS NOT DISTINCT FROM t3.fk_project 
					UNION ALL
				  SELECT t3.entity_label, t3.pk_entity--, t3.fk_project
				  FROM
					war.enriched_node t3
				  WHERE
					t2.fk_target = t3.pk_entity 
				  AND t3.fk_project IS NULL
				) j2
		 ) t3 ON 
		 t1.type_label IS DISTINCT FROM t3.entity_label

		),
	  	 tw1 AS (
			UPDATE
			  war.enriched_node t1
			SET
			  type_label = t2.entity_label
			FROM
			 tw0 t2
			 WHERE t1.pk_entity = t2.pk_entity
			 AND t1.fk_project IS NOT DISTINCT FROM t2.fk_project
			 RETURNING t1.*, t2.entity_label
		)
			SELECT count(*) > 0 into needs_update
			FROM tw1;
    END LOOP;
	
END;
$$;


--
-- Name: entity_preview__add_missing(); Type: FUNCTION; Schema: war; Owner: -
--

CREATE FUNCTION war.entity_preview__add_missing() RETURNS boolean
    LANGUAGE plpgsql
    AS $$
BEGIN
  -- Add missing entity previews
  WITH tw1 AS (
    SELECT
      pk_entity,
      fk_project,
      'not in entity_preview, to be added' AS note
    FROM
      war.enriched_node
    EXCEPT
    SELECT
      pk_entity,
      fk_project,
      'not in entity_preview, to be added' AS note
    FROM
      war.entity_preview
) INSERT INTO war.entity_preview (
	pk_entity, fk_project, project, entity_type, fk_class, class_label, entity_label, full_text, ts_vector, type_label, fk_type, time_span, first_second, last_second)
SELECT
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
  NULL::int, --t1.fk_type,
  t1.time_span,
  t1.first_second,
  t1.last_second
 FROM
  war.enriched_node t1,
  tw1
WHERE
  t1.pk_entity = tw1.pk_entity
  AND t1.fk_project IS NOT DISTINCT FROM tw1.fk_project;

RETURN TRUE;

END;
$$;


--
-- Name: entity_preview__remove_superfluous(); Type: FUNCTION; Schema: war; Owner: -
--

CREATE FUNCTION war.entity_preview__remove_superfluous() RETURNS boolean
    LANGUAGE plpgsql
    AS $$
BEGIN
  -- remove superfluous entity previews
  WITH tw1 AS (
    SELECT
      pk_entity,
      fk_project,
      'not in enriched_node, to be deleted' AS note
    FROM
      war.entity_preview
    EXCEPT
    SELECT
      pk_entity,
      fk_project,
      'not in enriched_node, to be deleted' AS note
    FROM
      war.enriched_node
) DELETE FROM war.entity_preview t1 USING tw1
WHERE t1.pk_entity = tw1.pk_entity
  AND t1.fk_project IS NOT DISTINCT FROM tw1.fk_project;

RETURN TRUE;

END;
$$;


--
-- Name: entity_preview__update_all(); Type: FUNCTION; Schema: war; Owner: -
--

CREATE FUNCTION war.entity_preview__update_all() RETURNS boolean
    LANGUAGE plpgsql
    AS $$
BEGIN
  PERFORM
    war.entity_preview__add_missing ();
  PERFORM
    war.entity_preview__remove_superfluous ();
  PERFORM
    war.entity_preview__update_modified ();
  RETURN TRUE;
END;
$$;


--
-- Name: entity_preview__update_class_labels(); Type: FUNCTION; Schema: war; Owner: -
--

CREATE FUNCTION war.entity_preview__update_class_labels() RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN

WITH tw1 AS (
	SELECT fk_class, fk_project, class_label
	FROM
	war.enriched_node t1
	GROUP BY
	fk_class, fk_project, class_label
), tw2 AS (
	select 
	t2.*
	FROM
	tw1 t1,
	war.v_class_preview t2
	WHERE
	t1.fk_class = t2.fk_class
	AND
	t1.fk_project  IS NOT DISTINCT FROM  t2.fk_project
	AND t1.class_label IS DISTINCT FROM t2.label
)
UPDATE war.enriched_node t1
SET class_label = t2.label
FROM
 tw2 t2
WHERE
t1.fk_class = t2.fk_class
AND
t1.fk_project  IS NOT DISTINCT FROM  t2.fk_project;

PERFORM war.enriched_nodes__enrich_full_text();
PERFORM war.entity_preview__update_modified();


END;
$$;


--
-- Name: entity_preview__update_modified(); Type: FUNCTION; Schema: war; Owner: -
--

CREATE FUNCTION war.entity_preview__update_modified() RETURNS boolean
    LANGUAGE plpgsql
    AS $$
BEGIN
  -- update modified entity previews
  WITH tw1 AS (
    SELECT
		pk_entity,
		fk_project,
		project,
		entity_type,
		fk_class,
	  	class_label,
		entity_label,
		full_text,
		ts_vector,
		type_label,
		--fk_type,
		time_span,
		first_second,
		last_second,
      	'different from war.enriched_node, to be updated' AS note
    FROM
      war.enriched_node
    EXCEPT
    SELECT
		pk_entity,
		fk_project,
		project,
		entity_type,
		fk_class,
		class_label,
		entity_label,
		full_text,
		ts_vector,
		type_label,
		--fk_type,
		time_span,
		first_second,
		last_second,
      	'different from war.enriched_node, to be updated' AS note
    FROM
      war.entity_preview
  )
  UPDATE
    war.entity_preview t1
  SET
    entity_type = tw1.entity_type,
    fk_class = tw1.fk_class,
	class_label = tw1.class_label,
    entity_label = tw1.entity_label,
    full_text = tw1.full_text,
    ts_vector = tw1.ts_vector,
    type_label = tw1.type_label,
    --fk_type = tw1.fk_type,
    time_span = tw1.time_span,
    first_second = tw1.first_second,
    last_second = tw1.last_second
  FROM
    tw1
  WHERE
    t1.pk_entity = tw1.pk_entity
    AND t1.fk_project IS NOT DISTINCT FROM tw1.fk_project;

  RETURN TRUE;
END;
$$;


--
-- Name: entity_previews__notify_upsert(); Type: FUNCTION; Schema: war; Owner: -
--

CREATE FUNCTION war.entity_previews__notify_upsert() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
	notification text;
BEGIN
	

	SELECT DISTINCT tmsp_last_modification::text into notification
	FROM new_table
	WHERE tmsp_last_modification is not null
	LIMIT 1;

  	if notification is not null then 
					PERFORM pg_notify('entity_previews_updated'::text, notification);
 	end if;


RETURN NEW;
END;
$$;


--
-- Name: nodes__create_all(); Type: FUNCTION; Schema: war; Owner: -
--

CREATE FUNCTION war.nodes__create_all() RETURNS SETOF war.node
    LANGUAGE sql
    AS $$
	
	With
    -- all entities per project with class label
    tw1 As (
        Select
            t1.pk_entity,
            t1.fk_class,
            t2.fk_project,
            'peIt'::varchar As entity_type
        From
            information.persistent_item t1,
            projects.info_proj_rel t2
        Where
            t2.is_in_project = True
            And t1.pk_entity = t2.fk_entity
        Union
        Select
            t1.pk_entity,
            t1.fk_class,
            t2.fk_project,
            'teEn'::varchar As entity_type
        From
            information.temporal_entity t1,
            projects.info_proj_rel t2
        Where
            t2.is_in_project = True
            And t1.pk_entity = t2.fk_entity
),
-- all entities
tw2 As (
    Select
        t1.pk_entity,
        t1.fk_class,
        t1.fk_project,
        t1.entity_type
    From
        tw1 t1
),
-- select all 'histP11 refers to name' roles
tw5 As (
    Select
		-10 As field_order,
        t1.pk_entity,
        t1.fk_entity,
        t1.fk_temporal_entity,
        t1.fk_property,
        t2.fk_project,
        coalesce(t2.fk_project, 0) As project,
        t2.ord_num_of_domain,
        t2.ord_num_of_range,
        t1.is_in_project_count
    From
        information.v_role t1,
        projects.info_proj_rel t2
    Where
		t1.fk_property = 1113
        AND t2.fk_entity = t1.pk_entity
        And t2.is_in_project = True
),
-- select all text_properties per project with ord_num
tw6 As (
    Select
		CASE t1.fk_class_field
		When 217 Then
            - 10
        When 218 Then
            - 8
        When 219 Then
            - 7
        Else
            null::int
        End As field_order,
        t1.pk_entity,
        t1.fk_concerned_entity,
        t1.fk_language,
        t1.fk_class_field,
        t1.quill_doc,
        t1.string,
        t1.is_in_project_count,
        t2.fk_project,
        coalesce(t2.fk_project, 0) As "coalesce",
        t2.ord_num_of_text_property
    From
        information.v_text_property t1,
        projects.info_proj_rel t2
    Where
        t2.fk_entity = t1.pk_entity
        And t2.is_in_project = True
),
-- join directly related things and create string
tw7 As (
    Select
        t1.*,
		coalesce(t2.field_order, t7.field_order) as field_order,
		coalesce(t2.is_in_project_count, t7.is_in_project_count) As is_in_project_count,
        coalesce(t2.ord_num_of_range, t7.ord_num_of_text_property) As ord_num,
		regexp_replace(coalesce(t3.string, t7.string), E'[\\n\\r]+', '', 'g' ) As string
    From
        tw2 t1
	-- join outgoing roles
    Left Join tw5 t2
        On t1.fk_project Is Not Distinct From t2.fk_project
        And t2.fk_temporal_entity = t1.pk_entity
	-- join appellation with outgoing roles
    Left Join information.appellation t3
		On t2.fk_entity = t3.pk_entity
    -- join text properties
    Left Join tw6 t7
		On t1.pk_entity = t7.fk_concerned_entity
        And t1.fk_project Is Not Distinct From t7.fk_project
),
-- own_entity_label per project
tw8 AS (
	select distinct on (fk_project, pk_entity)
	fk_project,
	pk_entity,
	string as own_entity_label,
	field_order as own_entity_label_field_order
	from tw7
	where string is not null
	ORDER BY fk_project, pk_entity, field_order asc, ord_num asc
),
-- own_full_text per project
tw9 AS (
	select 
	fk_project,
	pk_entity,
	string_agg(string, '; ') as own_full_text
	from tw7
	where string is not null
	GROUP BY fk_project, pk_entity
	--ORDER BY field_order, ord_num
),
-- own_entity_label per repo
tw10 AS (
	select distinct on (pk_entity)
	null::int as fk_project,
	pk_entity,
	own_entity_label,
	own_entity_label_field_order
	from tw8
	group by pk_entity, own_entity_label, own_entity_label_field_order
	ORDER BY pk_entity, count(fk_project) desc
),
-- own_full_text per repo
tw11 AS (
	select 
	null::int as fk_project,
	t1.pk_entity,
	string_agg(t1.string, '; ') as own_full_text
	FROM (
		select pk_entity, string
		from tw7
		where string is not null
		GROUP BY pk_entity, string
		ORDER BY count(pk_entity) desc
	) as t1
	GROUP BY t1.pk_entity
),
-- project variant
tw12 AS (
	Select distinct on (t1.pk_entity,  t1.fk_project)
        t1.pk_entity,
        t1.fk_class,
        t1.fk_project,
        t1.entity_type,
		t2.own_entity_label,
		t2.own_entity_label_field_order,
		t3.own_full_text
    From
        tw7 t1
	LEFT JOIN tw8 t2 
		ON t2.pk_entity = t1.pk_entity 
		AND t2.fk_project = t1.fk_project
	LEFT JOIN tw9 t3 
		ON t3.pk_entity = t1.pk_entity
		AND t3.fk_project = t1.fk_project
),
-- repo variant
tw13 AS (
   Select Distinct On (pk_entity)
        t1.pk_entity,
        t1.fk_class,
        NULL::integer As fk_project,
        t1.entity_type,
		t2.own_entity_label,
		t2.own_entity_label_field_order,
		t3.own_full_text
    From
        tw1 t1
	LEFT JOIN tw10 t2 ON t2.pk_entity = t1.pk_entity
	LEFT JOIN tw11 t3 ON t3.pk_entity = t1.pk_entity
),
tw14 AS (
	SELECT 
		t1.pk_entity,
		t1.fk_class,
		t1.fk_project,
		t1.entity_type,
		t1.own_full_text,
		t1.own_entity_label,
		t1.own_entity_label_field_order
	FROM tw12 t1
	UNION ALL
	SELECT 
		t1.pk_entity,
		t1.fk_class,
		t1.fk_project,
		t1.entity_type,
		t1.own_full_text,
		t1.own_entity_label,
		t1.own_entity_label_field_order
	FROM tw13 t1
),
/**
* Add time spans
*/
tw15 As (
    -- get first and last second of all time primitives
    Select
        t1.pk_entity,
        t1.julian_day,
        t1.duration,
        commons.time_primitive__get_first_second (t1.julian_day) As first_second,
        commons.time_primitive__get_last_second (t1.julian_day, t1.duration, 'gregorian') As last_second_gregorian,
        commons.time_primitive__get_last_second (t1.julian_day, t1.duration, 'julian') As last_second_julian
    From
        information.time_primitive t1
),
-- select roles with time primitive, first and last second
tw16 As (
    Select
        t1.fk_temporal_entity,
        t1.fk_property,
        t3.fk_project,
        t3.calendar,
        t2.julian_day,
        t2.duration,
        t2.first_second,
        Case When t3.calendar = 'gregorian' Then
            t2.last_second_gregorian
        Else
            t2.last_second_julian
        End last_second
    From
        information.role t1,
        tw15 t2,
        projects.info_proj_rel t3
    Where
        t1.pk_entity = t3.fk_entity
        And (t1.fk_property = Any (Array[71,
                72,
                150,
                151,
                152,
                153]))
        And t2.pk_entity = t1.fk_entity
        And t3.is_in_project = True
    Union ALL
	( Select Distinct On (t1.fk_temporal_entity,
            t1.fk_property)
            t1.fk_temporal_entity,
            t1.fk_property,
            NULL::integer As fk_project,
            t1.community_favorite_calendar,
            t2.julian_day,
            t2.duration,
            t2.first_second,
            Case When t1.community_favorite_calendar = 'gregorian' Then
                t2.last_second_gregorian
            Else
                t2.last_second_julian
            End last_second
        From
            information.v_role t1
            Join tw15 t2 On t2.pk_entity = t1.fk_entity
        Where
            t1.fk_property = Any (Array[71,
                72,
                150,
                151,
                152,
                153])
            And t1.is_in_project_count > 0
        Order By
            t1.fk_temporal_entity,
            t1.fk_property,
            t1.is_in_project_count Desc,
            t1.tmsp_creation Desc)
),
-- create time spans, first_second and last_second
tw17 As (
    Select
        tw16.fk_project,
        tw16.fk_temporal_entity,
        min(tw16.first_second) first_second,
        max(tw16.last_second) last_second,
        jsonb_object_agg(
            Case When tw16.fk_property = 71 Then
                'p81'::text
            When tw16.fk_property = 72 Then
                'p82'::text
            When tw16.fk_property = 150 Then
                'p81a'::text
            When tw16.fk_property = 151 Then
                'p81b'::text
            When tw16.fk_property = 152 Then
                'p82a'::text
            When tw16.fk_property = 153 Then
                'p82b'::text
            Else
                tw16.fk_property::text
            End, json_build_object('julianDay', tw16.julian_day, 'duration', tw16.duration, 'calendar', tw16.calendar)) As time_span
    From
        tw16
    Group By
        tw16.fk_project,
        tw16.fk_temporal_entity
)

/*
* time spans added
**/
select 
	t1.pk_entity,
	t1.fk_project,
	coalesce(t1.fk_project,0),
	t1.fk_class,
	t1.entity_type,
	t1.own_entity_label,
	t1.own_full_text,
	t2.time_span,
	t2.first_second,
	t2.last_second,
	t1.own_entity_label_field_order
from tw14 t1
LEFT JOIN tw17 t2
	ON t1.pk_entity = t2.fk_temporal_entity
	AND t1.fk_project IS NOT DISTINCT FROM t2.fk_project

$$;


--
-- Name: nodes__create_some(integer[], integer); Type: FUNCTION; Schema: war; Owner: -
--

CREATE FUNCTION war.nodes__create_some(param_pk_entities integer[], param_fk_project integer) RETURNS SETOF war.node
    LANGUAGE sql
    AS $$
	
	With
    -- all entities per project
    tw1 As (
        Select
            t1.pk_entity,
            t1.fk_class,
            t2.fk_project,
            'peIt'::varchar As entity_type
        From
            information.persistent_item t1,
            projects.info_proj_rel t2
        Where
            t2.is_in_project = True
            AND t1.pk_entity = ANY(param_pk_entities)
            And t1.pk_entity = t2.fk_entity
            AND t2.fk_project = param_fk_project
        Union
        Select
            t1.pk_entity,
            t1.fk_class,
            t2.fk_project,
            'teEn'::varchar As entity_type
        From
            information.temporal_entity t1,
            projects.info_proj_rel t2
        Where
            t2.is_in_project = True
            AND t1.pk_entity = ANY(param_pk_entities)
            And t1.pk_entity = t2.fk_entity
            AND t2.fk_project = param_fk_project
),
-- select all 'histP11 refers to name' roles
tw5 As (
    Select
		-10 As field_order,
        t1.pk_entity,
        t1.fk_entity,
        t1.fk_temporal_entity,
        t1.fk_property,
        t2.fk_project,
        coalesce(t2.fk_project, 0) As project,
        t2.ord_num_of_domain,
        t2.ord_num_of_range,
        t1.is_in_project_count
    From
        information.v_role t1,
        projects.info_proj_rel t2
    Where
		t1.fk_property = 1113
        AND t1.fk_temporal_entity = ANY(param_pk_entities)
        AND t2.fk_entity = t1.pk_entity
        And t2.is_in_project = True
),
-- select all text_properties per project with ord_num
tw6 As (
    Select
		CASE t1.fk_class_field
		When 217 Then
            - 10
        When 218 Then
            - 8
        When 219 Then
            - 7
        Else
            null::int
        End As field_order,
        t1.pk_entity,
        t1.fk_concerned_entity,
        t1.fk_language,
        t1.fk_class_field,
        t1.quill_doc,
        t1.string,
        t1.is_in_project_count,
        t2.fk_project,
        coalesce(t2.fk_project, 0) As "coalesce",
        t2.ord_num_of_text_property
    From
        information.v_text_property t1,
        projects.info_proj_rel t2
    Where
        t1.fk_concerned_entity = ANY(param_pk_entities)
        AND t2.fk_entity = t1.pk_entity
        And t2.is_in_project = True
),
-- join directly related things and create string
tw7 As (
    Select
        t1.*,
		coalesce(t2.field_order, t7.field_order) as field_order,
		coalesce(t2.is_in_project_count, t7.is_in_project_count) As is_in_project_count,
        coalesce(t2.ord_num_of_range, t7.ord_num_of_text_property) As ord_num,
		regexp_replace(coalesce(t3.string, t7.string), E'[\\n\\r]+', '', 'g' ) As string
    From
        tw1 t1
	-- join outgoing roles
    Left Join tw5 t2
        On t1.fk_project Is Not Distinct From t2.fk_project
        And t2.fk_temporal_entity = t1.pk_entity
	-- join appellation with outgoing roles
    Left Join information.appellation t3
		On t2.fk_entity = t3.pk_entity
    -- join text properties
    Left Join tw6 t7
		On t1.pk_entity = t7.fk_concerned_entity
        And t1.fk_project Is Not Distinct From t7.fk_project
),
-- own_entity_label per project
tw8 AS (
	select distinct on (fk_project, pk_entity)
	fk_project,
	pk_entity,
	string as own_entity_label,
	field_order as own_entity_label_field_order
	from tw7
	where string is not null
	ORDER BY fk_project, pk_entity, field_order asc, ord_num asc
),
-- own_full_text per project
tw9 AS (
	select 
	fk_project,
	pk_entity,
	string_agg(string, '; ') as own_full_text
	from tw7
	where string is not null
	GROUP BY fk_project, pk_entity
	--ORDER BY field_order, ord_num
),
-- own_entity_label per repo
tw10 AS (
	select distinct on (pk_entity)
	null::int as fk_project,
	pk_entity,
	own_entity_label,
	own_entity_label_field_order
	from tw8
	group by pk_entity, own_entity_label, own_entity_label_field_order
	ORDER BY pk_entity, count(fk_project) desc
),
-- own_full_text per repo
tw11 AS (
	select 
	null::int as fk_project,
	t1.pk_entity,
	string_agg(t1.string, '; ') as own_full_text
	FROM (
		select pk_entity, string
		from tw7
		where string is not null
		GROUP BY pk_entity, string
		ORDER BY count(pk_entity) desc
	) as t1
	GROUP BY t1.pk_entity
),
-- project variant
tw12 AS (
	Select distinct on (t1.pk_entity,  t1.fk_project)
        t1.pk_entity,
        t1.fk_class,
        t1.fk_project,
        t1.entity_type,
		t2.own_entity_label,
		t2.own_entity_label_field_order,
		t3.own_full_text
    From
        tw7 t1
	LEFT JOIN tw8 t2 
		ON t2.pk_entity = t1.pk_entity 
		AND t2.fk_project = t1.fk_project
        AND t2.fk_project = param_fk_project
	LEFT JOIN tw9 t3 
		ON t3.pk_entity = t1.pk_entity
		AND t3.fk_project = t1.fk_project
        AND t3.fk_project = param_fk_project
),
-- repo variant
tw13 AS (
   Select Distinct On (pk_entity)
        t1.pk_entity,
        t1.fk_class,
        NULL::integer As fk_project,
        t1.entity_type,
		t2.own_entity_label,
		t2.own_entity_label_field_order,
		t3.own_full_text
    From
        tw1 t1
	LEFT JOIN tw10 t2 ON t2.pk_entity = t1.pk_entity
	LEFT JOIN tw11 t3 ON t3.pk_entity = t1.pk_entity
),
tw14 AS (
	SELECT 
		t1.pk_entity,
		t1.fk_class,
		t1.fk_project,
		t1.entity_type,
		t1.own_full_text,
		t1.own_entity_label,
		t1.own_entity_label_field_order
	FROM tw12 t1
	UNION ALL
	SELECT 
		t1.pk_entity,
		t1.fk_class,
		t1.fk_project,
		t1.entity_type,
		t1.own_full_text,
		t1.own_entity_label,
		t1.own_entity_label_field_order
	FROM tw13 t1
),
/**
* Add time spans
*/
tw15 As (
    -- get first and last second of all time primitives
    Select
        t1.pk_entity,
        t1.julian_day,
        t1.duration,
        commons.time_primitive__get_first_second (t1.julian_day) As first_second,
        commons.time_primitive__get_last_second (t1.julian_day, t1.duration, 'gregorian') As last_second_gregorian,
        commons.time_primitive__get_last_second (t1.julian_day, t1.duration, 'julian') As last_second_julian
    From
        information.time_primitive t1
),
-- select roles with time primitive, first and last second
tw16 As (
    Select
        t1.fk_temporal_entity,
        t1.fk_property,
        t3.fk_project,
        t3.calendar,
        t2.julian_day,
        t2.duration,
        t2.first_second,
        Case When t3.calendar = 'gregorian' Then
            t2.last_second_gregorian
        Else
            t2.last_second_julian
        End last_second
    From
        information.role t1
        JOIN LATERAL (
             Select
                j1.pk_entity,
                j1.julian_day,
                j1.duration,
                commons.time_primitive__get_first_second (j1.julian_day) As first_second,
                commons.time_primitive__get_last_second (j1.julian_day, j1.duration, 'gregorian') As last_second_gregorian,
                commons.time_primitive__get_last_second (j1.julian_day, j1.duration, 'julian') As last_second_julian
            From
                information.time_primitive j1
            WHERE j1.pk_entity = t1.fk_entity
        ) t2 ON           
            t1.fk_temporal_entity = ANY(param_pk_entities)
            And (t1.fk_property = Any (Array[71,
                    72,
                    150,
                    151,
                    152,
                    153]))
            And t2.pk_entity = t1.fk_entity,
        projects.info_proj_rel t3
		WHERE t1.pk_entity = t3.fk_entity
        AND t3.is_in_project = True
    Union ALL
	( Select Distinct On (t1.fk_temporal_entity,
            t1.fk_property)
            t1.fk_temporal_entity,
            t1.fk_property,
            NULL::integer As fk_project,
            t1.community_favorite_calendar,
            t2.julian_day,
            t2.duration,
            t2.first_second,
            Case When t1.community_favorite_calendar = 'gregorian' Then
                t2.last_second_gregorian
            Else
                t2.last_second_julian
            End last_second
        From
            information.v_role t1
            JOIN LATERAL (
                Select
                    j1.pk_entity,
                    j1.julian_day,
                    j1.duration,
                    commons.time_primitive__get_first_second (j1.julian_day) As first_second,
                    commons.time_primitive__get_last_second (j1.julian_day, j1.duration, 'gregorian') As last_second_gregorian,
                    commons.time_primitive__get_last_second (j1.julian_day, j1.duration, 'julian') As last_second_julian
                From
                    information.time_primitive j1
                WHERE j1.pk_entity = t1.fk_entity
            ) t2 ON 
            t1.fk_temporal_entity = ANY(param_pk_entities)
            AND t1.fk_property = Any (Array[71,
                72,
                150,
                151,
                152,
                153])
            And t1.is_in_project_count > 0
        Order By
            t1.fk_temporal_entity,
            t1.fk_property,
            t1.is_in_project_count Desc,
            t1.tmsp_creation Desc)
),
-- create time spans, first_second and last_second
tw17 As (
    Select
        tw16.fk_project,
        tw16.fk_temporal_entity,
        min(tw16.first_second) first_second,
        max(tw16.last_second) last_second,
        jsonb_object_agg(
            Case When tw16.fk_property = 71 Then
                'p81'::text
            When tw16.fk_property = 72 Then
                'p82'::text
            When tw16.fk_property = 150 Then
                'p81a'::text
            When tw16.fk_property = 151 Then
                'p81b'::text
            When tw16.fk_property = 152 Then
                'p82a'::text
            When tw16.fk_property = 153 Then
                'p82b'::text
            Else
                tw16.fk_property::text
            End, json_build_object('julianDay', tw16.julian_day, 'duration', tw16.duration, 'calendar', tw16.calendar)) As time_span
    From
        tw16
    Group By
        tw16.fk_project,
        tw16.fk_temporal_entity
)

/*
* time spans added
**/
select 
	t1.pk_entity,
	t1.fk_project,
	coalesce(t1.fk_project,0),
	t1.fk_class,
	t1.entity_type,
	t1.own_entity_label,
	t1.own_full_text,
	t2.time_span,
	t2.first_second,
	t2.last_second,
	t1.own_entity_label_field_order
from tw14 t1
LEFT JOIN tw17 t2
	ON t1.pk_entity = t2.fk_temporal_entity
	AND t1.fk_project IS NOT DISTINCT FROM t2.fk_project

$$;


--
-- Name: nodes__delete_some(integer[], integer); Type: FUNCTION; Schema: war; Owner: -
--

CREATE FUNCTION war.nodes__delete_some(param_pk_entities integer[], param_fk_project integer) RETURNS SETOF war.node
    LANGUAGE sql
    AS $$

	/**
  * Delete the enriched_nodes with param_pk_entities and
  * fk_project is param_fk_project or null (repo)
  */
  DELETE FROM  war.enriched_node
  WHERE pk_entity = ANY(param_pk_entities)
  AND (
	  fk_project IS NOT DISTINCT FROM param_fk_project OR
	  fk_project IS NULL
  );
  
  
  /**
  * Delete the nodes with param_pk_entities and 
  * fk_project is param_fk_project or null (repo)
  */
  DELETE FROM war.node
  WHERE 
  	pk_entity = ANY(param_pk_entities)
  AND (
	  fk_project IS NOT DISTINCT FROM param_fk_project OR
	  fk_project IS NULL
  )
  RETURNING *;
  
$$;


--
-- Name: nodes__upsert_some(integer[], integer); Type: FUNCTION; Schema: war; Owner: -
--

CREATE FUNCTION war.nodes__upsert_some(param_pk_entities integer[], param_fk_project integer) RETURNS SETOF war.node
    LANGUAGE sql
    AS $$
	-- delete nodes and enriched_nodes
    SELECT war.nodes__delete_some(param_pk_entities, param_fk_project);

	INSERT INTO war.enriched_node
    SELECT * FROM war.enriched_nodes__create_some(param_pk_entities, param_fk_project);

	INSERT INTO war.node
    SELECT * FROM war.nodes__create_some(param_pk_entities, param_fk_project)
	RETURNING *;

$$;


--
-- Name: nodes_and_edges__update_all(); Type: FUNCTION; Schema: war; Owner: -
--

CREATE FUNCTION war.nodes_and_edges__update_all() RETURNS void
    LANGUAGE sql
    AS $$

    DELETE FROM war.node;
    DELETE FROM war.edge;
	DELETE FROM war.enriched_node;

    INSERT INTO war.node
    SELECT * FROM war.nodes__create_all();
	
 	INSERT INTO war.edge
    SELECT * FROM war.edges__create_all();
	
	INSERT INTO war.enriched_node
    SELECT * FROM war.enriched_nodes__create_all(); 

$$;


--
-- Name: notify__need_to_check_class_labels(); Type: FUNCTION; Schema: war; Owner: -
--

CREATE FUNCTION war.notify__need_to_check_class_labels() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
	PERFORM pg_notify('need_to_check_class_labels', 'check for updates');
RETURN NULL;
END;
$$;


--
-- Name: updater(); Type: FUNCTION; Schema: war; Owner: -
--

CREATE FUNCTION war.updater() RETURNS boolean
    LANGUAGE plpgsql
    AS $$
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
		PERFORM war.warehouse_update_all();
		
        --Return true for indicating that tehere has been an update
	 	RETURN true;
		
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
$$;


--
-- Name: warehouse_update_all(); Type: FUNCTION; Schema: war; Owner: -
--

CREATE FUNCTION war.warehouse_update_all() RETURNS void
    LANGUAGE plpgsql
    AS $$
DECLARE
    pk_update bigint;
Begin

  	Insert Into war.update_log (tmsp_update_begin)
			Values (now()::timestamp)
		Returning
			pk_entity Into pk_update;
	
	PERFORM war.nodes_and_edges__update_all();
	PERFORM war.enriched_nodes__enrich();
	PERFORM war.entity_preview__update_all();
		
	Update
		war.update_log
	Set
		tmsp_update_end = clock_timestamp()::timestamp
	Where
		pk_entity = pk_update;

End;
$$;

--
-- Name: edge_fk_project_idx; Type: INDEX; Schema: war; Owner: -
--

CREATE INDEX edge_fk_project_idx ON war.edge USING btree (fk_project);


--
-- Name: edge_fk_source_idx; Type: INDEX; Schema: war; Owner: -
--

CREATE INDEX edge_fk_source_idx ON war.edge USING btree (fk_source);


--
-- Name: edge_fk_target_idx; Type: INDEX; Schema: war; Owner: -
--

CREATE INDEX edge_fk_target_idx ON war.edge USING btree (fk_target);


--
-- Name: edge_priority_of_text_idx; Type: INDEX; Schema: war; Owner: -
--

CREATE INDEX edge_priority_of_text_idx ON war.edge USING btree (ord_num_within_field);


--
-- Name: enriched_node_class_label_idx; Type: INDEX; Schema: war; Owner: -
--

CREATE INDEX enriched_node_class_label_idx ON war.enriched_node USING btree (class_label);


--
-- Name: enriched_node_entity_label_idx; Type: INDEX; Schema: war; Owner: -
--

CREATE INDEX enriched_node_entity_label_idx ON war.enriched_node USING btree (entity_label);


--
-- Name: enriched_node_entity_type_idx; Type: INDEX; Schema: war; Owner: -
--

CREATE INDEX enriched_node_entity_type_idx ON war.enriched_node USING btree (entity_type);


--
-- Name: enriched_node_fk_class_idx; Type: INDEX; Schema: war; Owner: -
--

CREATE INDEX enriched_node_fk_class_idx ON war.enriched_node USING btree (fk_class);


--
-- Name: enriched_node_fk_project_idx; Type: INDEX; Schema: war; Owner: -
--

CREATE INDEX enriched_node_fk_project_idx ON war.enriched_node USING btree (fk_project);


--
-- Name: enriched_node_full_text_idx; Type: INDEX; Schema: war; Owner: -
--

CREATE INDEX enriched_node_full_text_idx ON war.enriched_node USING btree (full_text);


--
-- Name: enriched_node_own_entity_label_idx; Type: INDEX; Schema: war; Owner: -
--

CREATE INDEX enriched_node_own_entity_label_idx ON war.enriched_node USING btree (own_entity_label);


--
-- Name: enriched_node_own_entity_label_idx1; Type: INDEX; Schema: war; Owner: -
--

CREATE INDEX enriched_node_own_entity_label_idx1 ON war.enriched_node USING btree (own_entity_label);


--
-- Name: enriched_node_own_full_text_idx; Type: INDEX; Schema: war; Owner: -
--

CREATE INDEX enriched_node_own_full_text_idx ON war.enriched_node USING btree (own_full_text);


--
-- Name: enriched_node_pk_entity_idx; Type: INDEX; Schema: war; Owner: -
--

CREATE INDEX enriched_node_pk_entity_idx ON war.enriched_node USING btree (pk_entity);


--
-- Name: enriched_node_type_label_idx; Type: INDEX; Schema: war; Owner: -
--

CREATE INDEX enriched_node_type_label_idx ON war.enriched_node USING btree (type_label);


--
-- Name: entity_preview_entity_label_idx; Type: INDEX; Schema: war; Owner: -
--

CREATE INDEX entity_preview_entity_label_idx ON war.entity_preview USING btree (entity_label);


--
-- Name: entity_preview_full_text_idx; Type: INDEX; Schema: war; Owner: -
--

CREATE INDEX entity_preview_full_text_idx ON war.entity_preview USING btree (full_text);


--
-- Name: entity_preview_pk_entity_idx; Type: INDEX; Schema: war; Owner: -
--

CREATE INDEX entity_preview_pk_entity_idx ON war.entity_preview USING btree (pk_entity);


--
-- Name: vm_statement_fk_entity_idx; Type: INDEX; Schema: war; Owner: -
--

CREATE INDEX vm_statement_fk_entity_idx ON war.vm_statement USING btree (fk_entity);


--
-- Name: vm_statement_fk_project_idx; Type: INDEX; Schema: war; Owner: -
--

CREATE INDEX vm_statement_fk_project_idx ON war.vm_statement USING btree (fk_project);


--
-- Name: vm_statement_fk_property_idx; Type: INDEX; Schema: war; Owner: -
--

CREATE INDEX vm_statement_fk_property_idx ON war.vm_statement USING btree (fk_property);


--
-- Name: vm_statement_fk_temporal_entity_idx; Type: INDEX; Schema: war; Owner: -
--

CREATE INDEX vm_statement_fk_temporal_entity_idx ON war.vm_statement USING btree (fk_temporal_entity);


--
-- Name: vm_statement_pk_entity_idx; Type: INDEX; Schema: war; Owner: -
--

CREATE INDEX vm_statement_pk_entity_idx ON war.vm_statement USING btree (pk_entity);


--
-- Name: vm_statement_pk_entity_project_idx; Type: INDEX; Schema: war; Owner: -
--

CREATE UNIQUE INDEX vm_statement_pk_entity_project_idx ON war.vm_statement USING btree (pk_entity, project);


--
-- Name: entity_preview after_insert_on_entity_preview; Type: TRIGGER; Schema: war; Owner: -
--

CREATE TRIGGER after_insert_on_entity_preview AFTER INSERT ON war.entity_preview REFERENCING NEW TABLE AS new_table FOR EACH STATEMENT EXECUTE PROCEDURE war.entity_previews__notify_upsert();


--
-- Name: entity_preview after_update_on_entity_preview; Type: TRIGGER; Schema: war; Owner: -
--

CREATE TRIGGER after_update_on_entity_preview AFTER UPDATE ON war.entity_preview REFERENCING NEW TABLE AS new_table FOR EACH STATEMENT EXECUTE PROCEDURE war.entity_previews__notify_upsert();


--
-- Name: entity_preview last_modification_tmsp; Type: TRIGGER; Schema: war; Owner: -
--

CREATE TRIGGER last_modification_tmsp BEFORE INSERT OR UPDATE ON war.entity_preview FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_last_modification();

/**
* ADD SCHEMA WAR END
**/

-- 2
Drop Trigger after_epr_upsert On projects.info_proj_rel;

Create Trigger after_epr_upsert
    After Insert
    Or Update On projects.info_proj_rel For Each STATEMENT
    Execute Procedure war.after_info_proj_rel_upsert ();

-- 3 Triggers for notifying need for updating class labels
Create Trigger after_api_class_upsert
    After Insert
    Or Update On data_for_history.api_class For Each STATEMENT
    Execute Procedure war.notify__need_to_check_class_labels ();

Create Trigger after_update_or_insert_of_class_label
    After Insert
    Or Update On projects.text_property For Each Row
    When (new.fk_dfh_class Is Not Null)
    Execute Procedure war.notify__need_to_check_class_labels ();


-- 3 create warehouse data
SELECT war.warehouse_update_all();
