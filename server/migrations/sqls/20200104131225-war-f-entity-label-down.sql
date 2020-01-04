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