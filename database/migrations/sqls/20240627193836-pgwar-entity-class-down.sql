-- Drop the function pgwar.update_entity_class()
DROP FUNCTION pgwar.update_entity_class();

-- Drop the index on the fk_language column in the projects.project table
DROP INDEX IF EXISTS projects.project_fk_language_idx;

-- Drop the index on the fk_project column in the pgwar.entity_preview table
DROP INDEX IF EXISTS pgwar.entity_preview_fk_project_idx;

-- Drop the pgwar.update_entity_class function
DROP FUNCTION IF EXISTS pgwar.update_entity_class();