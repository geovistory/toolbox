-- Test the functions converting literal tables to value object json
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
        pgwar.get_value_object(
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
                123,
                2460461,
                'gregorian'
            )::information.time_primitive
        ),
        '{
            "timePrimitive": {
                "pkEntity": 1,
                "fkClass": 123,
                "julianDay": 2460461,
                "calendar": "gregorian",
                "duration": "1 day",
                "label": "2024-05-30 (1 day)",
                "from": {
                    "calJulian": "2024-05-17",
                    "julianDay": 2460461,
                    "calGregorian": "2024-05-30",
                    "julianSecond": 212583830400,
                    "calGregorianIso8601": "2024-05-30T00:00:00Z"
                },
                "to": {
                    "calJulian": "2024-05-18",
                    "julianDay": 2460462,
                    "calGregorian": "2024-05-31",
                    "julianSecond": 212583916800,
                    "calGregorianIso8601": "2024-05-31T00:00:00Z"
                }
            }
        }'::jsonb,
        'Assert julian day 2460461 in gregorian is correctly converted to json'
    );
-- Modern date to julian calendar
SELECT is(
        pgwar.get_value_object(
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
                123,
                2460461,
                'julian'
            )::information.time_primitive
        ),
        '{
            "timePrimitive": {
                "pkEntity": 1,
                "fkClass": 123,
                "julianDay": 2460461,
                "calendar": "julian",
                "duration": "1 day",
                "label": "2024-05-17 (1 day)",
                "from": {
                    "calJulian": "2024-05-17",
                    "julianDay": 2460461,
                    "calGregorian": "2024-05-30",
                    "julianSecond": 212583830400,
                    "calGregorianIso8601": "2024-05-30T00:00:00Z"
                },
                "to": {
                    "calJulian": "2024-05-18",
                    "julianDay": 2460462,
                    "calGregorian": "2024-05-31",
                    "julianSecond": 212583916800,
                    "calGregorianIso8601": "2024-05-31T00:00:00Z"
                }
            }
        }'::jsonb,
        'Assert julian day 2460461 in julian is correctly converted to json'
    );
    -- Middle ages date to julian calendar
SELECT is(
        pgwar.get_value_object(
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
                123,
                2236211,
                'julian'
            )::information.time_primitive
        ),
        '{
            "timePrimitive": {
                "pkEntity": 1,
                "fkClass": 123,
                "julianDay": 2236211,
                "calendar": "julian",
                "duration": "1 day",
                "label": "1410-05-31 (1 day)",
                "from": {
                    "calJulian": "1410-05-31",
                    "julianDay": 2236211,
                    "calGregorian": "1410-06-09",
                    "julianSecond": 193208630400,
                    "calGregorianIso8601": "1410-06-09T00:00:00Z"
                },
                "to": {
                    "calJulian": "1410-06-01",
                    "julianDay": 2236212,
                    "calGregorian": "1410-06-10",
                    "julianSecond": 193208716800,
                    "calGregorianIso8601": "1410-06-10T00:00:00Z"
                }
            }
        }'::jsonb,
        'Assert julian day 2236211 in julian is correctly converted to json'
    );
    -- BC ages date to julian calendar
SELECT is(
        pgwar.get_value_object(
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
                123,
                1668612,
                'julian'
            )::information.time_primitive
        ),
        '{
            "timePrimitive": {
                "pkEntity": 1,
                "fkClass": 123,
                "julianDay": 1668612,
                "calendar": "julian",
                "duration": "1 day",
                "label": "-0145-05-30 (1 day)",
                "from": {
                    "calJulian": "-0145-05-30",
                    "julianDay": 1668612,
                    "calGregorian": "-0145-05-27",
                    "julianSecond": 144168076800,
                    "calGregorianIso8601": "-0145-05-27T00:00:00Z"
                },
                "to": {
                    "calJulian": "-0145-05-31",
                    "julianDay": 1668613,
                    "calGregorian": "-0145-05-28",
                    "julianSecond": 144168163200,
                    "calGregorianIso8601": "-0145-05-28T00:00:00Z"
                }
            }
        }'::jsonb,
        'Assert julian day 1668612 in julian is correctly converted to json'
    );
-- Finish the tests and clean up.
SELECT *
FROM finish();

ROLLBACK;