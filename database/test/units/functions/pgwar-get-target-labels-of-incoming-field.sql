BEGIN;

SELECT plan(2);

CREATE TABLE pgwar.entity_preview_1 PARTITION OF pgwar.entity_preview FOR VALUES IN (1);

INSERT INTO pgwar.statement -- TODO: Change this to pgwar.project_statement
    (
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
VALUES 
(31, 1, 88, 'Entity 31'),
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

SELECT *
FROM finish();

ROLLBACK;