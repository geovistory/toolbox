/* Replace with your SQL commands */
Delete From projects.dfh_profile_proj_rel
Where fk_profile Not In (4, 5, 8);

Alter Table projects.dfh_class_proj_rel_vt Rename Column is_in_project To enabled_in_entities;

