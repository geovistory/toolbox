-- Test the creation pgwar.statement with place
BEGIN;

SELECT plan(6);

PREPARE get_all_pgwar_statements AS
SELECT *
FROM pgwar.statement;

-- Insert an place 
INSERT INTO information.place (geo_point, fk_class, notes)
VALUES (
        ST_SetSRID(ST_MakePoint(7.123, 3.123), 4326)::geography,
        123,
        '_1'
    );

-- Insert one statement referencing place '_1'
INSERT INTO information.statement(fk_subject_info, fk_property, fk_object_info)
SELECT 0,
    0,
    pk_entity
FROM information.place
WHERE notes = '_1';

SELECT is(
        object_label,
         'WGS84: 7.123°, 3.123°',
        'Assert statement has correct object_label'
    )
FROM pgwar.statement;

SELECT ok(
        object_value IS NOT NULL,
        'Assert statement has an object_value'
    )
FROM pgwar.statement;

-- Update the literal
UPDATE information.place
SET geo_point = ST_SetSRID(ST_MakePoint(17.123, 13.123), 4326)::geography
WHERE notes = '_1';

SELECT is(
        object_label,
        'WGS84: 17.123°, 13.123°',
        'Assert statement object_label has been updated'
    )
FROM pgwar.statement;

-- Delete the statement
DELETE FROM information.statement;

SELECT is_empty(
        'get_all_pgwar_statements',
        'Assert pgwar statement is empty after deleting statement'
    );

-- Re-insert one statement referencing place '_1'
INSERT INTO information.statement(fk_subject_info, fk_property, fk_object_info)
SELECT 0,
    0,
    pk_entity
FROM information.place
WHERE notes = '_1';

SELECT isnt_empty(
        'get_all_pgwar_statements',
        'Assert pgwar statement is not empty after re-inserting a statement'
    );

-- Delete the literal
DELETE FROM information.place;

SELECT is_empty(
        'get_all_pgwar_statements',
        'Assert pgwar statement is empty after deleting literal'
    );

-- Finish the tests and clean up.
SELECT *
FROM finish();

ROLLBACK;