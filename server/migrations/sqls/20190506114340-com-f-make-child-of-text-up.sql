
-- 1. Create a function to make versioned table child of commons.text
CREATE FUNCTION commons.make_table_child_of_text(
	schema_and_table_name character varying,
     parent_table_name character varying
  )
    RETURNS void
    LANGUAGE 'plpgsql'
  AS $BODY$

    BEGIN

      -- Do the Magic:

      EXECUTE format('	
        ------ PREPARE THE TABLE
            
        UPDATE %1$s SET entity_version = 1 WHERE entity_version IS NULL;

        ALTER TABLE %1$s ALTER COLUMN entity_version SET NOT NULL;

        -- SET schema_name NOT NULL
        ALTER TABLE %1$s ALTER COLUMN schema_name SET NOT NULL;

        -- SET table_name NOT NULL
        ALTER TABLE %1$s ALTER COLUMN table_name SET NOT NULL;

        -- Add the column for the pk_text and fill the new pk_text column
        ALTER TABLE %1$s
        ADD COLUMN pk_text integer NOT NULL DEFAULT nextval(''commons.text_pk_text_seq'');

        -- Add the column for quill_doc and fill it with empty QuillDoc
        ALTER TABLE %1$s ADD COLUMN quill_doc jsonb;
        UPDATE %1$s SET quill_doc = jsonb_build_object(''latestId'', 0, ''ops'', ARRAY[]::integer[]) WHERE quill_doc IS NULL;
        ALTER TABLE %1$s ALTER COLUMN quill_doc SET NOT NULL;  

        -- Add the schema validation check
        ALTER TABLE %1$s
        ADD CONSTRAINT text_quill_doc_check CHECK (commons.validate_quill_doc(quill_doc));

        -- Add the column for string and fill with empty string
        ALTER TABLE %1$s  ADD COLUMN string text;
        UPDATE %1$s SET string = '''' WHERE string IS NULL;
        ALTER TABLE %1$s ALTER COLUMN string SET NOT NULL;  

        ---- SET THE INHERITANCE
        ALTER TABLE %1$s
        INHERIT commons.%2$s;

      ',    
        schema_and_table_name,
        parent_table_name
      );
        
    END 
    $BODY$;


-- 3. Create a function to make versioned table child of commons.text
CREATE FUNCTION commons.make_versioned_table_child_of_text(
	schema_and_table_name character varying
  )
    RETURNS void
    LANGUAGE 'plpgsql'
  AS $BODY$ BEGIN
     
    PERFORM commons.make_table_child_of_text(schema_and_table_name, 'text');
    PERFORM commons.make_table_child_of_text(schema_and_table_name || '_vt', 'text_vt');
    
    EXECUTE format('	
        -- Create trigger for syncing quill_doc and string
        CREATE TRIGGER sync_quill_doc_and_string
        BEFORE INSERT OR UPDATE
        ON %1$s
        FOR EACH ROW
        EXECUTE PROCEDURE commons.text__sync_quill_doc_and_string();
    ', schema_and_table_name);

        
  END $BODY$;



-- 3. Create a function to unmake versioned table child of commons.text
CREATE FUNCTION commons.unmake_table_child_of_text(
	schema_and_table_name character varying,
    parent_table_name character varying
  )
    RETURNS void
    LANGUAGE 'plpgsql'
  AS $BODY$

    BEGIN

      EXECUTE format('	
    ALTER TABLE %1$s NO INHERIT commons.%2$s;

    ALTER TABLE %1$s DROP COLUMN string;

    ALTER TABLE %1$s DROP CONSTRAINT text_quill_doc_check;

    ALTER TABLE %1$s DROP COLUMN quill_doc;

    ALTER TABLE %1$s DROP COLUMN pk_text;

      ',    
        schema_and_table_name,
        parent_table_name
      );
        
    END 
    $BODY$;


-- 4. Create a function to unmake versioned table child of commons.text
CREATE FUNCTION commons.unmake_versioned_table_child_of_text(
	schema_and_table_name character varying
  )
    RETURNS void
    LANGUAGE 'plpgsql'
  AS $BODY$ BEGIN
     
    PERFORM commons.unmake_table_child_of_text(schema_and_table_name, 'text');
    PERFORM commons.unmake_table_child_of_text(schema_and_table_name || '_vt', 'text_vt');

    EXECUTE format('
        DROP TRIGGER sync_quill_doc_and_string ON %1$s;
    ', schema_and_table_name);
        
  END $BODY$;


