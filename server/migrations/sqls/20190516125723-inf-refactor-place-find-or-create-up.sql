CREATE OR REPLACE FUNCTION information.v_place_find_or_create()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF 
AS $BODY$
    DECLARE
      resulting_pk integer;
      resulting_row information.v_place;
    BEGIN

      -- RAISE INFO 'input values: %', NEW;
        
      ------ if existing, store in result -----
      SELECT 
        *
      FROM INTO resulting_row information.v_place
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
            SELECT pk_entity FROM INTO resulting_pk _insert;

            SELECT * FROM INTO resulting_row information.v_place
            WHERE pk_entity = resulting_pk;
              -- RAISE INFO 'result of insert: %', resulting_row;
      END IF;

    RETURN resulting_row;
      END;
      $BODY$;

