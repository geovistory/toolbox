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

SELECT plan(2);

INSERT INTO pgwar.project_statements
    (
        pk_entity,
        fk_project,
        fk_subject_info,
        fk_property,
        fk_object_info,
        object_label
    )
VALUES (1, 1, 11, 22, 31, 'Label 1'),
    (2, 1, 11, 22, 32, 'Label 2'),
    (3, 1, 11, 22, 33, NULL),
    (4, 1, 11, 22, 34, NULL),
    (5, 1, 11, 22, 35, 'Label 5'),
    (6, 1, 11, 22, 36, 'Label 6');

INSERT INTO pgwar.entity_preview (pk_entity, fk_project, fk_class, entity_label)
VALUES (33, 1, 88, 'Entity 33');

-- Test 1: Check if function returns the correct target labels for outgoing field
SELECT is(
        get_label_of_outgoing_field,
        'Label 1, Label 2, Entity 33, Label 5'::text,
        'get_label_of_outgoing_field returns correct labels for entity_id 11, project_id 1, property_id 22, and limit_count 5'
    )
FROM pgwar.get_label_of_outgoing_field(11, 1, 22, 5);

-- Test 2: Check if function handles non-existing entity_id
SELECT is(
        get_label_of_outgoing_field,
        NULL,
        'get_label_of_outgoing_field returns correct labels for entity_id 11, project_id 1, property_id 22, and limit_count 5'
    )
FROM pgwar.get_label_of_outgoing_field(9999, 1, 22, 5);

SELECT *
FROM finish();

ROLLBACK;