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

SELECT plan(2);

CREATE TABLE pgwar.entity_preview_1 PARTITION OF pgwar.entity_preview FOR
VALUES IN (1);

WITH entity AS (
    INSERT INTO information.resource (fk_class)
    VALUES (77) RETURNING pk_entity
)
INSERT INTO pgwar.project_statements
    (
        pk_entity,
        fk_project,
        fk_subject_info,
        fk_property,
        fk_object_info,
        object_label
    )
SELECT id,
    1,
    fk_subject_info,
    fk_property,
    fk_object_info,
    object_label
FROM entity
    JOIN LATERAL (
        VALUES (1, 31, 22, entity.pk_entity, ''),
            (2, 32, 22, entity.pk_entity, ''),
            (3, 33, 22, entity.pk_entity, ''),
            (4, 34, 22, entity.pk_entity, ''),
            (5, 35, 22, entity.pk_entity, ''),
            (6, 36, 22, entity.pk_entity, ''),
            (7, entity.pk_entity, 55, 61, 'Label 61'),
            (8, entity.pk_entity, 55, 62, 'Label 62'),
            (9, entity.pk_entity, 55, 63, NULL),
            (10, entity.pk_entity, 55, 64, NULL),
            (11, entity.pk_entity, 55, 65, 'Label 65'),
            (12, entity.pk_entity, 55, 66, 'Label 66')
    ) AS vals(
        id,
        fk_subject_info,
        fk_property,
        fk_object_info,
        object_label
    ) ON true;

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
        pgwar.get_project_entity_label(pk_entity, 1),
        'Entity 31, Entity 33, Label 61, Label 62, Entity 64, Label 65',
        'get_project_entity_label returns correct label for entity_id and project_id 1'
    )
FROM information.resource;

-- Test 2: Check if function handles not existing entity
SELECT is(
        pgwar.get_project_entity_label(-99, 1),
        NULL,
        'get_project_entity_label returns NULL for not existing entity'
    );

SELECT *
FROM finish();

ROLLBACK;