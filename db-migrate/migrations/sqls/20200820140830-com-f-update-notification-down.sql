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