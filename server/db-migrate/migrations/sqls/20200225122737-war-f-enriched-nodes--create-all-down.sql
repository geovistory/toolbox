Create Or Replace Function war.enriched_nodes__create_all ()
    Returns Setof war.enriched_node
    Language 'sql'
    Cost 100 Volatile Rows 1000
    As $BODY$
    Select
        t1.pk_entity,
        t1.fk_project,
        t1.project,
        t1.fk_class,
        t2.label As class_label,
        t1.entity_type,
        t1.own_entity_label,
        t1.own_full_text,
        t1.time_span,
        t1.first_second,
        t1.last_second,
        t1.own_entity_label_field_order,
        t1.own_entity_label As entity_label,
        Null::integer fk_type,
        Null::text type_label,
        Null::text full_text,
        Null::tsvector ts_vector,
        Null::timestamp With time zone tmsp_last_modification
    From
        war.node t1,
        war.v_class_preview t2
    Where
        t1.fk_class = t2.fk_class
        And t1.fk_project Is Not Distinct From t2.fk_project;

$BODY$;

