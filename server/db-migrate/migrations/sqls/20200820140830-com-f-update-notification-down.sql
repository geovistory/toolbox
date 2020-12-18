-- 11
DROP TRIGGER notify_modification ON projects.class_field_config;

-- 10
DROP TRIGGER notify_modification ON data_for_history.api_property;
 
-- 9
DROP TRIGGER notify_modification ON projects.dfh_profile_proj_rel;
 
-- 8
DROP TRIGGER notify_modification ON data_for_history.api_class;

-- 7
DROP TRIGGER notify_modification ON projects.info_proj_rel;

-- 6
DROP TRIGGER notify_modification ON information.temporal_entity;

-- 5
DROP TRIGGER notify_modification ON information.persistent_item;

-- 4
DROP TRIGGER notify_modification ON information.statement;

-- 3
DROP TRIGGER notify_modification ON projects.text_property;

-- 2
DROP TRIGGER notify_modification ON projects.project;

-- 1
DROP FUNCTION commons.notify_modification_trigger();