
CREATE TABLE war.enriched_node
(
    pk_entity integer,
    fk_project integer,
    project integer,
    fk_class integer,
    class_label character varying COLLATE pg_catalog."default",
    entity_type text COLLATE pg_catalog."default",
    own_entity_label text COLLATE pg_catalog."default",
    own_full_text text COLLATE pg_catalog."default",
    time_span jsonb,
    first_second bigint,
    last_second bigint,
    own_entity_label_field_order integer,
    entity_label text COLLATE pg_catalog."default",
    fk_type integer,
    type_label text COLLATE pg_catalog."default",
    full_text text COLLATE pg_catalog."default",
    ts_vector tsvector,
    tmsp_last_modification timestamp with time zone,
    CONSTRAINT enriched_node_unique UNIQUE (pk_entity, project)
);



CREATE OR REPLACE FUNCTION war.enriched_nodes__create_all(
	)
    RETURNS SETOF war.enriched_node
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
-- select all 'histP11 refers to name' statements
tw5 As (
    Select
        - 10 As field_order,
        t1.pk_entity,
        t1.fk_object_info,
        t1.fk_subject_info,
        t1.fk_property,
        t2.fk_project,
        coalesce(t2.fk_project, 0) As project,
        t2.ord_num_of_domain,
        t2.ord_num_of_range,
        t1.is_in_project_count
    From
        information.v_statement t1,
        projects.info_proj_rel t2
    Where
        t1.fk_property = 1113
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
        t2.fk_entity = t1.pk_entity
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
    tw2 t1
    -- join outgoing statements
    Left Join tw5 t2 On t1.fk_project Is Not Distinct From t2.fk_project
        And t2.fk_subject_info = t1.pk_entity
        -- join appellation with outgoing statements
    Left Join information.appellation t3 On t2.fk_object_info = t3.pk_entity
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
        Left Join tw9 t3 On t3.pk_entity = t1.pk_entity
            And t3.fk_project = t1.fk_project
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
-- select statements with time primitive, first and last second
tw16 As (
    Select
        t1.fk_subject_info,
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
        information.statement t1,
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
        And t2.pk_entity = t1.fk_object_info
        And t3.is_in_project = True
    Union All ( Select Distinct On (t1.fk_subject_info,
            t1.fk_property)
            t1.fk_subject_info,
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
            information.v_statement t1
            Join tw15 t2 On t2.pk_entity = t1.fk_object_info
        Where
            t1.fk_property = Any (Array[71,
                72,
                150,
                151,
                152,
                153])
            And t1.is_in_project_count > 0
        Order By
            t1.fk_subject_info,
            t1.fk_property,
            t1.is_in_project_count Desc,
            t1.tmsp_creation Desc)
),
-- create time spans, first_second and last_second
tw17 As (
    Select
        tw16.fk_project,
        tw16.fk_subject_info,
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
    tw16.fk_subject_info)
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
    Left Join tw17 t2 On t1.pk_entity = t2.fk_subject_info
        And t1.fk_project Is Not Distinct From t2.fk_project
    Join war.v_class_preview t3 On t1.fk_class = t3.fk_class
        And t1.fk_project Is Not Distinct From t3.fk_project
$BODY$;


CREATE OR REPLACE FUNCTION war.enriched_nodes__create_some(
	param_pk_entities integer[],
	param_fk_project integer)
    RETURNS SETOF war.enriched_node
    LANGUAGE 'sql'

    COST 100
    VOLATILE
    ROWS 1000

AS $BODY$
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
-- select all 'histP11 refers to name' statements
tw5 As (
    Select
        - 10 As field_order,
        t1.pk_entity,
        t1.fk_object_info,
        t1.fk_subject_info,
        t1.fk_property,
        t2.fk_project,
        coalesce(t2.fk_project, 0) As project,
    t2.ord_num_of_domain,
    t2.ord_num_of_range,
    t1.is_in_project_count
From
    information.v_statement t1,
    projects.info_proj_rel t2
    Where
        t1.fk_property = 1113
        And t1.fk_subject_info = Any (param_pk_entities)
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
    -- join outgoing statements
    Left Join tw5 t2 On t1.fk_project Is Not Distinct From t2.fk_project
        And t2.fk_subject_info = t1.pk_entity
        -- join appellation with outgoing statements
    Left Join information.appellation t3 On t2.fk_object_info = t3.pk_entity
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
-- select statements with time primitive, first and last second
tw16 As (
    Select
        t1.fk_subject_info,
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
        information.statement t1
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
        j1.pk_entity = t1.fk_object_info) t2 On t1.fk_subject_info = Any (param_pk_entities)
    And (t1.fk_property = Any (Array[71,
            72,
            150,
            151,
            152,
            153]))
    And t2.pk_entity = t1.fk_object_info,
    projects.info_proj_rel t3
    Where
        t1.pk_entity = t3.fk_entity
        And t3.is_in_project = True
    Union All ( Select Distinct On (t1.fk_subject_info,
            t1.fk_property)
            t1.fk_subject_info,
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
            information.v_statement t1
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
                j1.pk_entity = t1.fk_object_info) t2 On t1.fk_subject_info = Any (param_pk_entities)
            And t1.fk_property = Any (Array[71,
                72,
                150,
                151,
                152,
                153])
            And t1.is_in_project_count > 0
        Order By
            t1.fk_subject_info,
            t1.fk_property,
            t1.is_in_project_count Desc,
            t1.tmsp_creation Desc)
),
-- create time spans, first_second and last_second
tw17 As (
    Select
        tw16.fk_project,
        tw16.fk_subject_info,
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
        tw16.fk_subject_info)
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
    Left Join tw17 t2 On t1.pk_entity = t2.fk_subject_info
        And t1.fk_project Is Not Distinct From t2.fk_project
    Join war.v_class_preview t3 On t1.fk_class = t3.fk_class
        And t1.fk_project Is Not Distinct From t3.fk_project
$BODY$;


CREATE OR REPLACE FUNCTION war.enriched_nodes__enrich(
	)
    RETURNS void
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE

AS $BODY$
BEGIN

 perform war.enriched_nodes__enrich_entity_label();
 perform war.enriched_nodes__enrich_full_text();
 perform war.enriched_nodes__enrich_type_label();

END;
$BODY$;

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
        With tw0 As (
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
                When t1.fk_class = 365 Then
                    t1.own_entity_label
                When t1.fk_project Is Not Null Then
                    Case When t2.target_field_overrides_own_label = False Then
                        t1.own_entity_label
                    Else
                        t2.entity_label
                    End
                Else
                    Case When t4.target_field_overrides_own_label = False Then
                        t1.own_entity_label
                    Else
                        t4.entity_label
                    End
                End entity_label
            From
                war.enriched_node t1
                -- JOIN the project variants (here the ord_num in field is important)
            Left Join Lateral ( Select Distinct On (t1.pk_entity)
                    t3.pk_entity,
                    t3.entity_label,
                    t2.field_order,
                    t2.ord_num_within_field,
                    (t1.own_entity_label_field_order Is Null
                            Or t1.own_entity_label_field_order > coalesce(t2.field_order, 10000)) target_field_overrides_own_label
                    From
                        war.edge t2
                Left Join Lateral ( Select Distinct On (t6.pk_entity)
                        t6.entity_label,
                        t6.pk_entity,
                        t6.fk_project
                    From (
                        Select
                            t3.entity_label,
                            t3.pk_entity,
                            t3.fk_project
                        From
                            war.enriched_node t3
                        Where
                            t2.fk_target = t3.pk_entity
                            And t2.fk_project = t3.fk_project
                            And t3.entity_label Is Not Null
                        Union All
                        Select
                            t3.entity_label,
                            t3.pk_entity,
                            t3.fk_project
                        From
                            war.enriched_node t3
                        Where
                            t2.fk_target = t3.pk_entity
                            And t3.fk_project Is Null
                            And t3.entity_label Is Not Null) t6) t3 On True
                Where
                    t1.pk_entity = t2.fk_source
                    And t1.fk_project = t2.fk_project -- '=' (sic!)
                Order By
                    t1.pk_entity,
                    t2.field_order,
                    t2.ord_num_within_field Asc) t2 On True
                -- JOIN the repo variants (here the frequency of entity_label is relevant)
            Left Join Lateral (
                Select
                    count(t5.pk_entity),
                    t5.entity_label,
                    t4.field_order,
                    (t1.own_entity_label_field_order Is Null
                            Or t1.own_entity_label_field_order > coalesce(t4.field_order, 10000)) target_field_overrides_own_label
                    From
                        war.edge t4
                Left Join Lateral (
                    Select
                        *
                    From
                        war.enriched_node t5
                    Where
                        t4.fk_target = t5.pk_entity
                        And t5.fk_project Is Null
                        And t5.entity_label Is Not Null) t5 On True
                Where
                    t1.pk_entity = t4.fk_source
                    And t1.fk_project Is Null
                    And t4.fk_project Is Null
                Group By
                    t5.entity_label,
                    t4.field_order
                Order By
                    t4.field_order,
                    count(t5.pk_entity)
                    Desc
                Limit 1) t4 On True
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

CREATE OR REPLACE FUNCTION war.enriched_nodes__enrich_full_text(
	)
    RETURNS boolean
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE

AS $BODY$
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
$BODY$;


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
tw2 As (
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
        When t1.fk_class = 365 Then
            t1.own_entity_label
        When t1.fk_project Is Not Null Then
            Case When t2.target_field_overrides_own_label = False Then
                t1.own_entity_label
            Else
                t2.entity_label
            End
        Else
            Case When t4.target_field_overrides_own_label = False Then
                t1.own_entity_label
            Else
                t4.entity_label
            End
        End entity_label
    From
        tw1 t1
        -- JOIN the project variants (here the ord_num in field is important)
    Left Join Lateral ( Select Distinct On (t1.pk_entity)
            t3.pk_entity,
            t3.entity_label,
            t2.field_order,
            t2.ord_num_within_field,
            (t1.own_entity_label_field_order Is Null
                    Or t1.own_entity_label_field_order > coalesce(t2.field_order, 10000)) target_field_overrides_own_label
            From
                war.edge t2
        Left Join Lateral ( Select Distinct On (t6.pk_entity)
                t6.entity_label,
                t6.pk_entity,
                t6.fk_project
            From (
                Select
                    t3.entity_label,
                    t3.pk_entity,
                    t3.fk_project
                From
                    war.enriched_node t3
                Where
                    t2.fk_target = t3.pk_entity
                    And t2.fk_project = t3.fk_project
                    And t3.entity_label Is Not Null
                Union All
                Select
                    t3.entity_label,
                    t3.pk_entity,
                    t3.fk_project
                From
                    war.enriched_node t3
                Where
                    t2.fk_target = t3.pk_entity
                    And t3.fk_project Is Null
                    And t3.entity_label Is Not Null) t6) t3 On True
        Where
            t1.pk_entity = t2.fk_source
            And t1.fk_project = t2.fk_project -- '=' (sic!)
        Order By
            t1.pk_entity,
            t2.field_order,
            t2.ord_num_within_field Asc) t2 On True
        -- JOIN the repo variants (here the frequency of entity_label is relevant)
    Left Join Lateral (
        Select
            count(t5.pk_entity),
            t5.entity_label,
            t4.field_order,
            (t1.own_entity_label_field_order Is Null
                    Or t1.own_entity_label_field_order > coalesce(t4.field_order, 10000)) target_field_overrides_own_label
            From
                war.edge t4
        Left Join Lateral (
            Select
                *
            From
                war.enriched_node t5
            Where
                t4.fk_target = t5.pk_entity
                And t5.fk_project Is Null
                And t5.entity_label Is Not Null) t5 On True
        Where
            t1.pk_entity = t4.fk_source
            And t1.fk_project Is Null
            And t4.fk_project Is Null
        Group By
            t5.entity_label,
            t4.field_order
        Order By
            t4.field_order,
            count(t5.pk_entity)
            Desc
        Limit 1) t4 On True
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

CREATE OR REPLACE FUNCTION war.enriched_nodes__enrich_type_label(
	)
    RETURNS void
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE

AS $BODY$
DECLARE
	needs_update boolean;
BEGIN
  needs_update = true;

  ---------- type label completion ------------
  WHILE ( needs_update = true)
  LOOP
      -- fill type label
	  	WITH tw0 AS (
		 SELECT t1.pk_entity, t1.fk_project, t3.entity_label type_label, t3.pk_entity fk_type
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
			   j2.entity_label, j2.pk_entity--, j2.fk_project
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
		  (
        t1.type_label IS DISTINCT FROM t3.entity_label
        OR
        t1.fk_type IS DISTINCT FROM t3.pk_entity
      )

		),
	  	 tw1 AS (
			UPDATE
			  war.enriched_node t1
			SET
			  type_label = t2.type_label,
        fk_type = t2.fk_type
			FROM
			 tw0 t2
			 WHERE t1.pk_entity = t2.pk_entity
			 AND t1.fk_project IS NOT DISTINCT FROM t2.fk_project
			 RETURNING t1.*, t2.type_label
		)
			SELECT count(*) > 0 into needs_update
			FROM tw1;
    END LOOP;

END;
$BODY$;


CREATE OR REPLACE FUNCTION war.enriched_nodes__upsert_some(
	param_pk_entities integer[],
	param_fk_project integer)
    RETURNS SETOF war.enriched_node
    LANGUAGE 'sql'

    COST 100
    VOLATILE
    ROWS 1000

AS $BODY$
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

-- Index: enriched_node_class_label_idx

-- DROP INDEX war.enriched_node_class_label_idx;

CREATE INDEX enriched_node_class_label_idx
    ON war.enriched_node USING btree
    (class_label COLLATE pg_catalog."default" ASC NULLS LAST);


-- Index: enriched_node_entity_label_idx

-- DROP INDEX war.enriched_node_entity_label_idx;

CREATE INDEX enriched_node_entity_label_idx
    ON war.enriched_node USING btree
    (entity_label COLLATE pg_catalog."default" ASC NULLS LAST);


-- Index: enriched_node_entity_type_idx

-- DROP INDEX war.enriched_node_entity_type_idx;

CREATE INDEX enriched_node_entity_type_idx
    ON war.enriched_node USING btree
    (entity_type COLLATE pg_catalog."default" ASC NULLS LAST);


-- Index: enriched_node_fk_class_idx

-- DROP INDEX war.enriched_node_fk_class_idx;

CREATE INDEX enriched_node_fk_class_idx
    ON war.enriched_node USING btree
    (fk_class ASC NULLS LAST);


-- Index: enriched_node_fk_project_idx

-- DROP INDEX war.enriched_node_fk_project_idx;

CREATE INDEX enriched_node_fk_project_idx
    ON war.enriched_node USING btree
    (fk_project ASC NULLS LAST);


-- Index: enriched_node_fk_type_idx

-- DROP INDEX war.enriched_node_fk_type_idx;

CREATE INDEX enriched_node_fk_type_idx
    ON war.enriched_node USING btree
    (fk_type ASC NULLS LAST);


-- Index: enriched_node_pk_entity_idx

-- DROP INDEX war.enriched_node_pk_entity_idx;

CREATE INDEX enriched_node_pk_entity_idx
    ON war.enriched_node USING btree
    (pk_entity ASC NULLS LAST);


-- Index: enriched_node_type_label_idx

-- DROP INDEX war.enriched_node_type_label_idx;

CREATE INDEX enriched_node_type_label_idx
    ON war.enriched_node USING btree
    (type_label COLLATE pg_catalog."default" ASC NULLS LAST);


-- Trigger: last_modification_tmsp

-- DROP TRIGGER last_modification_tmsp ON war.enriched_node;

CREATE TRIGGER last_modification_tmsp
    BEFORE INSERT OR UPDATE
    ON war.enriched_node
    FOR EACH ROW
    EXECUTE PROCEDURE commons.tmsp_last_modification();
