-- 1
Alter Table projects.text_property
    Add Column fk_project INT;

Alter Table projects.text_property Rename Column fk_entity To fk_pro_project;

Alter Table projects.text_property
    Add Column fk_dfh_property INT;

Alter Table projects.text_property_vt
    Add Column fk_dfh_property INT;

Alter Table projects.text_property
    Add Column fk_dfh_property_domain INT;

Alter Table projects.text_property_vt
    Add Column fk_dfh_property_domain INT;

Alter Table projects.text_property
    Add Column fk_dfh_property_range INT;

Alter Table projects.text_property_vt
    Add Column fk_dfh_property_range INT;

Alter Table projects.text_property
    Add Column fk_dfh_class INT;

Alter Table projects.text_property_vt
    Add Column fk_dfh_class INT;

-- 2 fill fk_project field as
Update
    projects.text_property
Set
    fk_project = fk_pro_project;

-- 3 add property labels from projects.property_label
Insert Into projects.text_property (string, fk_language, fk_system_type, fk_project, fk_creator, fk_last_modifier, fk_dfh_property, fk_dfh_property_domain, fk_dfh_property_range, notes)
Select
    label,
    fk_language,
    639, -- label
    fk_project,
    fk_creator,
    fk_last_modifier,
    fk_property,
    fk_domain_class,
    fk_range_class,
    'migrated from projects.property_label'
From
    projects.property_label;

-- 4 add class labels from data_for_history.label
Insert Into projects.text_property (string, fk_language, fk_system_type, fk_project, fk_creator, fk_last_modifier, fk_dfh_class, notes)
Select
    dfh_label,
    inf_fk_language,
    639, -- label
    375669, -- default config project
    7, -- jonas
    7, -- jonas
    dfh_fk_class,
    'migrated from data_for_history.label'
From
    data_for_history. "label"
Where
    "label".dfh_fk_class Is Not Null
    And "label".inf_fk_language Is Not Null;

-- 5
Alter Table projects.property_label Rename To property_label_deprecated;

Alter Table projects.property_label_vt Rename To property_label_deprecated_vt;

