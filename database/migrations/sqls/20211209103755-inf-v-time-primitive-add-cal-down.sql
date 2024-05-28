-- 1
DROP VIEW information.v_time_primitive;

CREATE OR REPLACE VIEW information.v_time_primitive AS
SELECT
  time_primitive.pk_entity,
  time_primitive.schema_name,
  time_primitive.table_name,
  time_primitive.notes,
  time_primitive.fk_creator,
  time_primitive.fk_last_modifier,
  time_primitive.tmsp_creation,
  time_primitive.tmsp_last_modification,
  time_primitive.sys_period,
  time_primitive.metadata,
  time_primitive.duration,
  time_primitive.fk_class,
  time_primitive.julian_day
FROM
  information.time_primitive;

CREATE TRIGGER on_insert
  INSTEAD OF INSERT ON information.v_time_primitive
  FOR EACH ROW
  EXECUTE PROCEDURE information.v_time_primitive_find_or_create ();

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
    AND fk_class = NEW.fk_class;
  -- RAISE INFO 'result of select: %', resulting_row;
  ------- if not existing, insert and store in result -----
  IF NOT FOUND THEN
    -- RAISE INFO 'Not found, creating new...';
    WITH _insert AS (
INSERT INTO information.time_primitive (julian_day, duration, fk_class)
        VALUES (NEW.julian_day, NEW.duration, NEW.fk_class)
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

