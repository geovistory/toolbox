-- Test the pgwar.project_statements module
BEGIN;

SELECT plan(6);

------- Prepare required context data ------
-- Create and switch to a sink table for entity previews
SELECT war.create_sink_table_entity_preview('war.e');
SELECT war.switch_entity_preview_table('war.e');

PREPARE get_all_pgwar_project_statements AS
    SELECT *
    FROM pgwar.project_statements;

-- Insert a language entry to be used in project
INSERT INTO information.language(pk_language) VALUES ('eng');

-- Insert a project associated with the language
INSERT INTO projects.project(fk_language, notes)
SELECT pk_entity, '_p1' FROM information.language;

-- Insert one statement
INSERT INTO pgwar.statement(pk_entity, fk_subject_info, fk_property, fk_object_info, object_label, object_value)
VALUES (1,0,0,1,'foo', '{"foo":"bar"}');

-- Add the statement to the project '_p1' in projects.info_proj_rel
INSERT INTO projects.info_proj_rel(fk_project, fk_entity, is_in_project, notes)
SELECT proj.pk_entity, 1, TRUE, '_ipr1'
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

-- Update the literal
-- UPDATE information.appellation
-- SET string = 'bar'
-- WHERE notes = '_a1';

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
INSERT INTO pgwar.statement(pk_entity, fk_subject_info, fk_property, fk_object_info, object_label, object_value)
VALUES (1,0,0,1,'foo', '{"foo":"bar"}');

SELECT isnt_empty(
               'get_all_pgwar_project_statements',
               'Assert pgwar project statement is not empty after re-inserting a statement'
       );

-- Finish the tests and clean up.
SELECT *
FROM finish();

ROLLBACK;