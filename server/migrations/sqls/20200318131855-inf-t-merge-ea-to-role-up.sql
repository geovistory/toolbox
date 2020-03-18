-- 1 alter table inf.role add the columns for data schema and tables schema
Alter Table information.role
    Add Column fk_data_subject int;

Alter Table information.role
    Add Column fk_data_object int;

Alter Table information.role
    Add Column fk_tables_subject bigint;

Alter Table information.role
    Add Column fk_tables_object bigint;

Alter Table information.role_vt
    Add Column fk_data_subject int;

Alter Table information.role_vt
    Add Column fk_data_object int;

Alter Table information.role_vt
    Add Column fk_tables_subject bigint;

Alter Table information.role_vt
    Add Column fk_tables_object bigint;

-- 2 alter inf.v_role
Drop View information.v_role;

Create View information.v_role As
Select
    t1.pk_entity,
    t1.fk_property,
    t1.fk_entity,
    t1.fk_temporal_entity,
    t1.fk_data_subject,
    t1.fk_data_object,
    t1.fk_tables_subject,
    t1.fk_tables_object,
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

-- 3 alter function create or find inf.v_role
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
        fk_property = NEW.fk_property
        And fk_entity Is Not Distinct From NEW.fk_entity
        And fk_temporal_entity Is Not Distinct From NEW.fk_temporal_entity
        And fk_data_subject Is Not Distinct From NEW.fk_data_subject
        And fk_data_object Is Not Distinct From NEW.fk_data_object
        And fk_tables_subject Is Not Distinct From NEW.fk_tables_subject
        And fk_tables_object Is Not Distinct From NEW.fk_tables_object;
    -- RAISE INFO 'result of select: %', resulting_row;
    ------- if not existing, insert and store in result -----
    If Not FOUND Then
        -- RAISE INFO 'Not found, creating new...';
        With _insert As (
Insert Into information.role (fk_entity, fk_temporal_entity, fk_property, fk_data_subject, fk_data_object, fk_tables_subject, fk_tables_object)
                Values (NEW.fk_entity, NEW.fk_temporal_entity, NEW.fk_property, NEW.fk_data_subject, NEW.fk_data_object, NEW.fk_tables_subject, NEW.fk_tables_object)
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

