-- Test the pgwar.project_statements module
BEGIN;

SELECT plan(11);

------- Prepare required context data ------
-- Create and switch to a sink table for entity previews
SELECT war.create_sink_table_entity_preview('war.e');

SELECT war.switch_entity_preview_table('war.e');

PREPARE get_all_pgwar_project_statements AS
SELECT *
FROM pgwar.project_statements;

-- Insert a language entry to be used in project
INSERT INTO information.language(pk_language)
VALUES ('eng');

-- Insert a project associated with the language
INSERT INTO projects.project(fk_language, notes)
SELECT pk_entity,
       '_p1'
FROM information.language;

-- Insert one statement
INSERT INTO pgwar.statement(
              pk_entity,
              fk_subject_info,
              fk_property,
              fk_object_info,
              object_label,
              object_value
       )
VALUES (1, 0, 0, 1, 'foo', '{"foo":"bar"}');

-- Add the statement to the project '_p1' in projects.info_proj_rel
INSERT INTO projects.info_proj_rel(fk_project, fk_entity, is_in_project, notes)
SELECT proj.pk_entity,
       1,
       TRUE,
       '_ipr1'
FROM projects.project proj
WHERE proj.notes = '_p1';

SELECT isnt_empty(
              'get_all_pgwar_project_statements',
              'Assert pgwar project statement is not empty inserting a statement'
       );

SELECT is(
              object_label,
              'foo',
              'Assert project statement has correct object_label'
       )
FROM pgwar.project_statements;

SELECT ok(
              object_value IS NOT NULL,
              'Assert project statement has an object_value'
       )
FROM pgwar.project_statements;

--Update pgwar.statement
UPDATE pgwar.statement
SET object_label = 'bar'
WHERE pk_entity = 1;

SELECT is(
              object_label,
              'bar',
              'Assert project statement object_label has been updated'
       )
FROM pgwar.project_statements;

-- Delete the statement
DELETE FROM pgwar.statement;

SELECT is_empty(
              'get_all_pgwar_project_statements',
              'Assert pgwar project statement is empty after deleting pgwar statement'
       );

-- Re-insert one statement
INSERT INTO pgwar.statement(
              pk_entity,
              fk_subject_info,
              fk_property,
              fk_object_info,
              object_label,
              object_value
       )
VALUES (1, 0, 0, 1, 'foo', '{"foo":"bar"}');

SELECT isnt_empty(
              'get_all_pgwar_project_statements',
              'Assert pgwar project statement is not empty after re-inserting a statement'
       );

-- Update info_proj_rel _ipr1 ord_num_of_domain and ord_num_of_range
UPDATE projects.info_proj_rel
SET ord_num_of_domain = 1::numeric,
       ord_num_of_range = 2::numeric
WHERE notes = '_ipr1';

SELECT is(
              ord_num_of_domain,
              1::numeric,
              'Assert project statement has correct ord_num_of_domain'
       )
FROM pgwar.project_statements;

SELECT is(
              ord_num_of_range,
              2::numeric,
              'Assert project statement has correct ord_num_of_range'
       )
FROM pgwar.project_statements;

-- Update info_proj_rel _ipr1 to remove the statement from the project
UPDATE projects.info_proj_rel
SET is_in_project = FALSE
WHERE notes = '_ipr1';

SELECT is_empty(
              'get_all_pgwar_project_statements',
              'Assert pgwar project statement is empty after setting is_in_project to FALSE in info_proj_rel'
       );

-- Update info_proj_rel _ipr1 to add the statement to the project
UPDATE projects.info_proj_rel
SET is_in_project = TRUE
WHERE notes = '_ipr1';

SELECT isnt_empty(
              'get_all_pgwar_project_statements',
              'Assert pgwar project statement is not empty after setting is_in_project to TRUE in info_proj_rel'
       );

-- Delete info_proj_rel _ipr1
DELETE FROM projects.info_proj_rel
WHERE notes = '_ipr1';

SELECT is_empty(
              'get_all_pgwar_project_statements',
              'Assert pgwar project statement is empty after deleting info_proj_rel _ipr1'
       );

-- Finish the tests and clean up.
SELECT *
FROM finish();

ROLLBACK;