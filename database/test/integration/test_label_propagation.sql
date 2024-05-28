-- Start transaction and plan the tests.
BEGIN;
SELECT
    plan(1);

-- Insert literal-statement
INSERT INTO information.statement (fk_subject, fk_object, object_string) VALUES 
    (1, 2, null),
    (2, 3, null),
    (3, 4, null),
    (4, null, 'Foo');

-- Assert that the label propagates from 4 to 3 to 2 to 1
SELECT is(
   t1.label,
   'Foo',
   'Assert that the label propagates from 4 to 3 to 2 to 1'
) from  war.entity_label t1
where t1.pk_entity = 1;

-- Finish the tests and clean up.
SELECT
    *
FROM
    finish();
ROLLBACK;

