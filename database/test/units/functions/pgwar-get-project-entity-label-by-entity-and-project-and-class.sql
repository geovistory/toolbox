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


SELECT plan(3);

INSERT INTO information.resource (pk_entity, fk_class)
VALUES(11, 77);

INSERT INTO pgwar.project_statements
    (
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
    (6, 1, 36, 22, 11, 'this has no influence'),
    (7, 1, 11, 55, 61, 'Label 61'),
    (8, 1, 11, 55, 62, 'Label 62'),
    (9, 1, 11, 55, 63, NULL),
    (10, 1, 11, 55, 64, NULL),
    (11, 1, 11, 55, 65, 'Label 65'),
    (12, 1, 11, 55, 66, 'Label 66');

INSERT INTO pgwar.entity_preview (pk_entity, fk_project, fk_class, entity_label)
VALUES (31, 1, 88, 'Entity 31'),
    (32, 1, 88, NULL),
    (33, 1, 88, 'Entity 33'),
    (64, 1, 88, 'Entity 64');

INSERT INTO projects.entity_label_config (fk_project, fk_class, config)
VALUES (
        1,
        77,
        '{
            "labelParts": [
                {
                    "field": {"isOutgoing": false, "fkProperty": 22, "nrOfStatementsInLabel": 5}
                },
                {
                    "field": {"isOutgoing": true, "fkProperty": 55, "nrOfStatementsInLabel": 5}
                }
            ]
        }'::jsonb
    );

-- Test 1: Check if function returns the correct entity label 
SELECT is(
        pgwar.get_project_entity_label(
            11,
            1,
            77
        ),
        'Entity 31, Entity 33, Label 61, Label 62, Entity 64, Label 65',
        'get_project_entity_label returns correct labels for entity_id 11, project_id 1, and classs_id 77'
    );

-- Test 2: Check if function handles empty label_config
SELECT is(
        pgwar.get_project_entity_label(11, 1, 9999999),
        NULL,
        'get_project_entity_label returns NULL for empty label_config'
    );

-- Test 2: Check if function handles not existing entity
SELECT is(
        pgwar.get_project_entity_label(99, 1, 77),
        NULL,
        'get_project_entity_label returns NULL for not existing entity'
    );

SELECT *
FROM finish();

ROLLBACK;