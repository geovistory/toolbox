-- 13
-- trigger deleted by down step 11

-- 12
-- data migration: deleted by down step 11

-- 11
DROP TABLE tables.row_vt;

-- 10
ALTER TABLE tables."row"
    ALTER COLUMN pk_row DROP DEFAULT;

-- 9
DROP SEQUENCE tables.row_pk_row_seq;

-- 5, 6, 7, 8
-- trigger deleted by down step 1

-- 4
-- data migration: deleted by down step 1

-- 3
DROP INDEX tables.row_fk_digital_idx;

-- 1
DROP TABLE tables."row"
