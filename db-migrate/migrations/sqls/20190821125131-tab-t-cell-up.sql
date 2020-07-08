-- 1
CREATE TABLE tables.cell
(
    pk_cell bigint NOT NULL, -- DEFAULT nextval('tables.entity_pk_entity_seq'::regclass),
    fk_column integer NOT NULL,
    fk_row bigint NOT NULL,
    fk_digital integer NOT NULL,
    numeric_value numeric,
    string_value text,
    entity_version integer NOT NULL,
    notes text,
    fk_namespace integer,
    fk_creator integer,
    fk_last_modifier integer,
    tmsp_creation timestamp with time zone DEFAULT now(),
    tmsp_last_modification timestamp with time zone,
    sys_period tstzrange DEFAULT tstzrange(now(), NULL::timestamp with time zone),
    metadata jsonb,
    id_for_import integer,
    id_for_import_txt text,
    fk_publication_status integer,
    fk_license integer,
    CONSTRAINT cell_pk_cell_primary_key PRIMARY KEY (pk_cell)
);


-- 2
CREATE TABLE tables.cell_vt (
    LIKE tables.cell
);


/*
Following instructions (3-7) update the 'string_value' column in the original 'data.cell' table for all cells that where created before this column was added to the table.
It also sets the entity version value back to 1 because the earlier version will not be imported into the new 'tables' schema.
*/

-- 3
ALTER TABLE data.cell
    DISABLE TRIGGER versioning_trigger;

-- 4
ALTER TABLE data.cell
    DISABLE TRIGGER update_entity_version_key;

-- 5
ALTER TABLE data.cell
    DISABLE TRIGGER last_modification_tmsp;

-- 6
UPDATE data.cell
   SET string_value = id_for_import_txt
WHERE LENGTH(id_for_import_txt) > 0
AND   (string_value IS NULL OR string_value = '');

-- 7
UPDATE data.cell
   SET entity_version = 1;



-- 8
-- DROP  FUNCTION tables.create_cell_table_for_digital(pk_digital integer);

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

                        /*
                            Following INSERT has to be suppressed after migration from table data.cell
                        */
                        INSERT INTO tables.cell_' || pk_digital::text || ' (
                                       entity_version,
                                       fk_column,
                                       fk_creator,
                                       fk_digital,
                                       fk_last_modifier,
                                       fk_license,
                                       fk_namespace,
                                       fk_publication_status,
                                       fk_row,
                                       id_for_import,
                                       id_for_import_txt,
                                       metadata,
                                       notes,
                                       numeric_value,
                                       pk_cell,
                                       string_value,
                                       sys_period,
                                       tmsp_creation,
                                       tmsp_last_modification
                                )

                                SELECT t1.entity_version,
                                       t1.fk_column,
                                       t1.fk_creator,
                                       ' || pk_digital || ',
                                       t1.fk_last_modifier,
                                       t1.fk_license,
                                       t1.fk_namespace,
                                       t1.fk_publication_status,
                                       t1.fk_row,
                                       t1.id_for_import,
                                       t1.id_for_import_txt,
                                       t1.metadata,
                                       t1.notes,
                                       t1.numeric_value,
                                       t1.pk_entity,
                                       t1.string_value,
                                       t1.sys_period,
                                       t1.tmsp_creation,
                                       t1.tmsp_last_modification
                                FROM data.cell t1,
                                     data.column t2
                                WHERE t2.pk_entity = t1.fk_column
                                AND   t2.fk_digital = ' || pk_digital::text || ';

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
                            ON tables.cell_' || pk_digital::text || ' USING btree
                            (id_for_import_txt);

                       CREATE INDEX cell_' || pk_digital::text || '_pk_cell_idx
                          ON tables.cell_' || pk_digital::text || '  USING btree(pk_cell);

                        CREATE INDEX cell_' || pk_digital::text || '_string_value_idx
                          ON tables.cell_' || pk_digital::text || '  USING btree(string_value);

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


-- 9
/*
Get all digitals' ids that have rows, i.e. are tables. Without rows no cells.

SELECT DISTINCT fk_digital AS id_digital
FROM data.row
ORDER BY fk_digital;

Result:
fk_digital
82819
82900
98270
98645
277245
293949
303439
303647
303710
304894
305080
305446
306424
386428
387616
419278
599458
1175660
1784924
18817346
18836294
18846350
18947213
24521730
24612271
*/






/*
    BEWARE : this takes at least 18 minutes and produces 25 tables
*/
WITH tw1 AS
(
  SELECT DISTINCT fk_digital AS id_digital
  FROM data.row
  --WHERE fk_digital = 82819
  ORDER BY fk_digital
)
SELECT tables.create_cell_table_for_digital(id_digital)
FROM tw1;





-- 10
-- DROP  FUNCTION tables.create_cell_table_for_digital(pk_digital integer);

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
						    ON tables.cell_' || pk_digital::text || ' USING btree
						    (id_for_import_txt);

		  			CREATE INDEX cell_' || pk_digital::text || '_pk_cell_idx
						  ON tables.cell_' || pk_digital::text || '  USING btree(pk_cell);

						CREATE INDEX cell_' || pk_digital::text || '_string_value_idx
						  ON tables.cell_' || pk_digital::text || '  USING btree(string_value);

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




-- 12
/*
	This is the bigserial pk sequence created after the import of existing data
	using the max(pk_cell) value  :  24626438 + 1

SELECT MAX(pk_cell)
FROM tables.cell;

*/

CREATE SEQUENCE tables.cell_pk_cell_seq AS BIGINT INCREMENT 1;


-- 13
SELECT SETVAL('tables.cell_pk_cell_seq', COALESCE(MAX(pk_cell) + 1, 1))
FROM tables.cell;



-- 14
/*
	Sets the new sequence as pk_cell default value
*/

ALTER TABLE tables.cell
    ALTER COLUMN pk_cell SET DEFAULT nextval('tables.cell_pk_cell_seq');
