-- 1
-- create function to extract the schema.table name
-- currently used by the view war.entity_previw
CREATE OR REPLACE FUNCTION commons.get_entity_preview_table_name()
  RETURNS text
  AS $$
DECLARE
  table_name text;
BEGIN
  SELECT
    substring(view_definition FROM 'FROM[[:space:]]+([[:alnum:]_\.]+)')
  FROM
    information_schema.views
  WHERE
    table_schema = 'war'
    AND table_name = 'entity_preview' INTO table_name;
  RETURN table_name;
END;
$$
LANGUAGE plpgsql;

-- 2
-- Create trigger function that adds a partition for the project
-- to the current entity_preview table
CREATE OR REPLACE FUNCTION projects.add_entity_preview_partition()
  RETURNS TRIGGER
  LANGUAGE 'plpgsql'
  COST 100 VOLATILE NOT LEAKPROOF
  AS $BODY$
DECLARE
  entity_preview_table text;
BEGIN
  -- get the table name of the current
  SELECT
    commons.get_entity_preview_table_name() INTO entity_preview_table;
  -- create the partition
  EXECUTE format('CREATE TABLE %1$s_%2$s PARTITION OF %1$s FOR VALUES IN (%2$s);', entity_preview_table, NEW.pk_entity);
  RETURN NEW;
END;
$BODY$;

-- 3
-- add trigger
CREATE TRIGGER add_entity_preview_partition
  BEFORE INSERT ON projects.project
  FOR EACH ROW
  EXECUTE FUNCTION projects.add_entity_preview_partition();

