-- 1
CREATE OR REPLACE FUNCTION tables.create_cell_table_for_digital(pk_digital integer)
    RETURNS text
    LANGUAGE 'plpgsql'
AS $BODY$
DECLARE
    test_query_result boolean;
    create_query text;
    result_text text;

BEGIN

        EXECUTE 'SELECT COUNT(*) > 0 FROM information_schema.tables WHERE table_schema = ''tables''
                    AND  table_name = ''cell_' || pk_digital::text || ''';' INTO test_query_result  ;

        IF test_query_result
        THEN
            result_text := 'tables.cell_' || pk_digital::text || ' already exists' ;
        ELSE
                create_query := 'CREATE TABLE IF NOT EXISTS  tables.cell_' || pk_digital::text || '
                    (
                    CHECK (fk_digital = ' || pk_digital::text || '),
                    CONSTRAINT data_cell_' || pk_digital::text || '_pk_entity_primary_key PRIMARY KEY (pk_cell),
                    CONSTRAINT cell_' || pk_digital::text || '_fk_column_fkey FOREIGN KEY (fk_column)
                        REFERENCES data."column" (pk_entity) MATCH SIMPLE
                        ON UPDATE NO ACTION
                        ON DELETE NO ACTION,
                    CONSTRAINT cell_' || pk_digital::text || '_fk_digital_fkey FOREIGN KEY (fk_digital)
                        REFERENCES data.digital (pk_entity) MATCH SIMPLE
                        ON UPDATE NO ACTION
                        ON DELETE NO ACTION,
                    CONSTRAINT cell_' || pk_digital::text || '_fk_row_fkey FOREIGN KEY (fk_row)
                        REFERENCES tables."row" (pk_row) MATCH SIMPLE
                        ON UPDATE NO ACTION
                        ON DELETE NO ACTION
                    )
                        INHERITS (tables.cell);


                        CREATE INDEX cell_' || pk_digital::text || '_fk_digital_idx
                            ON tables.cell_' || pk_digital::text || ' USING btree
                            (fk_digital);

                        CREATE TRIGGER creation_tmsp BEFORE INSERT ON tables.cell_' || pk_digital::text || '
                        FOR
                        EACH ROW EXECUTE PROCEDURE commons.tmsp_creation ();

                        CREATE TRIGGER last_modification_tmsp BEFORE INSERT OR UPDATE ON tables.cell_' || pk_digital::text || '
                        FOR
                        EACH ROW EXECUTE PROCEDURE commons.tmsp_last_modification ();

                        CREATE INDEX cell_' || pk_digital::text || '_fk_column_idx
                            ON tables.cell_' || pk_digital::text || ' USING btree
                            (fk_column);

                        CREATE INDEX cell_' || pk_digital::text || '_fk_row_idx
                            ON tables.cell_' || pk_digital::text || ' USING btree
                            (fk_row);

                        CREATE INDEX cell_' || pk_digital::text || '_id_for_import_txt_idx
                            ON tables.cell_' || pk_digital::text || ' USING hash(id_for_import_txt);

                    CREATE INDEX cell_' || pk_digital::text || '_pk_cell_idx
                          ON tables.cell_' || pk_digital::text || '  USING btree(pk_cell);

                        CREATE INDEX cell_' || pk_digital::text || '_string_value_idx
                          ON tables.cell_' || pk_digital::text || '  USING hash(string_value);

                        CREATE TRIGGER create_entity_version_key BEFORE INSERT ON tables.cell_' || pk_digital::text || '
                        FOR
                        EACH ROW EXECUTE PROCEDURE commons.create_entity_version_key ();

                        CREATE TRIGGER update_entity_version_key BEFORE UPDATE ON tables.cell_' || pk_digital::text || '
                        FOR
                        EACH ROW EXECUTE PROCEDURE commons.update_entity_version_key ();

                        CREATE TABLE IF NOT EXISTS  tables.cell_' || pk_digital::text || '_vt ( ) INHERITS (tables.cell_vt);

                        CREATE TRIGGER versioning_trigger
                            BEFORE INSERT OR DELETE OR UPDATE
                            ON tables.cell_' || pk_digital::text || '
                            FOR EACH ROW
                            EXECUTE PROCEDURE public.versioning(''sys_period'', ''tables.cell_' || pk_digital::text || '_vt'', ''true'');  '


                        ;

                    RAISE NOTICE '%', create_query;
                    EXECUTE create_query;
                    result_text := 'tables.cell_' || pk_digital::text;

        END IF;

RETURN result_text;
END;
$BODY$;
