-- Test the function converting a literal table to a label
-- Start transaction and plan the tests.
BEGIN;

SELECT plan(1);


-- insert test data
-- to generate sample values, I used: https://aa.usno.navy.mil/data/JulianDate
INSERT INTO information.time_primitive (julian_day, calendar, duration, fk_class)
VALUES (
        2460461,
        'gregorian'::calendar_type,
        '1 day'::calendar_granularities,
        123
    );

SELECT is(
        pgwar.get_value_label(time_primitive),
        '2024-05-30 (1 day)',
        'Assert information.time_primitive is correctly converted a label'
    )
FROM information.time_primitive time_primitive;

-- Finish the tests and clean up.
SELECT *
FROM finish();

ROLLBACK;