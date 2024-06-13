DO $$
DECLARE
    rec RECORD;
BEGIN
    -- Loop through each pk_entity from projects.project
    FOR rec IN SELECT pk_entity FROM projects.project LOOP
        -- Execute the DROP TABLE statement for each pk_entity
        EXECUTE format(
            'DROP TABLE IF EXISTS pgwar.entity_preview_%1$s;',
            rec.pk_entity
        );
    END LOOP;
END;
$$;