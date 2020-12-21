CREATE OR REPLACE FUNCTION information.v_language_find_or_create()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
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
      $BODY$;