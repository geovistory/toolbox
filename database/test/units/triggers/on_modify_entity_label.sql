-- Start transaction and plan the tests.
BEGIN;
SELECT
    plan(1);

-- Insert literal-statement
INSERT INTO information.statement (fk_subject, fk_object, object_string)
VALUES (1, 2, null);

-- Insert entity label
INSERT INTO war.entity_label (pk_entity, label) VALUES
    (2, 'Foo');

-- Assert that the label propagates from 2 to 1
SELECT is(
   t1.label,
   'Foo',
   'Assure label of 4 is Foo'
) from  war.entity_label t1
where t1.pk_entity = 1;


-- Finish the tests and clean up.
SELECT
    *
FROM
    finish();
ROLLBACK;

