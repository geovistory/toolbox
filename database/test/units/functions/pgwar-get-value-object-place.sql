-- Test the functions converting literal tables to value object json
-- Start transaction and plan the tests.
BEGIN;

SELECT plan(1);

INSERT INTO information.place (geo_point, fk_class)
VALUES (
        ST_SetSRID(ST_MakePoint(7.123, 3.123), 4326)::geography,
        123
    );

SELECT is(
        pgwar.get_value_object(place),
        format('{
            "geometry": {
                "pkEntity": %s,
                "fkClass": 123,
                "geoJSON": {
                    "type": "Point",
                    "coordinates": [7.123, 3.123]
                }
            }
        }', place.pk_entity)::jsonb,
        'Assert information.place is correctly converted to json'
    )
FROM information.place place;

-- Finish the tests and clean up.
SELECT *
FROM finish();

ROLLBACK;