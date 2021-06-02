DO $$
DECLARE
    fkdigitals integer ARRAY;
    fkdigital integer;
BEGIN
    SELECT
        array_agg(DISTINCT fk_digital) INTO fkdigitals
    FROM
        tables.row_old;
    IF fkdigitals IS NOT NULL THEN
        FOREACH fkdigital IN ARRAY (
            SELECT
                array_agg(DISTINCT fk_digital)
            FROM
                tables.row_old)
            LOOP

            EXECUTE 'ALTER TABLE tables.row_' || fkdigital::text || ' DISABLE TRIGGER create_entity_version_key;';
            EXECUTE 'ALTER TABLE tables.row_' || fkdigital::text || ' DISABLE TRIGGER creation_tmsp;';
            EXECUTE 'ALTER TABLE tables.row_' || fkdigital::text || ' DISABLE TRIGGER last_modification_tmsp;';
            EXECUTE 'ALTER TABLE tables.row_' || fkdigital::text || ' DISABLE TRIGGER update_entity_version_key;';
            
            END LOOP;
    END IF;
END
$$;