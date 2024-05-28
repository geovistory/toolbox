-- Start transaction and plan the tests.
BEGIN;

SELECT
    plan(2);

\set entity_id 1000000


-- prepare procedure to add one literal-statement to last entity
PREPARE add_literal_statement AS 
    INSERT INTO information.statement (fk_subject, fk_object, object_string) VALUES 
    (:entity_id::int, null,  'Second label');

-- check performance of adding the statement 
SELECT performs_within(
    'add_literal_statement',
    1, -- average_milliseconds
    1, -- within +/- ms
    10, -- iterations
    'Assert that inserting a literal statement takes less than 5ms'
);

-- prepare procedure to delete one literal-statement of last entity
PREPARE delete_literal_statement AS 
   DELETE FROM information.statement 
   WHERE fk_subject= :entity_id::int
   AND object_string='Second label';

-- check performance of deleting the statement 
SELECT performs_ok(
    'delete_literal_statement',
    5,
    'Assert that deleting a literal statement takes less than 5ms'
);

-- Finish the tests and clean up.
SELECT
    *
FROM
    finish();
ROLLBACK;

