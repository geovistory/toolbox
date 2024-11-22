DROP SCHEMA IF EXISTS war CASCADE;

DROP TRIGGER IF EXISTS add_entity_preview_partition ON projects.project;

DROP FUNCTION IF EXISTS projects.add_entity_preview_partition;