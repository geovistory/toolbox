-- Test the creation pgwar.statement with cell
BEGIN;

SELECT plan(6);

PREPARE get_all_pgwar_statements AS
SELECT *
FROM pgwar.statement;

-- Insert a cell 
INSERT INTO tables.cell (
        fk_row,
        fk_column,
        fk_digital,
        entity_version,
        string_value,
        numeric_value,
        fk_class,
        notes
    )
VALUES(44, 55, 0, 1, 'foo', 43.21, 88, '_1');

-- Insert one statement referencing cell '_1'
INSERT INTO information.statement(
        fk_subject_info,
        fk_property,
        fk_object_tables_cell
    )
SELECT 0,
    0,
    pk_cell
FROM tables.cell
WHERE notes = '_1';

SELECT is(
        object_label,
        'foo',
        'Assert statement has correct object_label'
    )
FROM pgwar.statement;

SELECT ok(
        object_value IS NOT NULL,
        'Assert statement has an object_value'
    )
FROM pgwar.statement;

-- Update the literal
UPDATE tables.cell
SET string_value = 'bar'
WHERE notes = '_1';

SELECT is(
        object_label,
        'bar',
        'Assert statement object_label has been updated'
    )
FROM pgwar.statement;

-- Delete the statement
DELETE FROM information.statement;

SELECT is_empty(
        'get_all_pgwar_statements',
        'Assert pgwar statement is empty after deleting statement'
    );

-- Re-insert one statement referencing cell '_1'
INSERT INTO information.statement(fk_subject_info, fk_property, fk_object_tables_cell)
SELECT 0,
    0,
    pk_cell
FROM tables.cell
WHERE notes = '_1';

SELECT isnt_empty(
        'get_all_pgwar_statements',
        'Assert pgwar statement is not empty after re-inserting a statement'
    );

-- Delete the literal
DELETE FROM tables.cell;

SELECT is_empty(
        'get_all_pgwar_statements',
        'Assert pgwar statement is empty after deleting literal'
    );

-- Finish the tests and clean up.
SELECT *
FROM finish();

ROLLBACK;