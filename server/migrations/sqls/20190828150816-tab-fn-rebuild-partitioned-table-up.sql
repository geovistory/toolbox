-- 1
CREATE OR REPLACE FUNCTION tables.rebuild_partitioned_table(
    id_digital integer,
    view_name text,
    column_list integer[])
    RETURNS text
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE
AS $BODY$
DECLARE
    new_view_name text;
    query_start text;
    query_from text;
    query text;
    field text;
    field_label text;
    field_metadata json;
    n integer = 1;
    a integer;
    output_query text;

BEGIN

                IF view_name IS NOT NULL THEN

                                new_view_name = view_name ;
                ELSE

                                new_view_name = 'tv_' || id_digital ;
                END IF;

        query_start = 'DROP VIEW IF EXISTS ' || new_view_name || ';
                        CREATE OR REPLACE TEMPORARY VIEW ' || new_view_name || ' AS
                            SELECT dr.pk_row';

        query_from =  ' FROM tables.row dr';

        IF array_length(column_list, 1) > 0 THEN

                FOR a IN

                        SELECT UNNEST(column_list)

                LOOP

                            SELECT row_to_json((pk_entity,pk_entity::text,fk_data_type)) INTO field_metadata  --id_for_import_txt
                            FROM data.column
                            WHERE pk_entity = a;

                            field_label = replace(trim((field_metadata -> 'f2')::text), ' ', '_');

                            IF (field_metadata -> 'f3')::varchar::integer = 3293 THEN
                                field = 't'|| n ||'.numeric_value';
                            ELSE
                                field = 't'|| n ||'.string_value';   -- .string     .id_for_import_txt
                            END IF;

                            query_start = query_start || ', ' || field || ' AS ' || field_label;

                            query_from = query_from || ' LEFT JOIN tables.cell_' || id_digital || ' t' || n || ' ON dr.pk_row = t' || n || '.fk_row AND t' || n || '.fk_column = ' || (field_metadata -> 'f1')::text;

                            n = n + 1;

                    -- RAISE NOTICE '%', query_start ; -- return current row of SELECT

                END LOOP;

        ELSE

                    FOR field_metadata IN

                            SELECT row_to_json((pk_entity, pk_entity::text,fk_data_type))  --id_for_import_txt
                            FROM data.column
                            WHERE fk_digital = id_digital
                            ORDER BY pk_entity

                    LOOP

                                field_label = replace(trim((field_metadata -> 'f2')::text), ' ', '_');

                                IF (field_metadata -> 'f3')::varchar::integer = 3293 THEN
                                    field = 't'|| n ||'.numeric_value';
                                ELSE
                                    field = 't'|| n ||'.string_value';   -- .string     .id_for_import_txt
                                END IF;

                                query_start = query_start || ', ' || field || ' AS ' || field_label;

                                query_from = query_from || ' LEFT JOIN tables.cell_' || id_digital || ' t' || n || ' ON dr.pk_row = t' || n || '.fk_row AND t' || n || '.fk_column = ' || (field_metadata -> 'f1')::text;

                                n = n + 1;

                        -- RAISE NOTICE '%', query_start ; -- return current row of SELECT

                    END LOOP;

    END IF;

    query := query_start || query_from || ' WHERE dr.fk_digital = ' || id_digital || ';';

    RAISE NOTICE '%', query ;

    EXECUTE query;

    output_query := 'SELECT * FROM ' || new_view_name || ' LIMIT 10' ;

RETURN output_query;
END;
$BODY$;
