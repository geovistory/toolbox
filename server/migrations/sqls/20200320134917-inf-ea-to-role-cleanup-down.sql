-- 7
Alter Table information._backup_entity_association Rename To entity_association;

-- 6
Create View information.v_entity_association As
With ea_project_count As (
    Select
        ea_1.pk_entity,
        ea_1.fk_property,
        ea_1.fk_info_domain,
        ea_1.fk_info_range,
        ea_1.fk_data_domain,
        ea_1.fk_data_range,
        ea_1.notes,
        ea_1.tmsp_creation,
        ea_1.tmsp_last_modification,
        ea_1.sys_period,
        coalesce(count(*) Filter (Where epr.is_in_project = True), 0::bigint)::integer As is_in_project_count
    From
        information.entity_association ea_1
    Left Join projects.info_proj_rel epr On epr.fk_entity = ea_1.pk_entity
Group By
    ea_1.pk_entity,
    ea_1.fk_property,
    ea_1.fk_info_domain,
    ea_1.fk_info_range,
    ea_1.fk_data_domain,
    ea_1.fk_data_range,
    ea_1.notes,
    ea_1.tmsp_creation,
    ea_1.tmsp_last_modification,
    ea_1.sys_period
)
Select
    ea.pk_entity,
    ea.fk_property,
    ea.fk_info_domain,
    ea.fk_info_range,
    ea.fk_data_domain,
    ea.fk_data_range,
    ea.notes,
    ea.tmsp_creation,
    ea.tmsp_last_modification,
    ea.sys_period,
    ea.is_in_project_count,
    p.range_instances_max_quantifier::smallint As range_max_quantifier,
    p.domain_instances_max_quantifier::smallint As domain_max_quantifier
From
    ea_project_count ea
    Left Join data_for_history.v_property p On ea.fk_property = p.pk_property;

-- 5
Create Or Replace View war.v_entity_association_per_project_and_repo As Select Distinct
    ea.pk_entity,
    ea.fk_info_domain,
    ea.fk_info_range,
    ea.fk_data_domain,
    ea.fk_data_range,
    ea.fk_property,
    epr.fk_project,
    coalesce(epr.fk_project, 0) As project,
    ea.is_in_project_count
From
    information.v_entity_association ea,
    projects.info_proj_rel epr
Where
    epr.fk_entity = ea.pk_entity
    And epr.is_in_project = True
Union
Select Distinct
    ea.pk_entity,
    ea.fk_info_domain,
    ea.fk_info_range,
    ea.fk_data_domain,
    ea.fk_data_range,
    ea.fk_property,
    Null::integer As fk_project,
    0 As project,
    ea.is_in_project_count
From
    information.v_entity_association ea
Where
    ea.is_in_project_count > 0;

-- 4
Create Function information.v_entity_association_find_or_create ()
    Returns Trigger
    Language 'plpgsql'
    Cost 100 Volatile Not Leakproof
    As $BODY$
Declare
    resulting_pk integer;
    resulting_row information.v_entity_association;
Begin
    -- RAISE INFO 'input values: %', NEW;
    ------ if existing, store in result -----
    Select
        pk_entity
    From
        Into resulting_pk information.entity_association
    Where
        fk_property = NEW.fk_property
        And fk_info_domain Is Not Distinct From NEW.fk_info_domain
        And fk_info_range Is Not Distinct From NEW.fk_info_range
        And fk_data_domain Is Not Distinct From NEW.fk_data_domain
        And fk_data_range Is Not Distinct From NEW.fk_data_range;
    -- RAISE INFO 'result of select: %', resulting_row;
    ------- if not existing, insert and store in result -----
    If Not FOUND Then
        -- RAISE INFO 'Not found, creating new...';
        With _insert As (
Insert Into information.entity_association (fk_property, fk_info_domain, fk_info_range, fk_data_domain, fk_data_range)
                Values (NEW.fk_property, NEW.fk_info_domain, NEW.fk_info_range, NEW.fk_data_domain, NEW.fk_data_range)
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
        Into resulting_row information.v_entity_association
    Where
        pk_entity = resulting_pk;
    Return resulting_row;
End;
$BODY$;

-- 3
Create Trigger on_insert
    Instead Of INSERT On information.v_entity_association For Each Row
    Execute Procedure information.v_entity_association_find_or_create ();

-- 2
-- no way back
-- 1
-- no way back
