-- 5
DROP INDEX war.entity_preview_key_idx;

-- 4
DROP TRIGGER generate_key ON war.entity_preview;

-- 3
DROP FUNCTION war.entity_preview_generate_key ();

-- 2
-- no need
-- 1
ALTER TABLE war.entity_preview
    DROP COLUMN key;

