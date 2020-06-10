-- 1
DROP INDEX data.digital_vt_string_idx;


CREATE INDEX digital_vt_string_idx
ON data.digital_vt USING btree
(string COLLATE pg_catalog."default")
TABLESPACE pg_default;
