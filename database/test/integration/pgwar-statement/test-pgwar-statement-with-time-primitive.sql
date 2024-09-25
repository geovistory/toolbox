-- Test the creation pgwar.statement with time_primitive
BEGIN;

SELECT plan(6);

PREPARE get_all_pgwar_statements AS
SELECT *
FROM pgwar.statement;

-- Insert an time_primitive 
INSERT INTO information.time_primitive (duration, julian_day, calendar, notes)
VALUES (
        '1 day',
        2460461,
        'gregorian',
        '_1'
    );

-- Insert one statement referencing time_primitive '_1'
INSERT INTO information.statement(fk_subject_info, fk_property, fk_object_info)
SELECT 0,
    0,
    pk_entity
FROM information.time_primitive
WHERE notes = '_1';

SELECT is(
        object_label,
        '2024-05-30 (1 day)',
        'Assert statement has correct object_label'
    )
FROM pgwar.statement;

SELECT ok(
        object_value IS NOT NULL,
        'Assert statement has an object_value'
    )
FROM pgwar.statement;

-- Update the literal
UPDATE information.time_primitive
SET julian_day = 2236211,
    calendar = 'julian'
WHERE notes = '_1';

SELECT is(
        object_label,
        '1410-05-31 (1 day)',
        'Assert statement object_label has been updated'
    )
FROM pgwar.statement;

-- Delete the statement
DELETE FROM information.statement;

SELECT is_empty(
        'get_all_pgwar_statements',
        'Assert pgwar statement is empty after deleting statement'
    );

-- Re-insert one statement referencing time_primitive '_1'
INSERT INTO information.statement(fk_subject_info, fk_property, fk_object_info)
SELECT 0,
    0,
    pk_entity
FROM information.time_primitive
WHERE notes = '_1';

SELECT isnt_empty(
        'get_all_pgwar_statements',
        'Assert pgwar statement is not empty after re-inserting a statement'
    );

-- Delete the literal
DELETE FROM information.time_primitive;

SELECT is_empty(
        'get_all_pgwar_statements',
        'Assert pgwar statement is empty after deleting literal'
    );

-- Finish the tests and clean up.
SELECT *
FROM finish();

ROLLBACK;