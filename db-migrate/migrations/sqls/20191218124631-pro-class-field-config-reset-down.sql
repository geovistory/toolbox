-- no way back
Update
    projects.class_field_config
Set
    fk_app_context = 45;

Update
    projects.class_field_config_vt
Set
    fk_app_context = 45;

Alter Table projects.class_field_config
    Alter Column fk_app_context Set Not Null;

Alter Table projects.class_field_config
    Alter Column fk_app_context Set Not Null;

