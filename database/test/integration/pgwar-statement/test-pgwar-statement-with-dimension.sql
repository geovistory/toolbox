-- Test the creation pgwar.statement with dimension
BEGIN;

SELECT plan(6);

PREPARE get_all_pgwar_statements AS
SELECT *
FROM pgwar.statement;

-- Insert a measurement unit
INSERT INTO information.resource(fk_class)
VALUES (0);

-- Insert a dimension 
INSERT INTO information.dimension(
        numeric_value,
        fk_measurement_unit,
        fk_class,
        notes
    )
SELECT 43.21,
    pk_entity,
    0,
    '_1'
FROM information.resource;

-- Insert one statement referencing dimension '_1'
INSERT INTO information.statement(fk_subject_info, fk_property, fk_object_info)
SELECT 0,
    0,
    pk_entity
FROM information.dimension
WHERE notes = '_1';

SELECT is(
        object_label,
        '43.21',
        'Assert statement has correct object_label'
    )
FROM pgwar.statement;

SELECT ok(
        object_value IS NOT NULL,
        'Assert statement has an object_value'
    )
FROM pgwar.statement;

-- Update the literal
UPDATE information.dimension
SET numeric_value = 2
WHERE notes = '_1';

SELECT is(
        object_label,
        '2',
        'Assert statement object_label has been updated'
    )
FROM pgwar.statement;

-- Delete the statement
DELETE FROM information.statement;

SELECT is_empty(
        'get_all_pgwar_statements',
        'Assert pgwar statement is empty after deleting statement'
    );

-- Re-insert one statement referencing dimension '_1'
INSERT INTO information.statement(fk_subject_info, fk_property, fk_object_info)
SELECT 0,
    0,
    pk_entity
FROM information.dimension
WHERE notes = '_1';

SELECT isnt_empty(
        'get_all_pgwar_statements',
        'Assert pgwar statement is not empty after re-inserting a statement'
    );

-- Delete the literal
DELETE FROM information.dimension;

SELECT is_empty(
        'get_all_pgwar_statements',
        'Assert pgwar statement is empty after deleting literal'
    );

-- Finish the tests and clean up.
SELECT *
FROM finish();

ROLLBACK;