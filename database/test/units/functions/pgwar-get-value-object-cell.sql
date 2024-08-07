-- Test the functions converting literal tables to value object json
-- Start transaction and plan the tests.
BEGIN;

SELECT plan(1);

INSERT INTO tables.cell (
        fk_row,
        fk_column,
        fk_digital,
        entity_version,
        string_value,
        numeric_value,
        fk_class
    )
VALUES(44, 55, 0, 1, 'foo', 43.21, 88);

SELECT is(
        pgwar.get_value_object(cell),
        format(
            '{
                "cell": {
                    "pkCell": %s,
                    "fkClass": 88,
                    "fkColumn": 55,
                    "fkRow": 44,
                    "stringValue": "foo",
                    "numericValue": 43.21
                }
            }',
            cell.pk_cell
        )::jsonb,
        'Assert tables.cell is correctly converted to json'
    )
FROM tables.cell cell;

-- Finish the tests and clean up.
SELECT *
FROM finish();

ROLLBACK;