-- 1
DROP INDEX data.digital_string_idx;

CREATE INDEX digital_string_idx
ON data.digital USING hash (string)
TABLESPACE pg_default;
