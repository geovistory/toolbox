-- Test the functions converting literal tables to value object json
-- Start transaction and plan the tests.
BEGIN;

SELECT plan(1);

WITH inserted_lang AS (
    INSERT INTO information.language (
            notes,
            iso6391,
            iso6392b,
            iso6392t,
            pk_language,
            fk_class
        )
    VALUES ('english', 'e', 'en', 'eng', 'eng', 123) RETURNING pk_entity
)
INSERT INTO information.lang_string (string, fk_language, fk_class)
SELECT 'foo',
    inserted_lang.pk_entity,
    123
FROM inserted_lang;

SELECT is(
        pgwar.get_value_object(lang_string),
        format(
            '{
                "langString": {
                    "pkEntity": %s,
                    "fkClass": 123,
                    "string": "foo",
                    "fkLanguage": %s
                }
            }',
            lang_string.pk_entity,
            lang_string.fk_language
        )::jsonb,
        'Assert information.lang_string is correctly converted to json'
    )
FROM information.lang_string lang_string;

-- Finish the tests and clean up.
SELECT *
FROM finish();

ROLLBACK;