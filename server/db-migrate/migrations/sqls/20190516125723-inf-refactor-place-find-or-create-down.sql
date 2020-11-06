CREATE OR REPLACE FUNCTION information.v_place_find_or_create()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF 
AS $BODY$
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
      $BODY$;

