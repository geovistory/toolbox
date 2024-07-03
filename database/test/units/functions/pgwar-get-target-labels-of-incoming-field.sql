BEGIN;

/**
 * Drop triggers that would reset the entity label to NULL and break the unit test
 **/
-- Drop trigger on_modify_project_statement
DROP TRIGGER IF EXISTS on_modify_project_statement ON pgwar.project_statements;

-- Drop trigger on_upsert_entity_preview_fk_class
DROP TRIGGER IF EXISTS on_upsert_entity_preview_fk_class ON pgwar.entity_preview;

-- Drop trigger on_upsert_entity_preview_entity_label
DROP TRIGGER IF EXISTS on_upsert_entity_preview_entity_label ON pgwar.entity_preview;

-- Drop trigger on_upsert_entity_label_config
DROP TRIGGER IF EXISTS on_upsert_entity_label_config ON projects.entity_label_config;

SELECT plan(4);

/****** test the project version *****/

INSERT INTO pgwar.project_statements (
        pk_entity,
        fk_project,
        fk_subject_info,
        fk_property,
        fk_object_info,
        object_label
    )
VALUES (1, 1, 31, 22, 11, 'this has no influence'),
    (2, 1, 32, 22, 11, 'this has no influence'),
    (3, 1, 33, 22, 11, 'this has no influence'),
    (4, 1, 34, 22, 11, 'this has no influence'),
    (5, 1, 35, 22, 11, 'this has no influence'),
    (6, 1, 36, 22, 11, 'this has no influence');

INSERT INTO pgwar.entity_preview (pk_entity, fk_project, fk_class, entity_label)
VALUES (31, 1, 88, 'Entity 31'),
    (32, 1, 88, NULL),
    (33, 1, 88, 'Entity 33');

-- Test 1: Check if function returns the correct target labels for incoming field
SELECT results_eq(
        'SELECT label::text FROM pgwar.get_target_labels_of_incoming_field(11, 1, 22, 5)',
        ARRAY [ 'Entity 31',
        NULL,
        'Entity 33',
        NULL,
        NULL ],
        'get_target_labels_of_incoming_field returns correct labels for entity_id 11, project_id 1, property_id 22, and limit_count 5'
    );

-- Test 2: Check if function handles non-existing entity_id
SELECT is_empty(
        'SELECT label::text FROM pgwar.get_target_labels_of_incoming_field(99999, 1, 22, 5)',
        'get_target_labels_of_incoming_field returns no labels for entity_id 99999, project_id 1, property_id 22, and limit_count 5'
    );

/****** test the community version *****/
INSERT INTO pgwar.community_statements (
        pk_entity,
        fk_subject_info,
        fk_property,
        fk_object_info,
        object_label
    )
VALUES (1, 31, 22, 11, 'this has no influence'),
    (2, 32, 22, 11, 'this has no influence'),
    (3, 33, 22, 11, 'this has no influence'),
    (4, 34, 22, 11, 'this has no influence'),
    (5, 35, 22, 11, 'this has no influence'),
    (6, 36, 22, 11, 'this has no influence');

INSERT INTO pgwar.entity_preview (pk_entity, fk_project, fk_class, entity_label)
VALUES (31, 0, 88, 'Entity 31'),
    (32, 0, 88, NULL),
    (33, 0, 88, 'Entity 33');

-- Test 1: Check if function returns the correct target labels for incoming field
SELECT results_eq(
        'SELECT label::text FROM pgwar.get_target_labels_of_incoming_field(11, 0, 22, 5)',
        ARRAY [ 'Entity 31',
        NULL,
        'Entity 33',
        NULL,
        NULL ],
        'get_target_labels_of_incoming_field returns correct labels for entity_id 11, project_id 0, property_id 22, and limit_count 5'
    );

-- Test 2: Check if function handles non-existing entity_id
SELECT is_empty(
        'SELECT label::text FROM pgwar.get_target_labels_of_incoming_field(99999, 0, 22, 5)',
        'get_target_labels_of_incoming_field returns no labels for entity_id 99999, project_id 0, property_id 22, and limit_count 5'
    );

SELECT *
FROM finish();

ROLLBACK;