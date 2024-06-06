DO $$
DECLARE
    rec RECORD;
BEGIN
    -- Loop through each pk_entity from projects.project
    FOR rec IN SELECT pk_entity FROM projects.project LOOP
        -- Create a partition of pgwar.entity_preview for each project
        EXECUTE format(
            'CREATE TABLE pgwar.entity_preview_%1$s PARTITION OF pgwar.entity_preview FOR VALUES IN (%1$s);',
            rec.pk_entity
        );
    END LOOP;
END;
$$;