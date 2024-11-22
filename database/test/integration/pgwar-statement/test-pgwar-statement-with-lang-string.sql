-- Test the creation pgwar.statement with lang_string
BEGIN;

SELECT plan(6);

PREPARE get_all_pgwar_statements AS
SELECT *
FROM pgwar.statement;

WITH inserted_lang AS (
    -- Insert a language, as required by lang_string
    INSERT INTO information.language (
            notes,
            iso6391,
            iso6392b,
            iso6392t,
            pk_language,
            fk_class
        )
    VALUES ('english', 'e', 'en', 'eng', 'eng', 123) RETURNING pk_entity
) -- Insert a lang_string 
INSERT INTO information.lang_string (string, fk_language, fk_class, notes)
SELECT 'foo',
    inserted_lang.pk_entity,
    123,
    '_1'
FROM inserted_lang;

-- Insert one statement referencing lang_string '_1'
INSERT INTO information.statement(fk_subject_info, fk_property, fk_object_info)
SELECT 0,
    0,
    pk_entity
FROM information.lang_string
WHERE notes = '_1';

SELECT is(
        object_label,
        'foo',
        'Assert statement has correct object_label'
    )
FROM pgwar.statement;

SELECT ok(
        object_value IS NOT NULL,
        'Assert statement has an object_value'
    )
FROM pgwar.statement;

-- Update the literal
UPDATE information.lang_string
SET string = 'bar'
WHERE notes = '_1';

SELECT is(
        object_label,
        'bar',
        'Assert statement object_label has been updated'
    )
FROM pgwar.statement;

-- Delete the statement
DELETE FROM information.statement;

SELECT is_empty(
        'get_all_pgwar_statements',
        'Assert pgwar statement is empty after deleting statement'
    );

-- Re-insert one statement referencing lang_string '_1'
INSERT INTO information.statement(fk_subject_info, fk_property, fk_object_info)
SELECT 0,
    0,
    pk_entity
FROM information.lang_string
WHERE notes = '_1';

SELECT isnt_empty(
        'get_all_pgwar_statements',
        'Assert pgwar statement is not empty after re-inserting a statement'
    );

-- Delete the literal
DELETE FROM information.lang_string;

SELECT is_empty(
        'get_all_pgwar_statements',
        'Assert pgwar statement is empty after deleting literal'
    );

-- Finish the tests and clean up.
SELECT *
FROM finish();

ROLLBACK;