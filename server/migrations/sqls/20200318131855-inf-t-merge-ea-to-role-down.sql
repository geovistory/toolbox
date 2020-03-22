-- 3
Create Or Replace Function information.v_role_find_or_create ()
    Returns Trigger
    Language 'plpgsql'
    Cost 100 Volatile Not Leakproof
    As $BODY$
Declare
    resulting_pk integer;
    resulting_row information.v_role;
Begin
    -- RAISE INFO 'input values: %', NEW;
    ------ if existing, store in result -----
    Select
        pk_entity
    From
        Into resulting_pk information.role
    Where
        fk_entity = NEW.fk_entity
        And fk_temporal_entity = NEW.fk_temporal_entity
        And fk_property = NEW.fk_property;
    -- RAISE INFO 'result of select: %', resulting_row;
    ------- if not existing, insert and store in result -----
    If Not FOUND Then
        -- RAISE INFO 'Not found, creating new...';
        With _insert As (
Insert Into information.role (fk_entity, fk_temporal_entity, fk_property)
                Values (NEW.fk_entity, NEW.fk_temporal_entity, NEW.fk_property)
                -- return all fields of the new row
            Returning
                *)
            Select
                pk_entity
            From
                Into resulting_pk _insert;
        -- RAISE INFO 'result of insert: %', resulting_row;
    End If;
    Select
        *
    From
        Into resulting_row information.v_role
    Where
        pk_entity = resulting_pk;
    Return resulting_row;
End;
$BODY$;

-- 2
Drop View information.v_role;

Create View information.v_role As
Select
    t1.pk_entity,
    t1.fk_property,
    t1.fk_entity,
    t1.fk_temporal_entity,
    t2.is_in_project_count,
    t2.is_standard_in_project_count,
    t2.community_favorite_calendar,
    t1.notes,
    t1.tmsp_creation,
    t1.tmsp_last_modification,
    t1.sys_period
From
    information.role t1
    Left Join Lateral (
        Select
            count(info_proj_rel.pk_entity)::integer As is_in_project_count,
            coalesce(count(*) Filter (Where info_proj_rel.ord_num_of_domain = 0), 0::bigint)::integer As is_standard_in_project_count,
            mode() Within Group (Order By info_proj_rel.calendar) As community_favorite_calendar
        From
            projects.info_proj_rel
        Where
            info_proj_rel.fk_entity = t1.pk_entity
            And info_proj_rel.is_in_project = True Group By
                info_proj_rel.fk_entity) t2 On True;

Create Trigger on_insert
    Instead Of INSERT On information.v_role For Each Row
    Execute Procedure information.v_role_find_or_create ();

-- 1.1
Alter Table information.role
    Alter Column fk_property Drop Not Null;

Alter Table information.role
    Alter Column fk_temporal_entity Drop Not Null;

Alter Table information.role
    Alter Column fk_entity Drop Not Null;

Alter Table information.role
    Alter Column fk_property Drop Default;

Alter Table information.role
    Alter Column fk_temporal_entity Drop Default;

Alter Table information.role
    Alter Column fk_entity Drop Default;

-- 1
Alter Table information.role
    Drop Column fk_data_subject;

Alter Table information.role
    Drop Column fk_data_object;

Alter Table information.role
    Drop Column fk_tables_subject;

Alter Table information.role
    Drop Column fk_tables_object;

Alter Table information.role_vt
    Drop Column fk_data_subject;

Alter Table information.role_vt
    Drop Column fk_data_object;

Alter Table information.role_vt
    Drop Column fk_tables_subject;

Alter Table information.role_vt
    Drop Column fk_tables_object;

