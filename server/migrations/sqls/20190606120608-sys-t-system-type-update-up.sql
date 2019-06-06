-- 1
ALTER TABLE system.system_type ADD COLUMN definition text;
ALTER TABLE system.system_type ADD COLUMN st_column_name text;
ALTER TABLE system.system_type ADD COLUMN "group" text;
ALTER TABLE system.system_type_vt ADD COLUMN definition text;
ALTER TABLE system.system_type_vt ADD COLUMN st_column_name text;
ALTER TABLE system.system_type_vt ADD COLUMN "group" text;
