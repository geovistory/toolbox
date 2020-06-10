Create Index On warehouse.entity_preview (fk_class);

Create Index On warehouse.entity_preview
Using Hash (first_second);

Create Index On warehouse.entity_preview
Using Hash (last_second);

Create Index On warehouse.entity_preview (fk_project);

Create Index On warehouse.entity_preview (project);

Create Or Replace Function commons.analysis__create_temporal_distribution (
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
        0 y,
        '[]'::json As data,
        x1,
        x2
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
        0 y,
        '[]'::json As data,
        x1,
        x2
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
        y,
        data,
        x1,
        x2
    From
        tw6
    Union All
    -- all other points
    Select
        2,
        x1 x,
        count y,
        data,
        x1,
        x2
    From
        tw5
    Union All
    Select
        1,
        x2 x,
        count y,
        data,
        x1,
        x2
    From
        tw5
    Union All
    -- last point
    Select
        3,
        x,
        y,
        data,
        x1,
        x2
    From
        tw7
    Order By
        x,
        1
)
Select
    jsonb_agg(json_build_object('x', x, 'y', y, 'data', data)) Into res
From
    tw8;
    Return coalesce(res, '[]'::jsonb);
End;
$BODY$;

