
-- 8 Indexes on column string of commons.text and all its children
DROP INDEX commons.text_string_idx;
DROP INDEX commons.text_vt_string_idx;

DROP INDEX information.appellation_string_idx;
DROP INDEX information.appellation_vt_string_idx;

DROP INDEX information.text_property_string_idx;
DROP INDEX information.text_property_vt_string_idx;

DROP INDEX projects.text_property_string_idx;
DROP INDEX projects.text_property_vt_string_idx;

DROP INDEX data.text_property_string_idx;
DROP INDEX data.text_property_vt_string_idx;

DROP INDEX data.digital_string_idx;
DROP INDEX data.digital_vt_string_idx;

DROP INDEX data.chunk_string_idx;
DROP INDEX data.chunk_vt_string_idx;

-- 7
DROP INDEX data.cell_string_idx;
DROP INDEX data.cell_vt_string_idx;

DROP INDEX data.cell_string_value_idx;
DROP INDEX data.cell_vt_string_value_idx;

DROP INDEX data.cell_id_for_import_txt_idx;
DROP INDEX data.cell_vt_id_for_import_txt_idx;

-- 6
-- given

-- 5
CREATE OR REPLACE FUNCTION commons.text__sync_quill_doc_and_string()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
  DECLARE
    string_is_new boolean;
    quill_doc_is_new boolean;
  BEGIN

    IF TG_OP = 'UPDATE' THEN
      string_is_new = (NEW.string IS NOT NULL AND NEW.string != OLD.string);
      quill_doc_is_new = (NEW.quill_doc IS NOT NULL AND NEW.quill_doc != OLD.quill_doc);
    ELSE
      string_is_new = (NEW.string IS NOT NULL);
      quill_doc_is_new = (NEW.quill_doc IS NOT NULL);
    END IF;
        -- other code

    IF (string_is_new = true AND quill_doc_is_new = true) THEN
        RAISE EXCEPTION 'You can not provide a string and a quill_doc at the same time when upserting a text.';
    ELSIF string_is_new = true THEN
        NEW.quill_doc = commons.string_to_quill_doc(NEW.string);
    ELSIF quill_doc_is_new = true THEN
        NEW.string = commons.quill_doc_to_string(NEW.quill_doc);
    ELSIF NEW.string IS NULL AND NEW.quill_doc IS  NULL THEN
        RAISE EXCEPTION 'No string or quill_doc provided on upsert of a text.';
    END IF;

  RETURN NEW;
  END;
  $BODY$;

-- 4
ALTER TABLE data.cell ALTER COLUMN string SET NOT NULL;
ALTER TABLE data.cell_vt ALTER COLUMN string SET NOT NULL;

ALTER TABLE data.cell ALTER COLUMN quill_doc SET NOT NULL;
ALTER TABLE data.cell_vt ALTER COLUMN quill_doc SET NOT NULL;


-- 3
ALTER TABLE commons.text ALTER COLUMN string SET NOT NULL;
ALTER TABLE commons.text_vt ALTER COLUMN string SET NOT NULL;

ALTER TABLE commons.text ALTER COLUMN quill_doc SET NOT NULL;
ALTER TABLE commons.text_vt ALTER COLUMN quill_doc SET NOT NULL;


-- 2
ALTER TABLE data.cell DROP COLUMN string_value;
ALTER TABLE data.cell_vt DROP COLUMN string_value;

-- 1
ALTER TABLE data.row DROP COLUMN row_value;
ALTER TABLE data.row_vt DROP COLUMN row_value;
