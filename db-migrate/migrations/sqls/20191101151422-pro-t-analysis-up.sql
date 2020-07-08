/* Replace with your SQL commands */
CREATE TABLE projects.analysis (
  fk_project INTEGER NOT NULL REFERENCES projects.project (pk_entity),
  fk_analysis_type INTEGER NOT NULL REFERENCES system.analysis_type (pk_entity),
  name text,
  description text,
  analysis_definition jsonb)
INHERITS (
  projects.entity
);

SELECT
  commons.init_entity_child_table ('projects.analysis');

