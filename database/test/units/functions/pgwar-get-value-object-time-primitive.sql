-- Test the functions converting literal tables to value object json
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
        pgwar.get_value_object(time_primitive),
        format(
                '{
                    "timePrimitive": {
                        "pkEntity": %s,
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
                }',
            time_primitive.pk_entity
        )::jsonb,
        'Assert information.time_primitive is correctly converted to json'
    )
FROM information.time_primitive time_primitive;

-- Finish the tests and clean up.
SELECT *
FROM finish();

ROLLBACK;