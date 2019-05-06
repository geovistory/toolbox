-- 10
DROP TABLE system.system_relevant_type;
DROP TABLE system.system_relevant_type_vt;

-- 9
DROP TABLE system.system_relevant_class;
DROP TABLE system.system_relevant_class_vt;

-- 8
SELECT commons.rename_versioned_table('system', 'app_context', 'ui_context');

-- 7
ALTER TABLE system.system_type ADD COLUMN pk_system_type serial PRIMARY KEY;

-- 6
SELECT commons.move_entity_child_with_vt_to_schema('class_has_type_property', 'system', 'projects');

-- 5
SELECT commons.move_entity_child_with_vt_to_schema('class_field_property_rel', 'system', 'projects');

-- 4
SELECT commons.move_entity_child_with_vt_to_schema('class_field', 'system', 'projects');

-- 3
SELECT commons.move_entity_child_with_vt_to_schema('ui_context', 'system', 'projects');

-- 2
SELECT commons.move_entity_child_with_vt_to_schema('system_type', 'system', 'projects');

-- 1.
DROP TABLE system.entity;