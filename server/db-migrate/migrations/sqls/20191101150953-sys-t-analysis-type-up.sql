/* Replace with your SQL commands */
CREATE TABLE system.analysis_type (
  standard_label text,
  rows_limit integer)
INHERITS (
  system.entity
);

SELECT
  commons.init_entity_child_table ('system.analysis_type');

