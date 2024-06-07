BEGIN;

SELECT plan(2);

CREATE TABLE pgwar.entity_preview_1 PARTITION OF pgwar.entity_preview FOR
VALUES IN (1);

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
    (6, 36, 22, 11, 'this has no influence'),
    (7, 11, 55, 61, 'Label 61'),
    (8, 11, 55, 62, 'Label 62'),
    (9, 11, 55, 63, NULL),
    (10, 11, 55, 64, NULL),
    (11, 11, 55, 65, 'Label 65'),
    (12, 11, 55, 66, 'Label 66');

INSERT INTO pgwar.entity_preview (pk_entity, fk_project, fk_class, entity_label)
VALUES (31, 1, 88, 'Entity 31'),
    (32, 1, 88, NULL),
    (33, 1, 88, 'Entity 33'),
    (64, 1, 88, 'Entity 64');

-- Test 1: Check if function returns the correct target label for an outgoing field
SELECT is(
        pgwar.get_target_label_of_field(
            11,
            1,
            '{"isOutgoing": true, "fkProperty": 55, "nrOfStatementsInLabel": 5}'::jsonb
        ),
        'Label 61, Label 62, Entity 64, Label 65',
        'get_target_label_of_field returns correct labels for entity_id 11, project_id 1, property_id 55, outgoing'
    );

-- Test 2: Check if function returns the correct target label for an incoming field
SELECT is(
        pgwar.get_target_label_of_field(
            11,
            1,
            '{"isOutgoing": false, "fkProperty": 22, "nrOfStatementsInLabel": 5}'::jsonb
        ),
        'Entity 31, Entity 33',
        'get_target_label_of_field returns correct labels for entity_id 11, project_id 1, property_id 22, incoming'
    );

SELECT *
FROM finish();

ROLLBACK;