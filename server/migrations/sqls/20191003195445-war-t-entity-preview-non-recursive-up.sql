/* Replace with your SQL commands */
CREATE TABLE warehouse.entity_preview_non_recursive (
  pk_entity INT,
  fk_class INT,
  fk_project INT,
  table_name VARCHAR,
  class_label VARCHAR,
  own_full_text TEXT,
  own_entity_label TEXT,
  time_span JSONB,
  related_full_texts JSONB,
  fk_entity_label INT,
  fk_type INT
);

-- Add partial unique for where fk_project is null
-- See: https://dba.stackexchange.com/questions/151431/postgresql-upsert-issue-with-null-values
CREATE UNIQUE INDEX pk_entity_fk_project_unique
ON warehouse.entity_preview_non_recursive (pk_entity, COALESCE(fk_project, 0));
