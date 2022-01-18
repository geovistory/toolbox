-- Table: war.field_change
DROP TABLE war.field_change;

CREATE TABLE war.field_change (
  fk_project integer NOT NULL,
  fk_source_info integer NOT NULL,
  fk_property integer NOT NULL,
  fk_property_of_property integer NOT NULL,
  is_outgoing boolean NOT NULL,
  tmsp_last_modification timestamp with time zone NOT NULL,
  CONSTRAINT field_change_uniq UNIQUE (fk_project, fk_source_info, fk_property, fk_property_of_property, is_outgoing)
);

-- Index: field_change_uniq_idx
-- DROP INDEX war.field_change_uniq_idx;
CREATE UNIQUE INDEX field_change_uniq_idx ON war.field_change USING btree (fk_project ASC NULLS LAST, fk_source_info ASC NULLS LAST, fk_property ASC NULLS LAST, fk_property_of_property ASC NULLS LAST, is_outgoing ASC NULLS LAST) TABLESPACE pg_default;

-- Trigger: after_insert_field_change
-- DROP TRIGGER after_insert_field_change ON war.field_change;
CREATE TRIGGER after_insert_field_change
  AFTER INSERT ON war.field_change REFERENCING NEW TABLE AS new_table
  FOR EACH STATEMENT
  EXECUTE PROCEDURE war.field_change__notify_upsert ();

-- Trigger: after_update_field_change
-- DROP TRIGGER after_update_field_change ON war.field_change;
CREATE TRIGGER after_update_field_change
  AFTER UPDATE ON war.field_change REFERENCING NEW TABLE AS new_table
  FOR EACH STATEMENT
  EXECUTE PROCEDURE war.field_change__notify_upsert ();

