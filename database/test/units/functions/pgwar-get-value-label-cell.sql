-- Test the function converting a literal table to a label
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
        pgwar.get_value_label(cell),
        'foo',
        'Assert tables.cell is correctly converted to a label'
    )
FROM tables.cell cell;

-- Finish the tests and clean up.
SELECT *
FROM finish();

ROLLBACK;