-- 14
ALTER TABLE tables.cell  ALTER COLUMN pk_cell DROP DEFAULT;

-- 13
-- done by down step 1

-- 12
DROP SEQUENCE tables.cell_pk_cell_seq;

-- 10
-- drop function again: done by down step 8

-- 9
-- data migration: data.cell -> tables.cell, deleted by down step 1

-- 8
DROP  FUNCTION tables.create_cell_table_for_digital(pk_digital integer);

-- 3, 4, 5, 6, 7
-- data manipulations

-- 2
DROP table tables.cell_vt;

-- 1
DROP table tables.cell;
