-- 1. Move all the function from renamed projects schema to commons schema

ALTER FUNCTION projects.appellation_label_to_quill_doc SET SCHEMA commons;

ALTER FUNCTION projects.create_entity_version_key SET SCHEMA commons;

ALTER FUNCTION projects.evpr_fk_entity_fk_entity_version SET SCHEMA commons;

ALTER FUNCTION projects.init_entity_child_table SET SCHEMA commons;

ALTER FUNCTION projects.insert_schema_table_name SET SCHEMA commons;

ALTER FUNCTION projects.modernize_quill_doc SET SCHEMA commons;

ALTER FUNCTION projects.quill_doc_to_text SET SCHEMA commons;

ALTER FUNCTION projects.text_to_quill_doc SET SCHEMA commons;

ALTER FUNCTION projects.tmsp_creation SET SCHEMA commons;

ALTER FUNCTION projects.tmsp_last_modification SET SCHEMA commons;

ALTER FUNCTION projects.update_entity_version_key SET SCHEMA commons;

ALTER FUNCTION projects.validate_json_schema SET SCHEMA commons;

ALTER FUNCTION projects._validate_json_schema_type SET SCHEMA commons;

ALTER FUNCTION projects.validate_quill_doc SET SCHEMA commons;

ALTER FUNCTION commons.quill_doc_to_text RENAME TO quill_doc_to_string;

ALTER FUNCTION commons.text_to_quill_doc RENAME TO string_to_quill_doc;

-- 3. Create the generic text table

CREATE TABLE commons.text (
    pk_text serial PRIMARY KEY, 
    schema_name character varying NOT NULL, 
    table_name character varying NOT NULL,
    entity_version integer NOT NULL,
    quill_doc jsonb NOT NULL CHECK (commons.validate_quill_doc(quill_doc)),
    string text NOT NULL
);

-- 4. Create the text_vt

CREATE TABLE commons.text_vt (LIKE commons.text);

-- 5. Create trigger function for syncing quill_doc and string


CREATE OR REPLACE FUNCTION commons.text__sync_quill_doc_and_string()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF 
AS $BODY$
  DECLARE
    string_is_new boolean;
    quill_doc_is_new boolean;
  BEGIN

    IF TG_OP = 'UPDATE' THEN
      string_is_new = (NEW.string IS NOT NULL AND NEW.string != OLD.string);
      quill_doc_is_new = (NEW.quill_doc IS NOT NULL AND NEW.quill_doc != OLD.quill_doc);
    ELSE 
      string_is_new = (NEW.string IS NOT NULL);
      quill_doc_is_new = (NEW.quill_doc IS NOT NULL);
    END IF;
        -- other code

    IF (string_is_new = true AND quill_doc_is_new = true) THEN
        RAISE EXCEPTION 'You can not provide a string and a quill_doc at the same time when upserting a text.';
    ELSIF string_is_new = true THEN
        NEW.quill_doc = commons.string_to_quill_doc(NEW.string);
    ELSIF quill_doc_is_new = true THEN
        NEW.string = commons.quill_doc_to_string(NEW.quill_doc);
    ELSIF NEW.string IS NULL AND NEW.quill_doc IS  NULL THEN
        RAISE EXCEPTION 'No string or quill_doc provided on upsert of a text.';
    END IF;

  RETURN NEW;
  END;
  $BODY$;
-- 6. Create trigger for syncing quill_doc and string
CREATE TRIGGER sync_quill_doc_and_string
    BEFORE INSERT OR UPDATE
    ON commons.text
    FOR EACH ROW
    EXECUTE PROCEDURE commons.text__sync_quill_doc_and_string();



-- 7. Create view of text versions
CREATE  VIEW commons.v_text_version AS
 SELECT t.*,
    concat((t.pk_text || '_'::text) || t.entity_version) AS pk_text_version
   FROM commons.text t
UNION ALL
 SELECT t.*,
    concat((t.pk_text || '_'::text) || t.entity_version) AS pk_text_version
   FROM commons.text_vt t;



-- 8. Create function to move tables with a version table (_vt)
CREATE FUNCTION commons.reinit_versioning_triggers(
	schema_and_table_name character varying,
	schema_and_table_vt_name character varying DEFAULT NULL::varchar
  )
    RETURNS void
    LANGUAGE 'plpgsql'
  AS $BODY$

    BEGIN

      IF schema_and_table_vt_name IS NULL THEN
        schema_and_table_vt_name = schema_and_table_name || '_vt';
      END IF;

      -- Do the Magic:

      EXECUTE format('	

        -- Trigger: versioning_trigger

        DROP TRIGGER IF EXISTS versioning_trigger ON %1$s;
        CREATE TRIGGER versioning_trigger
        BEFORE INSERT OR UPDATE OR DELETE ON %1$s
        FOR EACH ROW EXECUTE PROCEDURE versioning(
        "sys_period", ''%2$s'', true
        );

        -- Trigger: create_entity_version_key

        DROP TRIGGER IF EXISTS create_entity_version_key ON %1$s;
        CREATE TRIGGER create_entity_version_key
        BEFORE INSERT
        ON %1$s
        FOR EACH ROW
        EXECUTE PROCEDURE commons.create_entity_version_key();

        -- Trigger: update_entity_version_key

        DROP TRIGGER IF EXISTS update_entity_version_key ON %1$s;
        CREATE TRIGGER update_entity_version_key
        BEFORE UPDATE
        ON %1$s
        FOR EACH ROW
        EXECUTE PROCEDURE commons.update_entity_version_key();',          
        schema_and_table_name,
        schema_and_table_vt_name
      );
        
    END 
    $BODY$;




-- 9. Create function to change the parent entity table
CREATE FUNCTION commons.change_parent_entity_table(
	child_schema_and_table_name character varying,
	old_parent_schema_and_table_name character varying,
	new_parent_schema_and_table_name character varying
  )
    RETURNS void
    LANGUAGE 'plpgsql'
  AS $BODY$

    BEGIN

      -- Do the Magic:

      EXECUTE format('	
          ALTER TABLE %1$s ALTER COLUMN schema_name SET NOT NULL;
          ALTER TABLE %1$s ALTER COLUMN table_name SET NOT NULL;
          UPDATE %1$s SET entity_version = 1 WHERE entity_version IS NULL;
          ALTER TABLE %1$s ALTER COLUMN entity_version SET NOT NULL;

          ALTER TABLE %1$s NO INHERIT %2$s;
          ALTER TABLE %1$s INHERIT %3$s;
          SELECT setval(''%3$s_pk_entity_seq'', (SELECT MAX(pk_entity) FROM %1$s));      
      ',          
        child_schema_and_table_name,
        old_parent_schema_and_table_name,
        new_parent_schema_and_table_name
      );
        
    END 
    $BODY$;




-- 10. Create function to move entity child table with versioning to another schema
CREATE FUNCTION commons.move_entity_child_with_vt_to_schema(
	table_name character varying,
	old_schema character varying,
	new_schema character varying
  )
    RETURNS void
    LANGUAGE 'plpgsql'
  AS $BODY$

    BEGIN

      -- Do the Magic:

      EXECUTE format('	
        -- MOVE TABLES
        ALTER TABLE %2$s.%1$s SET SCHEMA %3$s;
        ALTER TABLE %2$s.%1$s_vt SET SCHEMA %3$s;

        -- REINIT VERSIONING TRIGGERS
        SELECT commons.reinit_versioning_triggers(''%3$s.%1$s'');

        -- CHANGE PARENT ENTITY TABLE
        SELECT commons.change_parent_entity_table(''%3$s.%1$s'', ''%2$s.entity'', ''%3$s.entity'')
      ',          
        table_name,
        old_schema,
        new_schema
      );
        
    END 
    $BODY$;

-- 11. Rename table with version table
CREATE FUNCTION commons.rename_versioned_table(
  schema character varying,
	old_table_name character varying,
	new_table_name character varying
  )
    RETURNS void
    LANGUAGE 'plpgsql'
  AS $BODY$

    BEGIN

      -- Do the Magic:

      EXECUTE format('	
        ALTER TABLE %1$s.%2$s RENAME TO %3$s;
        ALTER TABLE %1$s.%2$s_vt RENAME TO %3$s_vt;
        SELECT commons.reinit_versioning_triggers(''%1$s.%3$s'');
      ',    
        schema,      
        old_table_name,
        new_table_name
      );
        
    END 
    $BODY$;


-- 12. Init version table (independend of being entity child)
CREATE OR REPLACE FUNCTION commons.init_version_table(
	schema_and_table_name character varying)
    RETURNS void
    LANGUAGE 'plpgsql'
AS $BODY$
    BEGIN


      -- Do the Magic:

      EXECUTE format('	

        ALTER TABLE %1$s ADD COLUMN IF NOT EXISTS 
          sys_period tstzrange DEFAULT tstzrange(now(), NULL::timestamp with time zone);
          
        -- Table: <schema_and_table_name>_vt

        CREATE TABLE %1$s_vt (LIKE %1$s);

        -- Trigger: versioning_trigger

        CREATE TRIGGER versioning_trigger
        BEFORE INSERT OR UPDATE OR DELETE ON %1$s
        FOR EACH ROW EXECUTE PROCEDURE versioning(
        "sys_period", ''%1$s_vt'', true
        );

        -- Trigger: create_entity_version_key

        CREATE TRIGGER create_entity_version_key
        BEFORE INSERT
        ON %1$s
        FOR EACH ROW
        EXECUTE PROCEDURE commons.create_entity_version_key();

        -- Trigger: update_entity_version_key

        CREATE TRIGGER update_entity_version_key
        BEFORE UPDATE
        ON %1$s
        FOR EACH ROW
        EXECUTE PROCEDURE commons.update_entity_version_key();',          
        schema_and_table_name
      );
        
    END 
    $BODY$;