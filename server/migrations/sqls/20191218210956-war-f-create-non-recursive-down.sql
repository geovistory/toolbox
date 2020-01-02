-- 2


CREATE OR REPLACE FUNCTION warehouse.entity_preview_non_recursive__create(
	param_pk_entities integer[])
    RETURNS SETOF warehouse.entity_preview_non_recursive 
    LANGUAGE 'sql'

    COST 100
    VOLATILE 
    ROWS 1000
AS $BODY$
    With
    -- all entities per project with class label
    tw1 As (
        Select
            t1.pk_entity,
            t1.fk_class,
            t2.fk_project,
            'persistent_item'::varchar As table_name,
            t3.class_label
        From
            information.persistent_item t1,
            projects.info_proj_rel t2,
            warehouse.class_preview t3
        Where
            t1.pk_entity = Any (param_pk_entities)
            And t2.is_in_project = True
            And t1.pk_entity = t2.fk_entity
            And t1.fk_class = t3.dfh_pk_class
        Union
        Select
            t1.pk_entity,
            t1.fk_class,
            t2.fk_project,
            'temporal_entity'::varchar As table_name,
            t3.class_label
        From
            information.temporal_entity t1,
            projects.info_proj_rel t2,
            warehouse.class_preview t3
        Where
            t1.pk_entity = Any (param_pk_entities)
            And t2.is_in_project = True
            And t1.pk_entity = t2.fk_entity
            And t1.fk_class = t3.dfh_pk_class
),
-- all entities per project and repo
tw2 As (
    Select
        t1.pk_entity,
        t1.fk_class,
        t1.fk_project,
        t1.table_name,
        t1.class_label
    From
        tw1 t1
    Where
        t1.pk_entity = Any (param_pk_entities)
    Union
    Select Distinct On (pk_entity)
        t1.pk_entity,
        t1.fk_class,
        NULL::integer As fk_project,
        t1.table_name,
        t1.class_label
    From
        tw1 t1
    Where
        t1.pk_entity = Any (param_pk_entities)
),
-- fields
-- TODO: add fk_project for consideration of project-settings
tw3 As (
    Select
        t1.pk_entity,
        t1.ord_num As field_order,
        coalesce(t1.fk_range_class, t1.fk_domain_class, t1.fk_class_for_class_field) fk_class,
        t1.fk_class_for_class_field,
        t1.fk_domain_class,
        t1.fk_range_class,
        t1.fk_property,
        t1.property_is_outgoing,
        t1.fk_class_field,
        -- 		t1.fk_project,
        t2.used_table
    From
        projects.class_field_config t1
    Left Join system.class_field t2 On t2.pk_entity = t1.fk_class_field
Where
    t1.fk_app_context = 45
    And t1.ord_num Is Not Null
Order By
    fk_class,
    t1.ord_num
),
-- explode with all fields: join all entities with their fields
tw4 As (
    --
    Select
        tw2.pk_entity,
        tw2.fk_class,
        tw2.fk_project,
        tw2.table_name,
        tw2.class_label,
        t2.field_order,
        t2.fk_class_field,
        t2.fk_property,
        t2.fk_range_class,
        t2.fk_domain_class,
        t2.property_is_outgoing
    From
        tw2,
        tw3 t2
    Where
        -- TODO: join by fk_project or default for consideration of project-settings
        --AND
        --tw2.fk_project
        tw2.fk_class = t2.fk_class
),
-- select all roles per project with ord_num
tw5 As (
    Select
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
    Where (t1.fk_entity = Any (param_pk_entities)
        Or t1.fk_temporal_entity = Any (param_pk_entities))
    And t2.fk_entity = t1.pk_entity
    And t2.is_in_project = True
Union
Select
    t1.pk_entity,
    t1.fk_entity,
    t1.fk_temporal_entity,
    t1.fk_property,
    NULL::integer As fk_project,
    0 As project,
    NULL::integer As ord_num_of_domain,
    NULL::integer As ord_num_of_range,
    t1.is_in_project_count
From
    information.v_role t1
Where (t1.fk_entity = Any (param_pk_entities)
    Or t1.fk_temporal_entity = Any (param_pk_entities))
And t1.is_in_project_count > 0
),
-- select all text_properties per project with ord_num
tw6 As (
    Select
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
    Union
    Select
        t1.pk_entity,
        t1.fk_concerned_entity,
        t1.fk_language,
        t1.fk_class_field,
        t1.quill_doc,
        t1.string,
        t1.is_in_project_count,
        NULL::integer As fk_project,
        0 As "coalesce",
        NULL::integer As ord_num_of_text_property
    From
        information.v_text_property t1
    Where
        t1.fk_concerned_entity = Any (param_pk_entities)
        And t1.is_in_project_count > 0
),
-- join directly related things and create string
tw7 As (
    Select
        t1.*,
        coalesce(t2.ord_num_of_range, t7.ord_num_of_text_property) As ord_num,
        coalesce(t3.string, t4.notes, t7.string) As string,
        coalesce(t5.pk_entity, t6.pk_entity, t9.pk_entity, t10.pk_entity) As fk_related_entity
    From
        tw4 t1
        -- join outgoing roles
    Left Join tw5 t2 On t1.fk_property = t2.fk_property
        And t1.fk_project Is Not Distinct From t2.fk_project
        And t1.property_is_outgoing = True
        And t2.fk_temporal_entity = t1.pk_entity
        -- join appellation with outgoing roles
    Left Join information.appellation t3 On t2.fk_entity = t3.pk_entity
    -- join language with outgoing roles
    Left Join information.language t4 On t2.fk_entity = t4.pk_entity
    -- join persistent_item with outgoing roles
    Left Join information.persistent_item t5 On t2.fk_entity = t5.pk_entity
    -- join temporal_entity with outgoing roles
    Left Join information.temporal_entity t6 On t2.fk_entity = t6.pk_entity
    -- join text properties
    Left Join tw6 t7 On t1.pk_entity = t7.fk_concerned_entity
        And t1.fk_class_field = t7.fk_class_field
        And t1.fk_project Is Not Distinct From t7.fk_project
        -- join ingoing roles
    Left Join tw5 t8 On t1.fk_property = t8.fk_property
        And t1.fk_project Is Not Distinct From t8.fk_project
        And t1.property_is_outgoing = False
        And t8.fk_entity = t1.pk_entity
        -- join persistent_item with ingoing roles
    Left Join information.persistent_item t9 On t8.fk_temporal_entity = t9.pk_entity
    -- join temporal_entity with ingoing roles
    Left Join information.temporal_entity t10 On t8.fk_temporal_entity = t10.pk_entity
),
-- group for ordered array of strings
tw8 As (
    Select
        pk_entity,
        fk_class,
        fk_project,
        table_name,
        class_label,
        array_agg(string Order By t1.field_order Asc, t1.ord_num Asc) string_array
    From
        tw7 t1
    Group By
        pk_entity,
        fk_class,
        fk_project,
        table_name,
        class_label
),
-- select roles with time primitive, first and last second
tw9 As (
    Select
        t1.fk_temporal_entity,
        t1.fk_property,
        t2.fk_project,
        t2.calendar,
        t3.julian_day,
        t3.duration,
        commons.time_primitive__get_first_second (t3.julian_day) As first_second,
        commons.time_primitive__get_last_second (t3.julian_day, t3.duration, t2.calendar) As last_second
    From
        information.role t1,
        projects.info_proj_rel t2,
        information.v_time_primitive t3
    Where
        t1.fk_temporal_entity = Any (param_pk_entities)
        And t1.pk_entity = t2.fk_entity
        And (t1.fk_property = Any (Array[71,
                72,
                150,
                151,
                152,
                153]))
        And t3.pk_entity = t1.fk_entity
        And t2.is_in_project = True
    Union ( Select Distinct On (t1.fk_temporal_entity,
            t1.fk_property)
            t1.fk_temporal_entity,
            t1.fk_property,
            NULL::integer As fk_project,
            t1.community_favorite_calendar,
            t3.julian_day,
            t3.duration,
            commons.time_primitive__get_first_second (t3.julian_day) As first_second,
            commons.time_primitive__get_last_second (t3.julian_day, t3.duration, t1.community_favorite_calendar) As last_second
        From
            information.v_role t1
            Join information.v_time_primitive t3 On t3.pk_entity = t1.fk_entity
        Where
            t1.fk_temporal_entity = Any (param_pk_entities)
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
tw10 As (
    Select
        tw9.fk_project,
        tw9.fk_temporal_entity,
        min(tw9.first_second) first_second,
        max(tw9.last_second) last_second,
        jsonb_object_agg(
            Case When tw9.fk_property = 71 Then
                'p81'::text
            When tw9.fk_property = 72 Then
                'p82'::text
            When tw9.fk_property = 150 Then
                'p81a'::text
            When tw9.fk_property = 151 Then
                'p81b'::text
            When tw9.fk_property = 152 Then
                'p82a'::text
            When tw9.fk_property = 153 Then
                'p82b'::text
            Else
                tw9.fk_property::text
            End, json_build_object('julianDay', tw9.julian_day, 'duration', tw9.duration, 'calendar', tw9.calendar)) As time_span
    From
        tw9
    Group By
        tw9.fk_project,
        tw9.fk_temporal_entity
),
tw11 As (
    Select
        t1.pk_entity,
        t1.fk_class,
        t1.fk_project,
        t1.table_name,
        t1.class_label,
        array_to_string(t1.string_array, '; ') own_full_text,
        t1.string_array[1] own_entity_label,
        t2.time_span,
        t2.first_second,
        t2.last_second
    From
        tw8 t1
    Left Join tw10 t2 On t1.pk_entity = t2.fk_temporal_entity
        And t1.fk_project Is Not Distinct From t2.fk_project
),
-- group related things and create object with fk_related_entities
tw12 As (
    Select
        t1.pk_entity,
        t1.fk_project,
        jsonb_object_agg(t1.fk_related_entity::text, NULL::unknown) As related_full_texts,
        array_agg(t1.fk_related_entity Order By t1.field_order Asc, t1.ord_num Asc) As fk_entity_labels
    From
        tw7 t1
Where
    t1.fk_related_entity Is Not Null
Group By
    pk_entity,
    fk_class,
    fk_project,
    table_name,
    class_label
),
-- join fk_entity_label and related_full_texts
tw13 As (
    Select
        t1.pk_entity,
        t1.fk_class,
        t1.fk_project,
        t1.table_name,
        t1.class_label,
        t1.own_full_text,
        t1.own_entity_label,
        t1.time_span,
        t1.first_second,
        t1.last_second,
        t2.related_full_texts,
        Case When t1.own_entity_label Is Not Null Then
            NULL::integer
        Else
            t2.fk_entity_labels[1]
        End As fk_entity_label
    From
        tw11 t1
    Left Join tw12 t2 On t1.pk_entity = t2.pk_entity
        And t1.fk_project Is Not Distinct From t2.fk_project
),
-- select all entity associations per project with ord_num
tw14 As (
    Select Distinct
        t1.pk_entity,
        t1.fk_info_domain,
        t1.fk_info_range,
        t1.fk_data_domain,
        t1.fk_data_range,
        t1.fk_property,
        t2.fk_project,
        coalesce(t2.fk_project, 0) As project,
        t1.is_in_project_count
    From
        information.v_entity_association t1,
        projects.info_proj_rel t2
Where (t1.fk_info_domain = Any (param_pk_entities)
    Or t1.fk_info_range = Any (param_pk_entities))
And t2.fk_entity = t1.pk_entity
And t2.is_in_project = True
Union
Select Distinct
    t1.pk_entity,
    t1.fk_info_domain,
    t1.fk_info_range,
    t1.fk_data_domain,
    t1.fk_data_range,
    t1.fk_property,
    NULL::integer As fk_project,
    0 As project,
    t1.is_in_project_count
From
    information.v_entity_association t1
Where (t1.fk_info_domain = Any (param_pk_entities)
    Or t1.fk_info_range = Any (param_pk_entities))
And t1.is_in_project_count > 0
),
-- get type entity_associations (DEPRECATED)
tw15 As (
    Select Distinct On (t1.fk_project,
        t1.fk_property,
        t1.fk_info_domain)
        t1.fk_project,
        t1.fk_property,
        t1.fk_info_domain,
        t1.fk_info_range,
        t1.is_in_project_count
    From
        tw14 t1,
        system.class_has_type_property t2
    Where (t1.fk_info_domain = Any (param_pk_entities)
        Or t1.fk_info_range = Any (param_pk_entities))
    And t1.fk_project Is Null
    And t1.fk_property = t2.fk_property
Union
Select
    t3.fk_project,
    t3.fk_property,
    t3.fk_info_domain,
    t3.fk_info_range,
    t3.is_in_project_count
From
    tw14 t3,
    system.class_has_type_property t4
Where (t3.fk_info_domain = Any (param_pk_entities)
    Or t3.fk_info_range = Any (param_pk_entities))
And t3.fk_project Is Not Null
And t3.fk_property = t4.fk_property
Order By
    1,
    2,
    3,
    5 Desc
),
-- join fk_type
tw16 As (
    Select
        t1.pk_entity,
        t1.fk_class,
        t1.fk_project,
        t1.table_name,
        t1.class_label,
        t1.own_full_text,
        t1.own_entity_label,
        t1.time_span,
        t1.related_full_texts,
        t1.fk_entity_label,
        t2.fk_info_range As fk_type,
        t1.first_second,
        t1.last_second
    From
        tw13 t1
    Left Join tw15 t2 On t1.pk_entity = t2.fk_info_domain
        And t1.fk_project Is Not Distinct From t2.fk_project
)
Select
    *
From
    tw16;

$BODY$;


-- 1

CREATE OR REPLACE FUNCTION warehouse.entity_preview_non_recursive__create_all(
	)
    RETURNS SETOF warehouse.entity_preview_non_recursive 
    LANGUAGE 'sql'

    COST 100
    VOLATILE 
    ROWS 1000
AS $BODY$
    -- 1
    With
    -- all entities per project with class label
    tw1 As (
        Select
            t1.pk_entity,
            t1.fk_class,
            t2.fk_project,
            'persistent_item'::varchar As table_name,
            t3.class_label
        From
            information.persistent_item t1,
            projects.info_proj_rel t2,
            warehouse.class_preview t3
        Where
            t2.is_in_project = True
            And t1.pk_entity = t2.fk_entity
            And t1.fk_class = t3.dfh_pk_class
        Union
        Select
            t1.pk_entity,
            t1.fk_class,
            t2.fk_project,
            'temporal_entity'::varchar As table_name,
            t3.class_label
        From
            information.temporal_entity t1,
            projects.info_proj_rel t2,
            warehouse.class_preview t3
        Where
            t2.is_in_project = True
            And t1.pk_entity = t2.fk_entity
            And t1.fk_class = t3.dfh_pk_class
),
-- all entities per project and repo
tw2 As (
    Select
        t1.pk_entity,
        t1.fk_class,
        t1.fk_project,
        t1.table_name,
        t1.class_label
    From
        tw1 t1
    Union
    Select Distinct On (pk_entity)
        t1.pk_entity,
        t1.fk_class,
        NULL::integer As fk_project,
        t1.table_name,
        t1.class_label
    From
        tw1 t1
),
-- fields
-- TODO: add fk_project for consideration of project-settings
tw3 As (
    Select
        t1.pk_entity,
        t1.ord_num As field_order,
        coalesce(t1.fk_range_class, t1.fk_domain_class, t1.fk_class_for_class_field) fk_class,
        t1.fk_class_for_class_field,
        t1.fk_domain_class,
        t1.fk_range_class,
        t1.fk_property,
        t1.property_is_outgoing,
        t1.fk_class_field,
        -- 		t1.fk_project,
        t2.used_table
    From
        projects.class_field_config t1
    Left Join system.class_field t2 On t2.pk_entity = t1.fk_class_field
Where
    t1.fk_app_context = 45
    And t1.ord_num Is Not Null
Order By
    fk_class,
    t1.ord_num
),
-- explode with all fields: join all entities with their fields
tw4 As (
    Select
        tw2.pk_entity,
        tw2.fk_class,
        tw2.fk_project,
        tw2.table_name,
        tw2.class_label,
        t2.field_order,
        t2.fk_class_field,
        t2.fk_property,
        t2.fk_range_class,
        t2.fk_domain_class,
        t2.property_is_outgoing
    From
        tw2,
        tw3 t2
    Where
        -- TODO: join by fk_project or default for consideration of project-settings
        --AND
        --tw2.fk_project
        tw2.fk_class = t2.fk_class
),
-- select all roles per project with ord_num
tw5 As (
    Select
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
        t2.fk_entity = t1.pk_entity
        And t2.is_in_project = True
    Union
    Select
        t1.pk_entity,
        t1.fk_entity,
        t1.fk_temporal_entity,
        t1.fk_property,
        NULL::integer As fk_project,
        0 As project,
        NULL::integer As ord_num_of_domain,
        NULL::integer As ord_num_of_range,
        t1.is_in_project_count
    From
        information.v_role t1
    Where
        t1.is_in_project_count > 0
),
-- select all text_properties per project with ord_num
tw6 As (
    Select
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
    Union
    Select
        t1.pk_entity,
        t1.fk_concerned_entity,
        t1.fk_language,
        t1.fk_class_field,
        t1.quill_doc,
        t1.string,
        t1.is_in_project_count,
        NULL::integer As fk_project,
        0 As "coalesce",
        NULL::integer As ord_num_of_text_property
    From
        information.v_text_property t1
    Where
        t1.is_in_project_count > 0
),
-- join directly related things and create string
tw7 As (
    Select
        t1.*,
        coalesce(t2.ord_num_of_range, t7.ord_num_of_text_property) As ord_num,
        coalesce(t3.string, t4.notes, t7.string) As string,
        coalesce(t5.pk_entity, t6.pk_entity, t9.pk_entity, t10.pk_entity) As fk_related_entity
    From
        tw4 t1
        -- join outgoing roles
    Left Join tw5 t2 On t1.fk_property = t2.fk_property
        And t1.fk_project Is Not Distinct From t2.fk_project
        And t1.property_is_outgoing = True
        And t2.fk_temporal_entity = t1.pk_entity
        -- join appellation with outgoing roles
    Left Join information.appellation t3 On t2.fk_entity = t3.pk_entity
    -- join language with outgoing roles
    Left Join information.language t4 On t2.fk_entity = t4.pk_entity
    -- join persistent_item with outgoing roles
    Left Join information.persistent_item t5 On t2.fk_entity = t5.pk_entity
    -- join temporal_entity with outgoing roles
    Left Join information.temporal_entity t6 On t2.fk_entity = t6.pk_entity
    -- join text properties
    Left Join tw6 t7 On t1.pk_entity = t7.fk_concerned_entity
        And t1.fk_class_field = t7.fk_class_field
        And t1.fk_project Is Not Distinct From t7.fk_project
        -- join ingoing roles
    Left Join tw5 t8 On t1.fk_property = t8.fk_property
        And t1.fk_project Is Not Distinct From t8.fk_project
        And t1.property_is_outgoing = False
        And t8.fk_entity = t1.pk_entity
        -- join persistent_item with ingoing roles
    Left Join information.persistent_item t9 On t8.fk_temporal_entity = t9.pk_entity
    -- join temporal_entity with ingoing roles
    Left Join information.temporal_entity t10 On t8.fk_temporal_entity = t10.pk_entity
),
-- group for ordered array of strings
tw8 As (
    Select
        pk_entity,
        fk_class,
        fk_project,
        table_name,
        class_label,
        array_agg(string Order By t1.field_order Asc, t1.ord_num Asc) string_array
    From
        tw7 t1
    Group By
        pk_entity,
        fk_class,
        fk_project,
        table_name,
        class_label
),
tw9 As (
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
tw10 As (
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
        tw9 t2,
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
    Union ( Select Distinct On (t1.fk_temporal_entity,
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
            Join tw9 t2 On t2.pk_entity = t1.fk_entity
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
tw11 As (
    Select
        tw10.fk_project,
        tw10.fk_temporal_entity,
        min(tw10.first_second) first_second,
        max(tw10.last_second) last_second,
        jsonb_object_agg(
            Case When tw10.fk_property = 71 Then
                'p81'::text
            When tw10.fk_property = 72 Then
                'p82'::text
            When tw10.fk_property = 150 Then
                'p81a'::text
            When tw10.fk_property = 151 Then
                'p81b'::text
            When tw10.fk_property = 152 Then
                'p82a'::text
            When tw10.fk_property = 153 Then
                'p82b'::text
            Else
                tw10.fk_property::text
            End, json_build_object('julianDay', tw10.julian_day, 'duration', tw10.duration, 'calendar', tw10.calendar)) As time_span
    From
        tw10
    Group By
        tw10.fk_project,
        tw10.fk_temporal_entity
),
tw12 As (
    Select
        t1.pk_entity,
        t1.fk_class,
        t1.fk_project,
        t1.table_name,
        t1.class_label,
        array_to_string(t1.string_array, ', ') own_full_text,
        t1.string_array[1] own_entity_label,
        t2.time_span,
        t2.first_second,
        t2.last_second
    From
        tw8 t1
    Left Join tw11 t2 On t1.pk_entity = t2.fk_temporal_entity
        And t1.fk_project Is Not Distinct From t2.fk_project
),
-- group related things and create object with fk_related_entities
tw13 As (
    Select
        t1.pk_entity,
        t1.fk_project,
        jsonb_object_agg(t1.fk_related_entity::text, NULL::unknown) As related_full_texts,
        array_agg(t1.fk_related_entity Order By t1.field_order Asc, t1.ord_num Asc) As fk_entity_labels
    From
        tw7 t1
Where
    t1.fk_related_entity Is Not Null
Group By
    pk_entity,
    fk_class,
    fk_project,
    table_name,
    class_label
),
-- join fk_entity_label and related_full_texts
tw14 As (
    Select
        t1.pk_entity,
        t1.fk_class,
        t1.fk_project,
        t1.table_name,
        t1.class_label,
        t1.own_full_text,
        t1.own_entity_label,
        t1.time_span,
        t1.first_second,
        t1.last_second,
        t2.related_full_texts,
        Case When t1.own_entity_label Is Not Null Then
            NULL::integer
        Else
            t2.fk_entity_labels[1]
        End As fk_entity_label
    From
        tw12 t1
    Left Join tw13 t2 On t1.pk_entity = t2.pk_entity
        And t1.fk_project Is Not Distinct From t2.fk_project
),
-- select all entity associations per project with ord_num
tw15 As (
    Select Distinct
        t1.pk_entity,
        t1.fk_info_domain,
        t1.fk_info_range,
        t1.fk_data_domain,
        t1.fk_data_range,
        t1.fk_property,
        t2.fk_project,
        coalesce(t2.fk_project, 0) As project,
        t1.is_in_project_count
    From
        information.v_entity_association t1,
        projects.info_proj_rel t2
Where
    t2.fk_entity = t1.pk_entity
    And t2.is_in_project = True
Union
Select Distinct
    t1.pk_entity,
    t1.fk_info_domain,
    t1.fk_info_range,
    t1.fk_data_domain,
    t1.fk_data_range,
    t1.fk_property,
    NULL::integer As fk_project,
    0 As project,
    t1.is_in_project_count
From
    information.v_entity_association t1
Where
    t1.is_in_project_count > 0
),
-- get type entity_associations (DEPRECATED)
tw16 As (
    Select Distinct On (t1.fk_project,
        t1.fk_property,
        t1.fk_info_domain)
        t1.fk_project,
        t1.fk_property,
        t1.fk_info_domain,
        t1.fk_info_range,
        t1.is_in_project_count
    From
        tw15 t1,
        system.class_has_type_property t2
    Where
        t1.fk_project Is Null
        And t1.fk_property = t2.fk_property
    Union
    Select
        t3.fk_project,
        t3.fk_property,
        t3.fk_info_domain,
        t3.fk_info_range,
        t3.is_in_project_count
    From
        tw15 t3,
        system.class_has_type_property t4
    Where
        t3.fk_project Is Not Null
        And t3.fk_property = t4.fk_property
    Order By
        1,
        2,
        3,
        5 Desc
),
-- join fk_type
tw17 As (
    Select
        t1.pk_entity,
        t1.fk_class,
        t1.fk_project,
        t1.table_name,
        t1.class_label,
        t1.own_full_text,
        t1.own_entity_label,
        t1.time_span,
        t1.related_full_texts,
        t1.fk_entity_label,
        t2.fk_info_range As fk_type,
        t1.first_second,
        t1.last_second
    From
        tw14 t1
    Left Join tw16 t2 On t1.pk_entity = t2.fk_info_domain
        And t1.fk_project Is Not Distinct From t2.fk_project
)
Select
    *
From
    tw17;

$BODY$;