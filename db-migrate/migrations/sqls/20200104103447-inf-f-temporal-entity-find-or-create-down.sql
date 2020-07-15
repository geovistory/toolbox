Create Or Replace Function information.temporal_entity_find_or_create (
    param_fk_class integer,
    param_roles jsonb
)
    Returns information.temporal_entity
    Language 'plpgsql'
    Cost 100 Volatile
    As $BODY$
Declare
    resulting_row information.temporal_entity;
Begin
    -- RAISE INFO 'input values: %', NEW;
    ------ if existing, store in result -----
    With existing_te_ens As (
        Select
            fk_temporal_entity,
            array_agg(jsonb_build_object('fk_property', fk_property, 'fk_entity', fk_entity)) identity_defining_roles
        From
            information.role As r
            Join data_for_history.property As p On p.dfh_pk_property = r.fk_property
                And p.identity_defining = True
        Group By
            fk_temporal_entity
),
new_te_en As (
    Select
        array_agg(a.elements::jsonb) roles
    From (
        Select
            1 x,
            jsonb_array_elements_text(param_roles) elements) As a
    Group By
        a.x
)
Select
    teEn.*
From
    Into resulting_row existing_te_ens
    -- Here we check if the roles for the new TeEn do completele contain all the identity defining roles of an existing TeEn
    Join new_te_en On new_te_en.roles @> existing_te_ens.identity_defining_roles
    Join information.temporal_entity As teEn On teEn.pk_entity = existing_te_ens.fk_temporal_entity
Where
    teEn.fk_class = param_fk_class;
    -- RAISE EXCEPTION 'resulting_row: %', resulting_row;
    -- RAISE INFO 'result of select: %', resulting_row;
    ------- if not existing, insert and store in result -----
    If Not FOUND Then
        -- RAISE INFO 'Not found, creating new...';
        With _insert As (
Insert Into information.temporal_entity (fk_class)
            Values (param_fk_class)
            -- return all fields of the new row
        Returning
            *)
    Select
        *
    From
        Into resulting_row _insert;
        -- RAISE INFO 'result of insert: %', resulting_row  -- ;
    End If;
    Return resulting_row;
End;
$BODY$;

