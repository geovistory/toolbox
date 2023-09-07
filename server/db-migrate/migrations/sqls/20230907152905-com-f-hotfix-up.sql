CREATE OR REPLACE FUNCTION commons.get_entity_preview_table_name()
    RETURNS text
    AS $$
DECLARE
    table_name text;
BEGIN
    SELECT
        substring(view_definition FROM 'FROM[[:space:]]+([[:alnum:]_\.]+)')
    FROM
        information_schema.views t1
    WHERE
        t1.table_schema = 'war'
        AND t1.table_name = 'entity_preview' INTO table_name;
    RETURN table_name;
END;
$$
LANGUAGE plpgsql;

