/* Replace with your SQL commands */
CREATE TABLE system.analysis_type (
  standard_label text,
  query_definition_schema jsonb,
  visual_definition_schema jsonb,
  query_results_schema jsonb,
  rows_limit integer)
INHERITS (
  system.entity
);

SELECT
  commons.init_entity_child_table ('system.analysis_type');

