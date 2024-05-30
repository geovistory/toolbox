-- Test the function converting a literal table to a label
-- Start transaction and plan the tests.
BEGIN;

SELECT plan(1);

INSERT INTO information.language (notes, iso6391, iso6392b, iso6392t, pk_language, fk_class)
VALUES ('english', 'e', 'en', 'eng', 'eng', 123);

SELECT is(
        pgwar.get_value_label(language),
       'english',
        'Assert information.language is correctly converted a label'
    )
FROM information.language language;

-- Finish the tests and clean up.
SELECT *
FROM finish();

ROLLBACK;