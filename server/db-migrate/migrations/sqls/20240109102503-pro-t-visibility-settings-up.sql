/* Replace with your SQL commands */
CREATE TABLE projects.visibility_settings(
  fk_project integer NOT NULL REFERENCES projects.project(pk_entity) UNIQUE,
  settings jsonb NOT NULL
)
INHERITS (
  projects.entity
);

SELECT
  commons.init_entity_child_table('projects.visibility_settings');

