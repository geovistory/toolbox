-- 4
DROP FUNCTION commons.clone_sandbox_project;

-- 3
ALTER TABLE projects.query_vt
  DROP COLUMN fk_cloned_from_query;

-- 2
ALTER TABLE projects.query
  DROP COLUMN fk_cloned_from_query;

-- 1
ALTER TABLE projects.project
  DROP COLUMN fk_cloned_from_project;

