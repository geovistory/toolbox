--
-- PostgreSQL database dump
--

-- Dumped from database version 10.6 (Debian 10.6-1.pgdg90+1)
-- Dumped by pg_dump version 11.2

-- Started on 2019-05-15 15:21:04 CEST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 14 (class 2615 OID 244677)
-- Name: commons; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA commons;


--
-- TOC entry 16 (class 2615 OID 245291)
-- Name: data; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA data;


--
-- TOC entry 10 (class 2615 OID 240162)
-- Name: data_for_history; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA data_for_history;


--
-- TOC entry 9 (class 2615 OID 240161)
-- Name: information; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA information;


--
-- TOC entry 13 (class 2615 OID 240160)
-- Name: projects; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA projects;


--
-- TOC entry 15 (class 2615 OID 244678)
-- Name: system; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA system;


--
-- TOC entry 11 (class 2615 OID 242796)
-- Name: topology; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA IF NOT EXISTS topology;


--
-- TOC entry 6156 (class 0 OID 0)
-- Dependencies: 11
-- Name: SCHEMA topology; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA topology IS 'PostGIS Topology schema';


--
-- TOC entry 12 (class 2615 OID 243970)
-- Name: warehouse; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA warehouse;


--
-- TOC entry 2 (class 3079 OID 241297)
-- Name: postgis; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS postgis WITH SCHEMA public;


--
-- TOC entry 6157 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION postgis; Type: COMMENT; Schema: -; Owner: -
--

-- COMMENT ON EXTENSION postgis IS 'PostGIS geometry, geography, and raster spatial types and functions';


--
-- TOC entry 3 (class 3079 OID 242797)
-- Name: postgis_topology; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS postgis_topology; -- WITH SCHEMA topology;


--
-- TOC entry 6158 (class 0 OID 0)
-- Dependencies: 3
-- Name: EXTENSION postgis_topology; Type: COMMENT; Schema: -; Owner: -
--

-- COMMENT ON EXTENSION postgis_topology IS 'PostGIS topology spatial types and functions';


--
-- TOC entry 2522 (class 1247 OID 241176)
-- Name: calendar_granularities; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.calendar_granularities AS ENUM (
    '1 year',
    '1 month',
    '1 day',
    '1 hour',
    '1 minute',
    '1 second'
);


--
-- TOC entry 2532 (class 1247 OID 241228)
-- Name: calendar_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.calendar_type AS ENUM (
    'gregorian',
    'julian'
);


--
-- TOC entry 1725 (class 1255 OID 244670)
-- Name: _validate_json_schema_type(text, jsonb); Type: FUNCTION; Schema: commons; Owner: -
--

CREATE FUNCTION commons._validate_json_schema_type(type text, data jsonb) RETURNS boolean
    LANGUAGE plpgsql IMMUTABLE
    AS $$
  BEGIN
    IF type = 'integer' THEN
      IF jsonb_typeof(data) != 'number' THEN
        RETURN false;
      END IF;
      IF trunc(data::text::numeric) != data::text::numeric THEN
        RETURN false;
      END IF;
    ELSE
      IF type != jsonb_typeof(data) THEN
        RETURN false;
      END IF;
    END IF;
    RETURN true;
  END;
  $$;


--
-- TOC entry 1724 (class 1255 OID 244676)
-- Name: appellation_label_to_quill_doc(jsonb); Type: FUNCTION; Schema: commons; Owner: -
--

CREATE FUNCTION commons.appellation_label_to_quill_doc(orig jsonb) RETURNS jsonb
    LANGUAGE plpgsql IMMUTABLE
    AS $$
      
    BEGIN
      RETURN commons.text_to_quill_doc(information.appellation_label_to_string(orig));
    END;
  $$;


--
-- TOC entry 1739 (class 1255 OID 244800)
-- Name: change_fk_reference_of_versioned_table(character varying, character varying, character varying, character varying, character varying, character varying, boolean); Type: FUNCTION; Schema: commons; Owner: -
--

CREATE FUNCTION commons.change_fk_reference_of_versioned_table(schema_name character varying, table_name character varying, fk_column character varying, referenced_schema_and_table_name character varying, old_referenced_column character varying, new_referenced_column character varying, fk_col_not_null boolean DEFAULT true) RETURNS void
    LANGUAGE plpgsql
    AS $_$ BEGIN
     
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

        
  END $_$;


--
-- TOC entry 1731 (class 1255 OID 244705)
-- Name: change_parent_entity_table(character varying, character varying, character varying); Type: FUNCTION; Schema: commons; Owner: -
--

CREATE FUNCTION commons.change_parent_entity_table(child_schema_and_table_name character varying, old_parent_schema_and_table_name character varying, new_parent_schema_and_table_name character varying) RETURNS void
    LANGUAGE plpgsql
    AS $_$

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
    $_$;


--
-- TOC entry 470 (class 1255 OID 240169)
-- Name: create_entity_version_key(); Type: FUNCTION; Schema: commons; Owner: -
--

CREATE FUNCTION commons.create_entity_version_key() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
  BEGIN
  NEW.entity_version = 1;
  RETURN NEW;
  END;
  $$;


--
-- TOC entry 475 (class 1255 OID 241295)
-- Name: evpr_fk_entity_fk_entity_version(); Type: FUNCTION; Schema: commons; Owner: -
--

CREATE FUNCTION commons.evpr_fk_entity_fk_entity_version() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
        DECLARE
        result text;
  
    BEGIN
    
    -- Added if condition:
    -- only if there is a fk_entity_version_concat, generate fk_entity and fk_entity_version

    IF (NEW.fk_entity_version_concat IS NOT NULL) THEN
      NEW.fk_entity = split_part(NEW.fk_entity_version_concat, '_', 1)::integer;
      NEW.fk_entity_version = split_part(NEW.fk_entity_version_concat, '_', 2)::integer;
    END IF;
      
    RETURN NEW;
    END;
    
  $$;


--
-- TOC entry 468 (class 1255 OID 243541)
-- Name: init_entity_child_table(character varying); Type: FUNCTION; Schema: commons; Owner: -
--

CREATE FUNCTION commons.init_entity_child_table(schema_and_table_name character varying) RETURNS void
    LANGUAGE plpgsql
    AS $_$
    DECLARE
      unique_constraint_name varchar;
    BEGIN

      -- Create the name of the unique constraint that will be applied to the new table's pk_entity  

      SELECT INTO unique_constraint_name replace( schema_and_table_name , '.' , '_' )_pk_entity_unique;
        
      -- Do the Magic:

      EXECUTE format('	
            
        -- Add unique constraint to pk_entity of the new table, so that it can be referenced by foreign keys

        ALTER TABLE %1$s ADD CONSTRAINT  %2$s_pk_entity_unique UNIQUE (pk_entity);
            
        -- Trigger: creation_tmsp

        CREATE TRIGGER creation_tmsp
        BEFORE INSERT
        ON %1$s
        FOR EACH ROW
        EXECUTE PROCEDURE commons.tmsp_creation();

        -- Trigger: insert_schema_table_name

        CREATE TRIGGER insert_schema_table_name
        BEFORE INSERT
        ON %1$s
        FOR EACH ROW
        EXECUTE PROCEDURE commons.insert_schema_table_name();

        -- Trigger: last_modification_tmsp

        CREATE TRIGGER last_modification_tmsp
        BEFORE INSERT OR UPDATE
        ON %1$s
        FOR EACH ROW
        EXECUTE PROCEDURE commons.tmsp_last_modification();

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
        schema_and_table_name, 
        unique_constraint_name

      );
        
    END 
    $_$;


--
-- TOC entry 1734 (class 1255 OID 244708)
-- Name: init_version_table(character varying); Type: FUNCTION; Schema: commons; Owner: -
--

CREATE FUNCTION commons.init_version_table(schema_and_table_name character varying) RETURNS void
    LANGUAGE plpgsql
    AS $_$
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
    $_$;


--
-- TOC entry 471 (class 1255 OID 240168)
-- Name: insert_schema_table_name(); Type: FUNCTION; Schema: commons; Owner: -
--

CREATE FUNCTION commons.insert_schema_table_name() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
  -- source https://www.postgresql.org/docs/current/static/plpgsql-trigger.html
  BEGIN
  NEW.schema_name = TG_TABLE_SCHEMA;
  NEW.table_name = TG_TABLE_NAME;
  RETURN NEW;
  END;
  $$;


--
-- TOC entry 1735 (class 1255 OID 244796)
-- Name: make_table_child_of_text(character varying, character varying); Type: FUNCTION; Schema: commons; Owner: -
--

CREATE FUNCTION commons.make_table_child_of_text(schema_and_table_name character varying, parent_table_name character varying) RETURNS void
    LANGUAGE plpgsql
    AS $_$

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
        ALTER TABLE %1$s  ADD COLUMN string text DEFAULT '''';
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
    $_$;


--
-- TOC entry 1736 (class 1255 OID 244797)
-- Name: make_versioned_table_child_of_text(character varying); Type: FUNCTION; Schema: commons; Owner: -
--

CREATE FUNCTION commons.make_versioned_table_child_of_text(schema_and_table_name character varying) RETURNS void
    LANGUAGE plpgsql
    AS $_$ BEGIN
     
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

        
  END $_$;


--
-- TOC entry 1723 (class 1255 OID 244669)
-- Name: modernize_quill_doc(jsonb); Type: FUNCTION; Schema: commons; Owner: -
--

CREATE FUNCTION commons.modernize_quill_doc(orig jsonb) RETURNS jsonb
    LANGUAGE plpgsql IMMUTABLE
    AS $$
    DECLARE
      newJ jsonb;
      latestId int;
      newOps jsonb;
      oldOp jsonb;
      char text;
    BEGIN
      newOps = jsonb_build_array();
      latestId = 0;
      
      -- LOOP over ops
      FOR oldOp IN SELECT * FROM jsonb_array_elements((orig->'contents'->>'ops')::jsonb)
        LOOP
      
          RAISE NOTICE 'Parsing Item % % %', oldOp->>'insert', oldOp->>'attributes', (SELECT char_length(oldOp->>'insert') > 1);
          
          
          -- LOOP over insert characters
          FOREACH char IN ARRAY (SELECT chars FROM (SELECT regexp_split_to_array(oldOp->>'insert','')) AS x(chars))
          LOOP 
            latestId = latestId + 1;	
			
			IF char = E'\n' THEN
				newOps = newOps || jsonb_build_object(
				  'insert', char,
				  'attributes', jsonb_set(COALESCE(oldOp->'attributes', '{}'::jsonb), '{blockid}'::text[],  to_json(latestId::text)::jsonb)
				);
			ELSE
				 newOps = newOps || jsonb_build_object(
				  'insert', char,
				  'attributes', jsonb_set(COALESCE(oldOp->'attributes', '{}'::jsonb) - 'node', '{charid}'::text[], to_json(latestId::text)::jsonb)
				);
			END IF;
          END LOOP;
      
        
      END LOOP;
      
      RAISE NOTICE 'New Ops: %', newOps;
		
	  
      newJ = jsonb_build_object('latestId',latestId, 'ops', newOps);

      RETURN newJ;
    END;
    $$;


--
-- TOC entry 1732 (class 1255 OID 244706)
-- Name: move_entity_child_with_vt_to_schema(character varying, character varying, character varying); Type: FUNCTION; Schema: commons; Owner: -
--

CREATE FUNCTION commons.move_entity_child_with_vt_to_schema(table_name character varying, old_schema character varying, new_schema character varying) RETURNS void
    LANGUAGE plpgsql
    AS $_$

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
    $_$;


--
-- TOC entry 1726 (class 1255 OID 244675)
-- Name: quill_doc_to_string(jsonb); Type: FUNCTION; Schema: commons; Owner: -
--

CREATE FUNCTION commons.quill_doc_to_string(text_property_quill_doc jsonb, OUT string text) RETURNS text
    LANGUAGE sql
    AS $$
        
          SELECT TRIM( TRAILING E'
' FROM STRING_AGG(l.ops->>'insert', ''))
          FROM (SELECT jsonb_array_elements(text_property_quill_doc->'ops') as ops) as l
    $$;


--
-- TOC entry 1730 (class 1255 OID 244704)
-- Name: reinit_versioning_triggers(character varying, character varying); Type: FUNCTION; Schema: commons; Owner: -
--

CREATE FUNCTION commons.reinit_versioning_triggers(schema_and_table_name character varying, schema_and_table_vt_name character varying DEFAULT NULL::character varying) RETURNS void
    LANGUAGE plpgsql
    AS $_$

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
    $_$;


--
-- TOC entry 1733 (class 1255 OID 244707)
-- Name: rename_versioned_table(character varying, character varying, character varying); Type: FUNCTION; Schema: commons; Owner: -
--

CREATE FUNCTION commons.rename_versioned_table(schema character varying, old_table_name character varying, new_table_name character varying) RETURNS void
    LANGUAGE plpgsql
    AS $_$

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
    $_$;


--
-- TOC entry 1728 (class 1255 OID 244674)
-- Name: string_to_quill_doc(text); Type: FUNCTION; Schema: commons; Owner: -
--

CREATE FUNCTION commons.string_to_quill_doc(text text) RETURNS jsonb
    LANGUAGE plpgsql IMMUTABLE
    AS $$
    DECLARE
      latestId int;
      ops jsonb;
      char text;
    BEGIN
      ops = jsonb_build_array();
      latestId = 1;

      -- LOOP over text characters
      FOREACH char IN ARRAY (SELECT chars FROM (SELECT regexp_split_to_array(text,'')) AS x(chars))
      LOOP 


      IF char = E'
' THEN
        ops = ops || jsonb_build_object(
          'insert', char,
          'attributes', jsonb_build_object('blockid',  to_json(latestId::text)::jsonb)
        );
      ELSE
        ops = ops || jsonb_build_object(
          'insert', char,
          'attributes', jsonb_build_object('charid',  to_json(latestId::text)::jsonb)
        );
      END IF;


      latestId = latestId + 1;
      END LOOP;

        ops = ops || jsonb_build_object(
        'insert', E'
',
        'attributes', jsonb_build_object('blockid', to_json(latestId::text)::jsonb)
      );

      RETURN jsonb_build_object('latestId',latestId, 'ops', ops);
    END;
    $$;


--
-- TOC entry 1729 (class 1255 OID 244698)
-- Name: text__sync_quill_doc_and_string(); Type: FUNCTION; Schema: commons; Owner: -
--

CREATE FUNCTION commons.text__sync_quill_doc_and_string() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
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
  $$;


--
-- TOC entry 472 (class 1255 OID 240166)
-- Name: tmsp_creation(); Type: FUNCTION; Schema: commons; Owner: -
--

CREATE FUNCTION commons.tmsp_creation() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
  BEGIN
  NEW.tmsp_creation = NOW();
  RETURN NEW;
  END;
  $$;


--
-- TOC entry 473 (class 1255 OID 240167)
-- Name: tmsp_last_modification(); Type: FUNCTION; Schema: commons; Owner: -
--

CREATE FUNCTION commons.tmsp_last_modification() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
  BEGIN NEW.tmsp_last_modification = NOW();
  RETURN NEW;
  END;
  $$;


--
-- TOC entry 1740 (class 1255 OID 244801)
-- Name: unmake_change_fk_reference_of_versioned_table(character varying, character varying, character varying); Type: FUNCTION; Schema: commons; Owner: -
--

CREATE FUNCTION commons.unmake_change_fk_reference_of_versioned_table(schema_name character varying, table_name character varying, fk_column character varying) RETURNS void
    LANGUAGE plpgsql
    AS $_$ BEGIN
     
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
        
  END $_$;


--
-- TOC entry 1737 (class 1255 OID 244798)
-- Name: unmake_table_child_of_text(character varying, character varying); Type: FUNCTION; Schema: commons; Owner: -
--

CREATE FUNCTION commons.unmake_table_child_of_text(schema_and_table_name character varying, parent_table_name character varying) RETURNS void
    LANGUAGE plpgsql
    AS $_$

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
    $_$;


--
-- TOC entry 1738 (class 1255 OID 244799)
-- Name: unmake_versioned_table_child_of_text(character varying); Type: FUNCTION; Schema: commons; Owner: -
--

CREATE FUNCTION commons.unmake_versioned_table_child_of_text(schema_and_table_name character varying) RETURNS void
    LANGUAGE plpgsql
    AS $_$ BEGIN
     
    PERFORM commons.unmake_table_child_of_text(schema_and_table_name, 'text');
    PERFORM commons.unmake_table_child_of_text(schema_and_table_name || '_vt', 'text_vt');

    EXECUTE format('
        DROP TRIGGER sync_quill_doc_and_string ON %1$s;
    ', schema_and_table_name);
        
  END $_$;


--
-- TOC entry 474 (class 1255 OID 240170)
-- Name: update_entity_version_key(); Type: FUNCTION; Schema: commons; Owner: -
--

CREATE FUNCTION commons.update_entity_version_key() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
  BEGIN
  NEW.entity_version :=  NEW.entity_version + 1;
  RETURN NEW;
  END;
  $$;


--
-- TOC entry 1722 (class 1255 OID 244671)
-- Name: validate_json_schema(jsonb, jsonb, jsonb); Type: FUNCTION; Schema: commons; Owner: -
--

CREATE FUNCTION commons.validate_json_schema(schema jsonb, data jsonb, root_schema jsonb DEFAULT NULL::jsonb) RETURNS boolean
    LANGUAGE plpgsql IMMUTABLE
    AS $_$
  DECLARE
    prop text;
    item jsonb;
    path text[];
    types text[];
    pattern text;
    props text[];
  BEGIN
    IF root_schema IS NULL THEN
      root_schema = schema;
    END IF;

    IF schema ? 'type' THEN
      IF jsonb_typeof(schema->'type') = 'array' THEN
        types = ARRAY(SELECT jsonb_array_elements_text(schema->'type'));
      ELSE
        types = ARRAY[schema->>'type'];
      END IF;
      IF (SELECT NOT bool_or(commons._validate_json_schema_type(type, data)) FROM unnest(types) type) THEN
        RETURN false;
      END IF;
    END IF;

    IF schema ? 'properties' THEN
      FOR prop IN SELECT jsonb_object_keys(schema->'properties') LOOP
        IF data ? prop AND NOT commons.validate_json_schema(schema->'properties'->prop, data->prop, root_schema) THEN
          RETURN false;
        END IF;
      END LOOP;
    END IF;

    IF schema ? 'required' AND jsonb_typeof(data) = 'object' THEN
      IF NOT ARRAY(SELECT jsonb_object_keys(data)) @>
            ARRAY(SELECT jsonb_array_elements_text(schema->'required')) THEN
        RETURN false;
      END IF;
    END IF;

    IF schema ? 'items' AND jsonb_typeof(data) = 'array' THEN
      IF jsonb_typeof(schema->'items') = 'object' THEN
        FOR item IN SELECT jsonb_array_elements(data) LOOP
          IF NOT commons.validate_json_schema(schema->'items', item, root_schema) THEN
            RETURN false;
          END IF;
        END LOOP;
      ELSE
        IF NOT (
          SELECT bool_and(i > jsonb_array_length(schema->'items') OR commons.validate_json_schema(schema->'items'->(i::int - 1), elem, root_schema))
          FROM jsonb_array_elements(data) WITH ORDINALITY AS t(elem, i)
        ) THEN
          RETURN false;
        END IF;
      END IF;
    END IF;

    IF jsonb_typeof(schema->'additionalItems') = 'boolean' and NOT (schema->'additionalItems')::text::boolean AND jsonb_typeof(schema->'items') = 'array' THEN
      IF jsonb_array_length(data) > jsonb_array_length(schema->'items') THEN
        RETURN false;
      END IF;
    END IF;

    IF jsonb_typeof(schema->'additionalItems') = 'object' THEN
      IF NOT (
          SELECT bool_and(validate_json_schema(schema->'additionalItems', elem, root_schema))
          FROM jsonb_array_elements(data) WITH ORDINALITY AS t(elem, i)
          WHERE i > jsonb_array_length(schema->'items')
        ) THEN
        RETURN false;
      END IF;
    END IF;

    IF schema ? 'minimum' AND jsonb_typeof(data) = 'number' THEN
      IF data::text::numeric < (schema->>'minimum')::numeric THEN
        RETURN false;
      END IF;
    END IF;

    IF schema ? 'maximum' AND jsonb_typeof(data) = 'number' THEN
      IF data::text::numeric > (schema->>'maximum')::numeric THEN
        RETURN false;
      END IF;
    END IF;

    IF COALESCE((schema->'exclusiveMinimum')::text::bool, FALSE) THEN
      IF data::text::numeric = (schema->>'minimum')::numeric THEN
        RETURN false;
      END IF;
    END IF;

    IF COALESCE((schema->'exclusiveMaximum')::text::bool, FALSE) THEN
      IF data::text::numeric = (schema->>'maximum')::numeric THEN
        RETURN false;
      END IF;
    END IF;

    IF schema ? 'anyOf' THEN
      IF NOT (SELECT bool_or(validate_json_schema(sub_schema, data, root_schema)) FROM jsonb_array_elements(schema->'anyOf') sub_schema) THEN
        RETURN false;
      END IF;
    END IF;

    IF schema ? 'allOf' THEN
      IF NOT (SELECT bool_and(validate_json_schema(sub_schema, data, root_schema)) FROM jsonb_array_elements(schema->'allOf') sub_schema) THEN
        RETURN false;
      END IF;
    END IF;

    IF schema ? 'oneOf' THEN
      IF 1 != (SELECT COUNT(*) FROM jsonb_array_elements(schema->'oneOf') sub_schema WHERE commons.validate_json_schema(sub_schema, data, root_schema)) THEN
        RETURN false;
      END IF;
    END IF;

    IF COALESCE((schema->'uniqueItems')::text::boolean, false) THEN
      IF (SELECT COUNT(*) FROM jsonb_array_elements(data)) != (SELECT count(DISTINCT val) FROM jsonb_array_elements(data) val) THEN
        RETURN false;
      END IF;
    END IF;

    IF schema ? 'additionalProperties' AND jsonb_typeof(data) = 'object' THEN
      props := ARRAY(
        SELECT key
        FROM jsonb_object_keys(data) key
        WHERE key NOT IN (SELECT jsonb_object_keys(schema->'properties'))
          AND NOT EXISTS (SELECT * FROM jsonb_object_keys(schema->'patternProperties') pat WHERE key ~ pat)
      );
      IF jsonb_typeof(schema->'additionalProperties') = 'boolean' THEN
        IF NOT (schema->'additionalProperties')::text::boolean AND jsonb_typeof(data) = 'object' AND NOT props <@ ARRAY(SELECT jsonb_object_keys(schema->'properties')) THEN
          RETURN false;
        END IF;
      ELSEIF NOT (
        SELECT bool_and(validate_json_schema(schema->'additionalProperties', data->key, root_schema))
        FROM unnest(props) key
      ) THEN
        RETURN false;
      END IF;
    END IF;

    IF schema ? '$ref' THEN
      path := ARRAY(
        SELECT regexp_replace(regexp_replace(path_part, '~1', '/'), '~0', '~')
        FROM UNNEST(regexp_split_to_array(schema->>'$ref', '/')) path_part
      );
      -- ASSERT path[1] = '#', 'only refs anchored at the root are supported';
      IF NOT commons.validate_json_schema(root_schema #> path[2:array_length(path, 1)], data, root_schema) THEN
        RETURN false;
      END IF;
    END IF;

    IF schema ? 'enum' THEN
      IF NOT EXISTS (SELECT * FROM jsonb_array_elements(schema->'enum') val WHERE val = data) THEN
        RETURN false;
      END IF;
    END IF;

    IF schema ? 'minLength' AND jsonb_typeof(data) = 'string' THEN
      IF char_length(data #>> '{}') < (schema->>'minLength')::numeric THEN
        RETURN false;
      END IF;
    END IF;

    IF schema ? 'maxLength' AND jsonb_typeof(data) = 'string' THEN
      IF char_length(data #>> '{}') > (schema->>'maxLength')::numeric THEN
        RETURN false;
      END IF;
    END IF;

    IF schema ? 'not' THEN
      IF commons.validate_json_schema(schema->'not', data, root_schema) THEN
        RETURN false;
      END IF;
    END IF;

    IF schema ? 'maxProperties' AND jsonb_typeof(data) = 'object' THEN
      IF (SELECT count(*) FROM jsonb_object_keys(data)) > (schema->>'maxProperties')::numeric THEN
        RETURN false;
      END IF;
    END IF;

    IF schema ? 'minProperties' AND jsonb_typeof(data) = 'object' THEN
      IF (SELECT count(*) FROM jsonb_object_keys(data)) < (schema->>'minProperties')::numeric THEN
        RETURN false;
      END IF;
    END IF;

    IF schema ? 'maxItems' AND jsonb_typeof(data) = 'array' THEN
      IF (SELECT count(*) FROM jsonb_array_elements(data)) > (schema->>'maxItems')::numeric THEN
        RETURN false;
      END IF;
    END IF;

    IF schema ? 'minItems' AND jsonb_typeof(data) = 'array' THEN
      IF (SELECT count(*) FROM jsonb_array_elements(data)) < (schema->>'minItems')::numeric THEN
        RETURN false;
      END IF;
    END IF;

    IF schema ? 'dependencies' THEN
      FOR prop IN SELECT jsonb_object_keys(schema->'dependencies') LOOP
        IF data ? prop THEN
          IF jsonb_typeof(schema->'dependencies'->prop) = 'array' THEN
            IF NOT (SELECT bool_and(data ? dep) FROM jsonb_array_elements_text(schema->'dependencies'->prop) dep) THEN
              RETURN false;
            END IF;
          ELSE
            IF NOT commons.validate_json_schema(schema->'dependencies'->prop, data, root_schema) THEN
              RETURN false;
            END IF;
          END IF;
        END IF;
      END LOOP;
    END IF;

    IF schema ? 'pattern' AND jsonb_typeof(data) = 'string' THEN
      IF (data #>> '{}') !~ (schema->>'pattern') THEN
        RETURN false;
      END IF;
    END IF;

    IF schema ? 'patternProperties' AND jsonb_typeof(data) = 'object' THEN
      FOR prop IN SELECT jsonb_object_keys(data) LOOP
        FOR pattern IN SELECT jsonb_object_keys(schema->'patternProperties') LOOP
          RAISE NOTICE 'prop %s, pattern %, schema %', prop, pattern, schema->'patternProperties'->pattern;
          IF prop ~ pattern AND NOT commons.validate_json_schema(schema->'patternProperties'->pattern, data->prop, root_schema) THEN
            RETURN false;
          END IF;
        END LOOP;
      END LOOP;
    END IF;

    IF schema ? 'multipleOf' AND jsonb_typeof(data) = 'number' THEN
      IF data::text::numeric % (schema->>'multipleOf')::numeric != 0 THEN
        RETURN false;
      END IF;
    END IF;

    RETURN true;
  END;
  $_$;


--
-- TOC entry 1727 (class 1255 OID 244673)
-- Name: validate_quill_doc(jsonb); Type: FUNCTION; Schema: commons; Owner: -
--

CREATE FUNCTION commons.validate_quill_doc(quilldoc jsonb) RETURNS boolean
    LANGUAGE plpgsql IMMUTABLE
    AS $_$
  DECLARE
    isValid boolean;
  BEGIN
    SELECT INTO isValid commons.validate_json_schema('{
      "$schema": "http://json-schema.org/draft-06/schema#",
      "definitions": {
        "QuillDoc": {
          "type": "object",
          "properties": {
            "latestId": {
              "type": "number"
            },
            "ops": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/Op"
              }
            }
          },
          "required": [
            "latestId"
          ],
          "additionalProperties": false
        },
        "Op": {
          "type": "object",
          "properties": {
            "insert": {
              "type": "string",
              "minLength": 1,
              "maxLength": 1
            },
            "attributes": {
              "type": "object",
              "properties": {
                "charid": {
                  "type": "string"
                },
                "blockid": {
                  "type": "string"
                }
              }
            }
          },
          "required": [
            "insert"
          ],
          "additionalProperties": false
        }
      },
      "$ref": "#/definitions/QuillDoc"
    }'::jsonb, quillDoc);
    RETURN isValid;
  END;
  $_$;


--
-- TOC entry 415 (class 1255 OID 246087)
-- Name: v_digital_version_insert(); Type: FUNCTION; Schema: data; Owner: -
--

CREATE FUNCTION data.v_digital_version_insert() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
  DECLARE
    resulting_concat_pk text;
      resulting_row data.v_digital_version; 
  BEGIN
  -- if there is a pk_entity, update the existing entity
  IF (NEW.pk_entity IS NOT NULL) THEN

  UPDATE data.digital SET
    notes = NEW.notes,
    quill_doc = NEW.quill_doc
  WHERE pk_entity = NEW.pk_entity
  RETURNING concat(pk_entity || '_' || entity_version)::text as pk_entity_version_concat INTO resulting_concat_pk;

  -- else if there is no pk_entity, insert a new entity
  ELSE

  INSERT INTO data.digital (notes, quill_doc)
  VALUES(NEW.notes, NEW.quill_doc)
  RETURNING concat(pk_entity || '_' || entity_version)::text as pk_entity_version_concat INTO resulting_concat_pk;

  END IF;

  -- in both cases return the pk_entity_version_concat, so that one can query the new version in the view
  SELECT * FROM INTO resulting_row data.v_digital_version where pk_entity_version_concat = resulting_concat_pk;
  
  RETURN resulting_row;
  END;

  $$;


--
-- TOC entry 458 (class 1255 OID 243085)
-- Name: appe_tokens_for_comparision(jsonb); Type: FUNCTION; Schema: information; Owner: -
--

CREATE FUNCTION information.appe_tokens_for_comparision(appe_label jsonb, OUT tokens_for_comparision jsonb) RETURNS jsonb
    LANGUAGE sql
    AS $$
        Select array_to_json(array_agg(json_build_object('string',tokens_without_ids.string, 'typeId', tokens_without_ids.typeId)))::jsonb as tokens_for_comparision from 
                (
                    SELECT appe.tokens->>'string' as string,  appe.tokens->>'typeId' as typeId
                    FROM (
                        SELECT jsonb_array_elements(appe_label->'tokens') as tokens
                        ) as appe
                ) as tokens_without_ids
    $$;


--
-- TOC entry 467 (class 1255 OID 243461)
-- Name: appellation_label_to_string(jsonb); Type: FUNCTION; Schema: information; Owner: -
--

CREATE FUNCTION information.appellation_label_to_string(appellation_label jsonb, OUT string text) RETURNS text
    LANGUAGE sql
    AS $$
    
      SELECT STRING_AGG(l.tokens->>'string', '')
      FROM (SELECT jsonb_array_elements(appellation_label->'tokens') as tokens) as l
        
    $$;


SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 240 (class 1259 OID 240502)
-- Name: entity; Type: TABLE; Schema: information; Owner: -
--

CREATE TABLE information.entity (
    pk_entity integer NOT NULL,
    schema_name character varying NOT NULL,
    table_name character varying NOT NULL,
    notes text,
    fk_creator integer,
    fk_last_modifier integer,
    tmsp_creation timestamp with time zone DEFAULT now(),
    tmsp_last_modification timestamp with time zone,
    sys_period tstzrange DEFAULT tstzrange(now(), NULL::timestamp with time zone),
    metadata jsonb
);


--
-- TOC entry 254 (class 1259 OID 240691)
-- Name: temporal_entity; Type: TABLE; Schema: information; Owner: -
--

CREATE TABLE information.temporal_entity (
    _deprecated_pk_temporal_entity integer NOT NULL,
    fk_class integer
)
INHERITS (information.entity);


--
-- TOC entry 686 (class 1255 OID 243969)
-- Name: temporal_entity_find_or_create(integer, jsonb); Type: FUNCTION; Schema: information; Owner: -
--

CREATE FUNCTION information.temporal_entity_find_or_create(param_fk_class integer, param_roles jsonb) RETURNS information.temporal_entity
    LANGUAGE plpgsql
    AS $$
  
      DECLARE
        resulting_row information.temporal_entity;
      BEGIN
  
        -- RAISE INFO 'input values: %', NEW;
          
        ------ if existing, store in result -----
      WITH existing_te_ens as (
        select fk_temporal_entity, array_agg(jsonb_build_object('fk_property',fk_property, 'fk_entity', fk_entity)) identity_defining_roles
        from information.role as r
        join data_for_history.property as p on p.dfh_pk_property = r.fk_property AND p.identity_defining = true
        group by fk_temporal_entity
      ), 
      new_te_en as (
        SELECT array_agg(a.elements::jsonb) roles															  
         FROM 
          (select 1 x, jsonb_array_elements_text(param_roles) elements) as a
        Group by a.x															   
      )
      select teEn.* 
      from INTO resulting_row existing_te_ens 
      -- Here we check if the roles for the new TeEn do completele contain all the identity defining roles of an existing TeEn
      join new_te_en on new_te_en.roles @> existing_te_ens.identity_defining_roles
      join information.temporal_entity as teEn on teEn.pk_entity = existing_te_ens.fk_temporal_entity
      where teEn.fk_class = param_fk_class;
                           
  
      -- RAISE EXCEPTION 'resulting_row: %', resulting_row;
  
  
      -- RAISE INFO 'result of select: %', resulting_row;
  
        ------- if not existing, insert and store in result -----
          IF NOT FOUND THEN
            
                -- RAISE INFO 'Not found, creating new...';
          
              WITH _insert AS (
                  INSERT INTO information.temporal_entity (
                      fk_class
                  ) 
                  VALUES (
                      param_fk_class
                  )
                  -- return all fields of the new row
                  RETURNING *
                  ) 
              SELECT * FROM INTO resulting_row _insert;
          
                -- RAISE INFO 'result of insert: %', resulting_row  -- ;
        END IF;
  
   
     RETURN resulting_row;
        END;
        
  $$;


--
-- TOC entry 466 (class 1255 OID 243460)
-- Name: text_property_to_string(jsonb); Type: FUNCTION; Schema: information; Owner: -
--

CREATE FUNCTION information.text_property_to_string(text_property_quill_doc jsonb, OUT string text) RETURNS text
    LANGUAGE sql
    AS $$
    
      SELECT STRING_AGG(l.ops->>'insert', '')
      FROM (SELECT jsonb_array_elements(text_property_quill_doc->'contents'->'ops') as ops) as l
        
    $$;


--
-- TOC entry 465 (class 1255 OID 243090)
-- Name: v_appellation_find_or_create(); Type: FUNCTION; Schema: information; Owner: -
--

CREATE FUNCTION information.v_appellation_find_or_create() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
  DECLARE
    resulting_row information.v_appellation;
  BEGIN

    -- RAISE INFO 'input values: %', NEW;
      
    ------ if existing, store in result -----
    SELECT * FROM INTO resulting_row information.appellation
      WHERE 
      quill_doc::jsonb = NEW.quill_doc::jsonb
      AND fk_class = NEW.fk_class;
        
          -- RAISE INFO 'result of select: %', resulting_row;

    ------- if not existing, insert and store in result -----
      IF NOT FOUND THEN
        
            -- RAISE INFO 'Not found, creating new...';
      
          WITH _insert AS (
              INSERT INTO information.appellation (
                quill_doc, 
                fk_class
              ) 
              VALUES (
                NEW.quill_doc, 
                NEW.fk_class
              )
              -- return all fields of the new row
              RETURNING *
              ) 
          SELECT * FROM INTO resulting_row _insert;
      
            -- RAISE INFO 'result of insert: %', resulting_row;
    END IF;

  RETURN resulting_row;
    END;
    $$;


--
-- TOC entry 464 (class 1255 OID 243120)
-- Name: v_entity_association_find_or_create(); Type: FUNCTION; Schema: information; Owner: -
--

CREATE FUNCTION information.v_entity_association_find_or_create() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
    DECLARE
	  resulting_pk integer;
    resulting_row information.v_entity_association;
    BEGIN

      -- RAISE INFO 'input values: %', NEW;
        
      ------ if existing, store in result -----
      SELECT pk_entity 
      FROM INTO resulting_pk information.entity_association
      WHERE fk_property = NEW.fk_property
      AND fk_info_domain IS NOT DISTINCT FROM NEW.fk_info_domain
      AND fk_info_range IS NOT DISTINCT FROM NEW.fk_info_range
      AND fk_data_domain IS NOT DISTINCT FROM NEW.fk_data_domain
      AND fk_data_range IS NOT DISTINCT FROM NEW.fk_data_range;

      -- RAISE INFO 'result of select: %', resulting_row;

      ------- if not existing, insert and store in result -----
        IF NOT FOUND THEN
          
              -- RAISE INFO 'Not found, creating new...';
        
            WITH _insert AS (
                INSERT INTO information.entity_association (
                    fk_property,
                    fk_info_domain, 
                    fk_info_range,
                    fk_data_domain,
                    fk_data_range
                ) 
                VALUES (
                    NEW.fk_property,
                    NEW.fk_info_domain, 
                    NEW.fk_info_range,
                    NEW.fk_data_domain,
                    NEW.fk_data_range
                )
                -- return all fields of the new row
                RETURNING *
                ) 
            SELECT pk_entity FROM INTO resulting_pk _insert;
        
              -- RAISE INFO 'result of insert: %', resulting_row;
      END IF;

  	SELECT * FROM INTO resulting_row information.v_entity_association
  	WHERE pk_entity = resulting_pk;
	  
    RETURN resulting_row;
      END;
      $$;


--
-- TOC entry 459 (class 1255 OID 243096)
-- Name: v_language_find_or_create(); Type: FUNCTION; Schema: information; Owner: -
--

CREATE FUNCTION information.v_language_find_or_create() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
    DECLARE
      resulting_row information.language;
    BEGIN

      -- RAISE INFO 'input values: %', NEW;
        
      ------ if existing, store in result -----
      SELECT * FROM INTO resulting_row information.language
        WHERE      
              fk_class = NEW.fk_class
          AND lang_type = NEW.lang_type
          AND scope = NEW.scope
          AND iso6392b = NEW.iso6392b
          AND iso6392t = NEW.iso6392t
          AND iso6391 = NEW.iso6391;

        -- RAISE INFO 'result of select: %', resulting_row;

      ------- if not existing, insert and store in result -----
        IF NOT FOUND THEN
          
              -- RAISE INFO 'Not found, creating new...';
        
            WITH _insert AS (
                INSERT INTO information.language (
                  fk_class,
                  lang_type,
                  scope,
                  iso6392b,
                  iso6392t,
                  iso6391
                ) 
                VALUES (
                  NEW.fk_class,
                  NEW.lang_type,
                  NEW.scope,
                  NEW.iso6392b,
                  NEW.iso6392t,
                  NEW.iso6391
                )
                -- return all fields of the new row
                RETURNING *
                ) 
            SELECT * FROM INTO resulting_row _insert;
        
              -- RAISE INFO 'result of insert: %', resulting_row;
      END IF;

    RETURN resulting_row;
      END;
      $$;


--
-- TOC entry 460 (class 1255 OID 243102)
-- Name: v_persistent_item_find_or_create(); Type: FUNCTION; Schema: information; Owner: -
--

CREATE FUNCTION information.v_persistent_item_find_or_create() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
    DECLARE
      resulting_row information.persistent_item;
    BEGIN

      -- RAISE INFO 'input values: %', NEW;
        
      ------ if existing, store in result -----
      SELECT * FROM INTO resulting_row information.persistent_item
        WHERE pk_entity = NEW.pk_entity;

      -- RAISE INFO 'result of select: %', resulting_row;

      ------- if not existing, insert and store in result -----
        IF NOT FOUND THEN
          
              -- RAISE INFO 'Not found, creating new...';
        
            WITH _insert AS (
                INSERT INTO information.persistent_item (
                    fk_class
                ) 
                VALUES (
                    NEW.fk_class
                )
                -- return all fields of the new row
                RETURNING *
                ) 
            SELECT * FROM INTO resulting_row _insert;
        
              -- RAISE INFO 'result of insert: %', resulting_row;
      END IF;

    RETURN resulting_row;
      END;
      $$;


--
-- TOC entry 462 (class 1255 OID 243114)
-- Name: v_place_find_or_create(); Type: FUNCTION; Schema: information; Owner: -
--

CREATE FUNCTION information.v_place_find_or_create() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
    DECLARE
      resulting_row information.v_place;
    BEGIN

      -- RAISE INFO 'input values: %', NEW;
        
      ------ if existing, store in result -----
      SELECT 
        *,
        NEW.long, 
        NEW.lat  
      FROM INTO resulting_row information.place
        WHERE geo_point = ST_SetSRID(ST_MakePoint(NEW.long, NEW.lat), 4326)::geography
          AND fk_class = NEW.fk_class;

      -- RAISE INFO 'result of select: %', resulting_row;

      ------- if not existing, insert and store in result -----
        IF NOT FOUND THEN
          
              -- RAISE INFO 'Not found, creating new...';
        
            WITH _insert AS (
                INSERT INTO information.place (
                    geo_point, 
                    fk_class
                ) 
                VALUES (
                    ST_SetSRID(ST_MakePoint(NEW.long, NEW.lat), 4326)::geography, 
                    NEW.fk_class
                )
                -- return all fields of the new row
                RETURNING *
                ) 
            SELECT
              *, 
              ST_X(geo_point::geometry) as long, 
              ST_Y(geo_point::geometry) as lat 
            FROM INTO resulting_row _insert;
        
              -- RAISE INFO 'result of insert: %', resulting_row;
      END IF;

    RETURN resulting_row;
      END;
      $$;


--
-- TOC entry 402 (class 1255 OID 246080)
-- Name: v_property_of_property_find_or_create(); Type: FUNCTION; Schema: information; Owner: -
--

CREATE FUNCTION information.v_property_of_property_find_or_create() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
    DECLARE
      resulting_pk integer;
      resulting_row information.v_property_of_property;
    BEGIN

       RAISE INFO ' input values
       NEW.fk_property: %,
       NEW.provisional_property: %
       NEW.fk_role: %
       NEW.fk_entity_association: %
       NEW.fk_range_entity: %
       ', 
        NEW.fk_property,
        NEW.provisional_property,
        NEW.fk_role,
        NEW.fk_entity_association,
        NEW.fk_range_entity;
        
      ------ if existing, store in result -----
      SELECT pk_entity FROM INTO resulting_pk information.property_of_property
        WHERE fk_property IS NOT DISTINCT FROM NEW.fk_property
        AND provisional_property IS NOT DISTINCT FROM NEW.provisional_property
        AND fk_role IS NOT DISTINCT FROM NEW.fk_role
        AND fk_entity_association IS NOT DISTINCT FROM NEW.fk_entity_association
        AND fk_range_entity IS NOT DISTINCT FROM NEW.fk_range_entity;

        RAISE INFO 'resulting_pk: %', resulting_pk;


      ------- if not existing, insert and store in result -----
        IF NOT FOUND THEN
          
            RAISE INFO 'Not found, creating new...';
        
            WITH _insert AS (
                INSERT INTO information.property_of_property (
                    fk_property, 
                    provisional_property,
                    fk_role,
                    fk_entity_association,
                    fk_range_entity
                ) 
                VALUES (
                    NEW.fk_property, 
                    NEW.provisional_property,
                    NEW.fk_role,
                    NEW.fk_entity_association,
                    NEW.fk_range_entity
                )
                -- return all fields of the new row
                RETURNING *
                ) 
            SELECT pk_entity FROM INTO resulting_pk _insert;
        
              -- RAISE INFO 'result of insert: %', resulting_row;
      END IF;

      SELECT * FROM INTO resulting_row information.v_property_of_property
      WHERE pk_entity = resulting_pk;

    RETURN resulting_row;
      END;
      $$;


--
-- TOC entry 457 (class 1255 OID 243083)
-- Name: v_role_find_or_create(); Type: FUNCTION; Schema: information; Owner: -
--

CREATE FUNCTION information.v_role_find_or_create() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
    DECLARE
      resulting_pk integer;
      resulting_row information.v_role;
    BEGIN

      -- RAISE INFO 'input values: %', NEW;
        
      ------ if existing, store in result -----
      SELECT pk_entity FROM INTO resulting_pk information.role
        WHERE              
            fk_entity = NEW.fk_entity
            AND fk_temporal_entity = NEW.fk_temporal_entity
            AND fk_property = NEW.fk_property;

            -- RAISE INFO 'result of select: %', resulting_row;

      ------- if not existing, insert and store in result -----
        IF NOT FOUND THEN
          
              -- RAISE INFO 'Not found, creating new...';
        
            WITH _insert AS (
                INSERT INTO information.role (
                    fk_entity, 
                    fk_temporal_entity,
                    fk_property
                ) 
                VALUES (
                    NEW.fk_entity, 
                    NEW.fk_temporal_entity,
                    NEW.fk_property
                )
                -- return all fields of the new row
                RETURNING *
                ) 
            SELECT pk_entity FROM INTO resulting_pk _insert;
        
              -- RAISE INFO 'result of insert: %', resulting_row;
      END IF;

      SELECT * FROM INTO resulting_row information.v_role
      WHERE pk_entity = resulting_pk;

    RETURN resulting_row;
      END;
      $$;


--
-- TOC entry 461 (class 1255 OID 243108)
-- Name: v_temporal_entity_find_or_create(); Type: FUNCTION; Schema: information; Owner: -
--

CREATE FUNCTION information.v_temporal_entity_find_or_create() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
    DECLARE
      resulting_row information.temporal_entity;
    BEGIN

      -- RAISE INFO 'input values: %', NEW;
        
      ------ if existing, store in result -----
      SELECT * FROM INTO resulting_row information.temporal_entity
        WHERE pk_entity = NEW.pk_entity;

      -- RAISE INFO 'result of select: %', resulting_row;

      ------- if not existing, insert and store in result -----
        IF NOT FOUND THEN
          
              -- RAISE INFO 'Not found, creating new...';
        
            WITH _insert AS (
                INSERT INTO information.temporal_entity (
                    fk_class
                ) 
                VALUES (
                    NEW.fk_class
                )
                -- return all fields of the new row
                RETURNING *
                ) 
            SELECT * FROM INTO resulting_row _insert;
        
              -- RAISE INFO 'result of insert: %', resulting_row;
      END IF;

    RETURN resulting_row;
      END;
      $$;


--
-- TOC entry 463 (class 1255 OID 243453)
-- Name: v_text_property_find_or_create(); Type: FUNCTION; Schema: information; Owner: -
--

CREATE FUNCTION information.v_text_property_find_or_create() RETURNS trigger
    LANGUAGE plpgsql
    AS $$

            DECLARE
              resulting_pk integer;
              resulting_row information.v_text_property;
            BEGIN

              -- RAISE INFO 'input values: %', NEW;
                
              ------ if existing, store in result -----
              SELECT pk_entity FROM INTO resulting_pk information.text_property
                WHERE              
                    quill_doc::jsonb = NEW.quill_doc::jsonb
                    AND fk_class_field = NEW.fk_class_field
                    AND fk_concerned_entity = NEW.fk_concerned_entity
                    AND fk_language = NEW.fk_language;

                    -- RAISE INFO 'result of select: %', resulting_pk;

              ------- if not existing, insert and store in result -----
                IF NOT FOUND THEN
                  
                      -- RAISE INFO 'Not found, creating new...';
                
                    WITH _insert AS (
                        INSERT INTO information.text_property (
                          quill_doc, 
                          fk_class_field,
                          fk_concerned_entity,
                          fk_language
                        ) 
                        VALUES (
                          NEW.quill_doc::jsonb, 
                          NEW.fk_class_field,
                          NEW.fk_concerned_entity,
                          NEW.fk_language
                        )
                        -- return all fields of the new row
                        RETURNING *
                        ) 
                    SELECT pk_entity FROM INTO resulting_pk _insert;
                
                      -- RAISE INFO 'result of insert: %', resulting_pk;
              END IF;

            SELECT * FROM INTO resulting_row information.v_text_property
            WHERE pk_entity = resulting_pk;

            RETURN resulting_row;
              END;
              
        $$;


--
-- TOC entry 456 (class 1255 OID 242978)
-- Name: v_time_primitive_find_or_create(); Type: FUNCTION; Schema: information; Owner: -
--

CREATE FUNCTION information.v_time_primitive_find_or_create() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
    DECLARE
      resulting_pk integer;
      resulting_row information.v_time_primitive;
    BEGIN

          -- RAISE INFO 'input values: %', NEW;
        
      ------ if existing, store in result -----
      SELECT pk_entity FROM INTO resulting_pk information.time_primitive
        WHERE              
            julian_day = NEW.julian_day
            AND duration = NEW.duration
            AND fk_class = NEW.fk_class;

            -- RAISE INFO 'result of select: %', resulting_row;

      ------- if not existing, insert and store in result -----
        IF NOT FOUND THEN
          
              -- RAISE INFO 'Not found, creating new...';
        
            WITH _insert AS (
                INSERT INTO information.time_primitive (
                    julian_day, 
                    duration,
                    fk_class
                ) 
                VALUES (
                    NEW.julian_day, 
                    NEW.duration,
                    NEW.fk_class
                )
                -- return all fields of the new row
                RETURNING *
                ) 
              SELECT pk_entity FROM INTO resulting_pk _insert;
        
              -- RAISE INFO 'result of insert: %', resulting_row;
      END IF;

    SELECT * FROM INTO resulting_row information.v_time_primitive
    WHERE pk_entity = resulting_pk;

    RETURN resulting_row;
      END;
      $$;


--
-- TOC entry 1741 (class 1255 OID 243429)
-- Name: v_info_proj_rel_update_or_creat(); Type: FUNCTION; Schema: projects; Owner: -
--

CREATE FUNCTION projects.v_info_proj_rel_update_or_creat() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
  DECLARE
    resulting_pk integer;
    resulting_row projects.v_info_proj_rel;
  BEGIN

     RAISE INFO 'input values: %', NEW;
      
    ------ if existing, store in resulting_pk ... -----
    SELECT * FROM INTO resulting_row projects.v_info_proj_rel
      WHERE fk_entity = NEW.fk_entity
      AND fk_project = NEW.fk_project;

    
  ------ ... and update the found row -----

  IF FOUND THEN

   -- RAISE INFO 'result of select: %', resulting_row;
   -- RAISE INFO 'v %', COALESCE(NEW.entity_version, resulting_row.entity_version);

    UPDATE projects.info_proj_rel
    SET	
          fk_entity_version = COALESCE(NEW.fk_entity_version, resulting_row.fk_entity_version),
          fk_entity_version_concat = COALESCE(NEW.fk_entity_version_concat, resulting_row.fk_entity_version_concat),
          is_in_project = COALESCE(NEW.is_in_project, resulting_row.is_in_project),
          is_standard_in_project = COALESCE(NEW.is_standard_in_project, resulting_row.is_standard_in_project),
          calendar = COALESCE(NEW.calendar, resulting_row.calendar),
          ord_num = COALESCE(NEW.ord_num, resulting_row.ord_num),
          fk_creator = COALESCE(NEW.fk_creator, resulting_row.fk_creator),
          fk_last_modifier = COALESCE(NEW.fk_last_modifier, resulting_row.fk_last_modifier)
      WHERE pk_entity = resulting_row.pk_entity;
  
    ------- if not existing, insert and store in result -----
      ELSE
        
            -- RAISE INFO 'Not found, creating new...';
      
          WITH _insert AS (
              INSERT INTO projects.info_proj_rel (
                fk_project,
                fk_entity, 
                fk_entity_version,
                fk_entity_version_concat,
                is_in_project,
                is_standard_in_project,
                calendar,
                ord_num,
                entity_version,
                fk_creator,
                fk_last_modifier
                ) 
                VALUES (
                NEW.fk_project,
                NEW.fk_entity, 
                NEW.fk_entity_version,
                NEW.fk_entity_version_concat,
                NEW.is_in_project,
                NEW.is_standard_in_project,
                NEW.calendar,
                NEW.ord_num,
                1,
                NEW.fk_creator,
                NEW.fk_last_modifier
              )
              -- return all fields of the new row
              RETURNING *
              ) 
          SELECT pk_entity FROM INTO resulting_pk _insert;
      
            -- RAISE INFO 'result of insert: %', resulting_row;
      
    END IF;

  SELECT * FROM INTO resulting_row projects.v_info_proj_rel
  WHERE pk_entity = resulting_pk OR  pk_entity = resulting_row.pk_entity;
  
  RETURN resulting_row;
    END;
    $$;


--
-- TOC entry 469 (class 1255 OID 240164)
-- Name: versioning(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.versioning() RETURNS trigger
    LANGUAGE plpgsql
    AS $_$
  DECLARE
    sys_period text;
    history_table text;
    manipulate jsonb;
    commonColumns text[];
    time_stamp_to_use timestamptz := current_timestamp;
    range_lower timestamptz;
    transaction_info txid_snapshot;
    existing_range tstzrange;
    holder record;
    holder2 record;
    pg_version integer;
  BEGIN
    -- version 0.2.0
  
    IF TG_WHEN != 'BEFORE' OR TG_LEVEL != 'ROW' THEN
      RAISE TRIGGER_PROTOCOL_VIOLATED USING
      MESSAGE = 'function "versioning" must be fired BEFORE ROW';
    END IF;
  
    IF TG_OP != 'INSERT' AND TG_OP != 'UPDATE' AND TG_OP != 'DELETE' THEN
      RAISE TRIGGER_PROTOCOL_VIOLATED USING
      MESSAGE = 'function "versioning" must be fired for INSERT or UPDATE or DELETE';
    END IF;
  
    IF TG_NARGS != 3 THEN
      RAISE INVALID_PARAMETER_VALUE USING
      MESSAGE = 'wrong number of parameters for function "versioning"',
      HINT = 'expected 3 parameters but got ' || TG_NARGS;
    END IF;
  
    sys_period := TG_ARGV[0];
    history_table := TG_ARGV[1];
  
    -- check if sys_period exists on original table
    SELECT atttypid, attndims INTO holder FROM pg_attribute WHERE attrelid = TG_RELID AND attname = sys_period AND NOT attisdropped;
    IF NOT FOUND THEN
      RAISE 'column "%" of relation "%" does not exist', sys_period, TG_TABLE_NAME USING
      ERRCODE = 'undefined_column';
    END IF;
    IF holder.atttypid != to_regtype('tstzrange') THEN
      IF holder.attndims > 0 THEN
        RAISE 'system period column "%" of relation "%" is not a range but an array', sys_period, TG_TABLE_NAME USING
        ERRCODE = 'datatype_mismatch';
      END IF;
  
      SELECT rngsubtype INTO holder2 FROM pg_range WHERE rngtypid = holder.atttypid;
      IF FOUND THEN
        RAISE 'system period column "%" of relation "%" is not a range of timestamp with timezone but of type %', sys_period, TG_TABLE_NAME, format_type(holder2.rngsubtype, null) USING
        ERRCODE = 'datatype_mismatch';
      END IF;
  
      RAISE 'system period column "%" of relation "%" is not a range but type %', sys_period, TG_TABLE_NAME, format_type(holder.atttypid, null) USING
      ERRCODE = 'datatype_mismatch';
    END IF;
  
    IF TG_OP = 'UPDATE' OR TG_OP = 'DELETE' THEN
      -- Ignore rows already modified in this transaction
      transaction_info := txid_current_snapshot();
      IF OLD.xmin::text >= (txid_snapshot_xmin(transaction_info) % (2^32)::bigint)::text
      AND OLD.xmin::text <= (txid_snapshot_xmax(transaction_info) % (2^32)::bigint)::text THEN
        IF TG_OP = 'DELETE' THEN
          RETURN OLD;
        END IF;
  
        RETURN NEW;
      END IF;
  
      SELECT current_setting('server_version_num')::integer
      INTO pg_version;
  
      -- to support postgres < 9.6
      IF pg_version < 90600 THEN
        -- check if history table exits
        IF to_regclass(history_table::cstring) IS NULL THEN
          RAISE 'relation "%" does not exist', history_table;
        END IF;
      ELSE
        IF to_regclass(history_table) IS NULL THEN
          RAISE 'relation "%" does not exist', history_table;
        END IF;
      END IF;
  
      -- check if history table has sys_period
      IF NOT EXISTS(SELECT * FROM pg_attribute WHERE attrelid = history_table::regclass AND attname = sys_period AND NOT attisdropped) THEN
        RAISE 'history relation "%" does not contain system period column "%"', history_table, sys_period USING
        HINT = 'history relation must contain system period column with the same name and data type as the versioned one';
      END IF;
  
      EXECUTE format('SELECT $1.%I', sys_period) USING OLD INTO existing_range;
  
      IF existing_range IS NULL THEN
        RAISE 'system period column "%" of relation "%" must not be null', sys_period, TG_TABLE_NAME USING
        ERRCODE = 'null_value_not_allowed';
      END IF;
  
      IF isempty(existing_range) OR NOT upper_inf(existing_range) THEN
        RAISE 'system period column "%" of relation "%" contains invalid value', sys_period, TG_TABLE_NAME USING
        ERRCODE = 'data_exception',
        DETAIL = 'valid ranges must be non-empty and unbounded on the high side';
      END IF;
  
      IF TG_ARGV[2] = 'true' THEN
        -- mitigate update conflicts
        range_lower := lower(existing_range);
        IF range_lower >= time_stamp_to_use THEN
          time_stamp_to_use := range_lower + interval '1 microseconds';
        END IF;
      END IF;
  
      WITH history AS
        (SELECT attname, atttypid
        FROM   pg_attribute
        WHERE  attrelid = history_table::regclass
        AND    attnum > 0
        AND    NOT attisdropped),
        main AS
        (SELECT attname, atttypid
        FROM   pg_attribute
        WHERE  attrelid = TG_RELID
        AND    attnum > 0
        AND    NOT attisdropped)
      SELECT
        history.attname AS history_name,
        main.attname AS main_name,
        history.atttypid AS history_type,
        main.atttypid AS main_type
      INTO holder
        FROM history
        INNER JOIN main
        ON history.attname = main.attname
      WHERE
        history.atttypid != main.atttypid;
  
      IF FOUND THEN
        RAISE 'column "%" of relation "%" is of type % but column "%" of history relation "%" is of type %',
          holder.main_name, TG_TABLE_NAME, format_type(holder.main_type, null), holder.history_name, history_table, format_type(holder.history_type, null)
        USING ERRCODE = 'datatype_mismatch';
      END IF;
  
      WITH history AS
        (SELECT attname
        FROM   pg_attribute
        WHERE  attrelid = history_table::regclass
        AND    attnum > 0
        AND    NOT attisdropped),
        main AS
        (SELECT attname
        FROM   pg_attribute
        WHERE  attrelid = TG_RELID
        AND    attnum > 0
        AND    NOT attisdropped)
      SELECT array_agg(quote_ident(history.attname)) INTO commonColumns
        FROM history
        INNER JOIN main
        ON history.attname = main.attname
        AND history.attname != sys_period;
  
      EXECUTE ('INSERT INTO ' ||
        CASE split_part(history_table, '.', 2)
        WHEN '' THEN
          quote_ident(history_table)
        ELSE
          quote_ident(split_part(history_table, '.', 1)) || '.' || quote_ident(split_part(history_table, '.', 2))
        END ||
        '(' ||
        array_to_string(commonColumns , ',') ||
        ',' ||
        quote_ident(sys_period) ||
        ') VALUES ($1.' ||
        array_to_string(commonColumns, ',$1.') ||
        ',tstzrange($2, $3, ''[)''))')
         USING OLD, range_lower, time_stamp_to_use;
    END IF;
  
    IF TG_OP = 'UPDATE' OR TG_OP = 'INSERT' THEN
      manipulate := jsonb_set('{}'::jsonb, ('{' || sys_period || '}')::text[], to_jsonb(tstzrange(time_stamp_to_use, null, '[)')));
  
      RETURN jsonb_populate_record(NEW, manipulate);
    END IF;
  
    RETURN OLD;
  END;
  $_$;


--
-- TOC entry 1716 (class 1255 OID 244066)
-- Name: entity_preview__concat_full_text(); Type: FUNCTION; Schema: warehouse; Owner: -
--

CREATE FUNCTION warehouse.entity_preview__concat_full_text() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
    BEGIN
    
      RAISE INFO 'Called TRIGGER FUNCTION entity_preview__concat_full_text; pk_entity: % fk_project: %', NEW.pk_entity, NEW.fk_project;
      

      SELECT string_agg into NEW.full_text from (
        SELECT 1, string_agg(txt, ', ' ORDER BY rank) from (
          SELECT rank, txt 
          FROM (
            select 1 rank, coalesce(NEW.type_label, NEW.class_label, '') as txt
            UNION
            select 2 rank, NEW.own_full_text  as txt
            UNION
            select 3 rank, value as txt 
            from jsonb_each_text(NEW.related_full_texts)
          ) AS all_strings
          WHERE txt != ''
        ) AS items
        GROUP BY 1
      ) as x;	   
      
      SELECT setweight(to_tsvector(coalesce(NEW.entity_label, '')), 'A') || 
          setweight(to_tsvector(coalesce(NEW.type_label, NEW.class_label, '')), 'B') || 
          setweight(to_tsvector(coalesce(NEW.full_text,'')), 'C')     
      INTO NEW.ts_vector;



      RETURN NEW;
    END;
    $$;


--
-- TOC entry 1711 (class 1255 OID 244059)
-- Name: entity_preview__create(integer, integer); Type: FUNCTION; Schema: warehouse; Owner: -
--

CREATE FUNCTION warehouse.entity_preview__create(param_pk_entity integer, param_fk_project integer) RETURNS boolean
    LANGUAGE plpgsql
    AS $$
  DECLARE 
    e warehouse.v_entities;
    c warehouse.class_preview;
    p INT;
  BEGIN
    
    ---------- upsert the unchagable rows ----------

    p = coalesce(param_fk_project, 0);

    SELECT * INTO e
    FROM warehouse.v_entities
    WHERE pk_entity = param_pk_entity
    AND fk_project IS NOT DISTINCT FROM param_fk_project;

    SELECT * INTO c
    FROM warehouse.class_preview as cpre
    WHERE cpre.dfh_pk_class = e.fk_class;

   
    INSERT INTO warehouse.entity_preview (pk_entity, fk_project, project, fk_class, entity_type, class_label)
    VALUES (
      param_pk_entity,
      param_fk_project,
      p, -- project
      e.fk_class,
      e.entity_type,
      c.class_label
    )
    ON CONFLICT (pk_entity, project) 
    DO
      UPDATE
        SET fk_class = e.fk_class, entity_type = e.entity_type, class_label = c.class_label
          WHERE entity_preview.pk_entity = param_pk_entity AND entity_preview.project = p;


    ---------- first create the dependency indexes ----------
    
    PERFORM warehouse.entity_preview__create_related_full_texts(param_pk_entity, param_fk_project);
    
    PERFORM warehouse.entity_preview__create_fk_entity_label(param_pk_entity, param_fk_project);
    
    PERFORM warehouse.entity_preview__create_fk_type(param_pk_entity, param_fk_project);

    ---------- second fill the own entity_label and own_full_text  ----------
    
    PERFORM warehouse.entity_preview__fill_own_entity_label(param_pk_entity, param_fk_project);
    
    PERFORM warehouse.entity_preview__fill_own_full_text(param_pk_entity, param_fk_project);
    
    
    ---------- third fill the dependencies ----------
    
    PERFORM warehouse.entity_preview__fill_dependent_entity_labels(param_pk_entity, param_fk_project);  
    
    PERFORM warehouse.entity_preview__fill_dependent_related_full_texts(param_pk_entity, param_fk_project);
    
    PERFORM warehouse.entity_preview__fill_dependent_type_labels(param_pk_entity, param_fk_project);
    
    RETURN true;
  END;
  $$;


--
-- TOC entry 1721 (class 1255 OID 244060)
-- Name: entity_preview__create_all(); Type: FUNCTION; Schema: warehouse; Owner: -
--

CREATE FUNCTION warehouse.entity_preview__create_all() RETURNS boolean
    LANGUAGE plpgsql
    AS $$

    DECLARE 
      item record;
      results warehouse.entity_preview;
      t timestamptz;
      number_of_unfinished INT;
    BEGIN

    t = clock_timestamp();
    
    -- empty table entity_preview
    DELETE from warehouse.entity_preview;

    -- init temp table
    DROP TABLE IF EXISTS warehouse.temp;
    CREATE TABLE warehouse.temp AS SELECT * FROM warehouse.v_entity_preview;

    WITH previews_non_recursive AS (
      SELECT * FROM warehouse.temp
      ),
      fill_entity_label AS (
      SELECT 
      t1.pk_entity,
      t1.fk_project,
      t1.project,
      t1.fk_class,
      t1.entity_type,
      t1.class_label,
      coalesce(t2.entity_label, t1.entity_label) entity_label,
      t1.time_span,
      t1.own_full_text,
      t1.fk_entity_label,
      t1.fk_type
      FROM previews_non_recursive t1
      LEFT JOIN previews_non_recursive t2
      ON t1.fk_entity_label = t2.pk_entity
      AND t1.project = t2.project
      ),
      fill_type_label AS (
      SELECT 
      t1.*,
      t2.entity_label type_label
      FROM fill_entity_label t1
      LEFT JOIN fill_entity_label t2
      ON t1.fk_type = t2.pk_entity
      AND t1.project = t2.project
      ),
    full_text_dependencies AS (
      SELECT r.fk_temporal_entity as pk_entity, r.project, r.fk_project, e.pk_entity as pk_related_full_text, pre.own_full_text
      FROM warehouse.v_roles_per_project_and_repo r
      JOIN information.entity e ON e.pk_entity = r.fk_entity AND e.table_name = 'persistent_item'
      LEFT JOIN previews_non_recursive pre ON pre.pk_entity = e.pk_entity AND pre.project = r.project
      UNION
      SELECT r.fk_entity as pk_entity, r.project,  r.fk_project,  e.pk_entity as pk_related_full_text, pre.own_full_text
      FROM warehouse.v_roles_per_project_and_repo r
      JOIN information.entity e ON e.pk_entity = r.fk_temporal_entity AND e.table_name = 'temporal_entity'
      LEFT JOIN previews_non_recursive pre ON pre.pk_entity = e.pk_entity AND pre.project = r.project
      ), 
      aggregated_related_full_texts AS(
      select pk_entity, project, fk_project, jsonb_object_agg(full_text_dependencies.pk_related_full_text::text, full_text_dependencies.own_full_text) related_full_texts
      FROM full_text_dependencies
      group by pk_entity, project, fk_project
      ),
      related_full_text AS (
      SELECT t1.*, t2.related_full_texts
      FROM fill_type_label t1
      LEFT JOIN aggregated_related_full_texts t2
      ON t1.pk_entity = t2.pk_entity
      AND t1.project = t2.project
      ),
      add_full_text AS (
      SELECT 
        *, 
        (
        SELECT array_to_string(ARRAY[
          --coalesce(f.type_label, f.class_label, ''),
          f.own_full_text,
          array_to_string(array_agg(value), ', ')
        ]::text[] , ', ')
        FROM jsonb_each_text(f.related_full_texts)	
        ) as full_text	 
      FROM related_full_text  f   
      ),
      add_ts_vector AS (
      SELECT 
        t.*,
        setweight(to_tsvector(coalesce(t.entity_label, '')), 'A') || 
        setweight(to_tsvector(coalesce(t.type_label, t.class_label, '')), 'B') || 
        setweight(to_tsvector(coalesce(t.full_text,'')), 'C') as ts_vector
      FROM add_full_text t
      ),
      updated AS (
        SELECT * FROM add_ts_vector
    )
    UPDATE warehouse.temp 
    SET entity_label = updated.entity_label
    FROM updated
    WHERE temp.pk_entity = updated.pk_entity 
    AND temp.fk_project IS NOT DISTINCT FROM updated.fk_project;
          
    SELECT count(*) INTO number_of_unfinished
    FROM warehouse.temp a
    JOIN warehouse.temp b ON a.fk_entity_label = b.pk_entity AND a.entity_label IS DISTINCT FROM b.entity_label 
    AND a.project = b.project;

    raise notice 'number_of_unfinished entity_previews (if zero, everything fine): %', number_of_unfinished;

    
    -- empty table entity_preview
    DELETE from warehouse.entity_preview;
    
    INSERT INTO warehouse.entity_preview  (  
      pk_entity,
      fk_project,
      project,
      fk_class,
      entity_type,
      class_label,
      entity_label,
      time_span,
      own_full_text,
      fk_entity_label,
      fk_type,
      type_label,
      related_full_texts,
      full_text,
      ts_vector
    )
    SELECT   
      pk_entity,
      fk_project,
      project,
      fk_class,
      entity_type,
      class_label,
      entity_label,
      time_span,
      own_full_text,
      fk_entity_label,
      fk_type,
      type_label,
      related_full_texts,
      full_text,
      ts_vector
    FROM  warehouse.temp;
            
    DROP TABLE warehouse.temp;

    raise notice 'time spent for entity_preview__fill_own_full_text=%', clock_timestamp() - t;

  
    RETURN TRUE;

    END;
    $$;


--
-- TOC entry 416 (class 1255 OID 244050)
-- Name: entity_preview__create_fk_entity_label(integer, integer); Type: FUNCTION; Schema: warehouse; Owner: -
--

CREATE FUNCTION warehouse.entity_preview__create_fk_entity_label(param_pk_entity integer, param_fk_project integer) RETURNS jsonb
    LANGUAGE plpgsql
    AS $$
  DECLARE
   old_fk_entity_label INT;
   new_fk_entity_label INT;
   result_info JSONB;
  BEGIN

      ---------------------- REPO VERSIONS ----------------------

      IF param_fk_project IS NULL THEN
      
 		RAISE INFO 'entity_preview__create_fk_entity_label of pk_entity: %, fk_project: %', param_pk_entity, param_fk_project;

        -- get the fk_entity_label
			
			SELECT pk INTO new_fk_entity_label 
			FROM 
			(
				(
          SELECT fk_temporal_entity as pk, r.rank_for_pe_it as rank
          FROM information.v_role r
          JOIN projects.class_field_config ucc ON ucc.fk_property = r.fk_property 
            AND ucc.ord_num = 0  
            AND ucc.property_is_outgoing = false
            AND ucc.fk_app_context = 45
          JOIN information.entity e on r.fk_temporal_entity = e.pk_entity AND e.table_name = 'temporal_entity'
          WHERE r.fk_entity = param_pk_entity 
				  AND r.is_in_project_count > 0
				)
				UNION
				(
          SELECT r.fk_entity as pk, r.rank_for_te_ent as rank
          FROM information.v_role r
          JOIN projects.class_field_config ucc ON ucc.fk_property = r.fk_property 
            AND ucc.ord_num = 0 
            AND ucc.property_is_outgoing = true
            AND ucc.fk_app_context = 45
          JOIN information.entity e on r.fk_entity = e.pk_entity AND e.table_name = 'persistent_item'
          WHERE r.fk_temporal_entity = param_pk_entity 
          AND r.is_in_project_count > 0
				)
			) AS a
			ORDER BY rank
			LIMIT 1;

        RAISE INFO 'new_fk_entity_label: %', new_fk_entity_label;
		
        ----- Insert or update column fk_entity_label of table entity_preview
        
        SELECT fk_entity_label INTO old_fk_entity_label FROM warehouse.entity_preview
        WHERE pk_entity = param_pk_entity AND fk_project IS NULL;
		
		RAISE INFO 'old_fk_entity_label: %', old_fk_entity_label;

        IF NOT FOUND THEN 
		
            INSERT INTO warehouse.entity_preview (pk_entity, fk_project, fk_entity_label)
            VALUES (param_pk_entity, param_fk_project, new_fk_entity_label);

            RAISE INFO 'inserted new_fk_entity_label: %', new_fk_entity_label;

        ELSIF (SELECT (old_fk_entity_label IS DISTINCT FROM new_fk_entity_label)) THEN
			   
            UPDATE warehouse.entity_preview 
            SET fk_entity_label = new_fk_entity_label
            where pk_entity=param_pk_entity AND fk_project IS NULL;

            RAISE INFO 'updated object with new_object: %', new_fk_entity_label;
        ELSE
            RAISE INFO 'no update needed: %', new_fk_entity_label;
        END IF;
					   
					   
      ---------------------- PROJECTS VERSIONS ----------------------

      ELSE

        RAISE INFO 'entity_preview__create_fk_entity_label of pk_entity: %, fk_project: %', param_pk_entity, param_fk_project;

        -- get the fk_entity_label
			
			SELECT pk INTO new_fk_entity_label 
			FROM 
			(
				(
          SELECT fk_temporal_entity as pk, epr.ord_num
          FROM information.role r
          JOIN projects.info_proj_rel epr ON epr.fk_entity = r.pk_entity 
          JOIN projects.class_field_config ucc ON ucc.fk_property = r.fk_property 
            AND ucc.ord_num = 0  
            AND ucc.property_is_outgoing = false
            AND ucc.fk_app_context = 45
          JOIN information.entity e on r.fk_temporal_entity = e.pk_entity AND e.table_name = 'temporal_entity'
          WHERE r.fk_entity = param_pk_entity 
          AND epr.fk_project = param_fk_project 
          AND epr.is_in_project = true
        )

				UNION

				(
          SELECT r.fk_entity as pk, epr.ord_num
          FROM information.role r
          JOIN projects.info_proj_rel epr ON epr.fk_entity = r.pk_entity 
          JOIN projects.class_field_config ucc ON ucc.fk_property = r.fk_property 
            AND ucc.ord_num = 0 
            AND ucc.property_is_outgoing = true
            AND ucc.fk_app_context = 45
          JOIN information.entity e on r.fk_entity = e.pk_entity AND e.table_name = 'persistent_item'
          WHERE r.fk_temporal_entity = param_pk_entity 
          AND epr.fk_project = param_fk_project
          AND epr.is_in_project = true
				)
			) AS a
			ORDER BY ord_num
			LIMIT 1;

        RAISE INFO 'new_fk_entity_label: %', new_fk_entity_label;
		
        ----- Insert or update column fk_entity_label of table entity_preview
        
        SELECT fk_entity_label INTO old_fk_entity_label FROM warehouse.entity_preview
        WHERE pk_entity = param_pk_entity AND fk_project = param_fk_project;
		
		RAISE INFO 'old_fk_entity_label: %', old_fk_entity_label;

        IF NOT FOUND THEN 
		
            INSERT INTO warehouse.entity_preview (pk_entity, fk_project, fk_entity_label)
            VALUES (param_pk_entity, param_fk_project, new_fk_entity_label);

            RAISE INFO 'inserted new_fk_entity_label: %', new_fk_entity_label;

        ELSIF (SELECT (old_fk_entity_label IS DISTINCT FROM new_fk_entity_label)) THEN
			   
            UPDATE warehouse.entity_preview 
            SET fk_entity_label = new_fk_entity_label
            where pk_entity=param_pk_entity AND fk_project=param_fk_project;

            RAISE INFO 'updated object with new_fk_entity_label: %', new_fk_entity_label;
        ELSE
            RAISE INFO 'no update needed: %', new_fk_entity_label;
        END IF;

      END IF; 

      SELECT jsonb_build_object(
        'changed', (SELECT (old_fk_entity_label IS DISTINCT FROM new_fk_entity_label)),
        'old_val', old_fk_entity_label,
        'new_val', new_fk_entity_label) 
      INTO result_info;

      RETURN result_info;
  END;
  $$;


--
-- TOC entry 420 (class 1255 OID 244051)
-- Name: entity_preview__create_fk_type(integer, integer); Type: FUNCTION; Schema: warehouse; Owner: -
--

CREATE FUNCTION warehouse.entity_preview__create_fk_type(param_pk_entity integer, param_fk_project integer) RETURNS jsonb
    LANGUAGE plpgsql
    AS $$
  DECLARE
    old_fk_type INT;
    new_fk_type INT;
    result_info JSONB;
    has_type_properties INT[] = ARRAY[1110, 1190, 1205, 1206, 1214, 1204, 1066];
  BEGIN

    RAISE INFO 'entity_preview__create_fk_type of pk_entity: %, fk_project: %', param_pk_entity, param_fk_project;

    
    IF param_fk_project IS NULL THEN
      ------------------------------------ REPO QUERY ------------------------------------
      SELECT DISTINCT ea.fk_info_range INTO new_fk_type 
      FROM information.v_entity_association ea
      JOIN projects.info_proj_rel epr ON ea.pk_entity = epr.fk_entity
      JOIN data_for_history.property p ON ea.fk_property = p.dfh_pk_property
      WHERE p.dfh_pk_property = ANY (ARRAY[1110, 1190, 1205, 1206, 1214, 1204, 1066])
      AND ea.fk_info_domain = param_pk_entity
      AND ea.rank_for_domain = 1
      LIMIT 1;
    ELSE
        ---------------------------------- PROJECT QUERY ----------------------------------         
        SELECT DISTINCT ea.fk_info_range INTO new_fk_type 
        FROM information.entity_association ea
        JOIN projects.info_proj_rel epr ON ea.pk_entity = epr.fk_entity
        JOIN data_for_history.property p ON ea.fk_property = p.dfh_pk_property
        WHERE p.dfh_pk_property = ANY (has_type_properties)
        AND ea.fk_info_domain = param_pk_entity
        AND epr.is_in_project = true
        AND epr.fk_project = param_fk_project
        LIMIT 1;
    END IF; 

    RAISE INFO 'new_fk_type: %', new_fk_type;
		
        ----- Insert or update column fk_type of table entity_preview
        
        SELECT fk_type INTO old_fk_type FROM warehouse.entity_preview
        WHERE pk_entity = param_pk_entity AND fk_project IS NOT DISTINCT FROM param_fk_project;
		
		RAISE INFO 'old_fk_type: %', old_fk_type;

    IF NOT FOUND THEN 

        INSERT INTO warehouse.entity_preview (pk_entity, fk_project, fk_type)
        VALUES (param_pk_entity, param_fk_project, new_fk_type);

        RAISE INFO 'inserted new_fk_type: %', new_fk_type;

    ELSIF (SELECT (old_fk_type IS DISTINCT FROM new_fk_type)) THEN
      
        UPDATE warehouse.entity_preview 
        SET fk_type = new_fk_type
        where pk_entity=param_pk_entity AND fk_project IS NOT DISTINCT FROM param_fk_project;

        RAISE INFO 'updated object with new_fk_type: %', new_fk_type;
    ELSE
        RAISE INFO 'no update needed: %', new_fk_type;
    END IF;

    SELECT jsonb_build_object(
      'changed', (SELECT (old_fk_type IS DISTINCT FROM new_fk_type)),
      'old_val', old_fk_type,
      'new_val', new_fk_type) 
    INTO result_info;

    RETURN result_info;

  END;
  $$;


--
-- TOC entry 1242 (class 1255 OID 244049)
-- Name: entity_preview__create_related_full_texts(integer, integer); Type: FUNCTION; Schema: warehouse; Owner: -
--

CREATE FUNCTION warehouse.entity_preview__create_related_full_texts(param_pk_entity integer, param_fk_project integer) RETURNS boolean
    LANGUAGE plpgsql
    AS $$
  DECLARE 
    new_related_full_texts jsonb;
    param_project INT;
  BEGIN
      RAISE INFO 'entity_preview__create_related_full_texts pk_entity: %, fk_project: %', param_pk_entity, param_fk_project;
	
		param_project = coalesce(param_fk_project, 0);
		
     	---------------------- REPO AND PROJECT VERSIONS ----------------------
		WITH full_text_dependencies AS (
			SELECT r.fk_temporal_entity as pk_entity, r.project, r.fk_project, e.pk_entity as pk_related_full_text, pre.own_full_text
			FROM warehouse.v_roles_per_project_and_repo r
			JOIN information.entity e ON e.pk_entity = r.fk_entity AND e.table_name = 'persistent_item'
			LEFT JOIN warehouse.entity_preview pre ON pre.pk_entity = e.pk_entity AND pre.project = r.project
			WHERE r.fk_temporal_entity = param_pk_entity
			UNION
			SELECT r.fk_entity as pk_entity, r.project,  r.fk_project,  e.pk_entity as pk_related_full_text, pre.own_full_text
			FROM warehouse.v_roles_per_project_and_repo r
			JOIN information.entity e ON e.pk_entity = r.fk_temporal_entity AND e.table_name = 'temporal_entity'
			LEFT JOIN warehouse.entity_preview pre ON pre.pk_entity = e.pk_entity AND pre.project = r.project
			WHERE r.fk_entity = param_pk_entity
		), 
		aggregated_related_full_texts AS(
			select pk_entity, project, fk_project, jsonb_object_agg(full_text_dependencies.pk_related_full_text::text, full_text_dependencies.own_full_text) related_full_texts
			FROM full_text_dependencies
			group by pk_entity, project, fk_project
		)
        select related_full_texts INTO new_related_full_texts 
        FROM aggregated_related_full_texts;

        RAISE INFO 'new_related_full_texts: %', new_related_full_texts;

        ----- Insert or update the entity_preview
        
        PERFORM pk_entity 
        FROM warehouse.entity_preview pre
        WHERE pre.pk_entity = param_pk_entity 
        AND pre.fk_project IS NOT DISTINCT FROM  param_fk_project;

        IF NOT FOUND THEN 
            INSERT INTO warehouse.entity_preview (pk_entity, fk_project, project, related_full_texts)
            VALUES (param_pk_entity, param_fk_project, param_project, new_related_full_texts);

            RAISE INFO 'inserted new_related_full_texts: %', new_related_full_texts;

        ELSE
           
          UPDATE warehouse.entity_preview pre
                SET related_full_texts = new_related_full_texts
                where pre.pk_entity = param_pk_entity 
          AND pre.fk_project IS NOT DISTINCT FROM  param_fk_project
          AND (
            pre.related_full_texts @> new_related_full_texts
            AND
            pre.related_full_texts <@ new_related_full_texts
            )  IS DISTINCT FROM true;
   
        END IF;


      RETURN true;
  END;
  $$;


--
-- TOC entry 1709 (class 1255 OID 244056)
-- Name: entity_preview__fill_dependent_class_labels(integer, text); Type: FUNCTION; Schema: warehouse; Owner: -
--

CREATE FUNCTION warehouse.entity_preview__fill_dependent_class_labels(pk_class integer, param_class_label text DEFAULT NULL::text) RETURNS boolean
    LANGUAGE plpgsql
    AS $$
  DECLARE
    new_class_label TEXT;
  BEGIN
  
    ---------------------- REPO & PROJECTS VERSIONS ----------------------
               
    RAISE INFO 'entity_preview__fill_dependent_class_labels of pk_entity: %', pk_class;
  
    -- get new_class_label
    IF (param_class_label IS NULL) THEN 
      SELECT class_label INTO new_class_label
      FROM warehouse.class_preview
      WHERE dfh_pk_class = pk_class;
    ELSE
      new_class_label = param_class_label;
    END IF; 

    RAISE INFO 'new_class_label: %', new_class_label;
  
    -- update all dependent entity_previews with new_class_label (if DISTINCT)
    UPDATE warehouse.entity_preview
    SET class_label = new_class_label
    WHERE fk_class = pk_class
    AND class_label IS DISTINCT FROM new_class_label;
  
    RETURN true;
  END;
  $$;


--
-- TOC entry 1707 (class 1255 OID 244054)
-- Name: entity_preview__fill_dependent_entity_labels(integer, integer); Type: FUNCTION; Schema: warehouse; Owner: -
--

CREATE FUNCTION warehouse.entity_preview__fill_dependent_entity_labels(param_pk_entity integer, param_fk_project integer) RETURNS boolean
    LANGUAGE plpgsql
    AS $$
  DECLARE
  new_entity_label TEXT;
  dependent_entity_label TEXT;
  BEGIN
  
    ---------------------- REPO & PROJECTS VERSIONS ----------------------
               
    RAISE INFO 'entity_preview__fill_dependent_entity_labels of pk_entity: %, fk_project: %', param_pk_entity, param_fk_project;
  
    -- get new_entity_label
    SELECT entity_label INTO new_entity_label
    FROM warehouse.entity_preview
    WHERE pk_entity = param_pk_entity
    AND fk_project IS NOT DISTINCT FROM param_fk_project;
  
    RAISE INFO 'new_entity_label: %', new_entity_label;
  
    -- update all dependent entity_previews with new_entity_label (if DISTINCT)
    UPDATE warehouse.entity_preview
    SET entity_label = new_entity_label
    WHERE fk_entity_label = param_pk_entity
    AND fk_project IS NOT DISTINCT FROM param_fk_project
    AND entity_label IS DISTINCT FROM new_entity_label;
  
  
    RETURN true;
  END;
  $$;


--
-- TOC entry 1708 (class 1255 OID 244055)
-- Name: entity_preview__fill_dependent_related_full_texts(integer, integer); Type: FUNCTION; Schema: warehouse; Owner: -
--

CREATE FUNCTION warehouse.entity_preview__fill_dependent_related_full_texts(param_pk_entity integer, param_fk_project integer) RETURNS boolean
    LANGUAGE plpgsql
    AS $$
  DECLARE
  new_own_full_text TEXT;
  BEGIN
  
    ---------------------- REPO & PROJECTS VERSIONS ----------------------
               
    RAISE INFO 'entity_preview__fill_dependent_related_full_texts of pk_entity: %, fk_project: %', param_pk_entity, param_fk_project;
  
    -- get new_own_full_text
    SELECT own_full_text INTO new_own_full_text
    FROM warehouse.entity_preview
    WHERE pk_entity = param_pk_entity
    AND fk_project IS NOT DISTINCT FROM param_fk_project;
  
    RAISE INFO 'new_own_full_text: %', new_own_full_text;
  
  
    -- update all related_full_texts with new_own_full_text (if DISTINCT)
    UPDATE warehouse.entity_preview
    SET related_full_texts = (	
      SELECT jsonb_set(
        related_full_texts,
         array_agg(param_pk_entity::text),
         to_jsonb(new_own_full_text)
        )
      )												   
    WHERE related_full_texts ? param_pk_entity::text 
    AND related_full_texts->>param_pk_entity::text IS DISTINCT FROM new_own_full_text
    AND fk_project IS NOT DISTINCT FROM param_fk_project;
  
    RETURN true;
  END;
  $$;


--
-- TOC entry 1710 (class 1255 OID 244057)
-- Name: entity_preview__fill_dependent_type_labels(integer, integer); Type: FUNCTION; Schema: warehouse; Owner: -
--

CREATE FUNCTION warehouse.entity_preview__fill_dependent_type_labels(param_pk_entity integer, param_fk_project integer) RETURNS boolean
    LANGUAGE plpgsql
    AS $$
  DECLARE
  new_type_label TEXT;
  dependent_type_label TEXT;
  BEGIN
  
    ---------------------- REPO & PROJECTS VERSIONS ----------------------
               
    RAISE INFO 'entity_preview__fill_dependent_type_labels of pk_entity: %, fk_project: %', param_pk_entity, param_fk_project;
  
    -- get new_type_label
    SELECT entity_label INTO new_type_label
    FROM warehouse.entity_preview
    WHERE pk_entity = param_pk_entity
    AND fk_project IS NOT DISTINCT FROM param_fk_project;
  
    RAISE INFO 'new_type_label: %', new_type_label;
  
    -- update all dependent entity_previews with new_type_label (if DISTINCT)
    UPDATE warehouse.entity_preview
    SET type_label = new_type_label
    WHERE fk_type = param_pk_entity
    AND fk_project IS NOT DISTINCT FROM param_fk_project
    AND type_label IS DISTINCT FROM new_type_label;
  
    RETURN true;
  END;
  $$;


--
-- TOC entry 419 (class 1255 OID 244052)
-- Name: entity_preview__fill_own_entity_label(integer, integer); Type: FUNCTION; Schema: warehouse; Owner: -
--

CREATE FUNCTION warehouse.entity_preview__fill_own_entity_label(param_pk_entity integer, param_fk_project integer) RETURNS boolean
    LANGUAGE plpgsql
    AS $$
  DECLARE
  old_own_entity_label TEXT;
  new_own_entity_label TEXT;
  BEGIN

  
  
  -- if this has a fk_entity_label skip the whole function
  -- because the entity label is provided by that other entity 
  IF (
    SELECT (
      SELECT fk_entity_label 
      FROM warehouse.entity_preview
      WHERE pk_entity = param_pk_entity AND fk_project IS NOT DISTINCT FROM param_fk_project
      LIMIT 1
      ) IS NULL
  ) THEN
    
    IF param_fk_project IS NULL THEN
    
    ---------------------- REPO VERSIONS ----------------------
      RAISE INFO 'entity_preview__fill_own_entity_label of pk_entity: %, fk_project: %', param_pk_entity, param_fk_project;

      -- get the string new_own_entity_label

        
        WITH first_field AS (
          SELECT entity_field.fk_property, entity_field.fk_class_field, entity.pk_entity
          -- teen or peit
          from (
            SELECT t.pk_entity, t.fk_class 
          FROM information.temporal_entity as t
          WHERE  t.pk_entity = param_pk_entity
          UNION 
          SELECT p.pk_entity, p.fk_class 
          FROM information.persistent_item as p
          WHERE p.pk_entity = param_pk_entity
          ) as entity
          INNER JOIN  projects.info_proj_rel as epr on epr.fk_entity = entity.pk_entity 
          AND epr.is_in_project = true

          -- field
          INNER JOIN information.v_ordered_fields_per_class entity_field on entity_field.fk_class = entity.fk_class 
          AND field_order = 0
        ),
        string_from_first_role AS (

          SELECT COALESCE(appe.string, lang.notes) as string
          FROM
          first_field
          LEFT JOIN information.v_role as r
            on first_field.fk_property = r.fk_property
            and first_field.pk_entity = r.fk_temporal_entity
            and r.is_in_project_count > 0

            -----------------------------------------------------------
            -- get the strings directly connected to entity via role-fk_entity (not via intermediate entity/PeIt)

            --   appellation
            LEFT JOIN information.v_appellation as appe
            ON r.fk_entity = appe.pk_entity
            --   language
            LEFT JOIN information.v_language as lang
            ON r.fk_entity = lang.pk_entity
            --   time_primitive
            --   place

          LIMIT 1
        ),
        string_from_first_text_prop AS (

          SELECT txtp.string
          FROM information.v_text_property as txtp
          INNER JOIN first_field on first_field.fk_class_field = txtp.fk_class_field 
            AND txtp.fk_concerned_entity = first_field.pk_entity 
          INNER JOIN projects.info_proj_rel as epr ON epr.fk_entity=txtp.pk_entity
            AND  epr.is_in_project = true
          ORDER BY epr.ord_num
          LIMIT 1

        ),				   
        string AS (
          SELECT string
          FROM  string_from_first_role
          UNION
          SELECT string
          FROM string_from_first_text_prop
        )
        SELECT string INTO new_own_entity_label FROM string;

      ---------------------- PROJECTS VERSIONS ----------------------

      ELSE

      RAISE INFO 'entity_preview__fill_own_entity_label of pk_entity: %, fk_project: %', param_pk_entity, param_fk_project;

      -- get the string new_own_entity_label

      WITH first_field AS (
          SELECT entity_field.fk_property, entity_field.fk_class_field, entity.pk_entity
          -- teen or peit
          from (
            SELECT t.pk_entity, t.fk_class 
          FROM information.temporal_entity as t
          WHERE  t.pk_entity = param_pk_entity
          UNION 
          SELECT p.pk_entity, p.fk_class 
          FROM information.persistent_item as p
          WHERE p.pk_entity = param_pk_entity
          ) as entity
          INNER JOIN  projects.info_proj_rel as epr on epr.fk_entity = entity.pk_entity 
          AND epr.is_in_project = true

          -- field
          INNER JOIN information.v_ordered_fields_per_class entity_field on entity_field.fk_class = entity.fk_class 
          AND field_order = 0
        ),
        string_from_first_role AS (

          SELECT COALESCE(appe.string, lang.notes) as string
          FROM
          first_field
          LEFT JOIN information.v_role as r
            on first_field.fk_property = r.fk_property
            and first_field.pk_entity = r.fk_temporal_entity
            LEFT JOIN projects.info_proj_rel as epr2 
              on epr2.fk_entity = r.pk_entity 
              and epr2.fk_project = param_fk_project
              and epr2.is_in_project = true

            -----------------------------------------------------------
            -- get the strings directly connected to entity via role-fk_entity (not via intermediate entity/PeIt)

            --   appellation
            LEFT JOIN information.v_appellation as appe
            ON r.fk_entity = appe.pk_entity
            --   language
            LEFT JOIN information.v_language as lang
            ON r.fk_entity = lang.pk_entity
            --   time_primitive
            --   place

          ORDER BY epr2.ord_num
          LIMIT 1
        ), 
        string_from_first_text_prop AS (

          SELECT txtp.string
          FROM information.v_text_property as txtp
          INNER JOIN first_field on first_field.fk_class_field = txtp.fk_class_field 
            AND txtp.fk_concerned_entity = first_field.pk_entity 
          INNER JOIN projects.info_proj_rel as epr ON epr.fk_entity=txtp.pk_entity
            AND  epr.is_in_project = true AND epr.fk_project = param_fk_project
          ORDER BY epr.ord_num
          LIMIT 1

        ),				   
        string AS (
          SELECT string
          FROM  string_from_first_role
          UNION
          SELECT string
          FROM string_from_first_text_prop
        )
        SELECT string INTO new_own_entity_label FROM string;

        
        
      END IF; 
        

      RAISE INFO 'new_own_entity_label: %', new_own_entity_label;

      ----- Insert or update column own_entity_label of table entity_preview

      SELECT entity_label INTO old_own_entity_label FROM warehouse.entity_preview
      WHERE pk_entity = param_pk_entity AND fk_project IS NOT DISTINCT FROM param_fk_project;

      RAISE INFO 'old_own_entity_label: %', old_own_entity_label;

      IF NOT FOUND THEN 

        INSERT INTO warehouse.entity_preview (pk_entity, fk_project, entity_label)
        VALUES (param_pk_entity, param_fk_project, new_own_entity_label);

        RAISE INFO 'inserted new_own_entity_label: %', new_own_entity_label;

      ELSIF (SELECT (old_own_entity_label IS DISTINCT FROM new_own_entity_label)) THEN

        UPDATE warehouse.entity_preview 
        SET entity_label = new_own_entity_label
        where pk_entity=param_pk_entity AND fk_project IS NOT DISTINCT FROM param_fk_project;

        RAISE INFO 'updated object with new_own_entity_label: %', new_own_entity_label;
      ELSE
        RAISE INFO 'no update needed: %', new_own_entity_label;
      END IF;

    END IF;
    RETURN true;
  END;
  $$;


--
-- TOC entry 418 (class 1255 OID 244053)
-- Name: entity_preview__fill_own_full_text(integer, integer); Type: FUNCTION; Schema: warehouse; Owner: -
--

CREATE FUNCTION warehouse.entity_preview__fill_own_full_text(param_pk_entity integer, param_fk_project integer) RETURNS boolean
    LANGUAGE plpgsql
    AS $_$
  DECLARE
  old_own_full_text TEXT;
  new_own_full_text TEXT;
  BEGIN
  
    ---------------------- REPO VERSIONS ----------------------
  
    IF param_fk_project IS NULL THEN
  
      RAISE INFO 'entity_preview__fill_own_full_text of: pk_entity: %, fk_project: %', param_pk_entity, param_fk_project;
  
      -- get the string new_own_full_text
  
  
         WITH entity AS (
          SELECT t.pk_entity, t.fk_class 
          FROM information.temporal_entity as t
          WHERE  t.pk_entity = param_pk_entity
          UNION 
          SELECT p.pk_entity, p.fk_class 
          FROM information.persistent_item as p
          WHERE p.pk_entity = param_pk_entity
         ),
         fields AS (
          -- fields
          SELECT fields.fk_property, fields.fk_class_field, entity.pk_entity, field_order
          FROM information.v_ordered_fields_per_class AS fields 
          JOIN entity ON fields.fk_class = entity.fk_class 
          AND field_order IS NOT NULL
          ),
          strings_from_roles AS (
          SELECT COALESCE(appe.string, lang.notes) as string, field_order
          FROM fields
          JOIN information.v_role as r ON fields.fk_property = r.fk_property
            AND r.fk_temporal_entity = param_pk_entity AND r.is_in_project_count > 0
  
          -----------------------------------------------------------
          -- get the strings directly connected to entity via role-fk_entity (not via intermediate entity/PeIt)
  
          --   appellation
          LEFT JOIN information.v_appellation as appe
          ON r.fk_entity = appe.pk_entity
          --   language
          LEFT JOIN information.v_language as lang
          ON r.fk_entity = lang.pk_entity
          --   time_primitive
          --   place
          -----------------------------------------------------------
          ORDER BY r.rank_for_te_ent
          ), 
          strings_from_text_props AS (
  
          SELECT regexp_replace(txtp.string, E'[\n\r]+', '', 'g' ) as string, field_order
          FROM information.v_text_property as txtp
          INNER JOIN fields on fields.fk_class_field = txtp.fk_class_field 
            AND txtp.fk_concerned_entity = param_pk_entity
            -- TODO: Check if we need to exclude textproperties that are in 0 projects$
            -- TODO: Check if we need to order textproperties
          ),	   
          all_stings AS (
          SELECT string, field_order
          FROM  strings_from_roles
          UNION
          SELECT string, field_order
          FROM strings_from_text_props
          ),
          aggregated AS (
          SELECT 1, string_agg(string, ', ' ORDER BY field_order) as full_text
           FROM all_stings
            GROUP BY 1
          )					   
          SELECT full_text INTO new_own_full_text
          FROM aggregated;
  
      RAISE INFO 'new_own_full_text: %', new_own_full_text;
  
      ----- Insert or update column own_full_text of table entity_preview
  
      SELECT own_full_text INTO old_own_full_text FROM warehouse.entity_preview
      WHERE pk_entity = param_pk_entity AND fk_project IS NULL;
  
      RAISE INFO 'old_own_full_text: %', old_own_full_text;
  
      IF NOT FOUND THEN 
  
        INSERT INTO warehouse.entity_preview (pk_entity, fk_project, own_full_text)
        VALUES (param_pk_entity, param_fk_project, new_own_full_text);
  
        RAISE INFO 'inserted new_own_full_text: %', new_own_full_text;
  
      ELSIF (SELECT (old_own_full_text IS DISTINCT FROM new_own_full_text)) THEN
  
        UPDATE warehouse.entity_preview 
        SET own_full_text = new_own_full_text
        where pk_entity=param_pk_entity AND fk_project IS NULL;
  
        RAISE INFO 'updated object with new_own_full_text: %', new_own_full_text;
      ELSE
        RAISE INFO 'no update needed: %', new_own_full_text;
      END IF;
  
  
    ---------------------- PROJECTS VERSIONS ----------------------
  
    ELSE
               
      RAISE INFO 'entity_preview__fill_own_full_text of: pk_entity: %, fk_project: %', param_pk_entity, param_fk_project;
  
      -- get the string new_own_full_text
  
          WITH entity AS (
          SELECT t.pk_entity, t.fk_class 
          FROM information.temporal_entity as t
          WHERE  t.pk_entity = param_pk_entity
          UNION 
          SELECT p.pk_entity, p.fk_class 
          FROM information.persistent_item as p
          WHERE p.pk_entity = param_pk_entity
         ),
         fields AS (
          -- fields
          SELECT fields.fk_property, fields.fk_class_field, entity.pk_entity, field_order
          FROM information.v_ordered_fields_per_class AS fields 
          JOIN entity ON fields.fk_class = entity.fk_class 
          AND field_order IS NOT NULL
          ),
          strings_from_roles AS (
  
          SELECT COALESCE(appe.string, lang.notes) as string, field_order
          FROM fields
          JOIN information.v_role as r ON fields.fk_property = r.fk_property
            AND r.fk_temporal_entity = param_pk_entity
            LEFT JOIN projects.info_proj_rel as epr ON epr.fk_entity = r.pk_entity 
            AND epr.fk_project = param_fk_project	AND epr.is_in_project = true
  
          -----------------------------------------------------------
          -- get the strings directly connected to entity via role-fk_entity (not via intermediate entity/PeIt)
  
          --   appellation
          LEFT JOIN information.v_appellation as appe
          ON r.fk_entity = appe.pk_entity
          --   language
          LEFT JOIN information.v_language as lang
          ON r.fk_entity = lang.pk_entity
          --   time_primitive
          --   place
          -----------------------------------------------------------
          ORDER BY epr.ord_num
          ), 
          strings_from_text_props AS (
  
          SELECT regexp_replace(txtp.string, E'[\n\r]+', '', 'g' ) as string, field_order
          FROM information.v_text_property as txtp
          INNER JOIN fields on fields.fk_class_field = txtp.fk_class_field 
            AND txtp.fk_concerned_entity = param_pk_entity
          INNER JOIN projects.info_proj_rel as epr ON epr.fk_entity = txtp.pk_entity
            AND  epr.is_in_project = true AND epr.fk_project = param_fk_project
          ORDER BY epr.ord_num
          ),	   
          all_stings AS (
          SELECT string, field_order
          FROM  strings_from_roles
          UNION
          SELECT string, field_order
          FROM strings_from_text_props
          ),
          aggregated AS (
          SELECT 1, string_agg(string, ', ' ORDER BY field_order) as full_text
           FROM all_stings
            GROUP BY 1
          )					   
          SELECT full_text INTO new_own_full_text
          FROM aggregated;
               
  
      RAISE INFO 'new_own_full_text: %', new_own_full_text;
  
      ----- Insert or update column own_full_text of table entity_preview
  
      SELECT own_full_text INTO old_own_full_text FROM warehouse.entity_preview
      WHERE pk_entity = param_pk_entity AND fk_project = param_fk_project;
  
      RAISE INFO 'old_own_full_text: %', old_own_full_text;
  
      IF NOT FOUND THEN 
  
        INSERT INTO warehouse.entity_preview (pk_entity, fk_project, own_full_text)
        VALUES (param_pk_entity, param_fk_project, new_own_full_text);
  
        RAISE INFO 'inserted new_own_full_text: %', new_own_full_text;
  
      ELSIF (SELECT (old_own_full_text IS DISTINCT FROM new_own_full_text)) THEN
  
        UPDATE warehouse.entity_preview 
        SET own_full_text = new_own_full_text
        where pk_entity=param_pk_entity AND fk_project=param_fk_project;
  
        RAISE INFO 'updated object with new_own_full_text: %', new_own_full_text;
      ELSE
        RAISE INFO 'no update needed: %', new_own_full_text;
      END IF;
  
    END IF; 
  
    RETURN true;
  END;
  $_$;


--
-- TOC entry 417 (class 1255 OID 244058)
-- Name: entity_preview__fill_time_span(integer, integer); Type: FUNCTION; Schema: warehouse; Owner: -
--

CREATE FUNCTION warehouse.entity_preview__fill_time_span(param_pk_entity integer, param_fk_project integer) RETURNS boolean
    LANGUAGE plpgsql
    AS $$
  DECLARE
  new_time_span jsonb;
  BEGIN
  
    ---------------------- REPO & PROJECTS VERSIONS ----------------------
               
    RAISE INFO 'entity_preview__fill_time_span: %, fk_project: %', param_pk_entity, param_fk_project;
  
    -- get new_time_span
	SELECT time_span INTO new_time_span
	FROM warehouse.v_te_en_time_span_per_project_and_repo
	WHERE fk_temporal_entity = param_pk_entity 
	AND fk_project IS NOT DISTINCT FROM param_fk_project;
  
    RAISE INFO 'new_time_span: %', new_time_span;
  
    -- update this entity_preview with new_time_span
    UPDATE warehouse.entity_preview
    SET time_span = new_time_span
    WHERE pk_entity = param_pk_entity
    AND fk_project IS NOT DISTINCT FROM param_fk_project;
  
    RETURN true;
  END;
  $$;


--
-- TOC entry 1715 (class 1255 OID 244064)
-- Name: entity_preview__get_entity_label(); Type: FUNCTION; Schema: warehouse; Owner: -
--

CREATE FUNCTION warehouse.entity_preview__get_entity_label() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
    BEGIN
    
      RAISE INFO 'Called TRIGGER FUNCTION entity_preview__get_entity_label; pk_entity: % fk_project: %', NEW.pk_entity, NEW.fk_project;

      IF (NEW.fk_entity_label IS NOT NULL) THEN
        UPDATE warehouse.entity_preview
        SET entity_label = pre.entity_label
        FROM (
          SELECT entity_label 
          FROM warehouse.entity_preview
          WHERE pk_entity = NEW.fk_entity_label
          AND fk_project IS NOT DISTINCT FROM NEW.fk_project
        ) as pre
        WHERE pk_entity = NEW.pk_entity
        AND fk_project IS NOT DISTINCT FROM NEW.fk_project;
      END IF;

      RETURN NEW;
    END;
    $$;


--
-- TOC entry 1527 (class 1255 OID 244065)
-- Name: entity_preview__get_type_label(); Type: FUNCTION; Schema: warehouse; Owner: -
--

CREATE FUNCTION warehouse.entity_preview__get_type_label() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
    BEGIN
    
      RAISE INFO 'Called TRIGGER FUNCTION entity_preview__get_type_label; pk_entity: % fk_project: %', NEW.pk_entity, NEW.fk_project;

      IF (NEW.fk_type IS NOT NULL) THEN
      UPDATE warehouse.entity_preview
      SET type_label = pre.entity_label
      FROM (
        SELECT entity_label 
        FROM warehouse.entity_preview
        WHERE pk_entity = NEW.fk_type
        AND fk_project IS NOT DISTINCT FROM NEW.fk_project
      ) as pre
      WHERE pk_entity = NEW.pk_entity
      AND fk_project IS NOT DISTINCT FROM NEW.fk_project;
    END IF;

      RETURN NEW;
    END;
    $$;


--
-- TOC entry 1719 (class 1255 OID 244070)
-- Name: entity_preview__notify_upsert(); Type: FUNCTION; Schema: warehouse; Owner: -
--

CREATE FUNCTION warehouse.entity_preview__notify_upsert() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
    BEGIN
      PERFORM pg_notify('entity_preview_updated'::text, json_build_object(
        'pk_entity', NEW.pk_entity,
      'fk_project', NEW.fk_project,
          'project', NEW.project,
          'fk_class', NEW.fk_class,
          'entity_type', NEW.entity_type,
          'class_label', NEW.class_label,
          'entity_label', NEW.entity_label,
          'time_span', NEW.time_span,
          'fk_type', NEW.fk_type,
          'type_label', NEW.type_label
      )::text);
    RETURN NEW;
    END;
    $$;


--
-- TOC entry 1720 (class 1255 OID 244069)
-- Name: entity_preview__update_dependent_class_labels(); Type: FUNCTION; Schema: warehouse; Owner: -
--

CREATE FUNCTION warehouse.entity_preview__update_dependent_class_labels() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
      BEGIN
      
        RAISE INFO 'Called TRIGGER FUNCTION entity_preview__update_dependent_class_labels; dfh_pk_class: % class_label: %', NEW.dfh_pk_class, NEW.class_label;

        PERFORM warehouse.entity_preview__fill_dependent_class_labels(NEW.dfh_pk_class, NEW.class_label);


        RETURN NEW;
      END;
      $$;


--
-- TOC entry 1718 (class 1255 OID 244068)
-- Name: entity_preview__update_dependent_entity_labels(); Type: FUNCTION; Schema: warehouse; Owner: -
--

CREATE FUNCTION warehouse.entity_preview__update_dependent_entity_labels() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
    BEGIN
    
      RAISE INFO 'Called TRIGGER FUNCTION entity_preview__update_dependent_entity_labels; pk_entity: % fk_project: %', NEW.pk_entity, NEW.fk_project;

      PERFORM 
      warehouse.entity_preview__fill_dependent_entity_labels(NEW.pk_entity, NEW.fk_project),
      warehouse.entity_preview__fill_dependent_type_labels(NEW.pk_entity, NEW.fk_project);

      RETURN NEW;
    END;
    $$;


--
-- TOC entry 1717 (class 1255 OID 244067)
-- Name: entity_preview__update_dependent_related_full_texts(); Type: FUNCTION; Schema: warehouse; Owner: -
--

CREATE FUNCTION warehouse.entity_preview__update_dependent_related_full_texts() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
    BEGIN
    
      RAISE INFO 'Called TRIGGER FUNCTION entity_preview__update_dependent_related_full_texts; pk_entity: % fk_project: %', NEW.pk_entity, NEW.fk_project;
        
      PERFORM warehouse.entity_preview__fill_dependent_related_full_texts(NEW.pk_entity, NEW.fk_project);

      RETURN NEW;
    END;
    $$;


--
-- TOC entry 1712 (class 1255 OID 244063)
-- Name: entity_preview__upsert_entity_preview(); Type: FUNCTION; Schema: warehouse; Owner: -
--

CREATE FUNCTION warehouse.entity_preview__upsert_entity_preview() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
    DECLARE
      _table_name VARCHAR;
      _fk_project INT;
      _fk_entity INT;
      _fk_temporal_entity INT;
      _fk_info_domain INT;
      _fk_info_range INT;
      _BOOL BOOLEAN;
      _result JSONB;
      _new_label TEXT;
      BEGIN
      
        _fk_project = NEW.fk_project;
        
        SELECT table_name INTO _table_name
        FROM information.entity e
        WHERE e.pk_entity = NEW.fk_entity;

        
        --------------------- text_property ---------------------
        IF (SELECT _table_name = 'text_property') THEN
        
          SELECT t.fk_concerned_entity into _fk_entity
          FROM information.text_property t
          WHERE t.pk_entity = NEW.fk_entity;
          
          RAISE INFO 'updated epr of text_property for entity: %, fk_project: %', _fk_entity, _fk_project;

          PERFORM
          -- fill own entity label
          warehouse.needs_update('entity_preview__fill_own_entity_label'::text, ARRAY[_fk_entity::text, _fk_project::text]),
          warehouse.needs_update('entity_preview__fill_own_entity_label'::text, ARRAY[_fk_entity::text, NULL::text]),
          
          -- fill own full text
          warehouse.needs_update('entity_preview__fill_own_full_text'::text, ARRAY[_fk_entity::text, _fk_project::text]),
          warehouse.needs_update('entity_preview__fill_own_full_text'::text, ARRAY[_fk_entity::text, NULL::text]);
          
          
        --------------------- role -----------------------------
        ELSIF (SELECT _table_name = 'role') THEN
          
          SELECT r.fk_entity into _fk_entity
          FROM information.role r
          WHERE r.pk_entity = NEW.fk_entity;
          SELECT r.fk_temporal_entity into _fk_temporal_entity
          FROM information.role r
          WHERE r.pk_entity = NEW.fk_entity;
          
          RAISE INFO 'updated epr of role of pk_entity: %, fk_temporal_entity: %, fk_project: %', _fk_entity, _fk_temporal_entity, _fk_project;
        
          PERFORM

          -- fill own entity label
          warehouse.needs_update('entity_preview__fill_own_entity_label'::text, ARRAY[_fk_entity::text, _fk_project::text]),
          warehouse.needs_update('entity_preview__fill_own_entity_label'::text, ARRAY[_fk_entity::text, NULL::text]),
          warehouse.needs_update('entity_preview__fill_own_entity_label'::text, ARRAY[_fk_temporal_entity::text, _fk_project::text]),
          warehouse.needs_update('entity_preview__fill_own_entity_label'::text, ARRAY[_fk_temporal_entity::text, NULL::text]),
          
          -- fill own full text
          warehouse.needs_update('entity_preview__fill_own_full_text'::text, ARRAY[_fk_entity::text, _fk_project::text]),
          warehouse.needs_update('entity_preview__fill_own_full_text'::text, ARRAY[_fk_entity::text, NULL::text]),
          warehouse.needs_update('entity_preview__fill_own_full_text'::text, ARRAY[_fk_temporal_entity::text, _fk_project::text]),
          warehouse.needs_update('entity_preview__fill_own_full_text'::text, ARRAY[_fk_temporal_entity::text, NULL::text]),

          -- fill time span 
          warehouse.needs_update('entity_preview__fill_time_span'::text, ARRAY[_fk_temporal_entity::text, _fk_project::text]),
          warehouse.needs_update('entity_preview__fill_time_span'::text, ARRAY[_fk_temporal_entity::text, NULL::text]),

          -- create fk entity label
          warehouse.needs_update('entity_preview__create_fk_entity_label'::text, ARRAY[_fk_entity::text, _fk_project::text]),
          warehouse.needs_update('entity_preview__create_fk_entity_label'::text, ARRAY[_fk_entity::text, NULL::text]),
          warehouse.needs_update('entity_preview__create_fk_entity_label'::text, ARRAY[_fk_temporal_entity::text, _fk_project::text]),
          warehouse.needs_update('entity_preview__create_fk_entity_label'::text, ARRAY[_fk_temporal_entity::text, NULL::text]),

          -- create related full texts
          warehouse.needs_update('entity_preview__create_related_full_texts'::text, ARRAY[_fk_entity::text, _fk_project::text]),
          warehouse.needs_update('entity_preview__create_related_full_texts'::text, ARRAY[_fk_entity::text, NULL::text]),
          warehouse.needs_update('entity_preview__create_related_full_texts'::text, ARRAY[_fk_temporal_entity::text, _fk_project::text]),
          warehouse.needs_update('entity_preview__create_related_full_texts'::text, ARRAY[_fk_temporal_entity::text, NULL::text]);
          
        --------------------- entity_association -----------------
        ELSIF (SELECT _table_name = 'entity_association') THEN
          SELECT ea.fk_info_domain into _fk_info_domain
          FROM information.entity_association ea
          WHERE ea.pk_entity = NEW.fk_entity;
          SELECT ea.fk_info_range into _fk_info_range
          FROM information.entity_association ea
          WHERE ea.pk_entity = NEW.fk_entity;

          RAISE INFO 'updated epr of entity_association with fk_info_domain: %, fk_info_range: %, fk_project: %', _fk_info_domain, _fk_info_range, _fk_project;
          
          PERFORM

          -- create fk type
          warehouse.needs_update('entity_preview__create_fk_type'::text, ARRAY[_fk_info_domain::text, _fk_project::text]),
          warehouse.needs_update('entity_preview__create_fk_type'::text, ARRAY[_fk_info_domain::text, NULL::text]),
          warehouse.needs_update('entity_preview__create_fk_type'::text, ARRAY[_fk_info_range::text, _fk_project::text]),
          warehouse.needs_update('entity_preview__create_fk_type'::text, ARRAY[_fk_info_range::text, NULL::text]);

        --------------------- temporal_entity or persistent_item -----------------
        ELSIF (SELECT _table_name IN ('temporal_entity', 'persistent_item')) THEN
        
          RAISE INFO 'updated crm entity with pk_entity: %, fk_project: %', NEW.fk_entity, _fk_project;
          
          IF (NEW.is_in_project = true) THEN
            PERFORM
            -- create fk type
            warehouse.needs_update('entity_preview__create'::text, ARRAY[NEW.fk_entity::text, _fk_project::text]),
            warehouse.needs_update('entity_preview__create'::text, ARRAY[NEW.fk_entity::text, NULL::text]);

          ELSIF (NEW.is_in_project = false) THEN

            DELETE FROM warehouse.entity_preview 
            WHERE fk_project IS NOT DISTINCT FROM NEW.fk_project 
            AND pk_entity = NEW.fk_entity;

          END IF;
        END IF;
      
      
      
      RETURN NEW;
    END;
    $$;


--
-- TOC entry 1714 (class 1255 OID 244062)
-- Name: needs_update(text, text[]); Type: FUNCTION; Schema: warehouse; Owner: -
--

CREATE FUNCTION warehouse.needs_update(fn_name text, fn_params text[]) RETURNS boolean
    LANGUAGE plpgsql
    AS $$
  DECLARE 
    fn_name_concat TEXT;
  BEGIN

    fn_name_concat = array_to_string(ARRAY['warehouse.', fn_name],'');

    PERFORM warehouse.notify_fn_call('warehouse_update_request'::text, fn_name_concat, fn_params);
  
  RETURN TRUE;

  END;
  $$;


--
-- TOC entry 1713 (class 1255 OID 244061)
-- Name: notify_fn_call(text, text, text[]); Type: FUNCTION; Schema: warehouse; Owner: -
--

CREATE FUNCTION warehouse.notify_fn_call(channel text, fn_name text, fn_params text[]) RETURNS boolean
    LANGUAGE plpgsql
    AS $$
  DECLARE 
    fn_concat TEXT;
  BEGIN

    fn_concat = fn_name || '(' || array_to_string(fn_params, ',', 'NULL'::text) || ')';

    PERFORM pg_notify(
      channel, 
      json_build_object('fn', fn_concat)::text
    );
  
  RETURN TRUE;

  END;
  $$;


--
-- TOC entry 1035 (class 1255 OID 243983)
-- Name: update_class_preview__on_class_profile_view_upsert(); Type: FUNCTION; Schema: warehouse; Owner: -
--

CREATE FUNCTION warehouse.update_class_preview__on_class_profile_view_upsert() RETURNS trigger
    LANGUAGE plpgsql
    AS $$ 
  DECLARE
      label text;
      entity_type text;
  BEGIN

  INSERT INTO warehouse.class_preview (dfh_pk_class, class_label, entity_type)  
  SELECT v.dfh_pk_class, v.class_label, v.entity_type 
  FROM information.v_class_preview as v
  WHERE v.dfh_pk_class = NEW.dfh_fk_class
  ON CONFLICT (dfh_pk_class) 
    DO 
      UPDATE 
        SET (class_label, entity_type) = (
            SELECT v.class_label, v.entity_type 
            FROM information.v_class_preview as v
            WHERE v.dfh_pk_class = NEW.dfh_fk_class
          );
  
  RETURN NEW;

  END;
  $$;


--
-- TOC entry 801 (class 1255 OID 243980)
-- Name: update_class_preview__on_label_delete(); Type: FUNCTION; Schema: warehouse; Owner: -
--

CREATE FUNCTION warehouse.update_class_preview__on_label_delete() RETURNS trigger
    LANGUAGE plpgsql
    AS $$ BEGIN

  -- If it is a geovistory class label
  IF (OLD.dfh_fk_class IS NOT NULL AND OLD.com_fk_system_type = 184) THEN

    UPDATE warehouse.class_preview
    SET class_label = (
      SELECT dfh_standard_label 
      FROM data_for_history.class
      WHERE dfh_pk_class = OLD.dfh_fk_class
      )
    WHERE dfh_pk_class = OLD.dfh_fk_class;

  END IF;

  RETURN OLD;

  END;
  $$;


--
-- TOC entry 698 (class 1255 OID 243979)
-- Name: update_class_preview__on_label_upsert(); Type: FUNCTION; Schema: warehouse; Owner: -
--

CREATE FUNCTION warehouse.update_class_preview__on_label_upsert() RETURNS trigger
    LANGUAGE plpgsql
    AS $$ BEGIN

  
  -- If it is a geovistory class label
  IF ( NEW.dfh_fk_class IS NOT NULL AND NEW.com_fk_system_type = 184) THEN
  
    UPDATE warehouse.class_preview
    SET class_label = NEW.dfh_label
    WHERE dfh_pk_class = NEW.dfh_fk_class;
    
  END IF;

  RETURN NEW;

  END;
  $$;


--
-- TOC entry 343 (class 1259 OID 244682)
-- Name: text; Type: TABLE; Schema: commons; Owner: -
--

CREATE TABLE commons.text (
    pk_text integer NOT NULL,
    schema_name character varying NOT NULL,
    table_name character varying NOT NULL,
    entity_version integer NOT NULL,
    quill_doc jsonb NOT NULL,
    string text NOT NULL,
    CONSTRAINT text_quill_doc_check CHECK (commons.validate_quill_doc(quill_doc))
);


--
-- TOC entry 342 (class 1259 OID 244680)
-- Name: text_pk_text_seq; Type: SEQUENCE; Schema: commons; Owner: -
--

CREATE SEQUENCE commons.text_pk_text_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 6159 (class 0 OID 0)
-- Dependencies: 342
-- Name: text_pk_text_seq; Type: SEQUENCE OWNED BY; Schema: commons; Owner: -
--

ALTER SEQUENCE commons.text_pk_text_seq OWNED BY commons.text.pk_text;


--
-- TOC entry 344 (class 1259 OID 244692)
-- Name: text_vt; Type: TABLE; Schema: commons; Owner: -
--

CREATE TABLE commons.text_vt (
    pk_text integer NOT NULL,
    schema_name character varying NOT NULL,
    table_name character varying NOT NULL,
    entity_version integer NOT NULL,
    quill_doc jsonb NOT NULL,
    string text NOT NULL
);


--
-- TOC entry 345 (class 1259 OID 244700)
-- Name: v_text_version; Type: VIEW; Schema: commons; Owner: -
--

CREATE VIEW commons.v_text_version AS
 SELECT t.pk_text,
    t.schema_name,
    t.table_name,
    t.entity_version,
    t.quill_doc,
    t.string,
    concat(((t.pk_text || '_'::text) || t.entity_version)) AS pk_text_version
   FROM commons.text t
UNION ALL
 SELECT t.pk_text,
    t.schema_name,
    t.table_name,
    t.entity_version,
    t.quill_doc,
    t.string,
    concat(((t.pk_text || '_'::text) || t.entity_version)) AS pk_text_version
   FROM commons.text_vt t;


--
-- TOC entry 360 (class 1259 OID 245294)
-- Name: entity; Type: TABLE; Schema: data; Owner: -
--

CREATE TABLE data.entity (
    pk_entity integer NOT NULL,
    schema_name character varying NOT NULL,
    table_name character varying NOT NULL,
    entity_version integer NOT NULL,
    notes text,
    fk_namespace integer,
    fk_creator integer,
    fk_last_modifier integer,
    tmsp_creation timestamp with time zone DEFAULT now(),
    tmsp_last_modification timestamp with time zone,
    sys_period tstzrange DEFAULT tstzrange(now(), NULL::timestamp with time zone),
    metadata jsonb
);


--
-- TOC entry 385 (class 1259 OID 245880)
-- Name: avatar; Type: TABLE; Schema: data; Owner: -
--

CREATE TABLE data.avatar (
    fk_class integer NOT NULL
)
INHERITS (data.entity);


--
-- TOC entry 386 (class 1259 OID 245899)
-- Name: avatar_vt; Type: TABLE; Schema: data; Owner: -
--

CREATE TABLE data.avatar_vt (
    pk_entity integer NOT NULL,
    schema_name character varying NOT NULL,
    table_name character varying NOT NULL,
    entity_version integer NOT NULL,
    notes text,
    fk_namespace integer,
    fk_creator integer,
    fk_last_modifier integer,
    tmsp_creation timestamp with time zone,
    tmsp_last_modification timestamp with time zone,
    sys_period tstzrange,
    metadata jsonb,
    fk_class integer NOT NULL
);


--
-- TOC entry 367 (class 1259 OID 245520)
-- Name: cell; Type: TABLE; Schema: data; Owner: -
--

CREATE TABLE data.cell (
    fk_column integer NOT NULL,
    fk_row integer NOT NULL,
    pk_text integer DEFAULT nextval('commons.text_pk_text_seq'::regclass),
    quill_doc jsonb,
    string text DEFAULT ''::text,
    CONSTRAINT text_quill_doc_check CHECK (commons.validate_quill_doc(quill_doc))
)
INHERITS (data.entity, commons.text);


--
-- TOC entry 368 (class 1259 OID 245544)
-- Name: cell_vt; Type: TABLE; Schema: data; Owner: -
--

CREATE TABLE data.cell_vt (
    pk_entity integer NOT NULL,
    schema_name character varying,
    table_name character varying,
    entity_version integer,
    notes text,
    fk_namespace integer,
    fk_creator integer,
    fk_last_modifier integer,
    tmsp_creation timestamp with time zone,
    tmsp_last_modification timestamp with time zone,
    sys_period tstzrange,
    metadata jsonb,
    fk_column integer NOT NULL,
    fk_row integer NOT NULL,
    pk_text integer DEFAULT nextval('commons.text_pk_text_seq'::regclass),
    quill_doc jsonb,
    string text DEFAULT ''::text,
    CONSTRAINT text_quill_doc_check CHECK (commons.validate_quill_doc(quill_doc))
)
INHERITS (commons.text_vt);


--
-- TOC entry 361 (class 1259 OID 245393)
-- Name: chunk; Type: TABLE; Schema: data; Owner: -
--

CREATE TABLE data.chunk (
    fk_text integer,
    fk_entity_version integer,
    pk_text integer DEFAULT nextval('commons.text_pk_text_seq'::regclass),
    quill_doc jsonb,
    string text DEFAULT ''::text,
    CONSTRAINT text_quill_doc_check CHECK (commons.validate_quill_doc(quill_doc))
)
INHERITS (data.entity, commons.text);


--
-- TOC entry 362 (class 1259 OID 245412)
-- Name: chunk_vt; Type: TABLE; Schema: data; Owner: -
--

CREATE TABLE data.chunk_vt (
    pk_entity integer NOT NULL,
    schema_name character varying,
    table_name character varying,
    entity_version integer,
    notes text,
    fk_namespace integer,
    fk_creator integer,
    fk_last_modifier integer,
    tmsp_creation timestamp with time zone,
    tmsp_last_modification timestamp with time zone,
    sys_period tstzrange,
    metadata jsonb,
    fk_text integer,
    fk_entity_version integer,
    pk_text integer DEFAULT nextval('commons.text_pk_text_seq'::regclass),
    quill_doc jsonb,
    string text DEFAULT ''::text,
    CONSTRAINT text_quill_doc_check CHECK (commons.validate_quill_doc(quill_doc))
)
INHERITS (commons.text_vt);


--
-- TOC entry 373 (class 1259 OID 245662)
-- Name: class_column_rel; Type: TABLE; Schema: data; Owner: -
--

CREATE TABLE data.class_column_rel (
    fk_class integer NOT NULL,
    fk_column integer NOT NULL
)
INHERITS (data.entity);


--
-- TOC entry 374 (class 1259 OID 245686)
-- Name: class_column_rel_vt; Type: TABLE; Schema: data; Owner: -
--

CREATE TABLE data.class_column_rel_vt (
    pk_entity integer NOT NULL,
    schema_name character varying NOT NULL,
    table_name character varying NOT NULL,
    entity_version integer NOT NULL,
    notes text,
    fk_namespace integer,
    fk_creator integer,
    fk_last_modifier integer,
    tmsp_creation timestamp with time zone,
    tmsp_last_modification timestamp with time zone,
    sys_period tstzrange,
    metadata jsonb,
    fk_class integer NOT NULL,
    fk_column integer NOT NULL
);


--
-- TOC entry 365 (class 1259 OID 245482)
-- Name: column; Type: TABLE; Schema: data; Owner: -
--

CREATE TABLE data."column" (
    fk_digital integer NOT NULL,
    fk_data_type integer NOT NULL,
    fk_meta_data integer NOT NULL
)
INHERITS (data.entity);


--
-- TOC entry 366 (class 1259 OID 245511)
-- Name: column_vt; Type: TABLE; Schema: data; Owner: -
--

CREATE TABLE data.column_vt (
    pk_entity integer NOT NULL,
    schema_name character varying NOT NULL,
    table_name character varying NOT NULL,
    entity_version integer NOT NULL,
    notes text,
    fk_namespace integer,
    fk_creator integer,
    fk_last_modifier integer,
    tmsp_creation timestamp with time zone,
    tmsp_last_modification timestamp with time zone,
    sys_period tstzrange,
    metadata jsonb,
    fk_digital integer NOT NULL,
    fk_data_type integer NOT NULL,
    fk_meta_data integer NOT NULL
);


--
-- TOC entry 383 (class 1259 OID 245852)
-- Name: data_association; Type: TABLE; Schema: data; Owner: -
--

CREATE TABLE data.data_association (
    fk_property integer NOT NULL,
    fk_data_domain integer,
    fk_data_range integer,
    fk_info_domain integer,
    fk_info_range integer
)
INHERITS (data.entity);


--
-- TOC entry 384 (class 1259 OID 245871)
-- Name: data_association_vt; Type: TABLE; Schema: data; Owner: -
--

CREATE TABLE data.data_association_vt (
    pk_entity integer NOT NULL,
    schema_name character varying NOT NULL,
    table_name character varying NOT NULL,
    entity_version integer NOT NULL,
    notes text,
    fk_namespace integer,
    fk_creator integer,
    fk_last_modifier integer,
    tmsp_creation timestamp with time zone,
    tmsp_last_modification timestamp with time zone,
    sys_period tstzrange,
    metadata jsonb,
    fk_property integer NOT NULL,
    fk_data_domain integer,
    fk_data_range integer,
    fk_info_domain integer,
    fk_info_range integer
);


--
-- TOC entry 239 (class 1259 OID 240500)
-- Name: entity_pk_entity_seq; Type: SEQUENCE; Schema: information; Owner: -
--

CREATE SEQUENCE information.entity_pk_entity_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 6160 (class 0 OID 0)
-- Dependencies: 239
-- Name: entity_pk_entity_seq; Type: SEQUENCE OWNED BY; Schema: information; Owner: -
--

ALTER SEQUENCE information.entity_pk_entity_seq OWNED BY information.entity.pk_entity;


--
-- TOC entry 280 (class 1259 OID 241256)
-- Name: digital; Type: TABLE; Schema: data; Owner: -
--

CREATE TABLE data.digital (
    pk_entity integer DEFAULT nextval('information.entity_pk_entity_seq'::regclass),
    schema_name character varying,
    table_name character varying,
    notes text,
    fk_creator integer,
    fk_last_modifier integer,
    tmsp_creation timestamp with time zone DEFAULT now(),
    tmsp_last_modification timestamp with time zone,
    sys_period tstzrange DEFAULT tstzrange(now(), NULL::timestamp with time zone),
    _deprecated_pk_digital_object integer NOT NULL,
    _deprecated_js_quill_data json,
    entity_version integer DEFAULT 1,
    metadata jsonb,
    fk_namespace integer,
    pk_text integer DEFAULT nextval('commons.text_pk_text_seq'::regclass),
    quill_doc jsonb,
    string text DEFAULT ''::text,
    fk_system_type integer,
    CONSTRAINT text_quill_doc_check CHECK (commons.validate_quill_doc(quill_doc))
)
INHERITS (data.entity, commons.text);


--
-- TOC entry 279 (class 1259 OID 241254)
-- Name: digital_object_pk_digital_object_seq; Type: SEQUENCE; Schema: data; Owner: -
--

CREATE SEQUENCE data.digital_object_pk_digital_object_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 6161 (class 0 OID 0)
-- Dependencies: 279
-- Name: digital_object_pk_digital_object_seq; Type: SEQUENCE OWNED BY; Schema: data; Owner: -
--

ALTER SEQUENCE data.digital_object_pk_digital_object_seq OWNED BY data.digital._deprecated_pk_digital_object;


--
-- TOC entry 313 (class 1259 OID 243129)
-- Name: digital_vt; Type: TABLE; Schema: data; Owner: -
--

CREATE TABLE data.digital_vt (
    pk_entity integer NOT NULL,
    schema_name character varying,
    table_name character varying,
    notes text,
    fk_creator integer,
    fk_last_modifier integer,
    tmsp_creation timestamp with time zone,
    tmsp_last_modification timestamp with time zone,
    sys_period tstzrange,
    _deprecated_pk_digital_object integer NOT NULL,
    _deprecated_js_quill_data json,
    entity_version integer,
    fk_namespace integer,
    pk_text integer DEFAULT nextval('commons.text_pk_text_seq'::regclass),
    quill_doc jsonb,
    string text DEFAULT ''::text,
    CONSTRAINT text_quill_doc_check CHECK (commons.validate_quill_doc(quill_doc))
)
INHERITS (commons.text_vt);


--
-- TOC entry 359 (class 1259 OID 245292)
-- Name: entity_pk_entity_seq; Type: SEQUENCE; Schema: data; Owner: -
--

CREATE SEQUENCE data.entity_pk_entity_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 6162 (class 0 OID 0)
-- Dependencies: 359
-- Name: entity_pk_entity_seq; Type: SEQUENCE OWNED BY; Schema: data; Owner: -
--

ALTER SEQUENCE data.entity_pk_entity_seq OWNED BY data.entity.pk_entity;


--
-- TOC entry 377 (class 1259 OID 245733)
-- Name: factoid; Type: TABLE; Schema: data; Owner: -
--

CREATE TABLE data.factoid (
    fk_class integer NOT NULL
)
INHERITS (data.entity);


--
-- TOC entry 369 (class 1259 OID 245586)
-- Name: factoid_class_digital_rel; Type: TABLE; Schema: data; Owner: -
--

CREATE TABLE data.factoid_class_digital_rel (
    fk_digital integer NOT NULL,
    fk_class integer NOT NULL
)
INHERITS (data.entity);


--
-- TOC entry 370 (class 1259 OID 245610)
-- Name: factoid_class_digital_rel_vt; Type: TABLE; Schema: data; Owner: -
--

CREATE TABLE data.factoid_class_digital_rel_vt (
    pk_entity integer NOT NULL,
    schema_name character varying NOT NULL,
    table_name character varying NOT NULL,
    entity_version integer NOT NULL,
    notes text,
    fk_namespace integer,
    fk_creator integer,
    fk_last_modifier integer,
    tmsp_creation timestamp with time zone,
    tmsp_last_modification timestamp with time zone,
    sys_period tstzrange,
    metadata jsonb,
    fk_digital integer NOT NULL,
    fk_class integer NOT NULL
);


--
-- TOC entry 375 (class 1259 OID 245695)
-- Name: factoid_property_column_rel; Type: TABLE; Schema: data; Owner: -
--

CREATE TABLE data.factoid_property_column_rel (
    fk_property integer NOT NULL,
    fk_column integer NOT NULL,
    fk_factoid_class_digital_rel integer NOT NULL
)
INHERITS (data.entity);


--
-- TOC entry 376 (class 1259 OID 245724)
-- Name: factoid_property_column_rel_vt; Type: TABLE; Schema: data; Owner: -
--

CREATE TABLE data.factoid_property_column_rel_vt (
    pk_entity integer NOT NULL,
    schema_name character varying NOT NULL,
    table_name character varying NOT NULL,
    entity_version integer NOT NULL,
    notes text,
    fk_namespace integer,
    fk_creator integer,
    fk_last_modifier integer,
    tmsp_creation timestamp with time zone,
    tmsp_last_modification timestamp with time zone,
    sys_period tstzrange,
    metadata jsonb,
    fk_property integer NOT NULL,
    fk_column integer NOT NULL,
    fk_factoid_class_digital_rel integer NOT NULL
);


--
-- TOC entry 379 (class 1259 OID 245761)
-- Name: factoid_role; Type: TABLE; Schema: data; Owner: -
--

CREATE TABLE data.factoid_role (
    fk_property integer NOT NULL,
    fk_domain_factoid integer NOT NULL,
    fk_range_cell integer,
    fk_range_chunk integer
)
INHERITS (data.entity);


--
-- TOC entry 380 (class 1259 OID 245795)
-- Name: factoid_role_vt; Type: TABLE; Schema: data; Owner: -
--

CREATE TABLE data.factoid_role_vt (
    pk_entity integer NOT NULL,
    schema_name character varying NOT NULL,
    table_name character varying NOT NULL,
    entity_version integer NOT NULL,
    notes text,
    fk_namespace integer,
    fk_creator integer,
    fk_last_modifier integer,
    tmsp_creation timestamp with time zone,
    tmsp_last_modification timestamp with time zone,
    sys_period tstzrange,
    metadata jsonb,
    fk_property integer NOT NULL,
    fk_domain_factoid integer NOT NULL,
    fk_range_cell integer,
    fk_range_chunk integer
);


--
-- TOC entry 378 (class 1259 OID 245752)
-- Name: factoid_vt; Type: TABLE; Schema: data; Owner: -
--

CREATE TABLE data.factoid_vt (
    pk_entity integer NOT NULL,
    schema_name character varying NOT NULL,
    table_name character varying NOT NULL,
    entity_version integer NOT NULL,
    notes text,
    fk_namespace integer,
    fk_creator integer,
    fk_last_modifier integer,
    tmsp_creation timestamp with time zone,
    tmsp_last_modification timestamp with time zone,
    sys_period tstzrange,
    metadata jsonb,
    fk_class integer NOT NULL
);


--
-- TOC entry 389 (class 1259 OID 245974)
-- Name: namespace; Type: TABLE; Schema: data; Owner: -
--

CREATE TABLE data.namespace (
    fk_root_namespace integer,
    fk_project integer,
    standard_label text
)
INHERITS (data.entity);


--
-- TOC entry 390 (class 1259 OID 245993)
-- Name: namespace_vt; Type: TABLE; Schema: data; Owner: -
--

CREATE TABLE data.namespace_vt (
    pk_entity integer NOT NULL,
    schema_name character varying NOT NULL,
    table_name character varying NOT NULL,
    entity_version integer NOT NULL,
    notes text,
    fk_namespace integer,
    fk_creator integer,
    fk_last_modifier integer,
    tmsp_creation timestamp with time zone,
    tmsp_last_modification timestamp with time zone,
    sys_period tstzrange,
    metadata jsonb,
    fk_root_namespace integer,
    fk_project integer,
    standard_label text
);


--
-- TOC entry 363 (class 1259 OID 245454)
-- Name: row; Type: TABLE; Schema: data; Owner: -
--

CREATE TABLE data."row" (
    fk_digital integer NOT NULL
)
INHERITS (data.entity);


--
-- TOC entry 364 (class 1259 OID 245473)
-- Name: row_vt; Type: TABLE; Schema: data; Owner: -
--

CREATE TABLE data.row_vt (
    pk_entity integer NOT NULL,
    schema_name character varying NOT NULL,
    table_name character varying NOT NULL,
    entity_version integer NOT NULL,
    notes text,
    fk_namespace integer,
    fk_creator integer,
    fk_last_modifier integer,
    tmsp_creation timestamp with time zone,
    tmsp_last_modification timestamp with time zone,
    sys_period tstzrange,
    metadata jsonb,
    fk_digital integer NOT NULL
);


--
-- TOC entry 387 (class 1259 OID 245908)
-- Name: text_property; Type: TABLE; Schema: data; Owner: -
--

CREATE TABLE data.text_property (
    fk_system_type integer NOT NULL,
    fk_language integer NOT NULL,
    pk_text integer DEFAULT nextval('commons.text_pk_text_seq'::regclass),
    quill_doc jsonb,
    string text DEFAULT ''::text,
    CONSTRAINT text_quill_doc_check CHECK (commons.validate_quill_doc(quill_doc))
)
INHERITS (data.entity, commons.text);


--
-- TOC entry 388 (class 1259 OID 245932)
-- Name: text_property_vt; Type: TABLE; Schema: data; Owner: -
--

CREATE TABLE data.text_property_vt (
    pk_entity integer NOT NULL,
    schema_name character varying,
    table_name character varying,
    entity_version integer,
    notes text,
    fk_namespace integer,
    fk_creator integer,
    fk_last_modifier integer,
    tmsp_creation timestamp with time zone,
    tmsp_last_modification timestamp with time zone,
    sys_period tstzrange,
    metadata jsonb,
    fk_system_type integer NOT NULL,
    fk_language integer NOT NULL,
    pk_text integer DEFAULT nextval('commons.text_pk_text_seq'::regclass),
    quill_doc jsonb,
    string text DEFAULT ''::text,
    CONSTRAINT text_quill_doc_check CHECK (commons.validate_quill_doc(quill_doc))
)
INHERITS (commons.text_vt);


--
-- TOC entry 399 (class 1259 OID 246082)
-- Name: v_digital_version; Type: VIEW; Schema: data; Owner: -
--

CREATE VIEW data.v_digital_version AS
 SELECT v.pk_entity,
    v.pk_text,
    v.schema_name,
    v.table_name,
    v.notes,
    v.fk_creator,
    v.fk_last_modifier,
    v.tmsp_creation,
    v.tmsp_last_modification,
    v.sys_period,
    v.quill_doc,
    v.string,
    v.entity_version,
    concat(((v.pk_text || '_'::text) || v.entity_version)) AS pk_text_version_concat
   FROM data.digital v
UNION ALL
 SELECT v.pk_entity,
    v.pk_text,
    v.schema_name,
    v.table_name,
    v.notes,
    v.fk_creator,
    v.fk_last_modifier,
    v.tmsp_creation,
    v.tmsp_last_modification,
    v.sys_period,
    v.quill_doc,
    v.string,
    v.entity_version,
    concat(((v.pk_text || '_'::text) || v.entity_version)) AS pk_text_version_concat
   FROM data.digital_vt v;


--
-- TOC entry 371 (class 1259 OID 245619)
-- Name: value_association_columns_rel; Type: TABLE; Schema: data; Owner: -
--

CREATE TABLE data.value_association_columns_rel (
    fk_property integer NOT NULL,
    fk_domain_column integer NOT NULL,
    fk_range_column integer NOT NULL,
    fk_factoid_class_digital_rel integer NOT NULL
)
INHERITS (data.entity);


--
-- TOC entry 372 (class 1259 OID 245653)
-- Name: value_association_columns_rel_vt; Type: TABLE; Schema: data; Owner: -
--

CREATE TABLE data.value_association_columns_rel_vt (
    pk_entity integer NOT NULL,
    schema_name character varying NOT NULL,
    table_name character varying NOT NULL,
    entity_version integer NOT NULL,
    notes text,
    fk_namespace integer,
    fk_creator integer,
    fk_last_modifier integer,
    tmsp_creation timestamp with time zone,
    tmsp_last_modification timestamp with time zone,
    sys_period tstzrange,
    metadata jsonb,
    fk_property integer NOT NULL,
    fk_domain_column integer NOT NULL,
    fk_range_column integer NOT NULL,
    fk_factoid_class_digital_rel integer NOT NULL
);


--
-- TOC entry 381 (class 1259 OID 245804)
-- Name: values_association; Type: TABLE; Schema: data; Owner: -
--

CREATE TABLE data.values_association (
    fk_property integer NOT NULL,
    fk_domain_cell integer,
    fk_range_cell integer,
    fk_domain_chunk integer,
    fk_range_chunk integer
)
INHERITS (data.entity);


--
-- TOC entry 382 (class 1259 OID 245843)
-- Name: values_association_vt; Type: TABLE; Schema: data; Owner: -
--

CREATE TABLE data.values_association_vt (
    pk_entity integer NOT NULL,
    schema_name character varying NOT NULL,
    table_name character varying NOT NULL,
    entity_version integer NOT NULL,
    notes text,
    fk_namespace integer,
    fk_creator integer,
    fk_last_modifier integer,
    tmsp_creation timestamp with time zone,
    tmsp_last_modification timestamp with time zone,
    sys_period tstzrange,
    metadata jsonb,
    fk_property integer NOT NULL,
    fk_domain_cell integer,
    fk_range_cell integer,
    fk_domain_chunk integer,
    fk_range_chunk integer
);


--
-- TOC entry 210 (class 1259 OID 240193)
-- Name: entity; Type: TABLE; Schema: data_for_history; Owner: -
--

CREATE TABLE data_for_history.entity (
    pk_entity integer NOT NULL,
    schema_name character varying,
    table_name character varying,
    entity_version integer,
    notes text,
    fk_creator integer,
    fk_last_modifier integer,
    tmsp_creation timestamp with time zone DEFAULT now(),
    tmsp_last_modification timestamp with time zone,
    sys_period tstzrange DEFAULT tstzrange(now(), NULL::timestamp with time zone),
    tmsp_last_dfh_update timestamp with time zone,
    is_enabled_in_profile boolean,
    removed_from_api boolean DEFAULT false
);


--
-- TOC entry 273 (class 1259 OID 241085)
-- Name: associates_system_type; Type: TABLE; Schema: data_for_history; Owner: -
--

CREATE TABLE data_for_history.associates_system_type (
    dfh_pk_associates_system_type integer,
    dfh_fk_system_type integer,
    dfh_fk_class integer,
    dfh_fk_class_type integer,
    dfh_fk_property integer,
    dfh_fk_property_type integer,
    dfh_fk_namespace integer,
    dfh_fk_label integer,
    dfh_fk_text_property integer,
    dfh_fk_project integer,
    dfh_fk_profile integer,
    dfh_fk_entity_association integer,
    is_enabled_in_profile boolean,
    removed_from_api boolean DEFAULT false
)
INHERITS (data_for_history.entity);


--
-- TOC entry 274 (class 1259 OID 241100)
-- Name: associates_system_type_vt; Type: TABLE; Schema: data_for_history; Owner: -
--

CREATE TABLE data_for_history.associates_system_type_vt (
    pk_entity integer NOT NULL,
    schema_name character varying,
    table_name character varying,
    entity_version integer,
    notes text,
    fk_creator integer,
    fk_last_modifier integer,
    tmsp_creation timestamp with time zone,
    tmsp_last_modification timestamp with time zone,
    sys_period tstzrange,
    tmsp_last_dfh_update timestamp with time zone,
    dfh_pk_associates_system_type integer,
    dfh_fk_system_type integer,
    dfh_fk_class integer,
    dfh_fk_class_type integer,
    dfh_fk_property integer,
    dfh_fk_property_type integer,
    dfh_fk_namespace integer,
    dfh_fk_label integer,
    dfh_fk_text_property integer,
    dfh_fk_project integer,
    dfh_fk_profile integer,
    dfh_fk_entity_association integer,
    is_inabled_in_profile boolean,
    removed_from_api boolean
);


--
-- TOC entry 213 (class 1259 OID 240223)
-- Name: class; Type: TABLE; Schema: data_for_history; Owner: -
--

CREATE TABLE data_for_history.class (
    dfh_pk_class integer,
    dfh_identifier_in_namespace text,
    dfh_standard_label character varying(500),
    tmsp_last_dfh_update timestamp with time zone,
    dfh_creation_time timestamp without time zone,
    dfh_modification_time timestamp without time zone
)
INHERITS (data_for_history.entity);


--
-- TOC entry 211 (class 1259 OID 240204)
-- Name: class_profile_view; Type: TABLE; Schema: data_for_history; Owner: -
--

CREATE TABLE data_for_history.class_profile_view (
    dfh_fk_class integer,
    dfh_identifier_in_namespace text,
    dfh_class_standard_label character varying,
    dfh_fk_system_type integer,
    dfh_type_label character varying,
    dfh_root_namespace text,
    dfh_profile_association_type character varying,
    dfh_fk_profile integer,
    dfh_profile_label character varying,
    tmsp_last_dfh_update timestamp with time zone,
    removed_from_api boolean DEFAULT NULL
)
INHERITS (data_for_history.entity);


--
-- TOC entry 212 (class 1259 OID 240216)
-- Name: class_profile_view_vt; Type: TABLE; Schema: data_for_history; Owner: -
--

CREATE TABLE data_for_history.class_profile_view_vt (
    pk_entity integer NOT NULL,
    schema_name character varying,
    table_name character varying,
    entity_version integer,
    notes text,
    fk_creator integer,
    fk_last_modifier integer,
    tmsp_creation timestamp with time zone,
    tmsp_last_modification timestamp with time zone,
    sys_period tstzrange,
    dfh_fk_class integer,
    dfh_identifier_in_namespace text,
    dfh_class_standard_label character varying,
    dfh_fk_system_type integer,
    dfh_type_label character varying,
    dfh_root_namespace text,
    dfh_profile_association_type character varying,
    dfh_fk_profile integer,
    dfh_profile_label character varying,
    is_enabled_in_profile boolean,
    tmsp_last_dfh_update timestamp with time zone,
    removed_from_api boolean
);


--
-- TOC entry 214 (class 1259 OID 240237)
-- Name: class_vt; Type: TABLE; Schema: data_for_history; Owner: -
--

CREATE TABLE data_for_history.class_vt (
    pk_entity integer NOT NULL,
    schema_name character varying,
    table_name character varying,
    entity_version integer,
    notes text,
    fk_creator integer,
    fk_last_modifier integer,
    tmsp_creation timestamp with time zone,
    tmsp_last_modification timestamp with time zone,
    sys_period tstzrange,
    dfh_pk_class integer,
    dfh_identifier_in_namespace text,
    dfh_standard_label character varying(500),
    tmsp_last_dfh_update timestamp with time zone
);


--
-- TOC entry 209 (class 1259 OID 240191)
-- Name: entity_pk_entity_seq; Type: SEQUENCE; Schema: data_for_history; Owner: -
--

CREATE SEQUENCE data_for_history.entity_pk_entity_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 6163 (class 0 OID 0)
-- Dependencies: 209
-- Name: entity_pk_entity_seq; Type: SEQUENCE OWNED BY; Schema: data_for_history; Owner: -
--

ALTER SEQUENCE data_for_history.entity_pk_entity_seq OWNED BY data_for_history.entity.pk_entity;


--
-- TOC entry 263 (class 1259 OID 240845)
-- Name: label; Type: TABLE; Schema: data_for_history; Owner: -
--

CREATE TABLE data_for_history.label (
    dfh_pk_label integer,
    dfh_label text,
    dfh_language_iso_code character varying,
    dfh_is_standard_label_for_language boolean,
    dfh_fk_property integer,
    dfh_fk_namespace integer,
    dfh_fk_class integer,
    dfh_fk_project integer,
    dfh_fk_class_type integer,
    dfh_fk_property_type integer,
    dfh_fk_profile integer,
    dfh_creation_time timestamp without time zone,
    dfh_modification_time timestamp without time zone,
    dfh_fk_system_type integer,
    com_fk_system_type integer,
    inf_fk_language integer
)
INHERITS (data_for_history.entity);


--
-- TOC entry 264 (class 1259 OID 240857)
-- Name: label_vt; Type: TABLE; Schema: data_for_history; Owner: -
--

CREATE TABLE data_for_history.label_vt (
    pk_entity integer NOT NULL,
    schema_name character varying,
    table_name character varying,
    entity_version integer,
    notes text,
    fk_creator integer,
    fk_last_modifier integer,
    tmsp_creation timestamp with time zone,
    tmsp_last_modification timestamp with time zone,
    sys_period tstzrange,
    tmsp_last_dfh_update timestamp with time zone,
    dfh_pk_label integer,
    dfh_label text,
    dfh_language_iso_code character varying,
    dfh_is_standard_label_for_language boolean,
    dfh_fk_property integer,
    dfh_fk_namespace integer,
    dfh_fk_class integer,
    dfh_fk_project integer,
    dfh_fk_class_type integer,
    dfh_fk_property_type integer,
    dfh_fk_profile integer,
    dfh_creation_time timestamp without time zone,
    dfh_modification_time timestamp without time zone
);


--
-- TOC entry 269 (class 1259 OID 241041)
-- Name: profile; Type: TABLE; Schema: data_for_history; Owner: -
--

CREATE TABLE data_for_history.profile (
    dfh_pk_profile integer,
    dfh_fk_is_subprofile_of integer,
    dfh_standard_label character varying(500),
    dfh_fk_project_of_belonging integer,
    dfh_start_date date,
    dfh_end_date date,
    dfh_creation_time timestamp without time zone,
    dfh_modification_time timestamp without time zone
)
INHERITS (data_for_history.entity);


--
-- TOC entry 270 (class 1259 OID 241057)
-- Name: profile_vt; Type: TABLE; Schema: data_for_history; Owner: -
--

CREATE TABLE data_for_history.profile_vt (
    pk_entity integer NOT NULL,
    schema_name character varying,
    table_name character varying,
    entity_version integer,
    notes text,
    fk_creator integer,
    fk_last_modifier integer,
    tmsp_creation timestamp with time zone,
    tmsp_last_modification timestamp with time zone,
    sys_period tstzrange,
    tmsp_last_dfh_update timestamp with time zone,
    dfh_pk_profile integer,
    dfh_fk_is_subprofile_of integer,
    dfh_standard_label character varying(500),
    dfh_fk_project_of_belonging integer,
    dfh_start_date date,
    dfh_end_date date,
    dfh_creation_time timestamp without time zone,
    dfh_modification_time timestamp without time zone
);


--
-- TOC entry 267 (class 1259 OID 240883)
-- Name: property; Type: TABLE; Schema: data_for_history; Owner: -
--

CREATE TABLE data_for_history.property (
    dfh_pk_property integer,
    dfh_identifier_in_namespace text,
    dfh_has_domain integer,
    dfh_has_range integer,
    dfh_creation_time timestamp without time zone,
    dfh_modification_time timestamp without time zone,
    dfh_standard_label character varying(500),
    dfh_domain_instances_min_quantifier smallint,
    dfh_domain_instances_max_quantifier smallint,
    dfh_range_instances_min_quantifier smallint,
    dfh_range_instances_max_quantifier smallint,
    dfh_fk_property_of_origin integer,
    identity_defining boolean DEFAULT false
)
INHERITS (data_for_history.entity);


--
-- TOC entry 6164 (class 0 OID 0)
-- Dependencies: 267
-- Name: COLUMN property.identity_defining; Type: COMMENT; Schema: data_for_history; Owner: -
--

COMMENT ON COLUMN data_for_history.property.identity_defining IS 'If the value is set to true, this means that this property is relevant for the TeEn identity.';


--
-- TOC entry 271 (class 1259 OID 241064)
-- Name: property_profile_view; Type: TABLE; Schema: data_for_history; Owner: -
--

CREATE TABLE data_for_history.property_profile_view (
    dfh_pk_property integer,
    dfh_identifier_in_namespace text,
    dfh_has_domain integer,
    dfh_has_range integer,
    dfh_fk_property_of_origin integer,
    dfh_standard_label character varying,
    dfh_root_namespace text,
    dfh_pk_profile integer,
    dfh_profile_label character varying,
    is_enabled_in_profile boolean,
    removed_from_api boolean DEFAULT NULL
)
INHERITS (data_for_history.entity);


--
-- TOC entry 272 (class 1259 OID 241078)
-- Name: property_profile_view_vt; Type: TABLE; Schema: data_for_history; Owner: -
--

CREATE TABLE data_for_history.property_profile_view_vt (
    pk_entity integer NOT NULL,
    schema_name character varying,
    table_name character varying,
    entity_version integer,
    notes text,
    fk_creator integer,
    fk_last_modifier integer,
    tmsp_creation timestamp with time zone,
    tmsp_last_modification timestamp with time zone,
    sys_period tstzrange,
    tmsp_last_dfh_update timestamp with time zone,
    dfh_pk_property integer,
    dfh_identifier_in_namespace text,
    dfh_has_domain integer,
    dfh_has_range integer,
    dfh_fk_property_of_origin integer,
    dfh_standard_label character varying,
    dfh_root_namespace text,
    dfh_pk_profile integer,
    dfh_profile_label character varying,
    is_inabled_in_profile boolean,
    removed_from_api boolean
);


--
-- TOC entry 268 (class 1259 OID 240895)
-- Name: property_vt; Type: TABLE; Schema: data_for_history; Owner: -
--

CREATE TABLE data_for_history.property_vt (
    pk_entity integer NOT NULL,
    schema_name character varying,
    table_name character varying,
    entity_version integer,
    notes text,
    fk_creator integer,
    fk_last_modifier integer,
    tmsp_creation timestamp with time zone,
    tmsp_last_modification timestamp with time zone,
    sys_period tstzrange,
    tmsp_last_dfh_update timestamp with time zone,
    dfh_pk_property integer,
    dfh_identifier_in_namespace text,
    dfh_has_domain integer,
    dfh_has_range integer,
    dfh_creation_time timestamp without time zone,
    dfh_modification_time timestamp without time zone,
    dfh_domain_instances_cardinality smallint,
    dfh_range_instances_cardinality smallint,
    dfh_standard_label character varying(500),
    dfh_fk_property_of_origin integer,
    identity_defining boolean
);


--
-- TOC entry 275 (class 1259 OID 241153)
-- Name: system_type; Type: TABLE; Schema: data_for_history; Owner: -
--

CREATE TABLE data_for_history.system_type (
    dfh_pk_system_type integer,
    dfh_used_in_table character varying(250),
    dfh_standard_label character varying(500),
    dfh_creation_time timestamp without time zone,
    dfh_modification_time timestamp without time zone
)
INHERITS (data_for_history.entity);


--
-- TOC entry 276 (class 1259 OID 241167)
-- Name: system_type_vt; Type: TABLE; Schema: data_for_history; Owner: -
--

CREATE TABLE data_for_history.system_type_vt (
    pk_entity integer NOT NULL,
    schema_name character varying,
    table_name character varying,
    entity_version integer,
    notes text,
    fk_creator integer,
    fk_last_modifier integer,
    tmsp_creation timestamp with time zone,
    tmsp_last_modification timestamp with time zone,
    sys_period tstzrange,
    tmsp_last_dfh_update timestamp with time zone,
    is_inabled_in_profile boolean,
    removed_from_api boolean,
    dfh_pk_system_type integer,
    dfh_used_in_table character varying(250),
    dfh_standard_label character varying(500),
    dfh_creation_time timestamp without time zone,
    dfh_modification_time timestamp without time zone
);


--
-- TOC entry 265 (class 1259 OID 240864)
-- Name: text_property; Type: TABLE; Schema: data_for_history; Owner: -
--

CREATE TABLE data_for_history.text_property (
    dfh_pk_text_property integer,
    dfh_text_property text,
    dfh_language_iso_code character varying,
    dfh_creation_time timestamp without time zone,
    dfh_modification_time timestamp without time zone,
    dfh_fk_property integer,
    dfh_fk_namespace integer,
    dfh_fk_class integer,
    dfh_fk_project integer,
    dfh_fk_class_type integer,
    dfh_fk_property_type integer,
    dfh_fk_system_type integer,
    dfh_fk_entity_association integer,
    dfh_fk_profile integer,
    dfh_fk_is_subclass_of integer
)
INHERITS (data_for_history.entity);


--
-- TOC entry 266 (class 1259 OID 240876)
-- Name: text_property_vt; Type: TABLE; Schema: data_for_history; Owner: -
--

CREATE TABLE data_for_history.text_property_vt (
    pk_entity integer NOT NULL,
    schema_name character varying,
    table_name character varying,
    entity_version integer,
    notes text,
    fk_creator integer,
    fk_last_modifier integer,
    tmsp_creation timestamp with time zone,
    tmsp_last_modification timestamp with time zone,
    sys_period tstzrange,
    tmsp_last_dfh_update timestamp with time zone,
    dfh_pk_text_property integer,
    dfh_text_property text,
    dfh_language_iso_code character varying,
    dfh_creation_time timestamp without time zone,
    dfh_modification_time timestamp without time zone,
    dfh_fk_property integer,
    dfh_fk_namespace integer,
    dfh_fk_class integer,
    dfh_fk_project integer,
    dfh_fk_class_type integer,
    dfh_fk_property_type integer,
    dfh_fk_system_type integer,
    dfh_fk_entity_association integer,
    dfh_fk_profile integer,
    dfh_fk_is_subclass_of integer
);


--
-- TOC entry 318 (class 1259 OID 243295)
-- Name: _deprecated_namespace; Type: TABLE; Schema: information; Owner: -
--

CREATE TABLE information._deprecated_namespace (
    pk_entity integer DEFAULT nextval('information.entity_pk_entity_seq'::regclass),
    fk_root_namespace integer,
    fk_project integer,
    standard_label character varying(500)
)
INHERITS (information.entity);


--
-- TOC entry 6165 (class 0 OID 0)
-- Dependencies: 318
-- Name: TABLE _deprecated_namespace; Type: COMMENT; Schema: information; Owner: -
--

COMMENT ON TABLE information._deprecated_namespace IS 'This table stores namespaces of controlled vocabularies.';


--
-- TOC entry 6166 (class 0 OID 0)
-- Dependencies: 318
-- Name: COLUMN _deprecated_namespace.fk_root_namespace; Type: COMMENT; Schema: information; Owner: -
--

COMMENT ON COLUMN information._deprecated_namespace.fk_root_namespace IS 'References the root namespace. If null, the namespace is a root namespace';


--
-- TOC entry 319 (class 1259 OID 243319)
-- Name: _deprecated_namespace_vt; Type: TABLE; Schema: information; Owner: -
--

CREATE TABLE information._deprecated_namespace_vt (
    pk_entity integer NOT NULL,
    schema_name character varying NOT NULL,
    table_name character varying NOT NULL,
    notes text,
    fk_creator integer,
    fk_last_modifier integer,
    tmsp_creation timestamp with time zone,
    tmsp_last_modification timestamp with time zone,
    sys_period tstzrange,
    fk_root_namespace integer,
    fk_project integer,
    standard_label character varying(500)
);


--
-- TOC entry 320 (class 1259 OID 243326)
-- Name: _deprecated_type_namespace_rel; Type: TABLE; Schema: information; Owner: -
--

CREATE TABLE information._deprecated_type_namespace_rel (
    pk_entity integer DEFAULT nextval('information.entity_pk_entity_seq'::regclass),
    fk_persistent_item integer,
    fk_namespace integer
)
INHERITS (information.entity);


--
-- TOC entry 6167 (class 0 OID 0)
-- Dependencies: 320
-- Name: TABLE _deprecated_type_namespace_rel; Type: COMMENT; Schema: information; Owner: -
--

COMMENT ON TABLE information._deprecated_type_namespace_rel IS 'This table stores relation between instances of E55 Type and Namespaces.';


--
-- TOC entry 6168 (class 0 OID 0)
-- Dependencies: 320
-- Name: COLUMN _deprecated_type_namespace_rel.fk_persistent_item; Type: COMMENT; Schema: information; Owner: -
--

COMMENT ON COLUMN information._deprecated_type_namespace_rel.fk_persistent_item IS 'References the pk_entity of the persistent_item table.';


--
-- TOC entry 321 (class 1259 OID 243350)
-- Name: _deprecated_type_namespace_rel_vt; Type: TABLE; Schema: information; Owner: -
--

CREATE TABLE information._deprecated_type_namespace_rel_vt (
    pk_entity integer NOT NULL,
    schema_name character varying NOT NULL,
    table_name character varying NOT NULL,
    notes text,
    fk_creator integer,
    fk_last_modifier integer,
    tmsp_creation timestamp with time zone,
    tmsp_last_modification timestamp with time zone,
    sys_period tstzrange,
    fk_persistent_item integer,
    fk_namespace integer
);


--
-- TOC entry 242 (class 1259 OID 240515)
-- Name: appellation; Type: TABLE; Schema: information; Owner: -
--

CREATE TABLE information.appellation (
    _deprecated_pk_appellation integer NOT NULL,
    _deprecated_appellation_label jsonb,
    fk_class integer NOT NULL,
    entity_version integer,
    pk_text integer DEFAULT nextval('commons.text_pk_text_seq'::regclass),
    quill_doc jsonb,
    string text DEFAULT ''::text,
    CONSTRAINT text_quill_doc_check CHECK (commons.validate_quill_doc(quill_doc))
)
INHERITS (commons.text, information.entity);


--
-- TOC entry 241 (class 1259 OID 240513)
-- Name: appellation_pk_appellation_seq; Type: SEQUENCE; Schema: information; Owner: -
--

CREATE SEQUENCE information.appellation_pk_appellation_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 6169 (class 0 OID 0)
-- Dependencies: 241
-- Name: appellation_pk_appellation_seq; Type: SEQUENCE OWNED BY; Schema: information; Owner: -
--

ALTER SEQUENCE information.appellation_pk_appellation_seq OWNED BY information.appellation._deprecated_pk_appellation;


--
-- TOC entry 243 (class 1259 OID 240535)
-- Name: appellation_vt; Type: TABLE; Schema: information; Owner: -
--

CREATE TABLE information.appellation_vt (
    pk_entity integer NOT NULL,
    schema_name character varying,
    table_name character varying,
    notes text,
    fk_creator integer,
    fk_last_modifier integer,
    tmsp_creation timestamp with time zone,
    tmsp_last_modification timestamp with time zone,
    sys_period tstzrange,
    _deprecated_pk_appellation integer NOT NULL,
    _deprecated_appellation_label jsonb,
    fk_class integer NOT NULL,
    entity_version integer,
    pk_text integer DEFAULT nextval('commons.text_pk_text_seq'::regclass),
    quill_doc jsonb,
    string text DEFAULT ''::text,
    CONSTRAINT text_quill_doc_check CHECK (commons.validate_quill_doc(quill_doc))
)
INHERITS (commons.text_vt);


--
-- TOC entry 245 (class 1259 OID 240572)
-- Name: entity_association; Type: TABLE; Schema: information; Owner: -
--

CREATE TABLE information.entity_association (
    pk_entity_association integer NOT NULL,
    fk_info_domain integer,
    fk_info_range integer,
    fk_property integer,
    fk_data_domain integer,
    fk_data_range integer
)
INHERITS (information.entity);


--
-- TOC entry 244 (class 1259 OID 240570)
-- Name: entity_association_pk_entity_association_seq; Type: SEQUENCE; Schema: information; Owner: -
--

CREATE SEQUENCE information.entity_association_pk_entity_association_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 6170 (class 0 OID 0)
-- Dependencies: 244
-- Name: entity_association_pk_entity_association_seq; Type: SEQUENCE OWNED BY; Schema: information; Owner: -
--

ALTER SEQUENCE information.entity_association_pk_entity_association_seq OWNED BY information.entity_association.pk_entity_association;


--
-- TOC entry 246 (class 1259 OID 240592)
-- Name: entity_association_vt; Type: TABLE; Schema: information; Owner: -
--

CREATE TABLE information.entity_association_vt (
    pk_entity integer NOT NULL,
    schema_name character varying NOT NULL,
    table_name character varying NOT NULL,
    notes text,
    fk_creator integer,
    fk_last_modifier integer,
    tmsp_creation timestamp with time zone,
    tmsp_last_modification timestamp with time zone,
    sys_period tstzrange,
    pk_entity_association integer NOT NULL,
    fk_domain_entity integer,
    fk_range_entity integer,
    fk_property integer
);


--
-- TOC entry 258 (class 1259 OID 240746)
-- Name: language; Type: TABLE; Schema: information; Owner: -
--

CREATE TABLE information.language (
    pk_language character(3) NOT NULL,
    fk_class integer,
    lang_type character varying,
    scope character varying,
    iso6392b character(3),
    iso6392t character(3),
    iso6391 character(3)
)
INHERITS (information.entity);


--
-- TOC entry 259 (class 1259 OID 240765)
-- Name: language_vt; Type: TABLE; Schema: information; Owner: -
--

CREATE TABLE information.language_vt (
    pk_entity integer NOT NULL,
    schema_name character varying NOT NULL,
    table_name character varying NOT NULL,
    notes text,
    fk_creator integer,
    fk_last_modifier integer,
    tmsp_creation timestamp with time zone,
    tmsp_last_modification timestamp with time zone,
    sys_period tstzrange,
    pk_language character(3) NOT NULL,
    fk_class integer,
    lang_type character varying,
    scope character varying,
    iso6392b character(3),
    iso6392t character(3),
    iso6391 character(3)
);


--
-- TOC entry 248 (class 1259 OID 240603)
-- Name: persistent_item; Type: TABLE; Schema: information; Owner: -
--

CREATE TABLE information.persistent_item (
    _deprecated_pk_persistent_item integer NOT NULL,
    fk_class integer
)
INHERITS (information.entity);


--
-- TOC entry 247 (class 1259 OID 240601)
-- Name: persistent_item_pk_persistent_item_seq; Type: SEQUENCE; Schema: information; Owner: -
--

CREATE SEQUENCE information.persistent_item_pk_persistent_item_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 6171 (class 0 OID 0)
-- Dependencies: 247
-- Name: persistent_item_pk_persistent_item_seq; Type: SEQUENCE OWNED BY; Schema: information; Owner: -
--

ALTER SEQUENCE information.persistent_item_pk_persistent_item_seq OWNED BY information.persistent_item._deprecated_pk_persistent_item;


--
-- TOC entry 249 (class 1259 OID 240623)
-- Name: persistent_item_vt; Type: TABLE; Schema: information; Owner: -
--

CREATE TABLE information.persistent_item_vt (
    pk_entity integer NOT NULL,
    schema_name character varying NOT NULL,
    table_name character varying NOT NULL,
    notes text,
    fk_creator integer,
    fk_last_modifier integer,
    tmsp_creation timestamp with time zone,
    tmsp_last_modification timestamp with time zone,
    sys_period tstzrange,
    pk_persistent_item integer NOT NULL,
    fk_class integer
);


--
-- TOC entry 302 (class 1259 OID 242949)
-- Name: place; Type: TABLE; Schema: information; Owner: -
--

CREATE TABLE information.place (
    geo_point public.geography(Point,4326),
    fk_class integer
)
INHERITS (information.entity);


--
-- TOC entry 314 (class 1259 OID 243136)
-- Name: place_vt; Type: TABLE; Schema: information; Owner: -
--

CREATE TABLE information.place_vt (
    pk_entity integer NOT NULL,
    schema_name character varying NOT NULL,
    table_name character varying NOT NULL,
    notes text,
    fk_creator integer,
    fk_last_modifier integer,
    tmsp_creation timestamp with time zone,
    tmsp_last_modification timestamp with time zone,
    sys_period tstzrange,
    geo_point public.geography(Point,4326),
    fk_class integer
);


--
-- TOC entry 396 (class 1259 OID 246038)
-- Name: property_of_property; Type: TABLE; Schema: information; Owner: -
--

CREATE TABLE information.property_of_property (
    fk_property integer,
    provisional_property character varying,
    fk_role integer,
    fk_entity_association integer,
    fk_range_entity integer NOT NULL,
    entity_version integer
)
INHERITS (information.entity);


--
-- TOC entry 397 (class 1259 OID 246067)
-- Name: property_of_property_vt; Type: TABLE; Schema: information; Owner: -
--

CREATE TABLE information.property_of_property_vt (
    pk_entity integer NOT NULL,
    schema_name character varying NOT NULL,
    table_name character varying NOT NULL,
    notes text,
    fk_creator integer,
    fk_last_modifier integer,
    tmsp_creation timestamp with time zone,
    tmsp_last_modification timestamp with time zone,
    sys_period tstzrange,
    metadata jsonb,
    fk_property integer,
    provisional_property character varying,
    fk_role integer,
    fk_entity_association integer,
    fk_range_entity integer NOT NULL,
    entity_version integer
);


--
-- TOC entry 251 (class 1259 OID 240634)
-- Name: role; Type: TABLE; Schema: information; Owner: -
--

CREATE TABLE information.role (
    _deprecated_pk_role integer NOT NULL,
    fk_entity integer,
    fk_temporal_entity integer,
    fk_property integer
)
INHERITS (information.entity);


--
-- TOC entry 250 (class 1259 OID 240632)
-- Name: role_pk_role_seq; Type: SEQUENCE; Schema: information; Owner: -
--

CREATE SEQUENCE information.role_pk_role_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 6172 (class 0 OID 0)
-- Dependencies: 250
-- Name: role_pk_role_seq; Type: SEQUENCE OWNED BY; Schema: information; Owner: -
--

ALTER SEQUENCE information.role_pk_role_seq OWNED BY information.role._deprecated_pk_role;


--
-- TOC entry 252 (class 1259 OID 240654)
-- Name: role_vt; Type: TABLE; Schema: information; Owner: -
--

CREATE TABLE information.role_vt (
    pk_entity integer NOT NULL,
    schema_name character varying NOT NULL,
    table_name character varying NOT NULL,
    notes text,
    fk_creator integer,
    fk_last_modifier integer,
    tmsp_creation timestamp with time zone,
    tmsp_last_modification timestamp with time zone,
    sys_period tstzrange,
    pk_role integer NOT NULL,
    fk_entity integer,
    fk_temporal_entity integer,
    fk_property integer
);


--
-- TOC entry 253 (class 1259 OID 240689)
-- Name: temporal_entity_pk_temporal_entity_seq; Type: SEQUENCE; Schema: information; Owner: -
--

CREATE SEQUENCE information.temporal_entity_pk_temporal_entity_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 6173 (class 0 OID 0)
-- Dependencies: 253
-- Name: temporal_entity_pk_temporal_entity_seq; Type: SEQUENCE OWNED BY; Schema: information; Owner: -
--

ALTER SEQUENCE information.temporal_entity_pk_temporal_entity_seq OWNED BY information.temporal_entity._deprecated_pk_temporal_entity;


--
-- TOC entry 255 (class 1259 OID 240711)
-- Name: temporal_entity_vt; Type: TABLE; Schema: information; Owner: -
--

CREATE TABLE information.temporal_entity_vt (
    pk_entity integer NOT NULL,
    schema_name character varying NOT NULL,
    table_name character varying NOT NULL,
    notes text,
    fk_creator integer,
    fk_last_modifier integer,
    tmsp_creation timestamp with time zone,
    tmsp_last_modification timestamp with time zone,
    sys_period tstzrange,
    pk_temporal_entity integer NOT NULL,
    fk_class integer
);


--
-- TOC entry 256 (class 1259 OID 240722)
-- Name: text_property; Type: TABLE; Schema: information; Owner: -
--

CREATE TABLE information.text_property (
    _deprecated_text_property text,
    fk_concerned_entity integer NOT NULL,
    _deprecated_text_property_quill_doc jsonb,
    fk_language integer NOT NULL,
    fk_class_field integer,
    entity_version integer,
    pk_text integer DEFAULT nextval('commons.text_pk_text_seq'::regclass),
    quill_doc jsonb,
    string text DEFAULT ''::text,
    CONSTRAINT text_quill_doc_check CHECK (commons.validate_quill_doc(quill_doc))
)
INHERITS (commons.text, information.entity);


--
-- TOC entry 257 (class 1259 OID 240737)
-- Name: text_property_vt; Type: TABLE; Schema: information; Owner: -
--

CREATE TABLE information.text_property_vt (
    pk_entity integer NOT NULL,
    schema_name character varying,
    table_name character varying,
    notes text,
    fk_creator integer,
    fk_last_modifier integer,
    tmsp_creation timestamp with time zone,
    tmsp_last_modification timestamp with time zone,
    sys_period tstzrange,
    _deprecated_text_property text,
    fk_concerned_entity integer,
    _deprecated_text_property_quill_doc jsonb,
    fk_language integer,
    fk_class_field integer,
    entity_version integer,
    pk_text integer DEFAULT nextval('commons.text_pk_text_seq'::regclass),
    quill_doc jsonb,
    string text DEFAULT ''::text,
    CONSTRAINT text_quill_doc_check CHECK (commons.validate_quill_doc(quill_doc))
)
INHERITS (commons.text_vt);


--
-- TOC entry 278 (class 1259 OID 241191)
-- Name: time_primitive; Type: TABLE; Schema: information; Owner: -
--

CREATE TABLE information.time_primitive (
    pk_time_primitive integer NOT NULL,
    duration public.calendar_granularities,
    fk_class integer,
    julian_day integer
)
INHERITS (information.entity);


--
-- TOC entry 277 (class 1259 OID 241189)
-- Name: time_primitive_pk_time_primitive_seq; Type: SEQUENCE; Schema: information; Owner: -
--

CREATE SEQUENCE information.time_primitive_pk_time_primitive_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 6174 (class 0 OID 0)
-- Dependencies: 277
-- Name: time_primitive_pk_time_primitive_seq; Type: SEQUENCE OWNED BY; Schema: information; Owner: -
--

ALTER SEQUENCE information.time_primitive_pk_time_primitive_seq OWNED BY information.time_primitive.pk_time_primitive;


--
-- TOC entry 315 (class 1259 OID 243143)
-- Name: time_primitive_vt; Type: TABLE; Schema: information; Owner: -
--

CREATE TABLE information.time_primitive_vt (
    pk_entity integer NOT NULL,
    schema_name character varying NOT NULL,
    table_name character varying NOT NULL,
    notes text,
    fk_creator integer,
    fk_last_modifier integer,
    tmsp_creation timestamp with time zone,
    tmsp_last_modification timestamp with time zone,
    sys_period tstzrange,
    pk_time_primitive integer NOT NULL,
    duration public.calendar_granularities,
    fk_class integer,
    julian_day integer
);


--
-- TOC entry 356 (class 1259 OID 245264)
-- Name: v_appellation; Type: VIEW; Schema: information; Owner: -
--

CREATE VIEW information.v_appellation AS
 SELECT appellation.pk_entity,
    appellation.schema_name,
    appellation.table_name,
    appellation.notes,
    appellation.fk_creator,
    appellation.fk_last_modifier,
    appellation.tmsp_creation,
    appellation.tmsp_last_modification,
    appellation.sys_period,
    appellation.fk_class,
    appellation.quill_doc,
    appellation.string
   FROM information.appellation;


--
-- TOC entry 325 (class 1259 OID 243481)
-- Name: v_class_preview; Type: VIEW; Schema: information; Owner: -
--

CREATE VIEW information.v_class_preview AS
 SELECT DISTINCT ON (c.dfh_pk_class)
        CASE
            WHEN (l.dfh_label IS NOT NULL) THEN (l.dfh_label)::character varying
            ELSE cpv.dfh_class_standard_label
        END AS class_label,
        CASE
            WHEN (cpv.dfh_fk_system_type = 9) THEN 'teEn'::text
            WHEN (cpv.dfh_fk_system_type = 8) THEN 'peIt'::text
            ELSE NULL::text
        END AS entity_type,
    c.dfh_pk_class
   FROM ((data_for_history.class c
     JOIN data_for_history.class_profile_view cpv ON ((c.dfh_pk_class = cpv.dfh_fk_class)))
     LEFT JOIN data_for_history.label l ON (((l.dfh_fk_class = c.dfh_pk_class) AND (l.com_fk_system_type = 184))))
  ORDER BY c.dfh_pk_class, l.dfh_label;


--
-- TOC entry 225 (class 1259 OID 240339)
-- Name: entity; Type: TABLE; Schema: projects; Owner: -
--

CREATE TABLE projects.entity (
    pk_entity integer NOT NULL,
    schema_name character varying,
    table_name character varying,
    entity_version integer,
    notes text,
    fk_creator integer,
    fk_last_modifier integer,
    tmsp_creation timestamp with time zone DEFAULT now(),
    tmsp_last_modification timestamp with time zone,
    sys_period tstzrange DEFAULT tstzrange(now(), NULL::timestamp with time zone)
);


--
-- TOC entry 261 (class 1259 OID 240776)
-- Name: info_proj_rel; Type: TABLE; Schema: projects; Owner: -
--

CREATE TABLE projects.info_proj_rel (
    pk_entity integer DEFAULT nextval('information.entity_pk_entity_seq'::regclass),
    schema_name character varying NOT NULL,
    table_name character varying NOT NULL,
    notes text,
    fk_creator integer,
    fk_last_modifier integer,
    tmsp_creation timestamp with time zone DEFAULT now(),
    tmsp_last_modification timestamp with time zone,
    sys_period tstzrange DEFAULT tstzrange(now(), NULL::timestamp with time zone),
    _deprecated_pk_entity_version_project_rel integer NOT NULL,
    _deprecated_fk_project integer,
    fk_entity integer,
    fk_entity_version integer,
    fk_entity_version_concat text,
    is_in_project boolean,
    is_standard_in_project boolean,
    calendar public.calendar_type,
    ord_num integer,
    entity_version integer NOT NULL,
    fk_project integer NOT NULL
)
INHERITS (projects.entity);


--
-- TOC entry 391 (class 1259 OID 246012)
-- Name: v_entity_association; Type: VIEW; Schema: information; Owner: -
--

CREATE VIEW information.v_entity_association AS
 WITH ea_project_count AS (
         SELECT ea_1.pk_entity,
            ea_1.fk_property,
            ea_1.fk_info_domain,
            ea_1.fk_info_range,
            ea_1.fk_data_domain,
            ea_1.fk_data_range,
            ea_1.notes,
            ea_1.tmsp_creation,
            ea_1.tmsp_last_modification,
            ea_1.sys_period,
            COALESCE(count(*) FILTER (WHERE (epr.is_in_project = true)), (0)::bigint) AS is_in_project_count
           FROM (information.entity_association ea_1
             LEFT JOIN projects.info_proj_rel epr ON ((epr.fk_entity = ea_1.pk_entity)))
          GROUP BY ea_1.pk_entity, ea_1.fk_property, ea_1.fk_info_domain, ea_1.fk_info_range, ea_1.fk_data_domain, ea_1.fk_data_range, ea_1.notes, ea_1.tmsp_creation, ea_1.tmsp_last_modification, ea_1.sys_period
        )
 SELECT ea.pk_entity,
    ea.fk_property,
    ea.fk_info_domain,
    ea.fk_info_range,
    ea.fk_data_domain,
    ea.fk_data_range,
    ea.notes,
    ea.tmsp_creation,
    ea.tmsp_last_modification,
    ea.sys_period,
    ea.is_in_project_count,
    row_number() OVER (PARTITION BY COALESCE(ea.fk_info_domain, ea.fk_data_domain), ea.fk_property ORDER BY ea.is_in_project_count DESC, ea.tmsp_creation DESC) AS rank_for_domain,
    p.dfh_range_instances_max_quantifier AS range_max_quantifier,
    row_number() OVER (PARTITION BY COALESCE(ea.fk_info_range, ea.fk_data_range), ea.fk_property ORDER BY ea.is_in_project_count DESC, ea.tmsp_creation DESC) AS rank_for_range,
    p.dfh_domain_instances_max_quantifier AS domain_max_quantifier
   FROM (ea_project_count ea
     JOIN data_for_history.property p ON ((ea.fk_property = p.dfh_pk_property)));


--
-- TOC entry 311 (class 1259 OID 243092)
-- Name: v_language; Type: VIEW; Schema: information; Owner: -
--

CREATE VIEW information.v_language AS
 SELECT language.pk_entity,
    language.schema_name,
    language.table_name,
    language.notes,
    language.fk_creator,
    language.fk_last_modifier,
    language.tmsp_creation,
    language.tmsp_last_modification,
    language.sys_period,
    language.pk_language,
    language.fk_class,
    language.lang_type,
    language.scope,
    language.iso6392b,
    language.iso6392t,
    language.iso6391
   FROM information.language;


--
-- TOC entry 305 (class 1259 OID 243017)
-- Name: class_field_config; Type: TABLE; Schema: projects; Owner: -
--

CREATE TABLE projects.class_field_config (
    fk_app_context integer NOT NULL,
    _deprecated_fk_project integer,
    fk_property integer,
    property_is_outgoing boolean,
    fk_class_field integer,
    fk_class_for_class_field integer,
    ord_num integer,
    fk_project integer
)
INHERITS (projects.entity);


--
-- TOC entry 224 (class 1259 OID 240337)
-- Name: entity_pk_entity_seq; Type: SEQUENCE; Schema: projects; Owner: -
--

CREATE SEQUENCE projects.entity_pk_entity_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 6175 (class 0 OID 0)
-- Dependencies: 224
-- Name: entity_pk_entity_seq; Type: SEQUENCE OWNED BY; Schema: projects; Owner: -
--

ALTER SEQUENCE projects.entity_pk_entity_seq OWNED BY projects.entity.pk_entity;


--
-- TOC entry 347 (class 1259 OID 244711)
-- Name: entity; Type: TABLE; Schema: system; Owner: -
--

CREATE TABLE system.entity (
    pk_entity integer NOT NULL,
    schema_name character varying NOT NULL,
    table_name character varying NOT NULL,
    entity_version integer NOT NULL,
    notes text,
    fk_creator integer,
    fk_last_modifier integer,
    tmsp_creation timestamp with time zone DEFAULT now(),
    tmsp_last_modification timestamp with time zone,
    sys_period tstzrange DEFAULT tstzrange(now(), NULL::timestamp with time zone)
);


--
-- TOC entry 307 (class 1259 OID 243052)
-- Name: class_field; Type: TABLE; Schema: system; Owner: -
--

CREATE TABLE system.class_field (
    pk_entity integer DEFAULT nextval('projects.entity_pk_entity_seq'::regclass),
    schema_name character varying,
    table_name character varying,
    entity_version integer,
    notes text,
    fk_creator integer,
    fk_last_modifier integer,
    tmsp_creation timestamp with time zone DEFAULT now(),
    tmsp_last_modification timestamp with time zone,
    sys_period tstzrange DEFAULT tstzrange(now(), NULL::timestamp with time zone),
    label character varying NOT NULL,
    description text,
    used_table text,
    fk_system_type_ng_component integer
)
INHERITS (system.entity);


--
-- TOC entry 326 (class 1259 OID 243486)
-- Name: v_ordered_fields_per_class; Type: VIEW; Schema: information; Owner: -
--

CREATE VIEW information.v_ordered_fields_per_class AS
 SELECT c.pk_entity,
    c.ord_num AS field_order,
        CASE
            WHEN (c.property_is_outgoing = true) THEN p.dfh_has_domain
            WHEN (c.property_is_outgoing = false) THEN p.dfh_has_range
            ELSE c.fk_class_for_class_field
        END AS fk_class,
    c.fk_property,
    c.property_is_outgoing,
    c.fk_class_field,
    f.used_table
   FROM ((projects.class_field_config c
     LEFT JOIN data_for_history.property p ON ((p.dfh_pk_property = c.fk_property)))
     LEFT JOIN system.class_field f ON ((f.pk_entity = c.fk_class_field)))
  WHERE (c.fk_app_context = 45)
  ORDER BY
        CASE
            WHEN (c.property_is_outgoing = true) THEN p.dfh_has_domain
            WHEN (c.property_is_outgoing = false) THEN p.dfh_has_range
            ELSE c.fk_class_for_class_field
        END, c.ord_num;


--
-- TOC entry 400 (class 1259 OID 246094)
-- Name: v_persistent_item; Type: VIEW; Schema: information; Owner: -
--

CREATE VIEW information.v_persistent_item AS
 SELECT persistent_item.pk_entity,
    persistent_item.schema_name,
    persistent_item.table_name,
    persistent_item.notes,
    persistent_item.fk_creator,
    persistent_item.fk_last_modifier,
    persistent_item.tmsp_creation,
    persistent_item.tmsp_last_modification,
    persistent_item.sys_period,
    persistent_item._deprecated_pk_persistent_item,
    persistent_item.fk_class,
    persistent_item.metadata
   FROM information.persistent_item;


--
-- TOC entry 312 (class 1259 OID 243110)
-- Name: v_place; Type: VIEW; Schema: information; Owner: -
--

CREATE VIEW information.v_place AS
 SELECT place.pk_entity,
    place.schema_name,
    place.table_name,
    place.notes,
    place.fk_creator,
    place.fk_last_modifier,
    place.tmsp_creation,
    place.tmsp_last_modification,
    place.sys_period,
    place.geo_point,
    place.fk_class,
    public.st_x((place.geo_point)::public.geometry) AS long,
    public.st_y((place.geo_point)::public.geometry) AS lat
   FROM information.place;


--
-- TOC entry 398 (class 1259 OID 246076)
-- Name: v_property_of_property; Type: VIEW; Schema: information; Owner: -
--

CREATE VIEW information.v_property_of_property AS
 SELECT property_of_property.pk_entity,
    property_of_property.schema_name,
    property_of_property.table_name,
    property_of_property.notes,
    property_of_property.fk_creator,
    property_of_property.fk_last_modifier,
    property_of_property.tmsp_creation,
    property_of_property.tmsp_last_modification,
    property_of_property.sys_period,
    property_of_property.metadata,
    property_of_property.fk_property,
    property_of_property.provisional_property,
    property_of_property.fk_role,
    property_of_property.fk_entity_association,
    property_of_property.fk_range_entity,
    property_of_property.entity_version
   FROM information.property_of_property;


--
-- TOC entry 310 (class 1259 OID 243078)
-- Name: v_role; Type: VIEW; Schema: information; Owner: -
--

CREATE VIEW information.v_role AS
 WITH role_project_count AS (
         SELECT r_1.pk_entity,
            r_1.fk_property,
            r_1.fk_entity,
            r_1.fk_temporal_entity,
            COALESCE(count(*) FILTER (WHERE (epr.is_in_project = true)), (0)::bigint) AS is_in_project_count,
            COALESCE(count(*) FILTER (WHERE (epr.ord_num = 0)), (0)::bigint) AS is_standard_in_project_count,
            mode() WITHIN GROUP (ORDER BY epr.calendar) AS community_favorite_calendar,
            r_1.notes,
            r_1.tmsp_creation,
            r_1.tmsp_last_modification,
            r_1.sys_period
           FROM (information.role r_1
             LEFT JOIN projects.info_proj_rel epr ON ((epr.fk_entity = r_1.pk_entity)))
          GROUP BY r_1.pk_entity, r_1.fk_property, r_1.fk_entity, r_1.fk_temporal_entity, r_1.notes, r_1.tmsp_creation, r_1.tmsp_last_modification, r_1.sys_period
        )
 SELECT r.pk_entity,
    r.fk_property,
    r.fk_entity,
    r.fk_temporal_entity,
    r.is_in_project_count,
    r.is_standard_in_project_count,
    r.community_favorite_calendar,
    r.notes,
    r.tmsp_creation,
    r.tmsp_last_modification,
    r.sys_period,
    row_number() OVER (PARTITION BY r.fk_temporal_entity, r.fk_property ORDER BY r.is_in_project_count DESC, r.tmsp_creation DESC) AS rank_for_te_ent,
    p.dfh_range_instances_max_quantifier AS range_max_quantifier,
    row_number() OVER (PARTITION BY r.fk_entity, r.fk_property ORDER BY r.is_in_project_count DESC, r.tmsp_creation DESC) AS rank_for_pe_it,
    p.dfh_domain_instances_max_quantifier AS domain_max_quantifier
   FROM (role_project_count r
     JOIN data_for_history.property p ON ((r.fk_property = p.dfh_pk_property)));


--
-- TOC entry 6176 (class 0 OID 0)
-- Dependencies: 310
-- Name: VIEW v_role; Type: COMMENT; Schema: information; Owner: -
--

COMMENT ON VIEW information.v_role IS 'If rank_for_te_ent is bigger than range_max_quantifier, the role can be considered a repo-wide alternative from the perspective of the temporal entits.
      
    If rank_for_pe_it is bigger than domain_max_quantifier, the role can be considered a repo-wide alternative from the perspective of the persistent item.';


--
-- TOC entry 353 (class 1259 OID 245148)
-- Name: v_temporal_entity; Type: VIEW; Schema: information; Owner: -
--

CREATE VIEW information.v_temporal_entity AS
 SELECT temporal_entity.pk_entity,
    temporal_entity.schema_name,
    temporal_entity.table_name,
    temporal_entity.notes,
    temporal_entity.fk_creator,
    temporal_entity.fk_last_modifier,
    temporal_entity.tmsp_creation,
    temporal_entity.tmsp_last_modification,
    temporal_entity.sys_period,
    temporal_entity.fk_class
   FROM information.temporal_entity;


--
-- TOC entry 354 (class 1259 OID 245232)
-- Name: v_text_property; Type: VIEW; Schema: information; Owner: -
--

CREATE VIEW information.v_text_property AS
 SELECT text_property.pk_entity,
    text_property.schema_name,
    text_property.table_name,
    text_property.notes,
    text_property.fk_creator,
    text_property.fk_last_modifier,
    text_property.tmsp_creation,
    text_property.tmsp_last_modification,
    text_property.sys_period,
    text_property.fk_concerned_entity,
    text_property.fk_language,
    text_property.fk_class_field,
    text_property.quill_doc,
    text_property.string,
    count(epr.fk_project) AS is_in_project_count
   FROM (information.text_property
     LEFT JOIN projects.info_proj_rel epr ON (((epr.fk_entity = text_property.pk_entity) AND (epr.is_in_project = true))))
  GROUP BY text_property.pk_entity, text_property.schema_name, text_property.table_name, text_property.notes, text_property.fk_creator, text_property.fk_last_modifier, text_property.tmsp_creation, text_property.tmsp_last_modification, text_property.sys_period, text_property._deprecated_text_property, text_property.fk_concerned_entity, text_property.quill_doc, text_property.fk_language, text_property.fk_class_field, text_property.string;


--
-- TOC entry 309 (class 1259 OID 243073)
-- Name: v_time_primitive; Type: VIEW; Schema: information; Owner: -
--

CREATE VIEW information.v_time_primitive AS
 SELECT time_primitive.pk_entity,
    time_primitive.schema_name,
    time_primitive.table_name,
    time_primitive.notes,
    time_primitive.fk_creator,
    time_primitive.fk_last_modifier,
    time_primitive.tmsp_creation,
    time_primitive.tmsp_last_modification,
    time_primitive.sys_period,
    time_primitive.pk_time_primitive,
    time_primitive.duration,
    time_primitive.fk_class,
    time_primitive.julian_day
   FROM information.time_primitive;


--
-- TOC entry 227 (class 1259 OID 240350)
-- Name: _deprecated_label; Type: TABLE; Schema: projects; Owner: -
--

CREATE TABLE projects._deprecated_label (
    pk_entity integer DEFAULT nextval('projects.entity_pk_entity_seq'::regclass),
    schema_name character varying,
    table_name character varying,
    fk_creator integer,
    fk_last_modifier integer,
    tmsp_creation timestamp with time zone DEFAULT now(),
    tmsp_last_modification timestamp with time zone,
    pk_label integer NOT NULL,
    label text,
    fk_system_type integer,
    fk_language character(3),
    fk_entity integer,
    notes text,
    sys_period tstzrange DEFAULT tstzrange(now(), NULL::timestamp with time zone)
)
INHERITS (projects.entity);


--
-- TOC entry 228 (class 1259 OID 240370)
-- Name: _deprecated_label_vt; Type: TABLE; Schema: projects; Owner: -
--

CREATE TABLE projects._deprecated_label_vt (
    pk_entity integer NOT NULL,
    schema_name character varying,
    table_name character varying,
    fk_creator integer,
    fk_last_modifier integer,
    tmsp_creation timestamp with time zone,
    tmsp_last_modification timestamp with time zone,
    pk_label integer NOT NULL,
    label text,
    fk_system_type integer,
    fk_language character(3),
    fk_entity integer,
    notes text,
    sys_period tstzrange
);


--
-- TOC entry 328 (class 1259 OID 243906)
-- Name: argument; Type: TABLE; Schema: projects; Owner: -
--

CREATE TABLE projects.argument (
    pk_entity integer DEFAULT nextval('projects.entity_pk_entity_seq'::regclass),
    schema_name character varying NOT NULL,
    table_name character varying NOT NULL,
    entity_version integer NOT NULL,
    notes text,
    fk_creator integer,
    fk_last_modifier integer,
    tmsp_creation timestamp with time zone DEFAULT now(),
    tmsp_last_modification timestamp with time zone,
    sys_period tstzrange DEFAULT tstzrange(now(), NULL::timestamp with time zone),
    fk_is_about_role integer NOT NULL,
    fk_is_about_entity_association integer NOT NULL,
    fk_is_based_on_role integer NOT NULL,
    fk_is_based_on_entity_association integer NOT NULL,
    fk_is_based_on_persistent_item integer NOT NULL,
    fk_is_based_on_factoid_role integer NOT NULL,
    fk_is_based_on_cell integer NOT NULL,
    fk_assertion_method_type integer NOT NULL,
    source_reliability integer,
    value integer
)
INHERITS (projects.entity);


--
-- TOC entry 329 (class 1259 OID 243960)
-- Name: argument_vt; Type: TABLE; Schema: projects; Owner: -
--

CREATE TABLE projects.argument_vt (
    pk_entity integer NOT NULL,
    schema_name character varying NOT NULL,
    table_name character varying NOT NULL,
    entity_version integer NOT NULL,
    notes text,
    fk_creator integer,
    fk_last_modifier integer,
    tmsp_creation timestamp with time zone,
    tmsp_last_modification timestamp with time zone,
    sys_period tstzrange,
    fk_is_about_role integer NOT NULL,
    fk_is_about_entity_association integer NOT NULL,
    fk_is_based_on_role integer NOT NULL,
    fk_is_based_on_entity_association integer NOT NULL,
    fk_is_based_on_persistent_item integer NOT NULL,
    fk_is_based_on_factoid_role integer NOT NULL,
    fk_is_based_on_cell integer NOT NULL,
    fk_assertion_method_type integer NOT NULL,
    source_reliability integer,
    value integer
);


--
-- TOC entry 306 (class 1259 OID 243045)
-- Name: class_field_config_vt; Type: TABLE; Schema: projects; Owner: -
--

CREATE TABLE projects.class_field_config_vt (
    pk_entity integer NOT NULL,
    schema_name character varying,
    table_name character varying,
    entity_version integer,
    notes text,
    fk_creator integer,
    fk_last_modifier integer,
    tmsp_creation timestamp with time zone,
    tmsp_last_modification timestamp with time zone,
    sys_period tstzrange,
    fk_app_context integer NOT NULL,
    _deprecated_fk_project integer,
    fk_property integer,
    property_is_outgoing boolean,
    fk_class_field integer,
    fk_class_for_class_field integer,
    ord_num integer,
    fk_project integer
);


--
-- TOC entry 316 (class 1259 OID 243261)
-- Name: dfh_class_proj_rel; Type: TABLE; Schema: projects; Owner: -
--

CREATE TABLE projects.dfh_class_proj_rel (
    pk_entity integer DEFAULT nextval('data_for_history.entity_pk_entity_seq'::regclass),
    schema_name character varying NOT NULL,
    table_name character varying NOT NULL,
    entity_version integer NOT NULL,
    notes text,
    fk_creator integer,
    fk_last_modifier integer,
    tmsp_creation timestamp with time zone DEFAULT now(),
    tmsp_last_modification timestamp with time zone,
    sys_period tstzrange DEFAULT tstzrange(now(), NULL::timestamp with time zone),
    tmsp_last_dfh_update timestamp with time zone,
    is_enabled_in_profile boolean,
    removed_from_api boolean DEFAULT false,
    _deprecated_fk_project integer,
    fk_entity integer,
    enabled_in_entities boolean,
    fk_project integer NOT NULL
)
INHERITS (projects.entity);


--
-- TOC entry 6177 (class 0 OID 0)
-- Dependencies: 316
-- Name: TABLE dfh_class_proj_rel; Type: COMMENT; Schema: projects; Owner: -
--

COMMENT ON TABLE projects.dfh_class_proj_rel IS 'This table relates any child table of the data_for_history.entity to a project.';


--
-- TOC entry 6178 (class 0 OID 0)
-- Dependencies: 316
-- Name: COLUMN dfh_class_proj_rel.enabled_in_entities; Type: COMMENT; Schema: projects; Owner: -
--

COMMENT ON COLUMN projects.dfh_class_proj_rel.enabled_in_entities IS 'If true, the entity is (added / activated / visible) in the project, if false it is not in the project';


--
-- TOC entry 317 (class 1259 OID 243288)
-- Name: dfh_class_proj_rel_vt; Type: TABLE; Schema: projects; Owner: -
--

CREATE TABLE projects.dfh_class_proj_rel_vt (
    pk_entity integer NOT NULL,
    schema_name character varying,
    table_name character varying,
    entity_version integer,
    notes text,
    fk_creator integer,
    fk_last_modifier integer,
    tmsp_creation timestamp with time zone,
    tmsp_last_modification timestamp with time zone,
    sys_period tstzrange,
    tmsp_last_dfh_update timestamp with time zone,
    is_enabled_in_profile boolean,
    removed_from_api boolean,
    _deprecated_fk_project integer,
    fk_entity integer,
    is_in_project boolean,
    fk_project integer
);


--
-- TOC entry 260 (class 1259 OID 240774)
-- Name: entity_version_project_rel_pk_entity_version_project_rel_seq; Type: SEQUENCE; Schema: projects; Owner: -
--

CREATE SEQUENCE projects.entity_version_project_rel_pk_entity_version_project_rel_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 6179 (class 0 OID 0)
-- Dependencies: 260
-- Name: entity_version_project_rel_pk_entity_version_project_rel_seq; Type: SEQUENCE OWNED BY; Schema: projects; Owner: -
--

ALTER SEQUENCE projects.entity_version_project_rel_pk_entity_version_project_rel_seq OWNED BY projects.info_proj_rel._deprecated_pk_entity_version_project_rel;


--
-- TOC entry 262 (class 1259 OID 240800)
-- Name: info_proj_rel_vt; Type: TABLE; Schema: projects; Owner: -
--

CREATE TABLE projects.info_proj_rel_vt (
    pk_entity integer NOT NULL,
    schema_name character varying NOT NULL,
    table_name character varying NOT NULL,
    entity_version integer NOT NULL,
    notes text,
    fk_creator integer,
    fk_last_modifier integer,
    tmsp_creation timestamp with time zone,
    tmsp_last_modification timestamp with time zone,
    sys_period tstzrange,
    _deprecated_pk_entity_version_project_rel integer NOT NULL,
    _deprecated_fk_project integer,
    fk_entity integer,
    fk_entity_version integer,
    fk_entity_version_concat text,
    is_in_project boolean,
    is_standard_in_project boolean,
    calendar public.calendar_type,
    ord_num integer,
    fk_project integer
);


--
-- TOC entry 226 (class 1259 OID 240348)
-- Name: label_pk_label_seq; Type: SEQUENCE; Schema: projects; Owner: -
--

CREATE SEQUENCE projects.label_pk_label_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 6180 (class 0 OID 0)
-- Dependencies: 226
-- Name: label_pk_label_seq; Type: SEQUENCE OWNED BY; Schema: projects; Owner: -
--

ALTER SEQUENCE projects.label_pk_label_seq OWNED BY projects._deprecated_label.pk_label;


--
-- TOC entry 207 (class 1259 OID 240172)
-- Name: language; Type: TABLE; Schema: projects; Owner: -
--

CREATE TABLE projects.language (
    pk_language character(3) NOT NULL,
    lang_type character varying,
    scope character varying,
    iso6392b character(3),
    iso6392t character(3),
    iso6391 character(3),
    notes text,
    fk_creator integer,
    fk_last_modifier integer,
    tmsp_creation timestamp with time zone DEFAULT now(),
    tmsp_last_modification timestamp with time zone,
    sys_period tstzrange DEFAULT tstzrange(now(), NULL::timestamp with time zone)
);


--
-- TOC entry 208 (class 1259 OID 240184)
-- Name: language_vt; Type: TABLE; Schema: projects; Owner: -
--

CREATE TABLE projects.language_vt (
    pk_language character(3) NOT NULL,
    lang_type character varying,
    scope character varying,
    iso6392b character(3),
    iso6392t character(3),
    iso6391 character(3),
    notes text,
    fk_creator integer,
    fk_last_modifier integer,
    tmsp_creation timestamp with time zone,
    tmsp_last_modification timestamp with time zone,
    sys_period tstzrange
);


--
-- TOC entry 230 (class 1259 OID 240379)
-- Name: project; Type: TABLE; Schema: projects; Owner: -
--

CREATE TABLE projects.project (
    pk_entity integer DEFAULT nextval('projects.entity_pk_entity_seq'::regclass),
    schema_name character varying,
    table_name character varying,
    _deprecated_pk_project integer NOT NULL,
    fk_creator integer,
    fk_last_modifier integer,
    tmsp_creation timestamp with time zone DEFAULT now(),
    tmsp_last_modification timestamp with time zone,
    _deprecated_fk_language character(3),
    notes text,
    sys_period tstzrange DEFAULT tstzrange(now(), NULL::timestamp with time zone),
    fk_language integer
)
INHERITS (projects.entity);


--
-- TOC entry 229 (class 1259 OID 240377)
-- Name: project_pk_project_seq; Type: SEQUENCE; Schema: projects; Owner: -
--

CREATE SEQUENCE projects.project_pk_project_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 6181 (class 0 OID 0)
-- Dependencies: 229
-- Name: project_pk_project_seq; Type: SEQUENCE OWNED BY; Schema: projects; Owner: -
--

ALTER SEQUENCE projects.project_pk_project_seq OWNED BY projects.project._deprecated_pk_project;


--
-- TOC entry 231 (class 1259 OID 240409)
-- Name: project_vt; Type: TABLE; Schema: projects; Owner: -
--

CREATE TABLE projects.project_vt (
    pk_entity integer NOT NULL,
    schema_name character varying,
    table_name character varying,
    _deprecated_pk_project integer NOT NULL,
    fk_creator integer,
    fk_last_modifier integer,
    tmsp_creation timestamp with time zone,
    tmsp_last_modification timestamp with time zone,
    _deprecated_fk_language character(3),
    notes text,
    sys_period tstzrange
);


--
-- TOC entry 336 (class 1259 OID 244080)
-- Name: query; Type: TABLE; Schema: projects; Owner: -
--

CREATE TABLE projects.query (
    name character varying,
    description character varying,
    query jsonb,
    _deprecated_fk_project integer,
    fk_project integer NOT NULL
)
INHERITS (projects.entity);


--
-- TOC entry 337 (class 1259 OID 244094)
-- Name: query_vt; Type: TABLE; Schema: projects; Owner: -
--

CREATE TABLE projects.query_vt (
    pk_entity integer NOT NULL,
    schema_name character varying,
    table_name character varying,
    entity_version integer,
    notes text,
    fk_creator integer,
    fk_last_modifier integer,
    tmsp_creation timestamp with time zone,
    tmsp_last_modification timestamp with time zone,
    sys_period tstzrange,
    name character varying,
    description character varying,
    query jsonb,
    _deprecated_fk_project integer,
    fk_project integer
);


--
-- TOC entry 235 (class 1259 OID 240442)
-- Name: text_property; Type: TABLE; Schema: projects; Owner: -
--

CREATE TABLE projects.text_property (
    pk_entity integer DEFAULT nextval('projects.entity_pk_entity_seq'::regclass),
    schema_name character varying,
    table_name character varying,
    _deprecated_pk_text_property integer NOT NULL,
    _deprecated_text_property text,
    _deprecated_text_property_xml xml,
    fk_system_type integer,
    _deprecated_fk_language character(3),
    fk_entity integer,
    notes text,
    fk_creator integer,
    fk_last_modifier integer,
    tmsp_creation timestamp with time zone DEFAULT now(),
    tmsp_last_modification timestamp with time zone,
    sys_period tstzrange DEFAULT tstzrange(now(), NULL::timestamp with time zone),
    pk_text integer DEFAULT nextval('commons.text_pk_text_seq'::regclass),
    quill_doc jsonb,
    string text DEFAULT ''::text,
    fk_language integer,
    CONSTRAINT text_quill_doc_check CHECK (commons.validate_quill_doc(quill_doc))
)
INHERITS (projects.entity, commons.text);


--
-- TOC entry 234 (class 1259 OID 240440)
-- Name: text_property_pk_text_property_seq; Type: SEQUENCE; Schema: projects; Owner: -
--

CREATE SEQUENCE projects.text_property_pk_text_property_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 6182 (class 0 OID 0)
-- Dependencies: 234
-- Name: text_property_pk_text_property_seq; Type: SEQUENCE OWNED BY; Schema: projects; Owner: -
--

ALTER SEQUENCE projects.text_property_pk_text_property_seq OWNED BY projects.text_property._deprecated_pk_text_property;


--
-- TOC entry 236 (class 1259 OID 240462)
-- Name: text_property_vt; Type: TABLE; Schema: projects; Owner: -
--

CREATE TABLE projects.text_property_vt (
    pk_entity integer NOT NULL,
    schema_name character varying,
    table_name character varying,
    _deprecated_pk_text_property integer NOT NULL,
    _deprecated_text_property text,
    _deprecated_text_property_xml xml,
    fk_system_type integer,
    _deprecated_fk_language character(3),
    fk_entity integer,
    notes text,
    fk_creator integer,
    fk_last_modifier integer,
    tmsp_creation timestamp with time zone,
    tmsp_last_modification timestamp with time zone,
    sys_period tstzrange,
    entity_version integer,
    pk_text integer DEFAULT nextval('commons.text_pk_text_seq'::regclass),
    quill_doc jsonb,
    string text DEFAULT ''::text,
    CONSTRAINT text_quill_doc_check CHECK (commons.validate_quill_doc(quill_doc))
)
INHERITS (commons.text_vt);


--
-- TOC entry 324 (class 1259 OID 243425)
-- Name: v_info_proj_rel; Type: VIEW; Schema: projects; Owner: -
--

CREATE VIEW projects.v_info_proj_rel AS
 SELECT info_proj_rel.pk_entity,
    info_proj_rel.schema_name,
    info_proj_rel.table_name,
    info_proj_rel.notes,
    info_proj_rel.fk_creator,
    info_proj_rel.fk_last_modifier,
    info_proj_rel.tmsp_creation,
    info_proj_rel.tmsp_last_modification,
    info_proj_rel.sys_period,
    info_proj_rel._deprecated_pk_entity_version_project_rel AS pk_entity_version_project_rel,
    info_proj_rel.fk_project,
    info_proj_rel.fk_entity,
    info_proj_rel.fk_entity_version,
    info_proj_rel.fk_entity_version_concat,
    info_proj_rel.is_in_project,
    info_proj_rel.is_standard_in_project,
    info_proj_rel.calendar,
    info_proj_rel.ord_num,
    info_proj_rel.entity_version
   FROM projects.info_proj_rel;


--
-- TOC entry 340 (class 1259 OID 244180)
-- Name: visual; Type: TABLE; Schema: projects; Owner: -
--

CREATE TABLE projects.visual (
    name character varying,
    description character varying,
    visual jsonb,
    _deprecated_fk_project integer,
    fk_project integer NOT NULL
)
INHERITS (projects.entity);


--
-- TOC entry 341 (class 1259 OID 244196)
-- Name: visual_vt; Type: TABLE; Schema: projects; Owner: -
--

CREATE TABLE projects.visual_vt (
    pk_entity integer NOT NULL,
    schema_name character varying,
    table_name character varying,
    entity_version integer,
    notes text,
    fk_creator integer,
    fk_last_modifier integer,
    tmsp_creation timestamp with time zone,
    tmsp_last_modification timestamp with time zone,
    sys_period tstzrange,
    name character varying,
    description character varying,
    visual jsonb,
    _deprecated_fk_project integer,
    fk_project integer
);


--
-- TOC entry 217 (class 1259 OID 240285)
-- Name: accesstoken; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.accesstoken (
    id text NOT NULL,
    ttl integer DEFAULT 1209600,
    scopes text,
    created timestamp with time zone,
    userid integer
);


--
-- TOC entry 216 (class 1259 OID 240272)
-- Name: account; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.account (
    realm text,
    username text,
    password text NOT NULL,
    email text NOT NULL,
    emailverified boolean,
    verificationtoken text,
    id integer NOT NULL
);


--
-- TOC entry 215 (class 1259 OID 240270)
-- Name: account_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.account_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 6183 (class 0 OID 0)
-- Dependencies: 215
-- Name: account_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.account_id_seq OWNED BY public.account.id;


--
-- TOC entry 238 (class 1259 OID 240481)
-- Name: account_project_rel; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.account_project_rel (
    account_id integer NOT NULL,
    _deprecated_fk_project integer,
    role text NOT NULL,
    id integer NOT NULL,
    sys_period tstzrange DEFAULT tstzrange(now(), NULL::timestamp with time zone),
    fk_project integer NOT NULL,
    entity_version integer
);


--
-- TOC entry 237 (class 1259 OID 240479)
-- Name: account_project_rel_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.account_project_rel_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 6184 (class 0 OID 0)
-- Dependencies: 237
-- Name: account_project_rel_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.account_project_rel_id_seq OWNED BY public.account_project_rel.id;


--
-- TOC entry 352 (class 1259 OID 244981)
-- Name: account_project_rel_vt; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.account_project_rel_vt (
    account_id integer NOT NULL,
    _deprecated_fk_project integer,
    role text NOT NULL,
    id integer NOT NULL,
    sys_period tstzrange,
    fk_project integer,
    entity_version integer
);


--
-- TOC entry 223 (class 1259 OID 240328)
-- Name: acl; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.acl (
    model text,
    property text,
    accesstype text,
    permission text,
    principaltype text,
    principalid text,
    id integer NOT NULL
);


--
-- TOC entry 222 (class 1259 OID 240326)
-- Name: acl_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.acl_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 6185 (class 0 OID 0)
-- Dependencies: 222
-- Name: acl_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.acl_id_seq OWNED BY public.acl.id;


-- --
-- -- TOC entry 206 (class 1259 OID 240154)
-- -- Name: migrations; Type: TABLE; Schema: public; Owner: -
-- --

-- CREATE TABLE IF NOT EXISTS public.migrations (
--     id integer NOT NULL,
--     name character varying(255) NOT NULL,
--     run_on timestamp without time zone NOT NULL
-- );


-- --
-- -- TOC entry 205 (class 1259 OID 240152)
-- -- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: -
-- --

-- CREATE SEQUENCE IF NOT EXISTS public.migrations_id_seq
--     AS integer
--     START WITH 1
--     INCREMENT BY 1
--     NO MINVALUE
--     NO MAXVALUE
--     CACHE 1;


-- --
-- -- TOC entry 6186 (class 0 OID 0)
-- -- Dependencies: 205
-- -- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
-- --

-- ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- TOC entry 219 (class 1259 OID 240301)
-- Name: role; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.role (
    id integer NOT NULL,
    name text NOT NULL,
    description text,
    created timestamp with time zone,
    modified timestamp with time zone
);


--
-- TOC entry 218 (class 1259 OID 240299)
-- Name: role_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.role_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 6187 (class 0 OID 0)
-- Dependencies: 218
-- Name: role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.role_id_seq OWNED BY public.role.id;


--
-- TOC entry 221 (class 1259 OID 240312)
-- Name: rolemapping; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.rolemapping (
    id integer NOT NULL,
    principaltype text,
    principalid text,
    roleid integer
);


--
-- TOC entry 220 (class 1259 OID 240310)
-- Name: rolemapping_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.rolemapping_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 6188 (class 0 OID 0)
-- Dependencies: 220
-- Name: rolemapping_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.rolemapping_id_seq OWNED BY public.rolemapping.id;


--
-- TOC entry 303 (class 1259 OID 242996)
-- Name: app_context; Type: TABLE; Schema: system; Owner: -
--

CREATE TABLE system.app_context (
    pk_entity integer DEFAULT nextval('projects.entity_pk_entity_seq'::regclass),
    schema_name character varying,
    table_name character varying,
    entity_version integer,
    notes text,
    fk_creator integer,
    fk_last_modifier integer,
    tmsp_creation timestamp with time zone DEFAULT now(),
    tmsp_last_modification timestamp with time zone,
    sys_period tstzrange DEFAULT tstzrange(now(), NULL::timestamp with time zone),
    label character varying NOT NULL,
    description text
)
INHERITS (system.entity);


--
-- TOC entry 304 (class 1259 OID 243010)
-- Name: app_context_vt; Type: TABLE; Schema: system; Owner: -
--

CREATE TABLE system.app_context_vt (
    pk_entity integer NOT NULL,
    schema_name character varying,
    table_name character varying,
    entity_version integer,
    notes text,
    fk_creator integer,
    fk_last_modifier integer,
    tmsp_creation timestamp with time zone,
    tmsp_last_modification timestamp with time zone,
    sys_period tstzrange,
    label character varying NOT NULL,
    description text
);


--
-- TOC entry 322 (class 1259 OID 243385)
-- Name: class_field_property_rel; Type: TABLE; Schema: system; Owner: -
--

CREATE TABLE system.class_field_property_rel (
    pk_entity integer DEFAULT nextval('projects.entity_pk_entity_seq'::regclass),
    schema_name character varying,
    table_name character varying,
    entity_version integer,
    notes text,
    fk_creator integer,
    fk_last_modifier integer,
    tmsp_creation timestamp with time zone DEFAULT now(),
    tmsp_last_modification timestamp with time zone,
    sys_period tstzrange DEFAULT tstzrange(now(), NULL::timestamp with time zone),
    fk_class_field integer,
    fk_property integer,
    property_is_outgoing boolean,
    ord_num integer
)
INHERITS (system.entity);


--
-- TOC entry 6189 (class 0 OID 0)
-- Dependencies: 322
-- Name: TABLE class_field_property_rel; Type: COMMENT; Schema: system; Owner: -
--

COMMENT ON TABLE system.class_field_property_rel IS 'This table stores, what properties are bundled in the property set';


--
-- TOC entry 6190 (class 0 OID 0)
-- Dependencies: 322
-- Name: COLUMN class_field_property_rel.fk_class_field; Type: COMMENT; Schema: system; Owner: -
--

COMMENT ON COLUMN system.class_field_property_rel.fk_class_field IS 'The property set';


--
-- TOC entry 6191 (class 0 OID 0)
-- Dependencies: 322
-- Name: COLUMN class_field_property_rel.fk_property; Type: COMMENT; Schema: system; Owner: -
--

COMMENT ON COLUMN system.class_field_property_rel.fk_property IS 'The property belonging to the property set';


--
-- TOC entry 6192 (class 0 OID 0)
-- Dependencies: 322
-- Name: COLUMN class_field_property_rel.property_is_outgoing; Type: COMMENT; Schema: system; Owner: -
--

COMMENT ON COLUMN system.class_field_property_rel.property_is_outgoing IS 'Wether the property is outgoing, seen from the class that will use it';


--
-- TOC entry 6193 (class 0 OID 0)
-- Dependencies: 322
-- Name: COLUMN class_field_property_rel.ord_num; Type: COMMENT; Schema: system; Owner: -
--

COMMENT ON COLUMN system.class_field_property_rel.ord_num IS 'The order number of the property within the property set.';


--
-- TOC entry 323 (class 1259 OID 243411)
-- Name: class_field_property_rel_vt; Type: TABLE; Schema: system; Owner: -
--

CREATE TABLE system.class_field_property_rel_vt (
    pk_entity integer NOT NULL,
    schema_name character varying,
    table_name character varying,
    entity_version integer,
    notes text,
    fk_creator integer,
    fk_last_modifier integer,
    tmsp_creation timestamp with time zone,
    tmsp_last_modification timestamp with time zone,
    sys_period tstzrange,
    fk_class_field integer,
    fk_property integer,
    property_is_outgoing boolean,
    ord_num integer
);


--
-- TOC entry 308 (class 1259 OID 243066)
-- Name: class_field_vt; Type: TABLE; Schema: system; Owner: -
--

CREATE TABLE system.class_field_vt (
    pk_entity integer NOT NULL,
    schema_name character varying,
    table_name character varying,
    entity_version integer,
    notes text,
    fk_creator integer,
    fk_last_modifier integer,
    tmsp_creation timestamp with time zone,
    tmsp_last_modification timestamp with time zone,
    sys_period tstzrange,
    label character varying NOT NULL,
    description text,
    used_table text,
    fk_system_type_ng_component integer
);


--
-- TOC entry 338 (class 1259 OID 244103)
-- Name: class_has_type_property; Type: TABLE; Schema: system; Owner: -
--

CREATE TABLE system.class_has_type_property (
    pk_entity integer DEFAULT nextval('projects.entity_pk_entity_seq'::regclass),
    schema_name character varying,
    table_name character varying,
    entity_version integer,
    notes text,
    fk_creator integer,
    fk_last_modifier integer,
    tmsp_creation timestamp with time zone DEFAULT now(),
    tmsp_last_modification timestamp with time zone,
    sys_period tstzrange DEFAULT tstzrange(now(), NULL::timestamp with time zone),
    fk_class integer,
    fk_property integer
)
INHERITS (system.entity);


--
-- TOC entry 339 (class 1259 OID 244129)
-- Name: class_has_type_property_vt; Type: TABLE; Schema: system; Owner: -
--

CREATE TABLE system.class_has_type_property_vt (
    pk_entity integer NOT NULL,
    schema_name character varying,
    table_name character varying,
    entity_version integer,
    notes text,
    fk_creator integer,
    fk_last_modifier integer,
    tmsp_creation timestamp with time zone,
    tmsp_last_modification timestamp with time zone,
    sys_period tstzrange,
    fk_class integer,
    fk_property integer
);


--
-- TOC entry 346 (class 1259 OID 244709)
-- Name: entity_pk_entity_seq; Type: SEQUENCE; Schema: system; Owner: -
--

CREATE SEQUENCE system.entity_pk_entity_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 6194 (class 0 OID 0)
-- Dependencies: 346
-- Name: entity_pk_entity_seq; Type: SEQUENCE OWNED BY; Schema: system; Owner: -
--

ALTER SEQUENCE system.entity_pk_entity_seq OWNED BY system.entity.pk_entity;


--
-- TOC entry 348 (class 1259 OID 244740)
-- Name: system_relevant_class; Type: TABLE; Schema: system; Owner: -
--

CREATE TABLE system.system_relevant_class (
    fk_class integer NOT NULL,
    required_by_entities boolean,
    required_by_sources boolean,
    required_by_contr_vocabs boolean
)
INHERITS (system.entity);


--
-- TOC entry 349 (class 1259 OID 244759)
-- Name: system_relevant_class_vt; Type: TABLE; Schema: system; Owner: -
--

CREATE TABLE system.system_relevant_class_vt (
    pk_entity integer NOT NULL,
    schema_name character varying NOT NULL,
    table_name character varying NOT NULL,
    entity_version integer NOT NULL,
    notes text,
    fk_creator integer,
    fk_last_modifier integer,
    tmsp_creation timestamp with time zone,
    tmsp_last_modification timestamp with time zone,
    sys_period tstzrange,
    fk_class integer NOT NULL,
    required_by_entities boolean,
    required_by_sources boolean,
    required_by_contr_vocabs boolean
);


--
-- TOC entry 350 (class 1259 OID 244768)
-- Name: system_relevant_type; Type: TABLE; Schema: system; Owner: -
--

CREATE TABLE system.system_relevant_type (
    fk_type integer NOT NULL
)
INHERITS (system.entity);


--
-- TOC entry 351 (class 1259 OID 244787)
-- Name: system_relevant_type_vt; Type: TABLE; Schema: system; Owner: -
--

CREATE TABLE system.system_relevant_type_vt (
    pk_entity integer NOT NULL,
    schema_name character varying NOT NULL,
    table_name character varying NOT NULL,
    entity_version integer NOT NULL,
    notes text,
    fk_creator integer,
    fk_last_modifier integer,
    tmsp_creation timestamp with time zone,
    tmsp_last_modification timestamp with time zone,
    sys_period tstzrange,
    fk_type integer NOT NULL
);


--
-- TOC entry 232 (class 1259 OID 240418)
-- Name: system_type; Type: TABLE; Schema: system; Owner: -
--

CREATE TABLE system.system_type (
    pk_entity integer DEFAULT nextval('projects.entity_pk_entity_seq'::regclass),
    schema_name character varying,
    table_name character varying,
    st_schema_name character varying,
    st_table_name character varying,
    notes text,
    fk_creator integer,
    fk_last_modifier integer,
    tmsp_creation timestamp with time zone DEFAULT now(),
    tmsp_last_modification timestamp with time zone,
    sys_period tstzrange DEFAULT tstzrange(now(), NULL::timestamp with time zone),
    entity_version integer
)
INHERITS (system.entity);


--
-- TOC entry 233 (class 1259 OID 240433)
-- Name: system_type_vt; Type: TABLE; Schema: system; Owner: -
--

CREATE TABLE system.system_type_vt (
    pk_entity integer NOT NULL,
    schema_name character varying,
    table_name character varying,
    pk_system_type integer NOT NULL,
    st_schema_name character varying,
    st_table_name character varying,
    notes text,
    fk_creator integer,
    fk_last_modifier integer,
    tmsp_creation timestamp with time zone,
    tmsp_last_modification timestamp with time zone,
    sys_period tstzrange
);


--
-- TOC entry 330 (class 1259 OID 243971)
-- Name: class_preview; Type: TABLE; Schema: warehouse; Owner: -
--

CREATE TABLE warehouse.class_preview (
    class_label character varying,
    entity_type text,
    dfh_pk_class integer
);


--
-- TOC entry 335 (class 1259 OID 244041)
-- Name: entity_preview; Type: TABLE; Schema: warehouse; Owner: -
--

CREATE TABLE warehouse.entity_preview (
    pk_entity integer,
    fk_project integer,
    project integer,
    fk_class integer,
    entity_type text,
    class_label character varying,
    entity_label text,
    time_span jsonb,
    own_full_text text,
    fk_entity_label integer,
    fk_type integer,
    type_label text,
    related_full_texts jsonb,
    full_text text,
    ts_vector tsvector
);


--
-- TOC entry 332 (class 1259 OID 243996)
-- Name: v_entities; Type: VIEW; Schema: warehouse; Owner: -
--

CREATE VIEW warehouse.v_entities AS
 SELECT DISTINCT e.pk_entity,
    epr.fk_project,
    epr.fk_project AS project,
        CASE
            WHEN (pi.pk_entity IS NOT NULL) THEN pi.fk_class
            ELSE te.fk_class
        END AS fk_class,
    e.table_name,
        CASE
            WHEN ((e.table_name)::text = 'persistent_item'::text) THEN 'peIt'::text
            WHEN ((e.table_name)::text = 'temporal_entity'::text) THEN 'teEn'::text
            ELSE NULL::text
        END AS entity_type
   FROM (((projects.info_proj_rel epr
     JOIN information.entity e ON ((e.pk_entity = epr.fk_entity)))
     LEFT JOIN information.persistent_item pi ON ((e.pk_entity = pi.pk_entity)))
     LEFT JOIN information.temporal_entity te ON ((e.pk_entity = te.pk_entity)))
  WHERE ((epr.is_in_project = true) AND ((e.table_name)::text = ANY (ARRAY[('temporal_entity'::character varying)::text, ('persistent_item'::character varying)::text])))
UNION
 SELECT DISTINCT e.pk_entity,
    NULL::integer AS fk_project,
    0 AS project,
        CASE
            WHEN (pi.pk_entity IS NOT NULL) THEN pi.fk_class
            ELSE te.fk_class
        END AS fk_class,
    e.table_name,
        CASE
            WHEN ((e.table_name)::text = 'persistent_item'::text) THEN 'peIt'::text
            WHEN ((e.table_name)::text = 'temporal_entity'::text) THEN 'teEn'::text
            ELSE NULL::text
        END AS entity_type
   FROM ((information.entity e
     LEFT JOIN information.persistent_item pi ON ((e.pk_entity = pi.pk_entity)))
     LEFT JOIN information.temporal_entity te ON ((e.pk_entity = te.pk_entity)))
  WHERE ((e.table_name)::text = ANY (ARRAY[('temporal_entity'::character varying)::text, ('persistent_item'::character varying)::text]))
  ORDER BY 1;


--
-- TOC entry 392 (class 1259 OID 246017)
-- Name: v_entity_association_per_project_and_repo; Type: VIEW; Schema: warehouse; Owner: -
--

CREATE VIEW warehouse.v_entity_association_per_project_and_repo AS
 SELECT DISTINCT ea.pk_entity,
    ea.fk_info_domain,
    ea.fk_info_range,
    ea.fk_data_domain,
    ea.fk_data_range,
    ea.fk_property,
    epr.fk_project,
    epr.ord_num AS rank_for_domain,
    epr.ord_num AS rank_for_range,
    COALESCE(epr.fk_project, 0) AS project
   FROM (information.v_entity_association ea
     LEFT JOIN projects.info_proj_rel epr ON (((epr.fk_entity = ea.pk_entity) AND (epr.is_in_project = true))))
UNION
 SELECT DISTINCT ea.pk_entity,
    ea.fk_info_domain,
    ea.fk_info_range,
    ea.fk_data_domain,
    ea.fk_data_range,
    ea.fk_property,
    NULL::integer AS fk_project,
    ea.rank_for_domain,
    ea.rank_for_range,
    0 AS project
   FROM information.v_entity_association ea
  WHERE (ea.is_in_project_count > 0);


--
-- TOC entry 331 (class 1259 OID 243991)
-- Name: v_roles_per_project_and_repo; Type: VIEW; Schema: warehouse; Owner: -
--

CREATE VIEW warehouse.v_roles_per_project_and_repo AS
 SELECT DISTINCT r.fk_entity,
    r.fk_temporal_entity,
    r.fk_property,
    epr.fk_project,
    epr.ord_num AS rank_for_pe_it,
    epr.ord_num AS rank_for_te_ent,
    COALESCE(epr.fk_project, 0) AS project
   FROM (information.v_role r
     LEFT JOIN projects.info_proj_rel epr ON (((epr.fk_entity = r.pk_entity) AND (epr.is_in_project = true))))
UNION
 SELECT DISTINCT r.fk_entity,
    r.fk_temporal_entity,
    r.fk_property,
    NULL::integer AS fk_project,
    r.rank_for_pe_it,
    r.rank_for_te_ent,
    0 AS project
   FROM information.v_role r
  WHERE (r.is_in_project_count > 0);


--
-- TOC entry 333 (class 1259 OID 244011)
-- Name: v_fk_entity_label; Type: VIEW; Schema: warehouse; Owner: -
--

CREATE VIEW warehouse.v_fk_entity_label AS
 WITH entities AS (
         SELECT v_entities.pk_entity,
            v_entities.fk_project,
            v_entities.project,
            v_entities.fk_class,
            v_entities.table_name,
            v_entities.entity_type
           FROM warehouse.v_entities
        )
 SELECT entities.pk_entity,
    entities.fk_project,
    entities.project,
    entities.fk_class,
    entities.table_name,
    entities.entity_type,
    a.fk_entity_label
   FROM (entities
     LEFT JOIN ( SELECT r.fk_entity AS pk_entity,
            r.fk_temporal_entity AS fk_entity_label,
            r.fk_project,
            row_number() OVER (PARTITION BY r.fk_entity, COALESCE(r.fk_project, 0) ORDER BY r.rank_for_pe_it) AS rank
           FROM ((warehouse.v_roles_per_project_and_repo r
             JOIN projects.class_field_config ucc ON (((ucc.fk_property = r.fk_property) AND (ucc.ord_num = 0) AND (ucc.property_is_outgoing = false) AND (ucc.fk_app_context = 45))))
             JOIN information.entity e ON (((r.fk_temporal_entity = e.pk_entity) AND ((e.table_name)::text = 'temporal_entity'::text))))
        UNION
         SELECT r.fk_temporal_entity AS pk_entity,
            r.fk_entity AS fk_entity_label,
            r.fk_project,
            row_number() OVER (PARTITION BY r.fk_temporal_entity, COALESCE(r.fk_project, 0) ORDER BY r.rank_for_te_ent) AS rank
           FROM ((warehouse.v_roles_per_project_and_repo r
             JOIN projects.class_field_config ucc ON (((ucc.fk_property = r.fk_property) AND (ucc.ord_num = 0) AND (ucc.property_is_outgoing = true) AND (ucc.fk_app_context = 45))))
             JOIN information.entity e ON (((r.fk_entity = e.pk_entity) AND ((e.table_name)::text = 'persistent_item'::text))))) a ON (((a.pk_entity = entities.pk_entity) AND (NOT (a.fk_project IS DISTINCT FROM entities.fk_project)))))
  WHERE (a.rank = 1);


--
-- TOC entry 393 (class 1259 OID 246022)
-- Name: v_fk_type; Type: VIEW; Schema: warehouse; Owner: -
--

CREATE VIEW warehouse.v_fk_type AS
 WITH entities AS (
         SELECT v_entities.pk_entity,
            v_entities.fk_project,
            v_entities.project,
            v_entities.fk_class,
            v_entities.table_name,
            v_entities.entity_type
           FROM warehouse.v_entities
        )
 SELECT DISTINCT ea.fk_info_domain AS pk_entity,
    ea.fk_project,
    ea.project,
    ea.fk_info_range AS fk_type
   FROM (((warehouse.v_entity_association_per_project_and_repo ea
     JOIN projects.info_proj_rel epr ON ((ea.pk_entity = epr.fk_entity)))
     JOIN data_for_history.property p ON ((ea.fk_property = p.dfh_pk_property)))
     JOIN system.class_has_type_property hasprop ON ((hasprop.fk_property = p.dfh_pk_property)))
  WHERE (ea.rank_for_domain = 1);


--
-- TOC entry 355 (class 1259 OID 245239)
-- Name: v_text_properties_per_project_and_repo; Type: VIEW; Schema: warehouse; Owner: -
--

CREATE VIEW warehouse.v_text_properties_per_project_and_repo AS
 SELECT DISTINCT t.pk_entity,
    t.schema_name,
    t.table_name,
    t.notes,
    t.fk_creator,
    t.fk_last_modifier,
    t.tmsp_creation,
    t.tmsp_last_modification,
    t.sys_period,
    t.fk_concerned_entity,
    t.fk_language,
    t.fk_class_field,
    t.quill_doc,
    t.string,
    t.is_in_project_count,
    epr.fk_project,
    COALESCE(epr.fk_project, 0) AS "coalesce"
   FROM (information.v_text_property t
     JOIN projects.info_proj_rel epr ON (((epr.fk_entity = t.pk_entity) AND (epr.is_in_project = true))))
UNION
 SELECT DISTINCT t.pk_entity,
    t.schema_name,
    t.table_name,
    t.notes,
    t.fk_creator,
    t.fk_last_modifier,
    t.tmsp_creation,
    t.tmsp_last_modification,
    t.sys_period,
    t.fk_concerned_entity,
    t.fk_language,
    t.fk_class_field,
    t.quill_doc,
    t.string,
    t.is_in_project_count,
    NULL::integer AS fk_project,
    0 AS "coalesce"
   FROM information.v_text_property t
  WHERE (t.is_in_project_count > 0);


--
-- TOC entry 358 (class 1259 OID 245275)
-- Name: v_own_entity_label; Type: VIEW; Schema: warehouse; Owner: -
--

CREATE VIEW warehouse.v_own_entity_label AS
 WITH entities AS (
         SELECT v_entities.pk_entity,
            v_entities.fk_project,
            v_entities.project,
            v_entities.fk_class,
            v_entities.table_name,
            v_entities.entity_type
           FROM warehouse.v_entities
        ), first_field AS (
         SELECT e.pk_entity,
            e.fk_project,
            e.project,
            e.fk_class,
            e.table_name,
            e.entity_type,
            f.fk_property,
            f.fk_class_field,
            f.fk_class
           FROM (information.v_ordered_fields_per_class f
             JOIN entities e ON ((f.fk_class = e.fk_class)))
          WHERE (f.field_order = 0)
        ), string_from_first_role AS (
         SELECT all_roles.pk_entity,
            all_roles.fk_project,
            all_roles.project,
            all_roles.fk_class,
            all_roles.table_name,
            all_roles.entity_type,
            all_roles.fk_property,
            all_roles.fk_class_field,
            all_roles.fk_class_1 AS fk_class,
            all_roles.string_from_first_role,
            all_roles.role_number
           FROM ( SELECT first_field.pk_entity,
                    first_field.fk_project,
                    first_field.project,
                    first_field.fk_class,
                    first_field.table_name,
                    first_field.entity_type,
                    first_field.fk_property,
                    first_field.fk_class_field,
                    first_field.fk_class_1 AS fk_class,
                    COALESCE(appe.string, lang.notes) AS string_from_first_role,
                    row_number() OVER (PARTITION BY first_field.pk_entity, first_field.project ORDER BY r.rank_for_pe_it) AS role_number
                   FROM (((first_field first_field(pk_entity, fk_project, project, fk_class, table_name, entity_type, fk_property, fk_class_field, fk_class_1)
                     LEFT JOIN warehouse.v_roles_per_project_and_repo r ON (((first_field.fk_property = r.fk_property) AND (first_field.pk_entity = r.fk_temporal_entity) AND (NOT (r.fk_project IS DISTINCT FROM first_field.fk_project)))))
                     LEFT JOIN information.v_appellation appe ON ((r.fk_entity = appe.pk_entity)))
                     LEFT JOIN information.v_language lang ON ((r.fk_entity = lang.pk_entity)))) all_roles(pk_entity, fk_project, project, fk_class, table_name, entity_type, fk_property, fk_class_field, fk_class_1, string_from_first_role, role_number)
          WHERE (all_roles.role_number = 1)
        ), string_from_first_text_prop AS (
         SELECT all_txtp.p,
            all_txtp.pk_entity,
            all_txtp.fk_project,
            all_txtp.project,
            all_txtp.fk_class,
            all_txtp.table_name,
            all_txtp.entity_type,
            all_txtp.fk_property,
            all_txtp.fk_class_field,
            all_txtp.fk_class_1 AS fk_class,
            all_txtp.string_from_first_role,
            all_txtp.role_number,
            all_txtp.string_from_first_text_prop,
            all_txtp.txtp_number
           FROM ( SELECT COALESCE(string_from_first_role.fk_project, 0) AS p,
                    string_from_first_role.pk_entity,
                    string_from_first_role.fk_project,
                    string_from_first_role.project,
                    string_from_first_role.fk_class,
                    string_from_first_role.table_name,
                    string_from_first_role.entity_type,
                    string_from_first_role.fk_property,
                    string_from_first_role.fk_class_field,
                    string_from_first_role.fk_class_1 AS fk_class,
                    string_from_first_role.string_from_first_role,
                    string_from_first_role.role_number,
                    txtp.string AS string_from_first_text_prop,
                    row_number() OVER (PARTITION BY string_from_first_role.pk_entity, string_from_first_role.project ORDER BY txtp.tmsp_creation DESC) AS txtp_number
                   FROM (string_from_first_role string_from_first_role(pk_entity, fk_project, project, fk_class, table_name, entity_type, fk_property, fk_class_field, fk_class_1, string_from_first_role, role_number)
                     LEFT JOIN warehouse.v_text_properties_per_project_and_repo txtp ON (((NOT (string_from_first_role.fk_class_field IS DISTINCT FROM txtp.fk_class_field)) AND (txtp.fk_concerned_entity = string_from_first_role.pk_entity) AND (NOT (txtp.fk_project IS DISTINCT FROM string_from_first_role.fk_project)))))) all_txtp(p, pk_entity, fk_project, project, fk_class, table_name, entity_type, fk_property, fk_class_field, fk_class_1, string_from_first_role, role_number, string_from_first_text_prop, txtp_number)
          WHERE (all_txtp.txtp_number = 1)
        )
 SELECT string_from_first_text_prop.pk_entity,
    string_from_first_text_prop.fk_project,
    COALESCE(string_from_first_text_prop.string_from_first_role, string_from_first_text_prop.string_from_first_text_prop) AS entity_label,
    string_from_first_text_prop.project
   FROM string_from_first_text_prop string_from_first_text_prop(p, pk_entity, fk_project, project, fk_class, table_name, entity_type, fk_property, fk_class_field, fk_class_1, string_from_first_role, role_number, string_from_first_text_prop, txtp_number);


--
-- TOC entry 357 (class 1259 OID 245270)
-- Name: v_own_full_text; Type: VIEW; Schema: warehouse; Owner: -
--

CREATE VIEW warehouse.v_own_full_text AS
 WITH entities AS (
         SELECT v_entities.pk_entity,
            v_entities.fk_project,
            v_entities.project,
            v_entities.fk_class,
            v_entities.table_name,
            v_entities.entity_type
           FROM warehouse.v_entities
        ), field AS (
         SELECT e.pk_entity,
            e.fk_project,
            e.project,
            e.fk_class,
            e.table_name,
            e.entity_type,
            f.fk_property,
            f.fk_class_field,
            f.fk_class,
            f.field_order
           FROM (information.v_ordered_fields_per_class f
             JOIN entities e ON ((f.fk_class = e.fk_class)))
          WHERE (f.field_order IS NOT NULL)
        ), string_from_role AS (
         SELECT all_roles.pk_entity,
            all_roles.fk_project,
            all_roles.project,
            all_roles.fk_class,
            all_roles.table_name,
            all_roles.entity_type,
            all_roles.fk_property,
            all_roles.fk_class_field,
            all_roles.fk_class_1 AS fk_class,
            all_roles.field_order,
            all_roles.string,
            all_roles.role_number
           FROM ( SELECT field.pk_entity,
                    field.fk_project,
                    field.project,
                    field.fk_class,
                    field.table_name,
                    field.entity_type,
                    field.fk_property,
                    field.fk_class_field,
                    field.fk_class_1 AS fk_class,
                    field.field_order,
                    COALESCE(appe.string, lang.notes) AS string,
                    row_number() OVER (PARTITION BY field.pk_entity, field.project ORDER BY r.rank_for_pe_it) AS role_number
                   FROM (((field field(pk_entity, fk_project, project, fk_class, table_name, entity_type, fk_property, fk_class_field, fk_class_1, field_order)
                     LEFT JOIN warehouse.v_roles_per_project_and_repo r ON (((field.fk_property = r.fk_property) AND (field.pk_entity = r.fk_temporal_entity) AND (NOT (r.fk_project IS DISTINCT FROM field.fk_project)))))
                     LEFT JOIN information.v_appellation appe ON ((r.fk_entity = appe.pk_entity)))
                     LEFT JOIN information.v_language lang ON ((r.fk_entity = lang.pk_entity)))) all_roles(pk_entity, fk_project, project, fk_class, table_name, entity_type, fk_property, fk_class_field, fk_class_1, field_order, string, role_number)
        ), string_from_text_prop AS (
         SELECT all_txtp.pk_entity,
            all_txtp.fk_project,
            all_txtp.project,
            all_txtp.fk_class,
            all_txtp.table_name,
            all_txtp.entity_type,
            all_txtp.fk_property,
            all_txtp.fk_class_field,
            all_txtp.fk_class_1 AS fk_class,
            all_txtp.field_order,
            all_txtp.string,
            all_txtp.txtp_number
           FROM ( SELECT field.pk_entity,
                    field.fk_project,
                    field.project,
                    field.fk_class,
                    field.table_name,
                    field.entity_type,
                    field.fk_property,
                    field.fk_class_field,
                    field.fk_class_1 AS fk_class,
                    field.field_order,
                    regexp_replace(txtp.string, '[

]+'::text, ''::text, 'g'::text) AS string,
                    row_number() OVER (PARTITION BY field.pk_entity, field.project ORDER BY txtp.tmsp_creation DESC) AS txtp_number
                   FROM (field field(pk_entity, fk_project, project, fk_class, table_name, entity_type, fk_property, fk_class_field, fk_class_1, field_order)
                     LEFT JOIN warehouse.v_text_properties_per_project_and_repo txtp ON (((NOT (field.fk_class_field IS DISTINCT FROM txtp.fk_class_field)) AND (txtp.fk_concerned_entity = field.pk_entity) AND (NOT (txtp.fk_project IS DISTINCT FROM field.fk_project)))))) all_txtp(pk_entity, fk_project, project, fk_class, table_name, entity_type, fk_property, fk_class_field, fk_class_1, field_order, string, txtp_number)
        ), all_stings AS (
         SELECT string_from_text_prop.pk_entity,
            string_from_text_prop.fk_project,
            string_from_text_prop.project,
            string_from_text_prop.fk_class,
            string_from_text_prop.table_name,
            string_from_text_prop.entity_type,
            string_from_text_prop.fk_property,
            string_from_text_prop.fk_class_field,
            string_from_text_prop.fk_class_1 AS fk_class,
            string_from_text_prop.field_order,
            string_from_text_prop.string,
            string_from_text_prop.txtp_number
           FROM string_from_text_prop string_from_text_prop(pk_entity, fk_project, project, fk_class, table_name, entity_type, fk_property, fk_class_field, fk_class_1, field_order, string, txtp_number)
        UNION
         SELECT string_from_role.pk_entity,
            string_from_role.fk_project,
            string_from_role.project,
            string_from_role.fk_class,
            string_from_role.table_name,
            string_from_role.entity_type,
            string_from_role.fk_property,
            string_from_role.fk_class_field,
            string_from_role.fk_class_1 AS fk_class,
            string_from_role.field_order,
            string_from_role.string,
            string_from_role.role_number
           FROM string_from_role string_from_role(pk_entity, fk_project, project, fk_class, table_name, entity_type, fk_property, fk_class_field, fk_class_1, field_order, string, role_number)
        ), aggregated AS (
         SELECT all_stings.pk_entity,
            all_stings.fk_project,
            all_stings.project,
            string_agg(all_stings.string, ', '::text ORDER BY all_stings.field_order) AS own_full_text
           FROM all_stings all_stings(pk_entity, fk_project, project, fk_class, table_name, entity_type, fk_property, fk_class_field, fk_class_1, field_order, string, txtp_number)
          GROUP BY all_stings.pk_entity, all_stings.fk_project, all_stings.project
        )
 SELECT aggregated.pk_entity,
    aggregated.fk_project,
    aggregated.project,
    aggregated.own_full_text
   FROM aggregated;


--
-- TOC entry 327 (class 1259 OID 243501)
-- Name: v_te_en_time_span_per_project_and_repo; Type: VIEW; Schema: warehouse; Owner: -
--

CREATE VIEW warehouse.v_te_en_time_span_per_project_and_repo AS
 WITH role_with_time_primitive AS (
         SELECT r.fk_temporal_entity,
            r.fk_property,
            epr.fk_project,
            epr.calendar,
            tp.julian_day,
            tp.duration
           FROM ((projects.info_proj_rel epr
             JOIN information.v_role r ON ((r.pk_entity = epr.fk_entity)))
             JOIN information.v_time_primitive tp ON ((tp.pk_entity = r.fk_entity)))
          WHERE (epr.is_in_project = true)
        UNION
         SELECT r.fk_temporal_entity,
            r.fk_property,
            NULL::integer AS fk_project,
            r.community_favorite_calendar,
            tp.julian_day,
            tp.duration
           FROM (information.v_role r
             JOIN information.v_time_primitive tp ON (((tp.pk_entity = r.fk_entity) AND (r.rank_for_te_ent = 1))))
        )
 SELECT role_with_time_primitive.fk_project,
    role_with_time_primitive.fk_temporal_entity,
    jsonb_object_agg(
        CASE
            WHEN (role_with_time_primitive.fk_property = 71) THEN 'p81'::text
            WHEN (role_with_time_primitive.fk_property = 72) THEN 'p82'::text
            WHEN (role_with_time_primitive.fk_property = 150) THEN 'p81a'::text
            WHEN (role_with_time_primitive.fk_property = 151) THEN 'p81b'::text
            WHEN (role_with_time_primitive.fk_property = 152) THEN 'p82a'::text
            WHEN (role_with_time_primitive.fk_property = 153) THEN 'p82b'::text
            ELSE (role_with_time_primitive.fk_property)::text
        END, json_build_object('julianDay', role_with_time_primitive.julian_day, 'duration', role_with_time_primitive.duration, 'calendar', role_with_time_primitive.calendar)) AS time_span
   FROM role_with_time_primitive
  GROUP BY role_with_time_primitive.fk_project, role_with_time_primitive.fk_temporal_entity;


--
-- TOC entry 394 (class 1259 OID 246027)
-- Name: v_entity_preview_non_recursive; Type: VIEW; Schema: warehouse; Owner: -
--

CREATE VIEW warehouse.v_entity_preview_non_recursive AS
 WITH entities AS (
         SELECT v_entities.pk_entity,
            v_entities.fk_project,
            v_entities.project,
            v_entities.fk_class,
            v_entities.table_name,
            v_entities.entity_type
           FROM warehouse.v_entities
        ), add_class_label AS (
         SELECT entities.pk_entity,
            entities.fk_project,
            entities.project,
            entities.fk_class,
            entities.table_name,
            entities.entity_type,
            c.class_label
           FROM (entities
             JOIN warehouse.class_preview c ON ((c.dfh_pk_class = entities.fk_class)))
        ), add_own_entity_label AS (
         SELECT a.pk_entity,
            a.fk_project,
            a.project,
            a.fk_class,
            a.table_name,
            a.entity_type,
            a.class_label,
            l.entity_label
           FROM (add_class_label a
             LEFT JOIN warehouse.v_own_entity_label l ON (((a.pk_entity = l.pk_entity) AND (a.project = l.project))))
        ), add_time_span AS (
         SELECT a.pk_entity,
            a.fk_project,
            a.project,
            a.fk_class,
            a.table_name,
            a.entity_type,
            a.class_label,
            a.entity_label,
            t.time_span
           FROM (add_own_entity_label a
             LEFT JOIN warehouse.v_te_en_time_span_per_project_and_repo t ON (((a.pk_entity = t.fk_temporal_entity) AND (NOT (a.fk_project IS DISTINCT FROM t.fk_project)))))
        ), add_own_full_text AS (
         SELECT a.pk_entity,
            a.fk_project,
            a.project,
            a.fk_class,
            a.table_name,
            a.entity_type,
            a.class_label,
            a.entity_label,
            a.time_span,
            t.own_full_text
           FROM (add_time_span a
             LEFT JOIN warehouse.v_own_full_text t ON (((a.pk_entity = t.pk_entity) AND (a.project = t.project))))
        ), add_fk_entity_label AS (
         SELECT a.pk_entity,
            a.fk_project,
            a.project,
            a.fk_class,
            a.table_name,
            a.entity_type,
            a.class_label,
            a.entity_label,
            a.time_span,
            a.own_full_text,
            t.fk_entity_label
           FROM (add_own_full_text a
             LEFT JOIN warehouse.v_fk_entity_label t ON (((a.pk_entity = t.pk_entity) AND (NOT (a.fk_project IS DISTINCT FROM t.fk_project)))))
        ), add_fk_type AS (
         SELECT a.pk_entity,
            a.fk_project,
            a.project,
            a.fk_class,
            a.table_name,
            a.entity_type,
            a.class_label,
            a.entity_label,
            a.time_span,
            a.own_full_text,
            a.fk_entity_label,
            t.fk_type
           FROM (add_fk_entity_label a
             LEFT JOIN warehouse.v_fk_type t ON (((a.pk_entity = t.pk_entity) AND (a.project = t.project))))
        )
 SELECT add_fk_type.pk_entity,
    add_fk_type.fk_project,
    add_fk_type.project,
    add_fk_type.fk_class,
    add_fk_type.table_name,
    add_fk_type.entity_type,
    add_fk_type.class_label,
    add_fk_type.entity_label,
    add_fk_type.time_span,
    add_fk_type.own_full_text,
    add_fk_type.fk_entity_label,
    add_fk_type.fk_type
   FROM add_fk_type;


--
-- TOC entry 395 (class 1259 OID 246032)
-- Name: v_entity_preview; Type: VIEW; Schema: warehouse; Owner: -
--

CREATE VIEW warehouse.v_entity_preview AS
 WITH previews_non_recursive AS (
         SELECT v_entity_preview_non_recursive.pk_entity,
            v_entity_preview_non_recursive.fk_project,
            v_entity_preview_non_recursive.project,
            v_entity_preview_non_recursive.fk_class,
            v_entity_preview_non_recursive.table_name,
            v_entity_preview_non_recursive.entity_type,
            v_entity_preview_non_recursive.class_label,
            v_entity_preview_non_recursive.entity_label,
            v_entity_preview_non_recursive.time_span,
            v_entity_preview_non_recursive.own_full_text,
            v_entity_preview_non_recursive.fk_entity_label,
            v_entity_preview_non_recursive.fk_type
           FROM warehouse.v_entity_preview_non_recursive
        ), fill_entity_label AS (
         SELECT t1.pk_entity,
            t1.fk_project,
            t1.project,
            t1.fk_class,
            t1.entity_type,
            t1.class_label,
            COALESCE(t1.entity_label, t2.entity_label) AS entity_label,
            t1.time_span,
            t1.own_full_text,
            t1.fk_entity_label,
            t1.fk_type
           FROM (previews_non_recursive t1
             LEFT JOIN previews_non_recursive t2 ON (((t1.fk_entity_label = t2.pk_entity) AND (t1.project = t2.project))))
        ), fill_type_label AS (
         SELECT t1.pk_entity,
            t1.fk_project,
            t1.project,
            t1.fk_class,
            t1.entity_type,
            t1.class_label,
            t1.entity_label,
            t1.time_span,
            t1.own_full_text,
            t1.fk_entity_label,
            t1.fk_type,
            t2.entity_label AS type_label
           FROM (fill_entity_label t1
             LEFT JOIN fill_entity_label t2 ON (((t1.fk_type = t2.pk_entity) AND (t1.project = t2.project))))
        ), full_text_dependencies AS (
         SELECT r.fk_temporal_entity AS pk_entity,
            r.project,
            r.fk_project,
            e.pk_entity AS pk_related_full_text,
            pre.own_full_text
           FROM ((warehouse.v_roles_per_project_and_repo r
             JOIN information.entity e ON (((e.pk_entity = r.fk_entity) AND ((e.table_name)::text = 'persistent_item'::text))))
             LEFT JOIN previews_non_recursive pre ON (((pre.pk_entity = e.pk_entity) AND (pre.project = r.project))))
        UNION
         SELECT r.fk_entity AS pk_entity,
            r.project,
            r.fk_project,
            e.pk_entity AS pk_related_full_text,
            pre.own_full_text
           FROM ((warehouse.v_roles_per_project_and_repo r
             JOIN information.entity e ON (((e.pk_entity = r.fk_temporal_entity) AND ((e.table_name)::text = 'temporal_entity'::text))))
             LEFT JOIN previews_non_recursive pre ON (((pre.pk_entity = e.pk_entity) AND (pre.project = r.project))))
        ), aggregated_related_full_texts AS (
         SELECT full_text_dependencies.pk_entity,
            full_text_dependencies.project,
            full_text_dependencies.fk_project,
            jsonb_object_agg((full_text_dependencies.pk_related_full_text)::text, full_text_dependencies.own_full_text) AS related_full_texts
           FROM full_text_dependencies
          GROUP BY full_text_dependencies.pk_entity, full_text_dependencies.project, full_text_dependencies.fk_project
        ), related_full_text AS (
         SELECT t1.pk_entity,
            t1.fk_project,
            t1.project,
            t1.fk_class,
            t1.entity_type,
            t1.class_label,
            t1.entity_label,
            t1.time_span,
            t1.own_full_text,
            t1.fk_entity_label,
            t1.fk_type,
            t1.type_label,
            t2.related_full_texts
           FROM (fill_type_label t1
             LEFT JOIN aggregated_related_full_texts t2 ON (((t1.pk_entity = t2.pk_entity) AND (t1.project = t2.project))))
        ), add_full_text AS (
         SELECT f.pk_entity,
            f.fk_project,
            f.project,
            f.fk_class,
            f.entity_type,
            f.class_label,
            f.entity_label,
            f.time_span,
            f.own_full_text,
            f.fk_entity_label,
            f.fk_type,
            f.type_label,
            f.related_full_texts,
            ( SELECT array_to_string(ARRAY[f.own_full_text, array_to_string(array_agg(jsonb_each_text.value), ', '::text)], ', '::text) AS array_to_string
                   FROM jsonb_each_text(f.related_full_texts) jsonb_each_text(key, value)) AS full_text
           FROM related_full_text f
        ), add_ts_vector AS (
         SELECT t.pk_entity,
            t.fk_project,
            t.project,
            t.fk_class,
            t.entity_type,
            t.class_label,
            t.entity_label,
            t.time_span,
            t.own_full_text,
            t.fk_entity_label,
            t.fk_type,
            t.type_label,
            t.related_full_texts,
            t.full_text,
            ((setweight(to_tsvector(COALESCE(t.entity_label, ''::text)), 'A'::"char") || setweight(to_tsvector(COALESCE(t.type_label, (t.class_label)::text, ''::text)), 'B'::"char")) || setweight(to_tsvector(COALESCE(t.full_text, ''::text)), 'C'::"char")) AS ts_vector
           FROM add_full_text t
        )
 SELECT add_ts_vector.pk_entity,
    add_ts_vector.fk_project,
    add_ts_vector.project,
    add_ts_vector.fk_class,
    add_ts_vector.entity_type,
    add_ts_vector.class_label,
    add_ts_vector.entity_label,
    add_ts_vector.time_span,
    add_ts_vector.own_full_text,
    add_ts_vector.fk_entity_label,
    add_ts_vector.fk_type,
    add_ts_vector.type_label,
    add_ts_vector.related_full_texts,
    add_ts_vector.full_text,
    add_ts_vector.ts_vector
   FROM add_ts_vector;


--
-- TOC entry 334 (class 1259 OID 244026)
-- Name: v_related_full_texts; Type: VIEW; Schema: warehouse; Owner: -
--

CREATE VIEW warehouse.v_related_full_texts AS
 WITH entities AS (
         SELECT v_entities.pk_entity,
            v_entities.fk_project,
            v_entities.project,
            v_entities.fk_class,
            v_entities.table_name,
            v_entities.entity_type
           FROM warehouse.v_entities
        ), all_dependencies AS (
         SELECT r.fk_temporal_entity AS pk_entity,
            r.project,
            r.fk_project,
            e.pk_entity AS pk_related_full_text
           FROM (warehouse.v_roles_per_project_and_repo r
             JOIN information.entity e ON (((e.pk_entity = r.fk_entity) AND ((e.table_name)::text = 'persistent_item'::text))))
        UNION
         SELECT r.fk_entity AS pk_entity,
            r.project,
            r.fk_project,
            e.pk_entity AS pk_related_full_text
           FROM (warehouse.v_roles_per_project_and_repo r
             JOIN information.entity e ON (((e.pk_entity = r.fk_temporal_entity) AND ((e.table_name)::text = 'temporal_entity'::text))))
        ), agg AS (
         SELECT all_dependencies.pk_entity,
            all_dependencies.project,
            all_dependencies.fk_project,
            jsonb_object_agg((all_dependencies.pk_related_full_text)::text, '') AS related_full_texts
           FROM all_dependencies
          GROUP BY all_dependencies.pk_entity, all_dependencies.project, all_dependencies.fk_project
        )
 SELECT agg.pk_entity,
    agg.project,
    agg.fk_project,
    agg.related_full_texts
   FROM agg;


--
-- TOC entry 5273 (class 2604 OID 244685)
-- Name: text pk_text; Type: DEFAULT; Schema: commons; Owner: -
--

ALTER TABLE ONLY commons.text ALTER COLUMN pk_text SET DEFAULT nextval('commons.text_pk_text_seq'::regclass);


--
-- TOC entry 5335 (class 2604 OID 245883)
-- Name: avatar pk_entity; Type: DEFAULT; Schema: data; Owner: -
--

ALTER TABLE ONLY data.avatar ALTER COLUMN pk_entity SET DEFAULT nextval('data.entity_pk_entity_seq'::regclass);


--
-- TOC entry 5336 (class 2604 OID 245884)
-- Name: avatar tmsp_creation; Type: DEFAULT; Schema: data; Owner: -
--

ALTER TABLE ONLY data.avatar ALTER COLUMN tmsp_creation SET DEFAULT now();


--
-- TOC entry 5337 (class 2604 OID 245885)
-- Name: avatar sys_period; Type: DEFAULT; Schema: data; Owner: -
--

ALTER TABLE ONLY data.avatar ALTER COLUMN sys_period SET DEFAULT tstzrange(now(), NULL::timestamp with time zone);


--
-- TOC entry 5302 (class 2604 OID 245523)
-- Name: cell pk_entity; Type: DEFAULT; Schema: data; Owner: -
--

ALTER TABLE ONLY data.cell ALTER COLUMN pk_entity SET DEFAULT nextval('data.entity_pk_entity_seq'::regclass);


--
-- TOC entry 5303 (class 2604 OID 245524)
-- Name: cell tmsp_creation; Type: DEFAULT; Schema: data; Owner: -
--

ALTER TABLE ONLY data.cell ALTER COLUMN tmsp_creation SET DEFAULT now();


--
-- TOC entry 5304 (class 2604 OID 245525)
-- Name: cell sys_period; Type: DEFAULT; Schema: data; Owner: -
--

ALTER TABLE ONLY data.cell ALTER COLUMN sys_period SET DEFAULT tstzrange(now(), NULL::timestamp with time zone);


--
-- TOC entry 5287 (class 2604 OID 245396)
-- Name: chunk pk_entity; Type: DEFAULT; Schema: data; Owner: -
--

ALTER TABLE ONLY data.chunk ALTER COLUMN pk_entity SET DEFAULT nextval('data.entity_pk_entity_seq'::regclass);


--
-- TOC entry 5288 (class 2604 OID 245397)
-- Name: chunk tmsp_creation; Type: DEFAULT; Schema: data; Owner: -
--

ALTER TABLE ONLY data.chunk ALTER COLUMN tmsp_creation SET DEFAULT now();


--
-- TOC entry 5289 (class 2604 OID 245398)
-- Name: chunk sys_period; Type: DEFAULT; Schema: data; Owner: -
--

ALTER TABLE ONLY data.chunk ALTER COLUMN sys_period SET DEFAULT tstzrange(now(), NULL::timestamp with time zone);


--
-- TOC entry 5317 (class 2604 OID 245665)
-- Name: class_column_rel pk_entity; Type: DEFAULT; Schema: data; Owner: -
--

ALTER TABLE ONLY data.class_column_rel ALTER COLUMN pk_entity SET DEFAULT nextval('data.entity_pk_entity_seq'::regclass);


--
-- TOC entry 5318 (class 2604 OID 245666)
-- Name: class_column_rel tmsp_creation; Type: DEFAULT; Schema: data; Owner: -
--

ALTER TABLE ONLY data.class_column_rel ALTER COLUMN tmsp_creation SET DEFAULT now();


--
-- TOC entry 5319 (class 2604 OID 245667)
-- Name: class_column_rel sys_period; Type: DEFAULT; Schema: data; Owner: -
--

ALTER TABLE ONLY data.class_column_rel ALTER COLUMN sys_period SET DEFAULT tstzrange(now(), NULL::timestamp with time zone);


--
-- TOC entry 5299 (class 2604 OID 245485)
-- Name: column pk_entity; Type: DEFAULT; Schema: data; Owner: -
--

ALTER TABLE ONLY data."column" ALTER COLUMN pk_entity SET DEFAULT nextval('data.entity_pk_entity_seq'::regclass);


--
-- TOC entry 5300 (class 2604 OID 245486)
-- Name: column tmsp_creation; Type: DEFAULT; Schema: data; Owner: -
--

ALTER TABLE ONLY data."column" ALTER COLUMN tmsp_creation SET DEFAULT now();


--
-- TOC entry 5301 (class 2604 OID 245487)
-- Name: column sys_period; Type: DEFAULT; Schema: data; Owner: -
--

ALTER TABLE ONLY data."column" ALTER COLUMN sys_period SET DEFAULT tstzrange(now(), NULL::timestamp with time zone);


--
-- TOC entry 5332 (class 2604 OID 245855)
-- Name: data_association pk_entity; Type: DEFAULT; Schema: data; Owner: -
--

ALTER TABLE ONLY data.data_association ALTER COLUMN pk_entity SET DEFAULT nextval('data.entity_pk_entity_seq'::regclass);


--
-- TOC entry 5333 (class 2604 OID 245856)
-- Name: data_association tmsp_creation; Type: DEFAULT; Schema: data; Owner: -
--

ALTER TABLE ONLY data.data_association ALTER COLUMN tmsp_creation SET DEFAULT now();


--
-- TOC entry 5334 (class 2604 OID 245857)
-- Name: data_association sys_period; Type: DEFAULT; Schema: data; Owner: -
--

ALTER TABLE ONLY data.data_association ALTER COLUMN sys_period SET DEFAULT tstzrange(now(), NULL::timestamp with time zone);


--
-- TOC entry 5226 (class 2604 OID 241262)
-- Name: digital _deprecated_pk_digital_object; Type: DEFAULT; Schema: data; Owner: -
--

ALTER TABLE ONLY data.digital ALTER COLUMN _deprecated_pk_digital_object SET DEFAULT nextval('data.digital_object_pk_digital_object_seq'::regclass);


--
-- TOC entry 5284 (class 2604 OID 245297)
-- Name: entity pk_entity; Type: DEFAULT; Schema: data; Owner: -
--

ALTER TABLE ONLY data.entity ALTER COLUMN pk_entity SET DEFAULT nextval('data.entity_pk_entity_seq'::regclass);


--
-- TOC entry 5323 (class 2604 OID 245736)
-- Name: factoid pk_entity; Type: DEFAULT; Schema: data; Owner: -
--

ALTER TABLE ONLY data.factoid ALTER COLUMN pk_entity SET DEFAULT nextval('data.entity_pk_entity_seq'::regclass);


--
-- TOC entry 5324 (class 2604 OID 245737)
-- Name: factoid tmsp_creation; Type: DEFAULT; Schema: data; Owner: -
--

ALTER TABLE ONLY data.factoid ALTER COLUMN tmsp_creation SET DEFAULT now();


--
-- TOC entry 5325 (class 2604 OID 245738)
-- Name: factoid sys_period; Type: DEFAULT; Schema: data; Owner: -
--

ALTER TABLE ONLY data.factoid ALTER COLUMN sys_period SET DEFAULT tstzrange(now(), NULL::timestamp with time zone);


--
-- TOC entry 5311 (class 2604 OID 245589)
-- Name: factoid_class_digital_rel pk_entity; Type: DEFAULT; Schema: data; Owner: -
--

ALTER TABLE ONLY data.factoid_class_digital_rel ALTER COLUMN pk_entity SET DEFAULT nextval('data.entity_pk_entity_seq'::regclass);


--
-- TOC entry 5312 (class 2604 OID 245590)
-- Name: factoid_class_digital_rel tmsp_creation; Type: DEFAULT; Schema: data; Owner: -
--

ALTER TABLE ONLY data.factoid_class_digital_rel ALTER COLUMN tmsp_creation SET DEFAULT now();


--
-- TOC entry 5313 (class 2604 OID 245591)
-- Name: factoid_class_digital_rel sys_period; Type: DEFAULT; Schema: data; Owner: -
--

ALTER TABLE ONLY data.factoid_class_digital_rel ALTER COLUMN sys_period SET DEFAULT tstzrange(now(), NULL::timestamp with time zone);


--
-- TOC entry 5320 (class 2604 OID 245698)
-- Name: factoid_property_column_rel pk_entity; Type: DEFAULT; Schema: data; Owner: -
--

ALTER TABLE ONLY data.factoid_property_column_rel ALTER COLUMN pk_entity SET DEFAULT nextval('data.entity_pk_entity_seq'::regclass);


--
-- TOC entry 5321 (class 2604 OID 245699)
-- Name: factoid_property_column_rel tmsp_creation; Type: DEFAULT; Schema: data; Owner: -
--

ALTER TABLE ONLY data.factoid_property_column_rel ALTER COLUMN tmsp_creation SET DEFAULT now();


--
-- TOC entry 5322 (class 2604 OID 245700)
-- Name: factoid_property_column_rel sys_period; Type: DEFAULT; Schema: data; Owner: -
--

ALTER TABLE ONLY data.factoid_property_column_rel ALTER COLUMN sys_period SET DEFAULT tstzrange(now(), NULL::timestamp with time zone);


--
-- TOC entry 5326 (class 2604 OID 245764)
-- Name: factoid_role pk_entity; Type: DEFAULT; Schema: data; Owner: -
--

ALTER TABLE ONLY data.factoid_role ALTER COLUMN pk_entity SET DEFAULT nextval('data.entity_pk_entity_seq'::regclass);


--
-- TOC entry 5327 (class 2604 OID 245765)
-- Name: factoid_role tmsp_creation; Type: DEFAULT; Schema: data; Owner: -
--

ALTER TABLE ONLY data.factoid_role ALTER COLUMN tmsp_creation SET DEFAULT now();


--
-- TOC entry 5328 (class 2604 OID 245766)
-- Name: factoid_role sys_period; Type: DEFAULT; Schema: data; Owner: -
--

ALTER TABLE ONLY data.factoid_role ALTER COLUMN sys_period SET DEFAULT tstzrange(now(), NULL::timestamp with time zone);


--
-- TOC entry 5347 (class 2604 OID 245977)
-- Name: namespace pk_entity; Type: DEFAULT; Schema: data; Owner: -
--

ALTER TABLE ONLY data.namespace ALTER COLUMN pk_entity SET DEFAULT nextval('data.entity_pk_entity_seq'::regclass);


--
-- TOC entry 5348 (class 2604 OID 245978)
-- Name: namespace tmsp_creation; Type: DEFAULT; Schema: data; Owner: -
--

ALTER TABLE ONLY data.namespace ALTER COLUMN tmsp_creation SET DEFAULT now();


--
-- TOC entry 5349 (class 2604 OID 245979)
-- Name: namespace sys_period; Type: DEFAULT; Schema: data; Owner: -
--

ALTER TABLE ONLY data.namespace ALTER COLUMN sys_period SET DEFAULT tstzrange(now(), NULL::timestamp with time zone);


--
-- TOC entry 5296 (class 2604 OID 245457)
-- Name: row pk_entity; Type: DEFAULT; Schema: data; Owner: -
--

ALTER TABLE ONLY data."row" ALTER COLUMN pk_entity SET DEFAULT nextval('data.entity_pk_entity_seq'::regclass);


--
-- TOC entry 5297 (class 2604 OID 245458)
-- Name: row tmsp_creation; Type: DEFAULT; Schema: data; Owner: -
--

ALTER TABLE ONLY data."row" ALTER COLUMN tmsp_creation SET DEFAULT now();


--
-- TOC entry 5298 (class 2604 OID 245459)
-- Name: row sys_period; Type: DEFAULT; Schema: data; Owner: -
--

ALTER TABLE ONLY data."row" ALTER COLUMN sys_period SET DEFAULT tstzrange(now(), NULL::timestamp with time zone);


--
-- TOC entry 5338 (class 2604 OID 245911)
-- Name: text_property pk_entity; Type: DEFAULT; Schema: data; Owner: -
--

ALTER TABLE ONLY data.text_property ALTER COLUMN pk_entity SET DEFAULT nextval('data.entity_pk_entity_seq'::regclass);


--
-- TOC entry 5339 (class 2604 OID 245912)
-- Name: text_property tmsp_creation; Type: DEFAULT; Schema: data; Owner: -
--

ALTER TABLE ONLY data.text_property ALTER COLUMN tmsp_creation SET DEFAULT now();


--
-- TOC entry 5340 (class 2604 OID 245913)
-- Name: text_property sys_period; Type: DEFAULT; Schema: data; Owner: -
--

ALTER TABLE ONLY data.text_property ALTER COLUMN sys_period SET DEFAULT tstzrange(now(), NULL::timestamp with time zone);


--
-- TOC entry 5314 (class 2604 OID 245622)
-- Name: value_association_columns_rel pk_entity; Type: DEFAULT; Schema: data; Owner: -
--

ALTER TABLE ONLY data.value_association_columns_rel ALTER COLUMN pk_entity SET DEFAULT nextval('data.entity_pk_entity_seq'::regclass);


--
-- TOC entry 5315 (class 2604 OID 245623)
-- Name: value_association_columns_rel tmsp_creation; Type: DEFAULT; Schema: data; Owner: -
--

ALTER TABLE ONLY data.value_association_columns_rel ALTER COLUMN tmsp_creation SET DEFAULT now();


--
-- TOC entry 5316 (class 2604 OID 245624)
-- Name: value_association_columns_rel sys_period; Type: DEFAULT; Schema: data; Owner: -
--

ALTER TABLE ONLY data.value_association_columns_rel ALTER COLUMN sys_period SET DEFAULT tstzrange(now(), NULL::timestamp with time zone);


--
-- TOC entry 5329 (class 2604 OID 245807)
-- Name: values_association pk_entity; Type: DEFAULT; Schema: data; Owner: -
--

ALTER TABLE ONLY data.values_association ALTER COLUMN pk_entity SET DEFAULT nextval('data.entity_pk_entity_seq'::regclass);


--
-- TOC entry 5330 (class 2604 OID 245808)
-- Name: values_association tmsp_creation; Type: DEFAULT; Schema: data; Owner: -
--

ALTER TABLE ONLY data.values_association ALTER COLUMN tmsp_creation SET DEFAULT now();


--
-- TOC entry 5331 (class 2604 OID 245809)
-- Name: values_association sys_period; Type: DEFAULT; Schema: data; Owner: -
--

ALTER TABLE ONLY data.values_association ALTER COLUMN sys_period SET DEFAULT tstzrange(now(), NULL::timestamp with time zone);


--
-- TOC entry 5209 (class 2604 OID 241088)
-- Name: associates_system_type pk_entity; Type: DEFAULT; Schema: data_for_history; Owner: -
--

ALTER TABLE ONLY data_for_history.associates_system_type ALTER COLUMN pk_entity SET DEFAULT nextval('data_for_history.entity_pk_entity_seq'::regclass);


--
-- TOC entry 5210 (class 2604 OID 241089)
-- Name: associates_system_type tmsp_creation; Type: DEFAULT; Schema: data_for_history; Owner: -
--

ALTER TABLE ONLY data_for_history.associates_system_type ALTER COLUMN tmsp_creation SET DEFAULT now();


--
-- TOC entry 5211 (class 2604 OID 241090)
-- Name: associates_system_type sys_period; Type: DEFAULT; Schema: data_for_history; Owner: -
--

ALTER TABLE ONLY data_for_history.associates_system_type ALTER COLUMN sys_period SET DEFAULT tstzrange(now(), NULL::timestamp with time zone);


--
-- TOC entry 5109 (class 2604 OID 240226)
-- Name: class pk_entity; Type: DEFAULT; Schema: data_for_history; Owner: -
--

ALTER TABLE ONLY data_for_history.class ALTER COLUMN pk_entity SET DEFAULT nextval('data_for_history.entity_pk_entity_seq'::regclass);


--
-- TOC entry 5110 (class 2604 OID 240227)
-- Name: class tmsp_creation; Type: DEFAULT; Schema: data_for_history; Owner: -
--

ALTER TABLE ONLY data_for_history.class ALTER COLUMN tmsp_creation SET DEFAULT now();


--
-- TOC entry 5112 (class 2604 OID 240228)
-- Name: class sys_period; Type: DEFAULT; Schema: data_for_history; Owner: -
--

ALTER TABLE ONLY data_for_history.class ALTER COLUMN sys_period SET DEFAULT tstzrange(now(), NULL::timestamp with time zone);


--
-- TOC entry 5111 (class 2604 OID 241108)
-- Name: class removed_from_api; Type: DEFAULT; Schema: data_for_history; Owner: -
--

ALTER TABLE ONLY data_for_history.class ALTER COLUMN removed_from_api SET DEFAULT false;


--
-- TOC entry 5106 (class 2604 OID 240207)
-- Name: class_profile_view pk_entity; Type: DEFAULT; Schema: data_for_history; Owner: -
--

ALTER TABLE ONLY data_for_history.class_profile_view ALTER COLUMN pk_entity SET DEFAULT nextval('data_for_history.entity_pk_entity_seq'::regclass);


--
-- TOC entry 5107 (class 2604 OID 240208)
-- Name: class_profile_view tmsp_creation; Type: DEFAULT; Schema: data_for_history; Owner: -
--

ALTER TABLE ONLY data_for_history.class_profile_view ALTER COLUMN tmsp_creation SET DEFAULT now();


--
-- TOC entry 5108 (class 2604 OID 240209)
-- Name: class_profile_view sys_period; Type: DEFAULT; Schema: data_for_history; Owner: -
--

ALTER TABLE ONLY data_for_history.class_profile_view ALTER COLUMN sys_period SET DEFAULT tstzrange(now(), NULL::timestamp with time zone);


--
-- TOC entry 5102 (class 2604 OID 240196)
-- Name: entity pk_entity; Type: DEFAULT; Schema: data_for_history; Owner: -
--

ALTER TABLE ONLY data_for_history.entity ALTER COLUMN pk_entity SET DEFAULT nextval('data_for_history.entity_pk_entity_seq'::regclass);


--
-- TOC entry 5190 (class 2604 OID 240848)
-- Name: label pk_entity; Type: DEFAULT; Schema: data_for_history; Owner: -
--

ALTER TABLE ONLY data_for_history.label ALTER COLUMN pk_entity SET DEFAULT nextval('data_for_history.entity_pk_entity_seq'::regclass);


--
-- TOC entry 5191 (class 2604 OID 240849)
-- Name: label tmsp_creation; Type: DEFAULT; Schema: data_for_history; Owner: -
--

ALTER TABLE ONLY data_for_history.label ALTER COLUMN tmsp_creation SET DEFAULT now();


--
-- TOC entry 5192 (class 2604 OID 240850)
-- Name: label sys_period; Type: DEFAULT; Schema: data_for_history; Owner: -
--

ALTER TABLE ONLY data_for_history.label ALTER COLUMN sys_period SET DEFAULT tstzrange(now(), NULL::timestamp with time zone);


--
-- TOC entry 5189 (class 2604 OID 241109)
-- Name: label removed_from_api; Type: DEFAULT; Schema: data_for_history; Owner: -
--

ALTER TABLE ONLY data_for_history.label ALTER COLUMN removed_from_api SET DEFAULT false;


--
-- TOC entry 5203 (class 2604 OID 241044)
-- Name: profile pk_entity; Type: DEFAULT; Schema: data_for_history; Owner: -
--

ALTER TABLE ONLY data_for_history.profile ALTER COLUMN pk_entity SET DEFAULT nextval('data_for_history.entity_pk_entity_seq'::regclass);


--
-- TOC entry 5204 (class 2604 OID 241045)
-- Name: profile tmsp_creation; Type: DEFAULT; Schema: data_for_history; Owner: -
--

ALTER TABLE ONLY data_for_history.profile ALTER COLUMN tmsp_creation SET DEFAULT now();


--
-- TOC entry 5205 (class 2604 OID 241046)
-- Name: profile sys_period; Type: DEFAULT; Schema: data_for_history; Owner: -
--

ALTER TABLE ONLY data_for_history.profile ALTER COLUMN sys_period SET DEFAULT tstzrange(now(), NULL::timestamp with time zone);


--
-- TOC entry 5202 (class 2604 OID 241112)
-- Name: profile removed_from_api; Type: DEFAULT; Schema: data_for_history; Owner: -
--

ALTER TABLE ONLY data_for_history.profile ALTER COLUMN removed_from_api SET DEFAULT false;


--
-- TOC entry 5198 (class 2604 OID 240886)
-- Name: property pk_entity; Type: DEFAULT; Schema: data_for_history; Owner: -
--

ALTER TABLE ONLY data_for_history.property ALTER COLUMN pk_entity SET DEFAULT nextval('data_for_history.entity_pk_entity_seq'::regclass);


--
-- TOC entry 5199 (class 2604 OID 240887)
-- Name: property tmsp_creation; Type: DEFAULT; Schema: data_for_history; Owner: -
--

ALTER TABLE ONLY data_for_history.property ALTER COLUMN tmsp_creation SET DEFAULT now();


--
-- TOC entry 5200 (class 2604 OID 240888)
-- Name: property sys_period; Type: DEFAULT; Schema: data_for_history; Owner: -
--

ALTER TABLE ONLY data_for_history.property ALTER COLUMN sys_period SET DEFAULT tstzrange(now(), NULL::timestamp with time zone);


--
-- TOC entry 5197 (class 2604 OID 241111)
-- Name: property removed_from_api; Type: DEFAULT; Schema: data_for_history; Owner: -
--

ALTER TABLE ONLY data_for_history.property ALTER COLUMN removed_from_api SET DEFAULT false;


--
-- TOC entry 5206 (class 2604 OID 241067)
-- Name: property_profile_view pk_entity; Type: DEFAULT; Schema: data_for_history; Owner: -
--

ALTER TABLE ONLY data_for_history.property_profile_view ALTER COLUMN pk_entity SET DEFAULT nextval('data_for_history.entity_pk_entity_seq'::regclass);


--
-- TOC entry 5207 (class 2604 OID 241068)
-- Name: property_profile_view tmsp_creation; Type: DEFAULT; Schema: data_for_history; Owner: -
--

ALTER TABLE ONLY data_for_history.property_profile_view ALTER COLUMN tmsp_creation SET DEFAULT now();


--
-- TOC entry 5208 (class 2604 OID 241069)
-- Name: property_profile_view sys_period; Type: DEFAULT; Schema: data_for_history; Owner: -
--

ALTER TABLE ONLY data_for_history.property_profile_view ALTER COLUMN sys_period SET DEFAULT tstzrange(now(), NULL::timestamp with time zone);


--
-- TOC entry 5213 (class 2604 OID 241156)
-- Name: system_type pk_entity; Type: DEFAULT; Schema: data_for_history; Owner: -
--

ALTER TABLE ONLY data_for_history.system_type ALTER COLUMN pk_entity SET DEFAULT nextval('data_for_history.entity_pk_entity_seq'::regclass);


--
-- TOC entry 5214 (class 2604 OID 241157)
-- Name: system_type tmsp_creation; Type: DEFAULT; Schema: data_for_history; Owner: -
--

ALTER TABLE ONLY data_for_history.system_type ALTER COLUMN tmsp_creation SET DEFAULT now();


--
-- TOC entry 5215 (class 2604 OID 241158)
-- Name: system_type sys_period; Type: DEFAULT; Schema: data_for_history; Owner: -
--

ALTER TABLE ONLY data_for_history.system_type ALTER COLUMN sys_period SET DEFAULT tstzrange(now(), NULL::timestamp with time zone);


--
-- TOC entry 5216 (class 2604 OID 241159)
-- Name: system_type removed_from_api; Type: DEFAULT; Schema: data_for_history; Owner: -
--

ALTER TABLE ONLY data_for_history.system_type ALTER COLUMN removed_from_api SET DEFAULT false;


--
-- TOC entry 5194 (class 2604 OID 240867)
-- Name: text_property pk_entity; Type: DEFAULT; Schema: data_for_history; Owner: -
--

ALTER TABLE ONLY data_for_history.text_property ALTER COLUMN pk_entity SET DEFAULT nextval('data_for_history.entity_pk_entity_seq'::regclass);


--
-- TOC entry 5195 (class 2604 OID 240868)
-- Name: text_property tmsp_creation; Type: DEFAULT; Schema: data_for_history; Owner: -
--

ALTER TABLE ONLY data_for_history.text_property ALTER COLUMN tmsp_creation SET DEFAULT now();


--
-- TOC entry 5196 (class 2604 OID 240869)
-- Name: text_property sys_period; Type: DEFAULT; Schema: data_for_history; Owner: -
--

ALTER TABLE ONLY data_for_history.text_property ALTER COLUMN sys_period SET DEFAULT tstzrange(now(), NULL::timestamp with time zone);


--
-- TOC entry 5193 (class 2604 OID 241110)
-- Name: text_property removed_from_api; Type: DEFAULT; Schema: data_for_history; Owner: -
--

ALTER TABLE ONLY data_for_history.text_property ALTER COLUMN removed_from_api SET DEFAULT false;


--
-- TOC entry 5253 (class 2604 OID 243299)
-- Name: _deprecated_namespace tmsp_creation; Type: DEFAULT; Schema: information; Owner: -
--

ALTER TABLE ONLY information._deprecated_namespace ALTER COLUMN tmsp_creation SET DEFAULT now();


--
-- TOC entry 5254 (class 2604 OID 243300)
-- Name: _deprecated_namespace sys_period; Type: DEFAULT; Schema: information; Owner: -
--

ALTER TABLE ONLY information._deprecated_namespace ALTER COLUMN sys_period SET DEFAULT tstzrange(now(), NULL::timestamp with time zone);


--
-- TOC entry 5256 (class 2604 OID 243330)
-- Name: _deprecated_type_namespace_rel tmsp_creation; Type: DEFAULT; Schema: information; Owner: -
--

ALTER TABLE ONLY information._deprecated_type_namespace_rel ALTER COLUMN tmsp_creation SET DEFAULT now();


--
-- TOC entry 5257 (class 2604 OID 243331)
-- Name: _deprecated_type_namespace_rel sys_period; Type: DEFAULT; Schema: information; Owner: -
--

ALTER TABLE ONLY information._deprecated_type_namespace_rel ALTER COLUMN sys_period SET DEFAULT tstzrange(now(), NULL::timestamp with time zone);


--
-- TOC entry 5149 (class 2604 OID 240518)
-- Name: appellation pk_entity; Type: DEFAULT; Schema: information; Owner: -
--

ALTER TABLE ONLY information.appellation ALTER COLUMN pk_entity SET DEFAULT nextval('information.entity_pk_entity_seq'::regclass);


--
-- TOC entry 5150 (class 2604 OID 240519)
-- Name: appellation tmsp_creation; Type: DEFAULT; Schema: information; Owner: -
--

ALTER TABLE ONLY information.appellation ALTER COLUMN tmsp_creation SET DEFAULT now();


--
-- TOC entry 5151 (class 2604 OID 240520)
-- Name: appellation sys_period; Type: DEFAULT; Schema: information; Owner: -
--

ALTER TABLE ONLY information.appellation ALTER COLUMN sys_period SET DEFAULT tstzrange(now(), NULL::timestamp with time zone);


--
-- TOC entry 5152 (class 2604 OID 240521)
-- Name: appellation _deprecated_pk_appellation; Type: DEFAULT; Schema: information; Owner: -
--

ALTER TABLE ONLY information.appellation ALTER COLUMN _deprecated_pk_appellation SET DEFAULT nextval('information.appellation_pk_appellation_seq'::regclass);


--
-- TOC entry 5144 (class 2604 OID 240505)
-- Name: entity pk_entity; Type: DEFAULT; Schema: information; Owner: -
--

ALTER TABLE ONLY information.entity ALTER COLUMN pk_entity SET DEFAULT nextval('information.entity_pk_entity_seq'::regclass);


--
-- TOC entry 5157 (class 2604 OID 240575)
-- Name: entity_association pk_entity; Type: DEFAULT; Schema: information; Owner: -
--

ALTER TABLE ONLY information.entity_association ALTER COLUMN pk_entity SET DEFAULT nextval('information.entity_pk_entity_seq'::regclass);


--
-- TOC entry 5158 (class 2604 OID 240576)
-- Name: entity_association tmsp_creation; Type: DEFAULT; Schema: information; Owner: -
--

ALTER TABLE ONLY information.entity_association ALTER COLUMN tmsp_creation SET DEFAULT now();


--
-- TOC entry 5159 (class 2604 OID 240577)
-- Name: entity_association sys_period; Type: DEFAULT; Schema: information; Owner: -
--

ALTER TABLE ONLY information.entity_association ALTER COLUMN sys_period SET DEFAULT tstzrange(now(), NULL::timestamp with time zone);


--
-- TOC entry 5160 (class 2604 OID 240578)
-- Name: entity_association pk_entity_association; Type: DEFAULT; Schema: information; Owner: -
--

ALTER TABLE ONLY information.entity_association ALTER COLUMN pk_entity_association SET DEFAULT nextval('information.entity_association_pk_entity_association_seq'::regclass);


--
-- TOC entry 5182 (class 2604 OID 240749)
-- Name: language pk_entity; Type: DEFAULT; Schema: information; Owner: -
--

ALTER TABLE ONLY information.language ALTER COLUMN pk_entity SET DEFAULT nextval('information.entity_pk_entity_seq'::regclass);


--
-- TOC entry 5183 (class 2604 OID 240750)
-- Name: language tmsp_creation; Type: DEFAULT; Schema: information; Owner: -
--

ALTER TABLE ONLY information.language ALTER COLUMN tmsp_creation SET DEFAULT now();


--
-- TOC entry 5184 (class 2604 OID 240751)
-- Name: language sys_period; Type: DEFAULT; Schema: information; Owner: -
--

ALTER TABLE ONLY information.language ALTER COLUMN sys_period SET DEFAULT tstzrange(now(), NULL::timestamp with time zone);


--
-- TOC entry 5161 (class 2604 OID 240606)
-- Name: persistent_item pk_entity; Type: DEFAULT; Schema: information; Owner: -
--

ALTER TABLE ONLY information.persistent_item ALTER COLUMN pk_entity SET DEFAULT nextval('information.entity_pk_entity_seq'::regclass);


--
-- TOC entry 5162 (class 2604 OID 240607)
-- Name: persistent_item tmsp_creation; Type: DEFAULT; Schema: information; Owner: -
--

ALTER TABLE ONLY information.persistent_item ALTER COLUMN tmsp_creation SET DEFAULT now();


--
-- TOC entry 5163 (class 2604 OID 240608)
-- Name: persistent_item sys_period; Type: DEFAULT; Schema: information; Owner: -
--

ALTER TABLE ONLY information.persistent_item ALTER COLUMN sys_period SET DEFAULT tstzrange(now(), NULL::timestamp with time zone);


--
-- TOC entry 5164 (class 2604 OID 240609)
-- Name: persistent_item _deprecated_pk_persistent_item; Type: DEFAULT; Schema: information; Owner: -
--

ALTER TABLE ONLY information.persistent_item ALTER COLUMN _deprecated_pk_persistent_item SET DEFAULT nextval('information.persistent_item_pk_persistent_item_seq'::regclass);


--
-- TOC entry 5233 (class 2604 OID 242952)
-- Name: place pk_entity; Type: DEFAULT; Schema: information; Owner: -
--

ALTER TABLE ONLY information.place ALTER COLUMN pk_entity SET DEFAULT nextval('information.entity_pk_entity_seq'::regclass);


--
-- TOC entry 5234 (class 2604 OID 242953)
-- Name: place tmsp_creation; Type: DEFAULT; Schema: information; Owner: -
--

ALTER TABLE ONLY information.place ALTER COLUMN tmsp_creation SET DEFAULT now();


--
-- TOC entry 5235 (class 2604 OID 242954)
-- Name: place sys_period; Type: DEFAULT; Schema: information; Owner: -
--

ALTER TABLE ONLY information.place ALTER COLUMN sys_period SET DEFAULT tstzrange(now(), NULL::timestamp with time zone);


--
-- TOC entry 5350 (class 2604 OID 246041)
-- Name: property_of_property pk_entity; Type: DEFAULT; Schema: information; Owner: -
--

ALTER TABLE ONLY information.property_of_property ALTER COLUMN pk_entity SET DEFAULT nextval('information.entity_pk_entity_seq'::regclass);


--
-- TOC entry 5351 (class 2604 OID 246042)
-- Name: property_of_property tmsp_creation; Type: DEFAULT; Schema: information; Owner: -
--

ALTER TABLE ONLY information.property_of_property ALTER COLUMN tmsp_creation SET DEFAULT now();


--
-- TOC entry 5352 (class 2604 OID 246043)
-- Name: property_of_property sys_period; Type: DEFAULT; Schema: information; Owner: -
--

ALTER TABLE ONLY information.property_of_property ALTER COLUMN sys_period SET DEFAULT tstzrange(now(), NULL::timestamp with time zone);


--
-- TOC entry 5165 (class 2604 OID 240637)
-- Name: role pk_entity; Type: DEFAULT; Schema: information; Owner: -
--

ALTER TABLE ONLY information.role ALTER COLUMN pk_entity SET DEFAULT nextval('information.entity_pk_entity_seq'::regclass);


--
-- TOC entry 5166 (class 2604 OID 240638)
-- Name: role tmsp_creation; Type: DEFAULT; Schema: information; Owner: -
--

ALTER TABLE ONLY information.role ALTER COLUMN tmsp_creation SET DEFAULT now();


--
-- TOC entry 5167 (class 2604 OID 240639)
-- Name: role sys_period; Type: DEFAULT; Schema: information; Owner: -
--

ALTER TABLE ONLY information.role ALTER COLUMN sys_period SET DEFAULT tstzrange(now(), NULL::timestamp with time zone);


--
-- TOC entry 5168 (class 2604 OID 240640)
-- Name: role _deprecated_pk_role; Type: DEFAULT; Schema: information; Owner: -
--

ALTER TABLE ONLY information.role ALTER COLUMN _deprecated_pk_role SET DEFAULT nextval('information.role_pk_role_seq'::regclass);


--
-- TOC entry 5169 (class 2604 OID 240694)
-- Name: temporal_entity pk_entity; Type: DEFAULT; Schema: information; Owner: -
--

ALTER TABLE ONLY information.temporal_entity ALTER COLUMN pk_entity SET DEFAULT nextval('information.entity_pk_entity_seq'::regclass);


--
-- TOC entry 5170 (class 2604 OID 240695)
-- Name: temporal_entity tmsp_creation; Type: DEFAULT; Schema: information; Owner: -
--

ALTER TABLE ONLY information.temporal_entity ALTER COLUMN tmsp_creation SET DEFAULT now();


--
-- TOC entry 5171 (class 2604 OID 240696)
-- Name: temporal_entity sys_period; Type: DEFAULT; Schema: information; Owner: -
--

ALTER TABLE ONLY information.temporal_entity ALTER COLUMN sys_period SET DEFAULT tstzrange(now(), NULL::timestamp with time zone);


--
-- TOC entry 5172 (class 2604 OID 240697)
-- Name: temporal_entity _deprecated_pk_temporal_entity; Type: DEFAULT; Schema: information; Owner: -
--

ALTER TABLE ONLY information.temporal_entity ALTER COLUMN _deprecated_pk_temporal_entity SET DEFAULT nextval('information.temporal_entity_pk_temporal_entity_seq'::regclass);


--
-- TOC entry 5175 (class 2604 OID 240725)
-- Name: text_property pk_entity; Type: DEFAULT; Schema: information; Owner: -
--

ALTER TABLE ONLY information.text_property ALTER COLUMN pk_entity SET DEFAULT nextval('information.entity_pk_entity_seq'::regclass);


--
-- TOC entry 5176 (class 2604 OID 240726)
-- Name: text_property tmsp_creation; Type: DEFAULT; Schema: information; Owner: -
--

ALTER TABLE ONLY information.text_property ALTER COLUMN tmsp_creation SET DEFAULT now();


--
-- TOC entry 5177 (class 2604 OID 240727)
-- Name: text_property sys_period; Type: DEFAULT; Schema: information; Owner: -
--

ALTER TABLE ONLY information.text_property ALTER COLUMN sys_period SET DEFAULT tstzrange(now(), NULL::timestamp with time zone);


--
-- TOC entry 5217 (class 2604 OID 241194)
-- Name: time_primitive pk_entity; Type: DEFAULT; Schema: information; Owner: -
--

ALTER TABLE ONLY information.time_primitive ALTER COLUMN pk_entity SET DEFAULT nextval('information.entity_pk_entity_seq'::regclass);


--
-- TOC entry 5218 (class 2604 OID 241195)
-- Name: time_primitive tmsp_creation; Type: DEFAULT; Schema: information; Owner: -
--

ALTER TABLE ONLY information.time_primitive ALTER COLUMN tmsp_creation SET DEFAULT now();


--
-- TOC entry 5219 (class 2604 OID 241196)
-- Name: time_primitive sys_period; Type: DEFAULT; Schema: information; Owner: -
--

ALTER TABLE ONLY information.time_primitive ALTER COLUMN sys_period SET DEFAULT tstzrange(now(), NULL::timestamp with time zone);


--
-- TOC entry 5220 (class 2604 OID 241197)
-- Name: time_primitive pk_time_primitive; Type: DEFAULT; Schema: information; Owner: -
--

ALTER TABLE ONLY information.time_primitive ALTER COLUMN pk_time_primitive SET DEFAULT nextval('information.time_primitive_pk_time_primitive_seq'::regclass);


--
-- TOC entry 5123 (class 2604 OID 240355)
-- Name: _deprecated_label pk_label; Type: DEFAULT; Schema: projects; Owner: -
--

ALTER TABLE ONLY projects._deprecated_label ALTER COLUMN pk_label SET DEFAULT nextval('projects.label_pk_label_seq'::regclass);


--
-- TOC entry 5239 (class 2604 OID 243020)
-- Name: class_field_config pk_entity; Type: DEFAULT; Schema: projects; Owner: -
--

ALTER TABLE ONLY projects.class_field_config ALTER COLUMN pk_entity SET DEFAULT nextval('projects.entity_pk_entity_seq'::regclass);


--
-- TOC entry 5240 (class 2604 OID 243021)
-- Name: class_field_config tmsp_creation; Type: DEFAULT; Schema: projects; Owner: -
--

ALTER TABLE ONLY projects.class_field_config ALTER COLUMN tmsp_creation SET DEFAULT now();


--
-- TOC entry 5241 (class 2604 OID 243022)
-- Name: class_field_config sys_period; Type: DEFAULT; Schema: projects; Owner: -
--

ALTER TABLE ONLY projects.class_field_config ALTER COLUMN sys_period SET DEFAULT tstzrange(now(), NULL::timestamp with time zone);


--
-- TOC entry 5118 (class 2604 OID 240342)
-- Name: entity pk_entity; Type: DEFAULT; Schema: projects; Owner: -
--

ALTER TABLE ONLY projects.entity ALTER COLUMN pk_entity SET DEFAULT nextval('projects.entity_pk_entity_seq'::regclass);


--
-- TOC entry 5188 (class 2604 OID 240782)
-- Name: info_proj_rel _deprecated_pk_entity_version_project_rel; Type: DEFAULT; Schema: projects; Owner: -
--

ALTER TABLE ONLY projects.info_proj_rel ALTER COLUMN _deprecated_pk_entity_version_project_rel SET DEFAULT nextval('projects.entity_version_project_rel_pk_entity_version_project_rel_seq'::regclass);


--
-- TOC entry 5127 (class 2604 OID 240383)
-- Name: project _deprecated_pk_project; Type: DEFAULT; Schema: projects; Owner: -
--

ALTER TABLE ONLY projects.project ALTER COLUMN _deprecated_pk_project SET DEFAULT nextval('projects.project_pk_project_seq'::regclass);


--
-- TOC entry 5264 (class 2604 OID 244083)
-- Name: query pk_entity; Type: DEFAULT; Schema: projects; Owner: -
--

ALTER TABLE ONLY projects.query ALTER COLUMN pk_entity SET DEFAULT nextval('projects.entity_pk_entity_seq'::regclass);


--
-- TOC entry 5265 (class 2604 OID 244084)
-- Name: query tmsp_creation; Type: DEFAULT; Schema: projects; Owner: -
--

ALTER TABLE ONLY projects.query ALTER COLUMN tmsp_creation SET DEFAULT now();


--
-- TOC entry 5266 (class 2604 OID 244085)
-- Name: query sys_period; Type: DEFAULT; Schema: projects; Owner: -
--

ALTER TABLE ONLY projects.query ALTER COLUMN sys_period SET DEFAULT tstzrange(now(), NULL::timestamp with time zone);


--
-- TOC entry 5133 (class 2604 OID 240446)
-- Name: text_property _deprecated_pk_text_property; Type: DEFAULT; Schema: projects; Owner: -
--

ALTER TABLE ONLY projects.text_property ALTER COLUMN _deprecated_pk_text_property SET DEFAULT nextval('projects.text_property_pk_text_property_seq'::regclass);


--
-- TOC entry 5270 (class 2604 OID 244183)
-- Name: visual pk_entity; Type: DEFAULT; Schema: projects; Owner: -
--

ALTER TABLE ONLY projects.visual ALTER COLUMN pk_entity SET DEFAULT nextval('projects.entity_pk_entity_seq'::regclass);


--
-- TOC entry 5271 (class 2604 OID 244184)
-- Name: visual tmsp_creation; Type: DEFAULT; Schema: projects; Owner: -
--

ALTER TABLE ONLY projects.visual ALTER COLUMN tmsp_creation SET DEFAULT now();


--
-- TOC entry 5272 (class 2604 OID 244185)
-- Name: visual sys_period; Type: DEFAULT; Schema: projects; Owner: -
--

ALTER TABLE ONLY projects.visual ALTER COLUMN sys_period SET DEFAULT tstzrange(now(), NULL::timestamp with time zone);


--
-- TOC entry 5113 (class 2604 OID 240275)
-- Name: account id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.account ALTER COLUMN id SET DEFAULT nextval('public.account_id_seq'::regclass);


--
-- TOC entry 5142 (class 2604 OID 240484)
-- Name: account_project_rel id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.account_project_rel ALTER COLUMN id SET DEFAULT nextval('public.account_project_rel_id_seq'::regclass);


--
-- TOC entry 5117 (class 2604 OID 240331)
-- Name: acl id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.acl ALTER COLUMN id SET DEFAULT nextval('public.acl_id_seq'::regclass);


--
-- TOC entry 5099 (class 2604 OID 240157)
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: -
--

-- ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- TOC entry 5115 (class 2604 OID 240304)
-- Name: role id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.role ALTER COLUMN id SET DEFAULT nextval('public.role_id_seq'::regclass);


--
-- TOC entry 5116 (class 2604 OID 240315)
-- Name: rolemapping id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.rolemapping ALTER COLUMN id SET DEFAULT nextval('public.rolemapping_id_seq'::regclass);


--
-- TOC entry 5275 (class 2604 OID 244714)
-- Name: entity pk_entity; Type: DEFAULT; Schema: system; Owner: -
--

ALTER TABLE ONLY system.entity ALTER COLUMN pk_entity SET DEFAULT nextval('system.entity_pk_entity_seq'::regclass);


--
-- TOC entry 5278 (class 2604 OID 244743)
-- Name: system_relevant_class pk_entity; Type: DEFAULT; Schema: system; Owner: -
--

ALTER TABLE ONLY system.system_relevant_class ALTER COLUMN pk_entity SET DEFAULT nextval('system.entity_pk_entity_seq'::regclass);


--
-- TOC entry 5279 (class 2604 OID 244744)
-- Name: system_relevant_class tmsp_creation; Type: DEFAULT; Schema: system; Owner: -
--

ALTER TABLE ONLY system.system_relevant_class ALTER COLUMN tmsp_creation SET DEFAULT now();


--
-- TOC entry 5280 (class 2604 OID 244745)
-- Name: system_relevant_class sys_period; Type: DEFAULT; Schema: system; Owner: -
--

ALTER TABLE ONLY system.system_relevant_class ALTER COLUMN sys_period SET DEFAULT tstzrange(now(), NULL::timestamp with time zone);


--
-- TOC entry 5281 (class 2604 OID 244771)
-- Name: system_relevant_type pk_entity; Type: DEFAULT; Schema: system; Owner: -
--

ALTER TABLE ONLY system.system_relevant_type ALTER COLUMN pk_entity SET DEFAULT nextval('system.entity_pk_entity_seq'::regclass);


--
-- TOC entry 5282 (class 2604 OID 244772)
-- Name: system_relevant_type tmsp_creation; Type: DEFAULT; Schema: system; Owner: -
--

ALTER TABLE ONLY system.system_relevant_type ALTER COLUMN tmsp_creation SET DEFAULT now();


--
-- TOC entry 5283 (class 2604 OID 244773)
-- Name: system_relevant_type sys_period; Type: DEFAULT; Schema: system; Owner: -
--

ALTER TABLE ONLY system.system_relevant_type ALTER COLUMN sys_period SET DEFAULT tstzrange(now(), NULL::timestamp with time zone);


--
-- TOC entry 5518 (class 2606 OID 244691)
-- Name: text text_pkey; Type: CONSTRAINT; Schema: commons; Owner: -
--

ALTER TABLE ONLY commons.text
    ADD CONSTRAINT text_pkey PRIMARY KEY (pk_text);


--
-- TOC entry 5520 (class 2606 OID 245392)
-- Name: text text_version_unique; Type: CONSTRAINT; Schema: commons; Owner: -
--

ALTER TABLE ONLY commons.text
    ADD CONSTRAINT text_version_unique UNIQUE (pk_text, entity_version);


--
-- TOC entry 5554 (class 2606 OID 245895)
-- Name: avatar data_avatar_pk_entity_unique; Type: CONSTRAINT; Schema: data; Owner: -
--

ALTER TABLE ONLY data.avatar
    ADD CONSTRAINT data_avatar_pk_entity_unique UNIQUE (pk_entity);


--
-- TOC entry 5536 (class 2606 OID 245540)
-- Name: cell data_cell_pk_entity_unique; Type: CONSTRAINT; Schema: data; Owner: -
--

ALTER TABLE ONLY data.cell
    ADD CONSTRAINT data_cell_pk_entity_unique UNIQUE (pk_entity);


--
-- TOC entry 5530 (class 2606 OID 245408)
-- Name: chunk data_chunk_pk_entity_unique; Type: CONSTRAINT; Schema: data; Owner: -
--

ALTER TABLE ONLY data.chunk
    ADD CONSTRAINT data_chunk_pk_entity_unique UNIQUE (pk_entity);


--
-- TOC entry 5542 (class 2606 OID 245682)
-- Name: class_column_rel data_class_column_rel_pk_entity_unique; Type: CONSTRAINT; Schema: data; Owner: -
--

ALTER TABLE ONLY data.class_column_rel
    ADD CONSTRAINT data_class_column_rel_pk_entity_unique UNIQUE (pk_entity);


--
-- TOC entry 5534 (class 2606 OID 245507)
-- Name: column data_column_pk_entity_unique; Type: CONSTRAINT; Schema: data; Owner: -
--

ALTER TABLE ONLY data."column"
    ADD CONSTRAINT data_column_pk_entity_unique UNIQUE (pk_entity);


--
-- TOC entry 5552 (class 2606 OID 245867)
-- Name: data_association data_data_association_pk_entity_unique; Type: CONSTRAINT; Schema: data; Owner: -
--

ALTER TABLE ONLY data.data_association
    ADD CONSTRAINT data_data_association_pk_entity_unique UNIQUE (pk_entity);


--
-- TOC entry 5538 (class 2606 OID 245606)
-- Name: factoid_class_digital_rel data_factoid_class_digital_rel_pk_entity_unique; Type: CONSTRAINT; Schema: data; Owner: -
--

ALTER TABLE ONLY data.factoid_class_digital_rel
    ADD CONSTRAINT data_factoid_class_digital_rel_pk_entity_unique UNIQUE (pk_entity);


--
-- TOC entry 5546 (class 2606 OID 245748)
-- Name: factoid data_factoid_pk_entity_unique; Type: CONSTRAINT; Schema: data; Owner: -
--

ALTER TABLE ONLY data.factoid
    ADD CONSTRAINT data_factoid_pk_entity_unique UNIQUE (pk_entity);


--
-- TOC entry 5544 (class 2606 OID 245720)
-- Name: factoid_property_column_rel data_factoid_property_column_rel_pk_entity_unique; Type: CONSTRAINT; Schema: data; Owner: -
--

ALTER TABLE ONLY data.factoid_property_column_rel
    ADD CONSTRAINT data_factoid_property_column_rel_pk_entity_unique UNIQUE (pk_entity);


--
-- TOC entry 5548 (class 2606 OID 245791)
-- Name: factoid_role data_factoid_role_pk_entity_unique; Type: CONSTRAINT; Schema: data; Owner: -
--

ALTER TABLE ONLY data.factoid_role
    ADD CONSTRAINT data_factoid_role_pk_entity_unique UNIQUE (pk_entity);


--
-- TOC entry 5558 (class 2606 OID 245989)
-- Name: namespace data_namespace_pk_entity_unique; Type: CONSTRAINT; Schema: data; Owner: -
--

ALTER TABLE ONLY data.namespace
    ADD CONSTRAINT data_namespace_pk_entity_unique UNIQUE (pk_entity);


--
-- TOC entry 5532 (class 2606 OID 245469)
-- Name: row data_row_pk_entity_unique; Type: CONSTRAINT; Schema: data; Owner: -
--

ALTER TABLE ONLY data."row"
    ADD CONSTRAINT data_row_pk_entity_unique UNIQUE (pk_entity);


--
-- TOC entry 5556 (class 2606 OID 245928)
-- Name: text_property data_text_property_pk_entity_unique; Type: CONSTRAINT; Schema: data; Owner: -
--

ALTER TABLE ONLY data.text_property
    ADD CONSTRAINT data_text_property_pk_entity_unique UNIQUE (pk_entity);


--
-- TOC entry 5540 (class 2606 OID 245649)
-- Name: value_association_columns_rel data_value_association_columns_rel_pk_entity_unique; Type: CONSTRAINT; Schema: data; Owner: -
--

ALTER TABLE ONLY data.value_association_columns_rel
    ADD CONSTRAINT data_value_association_columns_rel_pk_entity_unique UNIQUE (pk_entity);


--
-- TOC entry 5550 (class 2606 OID 245839)
-- Name: values_association data_values_association_pk_entity_unique; Type: CONSTRAINT; Schema: data; Owner: -
--

ALTER TABLE ONLY data.values_association
    ADD CONSTRAINT data_values_association_pk_entity_unique UNIQUE (pk_entity);


--
-- TOC entry 5464 (class 2606 OID 241267)
-- Name: digital digital_object_pkey; Type: CONSTRAINT; Schema: data; Owner: -
--

ALTER TABLE ONLY data.digital
    ADD CONSTRAINT digital_object_pkey PRIMARY KEY (_deprecated_pk_digital_object);


--
-- TOC entry 5528 (class 2606 OID 245304)
-- Name: entity entity_pkey; Type: CONSTRAINT; Schema: data; Owner: -
--

ALTER TABLE ONLY data.entity
    ADD CONSTRAINT entity_pkey PRIMARY KEY (pk_entity);


--
-- TOC entry 5466 (class 2606 OID 243240)
-- Name: digital information_digital_object_pk_entity_unique; Type: CONSTRAINT; Schema: data; Owner: -
--

ALTER TABLE ONLY data.digital
    ADD CONSTRAINT information_digital_object_pk_entity_unique UNIQUE (pk_entity);


--
-- TOC entry 5454 (class 2606 OID 243218)
-- Name: associates_system_type data_for_history_associates_system_type_pk_entity_unique; Type: CONSTRAINT; Schema: data_for_history; Owner: -
--

ALTER TABLE ONLY data_for_history.associates_system_type
    ADD CONSTRAINT data_for_history_associates_system_type_pk_entity_unique UNIQUE (pk_entity);


--
-- TOC entry 5364 (class 2606 OID 243220)
-- Name: class data_for_history_class_pk_entity_unique; Type: CONSTRAINT; Schema: data_for_history; Owner: -
--

ALTER TABLE ONLY data_for_history.class
    ADD CONSTRAINT data_for_history_class_pk_entity_unique UNIQUE (pk_entity);


--
-- TOC entry 5362 (class 2606 OID 243222)
-- Name: class_profile_view data_for_history_class_profile_view_pk_entity_unique; Type: CONSTRAINT; Schema: data_for_history; Owner: -
--

ALTER TABLE ONLY data_for_history.class_profile_view
    ADD CONSTRAINT data_for_history_class_profile_view_pk_entity_unique UNIQUE (pk_entity);


--
-- TOC entry 5440 (class 2606 OID 243224)
-- Name: label data_for_history_label_pk_entity_unique; Type: CONSTRAINT; Schema: data_for_history; Owner: -
--

ALTER TABLE ONLY data_for_history.label
    ADD CONSTRAINT data_for_history_label_pk_entity_unique UNIQUE (pk_entity);


--
-- TOC entry 5448 (class 2606 OID 243226)
-- Name: profile data_for_history_profile_pk_entity_unique; Type: CONSTRAINT; Schema: data_for_history; Owner: -
--

ALTER TABLE ONLY data_for_history.profile
    ADD CONSTRAINT data_for_history_profile_pk_entity_unique UNIQUE (pk_entity);


--
-- TOC entry 5444 (class 2606 OID 243228)
-- Name: property data_for_history_property_pk_entity_unique; Type: CONSTRAINT; Schema: data_for_history; Owner: -
--

ALTER TABLE ONLY data_for_history.property
    ADD CONSTRAINT data_for_history_property_pk_entity_unique UNIQUE (pk_entity);


--
-- TOC entry 5452 (class 2606 OID 243230)
-- Name: property_profile_view data_for_history_property_profile_view_pk_entity_unique; Type: CONSTRAINT; Schema: data_for_history; Owner: -
--

ALTER TABLE ONLY data_for_history.property_profile_view
    ADD CONSTRAINT data_for_history_property_profile_view_pk_entity_unique UNIQUE (pk_entity);


--
-- TOC entry 5456 (class 2606 OID 243232)
-- Name: system_type data_for_history_system_type_pk_entity_unique; Type: CONSTRAINT; Schema: data_for_history; Owner: -
--

ALTER TABLE ONLY data_for_history.system_type
    ADD CONSTRAINT data_for_history_system_type_pk_entity_unique UNIQUE (pk_entity);


--
-- TOC entry 5442 (class 2606 OID 243234)
-- Name: text_property data_for_history_text_property_pk_entity_unique; Type: CONSTRAINT; Schema: data_for_history; Owner: -
--

ALTER TABLE ONLY data_for_history.text_property
    ADD CONSTRAINT data_for_history_text_property_pk_entity_unique UNIQUE (pk_entity);


--
-- TOC entry 5360 (class 2606 OID 240203)
-- Name: entity entity_pkey; Type: CONSTRAINT; Schema: data_for_history; Owner: -
--

ALTER TABLE ONLY data_for_history.entity
    ADD CONSTRAINT entity_pkey PRIMARY KEY (pk_entity);


--
-- TOC entry 5366 (class 2606 OID 240903)
-- Name: class unique_dfh_pk_class; Type: CONSTRAINT; Schema: data_for_history; Owner: -
--

ALTER TABLE ONLY data_for_history.class
    ADD CONSTRAINT unique_dfh_pk_class UNIQUE (dfh_pk_class);


--
-- TOC entry 5450 (class 2606 OID 241051)
-- Name: profile unique_dfh_pk_profile; Type: CONSTRAINT; Schema: data_for_history; Owner: -
--

ALTER TABLE ONLY data_for_history.profile
    ADD CONSTRAINT unique_dfh_pk_profile UNIQUE (dfh_pk_profile);


--
-- TOC entry 5446 (class 2606 OID 241005)
-- Name: property unique_dfh_pk_property; Type: CONSTRAINT; Schema: data_for_history; Owner: -
--

ALTER TABLE ONLY data_for_history.property
    ADD CONSTRAINT unique_dfh_pk_property UNIQUE (dfh_pk_property);


--
-- TOC entry 5404 (class 2606 OID 240526)
-- Name: appellation appellation_pkey; Type: CONSTRAINT; Schema: information; Owner: -
--

ALTER TABLE ONLY information.appellation
    ADD CONSTRAINT appellation_pkey PRIMARY KEY (_deprecated_pk_appellation);


--
-- TOC entry 5408 (class 2606 OID 240583)
-- Name: entity_association entity_association_pkey; Type: CONSTRAINT; Schema: information; Owner: -
--

ALTER TABLE ONLY information.entity_association
    ADD CONSTRAINT entity_association_pkey PRIMARY KEY (pk_entity_association);


--
-- TOC entry 5402 (class 2606 OID 240512)
-- Name: entity entity_pkey; Type: CONSTRAINT; Schema: information; Owner: -
--

ALTER TABLE ONLY information.entity
    ADD CONSTRAINT entity_pkey PRIMARY KEY (pk_entity);


--
-- TOC entry 5406 (class 2606 OID 243236)
-- Name: appellation information_appellation_pk_entity_unique; Type: CONSTRAINT; Schema: information; Owner: -
--

ALTER TABLE ONLY information.appellation
    ADD CONSTRAINT information_appellation_pk_entity_unique UNIQUE (pk_entity);


--
-- TOC entry 5410 (class 2606 OID 243242)
-- Name: entity_association information_entity_association_pk_entity_unique; Type: CONSTRAINT; Schema: information; Owner: -
--

ALTER TABLE ONLY information.entity_association
    ADD CONSTRAINT information_entity_association_pk_entity_unique UNIQUE (pk_entity);


--
-- TOC entry 5428 (class 2606 OID 243246)
-- Name: language information_language_pk_entity_unique; Type: CONSTRAINT; Schema: information; Owner: -
--

ALTER TABLE ONLY information.language
    ADD CONSTRAINT information_language_pk_entity_unique UNIQUE (pk_entity);


--
-- TOC entry 5494 (class 2606 OID 243305)
-- Name: _deprecated_namespace information_namespace_pk_entity_unique; Type: CONSTRAINT; Schema: information; Owner: -
--

ALTER TABLE ONLY information._deprecated_namespace
    ADD CONSTRAINT information_namespace_pk_entity_unique PRIMARY KEY (pk_entity);


--
-- TOC entry 5412 (class 2606 OID 243248)
-- Name: persistent_item information_persistent_item_pk_entity_unique; Type: CONSTRAINT; Schema: information; Owner: -
--

ALTER TABLE ONLY information.persistent_item
    ADD CONSTRAINT information_persistent_item_pk_entity_unique UNIQUE (pk_entity);


--
-- TOC entry 5478 (class 2606 OID 243250)
-- Name: place information_place_pk_entity_unique; Type: CONSTRAINT; Schema: information; Owner: -
--

ALTER TABLE ONLY information.place
    ADD CONSTRAINT information_place_pk_entity_unique UNIQUE (pk_entity);


--
-- TOC entry 5560 (class 2606 OID 246063)
-- Name: property_of_property information_property_of_property_pk_entity_unique; Type: CONSTRAINT; Schema: information; Owner: -
--

ALTER TABLE ONLY information.property_of_property
    ADD CONSTRAINT information_property_of_property_pk_entity_unique UNIQUE (pk_entity);


--
-- TOC entry 5416 (class 2606 OID 243252)
-- Name: role information_role_pk_entity_unique; Type: CONSTRAINT; Schema: information; Owner: -
--

ALTER TABLE ONLY information.role
    ADD CONSTRAINT information_role_pk_entity_unique UNIQUE (pk_entity);


--
-- TOC entry 5420 (class 2606 OID 243256)
-- Name: temporal_entity information_temporal_entity_pk_entity_unique; Type: CONSTRAINT; Schema: information; Owner: -
--

ALTER TABLE ONLY information.temporal_entity
    ADD CONSTRAINT information_temporal_entity_pk_entity_unique UNIQUE (pk_entity);


--
-- TOC entry 5424 (class 2606 OID 243258)
-- Name: text_property information_text_property_pk_entity_unique; Type: CONSTRAINT; Schema: information; Owner: -
--

ALTER TABLE ONLY information.text_property
    ADD CONSTRAINT information_text_property_pk_entity_unique UNIQUE (pk_entity);


--
-- TOC entry 5458 (class 2606 OID 243260)
-- Name: time_primitive information_time_primitive_pk_entity_unique; Type: CONSTRAINT; Schema: information; Owner: -
--

ALTER TABLE ONLY information.time_primitive
    ADD CONSTRAINT information_time_primitive_pk_entity_unique UNIQUE (pk_entity);


--
-- TOC entry 5496 (class 2606 OID 243336)
-- Name: _deprecated_type_namespace_rel information_type_namespace_rel_pk_entity_unique; Type: CONSTRAINT; Schema: information; Owner: -
--

ALTER TABLE ONLY information._deprecated_type_namespace_rel
    ADD CONSTRAINT information_type_namespace_rel_pk_entity_unique PRIMARY KEY (pk_entity);


--
-- TOC entry 5430 (class 2606 OID 240756)
-- Name: language language_pkey; Type: CONSTRAINT; Schema: information; Owner: -
--

ALTER TABLE ONLY information.language
    ADD CONSTRAINT language_pkey PRIMARY KEY (pk_language);


--
-- TOC entry 5414 (class 2606 OID 240614)
-- Name: persistent_item persistent_item_pkey; Type: CONSTRAINT; Schema: information; Owner: -
--

ALTER TABLE ONLY information.persistent_item
    ADD CONSTRAINT persistent_item_pkey PRIMARY KEY (_deprecated_pk_persistent_item);


--
-- TOC entry 5418 (class 2606 OID 240645)
-- Name: role role_pkey; Type: CONSTRAINT; Schema: information; Owner: -
--

ALTER TABLE ONLY information.role
    ADD CONSTRAINT role_pkey PRIMARY KEY (_deprecated_pk_role);


--
-- TOC entry 5422 (class 2606 OID 240702)
-- Name: temporal_entity temporal_entity_pkey; Type: CONSTRAINT; Schema: information; Owner: -
--

ALTER TABLE ONLY information.temporal_entity
    ADD CONSTRAINT temporal_entity_pkey PRIMARY KEY (_deprecated_pk_temporal_entity);


--
-- TOC entry 5426 (class 2606 OID 243448)
-- Name: text_property text_property_identity_unique; Type: CONSTRAINT; Schema: information; Owner: -
--

ALTER TABLE ONLY information.text_property
    ADD CONSTRAINT text_property_identity_unique UNIQUE (fk_class_field, fk_language, fk_concerned_entity, _deprecated_text_property_quill_doc);


--
-- TOC entry 5460 (class 2606 OID 241202)
-- Name: time_primitive time_primitive_pkey; Type: CONSTRAINT; Schema: information; Owner: -
--

ALTER TABLE ONLY information.time_primitive
    ADD CONSTRAINT time_primitive_pkey PRIMARY KEY (pk_time_primitive);


--
-- TOC entry 5462 (class 2606 OID 242973)
-- Name: time_primitive time_primitive_unique_constraint; Type: CONSTRAINT; Schema: information; Owner: -
--

ALTER TABLE ONLY information.time_primitive
    ADD CONSTRAINT time_primitive_unique_constraint UNIQUE (julian_day, duration, fk_class);


--
-- TOC entry 5500 (class 2606 OID 243956)
-- Name: argument commons_assertion_pk_entity_unique; Type: CONSTRAINT; Schema: projects; Owner: -
--

ALTER TABLE ONLY projects.argument
    ADD CONSTRAINT commons_assertion_pk_entity_unique UNIQUE (pk_entity);


--
-- TOC entry 5384 (class 2606 OID 243204)
-- Name: _deprecated_label commons_label_pk_entity_unique; Type: CONSTRAINT; Schema: projects; Owner: -
--

ALTER TABLE ONLY projects._deprecated_label
    ADD CONSTRAINT commons_label_pk_entity_unique UNIQUE (pk_entity);


--
-- TOC entry 5388 (class 2606 OID 243206)
-- Name: project commons_project_pk_entity_unique; Type: CONSTRAINT; Schema: projects; Owner: -
--

ALTER TABLE ONLY projects.project
    ADD CONSTRAINT commons_project_pk_entity_unique UNIQUE (pk_entity);


--
-- TOC entry 5506 (class 2606 OID 244090)
-- Name: query commons_query_pk_entity_unique; Type: CONSTRAINT; Schema: projects; Owner: -
--

ALTER TABLE ONLY projects.query
    ADD CONSTRAINT commons_query_pk_entity_unique UNIQUE (pk_entity);


--
-- TOC entry 5396 (class 2606 OID 243212)
-- Name: text_property commons_text_property_pk_entity_unique; Type: CONSTRAINT; Schema: projects; Owner: -
--

ALTER TABLE ONLY projects.text_property
    ADD CONSTRAINT commons_text_property_pk_entity_unique UNIQUE (pk_entity);


--
-- TOC entry 5482 (class 2606 OID 243216)
-- Name: class_field_config commons_ui_context_config_pk_entity_unique; Type: CONSTRAINT; Schema: projects; Owner: -
--

ALTER TABLE ONLY projects.class_field_config
    ADD CONSTRAINT commons_ui_context_config_pk_entity_unique UNIQUE (pk_entity);


--
-- TOC entry 5514 (class 2606 OID 244192)
-- Name: visual commons_visual_pk_entity_unique; Type: CONSTRAINT; Schema: projects; Owner: -
--

ALTER TABLE ONLY projects.visual
    ADD CONSTRAINT commons_visual_pk_entity_unique UNIQUE (pk_entity);


--
-- TOC entry 5490 (class 2606 OID 243272)
-- Name: dfh_class_proj_rel data_for_history_proj_rel_pk_entity; Type: CONSTRAINT; Schema: projects; Owner: -
--

ALTER TABLE ONLY projects.dfh_class_proj_rel
    ADD CONSTRAINT data_for_history_proj_rel_pk_entity PRIMARY KEY (pk_entity);


--
-- TOC entry 5492 (class 2606 OID 244972)
-- Name: dfh_class_proj_rel dfh_class_project_rel__entity_and_project_unique; Type: CONSTRAINT; Schema: projects; Owner: -
--

ALTER TABLE ONLY projects.dfh_class_proj_rel
    ADD CONSTRAINT dfh_class_project_rel__entity_and_project_unique UNIQUE (fk_entity, fk_project);


--
-- TOC entry 5382 (class 2606 OID 240347)
-- Name: entity entity_pkey; Type: CONSTRAINT; Schema: projects; Owner: -
--

ALTER TABLE ONLY projects.entity
    ADD CONSTRAINT entity_pkey PRIMARY KEY (pk_entity);


--
-- TOC entry 5432 (class 2606 OID 244952)
-- Name: info_proj_rel entity_version_project_rel_fk_entity_fk_project_key; Type: CONSTRAINT; Schema: projects; Owner: -
--

ALTER TABLE ONLY projects.info_proj_rel
    ADD CONSTRAINT entity_version_project_rel_fk_entity_fk_project_key UNIQUE (fk_entity, fk_project);


--
-- TOC entry 5434 (class 2606 OID 244954)
-- Name: info_proj_rel entity_version_project_rel_fk_entity_version_concat_fk_proj_key; Type: CONSTRAINT; Schema: projects; Owner: -
--

ALTER TABLE ONLY projects.info_proj_rel
    ADD CONSTRAINT entity_version_project_rel_fk_entity_version_concat_fk_proj_key UNIQUE (fk_entity_version_concat, fk_project);


--
-- TOC entry 5436 (class 2606 OID 240787)
-- Name: info_proj_rel entity_version_project_rel_pkey; Type: CONSTRAINT; Schema: projects; Owner: -
--

ALTER TABLE ONLY projects.info_proj_rel
    ADD CONSTRAINT entity_version_project_rel_pkey PRIMARY KEY (_deprecated_pk_entity_version_project_rel);


--
-- TOC entry 5438 (class 2606 OID 243244)
-- Name: info_proj_rel information_entity_version_project_rel_pk_entity_unique; Type: CONSTRAINT; Schema: projects; Owner: -
--

ALTER TABLE ONLY projects.info_proj_rel
    ADD CONSTRAINT information_entity_version_project_rel_pk_entity_unique UNIQUE (pk_entity);


--
-- TOC entry 5386 (class 2606 OID 240361)
-- Name: _deprecated_label label_pkey; Type: CONSTRAINT; Schema: projects; Owner: -
--

ALTER TABLE ONLY projects._deprecated_label
    ADD CONSTRAINT label_pkey PRIMARY KEY (pk_label);


--
-- TOC entry 5358 (class 2606 OID 240181)
-- Name: language language_pkey; Type: CONSTRAINT; Schema: projects; Owner: -
--

ALTER TABLE ONLY projects.language
    ADD CONSTRAINT language_pkey PRIMARY KEY (pk_language);


--
-- TOC entry 5390 (class 2606 OID 240390)
-- Name: project project_pkey; Type: CONSTRAINT; Schema: projects; Owner: -
--

ALTER TABLE ONLY projects.project
    ADD CONSTRAINT project_pkey PRIMARY KEY (_deprecated_pk_project);


--
-- TOC entry 5508 (class 2606 OID 244914)
-- Name: query query__unique_name_per_project; Type: CONSTRAINT; Schema: projects; Owner: -
--

ALTER TABLE ONLY projects.query
    ADD CONSTRAINT query__unique_name_per_project UNIQUE (name, fk_project);


--
-- TOC entry 5398 (class 2606 OID 240453)
-- Name: text_property text_property_pkey; Type: CONSTRAINT; Schema: projects; Owner: -
--

ALTER TABLE ONLY projects.text_property
    ADD CONSTRAINT text_property_pkey PRIMARY KEY (_deprecated_pk_text_property);


--
-- TOC entry 5516 (class 2606 OID 244932)
-- Name: visual visual__unique_name_per_project; Type: CONSTRAINT; Schema: projects; Owner: -
--

ALTER TABLE ONLY projects.visual
    ADD CONSTRAINT visual__unique_name_per_project UNIQUE (name, fk_project);


--
-- TOC entry 5374 (class 2606 OID 240293)
-- Name: accesstoken accesstoken_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.accesstoken
    ADD CONSTRAINT accesstoken_pkey PRIMARY KEY (id);


--
-- TOC entry 5368 (class 2606 OID 240284)
-- Name: account account_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT account_email_key UNIQUE (email);


--
-- TOC entry 5370 (class 2606 OID 240280)
-- Name: account account_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT account_pkey PRIMARY KEY (id);


--
-- TOC entry 5400 (class 2606 OID 240489)
-- Name: account_project_rel account_project_rel_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.account_project_rel
    ADD CONSTRAINT account_project_rel_pkey PRIMARY KEY (id);


--
-- TOC entry 5372 (class 2606 OID 240282)
-- Name: account account_username_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT account_username_key UNIQUE (username);


--
-- TOC entry 5380 (class 2606 OID 240336)
-- Name: acl acl_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.acl
    ADD CONSTRAINT acl_pkey PRIMARY KEY (id);


--
-- TOC entry 5356 (class 2606 OID 240159)
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

-- ALTER TABLE ONLY public.migrations
--     ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);


--
-- TOC entry 5376 (class 2606 OID 240309)
-- Name: role role_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.role
    ADD CONSTRAINT role_pkey PRIMARY KEY (id);


--
-- TOC entry 5378 (class 2606 OID 240320)
-- Name: rolemapping rolemapping_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.rolemapping
    ADD CONSTRAINT rolemapping_pkey PRIMARY KEY (id);


--
-- TOC entry 5510 (class 2606 OID 244113)
-- Name: class_has_type_property class_has_type_property_fk_class_key; Type: CONSTRAINT; Schema: system; Owner: -
--

ALTER TABLE ONLY system.class_has_type_property
    ADD CONSTRAINT class_has_type_property_fk_class_key UNIQUE (fk_class);


--
-- TOC entry 5512 (class 2606 OID 244125)
-- Name: class_has_type_property commons_class_has_type_property_pk_entity_unique; Type: CONSTRAINT; Schema: system; Owner: -
--

ALTER TABLE ONLY system.class_has_type_property
    ADD CONSTRAINT commons_class_has_type_property_pk_entity_unique UNIQUE (pk_entity);


--
-- TOC entry 5488 (class 2606 OID 243208)
-- Name: class_field commons_property_set_pk_entity_unique; Type: CONSTRAINT; Schema: system; Owner: -
--

ALTER TABLE ONLY system.class_field
    ADD CONSTRAINT commons_property_set_pk_entity_unique UNIQUE (pk_entity);


--
-- TOC entry 5498 (class 2606 OID 243405)
-- Name: class_field_property_rel commons_property_set_property_rel_pk_entity_unique; Type: CONSTRAINT; Schema: system; Owner: -
--

ALTER TABLE ONLY system.class_field_property_rel
    ADD CONSTRAINT commons_property_set_property_rel_pk_entity_unique UNIQUE (pk_entity);


--
-- TOC entry 5392 (class 2606 OID 243210)
-- Name: system_type commons_system_type_pk_entity_unique; Type: CONSTRAINT; Schema: system; Owner: -
--

ALTER TABLE ONLY system.system_type
    ADD CONSTRAINT commons_system_type_pk_entity_unique UNIQUE (pk_entity);


--
-- TOC entry 5480 (class 2606 OID 243214)
-- Name: app_context commons_ui_context_pk_entity_unique; Type: CONSTRAINT; Schema: system; Owner: -
--

ALTER TABLE ONLY system.app_context
    ADD CONSTRAINT commons_ui_context_pk_entity_unique UNIQUE (pk_entity);


--
-- TOC entry 5522 (class 2606 OID 244721)
-- Name: entity entity_pkey; Type: CONSTRAINT; Schema: system; Owner: -
--

ALTER TABLE ONLY system.entity
    ADD CONSTRAINT entity_pkey PRIMARY KEY (pk_entity);


--
-- TOC entry 5524 (class 2606 OID 244755)
-- Name: system_relevant_class system_system_relevant_class_pk_entity_unique; Type: CONSTRAINT; Schema: system; Owner: -
--

ALTER TABLE ONLY system.system_relevant_class
    ADD CONSTRAINT system_system_relevant_class_pk_entity_unique UNIQUE (pk_entity);


--
-- TOC entry 5526 (class 2606 OID 244783)
-- Name: system_relevant_type system_system_relevant_type_pk_entity_unique; Type: CONSTRAINT; Schema: system; Owner: -
--

ALTER TABLE ONLY system.system_relevant_type
    ADD CONSTRAINT system_system_relevant_type_pk_entity_unique UNIQUE (pk_entity);


--
-- TOC entry 5394 (class 2606 OID 244871)
-- Name: system_type unique_note; Type: CONSTRAINT; Schema: system; Owner: -
--

ALTER TABLE ONLY system.system_type
    ADD CONSTRAINT unique_note UNIQUE (notes);


--
-- TOC entry 5502 (class 2606 OID 243978)
-- Name: class_preview dfh_pk_class_unique; Type: CONSTRAINT; Schema: warehouse; Owner: -
--

ALTER TABLE ONLY warehouse.class_preview
    ADD CONSTRAINT dfh_pk_class_unique UNIQUE (dfh_pk_class);


--
-- TOC entry 5504 (class 2606 OID 244048)
-- Name: entity_preview entity_preview_unique; Type: CONSTRAINT; Schema: warehouse; Owner: -
--

ALTER TABLE ONLY warehouse.entity_preview
    ADD CONSTRAINT entity_preview_unique UNIQUE (pk_entity, project);


--
-- TOC entry 5483 (class 1259 OID 243036)
-- Name: ui_context_config_for_prop_and_proj_uni_idx; Type: INDEX; Schema: projects; Owner: -
--

CREATE UNIQUE INDEX ui_context_config_for_prop_and_proj_uni_idx ON projects.class_field_config USING btree (fk_app_context, _deprecated_fk_project, fk_property, property_is_outgoing) WHERE (_deprecated_fk_project IS NOT NULL);


--
-- TOC entry 5484 (class 1259 OID 243037)
-- Name: ui_context_config_for_prop_no_proj_uni_idx; Type: INDEX; Schema: projects; Owner: -
--

CREATE UNIQUE INDEX ui_context_config_for_prop_no_proj_uni_idx ON projects.class_field_config USING btree (fk_app_context, fk_property, property_is_outgoing) WHERE (_deprecated_fk_project IS NULL);


--
-- TOC entry 5485 (class 1259 OID 243038)
-- Name: ui_context_config_for_prop_set_and_proj_uni_idx; Type: INDEX; Schema: projects; Owner: -
--

CREATE UNIQUE INDEX ui_context_config_for_prop_set_and_proj_uni_idx ON projects.class_field_config USING btree (fk_app_context, _deprecated_fk_project, fk_class_field, fk_class_for_class_field) WHERE (_deprecated_fk_project IS NOT NULL);


--
-- TOC entry 5486 (class 1259 OID 243039)
-- Name: ui_context_config_for_prop_set_no_proj_uni_idx; Type: INDEX; Schema: projects; Owner: -
--

CREATE UNIQUE INDEX ui_context_config_for_prop_set_no_proj_uni_idx ON projects.class_field_config USING btree (fk_app_context, fk_class_field, fk_class_for_class_field) WHERE (_deprecated_fk_project IS NULL);


--
-- TOC entry 5876 (class 2620 OID 244699)
-- Name: text sync_quill_doc_and_string; Type: TRIGGER; Schema: commons; Owner: -
--

CREATE TRIGGER sync_quill_doc_and_string BEFORE INSERT OR UPDATE ON commons.text FOR EACH ROW EXECUTE PROCEDURE commons.text__sync_quill_doc_and_string();


--
-- TOC entry 5787 (class 2620 OID 245312)
-- Name: digital create_entity_version_key; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER create_entity_version_key BEFORE INSERT ON data.digital FOR EACH ROW EXECUTE PROCEDURE commons.create_entity_version_key();


--
-- TOC entry 5898 (class 2620 OID 245419)
-- Name: chunk create_entity_version_key; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER create_entity_version_key BEFORE INSERT ON data.chunk FOR EACH ROW EXECUTE PROCEDURE commons.create_entity_version_key();


--
-- TOC entry 5905 (class 2620 OID 245480)
-- Name: row create_entity_version_key; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER create_entity_version_key BEFORE INSERT ON data."row" FOR EACH ROW EXECUTE PROCEDURE commons.create_entity_version_key();


--
-- TOC entry 5911 (class 2620 OID 245518)
-- Name: column create_entity_version_key; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER create_entity_version_key BEFORE INSERT ON data."column" FOR EACH ROW EXECUTE PROCEDURE commons.create_entity_version_key();


--
-- TOC entry 5917 (class 2620 OID 245551)
-- Name: cell create_entity_version_key; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER create_entity_version_key BEFORE INSERT ON data.cell FOR EACH ROW EXECUTE PROCEDURE commons.create_entity_version_key();


--
-- TOC entry 5924 (class 2620 OID 245617)
-- Name: factoid_class_digital_rel create_entity_version_key; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER create_entity_version_key BEFORE INSERT ON data.factoid_class_digital_rel FOR EACH ROW EXECUTE PROCEDURE commons.create_entity_version_key();


--
-- TOC entry 5930 (class 2620 OID 245660)
-- Name: value_association_columns_rel create_entity_version_key; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER create_entity_version_key BEFORE INSERT ON data.value_association_columns_rel FOR EACH ROW EXECUTE PROCEDURE commons.create_entity_version_key();


--
-- TOC entry 5936 (class 2620 OID 245693)
-- Name: class_column_rel create_entity_version_key; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER create_entity_version_key BEFORE INSERT ON data.class_column_rel FOR EACH ROW EXECUTE PROCEDURE commons.create_entity_version_key();


--
-- TOC entry 5942 (class 2620 OID 245731)
-- Name: factoid_property_column_rel create_entity_version_key; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER create_entity_version_key BEFORE INSERT ON data.factoid_property_column_rel FOR EACH ROW EXECUTE PROCEDURE commons.create_entity_version_key();


--
-- TOC entry 5948 (class 2620 OID 245759)
-- Name: factoid create_entity_version_key; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER create_entity_version_key BEFORE INSERT ON data.factoid FOR EACH ROW EXECUTE PROCEDURE commons.create_entity_version_key();


--
-- TOC entry 5954 (class 2620 OID 245802)
-- Name: factoid_role create_entity_version_key; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER create_entity_version_key BEFORE INSERT ON data.factoid_role FOR EACH ROW EXECUTE PROCEDURE commons.create_entity_version_key();


--
-- TOC entry 5960 (class 2620 OID 245850)
-- Name: values_association create_entity_version_key; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER create_entity_version_key BEFORE INSERT ON data.values_association FOR EACH ROW EXECUTE PROCEDURE commons.create_entity_version_key();


--
-- TOC entry 5966 (class 2620 OID 245878)
-- Name: data_association create_entity_version_key; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER create_entity_version_key BEFORE INSERT ON data.data_association FOR EACH ROW EXECUTE PROCEDURE commons.create_entity_version_key();


--
-- TOC entry 5972 (class 2620 OID 245906)
-- Name: avatar create_entity_version_key; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER create_entity_version_key BEFORE INSERT ON data.avatar FOR EACH ROW EXECUTE PROCEDURE commons.create_entity_version_key();


--
-- TOC entry 5978 (class 2620 OID 245939)
-- Name: text_property create_entity_version_key; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER create_entity_version_key BEFORE INSERT ON data.text_property FOR EACH ROW EXECUTE PROCEDURE commons.create_entity_version_key();


--
-- TOC entry 5985 (class 2620 OID 246000)
-- Name: namespace create_entity_version_key; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER create_entity_version_key BEFORE INSERT ON data.namespace FOR EACH ROW EXECUTE PROCEDURE commons.create_entity_version_key();


--
-- TOC entry 5790 (class 2620 OID 241268)
-- Name: digital creation_tmsp; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER creation_tmsp BEFORE INSERT ON data.digital FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_creation();


--
-- TOC entry 5894 (class 2620 OID 245409)
-- Name: chunk creation_tmsp; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER creation_tmsp BEFORE INSERT ON data.chunk FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_creation();


--
-- TOC entry 5901 (class 2620 OID 245470)
-- Name: row creation_tmsp; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER creation_tmsp BEFORE INSERT ON data."row" FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_creation();


--
-- TOC entry 5907 (class 2620 OID 245508)
-- Name: column creation_tmsp; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER creation_tmsp BEFORE INSERT ON data."column" FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_creation();


--
-- TOC entry 5913 (class 2620 OID 245541)
-- Name: cell creation_tmsp; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER creation_tmsp BEFORE INSERT ON data.cell FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_creation();


--
-- TOC entry 5920 (class 2620 OID 245607)
-- Name: factoid_class_digital_rel creation_tmsp; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER creation_tmsp BEFORE INSERT ON data.factoid_class_digital_rel FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_creation();


--
-- TOC entry 5926 (class 2620 OID 245650)
-- Name: value_association_columns_rel creation_tmsp; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER creation_tmsp BEFORE INSERT ON data.value_association_columns_rel FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_creation();


--
-- TOC entry 5932 (class 2620 OID 245683)
-- Name: class_column_rel creation_tmsp; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER creation_tmsp BEFORE INSERT ON data.class_column_rel FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_creation();


--
-- TOC entry 5938 (class 2620 OID 245721)
-- Name: factoid_property_column_rel creation_tmsp; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER creation_tmsp BEFORE INSERT ON data.factoid_property_column_rel FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_creation();


--
-- TOC entry 5944 (class 2620 OID 245749)
-- Name: factoid creation_tmsp; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER creation_tmsp BEFORE INSERT ON data.factoid FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_creation();


--
-- TOC entry 5950 (class 2620 OID 245792)
-- Name: factoid_role creation_tmsp; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER creation_tmsp BEFORE INSERT ON data.factoid_role FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_creation();


--
-- TOC entry 5956 (class 2620 OID 245840)
-- Name: values_association creation_tmsp; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER creation_tmsp BEFORE INSERT ON data.values_association FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_creation();


--
-- TOC entry 5962 (class 2620 OID 245868)
-- Name: data_association creation_tmsp; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER creation_tmsp BEFORE INSERT ON data.data_association FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_creation();


--
-- TOC entry 5968 (class 2620 OID 245896)
-- Name: avatar creation_tmsp; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER creation_tmsp BEFORE INSERT ON data.avatar FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_creation();


--
-- TOC entry 5974 (class 2620 OID 245929)
-- Name: text_property creation_tmsp; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER creation_tmsp BEFORE INSERT ON data.text_property FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_creation();


--
-- TOC entry 5981 (class 2620 OID 245990)
-- Name: namespace creation_tmsp; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER creation_tmsp BEFORE INSERT ON data.namespace FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_creation();


--
-- TOC entry 5791 (class 2620 OID 241269)
-- Name: digital insert_schema_table_name; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER insert_schema_table_name BEFORE INSERT ON data.digital FOR EACH ROW EXECUTE PROCEDURE commons.insert_schema_table_name();


--
-- TOC entry 5895 (class 2620 OID 245410)
-- Name: chunk insert_schema_table_name; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER insert_schema_table_name BEFORE INSERT ON data.chunk FOR EACH ROW EXECUTE PROCEDURE commons.insert_schema_table_name();


--
-- TOC entry 5902 (class 2620 OID 245471)
-- Name: row insert_schema_table_name; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER insert_schema_table_name BEFORE INSERT ON data."row" FOR EACH ROW EXECUTE PROCEDURE commons.insert_schema_table_name();


--
-- TOC entry 5908 (class 2620 OID 245509)
-- Name: column insert_schema_table_name; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER insert_schema_table_name BEFORE INSERT ON data."column" FOR EACH ROW EXECUTE PROCEDURE commons.insert_schema_table_name();


--
-- TOC entry 5914 (class 2620 OID 245542)
-- Name: cell insert_schema_table_name; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER insert_schema_table_name BEFORE INSERT ON data.cell FOR EACH ROW EXECUTE PROCEDURE commons.insert_schema_table_name();


--
-- TOC entry 5921 (class 2620 OID 245608)
-- Name: factoid_class_digital_rel insert_schema_table_name; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER insert_schema_table_name BEFORE INSERT ON data.factoid_class_digital_rel FOR EACH ROW EXECUTE PROCEDURE commons.insert_schema_table_name();


--
-- TOC entry 5927 (class 2620 OID 245651)
-- Name: value_association_columns_rel insert_schema_table_name; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER insert_schema_table_name BEFORE INSERT ON data.value_association_columns_rel FOR EACH ROW EXECUTE PROCEDURE commons.insert_schema_table_name();


--
-- TOC entry 5933 (class 2620 OID 245684)
-- Name: class_column_rel insert_schema_table_name; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER insert_schema_table_name BEFORE INSERT ON data.class_column_rel FOR EACH ROW EXECUTE PROCEDURE commons.insert_schema_table_name();


--
-- TOC entry 5939 (class 2620 OID 245722)
-- Name: factoid_property_column_rel insert_schema_table_name; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER insert_schema_table_name BEFORE INSERT ON data.factoid_property_column_rel FOR EACH ROW EXECUTE PROCEDURE commons.insert_schema_table_name();


--
-- TOC entry 5945 (class 2620 OID 245750)
-- Name: factoid insert_schema_table_name; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER insert_schema_table_name BEFORE INSERT ON data.factoid FOR EACH ROW EXECUTE PROCEDURE commons.insert_schema_table_name();


--
-- TOC entry 5951 (class 2620 OID 245793)
-- Name: factoid_role insert_schema_table_name; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER insert_schema_table_name BEFORE INSERT ON data.factoid_role FOR EACH ROW EXECUTE PROCEDURE commons.insert_schema_table_name();


--
-- TOC entry 5957 (class 2620 OID 245841)
-- Name: values_association insert_schema_table_name; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER insert_schema_table_name BEFORE INSERT ON data.values_association FOR EACH ROW EXECUTE PROCEDURE commons.insert_schema_table_name();


--
-- TOC entry 5963 (class 2620 OID 245869)
-- Name: data_association insert_schema_table_name; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER insert_schema_table_name BEFORE INSERT ON data.data_association FOR EACH ROW EXECUTE PROCEDURE commons.insert_schema_table_name();


--
-- TOC entry 5969 (class 2620 OID 245897)
-- Name: avatar insert_schema_table_name; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER insert_schema_table_name BEFORE INSERT ON data.avatar FOR EACH ROW EXECUTE PROCEDURE commons.insert_schema_table_name();


--
-- TOC entry 5975 (class 2620 OID 245930)
-- Name: text_property insert_schema_table_name; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER insert_schema_table_name BEFORE INSERT ON data.text_property FOR EACH ROW EXECUTE PROCEDURE commons.insert_schema_table_name();


--
-- TOC entry 5982 (class 2620 OID 245991)
-- Name: namespace insert_schema_table_name; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER insert_schema_table_name BEFORE INSERT ON data.namespace FOR EACH ROW EXECUTE PROCEDURE commons.insert_schema_table_name();


--
-- TOC entry 5792 (class 2620 OID 241270)
-- Name: digital last_modification_tmsp; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER last_modification_tmsp BEFORE INSERT OR UPDATE ON data.digital FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_last_modification();


--
-- TOC entry 5896 (class 2620 OID 245411)
-- Name: chunk last_modification_tmsp; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER last_modification_tmsp BEFORE INSERT OR UPDATE ON data.chunk FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_last_modification();


--
-- TOC entry 5903 (class 2620 OID 245472)
-- Name: row last_modification_tmsp; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER last_modification_tmsp BEFORE INSERT OR UPDATE ON data."row" FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_last_modification();


--
-- TOC entry 5909 (class 2620 OID 245510)
-- Name: column last_modification_tmsp; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER last_modification_tmsp BEFORE INSERT OR UPDATE ON data."column" FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_last_modification();


--
-- TOC entry 5915 (class 2620 OID 245543)
-- Name: cell last_modification_tmsp; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER last_modification_tmsp BEFORE INSERT OR UPDATE ON data.cell FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_last_modification();


--
-- TOC entry 5922 (class 2620 OID 245609)
-- Name: factoid_class_digital_rel last_modification_tmsp; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER last_modification_tmsp BEFORE INSERT OR UPDATE ON data.factoid_class_digital_rel FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_last_modification();


--
-- TOC entry 5928 (class 2620 OID 245652)
-- Name: value_association_columns_rel last_modification_tmsp; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER last_modification_tmsp BEFORE INSERT OR UPDATE ON data.value_association_columns_rel FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_last_modification();


--
-- TOC entry 5934 (class 2620 OID 245685)
-- Name: class_column_rel last_modification_tmsp; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER last_modification_tmsp BEFORE INSERT OR UPDATE ON data.class_column_rel FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_last_modification();


--
-- TOC entry 5940 (class 2620 OID 245723)
-- Name: factoid_property_column_rel last_modification_tmsp; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER last_modification_tmsp BEFORE INSERT OR UPDATE ON data.factoid_property_column_rel FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_last_modification();


--
-- TOC entry 5946 (class 2620 OID 245751)
-- Name: factoid last_modification_tmsp; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER last_modification_tmsp BEFORE INSERT OR UPDATE ON data.factoid FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_last_modification();


--
-- TOC entry 5952 (class 2620 OID 245794)
-- Name: factoid_role last_modification_tmsp; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER last_modification_tmsp BEFORE INSERT OR UPDATE ON data.factoid_role FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_last_modification();


--
-- TOC entry 5958 (class 2620 OID 245842)
-- Name: values_association last_modification_tmsp; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER last_modification_tmsp BEFORE INSERT OR UPDATE ON data.values_association FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_last_modification();


--
-- TOC entry 5964 (class 2620 OID 245870)
-- Name: data_association last_modification_tmsp; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER last_modification_tmsp BEFORE INSERT OR UPDATE ON data.data_association FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_last_modification();


--
-- TOC entry 5970 (class 2620 OID 245898)
-- Name: avatar last_modification_tmsp; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER last_modification_tmsp BEFORE INSERT OR UPDATE ON data.avatar FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_last_modification();


--
-- TOC entry 5976 (class 2620 OID 245931)
-- Name: text_property last_modification_tmsp; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER last_modification_tmsp BEFORE INSERT OR UPDATE ON data.text_property FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_last_modification();


--
-- TOC entry 5983 (class 2620 OID 245992)
-- Name: namespace last_modification_tmsp; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER last_modification_tmsp BEFORE INSERT OR UPDATE ON data.namespace FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_last_modification();


--
-- TOC entry 5995 (class 2620 OID 246088)
-- Name: v_digital_version on_insert; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER on_insert INSTEAD OF INSERT ON data.v_digital_version FOR EACH ROW EXECUTE PROCEDURE data.v_digital_version_insert();


--
-- TOC entry 5789 (class 2620 OID 245366)
-- Name: digital sync_quill_doc_and_string; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER sync_quill_doc_and_string BEFORE INSERT OR UPDATE ON data.digital FOR EACH ROW EXECUTE PROCEDURE commons.text__sync_quill_doc_and_string();


--
-- TOC entry 5900 (class 2620 OID 245453)
-- Name: chunk sync_quill_doc_and_string; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER sync_quill_doc_and_string BEFORE INSERT OR UPDATE ON data.chunk FOR EACH ROW EXECUTE PROCEDURE commons.text__sync_quill_doc_and_string();


--
-- TOC entry 5919 (class 2620 OID 245585)
-- Name: cell sync_quill_doc_and_string; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER sync_quill_doc_and_string BEFORE INSERT OR UPDATE ON data.cell FOR EACH ROW EXECUTE PROCEDURE commons.text__sync_quill_doc_and_string();


--
-- TOC entry 5980 (class 2620 OID 245973)
-- Name: text_property sync_quill_doc_and_string; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER sync_quill_doc_and_string BEFORE INSERT OR UPDATE ON data.text_property FOR EACH ROW EXECUTE PROCEDURE commons.text__sync_quill_doc_and_string();


--
-- TOC entry 5788 (class 2620 OID 245313)
-- Name: digital update_entity_version_key; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER update_entity_version_key BEFORE UPDATE ON data.digital FOR EACH ROW EXECUTE PROCEDURE commons.update_entity_version_key();


--
-- TOC entry 5899 (class 2620 OID 245420)
-- Name: chunk update_entity_version_key; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER update_entity_version_key BEFORE UPDATE ON data.chunk FOR EACH ROW EXECUTE PROCEDURE commons.update_entity_version_key();


--
-- TOC entry 5906 (class 2620 OID 245481)
-- Name: row update_entity_version_key; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER update_entity_version_key BEFORE UPDATE ON data."row" FOR EACH ROW EXECUTE PROCEDURE commons.update_entity_version_key();


--
-- TOC entry 5912 (class 2620 OID 245519)
-- Name: column update_entity_version_key; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER update_entity_version_key BEFORE UPDATE ON data."column" FOR EACH ROW EXECUTE PROCEDURE commons.update_entity_version_key();


--
-- TOC entry 5918 (class 2620 OID 245552)
-- Name: cell update_entity_version_key; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER update_entity_version_key BEFORE UPDATE ON data.cell FOR EACH ROW EXECUTE PROCEDURE commons.update_entity_version_key();


--
-- TOC entry 5925 (class 2620 OID 245618)
-- Name: factoid_class_digital_rel update_entity_version_key; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER update_entity_version_key BEFORE UPDATE ON data.factoid_class_digital_rel FOR EACH ROW EXECUTE PROCEDURE commons.update_entity_version_key();


--
-- TOC entry 5931 (class 2620 OID 245661)
-- Name: value_association_columns_rel update_entity_version_key; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER update_entity_version_key BEFORE UPDATE ON data.value_association_columns_rel FOR EACH ROW EXECUTE PROCEDURE commons.update_entity_version_key();


--
-- TOC entry 5937 (class 2620 OID 245694)
-- Name: class_column_rel update_entity_version_key; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER update_entity_version_key BEFORE UPDATE ON data.class_column_rel FOR EACH ROW EXECUTE PROCEDURE commons.update_entity_version_key();


--
-- TOC entry 5943 (class 2620 OID 245732)
-- Name: factoid_property_column_rel update_entity_version_key; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER update_entity_version_key BEFORE UPDATE ON data.factoid_property_column_rel FOR EACH ROW EXECUTE PROCEDURE commons.update_entity_version_key();


--
-- TOC entry 5949 (class 2620 OID 245760)
-- Name: factoid update_entity_version_key; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER update_entity_version_key BEFORE UPDATE ON data.factoid FOR EACH ROW EXECUTE PROCEDURE commons.update_entity_version_key();


--
-- TOC entry 5955 (class 2620 OID 245803)
-- Name: factoid_role update_entity_version_key; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER update_entity_version_key BEFORE UPDATE ON data.factoid_role FOR EACH ROW EXECUTE PROCEDURE commons.update_entity_version_key();


--
-- TOC entry 5961 (class 2620 OID 245851)
-- Name: values_association update_entity_version_key; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER update_entity_version_key BEFORE UPDATE ON data.values_association FOR EACH ROW EXECUTE PROCEDURE commons.update_entity_version_key();


--
-- TOC entry 5967 (class 2620 OID 245879)
-- Name: data_association update_entity_version_key; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER update_entity_version_key BEFORE UPDATE ON data.data_association FOR EACH ROW EXECUTE PROCEDURE commons.update_entity_version_key();


--
-- TOC entry 5973 (class 2620 OID 245907)
-- Name: avatar update_entity_version_key; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER update_entity_version_key BEFORE UPDATE ON data.avatar FOR EACH ROW EXECUTE PROCEDURE commons.update_entity_version_key();


--
-- TOC entry 5979 (class 2620 OID 245940)
-- Name: text_property update_entity_version_key; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER update_entity_version_key BEFORE UPDATE ON data.text_property FOR EACH ROW EXECUTE PROCEDURE commons.update_entity_version_key();


--
-- TOC entry 5986 (class 2620 OID 246001)
-- Name: namespace update_entity_version_key; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER update_entity_version_key BEFORE UPDATE ON data.namespace FOR EACH ROW EXECUTE PROCEDURE commons.update_entity_version_key();


--
-- TOC entry 5786 (class 2620 OID 245311)
-- Name: digital versioning_trigger; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER versioning_trigger BEFORE INSERT OR DELETE OR UPDATE ON data.digital FOR EACH ROW EXECUTE PROCEDURE public.versioning('sys_period', 'data.digital_vt', 'true');


--
-- TOC entry 5897 (class 2620 OID 245418)
-- Name: chunk versioning_trigger; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER versioning_trigger BEFORE INSERT OR DELETE OR UPDATE ON data.chunk FOR EACH ROW EXECUTE PROCEDURE public.versioning('sys_period', 'data.chunk_vt', 'true');


--
-- TOC entry 5904 (class 2620 OID 245479)
-- Name: row versioning_trigger; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER versioning_trigger BEFORE INSERT OR DELETE OR UPDATE ON data."row" FOR EACH ROW EXECUTE PROCEDURE public.versioning('sys_period', 'data.row_vt', 'true');


--
-- TOC entry 5910 (class 2620 OID 245517)
-- Name: column versioning_trigger; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER versioning_trigger BEFORE INSERT OR DELETE OR UPDATE ON data."column" FOR EACH ROW EXECUTE PROCEDURE public.versioning('sys_period', 'data.column_vt', 'true');


--
-- TOC entry 5916 (class 2620 OID 245550)
-- Name: cell versioning_trigger; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER versioning_trigger BEFORE INSERT OR DELETE OR UPDATE ON data.cell FOR EACH ROW EXECUTE PROCEDURE public.versioning('sys_period', 'data.cell_vt', 'true');


--
-- TOC entry 5923 (class 2620 OID 245616)
-- Name: factoid_class_digital_rel versioning_trigger; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER versioning_trigger BEFORE INSERT OR DELETE OR UPDATE ON data.factoid_class_digital_rel FOR EACH ROW EXECUTE PROCEDURE public.versioning('sys_period', 'data.factoid_class_digital_rel_vt', 'true');


--
-- TOC entry 5929 (class 2620 OID 245659)
-- Name: value_association_columns_rel versioning_trigger; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER versioning_trigger BEFORE INSERT OR DELETE OR UPDATE ON data.value_association_columns_rel FOR EACH ROW EXECUTE PROCEDURE public.versioning('sys_period', 'data.value_association_columns_rel_vt', 'true');


--
-- TOC entry 5935 (class 2620 OID 245692)
-- Name: class_column_rel versioning_trigger; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER versioning_trigger BEFORE INSERT OR DELETE OR UPDATE ON data.class_column_rel FOR EACH ROW EXECUTE PROCEDURE public.versioning('sys_period', 'data.class_column_rel_vt', 'true');


--
-- TOC entry 5941 (class 2620 OID 245730)
-- Name: factoid_property_column_rel versioning_trigger; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER versioning_trigger BEFORE INSERT OR DELETE OR UPDATE ON data.factoid_property_column_rel FOR EACH ROW EXECUTE PROCEDURE public.versioning('sys_period', 'data.factoid_property_column_rel_vt', 'true');


--
-- TOC entry 5947 (class 2620 OID 245758)
-- Name: factoid versioning_trigger; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER versioning_trigger BEFORE INSERT OR DELETE OR UPDATE ON data.factoid FOR EACH ROW EXECUTE PROCEDURE public.versioning('sys_period', 'data.factoid_vt', 'true');


--
-- TOC entry 5953 (class 2620 OID 245801)
-- Name: factoid_role versioning_trigger; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER versioning_trigger BEFORE INSERT OR DELETE OR UPDATE ON data.factoid_role FOR EACH ROW EXECUTE PROCEDURE public.versioning('sys_period', 'data.factoid_role_vt', 'true');


--
-- TOC entry 5959 (class 2620 OID 245849)
-- Name: values_association versioning_trigger; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER versioning_trigger BEFORE INSERT OR DELETE OR UPDATE ON data.values_association FOR EACH ROW EXECUTE PROCEDURE public.versioning('sys_period', 'data.values_association_vt', 'true');


--
-- TOC entry 5965 (class 2620 OID 245877)
-- Name: data_association versioning_trigger; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER versioning_trigger BEFORE INSERT OR DELETE OR UPDATE ON data.data_association FOR EACH ROW EXECUTE PROCEDURE public.versioning('sys_period', 'data.data_association_vt', 'true');


--
-- TOC entry 5971 (class 2620 OID 245905)
-- Name: avatar versioning_trigger; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER versioning_trigger BEFORE INSERT OR DELETE OR UPDATE ON data.avatar FOR EACH ROW EXECUTE PROCEDURE public.versioning('sys_period', 'data.avatar_vt', 'true');


--
-- TOC entry 5977 (class 2620 OID 245938)
-- Name: text_property versioning_trigger; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER versioning_trigger BEFORE INSERT OR DELETE OR UPDATE ON data.text_property FOR EACH ROW EXECUTE PROCEDURE public.versioning('sys_period', 'data.text_property_vt', 'true');


--
-- TOC entry 5984 (class 2620 OID 245999)
-- Name: namespace versioning_trigger; Type: TRIGGER; Schema: data; Owner: -
--

CREATE TRIGGER versioning_trigger BEFORE INSERT OR DELETE OR UPDATE ON data.namespace FOR EACH ROW EXECUTE PROCEDURE public.versioning('sys_period', 'data.namespace_vt', 'true');


--
-- TOC entry 5746 (class 2620 OID 243982)
-- Name: label after_delete; Type: TRIGGER; Schema: data_for_history; Owner: -
--

CREATE TRIGGER after_delete AFTER DELETE ON data_for_history.label FOR EACH ROW EXECUTE PROCEDURE warehouse.update_class_preview__on_label_delete();


--
-- TOC entry 5745 (class 2620 OID 243981)
-- Name: label after_insert_or_update; Type: TRIGGER; Schema: data_for_history; Owner: -
--

CREATE TRIGGER after_insert_or_update AFTER INSERT OR UPDATE ON data_for_history.label FOR EACH ROW EXECUTE PROCEDURE warehouse.update_class_preview__on_label_upsert();


--
-- TOC entry 5662 (class 2620 OID 243984)
-- Name: class_profile_view after_insert_or_update; Type: TRIGGER; Schema: data_for_history; Owner: -
--

CREATE TRIGGER after_insert_or_update AFTER INSERT OR UPDATE ON data_for_history.class_profile_view FOR EACH ROW EXECUTE PROCEDURE warehouse.update_class_preview__on_class_profile_view_upsert();


--
-- TOC entry 5666 (class 2620 OID 241031)
-- Name: class create_entity_version_key; Type: TRIGGER; Schema: data_for_history; Owner: -
--

CREATE TRIGGER create_entity_version_key BEFORE INSERT ON data_for_history.class FOR EACH ROW EXECUTE PROCEDURE commons.create_entity_version_key();


--
-- TOC entry 5659 (class 2620 OID 241033)
-- Name: class_profile_view create_entity_version_key; Type: TRIGGER; Schema: data_for_history; Owner: -
--

CREATE TRIGGER create_entity_version_key BEFORE INSERT ON data_for_history.class_profile_view FOR EACH ROW EXECUTE PROCEDURE commons.create_entity_version_key();


--
-- TOC entry 5742 (class 2620 OID 241035)
-- Name: label create_entity_version_key; Type: TRIGGER; Schema: data_for_history; Owner: -
--

CREATE TRIGGER create_entity_version_key BEFORE INSERT ON data_for_history.label FOR EACH ROW EXECUTE PROCEDURE commons.create_entity_version_key();


--
-- TOC entry 5756 (class 2620 OID 241037)
-- Name: property create_entity_version_key; Type: TRIGGER; Schema: data_for_history; Owner: -
--

CREATE TRIGGER create_entity_version_key BEFORE INSERT ON data_for_history.property FOR EACH ROW EXECUTE PROCEDURE commons.create_entity_version_key();


--
-- TOC entry 5750 (class 2620 OID 241039)
-- Name: text_property create_entity_version_key; Type: TRIGGER; Schema: data_for_history; Owner: -
--

CREATE TRIGGER create_entity_version_key BEFORE INSERT ON data_for_history.text_property FOR EACH ROW EXECUTE PROCEDURE commons.create_entity_version_key();


--
-- TOC entry 5762 (class 2620 OID 241055)
-- Name: profile create_entity_version_key; Type: TRIGGER; Schema: data_for_history; Owner: -
--

CREATE TRIGGER create_entity_version_key BEFORE INSERT ON data_for_history.profile FOR EACH ROW EXECUTE PROCEDURE commons.create_entity_version_key();


--
-- TOC entry 5768 (class 2620 OID 241076)
-- Name: property_profile_view create_entity_version_key; Type: TRIGGER; Schema: data_for_history; Owner: -
--

CREATE TRIGGER create_entity_version_key BEFORE INSERT ON data_for_history.property_profile_view FOR EACH ROW EXECUTE PROCEDURE commons.create_entity_version_key();


--
-- TOC entry 5774 (class 2620 OID 241098)
-- Name: associates_system_type create_entity_version_key; Type: TRIGGER; Schema: data_for_history; Owner: -
--

CREATE TRIGGER create_entity_version_key BEFORE INSERT ON data_for_history.associates_system_type FOR EACH ROW EXECUTE PROCEDURE commons.create_entity_version_key();


--
-- TOC entry 5780 (class 2620 OID 241166)
-- Name: system_type create_entity_version_key; Type: TRIGGER; Schema: data_for_history; Owner: -
--

CREATE TRIGGER create_entity_version_key BEFORE INSERT ON data_for_history.system_type FOR EACH ROW EXECUTE PROCEDURE commons.create_entity_version_key();


--
-- TOC entry 5656 (class 2620 OID 240213)
-- Name: class_profile_view creation_tmsp; Type: TRIGGER; Schema: data_for_history; Owner: -
--

CREATE TRIGGER creation_tmsp BEFORE INSERT ON data_for_history.class_profile_view FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_creation();


--
-- TOC entry 5663 (class 2620 OID 240234)
-- Name: class creation_tmsp; Type: TRIGGER; Schema: data_for_history; Owner: -
--

CREATE TRIGGER creation_tmsp BEFORE INSERT ON data_for_history.class FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_creation();


--
-- TOC entry 5739 (class 2620 OID 240854)
-- Name: label creation_tmsp; Type: TRIGGER; Schema: data_for_history; Owner: -
--

CREATE TRIGGER creation_tmsp BEFORE INSERT ON data_for_history.label FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_creation();


--
-- TOC entry 5747 (class 2620 OID 240873)
-- Name: text_property creation_tmsp; Type: TRIGGER; Schema: data_for_history; Owner: -
--

CREATE TRIGGER creation_tmsp BEFORE INSERT ON data_for_history.text_property FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_creation();


--
-- TOC entry 5753 (class 2620 OID 240892)
-- Name: property creation_tmsp; Type: TRIGGER; Schema: data_for_history; Owner: -
--

CREATE TRIGGER creation_tmsp BEFORE INSERT ON data_for_history.property FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_creation();


--
-- TOC entry 5759 (class 2620 OID 241052)
-- Name: profile creation_tmsp; Type: TRIGGER; Schema: data_for_history; Owner: -
--

CREATE TRIGGER creation_tmsp BEFORE INSERT ON data_for_history.profile FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_creation();


--
-- TOC entry 5765 (class 2620 OID 241073)
-- Name: property_profile_view creation_tmsp; Type: TRIGGER; Schema: data_for_history; Owner: -
--

CREATE TRIGGER creation_tmsp BEFORE INSERT ON data_for_history.property_profile_view FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_creation();


--
-- TOC entry 5771 (class 2620 OID 241095)
-- Name: associates_system_type creation_tmsp; Type: TRIGGER; Schema: data_for_history; Owner: -
--

CREATE TRIGGER creation_tmsp BEFORE INSERT ON data_for_history.associates_system_type FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_creation();


--
-- TOC entry 5777 (class 2620 OID 241163)
-- Name: system_type creation_tmsp; Type: TRIGGER; Schema: data_for_history; Owner: -
--

CREATE TRIGGER creation_tmsp BEFORE INSERT ON data_for_history.system_type FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_creation();


--
-- TOC entry 5658 (class 2620 OID 240215)
-- Name: class_profile_view insert_schema_table_name; Type: TRIGGER; Schema: data_for_history; Owner: -
--

CREATE TRIGGER insert_schema_table_name BEFORE INSERT ON data_for_history.class_profile_view FOR EACH ROW EXECUTE PROCEDURE commons.insert_schema_table_name();


--
-- TOC entry 5665 (class 2620 OID 240236)
-- Name: class insert_schema_table_name; Type: TRIGGER; Schema: data_for_history; Owner: -
--

CREATE TRIGGER insert_schema_table_name BEFORE INSERT ON data_for_history.class FOR EACH ROW EXECUTE PROCEDURE commons.insert_schema_table_name();


--
-- TOC entry 5741 (class 2620 OID 240856)
-- Name: label insert_schema_table_name; Type: TRIGGER; Schema: data_for_history; Owner: -
--

CREATE TRIGGER insert_schema_table_name BEFORE INSERT ON data_for_history.label FOR EACH ROW EXECUTE PROCEDURE commons.insert_schema_table_name();


--
-- TOC entry 5749 (class 2620 OID 240875)
-- Name: text_property insert_schema_table_name; Type: TRIGGER; Schema: data_for_history; Owner: -
--

CREATE TRIGGER insert_schema_table_name BEFORE INSERT ON data_for_history.text_property FOR EACH ROW EXECUTE PROCEDURE commons.insert_schema_table_name();


--
-- TOC entry 5755 (class 2620 OID 240894)
-- Name: property insert_schema_table_name; Type: TRIGGER; Schema: data_for_history; Owner: -
--

CREATE TRIGGER insert_schema_table_name BEFORE INSERT ON data_for_history.property FOR EACH ROW EXECUTE PROCEDURE commons.insert_schema_table_name();


--
-- TOC entry 5761 (class 2620 OID 241054)
-- Name: profile insert_schema_table_name; Type: TRIGGER; Schema: data_for_history; Owner: -
--

CREATE TRIGGER insert_schema_table_name BEFORE INSERT ON data_for_history.profile FOR EACH ROW EXECUTE PROCEDURE commons.insert_schema_table_name();


--
-- TOC entry 5767 (class 2620 OID 241075)
-- Name: property_profile_view insert_schema_table_name; Type: TRIGGER; Schema: data_for_history; Owner: -
--

CREATE TRIGGER insert_schema_table_name BEFORE INSERT ON data_for_history.property_profile_view FOR EACH ROW EXECUTE PROCEDURE commons.insert_schema_table_name();


--
-- TOC entry 5773 (class 2620 OID 241097)
-- Name: associates_system_type insert_schema_table_name; Type: TRIGGER; Schema: data_for_history; Owner: -
--

CREATE TRIGGER insert_schema_table_name BEFORE INSERT ON data_for_history.associates_system_type FOR EACH ROW EXECUTE PROCEDURE commons.insert_schema_table_name();


--
-- TOC entry 5779 (class 2620 OID 241165)
-- Name: system_type insert_schema_table_name; Type: TRIGGER; Schema: data_for_history; Owner: -
--

CREATE TRIGGER insert_schema_table_name BEFORE INSERT ON data_for_history.system_type FOR EACH ROW EXECUTE PROCEDURE commons.insert_schema_table_name();


--
-- TOC entry 5657 (class 2620 OID 240214)
-- Name: class_profile_view last_modification_tmsp; Type: TRIGGER; Schema: data_for_history; Owner: -
--

CREATE TRIGGER last_modification_tmsp BEFORE INSERT OR UPDATE ON data_for_history.class_profile_view FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_last_modification();


--
-- TOC entry 5664 (class 2620 OID 240235)
-- Name: class last_modification_tmsp; Type: TRIGGER; Schema: data_for_history; Owner: -
--

CREATE TRIGGER last_modification_tmsp BEFORE INSERT OR UPDATE ON data_for_history.class FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_last_modification();


--
-- TOC entry 5740 (class 2620 OID 240855)
-- Name: label last_modification_tmsp; Type: TRIGGER; Schema: data_for_history; Owner: -
--

CREATE TRIGGER last_modification_tmsp BEFORE INSERT OR UPDATE ON data_for_history.label FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_last_modification();


--
-- TOC entry 5748 (class 2620 OID 240874)
-- Name: text_property last_modification_tmsp; Type: TRIGGER; Schema: data_for_history; Owner: -
--

CREATE TRIGGER last_modification_tmsp BEFORE INSERT OR UPDATE ON data_for_history.text_property FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_last_modification();


--
-- TOC entry 5754 (class 2620 OID 240893)
-- Name: property last_modification_tmsp; Type: TRIGGER; Schema: data_for_history; Owner: -
--

CREATE TRIGGER last_modification_tmsp BEFORE INSERT OR UPDATE ON data_for_history.property FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_last_modification();


--
-- TOC entry 5760 (class 2620 OID 241053)
-- Name: profile last_modification_tmsp; Type: TRIGGER; Schema: data_for_history; Owner: -
--

CREATE TRIGGER last_modification_tmsp BEFORE INSERT OR UPDATE ON data_for_history.profile FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_last_modification();


--
-- TOC entry 5766 (class 2620 OID 241074)
-- Name: property_profile_view last_modification_tmsp; Type: TRIGGER; Schema: data_for_history; Owner: -
--

CREATE TRIGGER last_modification_tmsp BEFORE INSERT OR UPDATE ON data_for_history.property_profile_view FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_last_modification();


--
-- TOC entry 5772 (class 2620 OID 241096)
-- Name: associates_system_type last_modification_tmsp; Type: TRIGGER; Schema: data_for_history; Owner: -
--

CREATE TRIGGER last_modification_tmsp BEFORE INSERT OR UPDATE ON data_for_history.associates_system_type FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_last_modification();


--
-- TOC entry 5778 (class 2620 OID 241164)
-- Name: system_type last_modification_tmsp; Type: TRIGGER; Schema: data_for_history; Owner: -
--

CREATE TRIGGER last_modification_tmsp BEFORE INSERT OR UPDATE ON data_for_history.system_type FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_last_modification();


--
-- TOC entry 5667 (class 2620 OID 241032)
-- Name: class update_entity_version_key; Type: TRIGGER; Schema: data_for_history; Owner: -
--

CREATE TRIGGER update_entity_version_key BEFORE UPDATE ON data_for_history.class FOR EACH ROW EXECUTE PROCEDURE commons.update_entity_version_key();


--
-- TOC entry 5660 (class 2620 OID 241034)
-- Name: class_profile_view update_entity_version_key; Type: TRIGGER; Schema: data_for_history; Owner: -
--

CREATE TRIGGER update_entity_version_key BEFORE UPDATE ON data_for_history.class_profile_view FOR EACH ROW EXECUTE PROCEDURE commons.update_entity_version_key();


--
-- TOC entry 5743 (class 2620 OID 241036)
-- Name: label update_entity_version_key; Type: TRIGGER; Schema: data_for_history; Owner: -
--

CREATE TRIGGER update_entity_version_key BEFORE UPDATE ON data_for_history.label FOR EACH ROW EXECUTE PROCEDURE commons.update_entity_version_key();


--
-- TOC entry 5757 (class 2620 OID 241038)
-- Name: property update_entity_version_key; Type: TRIGGER; Schema: data_for_history; Owner: -
--

CREATE TRIGGER update_entity_version_key BEFORE UPDATE ON data_for_history.property FOR EACH ROW EXECUTE PROCEDURE commons.update_entity_version_key();


--
-- TOC entry 5751 (class 2620 OID 241040)
-- Name: text_property update_entity_version_key; Type: TRIGGER; Schema: data_for_history; Owner: -
--

CREATE TRIGGER update_entity_version_key BEFORE UPDATE ON data_for_history.text_property FOR EACH ROW EXECUTE PROCEDURE commons.update_entity_version_key();


--
-- TOC entry 5763 (class 2620 OID 241056)
-- Name: profile update_entity_version_key; Type: TRIGGER; Schema: data_for_history; Owner: -
--

CREATE TRIGGER update_entity_version_key BEFORE UPDATE ON data_for_history.profile FOR EACH ROW EXECUTE PROCEDURE commons.update_entity_version_key();


--
-- TOC entry 5769 (class 2620 OID 241077)
-- Name: property_profile_view update_entity_version_key; Type: TRIGGER; Schema: data_for_history; Owner: -
--

CREATE TRIGGER update_entity_version_key BEFORE UPDATE ON data_for_history.property_profile_view FOR EACH ROW EXECUTE PROCEDURE commons.update_entity_version_key();


--
-- TOC entry 5775 (class 2620 OID 241099)
-- Name: associates_system_type update_entity_version_key; Type: TRIGGER; Schema: data_for_history; Owner: -
--

CREATE TRIGGER update_entity_version_key BEFORE UPDATE ON data_for_history.associates_system_type FOR EACH ROW EXECUTE PROCEDURE commons.update_entity_version_key();


--
-- TOC entry 5661 (class 2620 OID 243181)
-- Name: class_profile_view versioning_trigger; Type: TRIGGER; Schema: data_for_history; Owner: -
--

CREATE TRIGGER versioning_trigger BEFORE INSERT OR DELETE OR UPDATE ON data_for_history.class_profile_view FOR EACH ROW EXECUTE PROCEDURE public.versioning('sys_period', 'data_for_history.class_profile_view_vt', 'true');


--
-- TOC entry 5668 (class 2620 OID 243182)
-- Name: class versioning_trigger; Type: TRIGGER; Schema: data_for_history; Owner: -
--

CREATE TRIGGER versioning_trigger BEFORE INSERT OR DELETE OR UPDATE ON data_for_history.class FOR EACH ROW EXECUTE PROCEDURE public.versioning('sys_period', 'data_for_history.class_vt', 'true');


--
-- TOC entry 5744 (class 2620 OID 243183)
-- Name: label versioning_trigger; Type: TRIGGER; Schema: data_for_history; Owner: -
--

CREATE TRIGGER versioning_trigger BEFORE INSERT OR DELETE OR UPDATE ON data_for_history.label FOR EACH ROW EXECUTE PROCEDURE public.versioning('sys_period', 'data_for_history.label_vt', 'true');


--
-- TOC entry 5752 (class 2620 OID 243184)
-- Name: text_property versioning_trigger; Type: TRIGGER; Schema: data_for_history; Owner: -
--

CREATE TRIGGER versioning_trigger BEFORE INSERT OR DELETE OR UPDATE ON data_for_history.text_property FOR EACH ROW EXECUTE PROCEDURE public.versioning('sys_period', 'data_for_history.text_property_vt', 'true');


--
-- TOC entry 5758 (class 2620 OID 243185)
-- Name: property versioning_trigger; Type: TRIGGER; Schema: data_for_history; Owner: -
--

CREATE TRIGGER versioning_trigger BEFORE INSERT OR DELETE OR UPDATE ON data_for_history.property FOR EACH ROW EXECUTE PROCEDURE public.versioning('sys_period', 'data_for_history.property_vt', 'true');


--
-- TOC entry 5764 (class 2620 OID 243186)
-- Name: profile versioning_trigger; Type: TRIGGER; Schema: data_for_history; Owner: -
--

CREATE TRIGGER versioning_trigger BEFORE INSERT OR DELETE OR UPDATE ON data_for_history.profile FOR EACH ROW EXECUTE PROCEDURE public.versioning('sys_period', 'data_for_history.profile_vt', 'true');


--
-- TOC entry 5770 (class 2620 OID 243187)
-- Name: property_profile_view versioning_trigger; Type: TRIGGER; Schema: data_for_history; Owner: -
--

CREATE TRIGGER versioning_trigger BEFORE INSERT OR DELETE OR UPDATE ON data_for_history.property_profile_view FOR EACH ROW EXECUTE PROCEDURE public.versioning('sys_period', 'data_for_history.property_profile_view_vt', 'true');


--
-- TOC entry 5776 (class 2620 OID 243188)
-- Name: associates_system_type versioning_trigger; Type: TRIGGER; Schema: data_for_history; Owner: -
--

CREATE TRIGGER versioning_trigger BEFORE INSERT OR DELETE OR UPDATE ON data_for_history.associates_system_type FOR EACH ROW EXECUTE PROCEDURE public.versioning('sys_period', 'data_for_history.associates_system_type_vt', 'true');


--
-- TOC entry 5781 (class 2620 OID 243189)
-- Name: system_type versioning_trigger; Type: TRIGGER; Schema: data_for_history; Owner: -
--

CREATE TRIGGER versioning_trigger BEFORE INSERT OR DELETE OR UPDATE ON data_for_history.system_type FOR EACH ROW EXECUTE PROCEDURE public.versioning('sys_period', 'data_for_history.system_type_vt', 'true');


--
-- TOC entry 5890 (class 2620 OID 245237)
-- Name: v_text_property _01_sync_quill_doc_and_string; Type: TRIGGER; Schema: information; Owner: -
--

CREATE TRIGGER _01_sync_quill_doc_and_string INSTEAD OF INSERT ON information.v_text_property FOR EACH ROW EXECUTE PROCEDURE commons.text__sync_quill_doc_and_string();


--
-- TOC entry 5892 (class 2620 OID 245268)
-- Name: v_appellation _01_sync_quill_doc_and_string; Type: TRIGGER; Schema: information; Owner: -
--

CREATE TRIGGER _01_sync_quill_doc_and_string INSTEAD OF INSERT ON information.v_appellation FOR EACH ROW EXECUTE PROCEDURE commons.text__sync_quill_doc_and_string();


--
-- TOC entry 5891 (class 2620 OID 245238)
-- Name: v_text_property _02_find_or_create; Type: TRIGGER; Schema: information; Owner: -
--

CREATE TRIGGER _02_find_or_create INSTEAD OF INSERT ON information.v_text_property FOR EACH ROW EXECUTE PROCEDURE information.v_text_property_find_or_create();


--
-- TOC entry 5893 (class 2620 OID 245269)
-- Name: v_appellation _02_find_or_create; Type: TRIGGER; Schema: information; Owner: -
--

CREATE TRIGGER _02_find_or_create INSTEAD OF INSERT ON information.v_appellation FOR EACH ROW EXECUTE PROCEDURE information.v_appellation_find_or_create();


--
-- TOC entry 5832 (class 2620 OID 245138)
-- Name: _deprecated_type_namespace_rel create_entity_version_key; Type: TRIGGER; Schema: information; Owner: -
--

CREATE TRIGGER create_entity_version_key BEFORE INSERT ON information._deprecated_type_namespace_rel FOR EACH ROW EXECUTE PROCEDURE commons.create_entity_version_key();


--
-- TOC entry 5826 (class 2620 OID 245141)
-- Name: _deprecated_namespace create_entity_version_key; Type: TRIGGER; Schema: information; Owner: -
--

CREATE TRIGGER create_entity_version_key BEFORE INSERT ON information._deprecated_namespace FOR EACH ROW EXECUTE PROCEDURE commons.create_entity_version_key();


--
-- TOC entry 5721 (class 2620 OID 245154)
-- Name: text_property create_entity_version_key; Type: TRIGGER; Schema: information; Owner: -
--

CREATE TRIGGER create_entity_version_key BEFORE INSERT ON information.text_property FOR EACH ROW EXECUTE PROCEDURE commons.create_entity_version_key();


--
-- TOC entry 5698 (class 2620 OID 245195)
-- Name: appellation create_entity_version_key; Type: TRIGGER; Schema: information; Owner: -
--

CREATE TRIGGER create_entity_version_key BEFORE INSERT ON information.appellation FOR EACH ROW EXECUTE PROCEDURE commons.create_entity_version_key();


--
-- TOC entry 5992 (class 2620 OID 246074)
-- Name: property_of_property create_entity_version_key; Type: TRIGGER; Schema: information; Owner: -
--

CREATE TRIGGER create_entity_version_key BEFORE INSERT ON information.property_of_property FOR EACH ROW EXECUTE PROCEDURE commons.create_entity_version_key();


--
-- TOC entry 5701 (class 2620 OID 240532)
-- Name: appellation creation_tmsp; Type: TRIGGER; Schema: information; Owner: -
--

CREATE TRIGGER creation_tmsp BEFORE INSERT ON information.appellation FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_creation();


--
-- TOC entry 5704 (class 2620 OID 240589)
-- Name: entity_association creation_tmsp; Type: TRIGGER; Schema: information; Owner: -
--

CREATE TRIGGER creation_tmsp BEFORE INSERT ON information.entity_association FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_creation();


--
-- TOC entry 5708 (class 2620 OID 240620)
-- Name: persistent_item creation_tmsp; Type: TRIGGER; Schema: information; Owner: -
--

CREATE TRIGGER creation_tmsp BEFORE INSERT ON information.persistent_item FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_creation();


--
-- TOC entry 5712 (class 2620 OID 240651)
-- Name: role creation_tmsp; Type: TRIGGER; Schema: information; Owner: -
--

CREATE TRIGGER creation_tmsp BEFORE INSERT ON information.role FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_creation();


--
-- TOC entry 5716 (class 2620 OID 240708)
-- Name: temporal_entity creation_tmsp; Type: TRIGGER; Schema: information; Owner: -
--

CREATE TRIGGER creation_tmsp BEFORE INSERT ON information.temporal_entity FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_creation();


--
-- TOC entry 5724 (class 2620 OID 240734)
-- Name: text_property creation_tmsp; Type: TRIGGER; Schema: information; Owner: -
--

CREATE TRIGGER creation_tmsp BEFORE INSERT ON information.text_property FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_creation();


--
-- TOC entry 5727 (class 2620 OID 240762)
-- Name: language creation_tmsp; Type: TRIGGER; Schema: information; Owner: -
--

CREATE TRIGGER creation_tmsp BEFORE INSERT ON information.language FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_creation();


--
-- TOC entry 5782 (class 2620 OID 241208)
-- Name: time_primitive creation_tmsp; Type: TRIGGER; Schema: information; Owner: -
--

CREATE TRIGGER creation_tmsp BEFORE INSERT ON information.time_primitive FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_creation();


--
-- TOC entry 5793 (class 2620 OID 242963)
-- Name: place creation_tmsp; Type: TRIGGER; Schema: information; Owner: -
--

CREATE TRIGGER creation_tmsp BEFORE INSERT ON information.place FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_creation();


--
-- TOC entry 5828 (class 2620 OID 243316)
-- Name: _deprecated_namespace creation_tmsp; Type: TRIGGER; Schema: information; Owner: -
--

CREATE TRIGGER creation_tmsp BEFORE INSERT ON information._deprecated_namespace FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_creation();


--
-- TOC entry 5834 (class 2620 OID 243347)
-- Name: _deprecated_type_namespace_rel creation_tmsp; Type: TRIGGER; Schema: information; Owner: -
--

CREATE TRIGGER creation_tmsp BEFORE INSERT ON information._deprecated_type_namespace_rel FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_creation();


--
-- TOC entry 5988 (class 2620 OID 246064)
-- Name: property_of_property creation_tmsp; Type: TRIGGER; Schema: information; Owner: -
--

CREATE TRIGGER creation_tmsp BEFORE INSERT ON information.property_of_property FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_creation();


--
-- TOC entry 5702 (class 2620 OID 240533)
-- Name: appellation insert_schema_table_name; Type: TRIGGER; Schema: information; Owner: -
--

CREATE TRIGGER insert_schema_table_name BEFORE INSERT ON information.appellation FOR EACH ROW EXECUTE PROCEDURE commons.insert_schema_table_name();


--
-- TOC entry 5705 (class 2620 OID 240590)
-- Name: entity_association insert_schema_table_name; Type: TRIGGER; Schema: information; Owner: -
--

CREATE TRIGGER insert_schema_table_name BEFORE INSERT ON information.entity_association FOR EACH ROW EXECUTE PROCEDURE commons.insert_schema_table_name();


--
-- TOC entry 5709 (class 2620 OID 240621)
-- Name: persistent_item insert_schema_table_name; Type: TRIGGER; Schema: information; Owner: -
--

CREATE TRIGGER insert_schema_table_name BEFORE INSERT ON information.persistent_item FOR EACH ROW EXECUTE PROCEDURE commons.insert_schema_table_name();


--
-- TOC entry 5713 (class 2620 OID 240652)
-- Name: role insert_schema_table_name; Type: TRIGGER; Schema: information; Owner: -
--

CREATE TRIGGER insert_schema_table_name BEFORE INSERT ON information.role FOR EACH ROW EXECUTE PROCEDURE commons.insert_schema_table_name();


--
-- TOC entry 5717 (class 2620 OID 240709)
-- Name: temporal_entity insert_schema_table_name; Type: TRIGGER; Schema: information; Owner: -
--

CREATE TRIGGER insert_schema_table_name BEFORE INSERT ON information.temporal_entity FOR EACH ROW EXECUTE PROCEDURE commons.insert_schema_table_name();


--
-- TOC entry 5725 (class 2620 OID 240735)
-- Name: text_property insert_schema_table_name; Type: TRIGGER; Schema: information; Owner: -
--

CREATE TRIGGER insert_schema_table_name BEFORE INSERT ON information.text_property FOR EACH ROW EXECUTE PROCEDURE commons.insert_schema_table_name();


--
-- TOC entry 5729 (class 2620 OID 240764)
-- Name: language insert_schema_table_name; Type: TRIGGER; Schema: information; Owner: -
--

CREATE TRIGGER insert_schema_table_name BEFORE INSERT ON information.language FOR EACH ROW EXECUTE PROCEDURE commons.insert_schema_table_name();


--
-- TOC entry 5783 (class 2620 OID 241209)
-- Name: time_primitive insert_schema_table_name; Type: TRIGGER; Schema: information; Owner: -
--

CREATE TRIGGER insert_schema_table_name BEFORE INSERT ON information.time_primitive FOR EACH ROW EXECUTE PROCEDURE commons.insert_schema_table_name();


--
-- TOC entry 5794 (class 2620 OID 242964)
-- Name: place insert_schema_table_name; Type: TRIGGER; Schema: information; Owner: -
--

CREATE TRIGGER insert_schema_table_name BEFORE INSERT ON information.place FOR EACH ROW EXECUTE PROCEDURE commons.insert_schema_table_name();


--
-- TOC entry 5830 (class 2620 OID 243318)
-- Name: _deprecated_namespace insert_schema_table_name; Type: TRIGGER; Schema: information; Owner: -
--

CREATE TRIGGER insert_schema_table_name BEFORE INSERT ON information._deprecated_namespace FOR EACH ROW EXECUTE PROCEDURE commons.insert_schema_table_name();


--
-- TOC entry 5836 (class 2620 OID 243349)
-- Name: _deprecated_type_namespace_rel insert_schema_table_name; Type: TRIGGER; Schema: information; Owner: -
--

CREATE TRIGGER insert_schema_table_name BEFORE INSERT ON information._deprecated_type_namespace_rel FOR EACH ROW EXECUTE PROCEDURE commons.insert_schema_table_name();


--
-- TOC entry 5989 (class 2620 OID 246065)
-- Name: property_of_property insert_schema_table_name; Type: TRIGGER; Schema: information; Owner: -
--

CREATE TRIGGER insert_schema_table_name BEFORE INSERT ON information.property_of_property FOR EACH ROW EXECUTE PROCEDURE commons.insert_schema_table_name();


--
-- TOC entry 5703 (class 2620 OID 240534)
-- Name: appellation last_modification_tmsp; Type: TRIGGER; Schema: information; Owner: -
--

CREATE TRIGGER last_modification_tmsp BEFORE INSERT OR UPDATE ON information.appellation FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_last_modification();


--
-- TOC entry 5706 (class 2620 OID 240591)
-- Name: entity_association last_modification_tmsp; Type: TRIGGER; Schema: information; Owner: -
--

CREATE TRIGGER last_modification_tmsp BEFORE INSERT OR UPDATE ON information.entity_association FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_last_modification();


--
-- TOC entry 5710 (class 2620 OID 240622)
-- Name: persistent_item last_modification_tmsp; Type: TRIGGER; Schema: information; Owner: -
--

CREATE TRIGGER last_modification_tmsp BEFORE INSERT OR UPDATE ON information.persistent_item FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_last_modification();


--
-- TOC entry 5714 (class 2620 OID 240653)
-- Name: role last_modification_tmsp; Type: TRIGGER; Schema: information; Owner: -
--

CREATE TRIGGER last_modification_tmsp BEFORE INSERT OR UPDATE ON information.role FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_last_modification();


--
-- TOC entry 5718 (class 2620 OID 240710)
-- Name: temporal_entity last_modification_tmsp; Type: TRIGGER; Schema: information; Owner: -
--

CREATE TRIGGER last_modification_tmsp BEFORE INSERT OR UPDATE ON information.temporal_entity FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_last_modification();


--
-- TOC entry 5726 (class 2620 OID 240736)
-- Name: text_property last_modification_tmsp; Type: TRIGGER; Schema: information; Owner: -
--

CREATE TRIGGER last_modification_tmsp BEFORE INSERT OR UPDATE ON information.text_property FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_last_modification();


--
-- TOC entry 5728 (class 2620 OID 240763)
-- Name: language last_modification_tmsp; Type: TRIGGER; Schema: information; Owner: -
--

CREATE TRIGGER last_modification_tmsp BEFORE INSERT OR UPDATE ON information.language FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_last_modification();


--
-- TOC entry 5784 (class 2620 OID 241210)
-- Name: time_primitive last_modification_tmsp; Type: TRIGGER; Schema: information; Owner: -
--

CREATE TRIGGER last_modification_tmsp BEFORE INSERT OR UPDATE ON information.time_primitive FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_last_modification();


--
-- TOC entry 5795 (class 2620 OID 242965)
-- Name: place last_modification_tmsp; Type: TRIGGER; Schema: information; Owner: -
--

CREATE TRIGGER last_modification_tmsp BEFORE INSERT OR UPDATE ON information.place FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_last_modification();


--
-- TOC entry 5829 (class 2620 OID 243317)
-- Name: _deprecated_namespace last_modification_tmsp; Type: TRIGGER; Schema: information; Owner: -
--

CREATE TRIGGER last_modification_tmsp BEFORE INSERT OR UPDATE ON information._deprecated_namespace FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_last_modification();


--
-- TOC entry 5835 (class 2620 OID 243348)
-- Name: _deprecated_type_namespace_rel last_modification_tmsp; Type: TRIGGER; Schema: information; Owner: -
--

CREATE TRIGGER last_modification_tmsp BEFORE INSERT OR UPDATE ON information._deprecated_type_namespace_rel FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_last_modification();


--
-- TOC entry 5990 (class 2620 OID 246066)
-- Name: property_of_property last_modification_tmsp; Type: TRIGGER; Schema: information; Owner: -
--

CREATE TRIGGER last_modification_tmsp BEFORE INSERT OR UPDATE ON information.property_of_property FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_last_modification();


--
-- TOC entry 5815 (class 2620 OID 243077)
-- Name: v_time_primitive on_insert; Type: TRIGGER; Schema: information; Owner: -
--

CREATE TRIGGER on_insert INSTEAD OF INSERT ON information.v_time_primitive FOR EACH ROW EXECUTE PROCEDURE information.v_time_primitive_find_or_create();


--
-- TOC entry 5816 (class 2620 OID 243084)
-- Name: v_role on_insert; Type: TRIGGER; Schema: information; Owner: -
--

CREATE TRIGGER on_insert INSTEAD OF INSERT ON information.v_role FOR EACH ROW EXECUTE PROCEDURE information.v_role_find_or_create();


--
-- TOC entry 5817 (class 2620 OID 243097)
-- Name: v_language on_insert; Type: TRIGGER; Schema: information; Owner: -
--

CREATE TRIGGER on_insert INSTEAD OF INSERT ON information.v_language FOR EACH ROW EXECUTE PROCEDURE information.v_language_find_or_create();


--
-- TOC entry 5818 (class 2620 OID 243115)
-- Name: v_place on_insert; Type: TRIGGER; Schema: information; Owner: -
--

CREATE TRIGGER on_insert INSTEAD OF INSERT ON information.v_place FOR EACH ROW EXECUTE PROCEDURE information.v_place_find_or_create();


--
-- TOC entry 5889 (class 2620 OID 245152)
-- Name: v_temporal_entity on_insert; Type: TRIGGER; Schema: information; Owner: -
--

CREATE TRIGGER on_insert INSTEAD OF INSERT ON information.v_temporal_entity FOR EACH ROW EXECUTE PROCEDURE information.v_temporal_entity_find_or_create();


--
-- TOC entry 5987 (class 2620 OID 246037)
-- Name: v_entity_association on_insert; Type: TRIGGER; Schema: information; Owner: -
--

CREATE TRIGGER on_insert INSTEAD OF INSERT ON information.v_entity_association FOR EACH ROW EXECUTE PROCEDURE information.v_entity_association_find_or_create();


--
-- TOC entry 5994 (class 2620 OID 246081)
-- Name: v_property_of_property on_insert; Type: TRIGGER; Schema: information; Owner: -
--

CREATE TRIGGER on_insert INSTEAD OF INSERT ON information.v_property_of_property FOR EACH ROW EXECUTE PROCEDURE information.v_property_of_property_find_or_create();


--
-- TOC entry 5723 (class 2620 OID 245190)
-- Name: text_property sync_quill_doc_and_string; Type: TRIGGER; Schema: information; Owner: -
--

CREATE TRIGGER sync_quill_doc_and_string BEFORE INSERT OR UPDATE ON information.text_property FOR EACH ROW EXECUTE PROCEDURE commons.text__sync_quill_doc_and_string();


--
-- TOC entry 5700 (class 2620 OID 245231)
-- Name: appellation sync_quill_doc_and_string; Type: TRIGGER; Schema: information; Owner: -
--

CREATE TRIGGER sync_quill_doc_and_string BEFORE INSERT OR UPDATE ON information.appellation FOR EACH ROW EXECUTE PROCEDURE commons.text__sync_quill_doc_and_string();


--
-- TOC entry 5833 (class 2620 OID 245139)
-- Name: _deprecated_type_namespace_rel update_entity_version_key; Type: TRIGGER; Schema: information; Owner: -
--

CREATE TRIGGER update_entity_version_key BEFORE UPDATE ON information._deprecated_type_namespace_rel FOR EACH ROW EXECUTE PROCEDURE commons.update_entity_version_key();


--
-- TOC entry 5827 (class 2620 OID 245142)
-- Name: _deprecated_namespace update_entity_version_key; Type: TRIGGER; Schema: information; Owner: -
--

CREATE TRIGGER update_entity_version_key BEFORE UPDATE ON information._deprecated_namespace FOR EACH ROW EXECUTE PROCEDURE commons.update_entity_version_key();


--
-- TOC entry 5722 (class 2620 OID 245155)
-- Name: text_property update_entity_version_key; Type: TRIGGER; Schema: information; Owner: -
--

CREATE TRIGGER update_entity_version_key BEFORE UPDATE ON information.text_property FOR EACH ROW EXECUTE PROCEDURE commons.update_entity_version_key();


--
-- TOC entry 5699 (class 2620 OID 245196)
-- Name: appellation update_entity_version_key; Type: TRIGGER; Schema: information; Owner: -
--

CREATE TRIGGER update_entity_version_key BEFORE UPDATE ON information.appellation FOR EACH ROW EXECUTE PROCEDURE commons.update_entity_version_key();


--
-- TOC entry 5993 (class 2620 OID 246075)
-- Name: property_of_property update_entity_version_key; Type: TRIGGER; Schema: information; Owner: -
--

CREATE TRIGGER update_entity_version_key BEFORE UPDATE ON information.property_of_property FOR EACH ROW EXECUTE PROCEDURE commons.update_entity_version_key();


--
-- TOC entry 5707 (class 2620 OID 243192)
-- Name: entity_association versioning_trigger; Type: TRIGGER; Schema: information; Owner: -
--

CREATE TRIGGER versioning_trigger BEFORE INSERT OR DELETE OR UPDATE ON information.entity_association FOR EACH ROW EXECUTE PROCEDURE public.versioning('sys_period', 'information.entity_association_vt', 'true');


--
-- TOC entry 5730 (class 2620 OID 243193)
-- Name: language versioning_trigger; Type: TRIGGER; Schema: information; Owner: -
--

CREATE TRIGGER versioning_trigger BEFORE INSERT OR DELETE OR UPDATE ON information.language FOR EACH ROW EXECUTE PROCEDURE public.versioning('sys_period', 'information.language_vt', 'true');


--
-- TOC entry 5711 (class 2620 OID 243194)
-- Name: persistent_item versioning_trigger; Type: TRIGGER; Schema: information; Owner: -
--

CREATE TRIGGER versioning_trigger BEFORE INSERT OR DELETE OR UPDATE ON information.persistent_item FOR EACH ROW EXECUTE PROCEDURE public.versioning('sys_period', 'information.persistent_item_vt', 'true');


--
-- TOC entry 5715 (class 2620 OID 243195)
-- Name: role versioning_trigger; Type: TRIGGER; Schema: information; Owner: -
--

CREATE TRIGGER versioning_trigger BEFORE INSERT OR DELETE OR UPDATE ON information.role FOR EACH ROW EXECUTE PROCEDURE public.versioning('sys_period', 'information.role_vt', 'true');


--
-- TOC entry 5719 (class 2620 OID 243197)
-- Name: temporal_entity versioning_trigger; Type: TRIGGER; Schema: information; Owner: -
--

CREATE TRIGGER versioning_trigger BEFORE INSERT OR DELETE OR UPDATE ON information.temporal_entity FOR EACH ROW EXECUTE PROCEDURE public.versioning('sys_period', 'information.temporal_entity_vt', 'true');


--
-- TOC entry 5796 (class 2620 OID 243201)
-- Name: place versioning_trigger; Type: TRIGGER; Schema: information; Owner: -
--

CREATE TRIGGER versioning_trigger BEFORE INSERT OR DELETE OR UPDATE ON information.place FOR EACH ROW EXECUTE PROCEDURE public.versioning('sys_period', 'information.place_vt', 'true');


--
-- TOC entry 5785 (class 2620 OID 243202)
-- Name: time_primitive versioning_trigger; Type: TRIGGER; Schema: information; Owner: -
--

CREATE TRIGGER versioning_trigger BEFORE INSERT OR DELETE OR UPDATE ON information.time_primitive FOR EACH ROW EXECUTE PROCEDURE public.versioning('sys_period', 'information.time_primitive_vt', 'true');


--
-- TOC entry 5831 (class 2620 OID 245137)
-- Name: _deprecated_type_namespace_rel versioning_trigger; Type: TRIGGER; Schema: information; Owner: -
--

CREATE TRIGGER versioning_trigger BEFORE INSERT OR DELETE OR UPDATE ON information._deprecated_type_namespace_rel FOR EACH ROW EXECUTE PROCEDURE public.versioning('sys_period', 'information._deprecated_type_namespace_rel_vt', 'true');


--
-- TOC entry 5825 (class 2620 OID 245140)
-- Name: _deprecated_namespace versioning_trigger; Type: TRIGGER; Schema: information; Owner: -
--

CREATE TRIGGER versioning_trigger BEFORE INSERT OR DELETE OR UPDATE ON information._deprecated_namespace FOR EACH ROW EXECUTE PROCEDURE public.versioning('sys_period', 'information._deprecated_namespace_vt', 'true');


--
-- TOC entry 5720 (class 2620 OID 245153)
-- Name: text_property versioning_trigger; Type: TRIGGER; Schema: information; Owner: -
--

CREATE TRIGGER versioning_trigger BEFORE INSERT OR DELETE OR UPDATE ON information.text_property FOR EACH ROW EXECUTE PROCEDURE public.versioning('sys_period', 'information.text_property_vt', 'true');


--
-- TOC entry 5697 (class 2620 OID 245194)
-- Name: appellation versioning_trigger; Type: TRIGGER; Schema: information; Owner: -
--

CREATE TRIGGER versioning_trigger BEFORE INSERT OR DELETE OR UPDATE ON information.appellation FOR EACH ROW EXECUTE PROCEDURE public.versioning('sys_period', 'information.appellation_vt', 'true');


--
-- TOC entry 5991 (class 2620 OID 246073)
-- Name: property_of_property versioning_trigger; Type: TRIGGER; Schema: information; Owner: -
--

CREATE TRIGGER versioning_trigger BEFORE INSERT OR DELETE OR UPDATE ON information.property_of_property FOR EACH ROW EXECUTE PROCEDURE public.versioning('sys_period', 'information.property_of_property_vt', 'true');


--
-- TOC entry 5737 (class 2620 OID 244949)
-- Name: info_proj_rel after_epr_upsert; Type: TRIGGER; Schema: projects; Owner: -
--

CREATE TRIGGER after_epr_upsert AFTER INSERT OR UPDATE ON projects.info_proj_rel FOR EACH ROW EXECUTE PROCEDURE warehouse.entity_preview__upsert_entity_preview();


--
-- TOC entry 5848 (class 2620 OID 244803)
-- Name: argument create_entity_version_key; Type: TRIGGER; Schema: projects; Owner: -
--

CREATE TRIGGER create_entity_version_key BEFORE INSERT ON projects.argument FOR EACH ROW EXECUTE PROCEDURE commons.create_entity_version_key();


--
-- TOC entry 5679 (class 2620 OID 244809)
-- Name: project create_entity_version_key; Type: TRIGGER; Schema: projects; Owner: -
--

CREATE TRIGGER create_entity_version_key BEFORE INSERT ON projects.project FOR EACH ROW EXECUTE PROCEDURE commons.create_entity_version_key();


--
-- TOC entry 5654 (class 2620 OID 244815)
-- Name: language create_entity_version_key; Type: TRIGGER; Schema: projects; Owner: -
--

CREATE TRIGGER create_entity_version_key BEFORE INSERT ON projects.language FOR EACH ROW EXECUTE PROCEDURE commons.create_entity_version_key();


--
-- TOC entry 5691 (class 2620 OID 244827)
-- Name: text_property create_entity_version_key; Type: TRIGGER; Schema: projects; Owner: -
--

CREATE TRIGGER create_entity_version_key BEFORE INSERT ON projects.text_property FOR EACH ROW EXECUTE PROCEDURE commons.create_entity_version_key();


--
-- TOC entry 5673 (class 2620 OID 244883)
-- Name: _deprecated_label create_entity_version_key; Type: TRIGGER; Schema: projects; Owner: -
--

CREATE TRIGGER create_entity_version_key BEFORE INSERT ON projects._deprecated_label FOR EACH ROW EXECUTE PROCEDURE commons.create_entity_version_key();


--
-- TOC entry 5859 (class 2620 OID 244908)
-- Name: query create_entity_version_key; Type: TRIGGER; Schema: projects; Owner: -
--

CREATE TRIGGER create_entity_version_key BEFORE INSERT ON projects.query FOR EACH ROW EXECUTE PROCEDURE commons.create_entity_version_key();


--
-- TOC entry 5871 (class 2620 OID 244926)
-- Name: visual create_entity_version_key; Type: TRIGGER; Schema: projects; Owner: -
--

CREATE TRIGGER create_entity_version_key BEFORE INSERT ON projects.visual FOR EACH ROW EXECUTE PROCEDURE commons.create_entity_version_key();


--
-- TOC entry 5732 (class 2620 OID 244944)
-- Name: info_proj_rel create_entity_version_key; Type: TRIGGER; Schema: projects; Owner: -
--

CREATE TRIGGER create_entity_version_key BEFORE INSERT ON projects.info_proj_rel FOR EACH ROW EXECUTE PROCEDURE commons.create_entity_version_key();


--
-- TOC entry 5820 (class 2620 OID 244966)
-- Name: dfh_class_proj_rel create_entity_version_key; Type: TRIGGER; Schema: projects; Owner: -
--

CREATE TRIGGER create_entity_version_key BEFORE INSERT ON projects.dfh_class_proj_rel FOR EACH ROW EXECUTE PROCEDURE commons.create_entity_version_key();


--
-- TOC entry 5804 (class 2620 OID 245017)
-- Name: class_field_config create_entity_version_key; Type: TRIGGER; Schema: projects; Owner: -
--

CREATE TRIGGER create_entity_version_key BEFORE INSERT ON projects.class_field_config FOR EACH ROW EXECUTE PROCEDURE commons.create_entity_version_key();


--
-- TOC entry 5651 (class 2620 OID 240182)
-- Name: language creation_tmsp; Type: TRIGGER; Schema: projects; Owner: -
--

CREATE TRIGGER creation_tmsp BEFORE INSERT ON projects.language FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_creation();


--
-- TOC entry 5669 (class 2620 OID 240367)
-- Name: _deprecated_label creation_tmsp; Type: TRIGGER; Schema: projects; Owner: -
--

CREATE TRIGGER creation_tmsp BEFORE INSERT ON projects._deprecated_label FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_creation();


--
-- TOC entry 5675 (class 2620 OID 240406)
-- Name: project creation_tmsp; Type: TRIGGER; Schema: projects; Owner: -
--

CREATE TRIGGER creation_tmsp BEFORE INSERT ON projects.project FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_creation();


--
-- TOC entry 5687 (class 2620 OID 240459)
-- Name: text_property creation_tmsp; Type: TRIGGER; Schema: projects; Owner: -
--

CREATE TRIGGER creation_tmsp BEFORE INSERT ON projects.text_property FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_creation();


--
-- TOC entry 5844 (class 2620 OID 243957)
-- Name: argument creation_tmsp; Type: TRIGGER; Schema: projects; Owner: -
--

CREATE TRIGGER creation_tmsp BEFORE INSERT ON projects.argument FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_creation();


--
-- TOC entry 5861 (class 2620 OID 244910)
-- Name: query creation_tmsp; Type: TRIGGER; Schema: projects; Owner: -
--

CREATE TRIGGER creation_tmsp BEFORE INSERT ON projects.query FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_creation();


--
-- TOC entry 5873 (class 2620 OID 244928)
-- Name: visual creation_tmsp; Type: TRIGGER; Schema: projects; Owner: -
--

CREATE TRIGGER creation_tmsp BEFORE INSERT ON projects.visual FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_creation();


--
-- TOC entry 5734 (class 2620 OID 244946)
-- Name: info_proj_rel creation_tmsp; Type: TRIGGER; Schema: projects; Owner: -
--

CREATE TRIGGER creation_tmsp BEFORE INSERT ON projects.info_proj_rel FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_creation();


--
-- TOC entry 5822 (class 2620 OID 244968)
-- Name: dfh_class_proj_rel creation_tmsp; Type: TRIGGER; Schema: projects; Owner: -
--

CREATE TRIGGER creation_tmsp BEFORE INSERT ON projects.dfh_class_proj_rel FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_creation();


--
-- TOC entry 5806 (class 2620 OID 245019)
-- Name: class_field_config creation_tmsp; Type: TRIGGER; Schema: projects; Owner: -
--

CREATE TRIGGER creation_tmsp BEFORE INSERT ON projects.class_field_config FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_creation();


--
-- TOC entry 5670 (class 2620 OID 240368)
-- Name: _deprecated_label insert_schema_table_name; Type: TRIGGER; Schema: projects; Owner: -
--

CREATE TRIGGER insert_schema_table_name BEFORE INSERT ON projects._deprecated_label FOR EACH ROW EXECUTE PROCEDURE commons.insert_schema_table_name();


--
-- TOC entry 5676 (class 2620 OID 240407)
-- Name: project insert_schema_table_name; Type: TRIGGER; Schema: projects; Owner: -
--

CREATE TRIGGER insert_schema_table_name BEFORE INSERT ON projects.project FOR EACH ROW EXECUTE PROCEDURE commons.insert_schema_table_name();


--
-- TOC entry 5688 (class 2620 OID 240460)
-- Name: text_property insert_schema_table_name; Type: TRIGGER; Schema: projects; Owner: -
--

CREATE TRIGGER insert_schema_table_name BEFORE INSERT ON projects.text_property FOR EACH ROW EXECUTE PROCEDURE commons.insert_schema_table_name();


--
-- TOC entry 5845 (class 2620 OID 243958)
-- Name: argument insert_schema_table_name; Type: TRIGGER; Schema: projects; Owner: -
--

CREATE TRIGGER insert_schema_table_name BEFORE INSERT ON projects.argument FOR EACH ROW EXECUTE PROCEDURE commons.insert_schema_table_name();


--
-- TOC entry 5862 (class 2620 OID 244911)
-- Name: query insert_schema_table_name; Type: TRIGGER; Schema: projects; Owner: -
--

CREATE TRIGGER insert_schema_table_name BEFORE INSERT ON projects.query FOR EACH ROW EXECUTE PROCEDURE commons.insert_schema_table_name();


--
-- TOC entry 5874 (class 2620 OID 244929)
-- Name: visual insert_schema_table_name; Type: TRIGGER; Schema: projects; Owner: -
--

CREATE TRIGGER insert_schema_table_name BEFORE INSERT ON projects.visual FOR EACH ROW EXECUTE PROCEDURE commons.insert_schema_table_name();


--
-- TOC entry 5735 (class 2620 OID 244947)
-- Name: info_proj_rel insert_schema_table_name; Type: TRIGGER; Schema: projects; Owner: -
--

CREATE TRIGGER insert_schema_table_name BEFORE INSERT ON projects.info_proj_rel FOR EACH ROW EXECUTE PROCEDURE commons.insert_schema_table_name();


--
-- TOC entry 5823 (class 2620 OID 244969)
-- Name: dfh_class_proj_rel insert_schema_table_name; Type: TRIGGER; Schema: projects; Owner: -
--

CREATE TRIGGER insert_schema_table_name BEFORE INSERT ON projects.dfh_class_proj_rel FOR EACH ROW EXECUTE PROCEDURE commons.insert_schema_table_name();


--
-- TOC entry 5807 (class 2620 OID 245020)
-- Name: class_field_config insert_schema_table_name; Type: TRIGGER; Schema: projects; Owner: -
--

CREATE TRIGGER insert_schema_table_name BEFORE INSERT ON projects.class_field_config FOR EACH ROW EXECUTE PROCEDURE commons.insert_schema_table_name();


--
-- TOC entry 5652 (class 2620 OID 240183)
-- Name: language last_modification_tmsp; Type: TRIGGER; Schema: projects; Owner: -
--

CREATE TRIGGER last_modification_tmsp BEFORE INSERT OR UPDATE ON projects.language FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_last_modification();


--
-- TOC entry 5671 (class 2620 OID 240369)
-- Name: _deprecated_label last_modification_tmsp; Type: TRIGGER; Schema: projects; Owner: -
--

CREATE TRIGGER last_modification_tmsp BEFORE INSERT OR UPDATE ON projects._deprecated_label FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_last_modification();


--
-- TOC entry 5677 (class 2620 OID 240408)
-- Name: project last_modification_tmsp; Type: TRIGGER; Schema: projects; Owner: -
--

CREATE TRIGGER last_modification_tmsp BEFORE INSERT OR UPDATE ON projects.project FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_last_modification();


--
-- TOC entry 5689 (class 2620 OID 240461)
-- Name: text_property last_modification_tmsp; Type: TRIGGER; Schema: projects; Owner: -
--

CREATE TRIGGER last_modification_tmsp BEFORE INSERT OR UPDATE ON projects.text_property FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_last_modification();


--
-- TOC entry 5846 (class 2620 OID 243959)
-- Name: argument last_modification_tmsp; Type: TRIGGER; Schema: projects; Owner: -
--

CREATE TRIGGER last_modification_tmsp BEFORE INSERT OR UPDATE ON projects.argument FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_last_modification();


--
-- TOC entry 5863 (class 2620 OID 244912)
-- Name: query last_modification_tmsp; Type: TRIGGER; Schema: projects; Owner: -
--

CREATE TRIGGER last_modification_tmsp BEFORE INSERT OR UPDATE ON projects.query FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_last_modification();


--
-- TOC entry 5875 (class 2620 OID 244930)
-- Name: visual last_modification_tmsp; Type: TRIGGER; Schema: projects; Owner: -
--

CREATE TRIGGER last_modification_tmsp BEFORE INSERT OR UPDATE ON projects.visual FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_last_modification();


--
-- TOC entry 5736 (class 2620 OID 244948)
-- Name: info_proj_rel last_modification_tmsp; Type: TRIGGER; Schema: projects; Owner: -
--

CREATE TRIGGER last_modification_tmsp BEFORE INSERT OR UPDATE ON projects.info_proj_rel FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_last_modification();


--
-- TOC entry 5824 (class 2620 OID 244970)
-- Name: dfh_class_proj_rel last_modification_tmsp; Type: TRIGGER; Schema: projects; Owner: -
--

CREATE TRIGGER last_modification_tmsp BEFORE INSERT OR UPDATE ON projects.dfh_class_proj_rel FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_last_modification();


--
-- TOC entry 5808 (class 2620 OID 245021)
-- Name: class_field_config last_modification_tmsp; Type: TRIGGER; Schema: projects; Owner: -
--

CREATE TRIGGER last_modification_tmsp BEFORE INSERT OR UPDATE ON projects.class_field_config FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_last_modification();


--
-- TOC entry 5843 (class 2620 OID 243430)
-- Name: v_info_proj_rel on_insert; Type: TRIGGER; Schema: projects; Owner: -
--

CREATE TRIGGER on_insert INSTEAD OF INSERT ON projects.v_info_proj_rel FOR EACH ROW EXECUTE PROCEDURE projects.v_info_proj_rel_update_or_creat();


--
-- TOC entry 5738 (class 2620 OID 244950)
-- Name: info_proj_rel on_upsert; Type: TRIGGER; Schema: projects; Owner: -
--

CREATE TRIGGER on_upsert BEFORE INSERT OR UPDATE ON projects.info_proj_rel FOR EACH ROW EXECUTE PROCEDURE commons.evpr_fk_entity_fk_entity_version();


--
-- TOC entry 5693 (class 2620 OID 244863)
-- Name: text_property sync_quill_doc_and_string; Type: TRIGGER; Schema: projects; Owner: -
--

CREATE TRIGGER sync_quill_doc_and_string BEFORE INSERT OR UPDATE ON projects.text_property FOR EACH ROW EXECUTE PROCEDURE commons.text__sync_quill_doc_and_string();


--
-- TOC entry 5849 (class 2620 OID 244804)
-- Name: argument update_entity_version_key; Type: TRIGGER; Schema: projects; Owner: -
--

CREATE TRIGGER update_entity_version_key BEFORE UPDATE ON projects.argument FOR EACH ROW EXECUTE PROCEDURE commons.update_entity_version_key();


--
-- TOC entry 5680 (class 2620 OID 244810)
-- Name: project update_entity_version_key; Type: TRIGGER; Schema: projects; Owner: -
--

CREATE TRIGGER update_entity_version_key BEFORE UPDATE ON projects.project FOR EACH ROW EXECUTE PROCEDURE commons.update_entity_version_key();


--
-- TOC entry 5655 (class 2620 OID 244816)
-- Name: language update_entity_version_key; Type: TRIGGER; Schema: projects; Owner: -
--

CREATE TRIGGER update_entity_version_key BEFORE UPDATE ON projects.language FOR EACH ROW EXECUTE PROCEDURE commons.update_entity_version_key();


--
-- TOC entry 5692 (class 2620 OID 244828)
-- Name: text_property update_entity_version_key; Type: TRIGGER; Schema: projects; Owner: -
--

CREATE TRIGGER update_entity_version_key BEFORE UPDATE ON projects.text_property FOR EACH ROW EXECUTE PROCEDURE commons.update_entity_version_key();


--
-- TOC entry 5674 (class 2620 OID 244884)
-- Name: _deprecated_label update_entity_version_key; Type: TRIGGER; Schema: projects; Owner: -
--

CREATE TRIGGER update_entity_version_key BEFORE UPDATE ON projects._deprecated_label FOR EACH ROW EXECUTE PROCEDURE commons.update_entity_version_key();


--
-- TOC entry 5860 (class 2620 OID 244909)
-- Name: query update_entity_version_key; Type: TRIGGER; Schema: projects; Owner: -
--

CREATE TRIGGER update_entity_version_key BEFORE UPDATE ON projects.query FOR EACH ROW EXECUTE PROCEDURE commons.update_entity_version_key();


--
-- TOC entry 5872 (class 2620 OID 244927)
-- Name: visual update_entity_version_key; Type: TRIGGER; Schema: projects; Owner: -
--

CREATE TRIGGER update_entity_version_key BEFORE UPDATE ON projects.visual FOR EACH ROW EXECUTE PROCEDURE commons.update_entity_version_key();


--
-- TOC entry 5733 (class 2620 OID 244945)
-- Name: info_proj_rel update_entity_version_key; Type: TRIGGER; Schema: projects; Owner: -
--

CREATE TRIGGER update_entity_version_key BEFORE UPDATE ON projects.info_proj_rel FOR EACH ROW EXECUTE PROCEDURE commons.update_entity_version_key();


--
-- TOC entry 5821 (class 2620 OID 244967)
-- Name: dfh_class_proj_rel update_entity_version_key; Type: TRIGGER; Schema: projects; Owner: -
--

CREATE TRIGGER update_entity_version_key BEFORE UPDATE ON projects.dfh_class_proj_rel FOR EACH ROW EXECUTE PROCEDURE commons.update_entity_version_key();


--
-- TOC entry 5805 (class 2620 OID 245018)
-- Name: class_field_config update_entity_version_key; Type: TRIGGER; Schema: projects; Owner: -
--

CREATE TRIGGER update_entity_version_key BEFORE UPDATE ON projects.class_field_config FOR EACH ROW EXECUTE PROCEDURE commons.update_entity_version_key();


--
-- TOC entry 5847 (class 2620 OID 244802)
-- Name: argument versioning_trigger; Type: TRIGGER; Schema: projects; Owner: -
--

CREATE TRIGGER versioning_trigger BEFORE INSERT OR DELETE OR UPDATE ON projects.argument FOR EACH ROW EXECUTE PROCEDURE public.versioning('sys_period', 'projects.argument_vt', 'true');


--
-- TOC entry 5678 (class 2620 OID 244808)
-- Name: project versioning_trigger; Type: TRIGGER; Schema: projects; Owner: -
--

CREATE TRIGGER versioning_trigger BEFORE INSERT OR DELETE OR UPDATE ON projects.project FOR EACH ROW EXECUTE PROCEDURE public.versioning('sys_period', 'projects.project_vt', 'true');


--
-- TOC entry 5653 (class 2620 OID 244814)
-- Name: language versioning_trigger; Type: TRIGGER; Schema: projects; Owner: -
--

CREATE TRIGGER versioning_trigger BEFORE INSERT OR DELETE OR UPDATE ON projects.language FOR EACH ROW EXECUTE PROCEDURE public.versioning('sys_period', 'projects.language_vt', 'true');


--
-- TOC entry 5690 (class 2620 OID 244826)
-- Name: text_property versioning_trigger; Type: TRIGGER; Schema: projects; Owner: -
--

CREATE TRIGGER versioning_trigger BEFORE INSERT OR DELETE OR UPDATE ON projects.text_property FOR EACH ROW EXECUTE PROCEDURE public.versioning('sys_period', 'projects.text_property_vt', 'true');


--
-- TOC entry 5672 (class 2620 OID 244882)
-- Name: _deprecated_label versioning_trigger; Type: TRIGGER; Schema: projects; Owner: -
--

CREATE TRIGGER versioning_trigger BEFORE INSERT OR DELETE OR UPDATE ON projects._deprecated_label FOR EACH ROW EXECUTE PROCEDURE public.versioning('sys_period', 'projects._deprecated_label_vt', 'true');


--
-- TOC entry 5858 (class 2620 OID 244907)
-- Name: query versioning_trigger; Type: TRIGGER; Schema: projects; Owner: -
--

CREATE TRIGGER versioning_trigger BEFORE INSERT OR DELETE OR UPDATE ON projects.query FOR EACH ROW EXECUTE PROCEDURE public.versioning('sys_period', 'projects.query_vt', 'true');


--
-- TOC entry 5870 (class 2620 OID 244925)
-- Name: visual versioning_trigger; Type: TRIGGER; Schema: projects; Owner: -
--

CREATE TRIGGER versioning_trigger BEFORE INSERT OR DELETE OR UPDATE ON projects.visual FOR EACH ROW EXECUTE PROCEDURE public.versioning('sys_period', 'projects.visual_vt', 'true');


--
-- TOC entry 5731 (class 2620 OID 244943)
-- Name: info_proj_rel versioning_trigger; Type: TRIGGER; Schema: projects; Owner: -
--

CREATE TRIGGER versioning_trigger BEFORE INSERT OR DELETE OR UPDATE ON projects.info_proj_rel FOR EACH ROW EXECUTE PROCEDURE public.versioning('sys_period', 'projects.info_proj_rel_vt', 'true');


--
-- TOC entry 5819 (class 2620 OID 244965)
-- Name: dfh_class_proj_rel versioning_trigger; Type: TRIGGER; Schema: projects; Owner: -
--

CREATE TRIGGER versioning_trigger BEFORE INSERT OR DELETE OR UPDATE ON projects.dfh_class_proj_rel FOR EACH ROW EXECUTE PROCEDURE public.versioning('sys_period', 'projects.dfh_class_proj_rel_vt', 'true');


--
-- TOC entry 5803 (class 2620 OID 245016)
-- Name: class_field_config versioning_trigger; Type: TRIGGER; Schema: projects; Owner: -
--

CREATE TRIGGER versioning_trigger BEFORE INSERT OR DELETE OR UPDATE ON projects.class_field_config FOR EACH ROW EXECUTE PROCEDURE public.versioning('sys_period', 'projects.class_field_config_vt', 'true');


--
-- TOC entry 5695 (class 2620 OID 245001)
-- Name: account_project_rel create_entity_version_key; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER create_entity_version_key BEFORE INSERT ON public.account_project_rel FOR EACH ROW EXECUTE PROCEDURE commons.create_entity_version_key();


--
-- TOC entry 5696 (class 2620 OID 245002)
-- Name: account_project_rel update_entity_version_key; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_entity_version_key BEFORE UPDATE ON public.account_project_rel FOR EACH ROW EXECUTE PROCEDURE commons.update_entity_version_key();


--
-- TOC entry 5694 (class 2620 OID 245000)
-- Name: account_project_rel versioning_trigger; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER versioning_trigger BEFORE INSERT OR DELETE OR UPDATE ON public.account_project_rel FOR EACH ROW EXECUTE PROCEDURE public.versioning('sys_period', 'public.account_project_rel_vt', 'true');


--
-- TOC entry 5685 (class 2620 OID 244723)
-- Name: system_type create_entity_version_key; Type: TRIGGER; Schema: system; Owner: -
--

CREATE TRIGGER create_entity_version_key BEFORE INSERT ON system.system_type FOR EACH ROW EXECUTE PROCEDURE commons.create_entity_version_key();


--
-- TOC entry 5813 (class 2620 OID 244729)
-- Name: class_field create_entity_version_key; Type: TRIGGER; Schema: system; Owner: -
--

CREATE TRIGGER create_entity_version_key BEFORE INSERT ON system.class_field FOR EACH ROW EXECUTE PROCEDURE commons.create_entity_version_key();


--
-- TOC entry 5841 (class 2620 OID 244732)
-- Name: class_field_property_rel create_entity_version_key; Type: TRIGGER; Schema: system; Owner: -
--

CREATE TRIGGER create_entity_version_key BEFORE INSERT ON system.class_field_property_rel FOR EACH ROW EXECUTE PROCEDURE commons.create_entity_version_key();


--
-- TOC entry 5868 (class 2620 OID 244735)
-- Name: class_has_type_property create_entity_version_key; Type: TRIGGER; Schema: system; Owner: -
--

CREATE TRIGGER create_entity_version_key BEFORE INSERT ON system.class_has_type_property FOR EACH ROW EXECUTE PROCEDURE commons.create_entity_version_key();


--
-- TOC entry 5801 (class 2620 OID 244738)
-- Name: app_context create_entity_version_key; Type: TRIGGER; Schema: system; Owner: -
--

CREATE TRIGGER create_entity_version_key BEFORE INSERT ON system.app_context FOR EACH ROW EXECUTE PROCEDURE commons.create_entity_version_key();


--
-- TOC entry 5881 (class 2620 OID 244766)
-- Name: system_relevant_class create_entity_version_key; Type: TRIGGER; Schema: system; Owner: -
--

CREATE TRIGGER create_entity_version_key BEFORE INSERT ON system.system_relevant_class FOR EACH ROW EXECUTE PROCEDURE commons.create_entity_version_key();


--
-- TOC entry 5887 (class 2620 OID 244794)
-- Name: system_relevant_type create_entity_version_key; Type: TRIGGER; Schema: system; Owner: -
--

CREATE TRIGGER create_entity_version_key BEFORE INSERT ON system.system_relevant_type FOR EACH ROW EXECUTE PROCEDURE commons.create_entity_version_key();


--
-- TOC entry 5681 (class 2620 OID 240430)
-- Name: system_type creation_tmsp; Type: TRIGGER; Schema: system; Owner: -
--

CREATE TRIGGER creation_tmsp BEFORE INSERT ON system.system_type FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_creation();


--
-- TOC entry 5797 (class 2620 OID 243005)
-- Name: app_context creation_tmsp; Type: TRIGGER; Schema: system; Owner: -
--

CREATE TRIGGER creation_tmsp BEFORE INSERT ON system.app_context FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_creation();


--
-- TOC entry 5809 (class 2620 OID 243061)
-- Name: class_field creation_tmsp; Type: TRIGGER; Schema: system; Owner: -
--

CREATE TRIGGER creation_tmsp BEFORE INSERT ON system.class_field FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_creation();


--
-- TOC entry 5837 (class 2620 OID 243406)
-- Name: class_field_property_rel creation_tmsp; Type: TRIGGER; Schema: system; Owner: -
--

CREATE TRIGGER creation_tmsp BEFORE INSERT ON system.class_field_property_rel FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_creation();


--
-- TOC entry 5864 (class 2620 OID 244126)
-- Name: class_has_type_property creation_tmsp; Type: TRIGGER; Schema: system; Owner: -
--

CREATE TRIGGER creation_tmsp BEFORE INSERT ON system.class_has_type_property FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_creation();


--
-- TOC entry 5877 (class 2620 OID 244756)
-- Name: system_relevant_class creation_tmsp; Type: TRIGGER; Schema: system; Owner: -
--

CREATE TRIGGER creation_tmsp BEFORE INSERT ON system.system_relevant_class FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_creation();


--
-- TOC entry 5883 (class 2620 OID 244784)
-- Name: system_relevant_type creation_tmsp; Type: TRIGGER; Schema: system; Owner: -
--

CREATE TRIGGER creation_tmsp BEFORE INSERT ON system.system_relevant_type FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_creation();


--
-- TOC entry 5682 (class 2620 OID 240431)
-- Name: system_type insert_schema_table_name; Type: TRIGGER; Schema: system; Owner: -
--

CREATE TRIGGER insert_schema_table_name BEFORE INSERT ON system.system_type FOR EACH ROW EXECUTE PROCEDURE commons.insert_schema_table_name();


--
-- TOC entry 5799 (class 2620 OID 243007)
-- Name: app_context insert_schema_table_name; Type: TRIGGER; Schema: system; Owner: -
--

CREATE TRIGGER insert_schema_table_name BEFORE INSERT ON system.app_context FOR EACH ROW EXECUTE PROCEDURE commons.insert_schema_table_name();


--
-- TOC entry 5811 (class 2620 OID 243063)
-- Name: class_field insert_schema_table_name; Type: TRIGGER; Schema: system; Owner: -
--

CREATE TRIGGER insert_schema_table_name BEFORE INSERT ON system.class_field FOR EACH ROW EXECUTE PROCEDURE commons.insert_schema_table_name();


--
-- TOC entry 5838 (class 2620 OID 243408)
-- Name: class_field_property_rel insert_schema_table_name; Type: TRIGGER; Schema: system; Owner: -
--

CREATE TRIGGER insert_schema_table_name BEFORE INSERT ON system.class_field_property_rel FOR EACH ROW EXECUTE PROCEDURE commons.insert_schema_table_name();


--
-- TOC entry 5865 (class 2620 OID 244127)
-- Name: class_has_type_property insert_schema_table_name; Type: TRIGGER; Schema: system; Owner: -
--

CREATE TRIGGER insert_schema_table_name BEFORE INSERT ON system.class_has_type_property FOR EACH ROW EXECUTE PROCEDURE commons.insert_schema_table_name();


--
-- TOC entry 5878 (class 2620 OID 244757)
-- Name: system_relevant_class insert_schema_table_name; Type: TRIGGER; Schema: system; Owner: -
--

CREATE TRIGGER insert_schema_table_name BEFORE INSERT ON system.system_relevant_class FOR EACH ROW EXECUTE PROCEDURE commons.insert_schema_table_name();


--
-- TOC entry 5884 (class 2620 OID 244785)
-- Name: system_relevant_type insert_schema_table_name; Type: TRIGGER; Schema: system; Owner: -
--

CREATE TRIGGER insert_schema_table_name BEFORE INSERT ON system.system_relevant_type FOR EACH ROW EXECUTE PROCEDURE commons.insert_schema_table_name();


--
-- TOC entry 5683 (class 2620 OID 240432)
-- Name: system_type last_modification_tmsp; Type: TRIGGER; Schema: system; Owner: -
--

CREATE TRIGGER last_modification_tmsp BEFORE INSERT OR UPDATE ON system.system_type FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_last_modification();


--
-- TOC entry 5798 (class 2620 OID 243006)
-- Name: app_context last_modification_tmsp; Type: TRIGGER; Schema: system; Owner: -
--

CREATE TRIGGER last_modification_tmsp BEFORE INSERT OR UPDATE ON system.app_context FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_last_modification();


--
-- TOC entry 5810 (class 2620 OID 243062)
-- Name: class_field last_modification_tmsp; Type: TRIGGER; Schema: system; Owner: -
--

CREATE TRIGGER last_modification_tmsp BEFORE INSERT OR UPDATE ON system.class_field FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_last_modification();


--
-- TOC entry 5839 (class 2620 OID 243407)
-- Name: class_field_property_rel last_modification_tmsp; Type: TRIGGER; Schema: system; Owner: -
--

CREATE TRIGGER last_modification_tmsp BEFORE INSERT OR UPDATE ON system.class_field_property_rel FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_last_modification();


--
-- TOC entry 5866 (class 2620 OID 244128)
-- Name: class_has_type_property last_modification_tmsp; Type: TRIGGER; Schema: system; Owner: -
--

CREATE TRIGGER last_modification_tmsp BEFORE INSERT OR UPDATE ON system.class_has_type_property FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_last_modification();


--
-- TOC entry 5879 (class 2620 OID 244758)
-- Name: system_relevant_class last_modification_tmsp; Type: TRIGGER; Schema: system; Owner: -
--

CREATE TRIGGER last_modification_tmsp BEFORE INSERT OR UPDATE ON system.system_relevant_class FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_last_modification();


--
-- TOC entry 5885 (class 2620 OID 244786)
-- Name: system_relevant_type last_modification_tmsp; Type: TRIGGER; Schema: system; Owner: -
--

CREATE TRIGGER last_modification_tmsp BEFORE INSERT OR UPDATE ON system.system_relevant_type FOR EACH ROW EXECUTE PROCEDURE commons.tmsp_last_modification();


--
-- TOC entry 5686 (class 2620 OID 244724)
-- Name: system_type update_entity_version_key; Type: TRIGGER; Schema: system; Owner: -
--

CREATE TRIGGER update_entity_version_key BEFORE UPDATE ON system.system_type FOR EACH ROW EXECUTE PROCEDURE commons.update_entity_version_key();


--
-- TOC entry 5814 (class 2620 OID 244730)
-- Name: class_field update_entity_version_key; Type: TRIGGER; Schema: system; Owner: -
--

CREATE TRIGGER update_entity_version_key BEFORE UPDATE ON system.class_field FOR EACH ROW EXECUTE PROCEDURE commons.update_entity_version_key();


--
-- TOC entry 5842 (class 2620 OID 244733)
-- Name: class_field_property_rel update_entity_version_key; Type: TRIGGER; Schema: system; Owner: -
--

CREATE TRIGGER update_entity_version_key BEFORE UPDATE ON system.class_field_property_rel FOR EACH ROW EXECUTE PROCEDURE commons.update_entity_version_key();


--
-- TOC entry 5869 (class 2620 OID 244736)
-- Name: class_has_type_property update_entity_version_key; Type: TRIGGER; Schema: system; Owner: -
--

CREATE TRIGGER update_entity_version_key BEFORE UPDATE ON system.class_has_type_property FOR EACH ROW EXECUTE PROCEDURE commons.update_entity_version_key();


--
-- TOC entry 5802 (class 2620 OID 244739)
-- Name: app_context update_entity_version_key; Type: TRIGGER; Schema: system; Owner: -
--

CREATE TRIGGER update_entity_version_key BEFORE UPDATE ON system.app_context FOR EACH ROW EXECUTE PROCEDURE commons.update_entity_version_key();


--
-- TOC entry 5882 (class 2620 OID 244767)
-- Name: system_relevant_class update_entity_version_key; Type: TRIGGER; Schema: system; Owner: -
--

CREATE TRIGGER update_entity_version_key BEFORE UPDATE ON system.system_relevant_class FOR EACH ROW EXECUTE PROCEDURE commons.update_entity_version_key();


--
-- TOC entry 5888 (class 2620 OID 244795)
-- Name: system_relevant_type update_entity_version_key; Type: TRIGGER; Schema: system; Owner: -
--

CREATE TRIGGER update_entity_version_key BEFORE UPDATE ON system.system_relevant_type FOR EACH ROW EXECUTE PROCEDURE commons.update_entity_version_key();


--
-- TOC entry 5684 (class 2620 OID 244722)
-- Name: system_type versioning_trigger; Type: TRIGGER; Schema: system; Owner: -
--

CREATE TRIGGER versioning_trigger BEFORE INSERT OR DELETE OR UPDATE ON system.system_type FOR EACH ROW EXECUTE PROCEDURE public.versioning('sys_period', 'system.system_type_vt', 'true');


--
-- TOC entry 5812 (class 2620 OID 244728)
-- Name: class_field versioning_trigger; Type: TRIGGER; Schema: system; Owner: -
--

CREATE TRIGGER versioning_trigger BEFORE INSERT OR DELETE OR UPDATE ON system.class_field FOR EACH ROW EXECUTE PROCEDURE public.versioning('sys_period', 'system.class_field_vt', 'true');


--
-- TOC entry 5840 (class 2620 OID 244731)
-- Name: class_field_property_rel versioning_trigger; Type: TRIGGER; Schema: system; Owner: -
--

CREATE TRIGGER versioning_trigger BEFORE INSERT OR DELETE OR UPDATE ON system.class_field_property_rel FOR EACH ROW EXECUTE PROCEDURE public.versioning('sys_period', 'system.class_field_property_rel_vt', 'true');


--
-- TOC entry 5867 (class 2620 OID 244734)
-- Name: class_has_type_property versioning_trigger; Type: TRIGGER; Schema: system; Owner: -
--

CREATE TRIGGER versioning_trigger BEFORE INSERT OR DELETE OR UPDATE ON system.class_has_type_property FOR EACH ROW EXECUTE PROCEDURE public.versioning('sys_period', 'system.class_has_type_property_vt', 'true');


--
-- TOC entry 5800 (class 2620 OID 244737)
-- Name: app_context versioning_trigger; Type: TRIGGER; Schema: system; Owner: -
--

CREATE TRIGGER versioning_trigger BEFORE INSERT OR DELETE OR UPDATE ON system.app_context FOR EACH ROW EXECUTE PROCEDURE public.versioning('sys_period', 'system.app_context_vt', 'true');


--
-- TOC entry 5880 (class 2620 OID 244765)
-- Name: system_relevant_class versioning_trigger; Type: TRIGGER; Schema: system; Owner: -
--

CREATE TRIGGER versioning_trigger BEFORE INSERT OR DELETE OR UPDATE ON system.system_relevant_class FOR EACH ROW EXECUTE PROCEDURE public.versioning('sys_period', 'system.system_relevant_class_vt', 'true');


--
-- TOC entry 5886 (class 2620 OID 244793)
-- Name: system_relevant_type versioning_trigger; Type: TRIGGER; Schema: system; Owner: -
--

CREATE TRIGGER versioning_trigger BEFORE INSERT OR DELETE OR UPDATE ON system.system_relevant_type FOR EACH ROW EXECUTE PROCEDURE public.versioning('sys_period', 'system.system_relevant_type_vt', 'true');


--
-- TOC entry 5850 (class 2620 OID 244078)
-- Name: class_preview after_update_on_class_preview__class_label; Type: TRIGGER; Schema: warehouse; Owner: -
--

CREATE TRIGGER after_update_on_class_preview__class_label AFTER UPDATE OF class_label ON warehouse.class_preview FOR EACH ROW EXECUTE PROCEDURE warehouse.entity_preview__update_dependent_class_labels();


--
-- TOC entry 5856 (class 2620 OID 244077)
-- Name: entity_preview after_update_on_entity_preview__entity_label; Type: TRIGGER; Schema: warehouse; Owner: -
--

CREATE TRIGGER after_update_on_entity_preview__entity_label AFTER UPDATE OF entity_label ON warehouse.entity_preview FOR EACH ROW EXECUTE PROCEDURE warehouse.entity_preview__update_dependent_entity_labels();


--
-- TOC entry 5857 (class 2620 OID 244072)
-- Name: entity_preview after_update_on_entity_preview__fk_entity_label; Type: TRIGGER; Schema: warehouse; Owner: -
--

CREATE TRIGGER after_update_on_entity_preview__fk_entity_label AFTER UPDATE OF fk_entity_label ON warehouse.entity_preview FOR EACH ROW EXECUTE PROCEDURE warehouse.entity_preview__get_entity_label();


--
-- TOC entry 5851 (class 2620 OID 244073)
-- Name: entity_preview after_update_on_entity_preview__fk_type; Type: TRIGGER; Schema: warehouse; Owner: -
--

CREATE TRIGGER after_update_on_entity_preview__fk_type AFTER UPDATE OF fk_type ON warehouse.entity_preview FOR EACH ROW EXECUTE PROCEDURE warehouse.entity_preview__get_type_label();


--
-- TOC entry 5852 (class 2620 OID 244076)
-- Name: entity_preview after_update_on_entity_preview__own_full_text; Type: TRIGGER; Schema: warehouse; Owner: -
--

CREATE TRIGGER after_update_on_entity_preview__own_full_text AFTER UPDATE OF own_full_text ON warehouse.entity_preview FOR EACH ROW EXECUTE PROCEDURE warehouse.entity_preview__update_dependent_related_full_texts();


--
-- TOC entry 5853 (class 2620 OID 244079)
-- Name: entity_preview after_upsert_on_entity_preview; Type: TRIGGER; Schema: warehouse; Owner: -
--

CREATE TRIGGER after_upsert_on_entity_preview AFTER INSERT OR UPDATE OF entity_label, class_label, time_span, type_label ON warehouse.entity_preview FOR EACH ROW WHEN (((new.project IS NOT NULL) AND (new.fk_class IS NOT NULL) AND (new.entity_type IS NOT NULL))) EXECUTE PROCEDURE warehouse.entity_preview__notify_upsert();


--
-- TOC entry 5854 (class 2620 OID 244075)
-- Name: entity_preview before_update_on_entity_preview__own_full_text; Type: TRIGGER; Schema: warehouse; Owner: -
--

CREATE TRIGGER before_update_on_entity_preview__own_full_text BEFORE UPDATE OF own_full_text ON warehouse.entity_preview FOR EACH ROW EXECUTE PROCEDURE warehouse.entity_preview__concat_full_text();


--
-- TOC entry 5855 (class 2620 OID 244074)
-- Name: entity_preview before_update_on_entity_preview__related_full_texts; Type: TRIGGER; Schema: warehouse; Owner: -
--

CREATE TRIGGER before_update_on_entity_preview__related_full_texts BEFORE UPDATE OF related_full_texts ON warehouse.entity_preview FOR EACH ROW EXECUTE PROCEDURE warehouse.entity_preview__concat_full_text();


--
-- TOC entry 5643 (class 2606 OID 245889)
-- Name: avatar avatar_fk_class_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--

ALTER TABLE ONLY data.avatar
    ADD CONSTRAINT avatar_fk_class_fkey FOREIGN KEY (fk_class) REFERENCES data_for_history.class(dfh_pk_class);


--
-- TOC entry 5619 (class 2606 OID 245529)
-- Name: cell cell_fk_column_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--

ALTER TABLE ONLY data.cell
    ADD CONSTRAINT cell_fk_column_fkey FOREIGN KEY (fk_column) REFERENCES data."column"(pk_entity);


--
-- TOC entry 5620 (class 2606 OID 245534)
-- Name: cell cell_fk_row_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--

ALTER TABLE ONLY data.cell
    ADD CONSTRAINT cell_fk_row_fkey FOREIGN KEY (fk_row) REFERENCES data."row"(pk_entity);


--
-- TOC entry 5627 (class 2606 OID 245671)
-- Name: class_column_rel class_column_rel_fk_class_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--

ALTER TABLE ONLY data.class_column_rel
    ADD CONSTRAINT class_column_rel_fk_class_fkey FOREIGN KEY (fk_class) REFERENCES data_for_history.class(dfh_pk_class);


--
-- TOC entry 5628 (class 2606 OID 245676)
-- Name: class_column_rel class_column_rel_fk_column_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--

ALTER TABLE ONLY data.class_column_rel
    ADD CONSTRAINT class_column_rel_fk_column_fkey FOREIGN KEY (fk_column) REFERENCES data."column"(pk_entity);


--
-- TOC entry 5617 (class 2606 OID 245496)
-- Name: column column_fk_data_type_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--

ALTER TABLE ONLY data."column"
    ADD CONSTRAINT column_fk_data_type_fkey FOREIGN KEY (fk_data_type) REFERENCES system.system_type(pk_entity);


--
-- TOC entry 5616 (class 2606 OID 245491)
-- Name: column column_fk_digital_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--

ALTER TABLE ONLY data."column"
    ADD CONSTRAINT column_fk_digital_fkey FOREIGN KEY (fk_digital) REFERENCES data.digital(pk_entity);


--
-- TOC entry 5618 (class 2606 OID 245501)
-- Name: column column_fk_meta_data_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--

ALTER TABLE ONLY data."column"
    ADD CONSTRAINT column_fk_meta_data_fkey FOREIGN KEY (fk_meta_data) REFERENCES system.system_type(pk_entity);


--
-- TOC entry 5642 (class 2606 OID 245861)
-- Name: data_association data_association_fk_property_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--

ALTER TABLE ONLY data.data_association
    ADD CONSTRAINT data_association_fk_property_fkey FOREIGN KEY (fk_property) REFERENCES data_for_history.property(dfh_pk_property);


--
-- TOC entry 5583 (class 2606 OID 245386)
-- Name: digital digital_fk_system_type_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--

ALTER TABLE ONLY data.digital
    ADD CONSTRAINT digital_fk_system_type_fkey FOREIGN KEY (fk_system_type) REFERENCES system.system_type(pk_entity);


--
-- TOC entry 5613 (class 2606 OID 246007)
-- Name: entity entity_fk_namespace_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--

ALTER TABLE ONLY data.entity
    ADD CONSTRAINT entity_fk_namespace_fkey FOREIGN KEY (fk_namespace) REFERENCES data.namespace(pk_entity);


--
-- TOC entry 5622 (class 2606 OID 245600)
-- Name: factoid_class_digital_rel factoid_class_digital_rel_fk_class_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--

ALTER TABLE ONLY data.factoid_class_digital_rel
    ADD CONSTRAINT factoid_class_digital_rel_fk_class_fkey FOREIGN KEY (fk_class) REFERENCES data_for_history.class(dfh_pk_class);


--
-- TOC entry 5621 (class 2606 OID 245595)
-- Name: factoid_class_digital_rel factoid_class_digital_rel_fk_digital_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--

ALTER TABLE ONLY data.factoid_class_digital_rel
    ADD CONSTRAINT factoid_class_digital_rel_fk_digital_fkey FOREIGN KEY (fk_digital) REFERENCES data.digital(pk_entity);


--
-- TOC entry 5632 (class 2606 OID 245742)
-- Name: factoid factoid_fk_class_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--

ALTER TABLE ONLY data.factoid
    ADD CONSTRAINT factoid_fk_class_fkey FOREIGN KEY (fk_class) REFERENCES data_for_history.class(dfh_pk_class);


--
-- TOC entry 5630 (class 2606 OID 245709)
-- Name: factoid_property_column_rel factoid_property_column_rel_fk_column_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--

ALTER TABLE ONLY data.factoid_property_column_rel
    ADD CONSTRAINT factoid_property_column_rel_fk_column_fkey FOREIGN KEY (fk_column) REFERENCES data."column"(pk_entity);


--
-- TOC entry 5631 (class 2606 OID 245714)
-- Name: factoid_property_column_rel factoid_property_column_rel_fk_factoid_class_digital_rel_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--

ALTER TABLE ONLY data.factoid_property_column_rel
    ADD CONSTRAINT factoid_property_column_rel_fk_factoid_class_digital_rel_fkey FOREIGN KEY (fk_factoid_class_digital_rel) REFERENCES data.factoid_class_digital_rel(pk_entity);


--
-- TOC entry 5629 (class 2606 OID 245704)
-- Name: factoid_property_column_rel factoid_property_column_rel_fk_property_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--

ALTER TABLE ONLY data.factoid_property_column_rel
    ADD CONSTRAINT factoid_property_column_rel_fk_property_fkey FOREIGN KEY (fk_property) REFERENCES data_for_history.property(dfh_pk_property);


--
-- TOC entry 5634 (class 2606 OID 245775)
-- Name: factoid_role factoid_role_fk_domain_factoid_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--

ALTER TABLE ONLY data.factoid_role
    ADD CONSTRAINT factoid_role_fk_domain_factoid_fkey FOREIGN KEY (fk_domain_factoid) REFERENCES data.factoid(pk_entity);


--
-- TOC entry 5633 (class 2606 OID 245770)
-- Name: factoid_role factoid_role_fk_property_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--

ALTER TABLE ONLY data.factoid_role
    ADD CONSTRAINT factoid_role_fk_property_fkey FOREIGN KEY (fk_property) REFERENCES data_for_history.property(dfh_pk_property);


--
-- TOC entry 5635 (class 2606 OID 245780)
-- Name: factoid_role factoid_role_fk_range_cell_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--

ALTER TABLE ONLY data.factoid_role
    ADD CONSTRAINT factoid_role_fk_range_cell_fkey FOREIGN KEY (fk_range_cell) REFERENCES data.cell(pk_entity);


--
-- TOC entry 5636 (class 2606 OID 245785)
-- Name: factoid_role factoid_role_fk_range_chunk_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--

ALTER TABLE ONLY data.factoid_role
    ADD CONSTRAINT factoid_role_fk_range_chunk_fkey FOREIGN KEY (fk_range_chunk) REFERENCES data.chunk(pk_entity);


--
-- TOC entry 5646 (class 2606 OID 245983)
-- Name: namespace namespace_fk_project_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--

ALTER TABLE ONLY data.namespace
    ADD CONSTRAINT namespace_fk_project_fkey FOREIGN KEY (fk_project) REFERENCES projects.project(pk_entity);


--
-- TOC entry 5647 (class 2606 OID 246002)
-- Name: namespace namespace_fk_root_namespace_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--

ALTER TABLE ONLY data.namespace
    ADD CONSTRAINT namespace_fk_root_namespace_fkey FOREIGN KEY (fk_root_namespace) REFERENCES data.namespace(pk_entity);


--
-- TOC entry 5615 (class 2606 OID 245463)
-- Name: row row_fk_digital_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--

ALTER TABLE ONLY data."row"
    ADD CONSTRAINT row_fk_digital_fkey FOREIGN KEY (fk_digital) REFERENCES data.digital(pk_entity);


--
-- TOC entry 5614 (class 2606 OID 245402)
-- Name: chunk text_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--

ALTER TABLE ONLY data.chunk
    ADD CONSTRAINT text_fkey FOREIGN KEY (fk_text, fk_entity_version) REFERENCES commons.text(pk_text, entity_version);


--
-- TOC entry 5645 (class 2606 OID 245922)
-- Name: text_property text_property_fk_language_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--

ALTER TABLE ONLY data.text_property
    ADD CONSTRAINT text_property_fk_language_fkey FOREIGN KEY (fk_language) REFERENCES information.language(pk_entity);


--
-- TOC entry 5644 (class 2606 OID 245917)
-- Name: text_property text_property_fk_system_type_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--

ALTER TABLE ONLY data.text_property
    ADD CONSTRAINT text_property_fk_system_type_fkey FOREIGN KEY (fk_system_type) REFERENCES system.system_type(pk_entity);


--
-- TOC entry 5624 (class 2606 OID 245633)
-- Name: value_association_columns_rel value_association_columns_rel_fk_domain_column_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--

ALTER TABLE ONLY data.value_association_columns_rel
    ADD CONSTRAINT value_association_columns_rel_fk_domain_column_fkey FOREIGN KEY (fk_domain_column) REFERENCES data."column"(pk_entity);


--
-- TOC entry 5626 (class 2606 OID 245643)
-- Name: value_association_columns_rel value_association_columns_rel_fk_factoid_class_digital_rel_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--

ALTER TABLE ONLY data.value_association_columns_rel
    ADD CONSTRAINT value_association_columns_rel_fk_factoid_class_digital_rel_fkey FOREIGN KEY (fk_factoid_class_digital_rel) REFERENCES data.factoid_class_digital_rel(pk_entity);


--
-- TOC entry 5623 (class 2606 OID 245628)
-- Name: value_association_columns_rel value_association_columns_rel_fk_property_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--

ALTER TABLE ONLY data.value_association_columns_rel
    ADD CONSTRAINT value_association_columns_rel_fk_property_fkey FOREIGN KEY (fk_property) REFERENCES data_for_history.property(dfh_pk_property);


--
-- TOC entry 5625 (class 2606 OID 245638)
-- Name: value_association_columns_rel value_association_columns_rel_fk_range_column_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--

ALTER TABLE ONLY data.value_association_columns_rel
    ADD CONSTRAINT value_association_columns_rel_fk_range_column_fkey FOREIGN KEY (fk_range_column) REFERENCES data."column"(pk_entity);


--
-- TOC entry 5638 (class 2606 OID 245818)
-- Name: values_association values_association_fk_domain_cell_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--

ALTER TABLE ONLY data.values_association
    ADD CONSTRAINT values_association_fk_domain_cell_fkey FOREIGN KEY (fk_domain_cell) REFERENCES data.cell(pk_entity);


--
-- TOC entry 5640 (class 2606 OID 245828)
-- Name: values_association values_association_fk_domain_chunk_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--

ALTER TABLE ONLY data.values_association
    ADD CONSTRAINT values_association_fk_domain_chunk_fkey FOREIGN KEY (fk_domain_chunk) REFERENCES data.chunk(pk_entity);


--
-- TOC entry 5637 (class 2606 OID 245813)
-- Name: values_association values_association_fk_property_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--

ALTER TABLE ONLY data.values_association
    ADD CONSTRAINT values_association_fk_property_fkey FOREIGN KEY (fk_property) REFERENCES data_for_history.property(dfh_pk_property);


--
-- TOC entry 5639 (class 2606 OID 245823)
-- Name: values_association values_association_fk_range_cell_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--

ALTER TABLE ONLY data.values_association
    ADD CONSTRAINT values_association_fk_range_cell_fkey FOREIGN KEY (fk_range_cell) REFERENCES data.cell(pk_entity);


--
-- TOC entry 5641 (class 2606 OID 245833)
-- Name: values_association values_association_fk_range_chunk_fkey; Type: FK CONSTRAINT; Schema: data; Owner: -
--

ALTER TABLE ONLY data.values_association
    ADD CONSTRAINT values_association_fk_range_chunk_fkey FOREIGN KEY (fk_range_chunk) REFERENCES data.chunk(pk_entity);


--
-- TOC entry 5580 (class 2606 OID 243375)
-- Name: label label_com_fk_system_type_fkey; Type: FK CONSTRAINT; Schema: data_for_history; Owner: -
--

ALTER TABLE ONLY data_for_history.label
    ADD CONSTRAINT label_com_fk_system_type_fkey FOREIGN KEY (com_fk_system_type) REFERENCES system.system_type(pk_entity);


--
-- TOC entry 5581 (class 2606 OID 243380)
-- Name: label label_inf_fk_language_fkey; Type: FK CONSTRAINT; Schema: data_for_history; Owner: -
--

ALTER TABLE ONLY data_for_history.label
    ADD CONSTRAINT label_inf_fk_language_fkey FOREIGN KEY (inf_fk_language) REFERENCES information.language(pk_entity);


--
-- TOC entry 5571 (class 2606 OID 240961)
-- Name: appellation appellation_fk_class_fkey; Type: FK CONSTRAINT; Schema: information; Owner: -
--

ALTER TABLE ONLY information.appellation
    ADD CONSTRAINT appellation_fk_class_fkey FOREIGN KEY (fk_class) REFERENCES data_for_history.class(dfh_pk_class);


--
-- TOC entry 5577 (class 2606 OID 240986)
-- Name: language language_fk_class_fkey; Type: FK CONSTRAINT; Schema: information; Owner: -
--

ALTER TABLE ONLY information.language
    ADD CONSTRAINT language_fk_class_fkey FOREIGN KEY (fk_class) REFERENCES data_for_history.class(dfh_pk_class);


--
-- TOC entry 5593 (class 2606 OID 243306)
-- Name: _deprecated_namespace namespace_fk_root_namespace_fkey; Type: FK CONSTRAINT; Schema: information; Owner: -
--

ALTER TABLE ONLY information._deprecated_namespace
    ADD CONSTRAINT namespace_fk_root_namespace_fkey FOREIGN KEY (fk_root_namespace) REFERENCES information._deprecated_namespace(pk_entity);


--
-- TOC entry 5572 (class 2606 OID 240911)
-- Name: persistent_item persistent_item_fk_class_fkey; Type: FK CONSTRAINT; Schema: information; Owner: -
--

ALTER TABLE ONLY information.persistent_item
    ADD CONSTRAINT persistent_item_fk_class_fkey FOREIGN KEY (fk_class) REFERENCES data_for_history.class(dfh_pk_class);


--
-- TOC entry 5584 (class 2606 OID 242958)
-- Name: place place_fk_class_fkey; Type: FK CONSTRAINT; Schema: information; Owner: -
--

ALTER TABLE ONLY information.place
    ADD CONSTRAINT place_fk_class_fkey FOREIGN KEY (fk_class) REFERENCES data_for_history.class(dfh_pk_class);


--
-- TOC entry 5650 (class 2606 OID 246057)
-- Name: property_of_property property_of_property_fk_entity_association_fkey; Type: FK CONSTRAINT; Schema: information; Owner: -
--

ALTER TABLE ONLY information.property_of_property
    ADD CONSTRAINT property_of_property_fk_entity_association_fkey FOREIGN KEY (fk_entity_association) REFERENCES information.entity_association(pk_entity);


--
-- TOC entry 5648 (class 2606 OID 246047)
-- Name: property_of_property property_of_property_fk_property_fkey; Type: FK CONSTRAINT; Schema: information; Owner: -
--

ALTER TABLE ONLY information.property_of_property
    ADD CONSTRAINT property_of_property_fk_property_fkey FOREIGN KEY (fk_property) REFERENCES data_for_history.property(dfh_pk_property);


--
-- TOC entry 5649 (class 2606 OID 246052)
-- Name: property_of_property property_of_property_fk_role_fkey; Type: FK CONSTRAINT; Schema: information; Owner: -
--

ALTER TABLE ONLY information.property_of_property
    ADD CONSTRAINT property_of_property_fk_role_fkey FOREIGN KEY (fk_role) REFERENCES information.role(pk_entity);


--
-- TOC entry 5573 (class 2606 OID 241013)
-- Name: role role_fk_property_fkey; Type: FK CONSTRAINT; Schema: information; Owner: -
--

ALTER TABLE ONLY information.role
    ADD CONSTRAINT role_fk_property_fkey FOREIGN KEY (fk_property) REFERENCES data_for_history.property(dfh_pk_property);


--
-- TOC entry 5574 (class 2606 OID 240936)
-- Name: temporal_entity temporal_entity_fk_class_fkey; Type: FK CONSTRAINT; Schema: information; Owner: -
--

ALTER TABLE ONLY information.temporal_entity
    ADD CONSTRAINT temporal_entity_fk_class_fkey FOREIGN KEY (fk_class) REFERENCES data_for_history.class(dfh_pk_class);


--
-- TOC entry 5576 (class 2606 OID 243442)
-- Name: text_property text_property_fk_class_field_fkey; Type: FK CONSTRAINT; Schema: information; Owner: -
--

ALTER TABLE ONLY information.text_property
    ADD CONSTRAINT text_property_fk_class_field_fkey FOREIGN KEY (fk_class_field) REFERENCES system.class_field(pk_entity);


--
-- TOC entry 5575 (class 2606 OID 243362)
-- Name: text_property text_property_fk_language_constraint; Type: FK CONSTRAINT; Schema: information; Owner: -
--

ALTER TABLE ONLY information.text_property
    ADD CONSTRAINT text_property_fk_language_constraint FOREIGN KEY (fk_language) REFERENCES information.language(pk_entity);


--
-- TOC entry 5582 (class 2606 OID 241203)
-- Name: time_primitive time_primitive_fk_class_fkey; Type: FK CONSTRAINT; Schema: information; Owner: -
--

ALTER TABLE ONLY information.time_primitive
    ADD CONSTRAINT time_primitive_fk_class_fkey FOREIGN KEY (fk_class) REFERENCES data_for_history.class(dfh_pk_class);


--
-- TOC entry 5595 (class 2606 OID 243342)
-- Name: _deprecated_type_namespace_rel type_namespace_rel_fk_namespace_fkey; Type: FK CONSTRAINT; Schema: information; Owner: -
--

ALTER TABLE ONLY information._deprecated_type_namespace_rel
    ADD CONSTRAINT type_namespace_rel_fk_namespace_fkey FOREIGN KEY (fk_namespace) REFERENCES information._deprecated_namespace(pk_entity);


--
-- TOC entry 5594 (class 2606 OID 243337)
-- Name: _deprecated_type_namespace_rel type_namespace_rel_fk_persistent_item_fkey; Type: FK CONSTRAINT; Schema: information; Owner: -
--

ALTER TABLE ONLY information._deprecated_type_namespace_rel
    ADD CONSTRAINT type_namespace_rel_fk_persistent_item_fkey FOREIGN KEY (fk_persistent_item) REFERENCES information.persistent_item(pk_entity);


--
-- TOC entry 5603 (class 2606 OID 243950)
-- Name: argument assertion_fk_assertion_method_type_fkey; Type: FK CONSTRAINT; Schema: projects; Owner: -
--

ALTER TABLE ONLY projects.argument
    ADD CONSTRAINT assertion_fk_assertion_method_type_fkey FOREIGN KEY (fk_assertion_method_type) REFERENCES information.persistent_item(pk_entity);


--
-- TOC entry 5599 (class 2606 OID 243920)
-- Name: argument assertion_fk_is_about_entity_association_fkey; Type: FK CONSTRAINT; Schema: projects; Owner: -
--

ALTER TABLE ONLY projects.argument
    ADD CONSTRAINT assertion_fk_is_about_entity_association_fkey FOREIGN KEY (fk_is_about_entity_association) REFERENCES information.entity_association(pk_entity);


--
-- TOC entry 5598 (class 2606 OID 243915)
-- Name: argument assertion_fk_is_about_role_fkey; Type: FK CONSTRAINT; Schema: projects; Owner: -
--

ALTER TABLE ONLY projects.argument
    ADD CONSTRAINT assertion_fk_is_about_role_fkey FOREIGN KEY (fk_is_about_role) REFERENCES information.role(pk_entity);


--
-- TOC entry 5601 (class 2606 OID 243930)
-- Name: argument assertion_fk_is_based_on_entity_association_fkey; Type: FK CONSTRAINT; Schema: projects; Owner: -
--

ALTER TABLE ONLY projects.argument
    ADD CONSTRAINT assertion_fk_is_based_on_entity_association_fkey FOREIGN KEY (fk_is_based_on_entity_association) REFERENCES information.entity_association(pk_entity);


--
-- TOC entry 5602 (class 2606 OID 243935)
-- Name: argument assertion_fk_is_based_on_persistent_item_fkey; Type: FK CONSTRAINT; Schema: projects; Owner: -
--

ALTER TABLE ONLY projects.argument
    ADD CONSTRAINT assertion_fk_is_based_on_persistent_item_fkey FOREIGN KEY (fk_is_based_on_persistent_item) REFERENCES information.persistent_item(pk_entity);


--
-- TOC entry 5600 (class 2606 OID 243925)
-- Name: argument assertion_fk_is_based_on_role_fkey; Type: FK CONSTRAINT; Schema: projects; Owner: -
--

ALTER TABLE ONLY projects.argument
    ADD CONSTRAINT assertion_fk_is_based_on_role_fkey FOREIGN KEY (fk_is_based_on_role) REFERENCES information.role(pk_entity);


--
-- TOC entry 5587 (class 2606 OID 245006)
-- Name: class_field_config class_field_config_fk_project_fkey; Type: FK CONSTRAINT; Schema: projects; Owner: -
--

ALTER TABLE ONLY projects.class_field_config
    ADD CONSTRAINT class_field_config_fk_project_fkey FOREIGN KEY (fk_project) REFERENCES projects.project(pk_entity);


--
-- TOC entry 5588 (class 2606 OID 245011)
-- Name: class_field_config_vt class_field_config_vt_fk_project_fkey; Type: FK CONSTRAINT; Schema: projects; Owner: -
--

ALTER TABLE ONLY projects.class_field_config_vt
    ADD CONSTRAINT class_field_config_vt_fk_project_fkey FOREIGN KEY (fk_project) REFERENCES projects.project(pk_entity);


--
-- TOC entry 5591 (class 2606 OID 244955)
-- Name: dfh_class_proj_rel dfh_class_proj_rel_fk_project_fkey; Type: FK CONSTRAINT; Schema: projects; Owner: -
--

ALTER TABLE ONLY projects.dfh_class_proj_rel
    ADD CONSTRAINT dfh_class_proj_rel_fk_project_fkey FOREIGN KEY (fk_project) REFERENCES projects.project(pk_entity);


--
-- TOC entry 5592 (class 2606 OID 244960)
-- Name: dfh_class_proj_rel_vt dfh_class_proj_rel_vt_fk_project_fkey; Type: FK CONSTRAINT; Schema: projects; Owner: -
--

ALTER TABLE ONLY projects.dfh_class_proj_rel_vt
    ADD CONSTRAINT dfh_class_proj_rel_vt_fk_project_fkey FOREIGN KEY (fk_project) REFERENCES projects.project(pk_entity);


--
-- TOC entry 5578 (class 2606 OID 244933)
-- Name: info_proj_rel info_proj_rel_fk_project_fkey; Type: FK CONSTRAINT; Schema: projects; Owner: -
--

ALTER TABLE ONLY projects.info_proj_rel
    ADD CONSTRAINT info_proj_rel_fk_project_fkey FOREIGN KEY (fk_project) REFERENCES projects.project(pk_entity);


--
-- TOC entry 5579 (class 2606 OID 244938)
-- Name: info_proj_rel_vt info_proj_rel_vt_fk_project_fkey; Type: FK CONSTRAINT; Schema: projects; Owner: -
--

ALTER TABLE ONLY projects.info_proj_rel_vt
    ADD CONSTRAINT info_proj_rel_vt_fk_project_fkey FOREIGN KEY (fk_project) REFERENCES projects.project(pk_entity);


--
-- TOC entry 5563 (class 2606 OID 240362)
-- Name: _deprecated_label label_fk_language_fkey; Type: FK CONSTRAINT; Schema: projects; Owner: -
--

ALTER TABLE ONLY projects._deprecated_label
    ADD CONSTRAINT label_fk_language_fkey FOREIGN KEY (fk_language) REFERENCES projects.language(pk_language);


--
-- TOC entry 5590 (class 2606 OID 243280)
-- Name: dfh_class_proj_rel proj_rel_fk_entity_fkey; Type: FK CONSTRAINT; Schema: projects; Owner: -
--

ALTER TABLE ONLY projects.dfh_class_proj_rel
    ADD CONSTRAINT proj_rel_fk_entity_fkey FOREIGN KEY (fk_entity) REFERENCES data_for_history.class(pk_entity);


--
-- TOC entry 5564 (class 2606 OID 240391)
-- Name: project project_fk_creator_fkey; Type: FK CONSTRAINT; Schema: projects; Owner: -
--

ALTER TABLE ONLY projects.project
    ADD CONSTRAINT project_fk_creator_fkey FOREIGN KEY (fk_creator) REFERENCES public.account(id);


--
-- TOC entry 5566 (class 2606 OID 244877)
-- Name: project project_fk_language_fkey; Type: FK CONSTRAINT; Schema: projects; Owner: -
--

ALTER TABLE ONLY projects.project
    ADD CONSTRAINT project_fk_language_fkey FOREIGN KEY (fk_language) REFERENCES information.language(pk_entity);


--
-- TOC entry 5565 (class 2606 OID 240396)
-- Name: project project_fk_last_modifier_fkey; Type: FK CONSTRAINT; Schema: projects; Owner: -
--

ALTER TABLE ONLY projects.project
    ADD CONSTRAINT project_fk_last_modifier_fkey FOREIGN KEY (fk_last_modifier) REFERENCES public.account(id);


--
-- TOC entry 5604 (class 2606 OID 244897)
-- Name: query query_fk_project_fkey; Type: FK CONSTRAINT; Schema: projects; Owner: -
--

ALTER TABLE ONLY projects.query
    ADD CONSTRAINT query_fk_project_fkey FOREIGN KEY (fk_project) REFERENCES projects.project(pk_entity);


--
-- TOC entry 5605 (class 2606 OID 244902)
-- Name: query_vt query_vt_fk_project_fkey; Type: FK CONSTRAINT; Schema: projects; Owner: -
--

ALTER TABLE ONLY projects.query_vt
    ADD CONSTRAINT query_vt_fk_project_fkey FOREIGN KEY (fk_project) REFERENCES projects.project(pk_entity);


--
-- TOC entry 5567 (class 2606 OID 244865)
-- Name: text_property text_property_fk_language_fkey; Type: FK CONSTRAINT; Schema: projects; Owner: -
--

ALTER TABLE ONLY projects.text_property
    ADD CONSTRAINT text_property_fk_language_fkey FOREIGN KEY (fk_language) REFERENCES information.language(pk_entity);


--
-- TOC entry 5568 (class 2606 OID 244872)
-- Name: text_property text_property_fk_system_type_fkey; Type: FK CONSTRAINT; Schema: projects; Owner: -
--

ALTER TABLE ONLY projects.text_property
    ADD CONSTRAINT text_property_fk_system_type_fkey FOREIGN KEY (fk_system_type) REFERENCES system.system_type(pk_entity);


--
-- TOC entry 5585 (class 2606 OID 243031)
-- Name: class_field_config ui_context_config_fk_property_fkey; Type: FK CONSTRAINT; Schema: projects; Owner: -
--

ALTER TABLE ONLY projects.class_field_config
    ADD CONSTRAINT ui_context_config_fk_property_fkey FOREIGN KEY (fk_property) REFERENCES data_for_history.property(dfh_pk_property);


--
-- TOC entry 5586 (class 2606 OID 243455)
-- Name: class_field_config ui_context_config_fk_ui_context_fkey; Type: FK CONSTRAINT; Schema: projects; Owner: -
--

ALTER TABLE ONLY projects.class_field_config
    ADD CONSTRAINT ui_context_config_fk_ui_context_fkey FOREIGN KEY (fk_app_context) REFERENCES system.app_context(pk_entity);


--
-- TOC entry 5608 (class 2606 OID 244915)
-- Name: visual visual_fk_project_fkey; Type: FK CONSTRAINT; Schema: projects; Owner: -
--

ALTER TABLE ONLY projects.visual
    ADD CONSTRAINT visual_fk_project_fkey FOREIGN KEY (fk_project) REFERENCES projects.project(pk_entity);


--
-- TOC entry 5609 (class 2606 OID 244920)
-- Name: visual_vt visual_vt_fk_project_fkey; Type: FK CONSTRAINT; Schema: projects; Owner: -
--

ALTER TABLE ONLY projects.visual_vt
    ADD CONSTRAINT visual_vt_fk_project_fkey FOREIGN KEY (fk_project) REFERENCES projects.project(pk_entity);


--
-- TOC entry 5561 (class 2606 OID 240294)
-- Name: accesstoken accesstoken_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.accesstoken
    ADD CONSTRAINT accesstoken_userid_fkey FOREIGN KEY (userid) REFERENCES public.account(id);


--
-- TOC entry 5569 (class 2606 OID 240490)
-- Name: account_project_rel account_project_rel_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.account_project_rel
    ADD CONSTRAINT account_project_rel_account_id_fkey FOREIGN KEY (account_id) REFERENCES public.account(id);


--
-- TOC entry 5570 (class 2606 OID 244990)
-- Name: account_project_rel account_project_rel_fk_project_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.account_project_rel
    ADD CONSTRAINT account_project_rel_fk_project_fkey FOREIGN KEY (fk_project) REFERENCES projects.project(pk_entity);


--
-- TOC entry 5612 (class 2606 OID 244995)
-- Name: account_project_rel_vt account_project_rel_vt_fk_project_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.account_project_rel_vt
    ADD CONSTRAINT account_project_rel_vt_fk_project_fkey FOREIGN KEY (fk_project) REFERENCES projects.project(pk_entity);


--
-- TOC entry 5562 (class 2606 OID 240321)
-- Name: rolemapping rolemapping_roleid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.rolemapping
    ADD CONSTRAINT rolemapping_roleid_fkey FOREIGN KEY (roleid) REFERENCES public.role(id);


--
-- TOC entry 5607 (class 2606 OID 244114)
-- Name: class_has_type_property class_has_type_property_fk_class_fkey; Type: FK CONSTRAINT; Schema: system; Owner: -
--

ALTER TABLE ONLY system.class_has_type_property
    ADD CONSTRAINT class_has_type_property_fk_class_fkey FOREIGN KEY (fk_class) REFERENCES data_for_history.class(dfh_pk_class);


--
-- TOC entry 5606 (class 2606 OID 244119)
-- Name: class_has_type_property class_has_type_property_fk_property_fkey; Type: FK CONSTRAINT; Schema: system; Owner: -
--

ALTER TABLE ONLY system.class_has_type_property
    ADD CONSTRAINT class_has_type_property_fk_property_fkey FOREIGN KEY (fk_property) REFERENCES data_for_history.property(dfh_pk_property);


--
-- TOC entry 5589 (class 2606 OID 243467)
-- Name: class_field fk_system_type_ng_component_fkey; Type: FK CONSTRAINT; Schema: system; Owner: -
--

ALTER TABLE ONLY system.class_field
    ADD CONSTRAINT fk_system_type_ng_component_fkey FOREIGN KEY (fk_system_type_ng_component) REFERENCES system.system_type(pk_entity);


--
-- TOC entry 5596 (class 2606 OID 243399)
-- Name: class_field_property_rel property_set_property_rel_fk_property_fkey; Type: FK CONSTRAINT; Schema: system; Owner: -
--

ALTER TABLE ONLY system.class_field_property_rel
    ADD CONSTRAINT property_set_property_rel_fk_property_fkey FOREIGN KEY (fk_property) REFERENCES data_for_history.property(dfh_pk_property);


--
-- TOC entry 5597 (class 2606 OID 243394)
-- Name: class_field_property_rel property_set_property_rel_fk_property_set_fkey; Type: FK CONSTRAINT; Schema: system; Owner: -
--

ALTER TABLE ONLY system.class_field_property_rel
    ADD CONSTRAINT property_set_property_rel_fk_property_set_fkey FOREIGN KEY (fk_class_field) REFERENCES system.class_field(pk_entity);


--
-- TOC entry 5610 (class 2606 OID 244749)
-- Name: system_relevant_class system_relevant_class_fk_class_fkey; Type: FK CONSTRAINT; Schema: system; Owner: -
--

ALTER TABLE ONLY system.system_relevant_class
    ADD CONSTRAINT system_relevant_class_fk_class_fkey FOREIGN KEY (fk_class) REFERENCES data_for_history.class(dfh_pk_class);


--
-- TOC entry 5611 (class 2606 OID 244777)
-- Name: system_relevant_type system_relevant_type_fk_type_fkey; Type: FK CONSTRAINT; Schema: system; Owner: -
--

ALTER TABLE ONLY system.system_relevant_type
    ADD CONSTRAINT system_relevant_type_fk_type_fkey FOREIGN KEY (fk_type) REFERENCES information.persistent_item(pk_entity);


-- Completed on 2019-05-15 15:21:13 CEST

--
-- PostgreSQL database dump complete
--

