-- Test the functions converting literal tables to value object json
-- Start transaction and plan the tests.
BEGIN;

SELECT plan(1);

INSERT INTO information.language (notes, iso6391, iso6392b, iso6392t, pk_language, fk_class)
VALUES ('english', 'e', 'en', 'eng', 'eng', 123);

SELECT is(
        pgwar.get_value_object(language),
        format(
            '{
                "language": {
                    "pkEntity": %s,
                    "fkClass": 123,
                    "label": "english",
                    "iso6391": "e",
                    "iso6392b": "en",
                    "iso6392t": "eng"
                }
            }',
            language.pk_entity
        )::jsonb,
        'Assert information.language is correctly converted to json'
    )
FROM information.language language;

-- Finish the tests and clean up.
SELECT *
FROM finish();

ROLLBACK;