-- 1 add column for storing cell values in the row table
ALTER TABLE data.row ADD COLUMN row_value jsonb;
ALTER TABLE data.row_vt ADD COLUMN row_value jsonb;

-- 2 add column for string values that do not need a quill_doc
ALTER TABLE data.cell ADD COLUMN string_value text;
ALTER TABLE data.cell_vt ADD COLUMN string_value text;

-- 3 DROP NOT NULL constraints of parent table commons.text
ALTER TABLE commons.text ALTER COLUMN string DROP NOT NULL;
ALTER TABLE commons.text_vt ALTER COLUMN string DROP NOT NULL;

ALTER TABLE commons.text ALTER COLUMN quill_doc DROP NOT NULL;
ALTER TABLE commons.text_vt ALTER COLUMN quill_doc DROP NOT NULL;

-- 4 DROP NOT NULL constraints of data.cell
ALTER TABLE data.cell ALTER COLUMN string DROP NOT NULL;
ALTER TABLE data.cell_vt ALTER COLUMN string DROP NOT NULL;

ALTER TABLE data.cell ALTER COLUMN quill_doc DROP NOT NULL;
ALTER TABLE data.cell_vt ALTER COLUMN quill_doc DROP NOT NULL;

-- 5 Change trigger function to allow string and quill_doc to be both NULL
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

    -- If both string and quill_doc are NOT NULL, raise exception
    IF (string_is_new = true AND quill_doc_is_new = true) THEN
        RAISE EXCEPTION 'You can not provide a string and a quill_doc at the same time when upserting a text.';

    -- If only string is NOT NULL create quill_doc
    ELSIF string_is_new = true THEN
        NEW.quill_doc = commons.string_to_quill_doc(NEW.string);

    -- If only quill_doc is NOT NULL create string
    ELSIF quill_doc_is_new = true THEN
        NEW.string = commons.quill_doc_to_string(NEW.quill_doc);

    -- If both string and quill_doc are NULL, do nothing

    END IF;

  RETURN NEW;
  END;
  $BODY$;


-- 6 ADD NOT NULL constraints to all children of of table commons.text except data.cell
ALTER TABLE information.appellation ALTER COLUMN string SET NOT NULL;
ALTER TABLE information.appellation_vt ALTER COLUMN string SET NOT NULL;
ALTER TABLE information.appellation ALTER COLUMN quill_doc SET NOT NULL;
ALTER TABLE information.appellation_vt ALTER COLUMN quill_doc SET NOT NULL;

ALTER TABLE information.text_property ALTER COLUMN string SET NOT NULL;
ALTER TABLE information.text_property_vt ALTER COLUMN string SET NOT NULL;
ALTER TABLE information.text_property ALTER COLUMN quill_doc SET NOT NULL;
ALTER TABLE information.text_property_vt ALTER COLUMN quill_doc SET NOT NULL;

ALTER TABLE projects.text_property ALTER COLUMN string SET NOT NULL;
ALTER TABLE projects.text_property_vt ALTER COLUMN string SET NOT NULL;
ALTER TABLE projects.text_property ALTER COLUMN quill_doc SET NOT NULL;
ALTER TABLE projects.text_property_vt ALTER COLUMN quill_doc SET NOT NULL;

ALTER TABLE data.text_property ALTER COLUMN string SET NOT NULL;
ALTER TABLE data.text_property_vt ALTER COLUMN string SET NOT NULL;
ALTER TABLE data.text_property ALTER COLUMN quill_doc SET NOT NULL;
ALTER TABLE data.text_property_vt ALTER COLUMN quill_doc SET NOT NULL;

ALTER TABLE data.digital ALTER COLUMN string SET NOT NULL;
ALTER TABLE data.digital_vt ALTER COLUMN string SET NOT NULL;
ALTER TABLE data.digital ALTER COLUMN quill_doc SET NOT NULL;
ALTER TABLE data.digital_vt ALTER COLUMN quill_doc SET NOT NULL;

ALTER TABLE data.chunk ALTER COLUMN string SET NOT NULL;
ALTER TABLE data.chunk_vt ALTER COLUMN string SET NOT NULL;
ALTER TABLE data.chunk ALTER COLUMN quill_doc SET NOT NULL;
ALTER TABLE data.chunk_vt ALTER COLUMN quill_doc SET NOT NULL;


-- 7 Indexes on table cell
CREATE INDEX ON data.cell (string);
CREATE INDEX ON data.cell_vt (string);

CREATE INDEX ON data.cell (string_value);
CREATE INDEX ON data.cell_vt (string_value);

CREATE INDEX ON data.cell (id_for_import_txt);
CREATE INDEX ON data.cell_vt (id_for_import_txt);


-- 8 Indexes on column string of commons.text and all its children
CREATE INDEX ON commons.text (string);
CREATE INDEX ON commons.text_vt (string);

CREATE INDEX ON information.appellation (string);
CREATE INDEX ON information.appellation_vt (string);

CREATE INDEX ON information.text_property (string);
CREATE INDEX ON information.text_property_vt (string);

CREATE INDEX ON projects.text_property (string);
CREATE INDEX ON projects.text_property_vt (string);

CREATE INDEX ON data.text_property (string);
CREATE INDEX ON data.text_property_vt (string);

CREATE INDEX ON data.digital (string);
CREATE INDEX ON data.digital_vt (string);

CREATE INDEX ON data.chunk (string);
CREATE INDEX ON data.chunk_vt (string);
