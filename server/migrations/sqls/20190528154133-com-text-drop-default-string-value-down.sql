-- ALTER TABLE data.chunk DROP CONSTRAINT text_fkey;

ALTER TABLE data.chunk
    ADD CONSTRAINT text_fkey FOREIGN KEY (fk_entity_version, fk_text)
    REFERENCES commons.text (entity_version, pk_text) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;

alter table commons.text alter column string set default ''::text;
