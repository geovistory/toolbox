-- Test the creation of project entity label
-- Start transaction and plan the tests.
BEGIN;

SELECT plan(5);

INSERT INTO projects.project (pk_entity)
VALUES (1);

INSERT INTO pgwar.project_statements (
    pk_entity,
    fk_project,
    fk_subject_info,
    fk_property,
    fk_object_info,
    object_label,
    object_value
)
VALUES (
    1,
    1,
    44,
    55,
    66,
    'Label 1',
    '{}'::jsonb
);
-- Test 1: assert that field change has only one row
SELECT is(
            count(*)::int,
            1,
            'Assert there is only one row in field_change'
        )
FROM pgwar.field_change;
-- Test 2: Check if field_change contains the correct values
SELECT results_eq(
            'SELECT 1, 44, NULL::bigint, 55, true;',
            'SELECT fk_project, fk_source_info, fk_source_tables_cell, fk_property, is_outgoing FROM pgwar.field_change;',
            'field_change contains the correct data'
        );
DELETE FROM pgwar.field_change;
-- Insert project statement with entity
INSERT INTO pgwar.project_statements (
    pk_entity,
    fk_project,
    fk_subject_info,
    fk_property,
    fk_object_info,
    fk_object_tables_cell,
    object_value
)
VALUES(
    2,
    1,
    44,
    55,
    66,
    1337,
    NULL
);
-- Test 3: assert that field change has 2 rows
SELECT is(
           count(*)::int,
           2,
           'Assert there is only one row in field_change'
        )
FROM pgwar.field_change;
-- Test 4: Check if field_change contains the correct values and is_outgoing is TRUE
SELECT results_eq(
           'SELECT 1, 44, NULL::bigint, 55, TRUE;',
           'SELECT fk_project, fk_source_info, fk_source_tables_cell, fk_property, is_outgoing FROM pgwar.field_change WHERE is_outgoing;',
           'field_change contains the correct data'
        );
-- Test 5: Check if field_change contains the correct values and is_outgoing is FALSE
SELECT results_eq(
           'SELECT 1, 66, 1337::bigint, 55, FALSE;',
           'SELECT fk_project, fk_source_info, fk_source_tables_cell, fk_property, is_outgoing FROM pgwar.field_change WHERE is_outgoing IS FALSE;',
           'field_change contains the correct data'
        );


-- Finish the tests and clean up.
SELECT *
FROM finish();

ROLLBACK;