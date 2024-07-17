-- This test asserts that two entities whose labels depend on each other will not create an infinite loop 
BEGIN;

SELECT plan(1);

-- Given this data:
-- <entity 1> <prop 11> "foo"
-- <entity 2> <prop 12> "bar"
-- <entity 1> <prop 13> <entity 2>
-- And given this label configuration:
-- label config of entity 1: [prop 13, prop 11]
-- label config of entity 2: [prop 13i, prop 12]
--
-- We expect this infinite loop:
-- iteration 1
-- entity 1: "foo" 
-- entity 2: "bar"
-- iteration 2
-- entity 1: "bar, foo" 
-- entity 2: "foo, bar"
-- iteration 3
-- entity 1: "foo, bar, foo" 
-- entity 2: "bar, foo, bar"
-- iteration n
-- entity 1: "foo, bar, foo, bar, foo, bar, foo, bar, foo, bar, foo, bar, foo, bar, foo" 
-- entity 2: "bar, foo, bar, foo, bar, foo, bar, foo, bar, foo, bar, foo, bar, foo, bar"
-- iteration n+1
-- entity 1: "bar, foo, bar, foo, bar, foo, bar, foo, bar, foo, bar, foo, bar, foo, bar"
-- entity 2: "foo, bar, foo, bar, foo, bar, foo, bar, foo, bar, foo, bar, foo, bar, foo" 
--
--
--> even though we have a max length of 100 characters, 
--  the start of the entity labels will change with each iteration, infinitely. 
-- 
-- Create project 500
INSERT INTO projects.project (pk_entity)
VALUES (500);
--
-- Create entity 1
INSERT INTO information.resource (pk_entity, fk_class)
VALUES (1, 77);

-- Create entity 2
INSERT INTO information.resource (pk_entity, fk_class)
VALUES (2, 88);

-- Add entities to project 500
INSERT INTO projects.info_proj_rel (fk_entity, fk_project, is_in_project)
VALUES (1, 500, true),
    (2, 500, true);

-- Add statments
INSERT INTO pgwar.project_statements (
        pk_entity,
        fk_project,
        fk_subject_info,
        fk_property,
        fk_object_info,
        object_label
    )
VALUES -- <entity 1> <prop 11> "foo"
    (201, 500, 1, 11, 98, 'foo'),
    -- <entity 2> <prop 12> "bar"
    (202, 500, 2, 12, 99, 'bar'),
    -- <entity 1> <prop 13> <entity 2>
    (203, 500, 1, 13, 2, NULL);

-- label config of entity 1: [prop 13, prop 11]
INSERT INTO projects.entity_label_config (fk_project, fk_class, config)
VALUES (
        500,
        77,
        '{
            "labelParts": [
                {
                    "field": {"isOutgoing": true, "fkProperty": 13, "nrOfStatementsInLabel": 1}
                },
                {
                    "field": {"isOutgoing": true, "fkProperty": 11, "nrOfStatementsInLabel": 1}
                }
            ]
        }'::jsonb
    );

-- label config of entity 2: [prop 13i, prop 12]
INSERT INTO projects.entity_label_config (fk_project, fk_class, config)
VALUES (
        500,
        88,
        '{
            "labelParts": [
                {
                    "field": {"isOutgoing": false, "fkProperty": 13, "nrOfStatementsInLabel": 1}
                },
                {
                    "field": {"isOutgoing": true, "fkProperty": 12, "nrOfStatementsInLabel": 1}
                }
            ]
        }'::jsonb
    );

-- Assert the project entity preview has a label with 100 characters
SELECT is(
        length(ep.entity_label),
        100,
        'Assert project entity preview has a label with max length of 100 chars.'
    )
FROM pgwar.entity_preview ep
    WHERE ep.pk_entity = 1
    AND ep.fk_project = 500;

-- Finish the tests and clean up.
SELECT *
FROM finish();

ROLLBACK;