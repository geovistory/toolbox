CREATE OR REPLACE FUNCTION information.v_language_find_or_create()
      RETURNS trigger
      LANGUAGE 'plpgsql'
      COST 100
      VOLATILE NOT LEAKPROOF
AS $BODY$
      DECLARE
         resulting_pk integer;
         resulting_row information.v_language;
      BEGIN

         -- RAISE INFO 'input values: %', NEW;
            
         ------ if existing, store in result -----
         SELECT * FROM INTO resulting_row information.v_language
            WHERE         
                     fk_class = NEW.fk_class
               AND lang_type = NEW.lang_type
               AND scope = NEW.scope
               AND iso6392b = NEW.iso6392b
               AND iso6392t = NEW.iso6392t
               AND iso6391 = NEW.iso6391
               AND pk_language = NEW.pk_language;

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
                           iso6391,
                           pk_language
                        ) 
                        VALUES (
                           NEW.fk_class,
                           NEW.lang_type,
                           NEW.scope,
                           NEW.iso6392b,
                           NEW.iso6392t,
                           NEW.iso6391,
                           NEW.pk_language
                        )
                        -- return all fields of the new row
                        RETURNING *
                        ) 
                  SELECT pk_entity FROM INTO resulting_pk _insert;
            
            
                     -- RAISE INFO 'result of insert: %', resulting_row;
         END IF;


            SELECT * FROM INTO resulting_row information.v_language
            WHERE pk_entity = resulting_pk;
            
      RETURN resulting_row;
         END;
         $BODY$;