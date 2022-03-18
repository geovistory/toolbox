ALTER TABLE commons.text
  ADD CONSTRAINT text_quill_doc_check CHECK (quill_doc IS NULL OR commons.validate_quill_doc (quill_doc));

ALTER TABLE information.appellation
  ADD CONSTRAINT text_quill_doc_check CHECK (quill_doc IS NULL OR commons.validate_quill_doc (quill_doc));

ALTER TABLE information.lang_string
  ADD CONSTRAINT text_quill_doc_check CHECK (quill_doc IS NULL OR commons.validate_quill_doc (quill_doc));

