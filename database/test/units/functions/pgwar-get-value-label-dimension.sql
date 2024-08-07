-- Test the function converting a literal table to a label
-- Start transaction and plan the tests.
BEGIN;

SELECT plan(1);

WITH m_unit AS (
    INSERT INTO information.resource (fk_class)
    VALUES (33) RETURNING pk_entity
)
INSERT INTO information.dimension (numeric_value, fk_measurement_unit, fk_class)
SELECT 43.21,
    m_unit.pk_entity,
    123
FROM m_unit;

SELECT is(
        pgwar.get_value_label(dimension),
        '43.21',
        'Assert information.dimension is correctly converted to a label'
    )
FROM information.dimension dimension;

-- Finish the tests and clean up.
SELECT *
FROM finish();

ROLLBACK;