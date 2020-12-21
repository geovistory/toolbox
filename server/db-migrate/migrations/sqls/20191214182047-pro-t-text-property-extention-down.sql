-- 5
Alter Table projects.property_label_deprecated Rename To property_label;

Alter Table projects.property_label_deprecated_vt Rename To property_label_vt;

-- 4
Delete From projects.text_property
Where notes = 'migrated from data_for_history.label';

-- 3
Delete From projects.text_property
Where notes = 'migrated from projects.property_label';

-- 2
-- no need, since column dropped in 1
-- 1

Alter Table projects.text_property
    Drop Column fk_project;

Alter Table projects.text_property Rename Column fk_pro_project To fk_entity;

Alter Table projects.text_property
    Drop Column fk_dfh_property;

Alter Table projects.text_property_vt
    Drop Column fk_dfh_property;

Alter Table projects.text_property
    Drop Column fk_dfh_property_domain;

Alter Table projects.text_property_vt
    Drop Column fk_dfh_property_domain;

Alter Table projects.text_property
    Drop Column fk_dfh_property_range;

Alter Table projects.text_property_vt
    Drop Column fk_dfh_property_range;

Alter Table projects.text_property
    Drop Column fk_dfh_class;

Alter Table projects.text_property_vt
    Drop Column fk_dfh_class;

