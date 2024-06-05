-- Test the functions converting literal tables to labels
-- Start transaction and plan the tests.
BEGIN;

SELECT plan(1);

INSERT INTO information.appellation (string, fk_class)
VALUES ('foo', 123);

SELECT is(
        pgwar.get_value_label(appe),
        'foo',
        'Assert information.appellation is correctly converted to a label'
    )
FROM information.appellation appe;

-- Finish the tests and clean up.
SELECT *
FROM finish();

ROLLBACK;