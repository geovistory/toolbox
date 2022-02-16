CREATE OR REPLACE VIEW information.v_appellation AS
SELECT
  appellation.pk_entity,
  appellation.schema_name,
  appellation.table_name,
  appellation.notes,
  appellation.fk_creator,
  appellation.fk_last_modifier,
  appellation.tmsp_creation,
  appellation.tmsp_last_modification,
  appellation.sys_period,
  appellation.fk_class,
  appellation.quill_doc,
  appellation.string
FROM
  information.appellation;

CREATE FUNCTION information.v_appellation_find_or_create ()
  RETURNS TRIGGER
  LANGUAGE 'plpgsql'
  COST 100 VOLATILE NOT LEAKPROOF
  AS $BODY$
DECLARE
  resulting_pk integer;
  resulting_row information.v_appellation;
BEGIN
  RAISE INFO 'input values: %', NEW;
  ------ if existing, store in result -----
  SELECT
    *
  FROM
    INTO resulting_row information.v_appellation
  WHERE
    string = COALESCE(NEW.string, commons.quill_doc_to_string (NEW.quill_doc))
    AND fk_class = NEW.fk_class;
  RAISE INFO 'result of select: %', resulting_row;
  ------- if not existing, insert and store in result -----
  IF NOT FOUND THEN
    RAISE INFO 'Not found, creating new...';
    WITH _insert AS (
INSERT INTO information.appellation (string, quill_doc, fk_class)
        VALUES (NEW.string, NEW.quill_doc, NEW.fk_class)
        -- return all fields of the new row
      RETURNING
        *)
      SELECT
        pk_entity
      FROM
        INTO resulting_pk _insert;
    SELECT
      *
    FROM
      INTO resulting_row information.v_appellation
    WHERE
      pk_entity = resulting_pk;
    RAISE INFO 'result of insert: %', resulting_row;
  END IF;
  RETURN resulting_row;
END;
$BODY$;

CREATE TRIGGER _02_find_or_create
  INSTEAD OF INSERT ON information.v_appellation
  FOR EACH ROW
  EXECUTE PROCEDURE information.v_appellation_find_or_create ();

