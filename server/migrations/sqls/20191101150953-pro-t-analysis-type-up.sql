/* Replace with your SQL commands */
CREATE TABLE projects.analysis_type (
  standard_label text,
  query_definition_schema jsonb,
  visual_definition_schema jsonb,
  query_results_schema jsonb,
  rows_limit integer)
INHERITS (
  projects.entity
);

SELECT
  commons.init_entity_child_table ('projects.analysis_type');

