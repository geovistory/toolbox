-- Start transaction and plan the tests.
BEGIN;
SELECT
    plan(1);

-- Insert literal-statement
INSERT INTO information.statement (fk_subject, fk_object, object_string) VALUES 
    (1, 2, null), -- circular reference
    (2, 1, null), -- circular reference
    (2, null, 'Foo');

-- Assert that the label is trucated at 100 characters
SELECT is(
   t1.label,
   'Foo, Foo, Foo, Foo, Foo, Foo, Foo, Foo, Foo, Foo, Foo, Foo, Foo, Foo, Foo, Foo, Foo, Foo, Foo, Foo, ',
   'Assert that label from circular reference is limited to 100 chars'
) from  war.entity_label t1
where t1.pk_entity = 1;

-- Finish the tests and clean up.
SELECT
    *
FROM
    finish();
ROLLBACK;

