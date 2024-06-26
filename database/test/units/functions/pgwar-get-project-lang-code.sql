BEGIN;

------- Prepare required context data ------
-- Create and switch to a sink table for entity previews
SELECT war.create_sink_table_entity_preview('war.e');

SELECT war.switch_entity_preview_table('war.e');

-- Insert a language entry to be used in projects
INSERT INTO information.language(pk_language, iso6391)
VALUES ('ita', 'it'),
    ('eng', 'en');

-- Insert two projects associated with the language
INSERT INTO projects.project(fk_language, notes)
SELECT pk_entity,
    '_p1'
FROM information.language
WHERE pk_language = 'ita';

SELECT plan(2);

SELECT is(
        pgwar.get_project_lang_code(pk_entity),
        'it',
        'Assert the default language is returned'
    )
FROM projects.project
WHERE notes = '_p1';

SELECT is(
        pgwar.get_project_lang_code(9999999),
        NULL,
        'Assert the NULL language is returned for non-existing project'
    );

SELECT *
FROM finish();

ROLLBACK;