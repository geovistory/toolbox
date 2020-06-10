-- 12
Delete From projects.class_field_config;

Insert Into projects.class_field_config
Select
    *
From
    projects._backup_class_field_config;

Drop Table projects._backup_class_field_config;

-- 11
Drop Index projects.class_field_config_fk_app_context_fk_project_fk_property_fk_idx;

-- 10
Alter Table projects.class_field_config
    Alter Column fk_project Drop Not Null;

-- 9
Update
    projects.class_field_config
Set
    fk_project = Null;

-- 8
Update
    projects.class_field_config
Set
    fk_property = fk_property_deprecated;

-- 7
Alter Table projects.class_field_config
    Add Constraint ui_context_config_fk_property_fkey Foreign Key (fk_property) References data_for_history.property (dfh_pk_property) Match SIMPLE On
    Update
        No ACTION On Delete No ACTION;

-- 6
Create Unique Index ui_context_config_for_prop_and_proj_uni_idx On projects.class_field_config
Using btree (fk_app_context, _deprecated_fk_project, fk_property, property_is_outgoing) Tablespace pg_default
Where
    _deprecated_fk_project Is Not Null;

Create Unique Index ui_context_config_for_prop_no_proj_uni_idx On projects.class_field_config
Using btree (fk_app_context, fk_property, property_is_outgoing) Tablespace pg_default
Where
    _deprecated_fk_project Is Null;

Create Unique Index ui_context_config_for_prop_set_and_proj_uni_idx On projects.class_field_config
Using btree (fk_app_context, _deprecated_fk_project, fk_class_field, fk_class_for_class_field) Tablespace pg_default
Where
    _deprecated_fk_project Is Not Null;

Create Unique Index ui_context_config_for_prop_set_no_proj_uni_idx On projects.class_field_config
Using btree (fk_app_context, fk_class_field, fk_class_for_class_field) Tablespace pg_default
Where
    _deprecated_fk_project Is Null;

-- 5
Update
    projects.class_field_config
Set
    fk_range_class = Null;

-- 4
Update
    projects.class_field_config
Set
    fk_domain_class = Null;

-- 3
-- no need (step 2 does the job)
-- 2

Alter Table projects.class_field_config
    Drop Column fk_property_deprecated;

Alter Table projects.class_field_config_vt
    Drop Column fk_property_deprecated;

-- 1
Alter Table projects.class_field_config
    Drop Column fk_domain_class;

Alter Table projects.class_field_config
    Drop Column fk_range_class;

Alter Table projects.class_field_config_vt
    Drop Column fk_domain_class;

Alter Table projects.class_field_config_vt
    Drop Column fk_range_class;

