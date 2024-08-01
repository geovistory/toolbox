BEGIN;
SELECT plan(2);

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

-- Insert 7 projects
INSERT INTO projects.project (pk_entity)
VALUES (1),
       (2),
       (3),
       (4),
       (5),
       (6),
       (7);

-- Insert entity labels
INSERT INTO pgwar.entity_preview (pk_entity, fk_project, fk_class, entity_label)
VALUES (1, 1, 77, 'Label 1'),
       (1, 2, 77, 'Label 1'),
       (1, 3, 77, 'Label 1bis'),
       (1, 4, 77, 'Label 1bis'),
       (1, 5, 77, 'Label 1bis'),
       (1, 6, 77, 'Label 1ter'),
       (1, 7, 77, 'Label 1ter'),
       (2, 1, 77, 'Label 2'),
       (2, 2, 77, 'Label 2'),
       (2, 3, 77, 'Label 2bis'),
       (2, 4, 77, 'Label 2ter'),
       (2, 5, 77, 'Label 2ter');

-- Test 1: check entity 1 has 'Label 1bis' as most frequent label
SELECT is(
    entity_label,
    'Label 1bis',
    'Assert returned entity_label is "Label 2"'
)
FROM pgwar.v_community_entity_label
WHERE pk_entity = 1;

-- Test 2: check entity 2 has 'Label 1bis' as most frequent label
SELECT is(
   entity_label,
   'Label 2',
   'Assert returned entity_label is "Label 2"'
)
FROM pgwar.v_community_entity_label
WHERE pk_entity = 2;

SELECT * FROM finish();
ROLLBACK;