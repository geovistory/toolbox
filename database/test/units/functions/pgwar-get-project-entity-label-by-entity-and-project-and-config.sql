BEGIN;

/**
 * Drop triggers that would reset the entity label to NULL and break the unit test
 **/
-- Drop trigger on_modify_project_statement
DROP TRIGGER IF EXISTS on_modify_project_statement ON pgwar.statement;

-- Drop trigger on_upsert_entity_preview_fk_class
DROP TRIGGER IF EXISTS on_upsert_entity_preview_fk_class ON pgwar.entity_preview;

-- Drop trigger on_upsert_entity_preview_entity_label
DROP TRIGGER IF EXISTS on_upsert_entity_preview_entity_label ON pgwar.entity_preview;

-- Drop trigger on_upsert_entity_label_config
DROP TRIGGER IF EXISTS on_upsert_entity_label_config ON projects.entity_label_config;

SELECT plan(3);

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

-- Test 1: Check if function returns the correct entity label 
SELECT is(
        pgwar.get_project_entity_label(
            11,
            1,
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
        ),
        'Entity 31, Entity 33, Label 61, Label 62, Entity 64, Label 65',
        'get_project_entity_label returns correct labels for entity_id 11, project_id 1, and label_config jsonb'
    );

-- Test 2: Check if function handles empty label_config
SELECT is(
        pgwar.get_project_entity_label(11, 1, NULL),
        NULL,
        'get_project_entity_label returns NULL for empty label_config'
    );

-- Test 2: Check if function handles not existing entity
SELECT is(
        pgwar.get_project_entity_label(99, 1, NULL),
        NULL,
        'get_project_entity_label returns NULL for not existing entity'
    );

SELECT *
FROM finish();

ROLLBACK;