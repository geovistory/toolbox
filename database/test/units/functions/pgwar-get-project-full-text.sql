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

-- Insert a language entry to be used in projects
INSERT INTO information.language(pk_language, iso6391)
VALUES ('fra', 'fr'),
    ('eng', 'en');

-- Insert two projects associated with the language
INSERT INTO projects.project(fk_language, notes)
SELECT pk_entity,
    '_p1'
FROM information.language
WHERE pk_language = 'fra';

INSERT INTO pgwar.project_statements (
        pk_entity,
        fk_project,
        fk_subject_info,
        fk_property,
        fk_object_info,
        object_label
    )
SELECT v.pk_entity,
    pro.pk_entity,
    v.fk_subject_info,
    v.fk_property,
    v.fk_object_info,
    v.object_label
FROM (
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
            (12, 11, 55, 66, 'Label 66')
    ) AS v (
        pk_entity,
        fk_subject_info,
        fk_property,
        fk_object_info,
        object_label
    ),
    projects.project pro
WHERE pro.notes = '_p1';

INSERT INTO pgwar.entity_preview (pk_entity, fk_project, fk_class, entity_label)
SELECT v.pk_entity,
    pro.pk_entity,
    v.fk_class,
    v.entity_label
FROM (
        VALUES (31, 88, 'Entity 31'),
            (32, 88, NULL),
            (33, 88, 'Entity 33'),
            (64, 88, 'Entity 64')
    ) AS v(pk_entity, fk_class, entity_label),
    projects.project pro
WHERE pro.notes = '_p1';

INSERT INTO data_for_history.api_property(
        tmsp_last_dfh_update,
        dfh_pk_property,
        dfh_property_label_language,
        dfh_property_label,
        dfh_property_inverse_label
    )
VALUES (
        '2024-06-12 07:54:29.142429+00',
        22,
        'fr',
        'possède',
        'est en possession de'
    ),
    (
        '2024-06-12 07:54:29.142429+00',
        55,
        'fr',
        'bar',
        'bar inverse'
    );

SELECT plan(1);

SELECT is(
        pgwar.get_project_full_text(pk_entity, 11),
        'bar: Label 61, Label 62, Entity 64, Label 65\n est en possession de: Entity 31, Entity 33',
        'Get the fulltext of entity 11'
    )
FROM projects.project
WHERE notes = '_p1';

SELECT *
FROM finish();

ROLLBACK;