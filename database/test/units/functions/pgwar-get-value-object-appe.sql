-- Test the functions converting literal tables to value object json
-- Start transaction and plan the tests.
BEGIN;

SELECT plan(1);

INSERT INTO information.appellation (string, fk_class)
VALUES ('foo', 123);

SELECT is(
        pgwar.get_value_object(appe),
        format('{
            "string": {
                "pkEntity": %s,
                "fkClass": 123,
                "string": "foo"
            }
        }', appe.pk_entity)::jsonb,
        'Assert information.appellation is correctly converted to json'
    )
FROM information.appellation appe;

-- Finish the tests and clean up.
SELECT *
FROM finish();

ROLLBACK;