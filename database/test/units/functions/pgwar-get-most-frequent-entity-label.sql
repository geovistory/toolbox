BEGIN;
SELECT plan(2);

-- Create and switch to a sink table for entity previews
SELECT war.create_sink_table_entity_preview('war.e');

SELECT war.switch_entity_preview_table('war.e');

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
    pgwar.get_most_frequent_entity_label(1),
    'Label 1bis',
    'Assert returned entity_label is "Label 2"'
);

-- Test 2: check entity 2 has 'Label 1bis' as most frequent label
SELECT is(
   pgwar.get_most_frequent_entity_label(2),
   'Label 2',
   'Assert returned entity_label is "Label 2"'
);

SELECT * FROM finish();
ROLLBACK;