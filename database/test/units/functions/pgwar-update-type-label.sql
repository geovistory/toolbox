BEGIN;

/**
* Drop triggers that would reset the entity label to NULL and break the unit test
**/
-- Drop trigger after_insert_project_statement
DROP TRIGGER IF EXISTS after_insert_project_statement ON pgwar.project_statements;

-- Drop trigger after_update_project_statement
DROP TRIGGER IF EXISTS after_update_project_statement ON pgwar.project_statements;

-- Drop trigger after_delete_project_statement
DROP TRIGGER IF EXISTS after_delete_project_statement ON pgwar.project_statements;

-- Drop trigger after_insert_entity_preview
DROP TRIGGER IF EXISTS after_insert_entity_preview ON pgwar.entity_preview;

-- Drop trigger after_update_entity_preview
DROP TRIGGER IF EXISTS after_update_entity_preview ON pgwar.entity_preview;

-- Drop trigger after_delete_entity_preview_01
DROP TRIGGER IF EXISTS after_delete_entity_preview_01 ON pgwar.entity_preview;

-- Drop trigger on_upsert_entity_label_config
DROP TRIGGER IF EXISTS on_upsert_entity_label_config ON projects.entity_label_config;

SELECT plan(1);

-- Insert a language entry to be used in projects
INSERT INTO information.language(pk_entity, pk_language, iso6391)
VALUES (44, 'fra', 'fr'),
    (55, 'eng', 'en');

-- Insert two projects associated with the language
INSERT INTO projects.project(pk_entity, fk_language)
VALUES (33, 44);

-- Insert an entity preview that acts as type
INSERT INTO pgwar.entity_preview (pk_entity, fk_project, fk_class, entity_label)
VALUES (65, 33, 111, 'City');


-- Insert an entity preview of class 123 that has a fk_type referencing 'City'
INSERT INTO pgwar.entity_preview (pk_entity, fk_project, fk_class, fk_type, tmsp_fk_type_modification)
VALUES (66, 33, 123, 65, CURRENT_TIMESTAMP);

-- run the update task
SELECT pgwar.update_type_label();

SELECT is(
        type_label,
        'City',
        'Assert that the type_label is updated'
    )
FROM pgwar.entity_preview
WHERE pk_entity = 66
    AND fk_project = 33;

SELECT *
FROM finish();

ROLLBACK;