
-- 1. Create a function to change the reference of a FK
CREATE FUNCTION commons.change_fk_reference_of_versioned_table(
	 	schema_name varchar,
    table_name varchar,
    fk_column varchar,
    referenced_schema_and_table_name varchar,
    old_referenced_column varchar,
    new_referenced_column varchar,
    fk_col_not_null boolean DEFAULT true::boolean
  )
    RETURNS void
    LANGUAGE 'plpgsql'
  AS $BODY$ BEGIN
     
    EXECUTE format('
      
        DROP TRIGGER IF EXISTS create_entity_version_key ON %1$s.%2$s;
        DROP TRIGGER IF EXISTS creation_tmsp ON %1$s.%2$s;
        DROP TRIGGER IF EXISTS insert_schema_table_name ON %1$s.%2$s;
        DROP TRIGGER IF EXISTS last_modification_tmsp ON %1$s.%2$s;
        DROP TRIGGER IF EXISTS update_entity_version_key ON %1$s.%2$s;
        DROP TRIGGER IF EXISTS versioning_trigger ON %1$s.%2$s;


        -- table
        ALTER TABLE %1$s.%2$s RENAME COLUMN %3$s TO _deprecated_%3$s;
        ALTER TABLE %1$s.%2$s ADD COLUMN %3$s integer;
        UPDATE %1$s.%2$s
        SET %3$s = subq.%6$s
        FROM (
            SELECT %6$s, %5$s
            FROM %4$s
        ) as subq
        WHERE _deprecated_%3$s = subq.%5$s;

        ALTER TABLE %1$s.%2$s 
          DROP CONSTRAINT IF EXISTS %2$s_%3$s_fkey;  
        
        ALTER TABLE %1$s.%2$s ADD FOREIGN KEY (%3$s) REFERENCES %4$s (%6$s);

        -- table_vt
        ALTER TABLE %1$s.%2$s_vt RENAME COLUMN %3$s TO _deprecated_%3$s;
        ALTER TABLE %1$s.%2$s_vt ADD COLUMN %3$s integer;
        UPDATE %1$s.%2$s_vt
        SET %3$s = subq.%6$s
        FROM (
            SELECT %6$s, %5$s
            FROM %4$s
        ) as subq
        WHERE _deprecated_%3$s = subq.%5$s;

        ALTER TABLE %1$s.%2$s_vt 
          DROP CONSTRAINT IF EXISTS %2$s_vt_%3$s_fkey;  

        ALTER TABLE %1$s.%2$s_vt ADD FOREIGN KEY (%3$s) REFERENCES %4$s (%6$s);

        SELECT commons.reinit_versioning_triggers(''%1$s.%2$s'');

        -- Trigger: creation_tmsp
        CREATE TRIGGER creation_tmsp
            BEFORE INSERT
            ON %1$s.%2$s
            FOR EACH ROW
            EXECUTE PROCEDURE commons.tmsp_creation();

        -- Trigger: insert_schema_table_name
        CREATE TRIGGER insert_schema_table_name
            BEFORE INSERT
            ON %1$s.%2$s
            FOR EACH ROW
            EXECUTE PROCEDURE commons.insert_schema_table_name();

        -- Trigger: last_modification_tmsp
        CREATE TRIGGER last_modification_tmsp
            BEFORE INSERT OR UPDATE 
            ON %1$s.%2$s
            FOR EACH ROW
            EXECUTE PROCEDURE commons.tmsp_last_modification();



    ', 
        schema_name,
        table_name,
        fk_column,
        referenced_schema_and_table_name,
        old_referenced_column,
        new_referenced_column
    );


    IF (fk_col_not_null = true) THEN
      EXECUTE format('
            ALTER TABLE %1$s.%2$s ALTER COLUMN %3$s SET NOT NULL;
      ', schema_name,
        table_name,
        fk_column );
    END IF;

        
  END $BODY$;


-- 2. Create unmake change fk reference
CREATE FUNCTION commons.unmake_change_fk_reference_of_versioned_table(
	schema_name varchar,
    table_name varchar,
    fk_column varchar
  )
    RETURNS void
    LANGUAGE 'plpgsql'
  AS $BODY$ BEGIN
     
    EXECUTE format('
      
    DROP TRIGGER IF EXISTS creation_tmsp ON %1$s.%2$s;
    DROP TRIGGER IF EXISTS insert_schema_table_name ON %1$s.%2$s;
    DROP TRIGGER IF EXISTS last_modification_tmsp ON %1$s.%2$s;

    DROP TRIGGER IF EXISTS versioning_trigger ON %1$s.%2$s;
    DROP TRIGGER IF EXISTS create_entity_version_key ON %1$s.%2$s;
    DROP TRIGGER IF EXISTS update_entity_version_key ON %1$s.%2$s;

    -- table_vt
    ALTER TABLE %1$s.%2$s_vt DROP CONSTRAINT %2$s_vt_%3$s_fkey;
    UPDATE %1$s.%2$s_vt
    SET %3$s = _deprecated_%3$s;
    ALTER TABLE %1$s.%2$s_vt DROP COLUMN %3$s;
    ALTER TABLE %1$s.%2$s_vt RENAME COLUMN _deprecated_%3$s TO %3$s;

    -- table
    ALTER TABLE %1$s.%2$s DROP CONSTRAINT %2$s_%3$s_fkey;
    UPDATE %1$s.%2$s
    SET %3$s = _deprecated_%3$s;
    ALTER TABLE %1$s.%2$s DROP COLUMN %3$s;
    ALTER TABLE %1$s.%2$s RENAME COLUMN _deprecated_%3$s TO %3$s;


    SELECT commons.reinit_versioning_triggers(''%1$s.%2$s'');

    -- Trigger: creation_tmsp
    CREATE TRIGGER creation_tmsp
        BEFORE INSERT
        ON %1$s.%2$s
        FOR EACH ROW
        EXECUTE PROCEDURE commons.tmsp_creation();

    -- Trigger: insert_schema_table_name
    CREATE TRIGGER insert_schema_table_name
        BEFORE INSERT
        ON %1$s.%2$s
        FOR EACH ROW
        EXECUTE PROCEDURE commons.insert_schema_table_name();

    -- Trigger: last_modification_tmsp
    CREATE TRIGGER last_modification_tmsp
        BEFORE INSERT OR UPDATE 
        ON %1$s.%2$s
        FOR EACH ROW
        EXECUTE PROCEDURE commons.tmsp_last_modification();
    ', 
        schema_name,
        table_name,
        fk_column
    );
        
  END $BODY$;
