-- Initialize extensions
----------------------
CREATE EXTENSION IF NOT EXISTS postgis WITH SCHEMA public;

CREATE EXTENSION pldbgapi;

CREATE EXTENSION pgtap;


-- Inialize schemas
-------------------
CREATE SCHEMA commons;

CREATE SCHEMA information;

CREATE SCHEMA war;

-- Inialize common functions
----------------------------
CREATE FUNCTION commons.tmsp_last_modification() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
  BEGIN NEW.tmsp_last_modification = NOW();
  RETURN NEW;
  END;
$$;


CREATE OR REPLACE FUNCTION war.get_entity_label(id integer)
RETURNS VARCHAR AS $$
DECLARE
    entity_label VARCHAR(100);
BEGIN
    -- Query the label of this entity
    SELECT SUBSTRING(STRING_AGG(label_part, ', ') FROM 1 FOR 100) INTO entity_label
    FROM (
      SELECT COALESCE(t1.object_string, t2.label) label_part
        FROM information.statement t1
      LEFT JOIN war.entity_label t2 ON t1.fk_object = t2.pk_entity
        WHERE t1.fk_subject = id
      ORDER BY t1.pk_entity ASC
      LIMIT 2
    ) AS parts;
      
    RETURN entity_label;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION war.update_entity_label(entity_id integer, entity_label VARCHAR(100))
RETURNS VOID AS $$
BEGIN
    IF entity_label IS NOT NULL THEN
      -- insert ...
      INSERT INTO war.entity_label (pk_entity, label)
      VALUES (entity_id, entity_label)
      ON CONFLICT (pk_entity) 
      -- ... or update the entity_label 
      DO UPDATE SET label = EXCLUDED.label
      -- ... where it is distinct from previous value
      WHERE entity_label.label IS DISTINCT FROM EXCLUDED.label;
    ELSE
      -- delete the entity_label
      DELETE FROM war.entity_label
      WHERE pk_entity = entity_id;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Trigger function on modify statement
---------------------------------------
CREATE FUNCTION information.on_modify_statement() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
  DECLARE
    entity_id int;
  BEGIN

    -- get entity_id
    entity_id = COALESCE(NEW.fk_subject, OLD.fk_subject);

    -- update the war.entity_label
    PERFORM war.update_entity_label(entity_id, war.get_entity_label(entity_id));

  RETURN NEW;
  END;
$$;

-- Trigger function on modify entity_label
---------------------------------------
CREATE FUNCTION war.on_modify_entity_label() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
  DECLARE
    entity_id int;
    entity_label VARCHAR(100);
  BEGIN

    -- get entity_id
    entity_id = COALESCE(NEW.pk_entity, OLD.pk_entity);

    -- update the affected entities
    PERFORM war.update_entity_label(fk_subject, war.get_entity_label(fk_subject))
    FROM information.statement
    WHERE fk_object = entity_id;

  RETURN NEW;
  END;
$$;


-- Table information.statement
------------------------------
CREATE TABLE information.statement (
    pk_entity serial PRIMARY KEY,
    fk_subject integer NOT NULL,
    fk_object integer,
    object_string text
);

CREATE INDEX statement_fk_object_idx ON information.statement (fk_object);

CREATE INDEX statement_fk_subject_idx ON information.statement (fk_subject);

CREATE INDEX statement_object_string_idx ON information.statement (object_string);

CREATE TRIGGER on_modify_statement AFTER INSERT OR UPDATE OR DELETE ON information.statement FOR EACH ROW EXECUTE FUNCTION information.on_modify_statement();

-- Table information.entity_label
---------------------------------
CREATE TABLE war.entity_label (
    pk_entity integer PRIMARY KEY,
    label text NOT NULL,
    tmsp_last_modification timestamp without time zone NOT NULL
);

CREATE TRIGGER last_modification_tmsp BEFORE INSERT OR UPDATE ON war.entity_label FOR EACH ROW EXECUTE FUNCTION commons.tmsp_last_modification();

CREATE TRIGGER on_modify_entity_label AFTER INSERT OR UPDATE OR DELETE ON war.entity_label FOR EACH ROW EXECUTE FUNCTION war.on_modify_entity_label();
