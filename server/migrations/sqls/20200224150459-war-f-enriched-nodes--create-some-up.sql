Create Or Replace Function war.enriched_nodes__create_some (
    param_pk_entities integer[],
    param_fk_project integer
)
    Returns Setof war.enriched_node
    Language 'sql'
    Cost 100 Volatile Rows 1000
    As $BODY$
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
            And t1.pk_entity = Any (param_pk_entities)
            And t1.pk_entity = t2.fk_entity
            And t2.fk_project = param_fk_project
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
            And t1.pk_entity = Any (param_pk_entities)
            And t1.pk_entity = t2.fk_entity
            And t2.fk_project = param_fk_project
),
-- select all 'histP11 refers to name' roles
tw5 As (
    Select
        - 10 As field_order,
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
        And t1.fk_temporal_entity = Any (param_pk_entities)
        And t2.fk_entity = t1.pk_entity
        And t2.is_in_project = True
),
-- select all text_properties per project with ord_num
tw6 As (
    Select
        Case t1.fk_class_field
        When 217 Then
            - 10
        When 218 Then
            - 8
        When 219 Then
            - 7
        Else
            Null::int
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
        t1.fk_concerned_entity = Any (param_pk_entities)
        And t2.fk_entity = t1.pk_entity
        And t2.is_in_project = True
),
-- join directly related things and create string
tw7 As (
    Select
        t1.*,
        coalesce(t2.field_order, t7.field_order) As field_order,
        coalesce(t2.is_in_project_count, t7.is_in_project_count) As is_in_project_count,
        coalesce(t2.ord_num_of_range, t7.ord_num_of_text_property) As ord_num,
        regexp_replace(coalesce(t3.string, t7.string), E'[\\n\\r]+', '', 'g') As string
    From
        tw1 t1
        -- join outgoing roles
    Left Join tw5 t2 On t1.fk_project Is Not Distinct From t2.fk_project
        And t2.fk_temporal_entity = t1.pk_entity
        -- join appellation with outgoing roles
    Left Join information.appellation t3 On t2.fk_entity = t3.pk_entity
    -- join text properties
    Left Join tw6 t7 On t1.pk_entity = t7.fk_concerned_entity
        And t1.fk_project Is Not Distinct From t7.fk_project
),
-- own_entity_label per project
tw8 As (
    Select Distinct On (fk_project,
        pk_entity)
        fk_project,
        pk_entity,
        string As own_entity_label,
        field_order As own_entity_label_field_order
    From
        tw7
Where
    string Is Not Null
Order By
    fk_project,
    pk_entity,
    field_order Asc,
    ord_num Asc
),
-- own_full_text per project
tw9 As (
    Select
        fk_project,
        pk_entity,
        string_agg(string, '; ') As own_full_text
    From
        tw7
    Where
        string Is Not Null
    Group By
        fk_project,
        pk_entity
        --ORDER BY field_order, ord_num
),
-- own_entity_label per repo
tw10 As (
    Select Distinct On (pk_entity)
        Null::int As fk_project,
        pk_entity,
        own_entity_label,
        own_entity_label_field_order
    From
        tw8
    Group By
        pk_entity,
        own_entity_label,
        own_entity_label_field_order
    Order By
        pk_entity,
        count(fk_project) Desc
),
-- own_full_text per repo
tw11 As (
    Select
        Null::int As fk_project,
        t1.pk_entity,
        string_agg(t1.string, '; ') As own_full_text
    From (
        Select
            pk_entity,
            string
        From
            tw7
        Where
            string Is Not Null
        Group By
            pk_entity,
            string
        Order By
            count(pk_entity) Desc) As t1
    Group By
        t1.pk_entity
),
-- project variant
tw12 As (
    Select Distinct On (t1.pk_entity,
        t1.fk_project)
        t1.pk_entity,
        t1.fk_class,
        t1.fk_project,
        t1.entity_type,
        t2.own_entity_label,
        t2.own_entity_label_field_order,
        t3.own_full_text
    From
        tw7 t1
    Left Join tw8 t2 On t2.pk_entity = t1.pk_entity
        And t2.fk_project = t1.fk_project
        And t2.fk_project = param_fk_project
    Left Join tw9 t3 On t3.pk_entity = t1.pk_entity
        And t3.fk_project = t1.fk_project
        And t3.fk_project = param_fk_project
),
-- repo variant
tw13 As (
    Select Distinct On (pk_entity)
        t1.pk_entity,
        t1.fk_class,
        Null::integer As fk_project,
        t1.entity_type,
        t2.own_entity_label,
        t2.own_entity_label_field_order,
        t3.own_full_text
    From
        tw1 t1
    Left Join tw10 t2 On t2.pk_entity = t1.pk_entity
    Left Join tw11 t3 On t3.pk_entity = t1.pk_entity
),
tw14 As (
    Select
        t1.pk_entity,
        t1.fk_class,
        t1.fk_project,
        t1.entity_type,
        t1.own_full_text,
        t1.own_entity_label,
        t1.own_entity_label_field_order
    From
        tw12 t1
Union All
Select
    t1.pk_entity,
    t1.fk_class,
    t1.fk_project,
    t1.entity_type,
    t1.own_full_text,
    t1.own_entity_label,
    t1.own_entity_label_field_order
From
    tw13 t1
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
        Join Lateral (
            Select
                j1.pk_entity,
                j1.julian_day,
                j1.duration,
                commons.time_primitive__get_first_second (j1.julian_day) As first_second,
                commons.time_primitive__get_last_second (j1.julian_day, j1.duration, 'gregorian') As last_second_gregorian,
                commons.time_primitive__get_last_second (j1.julian_day, j1.duration, 'julian') As last_second_julian
            From
                information.time_primitive j1
            Where
                j1.pk_entity = t1.fk_entity) t2 On t1.fk_temporal_entity = Any (param_pk_entities)
            And (t1.fk_property = Any (Array[71,
                    72,
                    150,
                    151,
                    152,
                    153]))
            And t2.pk_entity = t1.fk_entity,
            projects.info_proj_rel t3
        Where
            t1.pk_entity = t3.fk_entity
            And t3.is_in_project = True
        Union All ( Select Distinct On (t1.fk_temporal_entity,
                t1.fk_property)
                t1.fk_temporal_entity,
                t1.fk_property,
                Null::integer As fk_project,
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
                Join Lateral (
                    Select
                        j1.pk_entity,
                        j1.julian_day,
                        j1.duration,
                        commons.time_primitive__get_first_second (j1.julian_day) As first_second,
                        commons.time_primitive__get_last_second (j1.julian_day, j1.duration, 'gregorian') As last_second_gregorian,
                        commons.time_primitive__get_last_second (j1.julian_day, j1.duration, 'julian') As last_second_julian
                    From
                        information.time_primitive j1
                    Where
                        j1.pk_entity = t1.fk_entity) t2 On t1.fk_temporal_entity = Any (param_pk_entities)
                    And t1.fk_property = Any (Array[71,
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
        tw16.fk_temporal_entity)
/*
 * time spans and class label added
 **/
Select
    t1.pk_entity,
    t1.fk_project,
    coalesce(t1.fk_project, 0),
t1.fk_class,
t3.label As class_label,
t1.entity_type,
t1.own_entity_label,
t1.own_full_text,
t2.time_span,
t2.first_second,
t2.last_second,
t1.own_entity_label_field_order,
t1.own_entity_label As entity_label,
Null::integer fk_type,
Null::text type_label,
Null::text full_text,
Null::tsvector ts_vector,
Null::timestamp With time zone tmsp_last_modification
From
    tw14 t1
    Left Join tw17 t2 On t1.pk_entity = t2.fk_temporal_entity
        And t1.fk_project Is Not Distinct From t2.fk_project
    Join war.v_class_preview t3 On t1.fk_class = t3.fk_class
        And t1.fk_project Is Not Distinct From t3.fk_project
$BODY$;

