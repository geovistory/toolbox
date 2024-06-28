-- Test the creation of project entity label
-- Start transaction and plan the tests.
BEGIN;

SELECT plan(5);

-- Create and switch to a sink table for entity previews
SELECT war.create_sink_table_entity_preview('war.e');

SELECT war.switch_entity_preview_table('war.e');

INSERT INTO projects.project (pk_entity)
VALUES (1);

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


-- Add entity 1
INSERT INTO information.resource (fk_class, community_visibility, notes)
VALUES (77, '{"toolbox":true}', '_1') RETURNING pk_entity;

INSERT INTO projects.info_proj_rel (fk_entity, fk_project, is_in_project)
SELECT pk_entity,
       1,
       true
FROM information.resource
WHERE notes = '_1';

-- Insert project statement with literal
INSERT INTO pgwar.project_statements
(
    pk_entity,
    fk_project,
    fk_subject_info,
    fk_property,
    fk_object_info,
    object_label,
    object_value
)
SELECT 1,
       1,
       pk_entity,
       55,
       66,
       'Label 1',
       '{}'::jsonb
FROM information.resource
WHERE notes = '_1';


-- Test 1: assert that field change has only one row
SELECT is(
            count(*)::int,
            1,
            'Assert there is only one row in field_change'
        )
FROM pgwar.field_change;

-- Test 2: Check if field_change contains the correct values
SELECT results_eq(
    'SELECT 1, pk_entity, 0::bigint, 55, true FROM information.resource WHERE notes = ''_1'';',
    'SELECT fk_project, fk_source_info, fk_source_tables_cell, fk_property, is_outgoing FROM pgwar.field_change;',
    'field_change contains the correct data'
);

DELETE FROM pgwar.field_change;

-- Insert project statement with entity
INSERT INTO pgwar.project_statements
(
    pk_entity,
    fk_project,
    fk_subject_info,
    fk_property,
    fk_object_info,
    fk_object_tables_cell,
    object_value
)
SELECT 2,
       1,
       pk_entity,
       55,
       66,
       1337,
       NULL
FROM information.resource
WHERE notes = '_1';


-- Test 3: assert that field change has 2 rows
SELECT is(
    count(*)::int,
    2,
    'Assert there is only one row in field_change'
)
FROM pgwar.field_change;

-- Test 4: Check if field_change contains the correct values and is_outgoing is TRUE
SELECT results_eq(
    'SELECT 1, pk_entity, 0::bigint, 55, TRUE FROM information.resource WHERE notes = ''_1'';',
    'SELECT fk_project, fk_source_info, fk_source_tables_cell, fk_property, is_outgoing FROM pgwar.field_change WHERE is_outgoing;',
    'field_change contains the correct data'
);

-- Test 5: Check if field_change contains the correct values and is_outgoing is FALSE
SELECT results_eq(
    'SELECT 1, 66, 1337::bigint, 55, FALSE FROM information.resource WHERE notes = ''_1'';',
    'SELECT fk_project, fk_source_info, fk_source_tables_cell, fk_property, is_outgoing FROM pgwar.field_change WHERE is_outgoing IS FALSE;',
    'field_change contains the correct data'
);


-- Finish the tests and clean up.
SELECT *
FROM finish();

ROLLBACK;