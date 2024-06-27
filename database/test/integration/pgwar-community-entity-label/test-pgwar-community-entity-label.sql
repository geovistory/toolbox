-- Test the creation of project entity label
-- Start transaction and plan the tests.
BEGIN;

SELECT plan(3);

INSERT INTO projects.project (pk_entity)
VALUES (1),
       (2),
       (3),
       (4),
       (5),
       (6),
       (7);

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

INSERT INTO projects.entity_label_config (fk_project, fk_class, config)
VALUES (
           2,
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

INSERT INTO projects.entity_label_config (fk_project, fk_class, config)
VALUES (
           3,
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

INSERT INTO projects.entity_label_config (fk_project, fk_class, config)
VALUES (
           4,
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

INSERT INTO projects.entity_label_config (fk_project, fk_class, config)
VALUES (
           5,
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

INSERT INTO projects.entity_label_config (fk_project, fk_class, config)
VALUES (
           6,
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

INSERT INTO projects.entity_label_config (fk_project, fk_class, config)
VALUES (
           7,
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

-- Add entity 1
INSERT INTO information.resource (fk_class, community_visibility, notes)
VALUES (77, '{"toolbox":true}', '_1') RETURNING pk_entity;

INSERT INTO projects.info_proj_rel (fk_entity, fk_project, is_in_project)
SELECT pk_entity,
       1,
       true
FROM information.resource
WHERE notes = '_1';

INSERT INTO projects.info_proj_rel (fk_entity, fk_project, is_in_project)
SELECT pk_entity,
       2,
       true
FROM information.resource
WHERE notes = '_1';

INSERT INTO projects.info_proj_rel (fk_entity, fk_project, is_in_project)
SELECT pk_entity,
       3,
       true
FROM information.resource
WHERE notes = '_1';

INSERT INTO projects.info_proj_rel (fk_entity, fk_project, is_in_project)
SELECT pk_entity,
       4,
       true
FROM information.resource
WHERE notes = '_1';

INSERT INTO projects.info_proj_rel (fk_entity, fk_project, is_in_project)
SELECT pk_entity,
       5,
       true
FROM information.resource
WHERE notes = '_1';

INSERT INTO projects.info_proj_rel (fk_entity, fk_project, is_in_project)
SELECT pk_entity,
       6,
       true
FROM information.resource
WHERE notes = '_1';

-- Add entity 1 to other projects
INSERT INTO projects.info_proj_rel (fk_entity, fk_project, is_in_project)
SELECT pk_entity,
       7,
       true
FROM information.resource
WHERE notes = '_1';


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
       2,
       pk_entity,
       55,
       66,
       'Label 1bis'
FROM information.resource
WHERE notes = '_1';

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
       3,
       pk_entity,
       55,
       66,
       'Label 1'
FROM information.resource
WHERE notes = '_1';

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
       4,
       pk_entity,
       55,
       66,
       'Label 1bis'
FROM information.resource
WHERE notes = '_1';

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
       5,
       pk_entity,
       55,
       66,
       'Label 1'
FROM information.resource
WHERE notes = '_1';

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
       6,
       pk_entity,
       55,
       66,
       'Label 1bis'
FROM information.resource
WHERE notes = '_1';

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
       7,
       pk_entity,
       55,
       66,
       'Label 1bis'
FROM information.resource
WHERE notes = '_1';

-- Test 1: assert that entity 1 has "Label 1bis" as community entity label
SELECT is(
    ep.entity_label,
    'Label 1bis',
    'Assert community entity preview has Label 1bis after inserts'
)
FROM pgwar.entity_preview ep,
     information.resource r
WHERE ep.pk_entity = r.pk_entity
  AND r.notes = '_1'
  AND ep.fk_project = 0;

-- Update 4 entity labels
UPDATE pgwar.entity_preview
SET entity_label = 'Label 1ter'
WHERE fk_project > 3;

-- Test 2: assert that entity 1 has "Label 1ter" as community entity label
SELECT is(
   ep.entity_label,
   'Label 1ter',
   'Assert community entity preview has Label 1ter after updates'
)
FROM pgwar.entity_preview ep,
     information.resource r
WHERE ep.pk_entity = r.pk_entity
  AND r.notes = '_1'
  AND ep.fk_project = 0;

-- Delete 6 entity previews
DELETE FROM pgwar.entity_preview
WHERE fk_project > 1;

-- Test 3: assert that entity 1 has "Label 1" as community entity label
SELECT is(
   ep.entity_label,
   'Label 1',
   'Assert community entity preview has Label 1 after deletes'
)
FROM pgwar.entity_preview ep,
     information.resource r
WHERE ep.pk_entity = r.pk_entity
  AND r.notes = '_1'
  AND ep.fk_project = 0;

-- Finish the tests and clean up.
SELECT *
FROM finish();

ROLLBACK;