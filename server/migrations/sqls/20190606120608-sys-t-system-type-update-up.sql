-- 1
ALTER TABLE system.system_type ADD COLUMN definition text;
ALTER TABLE system.system_type ADD COLUMN st_column_name text;
ALTER TABLE system.system_type ADD COLUMN "group" text;
ALTER TABLE system.system_type_vt ADD COLUMN definition text;
ALTER TABLE system.system_type_vt ADD COLUMN st_column_name text;
ALTER TABLE system.system_type_vt ADD COLUMN "group" text;

-- 2
ALTER TABLE system.system_type_vt ADD COLUMN entity_version INT;
ALTER TABLE system.system_type_vt DROP COLUMN pk_system_type; -- no way back

-- 9
ALTER TABLE projects.text_property_vt ADD COLUMN fk_language INT;
