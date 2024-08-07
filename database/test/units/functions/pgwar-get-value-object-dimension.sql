-- Test the functions converting literal tables to value object json
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
        pgwar.get_value_object(dimension),
        format(
            '{
                 "dimension": {
                    "pkEntity": %s,
                    "fkClass": 123,
                    "fkMeasurementUnit": %s,
                    "numericValue": 43.21
                }
            }',
            dimension.pk_entity,
            dimension.fk_measurement_unit
        )::jsonb,
        'Assert information.dimension is correctly converted to json'
    )
FROM information.dimension dimension;

-- Finish the tests and clean up.
SELECT *
FROM finish();

ROLLBACK;