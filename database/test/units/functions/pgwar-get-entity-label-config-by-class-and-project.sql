
BEGIN;
SELECT plan(2);

INSERT INTO projects.entity_label_config(fk_class, fk_project, config)
VALUES 
(1, 2, '{"labelParts":[{"field":{"fkProperty":1111,"isOutgoing":false,"nrOfStatementsInLabel":1},"ordNum":0}]}'),
(1, 375669, '{"labelParts":[{"field":{"fkProperty":3333,"isOutgoing":true,"nrOfStatementsInLabel":2},"ordNum":0}]}');

-- Test 1: Check if function returns the correct label config for a given class_id and project_id
SELECT is(
    pgwar.get_entity_label_config(1, 2), 
   '{"labelParts":[{"field":{"fkProperty":1111,"isOutgoing":false,"nrOfStatementsInLabel":1},"ordNum":0}]}'::jsonb,
    'get_entity_label_config returns correct config for class_id 1 and project_id 2'
);

-- Test 2: Check if function returns the default label config for a given class_id when project_id is not found
SELECT is(
    pgwar.get_entity_label_config(1, 999999),
    '{"labelParts":[{"field":{"fkProperty":3333,"isOutgoing":true,"nrOfStatementsInLabel":2},"ordNum":0}]}'::jsonb,
    'get_entity_label_config returns default config for class_id 1 when project_id is not found'
);

SELECT * FROM finish();
ROLLBACK;