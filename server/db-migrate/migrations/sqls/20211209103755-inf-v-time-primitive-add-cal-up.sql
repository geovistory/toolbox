-- 1
CREATE OR REPLACE VIEW information.v_time_primitive AS
SELECT
  *
FROM
  information.time_primitive;

-- 2
CREATE OR REPLACE FUNCTION information.v_time_primitive_find_or_create ()
  RETURNS TRIGGER
  LANGUAGE 'plpgsql'
  COST 100 VOLATILE NOT LEAKPROOF
  AS $BODY$
DECLARE
  resulting_pk integer;
  resulting_row information.v_time_primitive;
BEGIN
  -- RAISE INFO 'input values: %', NEW;
  ------ if existing, store in result -----
  SELECT
    pk_entity
  FROM
    INTO resulting_pk information.time_primitive
  WHERE
    julian_day = NEW.julian_day
    AND duration = NEW.duration
    AND calendar = NEW.calendar
    AND fk_class = NEW.fk_class;
  -- RAISE INFO 'result of select: %', resulting_row;
  ------- if not existing, insert and store in result -----
  IF NOT FOUND THEN
    -- RAISE INFO 'Not found, creating new...';
    WITH _insert AS (
INSERT INTO information.time_primitive (julian_day, duration, calendar, fk_class)
        VALUES (NEW.julian_day, NEW.duration, NEW.calendar, NEW.fk_class)
        -- return all fields of the new row
      RETURNING
        *)
      SELECT
        pk_entity
      FROM
        INTO resulting_pk _insert;
    -- RAISE INFO 'result of insert: %', resulting_row;
  END IF;
  SELECT
    *
  FROM
    INTO resulting_row information.v_time_primitive
  WHERE
    pk_entity = resulting_pk;
  RETURN resulting_row;
END;
$BODY$;

