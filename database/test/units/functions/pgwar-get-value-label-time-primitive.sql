-- Test the function converting a literal table to a label
-- Start transaction and plan the tests.
BEGIN;

SELECT plan(4);

-- the below test data was generated with
-- - https://aa.usno.navy.mil/data/JulianDate
-- - https://horoscopes.astro-seek.com/calculate-julian-to-gregorian/
-- # | julian day   | gregorian    | julian cal    
----- -------------- -------------- ---------------
-- 1 | 2460461      | 2024-05-30   | 2024-05-17    
-- 2 | 2236211      |              | 1410-05-31    
-- 3 | 1668612      |              | 0145-05-30 BC 

-- Modern date to gregorian calendar
SELECT is(
        pgwar.get_value_label(
            (
                1,
                NULL,
                NULL,
                NULL,
                NULL,
                NULL,
                NULL,
                NULL,
                NULL,
                NULL,
                '1 day',
                NULL,
                2460461,
                'gregorian'
            )::information.time_primitive
        ),
        '2024-05-30 (1 day)',
        'Assert julian day 2460461 is 2024-05-30 in gregorian calendar'
    );

-- Modern date to julian calendar
SELECT is(
        pgwar.get_value_label(
            (
                1,
                NULL,
                NULL,
                NULL,
                NULL,
                NULL,
                NULL,
                NULL,
                NULL,
                NULL,
                '1 day',
                NULL,
                2460461,
                'julian'
            )::information.time_primitive
        ),
        '2024-05-17 (1 day)',
        'Assert julian day 2460461 is 2024-05-17 in julian calendar'
    );

-- Middle ages date to julian calendar
SELECT is(
        pgwar.get_value_label(
            (
                1,
                NULL,
                NULL,
                NULL,
                NULL,
                NULL,
                NULL,
                NULL,
                NULL,
                NULL,
                '1 day',
                NULL,
                2236211,
                'julian'
            )::information.time_primitive
        ),
        '1410-05-31 (1 day)',
        'Assert julian day 2236211 is 1410-05-31 in julian calendar'
    );

-- BC ages date to julian calendar
SELECT is(
        pgwar.get_value_label(
            (
                1,
                NULL,
                NULL,
                NULL,
                NULL,
                NULL,
                NULL,
                NULL,
                NULL,
                NULL,
                '1 day',
                NULL,
                1668612,
                'julian'
            )::information.time_primitive
        ),
        '-0145-05-30 (1 day)',
        'Assert gregorian day 1668612 is 0145-05-30 BC in gregorian calendar'
    );

-- Finish the tests and clean up.
SELECT *
FROM finish();

ROLLBACK;