-- 3
DROP TRIGGER on_insert ON data.v_chunk;

-- 2
DROP FUNCTION data.v_chunk_find_or_create();

-- 1
DROP VIEW data.v_chunk;
