-- Start transaction and plan the tests.
BEGIN;
SELECT
    plan(3);

-- Insert literal-statement
INSERT INTO information.statement (fk_subject, fk_object, object_string)
VALUES (4, null, 'Foo');

-- Assert that war.entity_label is not empty
SELECT isnt_empty(
    'select * from war.entity_label',
    'Assure table war.entity_label is not emtpy'
);

-- Assert that war.entity_label contains label "Foo" for pk_entity 4
SELECT is(
   t1.label,
   'Foo',
   'Assure label of 4 is Foo'
) from  war.entity_label t1
where t1.pk_entity = 4;

-- Delete literal-statement
DELETE from information.statement 
WHERE fk_subject = 4;

-- Assert that war.entity_label is empty
SELECT is_empty(
    'select * from war.entity_label',
    'Assure table war.entity_label is not emtpy'
);

-- Finish the tests and clean up.
SELECT
    *
FROM
    finish();
ROLLBACK;

