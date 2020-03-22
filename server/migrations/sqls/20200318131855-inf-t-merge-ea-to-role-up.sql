-- 1 alter table inf.role add the columns for data schema and tables schema
Alter Table information.role
    Add Column fk_property_of_property int Not Null Default 0;

Alter Table information.role
    Add Column fk_subject_data int Not Null Default 0;

Alter Table information.role
    Add Column fk_subject_tables_row bigint Not Null Default 0;

Alter Table information.role
    Add Column fk_subject_tables_cell bigint Not Null Default 0;

Alter Table information.role
    Add Column fk_object_data int Not Null Default 0;

Alter Table information.role
    Add Column fk_object_tables_row bigint Not Null Default 0;

Alter Table information.role
    Add Column fk_object_tables_cell bigint Not Null Default 0;

Alter Table information.role_vt
    Add Column fk_property_of_property int Not Null Default 0;

Alter Table information.role_vt
    Add Column fk_subject_data int Not Null Default 0;

Alter Table information.role_vt
    Add Column fk_subject_tables_row bigint Not Null Default 0;

Alter Table information.role_vt
    Add Column fk_subject_tables_cell bigint Not Null Default 0;

Alter Table information.role_vt
    Add Column fk_object_data int Not Null Default 0;

Alter Table information.role_vt
    Add Column fk_object_tables_row bigint Not Null Default 0;

Alter Table information.role_vt
    Add Column fk_object_tables_cell bigint Not Null Default 0;

-- 1.1
Alter Table information.role
    Alter Column fk_property Set Not Null;

Alter Table information.role
    Alter Column fk_temporal_entity Set Not Null;

Alter Table information.role
    Alter Column fk_entity Set Not Null;

Alter Table information.role
    Alter Column fk_property Set Default 0;

Alter Table information.role
    Alter Column fk_temporal_entity Set Default 0;

Alter Table information.role
    Alter Column fk_entity Set Default 0;

-- 2 alter inf.v_role
Drop View information.v_role;

Create View information.v_role As
Select
    t1.pk_entity,
    t1.fk_property,
    t1.fk_property_of_property,
    t1.fk_entity,
    t1.fk_temporal_entity,
    t1.fk_subject_data,
    t1.fk_subject_tables_row,
    t1.fk_subject_tables_cell,
    t1.fk_object_data,
    t1.fk_object_tables_row,
    t1.fk_object_tables_cell,
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
        And fk_property_of_property = NEW.fk_property_of_property
        And fk_temporal_entity = NEW.fk_temporal_entity
        And fk_subject_data = NEW.fk_subject_data
        And fk_subject_tables_row = NEW.fk_subject_tables_row
        And fk_subject_tables_cell = NEW.fk_subject_tables_cell
        And fk_entity = NEW.fk_entity
        And fk_object_data = NEW.fk_object_data
        And fk_object_tables_row = NEW.fk_object_tables_row
        And fk_object_tables_cell = NEW.fk_object_tables_cell;
    -- RAISE INFO 'result of select: %', resulting_row;
    ------- if not existing, insert and store in result -----
    If Not FOUND Then
        -- RAISE INFO 'Not found, creating new...';
        With _insert As (
Insert Into information.role (fk_property, fk_property_of_property, fk_temporal_entity, fk_subject_data, fk_subject_tables_row, fk_subject_tables_cell, fk_entity, fk_object_data, fk_object_tables_row, fk_object_tables_cell)
                Values (NEW.fk_property, NEW.fk_property_of_property, NEW.fk_temporal_entity, NEW.fk_subject_data, NEW.fk_subject_tables_row, NEW.fk_subject_tables_cell, NEW.fk_entity, NEW.fk_object_data, NEW.fk_object_tables_row, NEW.fk_object_tables_cell)
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

