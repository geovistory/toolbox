/* Replace with your SQL commands */
Delete From projects.class_field_config;

Alter Table projects.class_field_config
    Alter Column fk_app_context Drop Not Null;

Alter Table projects.class_field_config_vt
    Alter Column fk_app_context Drop Not Null;

