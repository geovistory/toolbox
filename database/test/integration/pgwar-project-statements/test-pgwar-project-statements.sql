-- Test the pgwar.project_statements module
BEGIN;

SELECT plan(6);

PREPARE get_all_pgwar_project_statements AS
    SELECT *
    FROM pgwar.project_statements;

-- Insert a language entry to be used in project
INSERT INTO information.language(pk_language) VALUES ('eng');

-- Insert a project associated with the language
INSERT INTO projects.project(fk_language, notes)
SELECT pk_entity, '_p1' FROM information.language;


-- Insert an appellation
INSERT INTO information.appellation(string, fk_class, notes)
VALUES ('foo', 0, '_a1');


-- Insert one statement referencing appellation '_a1'
INSERT INTO information.statement(fk_subject_info, fk_property, fk_object_info)
SELECT 0,
       0,
       pk_entity
FROM information.appellation
WHERE notes = '_a1';

-- Add the statement '_a1' to the project '_p1' in projects.info_proj_rel
INSERT INTO projects.info_proj_rel(fk_project, fk_entity, is_in_project, notes)
SELECT proj.pk_entity, pgstmt.pk_entity, TRUE, '_ipr1'
FROM projects.project proj, pgwar.statement pgstmt
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
FROM pgwar.statement;

SELECT ok(
           object_value IS NOT NULL,
           'Assert project statement has an object_value'
       )
FROM pgwar.statement;

-- Update the literal
UPDATE information.appellation
SET string = 'bar'
WHERE notes = '_a1';

SELECT is(
           object_label,
           'bar',
           'Assert project statement object_label has been updated'
       )
FROM pgwar.project_statements;

-- Delete the statement
DELETE FROM information.statement;

SELECT is_empty(
               'get_all_pgwar_project_statements',
               'Assert pgwar project statement is empty after deleting statement'
       );

-- Re-insert one statement referencing appellation '_a1'
INSERT INTO information.statement(fk_subject_info, fk_property, fk_object_info)
SELECT 0,
       0,
       pk_entity
FROM information.appellation
WHERE notes = '_a1';

SELECT isnt_empty(
               'get_all_pgwar_project_statements',
               'Assert pgwar project statement is not empty after re-inserting a statement'
       );

-- Delete the literal
DELETE FROM information.appellation;

SELECT is_empty(
               'get_all_pgwar_project_statements',
               'Assert pgwar project statement is empty after deleting literal'
       );

-- Finish the tests and clean up.
SELECT *
FROM finish();

ROLLBACK;