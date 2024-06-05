-- Test the creation pgwar.statement with appellation
BEGIN;

SELECT plan(6);

PREPARE get_all_pgwar_statements AS
SELECT *
FROM pgwar.statement;

-- Insert an appellation 
INSERT INTO information.appellation(string, fk_class, notes)
VALUES ('foo', 0, '_a1');

-- Insert one statement referencing appellation '_a1'
INSERT INTO information.statement(fk_subject_info, fk_property, fk_object_info)
SELECT 0,
    0,
    pk_entity
FROM information.appellation
WHERE notes = '_a1';

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
UPDATE information.appellation
SET string = 'bar'
WHERE notes = '_a1';

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

-- Re-insert one statement referencing appellation '_a1'
INSERT INTO information.statement(fk_subject_info, fk_property, fk_object_info)
SELECT 0,
    0,
    pk_entity
FROM information.appellation
WHERE notes = '_a1';

SELECT isnt_empty(
        'get_all_pgwar_statements',
        'Assert pgwar statement is not empty after re-inserting a statement'
    );

-- Delete the literal
DELETE FROM information.appellation;

SELECT is_empty(
        'get_all_pgwar_statements',
        'Assert pgwar statement is empty after deleting literal'
    );

-- Finish the tests and clean up.
SELECT *
FROM finish();

ROLLBACK;