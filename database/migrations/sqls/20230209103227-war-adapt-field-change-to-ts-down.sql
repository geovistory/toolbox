-- 4
DROP FUNCTION war.switch_field_change_table;

-- 3
DROP FUNCTION war.create_sink_table_field_change;

-- 2
DROP TABLE war.field_change_template;

-- 1
CREATE TABLE IF NOT EXISTS war.field_change (
  fk_project integer NOT NULL,
  fk_source_info integer NOT NULL,
  fk_source_tables_cell integer NOT NULL,
  fk_property integer NOT NULL,
  fk_property_of_property integer NOT NULL,
  is_outgoing boolean NOT NULL,
  tmsp_last_modification timestamp with time zone NOT NULL,
  CONSTRAINT field_change_pkey PRIMARY KEY (fk_project, fk_source_info, fk_source_tables_cell, fk_property, fk_property_of_property, is_outgoing),
  CONSTRAINT field_change_uniq UNIQUE (fk_project, fk_source_info, fk_source_tables_cell, fk_property, fk_property_of_property, is_outgoing))
