-- Dummy-test used to check if the test setup is working
BEGIN;
SELECT plan(1);
SELECT is(
        1,
        1,
        'Assert the test setup is working'
    );
-- Finish the tests and clean up.
SELECT *
FROM finish();
ROLLBACK;