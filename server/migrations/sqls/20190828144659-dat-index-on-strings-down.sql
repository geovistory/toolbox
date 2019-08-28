-- 1
DROP INDEX data.digital_string_idx;


CREATE INDEX digital_string_idx
ON data.digital USING btree
(string COLLATE pg_catalog."default")
TABLESPACE pg_default;
