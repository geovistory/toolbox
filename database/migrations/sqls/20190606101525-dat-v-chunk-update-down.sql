-- 2

CREATE OR REPLACE FUNCTION data.v_chunk_find_or_create()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
    DECLARE
      same_chunk data.chunk;
      same_chunk_version boolean;
      resulting_row data.v_chunk;
      resulting_pk int;
    BEGIN

      ------ Search if such a chunk exists -----
      SELECT * FROM INTO same_chunk data.chunk
      WHERE quill_doc::jsonb = NEW.quill_doc::jsonb
      AND fk_text = NEW.fk_text;

      -- if not existing
      IF same_chunk.pk_entity IS NULL THEN

        -- insert a new chunk
        WITH _insert AS (
            INSERT INTO data.chunk (
              quill_doc,
              fk_text,
              fk_entity_version,
              metadata,
              fk_namespace
            )
            VALUES (
                NEW.quill_doc::jsonb,
                NEW.fk_text,
                NEW.fk_entity_version,
                NEW.metadata,
                NEW.fk_namespace
            )
            RETURNING *
          )
        SELECT pk_entity FROM INTO resulting_pk _insert;

      -- if existing
      ELSIF same_chunk.pk_entity IS NOT NULL THEN

        -- if the fk_entity_version of the found chunk differs from the new
        IF NEW.fk_entity_version != same_chunk.fk_entity_version THEN
          -- update the chunk so that we keep track of when which version was annotated
          UPDATE data.chunk
          SET fk_entity_version = NEW.fk_entity_version
          WHERE pk_entity = same_chunk.pk_entity;
        END IF;

        -- set the resulting pk
        resulting_pk = same_chunk.pk_entity;

      END IF;

     -- select and return the latest chunk version from the view
    SELECT * FROM INTO resulting_row data.v_chunk
    WHERE pk_entity = resulting_pk;
    RETURN resulting_row;
END;
$BODY$;


-- 1

DROP VIEW data.v_chunk;
CREATE OR REPLACE VIEW data.v_chunk AS
 SELECT chunk.pk_entity,
    chunk.schema_name,
    chunk.table_name,
    chunk.entity_version,
    chunk.notes,
    chunk.fk_namespace,
    chunk.fk_creator,
    chunk.fk_last_modifier,
    chunk.tmsp_creation,
    chunk.tmsp_last_modification,
    chunk.sys_period,
    chunk.metadata,
    chunk.pk_text,
    chunk.quill_doc,
    chunk.string,
    chunk.fk_text,
    chunk.fk_entity_version
   FROM data.chunk;

CREATE TRIGGER on_insert
    INSTEAD OF INSERT
    ON data.v_chunk
    FOR EACH ROW
    EXECUTE PROCEDURE data.v_chunk_find_or_create();

