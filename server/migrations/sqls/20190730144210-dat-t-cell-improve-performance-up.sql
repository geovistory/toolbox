/* Replace with your SQL commands */
-- 1
DROP TRIGGER IF EXISTS sync_quill_doc_and_string ON data.cell;

-- 2
ALTER TABLE commons.text DROP CONSTRAINT text_quill_doc_check;
ALTER TABLE data.cell DROP CONSTRAINT text_quill_doc_check;
ALTER TABLE data.chunk DROP CONSTRAINT text_quill_doc_check;
ALTER TABLE data.digital DROP CONSTRAINT text_quill_doc_check;
ALTER TABLE data.text_property DROP CONSTRAINT text_quill_doc_check;
ALTER TABLE information.appellation DROP CONSTRAINT text_quill_doc_check;
ALTER TABLE information.text_property DROP CONSTRAINT text_quill_doc_check;
ALTER TABLE projects.text_property DROP CONSTRAINT text_quill_doc_check;

ALTER TABLE data.cell_vt DROP CONSTRAINT text_quill_doc_check;
ALTER TABLE data.chunk_vt DROP CONSTRAINT text_quill_doc_check;
ALTER TABLE data.digital_vt DROP CONSTRAINT text_quill_doc_check;
ALTER TABLE data.text_property_vt DROP CONSTRAINT text_quill_doc_check;
ALTER TABLE information.appellation_vt DROP CONSTRAINT text_quill_doc_check;
ALTER TABLE information.text_property_vt DROP CONSTRAINT text_quill_doc_check;
ALTER TABLE projects.text_property_vt DROP CONSTRAINT text_quill_doc_check;


-- 3
ALTER TABLE data.cell NO INHERIT commons.text;
ALTER TABLE data.cell
DROP COLUMN quill_doc;
ALTER TABLE data.cell
  ADD COLUMN quill_doc jsonb;


-- 4
ALTER TABLE data.cell_vt NO INHERIT commons.text_vt;
ALTER TABLE data.cell_vt
DROP COLUMN quill_doc;
ALTER TABLE data.cell_vt
  ADD COLUMN quill_doc jsonb;

-- 5
ALTER TABLE commons.text  ADD CONSTRAINT text_quill_doc_check CHECK (quill_doc IS NULL OR commons.validate_quill_doc(quill_doc));
ALTER TABLE data.cell  ADD CONSTRAINT text_quill_doc_check CHECK (quill_doc IS NULL OR commons.validate_quill_doc(quill_doc));
ALTER TABLE data.chunk  ADD CONSTRAINT text_quill_doc_check CHECK (quill_doc IS NULL OR commons.validate_quill_doc(quill_doc));
ALTER TABLE data.digital  ADD CONSTRAINT text_quill_doc_check CHECK (quill_doc IS NULL OR commons.validate_quill_doc(quill_doc));
ALTER TABLE data.text_property  ADD CONSTRAINT text_quill_doc_check CHECK (quill_doc IS NULL OR commons.validate_quill_doc(quill_doc));
ALTER TABLE information.appellation  ADD CONSTRAINT text_quill_doc_check CHECK (quill_doc IS NULL OR commons.validate_quill_doc(quill_doc));
ALTER TABLE information.text_property  ADD CONSTRAINT text_quill_doc_check CHECK (quill_doc IS NULL OR commons.validate_quill_doc(quill_doc));
ALTER TABLE projects.text_property  ADD CONSTRAINT text_quill_doc_check CHECK (quill_doc IS NULL OR commons.validate_quill_doc(quill_doc));

-- 6
ALTER TABLE data.cell INHERIT commons.text;
ALTER TABLE data.cell_vt INHERIT commons.text_vt;
