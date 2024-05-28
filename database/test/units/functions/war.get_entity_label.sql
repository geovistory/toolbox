-- Start transaction and plan the tests.
BEGIN;
SELECT
    plan(1);

-- Insert mock data
INSERT INTO information.statement (fk_subject, fk_object, object_string) VALUES 
    (1, null, 'Foo'),
    (1, 2, null);

-- Insert mock data
INSERT INTO war.entity_label (pk_entity, label) VALUES
    (2, 'Bar'),
    (99, 'Baz');

SELECT is(
   label,
   'Foo, Bar',
   'Assure get_entity_label concatenates the fitst 2 literal-statements'
) from war.get_entity_label(1) AS label;

-- Finish the tests and clean up.
SELECT
    *
FROM
    finish();
ROLLBACK;

