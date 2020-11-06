ALTER TABLE commons.text ALTER COLUMN string DROP DEFAULT;

ALTER TABLE data.chunk DROP CONSTRAINT text_fkey;

-- ALTER TABLE data.chunk
--     ADD CONSTRAINT text_fkey FOREIGN KEY (fk_text)
--     REFERENCES commons.text (pk_text);
