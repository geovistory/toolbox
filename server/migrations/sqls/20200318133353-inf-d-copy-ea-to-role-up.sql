-- 1 disable triggers for timestamps
Drop Trigger creation_tmsp On information.role;

Drop Trigger last_modification_tmsp On information.role;

-- 2 insert the data
Insert Into information.role (fk_property, fk_temporal_entity, fk_entity, fk_data_subject, fk_data_object, tmsp_creation, tmsp_last_modification, sys_period, metadata)
Select
    fk_property,
    fk_info_domain,
    fk_info_range,
    fk_data_domain,
    fk_data_range,
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

