Create Or Replace Function war.enriched_nodes__upsert_some (
    param_pk_entities integer[],
    param_fk_project integer
)
    Returns Setof war.enriched_node
    Language 'sql'
    Cost 100 Volatile Rows 1000
    As $BODY$
    With tw1 As (
        -- Create enriched_nodes on the fly
        Select
            *
        From
            war.enriched_nodes__create_some (param_pk_entities,
                param_fk_project)
),
tw2 As (
    -- Select the enriched_nodes that are different in one of the non recursive columns
    Select
        t1.pk_entity,
        t1.fk_project,
        t1.project,
        t1.fk_class,
        t1.class_label,
        t1.entity_type,
        t1.own_full_text,
        t1.own_entity_label,
        t1.time_span,
        t1.first_second,
        t1.last_second
    From
        tw1 t1
    Except
    Select
        t1.pk_entity,
        t1.fk_project,
        t1.project,
        t1.fk_class,
        t1.class_label,
        t1.entity_type,
        t1.own_full_text,
        t1.own_entity_label,
        t1.time_span,
        t1.first_second,
        t1.last_second
    From
        war.enriched_node t1,
        tw1 t2
    Where
        t1.pk_entity = t2.pk_entity
        And t1.fk_project Is Not Distinct From t2.fk_project
),
tw3 As (
    -- Update the enriched_nodes that are different in one of the non recursive columns
    Update
        war.enriched_node t1
    Set
        pk_entity = t2.pk_entity,
        fk_project = t2.fk_project,
        project = t2.project,
        fk_class = t2.fk_class,
        class_label = t2.class_label,
        entity_type = t2.entity_type,
        own_full_text = t2.own_full_text,
        own_entity_label = t2.own_entity_label,
        time_span = t2.time_span,
        first_second = t2.first_second,
        last_second = t2.last_second
    From
        tw2 t2
    Where
        t1.pk_entity = t2.pk_entity
        And t1.fk_project Is Not Distinct From t2.fk_project
    Returning
        t1.*
),
tw4 As (
    -- Insert the created enriched_nodes that do not yet exist
    Insert Into war.enriched_node
    Select
        *
    From
        tw1
    On Conflict
        Do Nothing
    Returning
        *
)
Select
    *
From
    tw3
Union
Select
    *
From
    tw4;

$BODY$;

