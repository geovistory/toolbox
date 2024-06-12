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

CREATE TABLE pgwar.entity_preview_1 PARTITION OF pgwar.entity_preview FOR VALUES IN (1);

INSERT INTO pgwar.project_statements 
    (
        pk_entity,
        fk_project,
        fk_subject_info,
        fk_property,
        fk_object_info,
        object_label
    )
VALUES (1, 1, 11, 22, 31, 'Label 1'),
    (2, 1, 11, 22, 32, 'Label 2'),
    (3, 1, 11, 22, 33, NULL),
    (4, 1, 11, 22, 34, NULL),
    (5, 1, 11, 22, 35, 'Label 5'),
    (6, 1, 11, 22, 36, 'Label 6');

INSERT INTO pgwar.entity_preview (pk_entity, fk_project, fk_class, entity_label)
VALUES 
(33, 1, 88, 'Entity 33');


-- Test 1: Check if function returns the correct target labels for outgoing field
SELECT results_eq(
        'SELECT label::text FROM pgwar.get_target_labels_of_outgoing_field(11, 1, 22, 5)',
         ARRAY['Label 1', 'Label 2', 'Entity 33', NULL, 'Label 5'],
        'get_target_labels_of_outgoing_field returns correct labels for entity_id 11, project_id 1, property_id 22, and limit_count 5'
    );

-- Test 2: Check if function handles non-existing entity_id
SELECT is_empty(
        'SELECT label::text FROM pgwar.get_target_labels_of_outgoing_field(99999, 1, 22, 5)',
        'get_target_labels_of_outgoing_field returns no labels for entity_id 99999, project_id 1, property_id 22, and limit_count 5'
    );

SELECT *
FROM finish();

ROLLBACK;