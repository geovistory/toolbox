--- 1

DROP TRIGGER _01_sync_quill_doc_and_string ON information.v_appellation;

CREATE OR REPLACE FUNCTION information.v_appellation_find_or_create()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF 
AS $BODY$
  DECLARE
    resulting_pk integer;
    resulting_row information.v_appellation;
  BEGIN

    RAISE INFO 'input values: %', NEW;
      
    ------ if existing, store in result -----
    SELECT * FROM INTO resulting_row information.v_appellation
      WHERE 
      string = COALESCE(NEW.string, commons.quill_doc_to_string(NEW.quill_doc))
      AND fk_class = NEW.fk_class;
        
          RAISE INFO 'result of select: %', resulting_row;

    ------- if not existing, insert and store in result -----
      IF NOT FOUND THEN
        
            RAISE INFO 'Not found, creating new...';
      
          WITH _insert AS (
              INSERT INTO information.appellation (
                string,
                quill_doc, 
                fk_class
              ) 
              VALUES (
                NEW.string,
                NEW.quill_doc, 
                NEW.fk_class
              )
              -- return all fields of the new row
              RETURNING *
              ) 
        SELECT pk_entity FROM INTO resulting_pk _insert;
        
        SELECT * FROM INTO resulting_row information.v_appellation
        WHERE pk_entity = resulting_pk;
        
        RAISE INFO 'result of insert: %', resulting_row;

    END IF;

  RETURN resulting_row;
    END;
    $BODY$;


-- 2

DROP TRIGGER _01_sync_quill_doc_and_string ON information.v_text_property;

CREATE OR REPLACE FUNCTION information.v_text_property_find_or_create()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF 
AS $BODY$

            DECLARE
              resulting_pk integer;
              resulting_row information.v_text_property;
            BEGIN

              -- RAISE INFO 'input values: %', NEW;
                
              ------ if existing, store in result -----
              SELECT * FROM INTO resulting_row information.v_text_property
                WHERE              
                    string = COALESCE(NEW.string, commons.quill_doc_to_string(NEW.quill_doc))
                    AND fk_class_field = NEW.fk_class_field
                    AND fk_concerned_entity = NEW.fk_concerned_entity
                    AND fk_language = NEW.fk_language;

                    -- RAISE INFO 'result of select: %', resulting_pk;

              ------- if not existing, insert and store in result -----
                IF NOT FOUND THEN
                  
                      -- RAISE INFO 'Not found, creating new...';
                
                    WITH _insert AS (
                        INSERT INTO information.text_property (
                          string,
                          quill_doc, 
                          fk_class_field,
                          fk_concerned_entity,
                          fk_language
                        ) 
                        VALUES (
                          NEW.string,
                          NEW.quill_doc::jsonb, 
                          NEW.fk_class_field,
                          NEW.fk_concerned_entity,
                          NEW.fk_language
                        )
                        -- return all fields of the new row
                        RETURNING *
                        ) 
                    SELECT pk_entity FROM INTO resulting_pk _insert;

                    SELECT * FROM INTO resulting_row information.v_text_property
                    WHERE pk_entity = resulting_pk;
                
                      -- RAISE INFO 'result of insert: %', resulting_pk;
              END IF;

            RETURN resulting_row;
              END;
              
        $BODY$;