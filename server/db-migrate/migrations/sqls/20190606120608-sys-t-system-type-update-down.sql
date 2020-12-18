-- 9
ALTER TABLE projects.text_property_vt DROP COLUMN fk_language;

-- 2
ALTER TABLE system.system_type_vt DROP COLUMN entity_version;
ALTER TABLE system.system_type_vt ADD COLUMN pk_system_type INT;

-- 1
ALTER TABLE system.system_type DROP COLUMN definition;
ALTER TABLE system.system_type DROP COLUMN st_column_name;
ALTER TABLE system.system_type DROP COLUMN "group";
ALTER TABLE system.system_type_vt DROP COLUMN definition;
ALTER TABLE system.system_type_vt DROP COLUMN st_column_name;
ALTER TABLE system.system_type_vt DROP COLUMN "group";
