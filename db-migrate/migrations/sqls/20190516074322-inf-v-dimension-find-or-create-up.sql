-- 1
CREATE FUNCTION information.v_dimension_find_or_create()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF 
AS $BODY$
    DECLARE
      resulting_pk integer;
      resulting_row information.v_dimension;
    BEGIN

          -- RAISE INFO 'input values: %', NEW;
        
      ------ if existing, store in result -----
      SELECT pk_entity FROM INTO resulting_pk information.dimension
        WHERE              
            fk_class = NEW.fk_class
            AND fk_measurement_unit = NEW.fk_measurement_unit
            AND numeric_value = NEW.numeric_value;

            -- RAISE INFO 'result of select: %', resulting_row;

      ------- if not existing, insert and store in result -----
        IF NOT FOUND THEN
          
              -- RAISE INFO 'Not found, creating new...';
        
            WITH _insert AS (
                INSERT INTO information.dimension (
                    fk_class, 
                    fk_measurement_unit,
                    numeric_value
                ) 
                VALUES (
                    NEW.fk_class, 
                    NEW.fk_measurement_unit,
                    NEW.numeric_value
                )
                -- return all fields of the new row
                RETURNING *
                ) 
              SELECT pk_entity FROM INTO resulting_pk _insert;
        
              -- RAISE INFO 'result of insert: %', resulting_row;
      END IF;

    SELECT * FROM INTO resulting_row information.v_dimension
    WHERE pk_entity = resulting_pk;

    RETURN resulting_row;
      END;
      $BODY$;

-- 2
CREATE TRIGGER on_insert
    INSTEAD OF INSERT
    ON information.v_dimension
    FOR EACH ROW
    EXECUTE PROCEDURE information.v_dimension_find_or_create();
