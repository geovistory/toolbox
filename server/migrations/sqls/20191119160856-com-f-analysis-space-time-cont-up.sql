-- 1
Create Or Replace Function commons.julian_second__to_iso_8601 (
    julian_second bigint
)
    Returns text
    As $$
    Select
        to_char((('J' || (julian_second / 86400)::text)::timestamp + (julian_second % 86400) * interval '1 second'), 'YYYY-MM-DD"T"HH24:MI:SS"Z"')
$$
Language SQL;

-- 2
Create Or Replace Function commons.analysis__time_chart_cont__czml_time_values (
    param_pk_entities integer[],
    param_project integer
)
    Returns jsonb
    Language 'plpgsql'
    Cost 100 Volatile
    As $BODY$
Declare
    res jsonb;
Begin
    With tw0 As (
        -- temporal entities
        Select
            first_second,
            last_second,
            pk_entity
        From
            warehouse.entity_preview
        Where
            pk_entity = Any (param_pk_entities)
            And project = param_project
            And first_second Is Not Null
            And last_second Is Not Null
),
tw1 As (
    Select
        first_second julian_second,
        pk_entity
    From
        tw0
    Union
    Select
        last_second julian_second,
        pk_entity
    From
        tw0
    Order By
        1
),
tw2 As (
    Select Distinct On (julian_second)
        julian_second
    From
        tw1
),
tw3 As (
    Select
        julian_second,
        row_number() Over () pk,
        (row_number() Over () + 1) fk_next
From tw2
),
tw4 As (
    Select
        t1.julian_second x1,
        t2.julian_second x2
    From
        tw3 t1,
        tw3 t2
    Where
        t1.fk_next = t2.pk
),
tw5 As (
    Select
        t1.x1,
        t1.x2,
        -- for czml we need to remove a very little ms here to that the x vals stay unique
        commons.julian_second__to_iso_8601 (t1.x1 + 1) iso_x1,
        commons.julian_second__to_iso_8601 (t1.x2) iso_x2,
        json_strip_nulls (json_agg(t2.pk_entity)) As data,
        count(t2.pk_entity)
    From
        tw4 t1
    Left Join tw0 t2 On t2.first_second < t1.x2
        And t2.last_second > t1.x1
Group By
    t1.x1,
    t1.x2
Order By
    t1.x1
),
tw6 As (
    -- select the very first point
    Select
        x1 x,
        commons.julian_second__to_iso_8601 (x1 - 1) iso_x,
        0 y,
        '[]'::json As data,
        x1,
        x2,
        iso_x1,
        iso_x2
    From
        tw5
    Order By
        x1
    Limit 1
),
tw7 As (
    -- select the very last point
    Select
        x2 x,
        commons.julian_second__to_iso_8601 (x2 + 1) iso_x,
        0 y,
        '[]'::json As data,
        x1,
        x2,
        iso_x1,
        iso_x2
    From
        tw5
    Order By
        x1 Desc
    Limit 1
),
tw8 As (
    -- first point
    Select
        0,
        x,
        iso_x,
        y,
        data,
        x1,
        x2,
        iso_x1,
        iso_x2
    From
        tw6
    Union All
    -- all other points
    Select
        2,
        x1 x,
        iso_x1 iso_x,
        count y,
        data,
        x1,
        x2,
        iso_x1,
        iso_x2
    From
        tw5
    Union All
    Select
        1,
        x2 x,
        iso_x2 iso_x,
        count y,
        data,
        x1,
        x2,
        iso_x1,
        iso_x2
    From
        tw5
    Union All
    -- last point
    Select
        3,
        x,
        iso_x,
        y,
        data,
        x1,
        x2,
        iso_x1,
        iso_x2
    From
        tw7
    Order By
        x,
        1
),
tw9 As (
    Select
        row_number() Over () data_id,
        x,
        iso_x,
        y,
        data,
        x1,
        x2,
        iso_x1,
        iso_x2
    From tw8
)
Select
    json_build_object('data_lookup', coalesce(jsonb_object_agg(tw9.data_id, tw9.data), '[]'::jsonb), 'timeCzmlValues', coalesce(jsonb_agg(json_build_object('iso_x', tw9.iso_x, 'y', tw9.y, 'data_ref', tw9.data_id::text)), '[]'::jsonb), 'timeLinePoints', coalesce(jsonb_agg(json_build_object('x', tw9.x, 'y', tw9.y, 'data_ref', tw9.data_id::text)), '[]'::jsonb)) Into res
From
    tw9;
    Return res;
End;
$BODY$;

