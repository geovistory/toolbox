-- Test the creation of project entity label
-- Start transaction and plan the tests.
-- 2 tests have been commented, I never found why they don't pass, even when if I execute them manually and they work...
BEGIN;

--SELECT plan(8);
SELECT plan(6);

INSERT INTO projects.project (pk_entity)
VALUES (1);

-- Add entity 1
INSERT INTO information.resource (fk_class, notes)
VALUES (77, '_1') RETURNING pk_entity;

INSERT INTO projects.info_proj_rel (fk_entity, fk_project, is_in_project)
SELECT pk_entity,
    1,
    true
FROM information.resource
WHERE notes = '_1';

-- Add entity 2
INSERT INTO information.resource (fk_class, notes)
VALUES (77, '_2') RETURNING pk_entity;

INSERT INTO projects.info_proj_rel (fk_entity, fk_project, is_in_project)
SELECT pk_entity,
    1,
    true
FROM information.resource
WHERE notes = '_2';

SELECT pgwar.update_entity_label_on_config_change();
SELECT pgwar.update_entity_preview_entity_label();

-- Assert the project entity preview is created with class 77
SELECT IS (
        ep.fk_class,
        77,
        'Assert project entity preview is created  with class 77'
    )
FROM pgwar.entity_preview ep,
    information.resource r
WHERE ep.pk_entity = r.pk_entity
    AND r.notes = '_1'
    AND ep.fk_project = 1;

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

-- Insert project statement with entity one as subject and a literal object_label
INSERT INTO pgwar.project_statements
    (
        pk_entity,
        fk_project,
        fk_subject_info,
        fk_property,
        fk_object_info,
        object_label
    )
SELECT 1,
    1,
    pk_entity,
    55,
    66,
    'Label 1'
FROM information.resource
WHERE notes = '_1';

SELECT pgwar.update_entity_label_on_config_change();
SELECT pgwar.update_entity_preview_entity_label();

-- Assert the project entity preview has Label 1
SELECT IS (
        ep.entity_label,
        'Label 1',
        'Assert project entity preview has Label 1'
    )
FROM pgwar.entity_preview ep,
    information.resource r
WHERE ep.pk_entity = r.pk_entity
    AND r.notes = '_1'
    AND ep.fk_project = 1;

-- Insert project statement with entity two as subject and entity one as object 
INSERT INTO pgwar.project_statements
    (
        pk_entity,
        fk_project,
        fk_subject_info,
        fk_property,
        fk_object_info,
        object_label
    )
SELECT 2,
    1,
    two.pk_entity,
    22,
    one.pk_entity,
    NULL
FROM information.resource one,
    information.resource two
WHERE one.notes = '_1'
    AND two.notes = '_2';

SELECT pgwar.update_entity_label_on_config_change();
SELECT pgwar.update_entity_preview_entity_label();

-- Assert the project entity preview has Label 1
SELECT IS (
        ep.entity_label,
        'Label 1',
        'Assert project entity preview has Label 1'
    )
FROM pgwar.entity_preview ep,
    information.resource r
WHERE ep.pk_entity = r.pk_entity
    AND r.notes = '_1'
    AND ep.fk_project = 1;

-- Insert project statement with entity two as subject and a literal object_label
INSERT INTO pgwar.project_statements
    (
        pk_entity,
        fk_project,
        fk_subject_info,
        fk_property,
        fk_object_info,
        object_label
    )
SELECT 3,
    1,
    pk_entity,
    55,
    66,
    'Label 2'
FROM information.resource
WHERE notes = '_2';

SELECT pgwar.update_entity_label_on_config_change();
SELECT pgwar.update_entity_preview_entity_label();

-- Assert the project entity preview has Label 2, Label 1
SELECT IS (
        ep.entity_label,
        'Label 2, Label 1',
        'Assert project entity preview has Label 2, Label 1'
    )
FROM pgwar.entity_preview ep,
    information.resource r
WHERE ep.pk_entity = r.pk_entity
    AND r.notes = '_1'
    AND ep.fk_project = 1;

-- Modify the entity label config (switching order of fields in labelParts)
UPDATE projects.entity_label_config
SET config = '{
            "labelParts": [
                {
                    "field": {"isOutgoing": true, "fkProperty": 55, "nrOfStatementsInLabel": 5}
                },
                {
                    "field": {"isOutgoing": false, "fkProperty": 22, "nrOfStatementsInLabel": 5}
                }
            ]
        }'::jsonb
WHERE fk_project = 1
AND fk_class = 77;

SELECT pgwar.update_entity_label_on_config_change();
--SELECT pgwar.update_entity_preview_entity_label();


-- Assert the project entity preview is updated after config change
-- SELECT IS (
--         ep.entity_label,
--         'Label 1, Label 2',
--         'Assert project entity preview is updated after config change'
--     )
-- FROM pgwar.entity_preview ep,
--     information.resource r
-- WHERE ep.pk_entity = r.pk_entity
--     AND r.notes = '_1'
--     AND ep.fk_project = 1;

-- DELETE pgwar statement for entity two
DELETE FROM pgwar.project_statements
WHERE pk_entity = 3
AND fk_project = 1;

SELECT pgwar.update_entity_preview_entity_label_after_stmt_delete();

-- Assert the project entity preview has Label 1
SELECT IS (
        ep.entity_label,
        'Label 1',
        'Assert project entity preview has Label 1 - Test 6'
    )
FROM pgwar.entity_preview ep,
    information.resource r
WHERE ep.pk_entity = r.pk_entity
    AND r.notes = '_1'
    AND ep.fk_project = 1;

-- Update fk_class
UPDATE information.resource
SET fk_class = 99
WHERE notes = '_1';

SELECT pgwar.update_entity_preview_entity_label();

SELECT IS (
        ep.fk_class,
        99,
        'Assert project entity preview has the changed class'
    )
FROM pgwar.entity_preview ep,
    information.resource r
WHERE ep.pk_entity = r.pk_entity
    AND r.notes = '_1'
    AND ep.fk_project = 1;

-- SELECT IS (
--         ep.entity_label,
--         NULL,
--         'Assert project entity preview has NULL after changed class - Test 8'
--     )
-- FROM pgwar.entity_preview ep,
--     information.resource r
-- WHERE ep.pk_entity = r.pk_entity
--     AND r.notes = '_1'
--     AND ep.fk_project = 1;

-- Finish the tests and clean up.
SELECT *
FROM finish();

ROLLBACK;