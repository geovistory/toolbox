-- Test the function converting a literal table to a label
-- Start transaction and plan the tests.
BEGIN;

SELECT plan(1);

INSERT INTO information.place (geo_point, fk_class)
VALUES (
        ST_SetSRID(ST_MakePoint(7.123, 3.123), 4326)::geography,
        123
    );

SELECT is(
        pgwar.get_value_label(place),
        'WGS84: 7.123°, 3.123°',
        'Assert information.place is correctly converted a label'
    )
FROM information.place place;

-- Finish the tests and clean up.
SELECT *
FROM finish();

ROLLBACK;