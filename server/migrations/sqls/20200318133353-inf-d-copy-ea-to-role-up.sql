-- 1 disable triggers for timestamps
Drop Trigger creation_tmsp On information.role;

Drop Trigger last_modification_tmsp On information.role;

-- 2 insert the data
Insert Into information.role (fk_property, fk_temporal_entity, fk_entity, fk_subject_data, fk_object_data, tmsp_creation, tmsp_last_modification, sys_period, metadata)
Select
    fk_property,
    coalesce(fk_info_domain, 0),
    coalesce(fk_info_range, 0),
    coalesce(fk_data_domain, 0),
    coalesce(fk_data_range, 0),
    tmsp_creation,
    tmsp_last_modification,
    sys_period,
    json_build_object('from_entity_association', pk_entity)
From
    information.entity_association;

-- 3 enable triggers for timestamps
Create Trigger creation_tmsp
    Before Insert On information.role For Each Row
    Execute Procedure commons.tmsp_creation ();

Create Trigger last_modification_tmsp
    Before Insert Or Update On information.role For Each Row
    Execute Procedure commons.tmsp_last_modification ();

